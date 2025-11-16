# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned for v1.0.0 (Production Ready)
- Actual Nx workspace implementation (apps and libs)
- Runnable mobile and web applications
- Working Supabase integration
- Executable code examples
- End-to-end functional template

### Planned for v0.2.0
- Figma design templates
- Additional PRD examples (social app, e-commerce)
- PRD guides (how-to-write, best-practices, prd-to-implementation)
- Additional template specs (feature-spec.md, technical-spec.md)
- Winston/Pino logging integration for production deployments
- Asynchronous file I/O for TOON generation in server environments

---

## [0.2.0] - 2025-11-16

**TOON INTEGRATION & COMPLIANCE** - Agent optimization layer with enterprise-grade audit logging

### Added
- **TOON (Token-Oriented Object Notation) System**
  - Custom markdown-to-JSON converter for AI agent optimization (60-85% token savings)
  - Stack-based hierarchical parser preserving nested document structure (h2-h6)
  - Multi-line list item parsing with continuation line tracking
  - Batch generation tool with glob pattern matching and priority ordering
  - Automated TOON file generation via `npm run toon:generate`
  - Configuration system (`.toon/config.json`) for include/exclude patterns
  - Daily rotating audit logs in `.toon/logs/audit-YYYY-MM-DD.log`

- **Enterprise Compliance Features**
  - Structured JSON audit logging with ISO 8601 timestamps
  - Error categorization system (VALIDATION, SECURITY, SYSTEM, IO)
  - Security event tracking for path validation and access attempts
  - Comprehensive log sanitization preventing PII/sensitive data exposure
  - Dual logging: human-readable console + machine-readable JSON files
  - Log levels: INFO, WARN, ERROR, SECURITY, AUDIT

- **Intellectual Property Protection**
  - Comprehensive COPYRIGHT file declaring ownership and rights
  - NOTICE file with third-party attributions and CLA terms
  - Contributor License Agreement in CONTRIBUTING.md
  - Proper attribution to TOON format creator (Johann Schopplich)
  - Updated package.json with repository metadata
  - Copyright headers in all TOON tool source files

### Changed
- **Enhanced Security**
  - Path traversal validation now checks original string before normalization
  - Security events logged with attempted path and block reason
  - All file operations tracked in audit logs

- **Improved Documentation**
  - README.md now includes TOON format attribution
  - Updated acknowledgments section with proper credits
  - Clarified copyright ownership vs. third-party formats

### Fixed
- **Critical Parser Bugs**
  - Nested headings (h3-h6) now properly preserved in subsections tree
  - Multi-line list items no longer truncated at first line
  - Glob pattern matching now correctly handles `**` (any depth) vs `*` (single level)
  - Path separators normalized for cross-platform compatibility
  - Special regex characters properly escaped in glob patterns

- **Security Vulnerabilities**
  - Path traversal attempts blocked and logged
  - Output paths validated to stay within `.toon/` directory
  - GitHub Action permissions restricted to least privilege

- **Code Quality**
  - Array handling in log sanitization (arrays no longer converted to objects)
  - File validation errors categorized as VALIDATION_ERROR vs SECURITY_ERROR
  - Missing `pull_request` trigger added to GitHub workflow

### Security
- All path validation attempts logged to audit trail
- Security errors categorized separately from general errors
- No stack traces exposed in user-facing error messages
- Log sanitization prevents leaking home directory paths
- Sensitive keys (password, token, secret, key) automatically redacted

### Noted
- TOON format specification is copyright Johann Schopplich (MIT License)
- This implementation provides tooling based on the TOON spec
- Audit logs written to `.toon/logs/` for compliance review
- All TOON files are auto-generated and should not be manually edited

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
- Fixed placeholder URL consistency: ChatGPT-Workspace → YOUR-REPO

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
