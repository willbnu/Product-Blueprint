-- AUDIT LOGGING PATTERN
-- Description: Immutable audit log for compliance and security tracking
-- Use Case: Healthcare (HIPAA), Finance (SOC2), and Enterprise apps

-- 1. Create the audit_logs table
-- Note: 'immutable' is largely enforced by policy (no update/delete)
create table public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  actor_id uuid references auth.users(id), -- Who did it?
  action text not null,                    -- What action? (e.g., 'user.login', 'record.create')
  entity_type text not null,               -- What was acted upon? (e.g., 'patient_record')
  entity_id text,                          -- ID of the entity
  details jsonb default '{}'::jsonb,       -- Structured details (metadata, changes)
  ip_address inet,                         -- Source IP
  user_agent text,                         -- Client definition
  created_at timestamptz default now()     -- When?
);

-- 2. Enable Row Level Security
alter table public.audit_logs enable row level security;

-- 3. Policy: No Deletes! (Compliance Requirement)
-- No one, not even the creator, should delete audit logs via standard API
-- Deletion should only be done by admin directly via database console with separate oversight
create policy "Audit logs cannot be deleted."
  on public.audit_logs for delete
  using ( false );

-- 4. Policy: No Updates! (Immutable)
create policy "Audit logs cannot be updated."
  on public.audit_logs for update
  using ( false );

-- 5. Policy: Insert Access
-- Authenticated users can create logs (usually done by backend functions or triggers)
create policy "Authenticated users can create audit logs."
  on public.audit_logs for insert
  with check ( auth.uid() = actor_id );

-- 6. Policy: Read Access (Admins Only - Example)
-- Adjust 'is_admin' logic based on your custom claims or role system
create policy "Only admins can view audit logs."
  on public.audit_logs for select
  using ( 
    auth.jwt() ->> 'role' = 'service_role' 
    or 
    (select role from public.user_roles where user_id = auth.uid()) = 'admin'
  );

-- 7. Indexes
create index audit_logs_actor_idx on public.audit_logs (actor_id);
create index audit_logs_action_idx on public.audit_logs (action);
create index audit_logs_created_at_idx on public.audit_logs (created_at desc);
