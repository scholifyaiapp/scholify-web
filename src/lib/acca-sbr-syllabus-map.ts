import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * Maps legacy SBR items onto the official s26-j27 syllabus areas.
 *
 * The coarse map reflects how the legacy banks were organised:
 *   legacy A (conceptual & regulatory framework)  → official B
 *   legacy B (reporting financial performance)    → official C
 *   legacy C (groups & business combinations)     → official D
 *   legacy D (financial instruments & benefits)   → official C
 *   legacy E (interpretation & current issues)    → official E
 *
 * But the legacy areas were broader than any single official area — legacy A
 * mixed the framework with ETHICS (official A) and management commentary
 * (official E); legacy E mixed interpretation with CURRENT ISSUES (official F)
 * and with topics the official guide files under C11 (IAS 8, IAS 10, IAS 24,
 * going concern, IFRS for SMEs). Mapping wholesale misfiled those items — the
 * same defect SBL's map had (13 of 30 questions under the wrong area), fixed
 * the same way: explicit per-id overrides, checked by reading each item.
 */
const AREA_OVERRIDES: Record<string, string> = {
  // Questions — ethics filed under the legacy framework area belongs in A;
  // management commentary is E1(c); IAS 24 is C11(d); current issues are F.
  "SBR2-A-20": "A",
  "SBR2-A-21": "A",
  "SBR2-A-22": "A",
  "SBR2-A-24": "A",
  "SBR2-A-23": "E",
  "SBR3-E-06": "C",
  "SBR3-E-07": "C",
  "SBR3-E-09": "F",
  "SBR3-E-12": "F",
  // Flashcards — IAS 8 (C11b), going concern (C11c), IAS 24 (C11d), IFRS for
  // SMEs (C11e), IAS 10 (C7b) and IAS 7 presentation (C10c) all sit in
  // official C; the ISSB card is F1(c).
  "SBR-FC-07": "C",
  "SBR-FC-08": "C",
  "SBR-FC-11": "C",
  "SBR-FC-56": "F",
  "SBR-FC-57": "C",
  "SBR-FC-58": "C",
  "SBR-FC-59": "C",
  "SBR-FC-60": "C",
  // Written — ethics scenarios belong in A wherever the legacy bank filed
  // them; IFRS S1/S2 and the goodwill-regime debate are F's discussion issues.
  "SBR-W-06": "A",
  "SBR-W2-07": "A",
  "SBR-W3-01": "A",
  "SBR-W3-02": "A",
  "SBR-W3-03": "A",
  "SBR-W3-13": "F",
  "SBR-W3-15": "F",
}

const legacyArea = (area: string): string => ({ A: "B", B: "C", C: "D", D: "C", E: "E" } as Record<string, string>)[area] ?? area

/*
 * Items authored against the official syllabus carry their area directly and
 * must never be remapped. Widened from [AFG] to [A-G]: official items exist
 * only in A, F and G today, but the SBL map's narrow guard is what emptied
 * authored area-E questions into the wrong area when new ones landed — the
 * guard should cover every official area an item could legitimately carry.
 */
const isOfficial = (id: string) => /^SBR-[A-G]-(?:O|FC|W)/.test(id)

const mapped = (id: string, area: string): string => AREA_OVERRIDES[id] ?? legacyArea(area)

export const mapSbrQuestionsToOfficialSyllabus = (items: AccaQuestion[]): AccaQuestion[] => items.map((item) => isOfficial(item.id) ? item : { ...item, area: mapped(item.id, item.area) })
export const mapSbrFlashcardsToOfficialSyllabus = (items: Flashcard[]): Flashcard[] => items.map((item) => isOfficial(item.id) ? item : { ...item, area: mapped(item.id, item.area) })
export const mapSbrWrittenToOfficialSyllabus = (items: WrittenQuestion[]): WrittenQuestion[] => items.map((item) => isOfficial(item.id) ? item : { ...item, area: mapped(item.id, item.area) })
