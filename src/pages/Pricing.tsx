import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth"
import { openCheckout, PADDLE_PRICES, isPaddleConfigured } from "@/lib/paddle"
import { isSupabaseConfigured } from "@/lib/supabase"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import PricingCard, { type PlanFeature } from "@/components/PricingCard"
import { ScholifyLockup } from "@/components/brand"

/* ──────────────────────────────────────────────────────────────
 *  Public pricing page (/pricing) — plans, comparison table, FAQ.
 * ────────────────────────────────────────────────────────────── */

const TEXT2 = "var(--sch-tx-2)"
const GOLD = "linear-gradient(135deg,#FFD700,#FFA500)"

/* Every claim below is what the app ships today. The 7-day Pro trial is real
   (granted server-side on first sign-up) but only once accounts are open, so
   trial copy is gated on that — the live site never promises what it can't do. */
const accountsOpen = isSupabaseConfigured

const FREE_FEATURES: PlanFeature[] = [
  { text: "2,418 expert-written practice questions" },
  { text: "Instant marking + teaching explanations" },
  { text: "929 SRS flashcards" },
  { text: "Diagnostic with a pass probability (± margin)" },
  { text: "69 study chapters across all 15 papers" },
  { text: "Lara AI tutor" },
  { text: "Daily goal, streak & readiness score" },
  { text: "Full ACCA roadmap BT → AAA" },
]

const BEGINNER_FEATURES: PlanFeature[] = [
  { text: "Timed mock exams against the pass line" },
  { text: "AI Examiner — written answers marked in seconds", badge: "NEW" },
  { text: "Custom practice from any topic or your notes" },
  { text: "Mock history & readiness trend" },
]

const PRO_FEATURES: PlanFeature[] = [
  { text: "Timed mock exams", badge: "PRO" },
  { text: "AI Examiner on all 190 written questions", badge: "NEW" },
  { text: "Custom practice from any topic or your notes" },
  { text: "Mock history & readiness trend" },
  { text: "Annual option — 33% cheaper" },
]

/* Entitlements are Free vs paid today — any paid plan unlocks the same modes. */
const COMPARISON: Array<[string, string, string, string, string]> = [
  ["Expert-written question banks", "✓", "✓", "✓", "✓"],
  ["Practice sessions", "✓", "✓", "✓", "✓"],
  ["Instant marking + explanations", "✓", "✓", "✓", "✓"],
  ["SRS flashcards", "✓", "✓", "✓", "✓"],
  ["Diagnostic + pass probability", "✓", "✓", "✓", "✓"],
  ["Study chapters (all 15 papers)", "✓", "✓", "✓", "✓"],
  ["Readiness score & weak-area analytics", "✓", "✓", "✓", "✓"],
  ["Lara AI tutor", "✓", "✓", "✓", "✓"],
  ["Timed mock exams", "—", "✓", "✓", "✓"],
  ["AI Examiner (written marking)", "—", "✓", "✓", "✓"],
  ["Custom practice from your notes", "—", "✓", "✓", "✓"],
]

const FAQS: Array<[string, string]> = [
  [
    "How does the free trial work?",
    accountsOpen
      ? "Every new account starts with 7 days of Pro, free and with no card — timed mocks, the AI Examiner and custom practice all unlocked. When the 7 days end you're not cut off: you keep the full free plan (2,418 questions, 929 flashcards, 69 study chapters, the diagnostic and your readiness score) with no clock, forever. Upgrade whenever you want Pro back."
      : "Accounts aren't open yet. When they are, every new account will start with 7 days of Pro free (no card), then keep the full free plan — 2,418 questions, 929 flashcards, 69 study chapters, the diagnostic and readiness score — with no clock.",
  ],
  [
    "Which papers does Scholify cover?",
    "All 15 papers of the ACCA qualification, BT to AAA. Nine papers (BT, MA, FA, LW, PM, TX, FR, AA, FM) have curated, expert-written question banks; every paper has study chapters and supports AI-generated practice, and the AI Examiner marks 190 written questions against their rubrics.",
  ],
  [
    "What is the AI Examiner?",
    "Strategic Professional and parts of Applied Skills are written exams — and traditionally you wait days for a tutor to mark your answers. The AI Examiner marks your written answer against a marking scheme point by point, in seconds, and shows you exactly which marks you earned and which you missed.",
  ],
  [
    "Is Scholify affiliated with ACCA?",
    "No. Scholify is an independent study tool for ACCA students. All questions are original and aligned to the public syllabus — we never reproduce official exam materials. ACCA is a registered trademark of the Association of Chartered Certified Accountants.",
  ],
  [
    "Can I cancel anytime?",
    "Yes. Cancel from Settings anytime. Your plan stays active until the period ends. No questions, no forms, no hidden steps.",
  ],
]

/* ── Comparison table ────────────────────────────────────────── */

function ComparisonCell({ value }: { value: string }) {
  if (value === "✓")
    return <span style={{ ...iriText, fontWeight: 800 }}>✓</span>
  if (value === "—")
    return <span style={{ color: "var(--sch-tx-4)" }}>—</span>
  return <span style={{ color: "var(--sch-tx-1)", fontSize: 13 }}>{value}</span>
}

/* ── FAQ item ────────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        borderRadius: 14,
        padding: 20,
        marginBottom: 8,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: 0,
          margin: 0,
          background: "none",
          border: "none",
          font: "inherit",
          textAlign: "left",
          cursor: "pointer",
          color: "inherit",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--sch-text)" }}>{q}</span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          style={{ fontSize: 20, color: TEXT2, flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: 14,
                color: "var(--sch-tx-2)",
                lineHeight: 1.7,
                marginTop: 12,
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

export default function Pricing() {
  const { user } = useAuth()
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")
  const [showTable, setShowTable] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const annual = billing === "annual"

  // Payments are only real when Paddle has a token AND the price ids exist.
  // Until then the plan buttons say so instead of pretending to fail.
  const paymentsOpen =
    isPaddleConfigured() && Boolean(PADDLE_PRICES.proMonthly || PADDLE_PRICES.beginnerMonthly)

  const flash = (msg: string) => {
    setNotice(msg)
    setTimeout(() => setNotice(null), 2800)
  }

  const checkout = (priceId: string | undefined) => {
    if (!paymentsOpen || !openCheckout(priceId, user?.email, user?.id)) {
      flash("Payments aren't open yet — the free plan has no limit in the meantime.")
    }
  }

  const beginnerCard = useMemo(
    () => ({
      price: annual ? "$6.67" : "$9.99",
      oldPrice: annual ? "$9.99" : undefined,
      billedNote: annual ? "Billed as $79.99/yr" : undefined,
    }),
    [annual],
  )
  const proCard = useMemo(
    () => ({
      price: annual ? "$10.00" : "$14.99",
      oldPrice: annual ? "$14.99" : undefined,
      billedNote: annual ? "Billed as $119.99/yr" : undefined,
    }),
    [annual],
  )

  return (
    <div style={{ minHeight: "100dvh", background: "var(--sch-bg)" }}>
      {/* Slim top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", display: "inline-flex" }} aria-label="Scholify">
          <ScholifyLockup size={24} color="var(--sch-text)" />
        </Link>
        <Link
          to={user ? "/study" : "/sign-in"}
          style={{ fontSize: 14, color: "var(--sch-tx-1)", textDecoration: "none" }}
        >
          {user ? "Go to app →" : "Sign in"}
        </Link>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 96px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", paddingTop: 60 }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              letterSpacing: "0.1em",
              padding: "5px 14px",
              borderRadius: 999,
              border: "1px solid rgba(200,0,0,0.3)",
              background: "rgba(200,0,0,0.06)",
              color: "rgba(200,0,0,0.9)",
            }}
          >
            PRICING
          </span>
          <h1
            style={{
              fontSize: "clamp(36px,4vw,56px)",
              fontWeight: 900,
              color: "var(--sch-text)",
              letterSpacing: "-2px",
              marginTop: 20,
              lineHeight: 1.05,
            }}
          >
            Cheaper than one tutoring hour.
          </h1>
          <p style={{ fontSize: 16, color: "var(--sch-tx-2)", marginTop: 12 }}>
            The free plan has no clock on it. Pay only when you want mocks, the AI Examiner and
            custom practice.
          </p>

          {/* Billing toggle */}
          <div
            style={{
              display: "inline-flex",
              marginTop: 32,
              padding: 4,
              borderRadius: 24,
              border: "1px solid var(--sch-border)",
              background: "var(--sch-card)",
            }}
          >
            {(["monthly", "annual"] as const).map((b) => {
              const active = billing === b
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  style={{
                    position: "relative",
                    padding: "8px 24px",
                    borderRadius: 20,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#fff" : TEXT2,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 20,
                        background: IRIDESCENT,
                        zIndex: -1,
                      }}
                    />
                  )}
                  {b === "monthly" ? "Monthly" : "Annual"}
                  {b === "annual" && (
                    <span
                      style={{
                        fontSize: 10,
                        padding: "2px 8px",
                        borderRadius: 8,
                        background: active ? "rgba(0,0,0,0.2)" : "rgba(52,211,153,0.15)",
                        color: active ? "#fff" : "#34D399",
                      }}
                    >
                      Save 33%
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {notice && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: 13, color: "#D92E10", marginTop: 16 }}
              >
                {notice}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pricing cards */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ gap: 16, maxWidth: 1000, margin: "56px auto 0" }}
        >
          <PricingCard
            index={0}
            variant="free"
            name="Free"
            price="$0"
            priceUnit="forever"
            description="The whole study loop. No card, no countdown."
            features={FREE_FEATURES}
            cta={user ? "Go to app →" : "Start free"}
            onCta={() => (window.location.href = user ? "/study" : "/sign-up")}
          />
          <PricingCard
            index={1}
            variant="beginner"
            name="Beginner"
            price={beginnerCard.price}
            priceUnit="/mo"
            oldPrice={beginnerCard.oldPrice}
            billedNote={beginnerCard.billedNote}
            description="For steady daily practice"
            featuresHeader="Everything in Free, plus:"
            features={BEGINNER_FEATURES}
            cta={paymentsOpen ? "Choose Beginner" : "Payments open soon"}
            disabled={!paymentsOpen}
            onCta={() => checkout(PADDLE_PRICES.beginnerMonthly)}
          />
          <PricingCard
            index={2}
            variant="pro"
            name="Pro"
            price={proCard.price}
            priceUnit="/mo"
            oldPrice={proCard.oldPrice}
            billedNote={proCard.billedNote}
            description="Mocks, AI Examiner & custom practice"
            featuresHeader="Everything in Free, plus:"
            features={PRO_FEATURES}
            cta={paymentsOpen ? "Choose Pro →" : "Payments open soon"}
            disabled={!paymentsOpen}
            badge="Most Popular"
            onCta={() => checkout(annual ? PADDLE_PRICES.annualPro : PADDLE_PRICES.proMonthly)}
          />
        </div>

        {/* Annual Pro card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: 1000,
            margin: "16px auto 0",
            padding: "28px 32px",
            borderRadius: 24,
            border: "1px solid rgba(255,215,0,0.15)",
            background: "rgba(255,215,0,0.03)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--sch-text)" }}>Annual Pro</span>
              <span
                style={{
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: 8,
                  background: "rgba(255,215,0,0.1)",
                  color: "rgba(255,215,0,0.8)",
                  border: "1px solid rgba(255,215,0,0.2)",
                }}
              >
                Save 33%
              </span>
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                marginTop: 6,
                background: GOLD,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                width: "fit-content",
              }}
            >
              $119.99/year
            </div>
            <div style={{ fontSize: 13, color: TEXT2, marginTop: 4 }}>
              = $10.00/month · Billed annually
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 380 }}>
            {[
              "✓ Everything in Pro",
              "✓ Covers multiple sittings per year",
              "✓ Priority AI generation",
              "✓ Best value — $10.00/mo",
            ].map((p) => (
              <span
                key={p}
                style={{
                  fontSize: 12,
                  padding: "5px 12px",
                  borderRadius: 12,
                  background: "var(--sch-card)",
                  border: "1px solid var(--sch-border)",
                  color: "var(--sch-tx-2)",
                }}
              >
                {p}
              </span>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => checkout(PADDLE_PRICES.annualPro)}
            whileHover={paymentsOpen ? { scale: 1.03 } : undefined}
            whileTap={paymentsOpen ? { scale: 0.97 } : undefined}
            style={{
              padding: "12px 32px",
              borderRadius: 14,
              border: paymentsOpen ? "none" : "1px solid var(--sch-border-2)",
              background: paymentsOpen ? GOLD : "var(--sch-card)",
              color: paymentsOpen ? "var(--sch-bg-2)" : TEXT2,
              fontWeight: 800,
              fontSize: 15,
              whiteSpace: "nowrap",
              cursor: paymentsOpen ? "pointer" : "not-allowed",
              boxShadow: paymentsOpen ? "0 0 30px rgba(255,215,0,0.2)" : "none",
            }}
          >
            {paymentsOpen ? "Choose Annual →" : "Payments open soon"}
          </motion.button>
        </motion.div>

        {/* Honest status. The trial only exists once accounts are open; the free
            plan itself never has a clock either way. */}
        <p style={{ textAlign: "center", fontSize: 13, color: TEXT2, marginTop: 24, lineHeight: 1.7 }}>
          {accountsOpen
            ? "Every new account starts with 7 days of Pro free — no card. When it ends you keep the full free plan, with no clock. Cancel a paid plan anytime."
            : "Accounts aren't open yet. When they are, every new account starts with 7 days of Pro free, then keeps the full free plan with no clock."}
          <br />
          Beginner and Pro unlock the same study modes right now; if that changes, this page changes
          with it.
        </p>

        {/* Comparison table */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            style={{
              background: "transparent",
              border: "none",
              color: TEXT2,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {showTable ? "Hide comparison ↑" : "Show full comparison ↓"}
          </button>
        </div>
        <AnimatePresence>
          {showTable && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  marginTop: 16,
                  borderRadius: 20,
                  border: "1px solid var(--sch-border)",
                  overflow: "hidden",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                    <thead>
                      <tr style={{ background: "var(--sch-bg-2)" }}>
                        {["Feature", "Free", "Beginner", "Pro", "Annual Pro"].map((h, i) => (
                          <th
                            key={h}
                            style={{
                              padding: "12px 20px",
                              fontSize: 12,
                              letterSpacing: "0.06em",
                              color: TEXT2,
                              textAlign: i === 0 ? "left" : "center",
                              fontWeight: 600,
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.map((row, ri) => (
                        <tr
                          key={row[0]}
                          style={{
                            background: ri % 2 === 0 ? "var(--sch-card)" : "transparent",
                          }}
                        >
                          <td
                            style={{
                              padding: "14px 20px",
                              fontSize: 14,
                              color: "var(--sch-tx-1)",
                            }}
                          >
                            {row[0]}
                          </td>
                          {row.slice(1).map((v, ci) => (
                            <td key={ci} style={{ padding: "14px 20px", textAlign: "center" }}>
                              <ComparisonCell value={v} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ */}
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--sch-text)",
            textAlign: "center",
            marginTop: 56,
            marginBottom: 20,
          }}
        >
          Frequently asked questions
        </h2>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {FAQS.map(([q, a]) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </div>
  )
}
