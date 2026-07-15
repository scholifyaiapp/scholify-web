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
import { canStartTrial } from "./entitlement"

/*
 * A production build with no Supabase must NOT mint fake accounts (see the note
 * in supabase.ts). It says so, once, in one place.
 */
const ACCOUNTS_CLOSED =
  "Accounts aren't open yet — we're putting the finishing touches to Scholify. Email support@scholifyapp.com and we'll tell you the moment they are."

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

export interface AuthResult {
  /** Human-readable error message, or null on success. */
  error: string | null
  /** True when this account was just created (used for onboarding redirect). */
  isNewUser?: boolean
  /** True when sign-up succeeded but the email still needs confirming. */
  needsEmailConfirmation?: boolean
}

/** Turn raw Supabase auth errors into friendly, human messages. */
function friendlyError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes("invalid login credentials"))
    return "Wrong email or password. Please try again."
  if (m.includes("email not confirmed"))
    return "Please confirm your email first — check your inbox for the link."
  if (m.includes("already registered") || m.includes("already exists"))
    return "An account with this email already exists. Try signing in instead."
  if (m.includes("rate limit"))
    return "Too many attempts. Please wait a moment and try again."
  return message
}

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (input: SignUpInput) => Promise<AuthResult>
  signInWithGoogle: () => Promise<AuthResult>
  signOut: () => Promise<void>
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

/**
 * Grant the 7-day Pro trial to a user who is eligible and hasn't got one.
 *
 * This runs on the FIRST authenticated session rather than only at sign-up, so
 * it covers both paths: instant sign-in (email confirmation off) AND a user who
 * signs in for the first time after confirming their email. The server is the
 * gate — it refuses a second trial — so calling it once per fresh account is
 * safe, and a failure just leaves the user on the free tier (never broken).
 * Returns the refreshed User when a trial was granted, else null.
 */
async function ensureTrial(user: User): Promise<User | null> {
  if (!isSupabaseConfigured || !canStartTrial(user)) return null
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) return null
    const res = await fetch("/api/paddle?action=start-trial", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = (await res.json().catch(() => ({}))) as { ok?: boolean }
    if (!body.ok) return null
    // The trial lives in app_metadata → it only reaches the client in a NEW JWT.
    const { data: refreshed } = await supabase.auth.refreshSession()
    return refreshed.user ?? null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // DEMO mode — restore any persisted fake session.
    if (!isSupabaseConfigured) {
      setUser(readDemoUser())
      setLoading(false)
      return
    }

    // Only one trial-grant attempt per app load, whichever path fires first.
    let trialChecked = false
    const maybeGrantTrial = (u: User | null) => {
      if (trialChecked || !u) return
      trialChecked = true
      void ensureTrial(u).then((granted) => {
        if (granted) {
          setSession((s) => (s ? { ...s, user: granted } : s))
          setUser(granted)
        }
      })
    }

    // REAL mode — hydrate from Supabase and subscribe to changes.
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
      maybeGrantTrial(data.session?.user ?? null)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      maybeGrantTrial(nextSession?.user ?? null)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (authUnavailable) return { error: ACCOUNTS_CLOSED, isNewUser: false }
    if (isDemoAuthAllowed) {
      const demo = makeDemoUser(email)
      writeDemoUser(demo)
      setUser(demo)
      return { error: null, isNewUser: false }
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: friendlyError(error.message), isNewUser: false }
    // Update state immediately so route guards don't race the listener.
    if (data.session) {
      setSession(data.session)
      setUser(data.user)
    }
    return { error: null, isNewUser: false }
  }, [])

  const signUp = useCallback(async (input: SignUpInput): Promise<AuthResult> => {
    const { firstName, lastName, email, password } = input
    if (authUnavailable) return { error: ACCOUNTS_CLOSED, isNewUser: true }
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
    if (error) return { error: friendlyError(error.message), isNewUser: true }
    // With email confirmation OFF, signUp returns a session and the user is
    // logged in instantly. With it ON, session is null until they confirm.
    if (data.session) {
      setSession(data.session)
      setUser(data.user)
    }
    return { error: null, isNewUser: true, needsEmailConfirmation: !data.session }
  }, [])

  const signInWithGoogle = useCallback(async (): Promise<AuthResult> => {
    if (authUnavailable) return { error: ACCOUNTS_CLOSED, isNewUser: false }
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
    if (!isSupabaseConfigured) {
      writeDemoUser(null)
      setUser(null)
      return
    }
    await supabase.auth.signOut()
  }, [])

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    // Demo mode has no mail server — say so rather than fake a sent email.
    if (!isSupabaseConfigured) {
      return {
        error:
          "Password reset isn't available on this build. Email support@scholifyapp.com and we'll reset it for you.",
      }
    }
    const siteUrl =
      (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined) ||
      window.location.origin
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback`,
    })
    return { error: error ? friendlyError(error.message) : null }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, session, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword }),
    [user, session, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword],
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
