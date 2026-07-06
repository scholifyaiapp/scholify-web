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
import { snapshotProgress, restoreProgress, progressAnsweredCount } from "@/lib/acca"
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

  try {
    await supabase.from("acca_diagnostics").insert({
      user_id: userId,
      paper_id: result.paperId,
      pass_probability: result.passProbability,
      estimated_score: result.estimatedScore,
      confidence: result.confidence,
      questions_answered: result.questionsAnswered,
      raw_correct: result.rawCorrect,
      areas: result.areas,
      target: result.target,
      answered_at: result.answeredAt,
    })
  } catch {
    /* offline / table missing / RLS — the local copy is authoritative meanwhile */
  }
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
      restoreProgress(data.data ?? {})
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
