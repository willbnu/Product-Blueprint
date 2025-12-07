import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error
const ThrowingComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>No error</div>;
};

// Suppress console.error for cleaner test output
const originalError = console.error;
beforeEach(() => {
    console.error = vi.fn();
});
afterEach(() => {
    console.error = originalError;
});

describe('ErrorBoundary Component', () => {
    it('renders children when no error occurs', () => {
        render(
            <ErrorBoundary>
                <div>Test content</div>
            </ErrorBoundary>
        );
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders error UI when an error occurs', () => {
        render(
            <ErrorBoundary>
                <ThrowingComponent />
            </ErrorBoundary>
        );
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('displays try again button', () => {
        render(
            <ErrorBoundary>
                <ThrowingComponent />
            </ErrorBoundary>
        );
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('displays reload page button', () => {
        render(
            <ErrorBoundary>
                <ThrowingComponent />
            </ErrorBoundary>
        );
        expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();
    });

    it('renders custom fallback when provided', () => {
        render(
            <ErrorBoundary fallback={<div>Custom error message</div>}>
                <ThrowingComponent />
            </ErrorBoundary>
        );
        expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });
});
