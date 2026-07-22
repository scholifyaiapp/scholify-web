import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth"
import {
  AuthSplitLayout,
  BackToHome,
  AuthInput,
  SubmitButton,
  GoogleButton,
  OrDivider,
  Spinner,
  cardVariants,
  itemVariants,
  IRIDESCENT,
} from "@/components/auth/auth-ui"
import { CharacterLeftPanel } from "@/components/auth/auth-characters"
import { ScholifyLockup } from "@/components/brand"

const EMAIL_RE = /^\S+@\S+\.\S+$/

/* ── Forgot-password modal ───────────────────────────────────── */

function ForgotPasswordModal({
  open,
  initialEmail,
  onClose,
}: {
  open: boolean
  initialEmail: string
  onClose: () => void
}) {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState(initialEmail)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setEmail(initialEmail)
    setSent(false)
    setError(null)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, initialEmail, onClose])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (sending) return
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.")
      return
    }
    setSending(true)
    setError(null)
    const { error: err } = await resetPassword(email.trim())
    setSending(false)
    if (err) {
      setError(err)
      return
    }
    setSent(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Reset your password"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 28,
              borderRadius: 22,
              background: "var(--sch-bg-2)",
              border: "1px solid var(--sch-border-2)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--sch-text)", letterSpacing: "-0.4px" }}>
              {sent ? "Check your inbox" : "Reset your password"}
            </h2>

            {sent ? (
              <>
                <p style={{ fontSize: 14, color: "var(--sch-tx-2)", marginTop: 10, lineHeight: 1.6 }}>
                  If an account exists for <strong style={{ color: "var(--sch-tx-1)" }}>{email.trim()}</strong>,
                  we've emailed a reset link. Open it and you'll be signed in — then set a new
                  password in Settings.
                </p>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    height: 48,
                    marginTop: 20,
                    borderRadius: 12,
                    border: "none",
                    background: IRIDESCENT,
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Done
                </motion.button>
              </>
            ) : (
              <form onSubmit={submit} noValidate>
                <p style={{ fontSize: 14, color: "var(--sch-tx-2)", marginTop: 10, lineHeight: 1.6 }}>
                  Enter your account email and we'll send you a link to get back in.
                </p>
                <div style={{ marginTop: 18 }}>
                  <AuthInput
                    id="reset-email"
                    label="Email address"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error ?? undefined}
                  />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      color: "var(--sch-tx-1)",
                      background: "var(--sch-card)",
                      border: "1px solid var(--sch-border-2)",
                    }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileTap={sending ? undefined : { scale: 0.98 }}
                    style={{
                      flex: 1,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      borderRadius: 12,
                      border: "none",
                      background: IRIDESCENT,
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: sending ? "not-allowed" : "pointer",
                      opacity: sending ? 0.7 : 1,
                    }}
                  >
                    {sending && <Spinner size={16} />}
                    {sending ? "Sending…" : "Send reset link"}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn, signInWithGoogle } = useAuth()
  const [forgotOpen, setForgotOpen] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [lockSeconds, setLockSeconds] = useState(0)

  // Brute-force guard: after 5 failed attempts, lock the form for 60s and
  // count down. Clears the attempt counter when the lock expires.
  useEffect(() => {
    if (lockSeconds <= 0) return
    const id = window.setInterval(() => {
      setLockSeconds((s) => {
        if (s <= 1) {
          setAttempts(0)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [lockSeconds])

  const locked = lockSeconds > 0
  const canSubmit = email.trim().length > 0 && password.length > 0 && !locked

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (loading || locked) return

    const nextErrors: { email?: string; password?: string } = {}
    if (!email.trim()) nextErrors.email = "Email is required."
    else if (!EMAIL_RE.test(email)) nextErrors.email = "Enter a valid email address."
    if (!password) nextErrors.password = "Password is required."

    setErrors(nextErrors)
    setFormError(null)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    const { error } = await signIn(email.trim(), password)
    if (error) {
      const n = attempts + 1
      setAttempts(n)
      if (n >= 5) {
        setLockSeconds(60)
        setFormError(null)
      } else {
        // Never reveal which field was wrong.
        setFormError("Wrong email or password. Try again.")
      }
      setLoading(false)
      return
    }
    setAttempts(0)
    navigate("/dashboard")
  }

  const handleGoogle = async () => {
    if (googleLoading) return
    setGoogleLoading(true)
    setFormError(null)
    const { error } = await signInWithGoogle()
    if (error) {
      setFormError(error)
      setGoogleLoading(false)
      return
    }
    // Demo mode resolves instantly; real OAuth redirects away before this runs.
    navigate("/dashboard")
  }

  return (
    <AuthSplitLayout
      leftPanel={
        <CharacterLeftPanel
          isTyping={emailFocused}
          password={password}
          showPassword={showPassword}
        />
      }
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Back link */}
        <motion.div variants={itemVariants} custom={0}>
          <BackToHome />
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} custom={1} style={{ marginTop: 28 }}>
          <ScholifyLockup size={30} color="var(--sch-text)" style={{ marginBottom: 20 }} />
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--sch-text)",
              letterSpacing: "-1px",
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: "var(--sch-tx-2)", marginTop: 6 }}>
            Sign in to continue your learning streak.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} style={{ marginTop: 32 }} noValidate>
          {/* Email */}
          <motion.div variants={itemVariants} custom={2}>
            <AuthInput
              id="signin-email"
              label="Email address"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              error={errors.email}
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants} custom={3} style={{ marginTop: 16 }}>
            <AuthInput
              id="signin-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              rightSlot={
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="sch-eye"
                  style={{
                    display: "flex",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--sch-tx-3)",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sch-tx-1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sch-tx-3)")}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                style={{
                  fontSize: 13,
                  color: "rgba(200,0,0,0.8)",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(200,0,0,1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,0,0,0.8)")}
              >
                Forgot password?
              </button>
            </div>
          </motion.div>

          {/* Form-level error / lockout countdown */}
          <AnimatePresence>
            {(formError || locked) && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  color: "#FF453A",
                  fontSize: 13,
                  marginTop: 16,
                  overflow: "hidden",
                }}
              >
                {locked ? `Too many attempts. Wait ${lockSeconds} seconds.` : formError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.div variants={itemVariants} custom={4} style={{ marginTop: 24 }}>
            <SubmitButton
              label={locked ? `Try again in ${lockSeconds}s` : "Sign in →"}
              loadingLabel="Signing in..."
              loading={loading}
              disabled={!canSubmit}
            />
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div variants={itemVariants} custom={5} style={{ marginTop: 24 }}>
          <OrDivider />
        </motion.div>

        {/* Google */}
        <motion.div variants={itemVariants} custom={6} style={{ marginTop: 16 }}>
          <GoogleButton
            label="Continue with Google"
            onClick={handleGoogle}
            disabled={googleLoading}
          />
        </motion.div>

        {/* Bottom link */}
        <motion.div
          variants={itemVariants}
          custom={7}
          style={{
            marginTop: 24,
            textAlign: "center",
            fontSize: 14,
            color: "var(--sch-tx-2)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            style={{
              color: "rgba(200,0,0,0.9)",
              textDecoration: "none",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(200,0,0,1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,0,0,0.9)")}
          >
            Start for free →
          </Link>
        </motion.div>
      </motion.div>

      <ForgotPasswordModal
        open={forgotOpen}
        initialEmail={email}
        onClose={() => setForgotOpen(false)}
      />
    </AuthSplitLayout>
  )
}
