# CI/CD Guide (GitHub Actions)

> **Status:** Documentation-only blueprint (v0.1.0)
>
> This guide provides comprehensive patterns and best practices for implementing continuous integration and continuous deployment pipelines using GitHub Actions.

---

## Table of Contents

- [Overview](#overview)
- [GitHub Actions Basics](#github-actions-basics)
- [Workflow Structure](#workflow-structure)
- [CI Pipeline](#ci-pipeline)
- [CD Pipeline](#cd-pipeline)
- [Mobile CI/CD](#mobile-cicd)
- [Web CI/CD](#web-cicd)
- [Backend CI/CD](#backend-cicd)
- [Environment Management](#environment-management)
- [Secrets Management](#secrets-management)
- [Caching Strategies](#caching-strategies)
- [Testing Automation](#testing-automation)
- [Code Quality Checks](#code-quality-checks)
- [Deployment Strategies](#deployment-strategies)
- [Monitoring and Notifications](#monitoring-and-notifications)
- [Security Scanning](#security-scanning)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

---

## Overview

This template uses **GitHub Actions** for CI/CD, providing:

- **✅ Automated Testing**: Run tests on every push/PR
- **🔍 Code Quality**: ESLint, Prettier, TypeScript checks
- **🔒 Security Scanning**: Dependency vulnerabilities, secrets detection
- **📦 Build Automation**: Automated builds for mobile and web
- **🚀 Deployment**: Automated deployments to staging/production
- **📊 Reporting**: Test coverage, build reports, notifications

### Why GitHub Actions?

✅ **Native Integration**: Built into GitHub
✅ **Free for Public Repos**: Generous free tier for private repos
✅ **Matrix Builds**: Test across multiple environments
✅ **Rich Marketplace**: Thousands of pre-built actions
✅ **Self-Hosted Runners**: Run on your own infrastructure

---

## GitHub Actions Basics

### Workflow File Location

```
.github/
└── workflows/
    ├── ci.yml              # Main CI workflow
    ├── cd-web.yml          # Web deployment
    ├── cd-mobile.yml       # Mobile deployment
    ├── code-quality.yml    # Linting, formatting
    ├── security.yml        # Security scans
    └── dependabot.yml      # Dependency updates
```

### Basic Workflow Syntax

```yaml
# .github/workflows/example.yml
name: Example Workflow

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  example-job:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

---

## Workflow Structure

### Recommended Workflow Organization

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '8'

jobs:
  # Job 1: Setup and validation
  setup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate branch
        run: echo "Branch is valid"

  # Job 2: Lint and format
  lint:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check

  # Job 3: Type check
  typecheck:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  # Job 4: Unit tests
  test:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  # Job 5: Build
  build:
    needs: [lint, typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/
```

---

## CI Pipeline

### Complete CI Workflow

```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '8'

jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      mobile: ${{ steps.filter.outputs.mobile }}
      web: ${{ steps.filter.outputs.web }}
      backend: ${{ steps.filter.outputs.backend }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            mobile:
              - 'apps/mobile/**'
              - 'libs/**'
            web:
              - 'apps/web/**'
              - 'libs/**'
            backend:
              - 'supabase/**'

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Run ESLint
        run: pnpm lint
      - name: Check formatting
        run: pnpm format:check

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Type check
        run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Run tests
        run: pnpm test:coverage
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        if: matrix.node-version == 20
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/coverage-final.json
          fail_ci_if_error: true

  build-web:
    needs: changes
    if: needs.changes.outputs.web == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build web app
        run: pnpm nx build web
      - name: Upload build
        uses: actions/upload-artifact@v3
        with:
          name: web-build
          path: dist/apps/web/

  build-mobile:
    needs: changes
    if: needs.changes.outputs.mobile == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build mobile app
        run: pnpm nx build mobile
```

---

## CD Pipeline

### Web Deployment (Vercel)

```yaml
# .github/workflows/cd-web.yml
name: Deploy Web to Vercel

on:
  push:
    branches: [main]
    paths:
      - 'apps/web/**'
      - 'libs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://your-app.vercel.app

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm nx build web
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./dist/apps/web

      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        if: always()
        with:
          status: ${{ job.status }}
          text: 'Web deployment to production'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Web Deployment (Netlify)

```yaml
# .github/workflows/cd-web-netlify.yml
name: Deploy Web to Netlify

on:
  push:
    branches: [main]
    paths:
      - 'apps/web/**'
      - 'libs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm nx build web
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist/apps/web'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: 'Deploy from GitHub Actions'
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Mobile CI/CD

### iOS Build with EAS

```yaml
# .github/workflows/cd-mobile-ios.yml
name: Deploy iOS to App Store

on:
  push:
    branches: [main]
    paths:
      - 'apps/mobile/**'
      - 'libs/**'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build iOS app
        working-directory: ./apps/mobile
        run: eas build --platform ios --non-interactive --profile production

      - name: Submit to App Store
        working-directory: ./apps/mobile
        run: eas submit --platform ios --latest --profile production
```

### Android Build with EAS

```yaml
# .github/workflows/cd-mobile-android.yml
name: Deploy Android to Play Store

on:
  push:
    branches: [main]
    paths:
      - 'apps/mobile/**'
      - 'libs/**'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Android app
        working-directory: ./apps/mobile
        run: eas build --platform android --non-interactive --profile production

      - name: Submit to Play Store
        working-directory: ./apps/mobile
        run: eas submit --platform android --latest --profile production
```

### OTA Updates with EAS Update

```yaml
# .github/workflows/ota-update.yml
name: OTA Update

on:
  push:
    branches: [main]
    paths:
      - 'apps/mobile/**'
      - '!apps/mobile/ios/**'
      - '!apps/mobile/android/**'

jobs:
  update:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Publish update
        working-directory: ./apps/mobile
        run: eas update --branch production --message "OTA update from CI"
```

---

## Backend CI/CD

### Supabase Migrations

```yaml
# .github/workflows/cd-backend.yml
name: Deploy Backend (Supabase)

on:
  push:
    branches: [main]
    paths:
      - 'supabase/**'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Link to Supabase project
        run: |
          supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}

      - name: Push migrations
        run: supabase db push
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}

      - name: Deploy Edge Functions
        run: supabase functions deploy --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

---

## Environment Management

### Multi-Environment Strategy

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.your-app.com

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build for staging
        run: pnpm nx build web
        env:
          VITE_APP_ENV: staging
          VITE_SUPABASE_URL: ${{ secrets.STAGING_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.STAGING_SUPABASE_ANON_KEY }}

      - name: Deploy to staging
        run: |
          # Deploy to staging environment
          vercel --token=${{ secrets.VERCEL_TOKEN }} --scope=${{ secrets.VERCEL_ORG_ID }}
```

---

## Secrets Management

### GitHub Secrets Organization

**Required Secrets:**

```yaml
# Supabase
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_PROJECT_ID
SUPABASE_ACCESS_TOKEN

# Deployment
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID

# Mobile
EXPO_TOKEN
APPLE_ID
APPLE_APP_SPECIFIC_PASSWORD
GOOGLE_SERVICES_JSON

# Notifications
SLACK_WEBHOOK

# Testing
CODECOV_TOKEN
```

### Using Secrets

```yaml
steps:
  - name: Deploy with secrets
    run: deploy-script
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## Caching Strategies

### Dependency Caching

```yaml
steps:
  - uses: actions/checkout@v4

  - uses: pnpm/action-setup@v2
    with:
      version: 8

  - uses: actions/setup-node@v4
    with:
      node-version: '20'
      cache: 'pnpm'  # Automatic caching

  - name: Get pnpm store directory
    id: pnpm-cache
    run: echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT

  - uses: actions/cache@v3
    with:
      path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
      key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
      restore-keys: |
        ${{ runner.os }}-pnpm-store-
```

### Build Caching

```yaml
steps:
  - name: Cache build
    uses: actions/cache@v3
    with:
      path: |
        dist
        .next
        node_modules/.cache
      key: ${{ runner.os }}-build-${{ hashFiles('**/pnpm-lock.yaml') }}
      restore-keys: |
        ${{ runner.os }}-build-
```

---

## Testing Automation

### E2E Tests with Playwright

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps

      - name: Run E2E tests
        run: pnpm test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Code Quality Checks

### ESLint and Prettier

```yaml
# .github/workflows/code-quality.yml
name: Code Quality

on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run ESLint
        run: pnpm lint

      - name: Check formatting
        run: pnpm format:check

      - name: Type check
        run: pnpm typecheck
```

---

## Deployment Strategies

### Blue-Green Deployment

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to blue environment
        run: deploy-to-blue

      - name: Health check
        run: curl https://blue.example.com/health

      - name: Switch traffic to blue
        run: switch-traffic-to-blue

      - name: Cleanup green environment
        run: cleanup-green
```

### Canary Deployment

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy canary (10% traffic)
        run: deploy-canary --traffic=10

      - name: Monitor metrics
        run: monitor-for-5-minutes

      - name: Increase to 50%
        run: update-traffic --canary=50

      - name: Monitor metrics
        run: monitor-for-5-minutes

      - name: Full rollout
        run: update-traffic --canary=100
```

---

## Monitoring and Notifications

### Slack Notifications

```yaml
steps:
  - name: Notify Slack on failure
    if: failure()
    uses: 8398a7/action-slack@v3
    with:
      status: ${{ job.status }}
      text: 'Build failed on ${{ github.ref }}'
      webhook_url: ${{ secrets.SLACK_WEBHOOK }}
      fields: repo,message,commit,author
```

### Discord Notifications

```yaml
steps:
  - name: Notify Discord
    if: always()
    uses: sarisia/actions-status-discord@v1
    with:
      webhook: ${{ secrets.DISCORD_WEBHOOK }}
      status: ${{ job.status }}
      title: 'Deployment Status'
      description: 'Build and deployment completed'
```

---

## Security Scanning

### Dependency Scanning

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  dependency-scan:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  secret-scan:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run GitGuardian scan
        uses: GitGuardian/ggshield-action@v1
        env:
          GITGUARDIAN_API_KEY: ${{ secrets.GITGUARDIAN_API_KEY }}

  code-scan:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript, typescript

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
```

---

## Performance Optimization

### Parallelization

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - name: Run tests (shard ${{ matrix.shard }})
        run: pnpm test --shard=${{ matrix.shard }}/4
```

### Conditional Jobs

```yaml
jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      frontend: ${{ steps.filter.outputs.frontend }}
      backend: ${{ steps.filter.outputs.backend }}
    steps:
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            frontend:
              - 'apps/web/**'
            backend:
              - 'supabase/**'

  build-frontend:
    needs: changes
    if: needs.changes.outputs.frontend == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building frontend"

  build-backend:
    needs: changes
    if: needs.changes.outputs.backend == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building backend"
```

---

## Troubleshooting

### Common Issues

**Workflow not triggering:**
```yaml
# Check your branch protection rules
# Verify workflow file syntax with yamllint
```

**Cache not working:**
```yaml
# Verify cache key is unique
# Check cache size limits (10GB per repo)
```

**Secrets not available:**
```yaml
# Verify secrets are set in repository settings
# Check environment-specific secrets
```

**Timeout errors:**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30  # Increase timeout
```

---

## Next Steps

- **[API Documentation](./API.md)** - Backend API patterns
- **[Mobile Development](./MOBILE.md)** - Mobile app development
- **[Web Development](./WEB.md)** - Web app development
- **[Backend Guide](./BACKEND.md)** - Backend development
- **[Security Implementation](./SECURITY_IMPLEMENTATION.md)** - Security best practices

---

**Made with ❤️ for DevOps engineers**
