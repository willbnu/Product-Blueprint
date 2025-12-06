import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    label?: string;
}

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
};

export function LoadingSpinner({
    size = 'md',
    className = '',
    label = 'Loading...',
}: LoadingSpinnerProps) {
    return (
        <div
            className={`flex items-center justify-center ${className}`}
            role="status"
            aria-label={label}
        >
            <motion.div
                className={`${sizeClasses[size]} border-2 border-gray-700 border-t-accent-purple rounded-full`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <span className="sr-only">{label}</span>
        </div>
    );
}

export function LoadingPage({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg">
            <LoadingSpinner size="lg" label={message} />
            <p className="mt-4 text-gray-400 text-sm">{message}</p>
        </div>
    );
}

export function LoadingSection({ message = 'Loading content...' }: { message?: string }) {
    return (
        <div className="min-h-[300px] flex flex-col items-center justify-center">
            <LoadingSpinner size="md" label={message} />
            <p className="mt-3 text-gray-500 text-sm">{message}</p>
        </div>
    );
}

export default LoadingSpinner;
