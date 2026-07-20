import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"

const CRIME = /insider deal|market abuse|money launder|briber|tax evasion|failure to prevent|fraudulent trading|wrongful trading|criminal/i
const INSOLVENCY = /insolven|liquidat|winding up|administrat(?:ion|or)|preference|transaction at an undervalue|priority of claims/i
const MANAGEMENT = /director|company secretary|auditor|meeting|resolution|board|general meeting|annual general meeting/i
const FINANCE = /share capital|ordinary share|preference share|treasury share|rights issue|bonus issue|debenture|loan capital|fixed charge|floating charge|capital maintenance|dividend|distribution/i

function areaFor(searchable: string): string {
  if (CRIME.test(searchable)) return "H"
  if (INSOLVENCY.test(searchable)) return "G"
  if (MANAGEMENT.test(searchable)) return "F"
  if (FINANCE.test(searchable)) return "E"
  return "D"
}

export function mapLwQuestionsToOfficialSyllabus(questions: AccaQuestion[]): AccaQuestion[] {
  return questions.map((question) => {
    if (question.area !== "D") return question
    const area = areaFor(`${question.stem} ${question.explanation} ${question.options?.join(" ") ?? ""}`)
    return { ...question, area }
  })
}

export function mapLwFlashcardsToOfficialSyllabus(cards: Flashcard[]): Flashcard[] {
  return cards.map((card) => card.area === "D" ? { ...card, area: areaFor(`${card.front} ${card.back}`) } : card)
}
