import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { RU } from "@/i18n/ru"

/*
 * The language layer for the MARKETING surfaces (landing, pricing, footer).
 *
 * English is the source of truth: every t("…") call passes the English copy,
 * and the RU dictionary maps those exact strings to Russian. A missing entry
 * falls back to English — a mixed line is better than a blank one, and the
 * completeness test (ru-dictionary.test.ts) fails the build before a gap ships.
 *
 * The APP deliberately stays English: ACCA is examined in English, so the study
 * content must be English — this provider is the door in for the RU/CIS market,
 * not a translation of the course.
 *
 * Language resolution: explicit choice in localStorage first, then the
 * browser's language (ru* → ru), else English. The choice persists.
 */

export type Lang = "en" | "ru"

const STORAGE_KEY = "scholify-lang"

function detectLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "ru" || stored === "en") return stored
  } catch {
    /* storage unavailable — fall through to browser detect */
  }
  try {
    if ((navigator.language || "").toLowerCase().startsWith("ru")) return "ru"
  } catch {
    /* SSR/odd environments */
  }
  return "en"
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (text: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LanguageContextValue>(() => {
    const t = lang === "ru" ? (text: string) => RU[text] ?? text : (text: string) => text
    const setLang = (next: Lang) => {
      setLangState(next)
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* choice simply won't persist */
      }
    }
    return { lang, setLang, t }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** Translation hook — same signature the landing surfaces already use. */
export function useT() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useT must be used inside a <LanguageProvider>")
  return ctx.t
}

/** The current language and the switcher — for the EN/RU pill in the nav. */
export function useLang(): { lang: Lang; setLang: (lang: Lang) => void } {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used inside a <LanguageProvider>")
  return { lang: ctx.lang, setLang: ctx.setLang }
}
