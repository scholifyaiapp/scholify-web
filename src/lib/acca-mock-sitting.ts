/*
 * A MOCK SITTING THAT SURVIVES THE TAB.
 *
 * ── The gap this closes ──────────────────────────────────────────
 * CbeMockRunner held a whole sitting — up to 3h15 of answers, essays and
 * spreadsheet cells — in component state and nowhere else. A closed tab, a
 * browser crash, a phone battery, an accidental back-swipe: any of them erased
 * the entire attempt without a trace. For the surface a candidate invests the
 * most single-session effort in, that was the app's worst possible failure.
 *
 * ── What makes resume SOUND, not just convenient ─────────────────
 * The composed exam is deterministic: buildCbeMock(paperId, form) is pure, and
 * withShuffledOptions seeds its shuffle from hashId(q.id) — so re-composing on
 * resume reproduces the identical questions in the identical option order, and
 * saved answer INDICES stay meaningful. Without that determinism this module
 * would be unsafe to write.
 *
 * ── The clock stays honest ───────────────────────────────────────
 * The DEADLINE is persisted as absolute wall-clock time, not remaining seconds.
 * Closing the tab does not pause the exam, exactly as backgrounding it never
 * did (see the runner's deadline comment). A learner who returns inside the
 * window resumes with the time that is genuinely left; one who returns after
 * it gets the CBE's own behaviour — the exam submits what they answered. The
 * one exception is a sitting with NOTHING answered: recording a 0% mock for an
 * exam someone opened and instantly abandoned would poison their trend with an
 * attempt they never made, so an untouched expired sitting is discarded.
 *
 * ── Storage shape ────────────────────────────────────────────────
 * One slot per (paper, form), so abandoning Form 1 and starting Form 2 cannot
 * silently destroy Form 1's answers. Sittings are small (indices and typed
 * text), and clearMockSitting removes the slot the moment a sitting is
 * recorded, so the store cannot accumulate.
 */

export interface SittingObjAnswer {
  choice?: number | null
  multi?: number[]
  num?: string
}

export interface SittingTaskAnswer {
  text: string
  cells: Record<string, string>
}

export interface MockSitting {
  paperId: string
  form: number
  /** Absolute epoch-ms deadline — the honest exam clock. */
  deadline: number
  cursor: number
  answers: Record<string, SittingObjAnswer>
  essays: Record<string, SittingTaskAnswer>
  flags: Record<string, boolean>
  savedAt: number
}

const KEY_PREFIX = "scholify-acca-mock-sitting"

const slotKey = (paperId: string, form: number) => `${KEY_PREFIX}:${paperId}:${form}`

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

/** Persist the in-progress sitting. Failures are swallowed — a blocked store must never break an exam. */
export function saveMockSitting(sitting: MockSitting): void {
  try {
    window.localStorage.setItem(slotKey(sitting.paperId, sitting.form), JSON.stringify({ ...sitting, savedAt: Date.now() }))
  } catch {
    /* ignore */
  }
}

/**
 * The saved sitting for this paper and form, or null. Corrupt or wrong-shaped
 * data degrades to null (and is removed) rather than throwing into the runner.
 */
export function readMockSitting(paperId: string, form: number): MockSitting | null {
  try {
    const raw = window.localStorage.getItem(slotKey(paperId, form))
    if (!raw) return null
    const p: unknown = JSON.parse(raw)
    if (
      !isObj(p) ||
      p.paperId !== paperId ||
      p.form !== form ||
      typeof p.deadline !== "number" ||
      typeof p.cursor !== "number" ||
      !isObj(p.answers) ||
      !isObj(p.essays) ||
      !isObj(p.flags)
    ) {
      window.localStorage.removeItem(slotKey(paperId, form))
      return null
    }
    return p as unknown as MockSitting
  } catch {
    try {
      window.localStorage.removeItem(slotKey(paperId, form))
    } catch {
      /* ignore */
    }
    return null
  }
}

/** Remove the slot — called the moment a sitting is recorded or discarded. */
export function clearMockSitting(paperId: string, form: number): void {
  try {
    window.localStorage.removeItem(slotKey(paperId, form))
  } catch {
    /* ignore */
  }
}

/** Has the learner actually answered anything in this sitting? */
export function sittingHasWork(sitting: MockSitting): boolean {
  const objAnswered = Object.values(sitting.answers).some((a) => {
    if (!isObj(a)) return false
    if (typeof a.choice === "number") return true
    if (Array.isArray(a.multi) && a.multi.length > 0) return true
    return typeof a.num === "string" && a.num.trim() !== ""
  })
  if (objAnswered) return true
  return Object.values(sitting.essays).some(
    (e) => isObj(e) && ((typeof e.text === "string" && e.text.trim() !== "") || (isObj(e.cells) && Object.values(e.cells).some((v) => typeof v === "string" && v.trim() !== ""))),
  )
}

/**
 * What the runner should do with a saved sitting on mount.
 *
 *   resume   — the clock is still running: restore everything and continue.
 *   expire   — time ran out while away and the learner HAD answered: restore
 *              and let the deadline path submit it, exactly as the real CBE
 *              submits an exam whose time expires.
 *   discard  — time ran out on an untouched sitting: throw it away silently
 *              rather than record a 0% the learner never sat.
 */
export function sittingDisposition(sitting: MockSitting, now = Date.now()): "resume" | "expire" | "discard" {
  if (sitting.deadline > now) return "resume"
  return sittingHasWork(sitting) ? "expire" : "discard"
}

/**
 * Is there a live (resumable, unexpired) sitting for this paper+form?
 * The Mock Centre reads this to label the button "Resume" instead of "Start".
 */
export function hasLiveSitting(paperId: string, form: number, now = Date.now()): boolean {
  const s = readMockSitting(paperId, form)
  return s !== null && sittingDisposition(s, now) === "resume"
}
