import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { TutorChat } from "@/components/ui/tutor-chat"
import LanguageToggle from "@/components/language-toggle"
import { useT } from "@/i18n/LanguageProvider"

const LARA_AVATAR =
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Lara&backgroundColor=ffd5dc,fde68a,c0aede&radius=50&eyes=variant10&hair=variant44&mouth=happy06"

export default function Chat() {
  const t = useT()
  return (
    <div className="flex h-screen flex-col" style={{ background: "#FAFAF7" }}>
      <header
        className="flex items-center gap-3 border-b px-4 py-3"
        style={{ borderColor: "#EAEAEF" }}
      >
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm transition-colors"
          style={{ color: "#6B6B76" }}
        >
          <ArrowLeft className="size-4" /> {t("Back")}
        </Link>
        <span className="mx-1 h-4 w-px" style={{ background: "#EAEAEF" }} />
        <img
          src={LARA_AVATAR}
          alt="Lara"
          width={28}
          height={28}
          className="rounded-full"
          style={{ background: "#E8E8FF" }}
        />
        <div className="leading-tight">
          <h1 className="font-display text-lg" style={{ color: "#14141A" }}>
            {t("Lara")}
          </h1>
          <p className="text-[11px]" style={{ color: "#6B6B76" }}>
            {t("Your AI learning partner")}
          </p>
        </div>
        <div className="ml-auto">
          <LanguageToggle />
        </div>
      </header>
      <div className="min-h-0 flex-1">
        <TutorChat />
      </div>
    </div>
  )
}
