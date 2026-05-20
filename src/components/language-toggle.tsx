import { useLanguage, type Lang } from "@/i18n/LanguageProvider"

const OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "ENG" },
  { code: "ru", label: "RUS" },
]

/**
 * ENG / RUS segmented language switch. Reads and writes the global
 * language via LanguageProvider; the choice persists in localStorage.
 */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full p-0.5 ${className}`}
      style={{ background: "rgba(20,20,26,0.06)" }}
    >
      {OPTIONS.map(({ code, label }) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className="rounded-full px-2.5 py-1 text-xs font-bold transition-colors"
            style={{
              background: active ? "#5B5BF5" : "transparent",
              color: active ? "#FAFAF7" : "#6B6B76",
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
