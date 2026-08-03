import type { StudyChapter } from "@/lib/acca-study-content"
import { LWG_TREE_AREA_A } from "@/lib/acca-study-lwg-tree-a"
import { LWG_TREE_AREA_B } from "@/lib/acca-study-lwg-tree-b"
import { LWG_TREE_AREA_C } from "@/lib/acca-study-lwg-tree-c"
import { LWG_TREE_AREA_D_PART1 } from "@/lib/acca-study-lwg-tree-d"
import { LWG_TREE_AREA_D_PART2, LWG_TREE_AREA_E_PART1 } from "@/lib/acca-study-lwg-tree-de"
import { LWG_TREE_AREA_E_PART2, LWG_TREE_AREA_F_PART1 } from "@/lib/acca-study-lwg-tree-ef"
import { LWG_TREE_AREA_F_PART2, LWG_TREE_AREA_G, LWG_TREE_AREA_H } from "@/lib/acca-study-lwg-tree-fgh"

/*
 * LW-GLOBAL · the Study reading tree — 33 chapters across the eight official
 * syllabus areas of the ACCA LW-GLO study guide.
 *
 * ── Why LW needs two trees ────────────────────────────────────
 * LW is a single paper id with TWO genuinely different syllabuses, and three of the
 * eight areas do not overlap at all:
 *
 *              LW-ENG                          LW-GLOBAL
 *   Area B     The law of obligations          International business transactions
 *                                              (the CISG and ICC Incoterms)
 *   Area C     Employment law                  Transportation and payment
 *                                              (bills of lading, credit transfers,
 *                                              bills of exchange, letters of credit)
 *   Area G     Insolvency law                  Companies in difficulty or in crisis
 *
 * A Global learner taught from the ENG tree studies two areas that are not on their
 * exam and misses two that are. That is why this is a separate tree rather than an
 * overlay of the ENG one, and why `acca.ts` carries per-variant area LABELS so a
 * Global learner sees their own syllabus rather than the ENG one.
 *
 * ── What it replaced ──────────────────────────────────────────
 * Eight generated chapters totalling roughly 1,150 words — one per area, built by
 * looping over a list of glossary terms, and thin enough that Area B disposed of the
 * whole CISG in a few sentences. Global is also the DEFAULT LW variant, so that was
 * the default experience.
 *
 *   Area A · 5 chapters (A1 … A3)   legal systems and the separation of powers,
 *                                   legal traditions, conflict of laws and the
 *                                   institutions, ADR, UNCITRAL arbitration
 *   Area B · 8 chapters (B1 … B2)   CISG scope, formation, Incoterms, the seller's
 *                                   and buyer's obligations and remedies, common
 *                                   provisions, passing of risk
 *   Area C · 3 chapters (C1)        bills of lading, credit transfers, bills of
 *                                   exchange and letters of credit and comfort
 *   Area D · 5 chapters (D1 … D4)   agency, partnerships, corporate personality,
 *                                   formation, the constitution
 *   Area E · 3 chapters (E1 … E3)   share capital, loan capital, capital maintenance
 *   Area F · 4 chapters (F1 … F3)   directors, other officers, meetings
 *   Area G · 2 chapters (G1)        liquidation, administration
 *   Area H · 3 chapters (H1)        insider dealing and market abuse, money
 *                                   laundering, bribery and wrongful trading
 *
 * ── How a LAW paper's chapters differ from FA's ────────────────
 * Nothing is computed. What earns the marks is applying a rule to facts and reaching a
 * conclusion, so these chapters use `definition` for the rule, `illustration` for a
 * concrete instance, and `example` steppers that build an answer the way a marker
 * expects: identify the rule, state its elements, apply each to the facts, conclude.
 * Every worked example ends with the point that DECIDES the answer rather than a
 * restatement of the rule.
 *
 * Where a rule depends on a domestic companies or insolvency statute — a filing
 * period, a percentage threshold, a minimum capital — the chapter says so and directs
 * the learner to the figure the scenario supplies. That is the honest way to teach a
 * jurisdiction-neutral variant, and it is how the examiner frames the questions.
 *
 * ── Provenance ────────────────────────────────────────────────
 * Every word is ORIGINAL Scholify teaching text. What is followed is the PUBLIC ACCA
 * syllabus and study guide structure, which is not anyone's intellectual property. No
 * ACCA or Kaplan prose, question or answer is reproduced, and
 * scripts/originality-check.cjs verifies that against the source books.
 */

/** All 33 LW-Global chapters, in reading order. */
export const LW_GLOBAL_CHAPTERS: StudyChapter[] = [
  ...LWG_TREE_AREA_A,
  ...LWG_TREE_AREA_B,
  ...LWG_TREE_AREA_C,
  ...LWG_TREE_AREA_D_PART1,
  ...LWG_TREE_AREA_D_PART2,
  ...LWG_TREE_AREA_E_PART1,
  ...LWG_TREE_AREA_E_PART2,
  ...LWG_TREE_AREA_F_PART1,
  ...LWG_TREE_AREA_F_PART2,
  ...LWG_TREE_AREA_G,
  ...LWG_TREE_AREA_H,
]
