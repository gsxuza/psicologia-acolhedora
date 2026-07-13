-- ============================================================================
-- Psicologia Acolhedora — schema Postgres para Supabase
-- Migrado das entidades no-code do Base44: Patient, Session, Document, User.
-- Cada tabela tem Row Level Security (RLS) habilitado por padrão: um(a)
-- psicólogo(a) só enxerga e edita os próprios registros (created_by = auth.uid()).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles (equivalente à entidade "User" do Base44, papel admin/user)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: usuário lê o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: usuário atualiza o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- cria automaticamente um profile ao registrar um novo usuário
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- patients (entidade "Patient")
-- ---------------------------------------------------------------------------
create table if not exists public.patients (
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
  user_id uuid references auth.users (id), -- acesso do próprio paciente (opcional)
  created_by uuid not null references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists patients_created_by_idx on public.patients (created_by);

alter table public.patients enable row level security;

create policy "patients: dono lê seus pacientes"
  on public.patients for select
  using (created_by = auth.uid());

create policy "patients: dono insere pacientes"
  on public.patients for insert
  with check (created_by = auth.uid());

create policy "patients: dono atualiza seus pacientes"
  on public.patients for update
  using (created_by = auth.uid());

create policy "patients: dono remove seus pacientes"
  on public.patients for delete
  using (created_by = auth.uid());

-- ---------------------------------------------------------------------------
-- sessions (entidade "Session")
-- ---------------------------------------------------------------------------
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients (id) on delete cascade,
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
  created_by uuid not null references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sessions_created_by_idx on public.sessions (created_by);
create index if not exists sessions_date_idx on public.sessions (date);
create index if not exists sessions_patient_id_idx on public.sessions (patient_id);

alter table public.sessions enable row level security;

create policy "sessions: dono lê suas sessões"
  on public.sessions for select
  using (created_by = auth.uid());

create policy "sessions: dono insere sessões"
  on public.sessions for insert
  with check (created_by = auth.uid());

create policy "sessions: dono atualiza suas sessões"
  on public.sessions for update
  using (created_by = auth.uid());

create policy "sessions: dono remove suas sessões"
  on public.sessions for delete
  using (created_by = auth.uid());

-- ---------------------------------------------------------------------------
-- documents (entidade "Document")
-- ---------------------------------------------------------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  category text not null default 'material'
    check (category in ('orientacao', 'material', 'contrato', 'outro')),
  is_public boolean not null default false,
  patient_id uuid references public.patients (id) on delete cascade,
  created_by uuid not null references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists documents_created_by_idx on public.documents (created_by);

alter table public.documents enable row level security;

create policy "documents: dono lê seus documentos"
  on public.documents for select
  using (created_by = auth.uid());

create policy "documents: dono insere documentos"
  on public.documents for insert
  with check (created_by = auth.uid());

create policy "documents: dono atualiza seus documentos"
  on public.documents for update
  using (created_by = auth.uid());

create policy "documents: dono remove seus documentos"
  on public.documents for delete
  using (created_by = auth.uid());

-- ---------------------------------------------------------------------------
-- updated_at automático
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists patients_set_updated_at on public.patients;
create trigger patients_set_updated_at
  before update on public.patients
  for each row execute procedure public.set_updated_at();

drop trigger if exists sessions_set_updated_at on public.sessions;
create trigger sessions_set_updated_at
  before update on public.sessions
  for each row execute procedure public.set_updated_at();
