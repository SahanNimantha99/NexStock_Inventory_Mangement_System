"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { z } from "zod";

// ✅ Schema validation for product data
const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

// 🗑 Delete Product
export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id") || "");

  await prisma.product.deleteMany({
    where: { id, userId: user.id },
  });
}

// ➕ Create Product
export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();

  // ✅ Validate input
  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.format());
    throw new Error("Validation failed");
  }

  try {
    // ✅ Create product in Prisma
    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });

    // ✅ Redirect after success (outside catch)
    redirect("/inventory");
  } catch (error: unknown) {
    // type guard to check for a message string on unknown error
    const hasMessage = (err: unknown): err is { message: string } =>
      typeof err === "object" && err !== null && "message" in err && typeof (err as { [key: string]: unknown }).message === "string";

    // ⛔ Ignore Next.js internal redirect signal errors
    if (hasMessage(error) && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Product creation failed:", error);
    throw new Error("Failed to create product.");
  }
}
