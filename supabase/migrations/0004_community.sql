-- Scholify Community — opt-in shared feed + per-category leaderboard.
-- Paste into Supabase SQL Editor → Run. Idempotent.

create table if not exists public.community_opt_in (
  user_id uuid primary key references auth.users(id) on delete cascade,
  opted_in boolean not null default false,
  share_completions boolean not null default true,
  share_milestones boolean not null default true,
  display_name text,
  updated_at timestamptz not null default now()
);

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  post_type text not null,
  goal_category text not null default 'other',
  goal_name text not null,
  content text not null,
  streak_at_post integer,
  week_number integer,
  is_public boolean not null default true,
  likes integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists community_posts_category_time_idx
  on public.community_posts(goal_category, created_at desc);
create index if not exists community_posts_user_idx
  on public.community_posts(user_id);
create index if not exists community_posts_time_idx
  on public.community_posts(created_at desc);

create table if not exists public.community_likes (
  user_id uuid references auth.users(id) on delete cascade,
  post_id uuid references public.community_posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);

-- ── RLS ────────────────────────────────────────────────────────────────────
alter table public.community_opt_in enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_likes enable row level security;

-- Opt-in: a user can read + edit only their own row.
drop policy if exists "opt_in_select_own" on public.community_opt_in;
create policy "opt_in_select_own" on public.community_opt_in
  for select using (auth.uid() = user_id);

drop policy if exists "opt_in_upsert_own" on public.community_opt_in;
create policy "opt_in_upsert_own" on public.community_opt_in
  for insert with check (auth.uid() = user_id);

drop policy if exists "opt_in_update_own" on public.community_opt_in;
create policy "opt_in_update_own" on public.community_opt_in
  for update using (auth.uid() = user_id);

-- Posts: any authed user can read public posts; only the author can
-- insert their own posts and only if they're opted in.
drop policy if exists "posts_select_public" on public.community_posts;
create policy "posts_select_public" on public.community_posts
  for select using (is_public = true);

drop policy if exists "posts_insert_self_opted_in" on public.community_posts;
create policy "posts_insert_self_opted_in" on public.community_posts
  for insert with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.community_opt_in oi
      where oi.user_id = auth.uid() and oi.opted_in = true
    )
  );

drop policy if exists "posts_delete_own" on public.community_posts;
create policy "posts_delete_own" on public.community_posts
  for delete using (auth.uid() = user_id);

-- Likes: any authed user can like; one row per user/post enforced by PK.
drop policy if exists "likes_select_all" on public.community_likes;
create policy "likes_select_all" on public.community_likes
  for select using (true);

drop policy if exists "likes_insert_self" on public.community_likes;
create policy "likes_insert_self" on public.community_likes
  for insert with check (auth.uid() = user_id);

drop policy if exists "likes_delete_self" on public.community_likes;
create policy "likes_delete_self" on public.community_likes
  for delete using (auth.uid() = user_id);

-- Increment counter on like.
create or replace function public.community_increment_like()
returns trigger language plpgsql as $$
begin
  update public.community_posts set likes = likes + 1 where id = new.post_id;
  return new;
end $$;

drop trigger if exists community_like_after_insert on public.community_likes;
create trigger community_like_after_insert
  after insert on public.community_likes
  for each row execute function public.community_increment_like();

create or replace function public.community_decrement_like()
returns trigger language plpgsql as $$
begin
  update public.community_posts set likes = greatest(0, likes - 1) where id = old.post_id;
  return old;
end $$;

drop trigger if exists community_like_after_delete on public.community_likes;
create trigger community_like_after_delete
  after delete on public.community_likes
  for each row execute function public.community_decrement_like();

-- Enable Realtime on `community_posts` in Database → Replication.
