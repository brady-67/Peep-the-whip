-- Run this in the Supabase SQL Editor after 001 and 002

-- RIGS ------------------------------------------------------------
create table if not exists rigs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year integer not null,
  price bigint not null,
  terrain text not null default '',
  drivetrain text not null default '',
  winch text not null default '',
  lift text not null default '',
  images text[] not null default '{}',
  badge text,
  specs text[] not null default '{}',
  created_at timestamptz not null default now()
);
alter table rigs add constraint rigs_images_max_10 check (array_length(images, 1) is null or array_length(images, 1) <= 10);
alter table rigs enable row level security;
create policy "Public can view rigs" on rigs for select using (true);
create policy "Anon can insert rigs" on rigs for insert with check (true);
create policy "Anon can update rigs" on rigs for update using (true);
create policy "Anon can delete rigs" on rigs for delete using (true);

insert into rigs (name, year, price, terrain, drivetrain, winch, lift, images, badge, specs) values
('Land Rover Defender 110', 2022, 15500000, 'All-Terrain', '4WD', 'Warn Zeon 10-S', '2-inch Lift Kit',
  array['https://images.pexels.com/photos/9155303/pexels-photo-9155303.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Featured', array['3.0L V6 Diesel', 'Locking Diffs', 'Snorkel Kit', '37" All-Terrain Tyres']),
('Land Rover Defender 90', 2021, 13200000, 'Mud & Rock', '4WD', 'Factor 55', '3-inch Lift Kit',
  array['https://images.pexels.com/photos/14901782/pexels-photo-14901782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Trail Ready', array['2.0L V6 Diesel', 'Rock Sliders', 'Roof Rack', '35" Mud Tyres']),
('Jeep Wrangler Rubicon', 2023, 9800000, 'Extreme Offroad', '4WD', 'Warn 86860', '4-inch Lift Kit',
  array['https://images.pexels.com/photos/13118533/pexels-photo-13118533.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'New Arrival', array['3.6L V6 Pentastar', 'Front + Rear Lockers', 'Disconnecting Sway Bar', '37" Mud-Terrain Tyres']),
('Jeep Wrangler Sahara', 2022, 8200000, 'All-Terrain', '4WD', 'Smittybilt X20', '2.5-inch Lift Kit',
  array['https://images.pexels.com/photos/18078250/pexels-photo-18078250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  null, array['2.0L Turbo', 'Limited Slip Diff', 'Heavy Duty Bumpers', '33" All-Terrain Tyres']),
('Land Cruiser 79 V8', 2022, 17500000, 'Expedition', '4WD', 'Warn 12-S', '3-inch Lift Kit',
  array['https://images.pexels.com/photos/29884884/pexels-photo-29884884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Expedition Build', array['4.5L V8 Diesel', 'Dual Battery', 'Roof Tent Ready', '33" All-Terrain Tyres']),
('Mercedes G63 AMG', 2023, 28000000, 'Luxury Offroad', '4WD', 'OEM AMG', 'OEM Lift',
  array['https://images.pexels.com/photos/9283116/pexels-photo-9283116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Premium', array['4.0L V8 Biturbo', '585 HP', '3 Locking Diffs', '21" AMG Wheels']);

-- PARTS -----------------------------------------------------------
create table if not exists parts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default '',
  brand text not null default '',
  price bigint not null,
  stock text not null default 'In Stock' check (stock in ('In Stock', 'On Order')),
  images text[] not null default '{}',
  fits text not null default '',
  created_at timestamptz not null default now()
);
alter table parts add constraint parts_images_max_10 check (array_length(images, 1) is null or array_length(images, 1) <= 10);
alter table parts enable row level security;
create policy "Public can view parts" on parts for select using (true);
create policy "Anon can insert parts" on parts for insert with check (true);
create policy "Anon can update parts" on parts for update using (true);
create policy "Anon can delete parts" on parts for delete using (true);

insert into parts (name, category, brand, price, stock, images, fits) values
('BMW S55 Downpipes', 'Exhaust', 'Akrapovic', 185000, 'In Stock',
  array['https://images.pexels.com/photos/12658309/pexels-photo-12658309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], 'BMW M3/M4 G8x'),
('Coilover Suspension Kit', 'Suspension', 'KW Variant 3', 320000, 'In Stock',
  array['https://images.pexels.com/photos/15492981/pexels-photo-15492981.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], 'BMW 3/4/5 Series'),
('Carbon Fibre Intake', 'Intake', 'Eventuri', 145000, 'On Order',
  array['https://images.pexels.com/photos/12658302/pexels-photo-12658302.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], 'BMW M3/M4 S55'),
('Performance Brake Kit', 'Brakes', 'Brembo GT', 540000, 'In Stock',
  array['https://images.pexels.com/photos/6941483/pexels-photo-6941483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], 'BMW M-Series'),
('Offroad Shock Absorbers', 'Suspension', 'Fox 2.0', 210000, 'In Stock',
  array['https://images.pexels.com/photos/13690605/pexels-photo-13690605.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], 'Jeep Wrangler / Defender'),
('Winch Recovery Kit', 'Recovery', 'Warn', 95000, 'On Order',
  array['https://images.pexels.com/photos/12765661/pexels-photo-12765661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], 'Universal 4x4');

-- PROJECT CARS (Build page) ----------------------------------------
create table if not exists project_cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year integer not null,
  base_price bigint not null,
  build_price bigint not null,
  condition text not null default '',
  images text[] not null default '{}',
  description text not null default '',
  build_time text not null default '',
  discount text not null default '',
  created_at timestamptz not null default now()
);
alter table project_cars add constraint project_cars_images_max_10 check (array_length(images, 1) is null or array_length(images, 1) <= 10);
alter table project_cars enable row level security;
create policy "Public can view project_cars" on project_cars for select using (true);
create policy "Anon can insert project_cars" on project_cars for insert with check (true);
create policy "Anon can update project_cars" on project_cars for update using (true);
create policy "Anon can delete project_cars" on project_cars for delete using (true);

insert into project_cars (name, year, base_price, build_price, condition, images, description, build_time, discount) values
('BMW E30 M3', 1988, 2800000, 4500000, 'Needs full restoration',
  array['https://images.pexels.com/photos/30237173/pexels-photo-30237173.png?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Classic E30 chassis requiring complete engine rebuild, interior restoration, and paint. Build it with us and save 15% on the total project.',
  '4-6 months', '15% OFF'),
('BMW E34 M5', 1992, 1900000, 3800000, 'Engine needs rebuild',
  array['https://images.pexels.com/photos/29883936/pexels-photo-29883936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Rare E34 M5 with original S38 engine needing a full rebuild. Suspension and bushings require replacement. Build with us for a discounted package.',
  '3-5 months', '12% OFF'),
('BMW E39 M5', 2000, 2200000, 4100000, 'Cosmetic + mechanical',
  array['https://images.pexels.com/photos/11501007/pexels-photo-11501007.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Legendary E39 M5 platform. Needs clutch replacement, Vanos service, and full body respray. Build it with us at a discounted rate.',
  '3-4 months', '18% OFF');
