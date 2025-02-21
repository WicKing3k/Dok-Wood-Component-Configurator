import { create } from 'zustand';
import { supabase, handleSupabaseError } from '../supabase';
import type { Database } from '../supabase-types';

type Material = Database['public']['Tables']['materials']['Row'];
type MaterialInput = Database['public']['Tables']['materials']['Insert'];

type Product = Database['public']['Tables']['products']['Row'];
type ProductInput = Database['public']['Tables']['products']['Insert'];

interface MaterialsState {
  materials: Material[];
  loading: boolean;
  fetchMaterials: () => Promise<void>;
  addMaterial: (material: MaterialInput) => Promise<void>;
  updateMaterial: (id: string, material: Partial<Material>) => Promise<void>;
  deleteMaterial: (id: string) => Promise<void>;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: ProductInput) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
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

export const useProducts = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('designation');
        
      if (error) {
        throw new Error(handleSupabaseError(error));
      }
      
      set({ products: data || [] });
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();
        
      if (error) {
        throw new Error(handleSupabaseError(error));
      }
      
      if (data) {
        set({ products: [...get().products, data] });
      }
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
  updateProduct: async (id, product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        throw new Error(handleSupabaseError(error));
      }
      
      if (data) {
        set({
          products: get().products.map((p) => 
            p.id === id ? data : p
          ),
        });
      }
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
  deleteProduct: async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw new Error(handleSupabaseError(error));
      }
      
      set({
        products: get().products.filter((p) => p.id !== id),
      });
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
}));