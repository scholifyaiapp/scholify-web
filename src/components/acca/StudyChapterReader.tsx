import { useRef, useState, type ReactNode } from "react"
import { motion, AnimatePresence, useScroll, useReducedMotion } from "motion/react"
import { Icon, C, R } from "@/components/acca/ui"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { StudyDiagram } from "@/components/acca/StudyDiagram"
import { TaxBasisNote } from "@/components/acca/TaxBasisNote"
import type { StudyChapter, StudyBlock, StudySection, MiniCheck } from "@/lib/acca-study-content"
import type { StudyGate } from "@/lib/acca-block-gate"

/*
 * StudyChapterReader — the rich, Kaplan/BPP-depth study experience. Renders a
 * StudyChapter as a premium article: a sticky scroll-progress bar, animated
 * blocks, interactive diagrams and charts, worked-example steppers, inline
 * knowledge checks, a flip-card glossary and exam traps. ACCA light palette,
 * tasteful CSS/SVG depth. Built entirely on the design system.
 */

const TONE: Record<string, { fg: string; bg: string; label: string; icon: string }> = {
  key: { fg: C.brand, bg: `${C.brand}0e`, label: "Key idea", icon: "◆" },
  warn: { fg: C.amber, bg: `${C.amber}12`, label: "Watch out", icon: "▲" },
  rule: { fg: "#7C6BD6", bg: "#7C6BD612", label: "The rule", icon: "§" },
  tip: { fg: C.green, bg: `${C.green}10`, label: "Exam tip", icon: "✓" },
}

/** Split a paragraph on **bold** and render the spans. */
function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} style={{ fontWeight: 800, color: C.text }}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  )
}

export function StudyChapterReader({ chapter, onBack, onPractice, gate }: {
  chapter: StudyChapter
  onBack: () => void
  onPractice: () => void
  /** Reading clock for today's study block; omitted when this chapter is not it. */
  gate?: StudyGate
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <div ref={ref} style={{ maxWidth: 760, margin: "0 auto" }}>
      {/* sticky scroll progress */}
      <div style={{ position: "sticky", top: 0, zIndex: 5, height: 3, background: C.card2, borderRadius: 99, marginBottom: 18 }}>
        <motion.div style={{ transformOrigin: "left", scaleX: scrollYProgress, height: "100%", background: C.brand, borderRadius: 99 }} />
      </div>

      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.muted, fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 14 }}>← Back to the topic</button>

      {/* hero */}
      <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.brand }}>
        {chapter.paper}
        {chapter.number != null && ` · Chapter ${chapter.number}`}
        {" · Area "}{chapter.area} · {chapter.minutes} min
      </div>
      <h1 style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, margin: "8px 0 8px", lineHeight: 1.2 }}>{chapter.title}</h1>
      <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.6, margin: "0 0 18px" }}>{chapter.intro}</p>

      {/* which official study-guide outcomes this chapter actually delivers */}
      {chapter.syllabusRefs && chapter.syllabusRefs.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, margin: "0 0 18px" }}>
          <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: C.faint, marginRight: 2 }}>Syllabus</span>
          {chapter.syllabusRefs.map((ref) => (
            <span key={ref} style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, fontWeight: 700, color: C.muted, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 6, padding: "2px 7px" }}>{ref}</span>
          ))}
        </div>
      )}

      {/* honest Finance Act basis for TX/ATX chapters (null otherwise) */}
      <TaxBasisNote paperId={chapter.paper} />

      {/* outcomes */}
      <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 14, padding: "15px 17px", marginBottom: 26 }}>
        <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted, marginBottom: 9 }}>By the end you can</div>
        <div style={{ display: "grid", gap: 7 }}>
          {chapter.outcomes.map((o, i) => (
            <div key={i} style={{ display: "flex", gap: 9, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              <span style={{ flex: "none", width: 18, height: 18, borderRadius: 6, background: C.brandSoft, color: C.brand, fontSize: 11, fontWeight: 800, display: "grid", placeItems: "center" }}>{i + 1}</span>
              <span>{o}</span>
            </div>
          ))}
        </div>
      </div>

      {/* sections */}
      {chapter.sections.map((sec, i) => <Section key={sec.id} section={sec} index={i} />)}

      {/* exam traps */}
      {chapter.examTraps.length > 0 && (
        <section style={{ marginTop: 34 }}>
          <SectionHeading icon="diagnostic" text="Exam traps" />
          <div style={{ display: "grid", gap: 10 }}>
            {chapter.examTraps.map((t, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr", gap: 6, background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, borderRadius: 11, padding: "12px 14px" }}>
                <div style={{ fontSize: 12.5, color: C.muted }}><span style={{ fontWeight: 800, color: C.amber }}>Trap · </span>{t.trap}</div>
                <div style={{ fontSize: 12.5, color: C.muted }}><span style={{ fontWeight: 800, color: C.green }}>Fix · </span>{t.fix}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* key terms — flip cards */}
      {chapter.keyTerms.length > 0 && (
        <section style={{ marginTop: 34 }}>
          <SectionHeading icon="topics" text="Key terms — tap to flip" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
            {chapter.keyTerms.map((t, i) => <FlipCard key={i} term={t.term} def={t.def} />)}
          </div>
        </section>
      )}

      {/* summary */}
      <section style={{ marginTop: 34 }}>
        <SectionHeading icon="celebrate" text="In a nutshell" />
        <div style={{ background: `linear-gradient(135deg, ${C.brandSoft}, ${C.card2})`, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px 18px" }}>
          <div style={{ display: "grid", gap: 8 }}>
            {chapter.summary.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 9, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
                <span style={{ color: C.brand, fontWeight: 800 }}>›</span><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* knowledge diagnostic — the chapter-end "did it land?" pass */}
      {chapter.knowledgeDiagnostic && chapter.knowledgeDiagnostic.length > 0 && (
        <section style={{ marginTop: 34 }}>
          <SectionHeading icon="check" text="Knowledge diagnostic" />
          <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.55, margin: "-6px 0 12px" }}>
            Answer each one out loud before you tap it. Anything you cannot answer is a section to re-read, not a question to guess.
          </p>
          <div style={{ display: "grid", gap: 8 }}>
            {chapter.knowledgeDiagnostic.map((item, i) => <DiagnosticRow key={i} index={i} q={item.q} a={item.a} />)}
          </div>
        </section>
      )}

      {/* where this chapter leads */}
      {chapter.furtherStudy && chapter.furtherStudy.length > 0 && (
        <section style={{ marginTop: 30 }}>
          <SectionHeading icon="topics" text="Where this leads" />
          <div style={{ display: "grid", gap: 7 }}>
            {chapter.furtherStudy.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 9, fontSize: 13, color: C.muted, lineHeight: 1.55 }}>
                <span style={{ color: C.brand, fontWeight: 800 }}>→</span><span>{rich(item)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/*
        CTA into practice — held until the reading time has actually been served.

        This button used to complete the lesson on contact, so scrolling to the
        bottom and pressing it took about eight seconds and recorded the chapter
        as studied. The gate is a MINIMUM that catches skipping, not a stopwatch:
        two-thirds of the minutes the plan set aside, and the ring shows exactly
        how much of it is left, because a button that refuses without saying why
        reads as broken.
      */}
      {gate && !gate.met ? (
        <div
          style={{ width: "100%", marginTop: 26, padding: "14px 18px", borderRadius: 14, border: `1px solid ${C.border}`, background: C.card2, display: "flex", alignItems: "center", gap: 13 }}
          aria-live="polite"
        >
          <svg viewBox="0 0 44 44" width="40" height="40" style={{ flex: "none", transform: "rotate(-90deg)" }} aria-hidden>
            <circle cx="22" cy="22" r="18" fill="none" stroke={C.border} strokeWidth="4" />
            <circle
              cx="22" cy="22" r="18" fill="none" stroke={C.brand} strokeWidth="4" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 * (1 - gate.fraction)}
              style={{ transition: "stroke-dashoffset 500ms linear" }}
            />
          </svg>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: C.text }}>
              {Math.ceil(gate.remaining / 60)} more {Math.ceil(gate.remaining / 60) === 1 ? "minute" : "minutes"} on this chapter
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.45 }}>
              Then the quizzes open. Read it properly — five questions on this chapter are next, and they are marked.
            </div>
          </div>
        </div>
      ) : (
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} onClick={onPractice}
          style={{ width: "100%", marginTop: 26, padding: "15px 24px", borderRadius: 14, border: "none", background: C.brand, color: "#fff", fontWeight: 800, fontSize: 15.5, cursor: "pointer", boxShadow: `0 14px 28px -12px ${C.brand}88` }}>
          Complete lesson — unlock 5 Quizzes →
        </motion.button>
      )}
    </div>
  )
}

function SectionHeading({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
      <span style={{ width: 26, height: 26, borderRadius: 8, background: C.brandSoft, display: "grid", placeItems: "center" }}>
        <Icon name={icon as never} size={14} color={C.brand} />
      </span>
      <h2 style={{ fontSize: 16.5, fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.01em" }}>{text}</h2>
    </div>
  )
}

function Section({ section, index }: { section: StudySection; index: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.section
      initial={reduce ? {} : { opacity: 0, y: 12 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: index === 0 ? 8 : 30 }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, fontWeight: 800, color: C.brand }}>{String(index + 1).padStart(2, "0")}</span>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.25 }}>{section.heading}</h2>
      </div>
      {/*
        Per-block boundary. The renderer casts block/diagram data and a single
        malformed block (a future paper's diagram whose data shape doesn't match
        its type, a ragged table) would otherwise throw during render and take
        the WHOLE chapter down to the page-level boundary. Isolated here, one bad
        block degrades to a small notice and the rest of the chapter still reads.
      */}
      {section.blocks.map((b, i) => (
        <ErrorBoundary
          key={i}
          pageName="study-block"
          fallback={<div style={{ fontSize: 12.5, color: C.faint, padding: "6px 0", fontStyle: "italic" }}>This part of the chapter couldn't be shown.</div>}
        >
          <Block block={b} />
        </ErrorBoundary>
      ))}
      {section.check && (
        <ErrorBoundary pageName="study-check" fallback={null}>
          <CheckBlock check={section.check} />
        </ErrorBoundary>
      )}
    </motion.section>
  )
}

function Block({ block }: { block: StudyBlock }) {
  switch (block.kind) {
    case "text":
      return <div style={{ display: "grid", gap: 12, margin: "0 0 12px" }}>{block.md.split("\n\n").map((p, i) => <p key={i} style={{ margin: 0, fontSize: 14.5, color: C.muted, lineHeight: 1.68 }}>{rich(p)}</p>)}</div>
    case "callout": {
      const t = TONE[block.tone] ?? TONE.key
      return (
        <div style={{ display: "flex", gap: 11, background: t.bg, border: `1px solid ${t.fg}44`, borderRadius: 13, padding: "13px 15px", margin: "14px 0" }}>
          <span style={{ flex: "none", width: 24, height: 24, borderRadius: 7, background: t.fg, color: "#fff", fontSize: 13, fontWeight: 800, display: "grid", placeItems: "center" }}>{t.icon}</span>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: t.fg, marginBottom: 3 }}>{block.title ?? t.label}</div>
            <div style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{rich(block.md)}</div>
          </div>
        </div>
      )
    }
    case "formula":
      return (
        <div style={{ background: "#14141a", borderRadius: 12, padding: "14px 16px", margin: "14px 0", overflowX: "auto" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9A928B", marginBottom: 6 }}>{block.name}</div>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 15, fontWeight: 700, color: "#F2EFEA", lineHeight: 1.5 }}>{block.expr}</div>
          {block.note && <div style={{ fontSize: 11.5, color: "#9A928B", marginTop: 7, lineHeight: 1.5 }}>{block.note}</div>}
        </div>
      )
    case "table":
      return (
        <div style={{ margin: "14px 0", overflowX: "auto" }}>
          {block.caption && <div style={{ fontSize: 11.5, fontWeight: 700, color: C.muted, marginBottom: 7 }}>{block.caption}</div>}
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 340, fontSize: 12.5 }}>
            <thead><tr>{block.head.map((h, i) => <th key={i} style={{ textAlign: "left", padding: "9px 12px", background: C.card2, color: C.muted, fontWeight: 800, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: `2px solid ${C.border}` }}>{h}</th>)}</tr></thead>
            <tbody>{block.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci} style={{ padding: "9px 12px", color: ci === 0 ? C.text : C.muted, fontWeight: ci === 0 ? 700 : 400, borderBottom: `1px solid ${C.border}`, lineHeight: 1.45 }}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )
    case "example":
      return <ExampleBlock title={block.title} scenario={block.scenario} steps={block.steps} result={block.result} />
    case "diagram":
      return <StudyDiagram diagram={block.diagram} />
    case "list":
      return (
        <div style={{ margin: "12px 0" }}>
          {block.title && <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 8 }}>{rich(block.title)}</div>}
          <div style={{ display: "grid", gap: 8 }}>
            {block.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
                <span style={{ flex: "none", minWidth: 17, textAlign: "right", color: C.brand, fontWeight: 800, fontSize: block.style === "number" ? 12.5 : 15, lineHeight: block.style === "number" ? 1.75 : 1.35 }}>
                  {block.style === "number" ? `${i + 1}.` : "•"}
                </span>
                <span>{rich(item)}</span>
              </div>
            ))}
          </div>
        </div>
      )
    case "definition":
      return (
        <div style={{ display: "flex", gap: 0, margin: "16px 0", background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, overflow: "hidden" }}>
          <div style={{ flex: "none", width: 34, background: C.brand, display: "grid", placeItems: "center" }}>
            <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff" }}>Key term</span>
          </div>
          <div style={{ padding: "13px 15px" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 4 }}>{block.term}</div>
            <div style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{rich(block.md)}</div>
          </div>
        </div>
      )
    case "illustration":
      return (
        <div style={{ margin: "16px 0", padding: "13px 15px 14px", background: C.card2, border: `1px dashed ${C.border}`, borderRadius: 13 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: "#7C6BD6", marginBottom: 5 }}>Illustration</div>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: C.text, marginBottom: 6 }}>{block.title}</div>
          <div style={{ display: "grid", gap: 10 }}>
            {block.md.split("\n\n").map((p, i) => <div key={i} style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.62 }}>{rich(p)}</div>)}
          </div>
        </div>
      )
    case "activity":
      return <ActivityBlock title={block.title} prompt={block.prompt} answer={block.answer} />
    case "examQuestion":
      return <ExamQuestionCard block={block} />
    default:
      return null
  }
}

/**
 * The important question on this topic, taught as a plan.
 *
 * Staged in three, because the block's whole point is the middle stage. The
 * requirement is always visible; the PLAN opens first and the model answer only
 * after it, so a learner cannot skip from "what is being asked" straight to
 * "what a good answer looks like" — which is the one move that guarantees they
 * will not be able to reproduce it in the hall. `earns`/`loses` land with the
 * answer, since they are only meaningful once there is an answer to compare.
 */
const FORMAT_LABEL: Record<"ot" | "mtq" | "written", string> = {
  ot: "How this is examined · objective test",
  mtq: "How this is examined · multi-task question",
  written: "How this is examined · constructed response",
}

/**
 * "How much is this worth" told in the currency of the actual format.
 *
 * A constructed response is bought in points; an objective test is not bought at
 * all — it is one decision, and the work is in reading the stem rather than in
 * producing volume. Telling an OT learner that two marks is "one to two distinct
 * points, each justified" would teach them to write an essay into a radio button.
 */
function sizeGuidance(format: "ot" | "mtq" | "written", marks: number): string {
  if (format === "ot") {
    return `Answer it before you read on. ${marks} ${marks === 1 ? "mark" : "marks"}, one decision, no partial credit — the work is in reading the stem exactly, not in knowing more.`
  }
  if (format === "mtq") {
    return `Work it before you read on. ${marks} marks across linked tasks, each marked independently — a wrong figure early does not have to cost the later tasks.`
  }
  const low = Math.max(1, Math.round(marks / 2))
  return `Plan it before you read on. ${marks} marks is roughly ${low}–${marks} distinct points, each one made and then justified.`
}

function ExamQuestionCard({ block }: { block: Extract<StudyBlock, { kind: "examQuestion" }> }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0)
  const reduce = useReducedMotion()
  const reveal = reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } }

  return (
    <div style={{ margin: "18px 0", background: C.card, border: `1px solid ${C.border}`, borderRadius: 15, overflow: "hidden" }}>
      <div style={{ padding: "13px 16px", background: C.card2, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 5 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: C.brand }}>
            {FORMAT_LABEL[block.format]}
          </div>
          <span style={{ flex: "none", padding: "3px 9px", borderRadius: 99, background: C.brand, color: "#fff", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.02em" }}>
            {block.marks} {block.marks === 1 ? "mark" : "marks"}
          </span>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: C.text, marginBottom: 7 }}>{block.title}</div>
        <div style={{ fontSize: 13.5, color: C.text, lineHeight: 1.62, padding: "10px 13px", background: C.card, borderRadius: 11, border: `1px solid ${C.border}` }}>
          {rich(block.requirement)}
        </div>
      </div>

      <div style={{ padding: "13px 16px" }}>
        {stage === 0 ? (
          <>
            <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
              {sizeGuidance(block.format, block.marks)}
            </div>
            <button onClick={() => setStage(1)}
              style={{ marginTop: 11, padding: "9px 16px", borderRadius: 10, border: `1px solid ${C.brand}`, background: C.brandSoft, color: C.brand, fontWeight: 800, fontSize: 12.5, cursor: "pointer" }}>
              Show the plan
            </button>
          </>
        ) : (
          <motion.div {...reveal}>
            <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: C.brand, marginBottom: 9 }}>The plan</div>
            {block.plan.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 11, padding: "8px 0", borderBottom: i < block.plan.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ flex: "none", width: 22, height: 22, borderRadius: 99, background: C.brand, color: "#fff", fontSize: 11, fontWeight: 800, display: "grid", placeItems: "center" }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: C.text }}>{s.step}</div>
                  <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2, lineHeight: 1.55 }}>{rich(s.detail)}</div>
                </div>
              </div>
            ))}

            {stage === 1 ? (
              <button onClick={() => setStage(2)}
                style={{ marginTop: 12, padding: "9px 16px", borderRadius: 10, border: `1px solid ${C.brand}`, background: C.brandSoft, color: C.brand, fontWeight: 800, fontSize: 12.5, cursor: "pointer" }}>
                {block.format === "ot" ? "Now show the answer" : "Now show the model answer"}
              </button>
            ) : (
              <motion.div {...reveal} style={{ marginTop: 13 }}>
                <div style={{ padding: "12px 14px", borderRadius: 11, background: C.greenSoft, border: `1px solid ${C.green}` }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: C.green, marginBottom: 6 }}>
                    {block.format === "ot" ? "The answer" : "Model answer"}
                  </div>
                  <div style={{ display: "grid", gap: 9 }}>
                    {block.answer.split("\n\n").map((p, i) => <div key={i} style={{ fontSize: 13.5, color: C.text, lineHeight: 1.62 }}>{rich(p)}</div>)}
                  </div>
                </div>
                {(block.earns?.length || block.loses?.length) && (
                  <div style={{ display: "grid", gap: 10, marginTop: 11 }}>
                    {block.earns?.length ? <MarkList tone={C.green} label="Where the marks are" items={block.earns} /> : null}
                    {block.loses?.length ? <MarkList tone={C.amber} label="Where they are thrown away" items={block.loses} /> : null}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function MarkList({ tone, label, items }: { tone: string; label: string; items: string[] }) {
  return (
    <div style={{ padding: "11px 13px", borderRadius: 11, background: `${tone}0e`, border: `1px solid ${tone}44` }}>
      <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: tone, marginBottom: 6 }}>{label}</div>
      <div style={{ display: "grid", gap: 6 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 9, fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>
            <span style={{ flex: "none", color: tone, fontWeight: 800 }}>{tone === C.green ? "✓" : "✕"}</span>
            <span>{rich(it)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * An "attempt it first" activity. The answer stays hidden behind a deliberate
 * click, because the learning is in the attempt — revealing it by default turns
 * the activity back into prose the eye slides over.
 */
function ActivityBlock({ title, prompt, answer }: { title: string; prompt: string; answer: string }) {
  const [shown, setShown] = useState(false)
  return (
    <div style={{ margin: "16px 0", background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.brand}`, borderRadius: 13, padding: "13px 15px" }}>
      <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: C.brand, marginBottom: 5 }}>Activity — try it before you look</div>
      <div style={{ fontSize: 13.5, fontWeight: 800, color: C.text, marginBottom: 7 }}>{title}</div>
      <div style={{ display: "grid", gap: 10 }}>
        {prompt.split("\n\n").map((p, i) => <div key={i} style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.62 }}>{rich(p)}</div>)}
      </div>
      {shown ? (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 12, padding: "12px 14px", borderRadius: 11, background: C.greenSoft, border: `1px solid ${C.green}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: C.green, marginBottom: 5 }}>Model answer</div>
          <div style={{ display: "grid", gap: 9 }}>
            {answer.split("\n\n").map((p, i) => <div key={i} style={{ fontSize: 13.5, color: C.text, lineHeight: 1.62 }}>{rich(p)}</div>)}
          </div>
        </motion.div>
      ) : (
        <button onClick={() => setShown(true)}
          style={{ marginTop: 11, padding: "9px 16px", borderRadius: 10, border: `1px solid ${C.brand}`, background: C.brandSoft, color: C.brand, fontWeight: 800, fontSize: 12.5, cursor: "pointer" }}>
          Reveal the model answer
        </button>
      )}
    </div>
  )
}

function ExampleBlock({ title, scenario, steps, result }: { title: string; scenario: string; steps: { label: string; detail: string }[]; result: string }) {
  const [shown, setShown] = useState(1)
  return (
    <div style={{ margin: "16px 0", background: C.card, border: `1px solid ${C.border}`, borderRadius: 15, overflow: "hidden" }}>
      <div style={{ padding: "13px 16px", background: C.card2, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: C.brand, marginBottom: 4 }}>Worked example</div>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: C.text, marginBottom: 5 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>{scenario}</div>
      </div>
      <div style={{ padding: "12px 16px" }}>
        {steps.slice(0, shown).map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} style={{ display: "flex", gap: 11, padding: "8px 0", borderBottom: i < shown - 1 ? `1px solid ${C.border}` : "none" }}>
            <span style={{ flex: "none", width: 22, height: 22, borderRadius: 99, background: C.brand, color: "#fff", fontSize: 11, fontWeight: 800, display: "grid", placeItems: "center" }}>{i + 1}</span>
            <div><div style={{ fontSize: 12.5, fontWeight: 800, color: C.text }}>{s.label}</div><div style={{ fontSize: 12.5, color: C.muted, marginTop: 2, lineHeight: 1.55 }}>{s.detail}</div></div>
          </motion.div>
        ))}
        {shown < steps.length ? (
          <button onClick={() => setShown((n) => n + 1)} style={{ marginTop: 10, padding: "9px 16px", borderRadius: 10, border: `1px solid ${C.brand}`, background: C.brandSoft, color: C.brand, fontWeight: 800, fontSize: 12.5, cursor: "pointer" }}>Next step →</button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 12, padding: "11px 14px", borderRadius: 11, background: C.greenSoft, border: `1px solid ${C.green}`, fontSize: 13, color: C.text, lineHeight: 1.55 }}>
            <span style={{ fontWeight: 800, color: C.green }}>Answer · </span>{result}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function CheckBlock({ check }: { check: MiniCheck }) {
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <div style={{ margin: "18px 0 4px", background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 15, padding: "15px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11 }}>
        <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: C.brand, background: C.brandSoft, padding: "3px 8px", borderRadius: 6 }}>Quick check</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 750, color: C.text, marginBottom: 12, lineHeight: 1.5 }}>{check.q}</div>
      <div style={{ display: "grid", gap: 8 }}>
        {check.options.map((o, i) => {
          const isPicked = picked === i
          const isCorrect = i === check.correct
          const reveal = picked !== null
          const border = reveal && isCorrect ? C.green : reveal && isPicked ? C.brand : C.border
          const bg = reveal && isCorrect ? C.greenSoft : reveal && isPicked && !isCorrect ? `${C.brand}0e` : C.card2
          return (
            <button key={i} onClick={() => picked === null && setPicked(i)} disabled={picked !== null}
              style={{ textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", borderRadius: 11, border: `1.5px solid ${border}`, background: bg, cursor: picked === null ? "pointer" : "default", fontSize: 13, color: C.text, fontWeight: 600, lineHeight: 1.4 }}>
              <span style={{ flex: "none", width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${border}`, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, color: reveal && isCorrect ? C.green : C.muted }}>
                {reveal && isCorrect ? "✓" : reveal && isPicked ? "✕" : String.fromCharCode(65 + i)}
              </span>
              {o}
            </button>
          )
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ overflow: "hidden" }}>
            <div style={{ marginTop: 12, padding: "11px 14px", borderRadius: 11, background: picked === check.correct ? C.greenSoft : C.card2, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 800, color: picked === check.correct ? C.green : C.brand }}>{picked === check.correct ? "Correct. " : "Not quite. "}</span>{check.explain}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DiagnosticRow({ index, q, a }: { index: number; q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, overflow: "hidden" }}>
      <button onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", background: "none", border: "none", cursor: "pointer" }}>
        <span style={{ flex: "none", width: 20, height: 20, borderRadius: 6, background: C.brandSoft, color: C.brand, fontSize: 11, fontWeight: 800, display: "grid", placeItems: "center" }}>{index + 1}</span>
        <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: C.text, lineHeight: 1.45 }}>{q}</span>
        <span style={{ flex: "none", color: C.faint, fontSize: 13, fontWeight: 800 }}>{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "0 13px 12px 43px", fontSize: 13, color: C.muted, lineHeight: 1.62 }}>{rich(a)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FlipCard({ term, def }: { term: string; def: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button onClick={() => setFlipped((f) => !f)} style={{ perspective: 800, background: "none", border: "none", padding: 0, cursor: "pointer", minHeight: 92, textAlign: "left" }}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5 }} style={{ position: "relative", width: "100%", minHeight: 92, transformStyle: "preserve-3d" }}>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.brand}`, borderRadius: 12, padding: "13px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: C.text, lineHeight: 1.3 }}>{term}</div>
          <div style={{ fontSize: 10.5, color: C.faint, fontWeight: 700 }}>tap for the definition →</div>
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: C.brand, borderRadius: 12, padding: "13px 14px", display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.5, fontWeight: 500 }}>{def}</div>
        </div>
      </motion.div>
    </button>
  )
}
