import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import LanguageToggle from "@/components/language-toggle"
import { useT } from "@/i18n/LanguageProvider"

/* ── Brand tokens (kept in sync with Landing.tsx / tutor-chat.tsx) ── */
const INK = "#14141A"
const INK_MUTED = "#6B6B76"
const CREAM = "#FAFAF7"
const BORDER = "#EAEAEF"
const BRAND_500 = "#C80000"

export interface InfoSection {
  heading: string
  /* Each entry is a paragraph. */
  body: string[]
}

interface InfoPageLayoutProps {
  title: string
  intro: string
  updated: string
  sections: InfoSection[]
}

/**
 * Shared layout for the Privacy, Terms and Support pages.
 * Simple, readable, brand-consistent — a header with a back link,
 * a centered text column, and a footer note.
 */
export default function InfoPageLayout({ title, intro, updated, sections }: InfoPageLayoutProps) {
  const t = useT()

  /* Static pages should open at the top, not wherever the user last scrolled. */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: CREAM, color: INK }}>
      <header
        className="sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3 backdrop-blur"
        style={{ borderColor: BORDER, background: `${CREAM}E6` }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm transition-colors hover:opacity-70"
          style={{ color: INK_MUTED }}
        >
          <ArrowLeft className="size-4" /> {t("Back to Scholify")}
        </Link>
        <div className="ml-auto">
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
        <h1
          className="font-display text-4xl sm:text-5xl"
          style={{ color: INK, letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: INK_MUTED }}>
          {t("Last updated")} {t(updated)}
        </p>
        <p className="mt-5 text-[15px] leading-relaxed" style={{ color: INK_MUTED }}>
          {intro}
        </p>

        <div className="mt-10 flex flex-col gap-9">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2
                className="text-lg font-semibold"
                style={{ color: INK, borderLeft: `3px solid ${BRAND_500}`, paddingLeft: 10 }}
              >
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-[15px] leading-relaxed" style={{ color: INK_MUTED }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div
          className="mt-14 border-t pt-6 text-sm"
          style={{ borderColor: BORDER, color: INK_MUTED }}
        >
          {t("Questions? Email us at")}{" "}
          <a href="mailto:support@scholify.app" style={{ color: BRAND_500, fontWeight: 600 }}>
            support@scholify.app
          </a>
          .
        </div>
      </main>
    </div>
  )
}
