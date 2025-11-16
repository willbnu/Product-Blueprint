# Development Workflow

Day-to-day development guide and best practices for working with this codebase.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Commands](#project-commands)
- [Development Environment](#development-environment)
- [Code Organization](#code-organization)
- [Feature Development](#feature-development)
- [Working with Nx](#working-with-nx)
- [Hot Reload & Fast Refresh](#hot-reload--fast-refresh)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Tips & Tricks](#tips--tricks)

## Quick Start

```bash
# Install dependencies
pnpm install

# Start mobile app
pnpm dev:mobile

# Start web app (in another terminal)
pnpm dev:web

# Run tests in watch mode (in another terminal)
pnpm test:watch
```

## Project Commands

### Development

```bash
# Start development servers
pnpm dev:mobile          # Expo mobile app
pnpm dev:web            # Vite web app
pnpm dev:all            # All apps simultaneously

# Build projects
pnpm build              # Build all projects
pnpm build:mobile       # Build mobile only
pnpm build:web          # Build web only

# Clean builds
pnpm clean              # Remove build artifacts
pnpm mobile:clean       # Clean mobile bundler cache
```

### Code Quality

```bash
# Linting
pnpm lint               # Lint all projects
pnpm lint:fix           # Auto-fix linting issues
pnpm lint mobile        # Lint specific project

# Formatting
pnpm format             # Format all files
pnpm format:check       # Check formatting without fixing

# Type checking
pnpm typecheck          # Type check all projects
```

### Testing

```bash
# Unit tests
pnpm test               # Run all tests once
pnpm test:watch         # Watch mode
pnpm test:coverage      # With coverage report

# E2E tests
pnpm e2e                # Run all e2e tests
pnpm mobile:e2e:ios     # iOS e2e tests
pnpm mobile:e2e:android # Android e2e tests
pnpm web:e2e            # Web e2e tests
```

### Database

```bash
# Supabase local
pnpm supabase:start     # Start local Supabase
pnpm supabase:stop      # Stop local Supabase
pnpm supabase:status    # Check status

# Migrations
pnpm db:migrate         # Run migrations
pnpm db:reset           # Reset database
pnpm db:seed            # Seed with data
pnpm db:types           # Generate TypeScript types
```

### Nx Specific

```bash
# Graph and analysis
pnpm nx graph           # View dependency graph
pnpm nx list            # List installed plugins
pnpm nx show project mobile  # Show project details

# Affected commands
pnpm nx affected:test   # Test only affected projects
pnpm nx affected:build  # Build only affected projects
pnpm nx affected:graph  # Graph of affected projects

# Cache management
pnpm nx reset           # Clear Nx cache
```

## Development Environment

### Recommended VS Code Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "nrwl.angular-console",
    "firsttris.vscode-jest-runner",
    "expo.vscode-expo-tools"
  ]
}
```

### VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### Environment Variables

Create `.env.local` (gitignored):

```bash
# Copy from example
cp .env.example .env.local

# Edit with your values
code .env.local
```

**Required variables:**
```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
```

**Optional variables:**
```bash
SENTRY_DSN=
POSTHOG_API_KEY=
```

## Code Organization

### File Structure

```
project-name/
├── Component/
│   ├── index.ts                 # Re-exports
│   ├── Component.tsx            # Main component
│   ├── Component.test.tsx       # Tests
│   ├── Component.styles.ts      # Styles (if needed)
│   └── Component.types.ts       # Types (if complex)
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with 'use' | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |
| Types/Interfaces | PascalCase | `User.types.ts` |

### Import/Export Guidelines

```typescript
// ✅ Named exports (preferred)
export function Button() {}
export { Button };

// ❌ Avoid default exports
export default Button;

// ✅ Barrel exports (index.ts)
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
```

## Feature Development

### 1. Create a Feature Branch

```bash
git checkout -b feature/user-profile-screen
```

### 2. Generate Component (Mobile)

```bash
# Using Nx generator
pnpm nx g @nx/react-native:component UserProfile \
  --project=mobile \
  --directory=screens

# This creates:
# apps/mobile/src/screens/UserProfile/UserProfile.tsx
# apps/mobile/src/screens/UserProfile/UserProfile.test.tsx
```

### 3. Generate Component (Web)

```bash
pnpm nx g @nx/react:component UserProfile \
  --project=web \
  --directory=components
```

### 4. Add to Shared Library

```bash
# Generate a new component in @app/shared-ui
pnpm nx g @nx/react-native:component Avatar \
  --project=shared-ui \
  --directory=components
```

### 5. Write Tests

```typescript
// UserProfile.test.tsx
import { render } from '@testing-library/react-native';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('should render user name', () => {
    const { getByText } = render(
      <UserProfile name="John Doe" />
    );
    expect(getByText('John Doe')).toBeTruthy();
  });
});
```

### 6. Run Tests

```bash
pnpm test UserProfile
```

## Working with Nx

### Understanding the Graph

```bash
# Open interactive graph
pnpm nx graph
```

This shows:
- Project dependencies
- Library boundaries
- Affected projects

### Affected Commands

When working on a feature branch:

```bash
# See what's affected by your changes
pnpm nx affected:graph

# Test only affected projects
pnpm nx affected:test

# Build only affected projects
pnpm nx affected:build

# Lint only affected projects
pnpm nx affected:lint
```

### Task Pipelines

Nx automatically runs tasks in the correct order:

```
┌─────────────┐
│  typecheck  │
└──────┬──────┘
       │
┌──────▼──────┐
│    lint     │
└──────┬──────┘
       │
┌──────▼──────┐
│    test     │
└──────┬──────┘
       │
┌──────▼──────┐
│    build    │
└─────────────┘
```

### Caching

Nx caches task results. To clear cache:

```bash
pnpm nx reset
```

## Hot Reload & Fast Refresh

### Mobile (React Native Fast Refresh)

- Automatic on file save
- Preserves component state
- Shows errors in-app

**Manual reload:**
- iOS Simulator: `Cmd+R`
- Android Emulator: `R R` (double tap R)

**Dev menu:**
- iOS Simulator: `Cmd+D`
- Android Emulator: `Cmd+M`

**Common issues:**
```bash
# Clear Metro bundler cache
pnpm mobile:clean

# Restart with cleared cache
pnpm dev:mobile --clear
```

### Web (Vite HMR)

- Instant updates on save
- Preserves React state
- No full page reload

**Force reload:**
- `Cmd+Shift+R` (macOS)
- `Ctrl+Shift+R` (Windows/Linux)

## Debugging

### Mobile Debugging

#### React Native Debugger

```bash
# Install
brew install --cask react-native-debugger

# Start debugger
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

#### Flipper

```bash
# Install
brew install --cask flipper

# Launch Flipper, then start your app
pnpm dev:mobile
```

**Flipper features:**
- React DevTools
- Network inspector
- Layout inspector
- Database browser

#### Console Logs

```typescript
// In React Native code
console.log('Debug message');
console.warn('Warning message');
console.error('Error message');

// Logs appear in terminal and in-app
```

### Web Debugging

#### Browser DevTools

- **Chrome DevTools:** `Cmd+Option+I`
- **React DevTools:** Install browser extension

#### Source Maps

Source maps are enabled in development:

```typescript
// You can set breakpoints in original TypeScript
debugger; // Execution will pause here
```

### Debugging Tests

```bash
# Debug a specific test
node --inspect-brk node_modules/.bin/jest --runInBand UserProfile.test.tsx

# Then open chrome://inspect in Chrome
```

**VS Code debugging:**

```json
// .vscode/launch.json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Debug",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "${fileBasename}"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Common Tasks

### Adding a New Screen (Mobile)

1. **Create screen component:**
   ```bash
   mkdir apps/mobile/app/profile
   touch apps/mobile/app/profile/index.tsx
   ```

2. **Implement screen:**
   ```typescript
   // apps/mobile/app/profile/index.tsx
   import { View, Text } from 'react-native';

   export default function ProfileScreen() {
     return (
       <View>
         <Text>Profile Screen</Text>
       </View>
     );
   }
   ```

3. **Navigation is automatic with Expo Router!**
   - Visit `/profile` in app
   - Or use `router.push('/profile')`

### Adding a New API Endpoint

1. **Create API function:**
   ```typescript
   // libs/@app/data/src/api/users.ts
   import { supabase } from '../supabase/client';

   export async function getUserProfile(userId: string) {
     const { data, error } = await supabase
       .from('profiles')
       .select('*')
       .eq('id', userId)
       .single();

     if (error) throw error;
     return data;
   }
   ```

2. **Create TanStack Query hook:**
   ```typescript
   // libs/@app/data/src/hooks/useUserProfile.ts
   import { useQuery } from '@tanstack/react-query';
   import { getUserProfile } from '../api/users';

   export function useUserProfile(userId: string) {
     return useQuery({
       queryKey: ['user-profile', userId],
       queryFn: () => getUserProfile(userId),
       enabled: !!userId,
     });
   }
   ```

3. **Use in component:**
   ```typescript
   import { useUserProfile } from '@app/data';

   function ProfileScreen() {
     const { data, isLoading } = useUserProfile('user-id');

     if (isLoading) return <Loading />;

     return <Profile data={data} />;
   }
   ```

### Adding a Database Migration

1. **Create migration file:**
   ```bash
   npx supabase migration new add_users_table
   ```

2. **Write migration:**
   ```sql
   -- supabase/migrations/20240115_add_users_table.sql
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT UNIQUE NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable RLS
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;

   -- Create policy
   CREATE POLICY "Users can view own data"
     ON users FOR SELECT
     USING (auth.uid() = id);
   ```

3. **Apply migration:**
   ```bash
   pnpm db:migrate
   ```

4. **Generate types:**
   ```bash
   pnpm db:types
   ```

### Adding Environment Variable

1. **Add to `.env.example`:**
   ```bash
   NEW_API_KEY=your-api-key-here
   ```

2. **Add to `.env.local`:**
   ```bash
   NEW_API_KEY=actual-secret-value
   ```

3. **Add TypeScript types:**
   ```typescript
   // env.d.ts
   declare namespace NodeJS {
     interface ProcessEnv {
       NEW_API_KEY: string;
     }
   }
   ```

4. **Use in code:**
   ```typescript
   const apiKey = process.env.NEW_API_KEY;
   ```

## Tips & Tricks

### Speed Up Development

```bash
# Run only tests related to changed files
pnpm test --onlyChanged

# Skip type checking during development
pnpm dev:mobile --no-typescript

# Use Nx affected commands
pnpm nx affected:test
```

### Quick Nx Commands

```bash
# Run command for specific project
pnpm nx [command] [project]

# Examples:
pnpm nx test mobile
pnpm nx build web
pnpm nx lint shared-ui
```

### Keyboard Shortcuts (Mobile)

| Action | iOS | Android |
|--------|-----|---------|
| Reload | `Cmd+R` | `R R` |
| Dev Menu | `Cmd+D` | `Cmd+M` |
| Inspector | `Cmd+I` | `Cmd+I` |

### Git Hooks

Pre-commit hooks run automatically:

```bash
# Manually run pre-commit checks
pnpm lint-staged
```

To skip hooks (not recommended):
```bash
git commit --no-verify
```

### Incremental Builds

Nx supports incremental builds:

```bash
# First build (slow)
pnpm build

# Second build (fast - uses cache)
pnpm build
```

### Performance Profiling

**React Native:**
```typescript
// Enable performance monitor
import { PerformanceMonitor } from 'react-native';

<PerformanceMonitor />
```

**Web:**
```typescript
// Use React DevTools Profiler tab
// Or Chrome DevTools Performance tab
```

## Troubleshooting

For common issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

Quick fixes:

```bash
# Clear all caches and reinstall
pnpm clean
rm -rf node_modules
pnpm install

# Reset Nx cache
pnpm nx reset

# Clear mobile bundler cache
pnpm mobile:clean

# Restart with cleared cache
pnpm dev:mobile --clear
```

---

For more information:
- [Architecture Overview](./ARCHITECTURE.md)
- [Testing Guide](./TESTING.md)
- [API Documentation](./docs/API.md)
- [Libraries Guide](./docs/LIBRARIES.md)
