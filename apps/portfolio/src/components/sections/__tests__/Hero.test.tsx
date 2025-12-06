import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../Hero';

const renderHero = () => {
    return render(
        <BrowserRouter>
            <Hero />
        </BrowserRouter>
    );
};

describe('Hero Component', () => {
    it('renders the main heading', () => {
        renderHero();
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders the subtitle/description text', () => {
        renderHero();
        expect(screen.getByText(/product designer/i)).toBeInTheDocument();
    });

    it('renders a CTA button', () => {
        renderHero();
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders navigation links', () => {
        renderHero();
        const viewWorkLink = screen.getByRole('link', { name: /view.*work|projects/i });
        expect(viewWorkLink).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
        renderHero();
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeVisible();
    });
});
