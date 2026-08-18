import { useEffect, useRef } from "react"
import { streakAtRisk } from "@/lib/acca-schedule"
import { getCurrentPaper } from "@/lib/acca-qualification"

/*
 * The streak-saver tab nudge — the one piece of in-app re-engagement that works
 * with no email and no push infrastructure.
 *
 * People keep tabs open. When the learner switches away with a streak of 2+ days
 * that they have not yet secured today, the browser tab title becomes
 * "🔥 N-day streak at risk" — a quiet, honest pull back before the day rolls
 * over. The moment they return (or secure the day), the original title is
 * restored. Renders nothing; mounted once in the app shell.
 */
export default function StreakSaver() {
  const original = useRef<string | null>(null)

  useEffect(() => {
    const restore = () => {
      if (original.current !== null) {
        document.title = original.current
        original.current = null
      }
    }

    const sync = () => {
      // Only nudge while the tab is HIDDEN — a title flip on the visible tab is
      // noise. On return, restore immediately.
      if (document.visibilityState !== "hidden") {
        restore()
        return
      }
      const paper = getCurrentPaper()
      if (!paper) return
      const { atRisk, streak } = streakAtRisk(paper)
      if (atRisk) {
        if (original.current === null) original.current = document.title
        document.title = `🔥 ${streak}-day streak at risk — Scholify`
      } else {
        restore()
      }
    }

    document.addEventListener("visibilitychange", sync)
    return () => {
      document.removeEventListener("visibilitychange", sync)
      restore()
    }
  }, [])

  return null
}
