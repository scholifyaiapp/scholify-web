import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

const legacyArea = (area: string): string => ({ A: "B", B: "C", C: "D", D: "C", E: "E" } as Record<string, string>)[area] ?? area
const isOfficial = (id: string) => /^SBR-[AFG]-(?:O|FC|W)/.test(id)

export const mapSbrQuestionsToOfficialSyllabus = (items: AccaQuestion[]): AccaQuestion[] => items.map((item) => isOfficial(item.id) ? item : { ...item, area: legacyArea(item.area) })
export const mapSbrFlashcardsToOfficialSyllabus = (items: Flashcard[]): Flashcard[] => items.map((item) => isOfficial(item.id) ? item : { ...item, area: legacyArea(item.area) })
export const mapSbrWrittenToOfficialSyllabus = (items: WrittenQuestion[]): WrittenQuestion[] => items.map((item) => isOfficial(item.id) ? item : { ...item, area: legacyArea(item.area) })
