"use client";

import { usePathname } from "next/navigation";
import { BarChart3, Package, Plus, Settings } from "lucide-react";

// Skeleton component for loading states
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-300 rounded ${className}`}></div>
  );
}

// Sidebar component for loading state
function LoadingSidebar() {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 min-h-screen p-6 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-950 text-gray-100 shadow-2xl border-r border-gray-800 backdrop-blur-md z-10 flex flex-col justify-between">
      {/* Brand Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-xl">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <Skeleton className="h-6 w-32 rounded-xl" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Inventory
        </div>
        {navigation.map((item, key) => (
          <div
            key={key}
            className="flex items-center space-x-3 py-2.5 px-3 rounded-2xl bg-gray-800/40"
          >
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-xl" />
          </div>
        ))}
      </nav>

      {/* Footer / User section */}
      <div className="border-t border-gray-800 p-6 flex items-center justify-between bg-gray-900/60 backdrop-blur-sm">
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </aside>
  );
}

// Main content skeleton
function MainContentSkeleton({
  showSidebar = true,
}: {
  showSidebar?: boolean;
}) {
  return (
    <main className={showSidebar ? "ml-64 p-8" : "p-8"}>
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-32 mb-2 rounded-xl" />
        <Skeleton className="h-4 w-64 rounded-xl" />
      </div>

      {/* Key Metrics skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
          <Skeleton className="h-6 w-24 mb-6 rounded-xl" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2 rounded-xl" />
                <Skeleton className="h-4 w-20 mx-auto mb-1 rounded-xl" />
                <div className="flex items-center justify-center">
                  <Skeleton className="h-3 w-8 rounded-xl" />
                  <Skeleton className="h-3 w-3 ml-1 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
          <Skeleton className="h-6 w-40 mb-6 rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>

      {/* Bottom Row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stock levels skeleton */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
          <Skeleton className="h-6 w-24 mb-6 rounded-xl" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-colors"
              >
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-xl" />
                <Skeleton className="h-4 w-16 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency skeleton */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
          <Skeleton className="h-6 w-20 mb-6 rounded-xl" />
          <div className="flex items-center justify-center">
            <Skeleton className="w-48 h-48 rounded-full" />
          </div>
          <div className="mt-6 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Loading() {
  const pathname = usePathname();

  // Don't show sidebar on public routes
  const showSidebar = !["/", "/sign-in", "/sign-up"].includes(pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showSidebar && <LoadingSidebar />}
      <MainContentSkeleton showSidebar={showSidebar} />
    </div>
  );
}
