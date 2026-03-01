/// <reference types="@supabase/supabase-js" />

/**
 * Database types for Supabase.
 *
 * To generate these types from your actual database:
 *
 * Option 1: Using Supabase CLI (recommended)
 * 1. Install: `npm install -g supabase`
 * 2. Login: `supabase login`
 * 3. Link: `supabase link --project-ref your-project-ref`
 * 4. Generate: `supabase gen types typescript --local > libs/data/src/supabase/types.ts`
 *
 * Option 2: From remote database
 * `supabase gen types typescript --project-id your-project-id > libs/data/src/supabase/types.ts`
 *
 * The types below are a minimal example. Replace them with your generated types.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
