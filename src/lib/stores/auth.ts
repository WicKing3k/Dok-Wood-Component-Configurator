import { create } from 'zustand';
import { supabase } from '../supabase';
import type { Database } from '../supabase-types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    try {
      const { error: signInError, data: { user: authUser } } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) throw signInError;
      if (!authUser) throw new Error('No user found after sign in');

      // First upsert the profile
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: authUser.id,
          email: authUser.email!,
          role: 'architect',
        });

      if (upsertError) throw upsertError;

      // Then fetch the profile in a separate query
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select()
        .eq('id', authUser.id)
        .single();

      if (fetchError) throw fetchError;
      if (!profile) throw new Error('Profile not found after upsert');

      set({ user: profile });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // First upsert the profile
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            email: session.user.email!,
            role: 'architect',
          });

        if (upsertError) throw upsertError;

        // Then fetch the profile in a separate query
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select()
          .eq('id', session.user.id)
          .single();

        if (fetchError) throw fetchError;
        if (!profile) throw new Error('Profile not found after upsert');

        set({ user: profile });
      }
    } catch (error) {
      console.error('Initialize error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));