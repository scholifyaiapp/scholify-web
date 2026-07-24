/*
 * 0022 — Pre-launch waitlist for the 10 August 2026 public launch.
 *
 * Signups are server-only through api/waitlist.ts. There are deliberately no
 * anonymous client policies: launch contacts are private operational data.
 */
create table if not exists public.launch_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.launch_waitlist enable row level security;
