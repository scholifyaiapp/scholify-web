# Scholify — The Pre-Announcement Audit & Launch Plan

**Document 11 · v1.0 · 2026-07-14 · Audit-grounded, founder-authored**

Document 10 said every code gate to revenue was closed. This document is what happened when we tried to prove it: a five-front adversarial audit (security & billing, learning engine, product surface, content integrity, launch readiness), run against the live code and the live site, with every finding verified before it was believed.

**The audit's verdict, in one line: the code was in far better shape than the packaging and the plumbing.** The content is excellent, the math holds up, the architecture is sound — and the product was simultaneously advertising a trial that didn't exist, minting fake accounts on a public website, and running an open email relay. None of that was visible from the code's own comments, several of which asserted the exact opposite of what the code did.

That is the lesson worth keeping: **a plan that says "done" is a hypothesis. The audit is the experiment.**

---

## 1. What the audit found

### The five worst findings (all now fixed — commit `593e8db`)

| # | Finding | Why it mattered |
|---|---|---|
| 1 | **Production minted fake accounts.** With Supabase unconfigured, *any* email + *any* password "signed you in", and the user existed only in that browser's localStorage. | The site was **live and public in this state**. Every visitor got a throwaway account, lost on a cache clear, with no path to migrate them to a real user. Announcing would have onboarded the entire launch cohort into nothing. |
| 2 | **The AI meter failed OPEN, not closed.** `supabase-js` never throws — it resolves `{ data, error }` — so the `catch` blocks that claimed to fail closed were **dead code**. A missing table read as "0 spent" and every cap silently passed. | The cost ceiling existed only on paper. The comments said "fail closed, never unmetered". The code did the opposite. |
| 3 | **`/api/social` was an unauthenticated open email relay.** Anyone could POST and have us send up to 100 emails per request **from our verified sending domain**, with attacker-controlled sender name, body and destination link. | Branded phishing at our expense, and a blacklisted sending domain precisely when launch deliverability matters most. It had **no caller anywhere in the app** — pure liability. |
| 4 | **The 7-day trial did not exist.** No code ever granted it, yet it was sold on the landing, sign-up, pricing, and a countdown timer in Settings. | Pro was simultaneously **unreachable and unpurchasable**. The core advertised journey (diagnostic → missions → 3 mocks → pass) could not be completed by anyone. |
| 5 | **FR was gameable.** 45% of its answers were keyed to option "A" (every other paper: a clean ~25%), and options were **never shuffled at render**. | ~83% of that bank was scoreable *without reading the questions*, corrupting practice stats, the mock gate, and the pass-probability estimate that is the entire product promise. |

### The rest, by front

**Security.** Beyond the relay: `/api/calendar-callback` had no auth but wrote Google credentials with the **service role**, keyed on a body-supplied `user_id` — anyone could hijack another user's calendar sync. Worse, `calendar_accounts` (which stores `google_refresh_token`) had **no migration at all**, so its RLS state in production was unknown, and the client reads it with the anon key. The Paddle webhook had correct HMAC but **no replay protection** — a captured signed body could be replayed forever to re-grant a plan after cancellation. The reminder opt-in trusted a body-supplied email, letting any user sign a stranger up for daily mail from our domain.

**Learning engine.** The mock gate unlocked after **two correct answers** (61% "chance to pass" on 2 data points, with 7 of 8 syllabus areas untouched). The diagnostic screen and the dashboard ran **different models on the same answers** (same 16/24 → 75% vs 77%) while the comments claimed "both speak the exact same model". One corrupt cloud row **bricked the app permanently** — a wrong-typed field made every stats read throw, forever, with no self-heal. An unanswered question with a missing key **graded as correct**. Flashcards' "Know" and "Don't know" were byte-identical for a new card.

**Content — the good news, and it is the important news.** An ACCA expert hand-verified **56 items across all 15 papers** and found **zero wrong answer keys**. A structural sweep of all 3,537 content items (2,418 questions, 929 flashcards, 190 written, 74 chapters) found **one** duplicate flashcard. Tax content is on a single consistent Finance Act. IP posture is clean and deliberate: invented companies throughout, no reproduced ACCA/Kaplan/BPP material. Explanations name *why each distractor is wrong* — genuinely better teaching than typical commercial banks. **The moat is real.**

**Launch readiness.** A 2am crash was invisible — no error tracking of any kind, and the root error boundary showed users a **raw JavaScript stack trace** with no reload button. No `robots.txt`, no `sitemap.xml`, no meta description. `Permissions-Policy` granted mic/camera to **all** origins including iframes.

### A finding about the fix itself

Worth recording, because it is the kind of thing that survives review by looking correct: the first attempt to de-bias FR reused the engine's existing seeded shuffle. It **did not work** — that LCG's multiplier is ≡ 1 (mod 4), so its low bits barely mix, and on a 4-element array it did not remove the bias, it **rotated** it: 45% "A" became 45% "D". Same exploit, different letter. (The engine gets away with it elsewhere because question-order arrays are long; option arrays are four items.) The shipped fix uses mulberry32. **Verified: FR is now 26/25/24/24, with 0 grading mismatches across all 2,030 MCQs — every remapped key still points at the same option text.**

---

## 2. Scorecard after the fixes

| Area | Verdict |
|---|---|
| Content correctness & IP | **Excellent.** Zero wrong keys in a 56-item expert sample; clean IP; one duplicate flashcard. |
| Learning-engine math | **Sound**, now that the gate, the model split, and the corrupt-row crash are fixed. Bounds hold under adversarial probing (no NaN/Infinity/out-of-range). |
| Security & billing | **Solid.** Entitlement can't be self-granted; AI genuinely fails closed; the relay is deleted; webhooks are replay-proof. |
| Honesty of claims | **Clean.** Every advertised feature now exists. Invented social proof removed. |
| Observability | **Minimum bar met** (error capture + branded boundaries). Still needs a real alerting story. |
| Tests | **55 tests, gating the build** (was: absent). Each one pins a real bug this audit found, and the suite is proven to fail when a bug is reintroduced. |
| Performance | **Fixed.** `/study` down 85% (1,408 → 227 kB gzip): a student now loads one paper, not fifteen. |
| **Ops (production env)** | **Not started. THE ONLY THING BLOCKING REVENUE.** |

---

## 3. The five gates to public announcement

Each gate must be true before the next one matters. **We are entering Gate 3.**

### Gate 1 — Stop lying ✅ DONE (`593e8db`)
Nothing else counts until the product only says true things. Trial claims, "Life Shields", the IELTS testimonial on the ACCA sign-up page, fabricated testimonials, fake app-store buttons, placebo settings toggles — all gone or made real. In a community as small and tight as ACCA candidates in Tashkent, invented social proof is the one mistake you cannot walk back.

### Gate 2 — Close the security holes ✅ DONE (`593e8db`)
Fail-open metering, the open email relay, the calendar hijack, webhook replay, the phantom RLS table. All closed. Migrations `0016` and `0017` added.

### Gate 3 — Turn the product on ⬅ **NOW. FOUNDER-GATED.**
This is the one only the founder can do, and everything downstream is blocked on it. `/api/health` currently reports **every key false**.

1. **Supabase** — project, then migrations **`0001`→`0017` in order**. `0013`, `0015`, `0016`, `0017` are mandatory: without them AI fails closed (correctly, now), Google tokens sit in a table whose RLS is unverified, and webhooks aren't replay-proof.
2. **Anthropic** — `ANTHROPIC_API_KEY`.
3. **Paddle** — token, webhook secret, API key, and the three price ids **server-side as well as client-side** (they're `VITE_`-named but the webhook reads them server-side; ship them client-only and every payment succeeds while nobody is granted their plan). `/api/health` now returns **503 on a half-configured billing stack** to catch exactly this.
4. **Ops** — `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `VITE_POSTHOG_KEY` (error tracking is wired but silent without it), `RESEND_API_KEY`.
5. **Verify** — `/api/health` → `status: ok`, `billing: "live"`. Then run one real diagnostic, one metered AI call (confirm rows land in `ai_usage` **and** `ai_usage_global`), one sandbox checkout end-to-end (confirm the plan lands in `app_metadata` **and** `subscriptions`).
6. **Confirm `support@scholifyapp.com` actually receives mail.** Every support path in the app now points there.

**Decide before this gate:** the **7-day trial**. It is currently removed, not built. Doc 7's entire lifecycle model (trial → paid) and the investor model assume it exists. Either build it properly (server-side grant with expiry) or formally adopt freemium and update Docs 7 and 8. *Do not re-add the claim without the code.*

### Gate 4 — Private beta: 20–30 real students (2–3 weeks)
Doc 7 already gates its soft launch on this, and it is right. Hand-recruited ACCA students, watched closely.

- **Purpose:** find out whether the diagnostic *lands emotionally*, whether anyone converts, and whether the ~8–15s load on a mid-range Android kills activation before the product gets a chance.
- **Gate to pass:** students complete a diagnostic on **day one** (Doc 7's activation metric, target ≥60%), come back, and **a few of them pay**.
- **This is also where real testimonials come from** — which is exactly what Gate 1 took away. You cannot announce with credible social proof until this gate is done.

### Gate 5 — Announce
Only now. The announcement lands on a product that is switched on, honest, secure, and **proven by real users you can quote**.

The OG cards, favicons and PWA manifest are already in place, so a shared launch link renders a proper preview.

---

## 4. Timeline

**4–6 weeks, realistically.** Roughly one week of work to clear Gate 3, then Gate 4 sets the pace.

The long pole is **not engineering — it is the beta**, and shortening it is the one economy to refuse. Announcing before Gate 4 means the launch cohort *becomes* the test cohort, and every friction point gets found in public, in a small community, with one chance at a first impression.

---

## 5. Done since the audit (2026-07-14, after the fixes)

Two of the three deferred items were closed immediately, because both are Gate-4 insurance and neither needed the founder:

- **A test suite — 55 tests, gating the build** (`e7d10bb`). Every bug the audit found had been found by a human reading code; there was no suite at all. The tests are aimed at the money and trust paths, and each one pins a real, observed failure: the skipped answer that graded correct, the mock gate that opened on two answers, the two models that disagreed on the same student, the replayed webhook, the flashcard where "Know" and "Don't know" did the same thing. **The suite is proven to have teeth** — reintroducing the exact pre-audit grading bug fails the test that names it. `npm test` now gates `npm run build`, like typecheck.
- **Content code-splitting** (`9caaf26`). A student studies one paper; they were downloading all fifteen. **`/study` fell 85%** (1,408 → 227 kB gzip), `/dashboard` 70%, the `AccaStudy` chunk from 2,584 kB to 107 kB. This was the single biggest activation risk for a beta running on mid-range Androids in Tashkent. Also added `npm run verify:loading`, because the test suite *could not* have caught the failure that matters: Node fills the registry eagerly, so a broken dynamic import would leave every test green while a real student got a blank study screen.

## 6. What we are still choosing NOT to do before announcing

Stated explicitly, so it is a decision and not an oversight:

- **Unifying the two streak stores.** `acca-schedule.ts` has a real shield mechanic; `acca.ts` has the headline streak that resets regardless. We removed the *claim* rather than shipping a rushed merge of two stores. Do it properly, later.
- **FA2025 tax year.** TX/ATX are internally consistent on FA2024, which ACCA examines through the March 2026 sitting. For sittings after that, the corpus is one Finance Act behind. **Either refresh to FA2025 or label the basis explicitly in the TX/ATX UI** — an unlabelled stale tax year teaches someone the wrong NIC rate. This is a real decision with a real deadline, not a nice-to-have.
- **The 7-day trial** (see Gate 3) — removed, not built. It needs a decision before it needs code.

---

## 6. The standing rule

Every claim in this document is checked by something that will fail loudly if it stops being true:

- `npm test` — 55 tests on grading, the pass probability, the mock gate, option bias, spaced repetition and billing. **Gates the build.**
- `npm run typecheck` — covers `api/` too, where a type error becomes a broken webhook rather than a failed build. **Gates the build.**
- `npm run audit:content` — fails if any promoted paper has an empty tile behind it.
- `npm run verify:loading` — loads every paper the way the browser does, and fails if one comes back empty. (The test suite cannot see this: Node fills the registry eagerly, so a broken dynamic import would leave every test green and every student staring at a blank screen.)
- `npm run validate:chapters` — fails on any crash-causing content shape.
- `/api/health` — 503s on a half-configured billing stack.

**What is not checked by a script is not known to be true.** That is the whole lesson of this audit.

---

*Updated the same day reality diverges from it. Next review: at the Gate 3 → Gate 4 handover.*
