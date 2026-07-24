import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, BrainCircuit, CalendarDays, Check, Gauge, ShieldCheck, Sparkles } from "lucide-react"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import PaymentMethods from "@/components/PaymentMethods"
import PartnerLogos from "@/components/ui/partner-logos"
import { LAUNCH_DATE_ISO, LAUNCH_DATE_LABEL, PARTNER_PROGRAM_VISIBLE } from "@/lib/launch"

const RED = "#C80000"
const INK = "#14141A"
const MUTED = "#6B6B76"
const PAPER = "#FAFAF7"
const GRADIENT = "linear-gradient(135deg,#C80000 0%,#E50068 52%,#F4A405 100%)"

function remaining() {
  const distance = Math.max(0, new Date(LAUNCH_DATE_ISO).getTime() - Date.now())
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
  }
}

function LaunchPrice({
  name,
  price,
  accent,
  tilt,
  reduced,
}: {
  name: string
  price: string
  accent: string
  tilt: number
  reduced: boolean | null
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, rotateY: tilt * 1.8 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, rotateY: tilt }}
      whileHover={reduced ? undefined : { y: -8, rotateY: 0, rotateX: -3, scale: 1.035 }}
      viewport={{ once: true, amount: .5 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{
        position: "relative",
        flex: "0 1 210px",
        minWidth: 175,
        padding: "25px 23px 23px",
        overflow: "hidden",
        borderRadius: 22,
        color: "#fff",
        textAlign: "left",
        background: `linear-gradient(145deg,${accent},#17171E 88%)`,
        border: "1px solid rgba(255,255,255,.22)",
        boxShadow: `0 24px 50px ${accent}28, inset 0 1px 0 rgba(255,255,255,.3)`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <span aria-hidden style={{ position: "absolute", width: 130, height: 130, right: -42, top: -58, borderRadius: "50%", background: "rgba(255,255,255,.16)", filter: "blur(2px)" }} />
      <div style={{ position: "relative", transform: "translateZ(22px)" }}>
        <div style={{ fontSize: 12, fontWeight: 850, letterSpacing: ".13em", textTransform: "uppercase", opacity: .72 }}>{name}</div>
        <div style={{ marginTop: 8, fontSize: "clamp(28px,3vw,39px)", lineHeight: 1, fontWeight: 900, letterSpacing: "-.055em" }}>
          {price}<span style={{ marginLeft: 4, fontSize: 12, fontWeight: 700, letterSpacing: 0, opacity: .68 }}>/mo</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Waitlist() {
  const reduced = useReducedMotion()
  const startedAt = useMemo(() => Date.now(), [])
  const [clock, setClock] = useState(remaining)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const timer = window.setInterval(() => setClock(remaining()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter your name and a valid email address.")
      return
    }
    setBusy(true)
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, website, startedAt }),
      })
      const result = (await response.json()) as { ok?: boolean }
      if (!response.ok || !result.ok) throw new Error("join_failed")
      setDone(true)
    } catch {
      setError("We couldn’t save your place. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  const reveal = reduced ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } }

  return (
    <main style={{ minHeight: "100dvh", background: PAPER, color: INK, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 15% 12%,rgba(200,0,0,.10),transparent 28%),radial-gradient(circle at 86% 18%,rgba(244,164,5,.13),transparent 26%),radial-gradient(circle at 55% 88%,rgba(229,0,104,.08),transparent 32%)" }} />

      <header style={{ position: "relative", zIndex: 2, maxWidth: 1120, margin: "0 auto", padding: "24px clamp(20px,4vw,40px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <ScholifyLockup size={32} color={INK} weight={800} />
        <div style={{ display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 12, fontWeight: 800, color: RED, background: "#fff", border: "1px solid rgba(200,0,0,.14)", borderRadius: 999, padding: "9px 14px" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: RED, boxShadow: "0 0 0 5px rgba(200,0,0,.08)" }} />
            PRE-LAUNCH
          </div>
          {PARTNER_PROGRAM_VISIBLE && (
            <Link
              to="/partners/apply"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 15px",
                borderRadius: 999,
                background: INK,
                color: "#fff",
                fontSize: 12,
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(20,20,26,.14)",
              }}
            >
              Partner Program <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </header>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "42px clamp(20px,4vw,40px) 70px", display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(300px,.85fr)", gap: "clamp(32px,6vw,80px)", alignItems: "center" }} className="waitlist-hero">
        <motion.div {...reveal} transition={{ duration: 0.65 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: RED, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <Sparkles size={15} /> The final lap before launch
          </div>
          <h1 style={{ fontSize: "clamp(44px,7vw,82px)", lineHeight: .98, letterSpacing: "-.055em", margin: "22px 0 24px", maxWidth: 760 }}>
            Your ACCA study system is almost{" "}
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)", backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{
                opacity: { duration: .55, delay: .35 },
                y: { duration: .7, delay: .35, ease: [0.16, 1, 0.3, 1] },
                filter: { duration: .65, delay: .35 },
                backgroundPosition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ position: "relative", display: "inline-block", background: GRADIENT, backgroundSize: "220% 220%", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              ready to race.
              {!reduced && (
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: .75 }}
                  transition={{ duration: .75, delay: .72, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", left: 2, right: 0, bottom: -5, height: 4, borderRadius: 99, background: GRADIENT, transformOrigin: "left" }}
                />
              )}
            </motion.span>
          </h1>
          <p style={{ maxWidth: 680, fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.65, color: MUTED, margin: 0 }}>
            Scholify combines a personalised daily plan, exam-standard practice and an AI examiner into one focused route from today to exam day.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            {[["15", "ACCA papers"], ["2,494", "expert questions"], ["24/7", "AI race engineer"]].map(([value, label]) => (
              <div key={label} style={{ background: "rgba(255,255,255,.78)", border: "1px solid rgba(20,20,26,.08)", borderRadius: 15, padding: "13px 17px", minWidth: 130 }}>
                <div style={{ fontSize: 20, fontWeight: 900 }}>{value}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal} transition={{ duration: .65, delay: .12 }} style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: -8, top: -82, zIndex: 2 }}><CharlesMascot pose="wave" size={128} /></div>
          <div style={{ background: "rgba(255,255,255,.92)", border: "1px solid rgba(20,20,26,.09)", borderRadius: 26, padding: "clamp(24px,4vw,34px)", boxShadow: "0 28px 80px rgba(51,43,40,.13)", backdropFilter: "blur(18px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: RED, fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}><CalendarDays size={16} /> Launching {LAUNCH_DATE_LABEL}</div>
            <h2 style={{ fontSize: 28, letterSpacing: "-.035em", margin: "14px 0 7px" }}>Join the starting grid.</h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: "0 0 22px" }}>Be first to know when Scholify opens. We’re keeping the app private until the complete experience is ready.</p>

            {!done ? (
              <form onSubmit={submit}>
                <input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: -10000, opacity: 0 }} />
                <label style={{ display: "block", fontSize: 12, fontWeight: 800, marginBottom: 7 }}>Your name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Maya" style={{ width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: 12, border: "1px solid rgba(20,20,26,.13)", background: PAPER, color: INK, fontSize: 15, outlineColor: RED }} />
                <label style={{ display: "block", fontSize: 12, fontWeight: 800, margin: "15px 0 7px" }}>Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="maya@example.com" style={{ width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: 12, border: "1px solid rgba(20,20,26,.13)", background: PAPER, color: INK, fontSize: 15, outlineColor: RED }} />
                {error && <p role="alert" style={{ color: RED, fontSize: 12, margin: "10px 0 0" }}>{error}</p>}
                <button disabled={busy} style={{ width: "100%", marginTop: 17, padding: "14px 18px", border: 0, borderRadius: 12, background: GRADIENT, color: "#fff", fontWeight: 900, fontSize: 15, cursor: busy ? "wait" : "pointer", opacity: busy ? .7 : 1 }}>
                  {busy ? "Securing your place…" : "Join the waitlist"} <ArrowRight size={17} style={{ display: "inline", verticalAlign: "-3px", marginLeft: 4 }} />
                </button>
                <p style={{ color: MUTED, fontSize: 11, lineHeight: 1.5, margin: "11px 0 0", textAlign: "center" }}>Confirmation and essential launch updates only. Unsubscribe anytime.</p>
              </form>
            ) : (
              <div style={{ background: "#F1FBF6", border: "1px solid #CBEBD9", borderRadius: 16, padding: 20 }}>
                <div style={{ width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: 99, background: "#1E9E5A", color: "#fff" }}><Check size={21} strokeWidth={3} /></div>
                <h3 style={{ margin: "13px 0 6px", fontSize: 20 }}>Your place is secured.</h3>
                <p style={{ margin: 0, color: "#527060", fontSize: 13.5, lineHeight: 1.55 }}>Check your inbox for confirmation. We’ll see you on the starting grid.</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,4vw,40px) 34px" }}>
        <motion.div
          initial={reduced ? false : { scale: .96, opacity: 0 }}
          whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: .35 }}
          animate={reduced ? undefined : {
            boxShadow: [
              "0 0 0 1px rgba(244,164,5,.35),0 12px 34px -16px rgba(244,164,5,.28)",
              "0 0 0 1px rgba(244,164,5,.85),0 24px 58px -12px rgba(244,164,5,.5)",
              "0 0 0 1px rgba(244,164,5,.35),0 12px 34px -16px rgba(244,164,5,.28)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: .55, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{ background: "linear-gradient(135deg,#1b1b22 0%,#2a1215 60%,#3a0d1e 100%)", color: "#fff", border: "1px solid rgba(244,164,5,.4)", borderRadius: 24, padding: "clamp(24px,4vw,38px)", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 28, position: "relative", overflow: "hidden" }}
          className="waitlist-countdown"
        >
          {!reduced && (
            <motion.div
              aria-hidden
              initial={{ x: "-130%" }}
              animate={{ x: "230%" }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0, width: "42%", background: "linear-gradient(105deg,transparent,rgba(244,164,5,.2) 45%,rgba(255,255,255,.3) 50%,rgba(244,164,5,.2) 55%,transparent)", mixBlendMode: "screen", pointerEvents: "none" }}
            />
          )}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#F4A405", fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>
              <motion.span
                aria-hidden
                animate={reduced ? undefined : { opacity: [1, .35, 1], scale: [1, 1.5, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 7, height: 7, borderRadius: 99, background: "#F4A405", boxShadow: "0 0 9px #F4A405" }}
              />
              Race control · live
            </div>
            <div style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 850, letterSpacing: "-.035em", marginTop: 9 }}>Public access opens 10 August.</div>
            <div style={{ color: "rgba(255,255,255,.58)", fontSize: 12, marginTop: 8 }}>The starting grid opens when the complete Scholify experience is ready.</div>
          </div>
          <div style={{ display: "flex", gap: 10, position: "relative", zIndex: 1 }}>
            {[[clock.days, "days"], [clock.hours, "hours"], [clock.minutes, "minutes"]].map(([value, label]) => (
              <div key={label} style={{ minWidth: 78, textAlign: "center", background: "rgba(255,255,255,.075)", border: "1px solid rgba(244,164,5,.24)", borderRadius: 14, padding: "13px 10px", boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)" }}>
                <div style={{ fontSize: 27, fontWeight: 900, fontVariantNumeric: "tabular-nums" }}>{String(value).padStart(2, "0")}</div><div style={{ color: "#F4A405", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "58px clamp(20px,4vw,40px) 86px" }}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 30px" }}><div style={{ color: RED, fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>Built for the first impression</div><h2 style={{ fontSize: "clamp(30px,4vw,48px)", letterSpacing: "-.045em", margin: "12px 0" }}>What’s waiting behind the lights.</h2><p style={{ color: MUTED, lineHeight: 1.65 }}>A complete ACCA command centre—not an unfinished demo.</p></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 14 }} className="waitlist-features">
          {[
            [BrainCircuit, "Personal study route", "A daily plan built around your paper, exam date and weakest areas."],
            [Gauge, "Exam readiness", "Know whether you’re actually on pace—not just how many hours you studied."],
            [ShieldCheck, "Exam-standard practice", "Questions, mocks and written-answer marking across all 15 papers."],
            [Sparkles, "Charles by your side", "Your AI race engineer adjusts the plan and keeps every session focused."],
          ].map(([Icon, title, copy], index) => {
            const FeatureIcon = Icon as typeof BrainCircuit
            const accents = ["#C80000", "#E50068", "#8A3FFC", "#F4A405"]
            const accent = accents[index]
            return (
              <motion.article
                key={String(title)}
                initial={reduced ? false : { opacity: 0, y: 28, scale: .97 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: .25 }}
                whileHover={reduced ? undefined : { y: -8, scale: 1.015 }}
                transition={{ duration: .55, delay: reduced ? 0 : index * .09, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: "rgba(255,255,255,.9)", border: "1px solid rgba(20,20,26,.08)", borderRadius: 20, padding: 22, position: "relative", overflow: "hidden", boxShadow: "0 14px 38px rgba(20,20,26,.06)", backdropFilter: "blur(14px)" }}
              >
                <motion.div
                  aria-hidden
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={reduced ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: .65, delay: reduced ? 0 : .15 + index * .09, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, background: `linear-gradient(90deg,${accent},transparent)`, transformOrigin: "left" }}
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <motion.div
                    whileHover={reduced ? undefined : { rotate: -6, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    style={{ width: 42, height: 42, display: "grid", placeItems: "center", borderRadius: 13, color: accent, background: `${accent}12`, border: `1px solid ${accent}20` }}
                  >
                    <FeatureIcon size={22} />
                  </motion.div>
                  <span style={{ color: "rgba(20,20,26,.22)", fontSize: 11, fontWeight: 900, letterSpacing: ".12em" }}>0{index + 1}</span>
                </div>
                <h3 style={{ fontSize: 17, lineHeight: 1.25, margin: "17px 0 8px", letterSpacing: "-.015em" }}>{String(title)}</h3>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.65, margin: 0 }}>{String(copy)}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 7, color: accent, fontSize: 10, fontWeight: 850, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 18 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: accent, boxShadow: `0 0 0 4px ${accent}12` }} />
                  Built into Scholify
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(20,20,26,.07)", borderBottom: "1px solid rgba(20,20,26,.07)", background: "rgba(255,255,255,.46)" }}>
        <PartnerLogos
          heading="The ACCA learning ecosystem"
          caption="Scholify prepares learners for a qualification studied across leading universities and professional education organisations."
        />
      </div>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "68px clamp(20px,4vw,40px) 78px" }}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .3 }}
          transition={{ duration: .6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "rgba(255,255,255,.9)",
            border: "1px solid rgba(20,20,26,.08)",
            borderRadius: 24,
            padding: "clamp(28px,5vw,48px)",
            boxShadow: "0 22px 64px rgba(20,20,26,.07)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 650, margin: "0 auto 28px" }}>
            <div style={{ color: RED, fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>Ready for launch day</div>
            <h2 style={{ fontSize: "clamp(27px,4vw,40px)", letterSpacing: "-.04em", margin: "11px 0 10px" }}>Simple, secure checkout.</h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.65, margin: 0 }}>
              Joining the waitlist is completely free—no payment details are collected. When paid plans open, checkout will be securely processed by Stripe.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(16px,3vw,30px)",
              flexWrap: "wrap",
              perspective: 1100,
            }}
          >
            <LaunchPrice name="Beginner" price="$9.99" accent="#C80000" tilt={7} reduced={reduced} />
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: .94 }}
              whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: .5 }}
              transition={{ duration: .55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: "1 1 390px",
                maxWidth: 520,
                padding: "22px 18px",
                borderRadius: 20,
                background: "linear-gradient(145deg,rgba(255,255,255,.96),rgba(247,247,244,.8))",
                border: "1px solid rgba(20,20,26,.08)",
                boxShadow: "0 16px 38px rgba(20,20,26,.06), inset 0 1px 0 #fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 15, color: INK, fontSize: 11, fontWeight: 850, letterSpacing: ".13em", textTransform: "uppercase" }}>
                <ShieldCheck size={15} color={RED} /> Secure payment system
              </div>
              <PaymentMethods heading="" />
            </motion.div>
            <LaunchPrice name="Pro" price="$14.99" accent="#9B0059" tilt={-7} reduced={reduced} />
          </div>
        </motion.div>
      </section>

      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(20,20,26,.08)", padding: "23px clamp(20px,4vw,40px)", maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", color: MUTED, fontSize: 12 }}>
        <span>© 2026 Scholify · Learn Daily, Grow Steadily</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span>
            <Link to="/privacy" style={{ color: "inherit" }}>Privacy</Link> · <Link to="/terms" style={{ color: "inherit" }}>Terms</Link>
          </span>
          <Link
            to="/sign-in?team=1&next=/admin"
            aria-label="Open the private Scholify admin panel"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 13px",
              borderRadius: 999,
              background: INK,
              color: "#fff",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Admin Panel <ArrowRight size={13} />
          </Link>
        </span>
      </footer>

      <style>{`
        @media (max-width: 800px) {
          .waitlist-hero { grid-template-columns: 1fr !important; padding-top: 24px !important; }
          .waitlist-countdown { grid-template-columns: 1fr !important; }
          .waitlist-features { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
        }
        @media (max-width: 520px) {
          .waitlist-features { grid-template-columns: 1fr !important; }
          .waitlist-countdown > div:last-child { width: 100%; }
          .waitlist-countdown > div:last-child > div { min-width: 0 !important; flex: 1; }
        }
      `}</style>
    </main>
  )
}
