import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Suspense, lazy, useEffect } from "react"
import SectionBoundary from "@/SectionBoundary"
import { ProtectedRoute, RequireOnboarded, GuestRoute } from "@/components/route-guards"
import { useAuth } from "@/lib/auth"
import {
  RoomCardSkeleton,
  CommunityPostSkeleton,
  GoalCardSkeleton,
  ResourceCardSkeleton,
} from "@/components/Skeleton"

const Landing = lazy(() => import("@/pages/Landing"))
const SignIn = lazy(() => import("@/pages/SignIn"))
const SignUp = lazy(() => import("@/pages/SignUp"))
const Onboarding = lazy(() => import("@/pages/Onboarding"))
const OnboardingChat = lazy(() => import("@/pages/OnboardingChat"))
const AuthCallback = lazy(() => import("@/pages/AuthCallback"))
const GoogleCalendarCallback = lazy(() => import("@/pages/GoogleCalendarCallback"))
const Loading = lazy(() => import("@/pages/Loading"))
const ComingSoon = lazy(() => import("@/pages/ComingSoon"))
const Progress = lazy(() => import("@/pages/Progress"))
const Pricing = lazy(() => import("@/pages/Pricing"))
const Settings = lazy(() => import("@/pages/Settings"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Goals = lazy(() => import("@/pages/Goals"))
const ResourceLibrary = lazy(() => import("@/pages/ResourceLibrary"))
const Chat = lazy(() => import("@/pages/Chat"))
const Quiz = lazy(() => import("@/pages/Quiz"))
const Partner = lazy(() => import("@/pages/Partner"))
const PartnerJoin = lazy(() => import("@/pages/PartnerJoin"))
const Rooms = lazy(() => import("@/pages/Rooms"))
const Room = lazy(() => import("@/pages/Room"))
const RoomJoin = lazy(() => import("@/pages/RoomJoin"))
const Community = lazy(() => import("@/pages/Community"))
const Challenges = lazy(() => import("@/pages/Challenges"))
const Roadmap = lazy(() => import("@/pages/Roadmap"))
const Teams = lazy(() => import("@/pages/Teams"))
const TeamDashboard = lazy(() => import("@/pages/TeamDashboard"))
const TeamAdmin = lazy(() => import("@/pages/TeamAdmin"))
const TeamJoin = lazy(() => import("@/pages/TeamJoin"))
const Privacy = lazy(() => import("@/pages/Privacy"))
const Terms = lazy(() => import("@/pages/Terms"))
const Support = lazy(() => import("@/pages/Support"))

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
    <SectionBoundary name={name}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </SectionBoundary>
  )
}

// Lightweight per-page skeleton fallbacks for the chunk-fetch window.
function RoomsFallback() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={{ height: 22, width: 180, background: "rgba(255,255,255,0.06)", borderRadius: 6 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        <RoomCardSkeleton />
        <RoomCardSkeleton />
      </div>
    </div>
  )
}

function CommunityFallback() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <CommunityPostSkeleton />
      <CommunityPostSkeleton />
      <CommunityPostSkeleton />
    </div>
  )
}

function GoalsFallback() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 14 }}>
      <GoalCardSkeleton />
      <GoalCardSkeleton />
    </div>
  )
}

function ResourcesFallback() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 10 }}>
      <ResourceCardSkeleton />
      <ResourceCardSkeleton />
      <ResourceCardSkeleton />
      <ResourceCardSkeleton />
    </div>
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
      <Route path="/auth/google/calendar" element={<Page name="GoogleCalendarCallback"><GoogleCalendarCallback /></Page>} />

      {/* Auth-required */}
      <Route path="/onboarding" element={<ProtectedRoute><Page name="OnboardingChat"><OnboardingChat /></Page></ProtectedRoute>} />
      <Route path="/onboarding/classic" element={<ProtectedRoute><Page name="Onboarding"><Onboarding /></Page></ProtectedRoute>} />
      <Route path="/loading" element={<ProtectedRoute><Page name="Loading"><Loading /></Page></ProtectedRoute>} />
      <Route path="/dashboard" element={<RequireOnboarded><Page name="Dashboard"><Dashboard /></Page></RequireOnboarded>} />
      <Route path="/progress" element={<RequireOnboarded><Page name="Progress"><Progress /></Page></RequireOnboarded>} />
      <Route path="/goals" element={<RequireOnboarded><Page name="Goals" fallback={<GoalsFallback />}><Goals /></Page></RequireOnboarded>} />
      <Route path="/resources" element={<RequireOnboarded><Page name="ResourceLibrary" fallback={<ResourcesFallback />}><ResourceLibrary /></Page></RequireOnboarded>} />
      <Route path="/achievements" element={<RequireOnboarded><Page name="Achievements"><ComingSoon /></Page></RequireOnboarded>} />
      <Route path="/settings" element={<RequireOnboarded><Page name="Settings"><Settings /></Page></RequireOnboarded>} />
      <Route path="/quiz" element={<RequireOnboarded><Page name="Quiz"><Quiz /></Page></RequireOnboarded>} />
      <Route path="/partner" element={<RequireOnboarded><Page name="Partner"><Partner /></Page></RequireOnboarded>} />
      <Route path="/partner/join/:code" element={<Page name="PartnerJoin"><PartnerJoin /></Page>} />
      <Route path="/rooms" element={<RequireOnboarded><Page name="Rooms" fallback={<RoomsFallback />}><Rooms /></Page></RequireOnboarded>} />
      <Route path="/rooms/:id" element={<RequireOnboarded><Page name="Room"><Room /></Page></RequireOnboarded>} />
      <Route path="/join/:code" element={<Page name="RoomJoin"><RoomJoin /></Page>} />
      <Route path="/community" element={<RequireOnboarded><Page name="Community" fallback={<CommunityFallback />}><Community /></Page></RequireOnboarded>} />
      <Route path="/challenges" element={<RequireOnboarded><Page name="Challenges"><Challenges /></Page></RequireOnboarded>} />
      <Route path="/roadmap" element={<RequireOnboarded><Page name="Roadmap"><Roadmap /></Page></RequireOnboarded>} />
      <Route path="/teams" element={<RequireOnboarded><Page name="Teams"><Teams /></Page></RequireOnboarded>} />
      <Route path="/teams/:id" element={<RequireOnboarded><Page name="TeamDashboard"><TeamDashboard /></Page></RequireOnboarded>} />
      <Route path="/teams/:id/admin" element={<RequireOnboarded><Page name="TeamAdmin"><TeamAdmin /></Page></RequireOnboarded>} />
      <Route path="/join-team/:token" element={<Page name="TeamJoin"><TeamJoin /></Page>} />

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
