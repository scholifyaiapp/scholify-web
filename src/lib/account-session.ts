import { isSupabaseConfigured, supabase } from "@/lib/supabase"

/**
 * Scholify subscriptions are individual learner licences.
 *
 * A second explicit sign-in replaces the previous login. This is intentionally
 * one active login rather than a home-grown "two devices" approximation: Auth
 * can revoke a whole session reliably, while browser fingerprints, IP addresses
 * and user-agent strings cannot distinguish a shared password from one learner
 * moving between their phone and laptop.
 */
export const ACTIVE_LOGIN_LIMIT = 1

const REPLACED_NOTICE_KEY = "scholify-session-replaced"

/** Keep this login and revoke every older Supabase refresh session. */
export async function secureLatestLogin(): Promise<string | null> {
  if (!isSupabaseConfigured) return null
  const { error } = await supabase.auth.signOut({ scope: "others" })
  return error?.message ?? null
}

/**
 * Ask Postgres whether this JWT's session_id still exists in auth.sessions.
 *
 * `false` is definitive and means another login or a global sign-out replaced
 * this session. `null` means the check itself was unavailable; callers fail
 * open on infrastructure silence so a network problem never ejects a learner.
 */
export async function currentAuthSessionIsActive(): Promise<boolean | null> {
  if (!isSupabaseConfigured) return true
  const { data, error } = await supabase.rpc("is_current_auth_session_valid")
  if (error) return null
  return data === true
}

/** Leave a one-shot explanation for the sign-in screen after local Auth clears. */
export function markSessionReplaced(): void {
  try {
    window.sessionStorage.setItem(REPLACED_NOTICE_KEY, "1")
  } catch {
    /* storage may be disabled; the security action still completed */
  }
}

/** Read and remove the one-shot explanation. */
export function consumeSessionReplacedNotice(): boolean {
  try {
    const present = window.sessionStorage.getItem(REPLACED_NOTICE_KEY) === "1"
    window.sessionStorage.removeItem(REPLACED_NOTICE_KEY)
    return present
  } catch {
    return false
  }
}
