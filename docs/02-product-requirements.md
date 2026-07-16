# Scholify — Complete Product Requirements Document

**Version 1.0 · 2026-07-08 · Live at scholifyapp.com**

Scholify is an AI-powered ACCA exam-prep web app — "the learning OS for ACCA students." This document is grounded in the shipped code at `scholify-web/` (Vite + React + TS, Supabase, Paddle, Claude via Vercel functions). Every constant, formula and behaviour below is quoted from source, with the owning module named.

---

## 1. Product summary & personas

### 1.1 What Scholify is

One closed GPS loop per ACCA paper: **the student acts → the app measures → the learner model updates → the roadmap recalculates → the app hands over the next best task.** The loop is never "finished" until the paper is passed. A failed real sitting is a *recovery run* — import the mark, get an AI reflection, recalibrate the pass probability, rebuild the plan, retake — never a dead end.

The product reframe (from `src/lib/acca-diagnostic.ts` header): instead of "here are 2,000 questions," Scholify says *"based on this assessment you have a 68% chance of passing FM — here's how we get you to 85%."*

**Language rule (product-wide, enforced in copy):** never "you failed." The canonical phrasing, verbatim from `acca-loop.ts` / `ExamDayFlow.tsx`: **"You now know exactly where the marks were lost."**

### 1.2 Scope of coverage

- **All 15 ACCA papers** (13 exams count toward the qualification — Options capped at 2 of 4), from BT to AAA, defined in `src/lib/acca-qualification.ts` (`ALL_PAPERS`, `paperLevels()`, `qualificationProgress()`).
- **Curated objective-test banks for 9 papers** (`src/lib/acca-content.ts`, 117 questions): FA 29 · FR 15 · TX 13 · BT/MA/LW/PM/AA/FM 10 each. Papers without a bank are practisable via AI generation (`hasCuratedContent()` in `acca.ts` gates the UI).
- **70 flashcards** across 11 papers (`src/lib/acca-flashcards.ts`).
- **18 written (constructed-response) questions** with marking rubrics for FR, SBR and SBL (`src/lib/acca-written.ts`) — the AI Examiner's bank.
- **Non-exam requirements** tracked: EPSM status + PER (36 months, 9 performance objectives: 5 Essentials + 4 Technical) in `src/lib/acca-journey.ts`.

### 1.3 Personas

| Persona | Profile | Product answer |
|---|---|---|
| **First-paper beginner** ("New to accounting" in onboarding, `EXPERIENCE_OPTIONS` in `acca-profile.ts`) | Starting at Applied Knowledge (BT/MA/FA); intimidated, doesn't know what to study first. | Onboarding wizard picks the paper, the diagnostic sets a baseline, the Study Path walks topics in order, today's plan removes all choice. Lara explains "from first principles, avoid assumed jargon" (`experienceLine()`). |
| **Working professional** ("Working in finance") | Time-poor; studies 25–40 min/day; needs efficiency, not volume. | Shield time (protected daily slot, `PaperPlan.studyTime`), daily-minutes commitment mapped to a question goal (60m→30q, 40m→22, 25m→15, 15m→10 — `AccaOnboarding.finish()`), adaptive weak-first drills, pace-vs-90s-budget analytics. Lara focuses "on exam technique over basic concepts." |
| **Retaker** (failed a real sitting) | Demoralised; needs a credible path back, not a guilt trip. | The recovery run: mark import → emotional-support-first reflection (`ExamDayFlow.Reflection`) → AI examiner analysis (`PostMortemPanel`, kind="exam") → recalibrated pass probability (`recoveryState()` weighting) → new date → rebuilt roadmap. Every answer "earns the number back." |

Onboarding also supports the **mid-qualification joiner**: step 1 self-reports passed exams (the "myACCA record", `setPassedPapers()`), so a student arriving with 6 passes starts at the right level.

---

## 2. The Loop — master journey as a state machine

The loop is owned by `src/lib/acca-loop.ts` and rendered by `getJourneyStages()` (JourneyMap + LoopStrip). Exactly one stage is `current`; earlier stages are `done`; gated stages ahead are `locked`.

### 2.1 Constants (single source of truth)

| Constant | Value | Where | Meaning |
|---|---|---|---|
| `MOCK_GATE` | **60** | `acca-loop.ts` | Pass probability (%) that unlocks the mock exam room. |
| `MOCK_PASS` | **50** | `acca-loop.ts` | ACCA pass line applied to mocks and to the real exam. |
| `MOCKS_REQUIRED` | **3** | `acca-loop.ts` | Mock 1 → Mock 2 → Mock 3 before the real sitting. |
| `TOPIC_PASS` | **0.65** | `acca-topics.ts` | Knowledge-check score to master a topic (gated above ACCA's 50%). |
| `TOPIC_TEST_SIZE` | **6** | `acca-topics.ts` | Questions in a knowledge check. |
| `SESSION_SIZE` | **8** | `AccaStudy.tsx` | Questions per practice session. |
| Mock shape | **the paper's official CBE blueprint** | `acca-cbe-mock.ts` | The mock IS the full sitting (Sections A→B→C); clock = `examSecondsFor(paper, composedMarks)` at official min/mark. See the CBE addendum. |
| `MOCK_SECONDS_PER_Q` | **90** | `AccaStudy.tsx` | Topic knowledge-check timer (per question). |
| `QUESTION_BUDGET_SEC` | **90** | `acca-analytics.ts` | Per-question exam pace budget (rushed < 30s, on-pace ≤ 90s, overtime > 90s). |
| `DEFAULT_DAILY_GOAL` | **15** | `acca.ts` | Questions/day (user-set 1–100; presets 10/15/20/30). |
| `MAX_QUESTIONS` (diagnostic) | **20** | `acca-diagnostic.ts` | Hard cap, ~15–20 min. `PER_AREA = 3` sampled per syllabus area. |
| `TARGET_AREA_SCORE` | **0.7** | `acca-diagnostic.ts` | Counterfactual coaching target for weak areas. |

### 2.2 Stages, entry and exit criteria

Stage keys and status derivations are verbatim from `getJourneyStages(paperId)`:

1. **AI onboarding** (`onboarding`) — always `done` once the wizard finishes (`isAccaOnboarded()` flag `scholify-acca-onboarded`). Entry: first visit to `/study`; `/dashboard` redirects un-onboarded users to `/study` (`Dashboard.tsx`). Exit: paper(s) picked, exam date + shield time + experience captured.
2. **Initial diagnostic** (`diagnostic`) — `done` when a formal diagnostic exists **or** ≥ 5 questions answered (`diagnosed = Boolean(diag) || stats.answered >= 5`). Until then it is `current` and `buildTodayPlan()` returns *only* the diagnostic task.
3. **Personalised roadmap** (`roadmap`) — `done` when an exam date is set or the learner is diagnosed. With a date, `generateStudyPlan()` splits the days into 4 phases (45/25/15/15); without one, pacing is by mastery.
4. **Today's mission** (`missions`) — `current` from diagnosis until the mock gate opens. Daily plan of max 3 tasks (`buildTodayPlan()`), each deep-linkable.
5. **Progress check — pass probability** (`progress`) — the single number, `passProbability(paperId)`. `current` alongside missions until the gate; fork copy: below 60% "it's revision: I keep adjusting your plan at your weak topics", at/above 60% the mock room unlocks.
6. **Mock 1 → Mock 2 → Mock 3** (`mock`) — `locked` until `mockGate().unlocked`; `current` until `mockProgress().examReady`. **Gate rule:** unlocked when `prob ≥ MOCK_GATE` **or any mock already exists** — once opened it never re-locks, so the fail → post-mortem → retry path can always reach "retry." **Exam-ready rule:** `attempts ≥ 3 && latestPassed` (a fail anywhere routes through rehabilitation: post-mortem → drills → retry; only the latest mock passing counts).
7. **Real ACCA exam** (`exam`) — `current` when exam-ready. `examDayDue()` fires the "how did it go?" flow once `plan.examDate ≤ today` with no outcome recorded for that sitting and no active snooze (snooze = 3 days, `snoozeExamPrompt()`).
8. **Recovery run — the retake** (`recovery`, conditional) — inserted and forced `current` while `recoveryState().active` (latest real outcome is a fail; ends when the next real outcome replaces it). Tracks `answeredSince`, `mocksSince`, and `provenAgain` (a fresh mock ≥ 50% since the fail).
9. **Celebrate / the loop continues** (`next`) — `current` after a pass: `completePaper()` records the outcome, adds to `passedPapers`, retires the paper from `studyingPapers`; the celebration screen offers `suggestedNextPapers()` and `startNextPaper()` restarts the loop.

### 2.3 The pass-probability read (the one number)

`passProbability(paperId)` (`acca-loop.ts`) is the canonical read used identically by Dashboard, Study overview, Analytics, JourneyMap and the Continue card:

1. Base = live estimate from cumulative practice (`estimateFromPractice()`) if any practice exists, else the latest formal diagnostic, else `null`.
2. **Real-exam recalibration** during a recovery run: the real mark maps to `examProb = clamp(5, 90, 50 + (score − 50) × 2)`; an unshared mark reads as **35** (a near-miss). Blend weight `w = max(0, 0.65 − answeredSince/400)` — exam evidence starts at 65% and washes out over ~260 answers. Recovery work literally earns the number back.

### 2.4 The four-phase method

`METHOD_PHASES` (`acca-plan.ts`): **Learn (45%) → Strengthen (25%) → Revise (15%) → Rehearse (15%)** of the runway. `currentPhase()` is mastery-driven, not calendar-driven — except ≤ 14 days to the exam always forces Rehearse. Rules: `answered < 20 || coverage < 0.85` → Learn; any area with `seen ≥ 2 && accuracy < 0.6` → Strengthen; `readiness < 75` → Revise; else Rehearse. `generateStudyPlan()` also sets a suggested daily target from days remaining: > 60d → 12/day, > 30d → 18, > 14d → 25, else 30.

### 2.5 Today's plan (the "no choosing" moment)

`buildTodayPlan(paperId)` (`acca-today.ts`), max 3 tasks, strict priority:

1. **No baseline** (`!diag && answered < 5`) → the diagnostic task, alone.
2. **Strengthen the weakest area** (from the live/diagnostic estimate). During recovery, retitled "Recover the marks in {area}".
3. **Flashcards** when `flashcardStats().due > 0`.
4. **Mock** when `mockGate().unlocked && answered ≥ 20` (during recovery, "Prove it again — fresh timed mock" until `provenAgain`); otherwise **Practice** as filler when fewer than 2 tasks exist.

`MISSION_MINUTES`: diagnostic 15 · weak 25 · practice 20 · flashcards 12 · mock 30. `greeting(name)` is time-of-day aware; `todayHeadline()` is the evidence-tied line ("You're at 43% to pass FR. Finish today's plan to push it higher." / retake variant).

---

## 3. Feature requirements per screen

Routes (`src/App.tsx`): `/` (landing) · `/pricing` · `/privacy` · `/terms` · `/support` · `/sign-in` · `/sign-up` · `/auth/callback` · `/auth/google/calendar` · protected: `/dashboard` · `/study` · `/study/diagnostic` · `/study/analytics` (`/study/progress` redirects there) · `/settings`. Unknown paths → `/dashboard`.

### 3.1 `/dashboard` — the command centre (`src/pages/Dashboard.tsx`)

**Purpose:** one glance answers "where am I, and what's the one thing to do next?" A briefing, not a report.

**Data displayed** (functions): `greeting()`, `todayHeadline()`, `passProbability()` + `passBand()` in a `RingGauge` (target tick at `MOCK_PASS`), `probabilityMomentum()` delta line, `daysUntilExam()` + `currentPhase()` in the dark countdown card, `recoveryState()` (retake-run card variant), `buildTodayPlan()` (① hero CTA + ②③ quiet rows), vitals: `getTodayStats()` (streak + daily goal), `getDailyActivity(7)` week dots, `palestArea()` (weakest topic, tap → drill), `mockGate()`/`mockProgress()`/`getMockHistory()` (Mock 1·2·3 chips or gate progress), footer: plan badge (Pro / upgrade link), `flashcardStats().due`, `qualificationProgress()` bar.

**User actions:** Start now (`/study?do={action}`), drill weakest (`/study?do=weak`), mock room (`/study?do=mock`), clear cards (`/study?do=flashcards`), full analytics, pricing.

**States:**
- *Not onboarded* → `<Navigate to="/study" />` (the loop starts at onboarding, never a default "FA").
- *No diagnostic* (`prob === null`) → single "Find out your pass probability" CTA card; nothing else competes. Subcopy: "~15 min · no score counts against you."
- *Exam day* (`examDayDue()`) → `ExamDayFlow` replaces the hero.
- *Recovery run* → dark card switches to "Retake run" copy with `answeredSince` / `provenAgain` progress.
- *Normal* → hero ring + countdown + next action + vitals + footer strip.

**Instrumentation:** `snapshotProbability(paperId)` on load (feeds Pass Momentum™).

**Acceptance criteria:** exactly one gradient CTA on screen; the probability shown equals `passProbability()` everywhere; un-onboarded users can never see the dashboard; every vital is tappable into the corresponding task or clearly inert.

### 3.2 `/study` — the loop cockpit (`src/pages/AccaStudy.tsx`, ~2,000 lines)

A single stateful page with modes: `onboarding | picker | overview | topic | session | examiner | flashcards | generate | results | journey`.

**Deep links:** `/study?do=weak|practice|mock|flashcards|diagnostic` land *inside* the task (weak → `buildAdaptiveSession`, practice → `buildSession`, mock → gated `startSession(false, true)`, flashcards → mode, diagnostic → navigate `/study/diagnostic`). `?upgraded=true` (Paddle return) strips the param, toasts "Payment received — welcome aboard! Unlocking Pro…", and refreshes the Supabase session with up to 4 retries × 4s until the webhook-written plan appears.

**Cloud sync:** on mount, `syncAccaProgress()` reconciles local vs cloud (monotonic `answered` counter decides the winner); every answer queues a debounced push (`queueAccaProgressPush()`, 2.5s).

#### 3.2.a Onboarding — `/welcome` (`Welcome.tsx`, replaced the in-/study wizard 2026-07-09)

Full-screen, swipeable (drag / ← → keys / buttons), branded backdrop, top progress bar. Six slides: **0** Hero — mark + first-name greeting + the loop as waypoint chips (Diagnostic → Daily missions → 3 mocks → Pass) · **1** Target paper — full 13-paper grid grouped by level, single-select, expandable "I've already passed some papers" multi-mark · **2** Daily time — 15/25/40/60 min + daily slot (default 19:00) · **3** Exam date — **exam-logic aware**: BT·MA·FA·LW are on-demand CBEs → date picker; every other paper → the next 3 real quarterly sittings (Mar/Jun/Sep/Dec, exam week = first full Mon–Fri week, computed in `nextSittings()`); skippable → mastery-paced · **4** Goal — `GOAL_OPTIONS` (first-pass / recovery / level / career; career also sets experience "professional") · **5** Ready — answers summary; **primary exit = "Find my pass probability" → `/study/diagnostic?next=paywall`** (day-one activation); ghost skip → `/dashboard`.

**Funnel:** diagnostic results (when `?next=paywall`) → Continue opens the trial `PaywallModal` (type "general") → close → `/dashboard`, where `SetupStrip` pins the onboarding answers (paper · daily · exam · goal, Edit → Settings).

**Exit writes:** `setPassedPapers`, `setStudyingPapers`, `setGoal`, per-paper `setPlan({examDate, studyTime, dailyMinutes, dailyGoal})`, `setDailyGoal(questionsPerDay)` where minutes → questions: 60→30, 40→22, 25→15, else 10; `markAccaOnboarded()`.

**Acceptance:** cannot pass slide 1 without a paper or slide 4 without a goal; flow shows exactly once (`/welcome` self-redirects when onboarded; `/dashboard` + `/study` redirect un-onboarded users to `/welcome`); the committed minutes ARE the daily-goal meter across Dashboard/Analytics/Settings.

#### 3.2.b Picker ("Your journey")

All 15 papers grouped by level (`paperLevels()`), each row shows readiness % when practised, "STUDYING"/"BANK"/passed states. Above it: capability chips, `JourneyBar` (qualification % of 13), `TodayCard` (daily-goal ring + streak + shield time), `ContinueCards` (per studying paper: mission title, phase badge, days-to-exam, canonical `passProbability() ?? readiness`), and curated **Official ACCA news** links (with the independence disclaimer).

#### 3.2.c Paper overview — the loop home

Ordered blocks, top to bottom:

1. **LoopStrip** — "YOU ARE HERE · {paper} LOOP": all `getJourneyStages()` as a compact icon strip; tap → journey map.
2. **ExamDayFlow** when `examDayDue()` (see 3.2.i).
3. **Retake-run banner** when `recoveryState().active` (amber-edged, `provenAgain` badge).
4. **AI Study OS card** — `greeting(firstName)`, `todayHeadline()`, "TODAY'S PLAN · THE PLAN ALREADY CHOSE FOR YOU", numbered ①②③ tasks with `~{MISSION_MINUTES}` and a START pill on task ①; right meta shows `getTodayStats()` ("goal met" / "n/goal today").
5. **Progress check stats** — three `StatCard`s: band + probability (footnote "live from your practice" / "readiness from coverage" / "start practising to measure"), Accuracy (`stats.correct/answered`), Answered (+ `% of the bank seen` from `coverage`).
6. **Diagnostic CTA row** — latest `passProbability` chip + `passBand` label, or the un-diagnosed "What's your chance of passing?" gradient variant.
7. **MethodTracker** — the 4-phase stepper with `currentPhase()` active and the phase's tutor-sentence goal.
8. **Journey-loop row** — "You are here: {currentStage().label}".
9. **Exam date card** — date input; writes `setPlan({examDate})`; countdown copy ("That's today — good luck!").
10. **YOUR PLAN** — `generateStudyPlan()` phases with date ranges when a date exists.
11. **COACH'S NOTES** — `getRecommendations()`: start / weak-area (seen ≥ 2, accuracy < 60%) / coverage (< 60%) / ready (readiness ≥ 75).
12. **Study rooms** grouped by method purpose: *Learn & practise* (Practice · 8 questions; Target my weak areas once history exists — primary highlight follows the phase), *Strengthen & revise* (Flashcards with due/mastered counts; Custom practice — Pro), *Exam room* (Mock tile "Mock n of 3" when unlocked / `MockGateTile` when locked — shows `prob/60%` progress bar and routes to the weak-area drill; AI Examiner — Pro, with written-question count).
13. **Recent mocks** — `TrendBars` vs the 50% pass line (when ≥ 2 mocks) + last 5 receipts with `MeterBar`s.
14. **Study path** (curated papers) — `getStudyPath()` topic nodes: mastered (green ✓ + best %), in-progress, available ("Up next — start here"), upcoming (dimmed, still tappable — "we guide, we don't imprison"); header shows `pathProgress()` mastered/total.

**Non-curated papers:** Learn & practise is replaced by Custom practice (Pro) plus an honest "bank on the way" note; the study path hides.

#### 3.2.d Topic hub (`topic` mode)

Per syllabus area: stats row (answered, accuracy, best check vs the 65% bar) and the three-step topic loop — **1 · LEARN** (area-filtered practice, 8 questions) → **2 · MEMORISE** (topic flashcards) → **3 · PROVE IT** (knowledge check: `TOPIC_TEST_SIZE = 6`, timed, no hints, `TOPIC_PASS = 65%` to master; unlimited retakes, best score counts, `recordTopicTest()` stamps `masteredAt` for velocity).

#### 3.2.e Session (practice / mock / knowledge check)

One question at a time (`SessionView`): progress bar, area chip (practice) or countdown (mock, red under 60s). Question types from `acca-content.ts`: `mcq`, `multi`, `number` (numeric compare with tolerance, default ±0.01 — `gradeQuestion()`).

- **Practice:** Check answer → inline explanation (green/red panel) → **Ask Lara** tutor (TutorPanel) → Next. Optional pre-submit **confidence mark** ("How sure are you?" Sure/Not sure → `recordConfidence()`); on a miss, one-tap **mistake tag** (knowledge · misread · time · slip → `recordMistake()`; untagged misses default to `knowledge` on Next). Every answer records timing (`recordAnswerTiming()`, clamped 1–600s) and progress (`recordAnswer()` → streak/daily/area stores) and queues a cloud push.
- **Mock / knowledge check:** timed, silent grading, no explanations or hints; timer expiry force-finishes and tags the unanswered remainder as `time` mistakes. Adaptive selection for weak-first drills: `buildAdaptiveSession()` ranks by `areaWeakness×2 + difficultyMatch + familiarity` (unseen area = 0.6 weakness; target difficulty easy < 45% / medium < 70% / hard ≥ 70%; unseen question 1.0 > previously-wrong 0.8 > mastered 0.25) with seeded jitter.

**Acceptance:** instrumentation never blocks the flow; exiting a session returns to topic/overview and refreshes stats; the mock room is unreachable for free users (paywall) and for anyone under the gate (toast quotes the exact numbers).

#### 3.2.f Results

`RingGauge` vs the relevant pass line (65% topic check / 50% mock / 50% reference for practice), `correct/total`, per-area `BreakdownList` from the session log (worst first). Mode-specific:
- **Mock failed** → `PostMortemPanel` (kind "mock"): Lara's post-mortem — headline, analysis, "WHERE THE MARKS WENT" (2–3 worst areas), 3-step **REHABILITATION PLAN** whose steps are live buttons (`weak|practice|flashcards|mock`, always ending in mock = the retry). Offline/keyless fallback is deterministic from area scores.
- **Mock passed** → sequence card: "Mock n of 3 passed… sit the next one in 2–3 days" or "sequence complete — the real sitting is next; keep a mock every 2–3 days."
- **Knowledge check** → "topic mastered!" or "You need 65% to master {topic}. Practise it once more, then retake."
- Mock trend `TrendBars` when ≥ 2 attempts. CTAs: New mock / Practise again + back to overview.

#### 3.2.g Flashcards (`FlashcardsView.tsx`)

Leitner SRS (`acca-flashcards.ts`): boxes with intervals **[0, 1, 3, 7, 16, 35] days**; known → +1 box, unknown → back to box 1; mastered = box ≥ 4; new cards are due immediately. Tap to flip; swipe right = got it / left = review again (buttons mirror). With an `area`, reviews that topic's whole deck; without, today's due cards. Done state: "n cards reviewed" / "All caught up!"

#### 3.2.h AI Examiner (`ExaminerView.tsx`) — Pro

Pick a written question (topic + max marks) → write the answer (word count shown) → "Mark my answer" → `markAnswer()` (`/api/lara?action=acca-examiner`) returns marks / maxMarks, % vs "Pass standard" at 50%, examiner feedback, and per-rubric-point hit/missed rows. Keyless fallback: keyword-based marking flagged "Demo marking (no live AI key connected)". Try-again resets.

#### 3.2.i Exam day flow (`ExamDayFlow.tsx`)

Stages `ask → import → celebrate | reflect`:
- **Ask:** "Your {paper} exam day has arrived… How did it go?" → *I passed* / *Not this time* / snooze ("Results aren't out yet", 3 days).
- **Pass → Celebrate:** confetti (brand colors), "{paper} — PASSED", updated qualification bar, "NEXT PAPER UNLOCKED — RESTART THE LOOP" with `suggestedNextPapers()` (max 4) or the final "you're through every exam" state.
- **Fail → Import:** log the real mark 0–100 ("it sharpens every step of the recovery plan"; skippable). → **Reflect:** emotional support **first** ("This one stung. Let it. A failed sitting is an event, not a verdict…"), mock-average comparison, the **recalibrated pass probability** ring with the exam evidence explained, `PostMortemPanel` (kind "exam", "THE COMEBACK PLAN"), then retake-date picker (~3/~6 months or exact) → "Rebuild my roadmap — back into the loop" (or continue dateless, mastery-paced).

#### 3.2.j Custom practice (`GenerateView.tsx`) — Pro

By-topic or from-pasted-notes (≥ 20 chars) MCQ generation, count 3/5/8, via `generateQuestions()` (`acca-generate`). Valid questions (4 options, valid index) start a normal practice session with ids `gen-*` — **excluded from coverage** so AI questions can't inflate readiness (`getPaperStats()`). Failure reasons surface honestly: `missing_anthropic_key` → "needs a live AI key…", else "Try a clearer topic or shorter notes."

### 3.3 `/study/diagnostic` — pass-probability diagnostic (`AccaDiagnostic.tsx`)

Phases `intro → assessing → analyzing → results`.

- **Intro:** paper select (curated papers only), prior result chip (cloud-refreshed via `fetchLatestDiagnostic()`), promise copy: "~16–20 questions. No streaks, no hints. At the end you get a pass probability, an estimated exam score, your weakest areas, and the exact lift that gets you over the line."
- **Assessing:** `buildDiagnostic()` — up to 3 per area, difficulty-spread (medium→easy→hard round-robin), max 20, seeded shuffle. Answers also feed the practice store (`recordAnswer`) — the diagnostic is real practice.
- **Analyzing:** 1.6s scoring beat ("Weighting by difficulty, mapping your syllabus areas…"), then `scoreDiagnostic()`, `persistDiagnostic()` (local + Supabase `acca_diagnostics` insert) and a progress push.
- **Results:** `RingGauge` (pass probability, target tick 50) + band + estimated score; **YOUR FASTEST PATH** counterfactual ("Get {two weakest areas} up to 70% and your pass chance rises from X% to Y%"); weakest/strongest `BreakdownList`s (up to 3 each with `correct/seen`); confidence caveat when syllabus coverage < 100%. CTAs: Start closing the gap → `/study`; See full progress; Retake.

### 3.4 `/study/analytics` — 4-tab analytics (`AccaAnalytics.tsx`)

Tabs (each with its question): **📈 Progress — Am I going to pass?** · **🧠 Learning — What do I actually know?** · **📚 Study — What do I do today?** · **🎯 Exam — Am I exam-ready?** Paper switcher appears when studying 2 papers. Every new signal starts from zero with an honest "Measuring" empty state.

**Progress:** hero `RingGauge` (`passProbability`, 188px, target tick at 50) with recovery-aware copy ("X points above/below the line…"); estimated exam score `MeterBar` with pass-line tick and "based on N answers across M% of the syllabus"; **Pass Momentum™** (`probabilityMomentum()` — Δpts vs the closest snapshot ≥ 5 days old, 14-day sparkline with carry-forward, dips normalised: "normal while drilling new weak areas"); **Mastery score** (`masteryScore()` — per-topic `max(accuracy, best check)`, avg ×100, count at 80%+); **Qualification block** (tap-to-toggle passed papers, EPSM 3-state selector, PER steppers 0–36 months / 0–9 objectives). No-probability state: one diagnostic CTA card.

**Learning:** **Knowledge heatmap** — one tile per syllabus area on a single red ramp `rgba(200,0,0, 0.12 + 0.78 × accuracy)`, unpractised = neutral, with legend and `palestArea()` callout ("your palest band… that's where the marks are hiding"); **Weak topics** (worst-first `BreakdownList` vs pass line 50, max 5); **Forgetting risk** (`forgettingRisk()` — mastered topics untouched ≥ 7 days, "last touched Nd ago", flashcard nudge); **Learning velocity** (`learningVelocity()` — topics mastered this week vs last from `masteredAt`); **Confidence calibration** (`getCalibration()` — needs ≥ 10 tagged answers; claimed-sure % vs delivered-when-sure %, gap verdicts: > +10 overconfident, < −10 "better than you think", else "well calibrated").

**Study:** **Daily mission** (same `buildTodayPlan()`, steps deep-link); **Daily goal** (`getTodayStats()` meter + presets 10/15/20/30 → `setDailyGoal`); **Streak** (+ 7-day dots); **Study time** (`studyMinutesToday()` vs `plan.dailyMinutes` target); **Revision queue** (due cards + "Clear the queue"); **Topic completion** (`pathProgress()` + segmented per-topic strip); **Last 35 days** activity heatmap (`getDailyActivity(35)`).

**Exam:** **Mock trends** (`TrendBars` vs 50, best chip; needs ≥ 2); **Exam countdown** dark card (days + phase strip, or "No sitting booked yet"); **Mistake analysis** (`getMistakes()` — knowledge/misread/time/slip shares, worst first); **Time management** (`getPace()` — avg s vs 90s budget, headroom/over verdict, rushed/on-pace/overtime distribution bar); **Real exam history** (`getExamOutcomes()` chips — Passed / mark / "Retake run", plus the dashed "This is the one" chip for the booked retake).

**Acceptance:** every metric reads against a target (pass line, budget, goal); no metric ever fabricates data — all degrade to `Measuring` copy naming the action that starts the signal.

### 3.5 `/settings` (`Settings.tsx`)

Sections: profile card; **plan & billing** (current plan, upgrade, cancel-plan confirm dialog); **Exam setup** (exam date, shield time, daily minutes, daily goal — same stores as onboarding); **Notifications** (study reminders); **Invite Friends** (referral); **Retention (admin)**; **Privacy**; **Appearance** (light default / dark toggle via `html[data-theme]`); **Data & Privacy** (reset all progress + delete account confirm dialogs).

### 3.6 Landing `/` and `/pricing`

Landing (`Landing.tsx`, ~2,000 lines): pinned design, ACCA-pivot copy, EN/RU via `LanguageProvider` (`t()`, ~580 translated strings in `src/i18n/translations.ts`), 3D tilt cards (`landing-3d.tsx`). Pricing: see §5.

---

## 4. The learner model & metrics glossary

All localStorage-first (keys prefixed `scholify-acca-*`), synced per §7. Formulas verbatim from source.

### 4.1 Diagnostic / pass-probability model (`acca-diagnostic.ts`)

An "honest heuristic, not a black box":

| Step | Formula |
|---|---|
| Difficulty weighting | correct-answer evidence weights: easy **0.8**, medium **1.0**, hard **1.3** |
| Area score (diagnostic) | `(weightedCorrect + ALPHA·PRIOR) / (weightedSum + ALPHA)` with `PRIOR = 0.5`, `ALPHA = 1.5` (Bayesian shrinkage toward the pass line — a lucky 1/1 can't read as mastery) |
| Area score (live practice) | same shrinkage on raw `seen/correct` counts (`areaScoreFromCounts`) |
| Band | weak < 0.5 ≤ moderate < 0.7 ≤ strong |
| Coverage confidence | `assessedAreas / totalAreas` |
| Overall competence | `mean(assessedScores) × confidence + 0.5 × (1 − confidence)` — thin coverage regresses to neutral |
| Estimated exam score | `round(competence × 100)` |
| **Pass probability** | logistic map centred on the 50% pass mark: `100 / (1 + e^(−0.11·(score − 50)))` — score 60 → ~75%, 70 → ~90%, 40 → ~25% |
| Counterfactual target | lift the 2 weakest areas to `TARGET_AREA_SCORE = 0.7`, recompute → `projectedPassProbability` (never below current) |
| UI bands (`passBand`) | ≥ 70 "On track to pass" green · ≥ 45 "On the borderline" amber · > 0 "Not ready yet" red · 0 "Take the diagnostic" grey |

`learnerProfileSummary(paperId)` compiles experience line + latest diagnostic + weakest live-practice areas (seen ≥ 2, accuracy < 70%) into the prompt context that makes Lara stateful.

### 4.2 Practice stats (`acca.ts`)

- **Accuracy** = correct/answered (per paper and per area).
- **Coverage** = distinct seed-bank questions attempted / bank size (AI `gen-*` ids excluded; capped at 1).
- **Readiness** = `round(accuracy × 70 + coverage × 30)` — "a high score with thin coverage can't fake ready." Bands (`readinessBand`): ≥ 75 On track · ≥ 50 Getting there · > 0 Early days · 0 Not started.
- **Streak** = consecutive calendar days with a recorded answer; daily/dailyCorrect maps kept ~120 days.
- **Week comparison** (`getWeekComparison`) — answered & accuracy deltas, last 7 vs prior 7 days (feeds Dashboard delta chips).
- **Mocks** (`recordMock`/`getMockHistory`) — last 20 per paper, `{date, correct, total, percent}`.

### 4.3 Analytics signals (`acca-analytics.ts`)

| Metric | Source & formula |
|---|---|
| **Pass Momentum™** | `snapshotProbability()` writes a daily probability snapshot (kept 90 days) on overview/dashboard load and session finish; `probabilityMomentum()` = current − closest snapshot ≥ 5 days old; 14-day carry-forward series for the sparkline. |
| **Pace / study time** | `recordAnswerTiming()` per answer (clamped 1–600s): rushed < 30s, on-pace ≤ 90s, overtime > 90s vs `QUESTION_BUDGET_SEC = 90`; daily seconds kept 60 days → `studyMinutesToday()`. |
| **Mistake analysis** | `recordMistake()` tags `knowledge · misread · time · slip`; `getMistakes()` returns counts + shares, worst first. Timer-expired mock questions auto-tag `time`; untagged practice misses default `knowledge`. |
| **Confidence calibration** | `recordConfidence(sure, correct)`; `getCalibration()` requires ≥ 10 tagged: claimed = %sure, deliveredWhenSure, gapPts = claimed − delivered (positive = overconfident). |
| **Mastery score** | per study-path topic `max(practice accuracy, best knowledge check)`; score = avg × 100; strong = topics ≥ 0.8. |
| **Learning velocity** | mastered-topic counts by `masteredAt` age: ≤ 7d = this week, ≤ 14d = last week. |
| **Forgetting risk** | mastered topics with `lastAt` ≥ 7 days ago, sorted stalest-first. |
| **Palest area** | lowest-accuracy practised area (heatmap callout + Dashboard weakest tile). |

### 4.4 Topics & qualification

- **Topic mastery** (`acca-topics.ts`): knowledge check ≥ `TOPIC_PASS (0.65)` masters a topic permanently; states mastered / in-progress / available (first untouched) / upcoming.
- **Qualification progress** (`acca-qualification.ts`): counted passes = non-options + `min(2, optionsPassed)`, out of **13**; `suggestedNextPapers()` = earliest level with unpassed papers; concurrent studying capped at **2** papers.
- **EPSM/PER** (`acca-journey.ts`): EPSM not_started/in_progress/complete; PER clamped 0–36 months and 0–9 objectives; `perComplete()` when both maxed.

---

## 5. Monetization requirements

### 5.1 Tiers (as shipped in `Pricing.tsx`)

| Tier | Price | Key entitlements |
|---|---|---|
| **Free (7-day trial)** | $0, no card | Curated banks (9 papers), practice + instant marking + explanations, SRS flashcards, study plan + readiness, limited Lara, streaks/goals, full roadmap |
| **Beginner** | $9.99/mo · annual $6.67/mo ($79.99/yr) | + unlimited practice, weak-area targeting, per-area analytics, heatmap/dashboard, leaderboard, reminders, countdown & phased plan, EPSM+PER tracker |
| **Pro** | $14.99/mo · **Annual Pro $119.99/yr (= $10.00/mo, "Save 33%")** | + timed mocks, AI Examiner, custom practice from topic/notes, unlimited Lara, mock history & pass-line tracking, Google Calendar sync, EN & RU, priority AI |

Positioning line: **"Cheaper than one tutoring hour."** All plans carry the 7-day trial; after it, unpaid accounts drop to free with all progress retained (FAQ). Cancel anytime from Settings.

### 5.2 Feature gates (enforced in `AccaStudy.tsx`)

`isPro = user.user_metadata.plan && plan !== "free"`. Pro-gated actions — **mock exams** (`startSession(_, true)`), **AI Examiner** (`openExaminer`), **custom generation** (`openGenerate`) — call `triggerFeaturePaywall()` for free users. The mock tile also carries the *skill* gate (§2.2) which applies to everyone: probability gate first (toast with exact numbers), paywall second.

### 5.3 Paywall triggers (`src/hooks/usePaywall.ts`)

- **Streak milestones:** first time streak reaches **7 / 14 / 21** days on dashboard load, highest unseen milestone wins; shown once each (localStorage flags `scholify-paywall-shown-{n}` + best-effort Supabase `streaks.paywall_shown_at_{n}`).
- **Feature taps** (type `feature`) and generic upgrades (type `general`).
- Every show/dismiss emits `trackEvent("paywall_shown"/"paywall_dismissed")` with the trigger.

### 5.4 Checkout & entitlement chain

1. `openCheckout(priceId, email, userId)` (`src/lib/paddle.ts`) opens the Paddle Billing overlay with `customData.userId` and `successUrl = /study?upgraded=true`. Missing token/price → returns false → "Checkout is being set up — coming soon ✦".
2. The Paddle **webhook** (`api/paddle.ts`) writes the plan onto the Supabase user's metadata server-side (Paddle is merchant of record).
3. Back on `/study?upgraded=true`, the client refreshes the session (4 retries × 4s) until `user_metadata.plan !== "free"`, since the webhook can lag the redirect.

Price ids via env: `VITE_PADDLE_TOKEN`, `VITE_PADDLE_BEGINNER_MONTHLY`, `VITE_PADDLE_PRO_MONTHLY`, `VITE_PADDLE_ANNUAL_PRO`.

---

## 6. Internationalisation rules

- **Landing (and public marketing surfaces) are EN/RU.** `LanguageProvider` (`src/i18n/`) persists `scholify-lang`, sets `document.documentElement.lang`, and `t()` falls back to English for untranslated strings (~580 RU strings in `translations.ts`). The language toggle lives on the landing.
- **The app (everything after sign-in) is English-only by design.** ACCA's official exam language is English; translating study surfaces would harm exam preparation. This is a deliberate WON'T-DO, not a gap.
- **ACCA paper names, codes and syllabus-area labels are always English**, including inside Russian landing copy.

---

## 7. Non-functional requirements

### 7.1 Offline-first persistence with cloud sync

Every learner-model store is localStorage-first and functions fully signed-out/offline. Keys: `scholify-acca-progress`, `-diagnostics`, `-plan`, `-topics`, `-flashcards`, `-mocks`, `-exams`, `-exam-snooze`, `-passed`, `-studying`, `-current-paper`, `-daily-goal`, `-experience`, `-onboarded`, `-journey`, `-prob-history`, `-pace`, `-mistakes`, `-confidence`.

Cloud layer (`acca-cloud.ts`, Supabase with RLS — users only touch their own rows):
- `acca_diagnostics` — one row per diagnostic (insert); reads prefer the newer copy (`mergeDiagnostic`).
- `acca_progress` — one upserted row per user with the full snapshot + a **monotonic `answered` counter**; `syncAccaProgress()` on load hydrates local when cloud is ahead, pushes when local is ahead — no lost work either way.
- Writes are debounced (2.5s coalescing, `queueAccaProgressPush`) and fire-and-forget; **the UI never sees a sync error.** Signed out / unconfigured / table-missing → silent no-op.

### 7.2 Graceful AI degradation (no `ANTHROPIC_API_KEY` required)

All AI goes through the single dispatcher `api/lara.ts?action=…` (kept to one Vercel function for the Hobby-plan 12-function cap). Keyless/failed behaviour per feature (`acca-ai.ts`):
- **Tutor** → returns the question's curated explanation (`isFallback: true`).
- **Examiner** → server keyword-based marking, labelled "Demo marking (no live AI key connected)".
- **Post-mortem** → deterministic client analysis from area scores (same shape as the AI response: headline, analysis, lostMarks, 3-step plan ending in `mock`).
- **Generate** → explicit reason codes (`missing_anthropic_key` / `no_questions` / `error` / `network`) with honest UI copy.

The core loop (diagnostic, practice, mocks, flashcards, plans, analytics) is **fully deterministic and needs zero API keys**.

### 7.3 Performance budgets

- No chart libraries: all data-viz is hand-rolled SVG/div primitives (`charts.tsx`) — the analytics page ships no extra bundle weight.
- Animations are transform/opacity only (GPU-safe); count-ups via `requestAnimationFrame` (`useCountUp`, 1.1s); landing marquee/testimonials use `translate3d`.
- Data pruning caps localStorage growth: daily maps ~120 days, probability history 90, pace 60, mocks 20/paper, exams 10/paper.
- Session state is local component state; stats recompute synchronously from localStorage (no spinners for local data).

### 7.4 Accessibility

- Global `prefers-reduced-motion: reduce` kill-switch in `index.css` (all animation/transition durations → 0.001ms; mesh/border animations disabled).
- Hover transforms disabled on `(hover: none)` devices; landing 3D tilt disabled for coarse pointers and reduced-motion users (`useTilt`).
- `:focus-visible` outline (2px brand) app-wide; buttons min-height 44px (`Button`), touch-action manipulation, tap-highlight suppressed.
- Charts: values always visible as text; color never the only channel; `role="img"` + `aria-label` on sparkbars; decorative ticks `aria-hidden`; icons `aria-hidden` (labels carry meaning).
- Numerals use `font-variant-numeric: tabular-nums` where aligned.

### 7.5 Reliability

- All storage reads wrapped in try/catch with typed empty defaults — a corrupt key can never crash a screen.
- `ErrorBoundary` at the app shell; route guards (`ProtectedRoute`/`GuestRoute`); unknown routes → `/dashboard`.
- Timers (mock countdown) cleaned up on unmount/exit; graded state machines cannot double-record (refs guard confidence/mistake writes).

---

## 8. Out of scope / future (explicitly not in v1.0)

Aligned to the learning-OS layer map; none of these block the shipped loop:

- **Layer 6 — knowledge graph:** prerequisite-aware topic graph (today's study path is linear syllabus order with soft sequencing).
- **Layer 7 — whiteboard / worked-solution canvas:** step-by-step numeric working capture; today numeric questions grade final answers only.
- **Layer 9 — mock telemetry:** per-question mock replay (flag-for-review, free navigation and the sectioned exam shape SHIPPED in the CBE addendum below; replay of a past sitting is what remains).
- **Layer 10 — career:** PER employer integrations, job-market signals; today EPSM/PER are self-reported steppers.
- **myACCA/OAuth sync:** the passed-papers record is self-reported by design; the storage shape is ready for a real sync "without changing callers" (`acca-qualification.ts`).
- **Mobile app** (RevenueCat billing noted in `paddle.ts` as the mobile path) — web is mobile-responsive today.
- **Curated banks for SBL/SBR/Options papers** ("A curated question bank for {paper} is on the way") and AI Examiner expansion beyond FR/SBR/SBL.
- **App-language translation** — permanent WON'T-DO (§6).
- Community/leaderboard depth, Cal.com tutoring marketplace, and the referral program's reward economy (stubs exist: `referral.ts`, `community-storage.ts`, `calcom.ts`).

---

*Companion document: `docs/03-design-bible.md` — the UI/UX system this PRD's screens are built from.*


---

## Addendum — Loop v2 (2026-07-10, commits 2e4a655…95e91d0)

**Onboarding additions:** target pass probability chips (65/75/85 → PaperPlan.targetProb, default 75); custom daily minutes input (5–240); ValueTrio on the hero; StartMode ("zero"|"assess") — the ready slide's "Brand new to {paper}?" exit sends zero-start learners to /dashboard where the diagnostic is gated behind 15 answered questions (DIAG_UNLOCK_ANSWERS, Dashboard.tsx) with a progress meter.

**Diagnostic v2:** stratified ladder (1 easy + 1 medium + 1 hard from EVERY area, cap 25; FA 8 areas → 24), exam-style countdown 100s/question with auto-submit; results show the current→target gap strip then LaraPlan — a staged generation scene (4 build steps) revealing: the daily block (Brief → Practice → Cards → Bank at studyTime), the top-3 weak-area queue, the road strip (Topics → Bank runs → 60% MOCK gate → Mock 1·2·3 → target% → exam), three horizons (operational/tactical/strategic incl. estimated membership date), and "Start day 1" → /study?do=weak.

**Topic flow (5 steps):** UNDERSTAND (Topic Brief: concept/structure/example/traps — acca-briefs.ts + acca-briefs-skills.ts, 22 briefs FA/FR/PM/TX) → LEARN THE ESSENTIALS (5 guided) → MEMORISE (reels flashcards: full-screen, swipe up=got it/down=again, story progress bar) → PROVE IT (65% check) → DRILL TO DEPTH (N/65 practice ladder).

**Bank Runs (acca-bankruns.ts):** 3 × 50-question whole-paper timed sessions (90s/q = 75 min), free, pre-gate; last-10 history, best %; Exam-room tile "Bank run N of 3"; results title "BANK RUN N OF 3 COMPLETE" (run number captured at mount — the record effect fires after first paint).

**Examiner Intelligence (acca-examiner.ts):** official per-sitting pass rates (Dec 24–Dec 25), per-area hotspots, paraphrased examiner themes — card in Analytics → Exam. Content program spec = docs/09.

---

## Addendum — the CBE platform (2026-07-16, commits cdc9b95 + this one)

**Why:** the real ACCA exam is a computer-based exam with a specific shape per paper. Rehearsing in any other shape teaches the wrong exam. `src/lib/acca-exam-structure.ts` is the specialist layer: official per-paper blueprints (sections, marks, duration, on-screen tools, what ACCA provides), tested invariant marks-sum-100.

**v1 (cdc9b95):** CBE toolbelt (calculator, per-paper formulae sheets, quick notes) docked in every answering surface; the answer spreadsheet (`spreadsheet.ts` + `SpreadsheetPad`, refs/ranges/functions, `serializeForMarking` feeds workings into AI marking); the constructed-response studio (`ExaminerView`) with the exam clock at official min/mark; the `/notes` hub.

**Phase 2 (this commit):**
- **Sectioned CBE mock (`CbeMockRunner` + `acca-cbe-mock.ts`)** — THE mock is now the full sitting in the paper's official shape: Section A OT → Section B OT cases → Section C constructed, one exam clock priced at official minutes-per-mark, **CBE question navigator** (per-section grid: answered / flagged / current), **flag-for-review**, free navigation, review screen, auto-submit at zero — and Lara marks constructed answers INTO the mock score. Composition is marks-driven off the blueprint and degrades honestly (a section with no content drops; the clock scales to composed marks). Section A keeps the three disjoint mock forms; gating (60% prob + Pro) and `recordMock` semantics unchanged.
- **Authored OT cases (`acca-cases-*.ts`, `OtCase` type)** — Section B scenario blocks written as UNITS (never faked by grouping bank questions): FR × 3 (leases / consolidation / interpretation, 5 × 2 marks each), FA × 2 MTQ-style (consolidation + interpretation, 5 × 3 marks each). Papers without authored cases run Section B on standalone OTs and say so. Backlog: PM/TX/FM/AA case sets.
- **Notes account sync (migration `0020_acca_notes.sql` + `acca-notes-cloud.ts`)** — one RLS-guarded JSONB row per user, per-note newest-updatedAt merge with deletion tombstones (120-day TTL); reconciles on session start and on /notes open, debounced push after every local change. localStorage stays authoritative offline.

**Still open (CBE phase 3):** SBL full-case experience with professional-skills marking; case sets for the remaining Skills papers; past-sitting replay.

---

## Addendum — the categorised Study hub (2026-07-16, same-day follow-up)

**Founder spec:** /study organised into clear sub-categories (like Analytics), proportioned from onboarding, daily plan focused on pain points while topic progression continues.

**The categorised day** (`acca-schedule.ts` `categoryDay`, drives both `learn` and `strengthen` phases): 1 · Topic learning (the next area's chapter, `COST.study`) → 2 · Essentials ×5 (`ESSENTIALS_SIZE`, new `essentials` action; deep links carry `&area=`) → 3 · Daily practice (largest block, `focusArea()` pain point first, sized by `dailyMinutes` × `targetProb`) → 4 · Flashcards (due cards). Zero-start gate days pin study+practice to the next A·B·C section. Strengthen days append a bank run when >25 min remain.

**The hub** renders these as numbered sections with live "~N min today" chips (the plan's proportions made visible), the study path under category 1, plus **5 · Official ACCA resources** (`acca-resources.ts`): per-paper technical-articles + examiner-reports links, every URL pattern verified live against accaglobal.com (F-codes for Knowledge/Skills, named slugs for SBL/SBR, P-codes for Options). Exam room follows unchanged. Fix folded in: a "Study X" plan task now opens the chapter, not a practice session.
