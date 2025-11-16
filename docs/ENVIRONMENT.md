# Environment Variables Guide

Complete reference for environment variables used across all platforms.

## Table of Contents

- [Overview](#overview)
- [Variable Files](#variable-files)
- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Platform-Specific](#platform-specific)
- [Setting Variables](#setting-variables)
- [Best Practices](#best-practices)

## Overview

Environment variables configure the application for different environments (development, staging, production) without changing code.

### Loading Priority

Variables are loaded in this order (later overwrites earlier):

1. `.env` - Base defaults (committed)
2. `.env.development` - Development defaults (committed)
3. `.env.production` - Production defaults (committed)
4. `.env.local` - Local overrides (gitignored, **use this for secrets**)

## Variable Files

### .env.example

Template showing all available variables (commit this):

```bash
# App Configuration
APP_NAME=My App
APP_ENV=development

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Error Tracking
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=

# Optional: Analytics
POSTHOG_API_KEY=
POSTHOG_HOST=https://app.posthog.com

# Optional: Expo
EAS_PROJECT_ID=
```

### .env.local (Your Secrets)

**Never commit this file!** Copy from `.env.example`:

```bash
cp .env.example .env.local
```

Then edit with real values:

```bash
SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SENTRY_DSN=https://xxx@sentry.io/yyy
```

## Required Variables

### Core Application

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_NAME` | Application display name | `My Awesome App` |
| `APP_ENV` | Environment | `development`, `staging`, `production` |

### Supabase (Required)

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `SUPABASE_URL` | Your Supabase project URL | Dashboard → Settings → API |
| `SUPABASE_ANON_KEY` | Anonymous/public key | Dashboard → Settings → API |

**Getting Supabase credentials:**

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Settings → API
4. Copy "Project URL" and "anon public" key

### Web-Specific (Vite)

For web apps, prefix with `VITE_`:

```bash
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

## Optional Variables

### Error Tracking (Sentry)

| Variable | Description | Required For |
|----------|-------------|--------------|
| `SENTRY_DSN` | Sentry Data Source Name | Error tracking |
| `SENTRY_ORG` | Sentry organization slug | Sourcemap upload |
| `SENTRY_PROJECT` | Sentry project slug | Sourcemap upload |
| `SENTRY_AUTH_TOKEN` | Auth token for uploads | CI/CD |

**Setup:**

1. Create account at [sentry.io](https://sentry.io)
2. Create new project
3. Copy DSN from project settings
4. Create auth token: Settings → Auth Tokens

### Analytics (PostHog)

| Variable | Description |
|----------|-------------|
| `POSTHOG_API_KEY` | PostHog project API key |
| `POSTHOG_HOST` | PostHog instance URL |

**Setup:**

1. Sign up at [posthog.com](https://posthog.com)
2. Create project
3. Copy API key from project settings

### Expo / EAS

| Variable | Description |
|----------|-------------|
| `EAS_PROJECT_ID` | Expo Application Services project ID |
| `EXPO_PUBLIC_*` | Public variables (exposed to client) |

**Note:** Variables prefixed with `EXPO_PUBLIC_` are included in the app bundle and accessible at runtime.

## Platform-Specific

### Mobile (React Native / Expo)

Access via `process.env`:

```typescript
// In React Native code
const supabaseUrl = process.env.SUPABASE_URL;
```

**Public variables** (available in client code):

```bash
EXPO_PUBLIC_API_URL=https://api.example.com
```

```typescript
// Usage
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

### Web (Vite)

Variables must be prefixed with `VITE_`:

```bash
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

Access via `import.meta.env`:

```typescript
// In web app
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
```

### Supabase Edge Functions

Use Deno environment variables:

```typescript
// In Edge Function
const apiKey = Deno.env.get('API_KEY');
```

Set via Supabase CLI:

```bash
npx supabase secrets set API_KEY=your-secret-value
```

## Setting Variables

### Local Development

1. **Copy example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit with real values:**
   ```bash
   code .env.local  # or nano, vim, etc.
   ```

3. **Restart dev server** (variables are loaded at startup)

### CI/CD (GitHub Actions)

1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each variable:
   - Name: `SUPABASE_URL`
   - Secret: `https://xxx.supabase.co`

**In workflow:**

```yaml
- name: Build
  env:
    SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
    SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
  run: pnpm build
```

### Netlify

**Via CLI:**

```bash
netlify env:set VITE_SUPABASE_URL "https://xxx.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "eyJhbGc..."
```

**Via Dashboard:**

1. Site settings → Environment variables
2. Add variable
3. Redeploy site

### Vercel

**Via CLI:**

```bash
vercel env add VITE_SUPABASE_URL
# Paste value when prompted
```

**Via Dashboard:**

1. Project Settings → Environment Variables
2. Add variable
3. Select environment (Production, Preview, Development)

### EAS (Expo)

**In eas.json:**

```json
{
  "build": {
    "production": {
      "env": {
        "APP_ENV": "production"
      }
    }
  }
}
```

**Secrets (sensitive values):**

```bash
eas secret:create --name SUPABASE_ANON_KEY --value "eyJhbGc..." --scope project
```

**Access in app.json:**

```json
{
  "expo": {
    "extra": {
      "supabaseUrl": process.env.SUPABASE_URL
    }
  }
}
```

```typescript
// In app
import Constants from 'expo-constants';
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
```

## Best Practices

### 1. Never Commit Secrets

```bash
# ✅ Commit this
.env.example

# ❌ Never commit these
.env.local
.env.production.local
```

**Check .gitignore includes:**

```
.env.local
.env*.local
.env.production
```

### 2. Use Type-Safe Access

```typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    SENTRY_DSN?: string;
  }
}

// For Vite (web)
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### 3. Validate on Startup

```typescript
// libs/@app/utils/src/env.ts
function validateEnv() {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

// Call in app initialization
validateEnv();
```

### 4. Separate Public vs Private

```bash
# ❌ Bad: Secret in public variable
EXPO_PUBLIC_SUPABASE_SERVICE_KEY=secret-key  # Exposed to client!

# ✅ Good: Public key is fine
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # Anon key is safe

# ✅ Good: Service key stays server-side
SUPABASE_SERVICE_KEY=secret-key  # Never exposed
```

### 5. Environment-Specific Values

```bash
# .env.development
APP_ENV=development
API_URL=http://localhost:3000

# .env.production
APP_ENV=production
API_URL=https://api.yourapp.com
```

### 6. Document All Variables

Keep `.env.example` up to date:

```bash
# When adding new variable
echo "NEW_API_KEY=your-key-here" >> .env.example

# Add comment
echo "# NEW_API_KEY - Description of what this does" >> .env.example
```

## Complete Example

### .env.example (Template)

```bash
# ======================
# App Configuration
# ======================
APP_NAME=My Awesome App
APP_ENV=development

# ======================
# Supabase (Required)
# ======================
# Get these from: https://supabase.com/dashboard/project/_/settings/api
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service role key (SERVER-SIDE ONLY - never expose to client)
SUPABASE_SERVICE_ROLE_KEY=

# ======================
# Error Tracking (Optional)
# ======================
# Get from: https://sentry.io/settings/
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=  # For CI/CD sourcemap uploads

# ======================
# Analytics (Optional)
# ======================
# Get from: https://app.posthog.com/project/settings
POSTHOG_API_KEY=
POSTHOG_HOST=https://app.posthog.com

# ======================
# Expo / EAS (Optional)
# ======================
# Generated when you run: eas build:configure
EAS_PROJECT_ID=

# ======================
# Feature Flags (Optional)
# ======================
ENABLE_ANALYTICS=true
ENABLE_ERROR_TRACKING=true
ENABLE_BETA_FEATURES=false
```

### .env.local (Your Secrets - Gitignored)

```bash
# Copy from .env.example and fill with real values
SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMDAwMDAsImV4cCI6MTk4NTU3NjAwMH0.xxxxx
SENTRY_DSN=https://xxxxx@oyyy.ingest.sentry.io/zzzzz
POSTHOG_API_KEY=phc_xxxxxxxxxxxxxxxxxxxx
```

## Troubleshooting

### Variables Not Loading

**Check:**

1. File is named exactly `.env.local` (not `.env.local.txt`)
2. Variables don't have spaces: `KEY=value` not `KEY = value`
3. No quotes needed: `KEY=value` not `KEY="value"`
4. Restart dev server after changes

### Web Variables Not Working

**Solution:** Prefix with `VITE_`:

```bash
# ❌ Won't work in web
SUPABASE_URL=xxx

# ✅ Works in web
VITE_SUPABASE_URL=xxx
```

### Mobile Variables Not Working

**Solution:** Use `EXPO_PUBLIC_` prefix:

```bash
# ✅ Accessible in React Native
EXPO_PUBLIC_API_URL=https://api.example.com
```

### TypeScript Errors

**Solution:** Add types to `env.d.ts`:

```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    YOUR_NEW_VAR: string;
  }
}
```

---

For more information:
- [Setup Guide](../SETUP.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Security Policy](../SECURITY.md)
