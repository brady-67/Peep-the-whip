export interface Car {
  id: string;
  name: string;
  year: number;
  price: number;
  mileage: string;
  transmission: string;
  fuel: string;
  engine: string;
  image: string;
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
  image: string;
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
  image: string;
  fits: string;
}

export interface ProjectCar {
  id: string;
  name: string;
  year: number;
  basePrice: number;
  buildPrice: number;
  condition: string;
  image: string;
  description: string;
  buildTime: string;
  discount: string;
}

export const cars: Car[] = [
  {
    id: 'm5-f90',
    name: 'BMW M5 F90 Competition',
    year: 2022,
    price: 12500000,
    mileage: '18,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '4.4L V8 Twin-Turbo',
    image: 'https://images.pexels.com/photos/17888840/pexels-photo-17888840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: 'Featured',
    specs: ['625 HP', '0-100 in 3.3s', 'M xDrive AWD', 'Carbon Ceramic Brakes'],
  },
  {
    id: 'm3-white',
    name: 'BMW M3 Competition',
    year: 2021,
    price: 9800000,
    mileage: '24,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.0L Inline-6 Twin-Turbo',
    image: 'https://images.pexels.com/photos/7663126/pexels-photo-7663126.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    specs: ['503 HP', '0-100 in 3.5s', 'M xDrive AWD', '8-speed M Steptronic'],
  },
  {
    id: 'm3-black',
    name: 'BMW M3 CS',
    year: 2023,
    price: 14200000,
    mileage: '8,500 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.0L Inline-6 Twin-Turbo',
    image: 'https://images.pexels.com/photos/29580174/pexels-photo-29580174.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: 'New Arrival',
    specs: ['530 HP', '0-100 in 3.4s', 'M xDrive AWD', 'Carbon Roof'],
  },
  {
    id: '5-series',
    name: 'BMW 5 Series 540i',
    year: 2020,
    price: 6500000,
    mileage: '42,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.0L Inline-6 Turbo',
    image: 'https://images.pexels.com/photos/14292717/pexels-photo-14292717.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    specs: ['335 HP', '0-100 in 5.1s', 'Rear-Wheel Drive', 'Luxury Package'],
  },
  {
    id: 'bmw-black',
    name: 'BMW 740Li',
    year: 2021,
    price: 11500000,
    mileage: '15,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.0L Inline-6 Turbo',
    image: 'https://images.pexels.com/photos/13058788/pexels-photo-13058788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: 'Executive',
    specs: ['335 HP', 'Extended Wheelbase', 'Executive Lounge', 'Bowers & Wilkins'],
  },
  {
    id: 'bmw-silver',
    name: 'BMW 840i Gran Coupe',
    year: 2022,
    price: 13800000,
    mileage: '12,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.0L Inline-6 Turbo',
    image: 'https://images.pexels.com/photos/10555130/pexels-photo-10555130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    specs: ['335 HP', '0-100 in 5.2s', 'xDrive AWD', 'M Sport Package'],
  },
];

export const rigs: Rig[] = [
  {
    id: 'defender-orange',
    name: 'Land Rover Defender 110',
    year: 2022,
    price: 15500000,
    terrain: 'All-Terrain',
    drivetrain: '4WD',
    winch: 'Warn Zeon 10-S',
    lift: '2-inch Lift Kit',
    image: 'https://images.pexels.com/photos/9155303/pexels-photo-9155303.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: 'Featured',
    specs: ['3.0L V6 Diesel', 'Locking Diffs', 'Snorkel Kit', '37" All-Terrain Tyres'],
  },
  {
    id: 'defender-sunset',
    name: 'Land Rover Defender 90',
    year: 2021,
    price: 13200000,
    terrain: 'Mud & Rock',
    drivetrain: '4WD',
    winch: 'Factor 55',
    lift: '3-inch Lift Kit',
    image: 'https://images.pexels.com/photos/14901782/pexels-photo-14901782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: 'Trail Ready',
    specs: ['2.0L V6 Diesel', 'Rock Sliders', 'Roof Rack', '35" Mud Tyres'],
  },
  {
    id: 'jeep-red',
    name: 'Jeep Wrangler Rubicon',
    year: 2023,
    price: 9800000,
    terrain: 'Extreme Offroad',
    drivetrain: '4WD',
    winch: 'Warn 86860',
    lift: '4-inch Lift Kit',
    image: 'https://images.pexels.com/photos/13118533/pexels-photo-13118533.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: 'New Arrival',
    specs: ['3.6L V6 Pentastar', 'Front + Rear Lockers', 'Disconnecting Sway Bar', '37" Mud-Terrain Tyres'],
  },
  {
    id: 'jeep-white',
    name: 'Jeep Wrangler Sahara',
    year: 2022,
    price: 8200000,
    terrain: 'All-Terrain',
    drivetrain: '4WD',
    winch: 'Smittybilt X20',
    lift: '2.5-inch Lift Kit',
    image: 'https://images.pexels.com/photos/18078250/pexels-photo-18078250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    specs: ['2.0L Turbo', 'Limited Slip Diff', 'Heavy Duty Bumpers', '33" All-Terrain Tyres'],
  },
  {
    id: 'landcruiser',
    name: 'Land Cruiser 79 V8',
    year: 2022,
    price: 17500000,
    terrain: 'Expedition',
    drivetrain: '4WD',
    winch: 'Warn 12-S',
    lift: '3-inch Lift Kit',
    image: 'https://images.pexels.com/photos/29884884/pexels-photo-29884884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: 'Expedition Build',
    specs: ['4.5L V8 Diesel', 'Dual Battery', 'Roof Tent Ready', '33" All-Terrain Tyres'],
  },
  {
    id: 'g-wagon',
    name: 'Mercedes G63 AMG',
    year: 2023,
    price: 28000000,
    terrain: 'Luxury Offroad',
    drivetrain: '4WD',
    winch: 'OEM AMG',
    lift: 'OEM Lift',
    image: 'https://images.pexels.com/photos/9283116/pexels-photo-9283116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: 'Premium',
    specs: ['4.0L V8 Biturbo', '585 HP', '3 Locking Diffs', '21" AMG Wheels'],
  },
];

export const parts: Part[] = [
  {
    id: 'p1',
    name: 'BMW S55 Downpipes',
    category: 'Exhaust',
    brand: 'Akrapovic',
    price: 185000,
    stock: 'In Stock',
    image: 'https://images.pexels.com/photos/12658309/pexels-photo-12658309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    fits: 'BMW M3/M4 G8x',
  },
  {
    id: 'p2',
    name: 'Coilover Suspension Kit',
    category: 'Suspension',
    brand: 'KW Variant 3',
    price: 320000,
    stock: 'In Stock',
    image: 'https://images.pexels.com/photos/15492981/pexels-photo-15492981.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    fits: 'BMW 3/4/5 Series',
  },
  {
    id: 'p3',
    name: 'Carbon Fibre Intake',
    category: 'Intake',
    brand: 'Eventuri',
    price: 145000,
    stock: 'On Order',
    image: 'https://images.pexels.com/photos/12658302/pexels-photo-12658302.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    fits: 'BMW M3/M4 S55',
  },
  {
    id: 'p4',
    name: 'Performance Brake Kit',
    category: 'Brakes',
    brand: 'Brembo GT',
    price: 540000,
    stock: 'In Stock',
    image: 'https://images.pexels.com/photos/6941483/pexels-photo-6941483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    fits: 'BMW M-Series',
  },
  {
    id: 'p5',
    name: 'Offroad Shock Absorbers',
    category: 'Suspension',
    brand: 'Fox 2.0',
    price: 210000,
    stock: 'In Stock',
    image: 'https://images.pexels.com/photos/13690605/pexels-photo-13690605.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    fits: 'Jeep Wrangler / Defender',
  },
  {
    id: 'p6',
    name: 'Winch Recovery Kit',
    category: 'Recovery',
    brand: 'Warn',
    price: 95000,
    stock: 'On Order',
    image: 'https://images.pexels.com/photos/12765661/pexels-photo-12765661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    fits: 'Universal 4x4',
  },
];

export const projectCars: ProjectCar[] = [
  {
    id: 'pc1',
    name: 'BMW E30 M3',
    year: 1988,
    basePrice: 2800000,
    buildPrice: 4500000,
    condition: 'Needs full restoration',
    image: 'https://images.pexels.com/photos/30237173/pexels-photo-30237173.png?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Classic E30 chassis requiring complete engine rebuild, interior restoration, and paint. Build it with us and save 15% on the total project.',
    buildTime: '4-6 months',
    discount: '15% OFF',
  },
  {
    id: 'pc2',
    name: 'BMW E34 M5',
    year: 1992,
    basePrice: 1900000,
    buildPrice: 3800000,
    condition: 'Engine needs rebuild',
    image: 'https://images.pexels.com/photos/29883936/pexels-photo-29883936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Rare E34 M5 with original S38 engine needing a full rebuild. Suspension and bushings require replacement. Build with us for a discounted package.',
    buildTime: '3-5 months',
    discount: '12% OFF',
  },
  {
    id: 'pc3',
    name: 'BMW E39 M5',
    year: 2000,
    basePrice: 2200000,
    buildPrice: 4100000,
    condition: 'Cosmetic + mechanical',
    image: 'https://images.pexels.com/photos/11501007/pexels-photo-11501007.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Legendary E39 M5 platform. Needs clutch replacement, Vanos service, and full body respray. Build it with us at a discounted rate.',
    buildTime: '3-4 months',
    discount: '18% OFF',
  },
];

export function formatKES(amount: number): string {
  return 'KSh ' + amount.toLocaleString('en-KE');
}
