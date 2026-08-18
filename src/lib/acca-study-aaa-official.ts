import type { StudyChapter } from "@/lib/acca-study-content"
import { AAA_TREE_AREA_A } from "@/lib/acca-study-aaa-tree-a"
import { AAA_TREE_AREA_B } from "@/lib/acca-study-aaa-tree-b"
import { AAA_TREE_AREA_C } from "@/lib/acca-study-aaa-tree-c"
import { AAA_TREE_AREA_D_PART1 } from "@/lib/acca-study-aaa-tree-d"
import { AAA_TREE_AREA_D_PART2 } from "@/lib/acca-study-aaa-tree-d2"
import { AAA_TREE_AREA_E_PART1 } from "@/lib/acca-study-aaa-tree-e"
import { AAA_TREE_AREA_F_PART1 } from "@/lib/acca-study-aaa-tree-f"
import { AAA_TREE_AREA_F_PART2, AAA_TREE_AREA_G, AAA_TREE_AREA_H, AAA_TREE_AREA_I } from "@/lib/acca-study-aaa-tree-g"

/*
 * THE SHIM IS GONE.
 *
 * Until August 2026 this file relabelled five legacy chapters onto the official
 * areas — a straight 1:1 mapping like AFM's, with two areas given new titles
 * and areas F to I authored thinly alongside. Nine chapters carried the whole
 * paper at ~11,500 words, against 23,500 to 42,000 for the other finished
 * Strategic Professional papers.
 *
 * AAA has NINE syllabus areas, A to I — the largest count in the library. Every
 * one is now an authored tree and all five legacy files are deleted.
 *
 *   Area A  AAA-01..03  regulatory environment
 *   Area B  AAA-04..07  professional and ethical considerations
 *   Area C  AAA-08..10  quality management
 *   Area D  AAA-11..17  planning and conducting the audit
 *   Area E  AAA-18..21  completion, review and reporting
 *   Area F  AAA-22..27  other assignments
 *   Area G  AAA-28      current issues and developments
 *   Area H  AAA-29      professional skills
 *   Area I  AAA-30      employability and technology skills
 *
 * THE WEIGHTING IS DELIBERATE. Section A is a 50-mark case study set at the
 * PLANNING stage, drawing predominantly on areas A to D, which is why those
 * four carry seventeen of the thirty chapters. Area E is Section B territory,
 * since the syllabus notes Section A may draw on any area except E.
 *
 * HOUSE STYLE, set in the tree headers: the examiner's persistent complaint is
 * that candidates describe standards instead of applying them. So no standard
 * is taught for its own sake — every chapter says what the auditor must DO,
 * what evidence satisfies it, and what changes when the scenario supplies a
 * particular fact. AAA-12 in particular is written as a routine for converting
 * an exhibit into risks with justifications and responses, because that single
 * skill carries more marks than any other in the paper.
 */

export const AAA_OFFICIAL_A: StudyChapter[] = AAA_TREE_AREA_A
export const AAA_OFFICIAL_B: StudyChapter[] = AAA_TREE_AREA_B
export const AAA_OFFICIAL_C: StudyChapter[] = AAA_TREE_AREA_C
export const AAA_OFFICIAL_D: StudyChapter[] = [...AAA_TREE_AREA_D_PART1, ...AAA_TREE_AREA_D_PART2]
export const AAA_OFFICIAL_E: StudyChapter[] = AAA_TREE_AREA_E_PART1
export const AAA_OFFICIAL_F: StudyChapter[] = [...AAA_TREE_AREA_F_PART1, ...AAA_TREE_AREA_F_PART2]
export const AAA_OFFICIAL_G: StudyChapter[] = AAA_TREE_AREA_G
export const AAA_OFFICIAL_H: StudyChapter[] = AAA_TREE_AREA_H
export const AAA_OFFICIAL_I: StudyChapter[] = AAA_TREE_AREA_I
