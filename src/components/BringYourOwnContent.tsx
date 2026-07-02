import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { useLanguage } from "@/i18n/LanguageProvider"
import { speak, canSpeak } from "@/lib/tts"
import { extractFromText, fetchUrlText } from "@/lib/vocab-api"
import { languageLabel } from "@/lib/vocab-content"
import type { NewWordInput } from "@/lib/vocab"

/*
 * Bring Your Own Content — paste any text, Lara extracts the words you need
 * and (after you review them) adds them straight into your deck. The product's
 * key differentiator. Works in demo mode (mock extraction, zero keys).
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const MAX_CHARS = 4000
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]

type Phase = "input" | "loading" | "results" | "empty"

export default function BringYourOwnContent({
  targetLanguage,
  targetLabel,
  nativeLanguage,
  defaultLevel = "A2",
  existingTerms = [],
  onAdded,
  onClose,
}: {
  targetLanguage: string
  targetLabel: string
  nativeLanguage: string
  defaultLevel?: string
  existingTerms?: string[]
  onAdded: (words: NewWordInput[]) => void
  onClose: () => void
}) {
  const { t } = useLanguage()
  const [text, setText] = useState("")
  const [trimmed, setTrimmed] = useState(false)
  const [mode, setMode] = useState<"text" | "url" | "file">("text")
  const [url, setUrl] = useState("")
  const [busyUrl, setBusyUrl] = useState(false)
  const [note, setNote] = useState("")
  const [level, setLevel] = useState(defaultLevel)
  const [phase, setPhase] = useState<Phase>("input")
  const [rows, setRows] = useState<{ word: NewWordInput; include: boolean }[]>([])
  const [isMock, setIsMock] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [phIdx, setPhIdx] = useState(0)
  const [loadIdx, setLoadIdx] = useState(0)

  const placeholders = useMemo(
    () => [
      t("Paste a job description…"),
      t("Paste an email you didn't fully understand…"),
      t("Paste song lyrics…"),
      t("Paste an article…"),
    ],
    [t],
  )
  const loadingMsgs = useMemo(
    () => [
      t("Reading your text…"),
      t("Finding words you need…"),
      t("Skipping words you already know…"),
      t("Building your deck…"),
    ],
    [t],
  )

  // Rotate the textarea placeholder.
  useEffect(() => {
    if (phase !== "input") return
    const id = window.setInterval(() => setPhIdx((i) => (i + 1) % placeholders.length), 3000)
    return () => window.clearInterval(id)
  }, [phase, placeholders.length])

  // Rotate loading messages.
  useEffect(() => {
    if (phase !== "loading") return
    const id = window.setInterval(() => setLoadIdx((i) => (i + 1) % loadingMsgs.length), 1200)
    return () => window.clearInterval(id)
  }, [phase, loadingMsgs.length])

  const onChangeText = (v: string) => {
    if (v.length > MAX_CHARS) {
      setText(v.slice(0, MAX_CHARS))
      setTrimmed(true)
    } else {
      setText(v)
      setTrimmed(false)
    }
  }

  const onFetchUrl = async () => {
    if (!url.trim()) return
    setBusyUrl(true)
    setNote("")
    const { text: fetched, error } = await fetchUrlText(url.trim())
    setBusyUrl(false)
    if (error || !fetched) {
      setNote(t("Couldn't read that link — paste the text instead."))
      return
    }
    onChangeText(fetched)
    setMode("text")
    setNote(t("Loaded from link ✓"))
  }

  const onFile = (file?: File | null) => {
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setNote(t("File is over 2MB — paste a section instead."))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      onChangeText(String(reader.result || ""))
      setMode("text")
      setNote(`✓ ${file.name}`)
    }
    reader.onerror = () => setNote(t("Couldn't read that file."))
    reader.readAsText(file)
  }

  const run = async () => {
    if (!text.trim()) return
    setPhase("loading")
    setLoadIdx(0)
    const existing = new Set(existingTerms.map((e) => e.toLowerCase().trim()))
    const { words, isMock: mock } = await extractFromText({
      text,
      target: targetLanguage,
      targetLabel,
      native: nativeLanguage,
      nativeLabel: languageLabel(nativeLanguage),
      knownLevel: level,
    })
    const fresh = words.filter((w) => !existing.has(w.term.toLowerCase().trim()))
    if (fresh.length === 0) {
      setPhase("empty")
      return
    }
    setRows(fresh.map((w) => ({ word: w, include: true })))
    setIsMock(mock)
    setPhase("results")
  }

  const includedCount = rows.filter((r) => r.include).length

  const add = () => {
    const included = rows.filter((r) => r.include).map((r) => r.word)
    if (included.length === 0) return
    onAdded(included)
    onClose()
  }

  return (
    <div style={shell}>
      {/* Header */}
      <div style={header}>
        <button type="button" onClick={onClose} aria-label={t("Close")} style={iconBtn}>
          ✕
        </button>
      </div>

      <div style={body} className="dash-scroll">
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <LaraAvatar size={40} />
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: 19, fontWeight: 800, color: TEXT, lineHeight: 1.3 }}>
              {t("Paste anything — I'll find the words you need.")}
            </h1>
            <p style={{ fontSize: 13.5, color: MUTED, marginTop: 6, lineHeight: 1.55 }}>
              {t(
                "A job post, an email, lyrics, an article. I'll pull out the words worth learning and add them to your deck.",
              )}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ── INPUT ── */}
          {phase === "input" && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Source: paste text, a link, or a file */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {([
                  ["text", "✍️", t("Text")],
                  ["url", "🔗", t("Link")],
                  ["file", "📁", t("File")],
                ] as const).map(([m, icon, label]) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    style={{
                      ...tab,
                      color: mode === m ? TEXT : MUTED,
                      background: mode === m ? "rgba(200,0,0,0.14)" : "var(--sch-card)",
                      border: `1px solid ${mode === m ? "rgba(200,0,0,0.5)" : "var(--sch-border)"}`,
                    }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>

              {mode === "url" && (
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://…"
                    inputMode="url"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    style={urlInput}
                  />
                  <button
                    type="button"
                    onClick={onFetchUrl}
                    disabled={busyUrl || !url.trim()}
                    style={{ ...fetchBtn, opacity: busyUrl || !url.trim() ? 0.5 : 1 }}
                  >
                    {busyUrl ? t("Reading…") : t("Fetch")}
                  </button>
                </div>
              )}

              {mode === "file" && (
                <label style={fileDrop}>
                  <input
                    type="file"
                    accept=".txt,.md,.csv,.srt,text/*"
                    onChange={(e) => onFile(e.target.files?.[0])}
                    style={{ display: "none" }}
                  />
                  📁 {t("Choose a text file (.txt, .md, .srt…)")}
                </label>
              )}

              <textarea
                value={text}
                onChange={(e) => onChangeText(e.target.value)}
                placeholder={placeholders[phIdx]}
                style={textarea}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, gap: 10 }}>
                <span style={{ fontSize: 12, color: trimmed ? "#FF9F0A" : DIM }}>
                  {trimmed ? t("Trimmed to 4000 characters") : `${text.length}/${MAX_CHARS}`}
                </span>
                {note && <span style={{ fontSize: 12, color: MUTED, textAlign: "right" }}>{note}</span>}
              </div>

              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: DIM, margin: "20px 0 10px" }}>
                {t("Your level")}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {LEVELS.map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setLevel(lv)}
                    style={{
                      ...levelPill,
                      color: level === lv ? TEXT : MUTED,
                      background: level === lv ? "rgba(200,0,0,0.14)" : "var(--sch-card)",
                      border: `1px solid ${level === lv ? "rgba(200,0,0,0.5)" : "var(--sch-border)"}`,
                    }}
                  >
                    {lv}
                  </button>
                ))}
              </div>

              <motion.button
                type="button"
                onClick={run}
                disabled={!text.trim()}
                whileHover={text.trim() ? { scale: 1.02 } : undefined}
                whileTap={text.trim() ? { scale: 0.98 } : undefined}
                style={{ ...primaryBtn, opacity: text.trim() ? 1 : 0.5 }}
              >
                {t("Extract my words →")}
              </motion.button>
            </motion.div>
          )}

          {/* ── LOADING ── */}
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "48px 0" }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
              >
                <LaraAvatar size={64} />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{ fontSize: 15, color: MUTED, marginTop: 20 }}
                >
                  {loadingMsgs[loadIdx]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── RESULTS ── */}
          {phase === "results" && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, margin: "22px 0 6px" }}>
                {t("I found")} {rows.length} {t("words worth learning from your text.")}
              </div>
              {isMock && (
                <div style={{ fontSize: 12, color: DIM, marginBottom: 10 }}>
                  {t("Sample preview — Lara picked these from your text.")}
                </div>
              )}

              <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                {rows.map((row, i) => (
                  <div key={`${row.word.term}-${i}`} style={rowCard(row.include)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button
                        type="button"
                        aria-label={row.include ? t("Skip") : t("Include")}
                        onClick={() =>
                          setRows((rs) => rs.map((r, j) => (j === i ? { ...r, include: !r.include } : r)))
                        }
                        style={{
                          ...checkBox,
                          background: row.include ? IRIDESCENT : "transparent",
                          border: row.include ? "none" : "1px solid var(--sch-border-2)",
                        }}
                      >
                        {row.include ? "✓" : ""}
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpanded((e) => (e === i ? null : i))}
                        style={rowMain}
                      >
                        <span style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{row.word.term}</span>
                        <span style={{ fontSize: 13, color: MUTED }}>{row.word.translation}</span>
                      </button>
                      {canSpeak() && (
                        <button
                          type="button"
                          aria-label={t("Pronounce")}
                          onClick={() => speak(row.word.term, targetLanguage)}
                          style={speakChip}
                        >
                          🔊
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {expanded === i && row.word.example && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{ fontSize: 13, color: "var(--sch-tx-1)", fontStyle: "italic", marginTop: 10, paddingLeft: 34 }}>
                            “{row.word.example}”
                            {row.word.exampleTranslation ? (
                              <div style={{ color: DIM, fontStyle: "normal", marginTop: 3 }}>
                                {row.word.exampleTranslation}
                              </div>
                            ) : null}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <motion.button
                type="button"
                onClick={add}
                disabled={includedCount === 0}
                whileHover={includedCount > 0 ? { scale: 1.02 } : undefined}
                whileTap={includedCount > 0 ? { scale: 0.98 } : undefined}
                style={{ ...primaryBtn, opacity: includedCount > 0 ? 1 : 0.5 }}
              >
                {t("Add")} {includedCount} {t("words to my deck →")}
              </motion.button>
              <button type="button" onClick={onClose} style={ghostBtn}>
                {t("Cancel")}
              </button>
            </motion.div>
          )}

          {/* ── EMPTY ── */}
          {phase === "empty" && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "36px 0" }}>
              <div style={{ fontSize: 40 }}>🔍</div>
              <p style={{ fontSize: 14, color: MUTED, marginTop: 12, lineHeight: 1.6, maxWidth: 360, marginInline: "auto" }}>
                {t(
                  "I couldn't find new words above your level in that text — try pasting something more advanced, or paste more.",
                )}
              </p>
              <motion.button type="button" onClick={() => setPhase("input")} whileHover={{ scale: 1.02 }} style={primaryBtn}>
                {t("Try again")}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── styles ── */

const shell: CSSProperties = { position: "fixed", inset: 0, zIndex: 220, background: "var(--sch-bg)", display: "flex", flexDirection: "column", fontFamily: "var(--sch-font)", color: "var(--sch-text)" }
const header: CSSProperties = { display: "flex", justifyContent: "flex-start", padding: "max(16px, env(safe-area-inset-top)) 20px 0" }
const body: CSSProperties = { flex: 1, overflowY: "auto", padding: "12px 20px 60px", width: "100%", maxWidth: 560, margin: "0 auto" }
const iconBtn: CSSProperties = { width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--sch-border)", background: "var(--sch-card)", color: MUTED, fontSize: 14, cursor: "pointer" }
const textarea: CSSProperties = { width: "100%", minHeight: 160, marginTop: 0, padding: 16, borderRadius: 16, fontSize: 16, lineHeight: 1.5, color: TEXT, background: "var(--sch-card)", border: "1px solid var(--sch-border)", outline: "none", resize: "vertical", fontFamily: "inherit" }
const tab: CSSProperties = { flex: 1, height: 40, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer" }
const urlInput: CSSProperties = { flex: 1, minWidth: 0, height: 44, padding: "0 14px", borderRadius: 12, fontSize: 16, color: TEXT, background: "var(--sch-card)", border: "1px solid var(--sch-border)", outline: "none" }
const fetchBtn: CSSProperties = { height: 44, padding: "0 18px", borderRadius: 12, border: "none", background: IRIDESCENT, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", flexShrink: 0 }
const fileDrop: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 56, marginBottom: 12, borderRadius: 14, border: "1px dashed var(--sch-border-2)", background: "var(--sch-card)", color: MUTED, fontSize: 14, fontWeight: 600, cursor: "pointer" }
const levelPill: CSSProperties = { padding: "8px 16px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }
const primaryBtn: CSSProperties = { width: "100%", height: 52, marginTop: 22, borderRadius: 14, border: "none", background: IRIDESCENT, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 30px rgba(200,0,0,0.3)" }
const ghostBtn: CSSProperties = { width: "100%", height: 44, marginTop: 10, borderRadius: 12, border: "none", background: "transparent", color: MUTED, fontSize: 14, fontWeight: 600, cursor: "pointer" }
const speakChip: CSSProperties = { width: 32, height: 32, flexShrink: 0, borderRadius: "50%", border: "1px solid var(--sch-border)", background: "var(--sch-card-2)", fontSize: 14, cursor: "pointer" }
const checkBox: CSSProperties = { width: 24, height: 24, flexShrink: 0, borderRadius: 7, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }
const rowMain: CSSProperties = { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2, background: "transparent", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }

function rowCard(include: boolean): CSSProperties {
  return {
    padding: "12px 14px",
    borderRadius: 14,
    background: "var(--sch-card)",
    border: `1px solid ${include ? "rgba(200,0,0,0.3)" : "var(--sch-border)"}`,
    opacity: include ? 1 : 0.55,
  }
}
