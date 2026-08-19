import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react"

/*
 * The language layer for the marketing surfaces — now ENGLISH-ONLY.
 *
 * ── Why this file still exists ───────────────────────────────────
 * Scholify briefly shipped a Russian translation of the landing/pricing/footer
 * surfaces (an RU dictionary keyed by the English copy, an EN/RU pill in the
 * nav, browser-language detection). The founder retired it on 19 Aug 2026:
 * one market, one language, one set of copy to keep honest. The RU dictionary,
 * its completeness test and the LanguageSwitcher are deleted.
 *
 * The PROVIDER and useT() survive because seven marketing components call
 * t("…") around every string. Keeping the hook as an identity function retires
 * the translation layer without touching any of them — and if a second
 * language ever returns, the door back in is a dictionary and one line here,
 * not a re-instrumentation of the whole landing page.
 *
 * The old "scholify-lang" localStorage key is cleaned up on mount so a
 * visitor's stale "ru" choice from before the removal doesn't sit around
 * implying a setting that no longer exists.
 */

interface LanguageContextValue {
  t: (text: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/** English copy passes through untouched. */
const identity = (text: string) => text

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "en"
    try {
      window.localStorage.removeItem("scholify-lang")
    } catch {
      /* storage unavailable — nothing to clean */
    }
  }, [])

  const value = useMemo<LanguageContextValue>(() => ({ t: identity }), [])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** Translation hook — same signature the marketing surfaces already use. */
export function useT() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useT must be used inside a <LanguageProvider>")
  return ctx.t
}
