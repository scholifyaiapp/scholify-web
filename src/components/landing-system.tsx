import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react"
import {
  BookOpen,
  CalendarClock,
  Check,
  Coins,
  Compass,
  HandHeart,
  Layers,
  Package,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"
import { useT } from "@/i18n/LanguageProvider"
import CharlesMascot from "@/components/CharlesMascot"
import { useCalmMotion } from "@/hooks/use-calm-motion"
import { ContainerScroll, ContainerSticky, useContainerScroll } from "@/components/blocks/process-timeline"

/*
 * ── The landing page's SYSTEM sections ────────────────────────────
 *
 * ── What was wrong with the old page ──────────────────────────────
 * It described a product that no longer exists. "How it works" was three
 * columns — diagnostic, daily plan, adapt — written before the app had chapter-level
 * planning, before the exam date was computed from the content, before the day had
 * a fixed five-block shape, and before the strategic next-paper route existed. A
 * visitor read it, signed up, and met a different product. That is the most
 * expensive kind of stale copy: it converts, and then it disappoints.
 *
 * Everything here TEACHES THE REAL SYSTEM, in the order a learner meets it:
 *
 *   SystemWalkthrough  onboarding → plan generation → the daily five → measurement
 *                      → the next paper, drawn as the cycle it actually is: 01 runs
 *                      once, 02–05 repeat for every paper. The diagram carries the
 *                      structure and only the selected stage shows its detail, so
 *                      the page is a demo rather than five essays.
 *   ThreeReasons       the three reasons it was built: the all-in-one pain point,
 *                      the cost of qualifying, and earning while you study —
 *                      staged as alternating frames rather than stacked cards.
 *
 * ── On the animation ──────────────────────────────────────────────
 * Every visual animates on SCROLL-IN, once, and every one is disabled under
 * prefers-reduced-motion. Nothing loops: a landing page that never settles is a
 * landing page nobody reads. The motion exists to sequence attention through a
 * teaching order, which is the only thing it is good for here.
 *
 * Tokens mirror Landing.tsx's (they are the brand's, defined there privately);
 * layout uses the same global CSS variables (--section-y, --page-gutter,
 * --page-max) and utility classes (soft-card, font-display, grad-hero-text) as the
 * rest of the page, so these sections cannot drift from their neighbours.
 */

const BG_PRIMARY = "#FAFAF7"
const BG_SECONDARY = "#F1EFEA"
const INK = "#14141A"
const INK_MUTED = "#6B6B76"
const INK_INVERSE = "#FAFAF7"
const BRAND_500 = "#C80000"
const FIRE_500 = "#F4A405"
const PLUM_500 = "#E50068"
const GREEN_500 = "#0E9F6E"
const HAIR = "rgba(20,20,26,0.08)"
const EASE = [0.22, 1, 0.36, 1] as const

function SectionLabel({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "inverse" }) {
  return (
    <div
      className="font-mono-pro"
      style={{
        fontSize: 11,
        letterSpacing: "0.18em",
        fontWeight: 500,
        color: tone === "inverse" ? "rgba(250,250,247,0.55)" : INK_MUTED,
      }}
    >
      {children}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
 * 1 · THE SYSTEM WALKTHROUGH
 * ════════════════════════════════════════════════════════════════ */

interface Stage {
  num: string
  label: string
  title: string
  body: string
  accent: string
  Icon: typeof Target
  /** Concrete, checkable facts — not adjectives. */
  facts: string[]
}

const STAGES: Stage[] = [
  {
    num: "01",
    label: "ONBOARDING",
    title: "Seven questions. Ninety seconds.",
    body:
      "Which paper, where you're starting from, how many minutes you can genuinely protect, and the score you're aiming for. Every answer is read by the planner, and you can change any of them later without losing progress.",
    accent: BRAND_500,
    Icon: Compass,
    facts: [
      "Starting point decides whether you're measured first or taught first",
      "Your minutes and days become the real shape of every day",
      "Your target (65 / 75 / 85%) scales how much practice you get",
    ],
  },
  {
    num: "02",
    label: "PLAN GENERATION",
    title: "Charles builds the whole paper, not a to-do list.",
    body:
      "Every chapter is timed from its own content, then spread across the days you actually have. Your sitting date is calculated rather than guessed: total hours ÷ your weekly hours, mapped onto the next real ACCA session.",
    accent: PLUM_500,
    Icon: CalendarClock,
    facts: [
      "Exam date recommended from the paper's real size, with the arithmetic shown",
      "Hard chapters get more minutes; short ones get fewer",
      "Rest days are in the plan, because you said how many days you'd study",
    ],
  },
  {
    num: "03",
    label: "YOUR DAY",
    title: "One topic, five ways.",
    body:
      "Not \"practise 30 questions\". An exact chapter, then five quizzes on it, 10–15 exam-standard questions, 5–10 flashcards, and a technical article in the examiner's own language. Each step unlocks the next.",
    accent: FIRE_500,
    Icon: Layers,
    facts: [
      "Nothing repeats — every question is tracked until the bank is exhausted",
      "Quizzes and practice can never draw the same question on the same day",
      "Finish the day and it closes: tomorrow unlocks at the time you chose",
    ],
  },
  {
    num: "04",
    label: "MEASUREMENT",
    title: "A readiness score that earns its number.",
    body:
      "Built from coverage of the paper, accuracy on what you've covered, and the difficulty of what's left. It stays unquoted until there's enough evidence to mean something, so it measures you instead of guessing.",
    accent: GREEN_500,
    Icon: Target,
    facts: [
      "Seconds per mark by exam section, against ACCA's own 1.8 min/mark",
      "Accuracy by syllabus area, so the floor is always visible",
      "Projected score on exam day at your current pace, with the shortfall in minutes",
    ],
  },
  {
    num: "05",
    label: "THE NEXT PAPER",
    title: "It tells you what to sit next, and why.",
    body:
      "ACCA lets you take the Skills papers in any order, which is why students choose badly. Finish MA and Charles points at PM and FM while the costing is still warm — with the knowledge reason attached, so you can check it.",
    accent: BRAND_500,
    Icon: Sparkles,
    facts: [
      "Strategic route through all 13 exams, with prerequisites",
      "Tactical phases inside the paper: Learn → Strengthen → Revise → Rehearse",
      "Operational plan: the next 7 days, exact chapters, exact counts",
    ],
  },
]

/* ── The loop, actually drawn ─────────────────────────────────────
 *
 * The heading has always promised "one loop" and the page never showed one —
 * it showed five stacked accordions, which read as five separate things to
 * learn. The shape that makes the product click is: 01 happens once, then
 * 02→05 is a cycle you run again for every paper. Drawing that is worth more
 * than any of the paragraphs it replaces.
 */

/** Node centres sit at (i + 0.5)/n across the row. */
const nodeCentre = (i: number) => ((i + 0.5) / STAGES.length) * 100

function LoopGraph({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const t = useT()
  const reduced = useCalmMotion()
  const railStart = nodeCentre(0)
  const railEnd = nodeCentre(STAGES.length - 1)
  const progress = STAGES.length > 1 ? active / (STAGES.length - 1) : 0

  return (
    <div>
      {/* ── Desktop: the horizontal cycle ── */}
      <div className="hidden md:block" style={{ position: "relative", paddingBottom: 74 }}>
        {/* The rail the stages sit on, and the part of it you've reached. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 27,
            left: `${railStart}%`,
            width: `${railEnd - railStart}%`,
            height: 2,
            background: HAIR,
          }}
        />
        <motion.div
          aria-hidden
          initial={false}
          animate={{ transform: `scaleX(${progress})` }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
          style={{
            position: "absolute",
            top: 27,
            left: `${railStart}%`,
            width: `${railEnd - railStart}%`,
            height: 2,
            transformOrigin: "left center",
            background: `linear-gradient(90deg, ${BRAND_500}, ${PLUM_500}, ${FIRE_500}, ${GREEN_500})`,
          }}
        />

        <div style={{ display: "flex", position: "relative" }}>
          {STAGES.map((stage, i) => {
            const reached = i <= active
            const isActive = i === active
            return (
              <button
                key={stage.num}
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${stage.num} — ${t(stage.label)}`}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "none",
                  border: "none",
                  padding: "0 6px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <motion.span
                  initial={false}
                  animate={{ scale: isActive && !reduced ? 1.12 : 1 }}
                  transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 18,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    background: reached ? stage.accent : BG_PRIMARY,
                    border: `1px solid ${reached ? stage.accent : HAIR}`,
                    boxShadow: isActive ? `0 10px 26px -12px ${stage.accent}` : "none",
                    transition: "background .35s ease, border-color .35s ease, box-shadow .35s ease",
                  }}
                >
                  <stage.Icon size={22} color={reached ? "#fff" : INK_MUTED} strokeWidth={2.1} />
                </motion.span>
                <span style={{ textAlign: "center" }}>
                  <span
                    className="font-mono-pro tabular"
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      color: reached ? stage.accent : INK_MUTED,
                      transition: "color .35s ease",
                    }}
                  >
                    {stage.num}
                  </span>
                  <span
                    className="font-mono-pro"
                    style={{
                      display: "block",
                      marginTop: 4,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      fontWeight: 500,
                      color: isActive ? INK : INK_MUTED,
                      transition: "color .35s ease",
                    }}
                  >
                    {t(stage.label)}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* The return path: 05 feeds back into 02 for the next paper. This is
            the whole point of the diagram — 01 is not inside the cycle. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: `${nodeCentre(1)}%`,
            width: `${nodeCentre(STAGES.length - 1) - nodeCentre(1)}%`,
            top: 118,
            height: 34,
            borderLeft: `1.5px solid ${HAIR}`,
            borderRight: `1.5px solid ${HAIR}`,
            borderBottom: `1.5px solid ${HAIR}`,
            borderRadius: "0 0 16px 16px",
          }}
        />
        <div
          aria-hidden
          style={{ position: "absolute", left: `calc(${nodeCentre(1)}% - 5px)`, top: 114, color: INK_MUTED }}
        >
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M5.5 0L10.7 8.25H0.3L5.5 0Z" fill="currentColor" opacity="0.45" />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            top: 138,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            className="font-mono-pro"
            style={{
              background: BG_PRIMARY,
              padding: "5px 14px",
              borderRadius: 999,
              border: `1px solid ${HAIR}`,
              fontSize: 10,
              letterSpacing: "0.14em",
              color: INK_MUTED,
              fontWeight: 500,
            }}
          >
            {t("REPEATS FOR EVERY PAPER")}
          </span>
        </div>
      </div>

      {/* ── Mobile: the same cycle, stacked ── */}
      <div className="md:hidden" style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
        {STAGES.map((stage, i) => {
          const reached = i <= active
          const isActive = i === active
          return (
            <button
              key={stage.num}
              type="button"
              onClick={() => onSelect(i)}
              aria-current={isActive ? "step" : undefined}
              aria-label={`${stage.num} — ${t(stage.label)}`}
              style={{
                flex: 1,
                minWidth: 0,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  background: reached ? stage.accent : BG_PRIMARY,
                  border: `1px solid ${reached ? stage.accent : HAIR}`,
                  transition: "background .3s ease, border-color .3s ease",
                }}
              >
                <stage.Icon size={19} color={reached ? "#fff" : INK_MUTED} strokeWidth={2.1} />
              </span>
              <span
                className="font-mono-pro tabular"
                style={{ fontSize: 10, fontWeight: 600, color: isActive ? stage.accent : INK_MUTED }}
              >
                {stage.num}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** The one stage on show. Swapping this beats stacking five of them. */
function StagePanel({ index }: { index: number }) {
  const t = useT()
  const reduced = useCalmMotion()
  const stage = STAGES[index]

  return (
    <div style={{ marginTop: 30, minHeight: 300 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.num}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
          className="soft-card"
          style={{
            padding: "clamp(22px,3vw,34px)",
            borderRadius: 26,
            border: `1px solid ${stage.accent}33`,
            background: `linear-gradient(135deg, ${stage.accent}0d, ${BG_PRIMARY} 55%)`,
          }}
        >
          <div className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.16em", color: stage.accent, fontWeight: 600 }}>
            {stage.num} · {t(stage.label)}
          </div>
          <div
            className="font-display"
            style={{
              color: INK,
              fontSize: "clamp(23px,3vw,34px)",
              marginTop: 8,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {t(stage.title)}
          </div>
          <p style={{ color: INK_MUTED, fontSize: 15.5, lineHeight: 1.7, margin: "14px 0 0", maxWidth: 620 }}>
            {t(stage.body)}
          </p>
          <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
            {stage.facts.map((fact) => (
              <li key={fact} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: stage.accent,
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    marginTop: 2,
                  }}
                >
                  <Check size={11} strokeWidth={3} />
                </span>
                <span style={{ color: INK, fontSize: 14.5, lineHeight: 1.55, fontWeight: 450 }}>{t(fact)}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** Translates the container's scroll progress into the stage on show. */
function ScrollStageDriver({ count, onChange }: { count: number; onChange: (i: number) => void }) {
  const { scrollYProgress } = useContainerScroll()
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    onChange(Math.min(count - 1, Math.max(0, Math.floor(p * count))))
  })
  return null
}

/*
 * Pin the diagram only where it helps. The height bound is not decoration: the
 * pinned block is header + diagram + panel, and if that is taller than the
 * viewport the facts sit below the fold with no way to scroll to them, because
 * scrolling is what advances the stage. Short viewports get the inline version.
 * Phones and prefers-reduced-motion get it too — a pinned section is a trap there.
 */
const PIN_QUERY = "(min-width: 768px) and (min-height: 820px)"

function usePinnedLayout(): boolean {
  const reduced = useCalmMotion()
  const [fits, setFits] = useState(
    () => typeof window !== "undefined" && window.matchMedia(PIN_QUERY).matches,
  )
  useEffect(() => {
    const query = window.matchMedia(PIN_QUERY)
    const onChange = (e: MediaQueryListEvent) => setFits(e.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return fits && !reduced
}

export function SystemWalkthrough() {
  const t = useT()
  const [active, setActive] = useState(0)
  const pinned = usePinnedLayout()

  const header = (
    <div style={{ textAlign: "center" }}>
      <SectionLabel>{t("HOW SCHOLIFY WORKS")}</SectionLabel>
      <h2
        className="font-display text-pro-h"
        style={{ fontSize: "clamp(32px, 4.4vw, 60px)", color: INK, margin: "16px 0 0", lineHeight: 1.08 }}
      >
        {t("Five stages,")}{" "}
        <em className="grad-hero-text" style={{ fontStyle: "italic" }}>
          {t("one loop.")}
        </em>
      </h2>
      <p style={{ color: INK_MUTED, fontSize: 16.5, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.6 }}>
        {t("Onboarding happens once. The four stages after it run again for every paper you sit.")}
      </p>
    </div>
  )

  const diagram = (
    <>
      <div style={{ marginTop: 44 }}>
        <LoopGraph active={active} onSelect={setActive} />
      </div>
      <StagePanel index={active} />
    </>
  )

  // No id here: the #how-it-works anchor lives on the LazyOnView wrapper in
  // Landing.tsx, and repeating it made the id a duplicate.
  return (
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", position: "relative" }}>
        <div aria-hidden className="hidden lg:block" style={{ position: "absolute", right: -70, top: -30 }}>
          <CharlesMascot pose="plan" size={112} delay={0.1} />
        </div>

        {pinned ? (
          /* Scroll owns the sequence: the diagram stays put and walks itself
             through the five stages as the reader scrolls past it. */
          <ContainerScroll style={{ height: `${STAGES.length * 62}vh` }}>
            <ScrollStageDriver count={STAGES.length} onChange={setActive} />
            {/* Clears the page's fixed 60px header, which sticky top-0 would slide under. */}
            <ContainerSticky style={{ top: 76, paddingBottom: 24 }}>
              {header}
              {diagram}
            </ContainerSticky>
          </ContainerScroll>
        ) : (
          <>
            {header}
            {diagram}
            <div style={{ textAlign: "center", marginTop: 14, fontSize: 13.5, color: INK_MUTED }}>
              {t("Tap a stage to see what it does")}
            </div>
          </>
        )}

        {/* The day, drawn. The single most useful thing this page can show. */}
        <DayShapeVisual />
        {/* Then what a run of those days does. */}
        <CompoundingVisual />
      </div>
    </section>
  )
}

/* ── The five-block day, as a diagram ─────────────────────────────*/

const DAY_BLOCKS = [
  { label: "Study", detail: "1 exact chapter", Icon: BookOpen, accent: BRAND_500, minutes: 18 },
  { label: "Quiz", detail: "5 questions on it", Icon: Zap, accent: PLUM_500, minutes: 6 },
  { label: "Practice", detail: "10–15 exam-standard", Icon: Target, accent: FIRE_500, minutes: 14 },
  { label: "Flashcards", detail: "5–10 from the topic", Icon: Layers, accent: GREEN_500, minutes: 5 },
  { label: "Article", detail: "The examiner's view", Icon: Sparkles, accent: BRAND_500, minutes: 7 },
]

/** 18 + 6 + 14 + 5 + 7. The claim in the heading, computed rather than typed. */
const DAY_TOTAL = DAY_BLOCKS.reduce((sum, block) => sum + block.minutes, 0)

/** Minutes elapsed before a block starts — where its slice begins on the bar. */
const minutesBefore = (index: number) =>
  DAY_BLOCKS.slice(0, index).reduce((sum, block) => sum + block.minutes, 0)

const BAR_STAGGER = 0.16
const BAR_SEGMENT = 0.5

/* ── The compounding run ──────────────────────────────────────────
 *
 * Every number on this chart is arithmetic the visitor can redo, because a
 * landing-page graph that invents its own numbers is the stale-copy problem
 * in picture form. The sources:
 *
 *   BT_HOURS      PAPER_LOAD.BT in src/lib/acca-onboarding-guide.ts:3
 *   PASS_MARK     MOCK_PASS in src/lib/acca-loop.ts:39 — the ACCA pass line
 *   EVENING_*     the "Intensive" preset in src/pages/Welcome.tsx:124-129
 *   RUN_DAYS      75h ÷ 9h a week = 8.3 weeks — derived below, not typed
 *
 * The two curves are illustrative shapes, not measured cohorts, and the
 * caption says so. What is NOT illustrative is the day count and the pass
 * line, which is why those are the only two numbers printed.
 */
const BT_HOURS = 75
const PASS_MARK = 50
const EVENING_MINUTES = 90
const EVENING_DAYS_PER_WEEK = 6
const WEEKLY_HOURS = (EVENING_MINUTES * EVENING_DAYS_PER_WEEK) / 60
const RUN_DAYS = Math.ceil((BT_HOURS / WEEKLY_HOURS) * 7)

/** Chart colours: validated for CVD separation against the #F1EFEA card. */
const SERIES_STEADY = "#0B7F58"
const SERIES_ERRATIC = "#C80000"

const Y_MAX = 80

/*
 * Two geometries, not one scaled down. A 660-unit viewBox squeezed into a
 * phone's ~250px of content renders its 11px labels at about 4px — measured,
 * not guessed. So narrow screens get their own near-square chart with fewer
 * labels and type sized in ITS units, which lands around 10–13 CSS px.
 */
interface ChartConfig {
  w: number
  h: number
  left: number
  right: number
  top: number
  bottom: number
  font: number
  endFont: number
  /** Gridline values. Empty on compact: the pass line is the only one that argues. */
  ticks: number[]
}

const CHART_WIDE: ChartConfig = {
  w: 660,
  h: 268,
  left: 52,
  right: 636,
  top: 30,
  bottom: 224,
  font: 11,
  endFont: 13,
  ticks: [0, 20, 40, 60, 80],
}

const CHART_COMPACT: ChartConfig = {
  w: 330,
  h: 300,
  left: 14,
  right: 316,
  top: 40,
  bottom: 236,
  font: 14,
  endFont: 16,
  ticks: [],
}

const xOf = (c: ChartConfig, day: number) => c.left + (day / RUN_DAYS) * (c.right - c.left)
const yOf = (c: ChartConfig, pct: number) => c.bottom - (pct / Y_MAX) * (c.bottom - c.top)

/** Consistency compounds: slow, then it breaks out. Ends at 62%, past the pass line. */
const STEADY_END = 62
const steadyAt = (day: number) => STEADY_END * Math.pow(day / RUN_DAYS, 1.4)

/** The day the steady line clears the pass mark — solved, not eyeballed. */
const CROSSING_DAY = Math.round(RUN_DAYS * Math.pow(PASS_MARK / STEADY_END, 1 / 1.4))

/** Study in bursts and the forgetting curve takes it back between them. */
const ERRATIC_POINTS: Array<[number, number]> = [
  [0, 0], [4, 10], [8, 6], [13, 17], [18, 11], [24, 21],
  [29, 14], [35, 23], [40, 16], [46, 26], [51, 18], [55, 24], [RUN_DAYS, 20],
]

const steadyPathFor = (c: ChartConfig) =>
  Array.from({ length: RUN_DAYS + 1 }, (_, day) =>
    `${day === 0 ? "M" : "L"} ${xOf(c, day).toFixed(1)} ${yOf(c, steadyAt(day)).toFixed(1)}`,
  ).join(" ")

const erraticPathFor = (c: ChartConfig) =>
  ERRATIC_POINTS.map(
    ([day, pct], i) => `${i === 0 ? "M" : "L"} ${xOf(c, day).toFixed(1)} ${yOf(c, pct).toFixed(1)}`,
  ).join(" ")

const CHART_PATHS = {
  wide: { steady: steadyPathFor(CHART_WIDE), erratic: erraticPathFor(CHART_WIDE) },
  compact: { steady: steadyPathFor(CHART_COMPACT), erratic: erraticPathFor(CHART_COMPACT) },
}

/** Narrow-screen switch, shared by the chart and the alternating reason frames. */
function useCompactLayout(): boolean {
  const [compact, setCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  )
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const onChange = (e: MediaQueryListEvent) => setCompact(e.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return compact
}

/*
 * The day, drawn — and drawn ADDING UP, which is the whole claim. The five
 * blocks total exactly 50 minutes, so the animation spends them: each block
 * claims its slice of one 50-minute bar in turn while the counter runs to 50.
 * That is motion doing an argument's work rather than decorating it, which is
 * the only kind this page is allowed. Under reduced motion the bar and the
 * total render finished, because the claim must survive without the animation.
 */
function DayShapeVisual() {
  const t = useT()
  const reduced = useCalmMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-90px" })

  const runFor = BAR_STAGGER * (DAY_BLOCKS.length - 1) + BAR_SEGMENT
  const count = useMotionValue(reduced ? DAY_TOTAL : 0)
  const shownMinutes = useTransform(count, (value) => Math.round(value))

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      count.set(DAY_TOTAL)
      return
    }
    const controls = animate(count, DAY_TOTAL, { duration: runFor, ease: EASE })
    return () => controls.stop()
  }, [inView, reduced, count, runFor])

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="soft-card"
      style={{ marginTop: 44, padding: "clamp(22px,3.4vw,38px)", borderRadius: 28, background: BG_SECONDARY }}
    >
      <div style={{ textAlign: "center" }}>
        <SectionLabel>{t("ONE DAY, ACTUAL SIZE")}</SectionLabel>
        <div
          className="font-display"
          style={{ fontSize: "clamp(24px,3vw,36px)", color: INK, marginTop: 12, letterSpacing: "-0.02em", lineHeight: 1.15 }}
        >
          {t("A 50-minute day looks like this")}
        </div>
        <p style={{ color: INK_MUTED, fontSize: 14.5, maxWidth: 560, margin: "12px auto 0", lineHeight: 1.65 }}>
          {t(
            "Say 50 minutes and you get five blocks that add up to 50 — not a 7-minute read and an open-ended question grind. Say 120 and you get a second topic, not a longer drill.",
          )}
        </p>
      </div>

      {/* The counter and the bar it belongs to. */}
      <div style={{ maxWidth: 560, margin: "30px auto 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 7 }}>
          <motion.span
            className="font-display tabular"
            style={{ fontSize: "clamp(40px,6vw,60px)", color: INK, letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            {shownMinutes}
          </motion.span>
          <span className="font-mono-pro" style={{ fontSize: 13, color: INK_MUTED, letterSpacing: "0.1em" }}>
            {t("MIN")}
          </span>
        </div>

        <div
          role="img"
          aria-label={t("A 50-minute day, split into five blocks")}
          style={{ display: "flex", gap: 3, height: 46, marginTop: 18 }}
        >
          {DAY_BLOCKS.map((block, i) => (
            <div
              key={block.label}
              style={{
                flex: block.minutes,
                position: "relative",
                overflow: "hidden",
                background: `${block.accent}1f`,
                borderRadius: i === 0 ? "14px 5px 5px 14px" : i === DAY_BLOCKS.length - 1 ? "5px 14px 14px 5px" : 5,
              }}
            >
              <motion.div
                initial={reduced ? false : { scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : undefined}
                transition={{ duration: BAR_SEGMENT, delay: i * BAR_STAGGER, ease: EASE }}
                style={{ position: "absolute", inset: 0, background: block.accent, transformOrigin: "left center" }}
              />
              <motion.span
                className="font-mono-pro tabular"
                initial={reduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.3, delay: i * BAR_STAGGER + BAR_SEGMENT * 0.55, ease: EASE }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {block.minutes}
              </motion.span>
            </div>
          ))}
        </div>

        <div
          className="font-mono-pro"
          style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: INK_MUTED, letterSpacing: "0.1em" }}
        >
          <span>{t("START")}</span>
          <span>{t("DONE FOR THE DAY")}</span>
        </div>
      </div>

      {/* The rows land in step with their own slice of the bar. */}
      <div style={{ display: "grid", gap: 10, marginTop: 26, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
        {DAY_BLOCKS.map((block, i) => (
          <motion.div
            key={block.label}
            initial={reduced ? false : { opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.45, delay: i * BAR_STAGGER, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              borderRadius: 16,
              background: BG_PRIMARY,
              border: `1px solid ${HAIR}`,
              borderLeft: `3px solid ${block.accent}`,
            }}
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                background: `${block.accent}14`,
              }}
            >
              <block.Icon size={18} color={block.accent} strokeWidth={2.1} />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="font-mono-pro" style={{ display: "block", fontSize: 9.5, letterSpacing: "0.14em", color: INK_MUTED, fontWeight: 500 }}>
                {t(`STEP ${i + 1}`)}
              </span>
              <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: INK, marginTop: 2 }}>
                {t(block.label)} <span style={{ color: INK_MUTED, fontWeight: 450 }}>· {t(block.detail)}</span>
              </span>
            </span>
            <span className="font-mono-pro tabular" style={{ fontSize: 12, color: INK_MUTED, flexShrink: 0 }}>
              {block.minutes} {t("min")}
            </span>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 24, fontSize: 13.5, color: INK_MUTED, lineHeight: 1.6 }}>
        {t("Then it closes. Tomorrow's plan is visible but locked until your study time — because rest is part of the plan.")}
      </div>
    </motion.div>
  )
}

/* ── Fifty-nine evenings ──────────────────────────────────────────
 *
 * The block above shows one day. This one shows what a run of them does,
 * for the reader who has already decided they have no time — the 9-to-6, the
 * second degree, the shift pattern. The argument is not "study more". It is
 * that an evening you can actually protect, repeated, beats the weekend
 * binge that the forgetting curve unwinds before the next one.
 *
 * The Clear line is quoted and attributed rather than adopted as a slogan:
 * it is the subtitle of someone else's book, and passing it off as Scholify's
 * own motto would be both a legal risk and a worse sentence than crediting it.
 */
function CompoundingVisual() {
  const t = useT()
  const reduced = useCalmMotion()
  const compact = useCompactLayout()
  const chart = compact ? CHART_COMPACT : CHART_WIDE
  const paths = compact ? CHART_PATHS.compact : CHART_PATHS.wide
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-90px" })

  const draw = 2.1
  const day = useMotionValue(reduced ? RUN_DAYS : 0)
  const shownDay = useTransform(day, (value) => Math.round(value))

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      day.set(RUN_DAYS)
      return
    }
    const controls = animate(day, RUN_DAYS, { duration: draw, ease: EASE })
    return () => controls.stop()
  }, [inView, reduced, day])

  const appear = (delay: number) => ({
    initial: reduced ? false : { opacity: 0 },
    animate: inView ? { opacity: 1 } : undefined,
    transition: { duration: 0.45, delay, ease: EASE },
  })

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="soft-card"
      style={{ marginTop: 18, padding: "clamp(22px,3.4vw,38px)", borderRadius: 28, background: BG_SECONDARY }}
    >
      <div style={{ textAlign: "center" }}>
        <SectionLabel>{t("THE COMPOUNDING RUN")}</SectionLabel>

        <blockquote
          className="font-display"
          style={{
            margin: "16px auto 0",
            maxWidth: 560,
            fontSize: "clamp(22px,2.9vw,34px)",
            color: INK,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            fontStyle: "italic",
          }}
        >
          {t("“Tiny changes, remarkable results.”")}
        </blockquote>
        <div className="font-mono-pro" style={{ marginTop: 10, fontSize: 11, letterSpacing: "0.14em", color: INK_MUTED }}>
          {t("JAMES CLEAR · ATOMIC HABITS")}
        </div>

        <p style={{ color: INK_MUTED, fontSize: 15, maxWidth: 600, margin: "22px auto 0", lineHeight: 1.7 }}>
          {t(
            "Most people who fail a paper were never short of ability — they were short of an evening that survived a nine-to-six, a second degree, or a shift pattern. So Scholify doesn't ask for your weekends. It asks for one evening you can actually keep, and then it makes that evening count.",
          )}
        </p>
      </div>

      {/* Legend first: with two series, identity is never colour alone. */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 18,
          marginTop: 28,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: INK }}>
          <svg width="22" height="8" aria-hidden>
            <line x1="0" y1="4" x2="22" y2="4" stroke={SERIES_STEADY} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {t("90 minutes, six evenings a week")}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: INK }}>
          <svg width="22" height="8" aria-hidden>
            <line
              x1="0"
              y1="4"
              x2="22"
              y2="4"
              stroke={SERIES_ERRATIC}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="5 4"
            />
          </svg>
          {t("Whenever there's time")}
        </span>
      </div>

      <div style={{ marginTop: 16 }}>
        <svg
          viewBox={`0 0 ${chart.w} ${chart.h}`}
          width="100%"
          role="img"
          aria-label={t(
            "Exam readiness over 59 days. Consistent daily study compounds past the 50% ACCA pass line; studying whenever there is time stays flat below it.",
          )}
          style={{ display: "block", overflow: "visible" }}
        >
          {/* Recessive grid. Compact drops it entirely — at phone width the
              gridlines cost more legibility than they buy. */}
          {chart.ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={chart.left}
                y1={yOf(chart, tick)}
                x2={chart.right}
                y2={yOf(chart, tick)}
                stroke={INK}
                strokeOpacity="0.07"
                strokeWidth="1"
              />
              <text
                x={chart.left - 12}
                y={yOf(chart, tick) + 4}
                textAnchor="end"
                fontSize={chart.font}
                fill={INK_MUTED}
                className="font-mono-pro tabular"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* The pass line is a threshold, so it is neutral and dashed — not a series. */}
          <line
            x1={chart.left}
            y1={yOf(chart, PASS_MARK)}
            x2={chart.right}
            y2={yOf(chart, PASS_MARK)}
            stroke={INK}
            strokeOpacity="0.38"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />
          <text
            x={chart.left + 4}
            y={yOf(chart, PASS_MARK) - 9}
            fontSize={chart.font}
            fill={INK_MUTED}
            className="font-mono-pro"
            letterSpacing="0.08em"
          >
            {t("ACCA PASS · 50%")}
          </text>

          {/* Series. Dashed vs solid carries identity beyond colour. */}
          <motion.path
            d={paths.erratic}
            fill="none"
            stroke={SERIES_ERRATIC}
            strokeWidth={compact ? 2.6 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 5"
            initial={reduced ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: draw, ease: EASE }}
          />
          <motion.path
            d={paths.steady}
            fill="none"
            stroke={SERIES_STEADY}
            strokeWidth={compact ? 3.2 : 2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: draw, ease: EASE }}
          />

          {/* Where consistency clears the pass line. */}
          <motion.g {...appear(draw * (CROSSING_DAY / RUN_DAYS))}>
            <circle
              cx={xOf(chart, CROSSING_DAY)}
              cy={yOf(chart, PASS_MARK)}
              r={compact ? 7 : 6}
              fill={BG_SECONDARY}
              stroke={SERIES_STEADY}
              strokeWidth="2.5"
            />
            <text
              x={xOf(chart, CROSSING_DAY)}
              y={yOf(chart, PASS_MARK) + (compact ? 28 : 24)}
              textAnchor="middle"
              fontSize={chart.font}
              fill={INK_MUTED}
              className="font-mono-pro"
            >
              {t("DAY")} {CROSSING_DAY}
            </text>
          </motion.g>

          {/* Direct labels — the contrast check obliges visible labels. */}
          <motion.g {...appear(draw)}>
            <circle cx={xOf(chart, RUN_DAYS)} cy={yOf(chart, STEADY_END)} r={compact ? 6 : 5} fill={SERIES_STEADY} />
            <text
              x={xOf(chart, RUN_DAYS)}
              y={yOf(chart, STEADY_END) - 14}
              textAnchor="end"
              fontSize={chart.endFont}
              fontWeight="600"
              fill={INK}
            >
              {STEADY_END}%
            </text>
            <circle cx={xOf(chart, RUN_DAYS)} cy={yOf(chart, 20)} r={compact ? 6 : 5} fill={SERIES_ERRATIC} />
            <text
              x={xOf(chart, RUN_DAYS)}
              y={yOf(chart, 20) + 24}
              textAnchor="end"
              fontSize={chart.endFont}
              fontWeight="600"
              fill={INK}
            >
              20%
            </text>
          </motion.g>

          {/* X axis */}
          <line
            x1={chart.left}
            y1={chart.bottom}
            x2={chart.right}
            y2={chart.bottom}
            stroke={INK}
            strokeOpacity="0.16"
            strokeWidth="1"
          />
          <text x={chart.left} y={chart.bottom + 24} fontSize={chart.font} fill={INK_MUTED} className="font-mono-pro">
            {t("DAY 1")}
          </text>
          <text
            x={chart.right}
            y={chart.bottom + 24}
            textAnchor="end"
            fontSize={chart.font}
            fill={INK_MUTED}
            className="font-mono-pro"
          >
            {t("DAY")} {RUN_DAYS}
          </text>
        </svg>
      </div>

      {/* The arithmetic, so the 59 is checkable rather than claimed. */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 14px",
          marginTop: 26,
        }}
      >
        {[
          `${EVENING_MINUTES} ${t("min")} × ${EVENING_DAYS_PER_WEEK} ${t("evenings")} = ${WEEKLY_HOURS} ${t("h a week")}`,
          `${t("BT is about")} ${BT_HOURS} ${t("hours")}`,
        ].map((line) => (
          <span
            key={line}
            className="font-mono-pro"
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              background: BG_PRIMARY,
              border: `1px solid ${HAIR}`,
              fontSize: 12,
              color: INK_MUTED,
            }}
          >
            {line}
          </span>
        ))}
        <span
          className="font-mono-pro"
          style={{
            padding: "7px 14px",
            borderRadius: 999,
            background: INK,
            fontSize: 12,
            color: INK_INVERSE,
            fontWeight: 600,
          }}
        >
          <motion.span className="tabular">{shownDay}</motion.span> {t("DAYS")}
        </span>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 12.5,
          color: INK_MUTED,
          lineHeight: 1.6,
          maxWidth: 620,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {t(
          "The day count is arithmetic: BT's workload divided by the hours you commit. The two curves are illustrative shapes, not measured cohorts — your own date comes from your paper, your minutes and your days, and Charles shows you that sum before you start.",
        )}
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
 * 2 · THE THREE REASONS
 * ════════════════════════════════════════════════════════════════ */

interface Reason {
  num: string
  label: string
  title: string
  body: string
  accent: string
  Icon: typeof Package
  proof: string[]
}

const REASONS: Reason[] = [
  {
    num: "01",
    label: "THE REAL PAIN POINT",
    title: "Everything you need to pass, in one place.",
    body:
      "A study text from one publisher, an exam kit from another, a flashcard app, a spreadsheet of mock scores — and still, every evening, the decision of what to actually do. The deciding is the part that breaks people.",
    accent: BRAND_500,
    Icon: Package,
    proof: [
      "Chapters, question bank, flashcards, mocks and written-answer marking under one roof",
      "One daily plan that decides for you, and re-spreads itself when you miss a day",
    ],
  },
  {
    num: "02",
    label: "THE COST OF QUALIFYING",
    title: "Cut the tuition bill, keep the toolkit.",
    body:
      "Tuition centres charge €390–730 per paper, and there are thirteen of them. Scholify costs less per month than a single hour with a tutor, and covers every paper.",
    accent: PLUM_500,
    Icon: Coins,
    proof: [
      "One subscription instead of a per-paper tuition fee",
      "Every paper, every mode — no per-paper unlocks",
    ],
  },
  {
    num: "03",
    label: "EARN WHILE YOU STUDY",
    title: "Fund your own fees — and help someone else pass.",
    body:
      "Registration, subscription and exam entry are real money. Scholify pays students to bring students: 27% of verified payments, with longer earning windows unlocked by performance.",
    accent: FIRE_500,
    Icon: HandHeart,
    proof: [
      "27% commission across 1, 3 or 5 monthly payments",
      "90-day attribution and a live partner dashboard",
    ],
  },
]

/*
 * Three reasons, staged rather than stacked. Each panel is a frame: a huge
 * ghosted numeral, a rule that draws itself across in the reason's accent, and
 * copy cut to a single short paragraph plus two proof lines — down from a
 * ~470-character body and four bullets apiece. The panels alternate side so
 * the eye travels instead of scanning the same column three times.
 */
export function ThreeReasons() {
  const t = useT()
  const reduced = useCalmMotion()
  // The alternating sides are a desktop rhythm. On a phone every frame is a
  // full-width column, so flipping only produces right-aligned body copy —
  // harder to read at a narrow measure, and it buys nothing.
  const compact = useCompactLayout()

  return (
    <section style={{ padding: "calc(var(--section-y) * 1.1) var(--page-gutter)", overflow: "hidden" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>{t("WHY WE BUILT IT")}</SectionLabel>
          <motion.h2
            className="font-display text-pro-h"
            initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{
              fontSize: "clamp(34px, 5vw, 64px)",
              color: INK,
              margin: "18px 0 0",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            {t("Three reasons")}{" "}
            <em className="grad-hero-text" style={{ fontStyle: "italic" }}>
              {t("Scholify exists")}
            </em>
          </motion.h2>
          <p style={{ color: INK_MUTED, fontSize: 16.5, maxWidth: 540, margin: "18px auto 0", lineHeight: 1.6 }}>
            {t("Not features. The three problems it was built to solve.")}
          </p>
        </div>

        <div style={{ marginTop: 64, display: "grid", gap: "clamp(28px,5vw,64px)" }}>
          {REASONS.map((reason, i) => {
            const flip = !compact && i % 2 === 1
            return (
              <motion.div
                key={reason.num}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ position: "relative" }}
              >
                {/* The rule draws across before the copy lands. */}
                <motion.div
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ duration: 0.9, ease: EASE }}
                  style={{
                    height: 2,
                    transformOrigin: flip ? "right center" : "left center",
                    background: `linear-gradient(${flip ? "270deg" : "90deg"}, ${reason.accent}, transparent)`,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: flip ? "row-reverse" : "row",
                    alignItems: "flex-start",
                    gap: "clamp(18px,4vw,52px)",
                    flexWrap: "wrap",
                    paddingTop: "clamp(20px,3vw,34px)",
                  }}
                >
                  {/* The numeral is scenery: enormous, quiet, and hidden from
                      assistive tech because the label already carries it. */}
                  <motion.div
                    aria-hidden
                    initial={reduced ? false : { opacity: 0, x: flip ? 34 : -34 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={{ duration: 1, delay: 0.1, ease: EASE }}
                    className="font-display tabular"
                    style={{
                      fontSize: "clamp(72px,11vw,152px)",
                      lineHeight: 0.8,
                      letterSpacing: "-0.05em",
                      color: reason.accent,
                      opacity: 0.14,
                      flexShrink: 0,
                    }}
                  >
                    {reason.num}
                  </motion.div>

                  <div style={{ flex: "1 1 340px", minWidth: 0, textAlign: flip ? "right" : "left" }}>
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-90px" }}
                      transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 9,
                          padding: "7px 14px",
                          borderRadius: 999,
                          background: `${reason.accent}14`,
                          color: reason.accent,
                        }}
                      >
                        <reason.Icon size={15} strokeWidth={2.3} />
                        <span className="font-mono-pro" style={{ fontSize: 10.5, letterSpacing: "0.16em", fontWeight: 600 }}>
                          {t(reason.label)}
                        </span>
                      </span>

                      <div
                        className="font-display"
                        style={{
                          fontSize: "clamp(25px,3.4vw,42px)",
                          color: INK,
                          marginTop: 18,
                          letterSpacing: "-0.025em",
                          lineHeight: 1.1,
                          maxWidth: 620,
                          marginLeft: flip ? "auto" : undefined,
                        }}
                      >
                        {t(reason.title)}
                      </div>

                      <p
                        style={{
                          color: INK_MUTED,
                          fontSize: "clamp(15px,1.6vw,17px)",
                          lineHeight: 1.72,
                          margin: "16px 0 0",
                          maxWidth: 580,
                          marginLeft: flip ? "auto" : undefined,
                        }}
                      >
                        {t(reason.body)}
                      </p>

                      <ul
                        style={{
                          margin: "22px 0 0",
                          padding: 0,
                          listStyle: "none",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 10,
                          justifyContent: flip ? "flex-end" : "flex-start",
                        }}
                      >
                        {reason.proof.map((line, j) => (
                          <motion.li
                            key={line}
                            initial={reduced ? false : { opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-90px" }}
                            transition={{ duration: 0.5, delay: 0.3 + j * 0.09, ease: EASE }}
                            style={{
                              display: "flex",
                              gap: 9,
                              alignItems: "center",
                              padding: "9px 15px 9px 11px",
                              borderRadius: 999,
                              background: BG_PRIMARY,
                              border: `1px solid ${HAIR}`,
                            }}
                          >
                            <span
                              style={{
                                width: 18,
                                height: 18,
                                flexShrink: 0,
                                borderRadius: "50%",
                                background: reason.accent,
                                display: "grid",
                                placeItems: "center",
                                color: "#fff",
                              }}
                            >
                              <Check size={10} strokeWidth={3.2} />
                            </span>
                            <span style={{ color: INK, fontSize: 13.5, lineHeight: 1.45, fontWeight: 450, textAlign: "left" }}>
                              {t(line)}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
