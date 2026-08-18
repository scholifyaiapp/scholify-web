import type { StudyChapter } from "@/lib/acca-study-content"
import { APM_TREE_AREA_A_PART1 } from "@/lib/acca-study-apm-tree-a"
import { APM_TREE_AREA_A_PART2 } from "@/lib/acca-study-apm-tree-a2"
import { APM_TREE_AREA_B_PART1 } from "@/lib/acca-study-apm-tree-b"
import { APM_TREE_AREA_B_PART2 } from "@/lib/acca-study-apm-tree-b2"
import { APM_TREE_AREA_C_PART1 } from "@/lib/acca-study-apm-tree-c"
import { APM_TREE_AREA_D_PART1 } from "@/lib/acca-study-apm-tree-d"
import { APM_TREE_AREA_D_PART2, APM_TREE_AREA_E, APM_TREE_AREA_F } from "@/lib/acca-study-apm-tree-d2"

/*
 * THE SHIM IS GONE — and APM's was the worst in the library.
 *
 * Until August 2026 this file did not relabel chapters, it COMPOSED them. A
 * local `take()` helper cherry-picked sections out of the four legacy chapters
 * and concatenated them into areas: Area A was assembled from parts of APM_A
 * and APM_C, Area B drew on APM_A, APM_B, APM_C and the whole of APM_D, and
 * Area D reached inside one of APM_B's sections to lift its blocks. The
 * composition had already produced a silent defect recorded in the old file —
 * APM_A and APM_C each had a section keyed "frameworks", so the composed Area A
 * carried two sections with the same id and the reader, which keys progress off
 * that id, could not distinguish them.
 *
 * A SECOND DEFECT was found by reading the official syllabus rather than the
 * code: APM has SIX areas, A–F, and Area F — employability and technology
 * skills — did not exist in this paper at all. Every other Strategic
 * Professional paper carries its equivalent (AFM area G, SBR area G, SBL area
 * J). The verification test asserted "all five official areas", so the omission
 * was encoded as correct and could never have been caught by the suite.
 *
 * Every area is now an authored tree and all four legacy files are deleted.
 *
 *   Area A  APM-01..14  acca-study-apm-tree-a.ts, -a2.ts
 *   Area B  APM-15..27  acca-study-apm-tree-b.ts, -b2.ts
 *   Area C  APM-28..31  acca-study-apm-tree-c.ts
 *   Area D  APM-32..38  acca-study-apm-tree-d.ts, -d2.ts
 *   Area E  APM-39      acca-study-apm-tree-d2.ts
 *   Area F  APM-40      acca-study-apm-tree-d2.ts
 *
 * If you are adding to an area, add a chapter to that area's tree module — do
 * NOT reintroduce `take()` or any helper deriving one area's content from
 * another's.
 */

/* Areas A and B together supply the 50-mark Section A case study every sitting,
   which is why they carry twenty-seven of the forty chapters. Area A's
   composite left A5 (sustainability) with no coverage at all; Area B's drew on
   all four legacy chapters at once. */
export const APM_OFFICIAL_A: StudyChapter[] = [...APM_TREE_AREA_A_PART1, ...APM_TREE_AREA_A_PART2]
export const APM_OFFICIAL_B: StudyChapter[] = [...APM_TREE_AREA_B_PART1, ...APM_TREE_AREA_B_PART2]

/* Areas C and D look small — C has one subsection and five outcomes — but the
   syllabus guarantees ONE Section B question from C and one from D in every
   sitting. That is half the Section B marks resting on two areas that
   previously had one thin chapter each. */
export const APM_OFFICIAL_C: StudyChapter[] = APM_TREE_AREA_C_PART1
export const APM_OFFICIAL_D: StudyChapter[] = [...APM_TREE_AREA_D_PART1, ...APM_TREE_AREA_D_PART2]

export const APM_OFFICIAL_E: StudyChapter[] = APM_TREE_AREA_E

/* The area that did not exist. See the header note above. */
export const APM_OFFICIAL_F: StudyChapter[] = APM_TREE_AREA_F
