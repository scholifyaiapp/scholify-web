import type { User } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

const OWNER_KEY = "scholify-account-state-owner"
const BACKUP_PREFIX = "scholify-account-state:"
const META_KEY = "scholify_acca_setup"

// Small setup/preferences only. Question history and notes have their own
// database sync paths and must not be copied into auth JWT metadata.
const SETUP_KEYS = [
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
      saveLocalBackup(owner)
      clearSetup()
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
    await supabase.auth.updateUser({ data: { [META_KEY]: state } })
  } catch {
    // Local state remains usable offline and will retry on sign-out/next save.
  }
}

/** Save the current account and remove its setup before another user signs in. */
export async function releaseAccountSetup(): Promise<void> {
  await persistAccountSetup()
  hydrateAccountSetup(null)
}
