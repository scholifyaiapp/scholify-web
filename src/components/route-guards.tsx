import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"

/** Full-screen loader shown while the auth session is being resolved. */
function AuthLoading() {
  return (
    <div
      style={{ background: "var(--sch-bg)" }}
      className="min-h-[100dvh] w-full flex items-center justify-center"
    >
      <style>{`@keyframes auth-guard-spin{to{transform:rotate(360deg)}}`}</style>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "2px solid rgba(200,0,0,0.25)",
          borderTopColor: "rgba(200,0,0,0.9)",
          animation: "auth-guard-spin 0.7s linear infinite",
          display: "block",
        }}
      />
    </div>
  )
}

/** Wraps routes that require authentication. Redirects guests to /sign-in. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <AuthLoading />
  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}

/** Wraps guest-only routes (sign-in / sign-up). Sends logged-in users to /dashboard. */
export function GuestRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <AuthLoading />
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}
