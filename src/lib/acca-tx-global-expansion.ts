import type { AccaQuestion, OtCase } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { TX_GLOBAL_CONTENT_TARGET } from "@/lib/tx-content-contract"

const NAMES = ["Aster", "Beacon", "Cobalt", "Dover", "Elm", "Falcon", "Grove", "Harbour"]

export function completeTxGlobalSectionB(): OtCase[] {
  return Array.from({ length: TX_GLOBAL_CONTENT_TARGET.foundationCases }, (_, index) => {
    const n = index + 1, income = 60_000 + n * 500, allowance = 10_000, taxable = income - allowance
    const sale = 40_000 + n * 400, cost = 22_000 + n * 200, sales = 90_000 + n * 1_000
    const id = `case-tx-global-${String(n).padStart(2, "0")}`
    const q = (suffix: string, area: string, stem: string, answer: number, explanation: string, difficulty: AccaQuestion["difficulty"]): AccaQuestion => ({
      id: `${id}-${suffix}`, paper: "TX", area, type: "number", stem, numericAnswer: answer, unit: "CU", tolerance: 0.01, explanation, marks: 2, difficulty,
    })
    return {
      id, paper: "TX", area: ["B", "C", "E", "F"][index % 4],
      title: `${NAMES[index % NAMES.length]} — international foundation case ${n}`,
      scenario: `In Jurisdiction Z, gross income is CU ${income}; a CU ${allowance} allowance and 20% income-tax rate apply. Payroll contribution is 5% of gross income. An asset is sold for CU ${sale} and cost CU ${cost}; gains are taxed at 15% with no exemption. Tax-exclusive sales are CU ${sales} and consumption tax is 10%.`,
      questions: [
        q("q1", "B", `Case ${n}: calculate taxable income.`, taxable, `${income} − ${allowance} = ${taxable}.`, "easy"),
        q("q2", "B", `Case ${n}: calculate income tax.`, taxable * .2, `${taxable} × 20% = ${taxable * .2}.`, "medium"),
        q("q3", "B", `Case ${n}: calculate payroll contribution.`, income * .05, `${income} × 5% = ${income * .05}.`, "medium"),
        q("q4", "C", `Case ${n}: calculate tax on the asset gain.`, (sale - cost) * .15, `(${sale} − ${cost}) × 15% = ${(sale - cost) * .15}.`, "hard"),
        q("q5", "F", `Case ${n}: calculate output consumption tax.`, sales * .1, `${sales} × 10% = ${sales * .1}.`, "medium"),
      ],
    }
  })
}

export function completeTxGlobalSectionC(): WrittenQuestion[] {
  const areas = ["B", "C", "D", "E", "F"]
  return Array.from({ length: TX_GLOBAL_CONTENT_TARGET.foundationWritten }, (_, index) => ({
    id: `TX-C-GLOBAL-${String(index + 1).padStart(2, "0")}`, paper: "TX", area: areas[index % areas.length],
    topic: `International tax foundation case ${index + 1}`,
    stem: `A taxpayer operates in Jurisdictions X and Y. The appendix supplies every applicable rate, threshold, residence test and treaty rule. Prepare the relevant computation, explain residence and source consequences, describe compliance, and advise the taxpayer. (20 marks)`,
    maxMarks: 20,
    rubric: ["Identify the taxpayer", "Identify the period", "Apply residence", "Apply source", "Classify each item", "Use supplied rates", "Apply thresholds", "Calculate gross base", "Apply deductions", "Apply exemptions", "Calculate net base", "Calculate initial liability", "Identify double taxation", "Apply treaty rules", "Apply foreign tax credit", "Distinguish liability and payment", "State filing consequence", "Explain assumptions", "Check arithmetic and currency", "Give a supported conclusion"],
  }))
}
