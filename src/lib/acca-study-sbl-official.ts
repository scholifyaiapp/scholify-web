import type { StudyChapter } from "@/lib/acca-study-content"
import { SBL_C } from "@/lib/acca-study-sbl-c"
import { SBL_D } from "@/lib/acca-study-sbl-d"
import { SBL_E } from "@/lib/acca-study-sbl-e"
import { SBL_TREE_AREA_A } from "@/lib/acca-study-sbl-tree-a"
import { SBL_TREE_AREA_B } from "@/lib/acca-study-sbl-tree-b"
import { SBL_TREE_AREA_C } from "@/lib/acca-study-sbl-tree-c"

/*
 * SBL is mid-rebuild, from a single chapter per syllabus area to a chapter TREE
 * (see acca-study-sbl-tree-a.ts for the standard and the reasoning).
 *
 * Areas still on the legacy bodies below are served by `subset`, which re-cuts
 * five old chapters into ten official areas. That is a shim, not authored
 * content, and it is why the pre-rebuild paper carried ~9,900 words across the
 * whole syllabus: Areas D and F are two slices of ONE legacy chapter, Areas C
 * and E are legacy chapters relabelled wholesale, and Area A used to be carved
 * out of the legacy PROFESSIONAL SKILLS chapter. Each area is replaced by a real
 * tree in turn; delete `subset`, the SBL_A–SBL_E imports and the legacy files
 * once the last area is off it.
 */
function subset(source: StudyChapter, area: string, title: string, ids: string[], intro: string, outcomes: string[]): StudyChapter {
  return { ...source, area, title, intro, outcomes, sections: source.sections.filter((section) => ids.includes(section.id)) }
}

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
export const SBL_OFFICIAL_D = subset(SBL_C, "D", "Risk", ["assess", "tara", "erm"], "Strategic leadership must understand both the exposure created by a choice and the organisation's capacity and appetite to bear it.", SBL_C.outcomes.slice(0, 3))
export const SBL_OFFICIAL_E = { ...SBL_D, area: "E", title: "Technology and data analytics" }
export const SBL_OFFICIAL_F = subset(SBL_C, "F", "Organisational control and audit", ["control", "governance", "fraud"], "Control and assurance turn objectives, risk appetite and legal duties into reliable behaviour, information, escalation and independent challenge.", SBL_C.outcomes.slice(3))
export const SBL_OFFICIAL_I = subset(SBL_E, "I", "Professional skills", ["why-skills", "five-skills", "scepticism-suspicion", "board-advice"], "Professional skills are how a senior adviser converts evidence into communication, analysis, scepticism, commercial judgement and balanced evaluation that another leader can act on.", SBL_E.outcomes.slice(0, 4))

export const SBL_OFFICIAL_G: StudyChapter = {
  paper: "SBL", area: "G", title: "Finance in planning and decision-making", minutes: 18,
  intro: "At board level, finance is not a collection of formulas. It tests whether a strategy creates value, can be funded, survives uncertainty and produces information leaders can govern.",
  outcomes: ["Evaluate finance transformation", "Apply financial and non-financial analysis to strategic choices", "Use investment, valuation and performance techniques at advisory level", "Integrate reporting, tax and funding consequences into recommendations"],
  sections: [
    { id: "finance-transformation", heading: "Finance as insight, control and transformation", blocks: [
      { kind: "text", md: "A transformed finance function combines capable people, standard processes, governed data and appropriate technology to move effort from transaction processing towards **insight, challenge and decision support**. Automation without redesigned controls or skills simply accelerates weak work." },
      { kind: "table", caption: "Board-level financial lens", head: ["Question", "Evidence"], rows: [["Does it create value?", "NPV, economic return, strategic benefits"], ["Can it be funded?", "Liquidity, leverage, covenants, timing"], ["How fragile is it?", "Sensitivity, scenarios, concentration and options"], ["What else changes?", "Tax, reporting, control, stakeholders and sustainability"]] },
      { kind: "callout", tone: "rule", title: "Positive NPV is a start, not a conclusion", md: "Validate assumptions, financing capacity, implementation capability and stakeholder consequences before recommending commitment." },
    ] },
    { id: "decision", heading: "Evidence-led strategic financial advice", blocks: [
      { kind: "example", title: "Transformation business case", scenario: "A platform costs $2.0m and has present-value financial benefits of $2.6m, but the forecast assumes rapid customer migration and the debt facility has little covenant headroom.", steps: [{ label: "Value", detail: "Base-case NPV is $0.6m." }, { label: "Challenge", detail: "Test migration rate, cost overruns and benefit timing; quantify switching values." }, { label: "Fund", detail: "Model liquidity and covenant headroom under downside scenarios." }, { label: "Advise", detail: "Recommend staged approval with adoption gates, benefit ownership and financing safeguards." }], result: "The advice preserves the value opportunity without ignoring execution and funding risk." },
      { kind: "text", md: "Performance information should combine lagging financial outcomes with leading operational and stakeholder drivers. Avoid a dashboard of disconnected measures: each KPI needs a definition, owner, target, data source, frequency and decision response." },
    ] },
  ],
  examTraps: [{ trap: "Recommending solely because NPV is positive.", fix: "Challenge assumptions and integrate funding, implementation and stakeholder effects." }, { trap: "Calling automation finance transformation.", fix: "Evaluate people, process, data, controls and decision quality together." }],
  keyTerms: [{ term: "Finance transformation", def: "Coordinated redesign of finance people, processes, data and technology to improve control and decision support." }, { term: "Benefit owner", def: "The executive accountable for realising and measuring a business-case benefit." }],
  summary: ["Use finance to test value, capacity and resilience.", "Challenge the business case rather than repeating it.", "Integrate financial, strategic and stakeholder evidence.", "Make benefits owned and measurable."],
}

export const SBL_OFFICIAL_H: StudyChapter = {
  paper: "SBL", area: "H", title: "Enabling success, managing change and project management", minutes: 19,
  intro: "Strategy becomes real through structure, people, change and disciplined projects. Success means realised benefits—not merely a system delivered on its original date.",
  outcomes: ["Advise on organisation, collaboration and disruptive innovation", "Evaluate talent and performance excellence", "Plan and lead strategic change", "Govern projects from business case through benefits realisation"],
  sections: [
    { id: "enable", heading: "Organisation, talent and performance excellence", blocks: [
      { kind: "text", md: "Structure should follow strategic work: clarify decision rights, accountability, coordination and information flow. Partnerships and shared services can add capability but require governance over objectives, data, performance and exit." },
      { kind: "text", md: "Talent management connects workforce planning, recruitment, development, succession, reward and retention to future capabilities. Performance excellence combines customer value, process learning, evidence and continuous improvement—not target pressure alone." },
      { kind: "diagram", diagram: { type: "flow", title: "From strategy to capability", data: { steps: [{ label: "Strategic outcomes" }, { label: "Required capabilities" }, { label: "Structure and roles" }, { label: "Talent and resources" }, { label: "Measures and learning" }, { label: "Benefits" }] } } },
    ] },
    { id: "change-project", heading: "Change and project governance", blocks: [
      { kind: "text", md: "A credible change case explains **why now, what changes, who is affected and how success will be measured**. Leaders build readiness through two-way engagement, capability, visible sponsorship and reinforcement while addressing legitimate resistance rather than labelling every challenge obstruction." },
      { kind: "table", caption: "Core project governance", head: ["Artefact/role", "Purpose"], rows: [["Business case", "Justifies value, options, cost, risk and benefits"], ["Project initiation document", "Baselines scope, governance, plan, resources and controls"], ["Sponsor", "Owns strategic case and removes executive barriers"], ["Project manager", "Coordinates delivery within approved constraints"], ["Benefit owner", "Realises outcomes after outputs are delivered"]] },
      { kind: "callout", tone: "warn", title: "On time is not the same as successful", md: "Review adoption, operating outcomes and benefits after implementation. A delivered output that nobody uses can be a controlled project and a strategic failure." },
    ] },
  ],
  examTraps: [{ trap: "Treating resistance as irrational.", fix: "Analyse interests, uncertainty, workload, capability and trust, then design engagement and support." }, { trap: "Closing a project when the system goes live.", fix: "Transfer ownership and track adoption and benefits through post-implementation review." }],
  keyTerms: [{ term: "Change readiness", def: "The willingness, capability and capacity of affected stakeholders to adopt a change." }, { term: "Project initiation document", def: "The approved baseline for project scope, governance, responsibilities, plan, resources and risks." }],
  summary: ["Align structure and talent to strategic capabilities.", "Create a credible, participative change path.", "Govern scope, value, risk and accountability.", "Measure adoption and realised benefits."],
}

export const SBL_OFFICIAL_J: StudyChapter = {
  paper: "SBL", area: "J", title: "Other employability and digital skills", minutes: 15,
  intro: "The SBL workspace rewards disciplined navigation and professional production: understand the requirement, control the evidence and create the deliverable a real recipient needs.",
  outcomes: ["Navigate pre-seen and live exhibits efficiently", "Use digital response tools professionally", "Reconcile and manipulate evidence transparently", "Present decision-ready outputs"],
  sections: [{ id: "workspace", heading: "Requirement-led digital execution", blocks: [
    { kind: "text", md: "Map every requirement to the **role, recipient, task verb, output and relevant exhibits**. The pre-seen supplies context; live exhibits supply task evidence. Do not force a rehearsed model onto facts that point elsewhere." },
    { kind: "table", caption: "Digital response controls", head: ["Action", "Professional result"], rows: [["Exhibit map", "Focused evidence without omission"], ["Purposeful headings", "Readable structure matched to the deliverable"], ["Traceable calculations", "Reviewable assumptions and conclusions"], ["Conflict log", "Visible reconciliation of inconsistent sources"], ["Final requirement check", "Every requested action answered"]] },
    { kind: "example", title: "Conflicting evidence", scenario: "A director says service improved, while the dashboard shows complaints rising; the periods and definitions differ.", steps: [{ label: "Validate", detail: "Reconcile periods, populations and definitions." }, { label: "Quantify", detail: "Restate comparable trends where the data permits." }, { label: "Challenge", detail: "Explain what the evidence supports and what remains uncertain." }, { label: "Communicate", detail: "Recommend a consistent measure and action, not an arbitrary average." }], result: "Digital judgement converts inconsistency into a transparent decision issue." },
  ] }],
  examTraps: [{ trap: "Copying exhibits into a generic essay.", fix: "Synthesise evidence for the recipient, decision and required output." }, { trap: "Ignoring conflicting definitions or periods.", fix: "Reconcile the bases and state unresolved limitations." }],
  keyTerms: [{ term: "Exhibit map", def: "A requirement-led index connecting evidence sources to tasks and outputs." }],
  summary: ["Start from role, verb, recipient and output.", "Use pre-seen as context, not a rehearsed answer.", "Control calculations and conflicting evidence.", "Finish with prioritised action."],
}
