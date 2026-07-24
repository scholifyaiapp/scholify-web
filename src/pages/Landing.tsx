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
import { HandWrittenTitle } from "@/components/ui/hand-writing-text"
import { CinematicFooter } from "@/components/ui/motion-footer"
import PartnerLogos from "@/components/ui/partner-logos"
import PaymentMethods from "@/components/PaymentMethods"
import { AnimatedText } from "@/components/ui/animated-shiny-text"
import { ImageComparison } from "@/components/ui/image-comparison-slider"
import { ImageSwiper } from "@/components/ui/image-swiper"
import { InteractiveFolderGallery } from "@/components/ui/interactive-folder-gallery"
import AnimatedCardStack, { type StackFact } from "@/components/ui/animated-card-stack"
import { StoreBadge } from "@/components/ui/store-badge"
import LazyOnView from "@/components/LazyOnView"
import { AnimatedText as AnimatedUnderlineText } from "@/components/ui/animated-underline-text-one"
import { UpgradeBanner } from "@/components/ui/upgrade-banner"
import { Hero3DShowcase, TheLoopSection } from "@/components/landing-3d"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import CharlesCarousel from "@/components/CharlesCarousel"
import VisionVideoSection from "@/components/VisionVideoSection"
import LanguageToggle from "@/components/language-toggle"
import { useT } from "@/i18n/LanguageProvider"
import { PRELAUNCH_MODE } from "@/lib/launch"

const SIGN_IN_PATH = PRELAUNCH_MODE ? "/sign-in?team=1&next=/admin" : "/sign-in"
const SIGN_UP_PATH = PRELAUNCH_MODE ? "/sign-up?team=1" : "/sign-up"

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

function ScholifyLogo({ size = 32, wordmark = true, weight = 700, className }: { size?: number; wordmark?: boolean; weight?: number; className?: string }) {
  return (
    <a
      href="/"
      className={className}
      style={{ alignItems: "center", textDecoration: "none", transition: "transform 0.2s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      aria-label="Scholify"
    >
      <ScholifyLockup size={size} color={INK} wordmark={wordmark} weight={weight} />
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
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      transition={CTA_SPRING}
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
    </motion.button>
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
      className="glass-light pl-3.5 pr-2.5 sm:pl-5 sm:pr-3"
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        zIndex: 100,
        width: "calc(100% - 32px)",
        maxWidth: 1200,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        borderRadius: 999,
        boxShadow: "0 1px 2px rgba(20,20,26,0.04), 0 12px 32px rgba(20,20,26,0.06)",
      }}
    >
      {/* Bigger + bolder logo, responsive so the enlarged lockup still fits
          the single-row nav next to the toggle + CTA at every width:
          ultra-narrow (<360) shows the mark alone, phones show the full
          lockup at 31, tablet/desktop at 34. */}
      <ScholifyLogo size={32} weight={800} wordmark={false} className="inline-flex min-[360px]:hidden" />
      <ScholifyLogo size={31} weight={800} className="hidden min-[360px]:inline-flex sm:hidden" />
      <ScholifyLogo size={34} weight={800} className="hidden sm:inline-flex" />

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
            { label: t("Partners"), href: "/partners/apply", onClick: () => navigate("/partners/apply") },
          ]}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LanguageToggle />
        <a
          href={SIGN_IN_PATH}
          onClick={(e) => {
            e.preventDefault()
            navigate(SIGN_IN_PATH)
          }}
          className="scholify-glass-pill hidden rounded-full px-5 py-2 text-sm font-semibold md:inline-flex"
          style={{ color: "var(--foreground)", textDecoration: "none", alignItems: "center" }}
        >
          {t("Sign in")}
        </a>
        <a
          href={SIGN_UP_PATH}
          onClick={(e) => {
            e.preventDefault()
            navigate(SIGN_UP_PATH)
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
        text={t("From the F1 to ACCA member.")}
        textClassName="font-display font-normal tracking-[-0.03em]"
        gradientColors="linear-gradient(90deg, #14141A 0%, #C80000 40%, #E50068 50%, #C80000 60%, #14141A 100%)"
        gradientAnimationDuration={3.5}
        className="!py-0"
      />
    </motion.div>
  )
}

function Hero() {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
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
      <div
        aria-hidden
        className="hidden lg:block"
        style={{ position: "absolute", right: "clamp(18px,4vw,68px)", top: 170, zIndex: 1 }}
      >
        <CharlesMascot pose="thumbsup" size="clamp(118px,12vw,176px)" delay={0.45} />
      </div>
      <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto" }}>
        <UpgradeBanner
          buttonText={t("Meet Charles")}
          description={t("— your AI race engineer for ACCA")}
          onClick={() => navigate(SIGN_UP_PATH)}
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
          {t("Scholify shows you where marks were lost, builds a focused daily comeback plan, and keeps adjusting it toward your next sitting.")}
        </motion.p>

        <div
          aria-label={t("Scholify performance telemetry")}
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ maxWidth: 560, margin: "26px auto 0", gap: 8 }}
        >
          {[
            ["01 · TELEMETRY", "Find lost marks"],
            ["02 · STRATEGY", "Race today's plan"],
            ["03 · SITTING", "Recalculate to pass"],
          ].map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 + index * 0.12, ease: EASE_DECISIVE }}
              style={{ position: "relative", overflow: "hidden", padding: "13px 15px", textAlign: "left", borderRadius: 14, background: index === 1 ? INK : "rgba(255,255,255,.72)", border: `1px solid ${index === 1 ? INK : HAIR}`, boxShadow: "0 10px 26px -20px rgba(20,20,26,.45)" }}
            >
              <span className="font-mono-pro" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9.5, letterSpacing: ".13em", color: index === 1 ? "rgba(255,255,255,.55)" : BRAND_500 }}>
                <motion.span
                  aria-hidden
                  animate={reduce ? undefined : { opacity: [1, 0.3, 1], scale: [1, 0.82, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: index === 1 ? BRAND_400 : BRAND_500, display: "inline-block", flexShrink: 0 }}
                />
                {t(label)}
              </span>
              <strong style={{ display: "block", marginTop: 5, fontSize: 13.5, color: index === 1 ? "#fff" : INK }}>{t(value)}</strong>
              <span aria-hidden style={{ position: "absolute", right: -9, bottom: -17, width: 42, height: 42, borderRadius: "50%", border: `7px solid ${index === 1 ? BRAND_500 : BRAND_100}` }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE_DECISIVE }}
          style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}
        >
          <PrimaryCTA onClick={() => navigate(SIGN_UP_PATH)}>
            {t("Start for free")} <ArrowRight size={18} strokeWidth={2.4} />
          </PrimaryCTA>
        </motion.div>

        {/* Countable proof, not borrowed faces — Scholify has no users to show yet. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          style={{ marginTop: 36, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap" }}
        >
          {[
            { n: "2,494", label: t("expert-written questions") },
            { n: "1,057", label: t("flashcards") },
            { n: "15", label: t("ACCA papers") },
          ].map((s, i) => (
            <motion.span
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.08, ease: EASE_DECISIVE }}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 999,
                border: `1px solid ${HAIR}`,
                background: "rgba(255,255,255,0.6)",
                boxShadow: "0 4px 10px -6px rgba(20,20,26,0.18)",
                color: INK_MUTED,
                fontSize: 13,
              }}
            >
              <span className="font-mono-pro tabular" style={{ color: INK, fontWeight: 600 }}>{s.n}</span>
              {s.label}
            </motion.span>
          ))}
          <span style={{ color: INK_MUTED, fontSize: 13 }}>· {t("Free to start")}</span>
        </motion.div>

        {/* the product itself, staged in 3D — tilt it */}
        <Hero3DShowcase />

        <div style={{ marginTop: 56 }}>
          <HandWrittenTitle
            title={t("Start. Pass. Repeat.")}
            subtitle={t("Until you're ACCA.")}
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
          {t("pass a typical Applied Skills exam. The difference isn't brains — it's practice, fast feedback, and a plan. Scholify is all three.")}
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
  { num: "01", label: "FIND THE MARKS", title: "See exactly what cost you", desc: "A diagnostic or mock breaks performance down by syllabus area, so the marks you lost become a clear recovery queue.", Icon: Target, accent: BRAND_500 },
  { num: "02", label: "TODAY'S COMEBACK", title: "Do the work that matters today", desc: "Scholify turns your weakest areas, available time, and exam date into one focused daily plan.", Icon: Zap, accent: PLUM_500 },
  { num: "03", label: "ADAPT TO THE SITTING", title: "Practise. Measure. Recalculate.", desc: "Every result updates your priorities and readiness, continuously steering the next plan toward your sitting.", Icon: Flame, accent: FIRE_500 },
]

function HowItWorks() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-120px")
  const t = useT()
  return (
    <section id="how-it-works" style={{ padding: "96px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <div
          aria-hidden
          className="hidden lg:block"
          style={{ position: "absolute", left: -92, top: -38 }}
        >
          <CharlesMascot pose="plan" size={118} delay={0.1} />
        </div>
        <SectionLabel>{t("HOW IT WORKS")}</SectionLabel>
        <AnimatedUnderlineText
          text={t("Your exam plan in 60 seconds")}
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

/* ── A — AI Brain visual: Charles generating plan ── */

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
        <span style={{ color: INK_MUTED, fontSize: 13 }}>{t("Charles is reading your telemetry…")}</span>
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

/* ── B — AI Examiner: answer in, mark out ── */

function VisualExaminer() {
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
        {t("A human marker takes days. Charles takes seconds.")}
      </p>
    </div>
  )
}

/* ── C — Meet Charles ── */

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
          {t("Meet Charles, your race engineer.")}
        </h3>
        <p style={{ color: INK_MUTED, fontSize: "clamp(13.5px, 1.6vw, 14.5px)", lineHeight: 1.55, margin: 0, maxWidth: 320 }}>
          {t("Your AI race engineer. He knows your papers, readiness and today's strategy — every explanation is shaped around your telemetry.")}
        </p>

        <motion.div
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
          <div style={{ position: "relative", zIndex: 1 }}>
            <CharlesMascot pose="wave" size={avatarSize} />
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
        type="button"
        aria-expanded={hovered}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        // Hover alone never fires on touch, so tapping this button did
        // nothing on mobile — toggle on click too so the preview it reveals
        // is reachable without a mouse.
        onClick={() => setHovered((v) => !v)}
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
          desc="Original, syllabus-aligned question banks for every Applied Knowledge and Applied Skills paper — marked instantly, explained properly. When you need more laps, Charles writes fresh exam-style questions from any topic or your own notes."
          bullets={[
            "Curated banks for all nine OT papers",
            "Instant marking with teaching explanations",
            "Ask Charles why — on any question, 24/7",
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
            "190 written questions, each with its rubric",
            "Trains the skill OT questions can't teach",
          ]}
          visual={<VisualExaminer />}
        />

        <FeatureBlock
          index={2}
          reverse={false}
          tag="MEET YOUR AI TUTOR"
          title="Your AI Partner."
          desc="Charles is built into Scholify as your race engineer. He reads your paper history, weak syllabus sectors and today's race plan, then explains what will recover the next mark."
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
  papers: { id: string; code?: string; name: string; badge?: string }[]
}[] = [
  {
    label: "Applied Knowledge",
    accent: BRAND_500,
    papers: [
      { id: "BT", code: "F1", name: "Business & Technology", badge: "BANK" },
      { id: "MA", code: "F2", name: "Management Accounting", badge: "BANK" },
      { id: "FA", code: "F3", name: "Financial Accounting", badge: "BANK" },
    ],
  },
  {
    label: "Applied Skills",
    accent: PLUM_500,
    papers: [
      { id: "LW", code: "F4", name: "Corporate & Business Law", badge: "BANK" },
      { id: "PM", code: "F5", name: "Performance Management", badge: "BANK" },
      { id: "TX", code: "F6", name: "Taxation", badge: "BANK" },
      { id: "FR", code: "F7", name: "Financial Reporting", badge: "BANK" },
      { id: "AA", code: "F8", name: "Audit & Assurance", badge: "BANK" },
      { id: "FM", code: "F9", name: "Financial Management", badge: "BANK" },
    ],
  },
  {
    label: "Strategic Professional",
    note: "Essentials + 2 of 4 Options",
    accent: FIRE_500,
    papers: [
      { id: "SBL", name: "Strategic Business Leader", badge: "AI EXAMINER" },
      { id: "SBR", name: "Strategic Business Reporting", badge: "AI EXAMINER" },
      { id: "AFM", code: "P4", name: "Advanced Financial Mgmt" },
      { id: "APM", code: "P5", name: "Advanced Performance Mgmt" },
      { id: "ATX", code: "P6", name: "Advanced Taxation" },
      { id: "AAA", code: "P7", name: "Advanced Audit & Assurance" },
    ],
  },
]

function PaperCard({ paper, accent, delay }: { paper: (typeof ROADMAP_LEVELS)[number]["papers"][number]; accent: string; delay: number }) {
  const navigate = useNavigate()
  const t = useT()
  return (
    <motion.button
      type="button"
      onClick={() => navigate(SIGN_UP_PATH)}
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
        <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6, minWidth: 0 }}>
          {paper.code && (
            <span className="font-mono-pro" style={{ fontSize: 11, fontWeight: 600, color: INK_MUTED, letterSpacing: "0.04em" }}>
              {paper.code}
            </span>
          )}
          <span className="font-mono-pro" style={{ fontSize: 15, fontWeight: 700, color: accent, letterSpacing: "0.02em" }}>
            {paper.id}
          </span>
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
              background: paper.badge === "AI EXAMINER" ? `${FIRE_500}14` : paper.badge === "NEW" ? `${PLUM_500}14` : paper.badge === "BANK" ? `${SHIELD_500}14` : `${BRAND_500}0d`,
              color: paper.badge === "AI EXAMINER" ? FIRE_500 : paper.badge === "NEW" ? PLUM_500 : paper.badge === "BANK" ? "#0F9D8C" : BRAND_500,
              border: `1px solid ${paper.badge === "AI EXAMINER" ? FIRE_500 : paper.badge === "NEW" ? PLUM_500 : paper.badge === "BANK" ? SHIELD_500 : BRAND_500}3a`,
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
            {t("Fifteen papers.")}{" "}
            <em style={{ fontStyle: "italic" }} className="grad-hero-text">{t("One roadmap.")}</em>
          </h2>
          <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 580, margin: "20px auto 0", lineHeight: 1.65 }}>
            {t("Expert-written question banks for every Applied Knowledge and Applied Skills exam. Unlimited AI practice across all fifteen papers. One roadmap that follows you from your first exam to full ACCA membership.")}
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

        <FutureQualification />
      </div>
    </section>
  )
}

/* ─────────────────────── MILESTONE GALLERY ─────────────────────── */

const MILESTONE_PHOTOS: Array<{ id: string; image: string; altKey: string }> = [
  { id: "achievement", image: "/milestones/cert-achievement.svg", altKey: "Specimen certificate of achievement for a single ACCA paper" },
  { id: "diploma", image: "/milestones/cert-diploma.svg", altKey: "Specimen Diploma in Accounting and Business certificate" },
  { id: "advanced-diploma", image: "/milestones/cert-advanced-diploma.svg", altKey: "Specimen Advanced Diploma in Accounting and Business certificate" },
  { id: "professional", image: "/milestones/cert-professional.svg", altKey: "Specimen Professional Level completion certificate" },
  { id: "member", image: "/milestones/cert-member.svg", altKey: "Specimen ACCA Member certificate" },
]

function MilestoneGallery() {
  const t = useT()
  return (
    <section style={{ padding: "56px 24px", background: BG_SECONDARY }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>{t("WHERE THE ROADMAP LEADS")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: INK, margin: "14px 0 0", lineHeight: 1.12 }}>
          {t("Every paper closes with")}{" "}
          <em style={{ fontStyle: "italic" }} className="grad-hero-text">{t("a real document.")}</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 15, maxWidth: 520, margin: "14px auto 0", lineHeight: 1.6 }}>
          {t("ACCA issues the certificate. Scholify gets you there.")}
        </p>

        <InteractiveFolderGallery
          folderName={t("Your qualification.folder")}
          dragHintText={t("Drag any card down to close")}
          photos={MILESTONE_PHOTOS.map((p) => ({ id: p.id, image: p.image, alt: t(p.altKey) }))}
        />
      </div>
    </section>
  )
}

/* ── The redesigned ACCA Qualification — second roadmap (official, from 2027) ── */

const FUTURE_LEVELS: typeof ROADMAP_LEVELS = [
  {
    label: "Foundations",
    note: "Entry route · exams from July 2027",
    accent: SHIELD_500,
    papers: [
      { id: "F1", name: "Accounts Preparation", badge: "JUL 2027" },
      { id: "F2", name: "Management Information & Costing", badge: "JUL 2027" },
      { id: "F3", name: "Decision Making with Data", badge: "JUL 2027" },
    ],
  },
  {
    label: "Knowledge",
    note: "Exams from July 2027",
    accent: BRAND_500,
    papers: [
      { id: "K1", name: "Financial Accounting", badge: "JUL 2027" },
      { id: "K2", name: "Management Accounting", badge: "JUL 2027" },
      { id: "K3", name: "Business Law", badge: "JUL 2027" },
    ],
  },
  {
    label: "Expertise",
    note: "Exams from September 2027",
    accent: PLUM_500,
    papers: [
      { id: "E1", name: "Taxation", badge: "SEP 2027" },
      { id: "E2", name: "Financial Reporting", badge: "SEP 2027" },
      { id: "E3", name: "Audit, Risk & Control", badge: "SEP 2027" },
      { id: "E4", name: "Finance & Investment", badge: "SEP 2027" },
      { id: "E5", name: "Performance with Data Analysis", badge: "SEP 2027" },
    ],
  },
  {
    label: "Strategic Professional",
    note: "S1 + S2 + 1 of 5 Options · from September 2027",
    accent: FIRE_500,
    papers: [
      { id: "S1", name: "Business & Sustainability Reporting", badge: "SEP 2027" },
      { id: "S2", name: "Strategic Business Leader", badge: "SEP 2027" },
      { id: "SAA", name: "Audit & Assurance Professional", badge: "SEP 2027" },
      { id: "SCF", name: "Corporate Finance Professional", badge: "SEP 2027" },
      { id: "SDS", name: "Data Science Professional", badge: "NEW" },
      { id: "SPI", name: "Performance & Insights Professional", badge: "SEP 2027" },
      { id: "STA", name: "Taxation Advisory Professional", badge: "SEP 2027" },
    ],
  },
]

function FutureQualification() {
  const t = useT()
  return (
    <div style={{ marginTop: 72 }}>
      <div style={{ textAlign: "center" }}>
        <SectionLabel>{t("OFFICIAL · THE 2027 REDESIGN")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}>
          {t("The next roadmap.")}{" "}
          <em style={{ fontStyle: "italic" }} className="grad-hero-text">{t("From 2027.")}</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 16, maxWidth: 620, margin: "18px auto 0", lineHeight: 1.65 }}>
          {t("ACCA relaunches the qualification in 2027: four levels, new exam names, and a brand-new Data Science option. Your current passes carry across — and Scholify will support the new structure from day one.")}
        </p>
      </div>

      <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 36 }}>
        {FUTURE_LEVELS.map((level, li) => (
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
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-mono-pro"
        style={{ textAlign: "center", color: INK_MUTED, fontSize: 10, letterSpacing: "0.12em", marginTop: 32 }}
      >
        {t("SOURCE: ACCAGLOBAL.COM · FIRST EXAMS JULY–SEPTEMBER 2027 · CURRENT PASSES CARRY TRANSITION CREDIT")}
      </motion.p>
    </div>
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

/* ─────────────────────── PROOF ─────────────────────── */

type GlowTone = "blue" | "purple" | "green" | "red" | "orange"

/* ─────────────────────── COMPARE / ROI ─────────────────────── */

const ROI_COLS = ["Scholify Pro", "Tuition centres", "Global providers", "Private tutor"] as const

const ROI_ROWS: { label: string; values: [string, string, string, string]; highlight?: boolean }[] = [
  { label: "One paper (~3 months)", values: ["≈ €39", "€390–730", "€400–600", "€900+"], highlight: true },
  { label: "All 13 exams to membership", values: ["≈ €280", "€6,000+", "€5,500+", "€10,000+"], highlight: true },
  { label: "AI tutor", values: ["24/7", "class hours", "email", "by the hour"] },
  { label: "Written answers marked", values: ["seconds", "days", "days", "days"] },
  { label: "Timed mocks + readiness analytics", values: ["✓", "some", "✓", "—"] },
  { label: "Personalised daily plan", values: ["✓", "fixed schedule", "self-paced", "✓"] },
  { label: "Study any hour, from any device", values: ["✓", "—", "✓", "—"] },
  { label: "Cancel anytime", values: ["✓", "—", "—", "✓"] },
]

function CompareROI() {
  const t = useT()
  return (
    <section style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>{t("THE ROI")}</SectionLabel>
          <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}>
            {t("Same destination.")}{" "}
            <em style={{ fontStyle: "italic" }} className="grad-hero-text">{t("A fraction of the cost.")}</em>
          </h2>
          <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 620, margin: "20px auto 0", lineHeight: 1.65 }}>
            {t("Tuition centres charge €390–730 per paper. Scholify Pro costs less per month than one hour with a tutor — for every paper, every mode, every day.")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_DECISIVE }}
          className="soft-card"
          style={{ marginTop: 48, overflow: "hidden", borderRadius: 24 }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={{ padding: "18px 20px", textAlign: "left", fontSize: 12, letterSpacing: "0.08em", color: INK_MUTED, fontWeight: 600, borderBottom: `1px solid ${HAIR}` }} />
                  {ROI_COLS.map((c, i) => (
                    <th
                      key={c}
                      style={{
                        padding: "18px 16px",
                        textAlign: "center",
                        fontSize: 13,
                        fontWeight: 800,
                        color: i === 0 ? "#fff" : INK,
                        background: i === 0 ? GRAD_HERO : undefined,
                        borderBottom: `1px solid ${HAIR}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t(c)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROI_ROWS.map((row, ri) => (
                  <tr key={row.label} style={{ background: ri % 2 === 0 ? "transparent" : "rgba(20,20,26,0.02)" }}>
                    <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 600, color: INK }}>{t(row.label)}</td>
                    {row.values.map((v, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: "14px 16px",
                          textAlign: "center",
                          fontSize: row.highlight ? 15 : 13.5,
                          fontWeight: ci === 0 ? 800 : 500,
                          color: ci === 0 ? BRAND_500 : v === "—" ? "rgba(20,20,26,0.3)" : INK_MUTED,
                          background: ci === 0 ? `${BRAND_100}55` : undefined,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {v === "✓" ? <span style={{ color: ci === 0 ? BRAND_500 : SHIELD_500, fontWeight: 800 }}>✓</span> : t(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <SavingsCalculator />

        <p className="font-mono-pro" style={{ textAlign: "center", color: INK_MUTED, fontSize: 10, letterSpacing: "0.1em", marginTop: 20, lineHeight: 1.6 }}>
          {t("MARKET RATES: PUBLISHED ONLINE-COURSE PRICES PER PAPER (CIS TUITION CENTRES, 2026) AND TYPICAL ON-DEMAND COURSE PRICING. SCHOLIFY: PRO AT $14.99/MO OR $119.99/YR. EXAM ENTRY FEES PAYABLE TO ACCA ARE SEPARATE EVERYWHERE.")}
        </p>
      </div>
    </section>
  )
}

/* ── Interactive savings calculator ───────────────────────────── */

/** Eases a displayed number toward its target whenever the target moves. */
function useSmoothNumber(target: number, durationMs = 550): number {
  const [val, setVal] = useState(target)
  const fromRef = useRef(target)
  useEffect(() => {
    const from = fromRef.current
    if (from === target) return
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = from + (target - from) * eased
      setVal(v)
      if (p < 1) raf = requestAnimationFrame(tick)
      else fromRef.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); fromRef.current = target }
  }, [target, durationMs])
  return val
}

const EUR = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })
const UZS_PER_EUR = 14200
const SCHOLIFY_EUR_PER_MONTH = 14

function fmtUzs(eur: number): string {
  const uzs = Math.round((eur * UZS_PER_EUR) / 100000) * 100000
  return new Intl.NumberFormat("ru-RU").format(uzs).replace(/,/g, " ")
}

function RoiSlider({
  label, value, min, max, step, format, onChange,
}: { label: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void }) {
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>{label}</span>
        <span className="font-mono-pro tabular" style={{ fontSize: 14, fontWeight: 700, color: BRAND_500, background: `${BRAND_100}88`, padding: "3px 10px", borderRadius: 999 }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        className="roi-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-label={label}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span className="font-mono-pro" style={{ fontSize: 10.5, color: INK_MUTED }}>{format(min)}</span>
        <span className="font-mono-pro" style={{ fontSize: 10.5, color: INK_MUTED }}>{format(max)}</span>
      </div>
    </div>
  )
}

function SavingsCalculator() {
  const navigate = useNavigate()
  const t = useT()
  const [papers, setPapers] = useState(6)
  const [pricePerPaper, setPricePerPaper] = useState(450)
  const [monthsPerPaper, setMonthsPerPaper] = useState(3)

  const courseCost = papers * pricePerPaper
  const scholifyCost = papers * monthsPerPaper * SCHOLIFY_EUR_PER_MONTH
  const saved = Math.max(0, courseCost - scholifyCost)

  const animSaved = useSmoothNumber(saved)
  const animCourse = useSmoothNumber(courseCost)
  const animScholify = useSmoothNumber(scholifyCost)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE_DECISIVE }}
      className="soft-card"
      style={{ marginTop: 20, borderRadius: 24, overflow: "hidden", display: "flex", flexWrap: "wrap" }}
    >
      {/* sliders */}
      <div style={{ flex: "1 1 320px", padding: "32px 32px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.14em", color: INK_MUTED, fontWeight: 500 }}>{t("YOUR NUMBERS")}</div>
          <h3 className="font-display" style={{ color: INK, fontSize: 26, margin: "8px 0 0", letterSpacing: "-0.02em" }}>
            {t("Drag the sliders to your reality.")}
          </h3>
        </div>
        <RoiSlider label={t("Papers left to pass")} value={papers} min={1} max={13} step={1} format={(v) => `${v}`} onChange={setPapers} />
        <RoiSlider label={t("Course price per paper (your local rate)")} value={pricePerPaper} min={300} max={800} step={10} format={(v) => `€${v}`} onChange={setPricePerPaper} />
        <RoiSlider label={t("Months you study per paper")} value={monthsPerPaper} min={2} max={6} step={1} format={(v) => `${v} ${t("mo")}`} onChange={setMonthsPerPaper} />
      </div>

      {/* result */}
      <div style={{ flex: "1 1 320px", background: BG_DARK, padding: "32px 32px 28px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
        <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(250,250,247,0.55)", fontWeight: 500 }}>
          {t("YOU KEEP")}
        </div>
        <div className="font-mono-pro tabular" style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, lineHeight: 1, background: GRAD_HERO, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          €{EUR.format(Math.round(animSaved))}
        </div>
        <div style={{ color: "rgba(250,250,247,0.65)", fontSize: 13.5, lineHeight: 1.5 }}>
          ≈ <span className="font-mono-pro tabular" style={{ color: INK_INVERSE, fontWeight: 600 }}>{fmtUzs(saved)}</span> UZS —{" "}
          {t("kept in your pocket on the way to the same letters.")}
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "6px 0" }} />

        {[
          { label: t("Tuition-centre route"), value: `€${EUR.format(Math.round(animCourse))}`, dim: false, strike: true },
          { label: t("Scholify Pro route"), value: `€${EUR.format(Math.round(animScholify))}`, dim: false, strike: false },
        ].map((r) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 13, color: "rgba(250,250,247,0.55)" }}>{r.label}</span>
            <span className="font-mono-pro tabular" style={{ fontSize: 15, fontWeight: 600, color: r.strike ? "rgba(250,250,247,0.45)" : "#F4A405", textDecoration: r.strike ? "line-through" : "none" }}>
              {r.value}
            </span>
          </div>
        ))}

        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} style={{ marginTop: 10 }}>
          <button
            type="button"
            onClick={() => navigate(SIGN_UP_PATH)}
            style={{ width: "100%", padding: "15px 24px", borderRadius: 999, border: "none", background: GRAD_HERO, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 14px 34px -10px ${BRAND_500}88` }}
          >
            {t("Keep the difference — start free")}
          </button>
        </motion.div>
        <p style={{ fontSize: 10.5, color: "rgba(250,250,247,0.4)", lineHeight: 1.5, margin: 0 }}>
          {t("Scholify at €14/mo (Pro monthly; annual is cheaper still). ACCA exam entry fees are separate on every route.")}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────── ACCA FACTS CTA ─────────────────────── */

const ACCA_FACT_KEYS: Array<{ titleKey: string; descKey: string; image: string }> = [
  { titleKey: "1.9 million", descKey: "ACCA students and members across more than 180 countries — this qualification travels.", image: "/cta-cards/fact-reach.svg" },
  { titleKey: "All Big Four.", descKey: "PwC, Deloitte, EY and KPMG all recognise and actively hire ACCA members.", image: "/cta-cards/fact-employers.svg" },
  { titleKey: "13 papers.", descKey: "One qualification, one roadmap — BT all the way to strategic professional.", image: "/cta-cards/fact-roadmap.svg" },
]

function AccaFactsCTA() {
  const t = useT()
  const navigate = useNavigate()
  const facts = ACCA_FACT_KEYS.map((f) => ({ title: t(f.titleKey), description: t(f.descKey), image: f.image })) as [StackFact, StackFact, StackFact]

  return (
    <section style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>{t("WHY ACCA")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}>
          {t("The qualification is the hard part.")}{" "}
          <em style={{ fontStyle: "italic" }} className="grad-hero-text">{t("We handle that.")}</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 480, margin: "20px auto 0", lineHeight: 1.65 }}>
          {t("A few reasons candidates put in the work.")}
        </p>

        <AnimatedCardStack
          facts={facts}
          ctaLabel={t("Start free")}
          animateLabel={t("Next")}
          onCta={() => navigate(SIGN_UP_PATH)}
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
  { label: "Charles AI race engineer on every plan" },
  { label: "Timed mock exams", pro: true },
  { label: "AI Examiner — instant written marking", pro: true },
  { label: "Custom practice from topics or your notes", pro: true },
  { label: "Mock history & readiness trend", pro: true },
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
          {t("Start with a 3-day free trial — no card. Annual saves 33%.")}
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
              starterMonth={9.99}
              starterAnnual={6.67}
              proMonth={14.99}
              proAnnual={10.00}
              starterLabel={t("Beginner")}
              proLabel={t("Pro")}
              ctaLabel={t("Start free")}
              onCta={() => navigate(SIGN_UP_PATH)}
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
          {t("No card to start. A 3-day free trial, then Beginner or Pro.")}
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────── FINAL CTA ─────────────────────── */

function FinalCTA() {
  const navigate = useNavigate()
  const t = useT()
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
        <HandWrittenTitle title={t("Then the next one.")} subtitle={t("Pass this paper.")} />
        <div style={{ marginTop: -32, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <PrimaryCTA large onClick={() => navigate(SIGN_UP_PATH)}>
            {t("Start prepping — free")} <ArrowRight size={20} strokeWidth={2.4} />
          </PrimaryCTA>
          <p style={{ color: INK_MUTED, fontSize: 14 }}>
            {t("No credit card · A plan in 60 seconds · Cancel anytime")}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── MOBILE APPS TEASER ─────────────────────── */

function MobileAppsTeaser() {
  const t = useT()
  return (
    <section style={{ padding: "56px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <p className="font-mono-pro" style={{ color: INK_MUTED, fontSize: 11, letterSpacing: "0.14em", marginBottom: 24 }}>
          {t("MOBILE APPS — COMING SEPTEMBER 1, 2026")}
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 20 }}>
          <StoreBadge type="app-store" comingSoonLabel={t("Coming soon")} note={t("From September 1, 2026")} />
          <StoreBadge type="google-play" comingSoonLabel={t("Coming soon")} note={t("From September 1, 2026")} />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function Landing() {
  return (
    <div className="scholify-race-shell race-grid-surface" style={{ backgroundColor: BG_PRIMARY, color: INK, minHeight: "100vh", overflowX: "hidden" }}>
      <LiquidGlassFilterDefs />
      <Nav />
      <Hero />
      <PartnerLogos
        heading="Built for the ACCA world"
        caption="Scholify prepares you for the ACCA qualification — the pathway studied at the world's leading institutions."
      />
      <CharlesCarousel />
      <VisionVideoSection />
      <LazyOnView style={{ minHeight: 600 }}><Problem /></LazyOnView>
      <LazyOnView id="how-it-works" style={{ minHeight: 700 }}><HowItWorks /></LazyOnView>
      <LazyOnView style={{ minHeight: 700 }}><TheLoopSection /></LazyOnView>
      <LazyOnView style={{ minHeight: 700 }}><QualificationRoadmap /></LazyOnView>
      <LazyOnView style={{ minHeight: 700 }}><MilestoneGallery /></LazyOnView>
      <LazyOnView id="features" style={{ minHeight: 800 }}><Features /></LazyOnView>
      <LazyOnView style={{ minHeight: 700 }}><FeatureSwiper /></LazyOnView>
      <LazyOnView style={{ minHeight: 800 }}><Identity /></LazyOnView>
      <LazyOnView style={{ minHeight: 800 }}><CompareROI /></LazyOnView>
      <LazyOnView style={{ minHeight: 600 }}><AccaFactsCTA /></LazyOnView>
      <LazyOnView id="pricing" style={{ minHeight: 900 }}><Pricing /></LazyOnView>
      <PaymentMethods style={{ padding: "56px 24px 8px", maxWidth: 1100, margin: "0 auto" }} />
      <LazyOnView style={{ minHeight: 300 }}><MobileAppsTeaser /></LazyOnView>
      <LazyOnView style={{ minHeight: 500 }}><CinematicFooter heading="Your next paper is waiting." /></LazyOnView>
    </div>
  )
}
