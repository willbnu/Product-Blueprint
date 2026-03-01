import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@pb/state';
import { useSession } from '@pb/data';
import { ErrorBoundary } from '../components/ErrorBoundary';
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
    // Initialize auth session using shared hook
    useSession();

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <Slot />
            </ErrorBoundary>
        </QueryClientProvider>
    );
}
