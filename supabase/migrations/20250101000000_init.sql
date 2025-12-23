-- schema setup
create extension if not exists "pgcrypto";

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  provider_id text unique,
  title text not null,
  description text,
  price numeric not null,
  available boolean not null default true,
  published boolean not null default false,
  provider_hash text,
  last_synced_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id) on delete cascade,
  storage_path text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  whatsapp text unique not null,
  name_encrypted jsonb not null,
  email_encrypted jsonb not null,
  score integer not null,
  tier text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_quiz_responses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  responses jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_consents (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  consent_type text not null,
  granted boolean not null,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_events_queue (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  event_type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  status text not null,
  processed integer not null default 0,
  created integer not null default 0,
  updated integer not null default 0,
  errors integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.sync_logs (
  id uuid primary key default gen_random_uuid(),
  sync_run_id uuid references public.sync_runs(id) on delete set null,
  entity_type text not null,
  entity_id text not null,
  status text not null,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid,
  action text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists vehicles_published_idx on public.vehicles(published, created_at desc);
create index if not exists leads_whatsapp_idx on public.leads(whatsapp);
create index if not exists sync_runs_created_idx on public.sync_runs(created_at desc);

alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.leads enable row level security;
alter table public.lead_quiz_responses enable row level security;
alter table public.lead_consents enable row level security;
alter table public.lead_events_queue enable row level security;
alter table public.sync_runs enable row level security;
alter table public.sync_logs enable row level security;
alter table public.admin_audit_log enable row level security;

create policy "public read published vehicles" on public.vehicles
  for select using (published = true);

create policy "admin full access vehicles" on public.vehicles
  for all using ((auth.jwt() ->> 'role') = 'admin') with check ((auth.jwt() ->> 'role') = 'admin');

create policy "admin full access vehicle_images" on public.vehicle_images
  for all using ((auth.jwt() ->> 'role') = 'admin') with check ((auth.jwt() ->> 'role') = 'admin');

create policy "service role insert leads" on public.leads
  for insert with check (true);

create policy "service role insert lead responses" on public.lead_quiz_responses
  for insert with check (true);

create policy "service role insert lead consents" on public.lead_consents
  for insert with check (true);

create policy "service role insert lead events" on public.lead_events_queue
  for insert with check (true);

create policy "admin full access sync_runs" on public.sync_runs
  for all using ((auth.jwt() ->> 'role') = 'admin') with check ((auth.jwt() ->> 'role') = 'admin');

create policy "admin full access sync_logs" on public.sync_logs
  for all using ((auth.jwt() ->> 'role') = 'admin') with check ((auth.jwt() ->> 'role') = 'admin');

create policy "admin full access admin_audit_log" on public.admin_audit_log
  for all using ((auth.jwt() ->> 'role') = 'admin') with check ((auth.jwt() ->> 'role') = 'admin');
