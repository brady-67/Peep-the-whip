export interface Car {
  id: string;
  name: string;
  year: number;
  price: number;
  mileage: string;
  transmission: string;
  fuel: string;
  engine: string;
  images: string[];
  badge?: string;
  specs: string[];
}

export interface Rig {
  id: string;
  name: string;
  year: number;
  price: number;
  terrain: string;
  drivetrain: string;
  winch: string;
  lift: string;
  images: string[];
  badge?: string;
  specs: string[];
}

export interface Part {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: 'In Stock' | 'On Order';
  images: string[];
  fits: string;
}

export interface ProjectCar {
  id: string;
  name: string;
  year: number;
  basePrice: number;
  buildPrice: number;
  condition: string;
  images: string[];
  description: string;
  buildTime: string;
  discount: string;
}

// All inventory (cars, rigs, parts, project cars) now lives in Supabase —
// see supabase/migrations/ for table definitions and seed data — and is
// fetched at runtime by src/pages/*.tsx and managed via src/pages/admin/*.

export function formatKES(amount: number): string {
  return 'KSh ' + amount.toLocaleString('en-KE');
}
