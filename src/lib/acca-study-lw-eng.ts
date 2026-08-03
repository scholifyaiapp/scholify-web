import type { StudyChapter } from "@/lib/acca-study-content"
import { LWE_TREE_AREA_A_PART1 } from "@/lib/acca-study-lwe-tree-a"
import { LWE_TREE_AREA_A_PART2 } from "@/lib/acca-study-lwe-tree-a2"
import { LWE_TREE_AREA_B_PART1 } from "@/lib/acca-study-lwe-tree-b1"
import { LWE_TREE_AREA_B_PART2 } from "@/lib/acca-study-lwe-tree-b2"
import { LWE_TREE_AREA_B_PART3 } from "@/lib/acca-study-lwe-tree-b3"
import { LWE_TREE_AREA_B_PART4 } from "@/lib/acca-study-lwe-tree-b4"
import { LWE_TREE_AREA_B_PART5 } from "@/lib/acca-study-lwe-tree-b5"
import { LWE_TREE_AREA_B_PART6 } from "@/lib/acca-study-lwe-tree-b6"
import { LWE_TREE_AREA_B_PART7 } from "@/lib/acca-study-lwe-tree-b7"
import { LWE_TREE_AREA_C_PART1 } from "@/lib/acca-study-lwe-tree-c"
import { LWE_TREE_AREA_C_PART2 } from "@/lib/acca-study-lwe-tree-c2"
import { LWE_TREE_AREA_D_PART1 } from "@/lib/acca-study-lwe-tree-d1"
import { LWE_TREE_AREA_D_PART2 } from "@/lib/acca-study-lwe-tree-d2"
import { LWE_TREE_AREA_D_PART3 } from "@/lib/acca-study-lwe-tree-d3"
import { LWE_TREE_AREA_E_PART1 } from "@/lib/acca-study-lwe-tree-e"
import { LWE_TREE_AREA_E_PART2 } from "@/lib/acca-study-lwe-tree-e2"
import { LWE_TREE_AREA_F_PART1 } from "@/lib/acca-study-lwe-tree-f1"
import { LWE_TREE_AREA_F_PART2 } from "@/lib/acca-study-lwe-tree-f2"
import { LWE_TREE_AREA_G } from "@/lib/acca-study-lwe-tree-g"
import { LWE_TREE_AREA_H_PART1 } from "@/lib/acca-study-lwe-tree-h1"
import { LWE_TREE_AREA_H_PART2 } from "@/lib/acca-study-lwe-tree-h2"

/*
 * LW-ENG · the Study reading tree — 46 chapters across the eight official syllabus
 * areas of the ACCA LW-ENG study guide.
 *
 * ── Why LW needs two trees ────────────────────────────────────
 * LW is a single paper id with TWO genuinely different syllabuses, and three of the
 * eight areas do not overlap at all:
 *
 *              LW-ENG                          LW-GLOBAL
 *   Area B     The law of obligations          International business transactions
 *              (English contract, then tort)   (the CISG and ICC Incoterms)
 *   Area C     Employment law                  Transportation and payment
 *                                              (bills of lading, credit transfers,
 *                                              bills of exchange, letters of credit)
 *   Area G     Insolvency law (IA 1986)        Companies in difficulty or in crisis
 *
 * Areas A and D–H overlap in SUBSTANCE, but not in content. The Global tree is
 * deliberately jurisdiction-neutral — it has to be, since a Global candidate cannot be
 * assumed to sit under any one companies statute — so where a rule depends on a
 * domestic threshold it directs the learner to "the figure the scenario supplies". An
 * ENG candidate is examined on the English rule itself, so this tree names it: the
 * Companies Act 2006, the Insolvency Act 1986, the Partnership Act 1890, the Limited
 * Partnerships Act 1907, the LLP Act 2000, ERA 1996, CDDA 1986, CJA 1993, the Bribery
 * Act 2010 and the Criminal Finances Act 2017, with the English case law that settles
 * each proposition.
 *
 * ── What it replaced ──────────────────────────────────────────
 * Four area-chapters — LW_A to LW_D — covering an EIGHT-area syllabus, with the
 * migrated sections carrying no examples, tables, traps or checks. Worse, the LW-UK
 * "variant" was cosmetic: `applyVariantStudyContent` prepended a single UK-flavoured
 * overlay section to chapter 1 of the GLOBAL tree and renamed the title, so a learner
 * who selected United Kingdom was reading Global content with a paragraph on top.
 *
 *   Area A ·  6 chapters (A1–A2)   the legal system, the courts, precedent,
 *                                  legislation, statutory interpretation, human rights
 *   Area B · 16 chapters (B1–B4)   contract formation, content, breach and remedies,
 *                                  then tort and professional negligence
 *   Area C ·  5 chapters (C1–C2)   employment status, the contract of employment,
 *                                  dismissal and redundancy
 *   Area D ·  6 chapters (D1–D4)   agency, partnerships, LPs and LLPs, corporate
 *                                  personality, promoters, registration and names
 *   Area E ·  3 chapters (E1–E3)   share capital, loan capital and charges, capital
 *                                  maintenance and dividend law
 *   Area F ·  4 chapters (F1–F3)   directors, their duties, other officers, meetings
 *   Area G ·  2 chapters (G1)      liquidation and the order of payment, administration
 *   Area H ·  4 chapters (H1)      insider dealing and market abuse, money laundering,
 *                                  bribery and tax evasion, fraudulent and wrongful
 *                                  trading
 *
 * ── Exam shape this tree is built for ─────────────────────────
 * Section A is 45 objective tests — 25 at 2 marks PLUS 20 at 1 mark = 70 — so ENG
 * marks are MIXED, like BT's rather than uniform like MA's and FA's. Section B is 5
 * multi-task questions at 6 marks = 30. Two hours.
 *
 * Chapter `id`s are learner-progress keys and must never be renumbered once shipped.
 */

export const LW_ENG_CHAPTERS: StudyChapter[] = [
  ...LWE_TREE_AREA_A_PART1,
  ...LWE_TREE_AREA_A_PART2,
  ...LWE_TREE_AREA_B_PART1,
  ...LWE_TREE_AREA_B_PART2,
  ...LWE_TREE_AREA_B_PART3,
  ...LWE_TREE_AREA_B_PART4,
  ...LWE_TREE_AREA_B_PART5,
  ...LWE_TREE_AREA_B_PART6,
  ...LWE_TREE_AREA_B_PART7,
  ...LWE_TREE_AREA_C_PART1,
  ...LWE_TREE_AREA_C_PART2,
  ...LWE_TREE_AREA_D_PART1,
  ...LWE_TREE_AREA_D_PART2,
  ...LWE_TREE_AREA_D_PART3,
  ...LWE_TREE_AREA_E_PART1,
  ...LWE_TREE_AREA_E_PART2,
  ...LWE_TREE_AREA_F_PART1,
  ...LWE_TREE_AREA_F_PART2,
  ...LWE_TREE_AREA_G,
  ...LWE_TREE_AREA_H_PART1,
  ...LWE_TREE_AREA_H_PART2,
].sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
