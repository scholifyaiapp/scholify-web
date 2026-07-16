-- 0019: user avatars — Supabase Storage bucket + owner-scoped RLS.
--
-- One folder per user: avatars/{auth.uid()}/avatar.webp (or .jpg on older
-- Safari). Public READ — the URL rides in user_metadata.avatar_url and
-- renders in plain <img> tags — but writes are strictly the owner's folder.
-- 512 KB cap: the client uploads a processed 256px square (~15-40 KB), so
-- anything bigger did not come from our client.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 524288, array['image/webp','image/jpeg','image/png'])
on conflict (id) do update
  set public = true,
      file_size_limit = 524288,
      allowed_mime_types = array['image/webp','image/jpeg','image/png'];

-- Postgres has no CREATE POLICY IF NOT EXISTS — drop-then-create keeps the
-- migration idempotent (same pattern as the RLS migrations before it).

drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatars_owner_insert" on storage.objects;
create policy "avatars_owner_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars_owner_update" on storage.objects;
create policy "avatars_owner_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars_owner_delete" on storage.objects;
create policy "avatars_owner_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
