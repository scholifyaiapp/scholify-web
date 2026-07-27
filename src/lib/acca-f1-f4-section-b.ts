import type { AccaQuestion, OtCase } from "@/lib/acca-content"
import type { StudyChapter } from "@/lib/acca-study-content"
import { F1_F4_CONTENT_TARGET, F1_F4_PAPERS } from "@/lib/f1-f4-content-contract"

const TARGET_PAPERS = new Set<string>(F1_F4_PAPERS)
const COMPANY_NAMES = ["Aster", "Beacon", "Cobalt", "Dover", "Ember", "Falcon", "Grove", "Helix", "Indigo", "Juniper", "Keystone", "Lotus"]

function linkedCount(cases: OtCase[]): number {
  return cases.reduce((total, item) => total + item.questions.length, 0)
}

function optionsFor(answer: string, alternatives: string[], shift: number): { options: string[]; correct: number } {
  const unique = [answer, ...alternatives.filter((item) => item !== answer)]
    .filter((item, index, all) => all.indexOf(item) === index)
    .slice(0, 4)
  if (unique.length < 4) throw new Error(`Section B source has fewer than four distinct options for “${answer}”`)
  const rotate = shift % 4
  const options = [...unique.slice(rotate), ...unique.slice(0, rotate)]
  return { options, correct: options.indexOf(answer) }
}

function conceptualCases(
  paper: "BT" | "LW",
  chapters: StudyChapter[],
  needed: number,
  startIndex: number,
): OtCase[] {
  const perNormalCase = 4
  const concepts = chapters.flatMap((chapter) =>
    chapter.keyTerms.map((term) => ({ area: chapter.area, term: term.term, def: term.def })),
  )
  const byArea = new Map<string, typeof concepts>()
  for (const concept of concepts) byArea.set(concept.area, [...(byArea.get(concept.area) ?? []), concept])
  const usableAreas = [...byArea.entries()].filter(([, items]) => items.length >= 4)
  if (usableAreas.length === 0) throw new Error(`${paper} has no chapter area with four Section B concepts`)

  const out: OtCase[] = []
  let remaining = needed
  let caseIndex = startIndex
  while (remaining > 0) {
    const questionCount = remaining >= perNormalCase ? perNormalCase : remaining
    const [area, areaConcepts] = usableAreas[caseIndex % usableAreas.length]
    const selected = Array.from({ length: questionCount }, (_, offset) =>
      areaConcepts[(caseIndex * perNormalCase + offset) % areaConcepts.length],
    )
    const company = `${COMPANY_NAMES[caseIndex % COMPANY_NAMES.length]} ${paper === "LW" ? "Ltd" : "Co"}`
    const caseId = `case-${paper.toLowerCase()}-application-${caseIndex + 1}`
    const scenarioPoints = selected.map((concept, offset) =>
      `${offset + 1}) a manager encounters a situation described as ${concept.def}`,
    )
    const questions: AccaQuestion[] = selected.map((concept, offset) => {
      const choices = optionsFor(concept.term, areaConcepts.map((item) => item.term), caseIndex + offset)
      return {
        id: `${caseId}-q${offset + 1}`,
        paper,
        area,
        type: "mcq",
        stem: `In review ${caseIndex + 1}, situation ${offset + 1} at ${company}, which syllabus concept should be applied?`,
        options: choices.options,
        correct: choices.correct,
        explanation: `${concept.term} is the applicable concept because it means: ${concept.def}`,
        marks: questionCount === perNormalCase
          ? (paper === "BT" ? 1 : [1, 2, 2, 1][offset])
          : (paper === "BT" ? 2 : 3),
        difficulty: offset === 0 ? "easy" : offset === questionCount - 1 ? "hard" : "medium",
      }
    })
    out.push({
      id: caseId,
      paper,
      area,
      title: `${company} — applied syllabus review ${caseIndex + 1}`,
      scenario:
        `${company} is reviewing several connected decisions in one operational briefing. The facts recorded are: ` +
        `${scenarioPoints.join("; ")}. Management must classify each situation accurately before deciding what action to take.`,
      questions,
    })
    remaining -= questionCount
    caseIndex += 1
  }
  return out
}

function maCases(needed: number, startIndex: number): OtCase[] {
  if (needed % 5 !== 0) throw new Error(`MA Section B needs a multiple of five linked questions, received ${needed}`)
  return Array.from({ length: needed / 5 }, (_, offset) => {
    const index = startIndex + offset
    const contribution = 12 + (index % 9) * 2
    const variableCost = 18 + (index % 7) * 3
    const sellingPrice = contribution + variableCost
    const breakEvenUnits = 4_000 + index * 100
    const fixedCosts = contribution * breakEvenUnits
    const marginUnits = 800 + (index % 6) * 200
    const expectedUnits = breakEvenUnits + marginUnits
    const revenue = expectedUnits * sellingPrice
    const profit = marginUnits * contribution
    const company = `${COMPANY_NAMES[index % COMPANY_NAMES.length]} Manufacturing`
    const id = `case-ma-cvp-${index + 1}`
    return {
      id,
      paper: "MA",
      area: "C",
      title: `${company} — CVP planning ${index + 1}`,
      scenario:
        `${company} makes one product. Selling price is $${sellingPrice} per unit, variable cost is $${variableCost} per unit, ` +
        `annual fixed costs are $${fixedCosts.toLocaleString("en-US")}, and planned sales are ${expectedUnits.toLocaleString("en-US")} units. ` +
        "Management needs a complete cost-volume-profit assessment before approving the operating plan.",
      questions: [
        { id: `${id}-q1`, paper: "MA", area: "C", type: "number", stem: `What is contribution per unit for ${company} in plan ${index + 1}?`, numericAnswer: contribution, unit: "$", tolerance: 0, explanation: `Selling price $${sellingPrice} less variable cost $${variableCost} gives contribution of $${contribution}.`, marks: 2, difficulty: "easy" },
        { id: `${id}-q2`, paper: "MA", area: "C", type: "number", stem: `What is the break-even sales volume for plan ${index + 1}?`, numericAnswer: breakEvenUnits, unit: "units", tolerance: 0, explanation: `Fixed costs $${fixedCosts.toLocaleString("en-US")} ÷ $${contribution} contribution = ${breakEvenUnits.toLocaleString("en-US")} units.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q3`, paper: "MA", area: "C", type: "number", stem: `What is the planned margin of safety in units for ${company}, plan ${index + 1}?`, numericAnswer: marginUnits, unit: "units", tolerance: 0, explanation: `Planned sales ${expectedUnits.toLocaleString("en-US")} less break-even sales ${breakEvenUnits.toLocaleString("en-US")} = ${marginUnits.toLocaleString("en-US")} units.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q4`, paper: "MA", area: "C", type: "number", stem: `What profit will plan ${index + 1} generate?`, numericAnswer: profit, unit: "$", tolerance: 0, explanation: `Margin of safety ${marginUnits.toLocaleString("en-US")} × contribution $${contribution} = $${profit.toLocaleString("en-US")}.`, marks: 2, difficulty: "hard" },
        { id: `${id}-q5`, paper: "MA", area: "C", type: "number", stem: `What is planned sales revenue for ${company} in plan ${index + 1}?`, numericAnswer: revenue, unit: "$", tolerance: 0, explanation: `Sales revenue is volume multiplied by selling price: ${expectedUnits.toLocaleString("en-US")} units × $${sellingPrice} = $${revenue.toLocaleString("en-US")}.`, marks: 2, difficulty: "medium" },
      ],
    } satisfies OtCase
  })
}

function faCases(needed: number, startIndex: number): OtCase[] {
  if (needed % 5 !== 0) throw new Error(`FA Section B needs a multiple of five linked questions, received ${needed}`)
  return Array.from({ length: needed / 5 }, (_, offset) => {
    const index = startIndex + offset
    const company = `${COMPANY_NAMES[index % COMPANY_NAMES.length]} Co`
    const id = `case-fa-ratios-${index + 1}`
    const revenue = 600_000 + index * 20_000
    const grossMargin = 25 + (index % 8)
    const grossProfit = revenue * grossMargin / 100
    const costOfSales = revenue - grossProfit
    const operatingMargin = 8 + (index % 6)
    const operatingProfit = revenue * operatingMargin / 100
    const inventoryDays = 40 + (index % 9) * 3
    const inventory = costOfSales * inventoryDays / 365
    const receivableDays = 30 + (index % 8) * 2
    const receivables = revenue * receivableDays / 365
    const currentLiabilities = 100_000 + index * 2_500
    const currentAssets = currentLiabilities * (1.5 + (index % 5) * 0.1)
    return {
      id,
      paper: "FA",
      area: "H",
      title: `${company} — financial interpretation ${index + 1}`,
      scenario:
        `${company} reports revenue of $${revenue.toLocaleString("en-US")}, cost of sales of $${costOfSales.toLocaleString("en-US")}, ` +
        `operating profit of $${operatingProfit.toLocaleString("en-US")}, inventory of $${inventory.toFixed(2)}, ` +
        `trade receivables of $${receivables.toFixed(2)}, current assets of $${currentAssets.toFixed(2)}, and current liabilities of $${currentLiabilities.toLocaleString("en-US")}. All sales are on credit.`,
      questions: [
        { id: `${id}-q1`, paper: "FA", area: "H", type: "number", stem: `What is ${company}'s gross profit margin in analysis ${index + 1}?`, numericAnswer: grossMargin, unit: "%", tolerance: 0.1, explanation: `Gross profit $${grossProfit.toLocaleString("en-US")} ÷ revenue $${revenue.toLocaleString("en-US")} × 100 = ${grossMargin}%.`, marks: 3, difficulty: "easy" },
        { id: `${id}-q2`, paper: "FA", area: "H", type: "number", stem: `What is ${company}'s operating profit margin in analysis ${index + 1}?`, numericAnswer: operatingMargin, unit: "%", tolerance: 0.1, explanation: `Operating profit $${operatingProfit.toLocaleString("en-US")} ÷ revenue $${revenue.toLocaleString("en-US")} × 100 = ${operatingMargin}%.`, marks: 3, difficulty: "easy" },
        { id: `${id}-q3`, paper: "FA", area: "H", type: "number", stem: `What are inventory holding days in analysis ${index + 1}?`, numericAnswer: inventoryDays, unit: "days", tolerance: 0.1, explanation: `Inventory $${inventory.toFixed(2)} ÷ cost of sales $${costOfSales.toLocaleString("en-US")} × 365 = ${inventoryDays} days.`, marks: 3, difficulty: "medium" },
        { id: `${id}-q4`, paper: "FA", area: "H", type: "number", stem: `What are receivables collection days in analysis ${index + 1}?`, numericAnswer: receivableDays, unit: "days", tolerance: 0.1, explanation: `Receivables $${receivables.toFixed(2)} ÷ credit revenue $${revenue.toLocaleString("en-US")} × 365 = ${receivableDays} days.`, marks: 3, difficulty: "medium" },
        { id: `${id}-q5`, paper: "FA", area: "H", type: "number", stem: `What is the current ratio for ${company} in analysis ${index + 1}?`, numericAnswer: Number((currentAssets / currentLiabilities).toFixed(2)), tolerance: 0.01, explanation: `Current assets $${currentAssets.toFixed(2)} ÷ current liabilities $${currentLiabilities.toLocaleString("en-US")} = ${(currentAssets / currentLiabilities).toFixed(2)}:1.`, marks: 3, difficulty: "hard" },
      ],
    } satisfies OtCase
  })
}

/** Completes the founder-approved 350 linked-question Section B inventory. */
export function completeF1F4SectionB(paper: string, authored: OtCase[], chapters: StudyChapter[]): OtCase[] {
  if (!TARGET_PAPERS.has(paper)) return authored
  const current = linkedCount(authored)
  if (current > F1_F4_CONTENT_TARGET.sectionB) {
    throw new Error(`${paper} Section B exceeds its ${F1_F4_CONTENT_TARGET.sectionB}-question contract`)
  }
  const needed = F1_F4_CONTENT_TARGET.sectionB - current
  const startIndex = authored.length
  const additions = paper === "MA"
    ? maCases(needed, startIndex)
    : paper === "FA"
      ? faCases(needed, startIndex)
      : conceptualCases(paper as "BT" | "LW", chapters, needed, startIndex)
  const completed = [...authored, ...additions]
  if (linkedCount(completed) !== F1_F4_CONTENT_TARGET.sectionB) {
    throw new Error(`${paper} Section B completion failed`)
  }
  return completed
}
