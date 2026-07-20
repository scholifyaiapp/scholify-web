import type { StudyChapter } from "@/lib/acca-study-content"
import { SBR_A } from "@/lib/acca-study-sbr-a"
import { SBR_B } from "@/lib/acca-study-sbr-b"
import { SBR_C } from "@/lib/acca-study-sbr-c"
import { SBR_D } from "@/lib/acca-study-sbr-d"
import { SBR_E } from "@/lib/acca-study-sbr-e"

const select = (base: StudyChapter, area: string, title: string, ids: string[], intro: string): StudyChapter => ({ ...base, area, title, intro, sections: base.sections.filter((section) => ids.includes(section.id)) })

export const SBR_OFFICIAL_A = select(SBR_A, "A", "Fundamental ethical and professional principles", ["ethics"], "Corporate reporting is a public-interest responsibility. Apply ethical principles to management pressure, bias and difficult judgements, then explain the consequences of misleading stakeholders.")
export const SBR_OFFICIAL_B = select(SBR_A, "B", "The financial reporting framework", ["objective", "qualitative", "elements", "measurement", "regulatory"], "The Conceptual Framework supplies the objectives, qualitative characteristics, definitions and measurement logic used to evaluate reporting choices and regulatory change.")
export const SBR_OFFICIAL_C: StudyChapter = { ...SBR_B, area: "C", title: "Reporting the financial performance of a range of entities", intro: "Apply professional judgement across recognition, measurement, presentation and disclosure. Financial instruments and employee benefits are transaction topics in this official area, not a separate capability.", sections: [...SBR_B.sections, ...SBR_D.sections], outcomes: [...SBR_B.outcomes, ...SBR_D.outcomes], examTraps: [...SBR_B.examTraps, ...SBR_D.examTraps], keyTerms: [...SBR_B.keyTerms, ...SBR_D.keyTerms], summary: [...SBR_B.summary, ...SBR_D.summary] }
export const SBR_OFFICIAL_D: StudyChapter = { ...SBR_C, area: "D", title: "Financial statements of groups of entities" }
export const SBR_OFFICIAL_E: StudyChapter = { ...SBR_E, area: "E", title: "Interpret financial and non-financial information for different stakeholders", intro: "Interpret performance from the specified stakeholder's perspective, challenge the quality and comparability of information, and connect financial and non-financial evidence.", sections: [...SBR_E.sections.filter((section) => section.id !== "current-issues"), { ...SBR_A.sections.find((section) => section.id === "commentary")!, id: "management-commentary" }] }
export const SBR_OFFICIAL_F = select(SBR_E, "F", "The impact of changes and potential changes in accounting regulation", ["current-issues"], "Evaluate new standards and contemporary reporting issues, including digital assets, climate-related matters, global events, IFRS Sustainability Disclosure Standards and their relationship with ESRS.")

export const SBR_OFFICIAL_G: StudyChapter = {
  paper: "SBR", area: "G", title: "Employability and technology skills", minutes: 15,
  intro: "SBR digital competence means controlling evidence and calculations in the computer-based workspace, then presenting technically sound advice that a stakeholder can use.",
  outcomes: ["Navigate requirements and exhibits efficiently", "Prepare traceable spreadsheet adjustments", "Reconcile conflicting financial and non-financial information", "Present professional stakeholder-focused responses"],
  sections: [{ id: "digital-workspace", heading: "Requirement-led digital reporting", blocks: [
    { kind: "text", md: "Start with the **stakeholder, task verb and required output**. Map relevant exhibits before drafting. Validate entity, period, currency and definitions whenever sources conflict; software speed cannot repair a flawed basis." },
    { kind: "table", caption: "Digital controls", head: ["Action", "Professional result"], rows: [["Label each adjustment", "A reviewer can trace the standard, assumption and amount"], ["Link workings", "Changed inputs flow through without inconsistent hard-coding"], ["Reconcile totals", "The adjusted statement remains internally consistent"], ["Use purposeful headings", "Technical analysis answers the specified requirement"], ["State uncertainty", "Advice distinguishes evidence from assumption"]] },
    { kind: "example", title: "Conflicting group data", scenario: "A narrative says an acquisition occurred on 1 January, but the spreadsheet uses 1 April and a different currency scale.", steps: [{ label: "Validate", detail: "Confirm reporting date, acquisition date, entity and units from authoritative exhibits." }, { label: "Control", detail: "Record the chosen basis and keep alternative effects visible if unresolved." }, { label: "Calculate", detail: "Use labelled group adjustments and reconcile the consolidated statement." }, { label: "Advise", detail: "Explain both the reporting effect and why it matters to the named stakeholder." }], result: "The response is technically traceable and decision-useful rather than merely well formatted." },
  ] }],
  examTraps: [{ trap: "Reading exhibits without first analysing the requirement.", fix: "Map stakeholder, verb, output and evidence before drafting." }, { trap: "Hard-coding unexplained spreadsheet totals.", fix: "Use labelled workings and reconciliation checks." }],
  keyTerms: [{ term: "Traceable working", def: "A labelled calculation whose inputs, assumptions and effect can be followed and reviewed." }, { term: "Requirement map", def: "A compact link between the required task, stakeholder, output and relevant evidence." }],
  summary: ["Navigate from requirement to evidence.", "Validate the basis before calculating.", "Make group adjustments traceable and reconciled.", "Translate technical effects into stakeholder consequences."],
}
