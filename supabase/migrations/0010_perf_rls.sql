-- 0010_perf_rls.sql — performance indexes + row-level security for the
-- client-side data tables, applied defensively.
--
-- IMPORTANT: progress / plans / streaks / users / chat_messages /
-- resource_library are localStorage-first today and do NOT exist in this
-- database yet. Every block below is guarded with to_regclass(), so this
-- migration is a safe no-op now and applies automatically if/when those
-- tables are created.
--
-- The tables that DO exist are already covered and are intentionally not
-- duplicated here:
--   • room_messages         → room_messages_room_time_idx + member RLS (0002)
--   • community_posts        → community_posts_category_time_idx + RLS (0004)
--   • partner_notifications  → partner_notifications_recipient_idx + RLS (0001)

do $$
begin
  -- progress (dashboard hot path) ----------------------------------------
  if to_regclass('public.progress') is not null then
    execute 'create index if not exists idx_progress_user_date on public.progress(user_id, completed_at desc)';
    execute 'create index if not exists idx_progress_plan on public.progress(plan_id, day_number)';
    execute 'alter table public.progress enable row level security';
    execute 'drop policy if exists "progress_own" on public.progress';
    execute 'create policy "progress_own" on public.progress using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  end if;

  -- plans ----------------------------------------------------------------
  if to_regclass('public.plans') is not null then
    execute 'create index if not exists idx_plans_user_active on public.plans(user_id, status, created_at desc)';
    execute 'create index if not exists idx_plans_user_id on public.plans(user_id)';
    execute 'alter table public.plans enable row level security';
    execute 'drop policy if exists "plans_own" on public.plans';
    execute 'create policy "plans_own" on public.plans using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  end if;

  -- streaks --------------------------------------------------------------
  if to_regclass('public.streaks') is not null then
    execute 'create index if not exists idx_streaks_user on public.streaks(user_id)';
    execute 'alter table public.streaks enable row level security';
    execute 'drop policy if exists "streaks_own" on public.streaks';
    execute 'create policy "streaks_own" on public.streaks using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  end if;

  -- users ----------------------------------------------------------------
  if to_regclass('public.users') is not null then
    execute 'alter table public.users enable row level security';
    execute 'drop policy if exists "users_own" on public.users';
    execute 'create policy "users_own" on public.users using (auth.uid() = id) with check (auth.uid() = id)';
  end if;

  -- resource_library -----------------------------------------------------
  if to_regclass('public.resource_library') is not null then
    execute 'create index if not exists idx_resource_lib_user on public.resource_library(user_id, created_at desc)';
    execute 'alter table public.resource_library enable row level security';
    execute 'drop policy if exists "resource_lib_own" on public.resource_library';
    execute 'create policy "resource_lib_own" on public.resource_library using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  end if;

  -- chat_messages --------------------------------------------------------
  if to_regclass('public.chat_messages') is not null then
    execute 'alter table public.chat_messages enable row level security';
    execute 'drop policy if exists "chat_read" on public.chat_messages';
    execute 'create policy "chat_read" on public.chat_messages using (auth.uid() = user_id)';
  end if;
end $$;
