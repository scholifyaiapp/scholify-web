import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import { Suspense, lazy, useEffect, type ComponentType } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { ProtectedRoute, GuestRoute } from "@/components/route-guards"
import { useAuth } from "@/lib/auth"
import { captureAffiliateRef } from "@/lib/affiliate"
import { isLaunchAdmin, PRELAUNCH_MODE } from "@/lib/launch"

/*
 * Lazy import that self-heals after a deploy. A route chunk can fail to load
 * when the browser holds a stale index.html that points at an old, now-deleted
 * chunk hash — the "importing a module script failed" error. Instead of
 * crashing the section, reload once to pull the fresh index + chunk map. A
 * sessionStorage guard prevents a reload loop.
 */
function lazyWithReload<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
) {
  const KEY = "scholify-chunk-reloaded"
  return lazy(async () => {
    try {
      const mod = await factory()
      try {
        sessionStorage.removeItem(KEY)
      } catch {
        /* ignore */
      }
      return mod
    } catch (err) {
      let reloaded = false
      try {
        reloaded = sessionStorage.getItem(KEY) === "1"
      } catch {
        /* ignore */
      }
      if (!reloaded) {
        try {
          sessionStorage.setItem(KEY, "1")
        } catch {
          /* ignore */
        }
        window.location.reload()
        return new Promise<{ default: T }>(() => {})
      }
      throw err
    }
  })
}

/* ── ACCA product pages only — any old URL redirects to /study
 *    (see the catch-all below). ── */
const Landing = lazyWithReload(() => import("@/pages/Landing"))
const Waitlist = lazyWithReload(() => import("@/pages/Waitlist"))
const SignIn = lazyWithReload(() => import("@/pages/SignIn"))
const SignUp = lazyWithReload(() => import("@/pages/SignUp"))
const AuthCallback = lazyWithReload(() => import("@/pages/AuthCallback"))
const GoogleCalendarCallback = lazyWithReload(() => import("@/pages/GoogleCalendarCallback"))
const AccaStudy = lazyWithReload(() => import("@/pages/AccaStudy"))
const AccaDiagnostic = lazyWithReload(() => import("@/pages/AccaDiagnostic"))
const AccaAnalytics = lazyWithReload(() => import("@/pages/AccaAnalytics"))
const Dashboard = lazyWithReload(() => import("@/pages/Dashboard"))
const Welcome = lazyWithReload(() => import("@/pages/Welcome"))
const Settings = lazyWithReload(() => import("@/pages/Settings"))
const NotesHub = lazyWithReload(() => import("@/pages/NotesHub"))
const Pricing = lazyWithReload(() => import("@/pages/Pricing"))
const Privacy = lazyWithReload(() => import("@/pages/Privacy"))
const Terms = lazyWithReload(() => import("@/pages/Terms"))
const Support = lazyWithReload(() => import("@/pages/Support"))
const PartnersApply = lazyWithReload(() => import("@/pages/PartnersApply"))
const Partners = lazyWithReload(() => import("@/pages/Partners"))
const AdminDashboard = lazyWithReload(() => import("@/pages/AdminDashboard"))

function Page({
  name,
  children,
  fallback = null,
}: {
  name: string
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  return (
    <ErrorBoundary pageName={name}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}

/**
 * Catches the return from a Google OAuth sign-in. Supabase sometimes redirects
 * to the site root instead of /auth/callback; this watches for a freshly
 * authenticated user after an OAuth attempt and routes them into the app no
 * matter which page they landed on.
 */
function OAuthReturnHandler() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return

    const hash = window.location.hash || ""
    const looksLikeAuthHash =
      /access_token=|provider_token=|refresh_token=|error_description=|error=/.test(hash)

    let pending: string | null = null
    try {
      pending = window.sessionStorage.getItem("scholify-oauth-pending")
    } catch {
      /* sessionStorage unavailable — fall through to hash detection */
    }

    if (!pending && !looksLikeAuthHash) return

    try {
      window.sessionStorage.removeItem("scholify-oauth-pending")
    } catch {
      /* ignore */
    }

    if (looksLikeAuthHash) {
      try {
        window.history.replaceState(null, "", window.location.pathname + window.location.search)
      } catch {
        /* ignore */
      }
    }

    if (user) {
      navigate("/dashboard", { replace: true })
    } else if (looksLikeAuthHash) {
      navigate("/auth/callback", { replace: true })
    }
  }, [user, loading, navigate])

  return null
}

function TeamSignIn({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  if (PRELAUNCH_MODE && new URLSearchParams(location.search).get("team") !== "1") {
    return <Navigate to="/" replace />
  }
  return <GuestRoute>{children}</GuestRoute>
}

function LaunchHome() {
  const { user, loading } = useAuth()
  if (!PRELAUNCH_MODE) return <Landing />
  if (loading) return null
  return isLaunchAdmin(user) ? <Landing /> : <Waitlist />
}

export default function App() {
  // Capture a partner link (?aff=CODE) once on load, wherever it lands.
  useEffect(() => {
    captureAffiliateRef()
  }, [])

  return (
    <>
      <OAuthReturnHandler />
      <Routes>
        <Route path="/" element={<Page name="Home"><LaunchHome /></Page>} />

        {/* Guest-only — logged-in users are bounced to /study */}
        <Route path="/sign-in" element={<TeamSignIn><Page name="SignIn"><SignIn /></Page></TeamSignIn>} />
        <Route path="/signin" element={<TeamSignIn><Page name="SignIn"><SignIn /></Page></TeamSignIn>} />
        <Route path="/sign-up" element={<TeamSignIn><Page name="SignUp"><SignUp /></Page></TeamSignIn>} />
        <Route path="/signup" element={<TeamSignIn><Page name="SignUp"><SignUp /></Page></TeamSignIn>} />

        {/* OAuth return — must stay public */}
        <Route path="/auth/callback" element={<Page name="AuthCallback"><AuthCallback /></Page>} />
        <Route path="/auth/google/calendar" element={<Page name="GoogleCalendarCallback"><GoogleCalendarCallback /></Page>} />

        {/* The product */}
        <Route path="/welcome" element={<ProtectedRoute><Page name="Welcome"><Welcome /></Page></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute gate><Page name="Dashboard"><Dashboard /></Page></ProtectedRoute>} />
        <Route path="/study" element={<ProtectedRoute gate><Page name="AccaStudy"><AccaStudy /></Page></ProtectedRoute>} />
        {/* Progress merged into Analytics — keep old links working */}
        <Route path="/study/progress" element={<Navigate to="/study/analytics" replace />} />
        <Route path="/study/diagnostic" element={<ProtectedRoute gate><Page name="AccaDiagnostic"><AccaDiagnostic /></Page></ProtectedRoute>} />
        <Route path="/study/analytics" element={<ProtectedRoute gate><Page name="AccaAnalytics"><AccaAnalytics /></Page></ProtectedRoute>} />
        {/* Settings stays ungated so an expired user can still pay / manage / sign out */}
        <Route path="/settings" element={<ProtectedRoute><Page name="Settings"><Settings /></Page></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Page name="AdminDashboard"><AdminDashboard /></Page></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute gate><Page name="NotesHub"><NotesHub /></Page></ProtectedRoute>} />

        {/* Public info */}
        <Route path="/pricing" element={PRELAUNCH_MODE ? <Navigate to="/" replace /> : <Page name="Pricing"><Pricing /></Page>} />
        <Route path="/privacy" element={<Page name="Privacy"><Privacy /></Page>} />
        <Route path="/terms" element={<Page name="Terms"><Terms /></Page>} />
        <Route path="/support" element={<Page name="Support"><Support /></Page>} />

        {/* Affiliate / partner program */}
        <Route path="/partners/apply" element={<Page name="PartnersApply"><PartnersApply /></Page>} />
        <Route path="/partners" element={<ProtectedRoute><Page name="Partners"><Partners /></Page></ProtectedRoute>} />

        {/* Everything else (legacy plan routes, unknown paths) → the command centre */}
        <Route path="*" element={<Navigate to={PRELAUNCH_MODE ? "/" : "/dashboard"} replace />} />
      </Routes>
    </>
  )
}
