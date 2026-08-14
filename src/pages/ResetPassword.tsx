import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { ScholifyLockup } from "@/components/brand"
import { signInPath } from "@/lib/launch"
import { secureLatestLogin } from "@/lib/account-session"

export default function ResetPassword() {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    let attempts = 0
    const check = async () => {
      const { data } = await supabase.auth.getSession()
      if (!active) return
      if (data.session) {
        setReady(true)
        return
      }
      if (attempts++ < 24) setTimeout(() => void check(), 250)
      else setError("This reset link is invalid or has expired. Request a new one from sign in.")
    }
    void check()
    return () => { active = false }
  }, [])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    if (password.length < 8) return setError("Use at least 8 characters.")
    if (password !== confirm) return setError("The passwords do not match.")
    setBusy(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) {
      setBusy(false)
      return setError(updateError.message)
    }
    // Password recovery is the path a learner uses after an unfamiliar login.
    // It must retire the sessions that knew the old password, not merely change
    // what future sign-ins accept.
    const securityError = await secureLatestLogin()
    setBusy(false)
    if (securityError) return setError("Password changed, but older logins could not be ended. Please try again from Settings.")
    navigate("/dashboard", { replace: true })
  }

  return (
    <main className="min-h-[100dvh] px-5 py-12 flex items-center justify-center" style={{ background: "var(--sch-bg-grad)" }}>
      <section style={{ width: "100%", maxWidth: 430, padding: "32px 28px", borderRadius: 24, background: "var(--sch-card)", border: "1px solid var(--sch-border)", boxShadow: "0 24px 70px rgba(20,20,26,.12)" }}>
        <ScholifyLockup />
        <h1 style={{ margin: "28px 0 8px", fontSize: 28, color: "var(--sch-text)" }}>Choose a new password</h1>
        <p style={{ margin: "0 0 24px", color: "var(--sch-tx-2)", lineHeight: 1.6 }}>Secure your Scholify account with a new password.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
          <label style={{ display: "grid", gap: 7, color: "var(--sch-tx-1)", fontWeight: 700 }}>
            New password
            <input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={!ready || busy} style={inputStyle} />
          </label>
          <label style={{ display: "grid", gap: 7, color: "var(--sch-tx-1)", fontWeight: 700 }}>
            Confirm password
            <input type="password" autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} disabled={!ready || busy} style={inputStyle} />
          </label>
          {error && <p role="alert" style={{ margin: 0, color: "#C80000", fontSize: 13, lineHeight: 1.5 }}>{error}</p>}
          <button type="submit" disabled={!ready || busy} style={{ minHeight: 48, border: 0, borderRadius: 12, background: "linear-gradient(135deg,#C80000,#E50068)", color: "#fff", fontWeight: 800, opacity: !ready || busy ? .55 : 1 }}>
            {busy ? "Updating…" : ready ? "Update password" : "Verifying link…"}
          </button>
        </form>
        <Link to={signInPath()} style={{ display: "inline-block", marginTop: 20, color: "var(--sch-tx-2)", fontSize: 13 }}>Back to sign in</Link>
      </section>
    </main>
  )
}

const inputStyle = {
  minHeight: 48,
  width: "100%",
  padding: "0 14px",
  borderRadius: 12,
  border: "1px solid var(--sch-border-2)",
  background: "var(--sch-bg)",
  color: "var(--sch-text)",
  fontSize: 16,
} as const
