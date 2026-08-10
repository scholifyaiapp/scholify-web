import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { AlertTriangle, CreditCard, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { entitlementOf } from "@/lib/entitlement"
import { openStripeBillingPortal } from "@/lib/stripe"

/*
 * The half of the dunning policy that was missing.
 *
 * The billing webhook has always written plan_status "past_due" with the
 * comment "keep access but flag" — but nothing in the app read it, so a
 * customer whose card expired lost their mocks and AI Examiner with no
 * explanation, kept the rest for a while, and was then walled without warning.
 * Their most likely reading of that is "the product broke", and the most
 * likely outcome is a refund request instead of an updated card.
 *
 * So: say it plainly, say what it costs them, say when it ends, and put the
 * fix one click away. This is a recovery mechanism, not a punishment — the
 * tone is "your card needs a moment", never "you didn't pay".
 */
export default function BillingGraceBanner() {
  const { user } = useAuth()
  const reduced = useReducedMotion()
  const [busy, setBusy] = useState(false)
  const entitlement = entitlementOf(user)

  if (!entitlement.isPastDue) return null

  const days = entitlement.graceDaysLeft
  const urgent = days <= 2

  const openPortal = () => {
    setBusy(true)
    void openStripeBillingPortal().then((ok) => {
      // On success the browser is already navigating to Stripe; only a failure
      // returns here, and the button must not stay stuck in its busy state.
      if (!ok) setBusy(false)
    })
  }

  return (
    <motion.div
      role="status"
      initial={reduced ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap",
        padding: "13px 16px",
        borderRadius: 14,
        marginBottom: 18,
        border: `1px solid ${urgent ? "rgba(200,0,0,0.35)" : "rgba(184,122,5,0.35)"}`,
        background: urgent ? "rgba(200,0,0,0.06)" : "rgba(184,122,5,0.08)",
      }}
    >
      <span
        aria-hidden
        style={{
          display: "grid",
          placeItems: "center",
          width: 34,
          height: 34,
          borderRadius: 10,
          flexShrink: 0,
          background: urgent ? "rgba(200,0,0,0.12)" : "rgba(184,122,5,0.15)",
          color: urgent ? "#C80000" : "#B87A05",
        }}
      >
        <AlertTriangle size={17} strokeWidth={2.4} />
      </span>

      <div style={{ flex: "1 1 260px", minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--sch-text)", lineHeight: 1.35 }}>
          {/* Never "you failed to pay" — the overwhelmingly common cause is a
              card that expired, and the goal is an updated card, not shame. */}
          Your last payment didn’t go through
        </div>
        <div style={{ fontSize: 13, color: "var(--sch-tx-2)", lineHeight: 1.5, marginTop: 3 }}>
          Timed mocks, the AI Examiner and custom practice are paused. Your papers, chapters, question banks and
          study plan stay open for{" "}
          <b style={{ color: urgent ? "#C80000" : "var(--sch-text)" }}>
            {days} more {days === 1 ? "day" : "days"}
          </b>
          .
        </div>
      </div>

      <button
        type="button"
        onClick={openPortal}
        disabled={busy}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 18px",
          minHeight: 44,
          borderRadius: 12,
          border: "none",
          background: "#C80000",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          cursor: busy ? "progress" : "pointer",
          opacity: busy ? 0.7 : 1,
          flexShrink: 0,
        }}
      >
        {busy ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} strokeWidth={2.4} />}
        {busy ? "Opening…" : "Update card"}
      </button>
    </motion.div>
  )
}
