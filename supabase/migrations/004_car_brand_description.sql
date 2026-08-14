-- Run this in the Supabase SQL Editor after 001, 002, and 003

alter table cars add column if not exists brand text not null default '';
alter table cars add column if not exists description text not null default '';

-- Backfill brand for the existing seeded cars (all BMWs)
update cars set brand = 'BMW' where brand = '';
