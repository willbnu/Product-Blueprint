-- AUTHENTICATION & PROFILES PATTERN
-- Description: Standard Supabase Auth integration with public user profiles
-- Dependencies: auth.users (Supabase managed table)

-- 1. Create a public profiles table that links to auth.users
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create Policy: Public Read Access
-- Allow anyone to read profile data (username, avatar), but not sensitive info
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

-- 4. Create Policy: Private Update Access
-- Users can only update their own profile
create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- 5. Trigger: Auto-create profile on signup
-- This function automatically creates a row in public.profiles when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Bind the trigger to the auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. Indexes for performance
create index profiles_email_idx on public.profiles (email);
