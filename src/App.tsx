import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Suspense, lazy, useEffect } from "react"
import SectionBoundary from "@/SectionBoundary"
import { ProtectedRoute, RequireOnboarded, GuestRoute } from "@/components/route-guards"
import { useAuth } from "@/lib/auth"

const Landing = lazy(() => import("@/pages/Landing"))
const SignIn = lazy(() => import("@/pages/SignIn"))
const SignUp = lazy(() => import("@/pages/SignUp"))
const Onboarding = lazy(() => import("@/pages/Onboarding"))
const AuthCallback = lazy(() => import("@/pages/AuthCallback"))
const Loading = lazy(() => import("@/pages/Loading"))
const ComingSoon = lazy(() => import("@/pages/ComingSoon"))
const Progress = lazy(() => import("@/pages/Progress"))
const Pricing = lazy(() => import("@/pages/Pricing"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Chat = lazy(() => import("@/pages/Chat"))
const Privacy = lazy(() => import("@/pages/Privacy"))
const Terms = lazy(() => import("@/pages/Terms"))
const Support = lazy(() => import("@/pages/Support"))

function Page({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <SectionBoundary name={name}>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </SectionBoundary>
  )
}

/**
 * Catches the return from a Google OAuth sign-in. Supabase sometimes
 * redirects to the site root instead of /auth/callback; this watches for
 * a freshly-authenticated user after an OAuth attempt and routes them
 * into the app no matter which page they landed on.
 */
function OAuthReturnHandler() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    let pending: string | null = null
    try {
      pending = window.sessionStorage.getItem("scholify-oauth-pending")
    } catch {
      return
    }
    if (!pending) return
    // Consume the flag — the OAuth round-trip has resolved.
    try {
      window.sessionStorage.removeItem("scholify-oauth-pending")
    } catch {
      /* ignore */
    }
    if (user) navigate("/dashboard", { replace: true })
  }, [user, loading, navigate])

  return null
}

export default function App() {
  return (
    <>
      <OAuthReturnHandler />
      <Routes>
      <Route path="/" element={<Page name="Landing"><Landing /></Page>} />

      {/* Guest-only — logged-in users are bounced to /dashboard */}
      <Route path="/sign-in" element={<GuestRoute><Page name="SignIn"><SignIn /></Page></GuestRoute>} />
      <Route path="/signin" element={<GuestRoute><Page name="SignIn"><SignIn /></Page></GuestRoute>} />
      <Route path="/sign-up" element={<GuestRoute><Page name="SignUp"><SignUp /></Page></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><Page name="SignUp"><SignUp /></Page></GuestRoute>} />

      {/* OAuth return handler — must stay public */}
      <Route path="/auth/callback" element={<Page name="AuthCallback"><AuthCallback /></Page>} />

      {/* Auth-required */}
      <Route path="/onboarding" element={<ProtectedRoute><Page name="Onboarding"><Onboarding /></Page></ProtectedRoute>} />
      <Route path="/loading" element={<ProtectedRoute><Page name="Loading"><Loading /></Page></ProtectedRoute>} />
      <Route path="/dashboard" element={<RequireOnboarded><Page name="Dashboard"><Dashboard /></Page></RequireOnboarded>} />
      <Route path="/progress" element={<RequireOnboarded><Page name="Progress"><Progress /></Page></RequireOnboarded>} />
      <Route path="/goals" element={<RequireOnboarded><Page name="Goals"><ComingSoon /></Page></RequireOnboarded>} />
      <Route path="/achievements" element={<RequireOnboarded><Page name="Achievements"><ComingSoon /></Page></RequireOnboarded>} />
      <Route path="/settings" element={<RequireOnboarded><Page name="Settings"><ComingSoon /></Page></RequireOnboarded>} />

      <Route path="/pricing" element={<Page name="Pricing"><Pricing /></Page>} />
      <Route path="/chat" element={<Page name="Chat"><Chat /></Page>} />
      <Route path="/privacy" element={<Page name="Privacy"><Privacy /></Page>} />
      <Route path="/terms" element={<Page name="Terms"><Terms /></Page>} />
      <Route path="/support" element={<Page name="Support"><Support /></Page>} />
      <Route
        path="*"
        element={
          <div className="min-h-screen grid place-items-center">
            <Link to="/" className="underline">Go home</Link>
          </div>
        }
      />
    </Routes>
    </>
  )
}
