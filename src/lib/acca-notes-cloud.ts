/*
 * Scholify — account sync for the learner's notebook.
 *
 * Same design as the rest of the sync spine (acca-cloud.ts): localStorage is
 * authoritative and instant; when the user is signed in and Supabase is live,
 * the snapshot is upserted into ONE RLS-guarded row per user (migration
 * 0020_acca_notes.sql) and the cloud copy is merged back per-note by
 * updatedAt, with tombstones so deletions win over stale copies. Every call
 * degrades to a silent no-op — the UI never sees a sync error.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { snapshotNotesForSync, mergeNotesFromCloud, onNotesChange } from "@/lib/acca-notes"

async function currentUserId(): Promise<string | null> {
  if (!isSupabaseConfigured) return null
  try {
    const { data } = await supabase.auth.getSession()
    return data.session?.user?.id ?? null
  } catch {
    return null
  }
}

/** Push the local snapshot to the account (upsert one row per user). */
export async function pushNotes(): Promise<void> {
  const userId = await currentUserId()
  if (!userId) return
  try {
    const snap = snapshotNotesForSync()
    await supabase.from("acca_notes").upsert(
      {
        user_id: userId,
        notes: snap.notes,
        deleted: snap.deleted,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
  } catch {
    /* offline / table missing — local remains authoritative */
  }
}

/**
 * Reconcile local and cloud notes on load. Merges per-note (newest updatedAt
 * wins; tombstoned deletions win over stale copies), then pushes back when
 * local holds anything the cloud lacks. Returns true when local changed, so
 * the caller can refresh the UI.
 */
export async function syncNotes(): Promise<boolean> {
  const userId = await currentUserId()
  if (!userId) return false
  try {
    const { data, error } = await supabase
      .from("acca_notes")
      .select("notes, deleted")
      .eq("user_id", userId)
      .maybeSingle()

    if (error) return false
    const { hydrated, needPush } = mergeNotesFromCloud({
      notes: data?.notes ?? [],
      deleted: data?.deleted ?? {},
    })
    if (needPush || !data) void pushNotes()
    return hydrated
  } catch {
    return false
  }
}

// Debounced push: a burst of edits coalesces into one write.
let pushTimer: ReturnType<typeof setTimeout> | null = null
export function queueNotesPush(delayMs = 3000): void {
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    pushTimer = null
    void pushNotes()
  }, delayMs)
}

/**
 * Wire the sync once per app session: reconcile on start, then push
 * (debounced) after every local change, wherever in the app it was made.
 * Idempotent — the DashboardLayout calls it on every page, only the first
 * call does anything.
 */
let wired = false
export function initNotesSync(): void {
  if (wired) return
  wired = true
  void syncNotes()
  onNotesChange(() => queueNotesPush())
}
