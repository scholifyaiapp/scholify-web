import { useEffect, useRef, useState, lazy, Suspense } from "react"
import { useNavigate } from "react-router-dom"
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "motion/react"
import {
  Target,
  Zap,
  Flame,
  Shield,
  MessageCircle,
  Share2,
  ArrowRight,
  Check,
  X,
  Sparkles,
  Play,
  Star,
} from "lucide-react"
import NavHeader from "@/components/ui/nav-header"
import { MovingBorder } from "@/components/ui/moving-border"
import { GlowCard } from "@/components/ui/spotlight-card"
import { PricingInteraction } from "@/components/ui/pricing-interaction"
import { LiquidButton, LiquidGlassFilterDefs } from "@/components/ui/liquid-glass-button"
import { StoreBadge } from "@/components/ui/store-badge"
import { TestimonialsColumns } from "@/components/ui/testimonials-columns"
import { HandWrittenTitle } from "@/components/ui/hand-writing-text"
import { CinematicFooter } from "@/components/ui/motion-footer"
import { AnimatedText } from "@/components/ui/animated-shiny-text"
import { ImageComparison } from "@/components/ui/image-comparison-slider"
import { ImageSwiper } from "@/components/ui/image-swiper"
import LazyOnView from "@/components/LazyOnView"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-id"?: string
      }
    }
  }
}

const Entropy = lazy(() =>
  import("@/components/ui/entropy").then((m) => ({ default: m.Entropy }))
)

/* ─────────────────────── TOKENS (mirror of CSS vars) ─────────────────────── */
const BG_PRIMARY = "#FAFAF7"
const BG_SECONDARY = "#F1EFEA"
const BG_DARK = "#0B0B0F"
const INK = "#14141A"
const INK_MUTED = "#6B6B76"
const INK_INVERSE = "#FAFAF7"
const BRAND_500 = "#5B5BF5"
const BRAND_400 = "#7C7CFF"
const BRAND_100 = "#E8E8FF"
const FIRE_500 = "#FF6B3D"
const FIRE_100 = "#FFE8DF"
const SHIELD_500 = "#2DD4BF"
const SHIELD_100 = "#DDFAF4"
const PLUM_500 = "#A855F7"
const PLUM_100 = "#F3E8FF"
const HAIR = "rgba(20,20,26,0.08)"
const GRAD_HERO = "linear-gradient(135deg, #5B5BF5 0%, #A855F7 50%, #FF6B3D 100%)"

const EASE_DECISIVE = [0.22, 1, 0.36, 1] as const
const EASE_HOVER = [0.4, 0, 0.2, 1] as const

/* ─────────────────────── UTILITY HOOKS ─────────────────────── */

function useTypewriter(text: string, speedMs = 28, start = true) {
  const [typed, setTyped] = useState("")
  const prefersReduced = useReducedMotion()
  useEffect(() => {
    if (!start) {
      setTyped("")
      return
    }
    if (prefersReduced) {
      setTyped(text)
      return
    }
    setTyped("")
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speedMs)
    return () => clearInterval(id)
  }, [text, speedMs, start, prefersReduced])
  return typed
}

function useCountUp(target: number, durationMs = 1200, start = true) {
  const [val, setVal] = useState(0)
  const prefersReduced = useReducedMotion()
  useEffect(() => {
    if (!start) {
      setVal(0)
      return
    }
    if (prefersReduced) {
      setVal(target)
      return
    }
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const elapsed = t - t0
      const p = Math.min(1, elapsed / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs, start, prefersReduced])
  return val
}

function useInViewOnce<T extends HTMLElement>(margin = "-80px") {
  const ref = useRef<T | null>(null)
  const inView = useInView(ref, { once: true, margin: margin as any })
  return { ref, inView }
}

/* ─────────────────────── ATOMS ─────────────────────── */

function ScholifyLogo({ size = 32, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <span
        style={{
          display: "inline-grid",
          placeItems: "center",
          width: size,
          height: size,
          borderRadius: 10,
          overflow: "hidden",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Scholify"
      >
        <img
          src="/logo.svg"
          alt="Scholify"
          width={size}
          height={size}
          decoding="async"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
        />
      </span>
      {wordmark && (
        <span
          className="font-display"
          style={{ color: INK, fontSize: Math.max(20, size * 0.75), lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 700 }}
        >
          Scholify
        </span>
      )}
    </a>
  )
}

function SectionLabel({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "inverse" }) {
  const isInverse = tone === "inverse"
  return (
    <span
      className="font-mono-pro"
      style={{
        display: "inline-block",
        padding: "5px 14px",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: isInverse ? "rgba(250,250,247,0.7)" : INK_MUTED,
        background: isInverse ? "rgba(255,255,255,0.06)" : "rgba(20,20,26,0.04)",
        border: isInverse ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${HAIR}`,
        borderRadius: 999,
      }}
    >
      {children}
    </span>
  )
}

const CTA_SPRING = { type: "spring", stiffness: 360, damping: 24, mass: 0.6 } as const
const MONO_BLACK = "#0B0B0F"
const MONO_WHITE = "#FFFFFF"

function PrimaryCTA({ children, onClick, large = false }: { children: React.ReactNode; onClick?: () => void; large?: boolean }) {
  return (
    <span style={{ display: "inline-block" }}>
      <button
        type="button"
        onClick={onClick}
        className="scholify-glass-pill-primary rounded-full font-bold"
        style={{
          padding: large ? "16px 32px" : "12px 24px",
          fontSize: large ? 17 : 15,
          gap: 10,
          display: "inline-flex",
          alignItems: "center",
          border: "none",
          cursor: "pointer",
        }}
      >
        {children}
      </button>
    </span>
  )
}

function GhostCTA({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={CTA_SPRING}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ display: "inline-block" }}
    >
      <LiquidButton
        onClick={onClick}
        size="xl"
        className="!rounded-full font-semibold gap-2"
        style={{
          background: hovered ? MONO_BLACK : MONO_WHITE,
          color: hovered ? MONO_WHITE : MONO_BLACK,
          border: `1.5px solid ${MONO_BLACK}`,
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        {children}
      </LiquidButton>
    </motion.div>
  )
}

/* ─────────────────────── NAV ─────────────────────── */

function Nav() {
  const navigate = useNavigate()
  return (
    <motion.header
      initial={{ y: -20, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.7, ease: EASE_DECISIVE }}
      className="glass-light"
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        zIndex: 100,
        width: "calc(100% - 32px)",
        maxWidth: 1200,
        height: 60,
        padding: "0 12px 0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        borderRadius: 999,
        boxShadow: "0 1px 2px rgba(20,20,26,0.04), 0 12px 32px rgba(20,20,26,0.06)",
      }}
    >
      <ScholifyLogo size={28} />

      <div
        className="md:!block"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "none",
        }}
      >
        <NavHeader
          items={[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Stories", href: "#stories" },
          ]}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <a
          href="/signin"
          onClick={(e) => {
            e.preventDefault()
            navigate("/signin")
          }}
          className="scholify-glass-pill rounded-full px-5 py-2 text-sm font-semibold"
          style={{ color: "var(--foreground)", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
        >
          Sign in
        </a>
        <a
          href="/onboarding"
          onClick={(e) => {
            e.preventDefault()
            navigate("/onboarding")
          }}
          className="scholify-glass-pill-primary rounded-full px-5 py-2 text-sm font-bold"
          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
        >
          Start for free
        </a>
      </div>
    </motion.header>
  )
}

/* ─────────────────────── HERO ─────────────────────── */

function HeroHeadline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE_DECISIVE, delay: 0.1 }}
      style={{
        marginTop: 32,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedText
        text="Welcome to Scholify"
        textClassName="font-display font-normal tracking-[-0.03em]"
        gradientColors="linear-gradient(90deg, #14141A 0%, #5B5BF5 40%, #A855F7 50%, #5B5BF5 60%, #14141A 100%)"
        gradientAnimationDuration={3.5}
        className="!py-0"
      />
    </motion.div>
  )
}

function FloatingParticle({ left, top, color, size = 12 }: { left: string; top: string; color: string; delay?: number; size?: number; range?: number }) {
  return (
    <span
      style={{
        position: "absolute",
        left,
        top,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 8px 24px -6px ${color}`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  )
}

function PhoneMockup() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(containerRef, { once: true, margin: "-120px" })
  const streak = 14
  const greeting = "Hey Nuriddin"

  const childStagger = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay: 0.6 + i * 0.12, ease: EASE_DECISIVE },
  })

  return (
    <div ref={containerRef} style={{ position: "relative", marginTop: 96, display: "flex", justifyContent: "center" }}>
      <FloatingParticle left="22%" top="20%" color={BRAND_100} delay={0} size={14} />
      <FloatingParticle left="78%" top="14%" color={FIRE_100} delay={1.2} size={10} />
      <FloatingParticle left="14%" top="64%" color={SHIELD_100} delay={2.4} size={12} />
      <FloatingParticle left="82%" top="68%" color={PLUM_100} delay={0.6} size={11} />

      <div
        style={{
          position: "absolute",
          width: 600,
          height: 480,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse, ${BRAND_500}22 0%, transparent 70%)`,
          zIndex: -1,
          pointerEvents: "none",
          filter: "blur(28px)",
        }}
      />

      <motion.div
        style={{
          width: 300,
          height: 600,
          borderRadius: 32,
          background: BG_DARK,
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 60px 120px -32px rgba(20,20,26,0.45), 0 0 0 1px rgba(20,20,26,0.05)",
          overflow: "hidden",
          padding: 16,
          position: "relative",
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
      >
        <div style={{ width: 90, height: 28, background: "#000", borderRadius: "0 0 16px 16px", margin: "0 auto" }} />

        <motion.div {...childStagger(0)} style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: INK_INVERSE, fontSize: 16, fontWeight: 600 }}>
            {greeting} <span aria-hidden>👋</span>
          </span>
          <span
            className="font-mono-pro"
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
              color: FIRE_500,
              background: `${FIRE_500}14`,
              border: `1px solid ${FIRE_500}3a`,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Flame size={12} strokeWidth={2.4} />
            <span className="tabular">{streak}</span>
          </span>
        </motion.div>

        <motion.div {...childStagger(1)} style={{ color: "rgba(250,250,247,0.45)", fontSize: 12, marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
          <Shield size={12} color={SHIELD_500} /> 2 shields this week
        </motion.div>

        <motion.div
          {...childStagger(2)}
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 16,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.12em", color: BRAND_400, fontWeight: 500 }}>
            DAY <span className="tabular">14</span> OF <span className="tabular">47</span> · <span className="tabular">25</span> MIN
          </div>
          <div style={{ color: INK_INVERSE, fontSize: 15, fontWeight: 600, marginTop: 8 }}>
            IELTS Writing Task 2 Strategy
          </div>
          <div style={{ color: "rgba(250,250,247,0.4)", fontSize: 12, marginTop: 4 }}>
            Analyze argument structure…
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "14px 0" }} />

          <div className="font-mono-pro" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(250,250,247,0.5)" }}>
            <span><span className="tabular">48</span>% complete</span>
            <span><span className="tabular">23</span> days left</span>
          </div>
          <div style={{ height: 6, marginTop: 8, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "48%" } : {}}
              transition={{ duration: 1.2, delay: 1, ease: EASE_DECISIVE }}
              style={{ height: "100%", background: GRAD_HERO }}
            />
          </div>
        </motion.div>

        <motion.button
          {...childStagger(3)}
          whileHover={{ filter: "brightness(1.06)" }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: 14,
            width: "100%",
            background: BRAND_500,
            border: "none",
            borderRadius: 14,
            padding: 14,
            color: "white",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: `0 8px 22px -6px ${BRAND_500}80`,
          }}
        >
          Mark today complete
        </motion.button>

        <motion.div
          {...childStagger(4)}
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 14,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: GRAD_HERO,
              }}
            />
            <div className="font-mono-pro" style={{ fontSize: 10, color: BRAND_400, fontWeight: 500, letterSpacing: "0.08em" }}>LARA · YOUR COACH</div>
          </div>
          <div style={{ color: "rgba(250,250,247,0.7)", fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
            Day <span className="font-mono-pro tabular">14</span>. You've studied <span className="font-mono-pro tabular">5.8</span>h total. Keep this up.
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Hero() {
  const navigate = useNavigate()
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "140px 24px 96px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_DECISIVE }}
          className="glass-light"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px 6px 8px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            color: INK,
          }}
        >
          <Sparkles size={14} color={BRAND_500} />
          <span style={{ color: INK_MUTED }}>Lara just got 3× smarter — try it free</span>
        </motion.div>

        <HeroHeadline />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE_DECISIVE }}
          style={{
            fontSize: 20,
            color: INK_MUTED,
            maxWidth: 560,
            margin: "12px auto 0",
            lineHeight: 1.55,
          }}
        >
          Set your goal. Lara builds the plan. You just show up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE_DECISIVE }}
          style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}
        >
          <PrimaryCTA onClick={() => navigate("/onboarding")}>
            Start for free <ArrowRight size={18} strokeWidth={2.4} />
          </PrimaryCTA>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          style={{ marginTop: 36, display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}
        >
          <div style={{ display: "flex" }}>
            {[
              { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80&h=80", alt: "Learner avatar" },
              { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80&h=80", alt: "Learner avatar" },
              { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=80&h=80", alt: "Learner avatar" },
              { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80", alt: "Learner avatar" },
            ].map((a, i) => (
              <img
                key={i}
                src={a.src}
                alt={a.alt}
                width={32}
                height={32}
                decoding="async"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${BG_PRIMARY}`,
                  marginLeft: i === 0 ? 0 : -10,
                  boxShadow: "0 4px 10px -2px rgba(20,20,26,0.15)",
                  display: "block",
                }}
              />
            ))}
          </div>
          <span style={{ color: INK_MUTED, fontSize: 13 }}>
            <span className="font-mono-pro tabular" style={{ color: INK, fontWeight: 500 }}>2,400+</span> learners ·{" "}
            <span className="font-mono-pro tabular" style={{ color: INK, fontWeight: 500 }}>4.9</span>
            <Star size={11} strokeWidth={0} fill={FIRE_500} style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 2, marginRight: 2 }} />
            · Free to start
          </span>
        </motion.div>

        <div style={{ marginTop: 48 }}>
          <HandWrittenTitle
            title="Just start today."
            subtitle="The rest is on Scholify."
          />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── PROBLEM ─────────────────────── */

function StatCard({ value, label, source, delay, tone = "blue" }: { value: string; label: string; source: string; delay: number; tone?: GlowTone }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-100px")
  const numeric = Number.parseFloat(value)
  const isPercent = value.endsWith("%")
  const isMin = value.includes("min")
  const isMult = value.endsWith("×")
  const animated = useCountUp(isNaN(numeric) ? 0 : numeric, 1400, inView)
  const display = isPercent
    ? `${Math.round(animated)}%`
    : isMin
      ? `${Math.round(animated)} min`
      : isMult
        ? `${Math.round(animated)}×`
        : value

  return (
    <GlowCard customSize glowColor={tone} className="!w-full !p-1 !gap-0 !rounded-3xl !shadow-none">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: EASE_DECISIVE }}
        whileHover={{ y: -4, boxShadow: "0 1px 2px rgba(20,20,26,0.04), 0 24px 48px rgba(20,20,26,0.08)" }}
        className="soft-card"
        style={{ padding: 36, textAlign: "center", borderRadius: 18 }}
      >
        <div
          className="font-mono-pro tabular"
          style={{
            fontSize: "clamp(56px, 6vw, 72px)",
            fontWeight: 500,
            color: BRAND_500,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {display}
        </div>
        <div style={{ marginTop: 14, color: INK, fontSize: 15, fontWeight: 500 }}>{label}</div>
        <div style={{ marginTop: 6, color: INK_MUTED, fontSize: 12 }}>{source}</div>
      </motion.div>
    </GlowCard>
  )
}

function Problem() {
  return (
    <section style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 72px)", color: INK, margin: 0 }}>
          The internet gave you everything to learn.
        </h2>
        <h2 className="font-display text-pro-h grad-hero-text" style={{ fontSize: "clamp(36px, 5vw, 72px)", margin: "16px 0 0", fontStyle: "italic" }}>
          Scholify gives you the discipline to finish.
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 18, maxWidth: 620, margin: "32px auto 0", lineHeight: 1.65 }}>
          <span className="font-mono-pro tabular" style={{ color: INK, fontWeight: 700 }}>92%</span> of online courses are abandoned within 30 days — not from lack of motivation, but lack of a daily rhythm. Scholify is the rhythm.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginTop: 72 }}>
          <StatCard tone="blue" value="92%" label="of online courses never finished" source="Source: MIT research" delay={0.05} />
          <StatCard tone="green" value="5 min" label="is all Scholify asks per day" source="Less than one TikTok scroll" delay={0.15} />
          <StatCard tone="purple" value="14×" label="more consistent than self-study" source="Based on habit formation research" delay={0.25} />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── HOW IT WORKS ─────────────────────── */

const steps = [
  { num: "01", label: "CUE", title: "Set your goal", desc: "Type what you want to learn. Add your deadline. Tell Lara how many minutes you have per day. That's it.", Icon: Target, accent: BRAND_500 },
  { num: "02", label: "CRAVING", title: "Lara builds your plan", desc: "In 15 seconds, Lara generates a complete day-by-day learning plan tailored to your goal, deadline, and time.", Icon: Zap, accent: PLUM_500 },
  { num: "03", label: "RESPONSE → REWARD", title: "Show up daily", desc: "Complete your daily task. Earn your streak. If life happens, your shield protects you. You never start over.", Icon: Flame, accent: FIRE_500 },
]

function HowItWorks() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-120px")
  return (
    <section id="how-it-works" style={{ padding: "96px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>HOW IT WORKS</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 80px)", color: INK, margin: "18px 0 0" }}>
          From goal to habit in <em style={{ fontStyle: "italic" }}>60 seconds</em>.
        </h2>

        <div ref={ref} style={{ position: "relative", marginTop: 80 }}>
          <svg
            className="hidden md:block"
            width="100%"
            height="2"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            style={{ position: "absolute", left: 0, right: 0, top: 30, pointerEvents: "none" }}
          >
            <defs>
              <linearGradient id="step-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={BRAND_500} stopOpacity="0" />
                <stop offset="20%" stopColor={BRAND_500} stopOpacity="0.5" />
                <stop offset="50%" stopColor={PLUM_500} stopOpacity="0.5" />
                <stop offset="80%" stopColor={FIRE_500} stopOpacity="0.5" />
                <stop offset="100%" stopColor={FIRE_500} stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.line
              x1="0"
              x2="1000"
              y1="1"
              y2="1"
              stroke="url(#step-line)"
              strokeWidth="2"
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              animate={inView ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 1.4, ease: EASE_DECISIVE }}
            />
          </svg>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 36, position: "relative" }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.18, ease: EASE_DECISIVE }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: [0, 1.1, 1] } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.18, ease: EASE_DECISIVE }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    background: BG_PRIMARY,
                    border: `1px solid ${HAIR}`,
                    boxShadow: `0 1px 2px rgba(20,20,26,0.04), 0 14px 28px -10px ${step.accent}66`,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <span className="font-mono-pro tabular" style={{ color: step.accent, fontWeight: 500, fontSize: 16 }}>{step.num}</span>
                </motion.div>
                <div style={{ marginTop: 22, width: 48, height: 48, borderRadius: 14, background: `${step.accent}1a`, display: "grid", placeItems: "center" }}>
                  <step.Icon size={22} color={step.accent} strokeWidth={2.2} />
                </div>
                <div className="font-mono-pro" style={{ marginTop: 12, fontSize: 10, letterSpacing: "0.14em", color: INK_MUTED, fontWeight: 500 }}>
                  {step.label}
                </div>
                <div className="font-display" style={{ color: INK, fontSize: 26, marginTop: 6, letterSpacing: "-0.02em" }}>
                  {step.title}
                </div>
                <div style={{ color: INK_MUTED, fontSize: 14, lineHeight: 1.7, marginTop: 10, maxWidth: 260 }}>
                  {step.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── FEATURES (alternating) ─────────────────────── */

function FeatureCheck({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div
        style={{
          width: 22,
          height: 22,
          flexShrink: 0,
          borderRadius: "50%",
          background: BRAND_500,
          display: "grid",
          placeItems: "center",
          color: "white",
          marginTop: 1,
        }}
      >
        <Check size={12} strokeWidth={3} />
      </div>
      <span style={{ color: INK, fontSize: 14.5, fontWeight: 500 }}>{children}</span>
    </div>
  )
}

function FeatureBlock({ tag, title, desc, bullets, visual, reverse, index }: { tag: string; title: React.ReactNode; desc: string; bullets: string[]; visual: React.ReactNode; reverse: boolean; index: number }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 80,
        alignItems: "center",
        flexWrap: "wrap",
        padding: "72px 0",
        flexDirection: reverse ? "row-reverse" : "row",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE_DECISIVE, delay: index * 0.04 }}
        style={{ flex: 1, minWidth: 280 }}
      >
        <SectionLabel>{tag}</SectionLabel>
        <h3 className="font-display text-pro-h" style={{ color: INK, fontSize: "clamp(32px, 4vw, 56px)", margin: "16px 0 0" }}>
          {title}
        </h3>
        <p style={{ color: INK_MUTED, fontSize: 17, lineHeight: 1.7, marginTop: 18 }}>{desc}</p>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
          {bullets.map((b) => <FeatureCheck key={b}>{b}</FeatureCheck>)}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE_DECISIVE, delay: index * 0.04 + 0.1 }}
        style={{ flex: 1, minWidth: 280, display: "flex", justifyContent: "center" }}
      >
        {visual}
      </motion.div>
    </div>
  )
}

/* ── A — AI Brain visual: Lara generating plan ── */

function VisualPlanGen() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-100px")
  const tasks = [
    "Day 1 · IELTS — Task 1 fundamentals",
    "Day 2 · Task 1 — line graphs",
    "Day 3 · Task 2 — argument essays",
    "Day 4 · Task 2 — structure drills",
  ]
  return (
    <div ref={ref} className="soft-card" style={{ width: 420, maxWidth: "100%", padding: 28 }}>
      <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.12em", color: INK_MUTED, fontWeight: 500 }}>YOUR GOAL</div>
      <div style={{ color: INK, fontSize: 16, marginTop: 8, fontWeight: 500 }}>
        Pass IELTS 7.0 in <span className="font-mono-pro tabular">47</span> days · <span className="font-mono-pro tabular">25</span> min/day
      </div>
      <div style={{ height: 1, background: HAIR, margin: "18px 0" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <motion.div
          animate={inView ? { rotate: 360 } : {}}
          transition={{ duration: 1.8, repeat: 1, ease: "linear" }}
          style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${BRAND_100}`, borderTopColor: BRAND_500 }}
        />
        <span style={{ color: INK_MUTED, fontSize: 13 }}>Lara is generating your plan…</span>
      </div>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {tasks.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.6 + i * 0.18, ease: EASE_DECISIVE }}
            style={{ display: "flex", gap: 10, alignItems: "center", color: INK, fontSize: 13.5, fontWeight: 500 }}
          >
            <Check size={14} color={SHIELD_500} strokeWidth={3} /> {t}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 + tasks.length * 0.18 + 0.2 }}
          className="font-mono-pro"
          style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.14em", color: BRAND_500, fontWeight: 500 }}
        >
          ⬤ PLAN READY
        </motion.div>
      </div>
    </div>
  )
}

/* ── B — Life Shields interactive demo ── */

function ShieldBurst({ show }: { show: boolean }) {
  if (!show) return null
  const dots = Array.from({ length: 10 })
  return (
    <>
      {dots.map((_, i) => {
        const angle = (i / dots.length) * Math.PI * 2
        const dx = Math.cos(angle) * 80
        const dy = Math.sin(angle) * 80
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_DECISIVE }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: SHIELD_500,
              translate: "-50% -50%",
              pointerEvents: "none",
            }}
          />
        )
      })}
    </>
  )
}

function VisualShields() {
  return (
    <div
      style={{
        width: 420,
        maxWidth: "100%",
        padding: 20,
        borderRadius: 24,
        background: "#0B0B0F",
        color: "#FAFAF7",
        boxShadow: "0 1px 2px rgba(20,20,26,0.06), 0 24px 60px -12px rgba(20,20,26,0.25)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LazyOnView style={{ width: 360, height: 360 }}>
          <Suspense fallback={null}>
            <Entropy size={360} className="rounded-xl overflow-hidden" />
          </Suspense>
        </LazyOnView>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingInline: 6 }}>
        <span className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(250,250,247,0.55)", fontWeight: 500 }}>
          ORDER
        </span>
        <span className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.14em", color: SHIELD_500, fontWeight: 500 }}>
          STREAK INTACT
        </span>
        <span className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(250,250,247,0.55)", fontWeight: 500 }}>
          CHAOS
        </span>
      </div>
      <p style={{ marginTop: 12, color: "rgba(250,250,247,0.65)", fontSize: 13, lineHeight: 1.55, fontStyle: "italic", textAlign: "center" }}>
        Life keeps happening. Your streak doesn't break.
      </p>
    </div>
  )
}

/* ── C — Meet Lara typing chat ── */

function LaraOrb() {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 40,
        height: 40,
        flexShrink: 0,
        borderRadius: "50%",
        background: GRAD_HERO,
        boxShadow: `0 12px 28px -8px ${BRAND_500}66, inset 0 -8px 16px ${PLUM_500}66`,
      }}
    />
  )
}

function LaraBubble({ text, delay }: { text: string; delay: number }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-80px")
  const typed = useTypewriter(text, 14, inView)
  const done = typed.length >= text.length
  return (
    <div ref={ref} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <LaraOrb />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay }}
        style={{
          padding: "14px 18px",
          borderRadius: 18,
          borderTopLeftRadius: 6,
          background: BRAND_100,
          color: INK,
          fontSize: 14.5,
          lineHeight: 1.55,
          fontWeight: 500,
          maxWidth: 320,
        }}
      >
        {typed}
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            style={{ display: "inline-block", marginLeft: 2, color: BRAND_500 }}
          >
            ▍
          </motion.span>
        )}
      </motion.div>
    </div>
  )
}

function LaraPortrait({ size = 132 }: { size?: number }) {
  return (
    <MovingBorder
      isCircle
      borderWidth={3}
      gradientWidth={120}
      duration={4}
      colors={["#3a5ba0", "#f7c873", "#6ea3c1", "#A855F7"]}
      outerClassName="shrink-0"
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          background: "#FAF3E0",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src="https://api.dicebear.com/7.x/lorelei/svg?seed=Lara&backgroundColor=ffd5dc,fde68a,c0aede&radius=50&eyes=variant10&hair=variant44&mouth=happy06"
          alt="Your AI Partner"
          width={size}
          height={size}
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      </div>
    </MovingBorder>
  )
}

function VisualLara() {
  return (
    <GlowCard customSize glowColor="purple" className="!p-1 !gap-0 !rounded-3xl !shadow-none" width={460}>
      <div className="soft-card" style={{ width: "100%", maxWidth: "100%", padding: 28, display: "flex", flexDirection: "column", gap: 18, borderRadius: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LaraPortrait size={108} />
        <div>
          <div className="font-display" style={{ color: INK, fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            AI Partner
          </div>
          <div className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 11, letterSpacing: "0.14em", fontWeight: 500, marginTop: 6 }}>
            YOUR AI PARTNER · ONLINE
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: SHIELD_500 }}
            />
            <span style={{ color: SHIELD_500, fontSize: 12, fontWeight: 600 }}>typing…</span>
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: HAIR }} />

        <LaraBubble delay={0.1} text="Nuriddin, Day 14. You've studied 5.8 hours total. Most people quit by day 7. You didn't." />
        <LaraBubble delay={1.6} text="Today: IELTS Writing Task 2. 25 minutes. You've done harder than this." />
      </div>
    </GlowCard>
  )
}

function AIPartnerBackdrop({ animate }: { animate: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        width: "100%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 124,
          height: 124,
          display: "grid",
          placeItems: "center",
        }}
      >
        <span
          aria-hidden
          className={animate ? "ap-pulse" : ""}
          style={{
            position: "absolute",
            inset: -18,
            borderRadius: "50%",
            border: `1px solid ${BRAND_500}66`,
            boxShadow: `0 0 32px ${BRAND_500}33`,
            willChange: "transform, opacity",
          }}
        />
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#FAF3E0",
            boxShadow: `0 16px 40px -12px ${PLUM_500}55`,
          }}
        >
          <img
            src="https://api.dicebear.com/7.x/lorelei/svg?seed=Lara&backgroundColor=ffd5dc,fde68a,c0aede&radius=50&eyes=variant10&hair=variant44&mouth=happy06"
            alt="Your AI Partner"
            width={124}
            height={124}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div
        className="font-display"
        style={{
          color: INK,
          fontSize: 20,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        Hi, I'm your AI Partner.
      </div>
      <div
        className="font-mono-pro"
        style={{
          color: INK_MUTED,
          fontSize: 11,
          letterSpacing: "0.14em",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        TAP THE MIC TO START TALKING
      </div>
    </div>
  )
}

function VisualAIPartnerWidget() {
  const reduceMotion = useReducedMotion()
  const [started, setStarted] = useState(false)
  const widgetSlotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = widgetSlotRef.current
    if (!el) return

    const hide = () => setStarted(true)

    const eventNames = [
      "convai-call-start",
      "convai-widget-call-start",
      "elevenlabs-convai-call-start",
      "call-started",
      "callStart",
    ]
    eventNames.forEach((n) => el.addEventListener(n, hide))

    let fadeTimer: number | undefined
    const onPointerUp = () => {
      window.clearTimeout(fadeTimer)
      fadeTimer = window.setTimeout(() => setStarted(true), 1200)
    }
    el.addEventListener("pointerup", onPointerUp)

    return () => {
      eventNames.forEach((n) => el.removeEventListener(n, hide))
      el.removeEventListener("pointerup", onPointerUp)
      window.clearTimeout(fadeTimer)
    }
  }, [])

  return (
    <div style={{ width: "100%", maxWidth: 460, margin: "0 auto", display: "flex", justifyContent: "center" }}>
      <GlowCard customSize glowColor="purple" className="!p-1 !gap-0 !rounded-3xl !shadow-none" width="100%">
        <div
          className="soft-card"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "100%",
            padding: "clamp(20px, 4vw, 28px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 20,
            borderRadius: 18,
            minHeight: 420,
            boxSizing: "border-box",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(60% 60% at 50% 30%, ${BRAND_100}aa 0%, transparent 70%)`,
              opacity: started ? 0 : 1,
              transition: "opacity 500ms ease",
              pointerEvents: "none",
              borderRadius: 18,
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxHeight: started ? 0 : 320,
              opacity: started ? 0 : 1,
              transform: started ? "scale(0.95)" : "scale(1)",
              transition:
                "max-height 500ms ease, opacity 400ms ease, transform 450ms ease",
              overflow: "hidden",
            }}
          >
            <AIPartnerBackdrop animate={!reduceMotion} />
          </div>

          <div
            ref={widgetSlotRef}
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginTop: "auto",
              minHeight: 96,
            }}
          >
            <elevenlabs-convai
              agent-id="agent_1301krym07svfe3sbh7pt7y2428r"
              style={{
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 80,
              }}
            ></elevenlabs-convai>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

/* ── D — Progress heatmap + Share preview ── */

function HeatmapCell({ delay, intensity }: { delay: number; intensity: number }) {
  const color =
    intensity === 0
      ? BG_SECONDARY
      : intensity === 1
        ? BRAND_100
        : intensity === 2
          ? "#C7C7FF"
          : intensity === 3
            ? BRAND_400
            : BRAND_500
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay, ease: EASE_DECISIVE }}
      style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 4, background: color }}
    />
  )
}

function VisualProgress() {
  const [hovered, setHovered] = useState(false)
  const cells = Array.from({ length: 30 }, (_, i) => {
    const seed = (i * 7 + 3) % 10
    return seed < 2 ? 0 : seed < 4 ? 1 : seed < 6 ? 2 : seed < 8 ? 3 : 4
  })
  return (
    <div className="soft-card" style={{ width: 380, maxWidth: "100%", padding: 26, position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div className="font-display" style={{ color: INK, fontSize: 22, letterSpacing: "-0.02em" }}>Week <span className="font-mono-pro tabular" style={{ fontFamily: "Geist Mono" }}>14</span></div>
        <div className="font-mono-pro" style={{ fontSize: 11, color: INK_MUTED, letterSpacing: "0.1em", fontWeight: 500 }}>SCHOLIFY</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 16 }}>
        {[
          { label: "Sessions", v: "5" },
          { label: "Time", v: "2.1h" },
          { label: "Progress", v: "48%" },
        ].map((m) => (
          <div key={m.label}>
            <div className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 10, letterSpacing: "0.1em", fontWeight: 500 }}>{m.label.toUpperCase()}</div>
            <div className="font-mono-pro tabular" style={{ color: INK, fontWeight: 500, marginTop: 4, fontSize: 18 }}>{m.v}</div>
          </div>
        ))}
      </div>

      <div className="font-mono-pro" style={{ marginTop: 22, color: INK_MUTED, fontSize: 10, letterSpacing: "0.12em", fontWeight: 500 }}>LAST 30 DAYS</div>
      <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: 4 }}>
        {cells.map((intensity, i) => (
          <HeatmapCell key={i} delay={i * 0.04} intensity={intensity} />
        ))}
      </div>

      <motion.button
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.97 }}
        style={{
          marginTop: 22,
          width: "100%",
          padding: "10px 0",
          borderRadius: 12,
          background: BG_PRIMARY,
          color: INK,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${HAIR}`,
          cursor: "pointer",
          display: "inline-flex",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Share2 size={14} strokeWidth={2.2} /> Share
      </motion.button>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.25, ease: EASE_DECISIVE }}
            style={{
              position: "absolute",
              right: -16,
              bottom: -16,
              width: 130,
              height: 230,
              borderRadius: 22,
              background: BG_DARK,
              color: INK_INVERSE,
              padding: 14,
              boxShadow: `0 30px 60px -16px rgba(20,20,26,0.45), 0 0 0 4px ${BG_PRIMARY}`,
              transform: "rotate(6deg)",
            }}
          >
            <div className="font-mono-pro" style={{ fontSize: 9, color: "rgba(250,250,247,0.6)", letterSpacing: "0.1em", fontWeight: 500 }}>STORY · 1080×1920</div>
            <div className="font-display" style={{ marginTop: 14, fontSize: 22, lineHeight: 1.05 }}>
              Day <span className="font-mono-pro tabular">14</span>.
              <br />
              Still here.
            </div>
            <div
              style={{
                marginTop: 14,
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div style={{ width: "48%", height: "100%", background: GRAD_HERO }} />
            </div>
            <div className="font-mono-pro" style={{ marginTop: 8, fontSize: 10, color: BRAND_400 }}>SCHOLIFY ✦</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Features() {
  return (
    <section id="features" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>FEATURES</SectionLabel>
          <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 80px)", color: INK, margin: "18px 0 0" }}>
            Everything you need to actually <em style={{ fontStyle: "italic" }}>finish</em>.
          </h2>
        </div>

        <FeatureBlock
          index={0}
          reverse={false}
          tag="AI BRAIN"
          title={<>Lara knows your goal <em style={{ fontStyle: "italic" }}>inside out</em>.</>}
          desc="The Scholify AI engine reads your goal, your deadline, and your daily time — then builds a specific, progressive plan that actually matches your life. Not a generic template."
          bullets={[
            "Generates unique plans for any learning goal",
            "Progressive difficulty — starts easy, builds up",
            "Recalibrates automatically when you miss days",
            "Powered by the Scholify learning engine",
          ]}
          visual={<VisualPlanGen />}
        />

        <FeatureBlock
          index={1}
          reverse
          tag="LIFE SHIELDS"
          title={<>Miss days. <em style={{ fontStyle: "italic" }}>Keep your streak.</em></>}
          desc="The #1 reason people quit: they miss one day and feel like they've failed. Scholify's Life Shields protect your streak when life gets in the way. Two shields per week. Lara adjusts the plan. You never start over."
          bullets={[
            "2 Life Shields every week, reset on Monday",
            "Streak protected automatically on miss",
            "Plan recalibrates to keep your deadline",
            "Compassion-first: no guilt, just momentum",
          ]}
          visual={<VisualShields />}
        />

        <FeatureBlock
          index={2}
          reverse={false}
          tag="MEET YOUR AI PARTNER"
          title={<>Your <em style={{ fontStyle: "italic" }}>AI Partner.</em></>}
          desc="Your AI Partner is built into Scholify. It knows your name, your streak, your goal, and today's task. Every message it sends is generated just for you — specific, real, and actually useful."
          bullets={[
            "Personalised messages using your real data",
            "Voice mode — hear your AI Partner speak (Pro)",
            "Speaking practice with AI scoring (Pro)",
            "Available in 29 languages",
          ]}
          visual={<VisualAIPartnerWidget />}
        />

        <FeatureBlock
          index={3}
          reverse
          tag="PROGRESS"
          title={<>Progress you'll want to <em style={{ fontStyle: "italic" }}>show off</em>.</>}
          desc="Shareable weekly report cards. 30-day heatmaps. Goal completion certificates. A Year Rewind video on Annual Pro. Every milestone is designed to be shared."
          bullets={[
            "Weekly progress card for Instagram Stories",
            "30-day completion heatmap",
            "Goal completion certificate (PDF)",
            "Streak tree that grows with you",
            "Year Rewind video at 12 months (Annual)",
          ]}
          visual={<VisualProgress />}
        />
      </div>
    </section>
  )
}

/* ─────────────────────── FEATURE SWIPER ─────────────────────── */

const featureCardImages = [
  "/card-1.webp",
  "/card-2.webp",
  "/card-3.webp",
  "/card-4.webp",
  "/card-5.webp",
  "/card-6.webp",
].join(",")

function FeatureSwiper() {
  const [dims, setDims] = useState<{ w: number; h: number }>(() => {
    if (typeof window === "undefined") return { w: 288, h: 396 }
    const w = window.innerWidth
    if (w < 380) return { w: 240, h: 336 }
    if (w < 640) return { w: 260, h: 364 }
    if (w < 1024) return { w: 288, h: 396 }
    return { w: 320, h: 440 }
  })

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      if (w < 380) setDims({ w: 240, h: 336 })
      else if (w < 640) setDims({ w: 260, h: 364 })
      else if (w < 1024) setDims({ w: 288, h: 396 })
      else setDims({ w: 320, h: 440 })
    }
    window.addEventListener("resize", onResize, { passive: true })
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <section style={{ padding: "96px 24px", background: BG_PRIMARY }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>BUILT FOR EVERY GOAL</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}>
          Six ways Scholify <em style={{ fontStyle: "italic" }} className="grad-hero-text">shows up for you.</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 560, margin: "20px auto 0", lineHeight: 1.65 }}>
          Swipe through the deck — every card is a real piece of how the app works.
        </p>

        <div style={{ marginTop: 56, display: "flex", justifyContent: "center" }}>
          <ImageSwiper images={featureCardImages} cardWidth={dims.w} cardHeight={dims.h} />
        </div>

        <p className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 11, letterSpacing: "0.16em", marginTop: 28 }}>
          DRAG TO SWIPE · LEFT OR RIGHT
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────── IDENTITY (dark) ─────────────────────── */

function Identity() {
  return (
    <section
      style={{
        position: "relative",
        padding: "120px 24px",
        background: BG_DARK,
        color: INK_INVERSE,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", textAlign: "center", width: "100%", zIndex: 2 }}>
        <SectionLabel tone="inverse">THE TRANSFORMATION</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 80px)", color: INK_INVERSE, margin: "18px 0 0" }}>
          You're not learning a skill.
        </h2>
        <h2 className="font-display text-pro-h grad-hero-text" style={{ fontSize: "clamp(40px, 5vw, 80px)", margin: "16px 0 0", fontStyle: "italic" }}>
          You're becoming someone who shows up.
        </h2>
        <p style={{ color: "rgba(250,250,247,0.65)", fontSize: 18, maxWidth: 620, margin: "24px auto 0", lineHeight: 1.65 }}>
          Drag the slider — see what 60 days of Scholify actually changes.
        </p>

        <div style={{ marginTop: 56 }}>
          <ImageComparison
            beforeImage="/identity-before.webp"
            afterImage="/identity-after.webp"
            beforeLabel="BEFORE SCHOLIFY"
            afterLabel="AFTER SCHOLIFY"
            altBefore="A student before using Scholify — distracted, surrounded by unfinished courses and unused notebooks."
            altAfter="A student after 60 days of Scholify — focused, organized, on a streak."
            aspectRatio="3/2"
            className="!max-w-5xl"
          />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── STORIES ─────────────────────── */

type GlowTone = "blue" | "purple" | "green" | "red" | "orange"

const learnerTestimonials: { name: string; role: string; text: string; image: string }[] = [
  {
    name: "Dilnoza M.",
    role: "IELTS 7.5 · 52-day streak",
    text: "I passed IELTS 7.5 in 52 days. I'd failed twice before.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Marcus T.",
    role: "Python · 84-day streak",
    text: "I tried 4 coding courses. Never finished one. With Scholify I actually completed Python.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Aiko R.",
    role: "Figma · 121-day streak",
    text: "The Life Shields feature is genius. Missing a day no longer means quitting.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Raj P.",
    role: "Spanish · 47-day streak",
    text: "47-day Spanish streak. My plan survived two business trips.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Sarah K.",
    role: "AWS cert · 60-day streak",
    text: "Got my AWS certification in 60 days. Daily tasks were always exactly right.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Omar F.",
    role: "Reading habit · 312-day streak",
    text: "I read 18 books this year. Changed how I think about learning forever.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Lila K.",
    role: "UI/UX · 96-day streak",
    text: "Built my portfolio in 90 days. Got my first design job last week.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Tom B.",
    role: "Marathon · 142-day streak",
    text: "Trained for the Berlin marathon. Lara's plan worked around two injuries — I never restarted.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Priya S.",
    role: "French · 188-day streak",
    text: "Conversational French in 6 months. Lara built the schedule. I just showed up daily.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
  },
]

function Stories() {
  return (
    <section id="stories" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>LEARNER STORIES</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 72px)", color: INK, margin: "18px 0 0" }}>
          Real goals. <em style={{ fontStyle: "italic" }}>Real results.</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 16, maxWidth: 540, margin: "16px auto 0", lineHeight: 1.65 }}>
          Thousands of learners finish what they started — and they tell us why.
        </p>

        <TestimonialsColumns testimonials={learnerTestimonials} />
      </div>
    </section>
  )
}

/* ─────────────────────── PRICING ─────────────────────── */

function PricingFree({ onCta }: { onCta: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: EASE_HOVER }}
      className="soft-card-sand"
      style={{ padding: 36, borderRadius: 24, display: "flex", flexDirection: "column" }}
    >
      <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.14em", color: INK_MUTED, fontWeight: 500 }}>FREE</div>
      <div className="font-display" style={{ fontSize: 56, color: INK, margin: "16px 0 0", letterSpacing: "-0.04em", lineHeight: 1 }}>
        $<span className="font-mono-pro tabular" style={{ fontFamily: "Geist Mono" }}>0</span>
      </div>
      <div style={{ color: INK_MUTED, fontSize: 13, marginTop: 6 }}>Free, forever.</div>
      <div style={{ height: 1, background: HAIR, margin: "22px 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          "Unlimited learning goals",
          "AI daily plan by Lara",
          "Daily text coach messages",
          "Life Shields (2 per week)",
          "Progress dashboard",
        ].map((f) => (
          <FeatureCheck key={f}>{f}</FeatureCheck>
        ))}
      </div>
      <motion.button
        whileHover={{ background: BG_PRIMARY }}
        whileTap={{ scale: 0.97 }}
        onClick={onCta}
        style={{
          marginTop: "auto",
          marginBlockStart: 32,
          height: 50,
          borderRadius: 999,
          background: "transparent",
          border: `1px solid ${HAIR}`,
          color: INK,
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Start free
      </motion.button>
    </motion.div>
  )
}

function PricingPro({ onCta }: { onCta: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: EASE_HOVER }}
      className="animated-border"
      style={{ padding: 36, borderRadius: 24, color: INK_INVERSE, display: "flex", flexDirection: "column" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(250,250,247,0.6)", fontWeight: 500 }}>PRO</div>
        <div
          className="font-mono-pro"
          style={{
            fontSize: 10,
            padding: "3px 10px",
            borderRadius: 999,
            background: GRAD_HERO,
            color: "white",
            fontWeight: 500,
            letterSpacing: "0.08em",
          }}
        >
          MOST POPULAR
        </div>
      </div>
      <div className="font-display" style={{ fontSize: 56, margin: "16px 0 0", letterSpacing: "-0.04em", lineHeight: 1 }}>
        $<span className="font-mono-pro tabular">7.99</span>
        <span style={{ fontSize: 16, color: "rgba(250,250,247,0.5)", marginLeft: 6 }} className="font-sans-pro">/month</span>
      </div>
      <div style={{ color: "rgba(250,250,247,0.55)", fontSize: 13, marginTop: 6 }}>The full Scholify experience.</div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "22px 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          "Everything in Free",
          "Voice mode with Lara (ElevenLabs)",
          "Speaking practice + AI scoring",
          "Milestone achievement videos",
          "Goal completion certificate",
          "Year Rewind video (Annual)",
        ].map((f) => (
          <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div
              style={{
                width: 22,
                height: 22,
                flexShrink: 0,
                borderRadius: "50%",
                background: GRAD_HERO,
                display: "grid",
                placeItems: "center",
                color: "white",
                marginTop: 1,
                boxShadow: `0 6px 14px -4px ${BRAND_500}80`,
              }}
            >
              <Check size={12} strokeWidth={3} />
            </div>
            <span style={{ color: INK_INVERSE, fontSize: 14.5, fontWeight: 500 }}>{f}</span>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{ filter: "brightness(1.08)" }}
        whileTap={{ scale: 0.97 }}
        onClick={onCta}
        style={{
          marginTop: "auto",
          marginBlockStart: 32,
          height: 50,
          borderRadius: 999,
          background: GRAD_HERO,
          border: "none",
          color: "white",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          boxShadow: `0 18px 36px -10px ${BRAND_500}80`,
        }}
      >
        Get Pro
      </motion.button>
    </motion.div>
  )
}

interface ScholifyFeature {
  label: string
  pro?: boolean
}

const scholifyFeatures: ScholifyFeature[] = [
  { label: "AI-generated personalised daily plan" },
  { label: "Daily coach messages from Lara" },
  { label: "Life Shields streak protection" },
  { label: "Best Resource Today — live verified links" },
  { label: "Progress heatmap and weekly reports" },
  { label: "Shareable milestone cards" },
  { label: "Voice coach", pro: true },
  { label: "Speaking practice with AI scoring", pro: true },
  { label: "Goal completion certificate", pro: true },
  { label: "Google Calendar sync", pro: true },
]

function Pricing() {
  const navigate = useNavigate()
  return (
    <section id="pricing" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>PRICING</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 72px)", color: INK, margin: "18px 0 0" }}>
          Start free. <em style={{ fontStyle: "italic" }}>Upgrade when you're ready.</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 16, marginTop: 14, maxWidth: 560, marginInline: "auto" }}>
          7-day free trial — no credit card required. Annual saves 43%.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
            marginTop: 56,
            alignItems: "start",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              ["--primary" as any]: MONO_BLACK,
              ["--primary-foreground" as any]: MONO_WHITE,
            }}
          >
            <PricingInteraction
              starterMonth={6.99}
              starterAnnual={3.99}
              proMonth={13.99}
              proAnnual={7.92}
              starterLabel="Beginner"
              proLabel="Pro"
              ctaLabel="Start 7-day free trial"
              onCta={() => navigate("/onboarding")}
            />
          </div>

          <div className="soft-card" style={{ padding: 32 }}>
            <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.14em", color: INK_MUTED, fontWeight: 500 }}>
              WHAT'S INCLUDED
            </div>
            <h3 className="font-display" style={{ color: INK, fontSize: 26, margin: "10px 0 4px", letterSpacing: "-0.02em" }}>
              Every plan. Every day.
            </h3>
            <p style={{ color: INK_MUTED, fontSize: 14, lineHeight: 1.6, marginTop: 4 }}>
              Beginner gets you the system. Pro adds Lara's voice and the share-worthy proof.
            </p>

            <div style={{ height: 1, background: HAIR, margin: "22px 0" }} />

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {scholifyFeatures.map((f) => (
                <li key={f.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      flexShrink: 0,
                      borderRadius: "50%",
                      background: f.pro ? "var(--primary)" : SHIELD_500,
                      color: "white",
                      display: "grid",
                      placeItems: "center",
                      marginTop: 1,
                      boxShadow: `0 4px 10px -3px ${f.pro ? "rgba(58,91,160,0.45)" : "rgba(45,212,191,0.45)"}`,
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ color: INK, fontSize: 14.5, fontWeight: 500 }}>{f.label}</span>
                    {f.pro && (
                      <span
                        className="font-mono-pro"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.12em",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 999,
                          background: "var(--secondary)",
                          color: "var(--secondary-foreground)",
                        }}
                      >
                        PRO
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p style={{ color: INK_MUTED, fontSize: 13, marginTop: 28 }}>
          No credit card to start the trial. Cancel anytime.
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────── AWARDS ─────────────────────── */

function Awards() {
  return (
    <section style={{ padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>AWARDS</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(32px, 4vw, 56px)", color: INK, margin: "18px 0 0" }}>
          Awarded on every store.
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 16, marginTop: 12, maxWidth: 540, marginInline: "auto" }}>
          Editors' Choice. Year after year. The system learners actually finish with.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_DECISIVE }}
          style={{
            marginTop: 48,
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StoreBadge store="app-store" award="Editors' Choice" caption="2026" />
          <StoreBadge store="google-play" award="Editors' Choice" caption="2026" />
        </motion.div>

        <p className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 11, letterSpacing: "0.14em", marginTop: 28 }}>
          HOVER TO TILT
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────── FINAL CTA ─────────────────────── */

function FinalCTA() {
  const navigate = useNavigate()
  return (
    <section
      className="mesh-bg"
      style={{
        padding: "160px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <HandWrittenTitle title="Then forever." subtitle="Show up tomorrow. Then the next day." />
        <div style={{ marginTop: -32, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <PrimaryCTA large onClick={() => navigate("/onboarding")}>
            Start your streak — free <ArrowRight size={20} strokeWidth={2.4} />
          </PrimaryCTA>
          <p style={{ color: INK_MUTED, fontSize: 14 }}>
            No credit card · 5 minutes a day · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── FOOTER ─────────────────────── */

const footerCols: { label: string; links: string[] }[] = [
  { label: "Product", links: ["Features", "Pricing", "How it works", "Sign in", "Get started"] },
  { label: "Company", links: ["About", "Blog", "Privacy Policy", "Terms", "Contact"] },
  { label: "Follow", links: ["Twitter / X", "Instagram", "TikTok", "LinkedIn"] },
]

function Footer() {
  return (
    <footer style={{ background: BG_PRIMARY, borderTop: `1px solid ${HAIR}`, padding: "56px 24px 32px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          gap: 48,
        }}
      >
        <div>
          <ScholifyLogo size={36} />
          <p style={{ color: INK_MUTED, fontSize: 13.5, lineHeight: 1.75, marginTop: 18, maxWidth: 280 }}>
            The AI learning habit coach. Built on Atomic Habits. Powered by the Scholify learning engine.
          </p>
        </div>
        {footerCols.map((col) => (
          <div key={col.label}>
            <div className="font-mono-pro" style={{ fontSize: 11, color: INK_MUTED, letterSpacing: "0.14em", fontWeight: 500 }}>
              {col.label.toUpperCase()}
            </div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{ color: INK, fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BRAND_500)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "48px auto 0",
          paddingTop: 24,
          borderTop: `1px solid ${HAIR}`,
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          color: INK_MUTED,
          fontSize: 12,
        }}
      >
        <span>© <span className="font-mono-pro tabular">2026</span> Scholify. All rights reserved.</span>
        <span>Made with intention in Tashkent.</span>
      </div>
    </footer>
  )
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function Landing() {
  return (
    <div style={{ background: BG_PRIMARY, color: INK, minHeight: "100vh", overflowX: "hidden" }}>
      <LiquidGlassFilterDefs />
      <Nav />
      <Hero />
      <LazyOnView style={{ minHeight: 600 }}><Problem /></LazyOnView>
      <LazyOnView id="how-it-works" style={{ minHeight: 700 }}><HowItWorks /></LazyOnView>
      <LazyOnView id="features" style={{ minHeight: 800 }}><Features /></LazyOnView>
      <LazyOnView style={{ minHeight: 700 }}><FeatureSwiper /></LazyOnView>
      <LazyOnView style={{ minHeight: 800 }}><Identity /></LazyOnView>
      <LazyOnView id="stories" style={{ minHeight: 700 }}><Stories /></LazyOnView>
      <LazyOnView id="pricing" style={{ minHeight: 900 }}><Pricing /></LazyOnView>
      <LazyOnView style={{ minHeight: 400 }}><Awards /></LazyOnView>
      <LazyOnView style={{ minHeight: 500 }}><CinematicFooter /></LazyOnView>
    </div>
  )
}
