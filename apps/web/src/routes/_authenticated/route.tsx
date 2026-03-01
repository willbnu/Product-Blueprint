import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@pb/state';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    // Wait for auth to initialize if still loading
    const state = useAuthStore.getState();

    if (state.isLoading) {
      // Wait for loading to complete
      await new Promise<void>((resolve) => {
        const unsubscribe = useAuthStore.subscribe((newState) => {
          if (!newState.isLoading) {
            unsubscribe();
            resolve();
          }
        });
      });
    }

    // Check if authenticated after loading
    const finalState = useAuthStore.getState();
    if (!finalState.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
