# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project template structure
- Nx monorepo setup with pnpm
- Mobile app (Expo + React Native)
- Web app (React + Vite)
- Shared libraries (@app/shared-ui, @app/data, @app/state, @app/utils)
- Supabase integration
- TanStack Query for data fetching
- Zustand for state management
- NativeWind/Tailwind for styling
- Jest + Testing Library for unit tests
- Playwright for web E2E tests
- Detox for mobile E2E tests
- ESLint + Prettier configuration
- Husky + lint-staged for git hooks
- GitHub Actions CI/CD workflows
- Comprehensive documentation

## [1.0.0] - 2024-01-15

### Added
- Initial release of the app template

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

### Example Entry

```markdown
## [1.1.0] - 2024-02-01

### Added
- Dark mode support
- User profile screen
- Push notifications

### Changed
- Updated dependencies to latest versions
- Improved authentication flow

### Fixed
- Fixed login button not responding on iOS
- Resolved memory leak in data fetching

### Security
- Updated Supabase client to patch CVE-2024-XXXX
```

### Creating a New Release

1. **Update version in package.json**
   ```bash
   npm version minor  # or major, patch
   ```

2. **Update this CHANGELOG.md**
   - Move items from [Unreleased] to new version section
   - Add release date

3. **Create git tag**
   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0"
   git push origin v1.1.0
   ```

4. **Create GitHub Release**
   - Go to Releases → Draft a new release
   - Select tag
   - Copy changelog entry
   - Publish release
