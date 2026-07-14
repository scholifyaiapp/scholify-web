import { useCallback, useEffect, useState } from "react"
import { loadPaperContent } from "@/lib/acca-paper-content"
import { isPaperContentLoaded } from "@/lib/acca-content-registry"

/*
 * Await ONE paper's content before rendering a study surface.
 *
 * This is the single seam between the async loader and the app's synchronous
 * content getters (see acca-content-registry.ts): a page calls this once for the
 * ACTIVE paper, holds its skeleton until `ready`, and from that point every
 * existing sync call — getQuestions, buildSession, chaptersForPaper,
 * getFlashcards, getTopicBrief — works exactly as before, against the loaded
 * paper. No other call site had to change.
 *
 * A null paperId (the picker, a signed-out shell) is trivially ready: those
 * surfaces render from paper metadata, which is always eager.
 */
export interface PaperContentState {
  /** The paper's content is in memory; sync getters are safe. */
  ready: boolean
  /** The dynamic import failed (offline mid-session, stale chunk after deploy). */
  error: boolean
  retry: () => void
}

export function usePaperContent(paperId: string | null | undefined): PaperContentState {
  const [ready, setReady] = useState(() => !paperId || isPaperContentLoaded(paperId))
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!paperId) {
      setReady(true)
      setError(false)
      return
    }
    if (isPaperContentLoaded(paperId)) {
      setReady(true)
      setError(false)
      return
    }

    let alive = true
    setReady(false)
    setError(false)
    loadPaperContent(paperId)
      .then(() => {
        if (alive) setReady(true)
      })
      .catch(() => {
        if (alive) setError(true)
      })
    return () => {
      alive = false
    }
  }, [paperId, attempt])

  const retry = useCallback(() => setAttempt((a) => a + 1), [])

  return { ready, error, retry }
}
