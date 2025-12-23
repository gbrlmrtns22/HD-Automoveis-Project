-- Enable extensions
create extension if not exists "uuid-ossp";

-- Vehicles
create table if not exists vehicles (
  id text primary key,
  title text not null,
  brand text not null,
  model text not null,
  year int not null,
  price int not null,
  mileage int not null,
  fuel text not null,
  transmission text not null,
  color text not null,
  published boolean default false,
  updated_at timestamptz default now()
);

create table if not exists vehicle_images (
  id text primary key,
  vehicle_id text references vehicles(id) on delete cascade,
  url text not null,
  alt text not null
);

create index if not exists vehicles_published_idx on vehicles (published);
create index if not exists vehicles_brand_model_idx on vehicles (brand, model);

-- Leads
create table if not exists leads (
  id text primary key,
  name text not null,
  whatsapp text not null unique,
  current_vehicle text,
  score int not null,
  created_at timestamptz default now()
);

create table if not exists lead_quiz_responses (
  id uuid primary key default uuid_generate_v4(),
  lead_id text references leads(id) on delete cascade,
  responses jsonb not null
);

create table if not exists lead_consents (
  id uuid primary key default uuid_generate_v4(),
  lead_id text references leads(id) on delete cascade,
  consented_at timestamptz not null,
  consent_text text not null
);

create table if not exists lead_events (
  id text primary key,
  type text not null,
  payload jsonb not null,
  created_at timestamptz default now()
);

create index if not exists leads_whatsapp_idx on leads (whatsapp);
create index if not exists leads_created_idx on leads (created_at);

-- Sync logging
create table if not exists sync_runs (
  id text primary key,
  started_at timestamptz not null,
  finished_at timestamptz,
  status text not null,
  total_processed int default 0,
  total_failed int default 0
);

create table if not exists sync_logs (
  id text primary key,
  run_id text references sync_runs(id) on delete cascade,
  level text not null,
  message text not null,
  payload jsonb,
  created_at timestamptz default now()
);

-- Admin audit log
create table if not exists admin_audit_log (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid,
  action text not null,
  payload jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table vehicles enable row level security;
alter table vehicle_images enable row level security;
alter table leads enable row level security;
alter table lead_quiz_responses enable row level security;
alter table lead_consents enable row level security;
alter table lead_events enable row level security;
alter table sync_runs enable row level security;
alter table sync_logs enable row level security;
alter table admin_audit_log enable row level security;

-- Policies
create policy "public read published vehicles" on vehicles for select using (published = true);
create policy "public read vehicle images" on vehicle_images for select using (true);

create policy "admin full access vehicles" on vehicles for all using (auth.role() = 'authenticated');
create policy "admin full access vehicle_images" on vehicle_images for all using (auth.role() = 'authenticated');
create policy "admin full access leads" on leads for all using (auth.role() = 'authenticated');
create policy "admin full access lead_quiz" on lead_quiz_responses for all using (auth.role() = 'authenticated');
create policy "admin full access lead_consents" on lead_consents for all using (auth.role() = 'authenticated');
create policy "admin full access lead_events" on lead_events for all using (auth.role() = 'authenticated');
create policy "admin full access sync_runs" on sync_runs for all using (auth.role() = 'authenticated');
create policy "admin full access sync_logs" on sync_logs for all using (auth.role() = 'authenticated');
create policy "admin full access audit" on admin_audit_log for all using (auth.role() = 'authenticated');

-- service role insert for leads (documented)
create policy "service insert leads" on leads for insert with check (auth.role() = 'service_role');
create policy "service insert lead_quiz" on lead_quiz_responses for insert with check (auth.role() = 'service_role');
create policy "service insert lead_consents" on lead_consents for insert with check (auth.role() = 'service_role');
create policy "service insert lead_events" on lead_events for insert with check (auth.role() = 'service_role');

-- Data retention (cron suggestion): delete leads older than 24 months
-- delete from leads where created_at < now() - interval '24 months';
