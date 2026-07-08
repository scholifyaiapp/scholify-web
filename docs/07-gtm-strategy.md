# Scholify — Marketing & Go-to-Market Strategy (v1.0)

**Date:** 2026-07-08 · **Status:** Live product (scholifyapp.com), pre-revenue, pending go-live ops (env keys, AI metering, Paddle dashboard prices)
**Owner:** Founder · **Review cadence:** Monthly, or immediately on any kill-rule trigger (§7)

---

## 1. Positioning & Messaging House

### 1.1 One-liner

> **Scholify is the learning OS for ACCA students — a GPS that tells you your live pass probability and exactly what to study today, for every paper from BT to AAA, at ~5% of tuition-centre prices.**

Shorter variants for constrained placements:

- **Ad headline:** "Know your pass probability. Every day. Every paper."
- **App-store style:** "Your ACCA GPS — diagnostic, daily missions, mocks, pass."
- **Telegram bio:** "AI ACCA prep. $14.99/mo instead of €300–800 per paper."

### 1.2 The story we tell: GPS, not question bank

Every competitor sells *content* — more questions, more videos, more PDFs. Scholify sells *navigation*. The narrative frame in all copy:

> A question bank is a map with no "you are here" dot. Scholify is a GPS: it knows where you are (diagnostic), where you're going (your exam sitting), how likely you are to arrive (live pass probability), and it recalculates the route every single day (daily missions chosen by the model). When you take a wrong turn — a failed sitting — it doesn't say "start over." It says: *recalculating*.

The closed loop, which is the product and the pitch simultaneously:

**Diagnostic → live pass probability → daily missions (model-chosen) → 60% readiness gate → Mock 1 → Mock 2 → Mock 3 → real exam → celebrate or recovery run → repeat until pass.**

Every marketing asset should show or describe this loop. It is the differentiator; content depth is table stakes.

### 1.3 Pillar messages by persona

| Persona | Situation | Core pain | Lead message | Proof point from product |
|---|---|---|---|---|
| **The First-Timer** | University student or fresh graduate in Tashkent/Almaty/Baku, starting BT–FA | "I don't know where to start or whether I'm on track." | "Take a 20-minute diagnostic. Get a day-by-day plan and a live pass probability for your exact sitting." | Diagnostic → instant probability + daily missions; full BT→AAA path with EPSM/PER tracking |
| **The Working Professional** | Audit/finance job, studying nights and weekends, papers PM–FM/SBL | "I have 45 minutes a day, not 4 hours. Tuition centre schedules don't fit my life." | "The model picks the highest-impact 45 minutes for you, every day. No timetable, no commute, works offline on your bus ride." | Daily missions sized to available time; offline-first; AI Examiner marks written answers in seconds instead of waiting days for a tutor |
| **The Retaker** | Failed one or more sittings; the largest and most underserved segment (pass rates ~40–50%/paper mean retaking is the *norm*) | Shame + fog: "I failed and I don't even know exactly why." | "You didn't fail. You now know exactly where the marks were lost. Run the recovery run." | Recovery run rebuilds the plan from the real exam result; pass probability recalibrates on actual outcomes, not just practice data |

### 1.4 The recovery-run empathy angle (primary differentiator)

Every ACCA tool treats a failed sitting as a dead end — you're dumped back at the question-bank home screen. Scholify treats it as *data*. This is both a product mechanic and the emotional heart of the brand:

- **Copy law:** never use "fail" as an endpoint in marketing. Use "recalculating," "recovery run," "the marks tell you where to go next."
- **Campaign concept:** "Half of ACCA students don't pass on the first try. The good ones treat that as a diagnostic." Retaker-targeted campaigns run 2–4 weeks after each results day (see §5.3 calendar).
- This angle is nearly impossible for tuition centres to copy — their business model *depends* on selling the full course again to retakers at €300–800.

### 1.5 Proof points inventory (use in ads, landing, sales conversations)

1. **Live pass probability** that recalibrates on real exam results — no other ACCA tool closes the loop with actual sitting outcomes.
2. **Recovery run** — a first-class product mode for retakers.
3. **4-question analytics dashboard** — "Am I on track? What's weak? What's next? What changed?"
4. **AI Examiner** — written answers marked in seconds (SBL/SBR/APM-style constructed responses, the part question banks can't grade).
5. **Lara**, the stateful AI tutor — remembers your history across sessions.
6. **Full qualification** — BT→AAA plus EPSM/PER tracking, one subscription.
7. **Offline-first** — study on the metro, in regions with unreliable connectivity. A genuine feature in UZ/CIS, not a checkbox.
8. **Price** — $14.99/mo vs €300–800 *per paper per course* at a tuition centre.

### 1.6 Messaging don'ts

- Don't claim official ACCA affiliation or use ACCA marks beyond nominative reference. All questions are original (see business plan §13, Risks).
- Don't promise a pass. Promise *knowing where you stand and what to do next*.
- Landing page is EN/RU; the app itself is English-only by design (ACCA's official language is English) — never promise a translated app experience.

---

## 2. ICP & Market Sizing

### 2.1 Ideal Customer Profile — beachhead

- **Who:** ACCA students in Uzbekistan and the wider CIS (Kazakhstan, Azerbaijan, Georgia, Armenia, Kyrgyzstan; Russia-based students paying via international rails where feasible).
- **Age 19–30**, studying alongside university or a junior finance/audit role (Big 4 and local firms sponsor or expect ACCA).
- **Digitally native:** lives in Telegram; discovers education products via Telegram channels, Instagram, and word of mouth from tutors.
- **Price context:** local tuition centres charge **€300–800 per paper per course**; a full qualification through centres is a multi-thousand-euro proposition. $9.99–14.99/mo is an order-of-magnitude price disruption — the ROI calculator on the landing page (UZS/EUR) makes this arithmetic explicit.
- **Validated demand signal:** Makon AI has proven UZ students will pay for AI-driven ACCA prep; ielts.gg has proven the local AI-edtech growth playbook (Telegram-first, exam-score outcomes, aggressive referral loops).

### 2.2 Expansion ICP

Global ACCA — **~500k+ students across 180 countries**, concentrated in the UK, Pakistan, India, Malaysia, Nigeria, Kenya, China, and the Gulf. Same product, English-only app already fits; localization work is landing-page-level only. Enter after beachhead unit economics are proven (see §4 Phase 3 gate).

### 2.3 TAM / SAM / SOM (stated assumptions)

Bottom-up, subscriber-based. Assumptions stated inline; update quarterly.

| Layer | Definition | Assumption | Value |
|---|---|---|---|
| **TAM** | All ACCA students worldwide × blended ARPU | ~500,000 students; blended ARPU $12/mo ($144/yr) between Beginner and Pro | **~$72M/yr** |
| **SAM** | Students reachable with EN/RU marketing + Paddle-supported payments, digitally acquirable | ~40% of TAM (UK, CIS, South Asia, Africa, SEA English-medium; excludes China-specific channels for now) → ~200,000 students | **~$29M/yr** |
| **SOM (18 mo)** | UZ/CIS beachhead capture | UZ + reachable CIS ACCA population est. 8,000–15,000 active students (assumption — validate against ACCA member-body stats and Telegram channel sizes in month 1); capture 3–5% paying within 18 months → 300–600 paying subs | **~$52k–105k ARR** |

**Honest caveat baked into planning:** the beachhead alone is a nice business, not a venture outcome. The beachhead's job is to prove CAC ≤ $30 and the loop's retention story cheaply, then export the playbook to markets 20× the size (Pakistan alone has more ACCA students than all of CIS).

---

## 3. Channel Plan

### 3.1 CAC planning table (authoritative)

Blended planning CAC: **$30 per paying user**. Payback (Pro): **2.4 months**. LTV ≈ **$159** @ 8%/mo churn. **LTV/CAC 5.3**. Max affordable CAC: **$53** (kill threshold). Price floor: **$9.47**.

| Channel | Expected CAC | Role | Kill rule |
|---|---|---|---|
| Telegram ACCA channels/communities | $17–50 | Primary demand capture, beachhead | Kill placements where CAC > $53 over 2 buys |
| Meta / Instagram | $33–100 | Scale + retargeting | Kill ad sets > $53 after $500 spend |
| ACCA tutor / influencer partnerships | $15–40 | Trust transfer, warm traffic | Renegotiate or drop if > $53/attributed sub |
| Referral (built in-app) | ~$0 (reward cost only) | Compounding, margin-protective | n/a — cap reward value below $15/converted referral |
| SEO / content (calculators) | Near-$0 marginal, slow | Long-term moat | Review at month 6 if zero indexed traffic |

### 3.2 Telegram ACCA communities (primary channel, CAC $17–50)

Telegram is where CIS ACCA students already live — channel buys, community presence, and a Scholify-owned channel.

**Playbook:**

1. **Map** (week 1): inventory every UZ/KZ/AZ ACCA Telegram channel and chat — tutor channels, university finance-club channels, "ACCA study group F5" chats. Record subscriber counts and post-view counts (views, not subs, set price).
2. **Buy** placements in the top 10 by engagement. Negotiate per-post; typical CIS rates make the $17–50 CAC plausible at 1.5–3% click-to-trial and ~15–25% trial-to-paid.
3. **Own channel** ("Scholify ACCA"): the content engine below feeds it; goal 1,000 subs by day 90.

**Content formats that fit the channel:**

- **"Question of the day"** — one original exam-style MCQ, answer in comments, explanation posted 12h later with a "the model would have assigned you X next" hook.
- **Pass-probability screenshots** (anonymized, with consent) — "Aziz went from 41% → 78% probability in 6 weeks on FR." The number-going-up format is the native language of the ielts.gg playbook.
- **Results-day live posts** each sitting: "Didn't pass FM? Here's exactly how to run a recovery run" — the empathy angle at the moment of maximum pain.
- **Examiner-report breakdowns** — "where the marks were lost" analyses of each sitting per paper; positions Scholify as the analytical authority.
- **Mini pass-probability quiz bot** — 5 questions in-Telegram, outputs a rough probability + link to the full diagnostic. This is the top-of-funnel workhorse.

### 3.3 Meta / Instagram (CAC $33–100)

- **Audiences:** interest (ACCA, CFA, audit, Big 4 employers) + lookalikes on trial-starters once ≥500 events exist; geo UZ→KZ→AZ→GE.
- **Creative concepts (test in this order):**
  1. Screen-recording of the pass-probability dial updating after a mission — 15s, captioned, RU + EN versions.
  2. ROI math card: "13 papers × €500 at a centre = €6,500. Scholify: $119.99/yr." Static, brutal, effective.
  3. Retaker empathy video: "Failed FR by 4 marks? You now know exactly where they went." Run only in post-results windows.
- **Discipline:** $500 max per ad-set test; kill at CAC > $53; retargeting pool (site visitors + trial non-converts) gets the annual-plan offer.

### 3.4 ACCA tutor & influencer partnerships (CAC $15–40)

Tutors are not (only) competitors — independent tutors sell *their teaching*, not software, and their students still need between-lesson practice infrastructure.

- **Offer A — affiliate:** unique code, 20–30% rev-share on first-year revenue per referred sub (at 25% of a $119.99 annual = $30, exactly at blended CAC; cap accordingly).
- **Offer B — classroom license idea:** tutor gets a cohort dashboard (roadmap item) + discounted seats for their group; tutor markets "my course + Scholify included" as a premium bundle. Turns €500-course tutors into resellers rather than enemies.
- **Targets:** 10 tutor conversations by day 30, 3 signed by day 60. Also: finance-faculty student ambassadors at TSUE/Westminster Tashkent/KIMEP — free Pro + payout per converted referral.

### 3.5 SEO / content — "pass probability" calculators

Own the query space competitors ignore: not "ACCA F7 notes" (saturated) but the *anxiety queries*.

- **Free web calculators** (lead magnets, each ends in "take the real diagnostic"): "ACCA [paper] pass probability calculator", "Should I sit or defer? — readiness checker", "ACCA retake ROI calculator" (extends the existing landing UZS/EUR calculator).
- **Programmatic pages per paper × sitting:** "FR March 2027: syllabus weighting, pass rate history, 8-week plan." 13 papers × 4 sittings = 52 evergreen-refreshable pages.
- **RU-language content** is near-zero-competition for ACCA queries — quick wins for the beachhead.

### 3.6 Referral loop (built in-app, CAC ~$0)

The program already exists in the product; GTM's job is placement and fuel.

- **Mechanics:** double-sided — referrer gets 1 month free (or streak-freeze credit), referee gets extended 14-day trial. Reward cost must stay under $15 per converted referral.
- **Trigger moments (in-product):** after a passed real exam (peak euphoria — "share your pass"), after a mock score > 60% (pride), on streak milestones 7/30 (identity). Never trigger during a recovery run.
- **Shareable artifact:** auto-generated pass-probability card image (paper, probability, streak) sized for Telegram/IG stories — the growth asset that markets itself.
- **Target:** referral ≥ 20% of new paying users by month 6; every referral point directly lowers blended CAC below $30.

### 3.7 Ratings & social proof

No native app store yet (web app), so manufacture equivalent trust surfaces:

- Testimonial wall on landing (with pass-probability deltas and sitting results, consented).
- Trustpilot profile from day 1; in-app prompt to review after first passed exam only (bias toward peak-satisfaction moments, standard practice).
- Telegram channel pinned "wall of passes" updated every results day.
- Case-study long-forms (1 per persona) by day 90 for tutor-partnership and Meta retargeting use.

---

## 4. Launch Plan

### 4.1 Phasing

| Phase | Scope | Entry gate | Exit gate |
|---|---|---|---|
| **Phase 1 — Soft launch UZ** (weeks 1–6) | Tashkent-centric; Telegram + tutors only; no paid Meta | Go-live ops done (env keys, AI metering, Paddle prices live) | 100 activated users, first 20 paying, funnel instrumented |
| **Phase 2 — CIS** (weeks 7–14) | KZ/AZ/GE channels + Meta on; RU creative at full volume | Trial→paid ≥ 1.7%, blended CAC ≤ $53 in Phase 1 | 150+ paying subs, ≥1 channel at CAC ≤ $30 repeatably |
| **Phase 3 — Global English** (week 15+) | Pakistan/Nigeria/Malaysia/UK tests; EN-only funnels | Phase 2 exit + churn ≤ 10%/mo observed | n/a — becomes steady-state growth |

### 4.2 First 90 days, week by week

- **Week 1:** Go-live ops (Anthropic/Supabase/Paddle keys, AI usage metering, Paddle dashboard prices). Analytics events verified end-to-end (signup → diagnostic → mission → paywall → paid). Telegram channel map completed. Scholify TG channel opens.
- **Week 2:** Founder-led onboarding of 20–30 hand-recruited beta-to-paid users (university contacts, tutor intros). Watch every session; fix top-3 friction points. First "question of the day" cadence starts (daily).
- **Week 3:** First 3 paid Telegram placements. Quiz-bot live. Trustpilot opened. First tutor affiliate signed.
- **Week 4:** Review sprint: funnel numbers vs targets (activation ≥ 60%, trial→paid signal). Kill/keep Telegram placements. Publish first 2 calculator pages.
- **Weeks 5–6:** Double down on best Telegram format; second tutor signed; first testimonial assets. **Phase 1 exit review.**
- **Weeks 7–8:** Meta launches (3 creative concepts × UZ+KZ, $500/set cap). KZ/AZ Telegram buys. Referral prompts tuned based on Phase 1 data.
- **Weeks 9–10:** First results-day campaign if calendar allows (recovery-run push; see §5.3). Lookalike audiences if ≥500 trial events.
- **Weeks 11–12:** Programmatic SEO pages for top-6 papers × next sitting live. Third tutor / first ambassador cohort. Annual-plan push to monthly cohort (§6).
- **Week 13 (day ~90):** Full review against §7 dashboard. Decide Phase 3 entry, present unit-economics deck (feeds investor plan doc 08).

### 4.3 Metrics definitions

- **Activation metric:** **diagnostic completed on day 1** of signup. Everything upstream (ads, landing, onboarding) is optimized to this single event; a user with a pass probability on screen has felt the product. Target ≥ 60% of signups.
- **North-star metric:** **weekly active learners hitting their daily mission** (completed ≥1 model-assigned mission that week — not just logged in). This is the loop working; it predicts both conversion and retention. Everything in lifecycle marketing (§5) exists to move this number.

---

## 5. Lifecycle Marketing

### 5.1 Trial → paid (7-day trial, streak paywalls at 7/14/21)

The conversion architecture is streak-anchored: the paywall arrives when the user has the most to lose (their streak, their probability trajectory), not on an arbitrary timer.

- **Day 0:** diagnostic → probability revealed → first mission assigned. Email: "Your FR pass probability is 47%. Here's your first mission."
- **Days 1–6 (trial):** daily mission emails/pushes framed as probability moves ("+2.1% this week"). Day 5: trial-ending email leading with *their own data* — probability delta, questions done, weak areas found — not feature lists.
- **Day 7 paywall:** "Your streak is 7. Your probability moved +X%. Keep the model working." Annual offered first (33% savings framing), monthly second.
- **Days 14 / 21 paywalls** (for free-tier lingerers): escalating specificity — day 14 leads with locked weak-area drills; day 21 leads with the mock gate ("You can't reach Mock 1 on the free plan").
- **Post-trial non-convert nurture:** weekly "state of your paper" email (syllabus tips, sitting countdown) — stay useful, re-offer at T-8 weeks before their sitting when urgency peaks.

### 5.2 Retention & resurrection (email reminders built)

- Mission-missed nudge at 20:00 local; streak-about-to-break at 21:30 (loss aversion, the strongest lever we have).
- Weekly digest: probability trajectory graph + "what changed" (the 4-question dashboard, emailed).
- Dormant 7 days: "your probability is decaying — the model has re-planned your week" (probability decay on inactivity is honest: readiness genuinely fades).
- Dormant 30 days: pause offer / sitting-deferral flow rather than silent churn — capture the *reason*.

### 5.3 Retake-season calendar (the structural rhythm of the business)

ACCA sittings: **March / June / September / December**; results ~6 weeks later. The entire marketing year is 4 identical cycles:

| Cycle moment | Timing | Play |
|---|---|---|
| **Results day** | ~6 wks post-sitting | Recovery-run campaign (Telegram + Meta retaker creative): "You now know exactly where the marks were lost." Highest-intent moment of the whole cycle. |
| **Enrollment window** | Results +2 wks | "Plan your next sitting" push; annual-plan emphasis (a retaker's horizon is ≥6 months — annual is rational for them). |
| **T-10 weeks to sitting** | — | Diagnostic push to cold lists and SEO traffic: "10 weeks out — do you know your probability?" |
| **T-4 weeks** | — | Mock-gate content: "Mock 1→2→3 or defer" checkers; conversion pressure peaks naturally. |
| **Exam week** | — | No selling. Good-luck content only. Brand deposit. |
| **Post-exam lull** | 0–6 wks | First-timer acquisition (new cohort planning next sitting); referral pushes to fresh passers as results approach. |

---

## 6. Pricing & Promo Policy

**Price card (FINAL — do not improvise):**

| Tier | Monthly | Annual | Notes |
|---|---|---|---|
| Free | $0 | — | Diagnostic + limited loop; exists to feed activation |
| Beginner | $9.99 | $79.99 | 33% annual discount |
| Pro | $14.99 | $119.99 | 33% annual discount; AI Examiner + full loop |

7-day trial on paid tiers. **Paddle is merchant of record; all prices tax-exclusive** (Paddle adds/remits local VAT — never quote "tax included" anywhere).

**Policy rules:**

1. **Annual is the default push.** Annual halves effective payment fees (5.4% vs 8.3%), collects cash up front, and structurally matches the multi-sitting ACCA journey. Every paywall shows annual first; target ≥ 40% of new subs on annual by month 6.
2. **Hard floor: $9.47 effective monthly price.** No discount, promo code, or partner deal may take effective per-month revenue below the floor — below it, contribution economics break. This kills "50% off first 3 months"-style promos on Beginner entirely.
3. **Allowed promos:** extended trials (14 days), one bonus month on annual (12+1), referral reward months — promos in *time*, not in *price*. Time-promos don't reset price anchors.
4. **No regional price discrimination at launch.** One USD price card globally; the UZS/EUR ROI calculator does the "cheap relative to alternatives" work without training the market to expect discounts. Revisit only if Phase 3 data shows price as the top objection in a specific market.
5. **Tutor/partner pricing:** rev-share (their margin) rather than student-facing discounts (our floor). Partners compete on their added teaching, not on our price.

---

## 7. Metrics Dashboard & Kill Rules

### 7.1 Weekly dashboard (single page, reviewed every Monday)

| Metric | Target | Kill / review trigger |
|---|---|---|
| Blended CAC (paying) | ≤ $30 | **KILL channel at > $53** (2 consecutive buys / $500 spend) |
| Trial→paid conversion | ≥ 2–3% of signups | **REVIEW at < 1.7%** — freeze paid spend, fix funnel first |
| AI cost / Pro user / mo | ~$1.00 → $0.60 | **REVIEW at > $2.80** — usage metering audit, model-mix change |
| Activation (day-1 diagnostic) | ≥ 60% | Review < 45%: onboarding sprint |
| North star: weekly active learners hitting daily mission | up and to the right | 2 consecutive down weeks with flat signups → product review before any marketing spend increase |
| Churn (monthly, paid) | ≤ 8%/mo | > 10% for 2 months → pause Phase expansion |
| Annual mix of new subs | ≥ 40% by month 6 | < 25% → paywall re-sequencing experiment |
| Referral share of new paying | ≥ 20% by month 6 | — |
| Payback (Pro) | ≤ 2.4 months | > 4 months → CAC or pricing action |

### 7.2 Kill rules (pre-committed, no relitigating in the moment)

1. **CAC > $53 on any channel** after fair test budget → kill the channel/placement/ad-set. $53 is the computed max affordable CAC; above it, LTV/CAC < 3 and payback drifts past acceptable.
2. **Trial→paid < 1.7%** sustained 4 weeks → stop all paid acquisition; the funnel, not the channel, is broken.
3. **AI cost > $2.80/user/mo** → immediate metering review; this erases the contribution-margin advantage that funds everything else.
4. **Reward cost per converted referral > $15** → cut reward value, keep the loop.

### 7.3 Experiment backlog (priority order)

1. Telegram quiz-bot funnel vs direct-to-diagnostic link (activation rate per click).
2. Paywall sequencing: annual-first vs monthly-first at the day-7 streak paywall.
3. Retaker creative vs first-timer creative on Meta in a results-day window (CAC + conversion).
4. Referral trigger timing: post-pass vs post-mock-60% (share rate, converted-referral rate).
5. Diagnostic length: 20-min full vs 8-min quick with "refine later" (activation vs probability accuracy perception).
6. Trial length 7 vs 14 days (holdout cohort; watch payback, not just conversion).
7. Pass-probability shareable card: auto-prompt vs manual share button (viral coefficient).
8. RU vs EN landing default for UZ traffic (bounce, activation).
9. Tutor bundle pilot (Offer B) with one tutor cohort — measure cohort retention vs organic subs.
10. Programmatic sitting pages: intent queries ("FR March 2027 tips") vs anxiety queries ("ACCA FR fail what now") — indexation and conversion per page class.

---

*Companion document: `08-investor-pitch-business-plan.md` (unit economics detail, financial scenarios, the ask).*
