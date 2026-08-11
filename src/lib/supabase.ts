import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CarRow {
  id: string;
  name: string;
  year: number;
  price: number;
  mileage: string;
  transmission: string;
  fuel: string;
  engine: string;
  images: string[];
  badge: string | null;
  specs: string[];
  created_at?: string;
}

export interface RigRow {
  id: string;
  name: string;
  year: number;
  price: number;
  terrain: string;
  drivetrain: string;
  winch: string;
  lift: string;
  images: string[];
  badge: string | null;
  specs: string[];
  created_at?: string;
}

export interface PartRow {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: 'In Stock' | 'On Order';
  images: string[];
  fits: string;
  created_at?: string;
}

export interface ProjectCarRow {
  id: string;
  name: string;
  year: number;
  base_price: number;
  build_price: number;
  condition: string;
  images: string[];
  description: string;
  build_time: string;
  discount: string;
  created_at?: string;
}
