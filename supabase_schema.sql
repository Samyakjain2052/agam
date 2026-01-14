-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create the listings table
create table listings (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  location text not null,
  age integer not null,
  description text,
  image text not null, -- URL to main image
  gallery text[], -- Array of image URLs
  whatsapp text,
  
  -- Stats (stored as JSON or separate columns, separate columns preferred for filtering)
  height text,
  bust text,
  
  -- Services (Array of strings)
  services text[],
  
  -- Oklute Replication / Advanced Filters
  is_vip boolean default false,
  ethnicity text,
  nationality text,
  body_type text,
  service_type text, -- 'Incall', 'Outcall', 'Both'
  attention_to text, -- 'Men', 'Women', 'Couples'
  status text default 'pending' -- 'active', 'pending', 'rejected'
);

-- Enable Row Level Security (RLS)
alter table listings enable row level security;

-- Create policy to allow public read access
create policy "Public listings are viewable by everyone"
  on listings for select
  using ( true );

-- Create policy to allow authenticated users to insert (if you add auth later)
-- create policy "Users can insert their own listings"
--   on listings for insert
--   with check ( auth.uid() = user_id );

-- Temporary policy for seeding (ALLOWS ANYONE TO INSERT)
create policy "Anyone can insert" on listings for insert with check ( true );
