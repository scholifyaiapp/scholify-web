import type { OtCase } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { FM_CONTENT_TARGET } from "@/lib/fm-content-contract"

const ENTITIES = ["Alder", "Beacon", "Cedar", "Dale", "Elm", "Firth", "Grove", "Harbour", "Iris", "Juniper"]
const usd = (value: number) => `$${value.toLocaleString("en-US")}`

export function completeFmSectionB(existing: OtCase[]): OtCase[] {
  if (existing.length > FM_CONTENT_TARGET.sectionBCases) throw new Error("FM Section B exceeds its case contract")
  const out = [...existing]
  while (out.length < FM_CONTENT_TARGET.sectionBCases) {
    const n = out.length + 1
    const entity = `${ENTITIES[n % ENTITIES.length]} Co`
    const price = 80 + n
    const variableCost = 45 + (n % 10)
    const volume = 10_000 + n * 200
    const fixedCost = 180_000 + n * 2_000
    const investment = 500_000 + n * 5_000
    const contribution = price - variableCost
    const totalContribution = contribution * volume
    const operatingCashFlow = totalContribution - fixedCost
    const accountingReturn = operatingCashFlow / investment * 100
    const breakEven = fixedCost / contribution
    const id = `case-fm-investment-${String(n).padStart(2, "0")}`
    out.push({
      id,
      paper: "FM",
      area: ["C", "D", "E"][n % 3],
      title: `${entity} — investment appraisal ${n}`,
      scenario:
        `${entity} is evaluating a project requiring an initial investment of ${usd(investment)}. It will sell ${volume.toLocaleString("en-US")} ` +
        `units annually at ${usd(price)} each. Variable cost is ${usd(variableCost)} per unit and annual fixed cash cost is ${usd(fixedCost)}. ` +
        `Ignore tax, inflation and residual value for these linked calculations.`,
      questions: [
        { id: `${id}-q1`, paper: "FM", area: "C", type: "number", stem: `In FM case ${n}, calculate contribution per unit.`, numericAnswer: contribution, unit: "$", tolerance: 0.01, explanation: `Contribution per unit is selling price less variable cost: ${usd(price)} − ${usd(variableCost)} = ${usd(contribution)}.`, marks: 2, difficulty: "easy" },
        { id: `${id}-q2`, paper: "FM", area: "C", type: "number", stem: `In FM case ${n}, calculate annual total contribution.`, numericAnswer: totalContribution, unit: "$", tolerance: 0.01, explanation: `Annual contribution is ${usd(contribution)} per unit multiplied by ${volume.toLocaleString("en-US")} units, giving ${usd(totalContribution)}.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q3`, paper: "FM", area: "C", type: "number", stem: `In FM case ${n}, calculate annual operating cash flow.`, numericAnswer: operatingCashFlow, unit: "$", tolerance: 0.01, explanation: `Deduct fixed cash cost from total contribution: ${usd(totalContribution)} − ${usd(fixedCost)} = ${usd(operatingCashFlow)}.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q4`, paper: "FM", area: "C", type: "number", stem: `In FM case ${n}, calculate the break-even volume to two decimals.`, numericAnswer: Number(breakEven.toFixed(2)), unit: "units", tolerance: 0.01, explanation: `Break-even volume is fixed cost divided by unit contribution: ${usd(fixedCost)} ÷ ${usd(contribution)} = ${breakEven.toFixed(2)} units.`, marks: 2, difficulty: "hard" },
        { id: `${id}-q5`, paper: "FM", area: "D", type: "number", stem: `In FM case ${n}, calculate annual cash return on initial investment to two decimals.`, numericAnswer: Number(accountingReturn.toFixed(2)), unit: "%", tolerance: 0.01, explanation: `Annual cash return is operating cash flow divided by initial investment: ${usd(operatingCashFlow)} ÷ ${usd(investment)} × 100 = ${accountingReturn.toFixed(2)}%.`, marks: 2, difficulty: "medium" },
      ],
    })
  }
  return out
}

const FM_RUBRIC = [
  "Identify relevant incremental cash flows.", "Exclude sunk costs from the appraisal.", "Include opportunity costs.",
  "Include working-capital investment and recovery.", "Apply inflation consistently.", "Calculate taxable cash flows.",
  "Calculate capital allowances and tax benefits.", "Apply tax payment timing correctly.", "Select the appropriate discount rate.",
  "Calculate discount factors accurately.", "Calculate present values of operating flows.", "Calculate present values of terminal flows.",
  "Calculate net present value.", "Interpret the NPV decision correctly.", "Perform a relevant sensitivity calculation.",
  "Explain a limitation of the appraisal.", "Consider financing or business risk.", "Separate investment and financing decisions.",
  "Recommend an action supported by calculations.", "Give a balanced scenario-specific conclusion.",
]

export function completeFmSectionC(existing: WrittenQuestion[]): WrittenQuestion[] {
  if (existing.length > FM_CONTENT_TARGET.sectionC) throw new Error("FM Section C exceeds its case contract")
  const out = [...existing]
  while (out.length < FM_CONTENT_TARGET.sectionC) {
    const n = out.length + 1
    const entity = `${ENTITIES[n % ENTITIES.length]} Manufacturing`
    const investment = 800_000 + n * 10_000
    const annualFlow = 240_000 + n * 4_000
    const workingCapital = 70_000 + n * 1_000
    out.push({
      id: `FM-C-${String(n).padStart(2, "0")}`,
      paper: "FM",
      area: n % 2 ? "D" : "E",
      topic: `Integrated financial management case ${n}`,
      stem:
        `${entity} is considering a four-year project requiring equipment costing ${usd(investment)} and immediate working capital of ` +
        `${usd(workingCapital)}. Forecast annual pre-tax operating cash flow is ${usd(annualFlow)}. Working capital is recovered at the ` +
        `end; the project has no residual value. Using the tax, capital-allowance and discount-rate information supplied in Scholify's ` +
        `exam workspace, prepare a 20-mark appraisal: calculate NPV with labelled workings, assess sensitivity and risk, discuss relevant ` +
        `financing considerations, and recommend whether the project should proceed.`,
      maxMarks: 20,
      rubric: FM_RUBRIC,
    })
  }
  return out
}
