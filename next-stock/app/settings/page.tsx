import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-purple-100 text-gray-900">
      <Sidebar currentPath="/settings" />

      <main className="ml-64 p-10 transition-all duration-300">
        {/* Page Header */}
        <div className="mb-10 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account preferences and personal details.
          </p>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <AccountSettings fullPage />
          </div>
        </div>
      </main>
    </div>
  );
}
