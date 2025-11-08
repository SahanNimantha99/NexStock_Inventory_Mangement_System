import { SignIn } from "@stackframe/stack";
import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await stackServerApp.getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-300/40 rounded-full blur-3xl animate-pulse delay-700"></div>

      <main className="relative z-10 w-full max-w-md px-8 py-10 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            NextStock
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Sign in to manage your inventory and track performance.
          </p>
        </div>

        {/* Stack Sign-In form */}
        <div className="space-y-6">
          <SignIn />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block text-purple-600 font-medium hover:underline hover:text-purple-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-4 w-full text-center text-xs text-gray-500">
        © {new Date().getFullYear()} NextStock. All rights reserved.
      </footer>
    </div>
  );
}
