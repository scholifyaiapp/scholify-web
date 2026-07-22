import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { supabase } from "@/lib/supabase"
import { Spinner } from "@/components/auth/auth-ui"
import { Icon } from "@/components/acca/ui"

/*
 * OAuth return handler. Google (and any future provider) redirects here
 * after the user approves. Supabase-js exchanges the code for a session
 * automatically; this page waits for that, then routes the user in.
 *
 * Crucially, if anything goes wrong it shows the REAL reason instead of
 * silently bouncing back to the sign-in form.
 */
export default function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Supabase reports OAuth failures in the URL (query or hash).
    const raw = window.location.search + window.location.hash.replace(/^#/, "&")
    const params = new URLSearchParams(raw)
    const providerError =
      params.get("error_description") || params.get("error")
    if (providerError) {
      setError(decodeURIComponent(providerError).replace(/\+/g, " "))
      return
    }

    // supabase-js exchanges the ?code= for a session on init.
    // Poll briefly until the session lands, then route the user.
    let cancelled = false
    let tries = 0
    const check = async () => {
      if (cancelled) return
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        navigate("/dashboard", { replace: true })
        return
      }
      if (++tries > 24) {
        setError(
          "Google sign-in didn't complete. This usually means your app's " +
            "URL isn't in the Supabase \"Redirect URLs\" list. Please try again.",
        )
        return
      }
      setTimeout(check, 250)
    }
    check()
    return () => {
      cancelled = true
    }
  }, [navigate])

  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center px-6"
      style={{ background: "var(--sch-bg-grad)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 400, width: "100%", textAlign: "center" }}
      >
        {!error ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner size={32} />
            </div>
            <p style={{ fontSize: 15, color: "var(--sch-tx-1)", marginTop: 20 }}>
              Finishing sign-in…
            </p>
          </>
        ) : (
          <>
            <div
              style={{
                width: 56,
                height: 56,
                margin: "0 auto",
                borderRadius: "50%",
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="alert" size={26} color="#DC2626" strokeWidth={2} />
            </div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "var(--sch-text)",
                marginTop: 20,
              }}
            >
              Google sign-in failed
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "var(--sch-tx-2)",
                marginTop: 10,
                lineHeight: 1.6,
              }}
            >
              {error}
            </p>
            <Link
              to="/sign-in"
              style={{
                display: "inline-block",
                marginTop: 24,
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(200,0,0,0.95)",
                textDecoration: "none",
              }}
            >
              ← Back to sign in
            </Link>
          </>
        )}
      </motion.div>
    </div>
  )
}
