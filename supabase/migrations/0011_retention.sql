-- 0011_retention.sql — the three retention metrics that decide the product:
-- first-task completion, Day-3 retained, Day-7 retained, plus conversion.
--
-- Primary tracking is PostHog (events fire from the client). These columns are
-- the durable copy on the account row so an in-app/SQL view can read them.
-- Columns are added to public.profiles (created in 0009); the spec's
-- public.users target is also covered if such a table ever exists.

alter table if exists public.profiles
  add column if not exists first_task_completed_at timestamptz;
alter table if exists public.profiles
  add column if not exists day3_retained boolean;
alter table if exists public.profiles
  add column if not exists day7_retained boolean;
alter table if exists public.profiles
  add column if not exists converted_to_paid boolean default false;

do $$
begin
  if to_regclass('public.users') is not null then
    execute 'alter table public.users add column if not exists first_task_completed_at timestamptz';
    execute 'alter table public.users add column if not exists day3_retained boolean';
    execute 'alter table public.users add column if not exists day7_retained boolean';
    execute 'alter table public.users add column if not exists converted_to_paid boolean default false';
  end if;
end $$;

-- Admin aggregate (run with the service role; RLS limits client-side reads):
--   SELECT
--     COUNT(*) AS total_users,
--     COUNT(*) FILTER (WHERE day3_retained) AS day3_count,
--     COUNT(*) FILTER (WHERE day7_retained) AS day7_count,
--     COUNT(*) FILTER (WHERE converted_to_paid) AS converted_count,
--     ROUND(COUNT(*) FILTER (WHERE day3_retained) * 100.0 / NULLIF(COUNT(*),0), 1) AS day3_rate,
--     ROUND(COUNT(*) FILTER (WHERE day7_retained) * 100.0 / NULLIF(COUNT(*),0), 1) AS day7_rate
--   FROM public.profiles;
