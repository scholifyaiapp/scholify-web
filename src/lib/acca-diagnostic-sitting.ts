/*
 * A DIAGNOSTIC THAT SURVIVES THE TAB.
 *
 * The same gap the mock runner had, on the surface a learner meets FIRST: the
 * diagnostic is a timed ~30-minute assessment whose answers lived only in page
 * state. Closing the tab at question 12 of 15 threw everything away — and for
 * a brand-new learner, mid-onboarding, that first impression is the one the
 * product never gets back.
 *
 * Resume is sound for the same reason the mock's is: buildDiagnostic is fully
 * deterministic given its SEED (every shuffle and ladder pick flows through a
 * seeded RNG), and withShuffledOptions seeds from each question id. Persist the
 * seed and the composition reproduces exactly, so index-keyed responses stay
 * meaningful.
 *
 * The clock stays honest — the deadline is absolute wall-clock time, exactly as
 * the assessment page already treats it. Returning inside the window resumes
 * with the time genuinely left; returning after it lets the page's own expiry
 * path grade what was answered (unanswered counts wrong, the score honest about
 * coverage). A sitting with NOTHING answered is discarded rather than scored:
 * a 0% diagnostic for an assessment somebody opened and instantly abandoned
 * would anchor their baseline at rock bottom for no reason.
 */

export type DiagResponseValue = number | number[] | string

export interface DiagnosticSitting {
  paperId: string
  /** The seed buildDiagnostic was called with — what makes the rebuild identical. */
  seed: number
  deadline: number
  idx: number
  responses: Record<number, DiagResponseValue>
  flags: Record<number, boolean>
  savedAt: number
}

const KEY_PREFIX = "scholify-acca-diagnostic-sitting"

const slotKey = (paperId: string) => `${KEY_PREFIX}:${paperId}`

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

/** Persist the in-progress assessment. Failures are swallowed — a blocked store must never break it. */
export function saveDiagnosticSitting(sitting: DiagnosticSitting): void {
  try {
    window.localStorage.setItem(slotKey(sitting.paperId), JSON.stringify({ ...sitting, savedAt: Date.now() }))
  } catch {
    /* ignore */
  }
}

/** The saved sitting for this paper, or null. Corrupt data degrades to null and is removed. */
export function readDiagnosticSitting(paperId: string): DiagnosticSitting | null {
  try {
    const raw = window.localStorage.getItem(slotKey(paperId))
    if (!raw) return null
    const p: unknown = JSON.parse(raw)
    if (
      !isObj(p) ||
      p.paperId !== paperId ||
      typeof p.seed !== "number" ||
      typeof p.deadline !== "number" ||
      typeof p.idx !== "number" ||
      !isObj(p.responses) ||
      !isObj(p.flags)
    ) {
      window.localStorage.removeItem(slotKey(paperId))
      return null
    }
    return p as unknown as DiagnosticSitting
  } catch {
    try {
      window.localStorage.removeItem(slotKey(paperId))
    } catch {
      /* ignore */
    }
    return null
  }
}

export function clearDiagnosticSitting(paperId: string): void {
  try {
    window.localStorage.removeItem(slotKey(paperId))
  } catch {
    /* ignore */
  }
}

/** Has the learner actually answered anything? An empty string or empty multi is not an answer. */
export function diagnosticSittingHasWork(sitting: DiagnosticSitting): boolean {
  return Object.values(sitting.responses).some((r) => {
    if (typeof r === "number") return r >= 0
    if (Array.isArray(r)) return r.length > 0
    return typeof r === "string" && r.trim() !== ""
  })
}

/**
 * What the page should do with a saved sitting on mount:
 *   resume  — clock still running: rebuild from the seed and continue.
 *   expire  — time ran out on real answers: rebuild and let the page's own
 *             expiry path grade it, honest about coverage.
 *   discard — time ran out on nothing: throw it away, never score a 0%
 *             baseline the learner never sat.
 */
export function diagnosticSittingDisposition(sitting: DiagnosticSitting, now = Date.now()): "resume" | "expire" | "discard" {
  if (sitting.deadline > now) return "resume"
  return diagnosticSittingHasWork(sitting) ? "expire" : "discard"
}
