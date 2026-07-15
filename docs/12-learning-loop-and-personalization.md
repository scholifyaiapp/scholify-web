# Scholify — The Personalized Learning Loop

**Document 12 · v1.0 · 2026-07-15 · Founder vision, engineering-grounded**

This document specifies the core product: how a learner goes from *"I just signed up"* to *"I passed."* It translates the founder's vision into English, audits it against the code that already exists, and lays out a professional, phased plan to close the gap.

The loop is the whole product. Everything else — the content, the AI, the billing — exists to serve it.

---

## 1. The vision (translated from the founder's brief)

> A user signs up and goes through **onboarding** — an introduction to the platform, plus the personalization questions Scholify needs to know them.
>
> **If the user has sat an exam before, or already has a foundation from a course**, Scholify asks them to take a **diagnostic**. The diagnostic tests **at least 3 verified questions from every syllabus section (A–H)**. When it finishes, Lara **evaluates the answers like an examiner, identifies the learner's pain points**, and — from the **onboarding result + diagnostic result** — builds a **personalized daily plan**. Each day, within the time the learner sets aside, they complete targeted daily tasks that move them, gently, toward their **target pass percentage**. **If the learner misses a day, Lara updates the plan.**
>
> **If the user is brand new** (no prior exam, no foundation), Scholify does **not** ask for a diagnostic yet. It builds the personalized plan from the **onboarding result alone**, and the daily tasks teach the syllabus in order. **Once the learner has mastered the first third of the paper — sections A·B·C — the diagnostic runs**, and the plan **re-generates once** around the onboarding + diagnostic result.

In one sentence: **onboarding personalizes → the right learners diagnose at the right time → Lara turns that into a daily plan that adapts every day.**

---

## 2. What already exists (audit, 2026-07-15)

A large part of this is built. The engine is `src/lib/acca-schedule.ts`, consumed by the Dashboard, Study Hub and Analytics.

| Vision element | Status | Where |
|---|---|---|
| Onboarding with personalization questions | ✅ Built | `Welcome.tsx` — captures paper, exam date, **experience** (`new / some / professional`), **goal**, **target %**, **daily minutes** |
| Two personas (new vs experienced) | ✅ Built | `acca-profile.ts` `StartMode: "zero" \| "assess"` |
| Diagnostic: ≥3 questions per section A–H | ✅ Built | `acca-diagnostic.ts` `buildDiagnostic` — one easy/medium/hard per area (=3/area), every area, capped at 25 |
| New learner: **no** diagnostic first, learn A·B·C, **then** diagnose | ✅ Built | `acca-schedule.ts` `diagnosticGate` — the A·B·C gate; `buildDailyTasks` defers the diagnostic |
| Daily tasks within a time budget, toward the target % | ✅ Built | `buildDailyTasks` — study/practice/flashcards/bank/mock, sized to `dailyMinutes`, scaled by `targetProb` |
| Missed-day self-healing | ✅ Built | Shield scheme + "recompute from what remains over the days that remain" |
| Diagnostic result screen with weak areas + a Lara plan | ✅ Built | `AccaDiagnostic.tsx` `LaraPlan` — pass probability, weakest areas, a plan "generated" in front of the learner |
| Forward calendar ("the route to exam day") | ✅ Built | `projectPlan` + `PlanRoute.tsx` |

**So the skeleton of the vision is real and shipping.** The problem is not that it's absent — it's that four pieces of connective tissue are missing, and without them the loop doesn't *feel* like the intelligent, personalized system the vision describes.

---

## 3. The gaps — why it "doesn't work as intended"

### Gap 1 — Onboarding doesn't route by experience; the learner picks manually  **(HIGH)**
The vision is deterministic: *experienced → diagnostic, new → learn-first.* But `Welcome.tsx` captures the experience answer and then **ignores it for routing** — it presents three buttons ("Find my pass probability" / start from zero / skip) and lets the user choose. `getExperience()` is never read to decide the branch.
**Consequence:** a brand-new learner can land straight in a diagnostic they can't answer (demoralizing), and an experienced returner can skip the diagnostic that would personalize everything.

### Gap 2 — The daily plan targets *practice* weakness, not the *diagnostic's* pain points  **(HIGH)**
This is the biggest one. After the diagnostic identifies pain points (`result.weakest`), the daily "strengthen" tasks in `acca-schedule.ts` compute weakness from `getPaperStats` — i.e. **live practice accuracy**, not the diagnostic. So a freshly-diagnosed learner whose diagnostic screams "area D is your weakness" gets a generic plan until they happen to practise D and build a practice history. **The diagnostic's pain points never actually drive the plan.** The vision — *"onboarding natijasi va diagnostika natijasiga muvofiq"* (per the onboarding **and** diagnostic result) — is not met.

### Gap 3 — "Lara updates your plan when you miss a day" happens silently  **(MEDIUM)**
The shield scheme genuinely re-paves the schedule after a missed day — but invisibly. The learner is never *told* "you missed a day, so I've re-spread the work — you're still on track." The vision explicitly wants Lara to **communicate** the update; the reassurance is the point.

### Gap 4 — The "re-generate once after the deferred diagnostic" moment isn't explicit  **(MEDIUM)**
For a zero-start learner, the engine transitions from `learnDay` to `phaseDay` after the A·B·C diagnostic — but there is no distinct **"Lara has re-tuned your whole plan around what the diagnostic just found"** moment. It should feel like a milestone, because it is one.

### Also worth noting (smaller)
- **Examiner framing:** the diagnostic result says "weakest areas" and shows a Lara plan, which is good — but it isn't framed as an **examiner's evaluation of pain points**. A light reframe would match the vision's language and raise perceived intelligence. **(LOW)**
- **"Lara personalized" is deterministic:** the plan is computed, not AI-generated. That is the *right* engineering choice (deterministic = instant, offline, free, testable), but Lara should **narrate** it so it reads as personal. Optionally, one AI-generated paragraph per plan regeneration adds warmth without risking the deterministic core. **(LOW / optional)**

---

## 4. The plan — four phases

Each phase is independently shippable and leaves the loop better than before. Phases 1–2 are the substance; 3–4 are polish that makes it *feel* intelligent.

### Phase 1 — Route the onboarding by experience  *(the honest fork)*
Make the experience answer decide the path, instead of asking the learner to self-triage.
- `experience === "new"` → **zero** persona → learn A·B·C first, diagnostic deferred (the gate).
- `experience === "some" | "professional"` → **assess** persona → diagnostic is the recommended next step.
- Keep an explicit escape hatch ("I'd rather just start learning") — never trap anyone — but make the *recommended* path follow from what they told us.
- **Acceptance:** a learner who answers "new" is never dropped into a cold diagnostic; a returner is guided straight into one. Verified by a test on the routing function.

### Phase 2 — Make the diagnostic drive the plan  *(close the core gap)*
Wire `result.weakest` (and the onboarding goal) into `acca-schedule.ts`.
- Add a weakness resolver that **prefers the latest diagnostic's weak areas** when a diagnostic exists and the learner hasn't yet built enough practice history to override it; fall back to practice-accuracy weakness as that history accumulates. (A clean precedence: *diagnostic pain points → then live practice accuracy → then syllabus order.*)
- The "strengthen" and "revise" days target those areas by name, so the day after a diagnostic, the plan visibly attacks exactly what the diagnostic flagged.
- **Acceptance:** immediately after a diagnostic that flags area D weakest, today's plan leads with a D drill — provable in a unit test that stubs a diagnostic and asserts the task's `area`.

### Phase 3 — Give the missed-day update a voice  *(Lara speaks)*
When `recordDayActive`/`shieldState` detects missed days, surface a calm, non-punitive line on the dashboard: *"You missed 2 days — I've re-spread the work across what's left. Still on track for [target]% by [date]."* Drawn from the numbers already computed; no new engine, just a message and a place to show it.
- **Acceptance:** after a simulated 2-day gap, the dashboard shows the reassurance and the plan is visibly lighter-per-day, not a backlog.

### Phase 4 — Make the two regeneration moments feel like milestones  *(the "wow")*
- **Zero learner clears A·B·C:** the deferred diagnostic becomes a celebrated checkpoint ("You've built the foundation — now let's measure it"), and completing it triggers an explicit *"Lara has rebuilt your plan around what we just learned"* transition.
- **Any diagnostic completes:** reframe the result as an **examiner's read** of pain points feeding the plan, and (optional) let Lara generate **one** personalized sentence tying the onboarding goal to the diagnostic finding. Deterministic plan underneath; AI only for the narration, behind the existing metering + fallback.
- **Acceptance:** both moments render distinctly from an ordinary day; the AI line degrades to a deterministic sentence with no key.

---

## 5. Principles this must not violate

- **Deterministic core.** The plan math stays offline, instant, free and testable. AI is narration on top, never the source of truth (this is why the app works with zero keys).
- **Never punitive.** Missed days re-spread; they never guilt or pile up.
- **Honest numbers.** No pass probability shown before it's earned (the A·B·C gate exists for exactly this reason — keep it).
- **Tested.** Every phase ships with a test, per Doc 11's standing rule: what isn't checked by a script isn't known to be true.

---

## 6. Recommended order

**Phase 2 first, then Phase 1** — Phase 2 (diagnostic → plan) is the highest-value fix and the clearest gap between the vision and reality; Phase 1 (routing) is quick and makes the whole thing coherent. Phases 3–4 are the emotional layer that turns a correct loop into one that feels like it's thinking about you.

*Next review: after Phase 2 lands.*
