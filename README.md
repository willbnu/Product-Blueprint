# 🚀 Full-Stack App Template

> A production-ready, full-stack monorepo template for building cross-platform applications with Expo (mobile) and React (web), powered by Nx and Supabase.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Nx](https://img.shields.io/badge/Nx-Monorepo-143055.svg)](https://nx.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_50+-000020.svg)](https://expo.dev/)

## 📋 Table of Contents

- [PRD-First Workflow](#-prd-first-workflow-start-here)
- [Quick Start](#-quick-start)
- [What's Included](#-whats-included)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 📝 PRD-First Workflow (START HERE!)

**Before writing code, start with a Product Requirements Document (PRD).**

### Why PRD-First?

A well-written PRD is your blueprint for success. It ensures:
- ✅ Clear product vision and goals
- ✅ Aligned stakeholder expectations
- ✅ Well-defined requirements before coding
- ✅ Faster development with fewer pivots
- ✅ Better product-market fit

### Get Started with PRD

```bash
# 1. Explore PRD templates and examples
cd prd/

# 2. Copy the template for your app
cp prd/templates/prd-template.md prd/my-awesome-app.md

# 3. Fill out your PRD (use examples as reference)
# See: prd/examples/todo-app-prd.md

# 4. Get stakeholder approval

# 5. Use this template to build your app!
```

**📖 Complete PRD Guide:** [prd/README.md](./prd/README.md)

**🎯 Example PRDs:**
- [Todo App](./prd/examples/todo-app-prd.md) - Simple CRUD app (1-2 weeks)
- More examples coming soon!

---

## 🎯 What is This?

This is a **production-ready app template** that you can duplicate to start any new full-stack application. It provides:

- ✅ **Mobile app** (iOS & Android) with Expo
- ✅ **Web app** with React + Vite
- ✅ **Shared libraries** for UI, data, and state
- ✅ **Backend** with Supabase (PostgreSQL, Auth, Edge Functions)
- ✅ **Monorepo** tooling with Nx
- ✅ **CI/CD** pipelines ready to deploy
- ✅ **Testing** infrastructure (unit, integration, e2e)
- ✅ **Type-safe** API contracts with TypeScript

## ⚡ Quick Start

### Prerequisites

- **Node.js** 20+ ([install via nvm](https://github.com/nvm-sh/nvm))
- **pnpm** 8+ (`npm install -g pnpm`)
- **Git** 2.40+

### 5-Minute Setup

```bash
# 1. Use this template (click "Use this template" on GitHub)
#    OR clone directly:
git clone https://github.com/YOUR-ORG/YOUR-APP-NAME.git
cd YOUR-APP-NAME

# 2. Run the automated setup script
./scripts/setup-template.sh

# 3. Install dependencies
pnpm install

# 4. Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 5. Start development
pnpm dev:mobile  # Start Expo (mobile)
pnpm dev:web     # Start Vite (web)
```

**📖 Need detailed setup instructions?** See [SETUP.md](./SETUP.md)

## 📦 What's Included

### Applications

| App | Description | Port |
|-----|-------------|------|
| **apps/mobile** | React Native + Expo app (iOS & Android) | Expo Dev Tools |
| **apps/web** | React + Vite web application | 3000 |

### Shared Libraries

| Library | Description |
|---------|-------------|
| **@app/shared-ui** | Cross-platform UI components with NativeWind/Tailwind |
| **@app/data** | Data fetching, Supabase client, tRPC utilities |
| **@app/state** | Zustand stores with MMKV/IndexedDB persistence |
| **@app/utils** | Shared utilities, validators, formatters |

### Infrastructure

- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **CI/CD:** GitHub Actions workflows
- **Testing:** Jest, Testing Library, Playwright, Detox
- **Code Quality:** ESLint, Prettier, Husky, lint-staged
- **Tooling:** Nx task orchestration, pnpm workspaces

## 🛠️ Tech Stack

### Frontend

- **Mobile:** [Expo](https://expo.dev/) (SDK 50+) + [Expo Router](https://docs.expo.dev/router/introduction/)
- **Web:** [React](https://react.dev/) 18 + [Vite](https://vitejs.dev/) 5
- **Styling:** [NativeWind](https://www.nativewind.dev/) (mobile) + [Tailwind CSS](https://tailwindcss.com/) (web)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (mobile) + [React Router](https://reactrouter.com/) (web)
- **State:** [Zustand](https://zustand-demo.pmnd.rs/) + [MMKV](https://github.com/mrousavy/react-native-mmkv)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query) v5
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend

- **Database:** [Supabase](https://supabase.com/) (PostgreSQL 15+)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Serverless:** Supabase Edge Functions (Deno)
- **API Layer:** [tRPC](https://trpc.io/) for type-safe APIs

### DevOps & Tooling

- **Monorepo:** [Nx](https://nx.dev/) 18+
- **Package Manager:** [pnpm](https://pnpm.io/) 8+
- **Language:** [TypeScript](https://www.typescriptlang.org/) 5+
- **Linting:** [ESLint](https://eslint.org/) 8+
- **Formatting:** [Prettier](https://prettier.io/) 3+
- **Git Hooks:** [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged)
- **Testing:** [Jest](https://jestjs.io/), [Playwright](https://playwright.dev/), [Detox](https://wix.github.io/Detox/)
- **CI/CD:** GitHub Actions

## 📁 Project Structure

```
.
├── prd/                    # 📝 START HERE - Product Requirements
│   ├── README.md          # PRD workflow guide
│   ├── templates/         # PRD templates
│   ├── examples/          # Example PRDs (todo app, etc.)
│   └── guides/            # How to write effective PRDs
│
├── apps/
│   ├── mobile/              # Expo mobile application
│   │   ├── app/            # Expo Router file-based routing
│   │   ├── components/     # Mobile-specific components
│   │   └── project.json    # Nx project configuration
│   └── web/                # React web application
│       ├── src/
│       │   ├── app/        # Application routes
│       │   ├── components/ # Web-specific components
│       │   └── main.tsx    # Entry point
│       └── project.json
│
├── libs/
│   └── @app/
│       ├── shared-ui/      # Shared UI components & design system
│       ├── data/           # API clients, data fetching hooks
│       ├── state/          # Global state management
│       └── utils/          # Shared utilities
│
├── supabase/
│   ├── migrations/         # Database migrations
│   ├── functions/          # Edge Functions
│   └── config.toml         # Supabase configuration
│
├── docs/                   # Detailed documentation
│   ├── ARCHITECTURE.md     # System architecture
│   ├── API.md             # API documentation
│   ├── LIBRARIES.md       # Library usage guides
│   ├── MOBILE.md          # Mobile development
│   ├── WEB.md             # Web development
│   ├── BACKEND.md         # Backend setup
│   ├── CICD.md            # CI/CD pipelines
│   └── ENVIRONMENT.md     # Environment variables
│
├── .github/
│   ├── workflows/          # CI/CD workflows
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
│
├── scripts/                # Automation scripts
├── tools/                  # Custom Nx generators & executors
│
├── nx.json                 # Nx workspace configuration
├── tsconfig.base.json      # TypeScript base configuration
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── .env.example            # Environment variable template
└── package.json            # Root package.json
```

## 📚 Documentation

### Getting Started
- **[Setup Guide](./SETUP.md)** - Detailed installation and configuration
- **[Development Workflow](./DEVELOPMENT.md)** - Day-to-day development guide
- **[Environment Variables](./docs/ENVIRONMENT.md)** - All environment configuration

### Architecture & Design
- **[Architecture Overview](./ARCHITECTURE.md)** - System design and decisions
- **[Project Libraries](./docs/LIBRARIES.md)** - Guide to shared libraries
- **[API Documentation](./docs/API.md)** - Backend API contracts

### Platform-Specific
- **[Mobile Development](./docs/MOBILE.md)** - Expo and React Native guide
- **[Web Development](./docs/WEB.md)** - React and Vite guide
- **[Backend Development](./docs/BACKEND.md)** - Supabase and Edge Functions

### Operations
- **[Testing Strategy](./TESTING.md)** - Unit, integration, and e2e tests
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to production
- **[CI/CD Pipelines](./docs/CICD.md)** - Automated workflows
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions

### Contributing
- **[Contributing Guidelines](./CONTRIBUTING.md)** - How to contribute
- **[Code of Conduct](./CODE_OF_CONDUCT.md)** - Community standards
- **[Security Policy](./SECURITY.md)** - Security reporting

### Planning
- **[Roadmap](./ROADMAP.md)** - Future features and improvements
- **[Changelog](./CHANGELOG.md)** - Version history

## 🎨 Key Features

### Cross-Platform UI
- Shared design system with NativeWind (mobile) and Tailwind (web)
- Consistent theming and dark mode support
- Reusable components across platforms

### Type-Safe Development
- End-to-end TypeScript from database to UI
- Zod schemas for runtime validation
- tRPC for type-safe API contracts
- Auto-generated types from Supabase

### Offline-First Architecture
- TanStack Query with persistent cache
- MMKV for fast mobile storage
- IndexedDB for web storage
- Optimistic updates and conflict resolution

### Developer Experience
- Hot reload on mobile and web
- Fast builds with Nx computation caching
- Code generation with Nx generators
- Pre-commit hooks for code quality
- VS Code workspace configuration

### Production-Ready
- Authentication flow with Supabase Auth
- Row Level Security (RLS) policies
- Error tracking (Sentry ready)
- Analytics (PostHog ready)
- Automated deployments

## 🚀 Common Commands

```bash
# Development
pnpm dev:mobile          # Start Expo mobile app
pnpm dev:web            # Start Vite web app
pnpm dev:all            # Start all apps

# Building
pnpm build              # Build all apps
pnpm build:mobile       # Build mobile app
pnpm build:web          # Build web app

# Testing
pnpm test               # Run all tests
pnpm test:watch         # Run tests in watch mode
pnpm test:mobile        # Test mobile app
pnpm test:web          # Test web app
pnpm e2e               # Run e2e tests

# Code Quality
pnpm lint              # Lint all projects
pnpm format            # Format all files
pnpm typecheck         # Type check all projects

# Nx Commands
nx graph               # View dependency graph
nx affected:test       # Test affected projects
nx affected:build      # Build affected projects
nx reset               # Clear Nx cache
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Built with amazing open-source tools:
- [Nx](https://nx.dev/) - Smart monorepo tooling
- [Expo](https://expo.dev/) - Universal React applications
- [Supabase](https://supabase.com/) - Open-source Firebase alternative
- [TanStack](https://tanstack.com/) - High-quality React tools
- [NativeWind](https://www.nativewind.dev/) - Tailwind for React Native

## 💬 Support

- 📖 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/YOUR-ORG/YOUR-APP/issues)
- 💬 [Discussions](https://github.com/YOUR-ORG/YOUR-APP/discussions)

## 🗺️ Roadmap

See our [Roadmap](./ROADMAP.md) for planned features and improvements.

---

**⭐ If you find this template useful, please consider giving it a star!**

Made with ❤️ by [Your Team/Organization]
