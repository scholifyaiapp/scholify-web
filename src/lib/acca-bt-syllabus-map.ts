import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"

/**
 * Migration map from Scholify's former four BT buckets to ACCA's official
 * September 2025-August 2026 six-area syllabus. IDs remain stable so learner
 * history is preserved; only the syllabus classification changes.
 */
const AREA_B = new Set([
  "BT-C-01", "BT-C-02",
  "BT2-A-03", "BT2-A-04", "BT2-A-05", "BT2-A-14",
  "BT2-C-01", "BT2-C-02", "BT2-C-03", "BT2-C-04", "BT2-C-05", "BT2-C-06", "BT2-C-07", "BT2-C-16",
  "BT3-A-01", "BT3-A-02", "BT3-A-03", "BT3-A-04", "BT3-A-05", "BT3-A-06", "BT3-A-07",
  "BT3-A-08", "BT3-A-09", "BT3-A-10", "BT3-A-11", "BT3-A-19", "BT3-A-20", "BT3-A-21",
  "BT3-C-03", "BT3-C-04", "BT3-C-05", "BT3-C-06", "BT3-C-07", "BT3-C-11", "BT3-C-12", "BT3-C-13",
])

const AREA_E = new Set([
  "BT2-B-15", "BT2-B-16",
  "BT3-B-04", "BT3-B-08", "BT3-B-09",
])

const AREA_A_FROM_D = new Set(["BT2-D-09", "BT3-D-08", "BT3-D-09"])
const AREA_A_FROM_B = new Set(["BT3-B-11", "BT3-B-12"])

export function officialBtArea(question: AccaQuestion): string {
  if (AREA_B.has(question.id)) return "B"
  if (AREA_E.has(question.id)) return "E"
  if (AREA_A_FROM_D.has(question.id) || AREA_A_FROM_B.has(question.id)) return "A"

  // Remaining former buckets correspond cleanly to the official areas.
  if (question.area === "A") return "A"
  if (question.area === "B") return "D"
  if (question.area === "C") return "F"
  return "C"
}

export function mapBtQuestionsToOfficialSyllabus(questions: AccaQuestion[]): AccaQuestion[] {
  return questions.map((question) => {
    const area = officialBtArea(question)
    return area === question.area ? question : { ...question, area }
  })
}

const FLASHCARD_B = new Set([
  "BT-FC-5",
  "BT-FC3-04", "BT-FC3-05", "BT-FC3-06", "BT-FC3-12", "BT-FC3-21",
  "BT-FC3-30", "BT-FC3-31", "BT-FC3-32", "BT-FC3-33", "BT-FC3-34", "BT-FC3-35", "BT-FC3-36",
  "BT-FC4-02", "BT-FC4-04", "BT-FC4-05",
])
const FLASHCARD_E = new Set(["BT-FC3-24"])
const FLASHCARD_A_FROM_D = new Set(["BT-FC4-07"])

export function mapBtFlashcardsToOfficialSyllabus(cards: Flashcard[]): Flashcard[] {
  return cards.map((card) => {
    let area: string
    if (FLASHCARD_B.has(card.id)) area = "B"
    else if (FLASHCARD_E.has(card.id)) area = "E"
    else if (FLASHCARD_A_FROM_D.has(card.id)) area = "A"
    else if (card.area === "A") area = "A"
    else if (card.area === "B") area = "D"
    else if (card.area === "C") area = "F"
    else area = "C"
    return area === card.area ? card : { ...card, area }
  })
}
