# Setup Guide

Complete setup instructions for getting the app template running on your machine.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Environment Configuration](#environment-configuration)
- [Supabase Setup](#supabase-setup)
- [Mobile Development Setup](#mobile-development-setup)
- [Web Development Setup](#web-development-setup)
- [Verification](#verification)
- [Next Steps](#next-steps)

## Prerequisites

### Required Software

#### 1. Node.js (v20 or higher)

**Using nvm (recommended):**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js
nvm install 20
nvm use 20
nvm alias default 20
```

**Verify installation:**
```bash
node --version  # Should show v20.x.x or higher
```

#### 2. pnpm (v8 or higher)

```bash
# Install pnpm globally
npm install -g pnpm@8

# Verify installation
pnpm --version  # Should show 8.x.x or higher
```

#### 3. Git (v2.40 or higher)

```bash
# macOS
brew install git

# Ubuntu/Debian
sudo apt-get install git

# Verify
git --version
```

### Mobile Development Prerequisites

#### For iOS Development (macOS only)

1. **Xcode** (latest version from App Store)
2. **Xcode Command Line Tools:**
   ```bash
   xcode-select --install
   ```
3. **CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```

#### For Android Development (All platforms)

1. **Android Studio** (download from [developer.android.com](https://developer.android.com/studio))
2. **Android SDK** (install via Android Studio)
3. **Environment variables** in `~/.zshrc` or `~/.bashrc`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

#### Expo CLI

```bash
npm install -g expo-cli
```

### Optional but Recommended

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - TypeScript
  - React Native Tools
  - Tailwind CSS IntelliSense
- **Watchman** (for better file watching):
  ```bash
  # macOS
  brew install watchman

  # Ubuntu/Debian
  sudo apt-get install watchman
  ```

## Initial Setup

### 1. Clone or Use Template

#### Option A: Use as GitHub Template
1. Click "Use this template" on GitHub
2. Create your new repository
3. Clone your new repo:
   ```bash
   git clone https://github.com/YOUR-ORG/YOUR-APP-NAME.git
   cd YOUR-APP-NAME
   ```

#### Option B: Clone Directly
```bash
git clone https://github.com/YOUR-ORG/app-template.git my-new-app
cd my-new-app
```

### 2. Run Template Setup Script

This interactive script will customize the template for your project:

```bash
chmod +x scripts/setup-template.sh
./scripts/setup-template.sh
```

The script will prompt you for:
- App name (e.g., "MyAwesomeApp")
- Package prefix (e.g., "@myapp")
- Author name
- Author email
- GitHub organization

It will automatically:
- Replace all template placeholders
- Update package.json files
- Configure app names in Expo config
- Initialize a fresh git repository (optional)

### 3. Install Dependencies

```bash
pnpm install
```

This may take 5-10 minutes on first install.

**Common Issues:**
- If you see peer dependency warnings, it's usually safe to ignore them
- On macOS with M1/M2, you may need to run with Rosetta if you encounter native module issues

## Environment Configuration

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Edit `.env.local`

Open `.env.local` and configure the following variables:

```bash
# App Configuration
APP_NAME="Your App Name"
APP_ENV="development"

# Supabase Configuration (get these from supabase.com/dashboard)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key" # Keep secret!

# Optional: Analytics & Monitoring
SENTRY_DSN=""              # Get from sentry.io
POSTHOG_API_KEY=""         # Get from posthog.com
POSTHOG_HOST=""

# Optional: Expo
EAS_PROJECT_ID=""          # Generated when you run eas build
```

### 3. Platform-Specific Environment Files

The template automatically loads environment variables in this order:
1. `.env.local` (gitignored - your local overrides)
2. `.env.development` (development defaults)
3. `.env.production` (production defaults)
4. `.env` (base defaults)

**Never commit `.env.local` or any file with secrets!**

## Supabase Setup

### Option 1: Use Supabase Cloud (Recommended for beginners)

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Add credentials to `.env.local`:**
   ```bash
   SUPABASE_URL="https://xxxxx.supabase.co"
   SUPABASE_ANON_KEY="eyJhbGc..."
   ```

3. **Run initial migrations:**
   ```bash
   pnpm supabase:link    # Link to your cloud project
   pnpm supabase:push    # Push migrations
   ```

### Option 2: Use Supabase Local Development

1. **Install Supabase CLI:**
   ```bash
   brew install supabase/tap/supabase  # macOS
   # or
   npm install -g supabase             # All platforms
   ```

2. **Start local Supabase:**
   ```bash
   pnpm supabase:start
   ```

3. **Use local credentials** (printed after start):
   ```bash
   SUPABASE_URL="http://localhost:54321"
   SUPABASE_ANON_KEY="eyJhbGc..."
   ```

4. **Access local services:**
   - Studio: http://localhost:54323
   - API: http://localhost:54321
   - DB: postgresql://postgres:postgres@localhost:54322/postgres

### Database Setup

1. **Apply migrations:**
   ```bash
   pnpm db:migrate
   ```

2. **Seed database (optional):**
   ```bash
   pnpm db:seed
   ```

3. **Generate TypeScript types:**
   ```bash
   pnpm db:types
   ```

This creates `libs/@app/data/src/database.types.ts` with your database schema.

## Mobile Development Setup

### 1. Install Expo Go App

- **iOS:** Download from [App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android:** Download from [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### 2. Start Development Server

```bash
pnpm dev:mobile
```

This will:
- Start the Expo dev server
- Show a QR code
- Open Expo Dev Tools in browser

### 3. Run on Device/Simulator

**On Physical Device:**
1. Open Expo Go app
2. Scan QR code
3. Wait for JavaScript bundle to load

**On iOS Simulator (macOS only):**
```bash
# Press 'i' in the terminal where Expo is running
# or
pnpm mobile:ios
```

**On Android Emulator:**
```bash
# Press 'a' in the terminal where Expo is running
# or
pnpm mobile:android
```

### 4. Configure EAS Build (Optional - for production builds)

```bash
# Login to Expo
npx expo login

# Configure EAS
pnpm eas:configure

# Create development build (recommended)
pnpm eas:build:dev
```

## Web Development Setup

### 1. Start Development Server

```bash
pnpm dev:web
```

The web app will be available at http://localhost:3000

### 2. Configure for Production

Edit `apps/web/vite.config.ts` if you need to:
- Change port
- Add proxy rules
- Configure build options

## Verification

Run these commands to verify everything is set up correctly:

### 1. Type Checking
```bash
pnpm typecheck
```
Should complete with no errors.

### 2. Linting
```bash
pnpm lint
```
Should pass all ESLint rules.

### 3. Unit Tests
```bash
pnpm test
```
Should run sample tests successfully.

### 4. Build All Projects
```bash
pnpm build
```
Should build mobile and web apps without errors.

### 5. View Dependency Graph
```bash
pnpm graph
```
Opens Nx dependency graph in browser.

## Troubleshooting Common Setup Issues

### Node Version Issues

**Problem:** "The engine 'node' is incompatible"

**Solution:**
```bash
nvm use 20
# or update .nvmrc if you're using a different version
```

### pnpm Install Failures

**Problem:** "ERR_PNPM_PEER_DEP_ISSUES"

**Solution:**
```bash
pnpm install --no-strict-peer-dependencies
```

### Metro Bundler Cache Issues

**Problem:** "Unable to resolve module"

**Solution:**
```bash
pnpm mobile:clean
pnpm dev:mobile --clear
```

### Expo Go Connection Issues

**Problem:** Can't connect to dev server

**Solutions:**
1. Ensure phone and computer are on same WiFi
2. Check firewall isn't blocking port 19000
3. Try tunnel mode: `pnpm dev:mobile --tunnel`

### Android Emulator Issues

**Problem:** Emulator won't start

**Solution:**
```bash
# Check that Android SDK is properly configured
echo $ANDROID_HOME

# Open Android Studio and launch emulator from there
# Then connect: pnpm mobile:android
```

### Supabase Connection Issues

**Problem:** Can't connect to Supabase

**Solutions:**
1. Verify credentials in `.env.local`
2. Check Supabase project is active
3. Try regenerating anon key in Supabase dashboard

### Build Failures

**Problem:** "Module not found" during build

**Solution:**
```bash
# Clear all caches
pnpm clean
rm -rf node_modules
pnpm install

# Reset Nx
pnpm nx reset
```

## Next Steps

After completing setup:

1. **Read the Architecture Guide:** [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Learn Development Workflow:** [DEVELOPMENT.md](./DEVELOPMENT.md)
3. **Explore Shared Libraries:** [docs/LIBRARIES.md](./docs/LIBRARIES.md)
4. **Start Building:**
   - Create your first screen in `apps/mobile/app/`
   - Add shared components in `libs/@app/shared-ui/`
   - Set up your data models in Supabase

## Getting Help

- **Documentation:** Check [docs/](./docs/) directory
- **Issues:** [GitHub Issues](https://github.com/YOUR-ORG/YOUR-APP/issues)
- **Discussions:** [GitHub Discussions](https://github.com/YOUR-ORG/YOUR-APP/discussions)

## Quick Reference

```bash
# Development
pnpm dev:mobile          # Start Expo
pnpm dev:web            # Start Vite web app
pnpm dev:all            # Start all apps

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Run Prettier
pnpm typecheck          # TypeScript check

# Testing
pnpm test               # Run all tests
pnpm test:watch         # Watch mode
pnpm e2e                # E2E tests

# Database
pnpm db:migrate         # Run migrations
pnpm db:seed            # Seed database
pnpm db:types           # Generate TS types

# Supabase
pnpm supabase:start     # Start local Supabase
pnpm supabase:stop      # Stop local Supabase
pnpm supabase:reset     # Reset local database

# Cleanup
pnpm clean              # Clean build artifacts
pnpm nx reset           # Clear Nx cache
```
