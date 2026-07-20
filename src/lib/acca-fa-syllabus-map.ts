import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"

const RECONCILIATION = /bank reconcil|payables? (?:ledger|account|control|reconcil)|supplier statement/i

function officialArea(area: string, searchable: string): string {
  if (area === "E") return RECONCILIATION.test(searchable) ? "E" : "F"
  if (area === "F") return "G"
  if (area === "G") return "H"
  if (area === "H") return "I"
  return area
}

/** Preserve stable IDs while migrating the former eight FA buckets to ACCA's A-I blueprint. */
export function mapFaQuestionsToOfficialSyllabus(questions: AccaQuestion[]): AccaQuestion[] {
  return questions.map((question) => {
    const searchable = `${question.stem} ${question.explanation} ${question.options?.join(" ") ?? ""}`
    const area = officialArea(question.area, searchable)
    return area === question.area ? question : { ...question, area }
  })
}

export function mapFaFlashcardsToOfficialSyllabus(cards: Flashcard[]): Flashcard[] {
  return cards.map((card) => {
    const area = officialArea(card.area, `${card.front} ${card.back}`)
    return area === card.area ? card : { ...card, area }
  })
}
