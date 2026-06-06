-- 0009_referrals.sql — referral attribution + word-of-mouth tracking.
--
-- Plan/progress/streaks remain client-side; this only adds the small bit of
-- shared state referrals need. Columns live on public.profiles (the table the
-- app already upserts to during onboarding). Safe to run more than once.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  current_level text,
  notification_time text,
  created_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists referral_code text unique default substr(md5(random()::text), 1, 8);
alter table public.profiles
  add column if not exists referred_by text;
alter table public.profiles
  add column if not exists referral_count integer not null default 0;

alter table public.profiles enable row level security;

do $$ begin
  create policy "profiles_self_select" on public.profiles
    for select using (auth.uid() = id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "profiles_self_write" on public.profiles
    for all using (auth.uid() = id) with check (auth.uid() = id);
exception when duplicate_object then null; end $$;

-- Credit a referrer by their code. SECURITY DEFINER so a freshly signed-in
-- user can bump someone else's counter without broad write access.
create or replace function public.increment_referral(code text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.profiles
     set referral_count = referral_count + 1
   where referral_code = code;
$$;

grant execute on function public.increment_referral(text) to authenticated;
