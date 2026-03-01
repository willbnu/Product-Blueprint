import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useSession } from '@pb/data';
import { ErrorBoundary } from '../components/ErrorBoundary';

const queryClient = new QueryClient();

function RootComponent() {
  // Initialize auth session on app load
  useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
          <Outlet />
        </div>
      </ErrorBoundary>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
