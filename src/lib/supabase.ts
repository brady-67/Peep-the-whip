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
