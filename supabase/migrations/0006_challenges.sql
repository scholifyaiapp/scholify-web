-- Scholify — Weekly Challenges + XP / Level.
-- Paste into Supabase SQL Editor → Run. Idempotent.

create table if not exists public.weekly_challenges (
  id text primary key, -- "YYYY-Www-<type>" — generated client-side too
  week_number integer not null,
  year integer not null,
  title text not null,
  description text not null,
  challenge_type text not null,
  difficulty text not null default 'medium',
  target_value integer not null,
  unit text not null default 'sessions',
  xp_reward integer not null default 50,
  badge_id text,
  is_global boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists weekly_challenges_week_idx
  on public.weekly_challenges(year, week_number);

create table if not exists public.user_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  challenge_id text references public.weekly_challenges(id) on delete cascade,
  progress integer not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  xp_earned integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, challenge_id)
);

create index if not exists user_challenges_user_idx on public.user_challenges(user_id);

-- XP / level on auth-users metadata via a sidecar table so we don't
-- depend on a `users` row in this project's `public` schema.
create table if not exists public.user_xp (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_xp integer not null default 0,
  level integer not null default 1,
  updated_at timestamptz not null default now()
);

-- RLS — every user reads/writes only their own row.
alter table public.user_challenges enable row level security;
alter table public.user_xp enable row level security;

drop policy if exists "user_challenges_select_own" on public.user_challenges;
create policy "user_challenges_select_own" on public.user_challenges
  for select using (auth.uid() = user_id);

drop policy if exists "user_challenges_upsert_own" on public.user_challenges;
create policy "user_challenges_upsert_own" on public.user_challenges
  for insert with check (auth.uid() = user_id);

drop policy if exists "user_challenges_update_own" on public.user_challenges;
create policy "user_challenges_update_own" on public.user_challenges
  for update using (auth.uid() = user_id);

drop policy if exists "user_xp_select_own" on public.user_xp;
create policy "user_xp_select_own" on public.user_xp for select using (auth.uid() = user_id);

drop policy if exists "user_xp_upsert_own" on public.user_xp;
create policy "user_xp_upsert_own" on public.user_xp for insert with check (auth.uid() = user_id);

drop policy if exists "user_xp_update_own" on public.user_xp;
create policy "user_xp_update_own" on public.user_xp for update using (auth.uid() = user_id);

-- The weekly_challenges table is global / readable to all authed users.
alter table public.weekly_challenges enable row level security;

drop policy if exists "weekly_challenges_select_all" on public.weekly_challenges;
create policy "weekly_challenges_select_all" on public.weekly_challenges
  for select using (true);
