import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured, isDemoAuthAllowed, authUnavailable } from "./supabase"
import { identifyUser, trackEvent } from "@/lib/analytics"
import { hydrateAccountSetup, persistAccountSetup, releaseAccountSetup } from "@/lib/account-state"
import { clearPartnerLandingCache } from "@/lib/affiliate"
import { markAppRetention } from "@/lib/retention"
import { secureLatestLogin } from "@/lib/account-session"

/*
 * A production build with no Supabase must NOT mint fake accounts (see the note
 * in supabase.ts). It says so, once, in one place.
 */
const ACCOUNTS_CLOSED =
  "Accounts aren't open yet — we're putting the finishing touches to Scholify. Email info@scholifyapp.com and we'll tell you the moment they are."

/* ──────────────────────────────────────────────────────────────
 *  AuthContext — wraps Supabase auth.
 *
 *  When Supabase credentials are configured it uses the real API.
 *  Otherwise it runs a local DEMO mode (a fake user persisted to
 *  localStorage) so the entire sign-in / sign-up flow still works.
 * ────────────────────────────────────────────────────────────── */

export interface SignUpInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

/**
 * WHY an error needs a code as well as a message.
 *
 * SignIn deliberately shows a non-revealing "Wrong email or password" for a
 * genuine credential failure — telling a stranger which half was wrong is
 * account enumeration. But it was applying that message to EVERY failure, which
 * threw away the specific ones this mapper had carefully produced: a learner
 * whose email was unconfirmed, or who had hit a rate limit, or who was signing in
 * to a build with no Supabase configured, was told their password was wrong. That
 * is advice they can never act on — they retype a correct password until the
 * form locks them out.
 *
 * The code lets the page keep the enumeration-safe message where it matters and
 * be honest everywhere else.
 */
export type AuthErrorCode =
  /** Email/password did not match. The one case that must stay vague. */
  | "credentials"
  /** The account exists but the email has not been confirmed. */
  | "unconfirmed"
  /** An account already exists (sign-up). */
  | "exists"
  /** Supabase rate limit — nothing to do with what was typed. */
  | "rate_limit"
  /** No auth backend configured in this build. */
  | "unavailable"
  /** Anything else, including network failures. */
  | "unknown"

export interface AuthResult {
  /** Human-readable error message, or null on success. */
  error: string | null
  /** Machine-readable classification of `error`. Absent on success. */
  code?: AuthErrorCode
  /** True when this account was just created (used for onboarding redirect). */
  isNewUser?: boolean
  /** True when sign-up succeeded but the email still needs confirming. */
  needsEmailConfirmation?: boolean
}

/** Turn raw Supabase auth errors into friendly, human messages plus a code. */
function friendlyError(message: string): { error: string; code: AuthErrorCode } {
  const m = message.toLowerCase()
  if (m.includes("invalid login credentials"))
    return { error: "Wrong email or password. Please try again.", code: "credentials" }
  if (m.includes("email not confirmed"))
    return { error: "Please confirm your email first — check your inbox for the link.", code: "unconfirmed" }
  if (m.includes("already registered") || m.includes("already exists"))
    return { error: "An account with this email already exists. Try signing in instead.", code: "exists" }
  if (m.includes("rate limit"))
    return { error: "Too many attempts. Please wait a moment and try again.", code: "rate_limit" }
  return { error: message, code: "unknown" }
}

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (input: SignUpInput) => Promise<AuthResult>
  signInWithGoogle: () => Promise<AuthResult>
  signOut: () => Promise<void>
  /** Keep this browser signed in and revoke every other login for the account. */
  signOutOtherSessions: () => Promise<AuthResult>
  /** Email a password-reset link. Errors honestly when Supabase isn't configured. */
  resetPassword: (email: string) => Promise<AuthResult>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const DEMO_KEY = "scholify-demo-user"

/** Build a minimal fake User object for demo mode. */
function makeDemoUser(email: string, firstName = "", lastName = ""): User {
  const now = new Date().toISOString()
  return {
    id: `demo-${Date.now()}`,
    aud: "authenticated",
    role: "authenticated",
    email,
    created_at: now,
    updated_at: now,
    app_metadata: { provider: "demo" },
    user_metadata: { first_name: firstName, last_name: lastName },
    identities: [],
  } as unknown as User
}

function readDemoUser(): User | null {
  try {
    const raw = window.localStorage.getItem(DEMO_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function writeDemoUser(user: User | null) {
  try {
    if (user) window.localStorage.setItem(DEMO_KEY, JSON.stringify(user))
    else window.localStorage.removeItem(DEMO_KEY)
  } catch {
    /* localStorage unavailable — demo session just won't persist */
  }
}

/*
 * ensureTrial() and the startTrial() it backed are GONE, with the endpoint
 * they called (api/paddle.ts).
 *
 * They granted a 3-day Pro trial for a signed-in JWT alone — no card, no
 * Stripe, no payment — by writing trial_ends_at, which entitlementOf() reads
 * as full access. Nothing in the app had called it since billing moved to
 * Stripe, but the client helper and the endpoint both stayed reachable, and an
 * unused door is still a door.
 *
 * The only trial now is the real one: `trial_period_days: 3` on a Stripe
 * subscription, which cannot begin until a payment method has been captured.
 */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const sync = () => { void persistAccountSetup() }
    const timer = window.setInterval(sync, 30_000)
    window.addEventListener("pagehide", sync)
    document.addEventListener("visibilitychange", sync)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener("pagehide", sync)
      document.removeEventListener("visibilitychange", sync)
    }
  }, [user])

  useEffect(() => {
    // DEMO mode — restore any persisted fake session.
    if (!isSupabaseConfigured) {
      setUser(readDemoUser())
      setLoading(false)
      return
    }

    // One authenticated "app_opened" per load — the retention/WAU signal, scoped
    // to signed-in learners so anonymous landing-page visits don't dilute it.
    let openedTracked = false
    const trackOpen = (u: User | null) => {
      if (openedTracked || !u) return
      openedTracked = true
      identifyUser(u.id, { email: u.email, provider: u.app_metadata?.provider })
      trackEvent("app_opened")
      void markAppRetention(u)
    }

    // REAL mode — hydrate from Supabase and subscribe to changes.
    let active = true
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return
        hydrateAccountSetup(data.session?.user ?? null)
        trackOpen(data.session?.user ?? null)
        setSession(data.session)
        setUser(data.session?.user ?? null)
        setLoading(false)
      })
      // If the session check ever rejects (corrupt stored session, a network
      // blip), loading must still resolve — otherwise every route guard is stuck
      // on the spinner forever and the whole app looks dead. Treat it as
      // logged-out and let the user proceed to sign in.
      .catch(() => {
        if (active) setLoading(false)
      })
    // Absolute backstop: never let the loading gate hang more than 8s, whatever
    // happens upstream.
    const failsafe = setTimeout(() => {
      if (active) setLoading(false)
    }, 8000)

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      hydrateAccountSetup(nextSession?.user ?? null)
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      trackOpen(nextSession?.user ?? null)
    })

    return () => {
      active = false
      clearTimeout(failsafe)
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (authUnavailable) return { error: ACCOUNTS_CLOSED, code: "unavailable", isNewUser: false }
    if (isDemoAuthAllowed) {
      const demo = makeDemoUser(email)
      writeDemoUser(demo)
      setUser(demo)
      return { error: null, isNewUser: false }
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { ...friendlyError(error.message), isNewUser: false }
    // Update state immediately so route guards don't race the listener.
    if (data.session) {
      setSession(data.session)
      setUser(data.user)
      // An account is one private learner record, not a household/team seat.
      // End every older login only after an EXPLICIT successful sign-in. Doing
      // this while merely restoring a tab would let an abandoned old browser
      // evict the person who most recently entered the password.
      const securityError = await secureLatestLogin()
      if (securityError) {
        trackEvent("session_security_failed", { method: "password" })
        // Do not leave a half-secured login alive. Reporting a sign-in failure
        // while silently retaining the session would be worse than either state.
        await supabase.auth.signOut({ scope: "local" })
        setSession(null)
        setUser(null)
        return {
          error: "Your password was correct, but Scholify couldn't end the older login. Please try again so your account opens privately.",
          code: "unknown",
          isNewUser: false,
        }
      }
      trackEvent("session_secured", { method: "password" })
    }
    return { error: null, isNewUser: false }
  }, [])

  const signUp = useCallback(async (input: SignUpInput): Promise<AuthResult> => {
    const { firstName, lastName, email, password } = input
    if (authUnavailable) return { error: ACCOUNTS_CLOSED, code: "unavailable", isNewUser: true }
    if (isDemoAuthAllowed) {
      const demo = makeDemoUser(email, firstName, lastName)
      writeDemoUser(demo)
      setUser(demo)
      return { error: null, isNewUser: true }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    })
    if (error) return { ...friendlyError(error.message), isNewUser: true }
    // With email confirmation OFF, signUp returns a session and the user is
    // logged in instantly. With it ON, session is null until they confirm.
    if (data.session) {
      setSession(data.session)
      setUser(data.user)
    }
    return { error: null, isNewUser: true, needsEmailConfirmation: !data.session }
  }, [])

  const signInWithGoogle = useCallback(async (): Promise<AuthResult> => {
    if (authUnavailable) return { error: ACCOUNTS_CLOSED, code: "unavailable", isNewUser: false }
    if (isDemoAuthAllowed) {
      const demo = makeDemoUser("you@gmail.com", "Google", "User")
      writeDemoUser(demo)
      setUser(demo)
      return { error: null, isNewUser: false }
    }
    // Mark that an OAuth round-trip is in progress. On return, the app
    // routes the user into the app even if Supabase sent them to the
    // site root instead of /auth/callback.
    try {
      window.sessionStorage.setItem("scholify-oauth-pending", "1")
    } catch {
      /* sessionStorage unavailable — /auth/callback still handles the happy path */
    }
    // Pin the redirect to the canonical production domain so the session
    // always lands on scholifyapp.com (not the scholify-web.vercel.app
    // preview origin), and a single Supabase "Redirect URLs" entry covers
    // every entry point. Override per-environment with VITE_PUBLIC_SITE_URL.
    const siteUrl =
      (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined) ||
      "https://scholifyapp.com"
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${siteUrl}/auth/callback` },
    })
    return { error: error?.message ?? null }
  }, [])

  const signOut = useCallback(async () => {
    // Drop the cached partner flag: it is keyed to a user id, and leaving it
    // behind would route the NEXT account signing in on this browser by the
    // previous person's partner status until the cache expired.
    clearPartnerLandingCache()
    if (!isSupabaseConfigured) {
      writeDemoUser(null)
      setUser(null)
      return
    }
    await releaseAccountSetup()
    // Explicit global scope: "Sign out" is a security boundary in Settings.
    // If credentials were shared, leaving another browser alive would make the
    // button dishonest. Supabase may leave an issued access JWT usable until it
    // expires; the protected-route session check closes that window in-app.
    await supabase.auth.signOut({ scope: "global" })
  }, [])

  const signOutOtherSessions = useCallback(async (): Promise<AuthResult> => {
    if (!isSupabaseConfigured) return { error: null }
    const error = await secureLatestLogin()
    if (error) return { error, code: "unknown" }
    trackEvent("other_sessions_revoked")
    return { error: null }
  }, [])

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    // Demo mode has no mail server — say so rather than fake a sent email.
    if (!isSupabaseConfigured) {
      return {
        error:
          "Password reset isn't available on this build. Email info@scholifyapp.com and we'll reset it for you.",
      }
    }
    const siteUrl =
      (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined) ||
      window.location.origin
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password`,
    })
    return error ? friendlyError(error.message) : { error: null }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, session, loading, signIn, signUp, signInWithGoogle, signOut, signOutOtherSessions, resetPassword }),
    [user, session, loading, signIn, signUp, signInWithGoogle, signOut, signOutOtherSessions, resetPassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside an <AuthProvider>")
  return ctx
}

// Onboarding state lives in @/lib/acca-profile (isAccaOnboarded) — the one
// flag the wizard actually sets.
