import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { ru } from "./translations"

export type Lang = "en" | "ru"

const STORAGE_KEY = "scholify-lang"

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Translate an English string. Falls back to English if untranslated. */
  t: (text: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "en"
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === "ru" || saved === "en" ? saved : "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* localStorage unavailable (private mode) — language just won't persist */
    }
  }, [])

  const t = useCallback(
    (text: string) => {
      if (lang === "en") return text
      const translated = ru[text]
      return translated ? translated : text
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used inside a <LanguageProvider>")
  }
  return ctx
}

/** Convenience hook when a component only needs the translate function. */
export function useT() {
  return useLanguage().t
}
