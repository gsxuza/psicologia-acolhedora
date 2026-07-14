-- ============================================================================
-- Termômetro emocional — histórico de check-ins do paciente.
-- Rode este arquivo depois de schema.sql e storage.sql.
-- ============================================================================

create table if not exists public.mood_checkins (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients (id) on delete cascade,
  user_id uuid not null references auth.users (id), -- o próprio paciente
  owner_id uuid not null references auth.users (id), -- a psicóloga dona do vínculo (para RLS)
  mood smallint not null check (mood between 1 and 5),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists mood_checkins_patient_id_idx on public.mood_checkins (patient_id);
create index if not exists mood_checkins_user_id_idx on public.mood_checkins (user_id);
create index if not exists mood_checkins_owner_id_idx on public.mood_checkins (owner_id);

alter table public.mood_checkins enable row level security;

-- O paciente só vê e insere os próprios check-ins
create policy "mood_checkins: paciente le seus check-ins"
  on public.mood_checkins for select
  using (user_id = auth.uid());

create policy "mood_checkins: paciente insere seus check-ins"
  on public.mood_checkins for insert
  with check (user_id = auth.uid());

-- A psicóloga (dona do paciente) também pode ler o histórico dos seus pacientes
create policy "mood_checkins: psicologa le check-ins dos seus pacientes"
  on public.mood_checkins for select
  using (owner_id = auth.uid());
