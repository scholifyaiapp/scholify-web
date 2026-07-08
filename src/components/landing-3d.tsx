import { useEffect, useState, type CSSProperties, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react"
import {
  Target,
  Map as MapIcon,
  Zap,
  TrendingUp,
  Lock,
  Timer,
  Landmark,
  Stethoscope,
  Flame,
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react"
import { useT } from "@/i18n/LanguageProvider"

/*
 * Landing 3D layer — CSS-perspective scenes, no WebGL payload.
 *
 *   Hero3DShowcase  — the REAL app, staged: a cursor-tilted dashboard window
 *                     (pass-probability ring, next-action mission) with
 *                     floating depth cards (mock trend, momentum, streak,
 *                     Mock 1→2→3) orbiting at different Z layers.
 *   TheLoopSection  — the product ideology, sold: the closed loop as eight
 *                     tilt cards + the GPS strip + the recovery promise.
 *
 * The app depicted inside the window is the English-only product, so mockup
 * strings stay EN by design; all narrative copy goes through t().
 */

const INK = "#14141A"
const INK_MUTED = "#6B6B76"
const HAIR = "rgba(20,20,26,0.08)"
const BRAND = "#C80000"
const PLUM = "#E50068"
const FIRE = "#F4A405"
const GREEN = "#0E9F6E"
const AMBER = "#C2740B"
const GRAD = "linear-gradient(135deg, #C80000 0%, #E50068 50%, #F4A405 100%)"
const EASE = [0.22, 1, 0.36, 1] as const

/* ── shared: media + pointer-tilt rigs ────────────────────────── */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [query])
  return matches
}

/** Phones/tablets: no hover cursor — tilt should be automatic, not tracked. */
function useCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)")
}

function useTilt(maxDeg = 9) {
  const reduce = useReducedMotion()
  const coarse = useCoarsePointer()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 140, damping: 18 })
  const sy = useSpring(my, { stiffness: 140, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-maxDeg, maxDeg])
  const rotateX = useTransform(sy, [0, 1], [maxDeg, -maxDeg])

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    // On touch, pointermove fires mid-scroll — tracking it fights the thumb.
    if (reduce || coarse) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  function onPointerLeave() {
    mx.set(0.5)
    my.set(0.5)
  }
  return { rotateX, rotateY, onPointerMove, onPointerLeave, reduce, coarse }
}

/* ── the hero showcase — the app, staged in 3D ─────────────────── */

function MiniRing({ value, size = 118 }: { value: number; size?: number }) {
  const stroke = 10
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const [shown, setShown] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400)
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1EFEA" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={AMBER}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {/* the 50% pass-line tick */}
        <line
          x1={size / 2}
          y1={size}
          x2={size / 2}
          y2={size - stroke - 4}
          stroke={INK}
          strokeWidth={2}
          opacity={0.45}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: INK, lineHeight: 1 }}>
            {shown}
            <span style={{ fontSize: 13, fontWeight: 700, color: INK_MUTED }}>%</span>
          </div>
          <div style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 0.5, color: AMBER, marginTop: 2 }}>TO PASS</div>
        </div>
      </div>
    </div>
  )
}

function FloatCard({
  z,
  x,
  y,
  delay,
  duration = 5,
  children,
  style,
}: {
  /** depth in px (translateZ). */
  z: number
  x: string
  y: string
  delay: number
  duration?: number
  children: ReactNode
  style?: CSSProperties
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{ position: "absolute", left: x, top: y, transform: `translateZ(${z}px)`, transformStyle: "preserve-3d", ...style }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        style={{
          background: "#fff",
          border: `1px solid ${HAIR}`,
          borderRadius: 14,
          boxShadow: "0 18px 44px -14px rgba(20,20,26,0.22)",
          padding: "10px 13px",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Hero3DShowcase() {
  const { rotateX, rotateY, onPointerMove, onPointerLeave, reduce, coarse } = useTilt(8)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const trend = [41, 43, 47, 52, 55]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      style={{ perspective: 1200, marginTop: isMobile ? 48 : 64, display: "flex", justifyContent: "center" }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        // Touch devices can't tilt with a cursor — give them a slow,
        // self-driven 3D sway instead so the scene still reads as 3D.
        animate={coarse && !reduce ? { rotateX: [2.5, -2.5, 2.5], rotateY: [-5, 5, -5] } : undefined}
        transition={coarse && !reduce ? { duration: 9, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{
          rotateX: coarse ? undefined : rotateX,
          rotateY: coarse ? undefined : rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          width: "min(660px, 92vw)",
        }}
      >
        {/* the app window */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${HAIR}`,
            borderRadius: 22,
            boxShadow: "0 40px 90px -30px rgba(20,20,26,0.35), 0 12px 30px -18px rgba(200,0,0,0.18)",
            overflow: "hidden",
            transform: "translateZ(0px)",
          }}
        >
          {/* window chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: `1px solid ${HAIR}`, background: "#FAFAF7" }}>
            {["#F87171", "#FBBF24", "#34D399"].map((c) => (
              <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 600, color: INK_MUTED, padding: "3px 12px", borderRadius: 999, background: "#F1EFEA" }}>
              scholifyapp.com/dashboard
            </span>
          </div>

          {/* app body — real Dashboard composition, EN by design */}
          <div style={{ padding: isMobile ? "16px 16px 18px" : "20px 22px 22px", textAlign: "left" }}>
            <div style={{ fontSize: 15.5, fontWeight: 800, color: INK }}>Good morning, Amara</div>
            <div style={{ fontSize: 12.5, color: INK_MUTED, marginTop: 3 }}>
              You're at <b style={{ color: INK }}>68%</b> to pass FR — today's plan pushes it higher.
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 14 : 20, marginTop: 18, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
              <MiniRing value={68} size={isMobile ? 100 : 118} />
              <div style={{ flex: 1, minWidth: isMobile ? "100%" : 220 }}>
                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 0.7, color: INK_MUTED }}>
                  YOUR NEXT ACTION · THE PLAN ALREADY CHOSE
                </div>
                <div
                  style={{
                    marginTop: 8,
                    padding: "12px 14px",
                    borderRadius: 13,
                    border: "1px solid rgba(200,0,0,0.28)",
                    background: "linear-gradient(135deg, rgba(200,0,0,0.05), #fff)",
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ width: 34, height: 34, borderRadius: 9, background: GRAD, display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Target size={16} color="#fff" strokeWidth={2.4} />
                  </span>
                  <span style={{ flex: 1, minWidth: 160 }}>
                    <span style={{ display: "block", fontWeight: 750, fontSize: 13, color: INK }}>
                      ① Recover the marks in Group Accounts
                    </span>
                    <span style={{ display: "block", fontSize: 11, color: INK_MUTED, marginTop: 1 }}>
                      Your weakest area — worth the most today · ~25 min
                    </span>
                  </span>
                  <span
                    style={{
                      padding: "9px 14px",
                      borderRadius: 10,
                      background: GRAD,
                      color: "#fff",
                      fontSize: 11.5,
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      textAlign: "center",
                      ...(isMobile ? { flexBasis: "100%" } : {}),
                    }}
                  >
                    Start now
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 8, fontSize: 10.5, color: INK_MUTED, flexWrap: "wrap" }}>
                  <span style={{ padding: "4px 9px", borderRadius: 999, background: "#F1EFEA" }}>② 23 flashcards · ~12 min</span>
                  <span style={{ padding: "4px 9px", borderRadius: 999, background: "#F1EFEA" }}>③ Fresh mock · ~30 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* floating depth layers — repositioned (and trimmed) on phones so
            nothing clips at the viewport edge or covers the mission card */}
        <FloatCard z={70} x={isMobile ? "2%" : "-7%"} y={isMobile ? "-7%" : "18%"} delay={0.5} duration={5.4}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 800, color: GREEN }}>
            <TrendingUp size={14} strokeWidth={2.6} />
            +6 pts this week
          </div>
        </FloatCard>

        {!isMobile && (
          <FloatCard z={55} x="72%" y="-9%" delay={0.65} duration={6}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.6, color: INK_MUTED, marginBottom: 6 }}>MOCK TREND</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 34, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, right: 0, bottom: "50%", height: 1, background: INK, opacity: 0.2 }} />
              {trend.map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 3 }}
                  whileInView={{ height: `${p}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                  style={{ width: 9, borderRadius: "3px 3px 0 0", background: p >= 50 ? GREEN : BRAND, display: "block" }}
                />
              ))}
            </div>
            <div style={{ fontSize: 9.5, color: INK_MUTED, marginTop: 4 }}>
              best <b style={{ color: GREEN }}>55%</b> · pass line 50%
            </div>
          </FloatCard>
        )}

        <FloatCard z={45} x={isMobile ? "3%" : "4%"} y={isMobile ? "94%" : "86%"} delay={0.8} duration={5.8}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 750, color: INK }}>
            <Flame size={14} color={FIRE} fill={FIRE} strokeWidth={0} />
            14-day streak
          </div>
        </FloatCard>

        <FloatCard z={62} x={isMobile ? "48%" : "66%"} y={isMobile ? "96%" : "88%"} delay={0.95} duration={6.4}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 750 }}>
            {[1, 2].map((n) => (
              <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 3, color: GREEN }}>
                <Check size={12} strokeWidth={3} /> Mock {n}
              </span>
            ))}
            {!isMobile && <span style={{ color: INK_MUTED }}>Mock 3 →</span>}
          </div>
        </FloatCard>
      </motion.div>
    </motion.div>
  )
}

/* ── the loop, sold — eight stages, one promise ─────────────────── */

function TiltCard({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(10)
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{ perspective: 700 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: "100%" }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function TheLoopSection() {
  const t = useT()
  const navigate = useNavigate()
  const navigateToSignup = () => navigate("/signup")

  const STAGES: { icon: LucideIcon; tint: string; bg: string; title: string; line: string }[] = [
    { icon: Target, tint: BRAND, bg: "#FBE7E4", title: t("Diagnostic"), line: t("~15 minutes → your real pass probability, area by area.") },
    { icon: MapIcon, tint: PLUM, bg: "#FCE4EF", title: t("Roadmap"), line: t("Four phases, dated back from your exam day.") },
    { icon: Zap, tint: FIRE, bg: "#FDF2DC", title: t("Daily mission"), line: t("Three tasks a day, already chosen. You never decide what to study.") },
    { icon: TrendingUp, tint: GREEN, bg: "#DDFAF4", title: t("Progress check"), line: t("Every answer moves your live pass probability.") },
    { icon: Lock, tint: AMBER, bg: "#FDF2DC", title: t("The 60% gate"), line: t("Mocks unlock when the model says you're ready — not before.") },
    { icon: Timer, tint: BRAND, bg: "#FBE7E4", title: t("Mock 1 → 2 → 3"), line: t("Timed, no hints. Three passes and you're proven under exam conditions.") },
    { icon: Landmark, tint: INK, bg: "#F1EFEA", title: t("The real exam"), line: t("You walk in rehearsed — the sitting is a repeat of your mocks.") },
    { icon: Stethoscope, tint: AMBER, bg: "#FDF2DC", title: t("Recovery run"), line: t("Not this time? Import your mark — we find the lost marks and win them back.") },
  ]

  const GPS = [t("You act"), t("Scholify measures"), t("your model updates"), t("the roadmap recalculates"), t("you get the next best task")]

  return (
    <section style={{ padding: "110px 24px", background: "#F1EFEA", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 26px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", color: BRAND, marginBottom: 14 }}>
            <span style={{ width: 18, height: 2, background: BRAND, display: "inline-block" }} />
            {t("THE METHOD")}
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(30px, 4.4vw, 46px)", color: INK, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            {t("One closed loop —")} <span style={{ background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t("until you pass")}</span>
          </h2>
          <p style={{ fontSize: 16.5, color: INK_MUTED, lineHeight: 1.6, margin: "16px 0 0" }}>
            {t("Scholify isn't a question bank you wander through. It's a GPS: every action you take feeds a learner model, and the model hands you the next best task. There is no \"finished\" until the paper is passed.")}
          </p>
        </div>

        {/* the GPS strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap", margin: "0 auto 46px" }}
        >
          {GPS.map((step, i) => (
            <span key={step} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  padding: "7px 14px",
                  borderRadius: 999,
                  background: i === GPS.length - 1 ? GRAD : "#fff",
                  color: i === GPS.length - 1 ? "#fff" : INK,
                  border: `1px solid ${i === GPS.length - 1 ? "transparent" : HAIR}`,
                  fontSize: 12.5,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
              {i < GPS.length - 1 && <ArrowRight size={13} color={INK_MUTED} strokeWidth={2.4} />}
            </span>
          ))}
        </motion.div>

        {/* eight stages, 3D-tilted */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {STAGES.map((s, i) => (
            <TiltCard key={s.title} delay={i * 0.06}>
              <div
                style={{
                  background: "#fff",
                  border: `1px solid ${HAIR}`,
                  borderRadius: 18,
                  padding: 20,
                  height: "100%",
                  boxSizing: "border-box",
                  boxShadow: "0 6px 22px -10px rgba(20,20,26,0.12)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, transform: "translateZ(26px)" }}>
                  <span style={{ width: 38, height: 38, borderRadius: 11, background: s.bg, display: "grid", placeItems: "center" }}>
                    <s.icon size={18} color={s.tint} strokeWidth={2.2} />
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: INK_MUTED, letterSpacing: 0.4 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, color: INK, transform: "translateZ(18px)" }}>{s.title}</div>
                <div style={{ fontSize: 13, color: INK_MUTED, lineHeight: 1.55, marginTop: 5 }}>{s.line}</div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* the recovery promise */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            marginTop: 40,
            borderRadius: 22,
            padding: "30px 32px",
            background: "linear-gradient(135deg, #1c0f10, #3a0d16 60%, #55102a)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.1em", color: FIRE, marginBottom: 8 }}>
              {t("THE PROMISE")}
            </div>
            <div className="font-display" style={{ fontSize: "clamp(20px, 2.6vw, 27px)", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
              {t("Fail a sitting and it's a stage, not an ending.")}
            </div>
            <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: "10px 0 0", maxWidth: 560 }}>
              {t("You'll know exactly where the marks were lost. The model recalibrates, the plan rebuilds, and every answer earns your pass probability back — targeted drills, a fresh mock, then the retake from strength.")}
            </p>
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={navigateToSignup}
            style={{
              padding: "15px 26px",
              borderRadius: 14,
              border: "none",
              background: GRAD,
              color: "#fff",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              boxShadow: "0 12px 30px -8px rgba(200,0,0,0.5)",
            }}
          >
            {t("Enter the loop — free")} <ArrowRight size={17} strokeWidth={2.6} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
