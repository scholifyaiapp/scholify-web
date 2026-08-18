import type { StudyChapter } from "@/lib/acca-study-content"
import { ATX_TREE_AREA_A_PART1 } from "@/lib/acca-study-atx-tree-a"
import { ATX_TREE_AREA_A_PART2 } from "@/lib/acca-study-atx-tree-a2"
import { ATX_TREE_AREA_A_PART3 } from "@/lib/acca-study-atx-tree-a3"
import { ATX_TREE_AREA_A_PART4 } from "@/lib/acca-study-atx-tree-a4"
import { ATX_TREE_AREA_A_PART5 } from "@/lib/acca-study-atx-tree-a5"
import { ATX_TREE_AREA_B } from "@/lib/acca-study-atx-tree-b"
import { ATX_TREE_AREA_C } from "@/lib/acca-study-atx-tree-c"
import { ATX_TREE_AREA_C2, ATX_TREE_AREA_D, ATX_TREE_AREA_E } from "@/lib/acca-study-atx-tree-d"

/*
 * THE SHIM IS GONE — and ATX's was a different species from the others.
 *
 * Until August 2026 this file did not merely relabel five legacy chapters, it
 * FILTERED them at load time. A `currentOnly()` helper stripped out any item
 * whose JSON mentioned "remittance basis", "non-dom" or "domicile", the legacy
 * overseas section was dropped by id, and a hand-written replacement section
 * covering the four-year foreign income and gains regime was spliced in.
 *
 * That was a sound emergency response to a real problem — Finance Act 2025
 * abolished domicile, deemed domicile and the remittance basis for income tax
 * and capital gains tax, which made the existing content actively wrong rather
 * than merely thin. But it left the paper's overseas teaching as a filter over
 * stale content, and everything else in the paper at five chapters and ~11,300
 * words against 23,500 to 42,000 for the other finished Strategic Professional
 * papers.
 *
 * Every area is now an authored tree written for Finance Act 2025, and all five
 * legacy files are deleted.
 *
 *   Area A  ATX-01..20  acca-study-atx-tree-a.ts … -a5.ts
 *   Area B  ATX-21..26  acca-study-atx-tree-b.ts
 *   Area C  ATX-27..31  acca-study-atx-tree-c.ts, -d.ts
 *   Area D  ATX-32      acca-study-atx-tree-d.ts
 *   Area E  ATX-33      acca-study-atx-tree-d.ts
 *
 * TWO RULES GOVERN ANY FUTURE EDIT, both set out at length in the header of
 * acca-study-atx-tree-a.ts:
 *
 *  1. **Finance Act 2025 is the examinable law** for June 2026 to June 2027.
 *     The founder's Kaplan ATX books are FA23 and are simply wrong on the
 *     overseas regime. Do not reintroduce domicile or the remittance basis.
 *  2. **Never bake a rate, band, threshold or allowance into the teaching.**
 *     The exam supplies them and they change every Finance Act. Teach the ORDER
 *     of a computation and the CONDITIONS of a relief; where a worked example
 *     needs a figure, mark it as an illustrative assumption.
 *
 * Do not reintroduce `currentOnly()` or any helper that filters content at load
 * time — if content is out of date, rewrite it.
 */

/* Area A is a twenty-chapter authored tree across five modules, split for file
   size only. It covers the six syllabus subsections: income tax including the
   FIG regime (ATX-02..06), capital gains tax (ATX-07..10), inheritance tax
   (ATX-11..14), corporation tax (ATX-15..18), stamp taxes (ATX-19) and VAT with
   administration (ATX-20), plus an orientation chapter. */
export const ATX_OFFICIAL_A: StudyChapter[] = [
  ...ATX_TREE_AREA_A_PART1,
  ...ATX_TREE_AREA_A_PART2,
  ...ATX_TREE_AREA_A_PART3,
  ...ATX_TREE_AREA_A_PART4,
  ...ATX_TREE_AREA_A_PART5,
]

/* Areas B and C contain no new taxes at all. They examine combining the Area A
   techniques, choosing between routes, and advising on them — which is what
   separates ATX from TX. */
export const ATX_OFFICIAL_B: StudyChapter[] = ATX_TREE_AREA_B

/* Area C ends with ATX-31, which carries the FIVE ETHICS MARKS Section A
   awards in every sitting — separately identified in the syllabus's own marks
   breakdown of 35 technical, 5 ethics and 10 professional skills. */
export const ATX_OFFICIAL_C: StudyChapter[] = [...ATX_TREE_AREA_C, ...ATX_TREE_AREA_C2]

export const ATX_OFFICIAL_D: StudyChapter[] = ATX_TREE_AREA_D
export const ATX_OFFICIAL_E: StudyChapter[] = ATX_TREE_AREA_E
