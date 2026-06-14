import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

/*
 * App theme (light / dark) for the signed-in screens.
 *
 * The actual colours live in CSS variables (--sch-*) in index.css.
 * This provider just flips html[data-theme] and persists the choice.
 * An inline script in index.html applies the saved theme before paint
 * to avoid a flash.
 */

export type Theme = "light" | "dark"

const STORAGE_KEY = "scholify-theme"

function readTheme(): Theme {
  try {
    // Light is the default (the Scholify design); dark only when explicitly chosen.
    return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light"
  } catch {
    return "light"
  }
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    try {
      window.localStorage.setItem(STORAGE_KEY, t)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    }),
    [theme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside a <ThemeProvider>")
  return ctx
}
