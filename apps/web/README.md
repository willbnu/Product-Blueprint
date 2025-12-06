# Web App (React + Vite)

> **Product Blueprint** - React Web App

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Features

- ⚡ Vite 6 for fast development
- ⚛️ React 18 with TypeScript
- 🎨 Tailwind CSS 3.4
- 🔐 Supabase Authentication
- 📦 Zustand State Management
- 🔄 TanStack Query for data fetching
- 🧭 React Router 7

## Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Project Structure

```
src/
├── main.tsx             # Entry point
├── App.tsx              # Root component with routing
├── index.css            # Global styles
├── lib/
│   └── supabase.ts      # Supabase client
├── stores/
│   └── authStore.ts     # Auth state management
└── pages/
    ├── Login.tsx        # Login page
    ├── Register.tsx     # Registration page
    └── Dashboard.tsx    # Dashboard page
```

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

## Build

```bash
npm run build
```

Output will be in `dist/` directory, ready for deployment.
