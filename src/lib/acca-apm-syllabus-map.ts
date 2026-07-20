import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"
const legacyArea = (area: string): string => ({ A: "A", B: "B", C: "A", D: "B" } as Record<string, string>)[area] ?? area
const isOfficial = (id: string) => /^APM-[CDE]-(?:O|FC|W)/.test(id)
export const mapApmQuestionsToOfficialSyllabus = (items: AccaQuestion[]): AccaQuestion[] => items.map((x) => isOfficial(x.id) ? x : { ...x, area: legacyArea(x.area) })
export const mapApmFlashcardsToOfficialSyllabus = (items: Flashcard[]): Flashcard[] => items.map((x) => isOfficial(x.id) ? x : { ...x, area: legacyArea(x.area) })
export const mapApmWrittenToOfficialSyllabus = (items: WrittenQuestion[]): WrittenQuestion[] => items.map((x) => isOfficial(x.id) ? x : { ...x, area: legacyArea(x.area) })
