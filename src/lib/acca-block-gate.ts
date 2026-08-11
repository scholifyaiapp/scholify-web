import { blockComplete, type TodayBlock, type TodayComposition } from "@/lib/acca-today-composer"

/*
 * THE STEP GATE — one topic a day, worked in order, with time actually served.
 *
 * The day is already composed in teaching order (study → quizzes → practice →
 * flashcards → article) and TodayBoard already greys out the steps ahead. Two
 * things made that a suggestion rather than a mechanism:
 *
 *   1. THE STUDY BLOCK COMPLETED ON A CLICK. "Complete lesson — unlock 5
 *      Quizzes" sits at the bottom of the chapter, so scrolling to the end and
 *      pressing it took about eight seconds. The learner then owned the rest of
 *      the day's work having read nothing, and the plan recorded a chapter as
 *      studied — which is worse than letting them skip, because tomorrow moves
 *      on to the next chapter and the gap is now invisible.
 *
 *   2. DEEP LINKS WENT STRAIGHT PAST IT. /study?tab=today&block=practice
 *      launched practice with no check at all, and the dashboard's mission list
 *      linked to exactly those URLs. The order was enforced on one screen and
 *      unenforced from the other.
 *
 * ── WHY TIME, AND WHY NOT ALL OF IT ─────────────────────────────
 * Reading is the only step whose effort cannot be measured from its output.
 * Quizzes and practice are self-evidencing — you answered the questions or you
 * did not. Flashcards likewise. So reading is the one that needs a clock.
 *
 * But a clock set to the full allotted time punishes a genuinely fast reader
 * with dead minutes, and this product's whole argument is that focused time
 * beats long time. The gate is therefore a MINIMUM that catches skipping, not
 * a stopwatch that enforces a duration: two-thirds of the minutes the plan set
 * aside for that chapter, with a floor so a tiny block still needs real
 * attention and a ceiling so a heavy one never becomes a sentence.
 */

/** Share of a study block's planned minutes that must actually be spent. */
export const STUDY_TIME_SHARE = 2 / 3

/** Never less than this, however small the block. */
export const STUDY_MIN_SECONDS = 180

/** Never more than this, however heavy the chapter. */
export const STUDY_MAX_SECONDS = 15 * 60

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/** Seconds of genuine reading a study block requires before it can be closed. */
export function requiredStudySeconds(block: Pick<TodayBlock, "kind" | "minutes">): number {
  if (block.kind !== "study") return 0
  const planned = Number.isFinite(block.minutes) ? Math.max(0, block.minutes) : 0
  return Math.round(clamp(planned * 60 * STUDY_TIME_SHARE, STUDY_MIN_SECONDS, STUDY_MAX_SECONDS))
}

/* ── Time served, per block, per day ──────────────────────────── */

function localDay(): string {
  const d = new Date()
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

const timeKey = (paperId: string) => `scholify-block-time-${paperId}-${localDay()}`

type TimeLedger = Record<string, number>

function readLedger(paperId: string): TimeLedger {
  try {
    const raw = window.localStorage.getItem(timeKey(paperId))
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return parsed && typeof parsed === "object" ? (parsed as TimeLedger) : {}
  } catch {
    return {}
  }
}

/** Seconds spent on a block today. */
export function blockSecondsToday(paperId: string, blockId: string): number {
  const value = readLedger(paperId)[blockId]
  return Number.isFinite(value) && value > 0 ? value : 0
}

/**
 * Add time to a block's total for today.
 *
 * Callers tick this in small increments while the reader is OPEN AND VISIBLE,
 * so a chapter left open in a background tab overnight does not count as a
 * night of study. Increments are clamped for the same reason: a laptop waking
 * from sleep produces one enormous delta, and a single such tick would clear
 * the gate on its own.
 */
export function recordBlockSeconds(paperId: string, blockId: string, seconds: number): number {
  const add = Number.isFinite(seconds) ? clamp(Math.round(seconds), 0, 120) : 0
  if (add === 0) return blockSecondsToday(paperId, blockId)
  const ledger = readLedger(paperId)
  const next = blockSecondsToday(paperId, blockId) + add
  ledger[blockId] = next
  try {
    window.localStorage.setItem(timeKey(paperId), JSON.stringify(ledger))
  } catch {
    /* storage unavailable — the gate falls back to "not yet served" */
  }
  return next
}

export interface StudyGate {
  required: number
  spent: number
  remaining: number
  met: boolean
  /** 0…1, for the ring on the button. */
  fraction: number
}

/** Where a learner stands against the reading clock for one block. */
export function studyGate(paperId: string, block: Pick<TodayBlock, "kind" | "minutes" | "id">): StudyGate {
  const required = requiredStudySeconds(block)
  const spent = blockSecondsToday(paperId, block.id)
  const remaining = Math.max(0, required - spent)
  return {
    required,
    spent,
    remaining,
    met: remaining === 0,
    fraction: required === 0 ? 1 : clamp(spent / required, 0, 1),
  }
}

/* ── The sequence ─────────────────────────────────────────────── */

export type BlockLock =
  | { state: "done" }
  | { state: "open" }
  /** Earlier steps are unfinished — `blockedBy` is the first of them. */
  | { state: "locked"; blockedBy: TodayBlock }
  /** This step is next, but its reading time has not been served. */
  | { state: "timed"; gate: StudyGate }

/**
 * Whether a block can be started right now.
 *
 * This is THE authority — the board, the deep-link handler and the reader's own
 * CTA all ask it, so there is exactly one definition of "unlocked" in the
 * product rather than one per screen.
 */
export function blockLock(
  paperId: string,
  composition: TodayComposition,
  blockId: string,
  done: string[],
): BlockLock {
  const index = composition.blocks.findIndex((b) => b.id === blockId)
  if (index === -1) return { state: "open" }

  const block = composition.blocks[index]
  if (blockComplete(paperId, block, done)) return { state: "done" }

  const earlier = composition.blocks
    .slice(0, index)
    .find((b) => !blockComplete(paperId, b, done))
  if (earlier) return { state: "locked", blockedBy: earlier }

  if (block.kind === "study") {
    const gate = studyGate(paperId, block)
    if (!gate.met) return { state: "timed", gate }
  }

  return { state: "open" }
}

/** Convenience for callers that only need a yes/no before launching. */
export function canStartBlock(
  paperId: string,
  composition: TodayComposition,
  blockId: string,
  done: string[],
): boolean {
  const lock = blockLock(paperId, composition, blockId, done)
  /*
   * "timed" is startable: the clock only governs FINISHING a chapter, never
   * opening one. Blocking the open would leave a learner staring at a locked
   * card with no way to serve the time it is asking for.
   */
  return lock.state !== "locked"
}

/* ── Finishing a question block ───────────────────────────────── */

/**
 * Share of a set that must actually be ATTEMPTED for the step to count.
 *
 * ── THE HOLE THIS CLOSES ────────────────────────────────────────
 * Quiz, practice and flashcard blocks were stamped "pending" when launched and
 * marked done by resolvePendingTodayTask the moment the learner came back —
 * with no requiresExplicitCompletion flag, which is the strict mode that
 * function already supported and nothing used. So tapping a step and pressing
 * back completed it. The whole sequential day could be walked in about fifteen
 * seconds without answering a single question, which also meant streaks,
 * readiness and analytics were all earnable by tapping.
 *
 * ── WHY 60% AND NOT ALL ─────────────────────────────────────────
 * Right or wrong is not the test — getting a question wrong is still doing the
 * work, and an exam-prep product that only credited correct answers would be
 * teaching people to avoid hard questions. Attempting is the test.
 *
 * Requiring every question would trap someone who genuinely cannot make a
 * start on one, and clicking past a question is a real thing learners do.
 * Requiring a clear majority defeats click-through — five taps through five
 * quizzes leaves you at 0%, not 60% — without punishing an honest skip.
 */
export const ATTEMPT_SHARE = 0.6

/** Whether a finished session did enough work to close its block. */
export function sessionCountsAsDone(attempted: number, total: number): boolean {
  if (!Number.isFinite(total) || total <= 0) return true
  const safe = Number.isFinite(attempted) ? Math.max(0, attempted) : 0
  return safe >= Math.ceil(total * ATTEMPT_SHARE)
}

/** Human sentence for why a step will not start, or null when it will. */
export function lockReason(lock: BlockLock): string | null {
  if (lock.state === "locked") return `Finish “${lock.blockedBy.title}” first — the day runs in order.`
  if (lock.state === "timed") {
    const mins = Math.ceil(lock.gate.remaining / 60)
    return `${mins} more ${mins === 1 ? "minute" : "minutes"} on this chapter before the quizzes open.`
  }
  return null
}
