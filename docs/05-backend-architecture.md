# Scholify — Database & Backend Architecture (v1.0)

**Status:** living document · grounded in code as of 2026-07-08
**Owner:** founding engineering
**Scope:** the storage model (localStorage-first + Supabase durability), the full schema, auth, all five serverless functions, hosting/deploy, data lifecycle, and known gaps.

---

## 0. Executive summary

Scholify is a Vite/React SPA (scholifyapp.com, Vercel Hobby) with a deliberately thin backend:

- **The client is the database.** Every learning interaction writes to `localStorage` synchronously. The app is fully functional signed-out, offline, and with zero env vars configured.
- **Supabase is the durability layer**, not the source of truth: diagnostics and a whole-progress JSONB snapshot sync up when a session exists, protected by row-level security, merged back down by a monotonic answered-count rule.
- **Five Vercel serverless functions** (`api/lara.ts`, `api/paddle.ts`, `api/social.ts`, `api/reminders.ts`, `api/calendar-callback.ts`) carry everything that must be server-side: LLM keys, Paddle webhook verification, service-role writes, email, OAuth secrets. Each multiplexes several endpoints behind `?action=` to respect the Hobby plan's 12-function cap.
- **Entitlements live in Supabase auth `user_metadata.plan`**, written by the Paddle webhook with the service role — no billing table needed at this stage.

---

## 1. Architecture philosophy: localStorage-first, cloud as durability

The design rule, stated in the header of `src/lib/acca-cloud.ts`: *"Every call degrades gracefully: signed out, Supabase unconfigured, or the table not yet migrated → it silently no-ops (writes) or falls back to localStorage (reads). The UI never sees an error from sync."*

Consequences:

- **Zero-latency UX** — every read (`getPaperStats`, `passProbability`, flashcard due counts) is a synchronous localStorage parse; no spinners on the hot path.
- **Demo mode is the product** — a visitor can complete a diagnostic, run mocks, and get a post-mortem before ever creating an account.
- **The cloud earns its place** — Supabase exists to survive browser clears and sync devices, and to accumulate the learning-data moat.

### 1.1 localStorage key inventory

**ACCA engine (the live product):**

| key | module | shape |
|---|---|---|
| `scholify-acca-progress` | `src/lib/acca.ts` | `RawProgress`: `questions{paperId→{qId→{attempts,correct}}}`, `areas{paperId→{code→{seen,correct}}}`, `totalAnswered`, `totalCorrect`, `lastStudied`, `history[]` (≤120 study days), `streak`, `daily{date→count}`, `dailyCorrect{date→count}` |
| `scholify-acca-daily-goal` | `acca.ts` | integer (default 15, clamped 1–100 in `setDailyGoal`) |
| `scholify-acca-mocks` | `acca.ts` | `Record<paperId, MockResult[]>` — `{date, correct, total, percent}`, last 20 per paper |
| `scholify-acca-diagnostics` | `src/lib/acca-diagnostic.ts` | `Record<paperId, DiagnosticResult>` (latest per paper: passProbability, estimatedScore, confidence, areas[], weakest/strongest, counterfactual target) |
| `scholify-acca-exams` | `src/lib/acca-loop.ts` | `Record<paperId, ExamOutcome[]>` — `{paperId, examDate, passed, score|null, recordedAt}`, last 10 per paper |
| `scholify-acca-exam-snooze` | `acca-loop.ts` | `Record<paperId, yyyy-MM-dd>` — hide the "how did it go?" prompt until date |
| `scholify-acca-plan` | `src/lib/acca-plan.ts` | per-paper `PaperPlan`: `examDate`, `dailyGoal`, shield-time slot |
| `scholify-acca-topics` | `src/lib/acca-topics.ts` | per-topic results: accuracy, best check score, `mastered`, `masteredAt`, `lastAt` |
| `scholify-acca-flashcards` | `src/lib/acca-flashcards.ts` | `Record<cardId, {box, due}>` — Leitner boxes, `BOX_INTERVAL_DAYS = [0,1,3,7,16,35]` |
| `scholify-acca-journey` | `src/lib/acca-journey.ts` | journey/celebration state |
| `scholify-acca-prob-history` | `src/lib/acca-analytics.ts` | `paperId → {date → passProbability}`, ~90 days |
| `scholify-acca-pace` | `acca-analytics.ts` | per-paper `{count, totalSec, rushed, onpace, overtime, daily{date→sec}}` (~60 days of daily) |
| `scholify-acca-mistakes` | `acca-analytics.ts` | `paperId → {knowledge|misread|time|slip → count}` |
| `scholify-acca-confidence` | `acca-analytics.ts` | per-paper `{sureSeen, sureCorrect, unsureSeen, unsureCorrect}` |
| `scholify-acca-passed` / `scholify-acca-studying` / `scholify-acca-current-paper` | `src/lib/acca-qualification.ts` | qualification record: paper-id arrays + current paper |
| `scholify-acca-experience` / `scholify-acca-onboarded` | `src/lib/acca-profile.ts` | `"new"|"some"|"professional"` / `"1"` flag |

**App shell & account:**

| key | module | purpose |
|---|---|---|
| `scholify-demo-user` | `src/lib/auth.tsx` | fake `User` object for demo-mode sessions |
| `scholify-oauth-pending` (sessionStorage) | `auth.tsx` / `App.tsx` | Google OAuth round-trip marker |
| `scholify-settings` | `src/pages/Settings.tsx`, `src/lib/reminders.ts` | preferences incl. reminder opt-in |
| `scholify-theme` / `scholify-lang` | `theme.tsx` / `i18n/LanguageProvider.tsx` | LIGHT theme lock / EN-RU landing language |
| `scholify-paywall-dismissed-at`, `scholify-paywall-shown-{7,14,21}` | `usePaywall.ts`, Settings | paywall pacing |
| `scholify-notifications-last-seen` | `notification-center.ts` | badge state |
| `scholify-referred-by` / `scholify-referral-code` | `referral.ts` | referral attribution |
| `scholify-calendar-pending` | `CalendarSync.tsx` / `GoogleCalendarCallback.tsx` | calendar OAuth handshake |
| `scholify-chunk-reloaded` | `App.tsx` | stale-chunk reload guard after deploys |

**Legacy (pre-ACCA pivots, still mounted):** `scholify-plan`, `scholify-progress`, `scholify-onboarding`, `scholify-plans`, `scholify-active-plan-id`, `scholify-resources` (`src/lib/scholify-data.ts`); `scholify-vocab-deck`, `scholify-vocab-progress`, `scholify-vocab-last-report` (`vocab.ts`); `scholify-community-*` (opt-in, posts, prompt-shown, autopost-ledger, cheered + the `scholify-community-change` broadcast event) (`community-storage.ts`). Candidates for the dead-code prune tracked in the audit backlog.

---

## 2. Supabase schema

Thirteen migration files in `supabase/migrations/`. All are idempotent (`create table if not exists`, `drop policy if exists` before `create policy`). RLS is on for every user-data table.

### 2.1 The ACCA data spine (live product)

**`acca_diagnostics` — `0011_acca_diagnostics.sql`.** Append-only diagnostic results:

| column | type | notes |
|---|---|---|
| `id` | uuid PK | `gen_random_uuid()` |
| `user_id` | uuid | FK → `auth.users(id) on delete cascade` |
| `paper_id` | text | |
| `pass_probability` / `estimated_score` | int | model outputs |
| `confidence` | real | syllabus coverage 0–1 |
| `questions_answered` / `raw_correct` | int | |
| `areas` | jsonb | per-area competence breakdown |
| `target` | jsonb | the counterfactual "path to X%" |
| `answered_at` / `created_at` | timestamptz | |

Index `idx_acca_diag_user_paper_time (user_id, paper_id, answered_at desc)` — latest-per-paper is the hot path. Policies `acca_diag_own_select` / `own_insert` / `own_update`, all `auth.uid() = user_id`. Written **directly from the client with the anon key** under RLS (`persistDiagnostic` in `acca-cloud.ts`); no serverless hop.

**`acca_progress` — `0012_acca_progress.sql`.** Document-style, **one row per user**:

| column | type | notes |
|---|---|---|
| `user_id` | uuid PK | FK → `auth.users` cascade |
| `data` | jsonb | the entire `RawProgress` snapshot, verbatim |
| `answered` | int | denormalised `totalAnswered` — the monotonic merge signal |
| `updated_at` | timestamptz | |

Same three own-row RLS policies (`acca_progress_own_*`).

**The snapshot sync model (`src/lib/acca-cloud.ts`):**

- `pushAccaProgress()` — upserts `{data: snapshotProgress(), answered: progressAnsweredCount()}` with `onConflict: "user_id"`.
- `queueAccaProgressPush(delayMs = 2500)` — debounce: many answers in a session coalesce into one write.
- `syncAccaProgress()` — the on-load reconcile. Because `answered` only ever grows: cloud ahead → `restoreProgress(data.data)` hydrates local (returns `true` so the caller refreshes UI); local ahead → fire-and-forget `pushAccaProgress()`. **Monotonic answered-count merge: the more complete copy wins, no work is ever lost, no diffing needed.**
- `persistDiagnostic()` / `fetchLatestDiagnostic()` — write-through and read-preferring-newer (`mergeDiagnostic` keeps whichever `answeredAt` is later), backfilling localStorage so subsequent synchronous reads are warm.

### 2.2 Social/legacy tables (0001–0009)

Built during the pre-ACCA phases; live schema, mostly idle traffic:

| migration | tables |
|---|---|
| `0001_partnerships` | `partnerships`, `partner_notifications` |
| `0002_study_rooms` | `study_rooms`, `room_members`, `room_messages` |
| `0003_teams` | `teams`, `team_members`, `team_invites`, `team_announcements` |
| `0004_community` | `community_opt_in`, `community_posts`, `community_likes` |
| `0005_learning_intelligence` | `plan_suggestions` |
| `0006_challenges` | `weekly_challenges`, `user_challenges`, `user_xp` |
| `0007_photos` | `study_photos` |
| `0008_streak_trees` | `streak_trees` |
| `0009_referrals` | `profiles` (referral codes; extended by `0011_retention.sql` with `first_task_completed_at`, `day3_retained`, `day7_retained`, `converted_to_paid`) |

`api/reminders.ts` additionally expects a **`vocab_reminders`** table (`user_id`, `email`, `opt_in`, `reminder_time`, `last_session_date`, `updated_at`) that has **no migration file** — it was created ad-hoc; the endpoint degrades to `{disabled: true}` without it.

### 2.3 Defensive hardening — `0010_perf_rls.sql`

Wraps every block in `to_regclass()` guards so it's a safe no-op today and self-applies if the localStorage-first tables (`progress`, `plans`, `streaks`, `users`, `chat_messages`, `resource_library`) are ever created server-side: hot-path indexes (e.g. `idx_progress_user_date (user_id, completed_at desc)`) + own-row RLS policies for each.

---

## 3. Auth

**Client:** `src/lib/supabase.ts` creates one `SupabaseClient` from `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`; when either is absent, `isSupabaseConfigured = false` and the client is constructed against a syntactically-valid placeholder (`https://demo.scholify.supabase.co`) that is never called.

**`src/lib/auth.tsx` — `AuthProvider`:**

- **Real mode:** email/password (`signIn`/`signUp` via `signInWithPassword`/`signUp`, with `first_name`/`last_name` in `user_metadata` and `needsEmailConfirmation` derived from a null session) and **Google OAuth** (`signInWithGoogle` → `signInWithOAuth({provider: "google", redirectTo: `${siteUrl}/auth/callback`})`, where `siteUrl` is pinned to `https://scholifyapp.com` unless `VITE_PUBLIC_SITE_URL` overrides — so one Supabase Redirect-URL entry covers previews). Session hydrates via `getSession()` + `onAuthStateChange`; `friendlyError()` humanises Supabase error strings.
- **Demo mode** (unconfigured): `makeDemoUser()` fabricates a `User` (`id: demo-${Date.now()}`, `app_metadata.provider: "demo"`), persisted under `scholify-demo-user`. The entire sign-in/sign-up/sign-out flow works end-to-end with no server.

**Entitlements: `user_metadata.plan` is the record.** No subscriptions table — the Paddle webhook (§4.2) writes `plan` (`beginner` | `pro` | `annual_pro` | `free`), `plan_status` (`active` | `canceling` | `canceled`), `paddle_subscription_id`, `paddle_customer_id` straight onto the auth user with the service role. The client reads plan from the session; paywall logic keys off it. This is the right size until per-seat/team billing exists.

---

## 4. Serverless API — 5 functions, 12-function budget

**The cap rule:** Vercel Hobby silently fails every deploy past 12 files in `api/`. Scholify holds at **5/12** by multiplexing with `?action=` dispatchers — adding an endpoint means adding an action to an existing function, never a new file, unless there's headroom and a genuinely separate concern (see `api/lara.ts` header comment).

### 4.1 `api/lara.ts` — all AI (14 actions)

`POST /api/lara?action=message|chat|analyze-patterns|analyze-difficulty|analyze-photo|generate-tree|vocab|placement|extract|fetch-url|acca-tutor|acca-examiner|acca-generate|acca-postmortem`. Full contract documented in `docs/04-ai-architecture.md`. Env: `ANTHROPIC_API_KEY` (all Claude actions), `FAL_KEY`/`FAL_API_KEY` (`generate-tree`). Every action returns `200 + isFallback` keyless. `config = { maxDuration: 30 }`. **Currently unauthenticated — must gain JWT auth before the Anthropic key is set in prod.**

### 4.2 `api/paddle.ts` — billing fulfillment

`export const config = { api: { bodyParser: false } }` — signature verification needs the exact raw bytes (`readRawBody`).

- **`POST /api/paddle?action=webhook`** — Paddle notification destination. `verifySignature()` parses the `Paddle-Signature: ts=...;h1=...` header and checks `HMAC-SHA256(secret, "${ts}:${rawBody}")` with `crypto.timingSafeEqual` (401 `bad_signature` on mismatch). Then maps events → entitlement via `supa.auth.admin.updateUserById(userId, {user_metadata})`, where `userId` arrives as checkout `custom_data.userId` (set by `src/lib/paddle.ts`):
  - `transaction.completed` / `subscription.created|activated|updated` → `planForPrice(priceId)` maps the Paddle price id against `VITE_PADDLE_BEGINNER_MONTHLY` / `VITE_PADDLE_PRO_MONTHLY` / `VITE_PADDLE_ANNUAL_PRO` env vars → writes `plan`, `plan_status: "active"`, subscription + customer ids.
  - `subscription.updated` with `status: "canceled"`, or `subscription.canceled` → `{plan: "free", plan_status: "canceled"}`.
  - Unknown events → `200 {ok: true, ignored}`; entitlement write failure → **500 so Paddle retries with backoff**; missing config → `200 {ok:false, reason}` so Paddle doesn't retry-storm pre-setup.
- **`POST /api/paddle?action=cancel`** — authenticated: Supabase JWT in `Authorization: Bearer`, validated via `supa.auth.getUser(token)`. Calls Paddle `POST /subscriptions/{id}/cancel` with `effective_from: "next_billing_period"`, then marks `plan_status: "canceling"` — access persists until the terminal webhook flips it to `free`. Client flow lives in `Settings.tsx` (toasts per `reason`).

Env: `PADDLE_WEBHOOK_SECRET`, `PADDLE_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_URL`; `PADDLE_ENV=sandbox` flips the host to `sandbox-api.paddle.com`.

### 4.3 `api/social.ts` — invites, leaderboard, ops

- `POST ?action=partner-invite` — `{email, inviteUrl, senderName, senderGoal?}` → Resend email (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, default `Scholify <hello@scholifyapp.com>`).
- `POST ?action=team-invite` — batch variant with team branding.
- `GET ?action=leaderboard` — service-role read, weekly categories.
- `GET ?action=health` — **the ops heartbeat**, rewritten from `/api/health`. Reports 13 env keys as booleans (anthropic, supabase url/anon/service, openai, perplexity, gemini, resend, fal, vapid, paddle token/webhook/api) — values never returned, `Cache-Control: no-store`. Returns **503 `degraded`** unless the critical four (anthropic + supabase×3) are all present, so uptime monitors alert on missing config.
- `GET ?action=security` — `/api/security-check` rewrite; booleans confirming secrets are server-side.

All invite actions degrade `200 + isFallback` when Resend/service keys are missing.

### 4.4 `api/reminders.ts` — daily email nudges

- `POST ?action=sync` — authenticated (`db.auth.getUser(bearer)`); upserts `vocab_reminders` `{user_id, email, opt_in, reminder_time, last_session_date}` on `user_id`. Missing service config → `200 {ok, disabled: true}` so the in-app toggle never errors pre-setup.
- `GET ?action=send` — invoked by **Vercel cron** (`vercel.json`: `"0 8 * * *"`); guarded by `Authorization: Bearer ${CRON_SECRET}` when set. Emails opted-in users who haven't studied today via Resend.

Env: `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, optional `CRON_SECRET`, `REMINDER_FROM`.

### 4.5 `api/calendar-callback.ts` — Google Calendar OAuth

`POST` with `{action: "exchange", code, user_id}` (code→tokens on first connect) or `{action: "refresh", refresh_token, user_id}`. Exists because `GOOGLE_CLIENT_SECRET` must never ship to the client. Best-effort persistence: if Supabase/env are missing it still returns the tokens so the client can hold them in localStorage (user reconnects per device). Pairs with `src/pages/GoogleCalendarCallback.tsx` + `scholify-calendar-pending`.

---

## 5. Hosting & deploy

**`vercel.json`:**

```json
{
  "framework": "vite", "buildCommand": "vite build", "outputDirectory": "dist",
  "headers":  [{ "source": "/(.*)", "headers": [{ "key": "Permissions-Policy",
                 "value": "microphone=*, camera=*, autoplay=*" }] }],
  "rewrites": [
    { "source": "/api/health",         "destination": "/api/social?action=health" },
    { "source": "/api/security-check", "destination": "/api/social?action=security" },
    { "source": "/((?!api/|assets/).*)", "destination": "/index.html" }
  ],
  "crons": [{ "path": "/api/reminders?action=send", "schedule": "0 8 * * *" }]
}
```

- **SPA rewrite** — everything except `/api/*` and `/assets/*` serves `index.html`; React Router owns routing.
- **Vanity ops routes** — `/api/health` and `/api/security-check` are rewrites, not files: two extra endpoints for zero function-cap cost.
- **Permissions-Policy** enables mic/camera/autoplay for in-app features.
- **Deploy flow:** push to `origin/main` (`github.com/scholifyaiapp/scholify-web`) → Vercel builds and deploys → verify on the live deploy (never localhost). Local clones can be stale; `git fetch && git reset --hard origin/main` before editing. `App.tsx`'s `scholify-chunk-reloaded` guard force-reloads clients holding pre-deploy chunk hashes.
- **Post-deploy check:** `GET /api/health` — 200 `ok` vs 503 `degraded` plus the per-key boolean map.

---

## 6. Data lifecycle

**Trimming (all client-side, at write time):**

| store | policy | where |
|---|---|---|
| daily activity + dailyCorrect | trim to last **120 days** once >140 keys; `history[]` capped at 120 entries | `recordAnswer` in `acca.ts` |
| mock history | last **20 per paper** (`list.slice(-20)`) | `recordMock` in `acca.ts` |
| real-exam outcomes | last **10 per paper** (`.slice(-10)`) | `recordExamOutcome` in `acca-loop.ts` |
| pass-probability history | last **~90 days** per paper | `snapshotProbability` in `acca-analytics.ts` |
| per-day study seconds | last **~60 days** per paper | `recordAnswerTiming` in `acca-analytics.ts` |

Since `acca_progress.data` is the verbatim snapshot, client-side trimming bounds cloud row size too.

**Export** — `Settings.tsx :: exportData()`: downloads `scholify-data-<yyyy-MM-dd>.json` containing `{exported_at, account: {name, email}, plan, progress, settings}` via a Blob URL. (Scope note: currently exports the legacy `scholify-progress` blob + settings; the ACCA stores should be added to the payload.)

**Reset** — `doReset()`: removes `scholify-progress` + paywall markers, refreshes state.

**Delete** — `doDelete()`: `window.localStorage.clear()` + `signOut()`. The code comments the honest limitation: *"True auth-user deletion needs a server with the service-role key"* — the Supabase auth row and cloud tables survive; a server-side delete endpoint is on the roadmap (GDPR-relevant before commercial launch).

---

## 7. Known gaps & roadmap

1. **Exam outcomes aren't cloud-synced.** `scholify-acca-exams`, mocks, plan, flashcards, analytics stores all live outside the `acca_progress` snapshot (which covers only `RawProgress` from `acca.ts`). A browser clear loses the recovery-run state and the pass-probability recalibration anchor even for signed-in users. Fix: widen `snapshotProgress()` to a composite envelope, or add per-store rows.
2. **Whole-blob merge limits.** The monotonic `answered` rule is safe but coarse: two devices used in parallel don't interleave — the busier one wins wholesale, and the quieter device's unique work is dropped on hydrate. Acceptable single-device-dominant; needs per-key merge (or per-area row granularity) before multi-device is marketed.
3. **Per-user AI usage table — planned, not built.** `ai_usage(user_id, action, model, tokens, created_at)` + JWT on `/api/lara` + plan caps. Blocks setting `ANTHROPIC_API_KEY` in prod (see `docs/04-ai-architecture.md` §5–6).
4. **Env vars not set in production.** `/api/health` currently reports `degraded`: `ANTHROPIC_API_KEY`, Paddle keys pending; migrations `0011_acca_diagnostics` + `0012_acca_progress` need running in the cloud project. Everything works offline-first meanwhile — by design.
5. **`vocab_reminders` has no migration file** — should be codified as `0013` for reproducible environments.
6. **Commercial-scale hosting** — when revenue turns on: Vercel Pro ($20/mo — removes the 12-function cap, adds team + longer function durations) + Supabase Pro ($25/mo — daily backups, no project pausing, PITR add-on) ≈ **$46/mo** baseline infra.
7. **Account deletion endpoint** — service-role `auth.admin.deleteUser` + cascade (FKs already `on delete cascade`) behind a confirmed-email flow.
8. **Legacy prune** — the vocab/community/plan localStorage stores and their Supabase tables (0001–0009) are pivot residue; audit backlog tracks removal once the ACCA surface is confirmed as the only product.

---

*Companion documents: `docs/04-ai-architecture.md` (AI surface, learner model, cost/metering).*
