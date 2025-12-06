import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-500" aria-hidden="true" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-gray-400 mb-6">
                            We encountered an unexpected error. Please try again or refresh the page.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-dark-bg"
                                aria-label="Try again"
                            >
                                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-dark-bg"
                                aria-label="Reload page"
                            >
                                Reload Page
                            </button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-8 text-left">
                                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-400">
                                    Error details (development only)
                                </summary>
                                <pre className="mt-2 p-4 bg-gray-900 rounded-lg text-xs text-red-400 overflow-auto">
                                    {this.state.error.message}
                                    {'\n\n'}
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
