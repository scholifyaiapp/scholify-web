import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Eye, EyeOff, Check, Mail } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { trackEvent, identifyUser } from "@/lib/analytics"
import { captureRefFromUrl, applyReferralOnSignup } from "@/lib/referral"
import {
  AuthSplitLayout,
  BackToHome,
  AuthInput,
  SubmitButton,
  GoogleButton,
  OrDivider,
  IRIDESCENT,
  cardVariants,
  itemVariants,
} from "@/components/auth/auth-ui"

const EMAIL_RE = /^\S+@\S+\.\S+$/

/* ── Password strength ───────────────────────────────────────── */

const STRENGTH = [
  { label: "", color: "transparent" },
  { label: "Weak", color: "#FF453A" },
  { label: "Fair", color: "#FF9F0A" },
  { label: "Good", color: "#FFD60A" },
  { label: "Strong", color: "#30D158" },
]

function scorePassword(pw: string): number {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++
  return Math.min(Math.max(score, pw ? 1 : 0), 4)
}

function PasswordStrength({ password }: { password: string }) {
  const score = scorePassword(password)
  const meta = STRENGTH[score]
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            animate={{
              background: i < score ? meta.color : "var(--sch-border)",
            }}
            transition={{ duration: 0.25 }}
            style={{ flex: 1, height: 4, borderRadius: 999 }}
          />
        ))}
      </div>
      <AnimatePresence>
        {password && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: 11, marginTop: 6, color: meta.color }}
          >
            {meta.label}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Progress steps ──────────────────────────────────────────── */

const STEPS = ["Account", "Your goal", "Your plan"]

function ProgressSteps({ active }: { active: number }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {STEPS.map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              flex: i < STEPS.length - 1 ? 1 : "0 0 auto",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                flexShrink: 0,
                background: i <= active ? IRIDESCENT : "var(--sch-border-2)",
                boxShadow: i === active ? "0 0 10px rgba(139,92,246,0.6)" : "none",
              }}
            />
            {i < STEPS.length - 1 && (
              <span
                style={{
                  flex: 1,
                  height: 1,
                  margin: "0 6px",
                  background: "var(--sch-border-2)",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        {STEPS.map((label, i) => (
          <span
            key={label}
            style={{
              fontSize: 12,
              fontWeight: i === active ? 700 : 400,
              color: i === active ? "var(--sch-text)" : "var(--sch-tx-3)",
              textAlign: i === 0 ? "left" : i === STEPS.length - 1 ? "right" : "center",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Terms checkbox ──────────────────────────────────────────── */

function TermsCheckbox({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        cursor: "pointer",
        fontSize: 13,
        color: "var(--sch-tx-2)",
      }}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: 18,
          height: 18,
          flexShrink: 0,
          marginTop: 1,
          borderRadius: 5,
          border: checked ? "none" : "1px solid var(--sch-border-2)",
          background: checked ? IRIDESCENT : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          transition: "all 0.2s ease",
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{ display: "flex" }}
            >
              <Check size={13} strokeWidth={3.5} color="#fff" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <span>
        I agree to the{" "}
        <Link
          to="/terms"
          onClick={(e) => e.stopPropagation()}
          style={{ color: "rgba(139,92,246,0.8)", textDecoration: "none" }}
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy"
          onClick={(e) => e.stopPropagation()}
          style={{ color: "rgba(139,92,246,0.8)", textDecoration: "none" }}
        >
          Privacy Policy
        </Link>
      </span>
    </label>
  )
}

/* ── "Check your inbox" panel ────────────────────────────────── */

function ConfirmEmailPanel({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: "center" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 64,
          height: 64,
          margin: "0 auto",
          borderRadius: "50%",
          background: IRIDESCENT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 40px rgba(139,92,246,0.4)",
        }}
      >
        <Mail size={28} color="#fff" />
      </motion.div>

      <h1
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: "var(--sch-text)",
          letterSpacing: "-0.5px",
          marginTop: 24,
        }}
      >
        Check your inbox
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "var(--sch-tx-2)",
          marginTop: 10,
          lineHeight: 1.6,
        }}
      >
        We sent a confirmation link to{" "}
        <span style={{ color: "var(--sch-text)", fontWeight: 600 }}>{email}</span>.
        <br />
        Click it to activate your account and start your 7-day trial.
      </p>

      <Link
        to="/sign-in"
        style={{
          display: "inline-block",
          marginTop: 28,
          fontSize: 14,
          fontWeight: 500,
          color: "rgba(139,92,246,0.9)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(139,92,246,1)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(139,92,246,0.9)")}
      >
        Back to sign in →
      </Link>
    </motion.div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp, signInWithGoogle } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [confirmSent, setConfirmSent] = useState(false)

  // Capture any inbound ?ref= and mark the start of the funnel.
  useEffect(() => {
    captureRefFromUrl()
    trackEvent("signup_started")
  }, [])

  const emailInvalid = email.length > 0 && !EMAIL_RE.test(email)
  const passwordInvalid = password.length > 0 && password.length < 8

  const isValid = useMemo(
    () =>
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      EMAIL_RE.test(email) &&
      password.length >= 8 &&
      agreed,
    [firstName, lastName, email, password, agreed],
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (loading || !isValid) return

    setLoading(true)
    setFormError(null)
    const { error, needsEmailConfirmation } = await signUp({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    })
    if (error) {
      setFormError(error)
      setLoading(false)
      return
    }
    trackEvent("signup_completed", { method: "email" })
    // Frictionless path: with email confirmation OFF the user is already
    // signed in — go straight to onboarding. Otherwise show the inbox panel.
    if (needsEmailConfirmation) {
      setConfirmSent(true)
      setLoading(false)
      return
    }
    // Identify + credit any referrer now that there's a session.
    try {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        identifyUser(data.user.id, { name: firstName.trim(), method: "email" })
        await applyReferralOnSignup(data.user)
      }
    } catch {
      /* analytics/referral are best-effort */
    }
    navigate("/learn")
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
    trackEvent("signup_completed", { method: "google" })
    // Demo mode resolves instantly; real OAuth redirects away before this runs.
    navigate("/learn")
  }

  // After sign-up with email confirmation ON, show the inbox panel instead.
  if (confirmSent) {
    return (
      <AuthSplitLayout>
        <ConfirmEmailPanel email={email.trim()} />
      </AuthSplitLayout>
    )
  }

  return (
    <AuthSplitLayout>
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
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--sch-text)",
              letterSpacing: "-1px",
            }}
          >
            Start learning today
          </h1>
          <p style={{ fontSize: 14, color: "var(--sch-tx-2)", marginTop: 6 }}>
            Free for 7 days. No credit card required.
          </p>
        </motion.div>

        {/* Progress steps */}
        <motion.div variants={itemVariants} custom={2} style={{ marginTop: 24 }}>
          <ProgressSteps active={0} />
        </motion.div>

        <form onSubmit={handleSubmit} style={{ marginTop: 28 }} noValidate>
          {/* Name row */}
          <motion.div
            variants={itemVariants}
            custom={3}
            style={{ display: "flex", gap: 12 }}
          >
            <div style={{ flex: 1 }}>
              <AuthInput
                id="signup-first"
                label="First name"
                autoComplete="given-name"
                placeholder="Ada"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <AuthInput
                id="signup-last"
                label="Last name"
                autoComplete="family-name"
                placeholder="Lovelace"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants} custom={4} style={{ marginTop: 16 }}>
            <AuthInput
              id="signup-email"
              label="Email address"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailInvalid ? "Enter a valid email address." : undefined}
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants} custom={5} style={{ marginTop: 16 }}>
            <AuthInput
              id="signup-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordInvalid ? "Password must be at least 8 characters." : undefined}
              rightSlot={
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
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
            <PasswordStrength password={password} />
          </motion.div>

          {/* Terms */}
          <motion.div variants={itemVariants} custom={6} style={{ marginTop: 16 }}>
            <TermsCheckbox checked={agreed} onChange={setAgreed} />
          </motion.div>

          {/* Form-level error */}
          <AnimatePresence>
            {formError && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ color: "#FF453A", fontSize: 13, marginTop: 16, overflow: "hidden" }}
              >
                {formError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.div variants={itemVariants} custom={7} style={{ marginTop: 24 }}>
            <SubmitButton
              label="Create account →"
              loadingLabel="Creating account..."
              loading={loading}
              disabled={!isValid}
            />
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div variants={itemVariants} custom={8} style={{ marginTop: 24 }}>
          <OrDivider />
        </motion.div>

        {/* Google */}
        <motion.div variants={itemVariants} custom={9} style={{ marginTop: 16 }}>
          <GoogleButton
            label="Sign up with Google"
            onClick={handleGoogle}
            disabled={googleLoading}
          />
        </motion.div>

        {/* Bottom link */}
        <motion.div
          variants={itemVariants}
          custom={10}
          style={{
            marginTop: 24,
            textAlign: "center",
            fontSize: 14,
            color: "var(--sch-tx-2)",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/sign-in"
            style={{ color: "rgba(139,92,246,0.9)", textDecoration: "none", fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(139,92,246,1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(139,92,246,0.9)")}
          >
            Sign in →
          </Link>
        </motion.div>
      </motion.div>
    </AuthSplitLayout>
  )
}
