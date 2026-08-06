import type { StudyChapter } from "@/lib/acca-study-content"
import { FR_TREE_01, FR_TREE_02, FR_TREE_03 } from "@/lib/acca-study-fr-tree-a"
import { FR_TREE_04, FR_TREE_05, FR_TREE_06 } from "@/lib/acca-study-fr-tree-a2"
import { FR_TREE_07, FR_TREE_08 } from "@/lib/acca-study-fr-tree-b1"
import { FR_TREE_09, FR_TREE_10 } from "@/lib/acca-study-fr-tree-b2"
import { FR_TREE_11, FR_TREE_12 } from "@/lib/acca-study-fr-tree-b3"
import { FR_TREE_13, FR_TREE_14 } from "@/lib/acca-study-fr-tree-b4"
import { FR_TREE_15, FR_TREE_16 } from "@/lib/acca-study-fr-tree-b5"
import { FR_TREE_17, FR_TREE_18 } from "@/lib/acca-study-fr-tree-b6"
import { FR_TREE_19, FR_TREE_20 } from "@/lib/acca-study-fr-tree-b7"
import { FR_TREE_21, FR_TREE_22, FR_TREE_23 } from "@/lib/acca-study-fr-tree-b8"
import { FR_TREE_24, FR_TREE_25 } from "@/lib/acca-study-fr-tree-d1"
import { FR_TREE_26, FR_TREE_27 } from "@/lib/acca-study-fr-tree-d2"
import { FR_TREE_28, FR_TREE_29 } from "@/lib/acca-study-fr-tree-d3"
import { FR_TREE_30, FR_TREE_31 } from "@/lib/acca-study-fr-tree-c"
import { FR_TREE_32, FR_TREE_33, FR_TREE_34 } from "@/lib/acca-study-fr-tree-c2"

/*
 * FR · the reading tree — 34 chapters across all five syllabus areas.
 *
 * ── What this replaces, and why it had to be replaced ────────────
 * FR previously had FIVE study chapters for a FIVE-area syllabus: one chapter per area.
 * Area B alone — accounting for transactions — covers seventeen standards, from IAS 2 to
 * IFRS 16, and it had one chapter. Area D covers both single-entity preparation and full
 * consolidation including an associate, and it had one chapter. A learner could read the
 * whole of FR's study material in an afternoon, which is a fair description of the problem.
 *
 * The tree gives each body of material the room it needs: six chapters for the conceptual
 * and regulatory framework, seventeen for accounting for transactions, six for preparation,
 * four for analysis and interpretation, and one for employability.
 *
 * ── Two deliberate ordering decisions ───────────────────────────
 *
 * 1  AREA D BEFORE AREA C — preparation before interpretation.
 *    The syllabus lists analysis (C) before preparation (D), and this tree reverses it. The
 *    reason is that interpretation is the harder skill and it depends on the easier one: a
 *    candidate cannot sensibly explain why group gearing moved without knowing how a
 *    subsidiary's borrowings reach the consolidated statement of financial position, and
 *    cannot discuss the associate margin distortion without having equity accounted an
 *    associate. Chapters 30 to 33 refer back to Area D constantly, and they read as
 *    consolidation of prior learning rather than as new material. Reading them first would
 *    make them abstract.
 *
 * 2  THE CONCEPTS OF GROUPS SIT IN AREA A, AS CHAPTER 6 — before any of Area B.
 *    This follows the syllabus, which puts the concepts and principles of consolidation in
 *    A4 rather than in D. It looked odd at first: why teach control and the single economic
 *    entity twenty chapters before the arithmetic that uses them? Because "control" is the
 *    same word doing the same work as in the definition of an asset, which chapter 3 has
 *    just covered — and because a learner who meets consolidation for the first time in
 *    chapter 26 tends to learn the workings as a procedure. Chapter 26 can then assume the
 *    concepts and spend its space on the mechanics.
 *
 * ── Area B's internal order ─────────────────────────────────────
 * Non-current assets first (7 to 11), because IAS 16 is the most examined standard in the
 * paper and because impairment needs the carrying amounts that chapters 7 to 10 build. Then
 * inventories (12), leases (13 to 14), revenue (15 to 16), provisions (17), financial
 * instruments (18 to 19), tax (20), and the three classification standards last (21 to 23).
 * IAS 8 is placed at the end of Area B rather than in Area A because it is most useful once
 * the learner has met the policies and estimates it governs.
 *
 * ── The verification standard ───────────────────────────────────
 * Every worked example's arithmetic was checked by script before the chapter was written,
 * and the checks include that the chapter 24 trial balance balances, that both statements
 * prepared from it balance, and that the chapter 28 attribution between the parent and the
 * non-controlling interest adds back to consolidated profit.
 *
 * ── One constraint recorded honestly ────────────────────────────
 * Unlike BT, MA, FA, LW, PM and TX, this rebuild was NOT benchmarked against approved-
 * provider study texts, because no FR books were available. The content is written from
 * IFRS itself. That has one advantage — there is no publisher's prose to absorb — and one
 * cost: the originality check cannot be run for FR, so its zero-match record is untested
 * rather than proven. If FR books are obtained later, scripts/originality-check.cjs takes
 * --books and --mine arguments and the pass can be run retrospectively.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

export const FR_TREE: StudyChapter[] = [
  /* Area A — the conceptual and regulatory framework (1 to 6) */
  FR_TREE_01, // Why a framework, and who the statements are for
  FR_TREE_02, // Qualitative characteristics
  FR_TREE_03, // The elements, recognition and derecognition
  FR_TREE_04, // Measurement, capital maintenance, going concern
  FR_TREE_05, // The regulatory framework and the preparer's duty
  FR_TREE_06, // The concepts and principles of groups

  /* Area B — accounting for transactions (7 to 23) */
  FR_TREE_07, // IAS 16 recognition and cost
  FR_TREE_08, // IAS 16 depreciation and revaluation
  FR_TREE_09, // IAS 40, IAS 20, IAS 23
  FR_TREE_10, // IAS 38 intangibles
  FR_TREE_11, // IAS 36 impairment
  FR_TREE_12, // IAS 2 inventories and IAS 41
  FR_TREE_13, // IFRS 16 lessee
  FR_TREE_14, // Sale and leaseback, and the lessor
  FR_TREE_15, // IFRS 15 the five-step model
  FR_TREE_16, // IFRS 15 in application
  FR_TREE_17, // IAS 37 and IAS 10
  FR_TREE_18, // Financial liabilities, equity and compound instruments
  FR_TREE_19, // IFRS 9 financial assets and ECL
  FR_TREE_20, // IAS 12 income taxes
  FR_TREE_21, // IAS 21 foreign currency transactions
  FR_TREE_22, // IFRS 5 held for sale and discontinued operations
  FR_TREE_23, // IAS 8 policies, estimates and errors

  /* Area D — preparation (24 to 29), taught before Area C: see the note above */
  FR_TREE_24, // IAS 1 and single-entity preparation
  FR_TREE_25, // IAS 7 statements of cash flows
  FR_TREE_26, // Consolidated SOFP: goodwill and NCI
  FR_TREE_27, // Consolidation adjustments
  FR_TREE_28, // Consolidated statement of profit or loss
  FR_TREE_29, // IAS 28 associates

  /* Area C — analysis and interpretation (30 to 33) */
  FR_TREE_30, // Ratio analysis
  FR_TREE_31, // Writing an interpretation
  FR_TREE_32, // Interpreting consolidated statements
  FR_TREE_33, // Limitations, and specialised entities

  /* Area E — employability and technology skills (34) */
  FR_TREE_34,
]
