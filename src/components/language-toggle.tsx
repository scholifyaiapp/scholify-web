import { useLanguage, type Lang } from "@/i18n/LanguageProvider"

const OPTIONS: { code: Lang; label: string; aria: string }[] = [
  { code: "en", label: "en", aria: "English" },
  { code: "ru", label: "ru", aria: "Русский" },
]

/**
 * Compact en / ru language switch. Kept deliberately small so it fits
 * the nav on mobile without crowding the call-to-action buttons.
 */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex shrink-0 items-center rounded-full p-[2px] ${className}`}
      style={{ background: "rgba(20,20,26,0.06)" }}
    >
      {OPTIONS.map(({ code, label, aria }) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={aria}
            className="rounded-full px-2 py-[3px] text-[11px] font-bold leading-none transition-colors"
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
