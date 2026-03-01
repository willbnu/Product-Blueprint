import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@pb/state';
import { getSession, onAuthStateChange } from '../api/auth';

/**
 * Hook to initialize and manage the auth session.
 * Should be called once at the root of the application.
 *
 * This hook:
 * 1. Fetches the initial session on mount
 * 2. Subscribes to auth state changes
 * 3. Updates the auth store accordingly
 */
export function useSession() {
  const { setSession, setLoading } = useAuthStore();
  const queryClient = useQueryClient();

  const initialize = useCallback(async () => {
    try {
      const { session } = await getSession();
      setSession(session);
    } catch (error) {
      console.error('Failed to initialize session:', error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, [setSession, setLoading]);

  useEffect(() => {
    // Initialize session on mount
    initialize();

    // Subscribe to auth state changes
    const { unsubscribe } = onAuthStateChange((event, session) => {
      setSession(session);

      // Clear React Query cache on sign out
      if (event === 'SIGNED_OUT') {
        queryClient.clear();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [initialize, setSession, queryClient]);

  return {
    reinitialize: initialize,
  };
}
