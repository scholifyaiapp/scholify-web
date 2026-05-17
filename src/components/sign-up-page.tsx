import { useState } from "react"
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react"
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

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const labels = ["Too short", "Weak", "Okay", "Strong", "Excellent"]
  const colors = ["#D4D4D8", "#EF4444", "#F59E0B", "#5B5BF5", "#10B981"]
  return { score, label: labels[score], color: colors[score] }
}

export function SignupPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
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
    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms & Conditions to continue.")
      return
    }
    if (formData.password.length < 8) {
      setError("Use a password of at least 8 characters.")
      return
    }
    setSubmitting(true)
    setError(null)
    setTimeout(() => {
      setSubmitting(false)
      navigate("/dashboard")
    }, 400)
  }

  const strength = passwordStrength(formData.password)

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
        <div style={{ width: "100%", maxWidth: 460 }}>
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
            Start your streak.
          </h1>
          <p style={{ color: INK_MUTED, fontSize: 15, marginBottom: 28 }}>
            Already with us?{" "}
            <Link to="/sign-in" style={{ color: BRAND, fontWeight: 600, textDecoration: "none" }}>
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label htmlFor="firstName" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: INK }}>
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    autoCapitalize="words"
                    autoFocus
                    enterKeyHint="next"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Nuriddin"
                    style={inputStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: INK }}>
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    autoCapitalize="words"
                    enterKeyHint="next"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Aliev"
                    style={inputStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: INK }}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  enterKeyHint="next"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@school.com"
                  style={inputStyle}
                  onFocus={focusOn}
                  onBlur={focusOff}
                />
              </div>

              <div>
                <label htmlFor="password" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: INK }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    enterKeyHint="go"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="At least 8 characters"
                    style={{ ...inputStyle, paddingRight: 48 }}
                    onFocus={focusOn}
                    onBlur={focusOff}
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
                {formData.password && (
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, height: 4, background: "#E5E5E5", borderRadius: 999, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${(strength.score / 4) * 100}%`,
                          height: "100%",
                          background: strength.color,
                          transition: "width 0.2s ease, background 0.2s ease",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 12, color: strength.color, fontWeight: 600, minWidth: 70, textAlign: "right" }}>
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: INK_MUTED, cursor: "pointer", touchAction: "manipulation" }}>
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  style={{ width: 16, height: 16, marginTop: 2, accentColor: BRAND }}
                />
                <span>
                  I agree to the{" "}
                  <a href="#" style={{ color: INK, fontWeight: 600, textDecoration: "underline" }}>Terms</a> and{" "}
                  <a href="#" style={{ color: INK, fontWeight: 600, textDecoration: "underline" }}>Privacy Policy</a>.
                </span>
              </label>

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
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.985)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {submitting ? "Creating account…" : <>Create account <Check size={18} /></>}
              </button>

              <p style={{ fontSize: 12, color: INK_MUTED, textAlign: "center", marginTop: 4 }}>
                Free forever. No credit card. Cancel anytime.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 16,
  border: `1px solid ${HAIR}`,
  borderRadius: 12,
  background: "white",
  color: INK,
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
}

function focusOn(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = BRAND
  e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND}1F`
}

function focusOff(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = HAIR
  e.currentTarget.style.boxShadow = "none"
}
