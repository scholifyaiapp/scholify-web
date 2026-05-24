-- Scholify Teams — B2B workspaces for companies, universities, schools.
-- Paste into Supabase SQL Editor → Run. Idempotent.

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  logo_url text,
  primary_color text not null default '#5E5CE6',
  admin_id uuid references auth.users(id) on delete set null,
  plan_type text not null default 'teams',
  max_members integer not null default 50,
  default_goal text,
  allow_free_goals boolean not null default true,
  invite_token text unique default substr(md5(random()::text), 1, 32),
  created_at timestamptz not null default now()
);

create index if not exists teams_admin_idx on public.teams(admin_id);
create index if not exists teams_invite_token_idx on public.teams(invite_token);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'member',
  assigned_goal text,
  assigned_deadline date,
  assigned_daily_minutes integer not null default 20,
  joined_at timestamptz not null default now(),
  unique (team_id, user_id)
);

create index if not exists team_members_team_idx on public.team_members(team_id);
create index if not exists team_members_user_idx on public.team_members(user_id);

create table if not exists public.team_invites (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  email text not null,
  role text not null default 'member',
  token text unique default substr(md5(random()::text), 1, 32),
  expires_at timestamptz not null default now() + interval '7 days',
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists team_invites_team_idx on public.team_invites(team_id);
create index if not exists team_invites_token_idx on public.team_invites(token);
create index if not exists team_invites_email_idx on public.team_invites(email);

create table if not exists public.team_announcements (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  title text not null,
  message text not null,
  send_email boolean not null default false,
  send_push boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists team_announcements_team_time_idx
  on public.team_announcements(team_id, created_at desc);

-- ── RLS ─────────────────────────────────────────────────────────────────────
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.team_invites enable row level security;
alter table public.team_announcements enable row level security;

-- Teams: visible to members and admins; insert/update/delete restricted to
-- the admin.
drop policy if exists "teams_select_member" on public.teams;
create policy "teams_select_member" on public.teams
  for select using (
    auth.uid() = admin_id
    or exists (
      select 1 from public.team_members tm
      where tm.team_id = teams.id and tm.user_id = auth.uid()
    )
  );

drop policy if exists "teams_insert_admin" on public.teams;
create policy "teams_insert_admin" on public.teams
  for insert with check (auth.uid() = admin_id);

drop policy if exists "teams_update_admin" on public.teams;
create policy "teams_update_admin" on public.teams
  for update using (auth.uid() = admin_id);

drop policy if exists "teams_delete_admin" on public.teams;
create policy "teams_delete_admin" on public.teams
  for delete using (auth.uid() = admin_id);

-- Team members: any team member can read the roster.
drop policy if exists "team_members_select" on public.team_members;
create policy "team_members_select" on public.team_members
  for select using (
    exists (
      select 1 from public.team_members tm2
      where tm2.team_id = team_members.team_id and tm2.user_id = auth.uid()
    )
    or exists (
      select 1 from public.teams t
      where t.id = team_members.team_id and t.admin_id = auth.uid()
    )
  );

drop policy if exists "team_members_insert_self_or_admin" on public.team_members;
create policy "team_members_insert_self_or_admin" on public.team_members
  for insert with check (
    auth.uid() = user_id
    or exists (
      select 1 from public.teams t
      where t.id = team_members.team_id and t.admin_id = auth.uid()
    )
  );

drop policy if exists "team_members_delete_self_or_admin" on public.team_members;
create policy "team_members_delete_self_or_admin" on public.team_members
  for delete using (
    auth.uid() = user_id
    or exists (
      select 1 from public.teams t
      where t.id = team_members.team_id and t.admin_id = auth.uid()
    )
  );

drop policy if exists "team_members_update_admin" on public.team_members;
create policy "team_members_update_admin" on public.team_members
  for update using (
    exists (
      select 1 from public.teams t
      where t.id = team_members.team_id and t.admin_id = auth.uid()
    )
  );

-- Invites: admin can read/insert/delete; anyone can read by token (handled
-- via a server-side function in practice — for now we let any authed user
-- query by token).
drop policy if exists "team_invites_admin_full" on public.team_invites;
create policy "team_invites_admin_full" on public.team_invites
  for all using (
    exists (
      select 1 from public.teams t
      where t.id = team_invites.team_id and t.admin_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.teams t
      where t.id = team_invites.team_id and t.admin_id = auth.uid()
    )
  );

-- Announcements: any team member can read; only admins can write.
drop policy if exists "team_announcements_select" on public.team_announcements;
create policy "team_announcements_select" on public.team_announcements
  for select using (
    exists (
      select 1 from public.team_members tm
      where tm.team_id = team_announcements.team_id and tm.user_id = auth.uid()
    )
    or exists (
      select 1 from public.teams t
      where t.id = team_announcements.team_id and t.admin_id = auth.uid()
    )
  );

drop policy if exists "team_announcements_insert_admin" on public.team_announcements;
create policy "team_announcements_insert_admin" on public.team_announcements
  for insert with check (
    exists (
      select 1 from public.teams t
      where t.id = team_announcements.team_id and t.admin_id = auth.uid()
    )
  );

-- Enable Realtime on `team_announcements` (and optionally `team_members`)
-- under Database → Replication once the migration has run.
