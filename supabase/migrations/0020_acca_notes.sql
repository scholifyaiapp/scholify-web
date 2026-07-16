-- 0020_acca_notes.sql — account sync for the learner's notebook (/notes).
--
-- Notes were device-local (localStorage) since the notebook shipped; this
-- gives them the same durable, cross-device life as the rest of the learner
-- record. Document-style like acca_progress: one row per user, the notes
-- array as JSONB, plus a tombstone map (noteId → deletedAt ms) so a note
-- deleted on one device cannot resurrect from a stale copy on another.
--
-- Written directly with the anon key under row-level security — a user only
-- sees and writes their own row. Idempotent.

create table if not exists public.acca_notes (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  -- The full StudyNote[] snapshot (id, paper, area, context, body, timestamps, pinned).
  notes       jsonb not null default '[]'::jsonb,
  -- Tombstones: noteId → deletedAt (epoch ms). Deletions win over stale copies.
  deleted     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

alter table public.acca_notes enable row level security;

drop policy if exists "acca_notes_own_select" on public.acca_notes;
create policy "acca_notes_own_select" on public.acca_notes
  for select using (auth.uid() = user_id);

drop policy if exists "acca_notes_own_insert" on public.acca_notes;
create policy "acca_notes_own_insert" on public.acca_notes
  for insert with check (auth.uid() = user_id);

drop policy if exists "acca_notes_own_update" on public.acca_notes;
create policy "acca_notes_own_update" on public.acca_notes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
