import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import {
  readSessionNote,
  writeSessionNote,
  type SessionMood,
} from "@/lib/scholify-data"
import { useToast } from "@/components/Toast"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/* ──────────────────────────────────────────────────────────────
 *  SessionNotes — shown on Dashboard after Mark Complete.
 *
 *  Auto-saves locally on every keystroke; commits to Supabase on
 *  blur or after 3s of typing-quiet. Notes are keyed by day_number
 *  so Lara can read yesterday's reflection in the next message.
 * ────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const MAX = 500

const MOODS: { value: SessionMood; emoji: string; label: string }[] = [
  { value: "struggling", emoji: "😤", label: "Struggling" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "great", emoji: "😊", label: "Great" },
  { value: "amazing", emoji: "🔥", label: "Amazing" },
]

export interface SessionNotesProps {
  /** day_number this note belongs to. */
  dayNumber: number
  /** Optional plan id for Supabase row attribution. */
  planId?: string | null
  /** Notify parent (e.g. for confetti / toasts). */
  onSaved?: () => void
}

export default function SessionNotes({
  dayNumber,
  planId,
  onSaved,
}: SessionNotesProps) {
  const { user } = useAuth()
  const { toast } = useToast()

  const existing = useMemo(() => readSessionNote(dayNumber), [dayNumber])
  const [text, setText] = useState(existing?.text ?? "")
  const [mood, setMood] = useState<SessionMood | null>(existing?.mood ?? null)
  const [savedAt, setSavedAt] = useState<number | null>(
    existing?.updatedAt ? new Date(existing.updatedAt).getTime() : null,
  )
  const [saving, setSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const blurTimeoutRef = useRef<number | null>(null)
  const lastSavedSignatureRef = useRef<string>(
    `${existing?.text ?? ""}|${existing?.mood ?? ""}`,
  )

  /* Auto-resize textarea. */
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(200, Math.max(100, el.scrollHeight))}px`
  }, [text])

  const persist = useCallback(
    async (force?: boolean) => {
      const signature = `${text}|${mood ?? ""}`
      if (!force && signature === lastSavedSignatureRef.current) return
      if (!text.trim() && !mood) return
      setSaving(true)
      writeSessionNote(dayNumber, text.slice(0, MAX), mood ?? null)
      lastSavedSignatureRef.current = signature

      if (isSupabaseConfigured && user) {
        try {
          await supabase
            .from("progress")
            .upsert(
              {
                user_id: user.id,
                day_number: dayNumber,
                plan_id: planId ?? null,
                session_note: text.slice(0, MAX),
                session_mood: mood ?? null,
                completed_at: new Date().toISOString(),
              },
              { onConflict: "user_id,day_number" },
            )
            .then(
              () => {},
              () => {},
            )
        } catch {
          /* best-effort */
        }
      }

      setSavedAt(Date.now())
      setSaving(false)
      onSaved?.()
    },
    [text, mood, dayNumber, planId, user, onSaved],
  )

  const scheduleAutoSave = useCallback(() => {
    if (blurTimeoutRef.current) window.clearTimeout(blurTimeoutRef.current)
    blurTimeoutRef.current = window.setTimeout(() => {
      void persist()
    }, 3000)
  }, [persist])

  useEffect(() => {
    scheduleAutoSave()
    return () => {
      if (blurTimeoutRef.current) window.clearTimeout(blurTimeoutRef.current)
    }
  }, [text, mood, scheduleAutoSave])

  const handleSave = async () => {
    await persist(true)
    toast.success("Note saved ✓ Lara will remember this.")
  }

  const charCount = text.length
  const overLimit = charCount > MAX
  const saved =
    savedAt !== null &&
    `${text}|${mood ?? ""}` === lastSavedSignatureRef.current

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      style={{
        padding: 20,
        borderRadius: 20,
        background: "var(--sch-card)",
        border: "1px solid rgba(139,92,246,0.1)",
      }}
    >
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#F0EEFF" }}>
          📝 What did you learn today?
        </h3>
        <div
          style={{
            fontSize: 12,
            color: "var(--sch-tx-2)",
            marginTop: 4,
            lineHeight: 1.55,
          }}
        >
          Lara reads your notes to personalise tomorrow's message.
        </div>
      </div>

      <div style={{ position: "relative", marginTop: 14 }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => void persist()}
          placeholder={"The key thing I learned today...\nA question I have...\nSomething I want to review..."}
          maxLength={MAX + 200}
          style={textareaStyle}
        />
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 12,
            fontSize: 11,
            color: overLimit ? "#FF6B5E" : "var(--sch-tx-3)",
          }}
        >
          {Math.min(charCount, MAX)} / {MAX}
        </div>
      </div>

      {/* Mood */}
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, color: "var(--sch-tx-2)", marginBottom: 8 }}>
          How was your session?
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {MOODS.map((m) => {
            const active = mood === m.value
            return (
              <motion.button
                key={m.value}
                type="button"
                aria-label={m.label}
                onClick={() => setMood(active ? null : m.value)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                animate={{
                  scale: active ? 1.15 : 1,
                  boxShadow: active
                    ? "0 0 18px rgba(139,92,246,0.4)"
                    : "0 0 0 rgba(139,92,246,0)",
                }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: `1px solid ${active ? "rgba(139,92,246,0.5)" : "var(--sch-border)"}`,
                  background: active ? "rgba(139,92,246,0.14)" : "var(--sch-card-2)",
                  cursor: "pointer",
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {m.emoji}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Save row */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
        }}
      >
        <AnimatePresence mode="wait">
          {saving ? (
            <motion.span
              key="saving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 12, color: "var(--sch-tx-3)" }}
            >
              Saving…
            </motion.span>
          ) : saved ? (
            <motion.span
              key="saved"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 12, color: "#34D399" }}
            >
              ✓ Saved
            </motion.span>
          ) : null}
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={handleSave}
          whileHover={saved ? undefined : { scale: 1.02 }}
          whileTap={saved ? undefined : { scale: 0.97 }}
          disabled={saved && !overLimit}
          style={{
            padding: "8px 16px",
            borderRadius: 12,
            border: `1px solid ${saved ? "rgba(52,211,153,0.4)" : "rgba(139,92,246,0.4)"}`,
            background: saved ? "rgba(52,211,153,0.08)" : "rgba(139,92,246,0.08)",
            color: saved ? "#34D399" : "#F0EEFF",
            fontSize: 13,
            fontWeight: 700,
            cursor: saved ? "default" : "pointer",
            opacity: overLimit ? 0.65 : 1,
            backgroundImage: saved ? undefined : `linear-gradient(135deg, transparent, transparent), ${IRIDESCENT}`,
            backgroundOrigin: "border-box",
          }}
        >
          {saved ? "✓ Saved" : "Save note →"}
        </motion.button>
      </div>
    </motion.section>
  )
}

const textareaStyle: CSSProperties = {
  width: "100%",
  minHeight: 100,
  maxHeight: 200,
  padding: "14px 16px",
  paddingBottom: 28,
  borderRadius: 14,
  fontSize: 14,
  color: "#F0EEFF",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  outline: "none",
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: 1.55,
}
