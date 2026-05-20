import { Routes, Route, Link } from "react-router-dom"
import { Suspense, lazy } from "react"
import SectionBoundary from "@/SectionBoundary"

const Landing = lazy(() => import("@/pages/Landing"))
const SignIn = lazy(() => import("@/pages/SignIn"))
const SignUp = lazy(() => import("@/pages/SignUp"))
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
      <Route path="/sign-in" element={<Page name="SignIn"><SignIn /></Page>} />
      <Route path="/signin" element={<Page name="SignIn"><SignIn /></Page>} />
      <Route path="/sign-up" element={<Page name="SignUp"><SignUp /></Page>} />
      <Route path="/signup" element={<Page name="SignUp"><SignUp /></Page>} />
      <Route path="/onboarding" element={<Page name="Onboarding"><SignUp /></Page>} />
      <Route path="/dashboard" element={<Page name="Dashboard"><Dashboard /></Page>} />
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
