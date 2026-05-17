import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"

const BG = "#FAFAF7"
const INK = "#14141A"
const INK_MUTED = "#6B6B73"
const BRAND = "#5B5BF5"
const HAIR = "rgba(20,20,26,0.08)"

function ScholifyMark({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="Scholify"
      width={size}
      height={size}
      decoding="async"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        objectFit: "contain",
        borderRadius: 8,
      }}
    />
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (error) setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    // TODO: wire to real auth
    setTimeout(() => {
      setSubmitting(false)
      navigate("/dashboard")
    }, 400)
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: BG,
        color: INK,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px",
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Link
          to="/"
          aria-label="Back to home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: INK,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
            padding: "8px 12px",
            borderRadius: 999,
            touchAction: "manipulation",
          }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
        <Link to="/" aria-label="Scholify home" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", color: INK }}>
          <ScholifyMark />
          <span className="font-display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Scholify
          </span>
        </Link>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 20px 48px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(34px, 6vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Welcome back.
          </h1>
          <p style={{ color: INK_MUTED, fontSize: 15, marginBottom: 28 }}>
            New here?{" "}
            <Link to="/sign-up" style={{ color: BRAND, fontWeight: 600, textDecoration: "none" }}>
              Create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label
                  htmlFor="email"
                  style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: INK }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  enterKeyHint="next"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@school.com"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: 16,
                    border: `1px solid ${HAIR}`,
                    borderRadius: 12,
                    background: "white",
                    color: INK,
                    outline: "none",
                    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = BRAND
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND}1F`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = HAIR
                    e.currentTarget.style.boxShadow = "none"
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: INK }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    enterKeyHint="go"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Your password"
                    style={{
                      width: "100%",
                      padding: "14px 48px 14px 16px",
                      fontSize: 16,
                      border: `1px solid ${HAIR}`,
                      borderRadius: 12,
                      background: "white",
                      color: INK,
                      outline: "none",
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = BRAND
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND}1F`
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = HAIR
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    style={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      display: "inline-grid",
                      placeItems: "center",
                      background: "transparent",
                      border: "none",
                      color: INK_MUTED,
                      cursor: "pointer",
                      touchAction: "manipulation",
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: INK_MUTED, cursor: "pointer", touchAction: "manipulation" }}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    style={{ width: 16, height: 16, accentColor: BRAND }}
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  style={{ fontSize: 14, color: BRAND, fontWeight: 600, textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div role="alert" style={{ padding: "10px 14px", borderRadius: 10, background: "#FFF1F1", color: "#B91C1C", fontSize: 14 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "white",
                  background: submitting ? "#3F3F46" : INK,
                  border: "none",
                  borderRadius: 12,
                  cursor: submitting ? "default" : "pointer",
                  marginTop: 6,
                  touchAction: "manipulation",
                  transition: "background 0.15s ease, transform 0.05s ease",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.985)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>

              <div style={{ position: "relative", margin: "10px 0 4px" }}>
                <div style={{ height: 1, background: HAIR }} />
                <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", background: BG, padding: "0 12px", color: INK_MUTED, fontSize: 12, fontWeight: 500 }}>
                  OR
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button
                  type="button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "12px 14px",
                    fontSize: 14,
                    fontWeight: 600,
                    color: INK,
                    background: "white",
                    border: `1px solid ${HAIR}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    touchAction: "manipulation",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "12px 14px",
                    fontSize: 14,
                    fontWeight: 600,
                    color: INK,
                    background: "white",
                    border: `1px solid ${HAIR}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    touchAction: "manipulation",
                  }}
                >
                  <svg width="18" height="18" fill="#24292f" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              <p style={{ fontSize: 12, color: INK_MUTED, textAlign: "center", marginTop: 4 }}>
                By signing in you agree to our{" "}
                <a href="#" style={{ color: INK_MUTED, textDecoration: "underline" }}>Terms</a> &{" "}
                <a href="#" style={{ color: INK_MUTED, textDecoration: "underline" }}>Privacy</a>.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
