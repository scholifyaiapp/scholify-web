/*
 * Scholify — ACCA learning-data sync (the moat).
 *
 * The ACCA engine is localStorage-first, which means a student's mastery lives
 * on one device and vanishes if they clear the browser. This module starts the
 * server-side learner record: diagnostic results are written to Supabase per
 * user so they survive, sync across devices, and — over time — become the
 * dataset that powers real personalisation.
 *
 * Every call degrades gracefully: signed out, Supabase unconfigured, or the
 * table not yet migrated → it silently no-ops (writes) or falls back to
 * localStorage (reads). The UI never sees an error from sync.
 *
 * Persistence uses row-level security: a signed-in user can only read/write
 * their own rows (see supabase/migrations/0011_acca_diagnostics.sql).
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { snapshotProgress, restoreProgress, progressAnsweredCount, type AccaProgressSnapshot } from "@/lib/acca"
import { mergeProgressSnapshots } from "@/lib/acca-progress-merge"

/**
 * Shape-guard a cloud row before merging. The row is user-writable, so the
 * merge must never see a primitive where it expects a map — restoreProgress
 * runs its own full validation afterwards, this only keeps the merge itself
 * from reading properties off garbage.
 */
function coerceCloudSnapshot(raw: unknown): AccaProgressSnapshot {
  const o = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>
  const obj = (v: unknown) => (typeof v === "object" && v !== null && !Array.isArray(v) ? v : {})
  return {
    questions: obj(o.questions),
    areas: obj(o.areas),
    totalAnswered: Number(o.totalAnswered) || 0,
    totalCorrect: Number(o.totalCorrect) || 0,
    lastStudied: typeof o.lastStudied === "string" ? o.lastStudied : null,
    history: Array.isArray(o.history) ? o.history.filter((d): d is string => typeof d === "string") : [],
    streak: Number(o.streak) || 0,
    daily: obj(o.daily),
    dailyCorrect: obj(o.dailyCorrect),
  } as AccaProgressSnapshot
}
import {
  getLatestDiagnostic,
  mergeDiagnostic,
  saveDiagnosticLocal,
  type DiagnosticResult,
} from "@/lib/acca-diagnostic"

async function currentUserId(): Promise<string | null> {
  if (!isSupabaseConfigured) return null
  try {
    const { data } = await supabase.auth.getSession()
    return data.session?.user?.id ?? null
  } catch {
    return null
  }
}

/**
 * Persist a diagnostic result. Always writes locally (instant, offline); when
 * the user is signed in and Supabase is live, also upserts the durable copy.
 * Fire-and-forget: the returned promise resolves even if the cloud write fails.
 */
export async function persistDiagnostic(result: DiagnosticResult): Promise<void> {
  saveDiagnosticLocal(result)

  const userId = await currentUserId()
  if (!userId) return

  const row = {
    user_id: userId,
    paper_id: result.paperId,
    pass_probability: result.passProbability,
    estimated_score: result.estimatedScore,
    confidence: result.confidence,
    questions_answered: result.questionsAnswered,
    raw_correct: result.rawCorrect,
    areas: result.areas,
    target: result.target,
    source: result.source ?? "diagnostic",
    evidence: result.evidence ?? {},
    answered_at: result.answeredAt,
  }

  try {
    const { error } = await supabase.from("acca_diagnostics").insert(row)
    if (!error) return

    // `source` and `evidence` arrive with migration 0025. Until that migration is
    // applied PostgREST rejects the WHOLE row, so every ordinary diagnostic would
    // stop reaching the cloud — and invisibly, because insert() resolves with an
    // error instead of throwing, so the catch below never sees it and nothing was
    // checking the returned error. Retry on the pre-0025 column set so a deploy
    // that lands before its migration degrades instead of breaking, and warn
    // either way so a missed migration is diagnosable rather than silent.
    if (isUnknownColumnError(error)) {
      console.warn("diagnostic cloud persist: retrying without source/evidence (apply migration 0025)", error.message)
      const { source: _source, evidence: _evidence, ...legacy } = row
      const { error: retryError } = await supabase.from("acca_diagnostics").insert(legacy)
      if (retryError) console.warn("diagnostic cloud persist failed:", retryError.message)
      return
    }
    console.warn("diagnostic cloud persist failed:", error.message)
  } catch {
    /* offline / table missing / RLS — the local copy is authoritative meanwhile */
  }
}

/** True when Postgres/PostgREST rejected the row for naming a column it lacks. */
function isUnknownColumnError(error: { code?: string; message?: string }): boolean {
  // 42703 = undefined_column (Postgres); PGRST204 = column absent from the
  // PostgREST schema cache, which is what a just-added column usually reports.
  if (error.code === "42703" || error.code === "PGRST204") return true
  const message = String(error.message || "")
  return /does not exist|could not find the .* column|unknown column/i.test(message)
}

/**
 * Get the latest diagnostic for a paper, preferring the cloud copy when it's
 * newer (e.g. taken on another device). Falls back to local instantly.
 * Backfills localStorage so subsequent synchronous reads are warm.
 */
export async function fetchLatestDiagnostic(paperId: string): Promise<DiagnosticResult | null> {
  const local = getLatestDiagnostic(paperId)

  const userId = await currentUserId()
  if (!userId) return local

  try {
    const { data, error } = await supabase
      .from("acca_diagnostics")
      .select("*")
      .eq("user_id", userId)
      .eq("paper_id", paperId)
      .order("answered_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !data) return local

    const cloud: DiagnosticResult = {
      paperId: data.paper_id,
      answeredAt: data.answered_at,
      questionsAnswered: data.questions_answered ?? 0,
      rawCorrect: data.raw_correct ?? 0,
      estimatedScore: data.estimated_score ?? 0,
      passProbability: data.pass_probability ?? 0,
      confidence: data.confidence ?? 0,
      source: data.source === "result-upload" ? "result-upload" : "diagnostic",
      evidence: data.evidence && Object.keys(data.evidence).length ? data.evidence : undefined,
      areas: data.areas ?? [],
      weakest: [...(data.areas ?? [])].filter((a: { seen: number }) => a.seen > 0).sort((a: { score: number }, b: { score: number }) => a.score - b.score).slice(0, 3),
      strongest: [...(data.areas ?? [])].filter((a: { seen: number }) => a.seen > 0).sort((a: { score: number }, b: { score: number }) => b.score - a.score).slice(0, 3),
      target: data.target ?? { focusAreas: [], targetScore: 0.7, projectedPassProbability: data.pass_probability ?? 0 },
    }
    mergeDiagnostic(cloud)
    return getLatestDiagnostic(paperId) ?? cloud
  } catch {
    return local
  }
}

/* ── Progress snapshot sync (the learning-data spine) ─────────── */

/** Push the local progress snapshot to the server (upsert one row per user). */
export async function pushAccaProgress(): Promise<void> {
  const userId = await currentUserId()
  if (!userId) return
  try {
    await supabase.from("acca_progress").upsert(
      {
        user_id: userId,
        data: snapshotProgress(),
        answered: progressAnsweredCount(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
  } catch {
    /* offline / table missing — local remains authoritative */
  }
}

/**
 * Reconcile local and cloud progress on load. Because `answered` only ever
 * grows, the more-complete copy wins with no lost work:
 *  - cloud ahead (e.g. fresh device / cleared browser) → hydrate local from it
 *  - local ahead → push local up
 * Returns true when local was hydrated, so the caller can refresh the UI.
 */
export async function syncAccaProgress(): Promise<boolean> {
  const userId = await currentUserId()
  if (!userId) return false
  try {
    const { data, error } = await supabase
      .from("acca_progress")
      .select("data, answered")
      .eq("user_id", userId)
      .maybeSingle()

    if (error) return false

    const cloudAnswered = data?.answered ?? -1
    const localAnswered = progressAnsweredCount()

    if (data && cloudAnswered > localAnswered) {
      /*
       * MERGE, never replace. The old rule hydrated the whole cloud snapshot
       * over local, which destroyed any unsynced local work — a new phone with
       * 50 fresh FM answers lost all of them to a laptop's 300 MA answers the
       * moment it first synced. The paper-level merge keeps whichever side is
       * richer PER PAPER, so the different-papers fork is lossless and the
       * same-paper fork degrades to exactly the old behaviour. The merged
       * result is then pushed back up, so the cloud row converges too.
       */
      restoreProgress(mergeProgressSnapshots(snapshotProgress(), coerceCloudSnapshot(data.data)))
      void pushAccaProgress()
      return true
    }
    if (localAnswered > cloudAnswered) {
      void pushAccaProgress()
    }
    return false
  } catch {
    return false
  }
}

// Debounced push: many answers in a session coalesce into one write.
let pushTimer: ReturnType<typeof setTimeout> | null = null
export function queueAccaProgressPush(delayMs = 2500): void {
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    pushTimer = null
    void pushAccaProgress()
  }, delayMs)
}

/* ── App-load reconcile (once per user, per page load) ────────── */

/*
 * ProtectedRoute drives this so the learner record is reconciled when the app
 * OPENS, not only when /study happens to mount. The gap it closes: a returning
 * learner on a new device (or cleared browser) lands on /dashboard, where
 * streak, mastery and today's figures all read an empty localStorage — the
 * cloud copy was only ever consulted by /study's own mount effect, a page they
 * may not reach for minutes.
 *
 * Keyed by user id so an account switch on the same browser reconciles the new
 * account, and raced against a timeout so a hung request can never hold the
 * app shut — the underlying sync keeps running and lands for a later mount.
 * StrictMode double-mounts and route changes reuse the in-flight promise.
 */
let loadSyncUser: string | null = null
let loadSyncSettled = false
let loadSyncInflight: Promise<void> | null = null

/** Has the app-load reconcile finished (or timed out) for this user? */
export function accaProgressLoadSyncSettled(userId: string): boolean {
  return loadSyncUser === userId && loadSyncSettled
}

/** Start (or join) the app-load reconcile for this user. Never rejects. */
export function ensureAccaProgressLoadSync(userId: string, timeoutMs = 8000): Promise<void> {
  if (loadSyncUser !== userId) {
    loadSyncUser = userId
    loadSyncSettled = false
    loadSyncInflight = null
  }
  if (!loadSyncInflight) {
    loadSyncInflight = Promise.race([
      syncAccaProgress().then(() => undefined),
      new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
    ]).then(() => {
      loadSyncSettled = true
    })
  }
  return loadSyncInflight
}
