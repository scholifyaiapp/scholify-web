import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { api } from "@/lib/api"
import {
  dataUrlToBase64,
  downscaleImage,
  fileToDataURL,
  isPhotoRelevantGoal,
  savePhoto,
  type SupportedMediaType,
} from "@/lib/photos-storage"
import { readPlan, readActivePlanId } from "@/lib/scholify-data"

/*
 * PhotoEvidence — trigger pill + modal.
 *
 * The default export is a small "📸 Add photo proof" pill that opens
 * the capture modal. Drop it in below the Mark Complete button on the
 * Dashboard. The pill itself does not unconditionally render — by
 * default it only shows for photo-friendly goals (handwriting, fitness,
 * cooking, art, reading, music, crafts). Pass `alwaysShow` to override.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

interface PhotoEvidenceProps {
  /** Override goal-relevance detection. */
  alwaysShow?: boolean
  /** Optional context — pulled from active plan if missing. */
  dayNumber?: number
  taskTitle?: string
  goal?: string
}

export default function PhotoEvidence({
  alwaysShow = false,
  dayNumber,
  taskTitle,
  goal,
}: PhotoEvidenceProps) {
  const plan = useMemo(readPlan, [])
  const resolvedGoal = goal ?? plan.goal ?? ""
  const visible = alwaysShow || isPhotoRelevantGoal(resolvedGoal)

  const [open, setOpen] = useState(false)
  if (!visible) return null

  return (
    <>
      <motion.button
        type="button"
        whileHover={{
          color: TEXT_PRIMARY,
          borderColor: "rgba(200,0,0,0.4)",
        }}
        onClick={() => setOpen(true)}
        style={pillStyle}
      >
        📸 Add photo proof
      </motion.button>

      <AnimatePresence>
        {open && (
          <PhotoModal
            onClose={() => setOpen(false)}
            dayNumber={dayNumber}
            taskTitle={taskTitle || (plan.tasks?.[0]?.task_title ?? "today's task")}
            goal={resolvedGoal}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const pillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 14px",
  borderRadius: 999,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "var(--sch-tx-2)",
  fontSize: 13,
  cursor: "pointer",
  transition: "color 0.2s ease, border-color 0.2s ease",
}

/* ── Modal ───────────────────────────────────────────────────────────── */

type ModalStep = "compose" | "uploading" | "success"

interface PhotoModalProps {
  onClose: () => void
  dayNumber?: number
  taskTitle: string
  goal: string
}

function PhotoModal({ onClose, dayNumber, taskTitle, goal }: PhotoModalProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileRef = useRef<HTMLInputElement>(null)

  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [aspect, setAspect] = useState(1)
  const [mediaType, setMediaType] = useState<SupportedMediaType>("image/jpeg")
  const [caption, setCaption] = useState("")
  const [askLara, setAskLara] = useState(true)
  const [step, setStep] = useState<ModalStep>("compose")
  const [laraComment, setLaraComment] = useState<string>("")
  const [typed, setTyped] = useState<string>("")

  // Typewriter the Lara comment in success state.
  useEffect(() => {
    if (step !== "success" || !laraComment) return
    setTyped("")
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(laraComment.slice(0, i))
      if (i >= laraComment.length) window.clearInterval(id)
    }, 22)
    return () => window.clearInterval(id)
  }, [step, laraComment])

  // Auto-close on success after 3.2s.
  useEffect(() => {
    if (step !== "success") return
    const t = window.setTimeout(onClose, 3200)
    return () => window.clearTimeout(t)
  }, [step, onClose])

  const handlePickFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("That doesn't look like a photo file.")
      return
    }
    if (file.size > 6 * 1024 * 1024) {
      toast.warning("Photo is over 6 MB — Scholify will compress it for you.")
    }
    try {
      const raw = await fileToDataURL(file)
      const scaled = await downscaleImage(raw.dataUrl, raw.mediaType)
      setDataUrl(scaled.dataUrl)
      setAspect(scaled.aspectRatio)
      setMediaType(scaled.mediaType)
    } catch {
      toast.error("Couldn't read that photo — try a different one.")
    }
  }, [toast])

  const onFilePicked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0]
      if (f) handlePickFile(f)
      // Reset so the same file can be picked again later.
      if (fileRef.current) fileRef.current.value = ""
    },
    [handlePickFile],
  )

  const onSave = useCallback(async () => {
    if (!dataUrl) {
      toast.warning("Add a photo first.")
      return
    }
    setStep("uploading")
    let comment: string | undefined = undefined
    if (askLara) {
      try {
        const res = await api.analyzePhoto({
          goal,
          taskTitle,
          caption,
          imageBase64: dataUrlToBase64(dataUrl),
          mediaType,
        })
        comment = (res.comment || "").trim() || undefined
      } catch {
        // Server-side fallback already handled — empty comment just means
        // we skip the bubble in success state.
      }
    }
    try {
      await savePhoto({
        userId: user?.id || "demo-user",
        planId: readActivePlanId() || readPlan().id || null,
        dayNumber,
        taskTitle,
        goal,
        caption: caption.trim(),
        dataUrl,
        mediaType,
        aspectRatio: aspect,
        laraComment: comment,
      })
      setLaraComment(comment || "")
      setStep("success")
      toast.success("Photo evidence saved ✓")
    } catch {
      toast.error("Couldn't save the photo. Try again.")
      setStep("compose")
    }
  }, [aspect, askLara, caption, dataUrl, dayNumber, goal, mediaType, taskTitle, toast, user?.id])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={backdropStyle}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        style={modalStyle}
      >
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>📸 Photo Evidence</p>
            <p style={{ marginTop: 4, fontSize: 13, color: TEXT_MUTED }}>
              Show Lara what you worked on today.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" style={closeBtnStyle}>
            ×
          </button>
        </div>

        {/* Camera / preview area */}
        <div style={cameraAreaStyle}>
          {!dataUrl ? (
            <button onClick={() => fileRef.current?.click()} style={dropTargetStyle} type="button">
              <span style={{ fontSize: 48, color: "var(--sch-tx-4)" }} aria-hidden>
                📷
              </span>
              <p style={{ marginTop: 12, fontSize: 15, color: TEXT_MUTED }}>Tap to take photo</p>
              <p style={{ marginTop: 8, fontSize: 13, color: TEXT_DIM }}>or</p>
              <p style={{ marginTop: 6, fontSize: 13, color: "rgba(200,0,0,0.85)", fontWeight: 600 }}>
                Upload from gallery
              </p>
            </button>
          ) : (
            <>
              <img
                src={dataUrl}
                alt="Photo evidence preview"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <button
                aria-label="Remove photo"
                onClick={() => setDataUrl(null)}
                style={removeBtnStyle}
                type="button"
              >
                ×
              </button>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            // `capture` hints mobile browsers to open the camera first;
            // desktop falls back to the file picker. React's typings now
            // include this attribute on input, so no @ts-expect-error.
            capture="environment"
            style={{ display: "none" }}
            onChange={onFilePicked}
          />
        </div>

        {/* Caption */}
        <div style={{ padding: "16px 24px" }}>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value.slice(0, 150))}
            placeholder="I practiced [X] for [Y] minutes..."
            disabled={step !== "compose"}
            style={textareaStyle}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 11,
              color: TEXT_DIM,
            }}
          >
            <span>Add a note about your practice.</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{caption.length}/150</span>
          </div>
        </div>

        {/* Lara reaction toggle */}
        <div style={{ padding: "0 24px 12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: 12,
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Toggle on={askLara} onChange={setAskLara} disabled={step !== "compose"} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, color: TEXT_PRIMARY, fontWeight: 600 }}>
                Ask Lara to comment on your photo
              </p>
              <p style={{ marginTop: 2, fontSize: 11.5, color: TEXT_MUTED, lineHeight: 1.5 }}>
                Lara will analyze your photo and give specific feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Success state — Lara's bubble */}
        <AnimatePresence>
          {step === "success" && laraComment && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ padding: "0 24px 8px" }}
            >
              <div style={laraBubbleStyle}>
                <LaraAvatar size={24} />
                <p style={{ fontSize: 13.5, color: TEXT_PRIMARY, lineHeight: 1.55 }}>{typed || "…"}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div style={{ padding: "12px 24px 24px", display: "grid", gap: 8 }}>
          {step === "success" ? (
            <p style={{ textAlign: "center", fontSize: 13, color: "#34D399", fontWeight: 600 }}>
              Evidence saved ✓
            </p>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: step === "compose" ? 1.02 : 1 }}
                whileTap={{ scale: 0.97 }}
                disabled={step !== "compose" || !dataUrl}
                onClick={onSave}
                style={{
                  ...primaryButtonStyle,
                  opacity: step !== "compose" || !dataUrl ? 0.7 : 1,
                  cursor: step !== "compose" || !dataUrl ? "default" : "pointer",
                }}
              >
                {step === "uploading" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <Spinner />
                    Saving photo…
                  </span>
                ) : (
                  "Save evidence ✓"
                )}
              </motion.button>
              <button onClick={onClose} style={ghostButtonStyle} type="button">
                Skip for now
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function Toggle({
  on,
  onChange,
  disabled,
}: {
  on: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={() => !disabled && onChange(!on)}
      type="button"
      aria-pressed={on}
      style={{
        width: 38,
        height: 22,
        borderRadius: 11,
        background: on ? "rgba(200,0,0,0.45)" : "rgba(255,255,255,0.08)",
        position: "relative",
        border: "none",
        flexShrink: 0,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "background 0.18s",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: on ? 18 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.18s",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  )
}

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block",
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff",
      }}
      aria-hidden
    />
  )
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const backdropStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 120,
  background: "rgba(5,5,8,0.7)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  display: "grid",
  placeItems: "center",
  padding: 16,
}

const modalStyle: CSSProperties = {
  width: "100%",
  maxWidth: 420,
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: 24,
  background: "var(--sch-card, rgba(10,10,20,0.95))",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
  overflow: "hidden",
}

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  padding: "20px 24px",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
}

const closeBtnStyle: CSSProperties = {
  background: "transparent",
  border: "none",
  color: "var(--sch-tx-2)",
  fontSize: 22,
  cursor: "pointer",
  lineHeight: 1,
  padding: 0,
  width: 28,
  height: 28,
}

const cameraAreaStyle: CSSProperties = {
  position: "relative",
  height: 260,
  background: "#0A0A0F",
  overflow: "hidden",
}

const dropTargetStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: 16,
}

const removeBtnStyle: CSSProperties = {
  position: "absolute",
  top: 12,
  right: 12,
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: "rgba(10,10,20,0.7)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: 18,
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
}

const textareaStyle: CSSProperties = {
  width: "100%",
  minHeight: 60,
  resize: "vertical",
  padding: "10px 12px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: TEXT_PRIMARY,
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
}

const primaryButtonStyle: CSSProperties = {
  height: 48,
  borderRadius: 14,
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
  border: "none",
  display: "grid",
  placeItems: "center",
  boxShadow: "0 12px 32px rgba(200,0,0,0.4)",
}

const ghostButtonStyle: CSSProperties = {
  height: 44,
  borderRadius: 12,
  background: "transparent",
  color: TEXT_MUTED,
  fontSize: 13,
  border: "1px solid rgba(255,255,255,0.06)",
  cursor: "pointer",
}

const laraBubbleStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  padding: "11px 14px",
  borderRadius: 14,
  background: "rgba(200,0,0,0.06)",
  border: "1px solid rgba(200,0,0,0.18)",
  borderLeft: "3px solid #C80000",
}

