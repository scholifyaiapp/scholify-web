import type { OtCase } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { AA_CONTENT_TARGET } from "@/lib/aa-content-contract"

const CLIENTS = ["Alder", "Beacon", "Cedar", "Dale", "Elm", "Firth", "Grove", "Harbour", "Iris", "Juniper"]

export function completeAaSectionA(existing: OtCase[]): OtCase[] {
  if (existing.length > AA_CONTENT_TARGET.sectionACases) throw new Error("AA Section A exceeds its case contract")
  const out = [...existing]
  while (out.length < AA_CONTENT_TARGET.sectionACases) {
    const n = out.length + 1
    const client = `${CLIENTS[n % CLIENTS.length]} Co`
    const id = `case-aa-audit-${String(n).padStart(2, "0")}`
    out.push({
      id,
      paper: "AA",
      area: ["B", "C", "D", "E"][n % 4],
      title: `${client} — audit planning scenario ${n}`,
      scenario:
        `${client} is a growing retailer. Revenue increased rapidly after an online launch, inventory is held at several new locations, ` +
        `the finance team is inexperienced, management bonuses depend on profit, and a major customer is disputing its year-end balance. ` +
        `The audit team is planning procedures and documenting risks, controls and evidence.`,
      questions: [
        { id: `${id}-q1`, paper: "AA", area: "B", type: "mcq", stem: `In AA scenario ${n}, which factor most directly creates an inherent risk of revenue overstatement?`, options: ["Management bonuses depend on reported profit", "Inventory is stored at several locations", "The audit team is planning procedures", "The entity operates as a retailer"], correct: 0, explanation: "A profit-based bonus creates management bias and an incentive to record fictitious or premature revenue, directly increasing the risk of overstatement.", marks: 2, difficulty: "easy" },
        { id: `${id}-q2`, paper: "AA", area: "B", type: "mcq", stem: `In AA scenario ${n}, which assertion is most exposed by inventory held at several new locations?`, options: ["Existence", "Rights of receivables", "Accuracy of payroll", "Classification of share capital"], correct: 0, explanation: "Inventory dispersed across new locations may be missing, duplicated or fictitious, so physical attendance and test counts principally address existence.", marks: 2, difficulty: "medium" },
        { id: `${id}-q3`, paper: "AA", area: "C", type: "mcq", stem: `In AA scenario ${n}, what is the strongest evidence for the disputed customer balance?`, options: ["A direct external confirmation from the customer", "Management's oral assurance", "A copy of the sales budget", "The prior-year audit file"], correct: 0, explanation: "A confirmation received directly from an independent customer is more reliable than internally generated evidence or management representation.", marks: 2, difficulty: "medium" },
        { id: `${id}-q4`, paper: "AA", area: "D", type: "mcq", stem: `In AA scenario ${n}, which procedure best tests inventory existence?`, options: ["Attend the count and trace test counts to final records", "Inspect post-year-end supplier statements", "Recalculate payroll deductions", "Review the board's dividend forecast"], correct: 0, explanation: "Observing count controls and tracing auditor test counts into the final inventory record provides evidence that recorded inventory physically exists.", marks: 2, difficulty: "hard" },
        { id: `${id}-q5`, paper: "AA", area: "E", type: "mcq", stem: `In AA scenario ${n}, what should the auditor do first if management refuses a material receivables adjustment?`, options: ["Evaluate materiality and pervasiveness for the audit opinion", "Automatically issue an adverse opinion", "Withdraw without communicating", "Ignore the matter because it is disputed"], correct: 0, explanation: "The auditor must quantify the uncorrected misstatement and assess its materiality and pervasiveness before determining the appropriate modified opinion.", marks: 2, difficulty: "medium" },
      ],
    })
  }
  return out
}

const AA_RUBRIC = [
  "Identify the relevant audit or business risk from the scenario.",
  "Explain why the matter can cause material misstatement.",
  "Identify the affected financial statement assertion.",
  "State the affected balance, transaction class or disclosure.",
  "Design a procedure that directly responds to the risk.",
  "Specify the document, record, person or asset to inspect.",
  "State the purpose of the procedure and expected evidence.",
  "Use an external source where stronger evidence is available.",
  "Distinguish a test of control from a substantive procedure.",
  "Avoid vague instructions such as merely 'check' or 'ensure'.",
  "Identify a relevant control deficiency.",
  "Explain the consequence of that deficiency.",
  "Recommend a practical control with clear responsibility.",
  "Explain how the recommendation addresses the deficiency.",
  "Consider materiality in evaluating the matter.",
  "Consider management bias or fraud risk where relevant.",
  "Communicate significant matters to those charged with governance.",
  "Evaluate whether sufficient appropriate evidence was obtained.",
  "Determine the reporting implication if the matter remains unresolved.",
  "Give a clear, scenario-specific conclusion.",
]

export function completeAaSectionB(existing: WrittenQuestion[]): WrittenQuestion[] {
  if (existing.length > AA_CONTENT_TARGET.sectionBConstructed) throw new Error("AA Section B exceeds its constructed-response contract")
  const out = [...existing]
  while (out.length < AA_CONTENT_TARGET.sectionBConstructed) {
    const n = out.length + 1
    const client = `${CLIENTS[n % CLIENTS.length]} Industries`
    out.push({
      id: `AA-B-${String(n).padStart(2, "0")}`,
      paper: "AA",
      area: ["B", "C", "D", "E"][n % 4],
      topic: `Integrated audit response ${n}`,
      stem:
        `${client} has expanded rapidly, introduced a new accounting system shortly before year end, holds inventory at third-party ` +
        `warehouses, offers sales staff profit-linked bonuses and has overdue receivables from a major customer. The finance director ` +
        `expects an unmodified opinion and asks the audit team to rely mainly on management explanations. Prepare an audit response: ` +
        `identify and explain risks and control deficiencies, design specific audit procedures, evaluate evidence and ethics, and explain ` +
        `the reporting consequences of unresolved material matters. (${n % 3 === 0 ? 30 : 20} marks)`,
      maxMarks: n % 3 === 0 ? 30 : 20,
      rubric: AA_RUBRIC,
    })
  }
  return out
}
