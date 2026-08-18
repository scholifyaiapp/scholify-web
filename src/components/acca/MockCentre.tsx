import { useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon, Card, Button, Badge, BackButton, C, SP, R, SHADOW, TYPE, type IconName } from "@/components/acca/ui"
import { RingGauge, TrendBars, StatCard, MeterBar, bandColor } from "@/components/acca/charts"
import { buildCbeMock, type CbeMock } from "@/lib/acca-cbe-mock"
import { MOCK_FORMS, nextMockForm } from "@/lib/acca-mockforms"
import { mockProgress, passProbability, MOCK_PASS, MOCKS_REQUIRED } from "@/lib/acca-loop"
import { getMockHistory, getPaper, getPaperStats, type MockResult, type AreaStat } from "@/lib/acca"
import { examBlueprint, type ExamBlueprint } from "@/lib/acca-exam-structure"
import { hasLiveSitting } from "@/lib/acca-mock-sitting"

/*
 * The Mock Exam Centre — the hub the sectioned CBE runner (CbeMockRunner) opens
 * from. One place to see where you stand across the three mock forms: your best
 * and average score against the 50% pass line, the trend of every sitting, the
 * exam-ready count (MOCKS_REQUIRED with the latest passed), and a card per form
 * showing its exact makeup and time so you can pick which one to sit. The gate
 * and paywall are checked before this opens (see AccaStudy.startSession), so
 * "Start" here goes straight into the exam.
 */

const fmtMins = (seconds: number) => `${Math.round(seconds / 60)} min`
const fmtDate = (iso: string) => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

export default function MockCentre({
  paperId,
  onBack,
  onStart,
  onStudyArea,
}: {
  paperId: string
  onBack: () => void
  onStart: (form: number) => void
  onStudyArea: (area: string) => void
}) {
  const paper = getPaper(paperId)
  const bp = examBlueprint(paperId)
  const reduced = useReducedMotion()
  const history = useMemo(() => getMockHistory(paperId), [paperId]) // most recent first
  const progress = useMemo(() => mockProgress(paperId), [paperId])
  const prob = passProbability(paperId)
  // The seen areas dragging the score, weakest first — where a mock's marks leak.
  const focusAreas = useMemo<AreaStat[]>(
    () =>
      getPaperStats(paperId)
        .areas.filter((a) => a.seen >= 3)
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 4),
    [paperId],
  )
  const forms = useMemo(
    () =>
      Array.from({ length: MOCK_FORMS }, (_, i) => {
        try {
          return buildCbeMock(paperId, i + 1)
        } catch {
          return null
        }
      }),
    [paperId],
  )
  const nextForm = nextMockForm(progress.attempts)

  const percents = history.map((h) => h.percent)
  const best = percents.length ? Math.max(...percents) : 0
  const avg = percents.length ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length) : 0
  const latest = history[0] ?? null
  const chronological = [...history].reverse().map((h) => ({ date: h.date, percent: h.percent }))
  const hasHistory = history.length > 0

  const bestForForm = (form: number): number | null => {
    const ps = history.filter((h) => h.form === form).map((h) => h.percent)
    return ps.length ? Math.max(...ps) : null
  }
  const attemptsForForm = (form: number): number => history.filter((h) => h.form === form).length

  const ringValue = hasHistory ? best : prob ?? 0
  const ringLabel = hasHistory ? "your best mock" : "exam readiness"

  return (
    <motion.div
      key="mockcentre"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: SP.xl, paddingBottom: SP["3xl"] }}
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: SP.sm }}>
        <BackButton onClick={onBack}>Study overview</BackButton>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="exam" size={17} color={C.brand} strokeWidth={2.4} />
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: "-0.02em", margin: 0 }}>Mock Exam Centre</h1>
          </div>
          <div style={{ ...TYPE.small, color: C.faint, marginTop: 3 }}>
            {paperId} · {paper?.name ?? "ACCA"}
            {bp ? ` — ${bp.durationMin} min · ${bp.sections.reduce((s, x) => s + x.marks, 0)} marks` : ""}
          </div>
        </div>
      </div>

      {/* ── Hero: standing + start ── */}
      <Card style={{ display: "grid", gridTemplateColumns: "minmax(0,auto) minmax(0,1fr)", gap: SP.xl, alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RingGauge value={ringValue} target={MOCK_PASS} label={ringLabel} sublabel={`pass line ${MOCK_PASS}%`} size={168} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: SP.md, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {progress.examReady ? (
              <Badge tone="green">
                <Icon name="done" size={11} strokeWidth={2.6} /> Exam-ready
              </Badge>
            ) : (
              <Badge tone="amber">
                {progress.passed}/{MOCKS_REQUIRED} mocks passed
              </Badge>
            )}
            {latest && (
              <Badge tone={latest.percent >= MOCK_PASS ? "green" : "neutral"}>
                Last: {latest.percent}%
              </Badge>
            )}
          </div>
          <p style={{ ...TYPE.body, color: C.muted, margin: 0, maxWidth: "48ch" }}>
            {hasHistory
              ? progress.examReady
                ? "You've sat the required mocks and your latest sitting passed. Keep them sharp — sit another form to stay exam-fit."
                : `Sit ${Math.max(0, MOCKS_REQUIRED - progress.attempts)} more and pass your latest to be exam-ready. Each mock is the full exam shape, on one clock, marked end to end.`
              : "A full rehearsal in the real CBE shape — Section A to C on one exam clock, with Charles marking your constructed answers into the score. Sit your first one when you're ready."}
          </p>
          <div style={{ display: "flex", gap: SP.sm, flexWrap: "wrap" }}>
            <Button variant="primary" icon="rocket" onClick={() => onStart(nextForm)}>
              {hasHistory ? `Start Mock — Form ${nextForm}` : "Sit your first mock"}
            </Button>
            {bp?.tutorNote && (
              <span style={{ ...TYPE.small, color: C.faint, alignSelf: "center", maxWidth: "40ch" }}>{bp.tutorNote}</span>
            )}
          </div>
        </div>
      </Card>

      {/* ── The real exam this rehearses ── */}
      {bp && <ExamBlueprintCard bp={bp} paperId={paperId} reduced={!!reduced} />}

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: SP.md }}>
        <StatCard index={0} icon="stats" label="Mocks sat" value={progress.attempts} suffix={`/${MOCKS_REQUIRED}`} footnote="required before exam day" />
        <StatCard index={1} icon="trophy" label="Best score" value={hasHistory ? best : "—"} suffix={hasHistory ? "%" : undefined} footnote={hasHistory ? `across ${history.length} sitting${history.length === 1 ? "" : "s"}` : "no mocks yet"} />
        <StatCard index={2} icon="progress" label="Average" value={hasHistory ? avg : "—"} suffix={hasHistory ? "%" : undefined} footnote={`pass line ${MOCK_PASS}%`} />
        <StatCard index={3} icon="shield" label="Passed" value={progress.passed} suffix={`/${history.length || 0}`} footnote={progress.latestPassed ? "latest was a pass" : hasHistory ? "latest not yet a pass" : "—"} />
      </div>

      {/* ── Trend ── */}
      {hasHistory && (
        <Card>
          <div style={{ ...TYPE.label, color: C.faint, marginBottom: SP.md, display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="progress" size={13} color={C.brand} strokeWidth={2.4} /> Your mock trend
          </div>
          <TrendBars points={chronological} passLine={MOCK_PASS} unit="score" />
        </Card>
      )}

      {/* ── Focus areas ── */}
      {focusAreas.length > 0 && (
        <div>
          <div style={{ ...TYPE.label, color: C.faint, marginBottom: SP.md, display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="weak" size={13} color={C.brand} strokeWidth={2.4} /> Where your marks leak — study these first
          </div>
          <Card style={{ display: "flex", flexDirection: "column", gap: SP.md }}>
            {focusAreas.map((a) => {
              const pct = Math.round(a.accuracy * 100)
              return (
                <div key={a.code} style={{ display: "flex", alignItems: "center", gap: SP.md }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 5 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        <b style={{ color: C.brand }}>{a.code}</b> · {a.label}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 800, color: bandColor(pct, MOCK_PASS), fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
                    </div>
                    <MeterBar value={pct} target={MOCK_PASS / 100} color={bandColor(pct, MOCK_PASS)} />
                  </div>
                  <Button variant="secondary" size="sm" trailingIcon="chevron" onClick={() => onStudyArea(a.code)}>Study</Button>
                </div>
              )
            })}
          </Card>
        </div>
      )}

      {/* ── Forms ── */}
      <div>
        <div style={{ ...TYPE.label, color: C.faint, marginBottom: 6, display: "flex", alignItems: "center", gap: 7 }}>
          <Icon name="topics" size={13} color={C.brand} strokeWidth={2.4} /> The three mock forms
        </div>
        {/*
         * Worth stating, because it is a promise the composer now actually keeps. The three
         * forms were independently drawn rather than partitioned, so a task could appear in
         * two of them — one appeared in all three. They are block-partitioned now, and a
         * test asserts no paper repeats an item across its forms.
         */}
        <p style={{ ...TYPE.small, color: C.faint, margin: `0 0 ${SP.md}px`, maxWidth: "62ch", lineHeight: 1.5 }}>
          Three separate sittings of the same exam shape. No question or task appears in more than one form, so
          sitting all three is {MOCK_FORMS} genuinely different papers.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: SP.md }}>
          {forms.map((mock, i) => {
            const form = i + 1
            return <FormCard key={form} form={form} mock={mock} isNext={form === nextForm} best={bestForForm(form)} attempts={attemptsForForm(form)} index={i} reduced={!!reduced} onStart={() => onStart(form)} />
          })}
        </div>
      </div>

      {/* ── History ── */}
      {hasHistory && (
        <div>
          <div style={{ ...TYPE.label, color: C.faint, marginBottom: SP.md, display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="calendar" size={13} color={C.brand} strokeWidth={2.4} /> Recent sittings
          </div>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            {history.slice(0, 8).map((h, i) => (
              <HistoryRow key={`${h.date}-${i}`} result={h} first={i === 0} />
            ))}
          </Card>
        </div>
      )}
    </motion.div>
  )
}

/*
 * THE REAL EXAM PANEL.
 *
 * The blueprint carried `providedInExam` and `cbeTools` from the day it was written and
 * nothing on this screen rendered either of them — they only appeared inside the runner,
 * which a candidate reaches AFTER committing to a sitting. So the one screen where you
 * choose a mock never told you what the real paper hands you or which CBE tools it expects
 * you to work in, and both change how you prepare: a paper with no formulae sheet has to be
 * revised differently from one that supplies it.
 *
 * Every figure here is measured against the OFFICIAL syllabus rather than a mock cover
 * sheet. That distinction matters: the founder's Kaplan mock papers print "3 hours and 15
 * minutes" on PM, AA and FM, but the current ACCA syllabus is explicit that PM, TX-UK, FR,
 * AA and FM are THREE-HOUR exams and only Strategic Professional runs to 3h15. The
 * blueprint follows ACCA.
 */
const TOOL_META: Record<string, { icon: IconName; label: string }> = {
  word: { icon: "notes", label: "Word processor" },
  spreadsheet: { icon: "sheet", label: "Spreadsheet" },
}

function ExamBlueprintCard({ bp, paperId, reduced }: { bp: ExamBlueprint; paperId: string; reduced: boolean }) {
  const totalMarks = bp.sections.reduce((sum, s) => sum + s.marks, 0)
  const hours = Math.floor(bp.durationMin / 60)
  const mins = bp.durationMin % 60
  const duration = `${hours}h${mins ? ` ${mins}m` : ""}`

  return (
    <div>
      <div style={{ ...TYPE.label, color: C.faint, marginBottom: SP.md, display: "flex", alignItems: "center", gap: 7 }}>
        <Icon name="exam" size={13} color={C.brand} strokeWidth={2.4} /> The real {paperId} exam — what each mock rehearses
      </div>
      <Card style={{ display: "flex", flexDirection: "column", gap: SP.lg }}>
        {/* Headline facts */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: SP.md }}>
          {[
            { icon: "time" as IconName, value: duration, label: "on the clock" },
            { icon: "exam" as IconName, value: String(totalMarks), label: "marks" },
            { icon: "shield" as IconName, value: `${MOCK_PASS}%`, label: "to pass" },
            { icon: "topics" as IconName, value: String(bp.sections.length), label: bp.sections.length === 1 ? "section" : "sections" },
          ].map((f) => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <div style={{ width: 30, height: 30, borderRadius: R.md, display: "grid", placeItems: "center", background: C.brandSoft, flexShrink: 0 }}>
                <Icon name={f.icon} size={14} color={C.brand} strokeWidth={2.4} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums", lineHeight: 1.2 }}>{f.value}</div>
                <div style={{ ...TYPE.small, color: C.faint, lineHeight: 1.3 }}>{f.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/*
         * Proportional weighting bar. A candidate reading "30 / 30 / 40" does not feel the
         * shape of the paper; seeing Section C take almost half of it does. Marks are the
         * only input, so the bar cannot drift from the section list beneath it.
         */}
        <div style={{ display: "flex", gap: 3, height: 8, borderRadius: 999, overflow: "hidden" }} aria-hidden>
          {bp.sections.map((s, i) => (
            <motion.div
              key={s.id}
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flex: s.marks,
                background: i === 0 ? C.brand : i === 1 ? "rgba(200,0,0,0.55)" : "rgba(200,0,0,0.28)",
                transformOrigin: "left",
                borderRadius: 999,
              }}
            />
          ))}
        </div>

        {/* Section-by-section makeup */}
        <div style={{ display: "flex", flexDirection: "column", gap: SP.sm }}>
          {bp.sections.map((s, i) => (
            <motion.div
              key={s.id}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.06 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", alignItems: "flex-start", gap: SP.md, minWidth: 0 }}
            >
              <div
                style={{
                  width: 24, height: 24, borderRadius: R.sm, flexShrink: 0, display: "grid", placeItems: "center",
                  background: C.card2, color: C.muted, fontWeight: 800, fontSize: 12,
                }}
              >
                {s.id}
              </div>
              <span style={{ ...TYPE.small, color: C.muted, flex: 1, minWidth: 0, lineHeight: 1.5 }}>{s.makeup}</span>
              <span style={{ ...TYPE.small, fontWeight: 800, color: C.text, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                {s.marks} marks
              </span>
            </motion.div>
          ))}
        </div>

        {/* What the exam gives you, and what you work in */}
        {(bp.providedInExam || bp.cbeTools.length > 0) && (
          <div style={{ display: "flex", flexDirection: "column", gap: SP.sm, paddingTop: SP.md, borderTop: `1px solid ${C.hairline}` }}>
            {bp.providedInExam && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Icon name="formula" size={13} color={C.green} strokeWidth={2.4} style={{ marginTop: 2 }} />
                <span style={{ ...TYPE.small, color: C.muted, lineHeight: 1.5 }}>
                  <b style={{ color: C.text }}>Provided in the exam:</b> {bp.providedInExam}
                </span>
              </div>
            )}
            {bp.cbeTools.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ ...TYPE.small, color: C.muted }}>
                  <b style={{ color: C.text }}>You answer in:</b>
                </span>
                {bp.cbeTools.map((tool) => {
                  const meta = TOOL_META[tool] ?? { icon: "notes" as IconName, label: tool }
                  return (
                    <span
                      key={tool}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px",
                        borderRadius: 999, background: C.card2, border: `1px solid ${C.hairline}`,
                        ...TYPE.small, color: C.muted, fontWeight: 600,
                      }}
                    >
                      <Icon name={meta.icon} size={12} color={C.soft} strokeWidth={2.4} /> {meta.label}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

function FormCard({
  form,
  mock,
  isNext,
  best,
  attempts,
  index,
  reduced,
  onStart,
}: {
  form: number
  mock: CbeMock | null
  isNext: boolean
  best: number | null
  attempts: number
  index: number
  reduced: boolean
  onStart: () => void
}) {
  const marks = mock?.totalMarks ?? 100
  const live = mock ? hasLiveSitting(mock.paperId, form) : false
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.card,
        border: `1px solid ${isNext ? C.brandLine : C.border}`,
        borderRadius: R["2xl"],
        boxShadow: isNext ? SHADOW.md : SHADOW.sm,
        padding: SP.lg,
        display: "flex",
        flexDirection: "column",
        gap: SP.md,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 30, height: 30, borderRadius: R.md, display: "grid", placeItems: "center",
              background: C.brandSoft, color: C.brand, fontWeight: 800, fontSize: 14,
            }}
          >
            {form}
          </div>
          <span style={{ fontWeight: 800, color: C.text, fontSize: 15 }}>Form {form}</span>
        </div>
        {isNext ? <Badge tone="brand">Next up</Badge> : attempts > 0 ? <Badge tone="neutral">{attempts}×</Badge> : null}
      </div>

      {mock ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {mock.sections.map((s) => (
            <div key={s.id} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
              <span style={{ ...TYPE.small, color: C.soft, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                <b style={{ color: C.muted }}>{s.id}</b> · {s.label}
              </span>
              <span style={{ ...TYPE.small, color: C.faint, fontWeight: 700, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{s.marks}</span>
            </div>
          ))}
        </div>
      ) : (
        <span style={{ ...TYPE.small, color: C.faint }}>Preparing this form…</span>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto", paddingTop: SP.sm, borderTop: `1px solid ${C.hairline}` }}>
        <span style={{ ...TYPE.small, color: C.faint, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Icon name="exam" size={12} color={C.faint} strokeWidth={2.4} /> {marks} marks
        </span>
        {mock && (
          <span style={{ ...TYPE.small, color: C.faint, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="time" size={12} color={C.faint} strokeWidth={2.4} /> {fmtMins(mock.seconds)}
          </span>
        )}
        {best != null && (
          <span style={{ ...TYPE.small, fontWeight: 800, color: bandColor(best, MOCK_PASS), marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>
            best {best}%
          </span>
        )}
      </div>

      {/*
       * A live saved sitting means the learner left this form mid-exam — the
       * runner will restore their answers with the clock still honest, so the
       * button must promise exactly that. "Start" over a resumable sitting
       * reads like starting over, which is the fear that stops people
       * returning at all.
       */}
      {live && (
        <Badge tone="amber">
          <Icon name="time" size={11} strokeWidth={2.6} /> In progress — clock running
        </Badge>
      )}
      <Button variant={isNext || live ? "primary" : "secondary"} size="sm" full trailingIcon="chevron" onClick={onStart}>
        {live ? "Resume" : attempts > 0 ? "Resit" : "Start"} Form {form}
      </Button>
    </motion.div>
  )
}

function HistoryRow({ result, first }: { result: MockResult; first: boolean }) {
  const passed = result.percent >= MOCK_PASS
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: SP.md, padding: `${SP.md}px ${SP.lg}px`,
        borderTop: first ? "none" : `1px solid ${C.hairline}`,
      }}
    >
      <div
        style={{
          width: 34, height: 34, borderRadius: R.md, flexShrink: 0, display: "grid", placeItems: "center",
          background: passed ? C.greenSoft : C.card2, color: passed ? C.green : C.soft,
        }}
      >
        <Icon name={passed ? "done" : "reflect"} size={16} strokeWidth={2.4} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontWeight: 700, color: C.text, fontSize: 13.5 }}>
          {result.form ? `Form ${result.form}` : "Mock"} · {result.correct}/{result.total} marks
        </div>
        <div style={{ ...TYPE.small, color: C.faint }}>{fmtDate(result.date)}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: SP.md, flexShrink: 0 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: bandColor(result.percent, MOCK_PASS), fontVariantNumeric: "tabular-nums" }}>
          {result.percent}%
        </span>
        <Badge tone={passed ? "green" : "neutral"}>{passed ? "Pass" : "Below"}</Badge>
      </div>
    </div>
  )
}
