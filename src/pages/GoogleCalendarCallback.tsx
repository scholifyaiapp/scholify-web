import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { updateCalendarAccount } from "@/lib/calendar"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/* ──────────────────────────────────────────────────────────────
 *  /auth/google/calendar — landing page from Google OAuth.
 *  Pulls ?code= and posts it to /api/calendar-callback, which
 *  exchanges it for tokens server-side, then redirects to
 *  /settings?calendar=connected.
 * ────────────────────────────────────────────────────────────── */

type Phase = "exchanging" | "saving" | "done" | "error"

export default function GoogleCalendarCallback() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [phase, setPhase] = useState<Phase>("exchanging")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const ranRef = useRef(false)

  useEffect(() => {
    if (loading) return
    if (ranRef.current) return
    ranRef.current = true

    async function run() {
      const params = new URLSearchParams(window.location.search)
      const code = params.get("code")
      const oauthError = params.get("error")

      if (oauthError) {
        setPhase("error")
        setErrorMsg(oauthError)
        setTimeout(() => navigate("/settings?calendar=error", { replace: true }), 1200)
        return
      }
      if (!code) {
        setPhase("error")
        setErrorMsg("Missing authorization code")
        setTimeout(() => navigate("/settings?calendar=error", { replace: true }), 1200)
        return
      }

      try {
        // The endpoint persists Google credentials with the service role, so it
        // takes the user id from this token — never from the body.
        const { data: sess } = await supabase.auth.getSession()
        const accessToken = sess?.session?.access_token
        if (!accessToken) throw new Error("Sign in again to connect your calendar.")
        const res = await fetch("/api/calendar-callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            action: "exchange",
            code,
            redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          }),
        })
        const data = (await res.json().catch(() => ({}))) as {
          access_token?: string
          expires_in?: number
          error?: string
        }
        if (!res.ok || data.error || !data.access_token) {
          throw new Error(data.error || `HTTP ${res.status}`)
        }

        setPhase("saving")

        // Best-effort: also mirror to local storage so the UI is responsive
        // even if Supabase service-role isn't configured yet.
        if (user?.id) {
          const expiresAt = new Date(
            Date.now() + (data.expires_in ?? 3600) * 1000,
          ).toISOString()
          await updateCalendarAccount(user.id, {
            google_access_token: data.access_token,
            google_token_expiry: expiresAt,
            calendar_sync_enabled: true,
          })
        }

        try {
          window.sessionStorage.removeItem("scholify-calendar-pending")
        } catch {
          /* ignore */
        }

        setPhase("done")
        setTimeout(
          () => navigate("/settings?calendar=connected", { replace: true }),
          700,
        )
      } catch (err) {
        setPhase("error")
        setErrorMsg(err instanceof Error ? err.message : String(err))
        setTimeout(() => navigate("/settings?calendar=error", { replace: true }), 1500)
      }
    }
    run()
  }, [loading, user?.id, navigate])

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--sch-bg)",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: 380,
          padding: 32,
          borderRadius: 24,
          background: "var(--sch-card)",
          border: "1px solid var(--sch-border)",
          textAlign: "center",
        }}
      >
        <motion.div
          animate={
            phase === "done"
              ? { scale: [0.6, 1.15, 1] }
              : { rotate: 360 }
          }
          transition={
            phase === "done"
              ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              : { duration: 1.2, repeat: Infinity, ease: "linear" }
          }
          style={{
            width: 60,
            height: 60,
            margin: "0 auto",
            borderRadius: "50%",
            background: phase === "done" ? IRIDESCENT : "transparent",
            border:
              phase === "done"
                ? "none"
                : phase === "error"
                  ? "3px solid rgba(255,69,58,0.6)"
                  : "3px solid var(--sch-border-2)",
            borderTopColor:
              phase === "done" || phase === "error"
                ? undefined
                : "rgba(200,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          {phase === "done" ? "✓" : phase === "error" ? "!" : ""}
        </motion.div>
        <h2
          style={{
            marginTop: 22,
            fontSize: 18,
            fontWeight: 700,
            color: "var(--sch-text)",
          }}
        >
          {phase === "exchanging" && "Connecting to Google Calendar…"}
          {phase === "saving" && "Saving your tokens…"}
          {phase === "done" && "Connected ✦"}
          {phase === "error" && "Couldn't finish"}
        </h2>
        <p
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "var(--sch-tx-2)",
            lineHeight: 1.5,
          }}
        >
          {phase === "error"
            ? errorMsg || "Try again from Settings."
            : "Hang tight — we'll bounce you back to Settings."}
        </p>
      </motion.div>
    </div>
  )
}
