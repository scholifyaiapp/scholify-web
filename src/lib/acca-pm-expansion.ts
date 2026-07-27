import type { OtCase } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { PM_CONTENT_TARGET } from "@/lib/pm-content-contract"

const NAMES = ["Atlas", "Briar", "Crest", "Delta", "Elm", "Fjord", "Granite", "Halo", "Ion", "Jade"]

export function completePmSectionB(existing: OtCase[]): OtCase[] {
  if (existing.length > PM_CONTENT_TARGET.sectionBCases) throw new Error("PM Section B exceeds its case contract")
  const out = [...existing]
  while (out.length < PM_CONTENT_TARGET.sectionBCases) {
    const n = out.length + 1
    const name = `${NAMES[n % NAMES.length]} Products`
    const contribution = 15 + (n % 11) * 2
    const variable = 20 + (n % 8) * 3
    const price = contribution + variable
    const breakEven = 3_000 + n * 100
    const fixed = contribution * breakEven
    const safety = 700 + (n % 7) * 100
    const volume = breakEven + safety
    const profit = safety * contribution
    const revenue = volume * price
    const id = `case-pm-performance-${n}`
    out.push({
      id,
      paper: "PM",
      area: n % 2 ? "B" : "D",
      title: `${name} — planning scenario ${n}`,
      scenario:
        `${name} is assessing product ${n}. Its selling price is $${price} per unit, variable cost is $${variable} per unit, ` +
        `fixed costs are $${fixed.toLocaleString("en-US")}, and forecast sales are ${volume.toLocaleString("en-US")} units. ` +
        "The management team needs an integrated profitability and risk assessment before approving the budget.",
      questions: [
        { id: `${id}-q1`, paper: "PM", area: n % 2 ? "B" : "D", type: "number", stem: `What is contribution per unit in PM scenario ${n}?`, numericAnswer: contribution, unit: "$", tolerance: 0, explanation: `Contribution equals selling price less variable cost: $${price} − $${variable} = $${contribution} per unit.`, marks: 2, difficulty: "easy" },
        { id: `${id}-q2`, paper: "PM", area: n % 2 ? "B" : "D", type: "number", stem: `What is the break-even volume in PM scenario ${n}?`, numericAnswer: breakEven, unit: "units", tolerance: 0, explanation: `Break-even volume is fixed cost $${fixed.toLocaleString("en-US")} divided by contribution $${contribution} = ${breakEven.toLocaleString("en-US")} units.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q3`, paper: "PM", area: n % 2 ? "B" : "D", type: "number", stem: `What is the forecast margin of safety in PM scenario ${n}?`, numericAnswer: safety, unit: "units", tolerance: 0, explanation: `Forecast volume ${volume.toLocaleString("en-US")} less break-even volume ${breakEven.toLocaleString("en-US")} gives ${safety.toLocaleString("en-US")} units.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q4`, paper: "PM", area: n % 2 ? "B" : "D", type: "number", stem: `What forecast profit is earned in PM scenario ${n}?`, numericAnswer: profit, unit: "$", tolerance: 0, explanation: `Profit equals margin of safety ${safety.toLocaleString("en-US")} multiplied by contribution $${contribution} = $${profit.toLocaleString("en-US")}.`, marks: 2, difficulty: "hard" },
        { id: `${id}-q5`, paper: "PM", area: n % 2 ? "B" : "D", type: "number", stem: `What forecast sales revenue is generated in PM scenario ${n}?`, numericAnswer: revenue, unit: "$", tolerance: 0, explanation: `Revenue equals forecast volume ${volume.toLocaleString("en-US")} multiplied by price $${price} = $${revenue.toLocaleString("en-US")}.`, marks: 2, difficulty: "medium" },
      ],
    })
  }
  return out
}

const PM_RUBRIC = [
  "Calculate the principal performance measure accurately and show a labelled working.",
  "Compare actual performance with the relevant budget or benchmark rather than an unrelated static figure.",
  "Separate the effect of activity volume from operational efficiency before evaluating management.",
  "Identify at least one favourable movement and explain the operational cause that could produce it.",
  "Identify at least one adverse movement and explain the operational cause that could produce it.",
  "Distinguish controllable factors from factors outside the manager's influence.",
  "Explain why a single financial measure cannot provide a complete assessment of performance.",
  "Recommend a relevant customer or service-quality indicator and explain what it reveals.",
  "Recommend a relevant internal-process indicator and explain what it reveals.",
  "Recommend a learning, people or capability indicator and explain what it reveals.",
  "Connect the proposed indicators to the organisation's stated objectives and critical success factors.",
  "Discuss the risk of short-termism if management is rewarded only for the current period's profit.",
  "Discuss the risk of dysfunctional behaviour or manipulation created by poorly designed targets.",
  "Explain how participation in target setting can improve information quality and commitment.",
  "Explain how an excessively easy or impossible target can damage motivation and decision quality.",
  "Recommend using a balanced set of measures with clear definitions, owners and reporting frequency.",
  "Recommend investigation thresholds so management attention is focused on material exceptions.",
  "Recognise data-quality limitations and verify the consistency of definitions before drawing conclusions.",
  "Give a scenario-specific recommendation supported by the calculations and qualitative evidence.",
  "State a balanced conclusion, including the most important uncertainty or further information required.",
]

export function completePmSectionC(existing: WrittenQuestion[]): WrittenQuestion[] {
  if (existing.length > PM_CONTENT_TARGET.sectionC) throw new Error("PM Section C exceeds its case contract")
  const out = [...existing]
  while (out.length < PM_CONTENT_TARGET.sectionC) {
    const n = out.length + 1
    const name = `${NAMES[n % NAMES.length]} Services`
    const budgetRevenue = 800_000 + n * 25_000
    const actualRevenue = budgetRevenue * (1 + ((n % 5) - 2) / 100)
    const budgetMargin = 12 + (n % 6)
    const actualMargin = budgetMargin - 1 + (n % 3)
    out.push({
      id: `PM-C-${String(n).padStart(2, "0")}`,
      paper: "PM",
      area: n % 2 ? "E" : "F",
      topic: `Integrated performance evaluation ${n}`,
      stem:
        `${name} budgeted revenue of $${budgetRevenue.toLocaleString("en-US")} and an operating margin of ${budgetMargin}%. ` +
        `Actual revenue was $${actualRevenue.toLocaleString("en-US")} and operating margin was ${actualMargin}%. Customer complaints rose, ` +
        `staff training hours fell and managers delayed maintenance to protect current-period profit. Prepare a 20-mark evaluation for the board: ` +
        "calculate and interpret performance, assess behavioural and measurement weaknesses, propose a balanced set of indicators, and recommend action.",
      maxMarks: 20,
      rubric: PM_RUBRIC,
    })
  }
  return out
}
