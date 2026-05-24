-- Scholify — Learning Intelligence schema.
-- Paste into Supabase SQL Editor → Run. Idempotent.

-- Plans gain a detected learning style + suggestion history.
-- (Assumes a `plans` table already exists in your project; if it
-- doesn't, this whole migration is a no-op safely thanks to IF NOT
-- EXISTS — the client-side analyzer still works in demo mode.)

do $$
begin
  if exists (select 1 from information_schema.tables
             where table_schema = 'public' and table_name = 'plans') then
    alter table public.plans add column if not exists learning_style text;
    alter table public.plans add column if not exists style_detected_at timestamptz;
    alter table public.plans add column if not exists suggestions_shown jsonb default '[]'::jsonb;
  end if;
end $$;

create table if not exists public.plan_suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  plan_id uuid,
  suggestion_type text not null,
  suggestion_text text not null,
  action_data jsonb,
  applied boolean not null default false,
  dismissed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists plan_suggestions_user_idx on public.plan_suggestions(user_id);
create index if not exists plan_suggestions_plan_idx on public.plan_suggestions(plan_id);

-- RLS — users can only see/edit their own suggestion history.
alter table public.plan_suggestions enable row level security;

drop policy if exists "plan_suggestions_select_own" on public.plan_suggestions;
create policy "plan_suggestions_select_own" on public.plan_suggestions
  for select using (auth.uid() = user_id);

drop policy if exists "plan_suggestions_insert_own" on public.plan_suggestions;
create policy "plan_suggestions_insert_own" on public.plan_suggestions
  for insert with check (auth.uid() = user_id);

drop policy if exists "plan_suggestions_update_own" on public.plan_suggestions;
create policy "plan_suggestions_update_own" on public.plan_suggestions
  for update using (auth.uid() = user_id);
