/*
 * VARIANT-SCOPED KNOWLEDGE RECORDS — the fix for silent syllabus blending.
 *
 * ── The defect (found by the 19 Aug 2026 train-and-test loop) ────
 * Progress is keyed by PAPER ID alone: per-question stats, per-area accuracy,
 * mock history and the saved diagnostic all live under "LW" or "TX" with no
 * memory of which VARIANT produced them. LW-Global and LW-English are two
 * different syllabuses that happen to share area letters — Global's Area B is
 * the CISG, English's Area B is the law of obligations. So a learner who
 * switched variant mid-journey carried a knowledge model measured on one
 * syllabus into the other: weak-area steering pointed at the wrong law, the
 * readiness score averaged two exams, and a mock best-% earned on the Global
 * bank counted toward the UK gate. Settings even promises the switch does
 * "not [change] your saved progress" — which made the blend invisible.
 *
 * ── The fix: archive and restore, never blend, never destroy ─────
 * On a variant switch, the paper's VARIANT-SCOPED records (question stats,
 * area stats, mock history, diagnostic) are moved into an archive slot keyed
 * by the OLD variant, and any archived records for the NEW variant are
 * restored. Switching back returns the learner exactly where they left that
 * syllabus — nothing is deleted, and nothing measured on one syllabus is ever
 * read as evidence about the other.
 *
 * What deliberately does NOT move: streaks, daily activity, today's ledgers
 * and the plan. Those measure EFFORT and commitment, which are real regardless
 * of variant — a 12-day streak was not sat on a syllabus.
 *
 * This module manipulates the stores by their storage keys rather than
 * importing acca.ts / acca-diagnostic.ts, because acca-profile (the caller)
 * sits BELOW those modules in the import graph and a cycle here would be
 * circular-init roulette.
 */

const KEY_PROGRESS = "scholify-acca-progress"
const KEY_MOCKS = "scholify-acca-mocks"
const KEY_DIAGNOSTICS = "scholify-acca-diagnostics"
const KEY_ARCHIVE = "scholify-acca-variant-archive"

interface VariantArchiveEntry {
  questions?: unknown
  areas?: unknown
  mocks?: unknown
  diagnostic?: unknown
}

type VariantArchive = Record<string, VariantArchiveEntry>

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return (typeof parsed === "object" && parsed !== null ? (parsed as T) : fallback)
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* local-first: a blocked store must never break a settings change */
  }
}

const slot = (paperId: string, variant: string) => `${paperId}::${variant}`

/**
 * Move the paper's variant-scoped records out to the archive under
 * `fromVariant`, and pull any archived records for `toVariant` back in.
 * Idempotent for fromVariant === toVariant (does nothing).
 */
export function swapVariantScopedRecords(paperId: string, fromVariant: string, toVariant: string): void {
  if (fromVariant === toVariant) return

  const progress = readJson<Record<string, unknown>>(KEY_PROGRESS, {})
  const mocks = readJson<Record<string, unknown>>(KEY_MOCKS, {})
  const diags = readJson<Record<string, unknown>>(KEY_DIAGNOSTICS, {})
  const archive = readJson<VariantArchive>(KEY_ARCHIVE, {})

  const questions = (progress.questions ?? {}) as Record<string, unknown>
  const areas = (progress.areas ?? {}) as Record<string, unknown>

  // 1. Everything the old variant measured goes to its archive slot.
  archive[slot(paperId, fromVariant)] = {
    questions: questions[paperId],
    areas: areas[paperId],
    mocks: mocks[paperId],
    diagnostic: diags[paperId],
  }

  // 2. The new variant starts from ITS archive slot — restored if it has been
  //    studied before, empty (an honest "still measuring") if it never was.
  const incoming = archive[slot(paperId, toVariant)] ?? {}
  if (incoming.questions !== undefined) questions[paperId] = incoming.questions
  else delete questions[paperId]
  if (incoming.areas !== undefined) areas[paperId] = incoming.areas
  else delete areas[paperId]
  if (incoming.mocks !== undefined) mocks[paperId] = incoming.mocks
  else delete mocks[paperId]
  if (incoming.diagnostic !== undefined) diags[paperId] = incoming.diagnostic
  else delete diags[paperId]
  delete archive[slot(paperId, toVariant)]

  progress.questions = questions
  progress.areas = areas
  writeJson(KEY_PROGRESS, progress)
  writeJson(KEY_MOCKS, mocks)
  writeJson(KEY_DIAGNOSTICS, diags)
  writeJson(KEY_ARCHIVE, archive)
}
