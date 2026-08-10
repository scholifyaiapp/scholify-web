import { useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { C, R, SP, SHADOW, GRAD, Icon, IconBadge, type IconName } from "@/components/acca/ui"
import { MeterBar } from "@/components/acca/charts"
import { getPaper, getPaperStats, getQuestionStats, getPracticeInventory, getQuestions } from "@/lib/acca"
import { chaptersForPaper, chapterKey, type StudyChapter } from "@/lib/acca-study-content"
import { chapterHardness, chaptersRead, isChapterRead, chapterMinutes } from "@/lib/acca-topic-plan"
import { poolHealth } from "@/lib/acca-no-repeat"
import { flashcardStats } from "@/lib/acca-flashcards"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { getFlashcards } from "@/lib/acca-flashcards"

/*
 * ── PRACTICE, benchmarked against the ACCA Study Hub ──────────────
 *
 * WHAT WAS HERE. Five numbered "categories" (topic learning, quizzes, daily
 * practice, flashcards, official resources) each holding one or two generic mode
 * tiles: "Practice · 8 questions", "Target my pain points", "Custom practice".
 * Everything was paper-wide. Nothing was indexed by chapter, so a learner who
 * wanted to drill the one topic they had just failed had no way to ask for it, and
 * nothing showed how much of the bank they had actually worked through.
 *
 * WHAT THE STUDY HUB DOES, and this now does:
 *
 *   · A CHAPTER INDEX is the primary navigation. Every chapter is a row with its
 *     own state: read / not read, questions attempted out of available, accuracy,
 *     and its own two actions — read it, or test yourself on it.
 *   · PER-CHAPTER "TEST YOURSELF". The Hub's defining feature: questions indexed
 *     to the chapter, not the area. Our bank already carries `chapter` ids, so
 *     this was available all along and simply had no surface.
 *   · PROGRESS PER AREA, visible while you navigate — the Hub shows completion as
 *     you go rather than hiding it in a separate report.
 *   · THE EXAM SHAPE as a separate, explicit section: Section A / B / C practised
 *     in the real proportions, then full mocks. The Hub keeps "learn" and "exam
 *     practice" apart, and it is right to: they are different activities.
 *
 * What we add on top, because the Hub does not have it: bank coverage (how much of
 * the question bank is still unseen — see acca-no-repeat), adaptive weak-area
 * drilling, and AI-generated practice for topics the bank thins out on.
 */

/** What each official section actually is, in a learner's words. */
const SECTION_KIND_LABEL: Record<"ot" | "otcase" | "constructed", string> = {
  ot: "Objective tests",
  otcase: "Multi-task / case",
  constructed: "Constructed response",
}

export interface PracticeHubProps {
  paperId: string
  isPro: boolean
  /** Open a chapter in the reader. */
  onStudyChapter: (chapterKey: string, area: string) => void
  /** Test yourself on one chapter — questions indexed to it. */
  onTestChapter: (chapterKey: string, area: string, count: number) => void
  /** Drill one syllabus area. */
  onArea: (area: string) => void
  /** Adaptive drill on measured weak areas. */
  onWeak: () => void
  /** One official exam section. */
  onSection: (section: "A" | "B" | "C") => void
  onBankRun: (size?: number) => void
  onMock: () => void
  onExaminer: () => void
  onGenerate: () => void
  onFlashcards: (area?: string) => void
}

interface ChapterRow {
  chapter: StudyChapter
  key: string
  read: boolean
  /** Questions in the bank indexed to this chapter (or its area as fallback). */
  available: number
  attempted: number
  correct: number
  /** True when the count came from the area rather than the chapter index. */
  areaScoped: boolean
  minutes: number
}

export function PracticeHub(props: PracticeHubProps) {
  const { paperId } = props
  const reduced = useReducedMotion()
  const paper = getPaper(paperId)
  const stats = getPaperStats(paperId)
  const [openArea, setOpenArea] = useState<string | null>(null)

  /*
   * The chapter index, with each row's real numbers. Built once per paper: it
   * walks the whole bank, and the bank is thousands of items on a mature paper.
   */
  const index = useMemo(() => {
    const chapters = chaptersForPaper(paperId)
    const inventory = getPracticeInventory(paperId)
    const qStats = getQuestionStats(paperId)
    const read = chaptersRead(paperId)

    const byChapter = new Map<string, typeof inventory>()
    const byArea = new Map<string, typeof inventory>()
    for (const q of inventory) {
      if (q.chapter) {
        const list = byChapter.get(q.chapter) ?? []
        list.push(q)
        byChapter.set(q.chapter, list)
      }
      const areaList = byArea.get(q.area) ?? []
      areaList.push(q)
      byArea.set(q.area, areaList)
    }

    const rows: ChapterRow[] = chapters.map((chapter) => {
      const key = chapterKey(chapter)
      const own = byChapter.get(key) ?? []
      // A chapter with fewer than three of its own indexed questions reports its
      // AREA's pool instead, flagged, rather than showing a misleading "2".
      const areaScoped = own.length < 3
      const pool = areaScoped ? byArea.get(chapter.area) ?? [] : own
      let attempted = 0
      let correct = 0
      for (const q of pool) {
        const s = qStats[q.id]
        if (s && s.attempts > 0) {
          attempted += 1
          correct += s.correct > 0 ? 1 : 0
        }
      }
      return {
        chapter,
        key,
        read: Boolean(read[key]),
        available: pool.length,
        attempted,
        correct,
        areaScoped,
        minutes: chapterMinutes(paperId, chapter),
      }
    })

    const areas = (paper?.areas ?? []).map((area) => {
      const chapterRows = rows.filter((r) => r.chapter.area === area.code)
      const readCount = chapterRows.filter((r) => r.read).length
      const attempted = chapterRows.reduce((n, r) => n + r.attempted, 0)
      const available = chapterRows.reduce((n, r) => n + r.available, 0)
      const stat = stats.areas.find((a) => a.code === area.code)
      return {
        code: area.code,
        label: area.label,
        rows: chapterRows,
        readCount,
        attempted,
        available,
        accuracy: stat && stat.seen >= 2 ? stat.accuracy : null,
        percent: chapterRows.length ? Math.round((readCount / chapterRows.length) * 100) : 0,
      }
    })

    return { rows, areas }
  }, [paperId, paper, stats])

  const bank = poolHealth(paperId, "practice", getQuestions(paperId).length)
  const cards = flashcardStats(paperId)
  const blueprint = examBlueprint(paperId)

  // Open the first area with unread chapters on mount, so the learner lands
  // somewhere useful instead of on a wall of collapsed rows.
  const defaultArea = useMemo(
    () => index.areas.find((a) => a.rows.some((r) => !r.read))?.code ?? index.areas[0]?.code ?? null,
    [index.areas],
  )
  const expanded = openArea ?? defaultArea

  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* ── Bank coverage: the number the Study Hub never shows you ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: SP.md,
          marginBottom: SP.lg,
        }}
      >
        <MiniStat
          icon="check"
          label="Bank worked through"
          value={`${bank.served}/${bank.total}`}
          foot={bank.cycle > 0 ? `Cycle ${bank.cycle + 1} — a full pass done` : `${bank.fresh} questions you've never seen`}
          percent={bank.percent}
        />
        <MiniStat
          icon="learn"
          label="Chapters read"
          value={`${index.rows.filter((r) => r.read).length}/${index.rows.length}`}
          foot="Study text, in reading order"
          percent={index.rows.length ? Math.round((index.rows.filter((r) => r.read).length / index.rows.length) * 100) : 0}
        />
        <MiniStat
          icon="flashcards"
          label="Flashcards"
          value={cards.total ? `${cards.mastered}/${cards.total}` : "—"}
          foot={cards.due > 0 ? `${cards.due} due right now` : "Nothing due — all warm"}
          percent={cards.total ? Math.round((cards.mastered / cards.total) * 100) : 0}
        />
      </div>

      {/* ── The chapter index ── */}
      <SubHead icon="topics" right={`${index.areas.length} areas · ${index.rows.length} chapters`}>
        Study &amp; test by chapter
      </SubHead>
      <p style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.6, margin: `0 0 ${SP.md}px` }}>
        Every chapter, with the questions indexed to it — read it, then test yourself on that chapter alone. This is how
        the approved-provider exam kits are organised, and it is the only way to drill the one topic you got wrong
        without wading through the whole paper.
      </p>

      <div style={{ display: "grid", gap: SP.sm, marginBottom: SP.xl }}>
        {index.areas.map((area) => {
          const on = expanded === area.code
          return (
            <div key={area.code} style={{ borderRadius: R.xl, border: `1px solid ${C.border}`, background: C.card, overflow: "hidden" }}>
              <button
                onClick={() => setOpenArea(on ? "__none__" : area.code)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: SP.md,
                  padding: `${SP.md}px ${SP.lg}px`,
                  background: on ? C.card2 : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: R.sm,
                    background: area.percent === 100 ? C.greenSoft : C.card2,
                    color: area.percent === 100 ? C.green : C.brand,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 13.5,
                    fontWeight: 850,
                    flexShrink: 0,
                  }}
                >
                  {area.code}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 750, color: C.text, lineHeight: 1.3 }}>{area.label}</span>
                  <span style={{ display: "block", fontSize: 11.5, color: C.soft, marginTop: 2 }}>
                    {area.readCount}/{area.rows.length} chapters · {area.attempted}/{area.available} questions
                    {area.accuracy !== null ? ` · ${Math.round(area.accuracy * 100)}% accuracy` : ""}
                  </span>
                </span>
                <span style={{ width: 54, flexShrink: 0 }}>
                  <MeterBar value={area.percent} color={area.percent === 100 ? C.green : C.brand} height={5} />
                </span>
                <motion.span animate={{ rotate: on ? 90 : 0 }} transition={{ duration: 0.2 }} style={{ display: "grid", flexShrink: 0 }}>
                  <Icon name="chevron" size={16} color={C.faint} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: `0 ${SP.md}px ${SP.md}px`, display: "grid", gap: 6 }}>
                      {area.rows.length === 0 && (
                        <div style={{ padding: SP.md, fontSize: 12.5, color: C.soft, lineHeight: 1.55 }}>
                          No study chapters authored for this area yet — practise it by area below, or generate custom
                          questions on it.
                        </div>
                      )}
                      {area.rows.map((row, i) => (
                        <ChapterIndexRow
                          key={row.key}
                          row={row}
                          index={i}
                          reduced={Boolean(reduced)}
                          onStudy={() => props.onStudyChapter(row.key, row.chapter.area)}
                          onTest={() => props.onTestChapter(row.key, row.chapter.area, Math.min(10, Math.max(5, row.available)))}
                        />
                      ))}
                      {area.rows.length > 0 && (
                        <div style={{ display: "flex", gap: SP.sm, marginTop: 4, flexWrap: "wrap" }}>
                          <TinyAction icon="practice" label={`Drill all of area ${area.code}`} onClick={() => props.onArea(area.code)} />
                          <TinyAction icon="flashcards" label={`Flashcards · ${area.code}`} onClick={() => props.onFlashcards(area.code)} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* ── Targeted drilling ── */}
      <SubHead icon="weak">Targeted drilling</SubHead>
      <div style={{ display: "grid", gap: SP.sm, marginBottom: SP.xl }}>
        <ActionTile
          icon="weak"
          title="Drill my weakest areas"
          sub="Adaptive: the engine ranks every question by how much it would move YOUR score right now — weak areas first, difficulty matched, nothing you've just answered"
          onClick={props.onWeak}
          disabled={stats.answered < 5}
          disabledNote="Answer a few questions first so there's a weakness to target"
        />
        <ActionTile
          icon="generate"
          title="Custom practice with Charles"
          sub="Fresh questions on any topic, or generated from your own notes — for the corners of the syllabus where the bank is thin"
          onClick={props.onGenerate}
          locked={!props.isPro}
        />
      </div>

      {/* ── Exam practice, kept separate on purpose ── */}
      <SubHead icon="mock" right={blueprint ? `${blueprint.durationMin} min · ${blueprint.sections.length} sections` : undefined}>
        Exam practice
      </SubHead>
      <p style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.6, margin: `0 0 ${SP.md}px` }}>
        Learning a topic and sitting an exam are different skills. Practise the real sections in their real proportions
        first, then whole papers under the clock.
      </p>
      <div style={{ display: "grid", gap: SP.sm, marginBottom: SP.lg }}>
        {(blueprint?.sections ?? []).map((section) => (
          <ActionTile
            key={section.id}
            icon="practice"
            title={`Section ${section.id} · ${SECTION_KIND_LABEL[section.kind]} · ${section.marks} marks`}
            sub={`${section.makeup} — practised in the exact shape the CBE uses`}
            onClick={() => props.onSection(section.id)}
            locked={section.kind === "constructed" && !props.isPro}
          />
        ))}
        <ActionTile icon="check" title="Mixed bank run · 50 questions" sub="Whole syllabus, mixed difficulty, against the clock — this is what builds exam pace" onClick={() => props.onBankRun()} />
        <ActionTile icon="mock" title="Full CBE mock" sub="Every section, one clock, the navigator and flag-for-review — the closest thing to exam day" onClick={props.onMock} locked={!props.isPro} />
        {!getPaper(paperId)?.objectiveOnly && (
          <ActionTile icon="examiner" title="Constructed-response studio" sub="Word processor, spreadsheet, exam clock — and Charles marking your answer against the examiner's guide" onClick={props.onExaminer} locked={!props.isPro} />
        )}
      </div>
    </motion.div>
  )
}

/* ── One chapter row ──────────────────────────────────────────────*/

function ChapterIndexRow({
  row,
  index,
  reduced,
  onStudy,
  onTest,
}: {
  row: ChapterRow
  index: number
  reduced: boolean
  onStudy: () => void
  onTest: () => void
}) {
  const hard = chapterHardness(row.chapter)
  const accuracy = row.attempted > 0 ? Math.round((row.correct / row.attempted) * 100) : null
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 8) * 0.03, duration: 0.25 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: SP.md,
        padding: `${SP.sm}px ${SP.md}px`,
        borderRadius: R.md,
        background: C.bg,
        border: `1px solid ${C.hairline}`,
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          background: row.read ? C.greenSoft : C.card2,
          color: row.read ? C.green : C.faint,
          fontSize: 11,
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {row.read ? <Icon name="done" size={14} color={C.green} /> : (row.chapter.number ?? index + 1)}
      </span>

      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 13.5, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{row.chapter.title}</span>
        <span style={{ display: "block", fontSize: 11, color: C.soft, marginTop: 2 }}>
          {row.minutes} min · {hard.label}
          {row.available > 0 && ` · ${row.attempted}/${row.available} questions${row.areaScoped ? " (area)" : ""}`}
          {accuracy !== null && ` · ${accuracy}%`}
        </span>
      </span>

      <span style={{ display: "flex", gap: 5, flexShrink: 0 }}>
        <IconAction icon="learn" title={row.read ? "Re-read" : "Read"} onClick={onStudy} tone={row.read ? "neutral" : "brand"} />
        {row.available >= 3 && <IconAction icon="mission" title="Test yourself" onClick={onTest} tone="neutral" />}
      </span>
    </motion.div>
  )
}

/* ── Small parts ──────────────────────────────────────────────────*/

function MiniStat({ icon, label, value, foot, percent }: { icon: IconName; label: string; value: string; foot: string; percent: number }) {
  return (
    <div style={{ borderRadius: R.xl, border: `1px solid ${C.border}`, background: C.card, padding: SP.lg }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <Icon name={icon} size={14} color={C.faint} />
        <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em", color: C.faint, textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ fontSize: 21, fontWeight: 850, color: C.text, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>{value}</div>
      <MeterBar value={percent} color={C.brand} height={5} style={{ marginTop: 9 }} />
      <div style={{ fontSize: 11.5, color: C.soft, marginTop: 8, lineHeight: 1.45 }}>{foot}</div>
    </div>
  )
}

function SubHead({ icon, right, children }: { icon: IconName; right?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, margin: `0 0 ${SP.sm}px` }}>
      <Icon name={icon} size={15} color={C.brand} />
      <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.soft }}>{children}</span>
      {right && <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, color: C.faint }}>{right}</span>}
    </div>
  )
}

function IconAction({ icon, title, onClick, tone }: { icon: IconName; title: string; onClick: () => void; tone: "brand" | "neutral" }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      whileTap={{ scale: 0.94 }}
      style={{
        width: 32,
        height: 32,
        borderRadius: R.sm,
        border: `1px solid ${tone === "brand" ? C.brandLine : C.border}`,
        background: tone === "brand" ? C.brandSoft : C.card,
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Icon name={icon} size={15} color={tone === "brand" ? C.brand : C.soft} />
    </motion.button>
  )
}

function TinyAction({ icon, label, onClick }: { icon: IconName; label: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 12px",
        borderRadius: R.pill,
        border: `1px solid ${C.border}`,
        background: C.card,
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 750,
        color: C.muted,
      }}
    >
      <Icon name={icon} size={13} color={C.soft} /> {label}
    </motion.button>
  )
}

function ActionTile({
  icon,
  title,
  sub,
  onClick,
  locked,
  disabled,
  disabledNote,
}: {
  icon: IconName
  title: string
  sub: string
  onClick: () => void
  locked?: boolean
  disabled?: boolean
  disabledNote?: string
}) {
  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.995 }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: SP.md,
        padding: `${SP.md}px ${SP.lg}px`,
        borderRadius: R.xl,
        border: `1px solid ${C.border}`,
        background: C.card,
        cursor: disabled ? "default" : "pointer",
        textAlign: "left",
        opacity: disabled ? 0.6 : 1,
        boxShadow: SHADOW.sm,
      }}
    >
      <IconBadge name={icon} tone="neutral" size={38} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, fontWeight: 750, color: C.text }}>{title}</span>
          {locked && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", color: C.amber, background: C.amberSoft, padding: "3px 7px", borderRadius: R.pill }}>
              <Icon name="lock" size={9} color={C.amber} /> PRO
            </span>
          )}
        </span>
        <span style={{ display: "block", fontSize: 12.5, color: C.soft, marginTop: 3, lineHeight: 1.5 }}>
          {disabled && disabledNote ? disabledNote : sub}
        </span>
      </span>
      <Icon name="chevron" size={16} color={C.faint} />
    </motion.button>
  )
}
