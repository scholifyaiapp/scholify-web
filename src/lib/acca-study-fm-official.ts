import type { StudyChapter } from "@/lib/acca-study-content"
import { FM_TREE_AREA_A } from "@/lib/acca-study-fm-tree-a"
import { FM_TREE_AREA_C } from "@/lib/acca-study-fm-tree-c"
import { FM_TREE_AREA_D } from "@/lib/acca-study-fm-tree-d"
import { FM_TREE_AREA_E } from "@/lib/acca-study-fm-tree-e"
import { FM_TREE_AREA_B, FM_TREE_AREA_F, FM_TREE_AREA_G } from "@/lib/acca-study-fm-tree-bfg"

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

/*
 * H carries a number and an id like every other chapter now. Without them it
 * sorted ahead of the whole tree, so a brand-new FM learner's first day was
 * "Employability and technology skills" — an area with four questions in the
 * entire bank. Quizzes took all four and practice got none.
 */
export const FM_OFFICIAL_H: StudyChapter = {
  paper: "FM", id: "FM-25", number: 25, area: "H", title: "Employability and technology skills", minutes: 16,
  intro: "A professional finance model makes assumptions visible, calculations reproducible and recommendations useful to decision-makers.",
  outcomes: ["Build controlled spreadsheet workings", "Use digital tools for scenarios and sensitivity", "Review financial models for logic and reasonableness", "Present recommendations professionally"],
  sections: [
    { id: "model", heading: "A model another professional can trust", blocks: [
      { kind: "text", md: "Separate **inputs, calculations, outputs and checks**. Label currency, units and timing; use cell references instead of embedded constants; preserve the base case; and show a reconciliation or independent reasonableness check." },
      { kind: "table", caption: "Model controls", head: ["Control", "What it prevents"], rows: [["Dedicated assumption cells", "Hidden hard-coded changes"], ["Timeline and units", "Period and scale errors"], ["Control totals", "Omissions and broken links"], ["Scenario copies or data tables", "Overwriting the approved base case"]] },
      { kind: "example", title: "Board-ready investment recommendation", scenario: "A project has a positive NPV but turns negative if sales volume falls by 8%.", steps: [{ label: "Value", detail: "State the base-case NPV and decision rule." }, { label: "Expose uncertainty", detail: "Show the 8% switching point and the assumption behind it." }, { label: "Broaden judgement", detail: "Discuss capacity, strategy, implementation and financing constraints." }, { label: "Recommend", detail: "Accept conditionally only if the volume assumption is supportable and monitored." }], result: "The model supports judgement rather than hiding uncertainty behind one number." },
    ] },
  ],
  examTraps: [{ trap: "Typing a calculated answer into the output cell.", fix: "Use a visible formula linked to labeled assumptions and workings." }, { trap: "Giving an NPV with no recommendation or risk discussion.", fix: "State the decision, assumptions, sensitivity and relevant non-financial factors." }],
  keyTerms: [{ term: "Switching value", def: "The change in an input that reduces a project's NPV to zero." }, { term: "Model control", def: "A check or design feature that prevents, detects or exposes modelling error." }],
  summary: ["Separate assumptions from formulas.", "Keep timing and units explicit.", "Use scenarios without overwriting the base case.", "Turn outputs into a clear, risk-aware recommendation."],
}
