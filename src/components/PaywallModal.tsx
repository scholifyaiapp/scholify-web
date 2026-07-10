import { useEffect, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { differenceInCalendarDays } from "date-fns"
import { useAuth } from "@/lib/auth"
import { useIsMobile } from "@/hooks/use-mobile"
import { openCheckout, PADDLE_PRICES } from "@/lib/paddle"
import { trackEvent } from "@/lib/analytics"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import LaraAvatar from "@/components/LaraAvatar"
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
    sub: "That puts you in the top 3% of ACCA students. Most people quit before day 3. You didn't.",
  },
  streak14: {
    kind: "celebrate",
    icon: "streak",
    title: "14 days strong.",
    sub: "Two full weeks of showing up. Students who practise daily pass at nearly twice the average rate.",
  },
  streak21: {
    kind: "celebrate",
    icon: "gem",
    title: "21 days — it's a habit now.",
    sub: "Research says habits take about three weeks to form. You just made exam prep automatic.",
  },
  feature: {
    kind: "lock",
    icon: "lock",
    title: "This is a Pro feature",
    sub: "Upgrade to unlock timed mocks, the AI Examiner, custom practice and unlimited Lara.",
  },
  general: {
    kind: "lara",
    icon: "tutor",
    title: "Unlock the full Scholify",
    sub: "Timed mocks, instant written marking, custom practice — everything you need to pass.",
  },
}

const FEATURES: Array<{ text: string; badge?: "PRO" | "NEW" }> = [
  { text: "Timed mock exams with pass-line tracking", badge: "PRO" },
  { text: "AI Examiner — written answers marked in seconds", badge: "NEW" },
  { text: "Custom practice from any topic or your notes", badge: "PRO" },
  { text: "Unlimited Lara AI tutor" },
  { text: "Curated banks for all nine OT papers" },
  { text: "Readiness score & weak-area analytics" },
]

/* ── Celebration particles ───────────────────────────────────── */

function Particles() {
  const colors = ["#D92E10", "#E50068", "#F4A405"]
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
  const { user } = useAuth()
  const isMobile = useIsMobile()
  const [notice, setNotice] = useState<string | null>(null)
  const [celebrating, setCelebrating] = useState(false)

  const dismissible = type !== "streak7"
  const header = HEADERS[type]
  const email = user?.email

  // Days left in the 7-day free trial (from signup), for the urgency line.
  const trialDaysLeft = (() => {
    if (!user?.created_at) return 7
    const since = Math.max(0, differenceInCalendarDays(new Date(), new Date(user.created_at)))
    return Math.max(0, 7 - since)
  })()

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
          colors: ["#D92E10", "#E50068", "#F4A405", "#34D399", "#FBBF24"],
        })
      } catch {
        /* confetti is decorative */
      }
      const t = window.setTimeout(() => setCelebrating(false), 3000)
      return () => window.clearTimeout(t)
    }
    setCelebrating(false)
  }, [open, type])

  const planFor = (priceId: string | undefined): string => {
    if (priceId === PADDLE_PRICES.beginnerMonthly) return "beginner"
    if (priceId === PADDLE_PRICES.proMonthly) return "pro"
    if (priceId === PADDLE_PRICES.annualPro) return "annual_pro"
    return "unknown"
  }

  const handleCheckout = (priceId: string | undefined) => {
    trackEvent("upgrade_started", { plan: planFor(priceId) })
    trackEvent("paywall_checkout_clicked", { type })
    const ok = openCheckout(priceId, email, user?.id)
    if (!ok) {
      setNotice("Couldn't open checkout. Please try again.")
      setTimeout(() => setNotice(null), 2800)
    }
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
                    <LaraAvatar size={48} />
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
                          f.badge === "NEW" ? "rgba(52,211,153,0.2)" : "rgba(200,0,0,0.2)",
                        color: f.badge === "NEW" ? "#34D399" : "#D92E10",
                      }}
                    >
                      {f.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* ── Trial urgency (Day-7 paywall only) ── */}
            {type === "streak7" && (
              <div
                style={{
                  padding: "16px 32px 0",
                  textAlign: "center",
                  fontSize: 12,
                  color: "rgba(255,159,10,0.7)",
                }}
              >
                {trialDaysLeft === 0
                  ? "Your free trial ends today."
                  : `Your free trial ends in ${trialDaysLeft} ${trialDaysLeft === 1 ? "day" : "days"}.`}
              </div>
            )}

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
                description="Build the habit"
                cta="Choose Beginner"
                onClick={() => handleCheckout(PADDLE_PRICES.beginnerMonthly)}
              />
              <PlanMini
                featured
                name="Pro"
                price="$14.99"
                unit="/month"
                description="The full experience"
                cta="Choose Pro →"
                onClick={() => handleCheckout(PADDLE_PRICES.proMonthly)}
              />
            </div>

            {/* Annual row */}
            <div style={{ padding: "12px 32px 0" }}>
              <motion.button
                type="button"
                onClick={() => handleCheckout(PADDLE_PRICES.annualPro)}
                whileHover={{ scale: 1.01 }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "1px solid var(--sch-border)",
                  background: "var(--sch-card)",
                  cursor: "pointer",
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
                      background: "rgba(52,211,153,0.1)",
                      color: "#34D399",
                      border: "1px solid rgba(52,211,153,0.2)",
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
                    style={{ fontSize: 12, color: "#D92E10", marginBottom: 10 }}
                  >
                    {notice}
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ fontSize: 12, color: "var(--sch-tx-4)", lineHeight: 1.6 }}>
                7-day free trial · No credit card required · Cancel anytime
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
                  Most people never make it this far.
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
                  You're in the top 3% of learners.
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
}: {
  name: string
  price: string
  unit: string
  description: string
  cta: string
  onClick: () => void
  featured?: boolean
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
        whileHover={{ scale: featured ? 1.02 : 1, boxShadow: featured ? "0 0 50px rgba(200,0,0,0.45)" : undefined }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%",
          height: 44,
          marginTop: 16,
          borderRadius: 12,
          fontSize: 14,
          fontWeight: featured ? 700 : 600,
          cursor: "pointer",
          color: featured ? "#fff" : "var(--sch-tx-1)",
          background: featured ? IRIDESCENT : "var(--sch-card)",
          border: featured ? "none" : "1px solid var(--sch-border-2)",
          boxShadow: featured ? "0 0 30px rgba(200,0,0,0.3)" : "none",
        }}
      >
        {cta}
      </motion.button>
    </div>
  )
}
