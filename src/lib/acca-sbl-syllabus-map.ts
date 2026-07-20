import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

const legacyArea = (area: string): string => ({ A: "B", B: "C", C: "D", D: "E", E: "I" } as Record<string, string>)[area] ?? area
const isOfficial = (id: string) => /^SBL-[AFGHJ]-(?:O|FC|W)/.test(id)

export function mapSblQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] {
  return items.map((item) => isOfficial(item.id) ? item : { ...item, area: legacyArea(item.area) })
}
export function mapSblFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] {
  return items.map((item) => isOfficial(item.id) ? item : { ...item, area: legacyArea(item.area) })
}
export function mapSblWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] {
  return items.map((item) => isOfficial(item.id) ? item : { ...item, area: legacyArea(item.area) })
}
