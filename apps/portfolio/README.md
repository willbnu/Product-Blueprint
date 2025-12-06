# Designer Portfolio

A stunning, production-ready portfolio website for Product Designers built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Part of the Product-Blueprint monorepo.

## Features

- Modern dark theme with gradient accents
- Smooth animations with Framer Motion
- Fully responsive design (mobile-first)
- Supabase backend integration (optional)
- Comprehensive test coverage
- WCAG 2.1 Level AA accessible
- SEO optimized
- Lightning-fast with Vite 6

## Quick Start

### Development

```bash
# From monorepo root
pnpm portfolio:dev

# Or from portfolio directory
cd apps/portfolio
npm run dev
```

The development server will start at `http://localhost:3000`

### Build

```bash
# From monorepo root
pnpm portfolio:build

# Or from portfolio directory
cd apps/portfolio
npm run build
```

### Test

```bash
cd apps/portfolio

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
apps/portfolio/
├── src/
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Layout
│   │   ├── sections/         # Hero, Projects, About, Contact
│   │   ├── ui/               # Reusable UI components
│   │   └── ErrorBoundary.tsx # Error handling
│   ├── pages/
│   │   ├── Home.tsx          # Landing page
│   │   └── CaseStudy.tsx     # Project detail page
│   ├── data/
│   │   └── projects.ts       # Project data
│   ├── lib/
│   │   └── supabase.ts       # Supabase client & API
│   ├── test/
│   │   └── setup.ts          # Test configuration
│   └── index.css             # Global styles
├── vitest.config.ts          # Test configuration
├── .env.example              # Environment variables template
└── package.json
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI Framework |
| TypeScript | 5.6 | Type Safety |
| Vite | 6.0 | Build Tool |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11.11 | Animations |
| React Router | 7.0 | Routing |
| React Hook Form | 7.53 | Form Handling |
| Supabase | 2.45 | Backend (Optional) |
| TanStack Query | 5.60 | Data Fetching |
| Vitest | 2.1 | Testing |
| Lucide React | 0.460 | Icons |

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Supabase (Optional - works without for static mode)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Analytics (Optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

**Note:** If Supabase is not configured, the portfolio works in "static mode":
- Projects are loaded from `src/data/projects.ts`
- Contact form submissions are logged to console

### Supabase Setup (Optional)

If you want dynamic data and real contact form submissions:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schemas in `prd/schemas/`:
   - `portfolio_contacts.sql` - Contact form table
   - `portfolio_projects.sql` - Projects CMS table
3. Copy your project URL and anon key to `.env.local`

## Customization

### Colors

Edit `tailwind.config.js` to change the color palette:

```js
colors: {
    accent: {
        purple: '#a855f7',
        pink: '#ec4899',
        blue: '#3b82f6',
        cyan: '#06b6d4',
    },
    dark: {
        bg: '#0a0a0a',
        surface: '#141414',
        border: '#262626',
    }
}
```

### Projects

**Static Mode:** Edit `src/data/projects.ts`

**Supabase Mode:** Add/edit projects in your Supabase dashboard (`portfolio_projects` table)

### Content

Update the text in component files:
- `src/components/sections/Hero.tsx` - Main headline and subtitle
- `src/components/sections/About.tsx` - Bio, skills, and stats
- `src/components/sections/Contact.tsx` - Contact information

## Accessibility

This portfolio follows WCAG 2.1 Level AA guidelines:

- Proper semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios meet AA standards
- Form validation with accessible error messages
- Screen reader friendly content

## Testing

Tests are written with Vitest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm run test:coverage

# Run with visual UI
npm run test:ui
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from portfolio directory
cd apps/portfolio
vercel
```

### Quick Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

## Monorepo Integration

This portfolio is part of the Product-Blueprint monorepo and can:

- Import from `@app/shared` for shared utilities
- Import from `@app/ui` for shared UI components
- Use Nx for build orchestration
- Share TypeScript configurations

## License

MIT - See [LICENSE](../../LICENSE) in the monorepo root.

---

**Part of [Product-Blueprint](https://github.com/willbnu/Product-Blueprint)** - A comprehensive template for building production-ready full-stack applications.
