# Scholify — Claude Code Master Implementation Guide (v1.0)

> **Read this before touching the codebase.** Scholify is an AI-powered ACCA exam-prep
> app (Vite + React 18 + TypeScript + Supabase + Vercel serverless + Claude API).
> Every rule below is grounded in the actual source — file paths are given so you can
> verify. When this guide and the code disagree, the code wins; then fix this guide.

---

## 1. Repo map

Root: `C:\Users\HP\Desktop\Scholify\scholify-web` (the ONLY working copy — a stale
duplicate exists at `Desktop\scholify-web`; never touch it).

### `src/pages/` — one file per route (all lazy-loaded via `lazyWithReload` in `App.tsx`)

| File | Route(s) | What it is |
|---|---|---|
| `Landing.tsx` | `/` | Marketing landing — EN/RU, ACCA copy, 3D showcase, pricing section |
| `SignIn.tsx` / `SignUp.tsx` | `/sign-in`, `/signin`, `/sign-up`, `/signup` | Guest-only auth screens |
| `AuthCallback.tsx` | `/auth/callback` | Supabase OAuth return (must stay public) |
| `GoogleCalendarCallback.tsx` | `/auth/google/calendar` | Google Calendar OAuth return |
| `Dashboard.tsx` | `/dashboard` | The command centre: greeting, pass probability, today's mission, vitals |
| `AccaStudy.tsx` | `/study` (+ `?do=` deep links) | The study hub: paper overview, sessions, mocks, topics, flashcards, onboarding |
| `AccaDiagnostic.tsx` | `/study/diagnostic` | The ~15-min baseline diagnostic |
| `AccaAnalytics.tsx` | `/study/analytics` | 4-section analytics (Progress · Learning · Study · Exam); `/study/progress` redirects here |
| `Settings.tsx` | `/settings` | Account, daily goal, reminders, billing status |
| `Pricing.tsx` | `/pricing` | Public pricing page (monthly/annual toggle) |
| `Privacy.tsx` / `Terms.tsx` / `Support.tsx` | `/privacy`, `/terms`, `/support` | Public info pages |

Catch-all `*` → `/dashboard` (see `src/App.tsx`).

### `src/components/`

- `acca/` — **the app's design system + ACCA feature components.** `ui.tsx` (tokens,
  Lucide `Icon` layer, primitives — see §4), `charts.tsx` (StatCard/RingGauge/MeterBar/
  BreakdownList/Sparkbars), `AccaOnboarding.tsx` (wizard; writes `setDailyGoal`),
  `JourneyMap.tsx` (loop stages), `ExamDayFlow.tsx`, `PostMortemPanel.tsx`,
  `TutorPanel.tsx`, `ExaminerView.tsx`, `FlashcardsView.tsx`, `GenerateView.tsx`.
- `auth/` — `auth-ui.tsx` (shared auth chrome, IRIDESCENT gradient), `auth-characters.tsx`.
- `ui/` — landing-page eye-candy primitives (spotlight-card, magnetic-button,
  testimonials-columns, nav-header, motion-footer, …). Landing-only; app screens use `acca/ui.tsx`.
- Root level — `PaywallModal.tsx`, `PricingCard.tsx`, `Toast.tsx`, `LaraAvatar.tsx`,
  `NotificationBell.tsx`, `CalendarSync.tsx`, `LazyOnView.tsx`, `route-guards.tsx`
  (`ProtectedRoute`/`GuestRoute`), `dashboard-layout.tsx`, `info-page-layout.tsx`,
  `landing-3d.tsx`, `lara-landing-widget.tsx`, `language-toggle.tsx`, `ErrorBoundary.tsx`.

### `src/lib/` — the engine (localStorage-first, pure TS)

- `acca.ts` — core practice engine: papers, `getPaperStats`, `recordMock`/`getMockHistory`,
  daily goal + activity, `snapshotProgress`/`restoreProgress`.
- `acca-loop.ts` — **the journey loop's laws** (see §3): `passProbability()`, `MOCK_GATE`,
  `MOCK_PASS`, `MOCKS_REQUIRED`, `mockGate`, `mockProgress`, exam outcomes, `recoveryState`,
  `getJourneyStages`.
- `acca-today.ts` — daily mission builder: `buildTodayPlan` (max 3 tasks), `MISSION_MINUTES`,
  `greeting`, `todayHeadline`.
- `acca-diagnostic.ts` — diagnostic + pass-probability engine, `estimateFromPractice`,
  `getLatestDiagnostic`.
- `acca-profile.ts` — onboarding flag (`isAccaOnboarded`/`markAccaOnboarded`) + experience level.
- `acca-plan.ts` — study plan / readiness (exam date, phases).
- `acca-topics.ts` — chapter-by-chapter study path; `TOPIC_PASS = 0.65`, `recordTopicTest`.
- `acca-qualification.ts` — the 13-exam ACCA map; passed/studying paper lists.
- `acca-flashcards.ts` — spaced repetition; `flashcardStats`.
- `acca-content.ts` — papers, syllabus areas, seed question bank (**original questions only — legal**).
- `acca-written.ts` — constructed-response questions for the AI Examiner.
- `acca-ai.ts` — client for the tutor/examiner API calls (handles `isFallback`).
- `acca-analytics.ts` — instrumentation for the 4-section dashboard (prob history, pace,
  mistakes, confidence).
- `acca-cloud.ts` — Supabase sync (see §8).
- `acca-journey.ts` — non-exam requirements (EPSM + PER).
- `auth.tsx` — Supabase auth provider + demo user fallback.
- `supabase.ts` — client + `isSupabaseConfigured`.
- `paddle.ts`, `referral.ts`, `reminders.ts`, `calendar.ts`, `calcom.ts`,
  `notification-center.ts`, `community-storage.ts`, `analytics.ts` (PostHog),
  `theme.tsx`, `utils.ts`.
- `vocab.ts`, `scholify-data.ts` — **legacy** (pre-ACCA-pivot vocab/plan engine). Don't
  build on them; they're on the dead-code prune backlog.

### Everything else

- `src/i18n/` — `translations.ts` (RU map, key = exact EN string) + `LanguageProvider.tsx`
  (`t()`, `useT()`, `scholify-lang` persistence).
- `src/hooks/` — `usePaywall.ts` (plan gating + dismissal), `use-mobile.ts`.
- `src/index.css` — Tailwind v4 + the `--sch-*` CSS color tokens the design system reads.
- `api/` — **5 Vercel serverless functions** (Hobby cap is 12 — see §7): `lara.ts`
  (all AI, `?action=` dispatcher), `social.ts` (community + health/security),
  `paddle.ts` (billing fulfillment, `?action=`), `reminders.ts` (daily email cron),
  `calendar-callback.ts` (Google OAuth token exchange).
- `supabase/migrations/` — `0001`–`0012` SQL. ACCA-relevant: `0011_acca_diagnostics.sql`,
  `0012_acca_progress.sql` (cloud sync tables + RLS). Migrations 0011+0012 may not be run
  in the cloud yet — all code degrades gracefully without them.
- `docs/` — engineering docs (this file).
- `scripts/` — asset tooling (`og-image.html`, `optimize-identity.mjs`).
- `vercel.json` — SPA rewrites, `/api/health` → `social?action=health`, cron
  `/api/reminders?action=send` at 08:00 UTC.

---

## 2. Golden workflow (every session, in this order)

### 2.1 Remote is authoritative — sync FIRST

Local can be stale (other sessions push to main). **Before editing anything:**

```bash
cd /c/Users/HP/Desktop/Scholify/scholify-web
git fetch && git reset --hard origin/main
```

Never merge stale local work on top; never assume your checkout matches production.
Origin: `https://github.com/scholifyaiapp/scholify-web.git` — do not ask to confirm it.

### 2.2 npm on this machine

PowerShell blocks `npm.ps1` here. Run npm through `cmd.exe` from the Bash tool:

```bash
cmd.exe //c "npm install"          # deps
cmd.exe //c "npx tsc -b --force"   # typecheck
cmd.exe //c "npx vite build"       # build
```

### 2.3 Verify — typecheck THEN build, both must pass

```bash
cmd.exe //c "npx tsc -b --force"   # MUST exit 0
cmd.exe //c "npx vite build"       # MUST exit 0
```

**`vite build` does NOT typecheck.** `package.json`'s build script is plain `vite build`,
and Vercel runs the same (`vercel.json` → `"buildCommand": "vite build"`). A missing or
wrong import compiles "fine" and ships a **runtime crash** — this has actually happened
in this repo. `npx tsc -b --force` is the only gate that catches it. Run it every time,
even for "trivial" changes.

### 2.4 Commit + push

Conventional style, small focused commits, straight to `origin/main`:

```
feat(loop): …    fix(landing): …    feat(pricing): …    chore: …
```

Push without being asked to wait — the standing instruction for this project is
push-to-deploy (no localhost dev-server verification; the user checks production).

### 2.5 Verify the deploy actually shipped

Vercel deploys on push. Confirm the new bundle is live by comparing hashed asset names:

```bash
# what you built locally
ls dist/assets | grep '^index-.*\.js$'
# what production serves
curl -s https://scholifyapp.com | grep -o 'assets/index-[A-Za-z0-9_-]*\.js'
```

If production still serves the old hash, the deploy hasn't finished or **silently
failed** — the classic cause is exceeding the 12-function API cap (§7), which fails
every deploy with no loud error. Then smoke-check routes (§10).

---

## 3. THE INVARIANTS — the loop's laws

The product is one closed loop per paper (documented at the top of `src/lib/acca-loop.ts`):

> sign up → AI onboarding → diagnostic → roadmap → today's mission →
> learn/practise/flashcards/revise → progress check (pass probability) →
> `< 60%` keep steering at weak areas / `≥ 60%` mock room unlocks →
> Mock 1→2→3 (fail → post-mortem → drills → retry) → real ACCA exam →
> PASS: next paper / FAIL: recovery run → back into the loop.

These rules keep it one loop with one truth. **Violating any of them is a bug.**

### 3.1 One pass-probability read: `passProbability()`

`passProbability(paperId)` in `src/lib/acca-loop.ts` is **the only function allowed to
produce a headline pass number.** It layers the live practice estimate over the latest
diagnostic and — critically — recalibrates during a recovery run: after a failed real
sitting, the real mark anchors the estimate (65% weight, washing out over ~260 answers),
so recovery work literally earns the number back.

- **Never** call `estimateFromPractice()` or `getLatestDiagnostic().passProbability`
  directly for a displayed headline number — they miss the recovery recalibration and
  create "two truths" on screen.
- `stats.readiness` (from `getPaperStats`) is a coverage proxy — acceptable only as the
  explicit fallback when `passProbability()` returns `null` (no evidence yet), the
  pattern already used in `AccaStudy.tsx`: `passProbability(current) ?? stats.readiness`.

### 3.2 Constants, never literals

| Constant | Value | Lives in | Meaning |
|---|---|---|---|
| `MOCK_GATE` | `60` | `acca-loop.ts` | Pass probability that unlocks the mock room |
| `MOCK_PASS` | `50` | `acca-loop.ts` | The ACCA pass line applied to mocks |
| `MOCKS_REQUIRED` | `3` | `acca-loop.ts` | Mocks to sit before the real exam |
| `TOPIC_PASS` | `0.65` | `acca-topics.ts` | Knowledge-check score that masters a topic |
| `MISSION_MINUTES` | `{diagnostic:15, weak:25, practice:20, flashcards:12, mock:30}` | `acca-today.ts` | The single source for "~25 min" labels |

Writing `60`, `50`, `3`, `0.65`, or a minutes literal where one of these is meant is a
bug even if the value is currently identical. Import the constant.

Also baked into `mockGate()`: **once the mock room has unlocked (or any mock has been
sat) it never re-locks** — probability dips while drilling new weak areas, and the
fail → post-mortem → retry path must always be able to reach "retry". Don't "fix" this.

### 3.3 Deep links start tasks, never pickers

`/study?do=weak|practice|mock|flashcards|diagnostic` (handled in `AccaStudy.tsx`,
~line 160) lands the student **inside** the task in one tap — the URL param is consumed
and stripped via `history.replaceState`. Every "Start now"-style button anywhere in the
app (Dashboard mission card, vitals tiles, Analytics next-task buttons, post-mortem plan
steps) MUST navigate to one of these deep links, exactly as `Dashboard.tsx` and
`AccaAnalytics.tsx` already do (`navigate(\`/study?do=${task.action}\`)`). Never add a
button that dumps the user on a mode picker.

Plain `/study` (no `?do=`) defaults to the **current paper's overview** — that default
stays.

### 3.4 Onboarding: one flag, one goal write

- `isAccaOnboarded()` / `markAccaOnboarded()` in `src/lib/acca-profile.ts` is **the one
  and only** onboarding flag (localStorage `scholify-acca-onboarded`). Never invent a
  second signal (auth metadata, presence of a plan, etc.) — `src/lib/auth.tsx` has a
  comment pointing here for exactly this reason.
- Onboarding lives at **`/welcome`** (`src/pages/Welcome.tsx`, full-screen swipe flow,
  2026-07-09). `/dashboard` and `/study` both redirect un-onboarded users there;
  `/welcome` self-redirects to `/dashboard` once onboarded. Keep all three redirects.
- `Welcome.tsx::persist()` writes `setDailyGoal(questionsPerDay)` (goal from
  `src/lib/acca.ts`), per-paper `setPlan`, `setStudyingPapers`, `setGoal`, and calls
  `markAccaOnboarded()`. Any change to onboarding must preserve these writes. The
  primary exit is `/study/diagnostic?next=paywall` (day-one activation) → results →
  trial paywall → `/dashboard` (`SetupStrip` shows the answers).

### 3.5 GPS ideology — closed feedback loops

Every user action must feed the learner model, and every metric must influence the next
task. Concretely, this already looks like: finished sessions call `snapshotProbability()`
+ `queueAccaProgressPush()` (`AccaStudy.tsx`); mocks call `recordMock`; timed-out
questions call `recordMistake(paperId, "time", …)`; the mission builder
(`buildTodayPlan`) reads diagnostics, flashcard dues, and the mock gate to pick the next
task. **When you add a feature, wire both directions**: record its evidence, and make
some recommendation consume that evidence. A metric that nothing reads, or an activity
that nothing records, is dead weight and violates the product's core idea.

---

## 4. Design system laws

- **All app UI builds on `src/components/acca/ui.tsx`.** It exports the color tokens
  (`C.*` over the `--sch-*` CSS vars in `index.css`, brand `#C80000`), the accent
  gradient `GRAD`, the 4px spacing grid `SP`, radii `R`, `SHADOW`, the type scale
  `TYPE`, motion presets `MOTION`, and primitives (Card, SectionLabel, Stat, Button,
  Badge, `Icon`, `IconBadge`). Do not hand-roll colors, shadows, radii, or font sizes
  on app screens — compose from these.
- **All charts/meters/gauges come from `src/components/acca/charts.tsx`**:
  `StatCard` (KPI tile + delta chip + sparkbars), `RingGauge` (animated donut with
  target tick), `MeterBar` (thin bar + pass-line tick), `BreakdownList` (per-category
  rows), `Sparkbars`, `DeltaChip`, plus `useCountUp` and `bandColor`/`bandSoft`
  (green/amber/red only where the number MEANS good/at-risk/behind vs a pass line).
  Never hand-roll a bar, ring, or gauge — every number in the app must be measured and
  drawn the same way.
- **NO emoji as icons.** Use the semantic Lucide layer: `<Icon name="mock" />`,
  `<IconBadge name="weak" tone="brand" />`. The `ICONS` map in `ui.tsx` names them
  (study, mock, flashcards, diagnostic, weak, streak, lock, celebrate, …). Legacy emoji
  strings still exist in some data layers (e.g. `JourneyStage.emoji`) — don't add new
  ones, and map data-layer emoji to `Icon` at render time.
- **Light theme, layout pinned.** Warm-paper background, ACCA palette accents (red
  `#C80000`, magenta `#E50068`, amber `#F4A405` — `GRAD`). Don't redesign the landing;
  its design is pinned.
- **Hovers never shift layout.** `MOTION.press` uses opacity/shadow/tap-scale, not size
  or position changes. Hover states must not cause reflow.
- **framer-motion (the `motion` package, imported from `motion/react`) on everything
  user-facing.** Ship UI changes with enter animations (`MOTION.rise`), staggered lists
  (`MOTION.item(i)`), and count-ups where a number is revealed — not just markup.
  All motion must be reduced-motion safe (short, transform/opacity-based, presets only).

---

## 5. i18n laws

- **Landing (and public pages) only**: every user-visible string goes through `t()` from
  `src/i18n/LanguageProvider.tsx`, with a Russian value added to `ru` in
  `src/i18n/translations.ts`. **The key is the exact English string** — punctuation
  included (`—`, `·`, `×`, `→`, `…`, curly apostrophes). Change the English copy →
  you must change the key too, or the RU translation silently falls back to English.
- **App screens are English-only BY DESIGN.** ACCA's official language is English;
  translating the app (M23) is a WON'T-DO. Never add `t()` or RU strings to
  `/dashboard`, `/study`, `/study/*`, or `/settings` screens.
- **ACCA paper names/codes stay English everywhere** — including inside Russian landing
  copy ("FA", "Financial Reporting", etc. are never translated).
- Language persists in localStorage `scholify-lang`; toggle is `language-toggle.tsx`
  (landing only).

---

## 6. Copy laws

- **Never "you failed."** A failed sitting is a *recovery run* — part of the journey,
  not a verdict. Follow the existing register in `acca-loop.ts` / `acca-today.ts`:
  "Not this time — recorded, reflected on, and feeding the plan", "Recover the marks in
  X", "the comeback", "prove it again", "the retake run is live".
- **Supportive coach tone**: direct, warm, honest — never hype, never scolding. The app
  tells the student what to do next, not how they should feel.
- **Evidence-tied headlines**: numbers on screen must state their evidence, like
  `todayHeadline()` does — "You're at 62% to pass FR. Finish today's plan to push it
  higher." Never show a motivational number the model didn't produce; never show a
  probability without a next action attached.
- Post-mortem copy (AI and local fallback in `api/lara.ts`) opens with acknowledgement,
  then what the evidence says, then exactly 3 plan steps ending in the retry mock. Keep
  that shape.

---

## 7. Serverless laws (`api/`)

- **Hard cap: 12 files under `api/`** (Vercel Hobby). Exceeding it **silently fails
  every deploy** — the site just stops updating. Current count: **5**
  (`lara.ts`, `social.ts`, `paddle.ts`, `reminders.ts`, `calendar-callback.ts`).
- **Extend via `?action=` dispatchers, never new files** (unless there is a strong
  reason and the count clearly allows). `api/lara.ts` dispatches `message | chat |
  analyze-patterns | analyze-difficulty | analyze-photo | generate-tree | vocab |
  placement | extract | fetch-url | acca-tutor | acca-examiner | acca-generate |
  acca-postmortem`; `paddle.ts`, `social.ts`, `reminders.ts` do the same. New AI
  feature → new `action` branch in `lara.ts`.
- **Every AI handler degrades gracefully.** Without `ANTHROPIC_API_KEY` (or on API
  error) handlers return **HTTP 200 with `isFallback: true`** and a deterministic local
  fallback (e.g. `localPostmortem`, `localExaminer`, rubric-keyword marking). Never
  return 5xx for a missing key; never let the client see a hard error from an AI path.
  New handlers must implement a real local fallback, not an empty stub, where feasible.
- **Keys are server-side only.** `ANTHROPIC_API_KEY`, Paddle secrets, Google OAuth
  secrets live in Vercel env vars, read via `process.env` inside `api/` — never in
  `src/`, never `VITE_`-prefixed (except the intentionally public Supabase URL/anon key).
- Aliased routes live in `vercel.json` rewrites (`/api/health` →
  `social?action=health`); the daily reminder cron hits `/api/reminders?action=send`.

---

## 8. Data laws

- **localStorage-first.** The whole ACCA engine works signed-out and offline. Every
  localStorage/sessionStorage access is wrapped in `try/catch` (private mode, quota) —
  see any `read*/write*` helper in `src/lib/`. Follow that pattern exactly; a bare
  `localStorage.getItem` outside try/catch is a bug.
- **Cloud sync via `src/lib/acca-cloud.ts` patterns**:
  - *Fire-and-forget writes*: `persistDiagnostic` writes locally first (instant), then
    upserts to Supabase; the promise resolves even if the cloud write fails. The UI
    never sees a sync error.
  - *Monotonic merge*: `syncAccaProgress` compares the `answered` counter (only ever
    grows) — cloud ahead → hydrate local; local ahead → push. No timestamps races, no
    lost work. New synced data must define a similar monotonic measure.
  - *Debounced push*: `queueAccaProgressPush()` (2.5s) coalesces a session's answers
    into one write. Call it after recording activity, as `AccaStudy.tsx` does.
  - Everything no-ops cleanly when signed out, Supabase unconfigured, or the table
    unmigrated (RLS per-user rows; migrations `0011`/`0012`).
- **Storage keys are a namespace — enumerate before adding.** All keys are prefixed
  `scholify-`. Current inventory:
  - ACCA engine: `scholify-acca-progress`, `scholify-acca-mocks`,
    `scholify-acca-daily-goal`, `scholify-acca-diagnostics`, `scholify-acca-plan`,
    `scholify-acca-topics`, `scholify-acca-flashcards`, `scholify-acca-exams`,
    `scholify-acca-exam-snooze`, `scholify-acca-passed`, `scholify-acca-studying`,
    `scholify-acca-current-paper`, `scholify-acca-onboarded`,
    `scholify-acca-experience`, `scholify-acca-journey`, `scholify-acca-prob-history`,
    `scholify-acca-pace`, `scholify-acca-mistakes`, `scholify-acca-confidence`
  - App/meta: `scholify-settings`, `scholify-lang`, `scholify-theme`,
    `scholify-paywall-dismissed-at`, `scholify-notifications-last-seen`,
    `scholify-referred-by`, `scholify-referral-code`, `scholify-demo-user`,
    `scholify-community-*` (opt-in, posts, ledger, cheered, seeded),
    session: `scholify-oauth-pending`, `scholify-chunk-reloaded`, `scholify-calendar-pending`
  - Legacy (vocab/plan era — don't extend): `scholify-plan`, `scholify-progress`,
    `scholify-onboarding`, `scholify-plans`, `scholify-active-plan-id`,
    `scholify-resources`, `scholify-vocab-*`
  New keys: `scholify-acca-<thing>`, defined as a `const KEY` at the top of the owning
  module — never inline strings at call sites, never reuse a legacy key.

---

## 9. Pricing laws

Current prices (commits `0782189` reprice + `8c52a8a` 33% annual):

| Plan | Monthly | Annual (billed) | Annual (per-mo display) |
|---|---|---|---|
| Beginner | **$9.99** | **$79.99/yr** | $6.67 |
| Pro | **$14.99** | **$119.99/yr** | $10.00 |

Annual discount is **33%**. Price literals are **hardcoded in multiple files** — a price
change means updating ALL of them plus the RU translation keys:

- `src/pages/Pricing.tsx` — monthly/annual toggle values, "Billed as $79.99/yr" /
  "$119.99/yr" notes, old-price strikethroughs, `$119.99/year` copy.
- `src/components/PaywallModal.tsx` — `price="$9.99"`, `price="$14.99"`, `$119.99/yr`.
- `src/pages/Landing.tsx` — `starterMonth={9.99}`, `proMonth={14.99}`, and the
  market-rates disclaimer string passed to `t()`.
- `src/pages/Settings.tsx` — "Billed monthly · $14.99/month".
- `src/i18n/translations.ts` — any RU key containing a price (e.g. the MARKET RATES
  disclaimer contains `$14.99/MO OR $119.99/YR` in **both** the key and the value —
  changing the EN string changes the key, so update both sides).

Grep before and after: `grep -rn '9\.99\|14\.99\|79\.99\|119\.99' src/` — every hit must
agree. Paddle price IDs (in `api/paddle.ts` / env) must be changed in the Paddle
dashboard too — flag that for the user rather than guessing.

---

## 10. Testing / verification checklist (before EVERY push)

1. **Typecheck**: `cmd.exe //c "npx tsc -b --force"` → exit 0. Non-negotiable (§2.3).
2. **Build**: `cmd.exe //c "npx vite build"` → exit 0, note the new `dist/assets/index-*.js` hash.
3. **Regression greps** (all should come back clean or unchanged):
   - Rogue pass numbers: `grep -rn 'estimateFromPractice' src/pages src/components` —
     headline displays must go through `passProbability()`.
   - Magic constants: `grep -rn '>= 60\|>= 50\|0\.65' src/` on files you touched —
     should be `MOCK_GATE` / `MOCK_PASS` / `TOPIC_PASS`.
   - Emoji icons in new UI: eyeball your diff; new screens use `<Icon />`.
   - Bare storage access: `grep -n 'localStorage' <changed files>` — every access inside try/catch.
   - App-screen i18n leaks: no `useT`/`t(` in `Dashboard/AccaStudy/AccaDiagnostic/AccaAnalytics/Settings`.
   - API count: `ls api/*.ts | wc -l` ≤ 12 (currently 5).
4. **Push**, then **verify deploy** (§2.5): served `index-*.js` hash at
   `https://scholifyapp.com` changed to the new bundle.
5. **Smoke-check routes** on production (200 + renders):
   - `/` (landing, EN and RU toggle), `/pricing`
   - `/sign-in`, `/sign-up`
   - `/dashboard` (redirects to `/study` when un-onboarded; mission card buttons deep-link)
   - `/study`, `/study?do=weak` (lands inside a session), `/study/diagnostic`, `/study/analytics`
   - `/settings`, `/privacy`, `/terms`, `/support`
   - An unknown path (e.g. `/plan`) → redirects to `/dashboard`
6. If you touched `api/`: hit `/api/health` (→ `social?action=health`) and exercise the
   changed action; confirm no-key paths return 200 + `isFallback: true`.

---

## 11. Common pitfalls (learned the hard way in this repo)

1. **"vite build passed" ≠ "it works".** Vite does not typecheck; a missing import
   shipped a runtime crash to production here. `npx tsc -b --force` first, always. The
   error boundary + `lazyWithReload` in `App.tsx` soften chunk-load failures after a
   deploy, but they cannot save you from a bad import.
2. **PowerShell blocks npm.** `npm`/`npx` invoked directly in PowerShell fails on this
   machine (`npm.ps1` execution policy). Route through `cmd.exe //c "npx …"` from the
   Bash tool. Don't burn turns re-discovering this.
3. **Stale local checkout.** Other sessions push to `origin/main`; editing without
   `git fetch && git reset --hard origin/main` produces conflicts or silently reverts
   shipped work. Sync first, every session (§2.1).
4. **sed/PowerShell edits desync the Edit tool's file state.** If you modify a file via
   shell (`sed -i`, `Set-Content`, formatters), the Edit tool's snapshot is stale and the
   next `Edit` can fail or mis-match. Prefer the Edit/Write tools; after any shell
   mutation, Read the file again before editing.
5. **LF/CRLF warnings are fine.** Git on this Windows box prints
   `warning: LF will be replaced by CRLF …` — it is noise, not an error. Don't "fix" line
   endings across the repo; don't treat the warning as a failed commit.
6. **The 12-function trap.** Adding a 13th file under `api/` doesn't error loudly — it
   fails **every subsequent deploy silently** while production serves the old build.
   That's why deploy verification is hash-comparison, not vibes (§2.5), and why AI
   endpoints are `?action=` branches, not files (§7).
7. **Two truths on screen.** Historical bug class: one card showing the diagnostic
   probability while another showed the live estimate. Commit `c4d6c28` ("one number,
   one truth") fixed this by routing everything through `passProbability()`. Any new
   surface that displays readiness must use the same single read (§3.1).
8. **Buttons that land on pickers.** Same audit found "Start now" buttons dropping users
   on mode-selection screens. Every action button deep-links via `/study?do=…` (§3.3).
9. **Changing EN copy without moving the RU key.** `t("exact EN string")` — edit the
   English and the translation silently vanishes (falls back to EN). Update
   `translations.ts` keys in the same commit as any landing copy change (§5).
10. **Don't wake the legacy code.** `vocab.ts`, `scholify-data.ts`, and parts of
    `community-storage.ts` predate the ACCA pivot. They compile and some are still
    imported, but new features must not build on them — they're queued for pruning.

---

*v1.0 — 2026-07-08. Verified against `origin/main` @ `8c52a8a`. Update this guide in the
same commit when you change any law it states.*
