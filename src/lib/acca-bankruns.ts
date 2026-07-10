/*
 * Bank Runs — the bridge between Learn and the Mock room.
 *
 * A bank run is a timed, whole-paper session of 50 questions (90s each,
 * 75 minutes) — exam stamina training before the real mock gate. The loop
 * asks for three of them: by the third run the learner has seen the full
 * breadth of the paper under the clock, and the pass probability they
 * carry into the mock gate is earned, not hoped for.
 *
 * localStorage-first like the rest of the ACCA engine.
 */

const KEY = "scholify-acca-bankruns"

export const BANK_RUN_SIZE = 50
export const BANK_RUN_SECONDS_PER_Q = 90 // 50q → 75 minutes
export const BANK_RUNS_TARGET = 3

export interface BankRun {
  date: string // ISO
  correct: number
  total: number
  percent: number
}

type Store = Record<string, BankRun[]>

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Store
  } catch {
    /* ignore */
  }
  return {}
}

function write(s: Store): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export function getBankRuns(paperId: string): BankRun[] {
  return read()[paperId] ?? []
}

export function recordBankRun(paperId: string, correct: number, total: number): BankRun {
  const run: BankRun = {
    date: new Date().toISOString(),
    correct,
    total,
    percent: total > 0 ? Math.round((correct / total) * 100) : 0,
  }
  const store = read()
  const list = store[paperId] ?? []
  list.push(run)
  store[paperId] = list.slice(-10) // keep the last 10
  write(store)
  return run
}

/** Progress toward the three-run bridge: completed count + best score. */
export function bankRunProgress(paperId: string): { done: number; target: number; best: number | null } {
  const runs = getBankRuns(paperId)
  return {
    done: runs.length,
    target: BANK_RUNS_TARGET,
    best: runs.length ? Math.max(...runs.map((r) => r.percent)) : null,
  }
}
