/*
 * Scholify ACCA — Reveal Experience (v2)
 *
 * Faithful React port of the "Scholify Reveal v2" Claude Design prototype.
 * A full-screen, two-moment reveal: Moment 1 (Diagnostic) runs a 4-phase
 * scan then reveals a pass-probability gauge + verdict; Moment 2 (Study plan)
 * runs a 4-phase build then reveals the daily block, pain points and roadmap.
 *
 * Self-contained: all palette CSS variables + @keyframes are injected once via
 * a <style> element scoped to the component root (.sc-reveal). Everything else
 * is inline styles, matching the prototype's approach exactly. No dependencies
 * beyond React (CSS 3D + keyframes only, no three.js).
 */

import { useEffect, useRef, useState, type CSSProperties } from "react"

/* ── Types ─────────────────────────────────────────────────────── */

type IconKey = "check" | "chart" | "drop" | "spark"
type PhaseTuple = [string, string, IconKey]

export interface RevealExperienceProps {
  paperId?: string
  passProbability?: number
  weakAreas?: { code: string; name: string; pct: number }[]
  dailyBlock?: { questions: number; minutes: number; focus: string; time?: string }
  examLabel?: string
  road?: { phase: string; when: string; done: boolean }[]
  phasesM1?: PhaseTuple[]
  phasesM2?: PhaseTuple[]
  theme?: "light" | "dark"
  showControls?: boolean
  onContinue?: () => void
}

/* ── Static assets (exact SVG strings from the source) ──────────── */

const ICONS: Record<IconKey, string> = {
  check:
    '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
  chart:
    '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 20V13M12 20V5M19 20v-9"/><path d="M3 20h18" stroke-width="1.6" opacity=".6"/></svg>',
  drop:
    '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5s6 6.6 6 10.5a6 6 0 0 1-12 0c0-3.9 6-10.5 6-10.5z"/></svg>',
  spark:
    '<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M12 2.5l1.9 5.9 5.9 1.6-5.9 1.6L12 21.5l-1.9-5.9L4.2 12l5.9-1.6z"/></svg>',
}

const STEP_CHECK =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>'
const STEP_DOT =
  '<svg viewBox="0 0 10 10" width="10" height="10"><circle cx="5" cy="5" r="4" fill="currentColor"/></svg>'

const THEME_ICON_LIGHT =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>'
const THEME_ICON_DARK =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'

const DOT_TAGS: Record<1 | 2, [string, string, string, string]> = {
  1: ["Read", "Map", "Leak", "Score"],
  2: ["Pain", "Weight", "Size", "Date"],
}

const DEFAULT_PHASES_M1: PhaseTuple[] = [
  ["Reading your answers", "Every response, weighted by difficulty.", "check"],
  ["Mapping your FA syllabus", "Scoring you across every area, A to H.", "chart"],
  ["Finding where the marks leak", "The areas dragging your score down — your pain points.", "drop"],
  ["Computing your pass probability", "An honest number, with the margin it deserves.", "spark"],
]

const DEFAULT_PHASES_M2: PhaseTuple[] = [
  ["Reading your pain points", "Starting with D · Recording transactions.", "drop"],
  ["Weighting the FA syllabus", "Every area, by exam weight and your result.", "chart"],
  ["Sizing your daily block", "18 questions in 25 min at 19:00.", "spark"],
  ["Dating the road to your sitting", "Phase by phase, all the way to exam day.", "check"],
]

const DEFAULT_WEAK: { code: string; name: string; pct: number }[] = [
  { code: "D", name: "Recording transactions", pct: 41 },
  { code: "C", name: "Double-entry & systems", pct: 58 },
  { code: "E", name: "Preparing a trial balance", pct: 64 },
]

const DEFAULT_ROAD: { phase: string; when: string; done: boolean }[] = [
  { phase: "Foundations", when: "This week — rebuild the basics", done: true },
  { phase: "Weak-area drills", when: "Weeks 2–4 — D, C, E first", done: true },
  { phase: "Full mocks", when: "Weeks 5–6 — timed, marked", done: false },
  { phase: "Exam day", when: "6 Dec — you’re ready", done: false },
]

/* ── Injected CSS (palette + keyframes), scoped to .sc-reveal ───── */

const CSS = `
.sc-reveal{
  --paper:#FAFAF7; --paper2:#F1ECE7; --card:#ffffff;
  --ink:#2A2320; --muted:#6B5F58; --muted2:#9A928B;
  --line:#ECE4DE; --line2:#EAE2DB;
  --red:#C80000; --red-d:#9E0000; --red-soft:rgba(200,0,0,.06);
  --ring:rgba(200,0,0,.24); --ring2:rgba(20,20,26,.09);
  --glow:rgba(200,0,0,.34); --core-hi:#ffffff;
  --backglow:radial-gradient(50% 50% at 50% 50%, rgba(200,0,0,.13), rgba(200,0,0,0) 70%);
}
.sc-reveal[data-theme="dark"]{
  --paper:#17120F; --paper2:#211913; --card:#241C16;
  --ink:#F7F1EB; --muted:#B6A99F; --muted2:#8A7E74;
  --line:#342A22; --line2:#2B221B; --red:#FF4438; --red-d:#C80000; --red-soft:rgba(255,80,60,.10);
  --ring:rgba(255,90,70,.34); --ring2:rgba(255,255,255,.07);
  --glow:rgba(255,70,50,.52); --core-hi:#fff;
  --backglow:radial-gradient(50% 50% at 50% 50%, rgba(255,70,50,.18), rgba(255,70,50,0) 70%);
}
.sc-reveal ::selection{background:rgba(200,0,0,.16);}
@keyframes sc-sway{0%,100%{transform:rotateY(-15deg) rotateX(7deg);}50%{transform:rotateY(15deg) rotateX(3deg);}}
@keyframes sc-spin{from{transform:rotateZ(0deg);}to{transform:rotateZ(360deg);}}
@keyframes sc-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.055);}}
@keyframes sc-glowpulse{0%,100%{opacity:.55;transform:scale(1);}50%{opacity:.95;transform:scale(1.12);}}
@keyframes sc-twinkle{0%,100%{opacity:.55;transform:scale(.82);}50%{opacity:1;transform:scale(1.25);}}
@keyframes sc-drift{0%{transform:translate(0,0);opacity:.25;}50%{transform:translate(6px,-9px);opacity:.9;}100%{transform:translate(0,0);opacity:.25;}}
@keyframes sc-rise{0%{opacity:0;transform:translateY(12px);}100%{opacity:1;transform:translateY(0);}}
@keyframes sc-iconin{0%{opacity:0;transform:scale(.6);}100%{opacity:1;transform:scale(1);}}
@keyframes sc-cardin{0%{opacity:0;transform:translateY(18px) scale(.98);}100%{opacity:1;transform:translateY(0) scale(1);}}
@keyframes sc-gaugein{0%{opacity:0;transform:scale(.86);}100%{opacity:1;transform:scale(1);}}
@media (prefers-reduced-motion: reduce){
  .sc-reveal *{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.12s !important;}
}
`

/* ── Logo (6 rotated glyphs) ────────────────────────────────────── */

const LOGO_ROT = [0, 60, 120, 180, 240, 300]

function Logo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="var(--red)"
      stroke="var(--red)"
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {LOGO_ROT.map((r) => (
        <g key={r} transform={`rotate(${r} 100 100)`}>
          <circle cx={71} cy={46} r={5.5} stroke="none" />
          <path fill="none" d="M79,46 L123,46 L133,63" />
          <path fill="none" d="M89,57 L114,57" />
          <circle cx={133} cy={63} r={4} stroke="none" />
        </g>
      ))}
    </svg>
  )
}

/* ── Particle field (exact transforms from source) ──────────────── */

const PARTICLES: { t: string; s: number; c: string; o: number; d: string }[] = [
  { t: "translate3d(-120px,-70px,60px)", s: 4, c: "var(--red)", o: 0.5, d: "6s ease-in-out infinite" },
  { t: "translate3d(110px,-52px,30px)", s: 3, c: "var(--core-hi)", o: 0.6, d: "7.4s ease-in-out infinite .6s" },
  { t: "translate3d(-90px,80px,-40px)", s: 3, c: "var(--red)", o: 0.4, d: "8s ease-in-out infinite 1.1s" },
  { t: "translate3d(96px,66px,80px)", s: 5, c: "var(--red)", o: 0.5, d: "6.6s ease-in-out infinite .3s" },
  { t: "translate3d(-140px,10px,20px)", s: 3, c: "var(--core-hi)", o: 0.55, d: "9s ease-in-out infinite 1.6s" },
  { t: "translate3d(138px,-8px,-30px)", s: 4, c: "var(--red)", o: 0.45, d: "7s ease-in-out infinite .9s" },
  { t: "translate3d(-56px,-96px,50px)", s: 3, c: "var(--red)", o: 0.5, d: "8.4s ease-in-out infinite .2s" },
  { t: "translate3d(60px,100px,40px)", s: 4, c: "var(--core-hi)", o: 0.5, d: "6.2s ease-in-out infinite 1.3s" },
  { t: "translate3d(-30px,120px,-20px)", s: 3, c: "var(--red)", o: 0.4, d: "9.5s ease-in-out infinite .7s" },
  { t: "translate3d(28px,-124px,10px)", s: 4, c: "var(--red)", o: 0.5, d: "7.8s ease-in-out infinite 1.9s" },
  { t: "translate3d(160px,40px,60px)", s: 3, c: "var(--core-hi)", o: 0.5, d: "6.9s ease-in-out infinite .5s" },
  { t: "translate3d(-158px,-40px,-10px)", s: 4, c: "var(--red)", o: 0.45, d: "8.7s ease-in-out infinite 1.0s" },
  { t: "translate3d(8px,-40px,110px)", s: 5, c: "var(--red)", o: 0.55, d: "5.8s ease-in-out infinite .1s" },
  { t: "translate3d(-8px,44px,120px)", s: 4, c: "var(--core-hi)", o: 0.55, d: "6.4s ease-in-out infinite 1.4s" },
]

/* ── Component ──────────────────────────────────────────────────── */

export default function RevealExperience(props: RevealExperienceProps) {
  const {
    paperId = "FA",
    passProbability = 68,
    weakAreas = DEFAULT_WEAK,
    dailyBlock = { questions: 18, minutes: 25, focus: "D→A", time: "19:00" },
    examLabel = "6 Dec",
    road = DEFAULT_ROAD,
    phasesM1 = DEFAULT_PHASES_M1,
    phasesM2 = DEFAULT_PHASES_M2,
    theme: themeProp = "light",
    showControls = true,
    onContinue,
  } = props

  /* matchMedia (desktop) — created once */
  const mqRef = useRef<MediaQueryList | null>(
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(min-width: 768px)")
      : null
  )

  const [reduced] = useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  const [moment, setMoment] = useState<1 | 2>(1)
  const [phase, setPhase] = useState<number>(-1)
  const [revealed, setRevealed] = useState<boolean>(false)
  const [theme, setTheme] = useState<"light" | "dark">(themeProp)
  const [desktop, setDesktop] = useState<boolean>(() =>
    mqRef.current ? mqRef.current.matches : true
  )

  const rigRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const arcRef = useRef<SVGCircleElement>(null)
  const timersRef = useRef<number[]>([])
  const rafRef = useRef<number | null>(null)

  const CIRC = 2 * Math.PI * 92

  /* keep latest passProbability for the imperative count-up */
  const passRef = useRef<number>(passProbability)
  passRef.current = passProbability

  /* ── imperative state machine ─────────────────────────────────── */

  const clear = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }
  const dur = () => (reduced ? 420 : 950)

  const applyRig = (op: number) => {
    const r = rigRef.current
    if (r) {
      r.style.opacity = String(op)
      r.style.filter = op < 1 ? "blur(1.5px)" : "none"
    }
  }

  const target = () => {
    const v = passRef.current
    return isNaN(v) ? 68 : Math.max(1, Math.min(99, Math.round(v)))
  }

  const countUp = () => {
    const tgt = target()
    const setArc = (frac: number) => {
      if (arcRef.current)
        arcRef.current.style.strokeDashoffset = (CIRC * (1 - frac)).toFixed(1)
    }
    if (reduced) {
      if (numRef.current) numRef.current.textContent = String(tgt)
      setArc(tgt / 100)
      return
    }
    const d = 1550,
      t0 = performance.now(),
      ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / d),
        e = ease(p)
      if (numRef.current) numRef.current.textContent = String(Math.round(e * tgt))
      setArc((e * tgt) / 100)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const doReveal = (m: 1 | 2) => {
    setPhase(4)
    setRevealed(true)
    applyRig(m === 1 ? 0.16 : 0.24)
    if (m === 1) countUp()
  }

  const runStep = (m: 1 | 2, i: number) => {
    if (i >= 4) {
      doReveal(m)
      return
    }
    setPhase(i)
    timersRef.current.push(window.setTimeout(() => runStep(m, i + 1), dur()))
  }

  const startRun = (m: 1 | 2) => {
    clear()
    setPhase(-1)
    setRevealed(false)
    applyRig(1)
    timersRef.current.push(
      window.setTimeout(() => runStep(m, 0), reduced ? 120 : 320)
    )
  }

  const goMoment = (m: 1 | 2) => {
    if (m === moment && revealed) {
      startRun(m)
      return
    }
    setMoment(m)
    startRun(m)
  }

  const toggleTheme = () => setTheme((s) => (s === "light" ? "dark" : "light"))

  /* mount: kick off Moment 1; wire matchMedia; cleanup */
  useEffect(() => {
    startRun(1)
    return () => clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const mq = mqRef.current
    if (!mq) return
    const onMq = (e: MediaQueryListEvent) => setDesktop(e.matches)
    if (mq.addEventListener) mq.addEventListener("change", onMq)
    else mq.addListener(onMq)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onMq)
      else mq.removeListener(onMq)
    }
  }, [])

  /* ── derived render values (renderVals equivalent) ────────────── */

  const isM1 = moment === 1
  const isM2 = moment === 2
  const running = phase >= 0 && phase < 4
  const pd = isM1 ? phasesM1 : phasesM2
  const cur = running ? pd[phase] : pd[0]
  const iconKey: IconKey = running ? cur[2] : isM1 ? "spark" : "drop"

  const progressPct =
    phase < 0 ? "0%" : revealed ? "100%" : Math.round(((phase + 1) / 4) * 100) + "%"

  const tags = DOT_TAGS[moment]

  const t = target()
  const verdict: [string, string, string] =
    t >= 75
      ? [
          "You’re on track — now we protect the lead.",
          "Comfortably above the line. We’ll keep sharpening your weak areas so exam day feels routine.",
          "Target " + Math.min(99, t + 8) + "% by " + examLabel,
        ]
      : t >= 55
      ? [
          "On the borderline — here’s how we lift it.",
          "A real chance, with real gaps. Close your three pain points and this number moves fast.",
          "Target 78% by " + examLabel,
        ]
      : [
          "Steep, but far from lost.",
          "The foundations need work first. We’ll rebuild from your weakest areas, one loop at a time.",
          "Target 65% by " + examLabel,
        ]
  const [vTitle, vSub, vChip] = verdict

  const momentBadge = isM1 ? "Diagnostic" : "Study plan"
  const momentTitle = isM1 ? "Reading your diagnostic." : "Building your plan."
  const headKey = "h" + moment + (desktop ? "d" : "m")
  const coreKey = moment + "-" + phase + "-" + iconKey
  const phaseKey = moment + "-p" + phase
  const phaseLabel =
    phase < 0 ? (isM1 ? "Warming up the model…" : "Opening your results…") : cur[0]
  const phaseSub =
    phase < 0
      ? isM1
        ? "One moment while Charles loads your paper telemetry."
        : "Charles is turning your score into a race plan."
      : cur[1]

  const showGauge = revealed && isM1
  const showVerdict = revealed && isM1
  const showPlan = revealed && isM2
  const showStepper = desktop && !revealed
  const showPhase = running || phase < 0

  const label = "Charles · Race engineer · Paper " + paperId

  /* layout style fragments */
  const ambientOpacity = desktop ? 1 : 0
  const rigScale = desktop ? "scale(1.42)" : "scale(.88)"
  const gaugeScale = desktop ? "scale(1.42)" : "scale(1)"

  /* ── small building blocks ────────────────────────────────────── */

  const MomentPill = (extra: CSSProperties) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 11px",
        borderRadius: 99,
        background: "var(--red-soft)",
        border: "1px solid var(--line)",
        ...extra,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--red)",
          boxShadow: "0 0 8px var(--glow)",
          animation: "sc-twinkle 1.8s ease-in-out infinite",
        }}
      />
      <span
        style={{
          font: "600 10px/1 'JetBrains Mono'",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--red)",
        }}
      >
        {momentBadge}
      </span>
    </div>
  )

  /* ── render ───────────────────────────────────────────────────── */

  return (
    <div
      className="sc-reveal"
      data-theme={theme}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background:
          "radial-gradient(120% 90% at 50% 0%, var(--paper) 0%, var(--paper2) 85%)",
        fontFamily: "'Plus Jakarta Sans',sans-serif",
      }}
    >
      <style>{CSS}</style>

      {/* ambient field (desktop bleed) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transition: "opacity .8s",
          opacity: ambientOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "8%",
            top: "12%",
            width: 420,
            height: 420,
            background: "var(--backglow)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "34%",
            bottom: "4%",
            width: 520,
            height: 520,
            background: "var(--backglow)",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "6%",
            top: "24%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "var(--red)",
            opacity: 0.35,
            animation: "sc-drift 8s ease-in-out infinite .4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "12%",
            bottom: "20%",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "var(--red)",
            opacity: 0.3,
            animation: "sc-drift 9.5s ease-in-out infinite 1.2s",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "48%",
            top: "14%",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "var(--red)",
            opacity: 0.3,
            animation: "sc-drift 7.2s ease-in-out infinite .8s",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "44%",
            bottom: "12%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "var(--red)",
            opacity: 0.25,
            animation: "sc-drift 8.8s ease-in-out infinite 1.7s",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          maxWidth: 1440,
          margin: "0 auto",
          flexDirection: desktop ? "row" : "column",
          alignItems: desktop ? "stretch" : undefined,
        }}
      >
        {/* MOBILE header */}
        {!desktop && (
          <div style={{ padding: "22px 24px 0", flex: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Logo size={24} />
                <span
                  style={{
                    font: "800 16px/1 'Plus Jakarta Sans'",
                    letterSpacing: "-.3px",
                    color: "var(--ink)",
                  }}
                >
                  Scholify
                </span>
              </div>
              {MomentPill({})}
            </div>
            <div
              key={headKey}
              style={{
                animation: "sc-rise .55s cubic-bezier(.22,1,.36,1) both",
                marginTop: 20,
              }}
            >
              <div
                style={{
                  font: "600 10px/1 'JetBrains Mono'",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--muted2)",
                  marginBottom: 8,
                }}
              >
                {label}
              </div>
              <h1
                style={{
                  margin: 0,
                  font: "800 27px/1.08 'Plus Jakarta Sans'",
                  letterSpacing: "-.7px",
                  color: "var(--ink)",
                }}
              >
                {momentTitle}
              </h1>
            </div>
          </div>
        )}

        {/* SCENE */}
        <div
          style={{
            position: "relative",
            perspective: "1100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
            width: desktop ? "55%" : "100%",
            height: desktop ? "100%" : 288,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "150%",
              height: "150%",
              maxWidth: 640,
              maxHeight: 640,
              background: "var(--backglow)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              width: 300,
              height: 300,
              flex: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform .8s cubic-bezier(.22,1,.36,1)",
              transform: rigScale,
            }}
          >
            <div
              ref={rigRef}
              style={{
                position: "relative",
                width: 300,
                height: 300,
                transformStyle: "preserve-3d",
                transition:
                  "opacity .7s cubic-bezier(.22,1,.36,1),filter .7s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transformStyle: "preserve-3d",
                  animation: "sc-sway 11s ease-in-out infinite",
                }}
              >
                {/* ring 1 */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(74deg) rotateY(4deg)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 236,
                      height: 236,
                      transformStyle: "preserve-3d",
                      animation: "sc-spin 15s linear infinite",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "1.5px solid var(--ring)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -4,
                        left: "50%",
                        width: 9,
                        height: 9,
                        marginLeft: -4.5,
                        borderRadius: "50%",
                        background: "var(--red)",
                        boxShadow: "0 0 16px 4px var(--glow)",
                        animation: "sc-twinkle 2.6s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
                {/* ring 2 */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(62deg) rotateY(34deg)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 176,
                      height: 176,
                      transformStyle: "preserve-3d",
                      animation: "sc-spin 10s linear infinite reverse",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "1.5px solid var(--ring)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -3.5,
                        left: "50%",
                        width: 8,
                        height: 8,
                        marginLeft: -4,
                        borderRadius: "50%",
                        background: "var(--core-hi)",
                        boxShadow: "0 0 14px 4px var(--glow)",
                        animation: "sc-twinkle 2.1s ease-in-out infinite .4s",
                      }}
                    />
                  </div>
                </div>
                {/* ring 3 */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(82deg) rotateZ(48deg) rotateY(-8deg)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 298,
                      height: 298,
                      transformStyle: "preserve-3d",
                      animation: "sc-spin 22s linear infinite",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "1.5px solid var(--ring2)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -4,
                        left: "50%",
                        width: 7,
                        height: 7,
                        marginLeft: -3.5,
                        borderRadius: "50%",
                        background: "var(--red)",
                        boxShadow: "0 0 12px 3px var(--glow)",
                        animation: "sc-twinkle 3s ease-in-out infinite .9s",
                      }}
                    />
                  </div>
                </div>

                {/* particles */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {PARTICLES.map((p, i) => (
                    <div key={i} style={{ position: "absolute", transform: p.t }}>
                      <div
                        style={{
                          width: p.s,
                          height: p.s,
                          borderRadius: "50%",
                          background: p.c,
                          opacity: p.o,
                          animation: "sc-drift " + p.d,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* CORE */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 150,
                      height: 150,
                      transform: "translate(-50%,-50%)",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 50% 50%, var(--glow), rgba(200,0,0,0) 68%)",
                      animation: "sc-glowpulse 3.6s ease-in-out infinite",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      width: 92,
                      height: 92,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 38% 30%, var(--core-hi) 0%, var(--red) 58%, var(--red-d) 100%)",
                      boxShadow:
                        "0 0 40px var(--glow), inset 0 -6px 14px rgba(120,0,0,.45), inset 0 4px 10px rgba(255,255,255,.35)",
                      animation: "sc-pulse 3.6s ease-in-out infinite",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      key={coreKey}
                      style={{
                        color: "#fff",
                        display: "flex",
                        animation: "sc-iconin .5s cubic-bezier(.22,1,.36,1) both",
                      }}
                      dangerouslySetInnerHTML={{ __html: ICONS[iconKey] }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GAUGE (moment 1 reveal) */}
          {showGauge && (
            <div
              style={{
                position: "absolute",
                width: 222,
                height: 222,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "sc-gaugein .8s cubic-bezier(.22,1,.36,1) both",
                transition: "transform .8s cubic-bezier(.22,1,.36,1)",
                transform: gaugeScale,
              }}
            >
              <svg
                width={222}
                height={222}
                viewBox="0 0 222 222"
                style={{ position: "absolute", inset: 0 }}
              >
                <circle
                  cx={111}
                  cy={111}
                  r={92}
                  fill="none"
                  stroke="var(--line2)"
                  strokeWidth={9}
                />
                <circle
                  ref={arcRef}
                  cx={111}
                  cy={111}
                  r={92}
                  fill="none"
                  stroke="var(--red)"
                  strokeWidth={9}
                  strokeLinecap="round"
                  strokeDasharray="578.05"
                  strokeDashoffset="578.05"
                  transform="rotate(-90 111 111)"
                  style={{ filter: "drop-shadow(0 0 8px var(--glow))" }}
                />
              </svg>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span
                    ref={numRef}
                    style={{
                      font: "800 62px/1 'Plus Jakarta Sans'",
                      letterSpacing: "-2px",
                      color: "var(--ink)",
                    }}
                  >
                    0
                  </span>
                  <span
                    style={{
                      font: "800 26px/1 'Plus Jakarta Sans'",
                      color: "var(--red)",
                      marginLeft: 2,
                    }}
                  >
                    %
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 2,
                    font: "600 9px/1 'JetBrains Mono'",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "var(--muted2)",
                  }}
                >
                  Pass probability
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PANEL */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            minWidth: 0,
            scrollbarWidth: "none",
            width: desktop ? "45%" : undefined,
            flex: desktop ? undefined : 1,
            padding: desktop ? "36px 56px 90px 8px" : "0 24px 96px",
          }}
        >
          <div
            style={{
              margin: "auto 0",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            {/* DESKTOP header */}
            {desktop && (
              <div style={{ flex: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 26,
                  }}
                >
                  <Logo size={26} />
                  <span
                    style={{
                      font: "800 18px/1 'Plus Jakarta Sans'",
                      letterSpacing: "-.3px",
                      color: "var(--ink)",
                    }}
                  >
                    Scholify
                  </span>
                  {MomentPill({ padding: "6px 12px", marginLeft: 6 })}
                </div>
                <div
                  key={headKey}
                  style={{
                    animation: "sc-rise .55s cubic-bezier(.22,1,.36,1) both",
                  }}
                >
                  <div
                    style={{
                      font: "600 11px/1 'JetBrains Mono'",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "var(--muted2)",
                      marginBottom: 12,
                    }}
                  >
                    {label}
                  </div>
                  <h1
                    style={{
                      margin: 0,
                      font: "800 clamp(30px, 3.4vw, 42px)/1.06 'Plus Jakarta Sans'",
                      letterSpacing: "-1.2px",
                      color: "var(--ink)",
                      maxWidth: 480,
                    }}
                  >
                    {momentTitle}
                  </h1>
                </div>
              </div>
            )}

            {/* progress bar */}
            <div style={{ flex: "none", marginTop: 22 }}>
              <div
                style={{
                  height: 4,
                  borderRadius: 99,
                  background: "var(--line2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 99,
                    background:
                      "linear-gradient(90deg,var(--red-d),var(--red))",
                    boxShadow: "0 0 10px var(--glow)",
                    transition: "width .8s cubic-bezier(.22,1,.36,1)",
                    width: progressPct,
                  }}
                />
              </div>
            </div>

            {/* MOBILE dots + phase text */}
            {!desktop && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 11,
                    flex: "none",
                  }}
                >
                  {[0, 1, 2, 3].map((i) => {
                    const on = revealed || i <= phase
                    const active = !revealed && i === phase
                    return (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            transition: "all .4s",
                            background: on ? "var(--red)" : "var(--line2)",
                            boxShadow: on ? "0 0 8px var(--glow)" : undefined,
                            transform: on && active ? "scale(1.25)" : undefined,
                          }}
                        />
                        <span
                          style={{
                            font: "500 9px/1 'JetBrains Mono'",
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            color: on ? "var(--red)" : "var(--muted2)",
                            opacity: on ? undefined : 0.7,
                          }}
                        >
                          {tags[i]}
                        </span>
                      </div>
                    )
                  })}
                </div>
                {showPhase && (
                  <div
                    key={phaseKey}
                    style={{
                      animation: "sc-rise .6s cubic-bezier(.22,1,.36,1) both",
                      marginTop: 22,
                    }}
                  >
                    <div
                      style={{
                        font: "700 22px/1.18 'Plus Jakarta Sans'",
                        letterSpacing: "-.4px",
                        color: "var(--ink)",
                      }}
                    >
                      {phaseLabel}
                    </div>
                    <div
                      style={{
                        marginTop: 9,
                        font: "500 14px/1.5 'Plus Jakarta Sans'",
                        color: "var(--muted)",
                      }}
                    >
                      {phaseSub}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* DESKTOP stepper */}
            {showStepper && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 30,
                }}
              >
                {pd.map((p, i) => {
                  const done = revealed || i < phase
                  const active = !revealed && i === phase
                  const dotStyle: CSSProperties = done
                    ? {
                        background: "var(--red)",
                        color: "#fff",
                        boxShadow: "0 0 12px var(--glow)",
                      }
                    : active
                    ? {
                        background: "var(--red-soft)",
                        color: "var(--red)",
                        border: "2px solid var(--red)",
                        boxShadow: "0 0 14px var(--glow)",
                        animation: "sc-glowpulse 1.6s ease-in-out infinite",
                      }
                    : {
                        background: "var(--card)",
                        border: "2px solid var(--line)",
                        color: "transparent",
                      }
                  const lineStyle: CSSProperties =
                    i === 3
                      ? { display: "none" }
                      : done
                      ? { background: "var(--red)", opacity: 0.35 }
                      : { background: "var(--line)" }
                  const iconHtml = done ? STEP_CHECK : active ? STEP_DOT : ""
                  return (
                    <div
                      key={moment + "-s" + i}
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                        transition: "opacity .5s",
                        opacity: done || active ? 1 : 0.55,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flex: "none",
                          paddingTop: 2,
                        }}
                      >
                        <span
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all .5s",
                            ...dotStyle,
                          }}
                          dangerouslySetInnerHTML={{ __html: iconHtml }}
                        />
                        <span
                          style={{
                            width: 2,
                            flex: 1,
                            minHeight: 26,
                            margin: "6px 0",
                            borderRadius: 2,
                            transition: "background .5s",
                            ...lineStyle,
                          }}
                        />
                      </div>
                      <div style={{ paddingBottom: 8 }}>
                        <div
                          style={{
                            font: "700 17px/1.25 'Plus Jakarta Sans'",
                            letterSpacing: "-.2px",
                            transition: "color .5s",
                            color:
                              done || active ? "var(--ink)" : "var(--muted2)",
                          }}
                        >
                          {p[0]}
                        </div>
                        <div
                          style={{
                            marginTop: 5,
                            font: "500 13.5px/1.5 'Plus Jakarta Sans'",
                            color: "var(--muted)",
                            transition: "opacity .5s",
                            opacity: active ? 1 : 0.55,
                          }}
                        >
                          {p[1]}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* MOMENT 1 reveal: verdict */}
            {showVerdict && (
              <div
                style={{
                  animation: "sc-cardin .7s cubic-bezier(.22,1,.36,1) both",
                  marginTop: 26,
                }}
              >
                <div
                  style={{
                    letterSpacing: "-.5px",
                    color: "var(--ink)",
                    font: `700 ${
                      desktop ? "30px/1.2" : "22px/1.22"
                    } 'Plus Jakarta Sans'`,
                  }}
                >
                  {vTitle}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    font: "500 15px/1.55 'Plus Jakarta Sans'",
                    color: "var(--muted)",
                    maxWidth: 440,
                  }}
                >
                  {vSub}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "9px 13px",
                      borderRadius: 99,
                      whiteSpace: "nowrap",
                      background: "var(--red-soft)",
                      border: "1px solid var(--line)",
                      font: "600 12.5px/1 'Plus Jakarta Sans'",
                      color: "var(--red)",
                    }}
                  >
                    {vChip}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "9px 13px",
                      borderRadius: 99,
                      whiteSpace: "nowrap",
                      background: "var(--card)",
                      border: "1px solid var(--line)",
                      font: "600 12.5px/1 'Plus Jakarta Sans'",
                      color: "var(--ink)",
                    }}
                  >
                    ± 4 pts margin
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "9px 13px",
                      borderRadius: 99,
                      whiteSpace: "nowrap",
                      background: "var(--card)",
                      border: "1px solid var(--line)",
                      font: "600 12.5px/1 'Plus Jakarta Sans'",
                      color: "var(--ink)",
                    }}
                  >
                    {weakAreas.length} pain points found
                  </span>
                </div>
                <button
                  onClick={() => goMoment(2)}
                  style={{
                    marginTop: 24,
                    padding: "16px 24px",
                    borderRadius: 15,
                    background: "var(--red)",
                    color: "#fff",
                    font: "800 15px/1 'Plus Jakarta Sans'",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 12px 26px -14px var(--glow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 9,
                    width: desktop ? "auto" : "100%",
                    alignSelf: desktop ? "flex-start" : undefined,
                  }}
                >
                  See how we lift it
                  <svg
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            )}

            {/* MOMENT 2 reveal: plan cards */}
            {showPlan && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 26,
                }}
              >
                <div
                  style={{
                    animation: "sc-cardin .6s cubic-bezier(.22,1,.36,1) both",
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: 18,
                    padding: "18px 20px",
                    boxShadow: "0 10px 26px -20px rgba(20,20,26,.5)",
                  }}
                >
                  <div
                    style={{
                      font: "600 10px/1 'JetBrains Mono'",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--muted2)",
                      marginBottom: 14,
                    }}
                  >
                    Your daily block{dailyBlock.time ? " · " + dailyBlock.time : ""}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 20,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          font: "800 30px/1 'Plus Jakarta Sans'",
                          letterSpacing: "-1px",
                          color: "var(--ink)",
                        }}
                      >
                        {dailyBlock.questions}
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          font: "600 11px/1 'Plus Jakarta Sans'",
                          color: "var(--muted)",
                        }}
                      >
                        questions
                      </div>
                    </div>
                    <div
                      style={{ width: 1, height: 34, background: "var(--line)" }}
                    />
                    <div>
                      <div
                        style={{
                          font: "800 30px/1 'Plus Jakarta Sans'",
                          letterSpacing: "-1px",
                          color: "var(--ink)",
                        }}
                      >
                        {dailyBlock.minutes}
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          font: "600 11px/1 'Plus Jakarta Sans'",
                          color: "var(--muted)",
                        }}
                      >
                        minutes
                      </div>
                    </div>
                    <div
                      style={{ width: 1, height: 34, background: "var(--line)" }}
                    />
                    <div>
                      <div
                        style={{
                          font: "800 30px/1 'Plus Jakarta Sans'",
                          letterSpacing: "-1px",
                          color: "var(--red)",
                        }}
                      >
                        {dailyBlock.focus}
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          font: "600 11px/1 'Plus Jakarta Sans'",
                          color: "var(--muted)",
                        }}
                      >
                        focus flow
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    animation:
                      "sc-cardin .6s cubic-bezier(.22,1,.36,1) .12s both",
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: 18,
                    padding: "18px 20px",
                    boxShadow: "0 10px 26px -20px rgba(20,20,26,.5)",
                  }}
                >
                  <div
                    style={{
                      font: "600 10px/1 'JetBrains Mono'",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--muted2)",
                      marginBottom: 14,
                    }}
                  >
                    First, your pain points
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {weakAreas.map((w, i) => (
                      <div key={i}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              font: "600 13px/1.2 'Plus Jakarta Sans'",
                              color: "var(--ink)",
                            }}
                          >
                            <span
                              style={{ color: "var(--red)", fontWeight: 700 }}
                            >
                              {w.code}
                            </span>{" "}
                            · {w.name}
                          </span>
                          <span
                            style={{
                              font: "700 12px/1 'JetBrains Mono'",
                              color: "var(--muted)",
                            }}
                          >
                            {w.pct}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: 6,
                            borderRadius: 99,
                            background: "var(--line2)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 99,
                              background:
                                "linear-gradient(90deg,var(--red-d),var(--red))",
                              width: w.pct + "%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    animation:
                      "sc-cardin .6s cubic-bezier(.22,1,.36,1) .24s both",
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: 18,
                    padding: "18px 20px",
                    boxShadow: "0 10px 26px -20px rgba(20,20,26,.5)",
                  }}
                >
                  <div
                    style={{
                      font: "600 10px/1 'JetBrains Mono'",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--muted2)",
                      marginBottom: 15,
                    }}
                  >
                    The road to {examLabel}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {road.map((r, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 13,
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flex: "none",
                          }}
                        >
                          <span
                            style={{
                              width: 11,
                              height: 11,
                              borderRadius: "50%",
                              background: r.done
                                ? "var(--red)"
                                : "var(--card)",
                              boxShadow: r.done
                                ? "0 0 8px var(--glow)"
                                : undefined,
                              border: r.done
                                ? undefined
                                : "2px solid var(--line)",
                            }}
                          />
                          <span
                            style={{
                              width: 2,
                              flex: 1,
                              minHeight: 22,
                              background: "var(--line)",
                              display:
                                i === road.length - 1 ? "none" : undefined,
                              ...(i !== road.length - 1 && r.done
                                ? {
                                    background: "var(--red)",
                                    opacity: 0.35,
                                  }
                                : {}),
                            }}
                          />
                        </div>
                        <div style={{ paddingBottom: 14 }}>
                          <div
                            style={{
                              font: "700 13px/1.2 'Plus Jakarta Sans'",
                              color: "var(--ink)",
                            }}
                          >
                            {r.phase}
                          </div>
                          <div
                            style={{
                              marginTop: 3,
                              font: "500 11.5px/1.3 'Plus Jakarta Sans'",
                              color: "var(--muted)",
                            }}
                          >
                            {r.when}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {onContinue && (
                  <button
                    onClick={onContinue}
                    style={{
                      marginTop: 14,
                      padding: "16px 24px",
                      borderRadius: 15,
                      background: "var(--red)",
                      color: "#fff",
                      font: "800 15px/1 'Plus Jakarta Sans'",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 12px 26px -14px var(--glow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 9,
                      width: desktop ? "auto" : "100%",
                      alignSelf: desktop ? "flex-start" : undefined,
                    }}
                  >
                    Start my plan
                    <svg
                      width={17}
                      height={17}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      {showControls && (
        <div
          style={{
            position: "fixed",
            bottom: 22,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 8,
            borderRadius: 99,
            background: "var(--card)",
            border: "1px solid var(--line)",
            boxShadow: "0 18px 40px -22px rgba(20,20,26,.4)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "var(--paper2)",
              borderRadius: 99,
              padding: 3,
            }}
          >
            <button
              onClick={() => goMoment(1)}
              style={{
                border: "none",
                cursor: "pointer",
                padding: "9px 15px",
                borderRadius: 99,
                font: "700 12px/1 'Plus Jakarta Sans'",
                transition: "all .25s",
                background: isM1 ? "var(--red)" : "transparent",
                color: isM1 ? "#fff" : "var(--muted)",
              }}
            >
              Diagnostic
            </button>
            <button
              onClick={() => goMoment(2)}
              style={{
                border: "none",
                cursor: "pointer",
                padding: "9px 15px",
                borderRadius: 99,
                font: "700 12px/1 'Plus Jakarta Sans'",
                transition: "all .25s",
                background: isM2 ? "var(--red)" : "transparent",
                color: isM2 ? "#fff" : "var(--muted)",
              }}
            >
              Study plan
            </button>
          </div>
          <button
            onClick={() => startRun(moment)}
            title="Replay"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              border: "none",
              cursor: "pointer",
              padding: "9px 14px",
              borderRadius: 99,
              background: "var(--red)",
              color: "#fff",
              font: "700 12px/1 'Plus Jakarta Sans'",
            }}
          >
            <svg
              width={15}
              height={15}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Replay
          </button>
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              border: "1px solid var(--line)",
              cursor: "pointer",
              borderRadius: 99,
              background: "var(--paper)",
              color: "var(--ink)",
            }}
            dangerouslySetInnerHTML={{
              __html: theme === "light" ? THEME_ICON_LIGHT : THEME_ICON_DARK,
            }}
          />
        </div>
      )}
    </div>
  )
}
