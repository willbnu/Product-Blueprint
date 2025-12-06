# Mobile App (Expo)

> **Product Blueprint** - Expo Mobile App

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start
```

## Features

- 📱 Expo SDK 52 with Expo Router 4
- 🎨 NativeWind (Tailwind CSS for React Native)
- 🔐 Supabase Authentication
- 📦 Zustand State Management
- 🔄 TanStack Query for data fetching

## Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Project Structure

```
app/
├── _layout.tsx          # Root layout with providers
├── index.tsx            # Entry redirect
├── (auth)/              # Auth screens
│   ├── _layout.tsx
│   ├── login.tsx
│   └── register.tsx
└── (tabs)/              # Tab navigation
    ├── _layout.tsx
    ├── index.tsx        # Home screen
    └── profile.tsx      # Profile screen
```

## Development

```bash
# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Run on web
npx expo start --web
```

## Build

```bash
# Create development build
npx expo prebuild

# Build for production
eas build --platform ios
eas build --platform android
```
