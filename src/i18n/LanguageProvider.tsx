import { createContext, useContext, useEffect, type ReactNode } from "react"

const STORAGE_KEY = "scholify-lang"
const translateEnglish = (text: string) => text
const LanguageContext = createContext<typeof translateEnglish | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "en"
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* localStorage unavailable — the page is still English-only. */
    }
  }, [])

  return (
    <LanguageContext.Provider value={translateEnglish}>
      {children}
    </LanguageContext.Provider>
  )
}

/** Identity translation hook retained while English copy still uses t(...). */
export function useT() {
  const t = useContext(LanguageContext)
  if (!t) throw new Error("useT must be used inside a <LanguageProvider>")
  return t
}
