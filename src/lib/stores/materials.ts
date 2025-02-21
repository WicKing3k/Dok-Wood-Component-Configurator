import { create } from 'zustand';
import { supabase, handleSupabaseError } from '../supabase';
import type { Database } from '../supabase-types';

type Material = Database['public']['Tables']['materials']['Row'];
type MaterialInput = Database['public']['Tables']['materials']['Insert'];

interface MaterialsState {
  materials: Material[];
  loading: boolean;
  fetchMaterials: () => Promise<void>;
  addMaterial: (material: MaterialInput) => Promise<void>;
  updateMaterial: (id: string, material: Partial<Material>) => Promise<void>;
  deleteMaterial: (id: string) => Promise<void>;
}

export const useMaterials = create<MaterialsState>((set, get) => ({
  materials: [],
  loading: false,
  fetchMaterials: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('designation');
        
      if (error) {
        throw new Error(handleSupabaseError(error));
      }
      
      set({ materials: data || [] });
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    } finally {
      set({ loading: false });
    }
  },
  addMaterial: async (material) => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .insert(material)
        .select()
        .single();
        
      if (error) {
        throw new Error(handleSupabaseError(error));
      }
      
      if (data) {
        set({ materials: [...get().materials, data] });
      }
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
  updateMaterial: async (id, material) => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .update(material)
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        throw new Error(handleSupabaseError(error));
      }
      
      if (data) {
        set({
          materials: get().materials.map((m) => 
            m.id === id ? data : m
          ),
        });
      }
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
  deleteMaterial: async (id) => {
    try {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw new Error(handleSupabaseError(error));
      }
      
      set({
        materials: get().materials.filter((m) => m.id !== id),
      });
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
}));