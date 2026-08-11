import type { StudyChapter } from "@/lib/acca-study-content"
import { FM_TREE_AREA_A } from "@/lib/acca-study-fm-tree-a"
import { FM_TREE_AREA_C } from "@/lib/acca-study-fm-tree-c"
import { FM_TREE_AREA_D } from "@/lib/acca-study-fm-tree-d"
import { FM_TREE_AREA_E } from "@/lib/acca-study-fm-tree-e"
import { FM_TREE_AREA_B, FM_TREE_AREA_F, FM_TREE_AREA_G } from "@/lib/acca-study-fm-tree-bfg"
import { FM_TREE_AREA_H } from "@/lib/acca-study-fm-tree-h"

/*
 * Area A is now a TREE — three chapters, one per syllabus sub-topic group,
 * replacing the single FM_A chapter that had to cover A1 through A4 in one
 * sitting. `collect` reads arrays as well as single objects, so the array is
 * all that is needed here.
 *
 * ALL SEVEN AREAS are trees now. FM went from eight chapters — five authored
 * bodies aliased across seven areas — to twenty-four, because the engine serves
 * one chapter a day and eight chapters was an eight-day course.
 */
export const FM_OFFICIAL_A = FM_TREE_AREA_A
/* Area C is a five-chapter tree — see acca-study-fm-tree-c.ts. It replaces the
   single chapter that covered inventory, receivables, payables, cash AND
   funding strategy in one sitting. */
export const FM_OFFICIAL_C = FM_TREE_AREA_C
/* Area D is a five-chapter tree — see acca-study-fm-tree-d.ts. It replaces
   FM_B relabelled, which covered payback, ARR, NPV, IRR, tax, inflation, risk,
   lease-or-buy, replacement AND rationing in one sitting. */
export const FM_OFFICIAL_D = FM_TREE_AREA_D
/* Area E is a five-chapter tree — see acca-study-fm-tree-e.ts. */
export const FM_OFFICIAL_E = FM_TREE_AREA_E

/* Area B is a two-chapter tree — see acca-study-fm-tree-bfg.ts. */
export const FM_OFFICIAL_B = FM_TREE_AREA_B

/*
 * Areas F and G are two-chapter trees — see acca-study-fm-tree-bfg.ts.
 *
 * They replace splitLegacyE(), which built both by REGEX-FILTERING one legacy
 * chapter's sections, traps, key terms and summary lines into two piles. That
 * is why "Business valuations" and "Risk management" shared their teaching
 * furniture and neither read as a chapter written for its own topic.
 */
export const FM_OFFICIAL_F = FM_TREE_AREA_F
export const FM_OFFICIAL_G = FM_TREE_AREA_G

/* Area H is now authored too — see acca-study-fm-tree-h.ts. It was the last
   legacy body in the paper: one section, no syllabusRefs, no inline check and
   no knowledge diagnostic. */
export const FM_OFFICIAL_H = FM_TREE_AREA_H
