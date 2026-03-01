import { createSupabaseClient, type StorageAdapter } from '@pb/data';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Expo SecureStore adapter for mobile
const ExpoSecureStoreAdapter: StorageAdapter = {
  getItem: async (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};

// Create and export the Supabase client using the shared factory
export const supabase = createSupabaseClient({
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  storage: ExpoSecureStoreAdapter,
});
