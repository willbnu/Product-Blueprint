# Deployment Guide

Complete guide for deploying your application to production across all platforms.

## Table of Contents

- [Overview](#overview)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Mobile Deployment](#mobile-deployment)
- [Web Deployment](#web-deployment)
- [Backend Deployment](#backend-deployment)
- [Environment Variables](#environment-variables)
- [CI/CD Pipelines](#cicd-pipelines)
- [Monitoring & Rollback](#monitoring--rollback)

## Overview

This application can be deployed to multiple platforms:

| Platform | Service | Deployment Method |
|----------|---------|-------------------|
| **iOS** | App Store | EAS Build → TestFlight → App Store |
| **Android** | Play Store | EAS Build → Internal Testing → Production |
| **Web** | Netlify/Vercel | Git push → Automated deployment |
| **Backend** | Supabase | Migrations → Edge Functions |

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests passing (`pnpm test`)
- [ ] No linting errors (`pnpm lint`)
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] Code reviewed and approved
- [ ] Documentation updated

### Configuration

- [ ] Production environment variables set
- [ ] API endpoints configured for production
- [ ] Third-party service credentials configured
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (PostHog) configured

### Security

- [ ] No secrets in source code
- [ ] Environment variables properly set
- [ ] Supabase RLS policies enabled
- [ ] Rate limiting configured
- [ ] SSL/TLS certificates valid

### App Store Requirements

- [ ] Privacy policy URL
- [ ] Terms of service URL
- [ ] App icons (all sizes)
- [ ] Screenshots (all devices)
- [ ] App description and keywords
- [ ] Age rating determined

## Mobile Deployment

### Prerequisites

1. **Expo Account**
   ```bash
   npx expo login
   ```

2. **EAS CLI**
   ```bash
   npm install -g eas-cli
   eas login
   ```

3. **Apple Developer Account** ($99/year)
   - Enroll at [developer.apple.com](https://developer.apple.com)

4. **Google Play Developer Account** ($25 one-time)
   - Register at [play.google.com/console](https://play.google.com/console)

### Initial Setup

#### 1. Configure EAS

```bash
cd apps/mobile
eas build:configure
```

This creates `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "env": {
        "APP_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCDE12345"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

#### 2. Configure App Identifiers

**iOS (app.json):**
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    }
  }
}
```

**Android (app.json):**
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

### iOS Deployment

#### 1. Create App in App Store Connect

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click "My Apps" → "+" → "New App"
3. Fill in app information:
   - Platform: iOS
   - Name: Your App Name
   - Primary Language: English
   - Bundle ID: com.yourcompany.yourapp
   - SKU: com.yourcompany.yourapp

#### 2. Build for Production

```bash
# Build iOS production version
eas build --platform ios --profile production

# Or build both platforms
eas build --platform all --profile production
```

This will:
- Build your app in the cloud
- Sign with your Apple certificates
- Return a download URL

#### 3. Submit to TestFlight

```bash
eas submit --platform ios --profile production
```

Or manually:
1. Download the IPA from EAS
2. Upload to App Store Connect via Transporter app

#### 4. Release to App Store

1. Go to App Store Connect
2. Select your app → TestFlight
3. Test with internal/external testers
4. Once ready: "Prepare for Submission"
5. Fill in:
   - App description
   - Keywords
   - Screenshots
   - Privacy policy
   - Age rating
6. Submit for review

**Review typically takes 1-3 days.**

### Android Deployment

#### 1. Create App in Play Console

1. Go to [play.google.com/console](https://play.google.com/console)
2. Click "Create app"
3. Fill in details:
   - App name
   - Default language
   - App/Game selection
   - Free/Paid

#### 2. Setup App Signing

Use Google Play App Signing (recommended):
1. In Play Console, go to "Setup" → "App signing"
2. Opt in to Play App Signing
3. Download your upload certificate

#### 3. Build for Production

```bash
# Build Android production version
eas build --platform android --profile production
```

#### 4. Submit to Play Store

```bash
eas submit --platform android --profile production
```

Or manually:
1. Download the AAB from EAS
2. Upload to Play Console → "Production" → "Create new release"

#### 5. Release Tracks

**Internal Testing** (recommended first):
```bash
eas submit --platform android --profile production
```

Configure in `eas.json`:
```json
{
  "submit": {
    "production": {
      "android": {
        "track": "internal"  // or "alpha", "beta", "production"
      }
    }
  }
}
```

**Rollout Strategy:**
1. Internal testing (fast, unlimited updates)
2. Closed testing / Alpha (up to 20,000 users)
3. Open testing / Beta (unlimited users)
4. Production (gradual rollout: 10% → 50% → 100%)

### Over-The-Air (OTA) Updates

For JavaScript-only changes (no native code changes):

```bash
# Create an update
eas update --branch production --message "Fix button color"

# Or auto-publish on git push
eas update:configure
```

**eas.json:**
```json
{
  "update": {
    "production": {
      "channel": "production"
    }
  }
}
```

**Users will receive updates:**
- On app restart
- Or when explicitly checking for updates

## Web Deployment

### Option 1: Netlify (Recommended)

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
netlify login
```

#### 2. Configure Build

Create `netlify.toml`:

```toml
[build]
  command = "pnpm nx build web"
  publish = "dist/apps/web"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### 3. Deploy

```bash
# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### 4. Connect to Git (Auto-Deploy)

```bash
netlify init
```

Or via Netlify UI:
1. Go to [app.netlify.com](https://app.netlify.com)
2. "Add new site" → "Import existing project"
3. Connect to GitHub
4. Configure build settings
5. Deploy

**Auto-deployment on:**
- Push to `main` → Production
- Push to PR → Preview deploy with unique URL

### Option 2: Vercel

#### 1. Install Vercel CLI

```bash
npm install -g vercel
vercel login
```

#### 2. Configure Build

Create `vercel.json`:

```json
{
  "buildCommand": "pnpm nx build web",
  "outputDirectory": "dist/apps/web",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

#### 3. Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option 3: Cloudflare Pages

```bash
# Build
pnpm nx build web

# Deploy via Cloudflare dashboard
# or use Wrangler CLI
```

## Backend Deployment

### Supabase Setup

#### 1. Create Production Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Choose region (close to users)
4. Wait for provisioning (~2 minutes)

#### 2. Run Migrations

```bash
# Link to production project
npx supabase link --project-ref your-project-ref

# Push migrations
npx supabase db push

# Or use SQL migrations directly
npx supabase db execute --file supabase/migrations/001_initial.sql
```

#### 3. Enable RLS (Row Level Security)

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies (examples)
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);
```

#### 4. Deploy Edge Functions

```bash
# Deploy all functions
npx supabase functions deploy

# Deploy specific function
npx supabase functions deploy hello

# Set secrets
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_...
```

#### 5. Configure Auth Providers

In Supabase Dashboard → Authentication → Providers:

- **Email:** Enable email confirmations
- **Google OAuth:** Add client ID & secret
- **Apple:** Configure (required for iOS)
- **GitHub:** Add OAuth app credentials

#### 6. Configure Storage

```bash
# Create storage buckets
npx supabase storage create avatars --public
npx supabase storage create documents --private

# Set up policies
```

## Environment Variables

### Production Environment Variables

#### Mobile (.env.production)

```bash
APP_ENV=production
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SENTRY_DSN=https://xxx@sentry.io/xxx
POSTHOG_API_KEY=phc_xxx
```

#### Web (.env.production)

```bash
VITE_APP_ENV=production
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_POSTHOG_API_KEY=phc_xxx
```

### Setting Environment Variables

**Netlify:**
```bash
netlify env:set VITE_SUPABASE_URL "https://xxx.supabase.co"
```

**Vercel:**
```bash
vercel env add VITE_SUPABASE_URL
```

**EAS (Expo):**
```bash
eas secret:create --name SUPABASE_URL --value https://xxx.supabase.co --scope project
```

## CI/CD Pipelines

Our GitHub Actions workflows automate testing and deployment.

### Workflows

1. **CI (.github/workflows/ci.yml)** - Runs on every PR
   - Linting
   - Type checking
   - Unit tests
   - Build verification

2. **Deploy Web (.github/workflows/deploy-web.yml)** - Runs on push to main
   - Build web app
   - Deploy to Netlify/Vercel
   - Comment with preview URL

3. **Mobile Preview (.github/workflows/mobile-preview.yml)** - Manual trigger
   - Build with EAS
   - Post QR code in PR

4. **Production Release (.github/workflows/release.yml)** - On version tags
   - Build all platforms
   - Deploy to production
   - Create GitHub release

### Setting Up CI/CD

#### 1. Add Secrets to GitHub

Go to Settings → Secrets and variables → Actions:

```
EXPO_TOKEN              # From: eas whoami --json
NETLIFY_AUTH_TOKEN      # From Netlify dashboard
NETLIFY_SITE_ID         # From Netlify site settings
SUPABASE_ACCESS_TOKEN   # From Supabase account
SUPABASE_PROJECT_ID     # From Supabase project settings
```

#### 2. Enable Workflows

Workflows will run automatically on:
- Pull requests → CI
- Push to main → Deploy preview
- Tag push (v*.*.*) → Production release

## Monitoring & Rollback

### Monitoring

**Web (Netlify):**
- Deploy logs in Netlify dashboard
- Function logs
- Analytics

**Mobile (Expo):**
- Build logs in expo.dev
- Crash reports
- Update statistics

**Backend (Supabase):**
- Database logs
- Edge Function logs
- Auth logs

**Errors (Sentry):**
```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
});
```

### Rollback Strategies

#### Web Rollback

**Netlify:**
```bash
# Rollback to previous deploy
netlify rollback

# Or redeploy specific version via dashboard
```

#### Mobile Rollback

**EAS Update:**
```bash
# Rollback OTA update to previous
eas update --branch production --message "Rollback"
```

**App Store/Play Store:**
- Cannot rollback (except by releasing new version)
- Use OTA updates for quick fixes

#### Backend Rollback

**Supabase:**
```bash
# Restore database from backup
# Via Supabase dashboard → Database → Backups

# Rollback migration
npx supabase migration rollback
```

## Performance Optimization

### Web

- Enable gzip/brotli compression
- Configure CDN caching
- Optimize images (use CDN)
- Enable HTTP/2

### Mobile

- Enable Hermes engine (Android)
- Use release builds for testing
- Profile with Flipper
- Optimize bundle size

## Post-Deployment

### 1. Verify Deployment

- [ ] App loads without errors
- [ ] Authentication works
- [ ] API calls succeed
- [ ] No console errors
- [ ] Error tracking receiving events

### 2. Monitor Initial Traffic

- Watch error rates in Sentry
- Check performance metrics
- Monitor API response times
- Review user feedback

### 3. Gradual Rollout (Mobile)

Start with small percentage:
1. 10% of users for 24 hours
2. If stable → 50% for 24 hours
3. If stable → 100%

### 4. Communication

- Update status page if applicable
- Notify users of new features
- Monitor support channels

---

For more details, see:
- [CI/CD Documentation](./docs/CICD.md)
- [Environment Variables Guide](./docs/ENVIRONMENT.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
