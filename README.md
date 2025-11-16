# Nx + Expo Super App Workspace

This repository documents the end-to-end plan for building a full-stack, multi-platform application using an Nx monorepo. The workspace unifies an Expo-powered mobile app, a React Native for Web/TanStack Start web client, Tauri desktop shell, and shared libraries that encapsulate design systems, data access, and state management.

## Monorepo overview

The Nx workspace is organized into the following top-level applications and libraries:

| Package | Description |
| --- | --- |
| `apps/mobile` (Expo) | React Native app targeting iOS, Android, and EAS builds/updates. |
| `apps/web` (TanStack Start + React Native for Web) | Vite-bundled SPA that shares components with the mobile app. |
| `apps/desktop` (Tauri) | Desktop client that reuses the web bundle inside a Tauri shell. |
| `libs/@app/shared-ui` | Cross-platform UI kit using NativeWind/Tailwind tokens for RN + Web. |
| `libs/@app/data` | Data-access utilities that wrap Supabase SDK, Edge Function clients, and tRPC routers. |
| `libs/@app/state` | Zustand stores backed by MMKV for persistent offline caching. |

Nx generators keep boundaries explicit (e.g., `nx g @nx/react-native:lib`), and `project.json` tags enforce dependency rules between apps and shared libraries.

## Technology stack

* **Frontend:** React Native + Expo, React Native for Web, TanStack Start (TanStack Router + Vite), NativeWind/Tailwind for styling.
* **State & data:** TanStack Query for async cache + background sync, Zustand + MMKV for synchronous client state, Supabase (Postgres, Auth) with Edge Functions, tRPC contracts exposed through TanStack Router loaders/actions.
* **Desktop:** Tauri bundling the web build while reusing shared UI, data, and state packages.
* **Tooling:** Nx for task orchestration, TypeScript project references, ESLint/Prettier, Husky/lint-staged.
* **DevX:** Storybook/Expo Router previews, AI copilots integrated through Nx tasks for lint/tests.

## Workspace setup

1. **Initialize Nx workspace**
   ```bash
   npx create-nx-workspace@latest super-app \
     --preset=apps --nxCloud --packageManager=pnpm
   cd super-app
   ```
2. **Add the web app**
   ```bash
   nx g @nx/react:app web --bundler=vite --routing=true --style=css
   ```
3. **Add Expo mobile + shared libs**
   ```bash
   nx g @nx/expo:application mobile
   nx g @nx/react-native:application desktop-shell --directory=apps/desktop --framework=tauri
   nx g @nx/react-native:lib shared-ui --directory=libs/@app
   nx g @nx/js:lib data --directory=libs/@app --bundler=tsc
   nx g @nx/js:lib state --directory=libs/@app --bundler=tsc
   ```
4. **Configure React Native for Web**
   * Install dependencies: `pnpm add react-native-web @expo/metro-runtime nativewind tailwindcss`.
   * Update `apps/web/vite.config.ts` to alias `react-native$` to `react-native-web` and include Metro Babel plugins.
   * Share Tailwind config via `libs/@app/shared-ui/tailwind.config.js` and extend in app-level configs.
5. **Wire TanStack Query + Supabase**
   * Install `@tanstack/react-query`, `@tanstack/router`, `@supabase/supabase-js`, `@trpc/server`, `@trpc/client`.
   * Create a `libs/@app/data/src/client.ts` that exports a configured `createBrowserSupabaseClient`, TanStack Query client, and tRPC proxy.
   * Compose providers in `apps/mobile/src/app.tsx` and `apps/web/src/main.tsx` to wrap routes with `QueryClientProvider`, `SupabaseContext`, and `TRPCProvider`.
   * Edge Functions deploy script lives under `tools/scripts/deploy-edge-functions.ts` and is referenced by Nx targets.

## Development workflows

* **Type safety:** TypeScript project references + `tsc --build`, shared Zod schemas exported from `libs/@app/data`, and tRPC routers reused on both client/server.
* **Offline caching:** TanStack Query persistent storage backed by MMKV on mobile and IndexedDB on web/desktop; Zustand slices subscribe to Query cache for optimistic updates.
* **AI integration:** Nx targets `nx run tools:ai-lint` and `nx run tools:ai-test` call AI agents (OpenAI/GPT-5 Codex) to review diffs and suggest fixes.
* **Design system:** NativeWind theme tokens defined in `libs/@app/shared-ui/theme.ts`, consumed by both RN and web components.

## Testing strategy

| Surface | Tooling |
| --- | --- |
| Unit/type | Jest + ts-jest + Testing Library for RN/Web components, MSW for network mocks. |
| Mobile e2e | Maestro flows for black-box functional tests; Detox for component-level assertions. |
| Web/desktop e2e | Playwright projects for web and Tauri builds, reusing fixtures from shared libs. |

Nx target examples:
```bash
nx run mobile:test    # Jest + RN Testing Library
nx run web:e2e        # Playwright
nx run mobile:maestro # Maestro YAML suites
```

## CI/CD pipelines

* **GitHub Actions:** Matrix jobs for lint/test/build across apps. Caching uses `pnpm store` + Nx Cloud. Secrets stored via Actions environments.
* **Web deploys:** `nx run web:build` output published to Netlify via `netlify deploy --dir=dist/apps/web`. Preview deploys on PRs.
* **Mobile releases:** Expo EAS Build profiles triggered via `eas build --platform ios|android`, plus `eas update` for OTA updates referencing Nx build artifacts.
* **Desktop builds:** Tauri GitHub Action builds per OS and uploads artifacts to Releases.

## Monitoring, analytics, and security

* **Observability:** Sentry SDK added in `libs/@app/shared-ui/providers/sentry.tsx` and initialized in app entrypoints. Release health uses sourcemaps emitted by Nx builds.
* **Product analytics:** PostHog auto-capture integrated via `libs/@app/data/analytics.ts` and gated behind user consent.
* **Security:** Supabase Row Level Security policies defined in `/supabase/policies.sql`, secrets managed through `.env`, `.env.local`, and Nx `dotenv` targets. Edge Functions enforce JWT validation and rate limiting.

## Scaling considerations

* Use Nx module boundaries + tagging to prevent unintended coupling as more feature libs (e.g., `libs/@app/features/*`) are added.
* Split TanStack Query caches by route segments to avoid waterfall fetches, and leverage Suspense boundaries for streaming.
* Introduce background sync workers (Service Workers + Expo Task Manager) for offline-first collaboration features.
* Invest in automated upgrade scripts (`nx migrate`, `expo install --fix`) to stay current with Nx, Expo, and React Native ecosystems.

## References

* [Nx Docs – React Native & Expo](https://nx.dev/packages/react-native)
* [Expo Application Services](https://docs.expo.dev/eas/)
* [TanStack Start & Router](https://tanstack.com/router/latest)
* [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
* [Tauri Apps](https://tauri.app/)
