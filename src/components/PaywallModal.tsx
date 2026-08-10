import { useEffect, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { useAuth } from "@/lib/auth"
import { useIsMobile } from "@/hooks/use-mobile"
import { startStripeCheckout, type StripePlan } from "@/lib/stripe"
import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import { trackEvent } from "@/lib/analytics"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import CharlesMascot from "@/components/CharlesMascot"
import { Icon, type IconName } from "@/components/acca/ui"
import type { PaywallType } from "@/hooks/usePaywall"
import { entitlementOf } from "@/lib/entitlement"
import { getCurrentPaper } from "@/lib/acca-qualification"
import { getLatestDiagnostic } from "@/lib/acca-diagnostic"
import { getPlan } from "@/lib/acca-plan"

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
    sub: "Pro unlocks timed mocks, the AI Examiner and custom practice. Beginner covers everything else.",
  },
  general: {
    kind: "lara",
    icon: "tutor",
    title: "Your pass plan is built. Unlock day one.",
    sub: "Scholify has diagnosed your gaps and sequenced the work. Start Pro free for 3 days to put the plan into motion.",
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
    title: "Your personalised plan is ready",
    sub: "Your diagnosis, priorities and daily roadmap are saved. Choose a plan to unlock the learning workspace.",
  },
}

/* The concrete value unlocked by a paid plan or card-backed Pro trial. */
const FEATURES: Array<{ text: string; badge?: "PRO" | "NEW" }> = [
  { text: "Your adaptive daily plan, rebuilt from every answer", badge: "PRO" },
  { text: "Full mock exams with pass-probability tracking", badge: "PRO" },
  { text: "AI Examiner feedback on written practice", badge: "NEW" },
  { text: "Question bank, targeted drills and smart flashcards" },
  { text: "Advanced analytics across every practice session" },
  { text: "Charles AI tutor whenever you get stuck" },
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
  required = false,
}: {
  open: boolean
  type: PaywallType
  onClose: () => void
  /** Prevent closing when this is the onboarding gate before paid access. */
  required?: boolean
}) {
  const { user, signOut } = useAuth()
  const isMobile = useIsMobile()
  const [notice, setNotice] = useState<string | null>(null)
  const [celebrating, setCelebrating] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshNote, setRefreshNote] = useState<string | null>(null)

  // Paywalls are dismissible — EXCEPT "expired". Once the 3-day trial ends, the
  // whole app is gated behind this modal until the learner pays (founder call),
  // so it has no close / Escape / backdrop-dismiss; the only ways out are to
  // upgrade, open Settings, or sign out (links in the footer below).
  const dismissible = type !== "expired" && !required
  const entitlement = entitlementOf(user)
  const currentPaper = getCurrentPaper()
  const diagnostic = currentPaper ? getLatestDiagnostic(currentPaper) : null
  const personalPlan = currentPaper ? getPlan(currentPaper) : null
  const header = type === "feature" && entitlement.isBeginner
    ? {
        kind: "lock" as const,
        icon: "lock" as IconName,
        title: "This feature needs Pro",
        sub: "Your Beginner plan includes all 15 papers, practice, flashcards, analytics and Charles. Upgrade to Pro for timed mocks, the AI Examiner, custom practice and mock history.",
      }
    : HEADERS[type]



  // Always open: only the SERVER can veto a checkout, and it says so in its
  // response. See the note on isStripeConfigured() in src/lib/stripe.ts.
  const paymentsOpen = true

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

  /*
   * Pull a fresh token and see whether the entitlement has landed. Reloads on
   * success rather than relying on state propagation, because this wall is
   * rendered BY the route guard — the surest way to re-run that decision with
   * the new token is to re-enter the app.
   */
  const refreshAccess = async () => {
    if (refreshing) return
    setRefreshing(true)
    setRefreshNote(null)
    trackEvent("paywall_refresh_access_clicked")
    if (!isSupabaseConfigured) {
      setRefreshNote("Accounts aren't connected on this build. Email founder@flowlifyai.com and we'll sort it.")
      setRefreshing(false)
      return
    }
    try {
      const { data } = await supabase.auth.refreshSession()
      const meta = data.session?.user?.app_metadata ?? {}
      const plan = typeof meta.plan === "string" ? meta.plan : "free"
      if (plan !== "free" || meta.plan_status === "active" || meta.plan_status === "trialing") {
        setRefreshNote("Found it — unlocking now.")
        window.location.reload()
        return
      }
      setRefreshNote(
        "No active subscription on this account yet. If you've just paid, give it a minute and try again — or check you're signed in with the email you paid with.",
      )
    } catch {
      setRefreshNote("Couldn't reach the account service. Check your connection and try again.")
    }
    setRefreshing(false)
  }

  const handleCheckout = (plan: StripePlan) => {
    trackEvent("upgrade_started", { plan })
    trackEvent("paywall_checkout_clicked", { type })
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
              maxHeight: isMobile ? "92dvh" : "90dvh",
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
                  width: header.kind === "lara" ? "auto" : 60,
                  height: header.kind === "lara" ? "auto" : 60,
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
              {(type === "general" || type === "expired") && currentPaper && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, margin: "20px auto 0", maxWidth: 430 }}>
                  {[
                    { value: currentPaper, label: "TARGET PAPER" },
                    { value: diagnostic ? `${diagnostic.passProbability}%` : "Mapped", label: diagnostic ? "PASS PROBABILITY" : "SYLLABUS" },
                    { value: personalPlan ? `${personalPlan.dailyMinutes} min` : "Daily", label: "STUDY BLOCK" },
                  ].map((proof) => (
                    <div key={proof.label} style={{ padding: "12px 8px", borderRadius: 14, background: "var(--sch-card)", border: "1px solid var(--sch-border)" }}>
                      <div style={{ fontSize: 17, fontWeight: 850, ...iriText }}>{proof.value}</div>
                      <div style={{ marginTop: 4, fontSize: 8.5, fontWeight: 800, letterSpacing: ".08em", color: "var(--sch-tx-3)" }}>{proof.label}</div>
                    </div>
                  ))}
                </div>
              )}
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
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "var(--sch-tx-3)", marginBottom: 14 }}>
                EVERYTHING YOUR PLAN NEEDS
              </div>
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
                gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))",
                gap: 12,
              }}
            >
              {!entitlement.isBeginner && <PlanMini
                name="Beginner"
                price="$9.99"
                unit="/month"
                description="Steady daily practice"
                cta={paymentsOpen ? "Choose Beginner" : "Payments open soon"}
                disabled={!paymentsOpen}
                onClick={() => handleCheckout("beginner")}
              />}
              <PlanMini
                featured
                name="Pro"
                price="$14.99"
                unit="/month"
                description="Your complete adaptive system"
                cta={paymentsOpen ? "Start 3 days free →" : "Payments open soon"}
                disabled={!paymentsOpen}
                onClick={() => handleCheckout("pro")}
              />
            </div>

            {/*
              The Annual Beginner row was removed from this modal (founder's
              call). Four prices on the one screen that has to produce a single
              decision is three too many: the cheapest annual option sitting
              under the two cards pulls attention downward and competes with
              Pro, which is the plan this modal exists to sell. It remains
              available on /pricing, where a visitor has come specifically to
              compare and has the room to.
            */}

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
                    3 days free · then billed annually
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
                  ? "No charge today · Cancel before the trial deadline and pay nothing · After that, payments are non-refundable"
                  : "Secure checkout will open here"}
              </div>
              {/* The "Ask a parent or sponsor to unlock" mailto used to sit here.
                  Removed: ACCA candidates are working adults, so it read as
                  student-priced pocket money rather than professional software,
                  and it offered a second exit from the one screen whose whole
                  job is to present a single decision. */}
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
                <>
                  {/*
                    THE RECOVERY PATH FOR SOMEONE WHO HAS ALREADY PAID.
                    Stripe's webhook can land seconds after the redirect. When it
                    does, the token in the browser still says "free" and this wall
                    appears to a paying customer — with nothing on it acknowledging
                    that possibility. The only cure was to guess "sign out and sign
                    back in", which mints a fresh token; a real customer instead
                    concludes they were charged for nothing and asks for their money
                    back. One button now does the same thing, named for the problem.
                  */}
                  <motion.button
                    type="button"
                    onClick={refreshAccess}
                    disabled={refreshing}
                    whileHover={refreshing ? undefined : { scale: 1.015 }}
                    whileTap={refreshing ? undefined : { scale: 0.985 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      width: "100%",
                      minHeight: 44,
                      marginTop: 14,
                      borderRadius: 12,
                      cursor: refreshing ? "progress" : "pointer",
                      background: "transparent",
                      border: "1px solid var(--sch-border)",
                      color: "var(--sch-tx-1)",
                      fontSize: 13.5,
                      fontWeight: 700,
                      fontFamily: "inherit",
                    }}
                  >
                    <motion.span
                      aria-hidden
                      animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
                      transition={refreshing ? { duration: 0.9, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
                      style={{ display: "inline-flex" }}
                    >
                      <Icon name="arrow" size={15} />
                    </motion.span>
                    {refreshing ? "Checking your payment…" : "Already paid? Refresh my access"}
                  </motion.button>
                  <AnimatePresence>
                    {refreshNote && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ fontSize: 12.5, color: "var(--sch-tx-2)", marginTop: 8, lineHeight: 1.5 }}
                      >
                        {refreshNote}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/*
                    Name the account the wall is judging.

                    Without this line the wall is unfalsifiable: someone who is
                    certain they paid, and someone signed into a second account
                    they forgot about, see the identical screen. It is also the
                    first thing support would have to ask for, and the fastest
                    way to tell "the gate is broken" apart from "you are on the
                    wrong account" — which is not a rare confusion, it is the
                    single most common one behind "I paid and it still asks".
                  */}
                  {user?.email && (
                    <div style={{ marginTop: 16, fontSize: 12, color: "var(--sch-tx-4)", lineHeight: 1.5 }}>
                      Signed in as <span style={{ color: "var(--sch-tx-2)", fontWeight: 650 }}>{user.email}</span>
                      {" — this account has no active plan."}
                    </div>
                  )}

                  <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 18, fontSize: 13 }}>
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
                </>
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
