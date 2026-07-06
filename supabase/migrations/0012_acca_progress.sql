-- 0012_acca_progress.sql — server-side ACCA mastery (finishes the data spine).
--
-- The ACCA engine is localStorage-first, so a student's practice history,
-- per-area accuracy and streak live on one device and vanish on a browser
-- clear. This stores a per-user snapshot of that progress so it survives and
-- syncs across devices — the durable learner record the whole "learning OS"
-- personalisation depends on.
--
-- Document-style: one row per user holding the progress blob as JSONB, upserted
-- (debounced) by the client. `answered` is denormalised out for a cheap
-- "which copy is more complete" merge (answered only ever grows). Written
-- directly with the anon key under row-level security — a user only sees and
-- writes their own row. Idempotent.

create table if not exists public.acca_progress (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  -- Full RawProgress snapshot: questions, per-area seen/correct, totals,
  -- streak, history, daily counts.
  data        jsonb not null default '{}'::jsonb,
  -- Monotonic completeness signal for last-writer-safe merges.
  answered    int not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.acca_progress enable row level security;

drop policy if exists "acca_progress_own_select" on public.acca_progress;
create policy "acca_progress_own_select" on public.acca_progress
  for select using (auth.uid() = user_id);

drop policy if exists "acca_progress_own_insert" on public.acca_progress;
create policy "acca_progress_own_insert" on public.acca_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "acca_progress_own_update" on public.acca_progress;
create policy "acca_progress_own_update" on public.acca_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
