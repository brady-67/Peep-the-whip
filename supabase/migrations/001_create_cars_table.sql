-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query)

create table if not exists cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year integer not null,
  price bigint not null,
  mileage text not null default '',
  transmission text not null default '',
  fuel text not null default '',
  engine text not null default '',
  images text[] not null default '{}',
  badge text,
  specs text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- Cap each car at 10 images
alter table cars
  add constraint cars_images_max_10 check (array_length(images, 1) is null or array_length(images, 1) <= 10);

alter table cars enable row level security;

-- Anyone can read listings (public site)
create policy "Public can view cars"
  on cars for select
  using (true);

-- NOTE: this app uses a client-side hardcoded admin password rather than
-- Supabase Auth, so there's no server-side way to tell "the admin" apart
-- from any other visitor at the database level. These policies allow the
-- anon key to write, which the admin form relies on. That means anyone who
-- extracts the anon key (visible in your deployed JS bundle) could write to
-- this table directly, bypassing the password screen entirely.
create policy "Anon can insert cars"
  on cars for insert
  with check (true);

create policy "Anon can update cars"
  on cars for update
  using (true);

create policy "Anon can delete cars"
  on cars for delete
  using (true);

-- Seed with the existing static inventory so the site isn't empty
insert into cars (name, year, price, mileage, transmission, fuel, engine, images, badge, specs) values
('BMW M5 F90 Competition', 2022, 12500000, '18,000 km', 'Automatic', 'Petrol', '4.4L V8 Twin-Turbo',
  array['https://images.pexels.com/photos/17888840/pexels-photo-17888840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Featured', array['625 HP', '0-100 in 3.3s', 'M xDrive AWD', 'Carbon Ceramic Brakes']),
('BMW M3 Competition', 2021, 9800000, '24,000 km', 'Automatic', 'Petrol', '3.0L Inline-6 Twin-Turbo',
  array['https://images.pexels.com/photos/7663126/pexels-photo-7663126.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  null, array['503 HP', '0-100 in 3.5s', 'M xDrive AWD', '8-speed M Steptronic']),
('BMW M3 CS', 2023, 14200000, '8,500 km', 'Automatic', 'Petrol', '3.0L Inline-6 Twin-Turbo',
  array['https://images.pexels.com/photos/29580174/pexels-photo-29580174.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'New Arrival', array['530 HP', '0-100 in 3.4s', 'M xDrive AWD', 'Carbon Roof']),
('BMW 5 Series 540i', 2020, 6500000, '42,000 km', 'Automatic', 'Petrol', '3.0L Inline-6 Turbo',
  array['https://images.pexels.com/photos/14292717/pexels-photo-14292717.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  null, array['335 HP', '0-100 in 5.1s', 'Rear-Wheel Drive', 'Luxury Package']),
('BMW 740Li', 2021, 11500000, '15,000 km', 'Automatic', 'Petrol', '3.0L Inline-6 Turbo',
  array['https://images.pexels.com/photos/13058788/pexels-photo-13058788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  'Executive', array['335 HP', 'Extended Wheelbase', 'Executive Lounge', 'Bowers & Wilkins']),
('BMW 840i Gran Coupe', 2022, 13800000, '12,000 km', 'Automatic', 'Petrol', '3.0L Inline-6 Turbo',
  array['https://images.pexels.com/photos/10555130/pexels-photo-10555130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
  null, array['335 HP', '0-100 in 5.2s', 'xDrive AWD', 'M Sport Package']);
