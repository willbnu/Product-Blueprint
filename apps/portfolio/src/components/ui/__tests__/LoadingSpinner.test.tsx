import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner, LoadingPage, LoadingSection } from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
    it('renders with default props', () => {
        render(<LoadingSpinner />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
        render(<LoadingSpinner label="Loading data..." />);
        expect(screen.getByLabelText('Loading data...')).toBeInTheDocument();
    });

    it('has sr-only text for screen readers', () => {
        render(<LoadingSpinner label="Custom loading" />);
        expect(screen.getByText('Custom loading')).toHaveClass('sr-only');
    });

    it('applies size classes correctly', () => {
        const { container: smallContainer } = render(<LoadingSpinner size="sm" />);
        expect(smallContainer.querySelector('.w-4')).toBeInTheDocument();

        const { container: largeContainer } = render(<LoadingSpinner size="lg" />);
        expect(largeContainer.querySelector('.w-12')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<LoadingSpinner className="my-custom-class" />);
        expect(container.firstChild).toHaveClass('my-custom-class');
    });
});

describe('LoadingPage Component', () => {
    it('renders loading page with message', () => {
        render(<LoadingPage message="Loading your portfolio..." />);
        expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading your portfolio...');
    });

    it('renders loading page with default message', () => {
        render(<LoadingPage />);
        expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...');
    });
});

describe('LoadingSection Component', () => {
    it('renders loading section with message', () => {
        render(<LoadingSection message="Fetching projects..." />);
        expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Fetching projects...');
    });

    it('renders loading section with default message', () => {
        render(<LoadingSection />);
        expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading content...');
    });
});
