import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth"
import { openCheckout, PADDLE_PRICES } from "@/lib/paddle"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import PricingCard, { type PlanFeature } from "@/components/PricingCard"

/* ──────────────────────────────────────────────────────────────
 *  Public pricing page (/pricing) — plans, comparison table, FAQ.
 * ────────────────────────────────────────────────────────────── */

const TEXT2 = "rgba(240,238,255,0.4)"
const GOLD = "linear-gradient(135deg,#FFD700,#FFA500)"

const FREE_FEATURES: PlanFeature[] = [
  { text: "1 active learning goal" },
  { text: "AI plan by Lara (7 days)" },
  { text: "Daily text coach messages" },
  { text: "Life Shields (2 per week)" },
  { text: "Basic progress tracking" },
  { text: "Best Resource Today" },
  { text: "Weekly quiz (Gemini AI)" },
  { text: "Goal cover art" },
]

const BEGINNER_FEATURES: PlanFeature[] = [
  { text: "Unlimited learning goals" },
  { text: "Daily text coach Lara" },
  { text: "Best Resource Today (Perplexity AI)" },
  { text: "Weekly progress report card" },
  { text: "Shareable milestone cards" },
  { text: "Life Shields (2 per week)" },
  { text: "Progress heatmap calendar" },
  { text: "Weekly challenge quiz" },
]

const PRO_FEATURES: PlanFeature[] = [
  { text: "🎙 Voice coach Lara (ElevenLabs)", badge: "PRO" },
  { text: "🎤 Speaking practice + AI scoring" },
  { text: "🎬 Milestone cinematic videos (Higgsfield)", badge: "NEW" },
  { text: "📜 Goal completion certificate" },
  { text: "🎵 Learning anthem (Suno AI)" },
  { text: "📅 Google Calendar sync" },
  { text: "👥 Accountability partner" },
  { text: "🛡 Life Shields — 5 per week" },
]

const COMPARISON: Array<[string, string, string, string, string]> = [
  ["Active goals", "1", "Unlimited", "Unlimited", "Unlimited"],
  ["AI plan by Lara", "✓", "✓", "✓", "✓"],
  ["Daily coach messages", "3/week", "✓", "✓", "✓"],
  ["Voice coach (Lara)", "—", "—", "✓", "✓"],
  ["Speaking practice", "—", "—", "✓", "✓"],
  ["Milestone videos", "—", "—", "✓", "✓"],
  ["Life Shields", "2/week", "2/week", "5/week", "5/week"],
  ["Goal certificate", "—", "—", "✓", "✓"],
  ["Learning anthem", "—", "—", "✓", "✓"],
  ["Year Rewind video", "—", "—", "—", "✓"],
  ["Priority AI", "—", "—", "—", "✓"],
  ["Calendar sync", "—", "—", "✓", "✓"],
]

const FAQS: Array<[string, string]> = [
  [
    "Can I cancel anytime?",
    "Yes. Cancel from Settings anytime. Your plan stays active until the period ends. No questions, no forms, no hidden steps.",
  ],
  [
    "What happens after my free trial?",
    "After 7 days, choose a paid plan or your account switches to the free tier. Your streak and progress are always saved.",
  ],
  [
    "Does Scholify work for any learning goal?",
    "Yes. IELTS, Python, Figma, Chinese, AWS, fitness, reading — Lara has built plans for all of these. If you can describe it, Lara can plan it.",
  ],
  [
    "How is Scholify different from Duolingo?",
    "Duolingo is for languages only and punishes missed days. Scholify works for any goal, never punishes misses, and adapts your plan when life gets in the way.",
  ],
]

/* ── Comparison table ────────────────────────────────────────── */

function ComparisonCell({ value }: { value: string }) {
  if (value === "✓")
    return <span style={{ ...iriText, fontWeight: 800 }}>✓</span>
  if (value === "—")
    return <span style={{ color: "rgba(240,238,255,0.2)" }}>—</span>
  return <span style={{ color: "rgba(240,238,255,0.7)", fontSize: 13 }}>{value}</span>
}

/* ── FAQ item ────────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen((v) => !v)}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: 20,
        marginBottom: 8,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#F0EEFF" }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          style={{ fontSize: 20, color: TEXT2, flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </div>
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
                color: "rgba(240,238,255,0.45)",
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

  const flash = (msg: string) => {
    setNotice(msg)
    setTimeout(() => setNotice(null), 2800)
  }

  const checkout = (priceId: string | undefined) => {
    if (!openCheckout(priceId, user?.email)) {
      flash("Checkout is being set up — coming soon ✦")
    }
  }

  const beginnerCard = useMemo(
    () => ({
      price: annual ? "$4.17" : "$6.99",
      oldPrice: annual ? "$6.99" : undefined,
      billedNote: annual ? "Billed as $49.99/yr" : undefined,
    }),
    [annual],
  )
  const proCard = useMemo(
    () => ({
      price: annual ? "$7.92" : "$13.99",
      oldPrice: annual ? "$13.99" : undefined,
      billedNote: annual ? "Billed as $94.99/yr" : undefined,
    }),
    [annual],
  )

  return (
    <div style={{ minHeight: "100dvh", background: "#050508" }}>
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
        <Link to="/" style={{ textDecoration: "none", fontSize: 18, fontWeight: 800, ...iriText }}>
          ✦ Scholify
        </Link>
        <Link
          to={user ? "/dashboard" : "/sign-in"}
          style={{ fontSize: 14, color: "rgba(240,238,255,0.55)", textDecoration: "none" }}
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
              border: "1px solid rgba(139,92,246,0.3)",
              background: "rgba(139,92,246,0.06)",
              color: "rgba(192,132,252,0.9)",
            }}
          >
            PRICING
          </span>
          <h1
            style={{
              fontSize: "clamp(36px,4vw,56px)",
              fontWeight: 900,
              color: "#F0EEFF",
              letterSpacing: "-2px",
              marginTop: 20,
              lineHeight: 1.05,
            }}
          >
            Simple, honest pricing.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(240,238,255,0.4)", marginTop: 12 }}>
            Start free for 7 days. Upgrade when you're ready.
          </p>

          {/* Billing toggle */}
          <div
            style={{
              display: "inline-flex",
              marginTop: 32,
              padding: 4,
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
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
                      Save 43%
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
                style={{ fontSize: 13, color: "#C084FC", marginTop: 16 }}
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
            name="Free Trial"
            price="$0"
            priceUnit="7 days"
            description="Try everything free. No card needed."
            features={FREE_FEATURES}
            cta="Start free trial"
            onCta={() => (window.location.href = user ? "/dashboard" : "/sign-up")}
          />
          <PricingCard
            index={1}
            variant="beginner"
            name="Beginner"
            price={beginnerCard.price}
            priceUnit="/mo"
            oldPrice={beginnerCard.oldPrice}
            billedNote={beginnerCard.billedNote}
            description="For consistent learners"
            featuresHeader="Everything in Free, plus:"
            features={BEGINNER_FEATURES}
            cta="Choose Beginner"
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
            description="The full Scholify experience"
            featuresHeader="Everything in Beginner, plus:"
            features={PRO_FEATURES}
            cta="Choose Pro →"
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
              <span style={{ fontSize: 18, fontWeight: 700, color: "#F0EEFF" }}>Annual Pro</span>
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
                Save 43%
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
              $94.99/year
            </div>
            <div style={{ fontSize: 13, color: TEXT2, marginTop: 4 }}>
              = $7.92/month · Billed annually
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 380 }}>
            {[
              "✓ Everything in Pro",
              "✓ 5 shields per week",
              "✓ Year Rewind video",
              "✓ Priority AI generation",
            ].map((p) => (
              <span
                key={p}
                style={{
                  fontSize: 12,
                  padding: "5px 12px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(240,238,255,0.5)",
                }}
              >
                {p}
              </span>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => checkout(PADDLE_PRICES.annualPro)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "12px 32px",
              borderRadius: 14,
              border: "none",
              background: GOLD,
              color: "#0A0A14",
              fontWeight: 800,
              fontSize: 15,
              whiteSpace: "nowrap",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(255,215,0,0.2)",
            }}
          >
            Choose Annual →
          </motion.button>
        </motion.div>

        {/* Trial note */}
        <p style={{ textAlign: "center", fontSize: 13, color: TEXT2, marginTop: 24, lineHeight: 1.7 }}>
          All plans include a 7-day free trial.
          <br />
          Cancel anytime. No questions asked.
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
                  border: "1px solid rgba(255,255,255,0.07)",
                  overflow: "hidden",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                    <thead>
                      <tr style={{ background: "#0A0A0F" }}>
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
                            background: ri % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                          }}
                        >
                          <td
                            style={{
                              padding: "14px 20px",
                              fontSize: 14,
                              color: "rgba(240,238,255,0.6)",
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
            color: "#F0EEFF",
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
