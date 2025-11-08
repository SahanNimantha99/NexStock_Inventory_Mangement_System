import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 5;

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-purple-100">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-10 transition-all duration-300">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Inventory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your products and track inventory levels.
          </p>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <form className="flex gap-3" action="/inventory" method="GET">
              <input
                name="q"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              />
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 shadow-sm hover:shadow-md transition-all">
                Search
              </button>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Name",
                    "SKU",
                    "Price",
                    "Quantity",
                    "Low Stock At",
                    "Actions",
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((product, key) => (
                  <tr
                    key={key}
                    className="hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.lowStockAt || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <form
                        action={async (formData: FormData) => {
                          "use server";
                          await deleteProduct(formData);
                        }}
                      >
                        <input type="hidden" name="id" value={product.id} />
                        <button className="text-red-600 hover:text-red-800 font-medium transition-colors">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/inventory"
                searchParams={{
                  q,
                  pageSize: String(pageSize),
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
