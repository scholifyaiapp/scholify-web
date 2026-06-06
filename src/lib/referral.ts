import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

/*
 * Referral system — word-of-mouth tracking.
 *
 * Every account gets a stable 8-char code. The share URL is
 * `scholifyapp.com?ref=<code>`. On sign-up we capture an inbound ?ref,
 * record it on the new account, and credit the referrer.
 *
 * Cross-user crediting (increment_referral) needs the 0009_referrals
 * migration applied + Supabase configured; everything degrades gracefully
 * (local code + URL still work) until then.
 */

const SITE = "https://scholifyapp.com"
const CAPTURED_KEY = "scholify-referred-by"
const CODE_KEY = "scholify-referral-code"

/** Stable 8-char referral code for a user (derived from id; random fallback). */
export function getReferralCode(user: User | null): string {
  const explicit = (user?.user_metadata?.referral_code as string) || ""
  if (explicit) return explicit
  if (user?.id) return hash8(user.id)
  try {
    const existing = window.localStorage.getItem(CODE_KEY)
    if (existing) return existing
    const code = randomCode()
    window.localStorage.setItem(CODE_KEY, code)
    return code
  } catch {
    return randomCode()
  }
}

export function referralUrl(code: string): string {
  return `${SITE}?ref=${code}`
}

/** Read ?ref= from the current URL and remember it for sign-up. */
export function captureRefFromUrl(): void {
  try {
    const ref = new URLSearchParams(window.location.search).get("ref")
    if (ref) window.localStorage.setItem(CAPTURED_KEY, ref.slice(0, 32))
  } catch {
    /* ignore */
  }
}

export function getCapturedRef(): string | null {
  try {
    return window.localStorage.getItem(CAPTURED_KEY)
  } catch {
    return null
  }
}

/** After sign-up: record who referred this user + credit the referrer. */
export async function applyReferralOnSignup(user: User | null): Promise<void> {
  const ref = getCapturedRef()
  if (!ref || !user) return
  if (ref === getReferralCode(user)) return // no self-referrals

  if (isSupabaseConfigured) {
    try {
      await supabase.auth.updateUser({ data: { referred_by: ref } })
    } catch {
      /* non-fatal */
    }
    // Credit the referrer — needs the 0009_referrals migration applied.
    await supabase.rpc("increment_referral", { code: ref }).then(
      () => {},
      () => {},
    )
  }

  try {
    window.localStorage.removeItem(CAPTURED_KEY)
  } catch {
    /* ignore */
  }
}

export interface ReferralStats {
  invited: number
  joined: number
}

/** Best-effort stats from account metadata (0 until the backend is wired). */
export function getReferralStats(user: User | null): ReferralStats {
  const count = Number(user?.user_metadata?.referral_count) || 0
  return { invited: count, joined: count }
}

function randomCode(): string {
  return Math.random().toString(36).slice(2, 10)
}

function hash8(input: string): string {
  let h = 0
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 8)
}
