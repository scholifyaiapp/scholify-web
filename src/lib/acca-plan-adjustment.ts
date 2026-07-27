export type PlanChangeReason = "difficulty" | "illness" | "work" | "course" | "exam-date" | "personal" | "other"

export interface PaperPause {
  paperId: string
  reason: PlanChangeReason
  pausedAt: string
  returnDate: string | null
}

export interface PaperSwitch {
  fromPaper: string
  toPaper: string
  reason: PlanChangeReason
  changedAt: string
}

interface AdjustmentStore {
  pauses: Record<string, PaperPause>
  switches: PaperSwitch[]
}

const KEY = "scholify-acca-plan-adjustments"
const EMPTY: AdjustmentStore = { pauses: {}, switches: [] }

function read(): AdjustmentStore {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "") as Partial<AdjustmentStore>
    return { pauses: parsed.pauses ?? {}, switches: parsed.switches ?? [] }
  } catch {
    return { ...EMPTY, pauses: {}, switches: [] }
  }
}

function write(store: AdjustmentStore): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    /* local-first: a blocked store must never break studying */
  }
}

export function getPaperPause(paperId: string): PaperPause | null {
  return read().pauses[paperId] ?? null
}

/**
 * How long an OPEN-ENDED pause (no return date given) stays in effect.
 *
 * A pause suspends the streak, so it cannot be allowed to run forever: "pause
 * once, keep a 40-day streak indefinitely" would make the streak meaningless.
 * A learner who names a return date gets exactly that; one who does not gets a
 * generous but finite window, after which the ordinary rules resume.
 */
const OPEN_PAUSE_DAYS = 30

/** Local calendar date, matching every other date store in the app. */
function ymd(d: Date): string {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

/**
 * The pause only if it is still IN EFFECT — this is what callers should read
 * when a pause changes behaviour (the held streak, the paused dashboard note).
 *
 * getPaperPause() reports the stored record whether or not it has run out, which
 * is right for rendering the Settings toggle but wrong for anything that grants
 * the learner something.
 */
export function activePaperPause(paperId: string): PaperPause | null {
  const pause = getPaperPause(paperId)
  if (!pause) return null
  const today = ymd(new Date())
  if (pause.returnDate) return pause.returnDate >= today ? pause : null
  const started = new Date(pause.pausedAt)
  if (Number.isNaN(started.getTime())) return null
  const expires = new Date(started.getTime() + OPEN_PAUSE_DAYS * 86_400_000)
  return ymd(expires) >= today ? pause : null
}

export function pausePaper(paperId: string, reason: PlanChangeReason, returnDate: string | null): PaperPause {
  const store = read()
  const pause: PaperPause = { paperId, reason, returnDate, pausedAt: new Date().toISOString() }
  store.pauses[paperId] = pause
  write(store)
  return pause
}

export function resumePaper(paperId: string): void {
  const store = read()
  delete store.pauses[paperId]
  write(store)
}

export function recordPaperSwitch(fromPaper: string, toPaper: string, reason: PlanChangeReason): PaperSwitch {
  const store = read()
  const change: PaperSwitch = { fromPaper, toPaper, reason, changedAt: new Date().toISOString() }
  store.switches = [...store.switches, change].slice(-25)
  delete store.pauses[toPaper]
  write(store)
  return change
}

export function getPaperSwitches(): PaperSwitch[] {
  return read().switches
}
