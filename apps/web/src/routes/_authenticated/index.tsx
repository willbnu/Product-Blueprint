import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@pb/state';
import { signOut } from '@pb/data';

export const Route = createFileRoute('/_authenticated/')({
  loader: async () => {
    // Pre-fetch any data needed for the dashboard
    // The user is already available in the auth store
    const { user } = useAuthStore.getState();
    return { user };
  },
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    useAuthStore.getState().reset();
    navigate({ to: '/login' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-dark-border dark:bg-dark-surface">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Product Blueprint
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back! 👋
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Your dashboard is ready.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Authentication Ready
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Supabase authentication is fully configured and working.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Tailwind CSS
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Utility-first CSS framework for rapid UI development.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Vite Powered
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Lightning fast development and optimized builds.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <span className="text-2xl">🧭</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              TanStack Router
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Type-safe routing with built-in data loaders.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <span className="text-2xl">🐻</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Zustand State
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Simple, fast state management for React.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Mobile Ready
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Companion Expo app shares the same patterns.
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Your Account
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">User ID</span>
              <p className="font-mono text-xs text-gray-900 dark:text-white">{user?.id}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
              <p className="text-gray-900 dark:text-white">{user?.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Member Since</span>
              <p className="text-gray-900 dark:text-white">
                {new Date(user?.created_at || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
