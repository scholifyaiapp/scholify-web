import type { StudyChapter } from "@/lib/acca-study-content"
import { TX_TREE_AREA_A } from "@/lib/acca-study-tx-tree-a"
import { TX_TREE_AREA_B_PART1 } from "@/lib/acca-study-tx-tree-b1"
import { TX_TREE_AREA_B_PART2 } from "@/lib/acca-study-tx-tree-b2"
import { TX_TREE_AREA_B_PART3 } from "@/lib/acca-study-tx-tree-b3"
import { TX_TREE_AREA_B_PART4 } from "@/lib/acca-study-tx-tree-b4"
import { TX_TREE_AREA_C_PART1 } from "@/lib/acca-study-tx-tree-c1"
import { TX_TREE_AREA_C_PART2 } from "@/lib/acca-study-tx-tree-c2"
import { TX_TREE_AREA_D } from "@/lib/acca-study-tx-tree-d"
import { TX_TREE_AREA_E_PART1 } from "@/lib/acca-study-tx-tree-e1"
import { TX_TREE_AREA_E_PART2 } from "@/lib/acca-study-tx-tree-e2"
import { TX_TREE_AREA_F, TX_TREE_AREA_G } from "@/lib/acca-study-tx-tree-f"

/*
 * TX-UK · the Study reading tree — 29 chapters across the seven official syllabus areas
 * of the ACCA Taxation (United Kingdom) study guide, on the FA2025 (2025/26) basis.
 *
 * ── What it replaced ──────────────────────────────────────────
 * SEVEN chapters for a SEVEN-area syllabus — one per area, the most extreme case of the
 * defect this rebuild exists to fix. Area B alone is eleven chapters of any
 * approved-provider text, and it had one.
 *
 *   Area A ·  3 chapters   the UK tax system and ethics, administration for individuals,
 *                          administration for companies
 *   Area B · 11 chapters   the income tax computation, the adjustments, property income,
 *                          employment income and benefits, pensions, trading profits and
 *                          the tax year basis, capital allowances, partnerships, trading
 *                          losses, national insurance
 *   Area C ·  4 chapters   the CGT computation, part disposals and chattels, shares and
 *                          securities, the reliefs
 *   Area D ·  2 chapters   lifetime transfers, the death estate and planning
 *   Area E ·  5 chapters   taxable total profits, the liability and marginal relief,
 *                          chargeable gains for companies, losses, groups
 *   Area F ·  3 chapters   scope and registration, the liability and administration,
 *                          overseas aspects
 *   Area G ·  1 chapter    employability and technology skills
 *
 * ── The FA2025 basis, and why it was transcribed rather than recalled ──
 * Every rate, band, threshold and limit was taken from the exam's own rate sheet as printed
 * in the FA25 study text. Several moved in ways that make a recalled figure wrong: the CGT
 * annual exempt amount is £3,000, CGT rates are 18% and 24% with no residential surcharge,
 * business asset disposal relief is taxed at 14%, employer NIC runs at 15% from £5,000, the
 * employment allowance is £10,500, and the high income child benefit charge bites between
 * £60,000 and £80,000.
 *
 * ── Two structural changes that would defeat a from-memory rebuild ──
 * From 2024/25 an unincorporated business is taxed on the TAX YEAR BASIS, with profits
 * time-apportioned. The old current-year basis, opening year rules, overlap profits and
 * overlap relief are gone (chapter 10).
 *
 * And the EXCLUDED topic list is long enough to shape the content: the £1,000 property and
 * trading allowances, Class 2 NIC, termination payments, business property relief,
 * agricultural property relief, grossing up on death, the RNRB taper, the capital goods and
 * second-hand goods schemes, and much else. Authoring a rule the paper does not examine is
 * as damaging as a wrong rate and less obvious, so each area's exclusions were checked
 * before it was written.
 *
 * ── Exam shape this tree is built for ─────────────────────────
 * Section A is 15 objective tests at 2 marks = 30. Section B is 3 OT cases, each with 5
 * questions at 2 marks = 30. Section C is THREE constructed-response questions of 10, 15
 * and 15 marks = 40 — note three, not two, which is a difference from PM. Three hours.
 *
 * Chapter `id`s are learner-progress keys and must never be renumbered once shipped.
 */

export const TX_CHAPTERS: StudyChapter[] = [
  ...TX_TREE_AREA_A,
  ...TX_TREE_AREA_B_PART1,
  ...TX_TREE_AREA_B_PART2,
  ...TX_TREE_AREA_B_PART3,
  ...TX_TREE_AREA_B_PART4,
  ...TX_TREE_AREA_C_PART1,
  ...TX_TREE_AREA_C_PART2,
  ...TX_TREE_AREA_D,
  ...TX_TREE_AREA_E_PART1,
  ...TX_TREE_AREA_E_PART2,
  ...TX_TREE_AREA_F,
  ...TX_TREE_AREA_G,
].sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
