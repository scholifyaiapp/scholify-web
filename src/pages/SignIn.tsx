import { useState, type FormEvent } from "react"
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
  cardVariants,
  itemVariants,
} from "@/components/auth/auth-ui"
import { CharacterLeftPanel } from "@/components/auth/auth-characters"

const EMAIL_RE = /^\S+@\S+\.\S+$/

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn, signInWithGoogle } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (loading) return

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
      setFormError(error)
      setLoading(false)
      return
    }
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
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#F0EEFF",
              letterSpacing: "-1px",
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: "rgba(240,238,255,0.4)", marginTop: 6 }}>
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
                    color: "rgba(240,238,255,0.3)",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,238,255,0.6)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,238,255,0.3)")}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <Link
                to="/support"
                style={{
                  fontSize: 13,
                  color: "rgba(139,92,246,0.8)",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(139,92,246,1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(139,92,246,0.8)")}
              >
                Forgot password?
              </Link>
            </div>
          </motion.div>

          {/* Form-level error */}
          <AnimatePresence>
            {formError && (
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
                {formError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.div variants={itemVariants} custom={4} style={{ marginTop: 24 }}>
            <SubmitButton label="Sign in →" loadingLabel="Signing in..." loading={loading} />
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
            color: "rgba(240,238,255,0.4)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            style={{
              color: "rgba(139,92,246,0.9)",
              textDecoration: "none",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(139,92,246,1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(139,92,246,0.9)")}
          >
            Start for free →
          </Link>
        </motion.div>
      </motion.div>
    </AuthSplitLayout>
  )
}
