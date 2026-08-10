import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { X } from "lucide-react"
import { ScholifyMark } from "@/components/brand"

/*
 * The honest opening line of a platform that launched yesterday.
 *
 * Saying "this is new, you will find rough edges, tell us" costs nothing and
 * buys two things a launch badly needs: it converts the first bug someone hits
 * from a broken promise into an invitation, and it turns early users into the
 * testers you do not have. People forgive a new product almost anything except
 * pretending to be finished.
 *
 * Shown once per browser, dismissed for good. It is not an announcement to be
 * repeated at someone until they resent it.
 */

const KEY = "scholify:new-platform-notice:v1"
/** Long enough to read the page first, short enough to still feel like a greeting. */
const DELAY_MS = 2600

export default function NewPlatformNotice() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)

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

  const dismiss = () => {
    setOpen(false)
    try {
      window.localStorage.setItem(KEY, "1")
    } catch {
      /* nothing to do — it reappears next visit, which is acceptable */
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            zIndex: 3500,
            left: "max(16px, env(safe-area-inset-left))",
            right: "auto",
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
            {/* Our own mark, not a generic sparkle. This is the first thing a
                new visitor is shown; it should be the brand introducing itself. */}
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
              <div style={{ fontSize: 14, fontWeight: 750, color: "var(--sch-text)", lineHeight: 1.35 }}>
                Scholify is brand new
              </div>
              <p style={{ fontSize: 12.8, lineHeight: 1.55, color: "var(--sch-tx-2)", margin: "5px 0 0" }}>
                You may run into something rough. If you do, tell us — use the feedback button, or highlight any wrong
                text and press <b style={{ color: "var(--sch-tx-1)" }}>Ctrl+Enter</b> to report it in two seconds.
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--sch-tx-2)", padding: 3, lineHeight: 0, flexShrink: 0 }}
            >
              <X size={16} />
            </button>
          </div>
          <button
            type="button"
            onClick={dismiss}
            style={{
              width: "100%", minHeight: 40, marginTop: 11, borderRadius: 10, cursor: "pointer",
              background: "var(--sch-bg, #FAFAF7)", border: "1px solid var(--sch-border, rgba(20,20,26,.1))",
              color: "var(--sch-tx-1)", fontSize: 13, fontWeight: 700, fontFamily: "inherit",
            }}
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
