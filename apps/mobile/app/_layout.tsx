import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@pb/state';
import { useSession } from '@pb/data';
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
    const setLoading = useAuthStore((state) => state.setLoading);

    // Initialize auth session using shared hook
    useSession();

    return (
        <QueryClientProvider client={queryClient}>
            <Slot />
        </QueryClientProvider>
    );
}
