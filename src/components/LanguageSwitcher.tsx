import { useLang, type Lang } from "@/i18n/LanguageProvider"

/*
 * The EN/RU pill for the marketing surfaces — the door-in for the RU/CIS
 * market. Two small toggles, the active one filled; compact enough to live in
 * the landing nav at every width.
 */
export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const options: { value: Lang; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ru", label: "RU" },
  ]
  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: "rgba(255,255,255,0.96)",
        border: "1px solid rgba(20,20,26,0.08)",
      }}
    >
      {options.map((o) => {
        const active = o.value === lang
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setLang(o.value)}
            aria-pressed={active}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "5px 10px",
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: "0.04em",
              cursor: active ? "default" : "pointer",
              background: active ? "#14141A" : "transparent",
              color: active ? "#fff" : "#6b6b76",
              transition: "background .18s ease, color .18s ease",
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
