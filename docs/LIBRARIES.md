# Shared Libraries Guide

Comprehensive guide to the shared libraries in this monorepo.

## Table of Contents

- [Overview](#overview)
- [@app/shared-ui](#appshared-ui)
- [@app/data](#appdata)
- [@app/state](#appstate)
- [@app/utils](#apputils)
- [Creating New Libraries](#creating-new-libraries)
- [Best Practices](#best-practices)

## Overview

Shared libraries enable code reuse across mobile and web applications while maintaining clear boundaries and dependencies.

### Library Structure

```
libs/@app/
├── shared-ui/       # Cross-platform UI components
├── data/            # API clients & data fetching
├── state/           # Global state management
└── utils/           # Shared utilities
```

### Dependency Graph

```
apps/mobile  ──→  @app/shared-ui
    │             @app/data
    │             @app/state
    │                │
apps/web     ──→     │
                     ↓
                 @app/utils
```

## @app/shared-ui

Cross-platform UI components and design system.

### Directory Structure

```
libs/@app/shared-ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── index.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   └── index.ts
│   └── index.ts
├── tailwind.config.js
├── project.json
└── tsconfig.json
```

### Components

#### Button Component

```typescript
// libs/@app/shared-ui/src/components/Button/Button.tsx
import { Pressable, Text } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-600 active:bg-blue-700',
    secondary: 'bg-gray-600 active:bg-gray-700',
    outline: 'border-2 border-blue-600',
  };

  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        rounded-lg
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-semibold text-center">
          {title}
        </Text>
      )}
    </Pressable>
  );
}
```

#### Usage

```typescript
import { Button } from '@app/shared-ui';

function MyScreen() {
  return (
    <Button
      title="Submit"
      onPress={() => console.log('Pressed')}
      variant="primary"
      size="lg"
    />
  );
}
```

### Theme System

```typescript
// libs/@app/shared-ui/src/theme/colors.ts
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... 200-800
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    // ...
    900: '#111827',
  },
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

// libs/@app/shared-ui/src/theme/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

// libs/@app/shared-ui/src/theme/typography.ts
export const typography = {
  fontFamily: {
    sans: 'System',
    mono: 'Menlo, Monaco, Courier New, monospace',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
```

### Hooks

```typescript
// libs/@app/shared-ui/src/hooks/useTheme.ts
import { useColorScheme } from 'react-native';
import { useAppStore } from '@app/state';

export function useTheme() {
  const systemTheme = useColorScheme();
  const themePreference = useAppStore((state) => state.theme);

  const activeTheme =
    themePreference === 'system' ? systemTheme : themePreference;

  return {
    theme: activeTheme,
    isDark: activeTheme === 'dark',
    colors: activeTheme === 'dark' ? darkColors : lightColors,
  };
}
```

## @app/data

API clients, data fetching hooks, and backend integration.

### Directory Structure

```
libs/@app/data/
├── src/
│   ├── api/
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── todos.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTodos.ts
│   │   └── index.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── types.ts
│   ├── schemas/
│   │   ├── user.schema.ts
│   │   └── todo.schema.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── database.types.ts  # Auto-generated
└── project.json
```

### Supabase Client

```typescript
// libs/@app/data/src/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../database.types';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
```

### API Functions

```typescript
// libs/@app/data/src/api/todos.ts
import { supabase } from '../supabase/client';
import type { Database } from '../../database.types';

type Todo = Database['public']['Tables']['todos']['Row'];
type NewTodo = Database['public']['Tables']['todos']['Insert'];

export async function getTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTodo(todo: NewTodo) {
  const { data, error } = await supabase
    .from('todos')
    .insert(todo)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTodo(id: string, updates: Partial<Todo>) {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTodo(id: string) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
```

### TanStack Query Hooks

```typescript
// libs/@app/data/src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/todos';

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: api.getTodos,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      api.updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
```

### Zod Schemas

```typescript
// libs/@app/data/src/schemas/todo.schema.ts
import { z } from 'zod';

export const todoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(100),
  completed: z.boolean().default(false),
  user_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createTodoSchema = todoSchema.pick({
  title: true,
  completed: true,
});

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
```

## @app/state

Global state management with Zustand.

### Directory Structure

```
libs/@app/state/
├── src/
│   ├── stores/
│   │   ├── auth.store.ts
│   │   ├── user.store.ts
│   │   ├── app.store.ts
│   │   └── index.ts
│   ├── persistence/
│   │   ├── storage.ts
│   │   ├── mmkv.ts      # Mobile
│   │   └── idb.ts       # Web
│   ├── middleware/
│   │   └── logger.ts
│   └── index.ts
└── project.json
```

### Store Example

```typescript
// libs/@app/state/src/stores/app.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '../persistence/storage';

interface AppState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: AppState['theme']) => void;

  isOnboarded: boolean;
  setOnboarded: (value: boolean) => void;

  language: string;
  setLanguage: (lang: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),

      isOnboarded: false,
      setOnboarded: (isOnboarded) => set({ isOnboarded }),

      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-storage',
      storage,
    }
  )
);
```

### Storage Adapter

```typescript
// libs/@app/state/src/persistence/storage.ts
import { StateStorage } from 'zustand/middleware';
import { Platform } from 'react-native';

// Platform-specific storage
const storage: StateStorage = Platform.select({
  native: () => require('./mmkv').mmkvStorage,
  default: () => require('./idb').idbStorage,
})();

export { storage };

// libs/@app/state/src/persistence/mmkv.ts (Mobile)
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

export const mmkvStorage = {
  getItem: (name: string) => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    mmkv.set(name, value);
  },
  removeItem: (name: string) => {
    mmkv.delete(name);
  },
};
```

### Usage

```typescript
import { useAppStore } from '@app/state';

function SettingsScreen() {
  const { theme, setTheme } = useAppStore();

  return (
    <View>
      <Button
        title="Toggle Dark Mode"
        onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </View>
  );
}
```

## @app/utils

Shared utility functions and helpers.

### Directory Structure

```
libs/@app/utils/
├── src/
│   ├── date/
│   │   ├── formatDate.ts
│   │   ├── formatRelative.ts
│   │   └── index.ts
│   ├── string/
│   │   ├── truncate.ts
│   │   ├── capitalize.ts
│   │   └── index.ts
│   ├── validation/
│   │   ├── email.ts
│   │   ├── phone.ts
│   │   └── index.ts
│   ├── constants/
│   │   └── index.ts
│   └── index.ts
└── project.json
```

### Utility Examples

```typescript
// libs/@app/utils/src/date/formatDate.ts
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' = 'short'
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'short'
      ? { month: 'short', day: 'numeric', year: 'numeric' }
      : { month: 'long', day: 'numeric', year: 'numeric' };

  return d.toLocaleDateString('en-US', options);
}

// libs/@app/utils/src/string/truncate.ts
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

// libs/@app/utils/src/validation/email.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

## Creating New Libraries

### Generate Library

```bash
# React Native library (for mobile + shared)
pnpm nx g @nx/react-native:lib feature-auth \
  --directory=libs/@app \
  --unitTestRunner=jest

# React library (for web-only)
pnpm nx g @nx/react:lib feature-dashboard \
  --directory=libs/@app \
  --unitTestRunner=jest

# TypeScript library (for utilities)
pnpm nx g @nx/js:lib helpers \
  --directory=libs/@app \
  --bundler=esbuild
```

### Library Template

```
libs/@app/new-library/
├── src/
│   ├── lib/
│   │   └── new-library.ts
│   ├── index.ts           # Public API
│   └── README.md
├── project.json
├── tsconfig.json
├── tsconfig.lib.json
└── jest.config.ts
```

### Configure Public API

```typescript
// libs/@app/new-library/src/index.ts
export * from './lib/new-library';
export type { NewLibraryProps } from './lib/types';
```

## Best Practices

### 1. Clear Boundaries

```typescript
// ✅ Good: Libraries import from other libraries
import { formatDate } from '@app/utils';

// ❌ Bad: Libraries import from apps
import { Screen } from '../../apps/mobile/screens';
```

### 2. Proper Exports

```typescript
// ✅ Good: Named exports
export function Button() {}
export { Button };

// ❌ Bad: Default exports
export default Button;
```

### 3. Type Safety

```typescript
// ✅ Good: Explicit types
export interface ButtonProps {
  title: string;
  onPress: () => void;
}

export function Button(props: ButtonProps) {}

// ❌ Bad: Implicit any
export function Button(props) {}
```

### 4. Documentation

```typescript
/**
 * Formats a date string to human-readable format
 *
 * @param date - ISO 8601 date string or Date object
 * @param format - Output format ('short' | 'long')
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-01-15', 'short') // "Jan 15, 2024"
 */
export function formatDate(date: string | Date, format: 'short' | 'long') {}
```

### 5. Testing

```typescript
// Test all public APIs
describe('Button', () => {
  it('renders correctly', () => {});
  it('calls onPress', () => {});
  it('handles disabled state', () => {});
});
```

### 6. Platform-Specific Code

```typescript
import { Platform } from 'react-native';

export const storage = Platform.select({
  ios: () => require('./storage.ios'),
  android: () => require('./storage.android'),
  web: () => require('./storage.web'),
})();
```

---

For more information:
- [Architecture Overview](../ARCHITECTURE.md)
- [Development Workflow](../DEVELOPMENT.md)
- [API Documentation](./API.md)
