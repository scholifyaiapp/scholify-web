# Scholify — Investor Pitch & Business Plan (v1.0)

**Date:** 2026-07-08 · **Stage:** Product built and live at scholifyapp.com; pre-revenue pending go-live ops
**Ask (placeholder — founder to finalize):** $150–250k pre-seed for 18 months of runway (§11)
**Companion:** `07-gtm-strategy.md` (channel playbooks, launch plan, kill rules)

---

## 1. Executive Summary

**Scholify is the learning OS for ACCA students** — an AI-powered web app that runs a closed loop per exam paper: diagnostic → live pass probability → daily missions chosen by the model → readiness gate → three mocks → the real exam → and, critically, a **recovery run** when a sitting doesn't go well. It covers the full ACCA qualification (BT→AAA plus EPSM/PER tracking), works offline, and costs **$14.99/month against the €300–800 per paper per course** charged by the tuition centres that dominate our beachhead market.

- **Market:** ~500k+ ACCA students in 180 countries; beachhead in Uzbekistan/CIS where AI exam-prep has just been validated (Makon AI for ACCA, ielts.gg for IELTS) and where centre prices make our ROI story arithmetic, not persuasion.
- **Economics:** 85–87% contribution margins, **2.4-month payback**, **LTV/CAC 5.3** at planning CAC of $30 and 8% monthly churn. Breakeven on fixed costs at **≈20 Pro subscribers**.
- **Status:** the product is *built* — dashboard, full learning loop, analytics, recovery run, AI Examiner, AI tutor, payments code including the Paddle webhook. Remaining before first dollar: environment keys, AI usage metering, and Paddle dashboard price setup.
- **The ask:** pre-seed to fund content depth across all 13 papers, disciplined channel experiments (pre-committed kill rules), and one content hire — turning a working machine into a growing one.

---

## 2. The Problem

**ACCA is a 13-paper marathon where failing is the statistical norm, and the industry is built to profit from that failure without fixing it.**

1. **Pass rates run ~40–50% per paper.** Across a 13-paper qualification, virtually every student fails at least one sitting. Retaking is not the exception — it *is* the ACCA experience.
2. **Preparation is expensive and rigid.** CIS tuition centres charge **€300–800 per paper per course** — a full qualification through centres is a multi-thousand-euro proposition in markets where that is months of salary. Fixed schedules exclude the working professionals who make up much of the student body.
3. **Existing tools are maps, not GPS.** Question banks (Kaplan/BPP online and their clones) give you thousands of questions and zero navigation: no answer to "am I going to pass?", "what should I do *today*?", or "how do I allocate my last 4 weeks?". Students self-navigate — badly — and the pass rates show it.
4. **Retakers are treated as failures, not customers with data.** After a failed sitting, every existing option says "buy the course again and start over." Nothing ingests the actual exam result and rebuilds the plan around where the marks were actually lost. The largest, highest-intent, most emotionally raw segment in the market is served by *re-selling them the thing that just didn't work*.
5. **Constructed-response papers can't be self-marked.** From SBL/SBR upward, the exam is written answers. Without a tutor, students get no feedback on the exact skill the exam tests. Tutor marking costs money and takes days.

---

## 3. The Solution

Scholify replaces "here's content, good luck" with a **closed control loop per paper**:

> **Diagnostic → live pass probability → daily missions (model-chosen) → 60% gate → Mock 1 → Mock 2 → Mock 3 → real exam → celebrate or recovery run → repeat until pass.**

### The product, in screenshots-in-words

- **The dashboard.** One number dominates: *your live pass probability for your paper and sitting* — e.g. "FR, March sitting: **63%**" — with a trajectory sparkline. Below it, the **4-question analytics dashboard**: Am I on track? What's weak? What's next? What changed this week? Warm-paper light theme, ACCA-palette accents; it reads like an instrument panel, not a content library.
- **Today's mission.** The model — not the student — picks today's work: a mix of drills on the two weakest syllabus areas, one timed section, spaced review of last week's misses, sized to the time the student has. Complete it and the probability visibly moves. That single interaction — *do the work, watch the number respond* — is the habit engine.
- **The 60% gate and mock ladder.** The loop refuses to let students sleepwalk into an exam: readiness must clear 60% before the mock sequence opens, then Mock 1→2→3 under exam conditions calibrate the probability against full-length performance.
- **AI Examiner.** The student writes a constructed answer to an SBL-style requirement; it comes back **marked in seconds** — mark allocation, what earned credit, what a real marker would have wanted. This is the tutor-only feedback loop, unbundled to software.
- **Charles, the stateful AI tutor.** Not a blank chatbot: Charles knows the student's history, weak areas, and mistakes across sessions, and teaches in that context.
- **The recovery run.** Results day, didn't pass. Instead of a dead end, Scholify ingests the actual result, recalibrates the probability model against reality, and opens a recovery run: *"You now know exactly where the marks were lost."* The plan rebuilds around the real gaps. This mechanic — recalibration on **real exam outcomes**, not just practice data — is unique in the category and is our emotional wedge into the retaker segment.
- **Full qualification & offline-first.** BT→AAA plus EPSM/PER tracking under one subscription; the whole thing works without connectivity, which in Uzbekistan and much of the CIS is a real feature, not a checkbox.

---

## 4. Why Now

1. **The AI cost curve just crossed the line.** Marking a written answer or running an adaptive tutor per-student was economically absurd two years ago. Today our all-in AI cost is **~$1.00 per Pro user per month, heading to ~$0.60** with the planned model mix — under 7% of price. Individualized instruction at question-bank prices became possible roughly *now*.
2. **CIS ACCA demand is growing and unserved by software.** Finance-sector professionalization across Uzbekistan/Central Asia is pushing ACCA enrollment up, while the supply side is still classroom tuition at European prices in non-European economies.
3. **The market just validated itself.** Makon AI (UZ, AI ACCA prep) proves local students pay for AI exam-prep; ielts.gg proves the Telegram-first, outcome-metric growth playbook works in this exact geography. We are not evangelizing a category — we are out-executing inside a proven one with a structurally better product (closed loop vs. content) and full-qualification scope.
4. **Merchant-of-record infrastructure (Paddle)** makes selling global subscriptions from day one a configuration task, not a compliance project.

---

## 5. Product Status: BUILT

This is not a deck about software we intend to write. **Live at scholifyapp.com today:**

- Full learning loop per paper: diagnostic, live pass-probability engine, model-chosen daily missions, 60% readiness gate, Mock 1→2→3 sequence
- Real-exam result ingestion → probability recalibration → **recovery run** flow
- 4-question analytics dashboard
- AI Examiner (written-answer marking) and Charles (stateful AI tutor)
- Full qualification coverage BT→AAA + EPSM/PER tracking
- Offline-first architecture with progress sync
- Streak system with paywalls at days 7/14/21; email reminder infrastructure
- In-app referral program
- Payments code complete, including the Paddle webhook; Free/Beginner/Pro tiers and 7-day trial implemented
- EN/RU landing site with UZS/EUR ROI calculator

**Remaining before first revenue (ops, not engineering):** production environment keys (Supabase / Anthropic / Paddle), AI usage metering, and price creation in the Paddle dashboard. Days, not months.

---

## 6. Market Sizing (bottom-up)

**Method:** ACCA students × attach rate × ARPU. All assumptions stated; the model is deliberately conservative on attach.

| Layer | Population | Attach assumption | Blended ARPU | Annual value |
|---|---|---|---|---|
| **TAM** — global ACCA | ~500,000 students, 180 countries | 100% (definitional) | $12/mo ($144/yr, Beginner/Pro mix) | **~$72M/yr** |
| **SAM** — reachable with EN/RU marketing + Paddle payment rails | ~200,000 (≈40% of TAM: UK, CIS, South Asia, Africa, English-medium SEA) | — | $144/yr | **~$29M/yr** |
| **SOM** — UZ/CIS beachhead, 18 months | est. **8,000–15,000** active ACCA students in UZ + reachable CIS *(assumption; validating against ACCA body stats and Telegram channel audience sizes in month 1)* | **3–5% paying** | $144/yr | **~$52k–105k ARR** |

**Reading the numbers honestly:** the beachhead is a proving ground, not the prize. Its job is to demonstrate CAC ≤ $30, conversion ≥ 2%, and churn ≤ 8% in the cheapest market to reach — then export the identical playbook to markets an order of magnitude larger (Pakistan, Nigeria, Malaysia each dwarf all of CIS in ACCA population). At just 2% of SAM, Scholify is a ~$580k ARR business; at 5%, ~$1.45M ARR — on 85%+ contribution margins and a near-zero-headcount cost base.

Structural tailwind: ACCA's 4 sittings/year (Mar/Jun/Sep/Dec) mean the market re-enters buying mode quarterly, and ~50% per-paper pass rates continuously regenerate the highest-intent segment (retakers) that our recovery-run positioning uniquely serves.

---

## 7. Business Model & Unit Economics

**Model:** B2C subscription. Paddle as merchant of record (handles global VAT/sales tax; prices tax-exclusive). 7-day trial.

| Tier | Monthly | Annual | Annual discount |
|---|---|---|---|
| Free | $0 | — | — |
| Beginner | $9.99 | $79.99 | 33% |
| Pro | $14.99 | $119.99 | 33% |

### Unit economics (authoritative)

| Line item | Pro monthly | Notes |
|---|---|---|
| Price | $14.99 | tax-exclusive |
| Paddle fee (5% + $0.50) | −$1.25 | **8.3% effective** on Pro monthly; only **5.4%** on annual — the annual push is also a fee-optimization |
| AI cost (avg) | −$1.00 | → **~$0.60** after planned model-mix change |
| **Contribution** | **$12.74 / 85%** | Beginner: **$8.69 / 87%** |

| Metric | Value | Basis |
|---|---|---|
| Fixed stack | **~$46/mo** at commercial tier | Supabase/Vercel/tooling |
| **Breakeven** | **≈ 20 Pro subscribers** | fixed ÷ contribution |
| Churn assumption | 8%/mo | planning figure; lifecycle levers in GTM doc target better |
| **LTV** | **≈ $159** | contribution ÷ churn |
| Planning CAC | **$30** blended | channel detail §8 |
| **Payback** | **2.4 months** | CAC ÷ contribution |
| **LTV/CAC** | **5.3** | |
| Max affordable CAC | **$53** | pre-committed channel kill threshold |
| Price floor | **$9.47** | no promo may breach it |

**Pre-committed review triggers:** AI cost > $2.80/user/mo · trial→paid conversion < 1.7% · CAC > $53. These are written into the operating cadence (GTM doc §7), not aspirations.

The strategic point: at 85–87% contribution margin, nearly every subscription dollar funds growth. The business breaks even on fixed costs at 20 subscribers, meaning invested capital buys *experiments and content depth*, not survival.

---

## 8. GTM Summary

(Full playbooks, week-by-week 90-day plan, lifecycle design, and experiment backlog in `07-gtm-strategy.md`.)

**Phasing:** soft launch Uzbekistan (weeks 1–6, Telegram + tutors only) → CIS (weeks 7–14, Meta on) → global English markets (week 15+, gated on conversion ≥ 1.7%, CAC ≤ $53, churn ≤ 10%).

| Channel | CAC | Role |
|---|---|---|
| Telegram ACCA channels/communities | $17–50 | Primary: question-of-the-day content, pass-probability quiz bot, results-day recovery campaigns |
| Meta / Instagram | $33–100 | Scale + retargeting; ROI-math and probability-dial creatives |
| ACCA tutor/influencer partnerships | $15–40 | 20–30% first-year rev-share affiliates; classroom-bundle pilot |
| Referral (built in-app) | ~$0 | Double-sided, triggered at pass/mock/streak moments; target ≥20% of new subs by month 6 |
| SEO — "pass probability" calculators | ~$0 marginal | Owns anxiety queries; 52 programmatic paper×sitting pages; RU content is uncontested |

**Blended planning CAC $30.** Activation metric: **diagnostic completed day 1** (target ≥60%). North star: **weekly active learners completing their daily mission.** The marketing year is four identical cycles around Mar/Jun/Sep/Dec sittings, with results day (the recovery-run moment) as the highest-intent beat.

---

## 9. Competition & Moats

| | **Scholify** | **Makon AI** (UZ) | **Tuition centres** (CIS) | **Kaplan/BPP online QBs** | **ChatGPT-DIY** |
|---|---|---|---|---|---|
| Live pass probability | **Yes — recalibrates on real exam results** | No | No | No | No |
| Daily plan chosen by model | **Yes** | Partial | Fixed timetable | No | User must self-direct |
| Retaker mode (recovery run) | **Yes — first-class** | No | "Buy the course again" | No | No |
| Written-answer marking | **Seconds (AI Examiner)** | Limited | Days, human | No | Unreliable, no mark scheme discipline |
| Full qualification BT→AAA + EPSM/PER | **Yes, one sub** | Partial | Per-paper purchase | Per-paper purchase | n/a |
| Offline-first | **Yes** | No | n/a | No | No |
| Stateful tutor | **Yes (Charles)** | Basic chat | Human (scheduled) | No | Stateless |
| Price | **$9.99–14.99/mo** | Local subscription | **€300–800/paper/course** | £50–150+/paper | $0–20/mo, no structure |
| Structured content authority | Building | Building | **Strong** | **Strong (brand)** | None |

**Where we're honestly weaker today:** brand authority and content depth versus Kaplan/BPP, and Makon's local head start in UZ. The funded plan (§11) attacks content depth directly; the loop attacks navigation, which the incumbents structurally don't do.

**Moats, in order of durability:**

1. **Compounding learning data.** Every diagnostic, mission, mock, and — uniquely — *real exam result* trains the probability calibration. A competitor can copy the UI in a quarter; they cannot copy thousands of question-level→exam-outcome pairs. The data moat deepens with every sitting cycle.
2. **Recovery-run positioning.** Owning "the app for the retake" claims the segment incumbents are economically incapable of serving honestly — centres monetize retakes by reselling the course. Positioning moats survive feature-copying.
3. **Offline-first architecture** — expensive to retrofit, invisible until you need it, decisive in exactly our beachhead geographies.
4. **Structural price advantage** — a ~95% price gap vs. centres funded by 85%+ software margins; centres cannot follow without destroying their own model.

---

## 10. Financial Plan — 18-Month Model, 3 Scenarios

### Assumptions (all scenarios unless noted)

- **Blended ARPU $13.49/mo**, blended contribution **$11.53/mo** (assumes 70% Pro / 30% Beginner mix; annual plans treated at monthly-equivalent MRR)
- **Churn 8%/mo** on paying subscribers
- **CAC $30** per new paying subscriber (all variable marketing cost expressed through CAC)
- **Fixed stack $46/mo**; **founder compensation excluded** (see note below)
- Monthly cohort logic: `subs(t) = subs(t−1) × 0.92 + new(t)`; `new = signups × conversion`; `net cash = subs × $11.53 − $46 − new × $30`
- Signups/mo step up by launch phase (soft-launch → CIS → global), per scenario:

| Scenario | Conversion | Signups M1–3 | M4–6 | M7–12 | M13–18 |
|---|---|---|---|---|---|
| Conservative | 2.0% | 300 | 500 | 800 | 1,000 |
| Base | 2.5% | 500 | 1,000 | 1,500 | 2,500 |
| Upside | 3.0% | 800 | 2,000 | 3,500 | 6,000 |

### Scenario A — Conservative (2.0% conversion, slow signup ramp)

| Month | New paying | Subscribers | MRR | Net cash | Cumulative |
|---|---|---|---|---|---|
| 1 | 6 | 6 | $81 | −$157 | −$157 |
| 2 | 6 | 12 | $162 | −$88 | −$244 |
| 3 | 6 | 17 | $229 | −$30 | −$274 |
| 4 | 10 | 26 | $351 | −$46 | −$321 |
| 5 | 10 | 34 | $459 | +$46 | −$275 |
| 6 | 10 | 41 | $553 | +$127 | −$148 |
| 7 | 16 | 54 | $728 | +$97 | −$51 |
| 8 | 16 | 66 | $890 | +$235 | +$184 |
| 9 | 16 | 77 | $1,039 | +$362 | +$545 |
| 10 | 16 | 87 | $1,174 | +$477 | +$1,023 |
| 11 | 16 | 96 | $1,295 | +$581 | +$1,603 |
| 12 | 16 | 104 | $1,403 | +$673 | +$2,277 |
| 13 | 20 | 116 | $1,565 | +$691 | +$2,968 |
| 14 | 20 | 127 | $1,713 | +$818 | +$3,786 |
| 15 | 20 | 137 | $1,848 | +$934 | +$4,720 |
| 16 | 20 | 146 | $1,970 | +$1,037 | +$5,757 |
| 17 | 20 | 154 | $2,077 | +$1,130 | +$6,887 |
| 18 | 20 | 162 | $2,185 | +$1,222 | +$8,109 |

**Read:** even the pessimistic case is cash-positive from month 8 on operating basis, ending at **162 subs / $2.2k MRR (~$26k ARR)**. Max operating cash draw is a trivial **−$321**. This is the "no one shows up" floor — and it still doesn't burn money.

### Scenario B — Base (2.5% conversion, planned ramp)

| Month | New paying | Subscribers | MRR | Net cash | Cumulative |
|---|---|---|---|---|---|
| 1 | 13 | 13 | $175 | −$286 | −$286 |
| 2 | 13 | 25 | $337 | −$148 | −$434 |
| 3 | 13 | 36 | $486 | −$21 | −$455 |
| 4 | 25 | 58 | $782 | −$127 | −$582 |
| 5 | 25 | 78 | $1,052 | +$103 | −$479 |
| 6 | 25 | 97 | $1,309 | +$322 | −$156 |
| 7 | 38 | 127 | $1,713 | +$278 | +$122 |
| 8 | 38 | 155 | $2,091 | +$601 | +$723 |
| 9 | 38 | 181 | $2,442 | +$901 | +$1,624 |
| 10 | 38 | 205 | $2,765 | +$1,178 | +$2,802 |
| 11 | 38 | 227 | $3,062 | +$1,431 | +$4,233 |
| 12 | 38 | 247 | $3,332 | +$1,662 | +$5,895 |
| 13 | 63 | 290 | $3,912 | +$1,408 | +$7,303 |
| 14 | 63 | 330 | $4,452 | +$1,869 | +$9,172 |
| 15 | 63 | 367 | $4,951 | +$2,296 | +$11,467 |
| 16 | 63 | 401 | $5,409 | +$2,688 | +$14,155 |
| 17 | 63 | 432 | $5,828 | +$3,045 | +$17,200 |
| 18 | 63 | 460 | $6,205 | +$3,368 | +$20,567 |

**Read:** **460 subs / $6.2k MRR (~$74k ARR)** at month 18 — squarely inside the SOM estimate ($52–105k ARR), which is the internal consistency check. Operating breakeven month 5–7; cumulative positive from month 7.

### Scenario C — Upside (3.0% conversion, aggressive ramp + referral flywheel)

| Month | New paying | Subscribers | MRR | Net cash | Cumulative |
|---|---|---|---|---|---|
| 1 | 24 | 24 | $324 | −$489 | −$489 |
| 2 | 24 | 46 | $621 | −$236 | −$725 |
| 3 | 24 | 66 | $890 | −$5 | −$730 |
| 4 | 60 | 121 | $1,632 | −$451 | −$1,181 |
| 5 | 60 | 171 | $2,307 | +$126 | −$1,055 |
| 6 | 60 | 217 | $2,927 | +$656 | −$399 |
| 7 | 105 | 305 | $4,114 | +$321 | −$79 |
| 8 | 105 | 386 | $5,207 | +$1,255 | +$1,176 |
| 9 | 105 | 460 | $6,205 | +$2,108 | +$3,284 |
| 10 | 105 | 528 | $7,123 | +$2,892 | +$6,176 |
| 11 | 105 | 591 | $7,973 | +$3,618 | +$9,794 |
| 12 | 105 | 649 | $8,755 | +$4,287 | +$14,081 |
| 13 | 180 | 777 | $10,482 | +$3,513 | +$17,594 |
| 14 | 180 | 895 | $12,074 | +$4,873 | +$22,467 |
| 15 | 180 | 1,003 | $13,530 | +$6,119 | +$28,586 |
| 16 | 180 | 1,103 | $14,879 | +$7,272 | +$35,857 |
| 17 | 180 | 1,195 | $16,121 | +$8,332 | +$44,190 |
| 18 | 180 | 1,279 | $17,254 | +$9,301 | +$53,490 |

**Read:** **~1,280 subs / $17.3k MRR (~$207k ARR)** — requires Phase-3 global expansion working and the referral loop at ≥20% of acquisition. Signup volumes at M13+ (6,000/mo) imply meaningful global traffic; this is the ielts.gg-trajectory case.

### What the model deliberately excludes — and why the raise exists

The operating model above is near-breakeven almost immediately because contribution margins are 85%+ and fixed costs are $46/mo. **Excluded:** founder living costs, the content hire, and marketing experimentation *ahead of* proven CAC (testing budget burned on channels that get killed). Those are precisely what the pre-seed funds (§11): the raise buys **speed and depth**, not survival. Sensitivities: churn at 10%/mo cuts month-18 base-case subs by ~15% and LTV to $127 (LTV/CAC 4.2 — still healthy); CAC drifting to $53 pushes payback to 4.2 months and triggers the pre-committed channel kills before capital is wasted.

---

## 11. The Ask & Use of Funds

**Placeholder structure — founder to finalize amount, instrument (SAFE post-money suggested), and valuation before circulating.**

**Raising: $150,000–250,000 pre-seed · 18 months of runway.** Illustrative allocations:

| Use | Lean ($150k) | Full ($250k) | What it buys |
|---|---|---|---|
| Content depth (13 papers: original question banks, mock ladders, AI Examiner mark schemes) | $45k (30%) | $75k (30%) | The single biggest gap vs. Kaplan/BPP; includes **1 content hire** — an ACCA-qualified question author |
| Marketing experiments | $37.5k (25%) | $70k (28%) | ~1,200–2,300 paying users at $30 CAC *if* channels hold; governed by the $53 kill rule so failed channels cost test budgets, not the raise |
| Founder salary (modest) | $36k (24%) | $54k (22%) | Full-time focus |
| Infrastructure & AI headroom | $9k (6%) | $15k (6%) | Scale beyond the $46/mo stack; AI cost buffer above metering |
| Legal/accounting/ACCA-compliance review | $7.5k (5%) | $12k (5%) | Original-content IP hygiene, terms, entity |
| Reserve | $15k (10%) | $24k (9%) | |

**Milestones this buys (base case):** go-live complete (month 1) → 100 paying / channel CACs proven or killed (month 4–5) → 250+ paying, ≥$3.3k MRR, churn & conversion validated (month 12) → 450–1,300 paying, $6–17k MRR and a seed-ready dataset of exam-outcome-calibrated learning data (month 18).

---

## 12. Team

**Founder** — product vision, ACCA market knowledge, distribution, and full ownership of the operating loop (metrics cadence, channel kills, partnerships).

**The AI-co-founder workflow as structural efficiency:** the entire product — learning loop, pass-probability engine, AI Examiner, tutor, payments, analytics, the EN/RU landing — was designed and shipped by a single founder working with AI agents (Claude) as the engineering and content team. Concretely, this is why the numbers look the way they do:

- **The company reached "product fully built" at essentially zero payroll.** The pre-seed funds growth, not the roadmap catching up to the deck.
- **Fixed costs are $46/mo** — the model breaks even at 20 subscribers because there is no team to feed before product-market fit is proven.
- **Iteration speed is the operating advantage:** funnel fixes, new question content, and experiment variants ship in hours. In a 4-sittings-per-year market, learning-cycle speed compounds.

The funded plan adds exactly one human — an ACCA-qualified content author — because original, examiner-standard question depth is the one input where domain-credentialed human judgment is the bottleneck. Everything else stays on the AI-leveraged cost structure.

*(Investor-honest note: single-founder key-person risk is real and addressed in §13.)*

---

## 13. Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| **ACCA IP / trademark** — past-paper reproduction would be infringing; ACCA protects its marks | High | **All questions are original**, written to syllabus and examiner-report style, never copied from past papers. Nominative use of "ACCA" only; no affiliation claims anywhere (enforced in GTM copy rules). Budget line for legal review of content pipeline. Long-term option: explore ACCA content-partner/registered-provider routes once at scale. |
| **AI cost inflation** — per-user cost erodes the margin story | Medium | Usage metering is a pre-launch gate, not a later add. Hard review trigger at **$2.80/user/mo** (vs. $1.00 today). Planned model-mix change already cuts to ~$0.60; heavy tasks (Examiner marking) can be tiered or fair-use-capped inside Pro without touching headline pricing. |
| **Single founder** — key-person and bandwidth risk | High | The AI workflow reduces bus-factor on *code* (documented repo, reproducible agent workflow); the content hire adds a second domain brain; investor reporting cadence forces external accountability. Honest answer: this is partly what the raise de-risks, and a seed round would add a first engineering/growth hire. |
| **Competition** — Makon AI locally; Kaplan/BPP bolting AI onto their banks; new entrants | Medium | Move fast where incumbents structurally can't: closed loop calibrated on **real exam outcomes** (data moat compounds quarterly), retaker positioning (centres/publishers monetize retakes and can't adopt it honestly), offline-first, and a price floor their cost structures can't follow. Speed of iteration (§12) is the tactical edge. |
| **Churn above 8%** — exam-prep is inherently episodic (students leave after passing) | Medium | Full-qualification scope (13 papers ≈ multi-year journey, not one exam); annual-plan push (≥40% of new subs) smooths revenue; recovery-run re-engages the ~50% who don't pass; sensitivity at 10% churn still yields LTV/CAC 4.2. |
| **Beachhead too small / SOM estimate wrong** | Medium | UZ/CIS student-count assumption is validated in month 1 against ACCA statistics and channel audiences; Phase-3 global expansion is gated on metrics, not on beachhead saturation — the playbook, not the geography, is the asset. |
| **Payment rails in CIS** (cards, sanctions-adjacent friction for some geographies) | Low-Med | Paddle as merchant of record handles most rails; annual plans reduce transaction frequency; monitor decline rates as a dashboard metric from day 1. |
| **Go-live ops slip** (keys, metering, Paddle setup) | Low | Scoped and small; week-1 items in the 90-day plan with nothing downstream scheduled before completion. |

---

*Numbers herein are the authoritative planning figures as of 2026-07-08. Update on each monthly metrics review; the GTM companion doc carries the operational kill rules that protect these economics.*
