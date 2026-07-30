import type { StudyChapter } from "@/lib/acca-study-content"
import { MA_TREE_AREA_A } from "@/lib/acca-study-ma-tree-a"
import { MA_TREE_AREA_B } from "@/lib/acca-study-ma-tree-b"
import { MA_TREE_AREA_C } from "@/lib/acca-study-ma-tree-c"
import { MA_TREE_AREA_D } from "@/lib/acca-study-ma-tree-d"
import { MA_TREE_AREA_E, MA_TREE_AREA_F } from "@/lib/acca-study-ma-tree-ef"

/*
 * MA · the Study reading tree — 27 chapters across the six official syllabus
 * areas, for the ACCA MA/FMA study guide.
 *
 * ── Why a tree, and what it replaced ──────────────────────────
 * MA previously had six study chapters, one per syllabus area, totalling roughly
 * 10,500 words. Area C alone — cost accounting techniques — covers materials,
 * labour, overheads, absorption and marginal costing, job, batch, process and
 * service costing, ABC, target costing and life cycle costing. One chapter could
 * name those topics; it could not teach them.
 *
 * The tree gives each syllabus sub-topic group its own chapter, so each technique
 * gets the worked examples it actually needs:
 *
 *   Area A · 4 chapters (A1 … A4)   management information, data, cost
 *                                   classification, presenting information
 *   Area B · 5 chapters (B1 … B4)   sampling, summarising data, regression,
 *                                   time series and indices, spreadsheets
 *   Area C · 6 chapters (C1 … C4)   materials, labour, overheads, absorption vs
 *                                   marginal, costing methods, alternatives
 *   Area D · 5 chapters (D1 … D5)   purpose, preparation, flexible budgets,
 *                                   capital budgeting, discounted cash flow
 *   Area E · 3 chapters (E1 … E3)   standard costing, variances, reconciliation
 *   Area F · 4 chapters (F1 … F4)   measurement concepts, application, cost
 *                                   reduction, monitoring and reporting
 *
 * ── How MA's chapters differ from BT's ────────────────────────
 * MA is a COMPUTATIONAL paper, so the apparatus is weighted differently. Where BT
 * leaned on named models and discussion, these chapters lean on `formula` blocks
 * and multi-step `example` steppers — and every worked example ends with the CHECK
 * that catches the error rather than merely stating the answer: ordering cost
 * equals holding cost at the EOQ; total cost is identical under FIFO, LIFO and
 * AVCO; efficiency × capacity = production volume; reapportionment leaves total
 * overhead unchanged; the sum of the variances equals standard cost of actual
 * output less actual cost.
 *
 * Two deliberate departures from the syllabus's own ordering, both pedagogical:
 * summarising data (B3) is taught before forecasting (B2), because regression
 * cannot be taught to someone who cannot compute a mean; and B2 is split into
 * cost-against-activity and figure-against-time, because they answer different
 * questions.
 *
 * Where the exam provides a formula — regression, EOQ/EBQ, discount and annuity
 * tables — the chapters say so, because the marks are for knowing WHEN to apply
 * it rather than for recall.
 *
 * ── Provenance ────────────────────────────────────────────────
 * Every word is ORIGINAL Scholify teaching text. What is followed is the PUBLIC
 * ACCA syllabus and study guide structure, which is not anyone's intellectual
 * property. No ACCA, Kaplan or BPP prose, question or answer is reproduced, and
 * scripts/originality-check.cjs verifies that against the four source books.
 */

/** All 27 MA chapters, in reading order. */
export const MA_OFFICIAL_CHAPTERS: StudyChapter[] = [
  ...MA_TREE_AREA_A,
  ...MA_TREE_AREA_B,
  ...MA_TREE_AREA_C,
  ...MA_TREE_AREA_D,
  ...MA_TREE_AREA_E,
  ...MA_TREE_AREA_F,
]
