import type { StudyChapter } from "@/lib/acca-study-content"
import { AFM_A } from "@/lib/acca-study-afm-a"
import { AFM_B } from "@/lib/acca-study-afm-b"
import { AFM_C } from "@/lib/acca-study-afm-c"
import { AFM_D } from "@/lib/acca-study-afm-d"
import { AFM_E } from "@/lib/acca-study-afm-e"

export const AFM_OFFICIAL_A = { ...AFM_A, title: "Role of the senior financial adviser in the multinational organisation" }
export const AFM_OFFICIAL_B = AFM_B
export const AFM_OFFICIAL_C = AFM_C
export const AFM_OFFICIAL_D = AFM_D
export const AFM_OFFICIAL_E = AFM_E

export const AFM_OFFICIAL_F: StudyChapter = {
  paper: "AFM", area: "F", title: "Professional skills", minutes: 16,
  intro: "AFM marks the quality of senior advice as well as the calculation: communicate for the recipient, analyse relationships, challenge assumptions and recommend a commercially viable course.",
  outcomes: ["Communicate in the requested professional format", "Analyse and evaluate financial and strategic evidence", "Apply professional scepticism to claims and assumptions", "Demonstrate commercial acumen in recommendations"],
  sections: [{ id: "professional-advice", heading: "From financial model to board decision", blocks: [
    { kind: "table", caption: "Four professional-skill lenses", head: ["Skill", "Observable evidence"], rows: [["Communication", "Purposeful structure, relevant tone, clear findings and action"], ["Analysis and evaluation", "Relationships, quantified consequences, balanced alternatives and judgement"], ["Scepticism", "Challenge assumptions, identify bias and seek sufficient evidence"], ["Commercial acumen", "Integrate value with funding, strategy, operations, stakeholders and feasibility"]] },
    { kind: "text", md: "A technically correct NPV or hedge is an **input**, not a recommendation. Explain what drives it, how fragile it is, whether the organisation can finance and implement it, and what conditions or controls should attach to approval." },
    { kind: "example", title: "Acquisition under pressure", scenario: "Management's proposed acquisition creates value only if volume rises 18%, while debt funding leaves little covenant headroom.", steps: [{ label: "Analyse", detail: "Separate stand-alone value, control premium and forecast synergy." }, { label: "Challenge", detail: "Test the 18% assumption, integration costs and break-even synergy." }, { label: "Evaluate", detail: "Model liquidity and covenant downside alongside strategic fit." }, { label: "Advise", detail: "Recommend rejection, renegotiation or conditional approval with quantified limits." }], result: "The board receives a defensible decision, not a repeated management forecast." },
  ] }],
  examTraps: [{ trap: "Giving a recommendation from one headline number.", fix: "Evaluate assumptions, financeability, risk and strategic consequences." }, { trap: "Listing professional skills.", fix: "Demonstrate them through evidence-led analysis and tailored communication." }],
  keyTerms: [{ term: "Professional scepticism", def: "An enquiring mind that challenges assertions and seeks sufficient evidence before accepting conclusions." }, { term: "Commercial acumen", def: "Judgement that connects financial evidence to the organisation, market, stakeholders and practical feasibility." }],
  summary: ["Write for the specified recipient and purpose.", "Analyse drivers and alternatives, not only outputs.", "Challenge optimistic or incomplete evidence.", "Recommend a viable action with conditions and consequences."],
}

export const AFM_OFFICIAL_G: StudyChapter = {
  paper: "AFM", area: "G", title: "Employability and technology skills", minutes: 14,
  intro: "The digital workspace should make complex finance controllable: validated evidence, transparent models, consistent scenarios and decision-ready presentation.",
  outcomes: ["Navigate requirements and exhibits efficiently", "Build transparent valuation and risk models", "Control multi-currency and multi-period evidence", "Present analysis professionally with digital tools"],
  sections: [{ id: "digital-finance", heading: "Controlled digital financial advice", blocks: [
    { kind: "text", md: "Map each requirement to its recipient, verb, output and exhibits. Before combining inputs, validate **dates, currencies, units, tax bases and nominal/real assumptions**. Separate model inputs, calculations and outputs so sensitivities remain consistent and reviewable." },
    { kind: "table", caption: "Model controls", head: ["Control", "Purpose"], rows: [["Input sheet", "Visible assumptions, sources and units"], ["Linked calculations", "Consistent changes without hidden hard-coding"], ["Base/downside comparison", "Transparent risk and decision thresholds"], ["Reconciliation", "Bridge enterprise/equity value, NPV/APV or exposure/hedge result"], ["Output summary", "Relevant findings, limitations and actions for the recipient"]] },
  ] }],
  examTraps: [{ trap: "Mixing currencies or nominal and real inputs.", fix: "Validate and label the basis before modelling." }, { trap: "Showing calculations without decision meaning.", fix: "Translate model effects into risks, choices and recommendations." }],
  keyTerms: [{ term: "Model integrity", def: "Consistency, traceability and reviewability across assumptions, calculations, scenarios and outputs." }],
  summary: ["Start from the requirement and evidence map.", "Validate every input basis.", "Keep models linked, labelled and reconciled.", "Present decision meaning, not spreadsheet volume."],
}
