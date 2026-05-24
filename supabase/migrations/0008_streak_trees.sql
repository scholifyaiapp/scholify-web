-- Scholify — Streak Trees (Fal.ai-generated growth visuals).
-- Paste into Supabase SQL Editor → Run. Idempotent.

create table if not exists public.streak_trees (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  plan_id uuid,
  streak_milestone integer not null,
  tree_image_url text not null,
  tree_stage text not null,
  generated_at timestamptz not null default now(),
  unique (user_id, streak_milestone)
);

create index if not exists streak_trees_user_idx on public.streak_trees(user_id, streak_milestone);

-- If a `streaks` table exists in this project, add the tree mirror columns.
do $$
begin
  if exists (select 1 from information_schema.tables
             where table_schema = 'public' and table_name = 'streaks') then
    alter table public.streaks add column if not exists current_tree_url text;
    alter table public.streaks add column if not exists current_tree_stage text;
    alter table public.streaks add column if not exists next_tree_milestone integer default 7;
  end if;
end $$;

alter table public.streak_trees enable row level security;

drop policy if exists "streak_trees_select_own" on public.streak_trees;
create policy "streak_trees_select_own" on public.streak_trees
  for select using (auth.uid() = user_id);

drop policy if exists "streak_trees_insert_own" on public.streak_trees;
create policy "streak_trees_insert_own" on public.streak_trees
  for insert with check (auth.uid() = user_id);

drop policy if exists "streak_trees_update_own" on public.streak_trees;
create policy "streak_trees_update_own" on public.streak_trees
  for update using (auth.uid() = user_id);

-- Storage bucket for the generated tree images:
--   Dashboard → Storage → New bucket: name "streak-trees", public ON
--   Max file size: 2 MB. Allowed MIME: image/png, image/jpeg, image/webp.
