-- ============================================================================
-- Psicologia Acolhedora — schema Postgres para Neon (serverless)
-- Clerk gerencia autenticação: clerk_user_id é TEXT (ex: "user_2abc...").
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- patients
-- ---------------------------------------------------------------------------
create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  birth_date date,
  cpf text,
  status text not null default 'active' check (status in ('active', 'inactive', 'waiting')),
  main_complaint text,
  emergency_contact text,
  session_value numeric(10, 2),
  notes text,
  user_id text,         -- clerk_user_id do próprio paciente (acesso ao portal)
  created_by text not null, -- clerk_user_id da psicóloga dona do registro
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists patients_created_by_idx on patients (created_by);
create index if not exists patients_user_id_idx on patients (user_id);

-- ---------------------------------------------------------------------------
-- sessions
-- ---------------------------------------------------------------------------
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients (id) on delete cascade,
  patient_name text not null,
  date date not null,
  time text not null,
  duration integer not null default 50,
  status text not null default 'scheduled'
    check (status in ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  modality text not null default 'online' check (modality in ('online', 'presencial')),
  notes text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'waived')),
  payment_value numeric(10, 2),
  reminder_sent boolean not null default false,
  created_by text not null, -- clerk_user_id
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sessions_created_by_idx on sessions (created_by);
create index if not exists sessions_date_idx on sessions (date);
create index if not exists sessions_patient_id_idx on sessions (patient_id);

-- ---------------------------------------------------------------------------
-- documents
-- ---------------------------------------------------------------------------
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  category text not null default 'material'
    check (category in ('orientacao', 'material', 'contrato', 'outro')),
  is_public boolean not null default false,
  patient_id uuid references patients (id) on delete cascade,
  created_by text not null, -- clerk_user_id
  created_at timestamptz not null default now()
);

create index if not exists documents_created_by_idx on documents (created_by);

-- ---------------------------------------------------------------------------
-- mood_checkins
-- ---------------------------------------------------------------------------
create table if not exists mood_checkins (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients (id) on delete cascade,
  user_id text not null,   -- clerk_user_id do paciente
  owner_id text not null,  -- clerk_user_id da psicóloga
  mood smallint not null check (mood between 1 and 5),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists mood_checkins_patient_id_idx on mood_checkins (patient_id);
create index if not exists mood_checkins_user_id_idx on mood_checkins (user_id);
create index if not exists mood_checkins_owner_id_idx on mood_checkins (owner_id);

-- ---------------------------------------------------------------------------
-- updated_at automático
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists patients_set_updated_at on patients;
create trigger patients_set_updated_at
  before update on patients
  for each row execute procedure set_updated_at();

drop trigger if exists sessions_set_updated_at on sessions;
create trigger sessions_set_updated_at
  before update on sessions
  for each row execute procedure set_updated_at();
