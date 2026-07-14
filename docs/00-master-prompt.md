# Scholify — The Master Prompt

**Document 0 · v1.0 · 2026-07-14 · Founder-authored**

This is the one document that briefs anyone — a new engineer, a new AI session, an investor's analyst, a contractor — on the *entire* Scholify project in a single read. Every claim in it is grounded in the repository as it exists today (`fde25d9`), not in aspiration. When this document and the code disagree, the code wins and this document gets fixed the same day.

If you are an AI assistant being handed this prompt: **read it fully, then act as Scholify's co-founder-level engineer.** The rules in §9 (how we work) and §10 (design law) are not suggestions.

---

## 1. What Scholify is

**Scholify is an AI-powered ACCA exam-preparation platform — a "pass-probability learning OS."**

The one-sentence pitch: *instead of handing a student 2,000 questions and a video course, Scholify tells them "based on this diagnostic you have a 68% chance of passing FM — and here is exactly how we get you to 85%," then walks them there.*

- **Brand:** Scholify (scholifyapp.com). The AI persona is **Lara** — tutor, examiner, coach.
- **Market:** ACCA candidates, beachhead in Uzbekistan/CIS (first-timers and retakers), modelled on what Makon AI did for local exam prep and ielts.gg did for IELTS.
- **Scope:** the **full ACCA qualification** — all 15 papers across Applied Knowledge (BT, MA, FA), Applied Skills (LW, PM, TX, FR, AA, FM), and Strategic Professional (SBL, SBR + Options AFM, APM, ATX, AAA).
- **90-day success definition (Doc 1):** ops live (keys, metering, Paddle); 1,000 free learners in UZ/CIS; ≥2% free→paid; activation = diagnostic completed on day one.
- **Independence:** Scholify is not affiliated with ACCA. All content is original, syllabus-aligned, and never reproduces ACCA/Kaplan/BPP material. ACCA's official exam language is English, so **the app is English-only by design**; only the marketing landing is bilingual (EN/RU).

## 2. The product loop (what a student experiences)

1. **Onboard** (`/welcome`): pick your paper, state your exam date and experience level, set a target score.
2. **Diagnose** (`/study/diagnostic`): a timed, ~15–25-question diagnostic stratified across *every* syllabus area of *your* paper (one easy/medium/hard ladder per area, 100 s per question). Output: an estimated exam score, a **pass probability** with an honest ± margin, per-area weak/moderate/strong bands, and a counterfactual target ("lift your two weakest areas to 70% → 85% pass probability").
3. **Study** (`/study`, the Study Hub): per-paper journey through phases — **Learn** (rich Kaplan-depth study chapters with 12 diagram types, worked-example steppers, mini-checks; topic briefs per area), **Practice** (curated bank sessions, adaptive sessions, spaced flashcards), **Strengthen** (weak-area drills, custom AI-generated questions from your own notes), **Rehearse** (bank runs — the whole paper under the clock — then a mock gate: mocks unlock at 75% readiness), **Exam room** (timed mocks with multiple forms, AI Examiner for written papers), **Post-mortem** (AI analysis of a failed mock or real exam → new plan).
4. **Track** (`/study/analytics` + `/dashboard`): live pass probability recomputed from cumulative practice with the *same model* as the diagnostic, per-area accuracy, streaks, daily goals, official ACCA pass-rate context and recurring examiner-report themes per paper.
5. **Pay** (`/pricing` + in-app paywall): free tier is genuinely useful; Pro unlocks mocks, AI Examiner, custom generation, higher AI caps.

**Lara is stateful.** The tutor receives a learner-profile summary (latest diagnostic, weakest areas, recent practice accuracy, experience level) with every call, so explanations are pitched at the actual student.

**Everything degrades gracefully.** With zero API keys the entire loop — diagnostic, study, practice, flashcards, bank runs, mocks, analytics, journey — runs against local seed content and deterministic fallbacks. No AI/payment path ever hard-crashes the app.

## 3. The content moat (all original, all shipped)

| Metric | Number |
|---|---|
| Papers at full parity | **15 / 15** |
| Curated bank questions | **2,418** (150–225 per paper; every question difficulty-tagged, area-tagged, explained) |
| Flashcards | **929** (60–66 per paper, spaced repetition) |
| Written (constructed-response) questions with marking rubrics | **190** — ≥15 on every paper whose real exam has a written section |
| Topic briefs | every syllabus area, all papers |
| Rich study chapters | every syllabus area, all papers (12 diagram types, worked-example steppers, mini-checks, exam traps, key terms) |
| Examiner intelligence | official pass-rate history + recurring examiner themes, all 15 papers |

Two honesty rules encoded in the product:
- **BT, MA, FA, LW are 100% objective-test exams.** They carry *zero* written questions **by design** and the AI Examiner is hidden for them (flag: `objectiveOnly`). We never promise marking their exam will never ask for.
- `npm run audit:content` is the enforcement: it fails if any promoted paper has an empty tile behind it (bank < 150, cards < 40, written < 15 where the exam has a written section, or a diagnostic that misses any syllabus area).

## 4. Business model

- **Pricing (live copy since 2026-07-08):** Beginner **$9.99/mo**, Pro **$14.99/mo**, Annual Pro **$119.99/yr** (~33% off). Positioning: a fraction of the $300–800+ per-paper cost of CIS tuition centres.
- **Billing:** Paddle (merchant of record — handles global tax/compliance). Checkout carries the Supabase `userId` in `custom_data`; a signed webhook grants the plan.
- **AI unit economics:** model mix is **Haiku 4.5** for volume, **Sonnet 5** for marking/generation/tutoring. Per-plan daily caps (free: 5 tutor + 10 post-mortem; beginner: 25 tutor; pro: 100 tutor + 10 generate + 20 examiner), an org-wide daily token budget, and a per-minute throttle — see §7.
- **Growth surface (built):** referrals, streaks + streak trees, study partners/rooms/teams, community challenges, leaderboards, daily email reminders — all shipped, all optional.

## 5. Tech stack

| Layer | Choice |
|---|---|
| Frontend | Vite + React 18 + TypeScript (strict), `motion` (framer-motion successor) for all animation, Tailwind 4 |
| Backend | Vercel serverless (**Hobby plan → hard 12-function cap**; we use 5 files with `?action=` dispatchers) |
| Data/Auth | Supabase (Postgres + Auth + Storage + Realtime), RLS on every user-data table, migrations `0001`–`0015` |
| AI | Anthropic API, server-side only (`claude-haiku-4-5`, `claude-sonnet-5`) |
| Payments | Paddle Billing (HMAC-verified webhook) |
| Analytics | PostHog |
| Email | Resend (daily reminder cron) |
| Hosting | Vercel, deploy on push to `main` |

**The five serverless functions** (`api/`): `lara.ts` (all AI: acca-tutor / acca-generate / acca-examiner / acca-postmortem — every action authenticated + metered), `paddle.ts` (webhook + cancel), `social.ts` (invites, leaderboard, health, security), `reminders.ts` (preference sync + cron send), `calendar-callback.ts`. `/api/health` and `/api/security-check` are vercel.json rewrites into `social.ts`.

**Storage philosophy: localStorage-first, cloud-synced.** The learning engine works fully offline; Supabase sync layers on top (`acca-cloud.ts`) and is the durable learning-data moat.

## 6. The pass-probability model (the differentiator, stated honestly)

Not a black box. Per area: difficulty-weighted accuracy (hard correct counts 1.3×, easy 0.8×) → Bayesian shrinkage toward the 0.5 pass line (α = 1.5, so a lucky 1/1 never reads as mastery) → coverage-confidence regression (a diagnostic that touched half the syllabus pulls the estimate toward neutral) → logistic map centred on ACCA's 50% pass mark → a counterfactual projection ("weakest two areas → 70%"). A binomial ± margin is always shown. The *same* model scores the formal diagnostic and live practice, so the number moves as the student drills.

## 7. Security & cost posture (all shipped, all verified)

These are the guardrails that make it safe to attach a live Anthropic key and live Paddle keys:

1. **Entitlement lives in `app_metadata`** (service-role-only) — a user cannot self-grant Pro. It is cross-checked against a `subscriptions` audit table and the meter takes the **lower** of the two.
2. **Every AI action is authenticated and metered**, and metering **fails closed**: missing table, missing config, or any error → deterministic fallback, never unmetered spend, never a hard error the app must special-case.
3. **Org-wide daily token budget** (`AI_DAILY_TOKEN_BUDGET`, default 5M/day) — bounds what a launch spike costs the company, not just what one abuser costs.
4. **Per-minute throttle** (`AI_PER_MINUTE_LIMIT`, default 8), atomic via RPC.
5. **Kill switch:** `AI_KILL_SWITCH=1` forces all AI to fallback instantly, no redeploy.
6. **Ten legacy vocab-era endpoints return HTTP 410**; their handler code is deleted. The four `acca-*` actions are the only path to Claude.
7. **Paddle webhook verifies the HMAC signature** over the raw body; `past_due` dunning is honoured; terminal cancellation revokes.
8. **The reminder cron refuses without `CRON_SECRET`** (fails closed).
9. **Billing config is all-or-nothing:** `/api/health` returns 503 on a half-configured Paddle stack — the state where checkout opens but fulfilment silently can't.
10. **`npm run typecheck` covers `api/` too** (`tsconfig.api.json`) — a type error in the money paths fails the build instead of breaking a webhook in production.

## 8. Current status & what remains (mirrors Doc 10)

**Every code gate on the critical path to revenue is closed** (Phases 0, 1, 2, 4 — shipped 2026-07-13/14).

Remaining:
- **Phase 5 — ops go-live. The ONLY thing blocking revenue.** Founder-gated (credentials): Supabase project + migrations `0001`–`0015` (**`0013` and `0015` are mandatory** — the AI meter fails closed without them), `ANTHROPIC_API_KEY`, Paddle token + 3 price ids (client **and** server) + webhook secret + API key, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`. Full runbook: Doc 10 §6. Verify with `/api/health` → `status: ok`, `billing: "live"`.
- **Phase 3 — hardening (quality, not a gate):** vitest suite on the money logic (grading, `safe*Json` parsers, metering arithmetic, `planForPrice`), error tracking (Sentry/PostHog), global ACCA-independence disclaimer in the shared footer, code-splitting the ~2.5 MB study bundle into per-paper dynamic imports, robots.txt + sitemap.
- **Stretch content:** FR/TX/PM banks → 300 (TX and FR already at 225).

## 9. How we work (non-negotiable conventions)

1. **Remote is authoritative.** Always `git fetch && git reset --hard origin/main` before editing. Local can be stale.
2. **Work only in `Desktop\Scholify\scholify-web`.** A stale duplicate exists at `Desktop\scholify-web` — ignore it.
3. **Ship = push.** Push to GitHub → verify on the Vercel deploy. No localhost demos.
4. **Never interrupt build work to ask for keys/tokens/manual steps.** Collect founder asks for the end of a session; the product runs fully offline without them.
5. **12-function Vercel cap.** Never add an `api/` file when an `?action=` on an existing dispatcher will do. Exceeding the cap fails every deploy *silently*.
6. **Windows quirk:** PowerShell blocks `npm.ps1` on this machine — run npm through `cmd.exe //c "npm …"` from Bash.
7. **Verify with scripts, not eyeballs:** `npm run typecheck` (app + api), `npm run audit:content` (per-paper launch floor), `npm run validate:chapters` (study-chapter shape). The build runs typecheck, so type errors cannot reach production.
8. **Docs stay true.** `docs/01`–`10` are the company's brain (vision, PRD, design bible, AI architecture, backend, engineering playbook, GTM, investor plan, content program, launch plan). Update the affected doc the same day code diverges from it.
9. **Content law:** every question original and independently re-solved; area- and difficulty-tagged; explained. No ACCA/Kaplan/BPP IP, ever. Paper names stay in English everywhere.
10. **Plans age.** Before executing a plan item written against an older codebase, re-verify the premise (Phase 2 here prescribed fixing a diagnostic trap that content had already eliminated — the audit found the *real* gap instead).

## 10. Design law (the app must feel like one product)

- **Light theme, warm paper background. ACCA brand palette:** red `#C80000`, magenta, amber. Landing design is pinned — don't redesign it.
- **All app UI builds from `src/components/acca/ui.tsx`** (Icon, Card, Button, C/SP/R tokens). **All charts/gauges/bars from `acca/charts.tsx`** (StatCard, RingGauge, MeterBar, BreakdownList, TrendBars). Never hand-roll a widget that exists there.
- **No emoji as icons.** Ever.
- **Every UI change ships with motion.** Entrance/exit animation via `motion/react` and polish are part of "done", not garnish.
- **Honest UI beats aspirational UI.** No "coming soon" for things that will never come; no metrics without their uncertainty; no promises the paper's real exam contradicts.

## 11. Glossary (internal shorthand)

| Term | Meaning |
|---|---|
| **Lara** | The AI persona (tutor, examiner, coach) |
| **Paper** | One ACCA exam (FA, PM, SBL, …) |
| **Area** | A syllabus area within a paper (A–H); every question/brief/chapter is area-tagged |
| **Bank run** | Timed pass through the whole paper's bank — the bridge from practice to the mock gate |
| **Mock gate** | Mocks unlock at 75% readiness (pass probability) |
| **The journey** | The per-paper phase loop: Learn → Practice → Strengthen → Rehearse → Exam → Post-mortem |
| **Fails closed** | On any error/missing config, deny and fall back — never spend, never crash |
| **The audit** | `npm run audit:content` — the launch-floor proof per paper |
| **Doc N** | `docs/0N-*.md` — the numbered company documents; Doc 10 is the launch plan |

---

*If you update the product, update this prompt. It is only useful while it is true.*
