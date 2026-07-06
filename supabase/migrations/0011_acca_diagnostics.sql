-- 0011_acca_diagnostics.sql — the ACCA learning-data spine.
--
-- Stores each student's diagnostic results (pass probability, estimated score,
-- per-area competence) server-side so mastery survives a browser clear and
-- syncs across devices. This is the first server-persisted ACCA data — the
-- beginning of the learning-data moat. Written directly by the client with the
-- anon key under row-level security: a signed-in user can only see and write
-- their own rows.
--
-- Safe to run more than once (idempotent).

create table if not exists public.acca_diagnostics (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  paper_id            text not null,
  pass_probability    int  not null,
  estimated_score     int  not null,
  confidence          real not null default 0,
  questions_answered  int  not null default 0,
  raw_correct         int  not null default 0,
  -- Per-area competence breakdown + the counterfactual "path to X%" target.
  areas               jsonb not null default '[]'::jsonb,
  target              jsonb not null default '{}'::jsonb,
  answered_at         timestamptz not null default now(),
  created_at          timestamptz not null default now()
);

-- Latest-per-paper lookups are the hot path.
create index if not exists idx_acca_diag_user_paper_time
  on public.acca_diagnostics (user_id, paper_id, answered_at desc);

alter table public.acca_diagnostics enable row level security;

drop policy if exists "acca_diag_own_select" on public.acca_diagnostics;
create policy "acca_diag_own_select" on public.acca_diagnostics
  for select using (auth.uid() = user_id);

drop policy if exists "acca_diag_own_insert" on public.acca_diagnostics;
create policy "acca_diag_own_insert" on public.acca_diagnostics
  for insert with check (auth.uid() = user_id);

drop policy if exists "acca_diag_own_update" on public.acca_diagnostics;
create policy "acca_diag_own_update" on public.acca_diagnostics
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
