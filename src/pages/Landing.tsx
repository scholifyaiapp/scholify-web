import { useEffect, useRef, useState, lazy, Suspense } from "react"
import { useNavigate } from "react-router-dom"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type Variants,
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
import { QUESTION_COUNTS } from "@/lib/acca-content-counts"
import { JUNE_2026_PASS_RATES } from "@/lib/acca-pass-rates"
import { MARKET_HEADLINES, MEMBERS_BY_YEAR, MEMBER_GROWTH_PCT, MEMBER_GROWTH_CAGR_PCT, type MarketStat } from "@/lib/acca-market-stats"

// Computed from the source of truth so the hero number can't drift stale again.
// The old hardcoded "2,494" understated the real authored bank by ~2,000.
const AUTHORED_QUESTION_TOTAL = Object.values(QUESTION_COUNTS).reduce((a, b) => a + b, 0)
import { PricingInteraction } from "@/components/ui/pricing-interaction"
import { LiquidGlassFilterDefs } from "@/components/ui/liquid-glass-button"
import { HandWrittenTitle } from "@/components/ui/hand-writing-text"
/*
 * The footer is the landing page's ONLY consumer of GSAP + ScrollTrigger (via
 * itself and MagneticButton) — roughly 70 kB that was being parsed on first
 * paint for a component fifteen screens down. LazyOnView defers rendering, not
 * the import, so the code has to be split to actually leave the critical chunk.
 */
const CinematicFooter = lazy(() =>
  import("@/components/ui/motion-footer").then((m) => ({ default: m.CinematicFooter })),
)
import PartnerLogos from "@/components/ui/partner-logos"
import PaymentMethods from "@/components/PaymentMethods"
import { AnimatedText } from "@/components/ui/animated-shiny-text"
import { ImageComparison } from "@/components/ui/image-comparison-slider"
import { ImageSwiper } from "@/components/ui/image-swiper"
import AnimatedCardStack, { type StackFact } from "@/components/ui/animated-card-stack"
import { StoreBadge } from "@/components/ui/store-badge"
import PhoneMockupBasic from "@/components/ui/phone-mockups-1"
import LazyOnView from "@/components/LazyOnView"
import { AnimatedText as AnimatedUnderlineText } from "@/components/ui/animated-underline-text-one"
import { UpgradeBanner } from "@/components/ui/upgrade-banner"
import { startStripeCheckout, type StripePlan } from "@/lib/stripe"
import { Hero3DShowcase, TheLoopSection } from "@/components/landing-3d"
import { SystemWalkthrough, ThreeReasons } from "@/components/landing-system"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import CharlesCarousel from "@/components/CharlesCarousel"
import { useT } from "@/i18n/LanguageProvider"
import { PRELAUNCH_MODE, signInPath, signUpPath } from "@/lib/launch"
import { CommissionTierLadder } from "@/components/partner/reward-progress"
import { COMMISSION_TIERS } from "@/lib/partner-rewards"
import { useCalmMotion } from "@/hooks/use-calm-motion"

const SIGN_IN_PATH = signInPath(PRELAUNCH_MODE ? "/admin" : undefined)
const SIGN_UP_PATH = signUpPath()

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
const SHIELD_500 = "#2DD4BF"
const SHIELD_100 = "#DDFAF4"
const PLUM_500 = "#E50068"
const HAIR = "rgba(20,20,26,0.08)"
const GRAD_HERO = "linear-gradient(135deg, #C80000 0%, #E50068 50%, #F4A405 100%)"

const EASE_DECISIVE = [0.22, 1, 0.36, 1] as const
const EASE_HOVER = [0.4, 0, 0.2, 1] as const

/* ─────────────────────── UTILITY HOOKS ─────────────────────── */

/*
 * Counting numbers, WITHOUT a React render per frame.
 *
 * The old hook held the value in useState and called setVal() from its own
 * requestAnimationFrame loop. One of those is harmless; the page has twenty-six
 * (three hero stat cards, eight market tiles, fifteen pass-rate rows), and
 * scrolling past a section started that many rAF loops each committing a React
 * render EVERY FRAME — renders competing with the scroll itself, which is
 * exactly the stutter it looks like.
 *
 * The value now lives in a MotionValue and is written straight into the DOM
 * text by <motion.span>, so the whole count costs zero React renders. Options
 * are primitives rather than a formatter function, so the useTransform doesn't
 * re-subscribe on every parent render.
 */
interface CountUpOptions {
  from?: number
  decimals?: number
  prefix?: string
  suffix?: string
  durationMs?: number
  /** Hold at the start value until this flips true (scroll-in). */
  start?: boolean
}

function useCountUpText(target: number, options: CountUpOptions = {}) {
  const { from = 0, decimals = 0, prefix = "", suffix = "", durationMs = 1200, start = true } = options
  const calm = useCalmMotion()
  const count = useMotionValue(calm ? target : from)
  const text = useTransform(count, (v) =>
    `${prefix}${v.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`,
  )

  useEffect(() => {
    if (!start) return
    // Calm motion (touch, small screen, reduced-motion, hidden tab) shows the
    // finished figure immediately — the number is the point, not the count.
    if (calm) {
      count.set(target)
      return
    }
    count.set(from)
    const controls = animate(count, target, { duration: durationMs / 1000, ease: EASE_DECISIVE })
    return () => controls.stop()
  }, [count, target, from, durationMs, start, calm])

  return text
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

let cancelLandingScroll: (() => void) | null = null

function scrollLandingSection(id: string, updateHash = true) {
  const section = document.getElementById(id)
  if (!section) return false

  if (updateHash && window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}#${id}`)
  }

  // Smooth scrolling walks through every LazyOnView placeholder between the
  // header and the destination. Those sections mount as they enter view and
  // change the document height mid-animation, leaving distant targets such as
  // Features and Partners several screens below where the browser stops. Force
  // instant root scrolling during this short alignment pass, then restore the
  // site's normal smooth behavior. Manual interaction cancels the pass at once.
  cancelLandingScroll?.()

  let intervalId = 0
  let checks = 0
  let stableChecks = 0
  let lastScrollHeight = 0
  const root = document.documentElement
  const previousScrollBehavior = root.style.scrollBehavior
  root.style.scrollBehavior = "auto"
  const interruptEvents = ["wheel", "touchstart", "pointerdown", "keydown"] as const
  const stopAligning = () => {
    window.clearInterval(intervalId)
    root.style.scrollBehavior = previousScrollBehavior
    interruptEvents.forEach((eventName) => window.removeEventListener(eventName, stopAligning))
    if (cancelLandingScroll === stopAligning) cancelLandingScroll = null
  }
  const keepAligned = () => {
    const currentSection = document.getElementById(id)
    if (!currentSection) {
      stopAligning()
      return
    }
    const scrollMarginTop = Number.parseFloat(window.getComputedStyle(currentSection).scrollMarginTop) || 0
    const sectionTop = currentSection.getBoundingClientRect().top
    const scrollHeight = document.documentElement.scrollHeight
    const layoutChanged = Math.abs(scrollHeight - lastScrollHeight) > 1
    if (Math.abs(sectionTop - scrollMarginTop) > 1) {
      currentSection.scrollIntoView({ behavior: "auto", block: "start" })
      stableChecks = 0
    } else if (layoutChanged) {
      stableChecks = 0
    } else {
      stableChecks += 1
    }
    lastScrollHeight = scrollHeight
    checks += 1
    if (stableChecks >= 5 || checks >= 20) stopAligning()
  }

  cancelLandingScroll = stopAligning
  interruptEvents.forEach((eventName) => window.addEventListener(eventName, stopAligning, { passive: true }))
  keepAligned()
  intervalId = window.setInterval(keepAligned, 100)
  return true
}

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
        /* The nav rides the same gutter as every section below it, so its
           left edge lines up with the content instead of sitting 8px inside
           it on phones and 16px outside it on desktop. */
        top: "clamp(12px, 2vw, 24px)",
        left: "50%",
        zIndex: 100,
        width: "calc(100% - var(--page-gutter) * 2)",
        maxWidth: "var(--page-max)",
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
      {/*
        THE NAV DID NOT FIT ON A PHONE.
        At 375px the pill is 343px wide with 24px of padding, and the row asked
        for more than 400px: full lockup (~139) + "Sign in" (~88) + "Start for
        free" (~142). Nothing could shrink — both CTAs are anchors inheriting
        `white-space: nowrap`, so they simply spilled past the pill's right edge
        and were amputated by the page's `overflow-x: clip`. Every phone visitor
        saw a cut-off primary CTA.
        Below `sm` the lockup is now the mark alone and the primary CTA reads
        "Start free", which brings the row to ~256px — comfortable even at 320px.
      */}
      <ScholifyLogo size={32} weight={800} wordmark={false} className="inline-flex sm:hidden" />
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
            { label: t("Features"), href: "/#features", onClick: () => scrollLandingSection("features") },
            { label: t("How it works"), href: "/#how-it-works", onClick: () => scrollLandingSection("how-it-works") },
            { label: t("Pricing"), href: "/pricing", onClick: () => navigate("/pricing") },
            { label: t("Partners"), href: "/#partners", onClick: () => scrollLandingSection("partners") },
          ]}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Visible at EVERY width. This was `hidden md:inline-flex`, which left
            a returning customer on a phone with no route to sign-in from the
            homepage at all (the footer dropped its link too). */}
        <a
          href={SIGN_IN_PATH}
          onClick={(e) => {
            e.preventDefault()
            navigate(SIGN_IN_PATH)
          }}
          className="scholify-glass-pill inline-flex rounded-full px-4 py-2 text-sm font-semibold md:px-5"
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
          <span className="sm:hidden">{t("Start free")}</span>
          <span className="hidden sm:inline">{t("Start for free")}</span>
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
        className="landing-hero-headline !py-0"
      />
    </motion.div>
  )
}

function Hero() {
  const navigate = useNavigate()
  const t = useT()
  return (
    <section
      className="landing-hero"
      style={{
        position: "relative",
        /* dvh so the hero is exactly the visible viewport on mobile. With
           100vh the "Start for free" CTA sat under the browser's own chrome
           on first paint and only appeared after a scroll. */
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        /* Top pad = section rhythm + enough to clear the fixed nav (60px tall
           at a 12–24px offset). Was a flat 140px, which left a dead band on
           phones and crowded the nav on short laptops. */
        padding: "calc(var(--section-y) + 56px) var(--page-gutter) var(--section-y)",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/*
        Charles flanks the hero only where he actually FITS beside it.
        The content column is capped at --page-max (1180px) and the headline is
        centred inside it, so on a 1024–1440px laptop this mascot — pinned to
        the viewport's right edge and z-indexed above the non-positioned
        headline — was painted straight over "…ACCA member." He now appears
        only once the viewport is wide enough for him to sit outside the column
        entirely: (1600 − 1180) / 2 = 210px of clear margin per side.
      */}
      <div
        aria-hidden
        className="hidden min-[1600px]:block"
        style={{ position: "absolute", right: "clamp(18px,4vw,68px)", top: 170, zIndex: 1 }}
      >
        <CharlesMascot pose="thumbsup" size="clamp(118px,12vw,176px)" delay={0.45} />
      </div>
      <div className="landing-hero-content" style={{ width: "100%", maxWidth: "var(--page-max)", minWidth: 0, margin: "0 auto" }}>
        <UpgradeBanner
          className="landing-charles-banner"
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
            fontSize: "clamp(16px, 1.5vw, 20px)",
            color: INK_MUTED,
            maxWidth: 560,
            margin: "12px auto 0",
            lineHeight: 1.55,
          }}
        >
          {t("Scholify shows you where marks were lost, builds a focused daily comeback plan, and keeps adjusting it toward your next sitting.")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE_DECISIVE }}
          style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}
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
            { n: AUTHORED_QUESTION_TOTAL.toLocaleString("en-GB"), label: t("expert-written questions") },
            { n: "2,130", label: t("flashcards") },
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
  const countable = !Number.isNaN(numeric)
  const counted = useCountUpText(countable ? numeric : 0, {
    suffix: isPercent ? "%" : isMin ? " min" : isMult ? "×" : "",
    durationMs: 1400,
    start: inView,
  })

  return (
    <GlowCard customSize glowColor={tone} className="!w-full !p-1 !gap-0 !rounded-3xl !shadow-none">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: EASE_DECISIVE }}
        whileHover={{ y: -4 }}
        className="soft-card soft-card-lift"
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
          {countable ? <motion.span>{counted}</motion.span> : value}
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
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", textAlign: "center" }}>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 72px)", color: INK, margin: 0 }}>
          {t("Half of ACCA candidates fail each sitting.")}
        </h2>
        <h2 className="font-display text-pro-h grad-hero-text" style={{ fontSize: "clamp(36px, 5vw, 72px)", margin: "16px 0 0", fontStyle: "italic" }}>
          {t("Scholify exists to put you in the other half.")}
        </h2>
        <p style={{ color: INK_MUTED, fontSize: "clamp(15px, 1.35vw, 18px)", maxWidth: 620, margin: "32px auto 0", lineHeight: 1.65 }}>
          <span className="font-mono-pro tabular" style={{ color: INK, fontWeight: 700 }}>~50%</span>{" "}
          {t("pass a typical Applied Skills exam. The difference isn't brains — it's practice, fast feedback, and a plan. Scholify is all three.")}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 20, marginTop: 72 }}>
          <StatCard tone="blue" value="50%" label={t("average pass rate on Applied Skills exams")} source={t("Published ACCA global pass rates")} delay={0.05} />
          <StatCard tone="green" value="13" label={t("exams to qualify — one system for all of them")} source={t("BT to Strategic Professional")} delay={0.15} />
          <StatCard tone="purple" value="445" label={t("written practice tasks with examiner rubrics")} source={t("Built into the AI Examiner")} delay={0.25} />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── OFFICIAL PASS RATES ─────────────────────── */

/*
 * The bar slides in INSIDE a rounded mask rather than scaling — scaleX would
 * squash the 999-radius end caps mid-animation, and animating width reflows.
 * The ruler tick pokes 3px above and below the bar so it stays legible whether
 * it lands on the ink fill (rates above 50) or the pale track (below).
 */
function PassRateBar({ rate, delay, started }: { rate: number; delay: number; started: boolean }) {
  const calm = useCalmMotion()
  return (
    <div aria-hidden style={{ position: "relative", height: 16, marginTop: 7 }}>
      <div style={{ position: "absolute", top: 3, left: 0, right: 0, height: 10, borderRadius: 999, background: "rgba(20,20,26,0.06)", overflow: "hidden" }}>
        <motion.div
          initial={calm ? false : { x: "-101%" }}
          animate={started ? { x: "0%" } : {}}
          transition={{ duration: 0.9, delay, ease: EASE_DECISIVE }}
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: `${rate}%`, borderRadius: 999, background: INK }}
        />
      </div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "calc(50% - 1px)", width: 2, borderRadius: 1, background: "rgba(20,20,26,0.25)" }} />
    </div>
  )
}

function PassRateRow({ code, name, rate, delay, started }: { code: string; name: string; rate: number; delay: number; started: boolean }) {
  const counted = useCountUpText(rate, { suffix: "%", durationMs: 1200, start: started })
  return (
    <div style={{ marginTop: 15 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span className="font-mono-pro" style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.08em", color: INK_MUTED, minWidth: 32 }}>{code}</span>
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 13.5, fontWeight: 500, color: INK, textAlign: "left" }}>{name}</span>
        <motion.span className="font-mono-pro tabular" style={{ fontSize: 13.5, fontWeight: 500, color: INK }}>{counted}</motion.span>
      </div>
      <PassRateBar rate={rate} delay={delay} started={started} />
    </div>
  )
}

function PassRateLevel({ level, average, papers, index, started }: {
  level: string
  average: number
  papers: readonly { code: string; name: string; rate: number }[]
  index: number
  started: boolean
}) {
  const t = useT()
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.08 * index, ease: EASE_DECISIVE }}
      className="soft-card"
      style={{ padding: 26, borderRadius: 18 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div className="font-display" style={{ fontSize: 20, letterSpacing: "-0.02em", color: INK }}>{t(level)}</div>
        <span className="font-mono-pro tabular" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", color: BRAND_500, padding: "4px 10px", borderRadius: 999, background: BRAND_100, whiteSpace: "nowrap" }}>
          ≈{average}% {t("PASS")}
        </span>
      </div>
      <div style={{ marginTop: 6 }}>
        {papers.map((p, i) => (
          <PassRateRow key={p.code} code={p.code} name={p.name} rate={p.rate} delay={0.08 * index + 0.06 * i} started={started} />
        ))}
      </div>
    </motion.div>
  )
}

export function PassRates() {
  const t = useT()
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-100px")
  return (
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>{t("OFFICIAL ACCA DATA — JUNE 2026 SITTING")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(32px, 4.2vw, 56px)", color: INK, margin: "24px 0 0" }}>
          {t("The pass rates, paper by paper.")}
        </h2>
        <p style={{ color: INK_MUTED, fontSize: "clamp(15px, 1.35vw, 18px)", maxWidth: 660, margin: "20px auto 0", lineHeight: 1.65 }}>
          {t("Straight from ACCA's results release. The ruler mark on every bar is 50% — most Applied Skills and Strategic Professional papers sit at or below the coin flip.")}
        </p>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 20, marginTop: 56 }}>
          {JUNE_2026_PASS_RATES.map((lvl, i) => (
            <PassRateLevel key={lvl.level} level={lvl.level} average={lvl.average} papers={lvl.papers} index={i} started={inView} />
          ))}
        </div>
        <p style={{ color: INK_MUTED, fontSize: 12, margin: "28px auto 0", maxWidth: 660, lineHeight: 1.6 }}>
          {t("Source: ACCA official pass rates, June 2026 sitting (results release, July 2026). December 2025 was within 1–3 points on nearly every paper — the difficulty is structural, not one bad sitting.")}
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────── GLOBAL MARKET AT A GLANCE ─────────────────────── */

function MarketStatTile({ stat, delay, started }: { stat: MarketStat; delay: number; started: boolean }) {
  const counted = useCountUpText(stat.value, {
    decimals: stat.decimals ?? 0,
    prefix: stat.prefix ?? "",
    suffix: stat.suffix ?? "",
    durationMs: 1400,
    start: started,
  })
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE_DECISIVE }}
      className="soft-card"
      style={{ padding: "26px 22px", borderRadius: 18 }}
    >
      <motion.div className="font-mono-pro tabular" style={{ fontSize: "clamp(30px, 2.8vw, 40px)", fontWeight: 500, color: INK, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {counted}
      </motion.div>
      <div style={{ marginTop: 12, color: INK, fontSize: 14, fontWeight: 500, lineHeight: 1.45 }}>{stat.label}</div>
      <div style={{ marginTop: 6, color: INK_MUTED, fontSize: 11.5, lineHeight: 1.5 }}>{stat.source}</div>
    </motion.div>
  )
}

/*
 * A line, not bars: the members axis starts at 233k, and truncated-baseline
 * BARS would lie about the growth (length encodes quantity; position doesn't).
 * The path draws itself once in view; only the endpoints carry value labels.
 */
function MembersGrowthLine() {
  const t = useT()
  const calm = useCalmMotion()
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-100px")
  const W = 640
  const H = 150
  const PAD_X = 12
  const PAD_TOP = 30
  const PAD_BOTTOM = 26
  const values = MEMBERS_BY_YEAR.map((d) => d.members)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const x = (i: number) => PAD_X + (i * (W - PAD_X * 2)) / (values.length - 1)
  const y = (v: number) => PAD_TOP + (1 - (v - min) / (max - min)) * (H - PAD_TOP - PAD_BOTTOM)
  const dPath = values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ")
  const first = MEMBERS_BY_YEAR[0]
  const last = MEMBERS_BY_YEAR[MEMBERS_BY_YEAR.length - 1]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_DECISIVE }}
      className="soft-card"
      style={{ padding: 26, borderRadius: 18, marginTop: 20 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div className="font-display" style={{ fontSize: 20, letterSpacing: "-0.02em", color: INK }}>{t("Six years of members")}</div>
        <span className="font-mono-pro tabular" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", color: BRAND_500, padding: "4px 10px", borderRadius: 999, background: BRAND_100, whiteSpace: "nowrap" }}>
          +{MEMBER_GROWTH_PCT}% {t("SINCE 2021")} · ≈{MEMBER_GROWTH_CAGR_PCT}%/{t("YR")}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t(`ACCA members grew from ${first.members.toLocaleString("en-GB")} in 2021 to ${last.members.toLocaleString("en-GB")} in 2026.`)}
        style={{ width: "100%", height: "auto", display: "block", marginTop: 18, overflow: "visible" }}
      >
        <motion.path
          d={dPath}
          fill="none"
          stroke={INK}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={calm ? false : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE_DECISIVE, delay: 0.15 }}
        />
        {MEMBERS_BY_YEAR.map((d, i) => (
          <motion.circle
            key={d.year}
            cx={x(i)}
            cy={y(d.members)}
            r={4}
            fill={BG_PRIMARY}
            stroke={INK}
            strokeWidth={2}
            initial={calm ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.25, delay: 0.15 + 1.3 * (i / (values.length - 1)) }}
          />
        ))}
        <text x={x(0)} y={y(first.members) - 12} textAnchor="start" style={{ fontFamily: "Geist Mono, monospace", fontSize: 11.5, fill: INK, fontWeight: 500 }}>
          {first.members.toLocaleString("en-GB")}
        </text>
        <text x={x(values.length - 1)} y={y(last.members) - 12} textAnchor="end" style={{ fontFamily: "Geist Mono, monospace", fontSize: 11.5, fill: INK, fontWeight: 500 }}>
          {last.members.toLocaleString("en-GB")}
        </text>
        {MEMBERS_BY_YEAR.map((d, i) => (
          <text
            key={d.year}
            x={x(i)}
            y={H - 4}
            textAnchor={i === 0 ? "start" : i === values.length - 1 ? "end" : "middle"}
            style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fill: INK_MUTED, fontWeight: 500 }}
          >
            {d.year}
          </text>
        ))}
      </svg>
      <div style={{ marginTop: 14, color: INK_MUTED, fontSize: 11.5, lineHeight: 1.5, textAlign: "left" }}>
        {t("Headcount at 31 March each year — ACCA Annual Integrated Reports 2025 & 2026, five-year summaries.")}
      </div>
    </motion.div>
  )
}

export function MarketAtGlance() {
  const t = useT()
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-100px")
  return (
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>{t("OFFICIAL ACCA DATA — THE GLOBAL MARKET")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(32px, 4.2vw, 56px)", color: INK, margin: "24px 0 0" }}>
          {t("The global ACCA market, at a glance.")}
        </h2>
        <p style={{ color: INK_MUTED, fontSize: "clamp(15px, 1.35vw, 18px)", maxWidth: 660, margin: "20px auto 0", lineHeight: 1.65 }}>
          {t("Audited headline figures from ACCA's Annual Integrated Report for the year to 31 March 2026 — the largest community in ACCA's history, and its strongest-ever student intake.")}
        </p>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: 20, marginTop: 56, textAlign: "left" }}>
          {MARKET_HEADLINES.map((stat, i) => (
            <MarketStatTile key={stat.label} stat={stat} delay={0.05 * i} started={inView} />
          ))}
        </div>
        <MembersGrowthLine />
        <p style={{ color: INK_MUTED, fontSize: 12, margin: "28px auto 0", maxWidth: 660, lineHeight: 1.6 }}>
          {t("All figures as published: ACCA Annual Integrated Report FY 2025–26 and ACCA results releases (December 2025, June 2026). The exams-completed total is the sum of the two releases.")}
        </p>
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

/**
 * NO LONGER MOUNTED — superseded by SystemWalkthrough (components/landing-system).
 *
 * It described a product that predates chapter-level planning, the computed exam
 * date, the five-block day and the strategic route, so it taught visitors a
 * different product than the one they signed up to. Kept only because its
 * three-step scroll-line motion is worth lifting if a future section wants it;
 * delete freely once that is no longer true.
 */
function HowItWorks() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-120px")
  const t = useT()
  return (
    <section style={{ padding: "var(--section-y) var(--page-gutter)", textAlign: "center" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", position: "relative" }}>
        <div
          aria-hidden
          className="hidden lg:block"
          style={{ position: "absolute", left: -92, top: -38 }}
        >
          <CharlesMascot pose="plan" size={118} delay={0.1} />
        </div>
        <SectionLabel>{t("HOW IT WORKS")}</SectionLabel>
        <AnimatedUnderlineText
          text={t("A plan built from your real constraints")}
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 36, position: "relative" }}>
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
  // The app's real method phases (METHOD_PHASES in acca-plan.ts), in order.
  const tasks = [
    "Phase 1 · Learn — every chapter, timed",
    "Phase 2 · Strengthen — weakest areas first",
    "Phase 3 · Revise — lock it into memory",
    "Phase 4 · Rehearse — timed mock exams",
  ]
  return (
    <div ref={ref} className="soft-card" style={{ width: 420, maxWidth: "100%", padding: 28 }}>
      <div className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.12em", color: INK_MUTED, fontWeight: 500 }}>{t("YOUR GOAL")}</div>
      <div style={{ color: INK, fontSize: 16, marginTop: 8, fontWeight: 500 }}>
        {t("Pass FR in")} <span className="font-mono-pro tabular">47</span> {t("days")} · <span className="font-mono-pro tabular">25</span> {t("min/day")}
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
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(20,20,26,0.06), 0 24px 60px -12px rgba(20,20,26,0.25)",
      }}
    >
      {/* 300, not 360: the card is 420 wide but only ~303px of content on a
          375px phone, so a 360px canvas was cropped by 16% — the animation was
          paying a full frame budget to draw pixels nobody could see. */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LazyOnView style={{ width: 300, height: 300, maxWidth: "100%" }}>
          <Suspense fallback={null}>
            <Entropy size={300} className="rounded-xl overflow-hidden" />
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
  const prefersReduced = useCalmMotion()
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
  const cells = Array.from({ length: 35 }, (_, i) => {
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

      <div className="font-mono-pro" style={{ marginTop: 22, color: INK_MUTED, fontSize: 10, letterSpacing: "0.12em", fontWeight: 500 }}>{t("LAST 35 DAYS")}</div>
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
            /*
             * Was right/bottom: -16 with a 6deg rotation, so on a phone the
             * panel hung ~29px past the card — which is past the viewport, where
             * `overflow-x: clip` cut it in half. Tapping "Share" on a phone
             * revealed a chopped, tilted card. It now tucks INSIDE the card's
             * bottom-right corner, and only breaks out on desktop where there
             * is room for the flourish.
             */
            className="pit-share-preview"
            style={{
              position: "absolute",
              right: 8,
              bottom: 8,
              width: 130,
              height: 230,
              borderRadius: 22,
              background: BG_DARK,
              color: INK_INVERSE,
              padding: 14,
              boxShadow: `0 30px 60px -16px rgba(20,20,26,0.45), 0 0 0 4px ${BG_PRIMARY}`,
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
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}>
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
          desc="Original, syllabus-aligned question banks for all fifteen papers — Knowledge, Skills and Strategic Professional — marked instantly, explained properly. When you need more laps, Charles writes fresh exam-style questions from any topic or your own notes."
          bullets={[
            `${AUTHORED_QUESTION_TOTAL.toLocaleString("en-GB")} expert-written questions across all 15 papers`,
            "Instant marking with teaching explanations",
            "Charles one tap away on every screen, briefed on your weak areas",
            "Extra AI questions from any topic or your own notes — on Pro",
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
            "445 written practice tasks with examiner rubrics",
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
            "Clear English explanations",
          ]}
          visual={<VisualAIPartnerWidget />}
        />

        <FeatureBlock
          index={3}
          reverse
          tag="READINESS"
          title="Know you're ready before you book."
          desc="A readiness score per paper. Accuracy per syllabus area. Full mock history against the pass line. A 35-day study heatmap. Exam day should be a formality, not a gamble."
          bullets={[
            "Exam readiness score per paper — quoted only once it's earned",
            "Accuracy by syllabus area — see the gaps",
            "Timed mock history against the 50% pass line",
            "35-day study heatmap",
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

/**
 * NO LONGER MOUNTED. A second feature grid immediately after `Features` said the
 * same things twice, so the slot was dropped entirely. Rollup drops this from the
 * bundle since nothing references it.
 */
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
    <section style={{ padding: "var(--section-y) var(--page-gutter)", background: BG_PRIMARY }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", textAlign: "center" }}>
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
      // y only. Tweening boxShadow in JS repaints the shadow on every frame of
      // the hover, and this card renders 39 times in the roadmap; the shadow is
      // a CSS transition on .soft-card-lift instead.
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="soft-card soft-card-lift"
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
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>{t("THE FULL QUALIFICATION")}</SectionLabel>
          <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}>
            {t("Fifteen papers.")}{" "}
            <em style={{ fontStyle: "italic" }} className="grad-hero-text">{t("One roadmap.")}</em>
          </h2>
          <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 580, margin: "20px auto 0", lineHeight: 1.65 }}>
            {t("Expert-written question banks for all fifteen papers, from BT to AAA. One roadmap that follows you from your first exam to full ACCA membership.")}
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 150px), 1fr))", gap: 12 }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 150px), 1fr))", gap: 12 }}>
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

/**
 * NO LONGER MOUNTED. A brand-transformation showcase between the feature grid and
 * the ROI table — beautiful, and answering no question a buyer has. The "why" at
 * that altitude now lives in ThreeReasons (MissionSection carried it until the
 * founder cut that section on 20 Aug 2026).
 */
function Identity() {
  const t = useT()
  return (
    <section
      style={{
        position: "relative",
        padding: "calc(var(--section-y) * 1.25) var(--page-gutter)",
        background: BG_DARK,
        color: INK_INVERSE,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", maxWidth: "var(--page-max)", margin: "0 auto", textAlign: "center", width: "100%", zIndex: 2 }}>
        <SectionLabel tone="inverse">{t("THE TRANSFORMATION")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 80px)", color: INK_INVERSE, margin: "18px 0 0" }}>
          {t("You're not just passing exams.")}
        </h2>
        <h2 className="font-display text-pro-h grad-hero-text" style={{ fontSize: "clamp(40px, 5vw, 80px)", margin: "16px 0 0", fontStyle: "italic" }}>
          {t("You're becoming an ACCA member.")}
        </h2>
        <p style={{ color: "rgba(250,250,247,0.65)", fontSize: "clamp(15px, 1.35vw, 18px)", maxWidth: 620, margin: "24px auto 0", lineHeight: 1.65 }}>
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
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}>
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
/*
 * Eases a figure toward a new target. The interrupted case is the whole point:
 * these drive the ROI sliders, which change target on every drag tick.
 *
 * The bug this fixes: cleanup set `fromRef.current = target` — the target of the
 * run being CANCELLED, a number that was never on screen. So the next drag tick
 * started its ease from a stale value and the euro figure visibly jumped
 * backwards mid-drag. The current DISPLAYED value is the only correct place to
 * resume from, so that is what the ref now tracks.
 */
function useSmoothNumber(target: number, durationMs = 550): number {
  const [val, setVal] = useState(target)
  const shownRef = useRef(target)
  shownRef.current = val
  useEffect(() => {
    const from = shownRef.current
    if (from === target) return
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(from + (target - from) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
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
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
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
  { label: "Question banks across all 15 ACCA papers" },
  { label: "Instant marking + teaching explanations" },
  { label: "SRS flashcards for standards, rules & formulas" },
  { label: "Personalised study plan to exam day" },
  { label: "Readiness score & per-area analytics" },
  { label: "Full BT → AAA qualification roadmap" },
  { label: "Charles AI tutor — allowance on every plan" },
  { label: "Timed mock exams", pro: true },
  { label: "AI Examiner — instant written marking", pro: true },
  { label: "Custom practice from topics or your notes", pro: true },
  { label: "Mock history & readiness trend", pro: true },
]

function Pricing() {
  const navigate = useNavigate()
  const t = useT()
  const choosePlan = (tier: 0 | 1 | 2, period: 0 | 1) => {
    if (tier === 0) {
      navigate(SIGN_UP_PATH)
      return
    }
    const plan: StripePlan = tier === 1
      ? (period === 1 ? "annual_beginner" : "beginner")
      : (period === 1 ? "annual_pro" : "pro")
    void startStripeCheckout(plan).then((started) => {
      if (!started) navigate(signUpPath(`/pricing?checkout=${plan}`))
    })
  }
  return (
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>{t("PRICING")}</SectionLabel>
        <h2 className="font-display text-pro-h" style={{ fontSize: "clamp(40px, 5vw, 72px)", color: INK, margin: "18px 0 0" }}>
          {t("Start free.")} <em style={{ fontStyle: "italic" }}>{t("Upgrade when you're ready.")}</em>
        </h2>
        <p style={{ color: INK_MUTED, fontSize: 16, marginTop: 14, maxWidth: 560, marginInline: "auto" }}>
          {t("Build your plan free. Pro starts with 3 free days. Annual saves 33%.")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
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
              ctaLabel={(tier) => tier === 0 ? t("Start free") : tier === 1 ? t("Choose Beginner") : t("Choose Pro")}
              onCta={choosePlan}
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
              {t("The Pro trial unlocks all 15 papers, mocks, the AI Examiner and custom AI practice for 3 days.")}
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

        <div
          role="note"
          style={{
            maxWidth: 920,
            margin: "32px auto 0",
            padding: "22px 24px",
            border: `1px solid ${HAIR}`,
            borderRadius: 20,
            background: SHIELD_100,
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            textAlign: "left",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 14,
              background: SHIELD_500,
              color: "white",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 8px 18px -8px rgba(45,212,191,0.8)",
            }}
          >
            <Shield size={21} strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.14em", color: INK_MUTED, fontWeight: 700 }}>
              {t("ACCOUNT & SESSION PRIVACY")}
            </div>
            <h3 className="font-display" style={{ color: INK, fontSize: 22, margin: "5px 0 6px", letterSpacing: "-0.02em" }}>
              {t("One learner. One private account.")}
            </h3>
            <p style={{ color: INK_MUTED, fontSize: 14, lineHeight: 1.65, margin: 0 }}>
              {t("Every Scholify plan — including Beginner and Pro, monthly or annual — is licensed to one learner. You can switch devices, but only one login stays active. A new sign-in ends older sessions to protect your answers, mock results, study history and billing access.")}
            </p>
          </div>
        </div>

        <p style={{ color: INK_MUTED, fontSize: 13, marginTop: 28 }}>
          {t("No charge today on Pro. Cancel during the 3-day trial and pay nothing.")}
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────── PARTNER PROGRAMME ─────────────────────── */

function PartnerProgramme() {
  const navigate = useNavigate()
  const t = useT()
  const reduced = useCalmMotion()
  const [demoPaid, setDemoPaid] = useState(300)

  /*
   * The #partners anchor lives on the LazyOnView wrapper, not on this section:
   * the section does not exist in the DOM until the wrapper scrolls into range,
   * and a hash link has to resolve before that. Same as #features / #pricing.
   */
  return (
    <section
      aria-labelledby="partner-programme-heading"
      style={{ padding: "calc(var(--section-y) * 1.05) var(--page-gutter)", overflow: "hidden", scrollMarginTop: 96 }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.75, ease: EASE_DECISIVE }}
        style={{
          position: "relative",
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "clamp(26px, 5vw, 68px)",
          borderRadius: 34,
          border: `1px solid ${HAIR}`,
          background: "linear-gradient(145deg, rgba(255,255,255,.97), rgba(253,242,220,.55) 54%, rgba(251,231,228,.72))",
          boxShadow: "0 34px 90px -58px rgba(20,20,26,.48)",
        }}
      >
        {/*
          whileInView, not animate: this loop used to start at first paint and
          run forever on a 300px blurred circle roughly fifteen screens below
          the fold. The blur is gone too — the circle is a 13%-alpha wash whose
          3px blur was invisible and re-rasterised on every frame of the loop.
        */}
        <motion.div
          aria-hidden
          initial={false}
          whileInView={reduced ? undefined : { x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
          viewport={{ margin: "200px" }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", right: "-8%", top: "-14%", width: 300, height: 300, borderRadius: "50%", background: "rgba(244,164,5,.13)", pointerEvents: "none" }}
        />

        <div className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,.82fr)_minmax(420px,1.18fr)] lg:gap-16">
          <div>
            <SectionLabel>{t("PARTNER PROGRAMME")}</SectionLabel>
            <h2
              id="partner-programme-heading"
              className="font-display text-pro-h"
              style={{ margin: "18px 0 0", maxWidth: 650, color: INK, fontSize: "clamp(36px,5.3vw,68px)", lineHeight: 1.02, letterSpacing: "-.035em" }}
            >
              {t("Share the plan.")} <em style={{ fontWeight: 400 }}>{t("Grow the earning window.")}</em>
            </h2>
            <p style={{ margin: "22px 0 0", maxWidth: 590, color: INK_MUTED, fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.65 }}>
              {t("The rate stays simple at 27%. Performance unlocks more monthly payments for every new learner you bring: one at launch, three from learner 300, and five from learner 600.")}
            </p>

            <div className="mt-7 flex flex-wrap gap-2" aria-label={t("Preview commission tiers")}>
              {COMMISSION_TIERS.map((tier) => {
                const active = demoPaid === tier.paidCustomers
                return (
                  <motion.button
                    key={tier.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setDemoPaid(tier.paidCustomers)}
                    whileHover={reduced ? undefined : { y: -2 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    style={{
                      border: active ? `1px solid ${INK}` : `1px solid ${HAIR}`,
                      background: active ? INK : "rgba(255,255,255,.76)",
                      color: active ? "#fff" : INK,
                      borderRadius: 999,
                      padding: "10px 14px",
                      cursor: "pointer",
                      fontSize: 12.5,
                      fontWeight: 800,
                      boxShadow: active ? "0 10px 24px -15px rgba(20,20,26,.7)" : "none",
                    }}
                  >
                    {t(tier.name)} · {tier.paidCustomers === 0 ? t("Start") : `${tier.paidCustomers}+`} · {tier.monthlyPayments}×
                  </motion.button>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryCTA onClick={() => navigate("/partners/apply")}>
                {t("Explore the partner programme")} <ArrowRight size={18} strokeWidth={2.4} />
              </PrimaryCTA>
              <span style={{ color: INK_MUTED, fontSize: 12.5, lineHeight: 1.5 }}>
                {t("Free to apply · First valid partner wins · Self-referrals excluded")}
              </span>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              borderRadius: 26,
              border: `1px solid ${HAIR}`,
              background: "rgba(255,255,255,.84)",
              padding: "clamp(20px,3vw,30px)",
              boxShadow: "0 22px 60px -42px rgba(20,20,26,.6)",
              backdropFilter: "blur(16px)",
            }}
          >
            <CommissionTierLadder paidCustomers={demoPaid} />
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${HAIR}`, display: "grid", gap: 9 }}>
              <div className="font-mono-pro" style={{ color: BRAND_500, fontSize: 10, letterSpacing: ".14em", fontWeight: 800 }}>{t("HOW THE MILESTONE WORKS")}</div>
              <p style={{ margin: 0, color: INK_MUTED, fontSize: 13.5, lineHeight: 1.62 }}>
                {t("The 300th learner starts a three-payment window; the 600th starts a five-payment window. The upgrade applies prospectively, so earlier referrals keep the window recorded when they first paid.")}
              </p>
            </div>
          </div>
        </div>

      </motion.div>
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
        padding: "calc(var(--section-y) * 1.55) var(--page-gutter)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", position: "relative" }}>
        <HandWrittenTitle title={t("Then the next one.")} subtitle={t("Pass this paper.")} />
        <div style={{ marginTop: -32, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <PrimaryCTA large onClick={() => navigate(SIGN_UP_PATH)}>
            {t("Start prepping — free")} <ArrowRight size={20} strokeWidth={2.4} />
          </PrimaryCTA>
          <p style={{ color: INK_MUTED, fontSize: 14 }}>
            {t("Free diagnosis · 3 free days on Pro · Cancel anytime")}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── MOBILE APPS TEASER ─────────────────────── */

function MobileAppsTeaser() {
  const t = useT()
  const reduced = useCalmMotion()

  /*
   * The panel used to arrive as one 28px slab: everything in it appeared at the
   * same instant, so the eye had no order to follow. It now leads the copy in
   * one line at a time (kicker → headline → promise → stores), which is the
   * order the section is meant to be read in, and the whole thing is skipped
   * under prefers-reduced-motion rather than merely shortened.
   */
  const column: Variants = reduced
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.075, delayChildren: 0.08 } } }
  const line: Variants = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_DECISIVE } },
      }

  return (
    <section style={{ padding: "calc(var(--section-y) * 0.72) var(--page-gutter)" }}>
      <motion.div
        className="race-panel"
        style={{ maxWidth: "var(--page-max)", margin: "0 auto", borderRadius: 32, padding: "clamp(24px, 5.5vw, 72px)", background: "linear-gradient(135deg, rgba(255,255,255,.96), rgba(251,231,228,.72))" }}
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE_DECISIVE }}
      >
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(300px,.72fr)] lg:gap-20">
          <motion.div variants={column} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.div variants={line} className="race-kicker inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-[#6b6b76] shadow-sm backdrop-blur">
              <span className="race-live-dot size-2 shrink-0 rounded-full bg-[#c80000]" />
              {t("MOBILE — COMING SOON")}
            </motion.div>
            {/* Was clamped from 42px, which made this the largest heading on the
                page at 375px — bigger than the hero's own section headings. */}
            <motion.h2 variants={line} className="font-display text-pro-h mt-6 text-[clamp(34px,5.6vw,68px)] text-[#14141a]">
              {t("Your study plan.")} <em className="font-normal">{t("Now in your pocket.")}</em>
            </motion.h2>
            <motion.p variants={line} className="mt-5 max-w-xl text-base leading-7 text-[#6b6b76] sm:text-lg">
              {t("Practice, review and keep your exam-day momentum wherever the day takes you. Your progress stays in sync across web and mobile.")}
            </motion.p>
            <motion.div variants={line} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <StoreBadge type="app-store" comingSoonLabel={t("Coming soon")} note={t("iOS & Android")} />
              <StoreBadge type="google-play" comingSoonLabel={t("Coming soon")} note={t("iOS & Android")} />
            </motion.div>
            <motion.p variants={line} className="mt-5 text-sm leading-6 text-[#6b6b76]">
              {t("The Scholify mobile experience is coming to iOS and Android, with your progress in sync across web and mobile.")}
            </motion.p>
          </motion.div>
          <PhoneMockupBasic />
        </div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function Landing() {
  useEffect(() => {
    let firstFrame = 0
    let secondFrame = 0

    const scrollFromHash = () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
      let id = ""
      try {
        id = decodeURIComponent(window.location.hash.slice(1))
      } catch {
        return
      }
      if (!id) return

      // The second frame matters on a direct /#partners load: React must first
      // commit the target element before the browser can position it reliably.
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => scrollLandingSection(id, false))
      })
    }

    scrollFromHash()
    window.addEventListener("hashchange", scrollFromHash)
    window.addEventListener("popstate", scrollFromHash)
    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
      window.removeEventListener("hashchange", scrollFromHash)
      window.removeEventListener("popstate", scrollFromHash)
    }
  }, [])

  return (
    <div className="scholify-race-shell race-grid-surface" style={{ backgroundColor: BG_PRIMARY, color: INK, minHeight: "100dvh", overflowX: "clip" }}>
      <LiquidGlassFilterDefs />
      <Nav />
      <Hero />
      <PartnerLogos
        heading="Built for the ACCA world"
        caption="Scholify prepares you for the ACCA qualification — the pathway studied at the world's leading institutions."
      />
      <LazyOnView style={{ minHeight: "100svh" }}><CharlesCarousel /></LazyOnView>
      {/* The size of the world you're joining, then the problem inside it. */}
      <LazyOnView style={{ minHeight: 1120 }}><MarketAtGlance /></LazyOnView>
      <LazyOnView style={{ minHeight: 900 }}><Problem /></LazyOnView>
      {/* The receipts for the claim above: the official June 2026 pass-rate table. */}
      <LazyOnView style={{ minHeight: 1080 }}><PassRates /></LazyOnView>
      {/*
        THE SYSTEM, TAUGHT. The old three-column "how it works" described a product
        that predated chapter-level planning, the computed exam date, the five-block
        day and the strategic route — so a visitor read one product and signed up to
        another. SystemWalkthrough replaces it with the real sequence plus a diagram
        of an actual day. See components/landing-system.tsx.
      */}
      <LazyOnView id="how-it-works" style={{ minHeight: 1500 }}><SystemWalkthrough /></LazyOnView>
      <LazyOnView style={{ minHeight: 1000 }}><TheLoopSection /></LazyOnView>
      <LazyOnView style={{ minHeight: 1400 }}><ThreeReasons /></LazyOnView>
      <LazyOnView style={{ minHeight: 1500 }}><QualificationRoadmap /></LazyOnView>
      <LazyOnView id="features" style={{ minHeight: 1900 }}><Features /></LazyOnView>
      <LazyOnView style={{ minHeight: 1200 }}><CompareROI /></LazyOnView>
      <LazyOnView style={{ minHeight: 780 }}><AccaFactsCTA /></LazyOnView>
      <LazyOnView id="pricing" style={{ minHeight: 1300 }}><Pricing /></LazyOnView>
      <LazyOnView id="partners" style={{ minHeight: 1000 }}><PartnerProgramme /></LazyOnView>
      <LazyOnView style={{ minHeight: 900 }}><MobileAppsTeaser /></LazyOnView>
      <PaymentMethods style={{ padding: "calc(var(--section-y) * 0.62) var(--page-gutter) 8px", maxWidth: "var(--page-max)", margin: "0 auto" }} />
      {/* contain={false}: the footer is position:fixed, and paint containment
          would make this wrapper its containing block. */}
      <LazyOnView contain={false} style={{ minHeight: 500 }}>
        <Suspense fallback={null}>
          <CinematicFooter heading="Your next paper is waiting." />
        </Suspense>
      </LazyOnView>
    </div>
  )
}
