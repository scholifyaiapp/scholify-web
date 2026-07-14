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
| Security hard-gates | **3 critical, fixable in code** | Entitlement privilege-escalation; unmetered legacy AI endpoints; no cost kill-switch. (All addressed in Phase 0 — see §4.) |
| Tests | **Absent** | No suite. Grading, metering, JSON-parse guards, billing untested. |
| Ops (prod env) | **Not started** | `/api/health` reports zero keys. Nothing transacts live until env + migrations land. |

**Bottom line: the blockers are security hard-gates, config/ops, and Strategic-paper content — not engineering quality.**

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

### Phase 2 — Journey correctness for every paper · **Next (code)**

| Item | Priority | Acceptance |
|---|---|---|
| Fix the Strategic-paper diagnostic trap | HIGH | An SBL/SBR student is never silently given an FA diagnostic. Either the diagnostic supports their paper or the UI states "diagnostic available once content lands." (`AccaDiagnostic.tsx:172`) |
| Strategic-paper onboarding honesty | HIGH | The paper picker marks SBL/SBR/AFM/APM/ATX/AAA "content coming" so no student onboards into a near-empty experience. (`Welcome.tsx` PaperSlide) |
| No launch paper shows "coming soon" for its own cards/written | MEDIUM | Every promoted paper has non-zero flashcards and (if the feature is advertised for it) written questions. |

### Phase 3 — Production hardening · **Then (code)**

| Item | Priority | Acceptance |
|---|---|---|
| Test suite (vitest) on critical logic | HIGH | Coverage for `localExaminer` grading, `safe*Json` model-output parsers, `meterAcca` cap arithmetic, and Paddle `planForPrice`. CI-runnable via `npm test`. |
| Error tracking | HIGH | Client + server runtime/AI failures reported (PostHog error capture or Sentry), not just Vercel console. |
| Global ACCA-independence disclaimer | MEDIUM | Present in the shared footer (`motion-footer.tsx`) so it covers every ACCA screen, per the content policy. |
| Content code-splitting | MEDIUM | The 1.2 MB eager `acca-content` barrel becomes per-paper dynamic imports; only the active paper's bank loads. |
| `robots.txt` + `sitemap.xml` | LOW | Marketing landing is crawlable. |
| Prune retired vocab-pivot handler code | LOW | Dead handlers removed after the 410 gate proves stable; shrinks the endpoint surface. |

### Phase 4 — Content depth · **Parallel authoring waves**

| Item | Priority | Acceptance |
|---|---|---|
| ~~SBR + SBL launch content~~ | ~~HIGH~~ | **DONE 2026-07-13** — superseded: all six Strategic papers shipped at full parity (150 bank + briefs + 60 cards + 15 written each), not just the two Essentials. |
| Written/constructed-response expansion | MEDIUM | Every Strategic paper now has a 15-question rubric-backed written set; still thin on some Applied papers (only AA/FR beyond Strategic). |
| FR / TX / PM → 300 | LOW (stretch) | The three most-sat Skills banks reach exam-kit depth. |
| Options papers (AFM/APM/ATX/AAA) | On demand | Authored when student demand appears (ATX/AAA first for the UZ market), per Doc 9. |

### Phase 5 — Operational go-live · **Founder-gated (runbook in §6)**

The product does nothing live until this lands. It is deliberately last because everything above must be true first. See §6 for the exact runbook.

## 4. What was executed this session (2026-07-13)

- **Content:** AA + FM question banks brought 80 → 150 (wave 8b, +140 originals, independently re-solved, deployed and verified live). All 9 Applied papers now at the 150 practice-ladder floor.
- **Phase 0 security & cost hard-gates — all five items above.** These were the highest-severity findings in the audit and every one is pure code, so they were closed immediately. The product is now **safe to attach a live Anthropic key and live Paddle keys to** without the privilege-escalation, unmetered-spend, or open-cron risks.

## 5. Critical path to launch

```
Phase 0 (security gates) ──DONE──┐
                                 ├─► Phase 5 (ops go-live) ─► SELLING
Phase 1 (revenue correctness) ───┤        ▲
Phase 2 (journey correctness) ───┘        │
Phase 3 (hardening) ───────────► raises quality, not a hard gate
Phase 4 (Strategic content) ───► widens the sellable surface (parallel)
```

The shortest safe path to first revenue is **Phase 0 (done) → Phase 1 items HIGH → Phase 2 HIGH → Phase 5**. Phases 3 and 4 raise quality and widen the market but do not gate a Knowledge/Skills-first beachhead launch.

## 6. Go-live runbook (founder-gated ops — Phase 5)

Everything below needs credentials or a dashboard only the founder holds; it is collected here so it can be done in one sitting. The app runs fully offline until each is set — nothing here is a code change.

**A. Supabase**
1. Create the project; copy the URL + anon key + service-role key.
2. Apply migrations in order (SQL editor): `0001`–`0010`, `0011_acca_diagnostics`, `0011_retention` (→ rename to `0014` after Phase 1), `0012_acca_progress`, `0013_ai_usage`. **`0013` is mandatory** — without the `ai_usage` table + `increment_ai_usage` RPC, all AI silently fails closed to fallback.
3. Create storage buckets `study-photos`, `streak-trees`; toggle Realtime replication per `SUPABASE_SETUP.md`.

**B. Anthropic** — set `ANTHROPIC_API_KEY` (server). Confirm `/api/health` `anthropic: true`. Model IDs are already current (`claude-haiku-4-5`, `claude-sonnet-5`).

**C. Paddle** — set `VITE_PADDLE_TOKEN` + the three price ids **both client- and server-side** (they are `VITE_`-named but the webhook's `planForPrice` reads them server-side — the single easiest go-live mistake). Set `PADDLE_WEBHOOK_SECRET`, `PADDLE_API_KEY`. Point the Paddle webhook at `/api/paddle?action=webhook`. Do a sandbox checkout end-to-end and confirm the plan lands in `app_metadata`.

**D. Ops** — set `SUPABASE_SERVICE_ROLE_KEY` (webhook + metering), `CRON_SECRET` (now required for the reminder cron), optional `RESEND_API_KEY`, `VITE_POSTHOG_KEY`.

**E. Verify** — `/api/health` reports `status: ok` with `anthropic + supabase_* + paddle` all true; run one real diagnostic, one AI tutor call (metered), one sandbox subscription round-trip.

## 7. Decisions the founder owns

1. **Strategic papers at launch:** ship SBR/SBL seed content now (Phase 4 HIGH), or launch Knowledge/Skills-only and mark Strategic "coming soon" (Phase 2)? Recommendation: **launch Applied-first, author SBR/SBL in parallel** — the beachhead (first-timers, retakers) starts on Applied papers.
2. **Entitlement store:** `app_metadata` alone (done, sufficient) vs a dedicated `subscriptions` table (Phase 1, adds audit trail). Recommendation: ship on `app_metadata`, add the table before scaling.
3. **AI cost ceiling posture:** per-user caps (done) are enough for a controlled beachhead; the org-wide token budget (Phase 1) matters more as free-tier volume grows. Recommendation: land it before any paid-marketing spike.

---

*This document is updated the same day reality diverges from it, per the founder's commitment in Document 1. Next review: after Phase 1–2 land.*
