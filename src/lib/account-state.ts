import type { User } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

const OWNER_KEY = "scholify-account-state-owner"
const BACKUP_PREFIX = "scholify-account-state:"
const META_KEY = "scholify_acca_setup"

/**
 * The onboarding SETUP keys — small preferences only. Question history and notes
 * have their own database sync paths and must not be copied into auth JWT
 * metadata.
 *
 * Exported because this is also the definition of "setup, not progress" that
 * Settings' "reset my progress" must preserve. Those were two hand-maintained
 * lists and they had already drifted: `scholify-acca-learner-baseline` and
 * `scholify-acca-study-resources` were added here but not there, so a reset
 * deleted the learner's route, English level and study-resource profile while
 * KEEPING `scholify-acca-onboarded` — leaving them unable to re-enter any of it
 * (onboarding won't re-run) and silently re-pitched at advanced English with a
 * generic plan. Settings derives its keep-set from this array; keep them one list.
 */
export const SETUP_KEYS = [
  "scholify-acca-onboarded",
  "scholify-acca-current-paper",
  "scholify-acca-studying",
  "scholify-acca-passed",
  "scholify-acca-paper-variants",
  "scholify-acca-startmode",
  "scholify-acca-experience",
  "scholify-acca-goal",
  "scholify-acca-plan",
  "scholify-acca-daily-goal",
  "scholify-acca-learner-baseline",
  "scholify-acca-study-resources",
] as const

type SetupSnapshot = Record<string, string>

function snapshot(): SetupSnapshot {
  const state: SetupSnapshot = {}
  for (const key of SETUP_KEYS) {
    const value = window.localStorage.getItem(key)
    if (value !== null) state[key] = value
  }
  return state
}

function restore(state: unknown): void {
  if (!state || typeof state !== "object" || Array.isArray(state)) return
  for (const key of SETUP_KEYS) {
    const value = (state as SetupSnapshot)[key]
    if (typeof value === "string") window.localStorage.setItem(key, value)
  }
}

function clearSetup(): void {
  for (const key of SETUP_KEYS) window.localStorage.removeItem(key)
}

/**
 * Wipe ALL of this browser's Scholify data — setup AND the content stores
 * (diagnostics, progress, notes, mistakes, stats, flashcards, mocks, journey,
 * the composed day) — but keep the owner marker and the per-user setup backups.
 *
 * Used when a DIFFERENT account signs in on the same browser. clearSetup alone
 * left every content key behind, so user B saw user A's private diagnostics and
 * notes, and B was denied their own free diagnosis because A's still resolved
 * locally. B's own data re-hydrates from their cloud (progress/diagnostics sync
 * to Supabase, notes have their own sync), so clearing local is safe.
 */
function clearAllUserData(): void {
  // Iterate via the Storage API, not Object.keys(localStorage) — the latter does
  // not enumerate keys in every environment. Collect first, then remove, so the
  // live index isn't mutated mid-scan.
  const keys: string[] = []
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i)
    if (key) keys.push(key)
  }
  for (const key of keys) {
    if (!key.startsWith("scholify")) continue
    if (key === OWNER_KEY || key.startsWith(BACKUP_PREFIX)) continue
    window.localStorage.removeItem(key)
  }
}

function saveLocalBackup(userId: string): void {
  window.localStorage.setItem(`${BACKUP_PREFIX}${userId}`, JSON.stringify(snapshot()))
}

/**
 * Isolate setup state when accounts change and hydrate it from durable auth
 * metadata on a new browser. Existing installs with no owner marker are adopted
 * by the first signed-in account so the launch migration never erases work.
 */
export function hydrateAccountSetup(user: User | null): void {
  try {
    const owner = window.localStorage.getItem(OWNER_KEY)
    if (!user) {
      if (owner) saveLocalBackup(owner)
      clearSetup()
      window.localStorage.removeItem(OWNER_KEY)
      return
    }

    if (owner && owner !== user.id) {
      // A different account is signing in on this browser. Back up the previous
      // owner's setup, then wipe EVERYTHING local (setup + content) so the new
      // user never sees the previous user's diagnostics, notes or progress.
      saveLocalBackup(owner)
      clearAllUserData()
    }

    const cloud = user.user_metadata?.[META_KEY]
    const backupRaw = window.localStorage.getItem(`${BACKUP_PREFIX}${user.id}`)
    const backup = backupRaw ? JSON.parse(backupRaw) : null
    const alreadyOwned = owner === user.id

    if (!alreadyOwned) {
      if (cloud && typeof cloud === "object") restore(cloud)
      else if (backup) restore(backup)
      // No owner and no cloud/backup means this is an existing pre-migration
      // browser. Keep its current setup and adopt it for this account.
    } else if (!window.localStorage.getItem("scholify-acca-onboarded") && cloud) {
      restore(cloud)
    }

    window.localStorage.setItem(OWNER_KEY, user.id)
    saveLocalBackup(user.id)
  } catch {
    // Storage restrictions must not prevent authentication.
  }
}

/** The last snapshot actually written to the auth API, as `userId:json`. */
let lastPersisted: string | null = null

/** Persist the compact onboarding/setup snapshot to this account. */
export async function persistAccountSetup(): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user
    if (!user) return
    const state = snapshot()
    saveLocalBackup(user.id)
    window.localStorage.setItem(OWNER_KEY, user.id)

    // Only touch the auth API when the snapshot actually CHANGED. AuthProvider
    // calls this on a 30s interval AND on every pagehide/visibilitychange, and
    // updateUser is not a cheap local write: it's a network round trip that
    // emits USER_UPDATED, which re-runs hydrate and hands setUser/setSession
    // fresh object identities — re-rendering every auth-context consumer in the
    // app. Unconditionally, that was a write plus a full re-render every 30
    // seconds per signed-in user, forever, to store bytes already stored.
    // Setup changes a handful of times per account, so the dirty check removes
    // effectively all of that traffic while keeping the same durability.
    // Keyed by user id so switching accounts always re-writes.
    const fingerprint = `${user.id}:${JSON.stringify(state)}`
    if (fingerprint === lastPersisted) return
    await supabase.auth.updateUser({ data: { [META_KEY]: state } })
    // Only after the write lands — a failed attempt must stay dirty and retry.
    lastPersisted = fingerprint
  } catch {
    // Local state remains usable offline and will retry on sign-out/next save.
  }
}

/** Save the current account and remove its setup before another user signs in. */
export async function releaseAccountSetup(): Promise<void> {
  await persistAccountSetup()
  hydrateAccountSetup(null)
}
