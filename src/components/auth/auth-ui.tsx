import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, type Variants } from "motion/react"

/* ──────────────────────────────────────────────────────────────
 *  Shared building blocks for the SignIn / SignUp pages.
 *  Dark, glassy, iridescent — matches the Scholify auth design.
 * ────────────────────────────────────────────────────────────── */

/** Iridescent gradient reused for the ✦ mark, checkbox tick, accents. */
export const IRIDESCENT = "linear-gradient(135deg,#A78BFA 0%,#818CF8 35%,#F0ABFC 70%,#FBBF24 100%)"

/** Scoped CSS — placeholder colour, spinner, autofill, scrollbar. */
const AUTH_CSS = `
  .sch-auth ::placeholder { color: rgba(240,238,255,0.2); }
  .sch-auth input:-webkit-autofill,
  .sch-auth input:-webkit-autofill:focus {
    -webkit-text-fill-color: #F0EEFF;
    -webkit-box-shadow: 0 0 0 1000px rgba(139,92,246,0.06) inset;
    caret-color: #F0EEFF;
    transition: background-color 9999s ease-in-out 0s;
  }
  @keyframes sch-spin { to { transform: rotate(360deg); } }
  .sch-auth ::-webkit-scrollbar { width: 8px; }
  .sch-auth ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08); border-radius: 8px;
  }
`

/* ── Motion variants ─────────────────────────────────────────── */

/** Card container — fades + lifts in. Children inherit the "visible" state. */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * Each element slides in from the left, staggered 0.05s apart.
 * Pass the element's index through the `custom` prop on the motion node.
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
}

/* ── Spinner ─────────────────────────────────────────────────── */

export function Spinner({ size = 18 }: { size?: number }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.35)",
        borderTopColor: "#fff",
        display: "inline-block",
        animation: "sch-spin 0.6s linear infinite",
      }}
    />
  )
}

/* ── Google icon + button ────────────────────────────────────── */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 24 44a20 20 0 0 0 19.6-23.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C40.9 36.7 44 31 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  )
}

export function GoogleButton({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      className="sch-google-btn"
      style={{
        width: "100%",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        color: "#F0EEFF",
        fontSize: 15,
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (disabled) return
        e.currentTarget.style.background = "rgba(255,255,255,0.07)"
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)"
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
      }}
    >
      <GoogleIcon />
      {label}
    </motion.button>
  )
}

/* ── Divider ─────────────────────────────────────────────────── */

export function OrDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
      <span style={{ fontSize: 12, color: "rgba(240,238,255,0.25)" }}>or</span>
      <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
    </div>
  )
}

/* ── Text input ──────────────────────────────────────────────── */

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  /** Element rendered inside the input on the right (e.g. eye toggle). */
  rightSlot?: ReactNode
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, rightSlot, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasError = Boolean(error)

    return (
      <div>
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: 13,
            color: "rgba(240,238,255,0.5)",
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {label}
        </label>
        <div style={{ position: "relative" }}>
          <input
            ref={ref}
            id={id}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: "100%",
              height: 52,
              background: hasError
                ? "rgba(255,69,58,0.06)"
                : focused
                  ? "rgba(139,92,246,0.06)"
                  : "rgba(255,255,255,0.04)",
              border: `1px solid ${
                hasError
                  ? "#FF453A"
                  : focused
                    ? "rgba(139,92,246,0.6)"
                    : "rgba(255,255,255,0.08)"
              }`,
              borderRadius: 12,
              padding: rightSlot ? "0 48px 0 16px" : "0 16px",
              color: "#F0EEFF",
              fontSize: 15,
              outline: "none",
              boxShadow: focused && !hasError ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
              transition: "all 0.2s ease",
            }}
            {...props}
          />
          {rightSlot && (
            <div
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {rightSlot}
            </div>
          )}
        </div>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: "#FF453A", fontSize: 12, marginTop: 6 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  },
)
AuthInput.displayName = "AuthInput"

/* ── Submit button (gradient, glowing) ───────────────────────── */

export function SubmitButton({
  label,
  loadingLabel,
  loading,
  disabled,
}: {
  label: string
  loadingLabel: string
  loading: boolean
  disabled?: boolean
}) {
  const inert = loading || disabled
  return (
    <motion.button
      type="submit"
      disabled={inert}
      whileHover={inert ? undefined : { scale: 1.02, boxShadow: "0 0 50px rgba(139,92,246,0.4)" }}
      whileTap={inert ? undefined : { scale: 0.98 }}
      style={{
        width: "100%",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        background: disabled
          ? "rgba(255,255,255,0.06)"
          : "linear-gradient(135deg,rgba(139,92,246,0.8),rgba(99,102,241,0.8))",
        border: `1px solid ${disabled ? "rgba(255,255,255,0.08)" : "rgba(139,92,246,0.5)"}`,
        borderRadius: 12,
        color: disabled ? "rgba(240,238,255,0.35)" : "#fff",
        fontSize: 16,
        fontWeight: 600,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: disabled ? "none" : "0 0 30px rgba(139,92,246,0.25)",
        cursor: inert ? "not-allowed" : "pointer",
      }}
    >
      {loading && <Spinner />}
      {loading ? loadingLabel : label}
    </motion.button>
  )
}

/* ── Left brand / social-proof panel ─────────────────────────── */

const socialProof = [
  { icon: "⚡", text: "AI plan in 15 seconds" },
  { icon: "🛡", text: "Life Shields protect your streak" },
  { icon: "📈", text: "2,400+ learners staying consistent" },
]

function LeftPanel() {
  return (
    <div style={{ maxWidth: 360, width: "100%" }}>
      {/* ✦ mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 48,
          lineHeight: 1,
          background: IRIDESCENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          width: "fit-content",
        }}
      >
        ✦
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: 32, fontWeight: 800, color: "#F0EEFF", marginTop: 16 }}
      >
        Scholify
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: 14, color: "rgba(240,238,255,0.4)", marginTop: 12 }}
      >
        Turn any goal into a daily habit.
      </motion.p>

      {/* Social proof */}
      <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
        {socialProof.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: 12, alignItems: "center" }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {item.icon}
            </span>
            <span style={{ fontSize: 13, color: "rgba(240,238,255,0.5)" }}>{item.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{ marginTop: 56 }}
      >
        <p style={{ fontStyle: "italic", fontSize: 13, color: "rgba(240,238,255,0.3)" }}>
          “The only app that forgave my missed days.”
        </p>
        <p style={{ fontSize: 11, color: "rgba(240,238,255,0.25)", marginTop: 6 }}>
          — Dilnoza M., IELTS 7.0
        </p>
      </motion.div>
    </div>
  )
}

/* ── Split layout shell ──────────────────────────────────────── */

export function AuthSplitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="sch-auth flex min-h-[100dvh] w-full" style={{ background: "#050508" }}>
      <style>{AUTH_CSS}</style>

      {/* LEFT — 40%, hidden on mobile */}
      <aside
        className="hidden lg:flex lg:w-[40%] items-center justify-center"
        style={{ background: "linear-gradient(135deg,#0D0015,#120820)", padding: "48px" }}
      >
        <LeftPanel />
      </aside>

      {/* RIGHT — 60%, full width on mobile */}
      <main
        className="w-full lg:w-[60%] flex items-start sm:items-center justify-center overflow-y-auto"
        style={{ background: "#050508" }}
      >
        <div
          className="w-full px-6 py-8 sm:px-10 sm:py-12"
          style={{ maxWidth: 420, margin: "0 auto" }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}

/* ── Back-to-home link ───────────────────────────────────────── */

export function BackToHome() {
  return (
    <Link
      to="/"
      className="sch-back"
      style={{
        fontSize: 14,
        color: "rgba(240,238,255,0.35)",
        textDecoration: "none",
        transition: "color 0.2s ease",
        width: "fit-content",
        display: "inline-block",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,238,255,0.7)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,238,255,0.35)")}
    >
      ← Back to home
    </Link>
  )
}
