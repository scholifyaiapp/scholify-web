# Scholify — AI System Architecture (v1.0)

**Status:** living document · grounded in code as of 2026-07-08
**Owner:** founding engineering
**Scope:** every AI call in the product, the non-LLM learner model, degradation strategy, cost/metering plans, security posture, roadmap.

---

## 0. Executive summary

Scholify's AI system has two halves that are deliberately kept separate:

1. **The LLM surface** — a single Vercel serverless function, `api/lara.ts`, that fronts every Anthropic Claude call behind an `?action=` dispatcher. Claude is used for *language work*: explaining questions, marking written answers, writing new questions, running post-mortems.
2. **The learner model** — a deterministic, non-LLM ML core in `src/lib/acca-diagnostic.ts` and `src/lib/acca-loop.ts` that computes the product's headline number: **pass probability**. No token is ever spent computing it. It is a difficulty-weighted, Bayesian-shrunk, coverage-regressed logistic model that runs instantly, offline, on every keystroke of practice.

The LLM makes the product *feel* personal. The learner model makes the product *be* personal — and gives the LLM its memory via `learnerProfileSummary()`.

Every AI endpoint degrades to a deterministic fallback with HTTP 200 and `isFallback: true`. The app is fully usable with zero API keys configured. This is a product decision, not a shortcut (§4).

---

## 1. AI surface map

### 1.1 Entry point and dispatch

All Claude traffic flows through **one** serverless function — `api/lara.ts` — to stay under the Vercel Hobby plan's 12-function cap. The default export dispatches on `?action=` (or `body.action`):

```
POST /api/lara?action=<name>
```

| action | handler | model | max_tokens | purpose |
|---|---|---|---|---|
| `acca-tutor` | `handleAccaTutor` | `SONNET` | 400 | Lara explains a question / answers a follow-up |
| `acca-examiner` | `handleAccaExaminer` | `SONNET` | 700 | Marks a written answer against a rubric |
| `acca-generate` | `handleAccaGenerate` | `SONNET` | 2000 | Writes original MCQs from a topic / pasted notes |
| `acca-postmortem` | `handleAccaPostmortem` | `SONNET` | 900 | Mock-fail analysis (`kind: "mock"`) or real-exam reflection (`kind: "exam"`) |
| `message` | `handleMessage` | `HAIKU` | 200 | Legacy daily coach message (per-day in-memory `messageCache`) |
| `chat` | `handleChat` | `SONNET` | 400 | Legacy conversational coach (last 10 turns of history) |
| `analyze-patterns` | `handleAnalyze` | `HAIKU` | 600 | Rewrites seed plan suggestions in Lara's voice |
| `analyze-difficulty` | `handleDifficulty` | `HAIKU` | 500 | Goal realism advisor (legacy onboarding) |
| `analyze-photo` | `handlePhoto` | `SONNET` | 180 | Vision: comments on a study-proof photo (base64 image block) |
| `vocab` | `handleVocab` | `HAIKU` | 1400 | Legacy vocabulary generation |
| `placement` | `handlePlacement` | `HAIKU` | 1500 | Legacy CEFR placement test |
| `extract` | `handleExtract` | `HAIKU` | 3000 | Legacy bring-your-own-content vocab extraction |
| `generate-tree` | `handleTree` | Fal.ai FLUX schnell | n/a | Legacy streak-tree image (not Claude; `FAL_KEY`) |
| `fetch-url` | `handleFetchUrl` | none | n/a | Server-side URL → readable text (`htmlToText`, 8000-char cap) |

The four `acca-*` actions are the live product surface. The rest are legacy from the pre-ACCA pivots (vocab, generic learning coach) and remain deployed because they cost nothing at rest and the dispatcher makes removal a one-line change. `export const config = { maxDuration: 30 }` bounds every invocation.

### 1.2 Models

Defined once at the top of `api/lara.ts`:

```ts
const HAIKU  = "claude-haiku-4-5"
const SONNET = "claude-sonnet-4-6"
```

Policy encoded in the table above: **Sonnet where correctness is graded** (tutoring, marking, question-writing, post-mortem — an ACCA student will fact-check us against IFRS), **Haiku where the output is tone** (coach messages, rewrites, list generation).

### 1.3 Prompt caching

Every Claude call passes the system prompt as an ephemeral-cached block:

```ts
system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }]
```

System prompts are static per paper (the paper id/name is interpolated, everything else is fixed), so repeat calls within the cache TTL hit the prompt cache and pay the reduced cached-input rate. The user turn carries all volatile content (question stem, learner context, the student's answer).

### 1.4 JSON-shape contracts and safe-parse validators

Every structured action tells the model to "Return ONLY valid JSON, no prose, in exactly this shape" — and then **trusts nothing**. Each handler pairs its prompt contract with a defensive parser that extracts the first `{`…last `}` (or `[`…`]`), `JSON.parse`s inside a try/catch, and validates every field before it can reach a client:

| contract | validator (server) | enforced invariants |
|---|---|---|
| `{"questions":[{stem, options[4], correctIndex, explanation, difficulty}]}` | `parseGeneratedQuestions` | `stem` is string, exactly 4 options, `correctIndex ∈ 0..3`, `difficulty ∈ {easy,medium,hard}` else `"medium"` |
| `{"marks", "hit":[], "missed":[], "feedback"}` | `safeExaminerJson` | `marks` clamped to `0..maxMarks`, arrays coerced to strings |
| `{"headline","analysis","lostMarks":[],"plan":[]}` | `safePostmortemJson` | rejects if `headline`/`analysis` missing or `plan` empty; `plan[].action ∈ {weak,practice,flashcards,mock}` else `"practice"` |
| vocab/placement arrays | `parseVocabJson` | array-or-empty |
| `{"suggestions":[{id,text}]}` | `safeParse` | must be array, else seed fallback |
| difficulty JSON | `safeJSON` + `clampNumber` + `normalizeLevel` | `score` clamped 0–100, `confidence` 0–1, `level` normalised to the enum |

A failed parse never surfaces an error: the handler falls through to its deterministic fallback with `isFallback: true` (§4). The client then re-validates in `src/lib/acca-ai.ts` — `generateQuestions()` re-checks the 4-option/0-3-index invariant and stamps ids (`gen-${paperId}-${Date.now()}-${i}`, `area: "AI"`, `marks: 2`), `markAnswer()` re-clamps `marks` against `wq.maxMarks`, `getPostMortem()` re-validates `plan.length > 0` and re-normalises actions. **Both sides validate; neither trusts the wire.**

### 1.5 Client bindings (`src/lib/acca-ai.ts`)

The client never talks to Anthropic. Four typed wrappers hit `/api/lara` (base URL from `VITE_API_URL`, default same-origin):

- `askTutor(q, correctText, question?, learnerContext?)` → `{ answer, isFallback }` — falls back to `q.explanation` on any network failure.
- `markAnswer(wq, answer)` → `ExaminerResult` — network failure returns `marks: 0`, `missed: wq.rubric`, and an honest "Couldn't reach the examiner" message.
- `getPostMortem(input: PostMortemInput)` → `PostMortem` — network failure runs `offlinePostMortem()` client-side (§4.2).
- `generateQuestions(paperId, {topic?, notes?, count?})` → `GenerateResult` with a typed `reason` (`missing_anthropic_key | no_questions | error | network`).

---

## 2. Lara: the tutor persona

Lara is one persona expressed through per-action system prompts, all in `api/lara.ts`.

### 2.1 Tone rules (from the prompts themselves)

- Tutor (`handleAccaTutor`): *"a warm, sharp ACCA tutor … Be concise (max ~150 words), use plain language, and where useful show the calculation step by step. Never invent standards or figures."* Grounded explicitly in *"the ACCA syllabus and IFRS Accounting Standards."*
- Examiner (`handleAccaExaminer`): not Lara — *"an experienced ACCA examiner"*, instructed to award marks *"generously where the student demonstrates the point in their own words (ACCA awards marks per valid point, not per exact wording)."*
- Post-mortem, mock fail: *"a coach after a lost match, never disappointed in the student, always in the plan."*
- Post-mortem, real-exam fail: *"This is an emotional moment: acknowledge it honestly first — many ACCA members failed papers on the way — then move to evidence. … zero toxic positivity."*
- Legacy house rules that carried through the pivot (see `MESSAGE_SYSTEM`, `ANALYZE_SYSTEM`, `PHOTO_SYSTEM`): banned words `"amazing"`, `"incredible"`, `"you got this"`, `"keep it up"`; reference real numbers; *"Sound like a real person, not a motivational poster."*

### 2.2 Statefulness: `learnerProfileSummary()`

Lara's cross-session memory is **not** a conversation transcript — it's a compact, prompt-ready profile compiled on the client from the learner model at call time. `learnerProfileSummary(paperId)` in `src/lib/acca-diagnostic.ts` assembles up to four lines:

1. **Background** — `experienceLine()` from `src/lib/acca-profile.ts`, set once at onboarding (`"new" | "some" | "professional"` → e.g. *"The student is new to accounting — explain from first principles, avoid assumed jargon."*).
2. **Latest diagnostic** — pass probability and estimated exam score.
3. **Diagnostic weak areas** — up to 3, with per-area competence percentages.
4. **Live practice weaknesses** — areas attempted ≥2 times with accuracy <70%, weakest first.

This string travels as `learnerContext` (clamped server-side to 800 chars) into `acca-tutor` and `acca-postmortem`. The tutor prompt then instructs: *"You remember this student across sessions. When their learning profile is given and this question touches one of their known weak areas, briefly acknowledge it and tie the explanation to shoring up that weakness — encouraging, never repetitive. Do not mention weak areas that aren't relevant to this question."*

The consequence: Lara's "memory" is always current (recomputed from the live learner model), costs ~100 input tokens, requires no server-side conversation store, and works offline-first like everything else.

---

## 3. The learner model — the non-LLM ML core

The number the whole product orbits — *"you have a 68% chance of passing FM; here's how we get you to 85%"* — is computed by `src/lib/acca-diagnostic.ts`. It is deliberately an **honest heuristic, not a black box** (the file header says exactly that), with five named mechanisms and published tunables:

```ts
const DIFFICULTY_WEIGHT = { easy: 0.8, medium: 1.0, hard: 1.3 }
const PRIOR = 0.5          // prior belief = the pass line
const ALPHA = 1.5          // pseudo-count: how fast evidence overrides the prior
const LOGISTIC_K = 0.11    // slope: 60→~75%, 70→~90%, 40→~25%
const PER_AREA = 3         // diagnostic questions sampled per syllabus area
const MAX_QUESTIONS = 20   // diagnostic stays ~15–20 min
export const TARGET_AREA_SCORE = 0.7
```

### 3.1 Difficulty-weighted per-area accuracy

`areaScore(answers)` weights each answer by `DIFFICULTY_WEIGHT[q.difficulty]` — a correct hard question is 1.3× the evidence of a medium one; an easy one only 0.8×.

### 3.2 Bayesian shrinkage

The same function shrinks toward the prior: `(wCorrect + ALPHA * PRIOR) / (wSum + ALPHA)`. With `ALPHA = 1.5` and `PRIOR = 0.5`, a lucky 1/1 in an area reads as `(1 + 0.75) / (1 + 1.5) = 0.70`, not 1.00 — a single answer can never claim mastery. `areaScoreFromCounts(seen, correct)` is the difficulty-blind twin used for practice counts (which don't retain difficulty): `(correct + ALPHA * PRIOR) / (seen + ALPHA)`.

### 3.3 Coverage-confidence regression

`overallCompetence(assessed, confidence)` computes the mean of assessed-area scores, then regresses toward neutral by how much of the syllabus was actually touched: `mean * confidence + PRIOR * (1 - confidence)`, where `confidence = assessedAreas / totalAreas` (computed in `assembleResult`). A diagnostic that only touched half the syllabus can only claim half the deviation from 50%. *We don't claim certainty we didn't earn.*

### 3.4 Logistic mapping to pass probability

`logistic(score) = 100 / (1 + e^(−0.11·(score − 50)))` — centred on the ACCA 50% pass mark. `estimatedScore = round(competence × 100)`; `passProbability = round(logistic(estimatedScore))`. The `K = 0.11` slope is tuned so an estimated 60% exam score reads ~75% pass probability, 70 → ~90, 40 → ~25.

### 3.5 Counterfactual target lift

`assembleResult` takes the two weakest assessed areas, lifts each to `max(score, TARGET_AREA_SCORE)` (0.7), re-runs the same competence → logistic pipeline, and reports `target.projectedPassProbability` (floored at the current probability). This is the concrete "68% → 85%" promise on the results screen — the same model, run on the world where the student does the work.

### 3.6 Two front doors, one model

- **Formal diagnostic**: `buildDiagnostic(paperId, seed)` samples up to `PER_AREA = 3` questions per syllabus area via `pickSpread` (difficulty-balanced: medium → easy → hard rotation, seeded deterministic `shuffle` — no `Math.random`, testable), capped at `MAX_QUESTIONS = 20`. `scoreDiagnostic(paperId, answers)` grades it with full difficulty weighting.
- **Live estimate**: `estimateFromPractice(paperId)` re-runs the identical model over cumulative per-area `seen/correct` counts from `getPaperStats` (difficulty-blind, via `areaScoreFromCounts`). Returns `null` until the student has practised.

Both converge in `assembleResult()`, so the diagnostic and the live number *speak the exact same model* — the pass probability moves with every answer, which is what closes the practice loop.

`passBand(prob)` maps the number to UI verdicts: ≥70 *"On track to pass"* (green), ≥45 *"On the borderline"* (amber), >0 *"Not ready yet"* (red).

### 3.7 Real-exam recalibration (`acca-loop.ts :: passProbability`)

A real exam result is the strongest evidence the model ever receives, and `passProbability(paperId)` in `src/lib/acca-loop.ts` treats it that way:

1. Base = live practice estimate if any, else latest diagnostic.
2. If `recoveryState(paperId)` is active (latest real sitting was a fail), map the official mark to a next-sitting probability: `examProb = clamp(5, 90, 50 + (score − 50) × 2)` — a 45% fail reads as 40% next-sitting probability, a 30% fail as 5%. An unshared mark reads as a near-miss: `examProb = 35`.
3. Blend: `w = max(0, 0.65 − answeredSince / 400)` → the exam evidence starts at **65% weight and washes out linearly over 260 answers** (`0.65 × 400`). `answeredSince` is counted from `getDailyActivity(120)` after the fail was recorded.

Product translation: the morning after a fail, the number honestly drops toward the real result — and every question answered since *literally earns the number back*. Recovery is visible, mechanical, and fair. The blend also gates the journey: `mockGate` (unlock at `MOCK_GATE = 60`), `mockProgress` (`MOCKS_REQUIRED = 3`, pass line `MOCK_PASS = 50`), and the `JourneyMap` stages all read this one recalibrated function.

### 3.8 Supporting analytics (`src/lib/acca-analytics.ts`)

Non-LLM instrumentation that feeds dashboards and (via prompts) Lara: `snapshotProbability`/`probabilityMomentum` (pass-probability history → Pass Momentum™ Δ vs ~a week ago), `recordAnswerTiming`/`getPace` (vs the `QUESTION_BUDGET_SEC = 90` exam budget; `<30s` = rushed), `recordMistake`/`getMistakes` (4-tag taxonomy: knowledge/misread/time/slip), `recordConfidence`/`getCalibration` (overconfidence gap, needs ≥10 tagged answers), `masteryScore`, `learningVelocity`, `forgettingRisk` (mastered topics untouched ≥7 days), `palestArea`. All localStorage-first, all zero-cost.

---

## 4. Graceful degradation

**Invariant: no `/api/lara` handler ever returns a non-200 for a missing key or model failure.** Each handler checks `process.env.ANTHROPIC_API_KEY` first and short-circuits to a deterministic fallback tagged `isFallback: true`; the same fallback fires on API errors and parse failures.

### 4.1 Server fallbacks

| action | keyless behaviour |
|---|---|
| `acca-tutor` | returns the question's own model explanation (`baseExplanation`) |
| `acca-examiner` | `localExaminer()` — keyword-match marking: extracts up to 4 distinctive keywords per rubric point (stop-worded, ≥4 chars), awards proportional marks, honest feedback: *"Demo marking (no AI key)…"* |
| `acca-postmortem` | `localPostmortem()` — full deterministic analysis: ranks areas by accuracy, picks the <50% worst 3, computes the marks gap to the pass line, compares mock average vs real result (*knowledge gap vs exam-day execution*), emits a 3-step plan ending in `action: "mock"` |
| `acca-generate` | `{ questions: [], reason: "missing_anthropic_key" }` — client surfaces "connect a key" |
| `message` / `chat` | template fallback / `softFallback()` keyword-routed coach reply |
| `analyze-patterns` | echoes the seed suggestions unchanged |
| `analyze-difficulty` | `neutralDifficulty()` heuristic on days-available |
| `analyze-photo` | `fallbackPhotoComment()` |
| `extract` | `mockExtract()` — per-language stop-list keyword extraction |

### 4.2 Client offline fallbacks

`src/lib/acca-ai.ts` mirrors the pattern for the network-down case: `offlinePostMortem()` is a client-side re-implementation of `localPostmortem`'s core (same worst-3-areas ranking, same 3-step plan), `askTutor` degrades to the bundled explanation, `markAnswer` to a zero-mark honest error. The learner model (§3) never degrades at all — it is local by construction.

### 4.3 Why this is a product feature

Scholify's market includes students on unreliable connections and the product is pre-revenue with keys not yet set in production (see `/api/health`). Offline-first means: (a) the demo is always fully walkable end-to-end with zero env vars — mocks, diagnostics, post-mortems, marking all *work*; (b) an Anthropic outage degrades quality, not availability; (c) the pass-probability engine — the actual value proposition — costs $0 per read forever. AI is the *garnish* on a deterministic core, which is the correct dependency direction for an exam-prep product.

---

## 5. Cost & metering architecture — **PLANNED, not built**

> Nothing in this section exists in code today. There is no auth on `/api/lara`, no usage logging, and no caps. This is the design target.

### 5.1 Per-call cost model (Sonnet 4.6 at $3 / $15 per MTok)

| action | est. input | est. output | est. cost/call |
|---|---|---|---|
| `acca-tutor` | ~600 tok (cached system) | ≤400 tok | **~$0.006** |
| `acca-examiner` | ~1,500 tok | ≤700 tok | **~$0.012** |
| `acca-generate` | ~800 tok | ≤2,000 tok | **~$0.030** |
| `acca-postmortem` | ~900 tok | ≤900 tok | **~$0.013** |

A heavy Pro user (20 tutor + 5 examiner + 2 generate + 1 postmortem/day) ≈ **$0.25/day ≈ $7.50/mo** — fine under a ~$15–20 Pro price, ruinous if unmetered on Free.

### 5.2 Planned caps (aligned to Paddle plans in `user_metadata.plan`)

| plan | Lara tutor | examiner | generate |
|---|---|---|---|
| Free | 5 / day | 2 / day | 1 / day |
| Beginner | 25 / day | 10 / day | 5 / day |
| Pro | 100 / day fair-use | 10 / day | 20 / day |

### 5.3 Planned model mix

- `SONNET` constant → `claude-sonnet-5` on release validation (one-line change in `api/lara.ts`).
- `acca-tutor` → **Haiku** for first-explanation calls (the bundled explanation already anchors correctness), keeping Sonnet for follow-up questions and all marking. Cuts the dominant call's cost ~3×.

### 5.4 Required plumbing (in order)

1. **JWT auth on `/api/lara`** — same pattern already shipped in `api/paddle.ts::cancel` and `api/reminders.ts::handleSync`: `supabase.auth.getUser(bearerToken)`, 401 without.
2. **Usage logging to Supabase** — `ai_usage(user_id, action, model, input_tokens, output_tokens, created_at)` with RLS, written server-side with the service role after each call.
3. **Cap enforcement** — count today's rows per action before calling Anthropic; over-cap returns the fallback path with `reason: "quota"` (the client already renders `isFallback` gracefully — the metering UX is free).

---

## 6. Security

**In place today:**

- **Keys are server-side only.** `ANTHROPIC_API_KEY` (and `FAL_KEY`) are read exclusively inside `api/lara.ts`; the client bundle contains no secrets. `/api/health` and `/api/security-check` (rewrites into `api/social.ts::health/securityCheck`) report configuration as **booleans only**, never values, with `Cache-Control: no-store`.
- **Input clamping at the trust boundary.** Every handler truncates and coerces before prompting: tutor `stem.slice(0, 1200)`, follow-up `question.slice(0, 500)`, `learnerContext.slice(0, 800)`; examiner `answer.slice(0, 4000)`, `stem.slice(0, 2000)`; generate `notes.slice(0, 3000)`, `count` clamped 1–10; postmortem areas capped at 12 rows with per-field slices; photo payload capped at ~6.5 MB base64. Numbers go through `Math.max/min/round`; enums through normalisers (`normalizeLevel`, `normalizeStage`, `normalizeMedia`).
- **Output validation** — the safe-parse layer (§1.4) means model output can't inject unexpected shapes into the client.

**Known risk — the unauthenticated endpoint.** `POST /api/lara` requires no authentication. Today the blast radius is zero *because the key isn't set in production*, but the moment `ANTHROPIC_API_KEY` lands, the endpoint is a free Claude proxy: anyone can script `?action=acca-tutor` and spend our tokens (Sonnet at 2,000 output tokens per `acca-generate` call is the juiciest target). **Fix (must ship with the key, before or same deploy):** the §5.4 JWT check plus per-user daily caps; optionally an origin/referer allow-list as a cheap second layer. `fetch-url` is additionally a mild SSRF surface (it fetches arbitrary `http(s)` URLs server-side); it should be restricted to authenticated users and public-IP targets when it graduates from legacy status.

---

## 7. Roadmap

1. **Ship the metering stack** (§5.4) — auth, `ai_usage` table, caps. Blocks turning the key on.
2. **Mock telemetry into the post-mortem.** `handleAccaPostmortem` already accepts `mockHistory` (last 10, date + percent); extend with per-question timing from `acca-analytics` (`getPace`) and mistake tags (`getMistakes`) so Lara can distinguish *"you don't know consolidation"* from *"you ran out of time on consolidation"* — the data is already collected, it just isn't threaded into the prompt yet.
3. **Knowledge graph.** Today areas are flat codes (A–F per paper). A prerequisite graph (e.g. FR: "single-entity IFRS 15 before group revenue") would let `buildAdaptiveSession` (in `src/lib/acca.ts`) drill *causes* rather than symptoms, and give `learnerProfileSummary` structural context ("weak at C *because* B never consolidated").
4. **Examiner rewrite-to-distinction.** The examiner currently returns `hit/missed/feedback`. Next: a second pass where Sonnet rewrites the student's own answer into a model 100% answer *using their sentences where salvageable* — the highest-signal feedback format in written-paper prep, at ~$0.015/call on the existing plumbing.
5. **Model upgrades.** Re-point `SONNET`/`HAIKU` constants as new Claude generations validate on an ACCA marking benchmark set (to be built from the seed bank + rubrics).

---

*Companion documents: `docs/05-backend-architecture.md` (database, sync, serverless, billing).*
