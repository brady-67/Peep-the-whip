-- Run this in the Supabase SQL Editor after 001_create_cars_table.sql

insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do nothing;

-- Anyone can view images (public site)
create policy "Public can view car images"
  on storage.objects for select
  using (bucket_id = 'car-images');

-- Same tradeoff as the cars table: no real auth, so the anon key can
-- upload/delete. The admin password screen keeps casual visitors out
-- of the UI, but doesn't stop direct API access by anyone with the key.
create policy "Anon can upload car images"
  on storage.objects for insert
  with check (bucket_id = 'car-images');

create policy "Anon can delete car images"
  on storage.objects for delete
  using (bucket_id = 'car-images');
