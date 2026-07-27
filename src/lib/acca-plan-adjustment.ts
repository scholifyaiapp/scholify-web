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
