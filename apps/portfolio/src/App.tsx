import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import { ErrorBoundary } from './components/ErrorBoundary';

// Create a client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});

function App() {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project/:id" element={<CaseStudy />} />
                    </Routes>
                </Layout>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
