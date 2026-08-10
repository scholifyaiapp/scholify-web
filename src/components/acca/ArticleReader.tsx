import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { C, R, SP, SHADOW, GRAD, Icon, type IconName } from "@/components/acca/ui"
import { markArticleRead, type ArticleSection, type TechArticle } from "@/lib/acca-tech-article"

/*
 * ── The technical-article reader ──────────────────────────────────
 *
 * Today's fifth block used to be an external link to accaglobal.com's index of
 * every technical article for the paper, so the learner left the app, landed on a
 * list of forty, and had to guess which one related to the chapter they had just
 * read (see acca-tech-article for why that block was effectively dead).
 *
 * This reads the article in-app, in the same visual language as the study
 * chapters, with a scroll-progress bar and one honest completion action at the
 * end. The official ACCA index stays — as a clearly-labelled DEEPER read at the
 * bottom, which is what it actually is.
 */

const SECTION_ICON: Record<ArticleSection["kind"], IconName> = {
  examined: "exam",
  marks: "stats",
  wording: "notes",
  traps: "alert",
  connect: "loop",
  recall: "mission",
}

const SECTION_TONE: Record<ArticleSection["kind"], string> = {
  examined: C.brand,
  marks: C.amber,
  wording: C.brand,
  traps: C.red,
  connect: C.green,
  recall: C.brand,
}

export function ArticleReader({
  article,
  paperId,
  onBack,
  onDone,
}: {
  article: TechArticle
  paperId: string
  onBack: () => void
  onDone: () => void
}) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const startedAt = useMemo(() => Date.now(), [article.id])

  // Scroll progress: the reader's own sense of how far through they are. Cheap —
  // one passive listener, no layout thrash.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 1)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [article.id])

  const finish = () => {
    markArticleRead(paperId, article.id)
    onDone()
  }

  const secondsRead = Math.round((Date.now() - startedAt) / 1000)

  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      {/* Reading progress — fixed, hairline, no chrome. */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "transparent", zIndex: 60 }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: GRAD, transition: "width .12s linear" }} />
      </div>

      <button
        onClick={onBack}
        style={{ background: "none", border: "none", color: C.soft, cursor: "pointer", fontSize: 14, padding: 0, marginBottom: SP.md }}
      >
        ← Today's plan
      </button>

      <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", color: C.brand, marginBottom: SP.sm }}>
        TECHNICAL ARTICLE · {article.paper} · AREA {article.area}
      </div>
      <h1 style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 800, letterSpacing: "-0.022em", lineHeight: 1.2, color: C.text, margin: `0 0 ${SP.sm}px` }}>
        {article.title}
      </h1>
      <p style={{ fontSize: 15, color: C.soft, lineHeight: 1.6, margin: `0 0 ${SP.md}px` }}>{article.standfirst}</p>
      <div style={{ display: "flex", alignItems: "center", gap: SP.sm, marginBottom: SP.xl, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: R.pill, background: C.card2, color: C.soft, fontSize: 11.5, fontWeight: 750 }}>
          <Icon name="time" size={12} color={C.soft} /> {article.minutes} min read
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: R.pill, background: C.card2, color: C.soft, fontSize: 11.5, fontWeight: 750 }}>
          <Icon name="topics" size={12} color={C.soft} /> {article.sections.length} sections
        </span>
      </div>

      <div style={{ display: "grid", gap: SP.md }}>
        {article.sections.map((section, i) => (
          <motion.section
            key={section.heading}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: R.xl,
              border: `1px solid ${C.border}`,
              background: C.card,
              padding: SP.lg,
              borderLeft: `3px solid ${SECTION_TONE[section.kind]}`,
              boxShadow: SHADOW.sm,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: SP.sm, marginBottom: SP.sm }}>
              <Icon name={SECTION_ICON[section.kind]} size={16} color={SECTION_TONE[section.kind]} />
              <h2 style={{ fontSize: 16.5, fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.01em" }}>{section.heading}</h2>
            </div>
            {section.paragraphs.map((p, j) => (
              <p key={j} style={{ fontSize: 14.5, lineHeight: 1.68, color: C.muted, margin: `0 0 ${j === section.paragraphs.length - 1 ? 0 : SP.sm}px` }}>
                {p}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul style={{ margin: `${SP.md}px 0 0`, padding: 0, listStyle: "none", display: "grid", gap: 9 }}>
                {section.bullets.map((b, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.6, color: C.muted }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: `${SECTION_TONE[section.kind]}14`,
                        color: SECTION_TONE[section.kind],
                        fontSize: 10.5,
                        fontWeight: 800,
                        display: "grid",
                        placeItems: "center",
                        marginTop: 2,
                      }}
                    >
                      {j + 1}
                    </span>
                    <span style={{ minWidth: 0 }}>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        ))}
      </div>

      {/* The official article index — the deeper read, honestly described. */}
      {article.officialUrl && (
        <a
          href={article.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: SP.md,
            marginTop: SP.lg,
            padding: `${SP.md}px ${SP.lg}px`,
            borderRadius: R.xl,
            border: `1px solid ${C.border}`,
            background: C.card2,
            textDecoration: "none",
          }}
        >
          <Icon name="exam" size={18} color={C.soft} />
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 13.5, fontWeight: 750, color: C.text }}>
              ACCA's own {article.paper} technical articles
            </span>
            <span style={{ display: "block", fontSize: 12, color: C.soft, marginTop: 2, lineHeight: 1.45 }}>
              The examining team's full library for this paper — worth a browse once you have the topic straight.
            </span>
          </span>
          <span style={{ fontSize: 11, fontWeight: 750, color: C.faint, flexShrink: 0 }}>accaglobal.com ↗</span>
        </a>
      )}

      {/* Completion */}
      <motion.button
        type="button"
        onClick={finish}
        whileHover={reduced ? undefined : { y: -2 }}
        whileTap={reduced ? undefined : { scale: 0.99 }}
        style={{
          width: "100%",
          marginTop: SP.lg,
          padding: "15px 20px",
          borderRadius: R.xl,
          border: "none",
          background: GRAD,
          color: "#fff",
          fontSize: 15,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: SHADOW.brand,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: SP.sm,
        }}
      >
        <Icon name="done" size={18} color="#fff" /> I've read this — finish today's plan
      </motion.button>
      <div style={{ fontSize: 11.5, color: C.faint, textAlign: "center", marginTop: SP.sm }}>
        {secondsRead < article.minutes * 30
          ? "Skimming is fine — the traps and the wording are the parts worth slowing down for."
          : "Marked as read. This is the last step of today's plan."}
      </div>
    </motion.div>
  )
}
