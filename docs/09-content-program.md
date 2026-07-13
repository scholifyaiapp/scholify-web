# Scholify — The Content Program (BT → Strategic Professional)

**Document 9 · v1.0 · 2026-07-10 · Founder-approved direction**

The mandate: a Scholify student's learning progress must **equal a Kaplan/BPP student's** — full study-text coverage, full exam-kit depth — while every word and every question is **our own original work**. Approved content providers are our *benchmark for coverage and rigour*, never our source text.

---

## 1. Sources policy (trademark & copyright — non-negotiable)

| Source | How we use it | What we NEVER do |
|---|---|---|
| **ACCA syllabus & study guide** (public) | The canonical chapter map — every learning outcome becomes trackable content | Claim ACCA affiliation (disclaimer everywhere) |
| **ACCA examiner's reports** (public) | Statistical + thematic analysis → Examiner Intelligence (paraphrased, attributed) | Reproduce report text verbatim |
| **ACCA past exams/specimens** (public) | Topic-frequency analysis; style calibration; original questions *in the same style* | Republish any ACCA question or scenario |
| **ACCA pass-rate announcements** (public) | Facts — shown with attribution | — |
| **Kaplan / BPP study texts & kits** | Benchmark ONLY: chapter granularity, question counts per topic, difficulty mix | Copy, paraphrase, or derive any content from them; never mention them in-product |

Every question we ship: invented scenario, invented figures, original prose, distractors built from nameable student errors. This is already the enforced pipeline (docs/02, question waves 1–2).

## 2. The content stack per paper (the "Kaplan-equal" definition)

A paper is **content-complete** when it has:

1. **Topic Briefs** — one per syllabus area (concept / rules & formulas / worked example / traps), 600–900 words. *Benchmark: study-text chapter summaries.* Later: split hot areas into sub-briefs (chapter granularity ~20/paper).
2. **Question bank ≥ 300** curated originals (Skills papers; 150+ Knowledge, given on-demand format), blueprinted per area × difficulty, ≥65 per hot area (the practice-ladder target). *Benchmark: exam-kit depth (~400–600).* AI Custom Practice (Pro) covers the unlimited tail.
3. **Written/constructed-response set** — 15–25 per Section-C-style paper with marking rubrics for the AI Examiner.
4. **Flashcard deck ≥ 60** — definitions, formulas, thresholds, standards.
5. **3 full mock forms** — exam-shaped (sections, timing, mark weights).
6. **Examiner Intelligence dataset** — last ≥5 sittings' pass rates + area hotspots + paraphrased recurring themes (`src/lib/acca-examiner.ts`), refreshed after every results week (≈6 weeks after each Mar/Jun/Sep/Dec sitting).

## 3. Status & wave plan

| Wave | Papers | Scope | Status |
|---|---|---|---|
| 1–2 | FA, FR | Briefs ✅ · banks ✅ · intel ✅ | **Shipped** — FR now 239, en route to 300 |
| 3 | PM, TX | Briefs + banks + intel | **Shipped** — PM 168, TX 225 (→300 target open) |
| 5 | BT, MA, LW | Knowledge set (150 q, briefs, cards) | **Shipped** — all at 150 |
| 8b | AA, FM | Skills banks 80 → 150 | **Shipped** (2026-07-13) — both at 150, blueprint-balanced, independently re-solved |
| S1–S5 | SBL, SBR, AFM, APM, ATX, AAA | Full stack: 150 bank + briefs + 60 cards + written | **Shipped** (2026-07-13) — all 6 Strategic papers at parity (see below) |

**Every ACCA paper with curated content is now at the full stack.** All 15 papers (3 Knowledge + 6 Applied Skills + 2 Strategic Essentials + 4 Options) have: 150+ question bank (blueprinted per area × difficulty, independently re-solved — every numeric recomputed digit-by-digit), one topic brief per syllabus area, a 60+ flashcard deck, and a rubric-backed written set. Open depth work: push the three most-sat Skills banks (FR/TX/PM) toward the 300 exam-kit target.

**Strategic wave (2026-07-13) — the numbers:** 6 banks × 150 = 900 verified questions (each paper PASS on an independent re-solve pass; SBL/AFM/AAA/ATX had only cosmetic explanation-numbering slips, all fixed), 29 briefs, 360 flashcards, 90 written questions. All original, syllabus-aligned, zero ACCA/Kaplan/BPP reproduction. Model IDs verified current.

Authoring method (proven in waves 1–2, held through 8b): blueprint → parallel agent authoring → **mandatory independent re-solve verification** (every numeric recomputed digit-by-digit) → balanced answer positions → merge. Every wave updates docs and the practice-ladder targets.

## 4. Examiner Intelligence (shipped v1)

Per targeted paper, in Analytics → Exam: official pass-rate trend of the last 5 sittings (bars vs the 50% line), **"Where the marks live"** (per-area exam frequency with coaching notes), **"The examiner keeps saying"** (paraphrased recurring themes), link to official ACCA resources, independence disclaimer. Data: `acca-examiner.ts`, seeded with the real Mar→Dec 2025 sittings (sources: ACCA Global announcements via accaglobal.com; PQ Magazine; aCOWtancy pass-rate roundups). Roadmap: per-sitting theme diffs, question-level linkage ("this question drills a Dec 25 examiner flag"), auto-refresh checklist each results week.

## 5. The value equation

Kaplan/BPP sell coverage. Scholify sells **coverage × the loop**: the same syllabus depth, but every question feeds a pass probability, every weak area reroutes the plan, and the examiner's own recurring complaints become targeted missions. That is the "equal progress, more value" promise the founder set.
