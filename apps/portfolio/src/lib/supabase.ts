import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create Supabase client if both URL and key are provided
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Type definitions for portfolio tables
export interface PortfolioContact {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
    status: 'new' | 'read' | 'replied';
}

export interface PortfolioProject {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    image_url: string;
    gradient_color: string;
    year: string;
    tags: string[];
    published: boolean;
    created_at: string;
    updated_at: string;
}

// Contact form submission
export async function submitContact(data: {
    name: string;
    email: string;
    message: string;
}) {
    // If Supabase is not configured, log to console (development mode)
    if (!supabase) {
        console.log('Contact form submission (dev mode):', data);
        return { success: true, data: null };
    }

    const { data: result, error } = await supabase
        .from('portfolio_contacts')
        .insert([data])
        .select()
        .single();

    if (error) {
        console.error('Error submitting contact:', error);
        return { success: false, error: error.message };
    }

    return { success: true, data: result };
}

// Fetch published projects
export async function fetchProjects() {
    // If Supabase is not configured, return null (use static data)
    if (!supabase) {
        return null;
    }

    const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return null;
    }

    return data;
}
