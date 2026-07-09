import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { Suspense, lazy, useEffect, type ComponentType } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { ProtectedRoute, GuestRoute } from "@/components/route-guards"
import { useAuth } from "@/lib/auth"

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
const Pricing = lazyWithReload(() => import("@/pages/Pricing"))
const Privacy = lazyWithReload(() => import("@/pages/Privacy"))
const Terms = lazyWithReload(() => import("@/pages/Terms"))
const Support = lazyWithReload(() => import("@/pages/Support"))

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

export default function App() {
  return (
    <>
      <OAuthReturnHandler />
      <Routes>
        <Route path="/" element={<Page name="Landing"><Landing /></Page>} />

        {/* Guest-only — logged-in users are bounced to /study */}
        <Route path="/sign-in" element={<GuestRoute><Page name="SignIn"><SignIn /></Page></GuestRoute>} />
        <Route path="/signin" element={<GuestRoute><Page name="SignIn"><SignIn /></Page></GuestRoute>} />
        <Route path="/sign-up" element={<GuestRoute><Page name="SignUp"><SignUp /></Page></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><Page name="SignUp"><SignUp /></Page></GuestRoute>} />

        {/* OAuth return — must stay public */}
        <Route path="/auth/callback" element={<Page name="AuthCallback"><AuthCallback /></Page>} />
        <Route path="/auth/google/calendar" element={<Page name="GoogleCalendarCallback"><GoogleCalendarCallback /></Page>} />

        {/* The product */}
        <Route path="/welcome" element={<ProtectedRoute><Page name="Welcome"><Welcome /></Page></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Page name="Dashboard"><Dashboard /></Page></ProtectedRoute>} />
        <Route path="/study" element={<ProtectedRoute><Page name="AccaStudy"><AccaStudy /></Page></ProtectedRoute>} />
        {/* Progress merged into Analytics — keep old links working */}
        <Route path="/study/progress" element={<Navigate to="/study/analytics" replace />} />
        <Route path="/study/diagnostic" element={<ProtectedRoute><Page name="AccaDiagnostic"><AccaDiagnostic /></Page></ProtectedRoute>} />
        <Route path="/study/analytics" element={<ProtectedRoute><Page name="AccaAnalytics"><AccaAnalytics /></Page></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Page name="Settings"><Settings /></Page></ProtectedRoute>} />

        {/* Public info */}
        <Route path="/pricing" element={<Page name="Pricing"><Pricing /></Page>} />
        <Route path="/privacy" element={<Page name="Privacy"><Privacy /></Page>} />
        <Route path="/terms" element={<Page name="Terms"><Terms /></Page>} />
        <Route path="/support" element={<Page name="Support"><Support /></Page>} />

        {/* Everything else (legacy plan routes, unknown paths) → the command centre */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}
