import type { StudyChapter } from "@/lib/acca-study-content"
import { FA_TREE_AREA_A, FA_TREE_AREA_B } from "@/lib/acca-study-fa-tree-ab"
import { FA_TREE_AREA_C } from "@/lib/acca-study-fa-tree-c"
import { FA_TREE_AREA_D1 } from "@/lib/acca-study-fa-tree-d1"
import { FA_TREE_AREA_D2 } from "@/lib/acca-study-fa-tree-d2"
import { FA_TREE_AREA_E, FA_TREE_AREA_F } from "@/lib/acca-study-fa-tree-ef"
import { FA_TREE_AREA_G } from "@/lib/acca-study-fa-tree-g"
import { FA_TREE_AREA_H, FA_TREE_AREA_I } from "@/lib/acca-study-fa-tree-hi"

/*
 * FA · the Study reading tree — 31 chapters across the nine official syllabus
 * areas of the ACCA FA/FFA study guide.
 *
 * ── Why a tree, and what it replaced ──────────────────────────
 * FA previously had nine study chapters, one per syllabus area, totalling roughly
 * 14,600 words — and several of them were the same underlying chapter re-sliced
 * under a different area code, because the library predated ACCA's A–I blueprint
 * and was migrated onto it rather than rewritten for it.
 *
 * Area D alone — recording transactions and events — covers sales and purchases,
 * sales tax, cash, inventory, tangible non-current assets, depreciation,
 * intangibles, the four accruals adjustments, receivables, payables, provisions and
 * capital structure. One chapter could name those topics; it could not teach them,
 * and it certainly could not work them.
 *
 * The tree gives each syllabus sub-topic group its own chapter:
 *
 *   Area A · 3 chapters (A1 … A5)    entities and purpose, the elements and the
 *                                    statements, regulation and governance
 *   Area B · 2 chapters (B1 … B2)    principles and concepts, qualitative
 *                                    characteristics
 *   Area C · 3 chapters (C1 … C2)    documents and systems, the accounting
 *                                    equation, ledgers and journals
 *   Area D · 11 chapters (D1 … D10)  one per sub-topic group, from sales tax
 *                                    through to share issues
 *   Area E · 2 chapters (E1 … E2)    bank reconciliations, control accounts and
 *                                    the supplier statement reconciliation
 *   Area F · 2 chapters (F1 … F3)    the trial balance and error types,
 *                                    correcting errors and suspense
 *   Area G · 4 chapters (G1 … G6)    the two statements, notes and events, cash
 *                                    flows, incomplete records
 *   Area H · 2 chapters (H1 … H2)    consolidated position, consolidated
 *                                    performance and associates
 *   Area I · 2 chapters (I1 … I3)    the ratios, and drawing conclusions
 *
 * ── How FA's chapters differ from BT's and MA's ───────────────
 * FA is a RECORDING paper. Almost every mark in Areas C to I is earned by putting a
 * figure in the right place with the right sign, so these chapters lean on `formula`
 * blocks, journal tables and multi-step `example` steppers — and every worked
 * example ends with the CHECK that catches the error rather than merely stating an
 * answer: the accounting equation still balances; closing inventory plus cost of
 * sales equals the cost of goods available under every valuation method; cost equals
 * accumulated depreciation plus carrying amount; the disposal account clears to
 * exactly the gain or loss; only the MOVEMENT in an allowance or a provision reaches
 * profit; the suspense account ends at nil; the statement of financial position
 * balances; the three sections of the cash flow statement sum to the movement in
 * cash; and a derived figure proves back through the account it came from.
 *
 * Two deliberate departures from the study guide's own ordering, both pedagogical.
 * Tangible non-current assets are split across three chapters — acquisition and the
 * capital/revenue decision, then depreciation, then disposals and revaluation —
 * because a learner who cannot classify the expenditure cannot depreciate it, and
 * one who cannot depreciate it cannot compute a gain on disposal. And the trial
 * balance is taught with the error TYPES (chapter 22) before the correction
 * mechanics (chapter 23), because the only question that matters about an error is
 * whether it left debits equal to credits.
 *
 * ── Provenance ────────────────────────────────────────────────
 * Every word is ORIGINAL Scholify teaching text. What is followed is the PUBLIC
 * ACCA syllabus and study guide structure, which is not anyone's intellectual
 * property. No ACCA, Kaplan or BPP prose, question or answer is reproduced, and
 * scripts/originality-check.cjs verifies that against the source books.
 */

/** All 31 FA chapters, in reading order. */
export const FA_OFFICIAL_CHAPTERS: StudyChapter[] = [
  ...FA_TREE_AREA_A,
  ...FA_TREE_AREA_B,
  ...FA_TREE_AREA_C,
  ...FA_TREE_AREA_D1,
  ...FA_TREE_AREA_D2,
  ...FA_TREE_AREA_E,
  ...FA_TREE_AREA_F,
  ...FA_TREE_AREA_G,
  ...FA_TREE_AREA_H,
  ...FA_TREE_AREA_I,
]
