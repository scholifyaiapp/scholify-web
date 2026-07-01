/*
 * Scholify — the non-exam ACCA requirements: EPSM + PER.
 *
 * To become an ACCA member you need more than the 13 exams:
 *  - EPSM: the Ethics and Professional Skills Module (completed online).
 *  - PER: 36 months of relevant Practical Experience, during which you achieve
 *    9 performance objectives (5 Essentials + 4 Technical).
 *
 * This tracks the learner's self-reported progress on both. localStorage-first;
 * ready for a real myACCA sync to populate later.
 */

const KEY = "scholify-acca-journey"

export type EpsmStatus = "not_started" | "in_progress" | "complete"

export interface JourneyState {
  epsm: EpsmStatus
  /** Months of relevant practical experience logged (0–36). */
  perMonths: number
  /** Performance objectives achieved (0–9). */
  perObjectives: number
}

export const PER_TARGET_MONTHS = 36
export const PER_TARGET_OBJECTIVES = 9

const DEFAULT: JourneyState = { epsm: "not_started", perMonths: 0, perObjectives: 0 }

export function getJourney(): JourneyState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return { ...DEFAULT, ...(JSON.parse(raw) as Partial<JourneyState>) }
  } catch {
    /* ignore */
  }
  return { ...DEFAULT }
}

export function setJourney(patch: Partial<JourneyState>): JourneyState {
  const next = { ...getJourney(), ...patch }
  next.perMonths = Math.max(0, Math.min(PER_TARGET_MONTHS, Math.round(next.perMonths)))
  next.perObjectives = Math.max(0, Math.min(PER_TARGET_OBJECTIVES, Math.round(next.perObjectives)))
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
  return next
}

export const EPSM_LABEL: Record<EpsmStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  complete: "Complete",
}

/** True once every membership requirement is met (exams tracked separately). */
export function perComplete(j: JourneyState = getJourney()): boolean {
  return j.perMonths >= PER_TARGET_MONTHS && j.perObjectives >= PER_TARGET_OBJECTIVES
}
