# Scholify — Supabase Authorization Guide

This is everything you click in the **Supabase dashboard** to make login work.
The app code is already done — these are the dashboard settings only.

- **Project:** `tljczfktrbknfftdgilz`
- **Dashboard:** https://supabase.com/dashboard/project/tljczfktrbknfftdgilz
- **Brand domain:** https://scholifyapp.com
- **Vercel domain:** https://scholify-web.vercel.app
- **Time needed:** ~5 minutes (Steps 1–3). Google login (Step 4) ~10 more.

---

## Step 1 — Turn OFF email confirmation (frictionless login)

This makes sign-up instant: the user creates an account and is logged in
immediately — no "check your email" step.

1. Dashboard → **Authentication** → **Sign In / Providers** (left menu).
2. Open the **Email** provider.
3. Find **"Confirm email"** and switch it **OFF**.
4. Click **Save**.

> Leaving it ON also works — the app shows a clean "Check your inbox" screen
> instead. OFF is the frictionless option you asked for.

---

## Step 2 — Set the Site URL and Redirect URLs

Without this, login links and Google sign-in redirect to the wrong place.

1. Dashboard → **Authentication** → **URL Configuration**.
2. **Site URL** — set to your brand domain:
   ```
   https://scholifyapp.com
   ```
3. **Redirect URLs** — click **Add URL** and paste these (one per line). The
   `/**` wildcard covers every page, including `/dashboard`:
   ```
   https://scholifyapp.com/**
   https://www.scholifyapp.com/**
   https://scholify-web.vercel.app/**
   http://localhost:5173/**
   ```
   (The `localhost` one lets login work while developing on your computer.)
4. Click **Save**.

> Both domains are listed so login works whether a visitor lands on
> `scholifyapp.com` or `scholify-web.vercel.app`.

---

## Step 3 — Done — test it

At this point **email + password login fully works**.

1. Open https://scholifyapp.com/sign-up (or the `.vercel.app` URL).
2. Create an account → you land on the onboarding screen. ✅
3. Open `/sign-in` and log in with the same details. ✅

If you skipped Step 1, you'll get a confirmation email first — click the
link, then sign in.

---

## Step 4 — Google sign-in (optional)

Until this is done, the **"Continue with Google"** button shows an error.
Email/password login is unaffected.

### 4a. Create Google OAuth credentials

1. Go to https://console.cloud.google.com → create (or pick) a project.
2. **APIs & Services** → **OAuth consent screen** → choose **External** →
   fill in app name "Scholify", your support email → Save.
3. **APIs & Services** → **Credentials** → **Create Credentials** →
   **OAuth client ID** → Application type **Web application**.
4. Under **Authorized JavaScript origins**, add:
   ```
   https://scholifyapp.com
   https://scholify-web.vercel.app
   ```
5. Under **Authorized redirect URIs**, add this exact URL:
   ```
   https://tljczfktrbknfftdgilz.supabase.co/auth/v1/callback
   ```
6. Click **Create**. Copy the **Client ID** and **Client Secret**.

### 4b. Paste them into Supabase

1. Dashboard → **Authentication** → **Sign In / Providers** → **Google**.
2. Toggle it **ON**.
3. Paste the **Client ID** and **Client Secret** from step 4a.
4. Click **Save**.

Now "Continue with Google" works on both pages.

---

## Step 5 — Store the user's name (optional, recommended)

Sign-up collects a first and last name. To save them in a queryable table
(instead of only in auth metadata), run this in the dashboard's **SQL Editor**:

```sql
-- Profile row per user
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  first_name  text,
  last_name   text,
  created_at  timestamptz default now()
);

-- Row-Level Security: a user can only see/edit their own profile
alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile whenever someone signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

---

## Quick reference

| Setting | Where | Value |
|---|---|---|
| Confirm email | Auth → Providers → Email | **OFF** |
| Site URL | Auth → URL Configuration | `https://scholifyapp.com` |
| Redirect URLs | Auth → URL Configuration | `scholifyapp.com/**`, `scholify-web.vercel.app/**`, `localhost:5173/**` |
| Google redirect URI | Google Cloud Console | `https://tljczfktrbknfftdgilz.supabase.co/auth/v1/callback` |

The app credentials (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are
already committed in `.env.production` — nothing to do there.
