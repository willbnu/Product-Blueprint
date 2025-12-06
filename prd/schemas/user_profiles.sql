-- USER ROLES & PERMISSIONS PATTERN (RBAC)
-- Description: Role-Based Access Control linked to profiles
-- Dependencies: public.profiles

-- 1. Enums for fixed roles (Consistency)
create type app_role as enum ('admin', 'manager', 'member', 'guest');

-- 2. Create user_roles table
-- Mapping users to roles. Can be 1:1 or 1:Many depending on needs.
-- This example assumes 1:1 for simplicity, using PK on user_id
create table public.user_roles (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  role app_role default 'member'::app_role,
  assigned_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- 3. Enable RLS
alter table public.user_roles enable row level security;

-- 4. Policy: Read Access
-- Users can read their own role
create policy "Users can read own role."
  on public.user_roles for select
  using ( auth.uid() = user_id );

-- 5. Helper Function: is_admin()
-- Useful for use in other RLS policies
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.user_roles
    where user_id = auth.uid()
    and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- 6. Policy: Admin Management
-- Only admins can assign/change roles
create policy "Admins can manage all roles."
  on public.user_roles for all
  using ( public.is_admin() );

-- 7. Trigger: Specific Logic (Optional)
-- e.g., First user is always admin, or internal domain is auto-admin
-- (Implementation depends on business logic)
