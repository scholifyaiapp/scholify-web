import { useEffect, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { useAuth } from "@/lib/auth"
import { useIsMobile } from "@/hooks/use-mobile"
import { startStripeCheckout, isStripeConfigured, type StripePlan } from "@/lib/stripe"
import { trackEvent } from "@/lib/analytics"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import CharlesMascot from "@/components/CharlesMascot"
import { Icon, type IconName } from "@/components/acca/ui"
import type { PaywallType } from "@/hooks/usePaywall"

/* ──────────────────────────────────────────────────────────────
 *  In-app paywall modal. Appears on streak milestones (7/14/21),
 *  when a Pro feature is tapped, or as a general upgrade prompt.
 * ────────────────────────────────────────────────────────────── */

const HEADERS: Record<
  PaywallType,
  { kind: "celebrate" | "lock" | "lara"; icon: IconName; title: string; sub: string }
> = {
  streak7: {
    kind: "celebrate",
    icon: "trophy",
    title: "You built a 7-day streak!",
    sub: "Seven days of answering questions, in a row. That's the habit the exam rewards.",
  },
  streak14: {
    kind: "celebrate",
    icon: "streak",
    title: "14 days strong.",
    sub: "Two full weeks of showing up. Your readiness score has the receipts.",
  },
  streak21: {
    kind: "celebrate",
    icon: "gem",
    title: "21 days in a row.",
    sub: "Three weeks of daily practice. Exam prep is now part of your day, not a decision.",
  },
  feature: {
    kind: "lock",
    icon: "lock",
    title: "This is a paid feature",
    sub: "A paid plan unlocks timed mocks, the AI Examiner and custom practice. Everything else stays free.",
  },
  general: {
    kind: "lara",
    icon: "tutor",
    title: "Unlock the full Scholify",
    sub: "Timed mocks, instant written marking, custom practice — the three modes the free plan doesn't include.",
  },
  reminder: {
    kind: "lara",
    icon: "tutor",
    title: "Your free trial is running",
    sub: "You're on the clock — upgrade any time to keep every mode and unlock all 15 papers when the trial ends.",
  },
  expired: {
    kind: "lock",
    icon: "lock",
    title: "Your free trial has ended",
    sub: "Upgrade to keep studying — your plan, progress and readiness are all saved and waiting for you.",
  },
}

/* Only the modes a paid plan actually unlocks — the rest of the app is free. */
const FEATURES: Array<{ text: string; badge?: "PRO" | "NEW" }> = [
  { text: "Timed mock exams with pass-line tracking", badge: "PRO" },
  { text: "AI Examiner — 190 written questions, marked in seconds", badge: "NEW" },
  { text: "Custom practice from any topic or your notes", badge: "PRO" },
  { text: "Mock history & readiness trend" },
]

/* ── Celebration particles ───────────────────────────────────── */

function Particles() {
  const colors = ["#C80000", "#E50068", "#F4A405"]
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 60,
        height: 60,
        pointerEvents: "none",
      }}
    >
      {colors.map((c, i) => (
        <motion.div
          key={c}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 2.7, opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `1px solid ${c}`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Modal ───────────────────────────────────────────────────── */

export default function PaywallModal({
  open,
  type,
  onClose,
}: {
  open: boolean
  type: PaywallType
  onClose: () => void
}) {
  const { user, signOut } = useAuth()
  const isMobile = useIsMobile()
  const [notice, setNotice] = useState<string | null>(null)
  const [celebrating, setCelebrating] = useState(false)

  // Paywalls are dismissible — EXCEPT "expired". Once the 3-day trial ends, the
  // whole app is gated behind this modal until the learner pays (founder call),
  // so it has no close / Escape / backdrop-dismiss; the only ways out are to
  // upgrade, open Settings, or sign out (links in the footer below).
  const dismissible = type !== "expired"
  const header = HEADERS[type]

  // Payments only work when Stripe billing is configured — otherwise the buttons
  // say so rather than inviting a retry that can never succeed.
  const paymentsOpen = isStripeConfigured()

  // Dialog behavior: Escape closes (when dismissible) + lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissible) onClose()
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, dismissible, onClose])

  // Day-7 paywall opens with a 3-second celebration, then reveals the offer.
  useEffect(() => {
    if (open && type === "streak7") {
      setCelebrating(true)
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#C80000", "#E50068", "#F4A405", "#10B981"],
        })
      } catch {
        /* confetti is decorative */
      }
      const t = window.setTimeout(() => setCelebrating(false), 3000)
      return () => window.clearTimeout(t)
    }
    setCelebrating(false)
  }, [open, type])

  const handleCheckout = (plan: StripePlan) => {
    trackEvent("upgrade_started", { plan })
    trackEvent("paywall_checkout_clicked", { type })
    if (!paymentsOpen) {
      setNotice("Payments aren't open yet — nothing to pay today.")
      setTimeout(() => setNotice(null), 3200)
      return
    }
    void startStripeCheckout(plan).then((ok) => {
      if (!ok) {
        setNotice("Couldn't open checkout — please try again in a moment.")
        setTimeout(() => setNotice(null), 3200)
      }
    })
  }

  const sectionPad = "0 32px"

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => dismissible && onClose()}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: isMobile ? "flex-end" : "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: isMobile ? "100%" : 40, opacity: isMobile ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isMobile ? "100%" : 40, opacity: isMobile ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: isMobile ? "100%" : "90%",
              maxWidth: 560,
              maxHeight: isMobile ? "92vh" : "90vh",
              overflowY: "auto",
              background: "var(--sch-bg-2)",
              border: "1px solid rgba(200,0,0,0.25)",
              borderRadius: isMobile ? "28px 28px 0 0" : 28,
              boxShadow:
                "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px var(--sch-card-2), 0 0 80px rgba(200,0,0,0.06)",
            }}
          >
            {/* Close button — only when the paywall can actually be dismissed */}
            {dismissible && (
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--sch-hairline)",
                border: "1px solid var(--sch-border)",
                color: "var(--sch-tx-2)",
                fontSize: 18,
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              ×
            </motion.button>
            )}

            {/* ── Top section ── */}
            <div style={{ padding: "32px 32px 0", textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: 60,
                  height: 60,
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {header.kind === "celebrate" && <Particles />}
                {header.kind === "lara" ? (
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <CharlesMascot pose="present" size={76} />
                  </div>
                ) : (
                  <span style={{ position: "relative", zIndex: 1, display: "inline-flex" }}>
                    <Icon
                      name={header.icon}
                      size={44}
                      color={header.kind === "lock" ? "var(--sch-tx-2)" : "#C80000"}
                      strokeWidth={1.8}
                    />
                  </span>
                )}
              </div>

              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "var(--sch-text)",
                  letterSpacing: "-0.5px",
                  marginTop: 16,
                }}
              >
                {header.title}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--sch-tx-2)",
                  maxWidth: 380,
                  margin: "10px auto 0",
                  lineHeight: 1.6,
                }}
              >
                {header.sub}
              </p>
            </div>

            {/* ── 7-day streak visual (Day-7 paywall only) ── */}
            {type === "streak7" && (
              <div style={{ padding: "20px 32px 0", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: IRIDESCENT,
                        boxShadow: "0 0 10px rgba(200,0,0,0.5)",
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: 12, color: "var(--sch-tx-2)", marginTop: 8 }}>
                  7-day streak
                </div>
              </div>
            )}

            {/* ── Feature list ── */}
            <div style={{ padding: sectionPad, marginTop: 24 }}>
              {FEATURES.map((f) => (
                <div
                  key={f.text}
                  style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      borderRadius: "50%",
                      background: IRIDESCENT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ fontSize: 14, color: "var(--sch-text)", flex: 1 }}>{f.text}</span>
                  {f.badge && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: 8,
                        background:
                          f.badge === "NEW" ? "rgba(14,159,110,0.14)" : "rgba(200,0,0,0.2)",
                        color: f.badge === "NEW" ? "#0E9F6E" : "#C80000",
                      }}
                    >
                      {f.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* ── Plan cards ── */}
            <div
              style={{
                padding: "24px 32px 0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <PlanMini
                name="Beginner"
                price="$9.99"
                unit="/month"
                description="Steady daily practice"
                cta={paymentsOpen ? "Choose Beginner" : "Payments open soon"}
                disabled={!paymentsOpen}
                onClick={() => handleCheckout("beginner")}
              />
              <PlanMini
                featured
                name="Pro"
                price="$14.99"
                unit="/month"
                description="Mocks, Examiner, custom practice"
                cta={paymentsOpen ? "Choose Pro →" : "Payments open soon"}
                disabled={!paymentsOpen}
                onClick={() => handleCheckout("pro")}
              />
            </div>

            {/* Annual row */}
            <div style={{ padding: "12px 32px 0" }}>
              <motion.button
                type="button"
                onClick={() => handleCheckout("annual_pro")}
                whileHover={paymentsOpen ? { scale: 1.01 } : undefined}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "1px solid var(--sch-border)",
                  background: "var(--sch-card)",
                  cursor: paymentsOpen ? "pointer" : "not-allowed",
                  opacity: paymentsOpen ? 1 : 0.55,
                  textAlign: "left",
                }}
              >
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--sch-text)" }}>
                    Annual Pro
                  </span>
                  <span style={{ fontSize: 12, color: "var(--sch-tx-2)" }}>
                    Billed annually · Best value
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, ...iriText }}>$119.99/yr</span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "3px 8px",
                      borderRadius: 8,
                      background: "rgba(14,159,110,0.10)",
                      color: "#0E9F6E",
                      border: "1px solid rgba(14,159,110,0.22)",
                    }}
                  >
                    Save 33%
                  </span>
                </span>
              </motion.button>
            </div>

            {/* ── Bottom ── */}
            <div style={{ padding: "16px 32px 28px", textAlign: "center" }}>
              <AnimatePresence>
                {notice && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ fontSize: 12, color: "#C80000", marginBottom: 10 }}
                  >
                    {notice}
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ fontSize: 12, color: "var(--sch-tx-4)", lineHeight: 1.6 }}>
                {paymentsOpen
                  ? "Everything else stays free · Cancel anytime"
                  : "Payments open soon · Everything else stays free"}
              </div>
              {dismissible && (
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    marginTop: 8,
                    background: "transparent",
                    border: "none",
                    fontSize: 13,
                    color: "var(--sch-tx-4)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sch-tx-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sch-tx-4)")}
                >
                  Maybe later
                </button>
              )}
              {/* Expired trial can't be dismissed into the app — but the learner
                  must still be able to manage their account or leave. */}
              {type === "expired" && (
                <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 18, fontSize: 13 }}>
                  <a href="/settings" style={{ color: "var(--sch-tx-2)", textDecoration: "none", fontWeight: 600 }}>
                    Account & billing
                  </a>
                  <button
                    type="button"
                    onClick={() => void signOut()}
                    style={{ background: "transparent", border: "none", fontSize: 13, color: "var(--sch-tx-4)", cursor: "pointer" }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Day-7 celebration — covers the modal for 3s, then reveals it */}
          <AnimatePresence>
            {celebrating && (
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 5,
                  background: "linear-gradient(135deg, #0D0015, #1A0828)",
                  borderRadius: isMobile ? "28px 28px 0 0" : 28,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 24,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.6, 1], ease: "easeOut" }}
                  style={{ lineHeight: 1, display: "flex", justifyContent: "center" }}
                >
                  <Icon name="trophy" size={56} color="#F4A405" strokeWidth={1.8} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  style={{ fontSize: 80, fontWeight: 900, lineHeight: 1, marginTop: 8, ...iriText }}
                >
                  7
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  style={{ fontSize: 28, fontWeight: 800, color: "#F0EEFF", marginTop: 12 }}
                >
                  Seven days straight.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  style={{ fontSize: 16, color: "rgba(240,238,255,0.5)", marginTop: 8 }}
                >
                  A week of questions answered, every single day.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.4 }}
                  style={{
                    fontSize: 14,
                    color: "rgba(200,0,0,0.8)",
                    fontStyle: "italic",
                    marginTop: 12,
                  }}
                >
                  Keep it going — tomorrow is day eight.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Compact plan card (modal only) ──────────────────────────── */

function PlanMini({
  name,
  price,
  unit,
  description,
  cta,
  onClick,
  featured,
  disabled,
}: {
  name: string
  price: string
  unit: string
  description: string
  cta: string
  onClick: () => void
  featured?: boolean
  /** Payments not configured — the button stays visible but is not purchasable. */
  disabled?: boolean
}) {
  const cardStyle: CSSProperties = featured
    ? {
        background: "rgba(200,0,0,0.08)",
        border: "1px solid rgba(200,0,0,0.4)",
        boxShadow: "0 0 40px rgba(200,0,0,0.07)",
      }
    : { background: "var(--sch-card)", border: "1px solid var(--sch-border)" }

  return (
    <div style={{ position: "relative", borderRadius: 20, padding: 20, ...cardStyle }}>
      {featured && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: IRIDESCENT,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 16px",
            borderRadius: 20,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(200,0,0,0.4)",
          }}
        >
          Most Popular
        </div>
      )}
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: featured ? "rgba(200,0,0,0.8)" : "var(--sch-tx-2)",
        }}
      >
        {name}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginTop: 6 }}>
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1,
            ...(featured ? iriText : { color: "var(--sch-text)" }),
          }}
        >
          {price}
        </span>
        <span style={{ fontSize: 14, color: "var(--sch-tx-2)", paddingBottom: 4 }}>
          {unit}
        </span>
      </div>
      <div style={{ fontSize: 12, color: "var(--sch-tx-2)", marginTop: 4 }}>
        {description}
      </div>
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={
          disabled
            ? undefined
            : { scale: featured ? 1.02 : 1, boxShadow: featured ? "0 0 50px rgba(200,0,0,0.45)" : undefined }
        }
        whileTap={disabled ? undefined : { scale: 0.98 }}
        style={{
          width: "100%",
          height: 44,
          marginTop: 16,
          borderRadius: 12,
          fontSize: 14,
          fontWeight: featured ? 700 : 600,
          cursor: disabled ? "not-allowed" : "pointer",
          color: disabled ? "var(--sch-tx-2)" : featured ? "#fff" : "var(--sch-tx-1)",
          background: disabled ? "var(--sch-card)" : featured ? IRIDESCENT : "var(--sch-card)",
          border: disabled || !featured ? "1px solid var(--sch-border-2)" : "none",
          boxShadow: !disabled && featured ? "0 0 30px rgba(200,0,0,0.3)" : "none",
        }}
      >
        {cta}
      </motion.button>
    </div>
  )
}
