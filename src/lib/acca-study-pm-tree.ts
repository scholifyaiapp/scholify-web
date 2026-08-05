import type { StudyChapter } from "@/lib/acca-study-content"
import { PM_TREE_AREA_A_PART1 } from "@/lib/acca-study-pm-tree-a"
import { PM_TREE_AREA_A_PART2 } from "@/lib/acca-study-pm-tree-a2"
import { PM_TREE_AREA_B_PART1 } from "@/lib/acca-study-pm-tree-b"
import { PM_TREE_AREA_B_PART2 } from "@/lib/acca-study-pm-tree-b2"
import { PM_TREE_AREA_B_PART3 } from "@/lib/acca-study-pm-tree-b3"
import { PM_TREE_AREA_C_PART1 } from "@/lib/acca-study-pm-tree-c"
import { PM_TREE_AREA_C_PART2 } from "@/lib/acca-study-pm-tree-c2"
import { PM_TREE_AREA_C_PART3 } from "@/lib/acca-study-pm-tree-c3"
import { PM_TREE_AREA_C_PART4 } from "@/lib/acca-study-pm-tree-c4"
import { PM_TREE_AREA_C_PART5 } from "@/lib/acca-study-pm-tree-c5"
import { PM_TREE_AREA_D_PART1 } from "@/lib/acca-study-pm-tree-d"
import { PM_TREE_AREA_D_PART2 } from "@/lib/acca-study-pm-tree-d2"
import { PM_TREE_AREA_D_PART3 } from "@/lib/acca-study-pm-tree-d3"
import { PM_TREE_AREA_D_PART4 } from "@/lib/acca-study-pm-tree-d4"
import { PM_TREE_AREA_D_PART5 } from "@/lib/acca-study-pm-tree-d5"
import { PM_TREE_AREA_E_PART1 } from "@/lib/acca-study-pm-tree-e"
import { PM_TREE_AREA_E_PART2 } from "@/lib/acca-study-pm-tree-e2"
import { PM_TREE_AREA_E_PART3 } from "@/lib/acca-study-pm-tree-e3"
import { PM_TREE_AREA_F } from "@/lib/acca-study-pm-tree-f"

/*
 * PM · the Study reading tree — 34 chapters across the six official syllabus areas
 * of the ACCA Performance Management study guide.
 *
 * ── What it replaced ──────────────────────────────────────────
 * FOUR area-chapters (PM_A to PM_D) for a FIVE-area syllabus — so Area E, the whole of
 * performance measurement and control and roughly a fifth of the exam, had no chapter at
 * all. The four that existed compressed an entire syllabus area into one sitting: Area C
 * alone covers relevant costing, CVP for one product and for many, limiting factors,
 * linear programming, pricing, make-or-buy and risk, which is now nine chapters and was
 * one.
 *
 *   Area A ·  4 chapters (A1–A2)   management information, sources and costs of
 *                                  information, information systems, big data
 *   Area B ·  6 chapters (B1–B3)   ABC, target costing, life-cycle costing, throughput
 *                                  accounting, environmental accounting, and how to
 *                                  choose between the techniques
 *   Area C ·  9 chapters (C1–C5)   relevant costing, single- and multi-product CVP,
 *                                  limiting factors, linear programming formulation and
 *                                  shadow prices, pricing decisions, make-or-buy and
 *                                  other short-term decisions, risk and uncertainty
 *   Area D ·  9 chapters (D1–D5)   budgetary systems, quantitative analysis and
 *                                  forecasting, learning curves, basic variances, fixed
 *                                  overhead variances, material mix and yield, sales mix
 *                                  and quantity, planning and operational variances,
 *                                  investigation and the limits of standard costing
 *   Area E ·  5 chapters (E1–E3)   financial performance and short-termism, non-financial
 *                                  measures and the three frameworks, ROI and residual
 *                                  income, transfer pricing, not-for-profit and public
 *                                  sector performance
 *   Area F ·  1 chapter (F)        employability and technology skills — laying out a
 *                                  CBE answer so that method marks survive
 *
 * ── The ordering decisions worth recording ────────────────────
 * Two placements are deliberate and should not be "tidied" later.
 *
 * Learning curves (ch 22) sit BEFORE the variance chapters rather than with the other
 * quantitative techniques, because learning changes the standard that every later
 * variance is measured against — a favourable labour efficiency variance improving month
 * on month is the learning effect against a standard set on the first units, not
 * improving performance, and a learner needs the curve in hand to see that.
 *
 * Chapter 29 (financial measures and short-termism) precedes chapter 30 (non-financial
 * measures and the frameworks) because the balanced scorecard only makes sense once the
 * learner has watched a manager improve every financial ratio by dismantling the
 * business. Teaching the four perspectives first produces candidates who can list them
 * and cannot say what they are for.
 *
 * ── Exam shape this tree is built for ─────────────────────────
 * Section A is 15 objective tests at 2 marks = 30. Section B is 3 OT cases, each with 5
 * questions at 2 marks = 30. Section C is 2 constructed-response questions at 20 marks
 * = 40. Three hours. So 40 of the 100 marks are written answers built on Areas C, D and
 * E, which is why those chapters carry the discussion material and the "how to answer"
 * guidance rather than only the arithmetic.
 *
 * Chapter `id`s are learner-progress keys and must never be renumbered once shipped.
 */

export const PM_CHAPTERS: StudyChapter[] = [
  ...PM_TREE_AREA_A_PART1,
  ...PM_TREE_AREA_A_PART2,
  ...PM_TREE_AREA_B_PART1,
  ...PM_TREE_AREA_B_PART2,
  ...PM_TREE_AREA_B_PART3,
  ...PM_TREE_AREA_C_PART1,
  ...PM_TREE_AREA_C_PART2,
  ...PM_TREE_AREA_C_PART3,
  ...PM_TREE_AREA_C_PART4,
  ...PM_TREE_AREA_C_PART5,
  ...PM_TREE_AREA_D_PART1,
  ...PM_TREE_AREA_D_PART2,
  ...PM_TREE_AREA_D_PART3,
  ...PM_TREE_AREA_D_PART4,
  ...PM_TREE_AREA_D_PART5,
  ...PM_TREE_AREA_E_PART1,
  ...PM_TREE_AREA_E_PART2,
  ...PM_TREE_AREA_E_PART3,
  ...PM_TREE_AREA_F,
].sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
