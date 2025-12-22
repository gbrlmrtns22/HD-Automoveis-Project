-- Enable extensions
create extension if not exists "uuid-ossp";

create table if not exists vehicles (
  id uuid primary key default uuid_generate_v4(),
  brand text not null,
  model text not null,
  price numeric not null,
  published boolean default false,
  updated_at timestamptz default now()
);

create table if not exists vehicle_images (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid references vehicles(id) on delete cascade,
  url text not null,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  whatsapp_encrypted text not null,
  whatsapp_hash text not null,
  budget text not null,
  usage text not null,
  trade_in text not null,
  consent boolean not null,
  created_at timestamptz default now()
);

create table if not exists lead_quiz_responses (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade,
  responses jsonb not null,
  created_at timestamptz default now()
);

create table if not exists lead_consents (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade,
  consent_text text not null,
  created_at timestamptz default now()
);

create table if not exists sync_runs (
  id uuid primary key default uuid_generate_v4(),
  status text not null,
  total integer default 0,
  synced integer default 0,
  failed integer default 0,
  started_at timestamptz default now(),
  finished_at timestamptz
);

create table if not exists sync_logs (
  id uuid primary key default uuid_generate_v4(),
  sync_run_id uuid references sync_runs(id) on delete cascade,
  level text not null,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists admin_audit_log (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid not null,
  action text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

create index if not exists vehicles_published_idx on vehicles(published);
create index if not exists vehicles_price_idx on vehicles(price);
create index if not exists leads_created_idx on leads(created_at);
create index if not exists leads_whatsapp_hash_idx on leads(whatsapp_hash);

alter table vehicles enable row level security;
alter table vehicle_images enable row level security;
alter table leads enable row level security;
alter table lead_quiz_responses enable row level security;
alter table lead_consents enable row level security;
alter table sync_runs enable row level security;
alter table sync_logs enable row level security;
alter table admin_audit_log enable row level security;

create policy "Public vehicles" on vehicles
  for select using (published = true);

create policy "Admin full access" on vehicles
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Lead insert" on leads
  for insert with check (true);

create policy "Admin leads access" on leads
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Admin lead consents access" on lead_consents
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Admin lead responses access" on lead_quiz_responses
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Admin sync access" on sync_runs
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Admin sync logs access" on sync_logs
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Admin audit access" on admin_audit_log
  for all using (auth.jwt() ->> 'role' = 'admin');
