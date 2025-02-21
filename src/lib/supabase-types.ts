export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'project_manager' | 'architect' | 'fire_protection' | 'sound_protection'
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'project_manager' | 'architect' | 'fire_protection' | 'sound_protection'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'project_manager' | 'architect' | 'fire_protection' | 'sound_protection'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      materials: {
        Row: {
          id: string
          designation: string
          manufacturer: string | null
          spatial_load: number | null
          area_load: number | null
          density_source: string | null
          lambda_value: number | null
          sd_value: number | null
          mu_dry: number | null
          mu_wet: number | null
          lambda_mu_source: string | null
          vkf_classification: string | null
          unit: string | null
          price: number | null
          datasheet_url: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          designation: string
          manufacturer?: string | null
          spatial_load?: number | null
          area_load?: number | null
          density_source?: string | null
          lambda_value?: number | null
          sd_value?: number | null
          mu_dry?: number | null
          mu_wet?: number | null
          lambda_mu_source?: string | null
          vkf_classification?: string | null
          unit?: string | null
          price?: number | null
          datasheet_url?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          designation?: string
          manufacturer?: string | null
          spatial_load?: number | null
          area_load?: number | null
          density_source?: string | null
          lambda_value?: number | null
          sd_value?: number | null
          mu_dry?: number | null
          mu_wet?: number | null
          lambda_mu_source?: string | null
          vkf_classification?: string | null
          unit?: string | null
          price?: number | null
          datasheet_url?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}