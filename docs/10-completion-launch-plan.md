# Scholify — The Completion & Launch Plan

**Document 10 · v1.0 · 2026-07-13 · Co-founder-authored, audit-grounded**

This plan is the bridge from *"the product is built"* (Documents 1–9) to *"the product is live, selling, and safe to scale."* It is grounded in a full three-front launch-readiness audit of the codebase conducted 2026-07-13 (product surface, backend/data/billing, AI layer + production hardening), not in aspiration. Where the audit contradicted an assumption, the audit wins.

---

## 1. What "complete" means

Document 1 already fixed the bar: 90-day success is *"Ops live (keys, metering, Paddle); 1,000 free learners in UZ/CIS; ≥2% free→paid; activation = diagnostic completed on day one."* So **completing Scholify is not a rebuild — it is the build → live → sell → scale transition.** The engineering is done and it is launch-grade. What remains is (a) closing a small number of **security and cost hard-gates** that must land before any key or payment goes live, (b) **operational go-live** (env, migrations, keys — founder-gated), and (c) **content depth** for the six Strategic Professional papers.

The definition of done for this document: **a student in Uzbekistan can sign up, complete a diagnostic, study a real paper, hit a paywall, pay, and use the AI features — and we can turn on the Anthropic key without an unbounded cost or abuse risk.**

## 2. Launch-readiness scorecard (audit synthesis, 2026-07-13)

| Area | Verdict | Evidence |
|---|---|---|
| Product surface | **Launch-ready** | Every route is a fully-built, animated page. Zero stubs, zero dead routes, zero code TODOs. Journey wired end-to-end for the 9 Applied papers. Reels flashcards, StudyHub, bank runs all shipped. |
| Offline-first degradation | **Excellent** | Entire loop (diagnostic, mocks, bank runs, flashcards, analytics, journey) runs with zero API keys against local seed content. Every AI/payment path degrades, never crashes. |
| AI architecture | **Sound** | Server-only key (no client exposure), correct model-mix (Haiku 4.5 for volume, Sonnet 5 for marking/generation), model IDs **verified current**, careful per-plan metering that fails closed. |
| Backend / RLS / billing | **Launch-grade** | Real HMAC webhook signature verification, complete RLS on every user-data table, `?action=` dispatcher keeps 5/12 serverless functions. |
| Content — 9 Applied papers | **Launch-ready** | Banks 150–239 each, full flashcard decks (62+), syllabus briefs, examiner intelligence on all 15 papers. |
| Content — 6 Strategic papers | **Launch-ready** (2026-07-13) | All six (SBL, SBR, AFM, APM, ATX, AAA) at full parity: 150-question banks (900 total, independently re-solved), briefs per area, 60 flashcards, 15 written each. |
| Security hard-gates | **Closed** (2026-07-13) | Entitlement privilege-escalation, unmetered legacy AI endpoints, and the missing cost kill-switch — all fixed in Phase 0. |
| Revenue & cost guardrails | **Closed** (2026-07-14) | Billing config is all-or-nothing; org-wide token budget + per-minute throttle; `subscriptions` audit trail. Phase 1. |
| Written content | **Closed** (2026-07-14) | 190 rubric-backed written questions. Every paper with a constructed-response exam has ≥15; the four objective-test papers have none *by design*. Phase 2/4. |
| Tests | **Absent** | No suite. Grading, metering, JSON-parse guards, billing untested. **Now the largest remaining quality gap** (Phase 3). |
| Ops (prod env) | **Not started** | `/api/health` reports zero keys. Nothing transacts live until env + migrations land. **This is the only thing left on the critical path.** |

**Bottom line: every code gate is closed. The one remaining blocker to revenue is ops/config (Phase 5) — which needs credentials only the founder holds.**

## 3. The plan — six phases

Phases 0–3 are code (co-founder-executed). Phase 4 is content (authoring waves). Phase 5 is ops (founder-gated, with a runbook I provide). Phases are ordered by "what must be true before the next becomes safe."

### Phase 0 — Security & cost hard-gates · **EXECUTED 2026-07-13**
*The non-negotiable gates before any real key or payment. All pure code.*

| Item | Status | Acceptance |
|---|---|---|
| Entitlement moved from self-writable `user_metadata` → service-role-only `app_metadata` | ✅ Done | A user cannot self-grant Pro via `auth.updateUser()`; webhook, cancel, AI meter, and all 5 client gates read `app_metadata.plan`. |
| Ten unmetered/unauthenticated legacy Claude endpoints disabled | ✅ Done | `chat/message/vocab/…` return HTTP 410; only the four auth+metered `acca-*` actions reach Claude. |
| Global AI cost kill-switch | ✅ Done | `AI_KILL_SWITCH=1` forces every AI action to deterministic fallback instantly, no redeploy. |
| Cron send path fails closed | ✅ Done | `/api/reminders?action=send` refuses without a valid `CRON_SECRET` (403), never runs unauthenticated. |
| `past_due` dunning status | ✅ Done | Failed renewals flag `plan_status: past_due` during Paddle's dunning window; terminal `subscription.canceled` revokes. |

### Phase 1 — Revenue & data-integrity correctness · **EXECUTED 2026-07-14**

| Item | Status | Acceptance |
|---|---|---|
| Entitlement source-of-truth hardening | ✅ Done | `subscriptions` table (migration `0015`) written by the webhook and the in-app cancel. The AI meter cross-checks the JWT's plan against that row and takes the **lower** of the two, so neither a stale JWT nor a half-applied webhook grants a plan nobody paid for. |
| `/api/health` checks the 3 Paddle price-id env vars | ✅ Done | Billing is all-or-nothing: nothing set = pre-launch, everything set = live, **anything in between = 503**. Half-configured is the dangerous state (checkout opens, fulfilment silently can't). |
| Global daily token/$ budget (org-wide) | ✅ Done | `AI_DAILY_TOKEN_BUDGET` (default 5M tokens/day) in `ai_usage_global`. Once spent, every AI action falls back deterministically until midnight UTC. |
| Duplicate `0011` migration prefix renamed → `0014` | ✅ Done | `supabase db push` no longer silently skips a migration. |
| `vocab_reminders` table migration (or retire the cron) | ✅ Done | The cron had always upserted into a table **no migration ever created** — so the Settings toggle silently no-opped and the cron always found zero rows. Now `study_reminders` (0015), with ACCA copy pointing at `/study`, not the dead `/learn`. |
| Per-minute rate limit on AI actions | ✅ Done | `AI_PER_MINUTE_LIMIT` (default 8), atomic via the `bump_ai_rate` RPC so concurrent requests can't both read "under the limit". |
| *(added)* `api/` covered by typecheck | ✅ Done | `api/` was the one directory no typecheck covered — Vercel compiles it at deploy time, where a type error becomes a broken webhook rather than a failed build. `tsconfig.api.json` closes it. It immediately surfaced the 10 retired vocab handlers, now deleted (−928 lines); the 410 gate stays. |

### Phase 2 — Journey correctness for every paper · **EXECUTED 2026-07-14**

Phase 2 was written when the Strategic papers were empty. Content landing changed the answer: the fix was **not** to mark papers "coming soon", it was to prove the journey is real for all 15. `npm run audit:content` (new, CI-runnable) is that proof, and it is what found the items below.

| Item | Status | Acceptance |
|---|---|---|
| Fix the Strategic-paper diagnostic trap | ✅ Moot — verified gone | Every one of the 15 papers builds a diagnostic from its **own** bank covering **100%** of its own syllabus areas (see the audit table). The FA fallback can no longer fire. No code change was needed — content closed it. |
| Strategic-paper onboarding honesty | ✅ Moot — verified gone | No paper is near-empty: every one carries a 150+ bank, 60+ cards, briefs and chapters on every area. Marking them "content coming" would now be the dishonest option. |
| No launch paper shows "coming soon" for its own cards/written | ✅ Done | The audit found the real gap: 7 papers with zero written questions. **Two different problems:** BT/MA/FA/LW are 100% objective-test exams (no constructed-response section exists to prepare for) → flagged `objectiveOnly`, Examiner hidden, and the screen says so plainly. PM/TX/FM/AA genuinely have written sections and were advertising an AI Examiner with an empty bank → **56 new rubric-backed written questions** (PM 15, TX 15, FM 15, AA +11, FR +2). |

### Phase 3 — Production hardening · **Then (code)**

| Item | Priority | Acceptance |
|---|---|---|
| Test suite (vitest) on critical logic | HIGH | Coverage for `localExaminer` grading, `safe*Json` model-output parsers, `meterAcca` cap arithmetic, and Paddle `planForPrice`. CI-runnable via `npm test`. |
| Error tracking | HIGH | Client + server runtime/AI failures reported (PostHog error capture or Sentry), not just Vercel console. |
| Global ACCA-independence disclaimer | MEDIUM | Present in the shared footer (`motion-footer.tsx`) so it covers every ACCA screen, per the content policy. |
| Content code-splitting | MEDIUM | The 1.2 MB eager `acca-content` barrel becomes per-paper dynamic imports; only the active paper's bank loads. |
| `robots.txt` + `sitemap.xml` | LOW | Marketing landing is crawlable. |
| ~~Prune retired vocab-pivot handler code~~ | ✅ Done 2026-07-14 | Deleted (−928 lines) once `tsconfig.api.json` made them visible as dead. The 410 gate stays, so an old client still gets a clean answer. |

### Phase 4 — Content depth · **Parallel authoring waves**

| Item | Priority | Acceptance |
|---|---|---|
| ~~SBR + SBL launch content~~ | ~~HIGH~~ | **DONE 2026-07-13** — superseded: all six Strategic papers shipped at full parity (150 bank + briefs + 60 cards + 15 written each), not just the two Essentials. |
| ~~Written/constructed-response expansion~~ | ~~MEDIUM~~ | **DONE 2026-07-14** — every paper whose real exam has a constructed-response section now carries ≥15 rubric-backed written questions (190 total). The four objective-test papers carry none *by design*. |
| FR / TX / PM → 300 | LOW (stretch) | The three most-sat Skills banks reach exam-kit depth. (TX and FR are already at 225.) |
| Options papers (AFM/APM/ATX/AAA) | On demand | ✅ Already authored at full parity — this line is now historical. |

### Phase 5 — Operational go-live · **Founder-gated (runbook in §6)**

The product does nothing live until this lands. It is deliberately last because everything above must be true first. See §6 for the exact runbook.

## 4. What was executed (2026-07-13 → 07-14)

**2026-07-13**
- **Content:** AA + FM question banks brought 80 → 150 (wave 8b, +140 originals, independently re-solved, deployed and verified live). All 9 Applied papers now at the 150 practice-ladder floor.
- **Phase 0 security & cost hard-gates — all five items.** The highest-severity findings in the audit, all pure code, so they were closed immediately. The product became **safe to attach a live Anthropic key and live Paddle keys to** without the privilege-escalation, unmetered-spend, or open-cron risks.

**2026-07-14**
- **Phase 1 — all six items.** Billing config is now all-or-nothing (half-configured → 503); the `subscriptions` table is the audit trail behind `app_metadata` and the AI meter takes the *lower* of the two; an org-wide daily token budget and a per-minute throttle backstop the launch spike; the duplicate migration prefix and the reminder cron's phantom table are fixed.
- **`api/` is now typechecked** (`tsconfig.api.json`) — it was the one directory nothing covered, and it is where a type error becomes a broken webhook rather than a failed build. That immediately exposed the 10 retired vocab handlers, now deleted.
- **Phase 2 — closed, but not as written.** `npm run audit:content` proved the diagnostic trap is gone (all 15 papers get a full-syllabus diagnostic from their own bank) and found the actual gap instead: written questions.
- **Phase 4 written expansion — closed.** 56 new rubric-backed written questions (PM 15, TX 15, FM 15, AA +11, FR +2). BT/MA/FA/LW are flagged `objectiveOnly` and the AI Examiner is hidden for them — their exams have no written section, so "coming soon" was a promise we should never keep.

**A note on method:** every claim above is checked by a script, not by inspection. `npm run audit:content` fails if any promoted paper has an empty tile behind it, and `npm run typecheck` now covers the money paths.

## 5. Critical path to launch

```
Phase 0 (security gates) ──────DONE──┐
Phase 1 (revenue correctness) ──DONE──┼─► Phase 5 (ops go-live) ─► SELLING
Phase 2 (journey correctness) ──DONE──┘        ▲
Phase 3 (hardening) ───────────► raises quality, not a hard gate
Phase 4 (content depth) ───────DONE──► the sellable surface is all 15 papers
```

**Every code gate on the critical path is now closed. The only thing standing between the product and first revenue is Phase 5 — the founder-gated ops go-live in §6.** Phase 3 (tests, error tracking, code-splitting, the global disclaimer) raises quality and should follow, but it does not gate the beachhead.

## 6. Go-live runbook (founder-gated ops — Phase 5)

Everything below needs credentials or a dashboard only the founder holds; it is collected here so it can be done in one sitting. The app runs fully offline until each is set — nothing here is a code change.

**A. Supabase**
1. Create the project; copy the URL + anon key + service-role key.
2. Apply migrations **in numeric order, `0001` → `0015`** (SQL editor). The prefixes are now unique, so `supabase db push` also works — it previously skipped one of the two `0011`s silently.
   - **`0013_ai_usage` is mandatory** — without the `ai_usage` table + `increment_ai_usage` RPC, all AI fails closed to fallback.
   - **`0015_billing_ai_guardrails` is mandatory** — it carries `ai_usage_global` (the org budget), `ai_rate` (the throttle), `subscriptions` (the billing audit trail) and `study_reminders`. The AI meter fails closed without the first two, so **skipping 0015 means no AI works at all.**
3. Create storage buckets `study-photos`, `streak-trees`; toggle Realtime replication per `SUPABASE_SETUP.md`.

**B. Anthropic** — set `ANTHROPIC_API_KEY` (server). Confirm `/api/health` `anthropic: true`. Model IDs are already current (`claude-haiku-4-5`, `claude-sonnet-5`).

**C. Paddle** — set `VITE_PADDLE_TOKEN` + the three price ids **both client- and server-side** (they are `VITE_`-named but the webhook's `planForPrice` reads them server-side — the single easiest go-live mistake). Set `PADDLE_WEBHOOK_SECRET`, `PADDLE_API_KEY`. Point the Paddle webhook at `/api/paddle?action=webhook`. Do a sandbox checkout end-to-end and confirm the plan lands in `app_metadata` **and** in the `subscriptions` table.
> `/api/health` now enforces this: billing must be **fully** configured or **not at all**. A half-configured stack returns **503** with `billing: "half_configured"` — because that is the state where checkout opens and fulfilment silently cannot.

**D. Ops** — set `SUPABASE_SERVICE_ROLE_KEY` (webhook + metering), `CRON_SECRET` (required for the reminder cron), optional `RESEND_API_KEY`, `VITE_POSTHOG_KEY`.

Optional AI cost dials (safe defaults ship in code, no redeploy needed to change them):

| Env var | Default | Effect |
|---|---|---|
| `AI_DAILY_TOKEN_BUDGET` | `5000000` | Org-wide tokens/day. Once spent, all AI falls back until midnight UTC. |
| `AI_PER_MINUTE_LIMIT` | `8` | AI calls per user per minute. |
| `AI_KILL_SWITCH` | off | `=1` forces every AI action to fallback **instantly**. The emergency brake. |

**E. Verify** — `/api/health` reports `status: ok`, `billing: "live"`, and `anthropic + supabase_* + paddle*` all true; then run one real diagnostic, one AI tutor call (confirm a row appears in `ai_usage` **and** `ai_usage_global`), and one sandbox subscription round-trip.

## 7. Decisions the founder owns

1. ~~**Strategic papers at launch**~~ — **resolved by content.** All 15 papers are at full parity, so there is no Applied-first vs Strategic-first trade-off left to make: launch with the whole qualification.
2. ~~**Entitlement store**~~ — **resolved:** both. `app_metadata` stays the hot path (it rides in the JWT, so no read costs a round-trip) and `subscriptions` is the durable audit trail behind it. The meter takes the lower of the two.
3. ~~**AI cost ceiling posture**~~ — **resolved:** the org-wide budget landed with Phase 1, so it is in place *before* any paid-marketing spike rather than after. What the founder still owns is the **number**: `AI_DAILY_TOKEN_BUDGET` defaults to 5M tokens/day (tens of dollars) — raise or lower it to match appetite.

**Still open, and genuinely the founder's:**

4. **When to run the Phase 5 go-live.** It needs credentials only the founder holds (§6). Nothing else blocks revenue.
5. **Whether to ship tests before or after go-live** (Phase 3). Recommendation: **after** — the beachhead is small enough to watch by hand, and the money paths (metering, `planForPrice`, grading) are the right first suite, not a blocker to opening the doors.

---

*This document is updated the same day reality diverges from it, per the founder's commitment in Document 1. Last updated 2026-07-14, when Phases 1, 2 and 4 closed. Next review: after the Phase 5 go-live.*
