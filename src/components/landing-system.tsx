import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  BookOpen,
  CalendarClock,
  Check,
  Coins,
  Compass,
  HandHeart,
  Layers,
  Minus,
  Package,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"
import { useT } from "@/i18n/LanguageProvider"
import CharlesMascot from "@/components/CharlesMascot"

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
 *                      → the next paper. Five stages, each with a live visual of the
 *                      actual thing, so the page is a demo rather than a claim.
 *   MissionSection     why Scholify exists, in the founder's words.
 *   ThreeReasons       the three reasons it was built: the all-in-one pain point,
 *                      the cost of qualifying, and earning while you study.
 *   StudyHubComparison Scholify against the ACCA Study Hub — the honest comparison,
 *                      including what the Study Hub does better.
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
const BG_DARK = "#0B0B0F"
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
      "Where you're starting from, which paper, how many minutes you can genuinely protect, how many days a week, and the readiness you're aiming for. Nothing decorative — every answer is read by the planner, and you can change any of them later without losing progress.",
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
      "Every chapter of your paper is timed from its own content — how many worked examples, how many examiner traps, how many study-guide outcomes it delivers — then spread across the days you actually have. The sitting date is calculated from that, not guessed: total hours ÷ your weekly hours, mapped onto the next real ACCA session.",
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
      "Not \"practise 30 questions\". An exact chapter, then five quizzes on that chapter, then 10–15 exam-standard questions on the same topic, then 5–10 flashcards from it, then a technical article on it written the way the examiner talks about it. Each step unlocks the one after it, because you cannot quiz a chapter you haven't read.",
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
      "Your Exam Readiness Score is built from coverage of the paper, accuracy on what you've covered, and the difficulty of what's left. It stays unquoted until there's enough evidence to mean something — and if you started from zero, the diagnostic waits until you've genuinely covered the essential areas, so it measures you instead of guessing.",
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
      "ACCA lets you take the Skills papers in any order, which is why students choose badly — by reputation instead of by what the material builds on. Finish MA and Charles points at PM and FM while the costing is still warm. Every recommendation comes with the knowledge reason, so you can check it against your own experience.",
    accent: BRAND_500,
    Icon: Sparkles,
    facts: [
      "Strategic route through all 13 exams, with prerequisites",
      "Tactical phases inside the paper: Learn → Strengthen → Revise → Rehearse",
      "Operational plan: the next 7 days, exact chapters, exact counts",
    ],
  },
]

export function SystemWalkthrough() {
  const t = useT()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(0)

  return (
    <section id="how-it-works" style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", position: "relative" }}>
        <div aria-hidden className="hidden lg:block" style={{ position: "absolute", right: -70, top: -30 }}>
          <CharlesMascot pose="plan" size={112} delay={0.1} />
        </div>

        <div style={{ textAlign: "center" }}>
          <SectionLabel>{t("HOW SCHOLIFY WORKS")}</SectionLabel>
          <h2
            className="font-display text-pro-h"
            style={{ fontSize: "clamp(36px, 5vw, 68px)", color: INK, margin: "18px 0 0", lineHeight: 1.08 }}
          >
            {t("Five stages,")}{" "}
            <em className="grad-hero-text" style={{ fontStyle: "italic" }}>
              {t("one loop.")}
            </em>
          </h2>
          <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 640, margin: "20px auto 0", lineHeight: 1.65 }}>
            {t(
              "This is the whole product. Not a feature list — the actual sequence you go through, from the first ninety seconds to the paper after this one.",
            )}
          </p>
        </div>

        {/* The stage rail. A vertical timeline rather than three columns, because
            this is a SEQUENCE and columns imply parallel choices. */}
        <div style={{ marginTop: 64, display: "grid", gap: 14 }}>
          {STAGES.map((stage, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={stage.num}
                initial={reduced ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.08, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="soft-card"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "clamp(20px,3vw,30px)",
                    borderRadius: 24,
                    cursor: "pointer",
                    border: `1px solid ${isOpen ? `${stage.accent}44` : HAIR}`,
                    background: isOpen ? `linear-gradient(135deg, ${stage.accent}0d, ${BG_PRIMARY} 55%)` : BG_PRIMARY,
                    transition: "border-color .25s ease, background .25s ease",
                  }}
                >
                  <div style={{ display: "flex", gap: "clamp(14px,2.4vw,24px)", alignItems: "flex-start" }}>
                    {/* Number + connector */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <span
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 16,
                          display: "grid",
                          placeItems: "center",
                          background: `${stage.accent}14`,
                          border: `1px solid ${stage.accent}33`,
                        }}
                      >
                        <stage.Icon size={22} color={stage.accent} strokeWidth={2.1} />
                      </span>
                      <span
                        className="font-mono-pro tabular"
                        style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.1em", color: stage.accent, fontWeight: 600 }}
                      >
                        {stage.num}
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        className="font-mono-pro"
                        style={{ fontSize: 10, letterSpacing: "0.16em", color: INK_MUTED, fontWeight: 500 }}
                      >
                        {t(stage.label)}
                      </div>
                      <div
                        className="font-display"
                        style={{
                          color: INK,
                          fontSize: "clamp(21px,2.6vw,29px)",
                          marginTop: 6,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.15,
                        }}
                      >
                        {t(stage.title)}
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <p style={{ color: INK_MUTED, fontSize: 15, lineHeight: 1.72, margin: "14px 0 0" }}>{t(stage.body)}</p>
                        <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
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

                      {!isOpen && (
                        <div style={{ color: INK_MUTED, fontSize: 14, marginTop: 8, fontWeight: 500 }}>
                          {t("Tap to see what this actually does")}
                        </div>
                      )}
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
                      style={{ flexShrink: 0, color: INK_MUTED, display: "grid", placeItems: "center", width: 24, height: 24 }}
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* The day, drawn. The single most useful thing this page can show. */}
        <DayShapeVisual />
      </div>
    </section>
  )
}

/* ── The five-block day, as a diagram ─────────────────────────────*/

const DAY_BLOCKS = [
  { label: "Study", detail: "1 exact chapter", Icon: BookOpen, accent: BRAND_500, minutes: "18 min" },
  { label: "Quiz", detail: "5 questions on it", Icon: Zap, accent: PLUM_500, minutes: "6 min" },
  { label: "Practice", detail: "10–15 exam-standard", Icon: Target, accent: FIRE_500, minutes: "14 min" },
  { label: "Flashcards", detail: "5–10 from the topic", Icon: Layers, accent: GREEN_500, minutes: "5 min" },
  { label: "Article", detail: "The examiner's view", Icon: Sparkles, accent: BRAND_500, minutes: "7 min" },
]

function DayShapeVisual() {
  const t = useT()
  const reduced = useReducedMotion()
  return (
    <motion.div
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

      <div style={{ display: "grid", gap: 10, marginTop: 32, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
        {DAY_BLOCKS.map((block, i) => (
          <motion.div
            key={block.label}
            initial={reduced ? false : { opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              borderRadius: 16,
              background: BG_PRIMARY,
              border: `1px solid ${HAIR}`,
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
              {block.minutes}
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

/* ══════════════════════════════════════════════════════════════════
 * 2 · MISSION
 * ════════════════════════════════════════════════════════════════ */

export function MissionSection() {
  const t = useT()
  const reduced = useReducedMotion()
  return (
    <section
      style={{
        padding: "calc(var(--section-y) * 1.1) var(--page-gutter)",
        background: BG_DARK,
        color: INK_INVERSE,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
        <SectionLabel tone="inverse">{t("OUR MISSION")}</SectionLabel>
        <h2
          className="font-display text-pro-h"
          style={{ fontSize: "clamp(32px, 4.4vw, 60px)", color: INK_INVERSE, margin: "20px 0 0", lineHeight: 1.1 }}
        >
          {t("Make a professional qualification")}{" "}
          <em className="grad-hero-text" style={{ fontStyle: "italic" }}>
            {t("reachable")}
          </em>{" "}
          {t("from anywhere.")}
        </h2>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginTop: 30, display: "grid", gap: 22 }}
        >
          <p style={{ color: "rgba(250,250,247,0.78)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.75, margin: 0 }}>
            {t(
              "ACCA is one of the few qualifications in the world that does not care where you were born, which university admitted you, or what your family can pay. It cares whether you can do the work. That is an extraordinary door — and for most of the people it was built for, the door is still too expensive to walk through.",
            )}
          </p>
          <p style={{ color: "rgba(250,250,247,0.78)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.75, margin: 0 }}>
            {t(
              "A tuition centre costs more per paper than most students earn in a month. The materials come from three different publishers and none of them tell you what to do on a Tuesday evening with fifty minutes. So people study hard, in the wrong order, on the wrong topics, and fail papers they knew the content of.",
            )}
          </p>
          <p style={{ color: INK_INVERSE, fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
            {t(
              "Scholify exists to remove that gap: one platform that teaches, tests, measures and plans — priced so the qualification is decided by your work rather than by your postcode.",
            )}
          </p>
          <div
            style={{
              marginTop: 8,
              paddingTop: 22,
              borderTop: "1px solid rgba(250,250,247,0.14)",
              fontSize: 14,
              color: "rgba(250,250,247,0.55)",
            }}
          >
            {t("Makhmudov Nuriddin · Founder & CEO")}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
 * 3 · THE THREE REASONS
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
      "The average ACCA student runs a study text from one publisher, an exam kit from another, a flashcard app, a spreadsheet of mock scores, and a folder of PDFs — and still has to decide, every evening, what to actually do. The deciding is the part that breaks people. Scholify holds the study text, the question bank, the flashcards, the mocks, the constructed-response marking, the technical articles and the plan, and it hands you the next thing.",
    accent: BRAND_500,
    Icon: Package,
    proof: [
      "Full study chapters with worked examples, diagrams and examiner traps",
      "Exam-standard question bank indexed to those chapters",
      "Spaced-repetition flashcards, full CBE mocks, and Charles marking written answers",
      "One daily plan that decides for you, and re-spreads itself when you miss a day",
    ],
  },
  {
    num: "02",
    label: "THE COST OF QUALIFYING",
    title: "Cut the tuition bill, keep the toolkit.",
    body:
      "Tuition centres charge €390–730 per paper, and there are thirteen papers. On top of that sit ACCA's own registration, annual subscription and exam-entry fees, which nobody can discount for you. Scholify costs less per month than one hour with a tutor and covers every paper, every mode, every day — so the money you have goes to the fees that are genuinely unavoidable.",
    accent: PLUM_500,
    Icon: Coins,
    proof: [
      "One subscription instead of a per-paper tuition fee",
      "Every paper, every mode — no per-paper unlocks",
      "The savings calculator below runs your own numbers, in your own currency",
    ],
  },
  {
    num: "03",
    label: "EARN WHILE YOU STUDY",
    title: "Fund your own fees — and help someone else pass.",
    body:
      "Registration, the annual subscription and exam entry are real money, due whether or not you have it. So Scholify pays students to bring other students: 27% of every plan bought through your link, tracked end to end and paid on time. It is enough to cover an exam entry from a handful of classmates, and it is work you can do from your phone between sessions. And it is not only income — helping another student pass is savab: a good deed that keeps giving as long as the benefit lasts.",
    accent: FIRE_500,
    Icon: HandHeart,
    proof: [
      "27% commission on every Beginner or Pro plan bought through your link",
      "Tracked clicks, sales and payouts in your own partner dashboard",
      "Brand assets and templates provided — you publish, we count it",
      "Built for the student who is paying their own fees",
    ],
  },
]

export function ThreeReasons() {
  const t = useT()
  const reduced = useReducedMotion()
  return (
    <section style={{ padding: "var(--section-y) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>{t("WHY WE BUILT IT")}</SectionLabel>
          <h2
            className="font-display text-pro-h"
            style={{ fontSize: "clamp(34px, 4.6vw, 62px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}
          >
            {t("Three reasons Scholify exists")}
          </h2>
          <p style={{ color: INK_MUTED, fontSize: 17, maxWidth: 620, margin: "20px auto 0", lineHeight: 1.65 }}>
            {t("Not features. The three problems the product was built to solve, and what it does about each one.")}
          </p>
        </div>

        <div style={{ marginTop: 56, display: "grid", gap: 18 }}>
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.num}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              className="soft-card"
              style={{
                padding: "clamp(22px,3.2vw,36px)",
                borderRadius: 26,
                borderTop: `3px solid ${reason.accent}`,
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr)",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                <span
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    background: `${reason.accent}14`,
                  }}
                >
                  <reason.Icon size={23} color={reason.accent} strokeWidth={2.1} />
                </span>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div className="font-mono-pro" style={{ fontSize: 10, letterSpacing: "0.16em", color: reason.accent, fontWeight: 600 }}>
                    {reason.num} · {t(reason.label)}
                  </div>
                  <div
                    className="font-display"
                    style={{ fontSize: "clamp(22px,2.7vw,32px)", color: INK, marginTop: 7, letterSpacing: "-0.02em", lineHeight: 1.15 }}
                  >
                    {t(reason.title)}
                  </div>
                </div>
              </div>

              <p style={{ color: INK_MUTED, fontSize: 15.5, lineHeight: 1.75, margin: 0 }}>{t(reason.body)}</p>

              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
                {reason.proof.map((line) => (
                  <li key={line} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        borderRadius: "50%",
                        background: reason.accent,
                        display: "grid",
                        placeItems: "center",
                        color: "#fff",
                        marginTop: 2,
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span style={{ color: INK, fontSize: 14.5, lineHeight: 1.55, fontWeight: 450 }}>{t(line)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
 * 4 · SCHOLIFY vs THE ACCA STUDY HUB
 * ════════════════════════════════════════════════════════════════ */

/*
 * The comparison a prospective learner is actually running in their head, because
 * the Study Hub is included with ACCA registration and is genuinely good content.
 * So the table is written to be CHECKABLE and it says out loud what the Study Hub
 * does better — a comparison that claims to win on everything is one nobody
 * believes, and the honest row is the one that makes the other six credible.
 */

type Verdict = "yes" | "no" | "partial"

interface CompareRow {
  point: string
  detail: string
  scholify: Verdict
  scholifyNote: string
  hub: Verdict
  hubNote: string
}

const COMPARE_ROWS: CompareRow[] = [
  {
    point: "Tells you what to do today",
    detail: "The difference between a library and a plan.",
    scholify: "yes",
    scholifyNote: "One exact chapter, 5 quizzes, 10–15 questions, 5–10 cards, one article — sequenced and unlocked in order",
    hub: "no",
    hubNote: "A complete content library organised by chapter; choosing the day's work is yours",
  },
  {
    point: "Recommends your exam date",
    detail: "Computed from the paper's real size against your weekly hours.",
    scholify: "yes",
    scholifyNote: "Total hours ÷ your hours, mapped to the next ACCA session, with the arithmetic shown",
    hub: "no",
    hubNote: "No scheduling layer — you pick the sitting",
  },
  {
    point: "Adapts to your weak areas",
    detail: "Drilling ranked by what would move your score most.",
    scholify: "yes",
    scholifyNote: "Diagnostic and live accuracy decide the daily drill; difficulty matched to your level per area",
    hub: "partial",
    hubNote: "Chapter-level test-yourself questions, but the selection doesn't follow your results",
  },
  {
    point: "Never repeats a question",
    detail: "Repetition inflates accuracy, which inflates your readiness score.",
    scholify: "yes",
    scholifyNote: "Every question served is tracked until the bank is exhausted, then flagged as a revision pass",
    hub: "no",
    hubNote: "Question sets are fixed per chapter and re-served on each attempt",
  },
  {
    point: "Marks your written answers",
    detail: "Constructed response is where Skills and Professional papers are won.",
    scholify: "yes",
    scholifyNote: "Charles marks against the examiner's guide in a real CBE studio — word processor, spreadsheet, exam clock",
    hub: "no",
    hubNote: "Model answers to compare your own work against",
  },
  {
    point: "Measures exam pace",
    detail: "Most failed papers are finished papers that ran out of clock.",
    scholify: "yes",
    scholifyNote: "Seconds per mark by section against ACCA's own 1.8 min/mark, with the overrun in seconds",
    hub: "no",
    hubNote: "Untimed practice; the clock only appears in specimen exams",
  },
  {
    point: "Pays you while you study",
    detail: "Registration, subscription and exam fees are real money.",
    scholify: "yes",
    scholifyNote: "27% commission on every plan bought through your partner link, with a tracked dashboard",
    hub: "no",
    hubNote: "Not applicable",
  },
  {
    point: "Official examiner content",
    detail: "Where the Study Hub is genuinely stronger.",
    scholify: "partial",
    scholifyNote: "Original, syllabus-aligned content plus deep links to ACCA's own articles and examiner reports",
    hub: "yes",
    hubNote: "Written and approved by ACCA, and included free with your registration — use both",
  },
]

const VERDICT_STYLE: Record<Verdict, { bg: string; fg: string; Icon: typeof Check; label: string }> = {
  yes: { bg: "rgba(14,159,110,0.12)", fg: GREEN_500, Icon: Check, label: "Yes" },
  partial: { bg: "rgba(244,164,5,0.14)", fg: "#B87A05", Icon: Minus, label: "Partly" },
  no: { bg: "rgba(20,20,26,0.06)", fg: INK_MUTED, Icon: Minus, label: "No" },
}

function VerdictPill({ verdict }: { verdict: Verdict }) {
  const s = VERDICT_STYLE[verdict]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 10px",
        borderRadius: 999,
        background: s.bg,
        color: s.fg,
        fontSize: 11.5,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      <s.Icon size={12} strokeWidth={3} /> {s.label}
    </span>
  )
}

export function StudyHubComparison() {
  const t = useT()
  const reduced = useReducedMotion()
  return (
    <section style={{ padding: "var(--section-y) var(--page-gutter)", background: BG_SECONDARY }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>{t("THE HONEST COMPARISON")}</SectionLabel>
          <h2
            className="font-display text-pro-h"
            style={{ fontSize: "clamp(32px, 4.4vw, 58px)", color: INK, margin: "18px 0 0", lineHeight: 1.1 }}
          >
            {t("Scholify vs the")}{" "}
            <em className="grad-hero-text" style={{ fontStyle: "italic" }}>
              {t("ACCA Study Hub")}
            </em>
          </h2>
          <p style={{ color: INK_MUTED, fontSize: 16.5, maxWidth: 660, margin: "20px auto 0", lineHeight: 1.65 }}>
            {t(
              "The Study Hub comes free with your ACCA registration and its content is written by ACCA. It is a library. Scholify is the coach that decides what to take off the shelf, in what order, and tells you whether it worked. Use both — the last row says so.",
            )}
          </p>
        </div>

        {/* Desktop: a real table. Mobile: stacked cards, because a 3-column table
            at 360px is unreadable however much it scrolls. */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="soft-card hidden md:block"
          style={{ marginTop: 48, borderRadius: 26, overflow: "hidden", background: BG_PRIMARY }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 780 }}>
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "20px 22px",
                      textAlign: "left",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: INK_MUTED,
                      fontWeight: 600,
                      borderBottom: `1px solid ${HAIR}`,
                      width: "30%",
                    }}
                  >
                    {t("WHAT MATTERS")}
                  </th>
                  <th
                    style={{
                      padding: "20px 22px",
                      textAlign: "left",
                      borderBottom: `1px solid ${HAIR}`,
                      background: "rgba(200,0,0,0.04)",
                      width: "35%",
                    }}
                  >
                    <span className="font-display" style={{ fontSize: 19, color: BRAND_500, letterSpacing: "-0.01em" }}>
                      Scholify
                    </span>
                  </th>
                  <th
                    style={{
                      padding: "20px 22px",
                      textAlign: "left",
                      borderBottom: `1px solid ${HAIR}`,
                      width: "35%",
                    }}
                  >
                    <span className="font-display" style={{ fontSize: 19, color: INK, letterSpacing: "-0.01em" }}>
                      {t("ACCA Study Hub")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <motion.tr
                    key={row.point}
                    initial={reduced ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
                  >
                    <td style={{ padding: "18px 22px", borderBottom: `1px solid ${HAIR}`, verticalAlign: "top" }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: INK, lineHeight: 1.35 }}>{t(row.point)}</div>
                      <div style={{ fontSize: 12.5, color: INK_MUTED, marginTop: 5, lineHeight: 1.5 }}>{t(row.detail)}</div>
                    </td>
                    <td
                      style={{
                        padding: "18px 22px",
                        borderBottom: `1px solid ${HAIR}`,
                        background: "rgba(200,0,0,0.03)",
                        verticalAlign: "top",
                      }}
                    >
                      <VerdictPill verdict={row.scholify} />
                      <div style={{ fontSize: 13.5, color: INK, marginTop: 9, lineHeight: 1.55 }}>{t(row.scholifyNote)}</div>
                    </td>
                    <td style={{ padding: "18px 22px", borderBottom: `1px solid ${HAIR}`, verticalAlign: "top" }}>
                      <VerdictPill verdict={row.hub} />
                      <div style={{ fontSize: 13.5, color: INK_MUTED, marginTop: 9, lineHeight: 1.55 }}>{t(row.hubNote)}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile */}
        <div className="md:hidden" style={{ marginTop: 40, display: "grid", gap: 14 }}>
          {COMPARE_ROWS.map((row, i) => (
            <motion.div
              key={row.point}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.05, ease: EASE }}
              className="soft-card"
              style={{ padding: 20, borderRadius: 20, background: BG_PRIMARY }}
            >
              <div style={{ fontSize: 15.5, fontWeight: 650, color: INK, lineHeight: 1.35 }}>{t(row.point)}</div>
              <div style={{ fontSize: 12.5, color: INK_MUTED, marginTop: 5, lineHeight: 1.5 }}>{t(row.detail)}</div>

              <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
                <div style={{ padding: "12px 14px", borderRadius: 14, background: "rgba(200,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <span className="font-display" style={{ fontSize: 14, color: BRAND_500 }}>
                      Scholify
                    </span>
                    <VerdictPill verdict={row.scholify} />
                  </div>
                  <div style={{ fontSize: 13, color: INK, lineHeight: 1.55 }}>{t(row.scholifyNote)}</div>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: 14, background: "rgba(20,20,26,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <span className="font-display" style={{ fontSize: 14, color: INK }}>
                      {t("Study Hub")}
                    </span>
                    <VerdictPill verdict={row.hub} />
                  </div>
                  <div style={{ fontSize: 13, color: INK_MUTED, lineHeight: 1.55 }}>{t(row.hubNote)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            marginTop: 28,
            padding: "16px 20px",
            borderRadius: 18,
            background: BG_PRIMARY,
            border: `1px solid ${HAIR}`,
            fontSize: 13.5,
            color: INK_MUTED,
            lineHeight: 1.65,
            maxWidth: 720,
            margin: "28px auto 0",
          }}
        >
          {t(
            "Compiled from the ACCA Study Hub as published to registered students. It is a genuinely good, free content library and we link to it from inside the app — including from every technical article. The comparison is about the layer on top: deciding, sequencing and measuring.",
          )}
        </div>
      </div>
    </section>
  )
}
