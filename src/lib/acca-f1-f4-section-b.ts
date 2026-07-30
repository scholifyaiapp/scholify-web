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

/**
 * Completes the 350 linked-question Section B inventory for the F1–F4 papers that
 * still rely on it.
 *
 * BT, MA and FA are EXCLUDED, because all three now have authored MTQs at their real
 * exam unit size: BT 18 units of exactly 4 marks (acca-cases-bt.ts), MA 9 units of
 * exactly 10 marks (acca-cases-ma.ts) and FA 6 units of exactly 15 marks
 * (acca-cases-fa.ts). Padding any of them to 350 linked questions would mean
 * re-adding the generated units they replaced, whose stems read "In review 7,
 * situation 2 at Grove Co, which syllabus concept should be applied?" or "What is
 * Grove Co's gross profit margin in analysis 12?" at one to three marks apiece. A
 * real MTQ bank of the right size beats a large one of the wrong shape.
 *
 * Only LW is left, and this whole function should disappear when LW is rebuilt.
 */
export function completeF1F4SectionB(paper: string, authored: OtCase[], chapters: StudyChapter[]): OtCase[] {
  if (paper === "BT" || paper === "MA" || paper === "FA") return authored
  if (!TARGET_PAPERS.has(paper)) return authored
  const current = linkedCount(authored)
  if (current > F1_F4_CONTENT_TARGET.sectionB) {
    throw new Error(`${paper} Section B exceeds its ${F1_F4_CONTENT_TARGET.sectionB}-question contract`)
  }
  const needed = F1_F4_CONTENT_TARGET.sectionB - current
  const startIndex = authored.length
  const additions = conceptualCases(paper as "BT" | "LW", chapters, needed, startIndex)
  const completed = [...authored, ...additions]
  if (linkedCount(completed) !== F1_F4_CONTENT_TARGET.sectionB) {
    throw new Error(`${paper} Section B completion failed`)
  }
  return completed
}
