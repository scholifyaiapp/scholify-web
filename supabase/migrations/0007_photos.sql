-- Scholify — Photo Evidence Mode.
-- Paste into Supabase SQL Editor → Run. Idempotent.

-- Note: this assumes a `progress` table exists in `public`. If yours
-- only has a different name, skip the ALTERs — the `study_photos`
-- table below is the canonical source for photo metadata.

do $$
begin
  if exists (select 1 from information_schema.tables
             where table_schema = 'public' and table_name = 'progress') then
    alter table public.progress add column if not exists photo_url text;
    alter table public.progress add column if not exists photo_caption text;
    alter table public.progress add column if not exists lara_photo_comment text;
  end if;
end $$;

create table if not exists public.study_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  plan_id uuid,
  progress_id uuid,
  photo_url text not null,
  caption text,
  lara_comment text,
  day_number integer,
  task_title text,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists study_photos_user_idx on public.study_photos(user_id, created_at desc);
create index if not exists study_photos_plan_idx on public.study_photos(plan_id);

alter table public.study_photos enable row level security;

drop policy if exists "study_photos_select_own_or_public" on public.study_photos;
create policy "study_photos_select_own_or_public" on public.study_photos
  for select using (auth.uid() = user_id or is_public = true);

drop policy if exists "study_photos_insert_own" on public.study_photos;
create policy "study_photos_insert_own" on public.study_photos
  for insert with check (auth.uid() = user_id);

drop policy if exists "study_photos_update_own" on public.study_photos;
create policy "study_photos_update_own" on public.study_photos
  for update using (auth.uid() = user_id);

drop policy if exists "study_photos_delete_own" on public.study_photos;
create policy "study_photos_delete_own" on public.study_photos
  for delete using (auth.uid() = user_id);

-- Storage bucket — create in dashboard if it doesn't already exist:
--   1. Storage → New bucket: name "study-photos", public OFF
--   2. Policies → New policy on the bucket:
--      a) "Users can upload their own folder" — INSERT,
--         using: (bucket_id = 'study-photos' AND auth.uid()::text = (storage.foldername(name))[1])
--      b) "Users can read their own folder" — SELECT, same expression
--      c) "Users can delete their own folder" — DELETE, same expression
--   3. Max file size: 5 MB. Allowed MIME: image/jpeg, image/png, image/webp.
