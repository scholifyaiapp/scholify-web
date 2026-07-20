import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

const preparationArea = (area: string) => area === "E" ? "D" : area

export function mapFrQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] {
  return items.map((item) => item.id.startsWith("FR-E-O") ? item : { ...item, area: preparationArea(item.area) })
}
export function mapFrFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] {
  return items.map((item) => item.id.startsWith("FR-E-FC-") ? item : { ...item, area: preparationArea(item.area) })
}
export function mapFrWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] {
  return items.map((item) => ({ ...item, area: preparationArea(item.area) }))
}
