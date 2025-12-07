import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact';

// Mock the supabase module
vi.mock('@/lib/supabase', () => ({
    submitContact: vi.fn(() => Promise.resolve({ success: true, data: null })),
}));

describe('Contact Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the contact form', () => {
        render(<Contact />);
        expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument();
    });

    it('renders all form fields', () => {
        render(<Contact />);
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
        render(<Contact />);
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty required fields', async () => {
        const user = userEvent.setup();
        render(<Contact />);

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        });
    });

    it('shows validation error for invalid email', async () => {
        const user = userEvent.setup();
        render(<Contact />);

        const emailInput = screen.getByLabelText(/email/i);
        await user.type(emailInput, 'invalid-email');

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
        });
    });

    it('has proper accessibility attributes on form fields', () => {
        render(<Contact />);

        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const messageInput = screen.getByLabelText(/message/i);

        expect(nameInput).toHaveAttribute('aria-required', 'true');
        expect(emailInput).toHaveAttribute('aria-required', 'true');
        expect(messageInput).toHaveAttribute('aria-required', 'true');
    });

    it('renders contact information section', () => {
        render(<Contact />);
        expect(screen.getByText(/let's work together/i)).toBeInTheDocument();
        expect(screen.getByText(/have a project in mind/i)).toBeInTheDocument();
    });
});
