import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { X } from "lucide-react"
import { ScholifyMark } from "@/components/brand"
import CharlesMascot, { type CharlesPose } from "@/components/CharlesMascot"
import { Icon, type IconName } from "@/components/acca/ui"

/* ──────────────────────────────────────────────────────────────
 *  The seven-step introduction to the workspace.
 *
 *  A learner arrives from a paywall having bought something they
 *  have never used, and lands on a screen with a sidebar, a tab
 *  bar, five daily blocks and a mock room. Everything is there and
 *  nothing announces itself, so the common failure is not that
 *  they dislike the product — it is that they never find the half
 *  of it that would have kept them.
 *
 *  Seven steps, each naming ONE thing and what it is for. Shown
 *  once, skippable at every step, and re-openable from Settings if
 *  they want it again.
 *
 *  Art direction: our own mark and our own mascot. No stock
 *  stickers, no emoji — Charles carries the personality and the
 *  step icons come from the same set the app already uses, so the
 *  tour looks like the product rather than like a plugin bolted
 *  onto it.
 * ────────────────────────────────────────────────────────────── */

const KEY = "scholify:app-tour:v1"

interface Step {
  /** Small mono label — position in the sequence carries the pacing. */
  kicker: string
  title: string
  body: string
  icon: IconName
  pose: CharlesPose
}

const STEPS: Step[] = [
  {
    kicker: "Step 1 · Today",
    title: "Your day is already decided.",
    body: "Every morning Scholify sets one exact block of work: a chapter to read, questions to answer, cards to review. You never open the app wondering what to study — that decision is made before you arrive.",
    icon: "mission",
    pose: "wave",
  },
  {
    kicker: "Step 2 · Study",
    title: "Read the chapter, then prove it.",
    body: "Each topic opens as a written chapter in plain English, followed immediately by questions on what you just read. Reading without answering is how people finish a syllabus and still fail — so the two are never separated here.",
    icon: "learn",
    pose: "present",
  },
  {
    kicker: "Step 3 · Practice",
    title: "Marked the moment you answer.",
    body: "Expert-written questions, marked instantly, with the explanation shown while the question is still fresh in your head. Every answer quietly updates what tomorrow's plan will contain.",
    icon: "practice",
    pose: "thinking",
  },
  {
    kicker: "Step 4 · Charles",
    title: "Ask when you're stuck.",
    body: "Charles is your race engineer. Ask him anything about the topic in front of you and he answers in context — he can see the paper you're on and the question you just got wrong.",
    icon: "tutor",
    pose: "idea",
  },
  {
    kicker: "Step 5 · Flashcards",
    title: "Beat the forgetting curve.",
    body: "Definitions and rules come back as spaced-repetition cards, timed to resurface exactly as you're about to forget them. Five minutes a day is what keeps month-one knowledge alive in month four.",
    icon: "flashcards",
    pose: "run",
  },
  {
    kicker: "Step 6 · Mocks",
    title: "Rehearse the real thing.",
    body: "Timed, full-length mock exams under exam conditions, with the AI Examiner marking your written answers against the marking scheme point by point. You find out where the marks go before it counts.",
    icon: "trophy",
    pose: "chart",
  },
  {
    kicker: "Step 7 · Streak",
    title: "Show up tomorrow.",
    body: "Nobody passes ACCA in a weekend. Your streak and readiness score track the only thing that reliably predicts a pass — turning up on the days you don't feel like it. Start it today.",
    icon: "streak",
    pose: "celebrate",
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

export function hasSeenAppTour(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "1"
  } catch {
    return false
  }
}

export function markAppTourSeen(): void {
  try {
    window.localStorage.setItem(KEY, "1")
  } catch {
    /* private mode — it will offer itself again, which is harmless */
  }
}

export default function AppTour({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  // +1 forward, -1 back: the slide direction has to follow the button pressed,
  // or "Back" animates like "Next" and the sequence loses its sense of place.
  const [direction, setDirection] = useState(1)

  const finish = useCallback(() => {
    markAppTourSeen()
    onClose()
  }, [onClose])

  const go = useCallback(
    (delta: number) => {
      setDirection(delta)
      setIndex((current) => {
        const next = current + delta
        if (next < 0) return 0
        if (next >= STEPS.length) {
          finish()
          return current
        }
        return next
      })
    },
    [finish],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [open, finish, go])

  const step = STEPS[index]
  const last = index === STEPS.length - 1
  const shift = reduced ? 0 : 46

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Guided tour of your Scholify workspace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 5000,
            display: "grid",
            placeItems: "center",
            padding: 16,
            background: "rgba(11,11,15,.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <motion.div
            initial={reduced ? false : { y: 26, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            style={{
              width: "min(560px, 100%)",
              maxHeight: "calc(100dvh - 32px)",
              overflowY: "auto",
              borderRadius: 24,
              background: "var(--sch-card, #fff)",
              border: "1px solid var(--sch-border, rgba(20,20,26,.1))",
              boxShadow: "0 40px 90px -30px rgba(11,11,15,.6)",
              position: "relative",
            }}
          >
            {/* Brand bar — the same gradient the emails and the footer use. */}
            <div style={{ height: 5, background: "linear-gradient(90deg,#C80000 0%,#E50068 52%,#F4A405 100%)" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 0" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                <ScholifyMark size={24} />
                <span style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "-0.01em", color: "var(--sch-text)" }}>
                  Your workspace
                </span>
              </span>
              <button
                type="button"
                onClick={finish}
                aria-label="Skip the tour"
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--sch-tx-2)", padding: 6, lineHeight: 0 }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress: seven segments, the current one filling. Position in a
                sequence is the one thing a tour must never leave you guessing. */}
            <div style={{ display: "flex", gap: 5, padding: "14px 20px 0" }}>
              {STEPS.map((s, i) => (
                <div
                  key={s.kicker}
                  style={{ flex: 1, height: 3, borderRadius: 99, overflow: "hidden", background: "color-mix(in srgb, var(--sch-text) 10%, transparent)" }}
                >
                  <motion.div
                    initial={false}
                    animate={{ scaleX: i <= index ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                    style={{ height: "100%", borderRadius: 99, transformOrigin: "left", background: "#C80000" }}
                  />
                </div>
              ))}
            </div>

            <div style={{ position: "relative", padding: "18px 20px 0", minHeight: 268 }}>
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step.kicker}
                  custom={direction}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? shift : -shift }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? -shift : shift }}
                  transition={{ duration: 0.34, ease: EASE }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span
                          aria-hidden
                          style={{
                            display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9,
                            background: "rgba(200,0,0,.08)", color: "#C80000",
                          }}
                        >
                          <Icon name={step.icon} size={16} />
                        </span>
                        <span style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--sch-tx-2)" }}>
                          {step.kicker}
                        </span>
                      </div>
                      <h2 style={{ fontSize: "clamp(20px, 4.6vw, 25px)", fontWeight: 850, letterSpacing: "-0.03em", color: "var(--sch-text)", margin: 0, lineHeight: 1.2 }}>
                        {step.title}
                      </h2>
                      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--sch-tx-2)", margin: "10px 0 0" }}>
                        {step.body}
                      </p>
                    </div>
                    {/* Charles carries the personality — no stickers needed. */}
                    <motion.div
                      initial={reduced ? false : { scale: 0.86, opacity: 0, y: 8 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
                      style={{ flex: "0 0 auto", margin: "0 auto" }}
                    >
                      <CharlesMascot pose={step.pose} size={118} />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "18px 20px 20px" }}>
              <button
                type="button"
                onClick={index === 0 ? finish : () => go(-1)}
                style={{
                  minHeight: 44, padding: "0 14px", borderRadius: 11, cursor: "pointer",
                  background: "transparent", border: "none", color: "var(--sch-tx-2)",
                  fontSize: 13.5, fontWeight: 700, fontFamily: "inherit",
                }}
              >
                {index === 0 ? "Skip" : "Back"}
              </button>
              <motion.button
                type="button"
                onClick={() => (last ? finish() : go(1))}
                whileHover={reduced ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE }}
                style={{
                  minHeight: 44, padding: "0 22px", borderRadius: 12, cursor: "pointer", border: "none",
                  background: "#C80000", color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "inherit",
                }}
              >
                {last ? "Start today's block →" : "Next"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
