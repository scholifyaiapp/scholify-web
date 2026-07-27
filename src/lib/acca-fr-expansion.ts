import type { OtCase } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { FR_CONTENT_TARGET } from "@/lib/fr-content-contract"

const ENTITIES = ["Alder", "Beacon", "Cedar", "Dale", "Elm", "Firth", "Grove", "Harbour", "Iris", "Juniper"]
const money = (value: number) => `$${value.toLocaleString("en-US")}`

export function completeFrSectionB(existing: OtCase[]): OtCase[] {
  if (existing.length > FR_CONTENT_TARGET.sectionBCases) throw new Error("FR Section B exceeds its case contract")
  const out = [...existing]
  while (out.length < FR_CONTENT_TARGET.sectionBCases) {
    const n = out.length + 1
    const entity = `${ENTITIES[n % ENTITIES.length]} Co`
    const revenue = 1_000_000 + n * 25_000
    const costOfSales = 600_000 + n * 12_000
    const currentAssets = 300_000 + n * 8_000
    const inventory = 80_000 + n * 2_000
    const currentLiabilities = 150_000 + n * 4_000
    const operatingProfit = 140_000 + n * 3_000
    const capitalEmployed = 800_000 + n * 10_000
    const grossProfit = revenue - costOfSales
    const grossMargin = grossProfit / revenue * 100
    const currentRatio = currentAssets / currentLiabilities
    const quickRatio = (currentAssets - inventory) / currentLiabilities
    const roce = operatingProfit / capitalEmployed * 100
    const assetTurnover = revenue / capitalEmployed
    const id = `case-fr-analysis-${String(n).padStart(2, "0")}`
    out.push({
      id,
      paper: "FR",
      area: "C",
      title: `${entity} — financial statement analysis ${n}`,
      scenario:
        `${entity} reports revenue of ${money(revenue)}, cost of sales of ${money(costOfSales)}, current assets of ${money(currentAssets)}, ` +
        `including inventory of ${money(inventory)}, current liabilities of ${money(currentLiabilities)}, operating profit of ` +
        `${money(operatingProfit)} and capital employed of ${money(capitalEmployed)}. Calculate ratios using year-end balances.`,
      questions: [
        { id: `${id}-q1`, paper: "FR", area: "C", type: "number", stem: `In FR case ${n}, calculate gross profit.`, numericAnswer: grossProfit, unit: "$", tolerance: 0.01, explanation: `Gross profit is revenue less cost of sales: ${money(revenue)} − ${money(costOfSales)} = ${money(grossProfit)}.`, marks: 2, difficulty: "easy" },
        { id: `${id}-q2`, paper: "FR", area: "C", type: "number", stem: `In FR case ${n}, calculate gross profit margin to two decimals.`, numericAnswer: Number(grossMargin.toFixed(2)), unit: "%", tolerance: 0.01, explanation: `Gross margin is gross profit divided by revenue: ${money(grossProfit)} ÷ ${money(revenue)} × 100 = ${grossMargin.toFixed(2)}%.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q3`, paper: "FR", area: "C", type: "number", stem: `In FR case ${n}, calculate the current ratio to two decimals.`, numericAnswer: Number(currentRatio.toFixed(2)), unit: ":1", tolerance: 0.01, explanation: `The current ratio compares current assets with current liabilities: ${money(currentAssets)} ÷ ${money(currentLiabilities)} = ${currentRatio.toFixed(2)}:1.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q4`, paper: "FR", area: "C", type: "number", stem: `In FR case ${n}, calculate the quick ratio to two decimals.`, numericAnswer: Number(quickRatio.toFixed(2)), unit: ":1", tolerance: 0.01, explanation: `Exclude inventory from current assets: (${money(currentAssets)} − ${money(inventory)}) ÷ ${money(currentLiabilities)} = ${quickRatio.toFixed(2)}:1.`, marks: 2, difficulty: "hard" },
        { id: `${id}-q5`, paper: "FR", area: "C", type: "number", stem: `In FR case ${n}, calculate ROCE to two decimals.`, numericAnswer: Number(roce.toFixed(2)), unit: "%", tolerance: 0.01, explanation: `ROCE is operating profit divided by capital employed: ${money(operatingProfit)} ÷ ${money(capitalEmployed)} × 100 = ${roce.toFixed(2)}%; asset turnover is ${assetTurnover.toFixed(2)} times.`, marks: 2, difficulty: "medium" },
      ],
    })
  }
  return out
}

const FR_RUBRIC = [
  "Identify the applicable IFRS accounting treatment.",
  "Apply recognition criteria to the scenario facts.",
  "Determine the appropriate initial measurement.",
  "Calculate any subsequent measurement adjustment.",
  "Distinguish capital expenditure from an expense.",
  "Calculate the effect on profit or loss.",
  "Calculate the effect on other comprehensive income where relevant.",
  "Calculate the effect on the statement of financial position.",
  "Prepare a clearly labelled supporting working.",
  "Avoid double counting the adjustment.",
  "Apply materiality and faithful representation.",
  "Explain any estimate or judgement involved.",
  "Calculate a relevant performance ratio.",
  "Calculate a relevant liquidity or position ratio.",
  "Compare the result with the prior period or benchmark.",
  "Explain the operational reason for the movement.",
  "Identify a limitation of the ratio analysis.",
  "Explain any effect of accounting policy choices.",
  "Link the calculations to the user's decision.",
  "Give a supported, scenario-specific conclusion.",
]

export function completeFrSectionC(existing: WrittenQuestion[]): WrittenQuestion[] {
  if (existing.length > FR_CONTENT_TARGET.sectionC) throw new Error("FR Section C exceeds its case contract")
  const out = [...existing]
  while (out.length < FR_CONTENT_TARGET.sectionC) {
    const n = out.length + 1
    const entity = `${ENTITIES[n % ENTITIES.length]} Group`
    const revenue = 2_000_000 + n * 40_000
    const operatingProfit = 260_000 + n * 5_000
    const currentAssets = 500_000 + n * 8_000
    const currentLiabilities = 250_000 + n * 5_000
    const adjustment = 30_000 + n * 1_000
    out.push({
      id: `FR-C-${String(n).padStart(2, "0")}`,
      paper: "FR",
      area: n % 2 ? "B" : "D",
      topic: `Integrated financial reporting case ${n}`,
      stem:
        `${entity} reports draft revenue of ${money(revenue)}, operating profit of ${money(operatingProfit)}, current assets of ` +
        `${money(currentAssets)} and current liabilities of ${money(currentLiabilities)}. A year-end IFRS review identifies an unrecorded ` +
        `adjustment of ${money(adjustment)} whose recognition reduces profit and current assets. Prepare a 20-mark response: explain the ` +
        `appropriate accounting treatment, post the adjustment, calculate the revised figures and key ratios, interpret performance and ` +
        `position, discuss limitations, and conclude for the board.`,
      maxMarks: 20,
      rubric: FR_RUBRIC,
    })
  }
  return out
}
