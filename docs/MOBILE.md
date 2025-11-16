# Mobile Development Guide (Expo + React Native)

> **Status:** Documentation-only blueprint (v0.1.0)
>
> This guide provides comprehensive patterns and best practices for building production-ready mobile applications with Expo and React Native.

---

## Table of Contents

- [Overview](#overview)
- [Expo Setup](#expo-setup)
- [Project Structure](#project-structure)
- [Navigation with Expo Router](#navigation-with-expo-router)
- [UI Components](#ui-components)
- [State Management](#state-management)
- [Data Fetching](#data-fetching)
- [Native Modules](#native-modules)
- [Platform-Specific Code](#platform-specific-code)
- [Styling with NativeWind](#styling-with-nativewind)
- [Authentication](#authentication)
- [Offline Support](#offline-support)
- [Push Notifications](#push-notifications)
- [Camera and Media](#camera-and-media)
- [Deep Linking](#deep-linking)
- [Testing Mobile Apps](#testing-mobile-apps)
- [Building and Distribution](#building-and-distribution)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

---

## Overview

This template uses **Expo** for mobile development, providing a streamlined development experience with:

- **Expo SDK 50+**: Latest features and APIs
- **Expo Router**: File-based routing system
- **NativeWind**: Tailwind CSS for React Native
- **TypeScript**: End-to-end type safety
- **EAS Build**: Cloud-based build service
- **EAS Update**: Over-the-air updates

### Why Expo?

✅ **Fast Development**: Hot reload, no native build required for most features
✅ **Cross-Platform**: Single codebase for iOS and Android
✅ **Rich Ecosystem**: Extensive library of native modules
✅ **Easy Distribution**: Simplified build and deployment process
✅ **OTA Updates**: Update apps without app store review

---

## Expo Setup

### Installation

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Install dependencies
cd apps/mobile
pnpm install

# Start development server
pnpm start
```

### app.json Configuration

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.mycompany.myapp",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.mycompany.myapp",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera"
        }
      ],
      [
        "expo-media-library",
        {
          "photosPermission": "Allow $(PRODUCT_NAME) to access your photos",
          "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos"
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

### Environment Variables

Create `.env` file in `apps/mobile`:

```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# App Config
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_URL=https://api.example.com

# Feature Flags
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS=true
```

**⚠️ Security Note:** Only expose public keys via `EXPO_PUBLIC_*`. Never expose secret keys.

---

## Project Structure

```
apps/mobile/
├── app/                    # Expo Router file-based routing
│   ├── (auth)/            # Auth-protected routes
│   │   ├── _layout.tsx    # Auth layout
│   │   ├── home.tsx       # Home screen
│   │   └── profile.tsx    # Profile screen
│   ├── (tabs)/            # Tab navigation
│   │   ├── _layout.tsx    # Tab layout
│   │   ├── index.tsx      # First tab
│   │   └── settings.tsx   # Settings tab
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Entry point
│   ├── login.tsx          # Login screen
│   └── +not-found.tsx     # 404 screen
├── components/             # Mobile-specific components
│   ├── ui/                # UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── features/          # Feature components
│   │   ├── TodoList.tsx
│   │   └── TodoItem.tsx
│   └── layouts/           # Layout components
│       └── Screen.tsx
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts
│   ├── useTodos.ts
│   └── useCamera.ts
├── utils/                  # Utility functions
│   ├── storage.ts         # MMKV storage
│   └── permissions.ts     # Permission helpers
├── assets/                 # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── metro.config.js        # Metro bundler config
├── tailwind.config.js     # NativeWind config
└── tsconfig.json          # TypeScript config
```

---

## Navigation with Expo Router

### File-Based Routing

Expo Router uses the file system for navigation:

```typescript
// app/_layout.tsx - Root layout
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

```typescript
// app/(tabs)/_layout.tsx - Tab navigation
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### Navigation Patterns

```typescript
// app/(tabs)/index.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className="flex-1 p-4">
      {/* Using Link component */}
      <Link href="/profile" asChild>
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
          <Text className="text-white text-center">Go to Profile</Text>
        </TouchableOpacity>
      </Link>

      {/* Using router.push() */}
      <TouchableOpacity
        onPress={() => router.push('/profile')}
        className="bg-green-500 p-4 rounded-lg mt-4"
      >
        <Text className="text-white text-center">Profile (router)</Text>
      </TouchableOpacity>

      {/* Passing parameters */}
      <TouchableOpacity
        onPress={() => router.push({ pathname: '/user/[id]', params: { id: '123' } })}
        className="bg-purple-500 p-4 rounded-lg mt-4"
      >
        <Text className="text-white text-center">User Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Route Parameters

```typescript
// app/user/[id].tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">User ID: {id}</Text>
    </View>
  );
}
```

### Protected Routes

```typescript
// app/(auth)/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
    </Stack>
  );
}
```

---

## UI Components

### Button Component

```typescript
// components/ui/Button.tsx
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { cn } from '@app/utils';

interface ButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-blue-500 active:bg-blue-600',
    secondary: 'bg-gray-500 active:bg-gray-600',
    danger: 'bg-red-500 active:bg-red-600',
  };

  const sizeStyles = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        'rounded-lg',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && 'opacity-50',
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={cn('text-white font-semibold text-center', textSizeStyles[size])}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
```

### Input Component

```typescript
// components/ui/Input.tsx
import { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@app/utils';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  className?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  autoCapitalize = 'none',
  keyboardType = 'default',
  className,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={cn('mb-4', className)}>
      {label && <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">{label}</Text>}

      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          className={cn(
            'border rounded-lg px-4 py-3 text-base',
            error
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100'
          )}
          placeholderTextColor="#9CA3AF"
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
```

---

## State Management

### Using Zustand

```typescript
// libs/@app/state/src/stores/todoStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (title) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now().toString(), title, completed: false }],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const value = storage.getString(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          storage.set(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          storage.delete(key);
        },
      })),
    }
  )
);
```

---

## Data Fetching

### Using TanStack Query

```typescript
// hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@app/data';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
  created_at: string;
}

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Todo[];
    },
  });

  const addTodo = useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await supabase
        .from('todos')
        .insert({ title })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleTodo = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !completed })
        .eq('id', id);

      if (error) throw error;
    },
    onMutate: async ({ id, completed }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old?.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );

      return { previousTodos };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    isLoading,
    error,
    addTodo: addTodo.mutate,
    toggleTodo: toggleTodo.mutate,
    isAddingTodo: addTodo.isPending,
  };
}
```

---

## Native Modules

### Camera

```typescript
// hooks/useCamera.ts
import { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export function useCamera() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);

  const requestPermissions = async () => {
    try {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();

      setHasPermission(
        cameraPermission.status === 'granted' && mediaPermission.status === 'granted'
      );

      if (cameraPermission.status !== 'granted') {
        Alert.alert(
          'Camera Permission',
          'Camera permission is required to take photos.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Permission request error:', error);
      setHasPermission(false);
    }
  };

  const takePicture = async (cameraRef: React.RefObject<Camera>) => {
    try {
      if (!cameraRef.current) {
        throw new Error('Camera ref not available');
      }

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      await MediaLibrary.saveToLibraryAsync(photo.uri);

      Alert.alert('Success', 'Photo saved to gallery!');
      return photo;
    } catch (error) {
      console.error('Take picture error:', error);
      Alert.alert('Error', 'Failed to take picture');
      return null;
    }
  };

  return {
    hasPermission,
    type,
    setType,
    requestPermissions,
    takePicture,
  };
}
```

### Location

```typescript
// hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(location);
      } catch (error) {
        console.error('Location error:', error);
        setErrorMsg('Failed to get location');
      }
    })();
  }, []);

  return { location, errorMsg };
}
```

---

## Platform-Specific Code

### Using Platform Module

```typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
```

### Platform-Specific Files

```typescript
// components/Header.ios.tsx
export function Header() {
  return <IOSHeader />;
}

// components/Header.android.tsx
export function Header() {
  return <AndroidHeader />;
}

// Usage (auto-imports correct file)
import { Header } from './components/Header';
```

---

## Styling with NativeWind

### Setup

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
    },
  },
  plugins: [],
};
```

### Usage

```typescript
import { View, Text } from 'react-native';

export function Card() {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        Hello World
      </Text>
      <Text className="text-gray-600 dark:text-gray-400 mt-2">
        This is a card component
      </Text>
    </View>
  );
}
```

---

## Authentication

### Auth Hook

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '@app/data';
import { Session, User } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    session,
    user,
    loading,
    signIn,
    signOut,
  };
}
```

---

## Offline Support

### Persistent Cache with TanStack Query

```typescript
// app/_layout.tsx
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function RootLayout() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {/* Your app */}
    </PersistQueryClientProvider>
  );
}
```

---

## Push Notifications

### Setup

```typescript
// utils/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  try {
    if (!Device.isDevice) {
      console.log('Must use physical device for push notifications');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'your-project-id',
    });

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token.data;
  } catch (error) {
    console.error('Push notification registration error:', error);
    return null;
  }
}
```

---

## Testing Mobile Apps

### Unit Testing with Jest

```typescript
// components/ui/__tests__/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="Click me" onPress={() => {}} />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when clicked', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click me" onPress={onPress} />);

    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button title="Click me" onPress={() => {}} loading />
    );

    expect(queryByText('Click me')).toBeNull();
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });
});
```

### E2E Testing with Detox

```javascript
// e2e/login.test.js
describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login successfully', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();

    await expect(element(by.id('home-screen'))).toBeVisible();
  });

  it('should show error for invalid credentials', async () => {
    await element(by.id('email-input')).typeText('wrong@example.com');
    await element(by.id('password-input')).typeText('wrongpass');
    await element(by.id('login-button')).tap();

    await expect(element(by.text('Invalid credentials'))).toBeVisible();
  });
});
```

---

## Building and Distribution

### EAS Build Configuration

```json
// eas.json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "simulator": false
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
        "serviceAccountKeyPath": "./secrets/play-store-key.json",
        "track": "internal"
      }
    }
  }
}
```

### Build Commands

```bash
# Development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Preview build (for internal testing)
eas build --profile preview --platform all

# Production build
eas build --profile production --platform all

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### OTA Updates with EAS Update

```bash
# Configure EAS Update
eas update:configure

# Publish update
eas update --branch production --message "Bug fixes"

# View updates
eas update:list --branch production
```

---

## Performance Optimization

### Image Optimization

```typescript
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>
```

### List Optimization

```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={todos}
  renderItem={({ item }) => <TodoItem todo={item} />}
  estimatedItemSize={80}
  keyExtractor={(item) => item.id}
/>
```

### Memoization

```typescript
import { memo, useCallback, useMemo } from 'react';

const TodoItem = memo(({ todo, onToggle }: TodoItemProps) => {
  const handlePress = useCallback(() => {
    onToggle(todo.id, todo.completed);
  }, [todo.id, todo.completed, onToggle]);

  const textStyle = useMemo(
    () => ({ textDecorationLine: todo.completed ? 'line-through' : 'none' }),
    [todo.completed]
  );

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={textStyle}>{todo.title}</Text>
    </TouchableOpacity>
  );
});
```

---

## Troubleshooting

### Common Issues

**Metro bundler not starting:**
```bash
# Clear cache and restart
npx expo start --clear
```

**iOS build fails:**
```bash
# Clean CocoaPods
cd ios && pod deintegrate && pod install && cd ..
```

**Android build fails:**
```bash
# Clean Gradle cache
cd android && ./gradlew clean && cd ..
```

**Module not found:**
```bash
# Clear watchman
watchman watch-del-all
# Clear metro cache
npx expo start --clear
```

---

## Next Steps

- **[API Documentation](./API.md)** - Backend API integration
- **[Web Development](./WEB.md)** - React web application patterns
- **[Backend Guide](./BACKEND.md)** - Supabase backend setup
- **[Testing Strategy](../TESTING.md)** - Comprehensive testing guide
- **[Security Implementation](./SECURITY_IMPLEMENTATION.md)** - Security best practices

---

**Made with ❤️ for mobile developers**
