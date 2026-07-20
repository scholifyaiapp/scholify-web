import type { StudyChapter } from "@/lib/acca-study-content"
import { FR_A } from "@/lib/acca-study-fr-a"
import { FR_B } from "@/lib/acca-study-fr-b"
import { FR_C } from "@/lib/acca-study-fr-c"
import { FR_D } from "@/lib/acca-study-fr-d"
import { FR_E } from "@/lib/acca-study-fr-e"

export const FR_OFFICIAL_A = FR_A
export const FR_OFFICIAL_B = FR_B
export const FR_OFFICIAL_C = FR_C
export const FR_OFFICIAL_D: StudyChapter = {
  ...FR_D,
  title: "Preparation of single-entity and consolidated financial statements",
  minutes: FR_D.minutes + FR_E.minutes,
  intro: `${FR_D.intro} The same preparation discipline extends to a simple group, where parent and subsidiaries are presented as one economic entity.`,
  outcomes: [...FR_D.outcomes, ...FR_E.outcomes],
  sections: [...FR_D.sections, ...FR_E.sections.map((section) => ({ ...section, id: `group-${section.id}` }))],
  examTraps: [...FR_D.examTraps, ...FR_E.examTraps],
  keyTerms: [...FR_D.keyTerms, ...FR_E.keyTerms],
  summary: [...FR_D.summary, ...FR_E.summary],
}
export const FR_OFFICIAL_E: StudyChapter = {
  paper: "FR", area: "E", title: "Employability and technology skills", minutes: 16,
  intro: "Financial reporting work is valuable only when the data is controlled, the calculation is traceable and the conclusion is communicated for a real user.",
  outcomes: ["Navigate and validate digital financial information", "Use spreadsheet formulas and controls efficiently", "Prepare reviewable financial-statement workings", "Present analysis clearly for stakeholders"],
  sections: [
    { id: "digital-workflow", heading: "A controlled digital reporting workflow", blocks: [
      { kind: "text", md: "Start by confirming the **entity, reporting period, currency, units and source**. Separate inputs from formulas, label workings conventionally and cross-reference every total to the statement or note it supports." },
      { kind: "table", caption: "Professional spreadsheet controls", head: ["Control", "Purpose"], rows: [["Cell references", "Recalculate automatically and preserve traceability"], ["Control totals", "Expose omissions and double counting"], ["Reasonableness review", "Identify sign, scale and classification errors"], ["Version labels", "Prevent use of an obsolete dataset or working"]] },
      { kind: "callout", tone: "rule", title: "No unexplained number", md: "A reviewer should be able to move from a reported figure to its working, inputs and source without guessing." },
    ] },
    { id: "communication", heading: "From calculation to decision-useful communication", blocks: [
      { kind: "text", md: "A professional response does more than state that a ratio increased. **Calculate, compare, explain the business cause, connect it to the stakeholder and conclude.** Use labeled tables or charts only where they make the comparison easier to understand." },
      { kind: "example", title: "Operating-margin commentary", scenario: "Operating margin falls from 14% to 10% while revenue rises and administrative expenses increase sharply.", steps: [{ label: "Compare", detail: "Margin fell by 4 percentage points despite revenue growth." }, { label: "Explain", detail: "Administrative expenses grew faster than revenue and compressed operating profit." }, { label: "Conclude", detail: "Management should investigate the cost increase; a lender would note weaker headroom for finance costs." }], result: "The response converts a digital calculation into stakeholder-focused analysis." },
    ] },
  ],
  examTraps: [{ trap: "Hard-coding totals or presenting an unlabeled chart.", fix: "Use traceable formulas and state the measure, period and units." }, { trap: "Describing movement without explaining it.", fix: "Link the movement to scenario evidence and the user's decision." }],
  keyTerms: [{ term: "Audit trail", def: "A traceable path from reported output through workings to source data." }, { term: "Control total", def: "An independently expected total used to test completeness and accuracy." }],
  summary: ["Validate the dataset before calculating.", "Keep every working traceable and reviewable.", "Communicate comparisons, causes and stakeholder implications."],
}
