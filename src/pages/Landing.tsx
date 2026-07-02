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
  Share2,
  ArrowRight,
  Check,
  Star,
} from "lucide-react"
import NavHeader from "@/components/ui/nav-header"
import { GlowCard } from "@/components/ui/spotlight-card"
import { PricingInteraction } from "@/components/ui/pricing-interaction"
import { LiquidGlassFilterDefs } from "@/components/ui/liquid-glass-button"
import { StoreBadge } from "@/components/ui/store-badge"
import { TestimonialsColumns } from "@/components/ui/testimonials-columns"
import { HandWrittenTitle } from "@/components/ui/hand-writing-text"
import { CinematicFooter } from "@/components/ui/motion-footer"
import { AnimatedText } from "@/components/ui/animated-shiny-text"
import { ImageComparison } from "@/components/ui/image-comparison-slider"
import { ImageSwiper } from "@/components/ui/image-swiper"
import LazyOnView from "@/components/LazyOnView"
import LaraLandingWidget from "@/components/lara-landing-widget"
import { AnimatedText as AnimatedUnderlineText } from "@/components/ui/animated-underline-text-one"
import { UpgradeBanner } from "@/components/ui/upgrade-banner"
import LanguageToggle from "@/components/language-toggle"
import { useT } from "@/i18n/LanguageProvider"

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
const BRAND_500 = "#C80000"
const BRAND_400 = "#D92E10"
const BRAND_100 = "#FBE7E4"
const FIRE_500 = "#F4A405"
const FIRE_100 = "#FDF2DC"
const SHIELD_500 = "#2DD4BF"
const SHIELD_100 = "#DDFAF4"
const PLUM_500 = "#E50068"
const PLUM_100 = "#FCE4EF"
const HAIR = "rgba(20,20,26,0.08)"
const GRAD_HERO = "linear-gradient(135deg, #C80000 0%, #E50068 50%, #F4A405 100%)"

const EASE_DECISIVE = [0.22, 1, 0.36, 1] as const
const EASE_HOVER = [0.4, 0, 0.2, 1] as const

/* ─────────────────────── UTILITY HOOKS ─────────────────────── */

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

/* ─────────────────────── NAV ─────────────────────── */

function Nav() {
  const navigate = useNavigate()
  const t = useT()
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
            { label: t("Features"), href: "#features" },
            { label: t("How it works"), href: "#how-it-works" },
            { label: t("Pricing"), href: "#pricing" },
            { label: t("Stories"), href: "#stories" },
          ]}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LanguageToggle />
        <a
          href="/signin"
          onClick={(e) => {
            e.preventDefault()
            navigate("/signin")
          }}
          className="scholify-glass-pill hidden rounded-full px-5 py-2 text-sm font-semibold md:inline-flex"
          style={{ color: "var(--foreground)", textDecoration: "none", alignItems: "center" }}
        >
          {t("Sign in")}
        </a>
        <a
          href="/signup"
          onClick={(e) => {
            e.preventDefault()
            navigate("/signup")
          }}
          className="scholify-glass-pill-primary rounded-full px-4 py-2 text-sm font-bold sm:px-5"
          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
        >
          {t("Start for free")}
        </a>
      </div>
    </motion.header>
  )
}

/* ─────────────────────── HERO ─────────────────────── */

function HeroHeadline() {
  const t = useT()
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
        text={t("From first paper to ACCA member.")}
        textClassName="font-display font-normal tracking-[-0.03em]"
        gradientColors="linear-gradient(90deg, #14141A 0%, #C80000 40%, #E50068 50%, #C80000 60%, #14141A 100%)"
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
          <Shield size={12} color={SHIELD_500} /> Readiness 68% and climbing
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
            FR · Consolidated financial statements
          </div>
          <div style={{ color: "rgba(250,250,247,0.4)", fontSize: 12, marginTop: 4 }}>
            20 exam-style questions · instant marking
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
          Start today's session
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
            Day <span className="font-mono-pro tabular">14</span>. Area E is your weakest — today we close that gap.
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Hero() {
  const navigate = useNavigate()
  const t = useT()
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
        <UpgradeBanner
          buttonText={t("The AI Examiner is here")}
          description={t("— try it free")}
          onClick={() => navigate("/signup")}
        />

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
          {t("Tell Lara your next paper and exam date. She builds the plan, marks your answers, and gets you exam-ready.")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE_DECISIVE }}
          style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}
        >
          <PrimaryCTA onClick={() => navigate("/signup")}>
            {t("Start for free")} <ArrowRight size={18} strokeWidth={2.4} />
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
            <span className="font-mono-pro tabular" style={{ color: INK, fontWeight: 500 }}>2,400+</span> {t("ACCA students")} ·{" "}
            <span className="font-mono-pro tabular" style={{ color: INK, fontWeight: 500 }}>4.9</span>
            <Star size={11} strokeWidth={0} fill={FIRE_500} style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 2, marginRight: 2 }} />
            · {t("Free to start")}
          </span>
        </motion.div>

        <div style={{ marginTop: 48 }}>
          <HandWrittenTitle
            title={t("13 exams. One app.")}
            subtitle={t("Start with your next paper — today.")}
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
  const t = useT()
  return (
    <section style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 72px)", color: INK, margin: 0 }}>
          {t("Half of ACCA candidates fail each sitting.")}
        </h2>
        <h2 className="font-display text-pro-h grad-hero-text" style={{ fontSize: "clamp(36px, 5vw, 72px)", margin: "16px 0 0", fontStyle: "italic" }}>
          {t("Scholify exists to put you in the other half.")}
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 18, maxWidth: 620, margin: "32px auto 0", lineHeight: 1.65 }}>
          <span className="font-mono-pro tabular" style={{ color: INK, fontWeight: 700 }}>~50%</span>{" "}
          {t("pass a typical Applied Skills sitting. The difference isn't intelligence — it's practice volume, feedback speed, and a plan. Scholify is all three.")}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginTop: 72 }}>
          <StatCard tone="blue" value="50%" label={t("average pass rate on Applied Skills exams")} source={t("Published ACCA global pass rates")} delay={0.05} />
          <StatCard tone="green" value="13" label={t("exams to qualify — one system for all of them")} source={t("BT to Strategic Professional")} delay={0.15} />
          <StatCard tone="purple" value="10×" label={t("cheaper than a private ACCA tutor")} source={t("Pro costs less than one tutoring hour")} delay={0.25} />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── HOW IT WORKS ─────────────────────── */

const steps = [
  { num: "01", label: "YOUR RECORD", title: "Tell Lara where you are", desc: "Mark the papers you've passed, pick your next one, and set your exam date. Takes a minute.", Icon: Target, accent: BRAND_500 },
  { num: "02", label: "YOUR PLAN", title: "Get your phased plan", desc: "Lara builds a day-by-day plan to exam day: learn the syllabus, drill your weak areas, then timed mocks.", Icon: Zap, accent: PLUM_500 },
  { num: "03", label: "THE LOOP", title: "Practise. Review. Pass.", desc: "Every question is marked instantly with a teaching explanation. Your readiness score climbs until you're exam-ready.", Icon: Flame, accent: FIRE_500 },
]

function HowItWorks() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-120px")
  const t = useT()
  return (
    <section id="how-it-works" style={{ padding: "96px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>{t("HOW IT WORKS")}</SectionLabel>
        <AnimatedUnderlineText
          text={t("From 'which paper?' to a plan in 60 seconds")}
          className="mt-[18px]"
          textClassName="font-display font-normal leading-[1.05] text-[#14141A] text-[clamp(40px,5vw,80px)]"
          underlineClassName="text-[#C80000]"
          underlineDuration={1.6}
        />

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
                  {t(step.label)}
                </div>
                <div className="font-display" style={{ color: INK, fontSize: 26, marginTop: 6, letterSpacing: "-0.02em" }}>
                  {t(step.title)}
                </div>
                <div style={{ color: INK_MUTED, fontSize: 14, lineHeight: 1.7, marginTop: 10, maxWidth: 260 }}>
                  {t(step.desc)}
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

function FeatureBlock({ tag, title, desc, bullets, visual, reverse, index }: { tag: string; title: string; desc: string; bullets: string[]; visual: React.ReactNode; reverse: boolean; index: number }) {
  const t = useT()
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
        <SectionLabel>{t(tag)}</SectionLabel>
        <h3 className="font-display text-pro-h" style={{ color: INK, fontSize: "clamp(32px, 4vw, 56px)", margin: "16px 0 0" }}>
          {t(title)}
        </h3>
        <p style={{ color: INK_MUTED, fontSize: 17, lineHeight: 1.7, marginTop: 18 }}>{t(desc)}</p>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
          {bullets.map((b) => <FeatureCheck key={b}>{t(b)}</FeatureCheck>)}
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
  const t = useT()
  const tasks = [
    "Phase 1 · Learn — areas A to C",
    "Phase 2 · Drill your weak areas",
    "Phase 3 · Timed mock exams",
    "Exam week · Final review",
  ]
  return (
    <div ref={ref} className="soft-card" style={{ width: 420, maxWidth: "100%", padding: 28 }}>
      <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.12em", color: INK_MUTED, fontWeight: 500 }}>{t("YOUR GOAL")}</div>
      <div style={{ color: INK, fontSize: 16, marginTop: 8, fontWeight: 500 }}>
        {t("Pass FR (F7) in")} <span className="font-mono-pro tabular">47</span> {t("days")} · <span className="font-mono-pro tabular">25</span> {t("min/day")}
      </div>
      <div style={{ height: 1, background: HAIR, margin: "18px 0" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <motion.div
          animate={inView ? { rotate: 360 } : {}}
          transition={{ duration: 1.8, repeat: 1, ease: "linear" }}
          style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${BRAND_100}`, borderTopColor: BRAND_500 }}
        />
        <span style={{ color: INK_MUTED, fontSize: 13 }}>{t("Lara is generating your plan…")}</span>
      </div>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {tasks.map((task, i) => (
          <motion.div
            key={task}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.6 + i * 0.18, ease: EASE_DECISIVE }}
            style={{ display: "flex", gap: 10, alignItems: "center", color: INK, fontSize: 13.5, fontWeight: 500 }}
          >
            <Check size={14} color={SHIELD_500} strokeWidth={3} /> {t(task)}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 + tasks.length * 0.18 + 0.2 }}
          className="font-mono-pro"
          style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.14em", color: BRAND_500, fontWeight: 500 }}
        >
          ⬤ {t("PLAN READY")}
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
  const t = useT()
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
          {t("YOUR ANSWER")}
        </span>
        <span className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.14em", color: SHIELD_500, fontWeight: 500 }}>
          {t("MARKED IN SECONDS")}
        </span>
        <span className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(250,250,247,0.55)", fontWeight: 500 }}>
          {t("YOUR MARK")}
        </span>
      </div>
      <p style={{ marginTop: 12, color: "rgba(250,250,247,0.65)", fontSize: 13, lineHeight: 1.55, fontStyle: "italic", textAlign: "center" }}>
        {t("A human marker takes days. Lara takes seconds.")}
      </p>
    </div>
  )
}

/* ── C — Meet Lara ── */

function VisualAIPartnerWidget() {
  const prefersReduced = useReducedMotion()
  const t = useT()
  const avatarSize = "clamp(150px, 32vw, 200px)"
  return (
    <div style={{ width: "100%", maxWidth: 460, margin: "0 auto", display: "flex", justifyContent: "center" }}>
      <div
        className="soft-card"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          padding: "clamp(20px, 5vw, 36px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(14px, 3vw, 22px)",
          borderRadius: 24,
          minHeight: "clamp(320px, 64vw, 400px)",
          boxSizing: "border-box",
          textAlign: "center",
          background: `radial-gradient(70% 60% at 50% 25%, ${BRAND_100}aa 0%, transparent 70%), var(--card)`,
          boxShadow: `0 0 0 1px ${HAIR}, 0 24px 60px -24px rgba(91,91,245,0.35), 0 8px 24px -12px rgba(168,85,247,0.25)`,
          overflow: "hidden",
        }}
      >
        <div className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 11, letterSpacing: "0.2em", fontWeight: 500 }}>
          {t("YOUR AI PARTNER · ONLINE")}
        </div>
        <h3
          className="font-display"
          style={{
            color: INK,
            fontSize: "clamp(26px, 4.2vw, 38px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          {t("Meet Lara.")}
        </h3>
        <p style={{ color: INK_MUTED, fontSize: "clamp(13.5px, 1.6vw, 14.5px)", lineHeight: 1.55, margin: 0, maxWidth: 320 }}>
          {t("Your AI tutor. She knows your papers, your readiness, and today's task — every explanation generated just for you.")}
        </p>

        <motion.div
          animate={prefersReduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "relative",
            width: avatarSize,
            height: avatarSize,
            margin: "auto 0",
            display: "grid",
            placeItems: "center",
          }}
        >
          <motion.div
            aria-hidden
            animate={prefersReduced ? undefined : { scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-12%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${BRAND_400}55 0%, transparent 70%)`,
              filter: "blur(10px)",
            }}
          />
          <motion.div
            aria-hidden
            animate={prefersReduced ? undefined : { scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{
              position: "absolute",
              inset: "-4%",
              borderRadius: "50%",
              border: `2px solid ${PLUM_500}66`,
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#FAF3E0",
              boxShadow: `0 0 0 3px ${BRAND_400}, 0 12px 32px -8px rgba(91,91,245,0.45)`,
              zIndex: 1,
            }}
          >
            <img
              src="https://api.dicebear.com/7.x/lorelei/svg?seed=Lara&backgroundColor=ffd5dc,fde68a,c0aede&radius=50&eyes=variant10&hair=variant44&mouth=happy06"
              alt="Lara — your AI Partner"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </motion.div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <motion.span
            animate={prefersReduced ? undefined : { scale: [1, 1.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: SHIELD_500 }}
          />
          <span style={{ color: SHIELD_500, fontSize: 12, fontWeight: 600 }}>{t("typing…")}</span>
        </div>
      </div>
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
  const t = useT()
  const cells = Array.from({ length: 30 }, (_, i) => {
    const seed = (i * 7 + 3) % 10
    return seed < 2 ? 0 : seed < 4 ? 1 : seed < 6 ? 2 : seed < 8 ? 3 : 4
  })
  return (
    <div className="soft-card" style={{ width: 380, maxWidth: "100%", padding: 26, position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div className="font-display" style={{ color: INK, fontSize: 22, letterSpacing: "-0.02em" }}>{t("Week")} <span className="font-mono-pro tabular" style={{ fontFamily: "Geist Mono" }}>14</span></div>
        <div className="font-mono-pro" style={{ fontSize: 11, color: INK_MUTED, letterSpacing: "0.1em", fontWeight: 500 }}>SCHOLIFY</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 16 }}>
        {[
          { label: "Mocks", v: "3" },
          { label: "Accuracy", v: "71%" },
          { label: "Readiness", v: "68%" },
        ].map((m) => (
          <div key={m.label}>
            <div className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 10, letterSpacing: "0.1em", fontWeight: 500 }}>{t(m.label).toUpperCase()}</div>
            <div className="font-mono-pro tabular" style={{ color: INK, fontWeight: 500, marginTop: 4, fontSize: 18 }}>{m.v}</div>
          </div>
        ))}
      </div>

      <div className="font-mono-pro" style={{ marginTop: 22, color: INK_MUTED, fontSize: 10, letterSpacing: "0.12em", fontWeight: 500 }}>{t("LAST 30 DAYS")}</div>
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
        <Share2 size={14} strokeWidth={2.2} /> {t("Share")}
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
            <div className="font-mono-pro" style={{ fontSize: 9, color: "rgba(250,250,247,0.6)", letterSpacing: "0.1em", fontWeight: 500 }}>{t("STORY · 1080×1920")}</div>
            <div className="font-display" style={{ marginTop: 14, fontSize: 22, lineHeight: 1.05 }}>
              {t("Day")} <span className="font-mono-pro tabular">14</span>.
              <br />
              {t("Still here.")}
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
  const t = useT()
  return (
    <section id="features" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>{t("FEATURES")}</SectionLabel>
          <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 80px)", color: INK, margin: "18px 0 0" }}>
            {t("Everything you need to pass — in one place.")}
          </h2>
        </div>

        <FeatureBlock
          index={0}
          reverse={false}
          tag="QUESTION BANK + AI TUTOR"
          title="Practise like it's the real exam."
          desc="Original, syllabus-aligned question banks for every Applied Knowledge and Applied Skills paper — marked instantly, explained properly. And when you want more, Lara writes fresh exam-style questions on any topic, even from your own notes."
          bullets={[
            "Curated banks for all nine OT papers",
            "Instant marking with teaching explanations",
            "Ask Lara why — on any question, 24/7",
            "Unlimited AI questions from topics or your notes",
          ]}
          visual={<VisualPlanGen />}
        />

        <FeatureBlock
          index={1}
          reverse
          tag="AI EXAMINER"
          title="Written answers, marked in seconds."
          desc="Strategic Professional exams are written — and nobody gives you instant feedback on written answers. Scholify's AI Examiner marks your answer against a marking scheme, point by point, in seconds. That loop used to take a tutor and a week."
          bullets={[
            "Type your answer, get your mark in seconds",
            "Point-by-point feedback against the rubric",
            "FR and SBR banks live — more papers coming",
            "Trains the skill OT questions can't teach",
          ]}
          visual={<VisualShields />}
        />

        <FeatureBlock
          index={2}
          reverse={false}
          tag="MEET YOUR AI TUTOR"
          title="Your AI Partner."
          desc="Lara is built into Scholify. She knows which papers you've passed, your weak syllabus areas, and today's task. Ask her to explain deferred tax like you're five — she will, at 2am, without judgement."
          bullets={[
            "Explains any concept — IFRS, audit, tax, costing",
            "Knows your weak areas and today's plan",
            "Built into every practice session",
            "English and Russian",
          ]}
          visual={<VisualAIPartnerWidget />}
        />

        <FeatureBlock
          index={3}
          reverse
          tag="READINESS"
          title="Know you're ready before you book."
          desc="A readiness score per paper. Accuracy per syllabus area. Full mock history against the pass line. A 30-day study heatmap. Exam day should be a formality, not a gamble."
          bullets={[
            "Exam readiness score per paper",
            "Accuracy by syllabus area — see the gaps",
            "Timed mock history against the 50% pass line",
            "30-day study heatmap",
            "Your full BT → AAA qualification roadmap",
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
  const t = useT()
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
        <SectionLabel>{t("BUILT FOR EVERY PAPER")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}>
          {t("Six tools that")}{" "}
          <em style={{ fontStyle: "italic" }} className="grad-hero-text">{t("get you exam-ready.")}</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 560, margin: "20px auto 0", lineHeight: 1.65 }}>
          {t("Swipe through the deck — every card is a real piece of how the app works.")}
        </p>

        <div style={{ marginTop: 56, display: "flex", justifyContent: "center" }}>
          <ImageSwiper images={featureCardImages} cardWidth={dims.w} cardHeight={dims.h} />
        </div>

        <p className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 11, letterSpacing: "0.16em", marginTop: 28 }}>
          {t("DRAG TO SWIPE · LEFT OR RIGHT")}
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────── QUALIFICATION ROADMAP ─────────────────────── */

const ROADMAP_LEVELS: {
  label: string
  note?: string
  accent: string
  papers: { id: string; name: string; badge?: "BANK" | "AI EXAMINER" }[]
}[] = [
  {
    label: "Applied Knowledge",
    accent: BRAND_500,
    papers: [
      { id: "BT", name: "Business & Technology", badge: "BANK" },
      { id: "MA", name: "Management Accounting", badge: "BANK" },
      { id: "FA", name: "Financial Accounting", badge: "BANK" },
    ],
  },
  {
    label: "Applied Skills",
    accent: PLUM_500,
    papers: [
      { id: "LW", name: "Corporate & Business Law", badge: "BANK" },
      { id: "PM", name: "Performance Management", badge: "BANK" },
      { id: "TX", name: "Taxation", badge: "BANK" },
      { id: "FR", name: "Financial Reporting", badge: "BANK" },
      { id: "AA", name: "Audit & Assurance", badge: "BANK" },
      { id: "FM", name: "Financial Management", badge: "BANK" },
    ],
  },
  {
    label: "Strategic Professional",
    note: "Essentials + 2 of 4 Options",
    accent: FIRE_500,
    papers: [
      { id: "SBL", name: "Strategic Business Leader" },
      { id: "SBR", name: "Strategic Business Reporting", badge: "AI EXAMINER" },
      { id: "AFM", name: "Advanced Financial Mgmt" },
      { id: "APM", name: "Advanced Performance Mgmt" },
      { id: "ATX", name: "Advanced Taxation" },
      { id: "AAA", name: "Advanced Audit & Assurance" },
    ],
  },
]

function PaperCard({ paper, accent, delay }: { paper: (typeof ROADMAP_LEVELS)[number]["papers"][number]; accent: string; delay: number }) {
  const navigate = useNavigate()
  const t = useT()
  return (
    <motion.button
      type="button"
      onClick={() => navigate("/signup")}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE_DECISIVE }}
      whileHover={{ y: -4, boxShadow: `0 1px 2px rgba(20,20,26,0.04), 0 18px 40px -14px ${accent}66` }}
      whileTap={{ scale: 0.98 }}
      className="soft-card"
      style={{
        padding: "16px 18px",
        borderRadius: 16,
        textAlign: "left",
        cursor: "pointer",
        border: `1px solid ${HAIR}`,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span className="font-mono-pro" style={{ fontSize: 15, fontWeight: 700, color: accent, letterSpacing: "0.02em" }}>
          {paper.id}
        </span>
        {paper.badge ? (
          <span
            className="font-mono-pro"
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "3px 8px",
              borderRadius: 999,
              background: paper.badge === "AI EXAMINER" ? `${FIRE_500}14` : `${SHIELD_500}14`,
              color: paper.badge === "AI EXAMINER" ? FIRE_500 : "#0F9D8C",
              border: `1px solid ${paper.badge === "AI EXAMINER" ? FIRE_500 : SHIELD_500}3a`,
              whiteSpace: "nowrap",
            }}
          >
            {t(paper.badge)}
          </span>
        ) : (
          <span className="font-mono-pro" style={{ fontSize: 8.5, fontWeight: 500, letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 999, background: "rgba(20,20,26,0.04)", color: INK_MUTED, border: `1px solid ${HAIR}`, whiteSpace: "nowrap" }}>
            {t("AI PRACTICE")}
          </span>
        )}
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: INK, lineHeight: 1.35 }}>{t(paper.name)}</span>
    </motion.button>
  )
}

function QualificationRoadmap() {
  const t = useT()
  return (
    <section style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>{t("THE FULL QUALIFICATION")}</SectionLabel>
          <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}>
            {t("Every paper.")}{" "}
            <em style={{ fontStyle: "italic" }} className="grad-hero-text">{t("BT to AAA.")}</em>
          </h2>
          <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 580, margin: "20px auto 0", lineHeight: 1.65 }}>
            {t("Curated question banks for all nine OT papers. AI-generated practice for all fifteen. One roadmap from your first paper to membership.")}
          </p>
        </div>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 36 }}>
          {ROADMAP_LEVELS.map((level, li) => (
            <div key={level.label}>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE_DECISIVE }}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: level.accent, boxShadow: `0 0 12px ${level.accent}88`, flexShrink: 0 }} />
                <span className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.14em", color: INK, fontWeight: 700, textTransform: "uppercase" }}>
                  {t(level.label)}
                </span>
                {level.note && (
                  <span className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.08em", color: INK_MUTED }}>
                    · {t(level.note)}
                  </span>
                )}
                <span style={{ flex: 1, height: 1, background: HAIR }} />
              </motion.div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
                {level.papers.map((p, pi) => (
                  <PaperCard key={p.id} paper={p} accent={level.accent} delay={0.08 + li * 0.05 + pi * 0.05} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono-pro"
          style={{ textAlign: "center", color: INK_MUTED, fontSize: 11, letterSpacing: "0.14em", marginTop: 32 }}
        >
          {t("TAP ANY PAPER TO START FREE")}
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────── IDENTITY (dark) ─────────────────────── */

function Identity() {
  const t = useT()
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
        <SectionLabel tone="inverse">{t("THE TRANSFORMATION")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 80px)", color: INK_INVERSE, margin: "18px 0 0" }}>
          {t("You're not just passing exams.")}
        </h2>
        <h2 className="font-display text-pro-h grad-hero-text" style={{ fontSize: "clamp(40px, 5vw, 80px)", margin: "16px 0 0", fontStyle: "italic" }}>
          {t("You're becoming an ACCA member.")}
        </h2>
        <p style={{ color: "rgba(250,250,247,0.65)", fontSize: 18, maxWidth: 620, margin: "24px auto 0", lineHeight: 1.65 }}>
          {t("Drag the slider — see what 60 days of Scholify actually changes.")}
        </p>

        <div style={{ marginTop: 56 }}>
          <ImageComparison
            beforeImage="/identity-before.webp"
            afterImage="/identity-after.webp"
            beforeLabel={t("BEFORE SCHOLIFY")}
            afterLabel={t("AFTER SCHOLIFY")}
            altBefore={t("A student before using Scholify — distracted, surrounded by unfinished courses and unused notebooks.")}
            altAfter={t("A student after 60 days of Scholify — focused, organized, on a streak.")}
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
    role: "FR · passed first attempt",
    text: "The AI Examiner rewired how I structure written answers. Passed FR at my first attempt.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Marcus T.",
    role: "AA · passed after 2 fails",
    text: "I failed AA twice studying from question banks alone. The per-area breakdown showed me exactly what to fix.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Aiko R.",
    role: "FA · 92% readiness",
    text: "Instant explanations beat waiting a week to ask my tuition class. I finally understand double entry.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Raj P.",
    role: "TX · 47-day streak",
    text: "The daily plan survived two business trips. I never fell behind and never restarted.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Sarah K.",
    role: "FM · passed",
    text: "My mock scores predicted my real FM result within 3%. I walked in knowing I'd pass.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Omar F.",
    role: "BT + MA + FA in one year",
    text: "Cleared all three Knowledge papers in a year while working full-time. 25 minutes a day.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Lila K.",
    role: "PM · passed",
    text: "Custom practice from my own notes is genius. It quizzed me on exactly what I kept getting wrong.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Tom B.",
    role: "SBR candidate",
    text: "Written-answer feedback in seconds. Nothing else on the market does this for Strategic Professional.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Priya S.",
    role: "LW · passed",
    text: "Lara explained consideration and privity better than my lecture notes ever did.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
  },
]

function Stories() {
  const t = useT()
  return (
    <section id="stories" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>{t("STUDENT STORIES")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 72px)", color: INK, margin: "18px 0 0" }}>
          {t("Real papers.")} <em style={{ fontStyle: "italic" }}>{t("Real passes.")}</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 16, maxWidth: 540, margin: "16px auto 0", lineHeight: 1.65 }}>
          {t("ACCA students in 20+ countries prep with Scholify — and they tell us why.")}
        </p>

        <TestimonialsColumns
          testimonials={learnerTestimonials.map((x) => ({ ...x, text: t(x.text), role: t(x.role) }))}
        />
      </div>
    </section>
  )
}

/* ─────────────────────── PRICING ─────────────────────── */

interface ScholifyFeature {
  label: string
  pro?: boolean
}

const scholifyFeatures: ScholifyFeature[] = [
  { label: "Curated question banks — all nine OT papers" },
  { label: "Instant marking + teaching explanations" },
  { label: "SRS flashcards for standards, rules & formulas" },
  { label: "Personalised study plan to exam day" },
  { label: "Readiness score & per-area analytics" },
  { label: "Full BT → AAA qualification roadmap" },
  { label: "Timed mock exams", pro: true },
  { label: "AI Examiner — instant written marking", pro: true },
  { label: "Custom practice from topics or your notes", pro: true },
  { label: "Unlimited Lara tutor", pro: true },
]

function Pricing() {
  const navigate = useNavigate()
  const t = useT()
  return (
    <section id="pricing" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>{t("PRICING")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 72px)", color: INK, margin: "18px 0 0" }}>
          {t("Start free.")} <em style={{ fontStyle: "italic" }}>{t("Upgrade when you're ready.")}</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 16, marginTop: 14, maxWidth: 560, marginInline: "auto" }}>
          {t("7-day free trial — no credit card required. Annual saves 43%.")}
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
              starterLabel={t("Beginner")}
              proLabel={t("Pro")}
              ctaLabel={t("Start 7-day free trial")}
              onCta={() => navigate("/signup")}
            />
          </div>

          <div className="soft-card" style={{ padding: 32 }}>
            <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.14em", color: INK_MUTED, fontWeight: 500 }}>
              {t("WHAT'S INCLUDED")}
            </div>
            <h3 className="font-display" style={{ color: INK, fontSize: 26, margin: "10px 0 4px", letterSpacing: "-0.02em" }}>
              {t("Every paper. Every mode.")}
            </h3>
            <p style={{ color: INK_MUTED, fontSize: 14, lineHeight: 1.6, marginTop: 4 }}>
              {t("Free gets you practising. Pro unlocks mocks, the AI Examiner and unlimited AI practice.")}
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
                    <span style={{ color: INK, fontSize: 14.5, fontWeight: 500 }}>{t(f.label)}</span>
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
          {t("No credit card to start the trial. Cancel anytime.")}
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────── AWARDS ─────────────────────── */

function Awards() {
  const t = useT()
  return (
    <section style={{ padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>{t("AWARDS")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(32px, 4vw, 56px)", color: INK, margin: "18px 0 0" }}>
          {t("Awarded on every store.")}
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 16, marginTop: 12, maxWidth: 540, marginInline: "auto" }}>
          {t("Editors' Choice. Year after year. The prep ACCA students actually stick with.")}
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
          <StoreBadge store="app-store" award={t("Editors' Choice")} caption="2026" />
          <StoreBadge store="google-play" award={t("Editors' Choice")} caption="2026" />
        </motion.div>

        <p className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 11, letterSpacing: "0.14em", marginTop: 28 }}>
          {t("HOVER TO TILT")}
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
        <HandWrittenTitle title="Then the next one." subtitle="Pass this paper." />
        <div style={{ marginTop: -32, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <PrimaryCTA large onClick={() => navigate("/signup")}>
            Start prepping — free <ArrowRight size={20} strokeWidth={2.4} />
          </PrimaryCTA>
          <p style={{ color: INK_MUTED, fontSize: 14 }}>
            No credit card · A plan in 60 seconds · Cancel anytime
          </p>
        </div>
      </div>
    </section>
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
      <LazyOnView style={{ minHeight: 700 }}><QualificationRoadmap /></LazyOnView>
      <LazyOnView id="features" style={{ minHeight: 800 }}><Features /></LazyOnView>
      <LazyOnView style={{ minHeight: 700 }}><FeatureSwiper /></LazyOnView>
      <LazyOnView style={{ minHeight: 800 }}><Identity /></LazyOnView>
      <LazyOnView id="stories" style={{ minHeight: 700 }}><Stories /></LazyOnView>
      <LazyOnView id="pricing" style={{ minHeight: 900 }}><Pricing /></LazyOnView>
      <LazyOnView style={{ minHeight: 400 }}><Awards /></LazyOnView>
      <LazyOnView style={{ minHeight: 500 }}><CinematicFooter heading="Your next paper is waiting." /></LazyOnView>
      <LaraLandingWidget />
    </div>
  )
}
