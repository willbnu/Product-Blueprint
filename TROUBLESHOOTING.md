# Troubleshooting Guide

Common issues and their solutions for development, build, and deployment.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Development Server Issues](#development-server-issues)
- [Build Errors](#build-errors)
- [Mobile-Specific Issues](#mobile-specific-issues)
- [Web-Specific Issues](#web-specific-issues)
- [Database & Backend Issues](#database--backend-issues)
- [Testing Issues](#testing-issues)
- [Git & CI/CD Issues](#git--cicd-issues)
- [Performance Issues](#performance-issues)

## Installation Issues

### Node Version Mismatch

**Problem:** "The engine 'node' is incompatible with this module"

**Solution:**
```bash
# Check current version
node --version

# Install correct version (v20+)
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version  # Should show v20.x.x
```

### pnpm Installation Fails

**Problem:** "ERR_PNPM_PEER_DEP_ISSUES Unmet peer dependencies"

**Solution:**
```bash
# Option 1: Install with lenient peer deps
pnpm install --no-strict-peer-dependencies

# Option 2: Update .npmrc
echo "strict-peer-dependencies=false" >> .npmrc
pnpm install

# Option 3: Clean and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Native Module Installation Fails

**Problem:** "gyp ERR! build error" or "node-gyp rebuild failed"

**Solution (macOS):**
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Python (node-gyp requirement)
brew install python3

# Reinstall
rm -rf node_modules
pnpm install
```

**Solution (Windows):**
```bash
# Install build tools
npm install --global windows-build-tools

# Reinstall
rmdir /s node_modules
pnpm install
```

### CocoaPods Installation Fails (iOS)

**Problem:** "pod install" fails or Ruby errors

**Solution:**
```bash
# Update CocoaPods
sudo gem install cocoapods

# Clean and reinstall
cd apps/mobile/ios
rm -rf Pods Podfile.lock
pod install --repo-update

# If still failing, use Homebrew version
brew install cocoapods
```

## Development Server Issues

### Metro Bundler Won't Start

**Problem:** "Metro bundler error" or "Port 8081 already in use"

**Solution:**
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9

# Clear Metro cache
pnpm mobile:clean

# Restart with cleared cache
pnpm dev:mobile --clear

# Or reset everything
pnpm nx reset
rm -rf node_modules/.cache
pnpm dev:mobile
```

### Expo Dev Server Connection Issues

**Problem:** Can't connect to Expo dev server from phone

**Solutions:**

**1. Network issues:**
```bash
# Ensure same WiFi network
# Check computer's IP
ifconfig | grep "inet "  # macOS/Linux
ipconfig                  # Windows

# Use tunnel mode
pnpm dev:mobile --tunnel
```

**2. Firewall blocking:**
```bash
# macOS: Allow node through firewall
# Settings → Security & Privacy → Firewall → Firewall Options
# Add Node.js or allow all incoming connections

# Windows: Allow in Windows Defender Firewall
```

**3. Corporate network:**
```bash
# Use tunnel mode (slower but works)
pnpm dev:mobile --tunnel
```

### Vite Dev Server Issues

**Problem:** Web dev server won't start or hot reload broken

**Solution:**
```bash
# Clear Vite cache
rm -rf apps/web/node_modules/.vite

# Restart
pnpm dev:web

# If port 3000 is taken
lsof -ti:3000 | xargs kill -9
pnpm dev:web
```

## Build Errors

### TypeScript Errors

**Problem:** "Type 'X' is not assignable to type 'Y'"

**Solutions:**

**1. Generate fresh types:**
```bash
# For Supabase types
pnpm db:types

# Clear TypeScript cache
rm -rf node_modules/.cache
pnpm typecheck
```

**2. Check tsconfig.json:**
```bash
# Ensure using workspace TypeScript
code .vscode/settings.json
# Add: "typescript.tsdk": "node_modules/typescript/lib"
```

**3. Restart TypeScript server:**
- VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

### Nx Build Cache Issues

**Problem:** "Build succeeds locally but fails in CI" or stale cache

**Solution:**
```bash
# Clear Nx cache
pnpm nx reset

# Clear node_modules cache
rm -rf node_modules/.cache

# Rebuild
pnpm build

# Force rebuild without cache
pnpm nx run-many -t build --skip-nx-cache
```

### Module Resolution Errors

**Problem:** "Cannot find module '@app/shared-ui'" or path alias errors

**Solution:**

**1. Check tsconfig.base.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@app/shared-ui": ["libs/@app/shared-ui/src/index.ts"],
      "@app/data": ["libs/@app/data/src/index.ts"]
    }
  }
}
```

**2. Check library exports:**
```typescript
// libs/@app/shared-ui/src/index.ts
export * from './components';
export * from './theme';
```

**3. Restart dev server:**
```bash
# Kill all node processes
pkill -f node

# Restart
pnpm dev:mobile
pnpm dev:web
```

## Mobile-Specific Issues

### iOS Build Fails

**Problem:** Xcode build errors

**Solutions:**

**1. Clean build:**
```bash
cd apps/mobile/ios
xcodebuild clean
rm -rf ~/Library/Developer/Xcode/DerivedData

# Rebuild
pnpm mobile:ios
```

**2. Pod issues:**
```bash
cd apps/mobile/ios
rm -rf Pods Podfile.lock
pod install --repo-update
```

**3. Provisioning/signing:**
```bash
# Check signing in Xcode
open apps/mobile/ios/YourApp.xcworkspace

# Automatic signing:
# Xcode → Project → Signing & Capabilities → Enable "Automatically manage signing"
```

### Android Build Fails

**Problem:** Gradle build errors

**Solutions:**

**1. Clean Gradle cache:**
```bash
cd apps/mobile/android
./gradlew clean

# Nuclear option
rm -rf ~/.gradle/caches
./gradlew clean build --refresh-dependencies
```

**2. SDK issues:**
```bash
# Check Android SDK path
echo $ANDROID_HOME

# Install missing SDK components via Android Studio:
# Tools → SDK Manager → SDK Tools → Install CMake, NDK
```

**3. Java version:**
```bash
# Check Java version (should be 11 or 17)
java --version

# Install via Homebrew
brew install openjdk@17

# Set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### App Crashes on Startup

**Problem:** App opens then immediately crashes

**Solutions:**

**1. Check native logs:**

**iOS:**
```bash
# View device logs
xcrun simctl spawn booted log stream --level debug
```

**Android:**
```bash
# View logcat
adb logcat *:E
```

**2. Common fixes:**
```bash
# Rebuild native modules
cd apps/mobile/ios && pod install
cd ../android && ./gradlew clean

# Clear app data
# iOS: Delete app from simulator and reinstall
# Android: adb shell pm clear com.your.app
```

**3. Check Info.plist/AndroidManifest.xml:**
- Verify bundle ID
- Check permissions
- Validate URL schemes

### "Unable to Resolve Module" Error

**Problem:** Module resolution errors in React Native

**Solution:**
```bash
# Clear Metro bundler cache
pnpm mobile:clean

# Clear watchman cache
watchman watch-del-all

# Reset everything
pnpm nx reset
rm -rf node_modules
pnpm install

# Restart
pnpm dev:mobile --clear
```

## Web-Specific Issues

### Build Size Too Large

**Problem:** "Chunk size exceeds recommended limit"

**Solutions:**

**1. Code splitting:**
```typescript
// Use dynamic imports
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

**2. Analyze bundle:**
```bash
# Install analyzer
pnpm add -D rollup-plugin-visualizer

# Build with analysis
pnpm build:web
# Check dist/stats.html
```

**3. Tree shaking not working:**
```typescript
// Use named imports
import { Button } from '@app/shared-ui';  // ✅
import * as UI from '@app/shared-ui';    // ❌
```

### Hydration Mismatch

**Problem:** "Hydration failed" or mismatched content

**Solution:**

**1. Check server/client differences:**
```typescript
// Avoid using browser-only APIs during render
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
```

**2. Suppress hydration warning (last resort):**
```tsx
<div suppressHydrationWarning>
  {new Date().toLocaleDateString()}
</div>
```

### CORS Errors in Development

**Problem:** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution:**

**1. Configure Vite proxy:**
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://your-api.com',
        changeOrigin: true,
      },
    },
  },
});
```

**2. Supabase CORS:**
```bash
# Already configured in Supabase dashboard
# Settings → API → CORS Allowed Origins
# Add: http://localhost:3000
```

## Database & Backend Issues

### Supabase Connection Failed

**Problem:** Can't connect to Supabase

**Solutions:**

**1. Check credentials:**
```bash
# Verify .env.local
cat .env.local | grep SUPABASE

# Test connection
curl https://YOUR-PROJECT.supabase.co/rest/v1/ \
  -H "apikey: YOUR-ANON-KEY"
```

**2. Check project status:**
- Visit supabase.com/dashboard
- Ensure project is active (not paused)

**3. Network issues:**
```bash
# Test DNS resolution
nslookup YOUR-PROJECT.supabase.co

# Check firewall/VPN
```

### Migration Fails

**Problem:** Database migration errors

**Solutions:**

**1. Check migration syntax:**
```sql
-- Ensure valid SQL
-- Check for typos
-- Verify table/column names
```

**2. Reset local database:**
```bash
pnpm supabase:reset
pnpm db:migrate
pnpm db:seed
```

**3. Check migration order:**
```bash
# Migrations run in alphabetical order
# Ensure timestamps are correct
# Example: 20240115120000_initial.sql
```

### RLS Policy Not Working

**Problem:** "Row Level Security policy violation"

**Solutions:**

**1. Check policy:**
```sql
-- View existing policies
SELECT * FROM pg_policies WHERE tablename = 'your_table';

-- Verify policy logic
-- Ensure auth.uid() matches your user
```

**2. Disable RLS temporarily (dev only):**
```sql
ALTER TABLE your_table DISABLE ROW LEVEL SECURITY;
```

**3. Check authentication:**
```typescript
// Verify user is authenticated
const { data: { session } } = await supabase.auth.getSession();
console.log('User ID:', session?.user?.id);
```

## Testing Issues

### Tests Timing Out

**Problem:** "Jest did not exit one second after test run completed"

**Solution:**
```typescript
// Add cleanup in afterEach
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

// Or add to jest.config.js
module.exports = {
  testTimeout: 10000, // Increase timeout
};
```

### Mock Not Working

**Problem:** Mocks not being applied

**Solutions:**

**1. Check mock order:**
```typescript
// Mock BEFORE importing
jest.mock('@app/data');
import { useAuth } from '@app/data';
```

**2. Reset mocks:**
```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

**3. Use MSW for API mocks:**
```typescript
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Snapshot Tests Failing

**Problem:** Snapshot mismatch

**Solution:**
```bash
# Update snapshots
pnpm test -u

# Update specific test
pnpm test UserProfile -u

# Review changes before committing
git diff
```

## Git & CI/CD Issues

### Pre-commit Hooks Failing

**Problem:** Husky hooks block commit

**Solution:**
```bash
# Fix linting errors
pnpm lint:fix

# Fix formatting
pnpm format

# If urgent, skip hooks (not recommended)
git commit --no-verify
```

### TOON File Conflicts During Merge/Rebase

**Problem:** Git merge or rebase shows conflicts in `.toon/*.toon.json` files

**What are TOON files?**
TOON (Token-Oriented Object Notation) files are generated documentation files optimized for AI consumption. They're derived from markdown source files.

**Quick Solution:**
```bash
# Automatically resolve all TOON conflicts
npm run toon:resolve

# Then continue your merge/rebase
git merge --continue
# or
git rebase --continue
```

**What it does:**
1. Accepts current branch version for conflicted TOON files
2. Regenerates all TOON files from source documentation
3. Stages the regenerated files
4. Shows you next steps

**Manual Solution (if needed):**
```bash
# Accept our version
git checkout --ours '.toon/**/*.toon.json'
git add .toon/

# Regenerate from source
npm run toon:generate
git add .toon/
```

**Why this works:**
- TOON files are **generated** from `.md` source files
- Source files are the single source of truth
- After merge, TOON files are regenerated from merged sources
- No need to manually resolve generated file conflicts

**Learn more:**
See `tools/toon/README.md` for detailed documentation.

### CI Build Fails But Local Passes

**Problem:** "Build works locally but fails in CI"

**Solutions:**

**1. Check environment variables:**
```bash
# Ensure all secrets are set in GitHub
# Settings → Secrets and variables → Actions
```

**2. Clear CI cache:**
```yaml
# In GitHub Actions workflow
- name: Clear cache
  run: |
    pnpm nx reset
    rm -rf node_modules/.cache
```

**3. Run same command locally:**
```bash
# Use exact CI command
CI=true pnpm build
```

### Nx Cloud Connection Issues

**Problem:** Can't connect to Nx Cloud

**Solution:**
```bash
# Check NX_CLOUD_ACCESS_TOKEN
echo $NX_CLOUD_ACCESS_TOKEN

# Regenerate token
nx reset
nx connect-to-nx-cloud
```

## Performance Issues

### Slow Builds

**Problem:** Builds take too long

**Solutions:**

**1. Use Nx cache:**
```bash
# Ensure caching is enabled
# Check nx.json → "tasksRunnerOptions" → "cacheableOperations"
```

**2. Limit parallel tasks:**
```bash
# Reduce parallelism if memory limited
pnpm nx run-many -t build --parallel=2
```

**3. Use affected commands:**
```bash
# Only build what changed
pnpm nx affected:build
```

### Slow App Performance

**Problem:** App is laggy

**Solutions:**

**1. Profile with React DevTools:**
```bash
# Install React DevTools
# Use Profiler tab to find slow components
```

**2. Check for unnecessary re-renders:**
```typescript
// Use React.memo
export const ExpensiveComponent = React.memo(({ data }) => {
  // ...
});

// Use useMemo for expensive calculations
const result = useMemo(() => expensiveCalc(data), [data]);
```

**3. Mobile profiling:**
```bash
# Enable performance monitor
# Dev Menu → Show Perf Monitor
```

### Memory Leaks

**Problem:** App crashes after extended use

**Solution:**
```typescript
// Clean up subscriptions
useEffect(() => {
  const subscription = supabase
    .from('todos')
    .on('*', handleChange)
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Getting More Help

If your issue isn't listed here:

1. **Check existing issues:** [GitHub Issues](https://github.com/YOUR-ORG/YOUR-REPO/issues)
2. **Search discussions:** [GitHub Discussions](https://github.com/YOUR-ORG/YOUR-REPO/discussions)
3. **Create new issue:** Use appropriate template
4. **Check documentation:**
   - [Setup Guide](./SETUP.md)
   - [Development Guide](./DEVELOPMENT.md)
   - [Architecture](./ARCHITECTURE.md)

## Quick Fixes Checklist

Try these in order:

```bash
# 1. Clear caches
pnpm nx reset
pnpm mobile:clean

# 2. Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 3. Clean all build artifacts
pnpm clean

# 4. Restart dev servers
# Kill all node processes
pkill -f node

# 5. Restart computer (sometimes needed)
```

---

**Still stuck?** Open an issue with:
- Your OS and version
- Node version (`node --version`)
- pnpm version (`pnpm --version`)
- Full error message
- Steps to reproduce
