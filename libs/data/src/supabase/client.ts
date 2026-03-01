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

// Singleton instance for web (lazy initialized)
let client: SupabaseClient<Database> | null = null;

/**
 * Gets the singleton Supabase client for web applications.
 * Uses environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
 *
 * For mobile apps, use createSupabaseClient() with a custom storage adapter.
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!client) {
    // Try Vite environment variables first, then fallback to process.env
    const url = import.meta?.env?.VITE_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
    const key = import.meta?.env?.VITE_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!url || !key) {
      throw new Error(
        'Supabase configuration missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
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
