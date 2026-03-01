// Supabase client
export {
  createSupabaseClient,
  getSupabase,
  resetSupabaseClient,
  type StorageAdapter,
  type SupabaseConfig,
} from './supabase/client';

// Types
export type { Database, Tables, InsertTables, UpdateTables } from './supabase/types';

// Auth API
export {
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getSession,
  getCurrentUser,
  onAuthStateChange,
  type AuthResult,
} from './api/auth';

// Hooks
export { useSession } from './hooks/useSession';
