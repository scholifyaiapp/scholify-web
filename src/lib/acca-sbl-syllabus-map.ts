import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * SBL's legacy banks were written against a five-area structure (A–E) and have to
 * be re-filed against the official ten-area syllabus (A–J).
 *
 * `legacyArea` does the bulk shift. It is a blunt instrument and it was WRONG for
 * one block, because legacy area C covered risk AND internal control AND audit AND
 * fraud — material the official syllabus splits across D (risk), F (organisational
 * control and audit) and A (professionalism, ethics, fraud and bribery). Shifting
 * all of legacy C to D filed every control, internal-audit, fraud-triangle and
 * whistleblowing question under Risk. The visible symptom was that Area F held 13
 * authored questions to Area D's 42, so a learner revising organisational control
 * and audit was served risk questions while control questions were counted as
 * risk practice.
 *
 * `AREA_OVERRIDES` fixes that per question, and is deliberately explicit rather
 * than keyword-matched: a rule guessing from stem text would silently re-file
 * questions as the bank grows, and this is a one-off correction to a finite legacy
 * block. Verified against the loaded bank — 13 of the 30 SBL3-C questions are not
 * about risk. Adding a question to the legacy block is not expected; author new
 * questions against the official area directly.
 */

const AREA_OVERRIDES: Record<string, string> = {
  // Internal control systems, COSO, and control classification → F1
  "SBL3-C-13": "F", // the five COSO components
  "SBL3-C-14": "F", // COSO control environment
  "SBL3-C-15": "F", // reconciliations, authorisation limits, segregation of duties
  "SBL3-C-24": "F", // detection versus prevention controls
  "SBL3-C-30": "F", // a firewall as a preventive control
  // Internal audit and its independence → F2
  "SBL3-C-16": "F", // the role of an internal audit function
  "SBL3-C-17": "F", // internal against external audit
  "SBL3-C-19": "F", // designing controls then auditing them — self-review
  // Board committee composition is a board matter → B5(f)
  "SBL3-C-18": "B", // audit committee composition
  // Fraud, bribery and whistleblowing sit with professionalism and ethics → A3(e)
  "SBL3-C-22": "A", // the fraud triangle
  "SBL3-C-23": "A", // applying the fraud triangle to a scenario
  "SBL3-C-25": "A", // the purpose of a whistleblowing hotline
  "SBL3-C-26": "A", // a whistleblowing line reporting to those complained about
}

const legacyArea = (area: string): string => ({ A: "B", B: "C", C: "D", D: "E", E: "I" } as Record<string, string>)[area] ?? area

/*
 * Questions authored against the OFFICIAL syllabus must pass through untouched, or
 * the bulk shift scrambles them — an authored area-E question would become area I.
 * The id pattern is how an authored question announces itself.
 */
const isOfficial = (id: string) => /^SBL-[A-J]-(?:O|FC|W)/.test(id)

const officialArea = (item: { id: string; area: string }): string =>
  AREA_OVERRIDES[item.id] ?? (isOfficial(item.id) ? item.area : legacyArea(item.area))

export function mapSblQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] {
  return items.map((item) => ({ ...item, area: officialArea(item) }))
}
export function mapSblFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] {
  return items.map((item) => ({ ...item, area: officialArea(item) }))
}
export function mapSblWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] {
  return items.map((item) => ({ ...item, area: officialArea(item) }))
}
