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

### 5a — Conversational onboarding fields (optional)

The Lara chat onboarding (`/onboarding`) captures two extra fields beyond
first/last name: the user's future-self vision and current skill level,
plus a preferred notification time. To persist them alongside the profile,
extend the table:

```sql
alter table public.profiles add column if not exists future_vision    text;
alter table public.profiles add column if not exists current_level    text;
alter table public.profiles add column if not exists notification_time text;
```

Without these columns the app still works — the values are kept in the
Supabase user metadata (`auth.users.raw_user_meta_data`) and in
`localStorage`. The table copy just makes them queryable.

---

## Step 6 — Store generated plans (optional, recommended)

The onboarding loading screen generates a learning plan and tries to save it
to a `plans` table. Without the table the app still works (the plan is kept in
the browser), but to persist plans across devices, run this in **SQL Editor**:

```sql
create table if not exists public.plans (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users on delete cascade,
  goal          text,
  deadline      timestamptz,
  daily_minutes int,
  tasks         jsonb,
  created_at    timestamptz default now()
);

alter table public.plans enable row level security;

create policy "Users read own plans"
  on public.plans for select using (auth.uid() = user_id);

create policy "Users insert own plans"
  on public.plans for insert with check (auth.uid() = user_id);
```

### 6a — Multi-goal columns (optional)

To support multiple learning goals per user with switchable "active" state,
extend the table:

```sql
alter table public.plans add column if not exists status        text default 'active'; -- active | paused | completed
alter table public.plans add column if not exists paused_at     timestamptz;
alter table public.plans add column if not exists completed_at  timestamptz;
alter table public.plans add column if not exists cover_color   text;

alter table public.profiles add column if not exists active_plan_id uuid references public.plans(id);
```

Without these columns the app still works — the multi-goal state is held
in browser `localStorage` and the Goals page is fully functional offline.

## Step 7 — Claude API key (optional — enables real AI plans)

The plan generator (`/api/generate-plan`) calls Claude. Without a key it
returns a sensible mock plan, so the flow works either way. To switch on real
AI-generated plans, add this in **Vercel → Settings → Environment Variables**:

```
ANTHROPIC_API_KEY = sk-ant-...
```

> ⚠️ Unlike the Supabase anon key, the Anthropic key is a **real secret** —
> it must only live in Vercel's environment variables, never in the code or
> the repo. Get one at https://console.anthropic.com

### 6b — Session notes (optional)

The Dashboard collects a short reflection + mood after Mark Complete. To
keep them server-side so Lara can read them from any device, extend
`progress` (or create it if missing):

```sql
alter table public.progress add column if not exists session_note text;
alter table public.progress add column if not exists session_mood text;
alter table public.progress add column if not exists plan_id      uuid;
```

The client only upserts these fields when the table exists — without
them the note still saves to `localStorage`.

### 6b-2 — Speaking practice scores (optional)

The Speaking Practice modal records clarity / accuracy / fluency / overall
scores and the transcript. Append to `progress`:

```sql
alter table public.progress add column if not exists speaking_clarity    numeric(3,1);
alter table public.progress add column if not exists speaking_accuracy   numeric(3,1);
alter table public.progress add column if not exists speaking_fluency    numeric(3,1);
alter table public.progress add column if not exists speaking_overall    numeric(3,1);
alter table public.progress add column if not exists speaking_transcript text;
```

Without these columns the modal still works — scores live in `localStorage`
as `scholify-last-speaking-score`.

To get real Whisper transcripts, add `OPENAI_API_KEY` to Vercel env vars
(see `.env.example`). Without it the modal scores blind and shows a
"no transcript" notice on the results screen.

### 6d — Lara chat history (optional)

For cross-device chat history at `/chat`, create:

```sql
create table if not exists public.chat_messages (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  role       text not null check (role in ('user','lara')),
  content    text not null,
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

create policy "Users read own chats"
  on public.chat_messages for select using (auth.uid() = user_id);

create policy "Users insert own chats"
  on public.chat_messages for insert with check (auth.uid() = user_id);

create policy "Users delete own chats"
  on public.chat_messages for delete using (auth.uid() = user_id);

create index if not exists chat_messages_user_created_idx
  on public.chat_messages (user_id, created_at desc);
```

Without the table chat still works — history is held in browser
`localStorage` as `scholify-chat-messages`.

### 6c — Resource library (optional)

Lara's "Best resource today" picks are saved client-side automatically.
For a queryable server-side mirror, create:

```sql
create table if not exists public.resource_library (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users on delete cascade,
  plan_id         uuid references public.plans(id),
  task_title      text,
  resource_title  text not null,
  resource_url    text not null,
  resource_type   text,
  bookmarked      boolean not null default false,
  created_at      timestamptz not null default now()
);

alter table public.resource_library enable row level security;

create policy "Users read own resources"
  on public.resource_library for select using (auth.uid() = user_id);

create policy "Users insert own resources"
  on public.resource_library for insert with check (auth.uid() = user_id);

create policy "Users update own resources"
  on public.resource_library for update using (auth.uid() = user_id);

create policy "Users delete own resources"
  on public.resource_library for delete using (auth.uid() = user_id);
```

Until this exists the Resource Library page still works from
`localStorage` — the table is only required for cross-device sync.

---

## Step 8 — Push subscriptions table (for web push)

Web push notifications store each device's subscription here. Run in
the **SQL Editor**:

```sql
create table if not exists public.push_subscriptions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users on delete cascade,
  subscription jsonb not null,
  created_at   timestamptz default now(),
  unique (user_id)
);
```

The `/api/save-push-subscription` function writes here using the
service-role key — set `SUPABASE_SERVICE_ROLE_KEY` in Vercel env vars.

> ⚠️ **Sending** scheduled reminders (email + background push) also needs
> server-side records of each user's plan, streak and reminder time.
> The app currently keeps that in the browser (localStorage), so the
> sending side is not yet wired — see the notes from the build.

## Step 9 — Calendar sync (optional)

To let users push tasks into their Google Calendar or Cal.com, the app
needs a small `calendar_accounts` table to persist OAuth tokens and
per-user preferences. Run in **SQL Editor**:

```sql
create table if not exists public.calendar_accounts (
  user_id                   uuid primary key references auth.users on delete cascade,
  provider                  text not null default 'google',
  google_access_token       text,
  google_refresh_token      text,
  google_token_expiry       timestamptz,
  calcom_api_key            text,
  calendar_sync_enabled     boolean not null default false,
  calendar_reminder_minutes integer not null default 15,
  auto_sync                 boolean not null default true,
  updated_at                timestamptz not null default now()
);

alter table public.calendar_accounts enable row level security;

create policy "Users read own calendar account"
  on public.calendar_accounts for select using (auth.uid() = user_id);

create policy "Users insert own calendar account"
  on public.calendar_accounts for insert with check (auth.uid() = user_id);

create policy "Users update own calendar account"
  on public.calendar_accounts for update using (auth.uid() = user_id);
```

Then in **Vercel → Settings → Environment Variables** add:

```
VITE_GOOGLE_CLIENT_ID    = <from Google Cloud Console>
GOOGLE_CLIENT_SECRET     = <from Google Cloud Console>
VITE_GOOGLE_REDIRECT_URI = https://scholifyapp.com/auth/google/calendar
```

In **Google Cloud Console** → OAuth client → **Authorized redirect URIs**,
add the same URL: `https://scholifyapp.com/auth/google/calendar` (and the
Vercel preview URL if you use it). Enable the **Google Calendar API**
under "APIs & Services → Library".

Without these the app still loads — the Calendar Sync card just shows a
"Not configured" state instead of letting users connect.

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
