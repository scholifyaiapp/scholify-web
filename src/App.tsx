import { Routes, Route, Link } from "react-router-dom"
import { Suspense, lazy } from "react"
import SectionBoundary from "@/SectionBoundary"
import { ProtectedRoute, GuestRoute } from "@/components/route-guards"

const Landing = lazy(() => import("@/pages/Landing"))
const SignIn = lazy(() => import("@/pages/SignIn"))
const SignUp = lazy(() => import("@/pages/SignUp"))
const Onboarding = lazy(() => import("@/pages/Onboarding"))
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page name="Landing"><Landing /></Page>} />

      {/* Guest-only — logged-in users are bounced to /dashboard */}
      <Route path="/sign-in" element={<GuestRoute><Page name="SignIn"><SignIn /></Page></GuestRoute>} />
      <Route path="/signin" element={<GuestRoute><Page name="SignIn"><SignIn /></Page></GuestRoute>} />
      <Route path="/sign-up" element={<GuestRoute><Page name="SignUp"><SignUp /></Page></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><Page name="SignUp"><SignUp /></Page></GuestRoute>} />

      {/* Auth-required */}
      <Route path="/onboarding" element={<ProtectedRoute><Page name="Onboarding"><Onboarding /></Page></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Page name="Dashboard"><Dashboard /></Page></ProtectedRoute>} />

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
  )
}
