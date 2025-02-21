import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a single supabase instance with more robust configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { 'x-application-name': 'dok-wood' },
    fetch: (url, options = {}) => {
      const timeout = 15000; // 15 second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      return fetch(url, {
        ...options,
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));
    },
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
});

// Enhanced connection check with timeout
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const { error } = await supabase
      .from('materials')
      .select('id')
      .limit(1)
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);
    return !error;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
}

// Enhanced error handler with more specific error messages
export function handleSupabaseError(error: any): string {
  if (!error) return 'An unknown error occurred';

  // Network errors
  if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
    return 'Unable to connect to the server. Please check your internet connection and try again.';
  }

  // Timeout errors
  if (error.name === 'AbortError' || error.message?.includes('timeout')) {
    return 'The server is taking too long to respond. Please try again.';
  }

  // Authentication errors
  if (error.status === 401 || error.code === 'PGRST301') {
    return 'Your session has expired. Please refresh the page.';
  }

  // Rate limiting
  if (error.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  // Database errors
  if (error.code?.startsWith('22') || error.code?.startsWith('23')) {
    return 'A database error occurred. Please try again.';
  }

  // PostgreSQL errors
  if (error.code === 'PGRST301') {
    return 'Database connection error. Please try again.';
  }

  if (error.code === 'PGRST116') {
    return 'No data found. Please try again.';
  }

  // Return the error message if we have one, otherwise a generic message
  return error.message || error.error_description || 'An unexpected error occurred';
}