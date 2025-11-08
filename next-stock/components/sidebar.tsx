import { UserButton } from "@stackframe/stack";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 min-h-screen bg-gradient-to-b from-gray-900 via-gray-850 to-gray-950 text-gray-100 shadow-2xl border-r border-gray-800 backdrop-blur-md z-10 flex flex-col justify-between">
      {/* Brand Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-xl">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            NextStock
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Inventory
          </div>
          {navigation.map((item, key) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.href;
            return (
              <Link
                href={item.href}
                key={key}
                className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white text-gray-300"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User section */}
      <div className="border-t border-gray-800 p-6 flex items-center justify-between bg-gray-900/60 backdrop-blur-sm">
        <UserButton showUserInfo />
      </div>
    </aside>
  );
}
