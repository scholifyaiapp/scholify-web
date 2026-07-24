import { useState, type CSSProperties, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ScholifyLockup } from "@/components/brand"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { applyToAffiliate, type AffiliateApplication } from "@/lib/affiliate"
import PaymentMethods from "@/components/PaymentMethods"
import { Download, FileText } from "lucide-react"

/* ──────────────────────────────────────────────────────────────
 *  /partners/apply — the Scholify Preferred Partner landing.
 *  Mirrors the printed partner offer: earn 25–35% on every
 *  Beginner/Pro sale, F1 Qatar 2026 podium bonus, and apply.
 * ────────────────────────────────────────────────────────────── */

const MONO = "ui-monospace, 'JetBrains Mono', 'SFMono-Regular', monospace"
const GOLD = "#F4A405"

/* Reveal-on-scroll helper (reduced-motion safe). */
function useRise() {
  const reduced = useReducedMotion()
  return (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        }
}

const eyebrow: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--sch-tx-2)",
}
const secHead: CSSProperties = {
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#C80000",
  marginBottom: 16,
}
const card: CSSProperties = {
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  borderRadius: 16,
  padding: 20,
}
const field: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid var(--sch-border)",
  background: "var(--sch-bg)",
  color: "var(--sch-text)",
  fontSize: 15,
  outline: "none",
}
const labelStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "var(--sch-tx-1)",
  marginBottom: 6,
  display: "block",
}

function Section({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <section style={{ marginTop: 64, ...style }}>{children}</section>
}

/* ── Content ─────────────────────────────────────────────────── */

const STATS: Array<[string, string]> = [
  ["530,100", "ACCA students worldwide, in 180 countries"],
  ["~100,000", "New students register every single year"],
  ["~400,000", "Exam entries a year across 4 sittings"],
  ["$130M", "Annual ACCA digital self-study market"],
]

const WHY: Array<[string, string]> = [
  ["Real, finished product", "A live, paying app across all 15 ACCA papers — students see the value immediately, which converts."],
  ["The AI Examiner", "Marks written answers against the rubric in seconds — something students normally wait days for."],
  ["Charles, the AI mentor", "A race-engineer persona that plans each student's route to the exam and keeps them on track daily."],
  ["Built for your market", "Designed for the emerging markets where ACCA is growing fastest — exactly where your audience is."],
]

const GET: Array<[string, string]> = [
  ["Your link & promo code", "A unique tracked link and code — every click and sale is attributed to you automatically."],
  ["Brand asset kit", "Logos, ready-made post & reel templates and copy, so you can publish in minutes."],
  ["Live earnings dashboard", "See clicks, sales, and your pending and cleared balance in real time."],
  ["A direct line to the founder", "Priority support and a say in what we build — you're early, and it counts."],
]

const PLANS: Array<[string, string, string]> = [
  ["Beginner", "$9.99/mo", "$2.70"],
  ["Pro", "$14.99/mo", "$4.05"],
  ["Annual Pro", "$119.99/yr", "$32.40"],
]

const LADDER: Array<[string, string, boolean]> = [
  ["100", "$405", false],
  ["300", "$1,215", false],
  ["500", "$2,025", false],
  ["1,000", "$4,050", true],
]

const STEPS = [
  {
    title: "Send your application",
    label: "Apply",
    detail: "Tell us about you, your audience and where you plan to promote Scholify. You’ll receive an email confirming that your request is pending review.",
  },
  {
    title: "Get personally reviewed",
    label: "Review",
    detail: "Our founder reviews every application. We’ll email you with the decision, so you always know where your application stands.",
  },
  {
    title: "Receive your partner link",
    label: "Activate",
    detail: "Once approved, you receive your unique referral link and partner code. Your dashboard becomes the home for your clicks, sales and commissions.",
  },
  {
    title: "Share Scholify",
    label: "Promote",
    detail: "Use your link in study groups, campus networks, LinkedIn, Reddit or social content. Promote honestly to ACCA students who will genuinely benefit.",
  },
  {
    title: "Stripe tracks the sale",
    label: "Sell",
    detail: "Your referred student pays Scholify securely through Stripe. You never handle their card details; a qualifying purchase is attributed to your partner account.",
  },
  {
    title: "Your 27% commission clears",
    label: "Earn",
    detail: "The sale and commission appear in your dashboard as pending. After the 30-day validation period, eligible commission can move toward payout.",
  },
]

const CHANNELS: Array<[string, string]> = [
  ["Networking", "Your class, campus, study groups and professional circles — the warmest audience of all."],
  ["LinkedIn & Reddit", "Posts, threads and communities where ACCA students actively look for help."],
  ["Social content", "Create posts, reels & stories for the Scholify brand on Instagram, TikTok & Facebook."],
  ["We equip you", "Brand assets, post & reel templates and your tracked link — so everything you publish counts."],
]

/* ── Page ────────────────────────────────────────────────────── */

export default function PartnersApply() {
  const reduced = useReducedMotion()
  const rise = useRise()
  const [form, setForm] = useState<AffiliateApplication>({ name: "", email: "" })
  const [agree, setAgree] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<{ code: string } | null>(null)

  const set = (k: keyof AffiliateApplication) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter your name and a valid email.")
      return
    }
    if (!agree) {
      setError("Please accept the partner terms to continue.")
      return
    }
    setBusy(true)
    const res = await applyToAffiliate(form)
    setBusy(false)
    if (res.ok && res.code) setDone({ code: res.code })
    else
      setError(
        res.reason === "not_configured"
          ? "Applications open soon — check back shortly."
          : "Couldn't submit — please try again.",
      )
  }

  const scrollTo = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })

  return (
    <div style={{ minHeight: "100dvh", background: "var(--sch-bg)" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          maxWidth: 1040,
          margin: "0 auto",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", display: "inline-flex" }} aria-label="Scholify">
          <ScholifyLockup size={24} color="var(--sch-text)" />
        </Link>
        <Link to="/partners" style={{ fontSize: 14, color: "var(--sch-tx-1)", textDecoration: "none" }}>
          Partner dashboard →
        </Link>
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px 100px" }}>
        {/* ── Hero ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", paddingTop: 40 }}
        >
          <div style={{ ...eyebrow, marginBottom: 16, paddingTop: 8 }}>Scholify · Preferred Partner Program</div>
          <h1
            style={{
              fontSize: "clamp(30px,6.4vw,52px)",
              fontWeight: 800,
              lineHeight: 1.03,
              letterSpacing: "-0.025em",
              color: "var(--sch-text)",
              margin: "0 auto 16px",
              maxWidth: 780,
            }}
          >
            Earn <span style={iriText}>27%</span> on every student you bring to Scholify.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--sch-tx-2)",
              lineHeight: 1.6,
              maxWidth: 600,
              margin: "0 auto 28px",
              fontWeight: 500,
            }}
          >
            You've been hand-picked as a Scholify Preferred Partner. Introduce the students you already reach to the
            app that helps them pass ACCA — and earn a real commission on every plan they buy, tracked end-to-end and
            paid on time.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              type="button"
              onClick={scrollTo("apply")}
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              style={{
                padding: "14px 26px",
                borderRadius: 14,
                border: "none",
                background: IRIDESCENT,
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Apply to become a partner
            </motion.button>
            <motion.a
              href="/partners/Scholify-Partnership-Offer.pdf"
              download="Scholify-Partnership-Offer.pdf"
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              style={{
                padding: "14px 26px",
                borderRadius: 14,
                border: "1px solid var(--sch-border)",
                background: "var(--sch-card)",
                color: "var(--sch-text)",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
              }}
              aria-label="Download the Scholify Partnership Offer as a PDF"
            >
              <Download size={18} aria-hidden /> Download partnership offer
            </motion.a>
          </div>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              color: "var(--sch-tx-2)",
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            <FileText size={14} aria-hidden />
            <span>PDF · 716 KB · Program overview and commercial terms</span>
          </div>
          <button
            type="button"
            onClick={scrollTo("how")}
            style={{
              marginTop: 12,
              border: 0,
              padding: 0,
              background: "transparent",
              color: "#C80000",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            Or read how the programme works online
          </button>
        </motion.div>

        {/* ── What is Scholify ── */}
        <motion.div
          {...rise()}
          style={{
            ...card,
            marginTop: 56,
            borderLeft: "3px solid #C80000",
            display: "flex",
            gap: 18,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 340px" }}>
            <div style={{ ...eyebrow, fontSize: 10, color: "#C80000", marginBottom: 8 }}>What is Scholify</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--sch-tx-1)", fontWeight: 500 }}>
              <b style={{ color: "var(--sch-text)" }}>Scholify is the AI-native way to pass ACCA.</b> All 15 papers
              (BT → AAA) with 2,400+ expert-written questions, an <b style={{ color: "var(--sch-text)" }}>AI Examiner</b>{" "}
              that marks written answers in seconds, timed mock exams, a live Exam Readiness Score, and{" "}
              <b style={{ color: "var(--sch-text)" }}>Charles</b> — an AI race-engineer mentor who builds and adjusts
              each student's study plan. A finished, paying product students feel value from on day one — not a
              waitlist.
            </p>
          </div>
        </motion.div>

        {/* ── Market ── */}
        <Section>
          <motion.div {...rise()} style={secHead}>
            The market you'd be selling into
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
            {STATS.map(([n, l], i) => (
              <motion.div key={l} {...rise(i * 0.06)} whileHover={{ y: -4, transition: { duration: 0.2 } }} style={card}>
                <div style={{ fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: "-0.01em", ...iriText }}>
                  {n}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--sch-tx-2)", marginTop: 6, lineHeight: 1.4 }}>{l}</div>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: 11.5, color: "var(--sch-tx-2)", marginTop: 12, lineHeight: 1.5 }}>
            Sources: ACCA official reporting (students, members, entries) · Scholify market model (category revenue).
            Emerging-market centre of gravity: India, China, Pakistan, Malaysia & Central Asia.
          </p>
        </Section>

        {/* ── Commission + F1 bonus ── */}
        <Section>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: 24, alignItems: "start" }} className="partners-cols">
            {/* commission */}
            <div>
              <motion.div {...rise()} style={secHead}>
                Your commission
              </motion.div>
              <motion.p {...rise(0.05)} style={{ fontSize: 16, lineHeight: 1.6, color: "var(--sch-tx-1)", fontWeight: 500 }}>
                You earn a <b style={{ color: "var(--sch-text)" }}>flat 27% of every Beginner or Pro plan</b> you sell
                through your link and code — the same rate for every partner. The program opens on{" "}
                <b style={{ color: "var(--sch-text)" }}>10 August 2026</b>.
              </motion.p>

              <motion.div {...rise(0.1)} style={{ ...card, marginTop: 18, padding: 0, overflow: "hidden" }}>
                <RowHead a="Plan" b="You earn per sale (27%)" />
                {PLANS.map(([name, price, earn]) => (
                  <Row
                    key={name}
                    a={
                      <>
                        <b style={{ color: "var(--sch-text)", fontWeight: 700 }}>{name}</b>{" "}
                        <span style={{ fontFamily: MONO, fontSize: 12, color: "var(--sch-tx-2)" }}>{price}</span>
                      </>
                    }
                    b={<span style={{ fontFamily: MONO, fontWeight: 700 }}>{earn}</span>}
                  />
                ))}
              </motion.div>

              <motion.div {...rise(0.15)} style={{ ...secHead, marginTop: 30 }}>
                What volume looks like
              </motion.div>
              <motion.div {...rise(0.18)} style={{ ...card, padding: 0, overflow: "hidden" }}>
                <RowHead a="Verified sales" b="Illustrative earnings*" />
                {LADDER.map(([sales, earn, hi]) => (
                  <Row
                    key={sales}
                    hi={hi}
                    a={<span style={{ fontFamily: MONO, fontWeight: 700, ...(hi ? iriText : {}) }}>{sales}</span>}
                    b={<span style={{ fontFamily: MONO, fontWeight: 700, ...(hi ? iriText : {}) }}>{earn}</span>}
                  />
                ))}
              </motion.div>
              <p style={{ fontSize: 11.5, color: "var(--sch-tx-2)", marginTop: 10, lineHeight: 1.5 }}>
                *At Pro pricing ($14.99) × 27%. Annual plans pay considerably more per sale. Plans, prices and discounts
                are set by Scholify and may change — your 27% partner rate stays the same. Commissions clear 30 days
                after purchase and are void on refunds or chargebacks.
              </p>
            </div>

            {/* F1 race rewards — two tiers */}
            <motion.div {...rise(0.1)}>
              <div style={{ ...secHead, display: "flex", alignItems: "center", gap: 8 }}>
                {!reduced && (
                  <motion.span
                    aria-hidden
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 7, height: 7, borderRadius: 999, background: GOLD, display: "inline-block", boxShadow: `0 0 8px ${GOLD}` }}
                  />
                )}
                Race rewards — worth the effort
              </div>
              <motion.div
                initial={reduced ? false : { scale: 0.94, opacity: 0 }}
                whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={reduced ? undefined : { scale: 1.015 }}
                animate={
                  reduced
                    ? undefined
                    : {
                        boxShadow: [
                          "0 0 0 1px rgba(244,164,5,0.35), 0 10px 30px -14px rgba(244,164,5,0.25)",
                          "0 0 0 1px rgba(244,164,5,0.85), 0 20px 50px -8px rgba(244,164,5,0.55)",
                          "0 0 0 1px rgba(244,164,5,0.35), 0 10px 30px -14px rgba(244,164,5,0.25)",
                        ],
                      }
                }
                transition={{
                  boxShadow: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{
                  borderRadius: 18,
                  padding: 22,
                  color: "#fff",
                  background: "linear-gradient(135deg,#1b1b22 0%,#2a1215 60%,#3a0d1e 100%)",
                  border: "1px solid rgba(244,164,5,0.4)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* periodic gold shimmer sweep (screen-blend gleam) */}
                {!reduced && (
                  <motion.div
                    aria-hidden
                    initial={{ x: "-130%" }}
                    animate={{ x: "130%" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: "55%",
                      background:
                        "linear-gradient(105deg, transparent, rgba(244,164,5,0.22) 45%, rgba(255,255,255,0.32) 50%, rgba(244,164,5,0.22) 55%, transparent)",
                      mixBlendMode: "screen",
                      pointerEvents: "none",
                    }}
                  />
                )}
                <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD }}>
                  ◆ Sell more. Go to the race.
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.15, marginTop: 8, letterSpacing: "-0.01em" }}>
                  The more you sell, the bigger the trip — on us.
                </h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.5, marginTop: 8, color: "#c9c6bf" }}>
                  These rewards are <b style={{ color: "#fff" }}>on top of your 27% commission</b>. Fitting, too — your
                  Scholify coach, Charles, is a race engineer.
                </p>

                {/* Tier 1 — Podium */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: GOLD }}>
                    ◆ 1,000 SALES · BY 1 OCT 2026
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.45, marginTop: 5, color: "#e7e2dd" }}>
                    A <b style={{ color: "#fff" }}>Grand Prix ticket</b> to the{" "}
                    <b style={{ color: "#fff" }}>Formula 1® Qatar Grand Prix 2026</b> — Lusail, 27–29 Nov 2026.
                  </p>
                </div>

                <div style={{ height: 1, background: "rgba(244,164,5,0.28)", margin: "16px 0" }} />

                {/* Tier 2 — Grand Prize */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#fff" }}>
                      ★ 2,000 PRO SALES · BY 1 NOV 2026
                    </span>
                    <motion.span
                      animate={
                        reduced
                          ? undefined
                          : { boxShadow: ["0 0 0 0 rgba(244,164,5,0.7)", "0 0 0 7px rgba(244,164,5,0)"] }
                      }
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      style={{
                        fontFamily: MONO,
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: GOLD,
                        color: "#2a1215",
                      }}
                    >
                      GRAND PRIZE
                    </motion.span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.45, marginTop: 6, color: "#e7e2dd" }}>
                    The full trip to the <b style={{ color: "#fff" }}>Formula 1® Abu Dhabi Grand Prix 2026</b> —
                    Yas Marina, 4–6 Dec 2026:
                  </p>
                  <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 5 }}>
                    {[
                      "Return flights, there & back — we book and pay",
                      "Grand Prix weekend tickets at Yas Marina",
                      "Race day at the season finale, on Scholify",
                    ].map((li) => (
                      <li key={li} style={{ fontSize: 12.5, lineHeight: 1.4, color: "#e7e2dd", display: "flex", gap: 8 }}>
                        <span style={{ color: GOLD, flexShrink: 0 }}>✦</span>
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ height: 1, background: "rgba(244,164,5,0.28)", margin: "16px 0" }} />
                <p style={{ fontSize: 11, lineHeight: 1.45, color: "#c9c6bf" }}>
                  Your progress toward each reward is tracked in your partner dashboard. Sales counts, dates and
                  eligibility are verified by Scholify; race dates per the official 2026 F1 calendar.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* ── How it works ── */}
        <Section style={{ scrollMarginTop: 24 }}>
          <div id="how" />
          <motion.div {...rise()} style={secHead}>
            How the Partner Programme works
          </motion.div>
          <motion.p {...rise(0.04)} style={{ fontSize: 16, lineHeight: 1.65, color: "var(--sch-tx-1)", maxWidth: 720, margin: "0 0 22px", fontWeight: 500 }}>
            From application to commission, the process is simple and transparent. Here’s exactly what happens at
            every step.
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14 }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.title} {...rise(i * 0.05)} whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ ...card, position: "relative", overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", right: -34, top: -34, background: "rgba(200,0,0,0.055)" }} />
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: IRIDESCENT,
                    color: "#fff",
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#C80000", marginBottom: 7 }}>
                  {step.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "var(--sch-text)", marginBottom: 7 }}>{step.title}</div>
                <div style={{ fontSize: 13.5, color: "var(--sch-tx-2)", lineHeight: 1.58 }}>{step.detail}</div>
              </motion.div>
            ))}
          </div>
          <motion.div
            {...rise(0.28)}
            style={{
              marginTop: 16,
              padding: "16px 18px",
              borderRadius: 14,
              background: "rgba(244,164,5,0.08)",
              border: "1px solid rgba(244,164,5,0.24)",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <span aria-hidden style={{ color: GOLD, fontSize: 18, lineHeight: 1 }}>◆</span>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--sch-tx-1)" }}>
              <b style={{ color: "var(--sch-text)" }}>A qualifying sale</b> is a completed Scholify plan purchase
              attributed to your active link or code. Refunded or charged-back purchases do not earn commission.
              Final payout timing and payment details are confirmed when your partner account is activated.
            </div>
          </motion.div>
        </Section>

        {/* ── Why it sells / What you get ── */}
        <Section>
          <SectionTitle>Why it sells itself</SectionTitle>
          <CardGrid items={WHY} rise={rise} />
          <SectionTitle style={{ marginTop: 48 }}>What you get as a Preferred Partner</SectionTitle>
          <CardGrid items={GET} rise={rise} />
        </Section>

        {/* ── Promotion channels ── */}
        <Section>
          <SectionTitle>Where &amp; how you promote</SectionTitle>
          <CardGrid items={CHANNELS} rise={rise} />
        </Section>

        {/* ── Secure payments ── */}
        <Section>
          <PaymentMethods />
        </Section>

        {/* ── Application form ── */}
        <Section style={{ scrollMarginTop: 24 }}>
          <div id="apply" />
          <motion.div
            {...rise()}
            style={{ ...card, borderRadius: 22, padding: "clamp(22px,4vw,36px)", maxWidth: 720, margin: "0 auto" }}
          >
            {done ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <motion.div
                    initial={reduced ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: IRIDESCENT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 30,
                      fontWeight: 800,
                    }}
                  >
                    ✓
                  </motion.div>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--sch-text)", margin: "0 0 8px" }}>
                  Application received
                </h2>
                <p style={{ fontSize: 15, color: "var(--sch-tx-2)", lineHeight: 1.6, maxWidth: 440, margin: "0 auto 18px" }}>
                  We'll review it and email you when your partner account is live. Your code will be:
                </p>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: MONO,
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    padding: "10px 22px",
                    borderRadius: 12,
                    color: "#fff",
                    background: IRIDESCENT,
                  }}
                >
                  {done.code}
                </div>
                <div style={{ marginTop: 22 }}>
                  <Link to="/partners" style={{ fontSize: 14, fontWeight: 600, color: "var(--sch-tx-1)", textDecoration: "none" }}>
                    Go to your partner dashboard →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div style={{ ...eyebrow, fontSize: 10, color: "#C80000", marginBottom: 8 }}>Join the program</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--sch-text)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                  Apply to become a partner
                </h2>
                <p style={{ fontSize: 13.5, color: "var(--sch-tx-2)", margin: "0 0 18px", lineHeight: 1.5 }}>
                  Send your details and they go straight to our founder. Questions? Email{" "}
                  <a href="mailto:scholifyaiapp@gmail.com" style={{ color: "#C80000", fontWeight: 600, textDecoration: "none" }}>
                    scholifyaiapp@gmail.com
                  </a>
                  .
                </p>
                <div style={{ display: "grid", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Full name *</label>
                      <input style={field} value={form.name} onChange={set("name")} placeholder="Jane Doe" autoComplete="name" />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input style={field} value={form.email} onChange={set("email")} placeholder="you@email.com" type="email" autoComplete="email" />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={labelStyle}>University</label>
                      <input style={field} value={form.university ?? ""} onChange={set("university")} placeholder="LSE" />
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <input style={field} value={form.country ?? ""} onChange={set("country")} placeholder="United Kingdom" autoComplete="country-name" />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Where will you promote? (LinkedIn, Reddit, Instagram, TikTok, class…)</label>
                    <input style={field} value={form.socials ?? ""} onChange={set("socials")} placeholder="@yourhandle / channel / community" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Audience size</label>
                      <input style={field} value={form.audienceSize ?? ""} onChange={set("audienceSize")} placeholder="e.g. 3,000" />
                    </div>
                    <div>
                      <label style={labelStyle}>Preferred code</label>
                      <input style={field} value={form.code ?? ""} onChange={set("code")} placeholder="JANE (A–Z, 0–9)" />
                    </div>
                  </div>

                  <label
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      fontSize: 13.5,
                      color: "var(--sch-tx-2)",
                      lineHeight: 1.5,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      style={{ marginTop: 3, width: 18, height: 18, accentColor: "#C80000", flexShrink: 0 }}
                    />
                    <span>
                      I agree to the Scholify partner terms: I'll promote honestly, won't bid on Scholify's brand terms
                      or spam, and understand the 27% commission clears 30 days after purchase and is void on
                      refunds/chargebacks.
                    </span>
                  </label>

                  {error && (
                    <div
                      role="alert"
                      style={{
                        fontSize: 13.5,
                        color: "#C80000",
                        background: "rgba(200,0,0,0.06)",
                        border: "1px solid rgba(200,0,0,0.2)",
                        borderRadius: 10,
                        padding: "10px 12px",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    style={{
                      width: "100%",
                      padding: "14px 20px",
                      borderRadius: 14,
                      border: "none",
                      background: IRIDESCENT,
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: busy ? "default" : "pointer",
                      opacity: busy ? 0.7 : 1,
                    }}
                  >
                    {busy ? "Submitting…" : "Apply now"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </Section>

        {/* ── Founder signature ── */}
        <Section>
          <motion.div
            {...rise()}
            style={{ ...card, borderRadius: 20, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}
          >
            <div style={{ flex: "1 1 340px" }}>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--sch-tx-1)", fontWeight: 500, margin: 0 }}>
                Scholify is early, ambitious and moving fast — and the partners who join us now will grow with it. If
                that sounds like you, I'd be glad to have you on the team.
              </p>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: "var(--sch-text)" }}>Makhmudov Nuriddin</div>
                <div style={{ fontSize: 13.5, color: "var(--sch-tx-2)", marginTop: 1 }}>CEO &amp; Founder, Scholify</div>
                <div style={{ fontFamily: MONO, fontSize: 13, color: "#C80000", marginTop: 2 }}>scholifyaiapp@gmail.com</div>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollTo("apply")}
              style={{
                padding: "14px 26px",
                borderRadius: 14,
                border: "none",
                background: IRIDESCENT,
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Apply now
            </button>
          </motion.div>

          <p style={{ fontSize: 11, color: "var(--sch-tx-2)", lineHeight: 1.55, marginTop: 20, textAlign: "center", maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            This is an invitation to join the Scholify Preferred Partner Program and is not a binding contract; final
            terms, the exact commission percentage and reward details are confirmed on activation at launch (10 August
            2026). Scholify is an independent ACCA study tool and is not affiliated with or endorsed by ACCA; ACCA is a
            registered trademark of the Association of Chartered Certified Accountants. "Formula 1", "F1", "Grand Prix"
            and related marks are trademarks of Formula One Licensing BV; the Qatar and Abu Dhabi Grand Prix rewards
            (including flights and tickets) are provided by Scholify and are not sponsored or endorsed by any Formula 1
            entity. Reward sales counts, dates and eligibility are verified by Scholify; race dates per the official
            2026 F1 calendar. © 2026 Scholify.
          </p>
        </Section>
      </div>

      {/* responsive: stack the commission columns on small screens */}
      <style>{`@media (max-width: 760px){ .partners-cols{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

/* ── Small building blocks ───────────────────────────────────── */

function SectionTitle({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const reduced = useReducedMotion()
  return (
    <div style={{ textAlign: "center", marginBottom: 28, ...style }}>
      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(5px)" }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "clamp(22px,4vw,30px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--sch-text)",
          margin: 0,
        }}
      >
        {children}
      </motion.h2>
      <motion.div
        aria-hidden
        initial={reduced ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: 56, height: 3, borderRadius: 3, background: IRIDESCENT, margin: "14px auto 0", transformOrigin: "center" }}
      />
    </div>
  )
}

function CardGrid({ items, rise }: { items: Array<[string, string]>; rise: (d?: number) => object }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
      {items.map(([t, d], i) => (
        <motion.div
          key={t}
          {...rise(i * 0.05)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          style={card}
        >
          <div style={{ fontSize: 15, fontWeight: 800, ...iriText, marginBottom: 4 }}>{t}</div>
          <div style={{ fontSize: 13, color: "var(--sch-tx-2)", lineHeight: 1.5 }}>{d}</div>
        </motion.div>
      ))}
    </div>
  )
}

function RowHead({ a, b }: { a: string; b: string }) {
  const s: CSSProperties = {
    fontFamily: MONO,
    fontSize: 10.5,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--sch-tx-2)",
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--sch-border)" }}>
      <span style={s}>{a}</span>
      <span style={s}>{b}</span>
    </div>
  )
}

function Row({ a, b, hi }: { a: ReactNode; b: ReactNode; hi?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: "13px 16px",
        borderBottom: "1px solid var(--sch-border)",
        background: hi ? "var(--sch-bg)" : "transparent",
        fontSize: hi ? 17 : 15,
      }}
    >
      <span style={{ color: "var(--sch-text)" }}>{a}</span>
      <span style={{ color: "var(--sch-text)", textAlign: "right" }}>{b}</span>
    </div>
  )
}
