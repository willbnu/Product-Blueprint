# Shared Libraries Guide

Comprehensive guide to the shared libraries in this monorepo.

## Table of Contents

- [Overview](#overview)
- [@pb/data](#pbdata)
- [@pb/state](#pbstate)
- [@pb/shared](#pbshared)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

## Overview

Shared libraries enable code reuse across mobile and web applications while maintaining clear boundaries and dependencies.

### Library Structure

```
libs/
├── data/       # @pb/data - API client, Supabase, hooks
├── state/      # @pb/state - Zustand stores
└── shared/     # @pb/shared - Types, schemas, utilities
```

### Dependency Graph

```
apps/mobile  ──→  @pb/data
    │             @pb/state
    │             @pb/shared
    │
apps/web     ──→  @pb/data
                  @pb/state
                  @pb/shared
```

## @pb/data

API clients, Supabase integration, and data fetching hooks.

### Directory Structure

```
libs/data/
├── src/
│   ├── supabase/
│   │   ├── client.ts      # Platform-aware client factory
│   │   └── types.ts       # Database types
│   ├── api/
│   │   └── auth.ts        # Auth API functions
│   ├── hooks/
│   │   └── useSession.ts  # Session management hook
│   └── index.ts           # Public exports
├── package.json
└── tsconfig.json
```

### Supabase Client Factory

The client factory creates platform-aware Supabase clients:

```typescript
// libs/data/src/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export interface StorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

export function createSupabaseClient(config: SupabaseConfig) {
  return createClient<Database>(config.url, config.anonKey, {
    auth: {
      storage: config.storage,
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}
```

### Web Usage

```typescript
// apps/web/src/lib/supabase.ts
import { createSupabaseClient } from '@pb/data';

export const supabase = createSupabaseClient({
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  // Uses localStorage by default on web
});
```

### Mobile Usage

```typescript
// apps/mobile/lib/supabase.ts
import { createSupabaseClient, type StorageAdapter } from '@pb/data';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter: StorageAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};

export const supabase = createSupabaseClient({
  url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  storage: ExpoSecureStoreAdapter,
});
```

### Auth API Functions

```typescript
// libs/data/src/api/auth.ts
import { getSupabase } from '../supabase/client';

export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { session: data.session, error };
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { session: data.session, error };
}

export async function signOut() {
  const supabase = getSupabase();
  await supabase.auth.signOut();
}
```

### Session Hook

```typescript
// libs/data/src/hooks/useSession.ts
import { useEffect } from 'react';
import { useAuthStore } from '@pb/state';
import { getSession, onAuthStateChange } from '../api/auth';

export function useSession() {
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    // Get initial session
    getSession().then(({ session }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data } = onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, [setSession, setLoading]);
}
```

## @pb/state

Global state management with Zustand.

### Directory Structure

```
libs/state/
├── src/
│   ├── stores/
│   │   └── auth.store.ts  # Auth state
│   └── index.ts           # Public exports
├── package.json
└── tsconfig.json
```

### Auth Store

```typescript
// libs/state/src/stores/auth.store.ts
import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () =>
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
```

### Usage in Components

```typescript
// Any component in mobile or web
import { useAuthStore } from '@pb/state';

function UserProfile() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return <div>Hello, {user?.email}</div>;
}
```

## @pb/shared

Shared types, schemas, and utilities.

### Directory Structure

```
libs/shared/
├── src/
│   ├── types.ts    # Shared TypeScript types
│   ├── schemas.ts  # Zod validation schemas
│   ├── utils.ts    # Utility functions
│   └── index.ts    # Public exports
├── package.json
└── tsconfig.json
```

### Types

```typescript
// libs/shared/src/types.ts
export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}
```

### Zod Schemas

```typescript
// libs/shared/src/schemas.ts
import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

### Utilities

```typescript
// libs/shared/src/utils.ts
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

## Usage Examples

### Login Form (Web)

```typescript
// apps/web/src/routes/login.tsx
import { useState, FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@pb/state';
import { signInWithEmail } from '@pb/data';
import { loginSchema } from '@pb/shared';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const { session, error: signInError } = await signInWithEmail(email, password);
    if (signInError) {
      setError(signInError.message);
      return;
    }

    setSession(session);
    navigate({ to: '/' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form fields */}
    </form>
  );
}
```

### Protected Route (Web)

```typescript
// apps/web/src/routes/_authenticated/route.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@pb/state';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const state = useAuthStore.getState();

    // Wait for loading to complete
    if (state.isLoading) {
      await new Promise<void>((resolve) => {
        const unsubscribe = useAuthStore.subscribe((newState) => {
          if (!newState.isLoading) {
            unsubscribe();
            resolve();
          }
        });
      });
    }

    // Check authentication
    const finalState = useAuthStore.getState();
    if (!finalState.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: () => <Outlet />,
});
```

### Mobile App Layout

```typescript
// apps/mobile/app/_layout.tsx
import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from '@pb/data';
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  // Initialize auth session
  useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
```

## Best Practices

### 1. Import from Package Names

```typescript
// ✅ Good - Use package names
import { useAuthStore } from '@pb/state';
import { signInWithEmail } from '@pb/data';

// ❌ Bad - Relative paths across packages
import { useAuthStore } from '../../../libs/state/src';
```

### 2. Keep Stores Focused

```typescript
// ✅ Good - Single responsibility
const useAuthStore = create<AuthState>((set) => ({...}));
const useAppStore = create<AppState>((set) => ({...}));

// ❌ Bad - Everything in one store
const useStore = create<AllState>((set) => ({...}));
```

### 3. Type Everything

```typescript
// ✅ Good - Explicit types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({...}));

// ❌ Bad - Implicit any
export const useAuthStore = create((set) => ({...}));
```

### 4. Validate at Boundaries

```typescript
// ✅ Good - Validate input
import { loginSchema } from '@pb/shared';

const result = loginSchema.safeParse({ email, password });
if (!result.success) {
  return { error: result.error.errors[0].message };
}

// ❌ Bad - Trust user input
const { email, password } = req.body;
```

### 5. Use Platform-Aware Code

```typescript
// ✅ Good - Platform detection
const storage = Platform.select({
  native: () => require('./storage.native'),
  default: () => require('./storage.web'),
})();

// ❌ Bad - Platform-specific in shared code
localStorage.setItem('key', 'value'); // Fails on mobile
```

---

For more information:
- [Architecture Overview](../ARCHITECTURE.md)
- [Web Development](./WEB.md)
- [Mobile Development](./MOBILE.md)
