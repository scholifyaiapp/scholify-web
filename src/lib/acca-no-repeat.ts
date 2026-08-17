/*
 * Scholify — the NO-REPEAT LEDGER.
 *
 * ── The problem it solves ─────────────────────────────────────────
 * Every selection surface in the app drew from the same per-paper pools with its
 * own local `seed` and its own shuffle: buildSession, buildDrillSession,
 * buildAdaptiveSession, the 5 quizzes after a chapter, the diagnostic, the
 * flashcard deck. Nothing recorded what a learner had ALREADY been served, so:
 *
 *   · the 5 quizzes after today's chapter could be 5 of the 12 questions the
 *     daily practice block then asked again an hour later;
 *   · tomorrow's practice re-served today's questions, because a fresh
 *     `seed = Date.now()` reshuffles the same pool — it does not exclude
 *     anything;
 *   · a learner who answered a question correctly a week ago saw it again
 *     instead of the ones they had never seen.
 *
 * Repetition is not neutral. It inflates accuracy (you remember the answer, not
 * the rule), which inflates the readiness score, which is the one number the
 * learner is trusting. "Don't repeat the questions" is therefore a correctness
 * requirement, not a polish item.
 *
 * ── The design ────────────────────────────────────────────────────
 * One ledger per paper per POOL KIND, holding the ids already served, in order.
 * Selection goes through `pickFresh`, which:
 *
 *   1. removes everything in the ledger and everything already picked TODAY
 *      across every other kind (so quizzes and practice cannot collide);
 *   2. picks from what is left, in a stable order rotated by the day index — so
 *      the same day always yields the same set (a reload does not reshuffle
 *      mid-session) while a new day moves on;
 *   3. when the pool is genuinely exhausted, opens a NEW CYCLE: the ledger is
 *      cleared except for a recency tail, so nothing repeats back-to-back but a
 *      finite bank can still be revisited months later, which is exactly what
 *      spaced revision wants.
 *
 * localStorage, like the rest of the offline-first progress layer.
 */

/** The pools we serve from. Kept separate so a cycle reset on one never touches another. */
export type PoolKind = "quiz" | "practice" | "drill" | "card" | "bank" | "article"

const LEDGER_KEY = "scholify-served-ledger"
const DAY_KEY = "scholify-served-today"

/** Ids kept when a cycle restarts, so nothing repeats immediately. */
const RECENCY_TAIL = 12

function ymd(d = new Date()): string {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

/** Days since the epoch, in LOCAL time — the rotation index. */
function dayIndex(): number {
  const n = new Date()
  return Math.floor(new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime() / 86400000)
}

interface LedgerRec {
  /** Served ids, oldest first. */
  ids: string[]
  /** How many times the pool has been fully consumed. */
  cycle: number
}

type Ledger = Record<string, LedgerRec> // `${paperId}:${kind}` → record

function readLedger(): Ledger {
  try {
    const raw = window.localStorage.getItem(LEDGER_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const out: Ledger = {}
      for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
        if (!v || typeof v !== "object") continue
        const { ids, cycle } = v as { ids?: unknown; cycle?: unknown }
        out[k] = {
          ids: Array.isArray(ids) ? ids.filter((x): x is string => typeof x === "string") : [],
          cycle: typeof cycle === "number" && Number.isFinite(cycle) ? cycle : 0,
        }
      }
      return out
    }
  } catch {
    /* ignore */
  }
  return {}
}

function writeLedger(l: Ledger): void {
  try {
    window.localStorage.setItem(LEDGER_KEY, JSON.stringify(l))
  } catch {
    /* ignore */
  }
}

const slot = (paperId: string, kind: PoolKind): string => `${paperId}:${kind}`

/** Everything already served from this pool in the current cycle. */
export function servedIds(paperId: string, kind: PoolKind): Set<string> {
  return new Set(readLedger()[slot(paperId, kind)]?.ids ?? [])
}

/** How many cycles of this pool the learner has been through. */
export function poolCycle(paperId: string, kind: PoolKind): number {
  return readLedger()[slot(paperId, kind)]?.cycle ?? 0
}

/** Record ids as served. Idempotent per id. */
export function markServed(paperId: string, kind: PoolKind, ids: string[]): void {
  if (!ids.length) return
  const ledger = readLedger()
  const key = slot(paperId, kind)
  const rec = ledger[key] ?? { ids: [], cycle: 0 }
  const seen = new Set(rec.ids)
  for (const id of ids) if (!seen.has(id)) { rec.ids.push(id); seen.add(id) }
  ledger[key] = rec
  writeLedger(ledger)
}

/**
 * Open a new cycle: keep only the recency tail so the next pick cannot repeat
 * what was just served, but let the rest of the bank become available again.
 *
 * `poolSize` caps the tail. Without it a 10-question area would keep all ten as
 * its "tail" and reopen to nothing — which is exactly the bug the cycle test
 * caught: the pick came back empty instead of full. Never hold more than half a
 * pool back, so every pool can genuinely reopen however small it is.
 */
export function startNewCycle(paperId: string, kind: PoolKind, poolSize?: number): void {
  const ledger = readLedger()
  const key = slot(paperId, kind)
  const rec = ledger[key] ?? { ids: [], cycle: 0 }
  const tail = poolSize && poolSize > 0 ? Math.min(RECENCY_TAIL, Math.floor(poolSize / 2)) : RECENCY_TAIL
  ledger[key] = { ids: tail > 0 ? rec.ids.slice(-tail) : [], cycle: rec.cycle + 1 }
  writeLedger(ledger)
}

/* ── Today's cross-kind claim set ─────────────────────────────────
 *
 * The 5 quizzes and the 12 practice questions are drawn from the same bank
 * minutes apart. The ledger alone would not stop the collision, because the
 * quizzes are only marked served once they are ANSWERED — and the practice block
 * is composed before that happens. So every pick also claims its ids for the
 * calendar day, and every pick excludes today's claims regardless of kind.
 */

interface DayClaims {
  day: string
  ids: string[]
}

function readClaims(): DayClaims {
  try {
    const raw = window.localStorage.getItem(DAY_KEY)
    const parsed = raw ? (JSON.parse(raw) as DayClaims) : null
    if (parsed && parsed.day === ymd() && Array.isArray(parsed.ids)) return parsed
  } catch {
    /* ignore */
  }
  return { day: ymd(), ids: [] }
}

function claim(ids: string[]): void {
  if (!ids.length) return
  try {
    const cur = readClaims()
    const merged = new Set([...cur.ids, ...ids])
    window.localStorage.setItem(DAY_KEY, JSON.stringify({ day: ymd(), ids: [...merged] }))
  } catch {
    /* ignore */
  }
}

/** Everything any surface has already claimed today, across all pools. */
export function claimedToday(): Set<string> {
  return new Set(readClaims().ids)
}

/** Release today's claims — used when a session is abandoned before any answer. */
export function releaseClaims(ids: string[]): void {
  if (!ids.length) return
  try {
    const cur = readClaims()
    const drop = new Set(ids)
    window.localStorage.setItem(DAY_KEY, JSON.stringify({ day: cur.day, ids: cur.ids.filter((id) => !drop.has(id)) }))
  } catch {
    /* ignore */
  }
}

/* ── Today's composed plan (idempotence) ──────────────────────────
 *
 * The picker CLAIMS its ids and then hard-excludes today's claims, so a second
 * composition of the same day drew from an already-emptied pool and returned
 * nothing — bricking the day. (The claims persist to localStorage, so a reload
 * or the "Locked In" second board both triggered it.) The fix is to compose a
 * day ONCE and replay it: the first live compose records the picked ids here,
 * and every later compose — any board, any reload, and dry-run previews —
 * rebuilds the identical set from these ids instead of re-picking.
 */
const PLAN_KEY = "scholify-acca-today-plan"

interface DayPlan {
  day: string
  paper: string
  chapter: string
  picks: Record<string, string[]>
}

/** The ids composed for today for this paper+chapter, or null if none yet. */
export function readTodayPlan(paperId: string, chapterId: string): Record<string, string[]> | null {
  try {
    const raw = window.localStorage.getItem(PLAN_KEY)
    const parsed = raw ? (JSON.parse(raw) as DayPlan) : null
    if (parsed && parsed.day === ymd() && parsed.paper === paperId && parsed.chapter === chapterId && parsed.picks) {
      return parsed.picks
    }
  } catch {
    /* ignore */
  }
  return null
}

/** Record today's composed ids so subsequent compositions replay them. */
export function writeTodayPlan(paperId: string, chapterId: string, picks: Record<string, string[]>): void {
  try {
    window.localStorage.setItem(PLAN_KEY, JSON.stringify({ day: ymd(), paper: paperId, chapter: chapterId, picks }))
  } catch {
    /* ignore */
  }
}

/* ── The picker ───────────────────────────────────────────────────*/

export interface PickOptions<T> {
  paperId: string
  kind: PoolKind
  /** Everything eligible, already filtered by area/chapter/difficulty by the caller. */
  pool: T[]
  count: number
  /** Extra ids to avoid on top of the ledger and today's claims. */
  exclude?: Iterable<string>
  /**
   * Rank within the fresh set — lower sorts first. Use it to prefer authored over
   * derived items, or harder items late in the plan. Ties keep the rotated order,
   * so a flat ranker still spreads the bank instead of always serving the head.
   */
  rank?: (item: T) => number
  /** Claim the picked ids for today (default true). */
  claimForToday?: boolean
}

export interface PickResult<T> {
  items: T[]
  /** True when the pool had to restart a cycle to fill the request. */
  recycled: boolean
  /** Fresh items still available after this pick. */
  freshLeft: number
}

/**
 * Pick `count` items nobody has seen this cycle.
 *
 * ── Two kinds of exclusion, and the difference matters ────────────
 * HARD (never violated): today's cross-pool claims, and the caller's explicit
 * `exclude`. The same day must not double-serve an item, and the 5 quizzes must
 * not reappear in the same day's practice — allowing either would defeat the whole
 * point of the ledger.
 *
 * SOFT (a strong preference): the ledger's already-served ids. They sort to the
 * BACK rather than out, because a request must always be filled: a learner who has
 * worked through a small area's whole bank being handed two questions instead of
 * twelve reads as a broken app, and a second pass over questions they have already
 * met is genuinely valuable spaced revision. `recycled: true` tells the caller so
 * the UI can say so plainly — the honest framing is a milestone, not a fault.
 */
export function pickFresh<T extends { id: string }>(opts: PickOptions<T>): PickResult<T> {
  const { paperId, kind, pool, count } = opts
  if (count <= 0 || !pool.length) return { items: [], recycled: false, freshLeft: 0 }

  const hardBlocked = new Set<string>(claimedToday())
  for (const id of opts.exclude ?? []) hardBlocked.add(id)
  const served = servedIds(paperId, kind)

  // Stable order rotated by the day so a reload is identical and a new day moves on.
  const rotate = <U,>(arr: U[]): U[] => {
    if (arr.length <= 1) return arr
    const offset = ((dayIndex() % arr.length) + arr.length) % arr.length
    return [...arr.slice(offset), ...arr.slice(0, offset)]
  }

  const order = (list: T[]): T[] => {
    const rotated = rotate(list)
    if (!opts.rank) return rotated
    return rotated
      .map((item, i) => ({ item, i, r: opts.rank!(item) }))
      .sort((a, b) => a.r - b.r || a.i - b.i)
      .map((x) => x.item)
  }

  const eligible = pool.filter((q) => !hardBlocked.has(q.id))
  const fresh = order(eligible.filter((q) => !served.has(q.id)))
  const seen = order(eligible.filter((q) => served.has(q.id)))

  // Only dip into seen material when the unseen set genuinely cannot fill the
  // request — and when we do, open a new cycle so the ledger reflects reality
  // instead of growing past the size of the bank it is tracking.
  const recycled = fresh.length < count && seen.length > 0
  if (recycled) startNewCycle(paperId, kind, pool.length)

  const items = [...fresh, ...seen].slice(0, count)
  if (opts.claimForToday !== false) claim(items.map((i) => i.id))
  return { items, recycled, freshLeft: Math.max(0, fresh.length - items.length) }
}

/* ── Pool health, for the UI ──────────────────────────────────────*/

export interface PoolHealth {
  total: number
  served: number
  fresh: number
  percent: number
  cycle: number
}

export function poolHealth(paperId: string, kind: PoolKind, total: number): PoolHealth {
  const served = servedIds(paperId, kind).size
  const fresh = Math.max(0, total - served)
  return {
    total,
    served: Math.min(served, total),
    fresh,
    percent: total > 0 ? Math.round((Math.min(served, total) / total) * 100) : 0,
    cycle: poolCycle(paperId, kind),
  }
}

/** Wipe every ledger for a paper — used by "reset my progress" in Settings. */
export function clearLedger(paperId: string): void {
  const ledger = readLedger()
  for (const key of Object.keys(ledger)) if (key.startsWith(`${paperId}:`)) delete ledger[key]
  writeLedger(ledger)
}
