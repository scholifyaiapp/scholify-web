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
import { supabase, isSupabaseConfigured } from "./supabase"

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

    // REAL mode — hydrate from Supabase and subscribe to changes.
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (!isSupabaseConfigured) {
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
    if (!isSupabaseConfigured) {
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
    if (!isSupabaseConfigured) {
      const demo = makeDemoUser("you@gmail.com", "Google", "User")
      writeDemoUser(demo)
      setUser(demo)
      return { error: null, isNewUser: false }
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
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

  const value = useMemo<AuthContextValue>(
    () => ({ user, session, loading, signIn, signUp, signInWithGoogle, signOut }),
    [user, session, loading, signIn, signUp, signInWithGoogle, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside an <AuthProvider>")
  return ctx
}
