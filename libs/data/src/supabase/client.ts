import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Storage adapter interface for platform-specific storage.
 * Web: localStorage
 * Mobile: expo-secure-store
 */
export interface StorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

/**
 * Configuration for Supabase client
 */
export interface SupabaseConfig {
  url: string;
  anonKey: string;
  storage?: StorageAdapter;
}

/**
 * Creates a Supabase client with the provided configuration.
 * Platform-aware: uses custom storage adapter if provided (for mobile),
 * otherwise defaults to localStorage (for web).
 */
export function createSupabaseClient(config: SupabaseConfig): SupabaseClient<Database> {
  const { url, anonKey, storage } = config;

  const defaultStorage: StorageAdapter = {
    getItem: async (key) => {
      if (typeof localStorage === 'undefined') return null;
      return localStorage.getItem(key);
    },
    setItem: async (key, value) => {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(key, value);
    },
    removeItem: async (key) => {
      if (typeof localStorage === 'undefined') return;
      localStorage.removeItem(key);
    },
  };

  return createClient<Database>(url, anonKey, {
    auth: {
      storage: storage || defaultStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

// Singleton instance (lazy initialized)
let client: SupabaseClient<Database> | null = null;

/**
 * Gets the singleton Supabase client.
 * Uses environment variables:
 * - Web (Vite): VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (mapped via vite.config.ts)
 * - Mobile (Expo): EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY
 *
 * For custom storage (mobile), use createSupabaseClient() directly.
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!client) {
    // Environment variables are accessed via process.env for cross-platform compatibility
    // Vite maps VITE_* to process.env.EXPO_PUBLIC_* via define in vite.config.ts
    const url = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
    const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!url || !key) {
      throw new Error(
        'Supabase configuration missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (web) ' +
        'or EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY (mobile) environment variables.'
      );
    }

    client = createSupabaseClient({ url, anonKey: key });
  }
  return client;
}

/**
 * Resets the singleton client (useful for testing or switching projects)
 */
export function resetSupabaseClient(): void {
  client = null;
}

// Re-export types
export type { Database } from './types';
