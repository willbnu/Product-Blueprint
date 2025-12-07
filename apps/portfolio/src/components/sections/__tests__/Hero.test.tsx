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

    it('renders CTA links', () => {
        renderHero();
        const viewWorkLink = screen.getByRole('link', { name: /view my work/i });
        const contactLink = screen.getByRole('link', { name: /get in touch/i });
        expect(viewWorkLink).toBeInTheDocument();
        expect(contactLink).toBeInTheDocument();
    });

    it('has navigation links with proper hrefs', () => {
        renderHero();
        const viewWorkLink = screen.getByRole('link', { name: /view my work/i });
        expect(viewWorkLink).toHaveAttribute('href', '#work');
    });

    it('has proper accessibility attributes', () => {
        renderHero();
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/I craft digital/i);
    });
});
