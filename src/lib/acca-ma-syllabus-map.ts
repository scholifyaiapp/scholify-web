import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"

const AREA_B = new Set([
  "MA-A-02", "MA2-A-03", "MA2-A-04", "MA2-A-13", "MA3-A-04",
  "MA2-C-16", "MA2-C-17", "MA3-C-03",
])

/** Preserve stable IDs while moving former five-bucket MA content to A-F. */
export function mapMaQuestionsToOfficialSyllabus(questions: AccaQuestion[]): AccaQuestion[] {
  return questions.map((question) => {
    let area: string
    if (AREA_B.has(question.id)) area = "B"
    else if (question.area === "A") area = "A"
    else if (question.area === "B") area = "C"
    else if (question.area === "C") area = "D"
    else if (question.area === "D") area = "E"
    else area = "F"
    return area === question.area ? question : { ...question, area }
  })
}

const FLASHCARD_B = new Set([
  "MA-FC-1", "MA-FC3-04", "MA-FC4-02",
  "MA-FC3-27", "MA-FC3-28", "MA-FC3-29", "MA-FC4-03",
])

export function mapMaFlashcardsToOfficialSyllabus(cards: Flashcard[]): Flashcard[] {
  return cards.map((card) => {
    let area: string
    if (FLASHCARD_B.has(card.id)) area = "B"
    else if (card.area === "A") area = "A"
    else if (card.area === "B") area = "C"
    else if (card.area === "C") area = "D"
    else if (card.area === "D") area = "E"
    else area = "F"
    return area === card.area ? card : { ...card, area }
  })
}

