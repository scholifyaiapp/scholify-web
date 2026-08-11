import { useEffect, useState } from "react"
import { blockSecondsToday, recordBlockSeconds } from "@/lib/acca-block-gate"

/*
 * Time actually spent on a step, ticked only while the learner is here.
 *
 * "Here" means three things, and all three matter:
 *
 *   · the component is mounted (they are on the chapter, not elsewhere),
 *   · the tab is VISIBLE (a chapter left open behind a YouTube tab is not
 *     study, and treating it as study is exactly the loophole a time gate
 *     exists to close),
 *   · the machine is awake — a laptop resuming from sleep produces one huge
 *     delta, which recordBlockSeconds clamps so a single tick can never clear
 *     a gate on its own.
 *
 * It writes every tick rather than on unmount, because the common way to leave
 * a chapter is closing the tab, and an unmount handler does not reliably run
 * then. Losing four minutes of served time to a browser crash would be blamed
 * on the gate, not the crash.
 */

const TICK_MS = 5_000

export function useBlockTimer(paperId: string | null, blockId: string | null, active = true): number {
  const [seconds, setSeconds] = useState(() =>
    paperId && blockId ? blockSecondsToday(paperId, blockId) : 0,
  )

  useEffect(() => {
    if (!paperId || !blockId || !active) return

    setSeconds(blockSecondsToday(paperId, blockId))
    let last = Date.now()

    const flush = () => {
      const now = Date.now()
      const elapsed = (now - last) / 1000
      last = now
      // Only credit time when the page was actually in front of them.
      if (document.visibilityState !== "visible") return
      setSeconds(recordBlockSeconds(paperId, blockId, elapsed))
    }

    const id = window.setInterval(flush, TICK_MS)

    // Banking on the way out covers the partial tick, and the visibility
    // handler resets the clock so time spent away is discarded rather than
    // credited on return.
    const onVisibility = () => {
      if (document.visibilityState === "visible") last = Date.now()
      else flush()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      flush()
      window.clearInterval(id)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [paperId, blockId, active])

  return seconds
}
