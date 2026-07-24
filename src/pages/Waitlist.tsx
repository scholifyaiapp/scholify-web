import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, BrainCircuit, CalendarDays, Check, Gauge, ShieldCheck, Sparkles } from "lucide-react"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { LAUNCH_DATE_ISO, LAUNCH_DATE_LABEL } from "@/lib/launch"

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
        </div>
      </header>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "42px clamp(20px,4vw,40px) 70px", display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(300px,.85fr)", gap: "clamp(32px,6vw,80px)", alignItems: "center" }} className="waitlist-hero">
        <motion.div {...reveal} transition={{ duration: 0.65 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: RED, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <Sparkles size={15} /> The final lap before launch
          </div>
          <h1 style={{ fontSize: "clamp(44px,7vw,82px)", lineHeight: .98, letterSpacing: "-.055em", margin: "22px 0 24px", maxWidth: 760 }}>
            Your ACCA study system is almost <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>ready to race.</span>
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
          ].map(([Icon, title, copy]) => {
            const FeatureIcon = Icon as typeof BrainCircuit
            return <div key={String(title)} style={{ background: "#fff", border: "1px solid rgba(20,20,26,.08)", borderRadius: 18, padding: 21 }}><div style={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: 12, color: RED, background: "rgba(200,0,0,.07)" }}><FeatureIcon size={21} /></div><h3 style={{ fontSize: 16, margin: "15px 0 7px" }}>{String(title)}</h3><p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{String(copy)}</p></div>
          })}
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(20,20,26,.08)", padding: "23px clamp(20px,4vw,40px)", maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", color: MUTED, fontSize: 12 }}>
        <span>© 2026 Scholify · Learn Daily, Grow Steadily</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span>
            <Link to="/privacy" style={{ color: "inherit" }}>Privacy</Link> · <Link to="/terms" style={{ color: "inherit" }}>Terms</Link>
          </span>
          <Link
            to="/sign-in?team=1"
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
