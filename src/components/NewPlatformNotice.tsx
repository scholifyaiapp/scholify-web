import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { X } from "lucide-react"
import { ScholifyMark } from "@/components/brand"

/*
 * The two things a first-time visitor should be told, and nothing else.
 *
 *   1/2  This is new. You may hit something rough — here is how to tell us.
 *   2/2  Use a laptop for now. The mobile app lands 15 September.
 *
 * Both are honest admissions rather than marketing, which is the point: a
 * launch-week product that says "we are new and the phone version isn't ready"
 * buys more trust than one that says nothing and lets the learner find out.
 * People forgive a young product almost anything except pretending to be
 * finished.
 *
 * Shown once per browser, then dismissed for good. It is a greeting, not an
 * announcement to be repeated at someone until they resent it.
 */

const KEY = "scholify:new-platform-notice:v2"
/** Long enough to read the page first, short enough to still feel like a greeting. */
const DELAY_MS = 2600
const EASE = [0.16, 1, 0.3, 1] as const

interface Step {
  kicker: string
  title: string
  body: React.ReactNode
}

const STEPS: Step[] = [
  {
    kicker: "Welcome",
    title: "Scholify is brand new",
    body: (
      <>
        You may run into something rough. If you do, tell us — use the feedback button, or highlight any wrong text
        and press <b style={{ color: "var(--sch-tx-1)" }}>Ctrl+Enter</b> to report it in two seconds.
      </>
    ),
  },
  {
    kicker: "Tip",
    title: "Use a laptop for now",
    body: (
      <>
        Scholify works on a phone, but it is built for a full screen — timed mocks, the AI Examiner and written
        practice all want the room. The <b style={{ color: "var(--sch-tx-1)" }}>mobile app arrives 15 September 2026</b>.
      </>
    ),
  },
]

export default function NewPlatformNotice() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = window.localStorage.getItem(KEY) === "1"
    } catch {
      /* private mode — show it, and simply forget the dismissal */
    }
    if (dismissed) return
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const close = () => {
    setOpen(false)
    try {
      window.localStorage.setItem(KEY, "1")
    } catch {
      /* nothing to do — it reappears next visit, which is acceptable */
    }
  }

  const advance = () => {
    if (index < STEPS.length - 1) setIndex(index + 1)
    else close()
  }

  const step = STEPS[index]
  const last = index === STEPS.length - 1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.42, ease: EASE }}
          style={{
            position: "fixed",
            zIndex: 3500,
            left: "max(16px, env(safe-area-inset-left))",
            bottom: "max(16px, env(safe-area-inset-bottom))",
            width: "min(370px, calc(100vw - 32px))",
            borderRadius: 16,
            padding: 15,
            background: "var(--sch-card, #fff)",
            border: "1px solid var(--sch-border, rgba(20,20,26,.1))",
            boxShadow: "0 22px 55px -22px rgba(11,11,15,.42)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
            {/* Our own mark, not a generic sparkle — this is the brand
                introducing itself. */}
            <motion.span
              aria-hidden
              initial={reduced ? false : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, type: "spring", stiffness: 280, damping: 15 }}
              style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 32, height: 32 }}
            >
              <ScholifyMark size={30} />
            </motion.span>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Steps crossfade upward so the card feels like it is turning a
                  page rather than swapping its contents. */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.title}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.26, ease: EASE }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        fontFamily: "ui-monospace, 'JetBrains Mono', monospace", fontSize: 9.5, fontWeight: 800,
                        letterSpacing: "0.16em", textTransform: "uppercase", color: "#C80000",
                      }}
                    >
                      {step.kicker}
                    </span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--sch-tx-2)", fontVariantNumeric: "tabular-nums" }}>
                      {index + 1}/{STEPS.length}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 750, color: "var(--sch-text)", lineHeight: 1.35, marginTop: 3 }}>
                    {step.title}
                  </div>
                  <p style={{ fontSize: 12.8, lineHeight: 1.55, color: "var(--sch-tx-2)", margin: "5px 0 0" }}>{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Dismiss"
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--sch-tx-2)", padding: 3, lineHeight: 0, flexShrink: 0 }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 11 }}>
            {/* Two ticks — position in a two-card greeting, without a second
                number competing with the counter above. */}
            <div style={{ display: "flex", gap: 5 }}>
              {STEPS.map((s, i) => (
                <motion.span
                  key={s.title}
                  animate={{ width: i === index ? 16 : 6, backgroundColor: i <= index ? "#C80000" : "rgba(20,20,26,.16)" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ height: 4, borderRadius: 99, display: "block" }}
                />
              ))}
            </div>
            <motion.button
              type="button"
              onClick={advance}
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.16 }}
              style={{
                flex: 1, minHeight: 40, borderRadius: 10, cursor: "pointer",
                background: last ? "var(--sch-bg, #FAFAF7)" : "#C80000",
                border: last ? "1px solid var(--sch-border, rgba(20,20,26,.1))" : "none",
                color: last ? "var(--sch-tx-1)" : "#fff",
                fontSize: 13, fontWeight: 700, fontFamily: "inherit",
              }}
            >
              {last ? "Got it" : "Next"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
