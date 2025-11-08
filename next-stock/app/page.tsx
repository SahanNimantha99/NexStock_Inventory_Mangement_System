import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await stackServerApp.getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-700"></div>

      <main className="relative z-10 container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            NextStock
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
          Simplify your{" "}
          <span className="font-semibold text-purple-600">
            inventory management
          </span>{" "}
          with real-time tracking, low-stock alerts, and actionable insights.
          Whether you manage a store, warehouse, or online shop —
          <span className="font-medium">
            {" "}
            NextStock keeps you one step ahead.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/sign-in"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 hover:scale-105 transition-transform duration-200"
          >
            Learn More
          </Link>
        </div>

        {/* Feature highlights */}
        <div
          id="features"
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700"
        >
          <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              Real-Time Insights
            </h3>
            <p className="text-sm">
              Get instant visibility into stock levels, movement trends, and
              product performance — all in one dashboard.
            </p>
          </div>
          <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              Smart Automation
            </h3>
            <p className="text-sm">
              Automate restocking alerts, pricing calculations, and performance
              tracking with built-in AI-powered recommendations.
            </p>
          </div>
          <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              Secure & Scalable
            </h3>
            <p className="text-sm">
              Designed to scale with your business — from small shops to
              enterprise operations, securely managed on the cloud.
            </p>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-4 w-full text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NextStock — Built for smarter inventory
        control.
      </footer>
    </div>
  );
}
