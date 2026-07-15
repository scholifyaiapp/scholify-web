-- 0010_perf_rls.sql — performance indexes + row-level security for the
-- legacy vocab-app data tables, applied defensively.
--
-- IMPORTANT: progress / plans / streaks / users / chat_messages /
-- resource_library are localStorage-first (vocab era) and do NOT exist in a
-- fresh database. Every block is guarded so this migration is a safe no-op.
--
-- The guard checks not just that the table EXISTS but that it has the specific
-- COLUMN this block indexes. A brand-new Supabase project created from a starter
-- template can ship a `plans` or `users` table of the SAME NAME but a DIFFERENT
-- shape; a table-only guard would then try to index a column that isn't there
-- and fail the whole migration. Column-aware guards skip those look-alikes
-- entirely — we only touch a table when it is unmistakably the one we mean.
--
-- The ACCA tables that DO exist are covered by their own migrations (0011+).

do $$
begin
  -- progress (dashboard hot path) ----------------------------------------
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'progress' and column_name = 'user_id') then
    execute 'create index if not exists idx_progress_user_date on public.progress(user_id, completed_at desc)';
    if exists (select 1 from information_schema.columns
               where table_schema = 'public' and table_name = 'progress' and column_name = 'plan_id') then
      execute 'create index if not exists idx_progress_plan on public.progress(plan_id, day_number)';
    end if;
    execute 'alter table public.progress enable row level security';
    execute 'drop policy if exists "progress_own" on public.progress';
    execute 'create policy "progress_own" on public.progress using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  end if;

  -- plans ----------------------------------------------------------------
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'plans' and column_name = 'user_id') then
    if exists (select 1 from information_schema.columns
               where table_schema = 'public' and table_name = 'plans' and column_name = 'status') then
      execute 'create index if not exists idx_plans_user_active on public.plans(user_id, status, created_at desc)';
    end if;
    execute 'create index if not exists idx_plans_user_id on public.plans(user_id)';
    execute 'alter table public.plans enable row level security';
    execute 'drop policy if exists "plans_own" on public.plans';
    execute 'create policy "plans_own" on public.plans using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  end if;

  -- streaks --------------------------------------------------------------
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'streaks' and column_name = 'user_id') then
    execute 'create index if not exists idx_streaks_user on public.streaks(user_id)';
    execute 'alter table public.streaks enable row level security';
    execute 'drop policy if exists "streaks_own" on public.streaks';
    execute 'create policy "streaks_own" on public.streaks using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  end if;

  -- users (vocab-era public.users, NOT auth.users) -----------------------
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'users' and column_name = 'id') then
    execute 'alter table public.users enable row level security';
    execute 'drop policy if exists "users_own" on public.users';
    execute 'create policy "users_own" on public.users using (auth.uid() = id) with check (auth.uid() = id)';
  end if;

  -- resource_library -----------------------------------------------------
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'resource_library' and column_name = 'user_id') then
    execute 'create index if not exists idx_resource_lib_user on public.resource_library(user_id, created_at desc)';
    execute 'alter table public.resource_library enable row level security';
    execute 'drop policy if exists "resource_lib_own" on public.resource_library';
    execute 'create policy "resource_lib_own" on public.resource_library using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  end if;

  -- chat_messages --------------------------------------------------------
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'chat_messages' and column_name = 'user_id') then
    execute 'alter table public.chat_messages enable row level security';
    execute 'drop policy if exists "chat_read" on public.chat_messages';
    execute 'create policy "chat_read" on public.chat_messages using (auth.uid() = user_id)';
  end if;
end $$;
