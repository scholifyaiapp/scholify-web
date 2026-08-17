import { SBL_TREE_AREA_A } from "@/lib/acca-study-sbl-tree-a"
import { SBL_TREE_AREA_B } from "@/lib/acca-study-sbl-tree-b"
import { SBL_TREE_AREA_C } from "@/lib/acca-study-sbl-tree-c"
import { SBL_TREE_AREA_D } from "@/lib/acca-study-sbl-tree-d"
import { SBL_TREE_AREA_E } from "@/lib/acca-study-sbl-tree-e"
import { SBL_TREE_AREA_F } from "@/lib/acca-study-sbl-tree-f"
import { SBL_TREE_AREA_G } from "@/lib/acca-study-sbl-tree-g"
import { SBL_TREE_AREA_H } from "@/lib/acca-study-sbl-tree-h"
import { SBL_TREE_AREA_I } from "@/lib/acca-study-sbl-tree-i"
import { SBL_TREE_AREA_J } from "@/lib/acca-study-sbl-tree-j"

/*
 * SBL's chapter trees, one module per syllabus area.
 *
 * THE SHIM IS GONE. Until August 2026 this file was a relabelling layer: a local
 * `subset()` helper re-cut five legacy chapters (SBL_A–SBL_E) into the ten
 * official syllabus areas, so the syllabus was simulated rather than taught.
 * Areas D and F were two slices of ONE legacy chapter, C and E were legacy
 * chapters relabelled wholesale, and Area A was carved out of the legacy
 * PROFESSIONAL SKILLS chapter — its first section id was the give-away
 * `leadership-leadership-stakeholders`. The whole paper carried ~9,900 words.
 *
 * Every area is now an authored tree. `subset`, the SBL_A–SBL_E imports and the
 * five legacy files are deleted. If you are adding to an area, add a chapter to
 * that area's tree module — do not reintroduce a helper that derives one area's
 * content from another's.
 */

/* Area A is a four-chapter tree — see acca-study-sbl-tree-a.ts. It replaces two
   sections lifted from the legacy professional-skills chapter, and now teaches
   A3's ethical codes, conflicts, threats, safeguards and economic crime, none of
   which the paper covered at all. */
export const SBL_OFFICIAL_A = SBL_TREE_AREA_A
/* Area B is a seven-chapter tree — see acca-study-sbl-tree-b.ts. The largest area
   in the paper, and the one the shim compressed hardest: five sections of one
   legacy chapter served all of B1–B6, so public sector governance (B6) and
   integrated reporting and sustainability (B4) were barely taught. */
export const SBL_OFFICIAL_B = SBL_TREE_AREA_B
/* Area C is a six-chapter tree — see acca-study-sbl-tree-c.ts. The shim relabelled
   one legacy chapter as the whole of Area C; Kaplan spends four chapters and 128
   pages on the same material, and splits strategic choice from the methods of
   development, which is the split adopted here. */
export const SBL_OFFICIAL_C = SBL_TREE_AREA_C
/* Area D is a four-chapter tree — see acca-study-sbl-tree-d.ts. It was three
   sections of legacy chapter SBL_C taking `outcomes.slice(0, 3)`, with the OTHER
   half of the same chapter serving Area F — two syllabus areas cut from one body
   of text. Area D has fifteen learning outcomes. */
export const SBL_OFFICIAL_D = SBL_TREE_AREA_D
/* Area E is a five-chapter tree — see acca-study-sbl-tree-e.ts. The shim
   relabelled legacy chapter SBL_D as the whole area. Kaplan spends 116 pages on
   this material and predates E3 (machine learning, AI and robotics) entirely. */
export const SBL_OFFICIAL_E = SBL_TREE_AREA_E
/* Area F is a three-chapter tree — see acca-study-sbl-tree-f.ts. It was the OTHER
   half of legacy chapter SBL_C: three section ids and `outcomes.slice(3)`, while
   Area D took `.slice(0, 3)` of the same chapter. Both are now authored, so SBL_C
   is retired. */
export const SBL_OFFICIAL_F = SBL_TREE_AREA_F
/* Area I is a five-chapter tree — one per professional skill; see
   acca-study-sbl-tree-i.ts. These are 20 of the paper's 100 marks, and the shim
   served all five from four sections of the legacy professional-skills chapter —
   the same chapter Area A used to be carved out of. */
export const SBL_OFFICIAL_I = SBL_TREE_AREA_I

/* Area G is a four-chapter tree — see acca-study-sbl-tree-g.ts. Unlike most of
   this file, the chapter it replaces was genuinely authored rather than shim-built
   — and it was 2 sections and 183 words for what is the biggest chapter in
   Kaplan's text at 76 pages. Its two best ideas are kept and developed: that a
   positive NPV is where advice starts rather than ends, and that a KPI needs a
   definition, owner, target, source and decision response. */
export const SBL_OFFICIAL_G = SBL_TREE_AREA_G

/* Area H is a six-chapter tree — see acca-study-sbl-tree-h.ts. Like Area G the
   chapter it replaces was genuinely authored, and it was 2 sections and 169 words
   for six sub-topics carrying twenty-one learning outcomes. It also held the flow
   diagram whose steps were plain strings, so it rendered as empty boxes. */
export const SBL_OFFICIAL_H = SBL_TREE_AREA_H

/* Area J is a two-chapter tree — see acca-study-sbl-tree-j.ts. It was the
   thinnest chapter in the paper at 1 section and 111 words, and it caused a live
   engine bug: carrying no `id` and no `number`, it sorted ahead of all 45
   authored chapters and became every SBL learner's day one, on an area holding
   three questions. See chooseScope in acca-today-composer. */
export const SBL_OFFICIAL_J = SBL_TREE_AREA_J
