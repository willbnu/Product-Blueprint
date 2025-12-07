# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Improved workspace startup performance by optimizing the `onStart` hook in `.idx/dev.nix`.** The script now intelligently checks if `package.json` or lockfiles have changed before running `npm install`, avoiding unnecessary executions. This addresses feedback from PR #35.

### Fixed
- Corrected the dependency installation logic to run on every workspace start (`onStart`) instead of only on creation (`onCreate`), ensuring dependencies stay in sync across branch changes. This addresses feedback from PR #34.
- Repaired a corrupted `.idx/dev.nix` file and established the initial automated dependency installation.

### Planned
- E2E tests with Playwright and Detox
- tRPC API layer integration
- CI/CD workflows for app builds

---

## [2.1.0] - 2025-12-06

**🔧 PRIORITY FIXES** - Quality improvements and developer experience

### Added
- **App READMEs**: Added `README.md` to both `apps/mobile` and `apps/web` with:
  - Quick start guides
  - Project structure documentation
  - Environment setup instructions
  - Build and development commands
- **Environment Examples**: Created `.env.example` files in both apps for easy configuration

### Fixed
- **Mobile TypeScript Config**: Fixed `tsconfig.json` structure
  - Moved `extends` before `compilerOptions` (proper JSON extends behavior)
  - Removed redundant settings inherited from `expo/tsconfig.base`
- **Type Safety**: Fixed implicit `any` type in `login.tsx` selector function

### Changed
- Improved mobile app TypeScript configuration for better IDE support

---

## [2.0.0] - 2025-12-06

**🚀 CODE IMPLEMENTATION RELEASE** - Working apps, not just documentation!

This is a major milestone: Product-Blueprint now includes working code for mobile and web applications.

### Added

#### Expo Mobile App (`apps/mobile/`)
- **Expo SDK 52** with Expo Router 4 for file-based routing
- **NativeWind 4** for Tailwind CSS styling in React Native
- **Supabase Auth** integration with SecureStore for token storage
- **Zustand** state management with auth store
- **TanStack Query** for server state management
- Complete screens:
  - Login screen with form validation
  - Registration screen with password confirmation
  - Home dashboard with feature checklist
  - Profile screen with sign-out functionality
- Tab navigation with Home and Profile tabs
- Dark mode support via NativeWind

#### React Web App (`apps/web/`)
- **React 18** with **Vite 6** for lightning-fast development
- **Tailwind CSS 3.4** with custom color palette
- **React Router 7** with protected routes
- **Supabase Auth** integration
- **Zustand** state management with auth store
- **TanStack Query** for data fetching
- Complete pages:
  - Login page with form validation
  - Registration page with password matching
  - Dashboard with feature cards and user info
- Responsive design with dark mode support

#### Shared Libraries (`libs/shared/`)
- **Zod** validation schemas (login, register, user profile)
- TypeScript type definitions (ApiResponse, Pagination, AuthUser)
- Utility functions (debounce, formatDate, truncate, generateId)
- Cross-platform compatible code

#### Developer Tooling
- **GitHub Release Automation** (`tools/release.js`)
  - Create releases via CLI: `pb release v2.0.0`
  - Reads release notes from CHANGELOG
  - Supports `--draft` and `--prerelease` flags
- **Alternative Database Guide** (`docs/ALTERNATIVE_DATABASES.md`)
  - Integration guides for Convex, Firebase, Vercel Postgres, PlanetScale, Neon
  - Decision table for choosing backends

### Changed
- Updated monorepo structure with `apps/` and `libs/` directories
- Enhanced `nx.json` with workspace layout configuration
- Updated `pnpm-workspace.yaml` to include apps/* and libs/*
- Updated `tsconfig.base.json` with path aliases
- Improved documentation cross-references for alternative databases
- Fixed mermaid diagram links in README to use absolute GitHub URLs

### Technical Details
| Component | Technology | Version |
|-----------|------------|---------|
| Mobile Framework | Expo | SDK 52 |
| Mobile Router | Expo Router | 4.x |
| Mobile Styling | NativeWind | 4.x |
| Web Framework | React | 18.3 |
| Web Bundler | Vite | 6.x |
| Web Styling | Tailwind CSS | 3.4 |
| State Management | Zustand | 5.x |
| Server State | TanStack Query | 5.x |
| Database | Supabase | 2.45+ |
| Validation | Zod | 3.x |

---

## [1.1.0] - 2025-12-06

**ENHANCED DEVELOPER EXPERIENCE** - Automation and tooling improvements

### Added
- **Renovate Integration**: Automated dependency updates via `.github/renovate.json`
  - Auto-merge for patch and minor updates
  - Grouped updates for Nx and React packages
  - Scheduled for Monday mornings
- **Nx Generators**: Custom generators for common patterns
  - PRD scaffolding generator in `tools/generators/prd/`
  - Registered in `nx.json` for easy access
- **TypeScript Path Aliases**: Added `tsconfig.base.json` with clean import paths
  - `@app/shared`, `@app/ui`, `@app/api`, `@app/utils`
- **Interactive Setup Wizard**: `tools/setup-wizard.js` for project configuration
  - Prompts for project name, platforms, auth provider
  - Generates `.env.example` with project-specific values

### Changed
- Updated ROADMAP.md to reflect completed v1.1 features
- Enhanced documentation with v1.1 feature descriptions

---



## [0.1.0] - 2025-11-16

**INITIAL BLUEPRINT RELEASE** - Comprehensive architectural documentation and best practices

> ⚠️ **Important:** This is a **documentation-only release**. No executable code is included.
> This blueprint provides architectural patterns, security implementations, and best practices
> for building production-ready applications. Use it as a guide for your own implementation.

### Added
- **Comprehensive Audit Logging Documentation**
  - Complete database schema design for `audit_logs` table
  - SQL examples for indexes, RLS policies, and triggers
  - TypeScript patterns for application-level logging (`lib/audit.ts`)
  - Usage examples for authentication and data export events
  - Query examples (failed logins, user activity, security events)
  - 90-day retention policy with automated cleanup patterns
  - Compliance mapping (SOC 2, HIPAA, GDPR, PCI DSS, ISO 27001)

- **Production-Quality Error Handling Patterns**
  - Comprehensive try-catch block examples
  - Rate limiting patterns with graceful error handling
  - Input validation with Zod including edge case handling
  - Database error code mapping examples (23505, 23503, 42501)
  - User-friendly error message patterns (no stack traces exposed)
  - Structured error response patterns ({ success, data/error })
  - 16+ edge cases explicitly documented

- **Expanded Security Checklist**
  - New "Audit Logging" section (9 checklist items)
  - New "Error Handling" section (7 checklist items)
  - Updated API section with error handling requirements

### Changed
- Updated all code examples to include production-ready error handling patterns
- Enhanced rate limiting example with fail-open/fail-closed decision points
- Improved input validation with comprehensive edge case coverage

### Noted
- **This release contains documentation and architectural patterns only**
- No executable code or working applications included
- Intended as a blueprint for building your own production-ready apps
- Actual implementation planned for v1.0.0

---

## [0.0.4] - 2025-11-16

### Added
- **Code-First Quick Start** documentation for rapid prototyping
  - Added "Quick Start (Code-First)" section to README.md
  - Added "Choose Your Path" to GETTING_STARTED.md
  - Users can now choose: Path A (Code-First) or Path B (PRD-First, recommended)

### Changed
- Reframed PRD workflow as "Recommended" instead of mandatory
- Removed duplicate setup instructions from GETTING_STARTED.md
- Linked PRD path to code-first quick start for better flow

### Fixed
- Marked non-existent files as "(Coming Soon)" in prd/README.md
  - social-app-prd.md, ecommerce-app-prd.md
  - feature-spec.md, technical-spec.md
  - how-to-write-prd.md, prd-to-implementation.md, best-practices.md
- Removed unused `order` field from MVP data model in todo-app-prd.md
- Fixed placeholder URL consistency: Product-Blueprint → YOUR-REPO

### Noted
- Intentionally kept specific tech stack versions (Expo SDK 50+, React 18, etc.)
  - Template is purposefully opinionated for faster onboarding
  - Users can customize as needed for their projects

---

## [0.0.3] - 2025-11-16

### Added
- **Complete Security Implementation Guide** (`docs/SECURITY_IMPLEMENTATION.md`)
  - Row Level Security (RLS) with explicit SQL examples
  - Cross-tenant access verification testing procedures
  - Advanced RLS patterns (public+private, role-based, shared access)
  - Authentication security (password requirements, session management, MFA)
  - Secret management (safe vs. unsafe secrets, rotation procedures)
  - API security (rate limiting, input validation, CORS)
  - Data protection (encryption, PII compliance)
  - Frontend security (XSS prevention, CSP)
  - CI/CD security (GitHub Actions secrets)
  - Comprehensive security checklist (50+ items)

### Changed
- **Enhanced PRD Example Security** (prd/examples/todo-app-prd.md)
  - Added explicit RLS SQL policy examples for all CRUD operations
  - Added cross-tenant access verification SQL examples
  - Expanded authentication requirements (password complexity, session timeout, MFA)
  - Added API security details (rate limiting, CORS, SQL injection prevention)
  - Added data protection compliance (GDPR/CCPA)

### Security
- **Addressed 3 Security Compliance Issues**
  1. **RLS Implementation** - Now explicit and verifiable (no insecure defaults)
  2. **Secret Management** - Added prominent warnings throughout
     - Security warnings in .env.example
     - Security checklist in GETTING_STARTED.md
     - Gitignore verification in setup process
  3. **Branch Protection** - Strengthened rules
     - Required approvals: 1 → 2
     - Added signed commit requirement
     - Added linear history requirement
     - Added review dismissal restrictions
     - Added production-specific rules (3+ approvals)

---

## [0.0.2] - 2025-11-15

### Added
- **PRD (Product Requirements Document) System Documentation**
  - Complete PRD workflow guide (prd/README.md)
  - Comprehensive PRD template (prd/templates/prd-template.md)
  - Full todo app example (prd/examples/todo-app-prd.md)
  - PRD-first development workflow documentation
  - Updated README.md to highlight PRD as starting point
  - Created GETTING_STARTED.md as main entry point

- **Complete Design System Documentation**
  - Design system overview (design-system/README.md)
  - Comprehensive design tokens (design-system/DESIGN_TOKENS.md - 2,347 lines)
    - Color system (10 shades for primary, secondary, neutral, etc.)
    - Typography scale (6 sizes, 4 weights)
    - Spacing scale (4px grid system)
    - Shadows, border radius, z-index
  - Figma integration guide (design-system/FIGMA.md)
    - Tokens Studio plugin setup
    - Sync workflow (Figma → GitHub → Code)
  - Design-to-code workflow (design-system/WORKFLOW.md)
    - 7-phase process (Design → Review → Handoff → Implementation → QA → Iteration → Ship)
    - Design QA process
    - Handoff documentation examples

### Changed
- Updated main README.md with PRD-first workflow section
- Updated project structure to show prd/ and design-system/ folders
- Enhanced documentation navigation with design system links

---

## [0.0.1] - 2025-11-15

### Added
- **Comprehensive Documentation** (22+ markdown files)
  - README.md - Main project overview
  - SETUP.md - Detailed installation guide (19.4KB)
  - ARCHITECTURE.md - System design and decisions
  - DEVELOPMENT.md - Day-to-day workflows
  - TESTING.md - Testing strategies
  - DEPLOYMENT.md - Multi-platform deployment
  - TROUBLESHOOTING.md - Common issues and solutions
  - CONTRIBUTING.md - Contribution guidelines
  - CODE_OF_CONDUCT.md - Community standards
  - SECURITY.md - Security policy
  - ROADMAP.md - Future plans
  - LICENSE - MIT License

- **Documentation Subdirectories**
  - docs/LIBRARIES.md - Shared library usage
  - docs/ENVIRONMENT.md - Environment variable reference

- **GitHub Templates**
  - .github/PULL_REQUEST_TEMPLATE.md
  - .github/ISSUE_TEMPLATE/bug_report.md
  - .github/ISSUE_TEMPLATE/feature_request.md
  - .github/REPOSITORY_INFO.md - Repository setup guide

- **Configuration Files**
  - .gitignore - Comprehensive ignore patterns
  - .env.example - Environment template with examples
  - .nvmrc - Node version specification (v20)
  - .editorconfig - Editor configuration

- **Project Infrastructure** (Documentation Only)
  - Nx monorepo architecture documentation
  - Cross-platform setup guidance (Expo mobile + React web)
  - Supabase backend integration guide
  - TanStack Query + Zustand state management patterns
  - NativeWind/Tailwind styling guide
  - Testing setup documentation (Jest, Playwright, Detox)
  - CI/CD workflows documentation (GitHub Actions)

### Noted
- This version is **documentation-only**
- No actual code implementation yet
- Template structure and patterns for teams to build apps from

---

## How to Update This File

### Version Numbers

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** version (1.x.x): Incompatible API changes
- **MINOR** version (x.1.x): New functionality, backwards-compatible
- **PATCH** version (x.x.1): Backwards-compatible bug fixes

### Categories

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** in case of vulnerabilities
- **Noted** for important clarifications

### Creating a New Release

1. **Update this CHANGELOG.md**
   - Move items from [Unreleased] to new version section
   - Add release date in YYYY-MM-DD format
   - Use appropriate categories (Added, Changed, Fixed, Security, Noted)

2. **Push commits and create git tag**
   ```bash
   # First, push your changes to the main branch
   git push origin main

   # Then, create an annotated tag for the release
   git tag -a vX.Y.Z -m "Release vX.Y.Z: Description"

   # Push all tags to the remote repository
   git push --tags
   ```

3. **Create GitHub Release**
   - Go to Releases → Draft a new release
   - Select tag
   - Copy changelog entry as release notes
   - Publish release

### Example Entry

```markdown
## [1.1.0] - 2025-12-01

### Added
- Dark mode support across all platforms
- User profile screen with avatar upload
- Push notifications for mobile

### Changed
- Updated dependencies to latest versions
- Improved authentication flow with better error messages

### Fixed
- Fixed login button not responding on iOS
- Resolved memory leak in data fetching

### Security
- Updated Supabase client to patch CVE-2024-XXXX
```
