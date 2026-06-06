import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { format } from "date-fns"
import LaraAvatar from "@/components/LaraAvatar"
import { readPhotos, subscribePhotos, type StudyPhoto } from "@/lib/photos-storage"

/*
 * PhotoGallery — masonry-style grid + lightbox.
 *
 * Two columns on mobile, three on desktop, distributing photos so the
 * column heights stay roughly balanced (lightweight, no extra library).
 * Click a photo to open a fullscreen lightbox with ← → keyboard nav,
 * caption, and Lara's comment.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

export default function PhotoGallery() {
  const [tick, setTick] = useState(0)
  useEffect(() => subscribePhotos(() => setTick((t) => t + 1)), [])

  const photos = useMemo(() => readPhotos(), [tick])
  const sessions = useMemo(() => new Set(photos.map((p) => p.dayNumber).filter(Boolean)).size, [photos])

  const [columns, setColumns] = useState(() => readColumnCount())
  useEffect(() => {
    const onResize = () => setColumns(readColumnCount())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const distributed = useMemo(() => distributeToColumns(photos, columns), [photos, columns])

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const openLightbox = useCallback((p: StudyPhoto) => {
    const i = photos.findIndex((x) => x.id === p.id)
    if (i !== -1) setLightboxIdx(i)
  }, [photos])
  const closeLightbox = useCallback(() => setLightboxIdx(null), [])

  /* Keyboard nav for the lightbox. */
  useEffect(() => {
    if (lightboxIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i === null ? null : Math.min(photos.length - 1, i + 1)))
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i === null ? null : Math.max(0, i - 1)))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIdx, photos.length, closeLightbox])

  if (photos.length === 0) {
    return (
      <div style={emptyStyle}>
        <span style={{ fontSize: 36, color: "var(--sch-tx-4)" }} aria-hidden>
          📷
        </span>
        <p style={{ marginTop: 12, fontSize: 15, color: TEXT_PRIMARY, fontWeight: 600 }}>No photos yet.</p>
        <p style={{ marginTop: 6, fontSize: 13, color: TEXT_MUTED, maxWidth: 320, lineHeight: 1.5 }}>
          Add a photo as evidence right after completing a task. Lara can comment too if you'd like.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }}>📸 Study Journal</h2>
        <span style={{ fontSize: 12.5, color: TEXT_MUTED }}>
          {photos.length} photo{photos.length === 1 ? "" : "s"}
          {sessions > 0 ? ` · ${sessions} session${sessions === 1 ? "" : "s"}` : ""}
        </span>
      </div>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        {distributed.map((col, ci) => (
          <div key={ci} style={{ display: "grid", gap: 10 }}>
            {col.map((p) => (
              <PhotoTile key={p.id} photo={p} onOpen={openLightbox} />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && photos[lightboxIdx] && (
          <Lightbox
            photos={photos}
            index={lightboxIdx}
            onClose={closeLightbox}
            onPrev={() => setLightboxIdx((i) => (i === null ? null : Math.max(0, i - 1)))}
            onNext={() =>
              setLightboxIdx((i) => (i === null ? null : Math.min(photos.length - 1, i + 1)))
            }
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Tile ────────────────────────────────────────────────────────────── */

function PhotoTile({
  photo,
  onOpen,
}: {
  photo: StudyPhoto
  onOpen: (p: StudyPhoto) => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      onClick={() => onOpen(photo)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      type="button"
      style={tileButtonStyle}
    >
      <img
        src={photo.photoUrl}
        alt={photo.caption || photo.taskTitle || "Study photo"}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          aspectRatio: photo.aspectRatio && photo.aspectRatio > 0 ? photo.aspectRatio : 1,
          objectFit: "cover",
        }}
      />
      <AnimatePresence>
        {hovered && (photo.dayNumber || photo.taskTitle) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={tileOverlayStyle}
          >
            {photo.dayNumber != null && (
              <span style={dayPillStyle}>Day {photo.dayNumber}</span>
            )}
            {photo.taskTitle && (
              <span style={overlayTitleStyle}>{photo.taskTitle}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ── Lightbox ────────────────────────────────────────────────────────── */

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: StudyPhoto[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const photo = photos[index]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={lightboxBackdrop}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={lightboxBoxStyle}
      >
        {/* Photo */}
        <div style={{ position: "relative" }}>
          <img
            src={photo.photoUrl}
            alt={photo.caption || photo.taskTitle || "Study photo"}
            style={{
              width: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
              background: "#000",
              display: "block",
            }}
          />
          <button onClick={onClose} aria-label="Close" style={lightboxCloseStyle}>
            ×
          </button>
          {index > 0 && (
            <button aria-label="Previous" onClick={onPrev} style={{ ...navBtnStyle, left: 8 }}>
              ←
            </button>
          )}
          {index < photos.length - 1 && (
            <button aria-label="Next" onClick={onNext} style={{ ...navBtnStyle, right: 8 }}>
              →
            </button>
          )}
        </div>

        {/* Meta */}
        <div style={{ padding: "16px 20px 20px", display: "grid", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 12, color: TEXT_DIM }}>
              {photo.dayNumber != null ? `Day ${photo.dayNumber} · ` : ""}
              {format(new Date(photo.createdAt), "MMM d, yyyy · HH:mm")}
            </span>
            <span style={{ fontSize: 12, color: TEXT_MUTED, fontVariantNumeric: "tabular-nums" }}>
              {index + 1} / {photos.length}
            </span>
          </div>
          {photo.taskTitle && (
            <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY }}>{photo.taskTitle}</p>
          )}
          {photo.caption && (
            <p style={{ fontSize: 13.5, color: TEXT_MUTED, lineHeight: 1.55 }}>{photo.caption}</p>
          )}
          {photo.laraComment && (
            <div style={laraBlockStyle}>
              <LaraAvatar size={24} />
              <p style={{ fontSize: 13, color: TEXT_PRIMARY, lineHeight: 1.55 }}>{photo.laraComment}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function readColumnCount(): number {
  if (typeof window === "undefined") return 2
  return window.innerWidth >= 900 ? 3 : 2
}

function distributeToColumns(photos: StudyPhoto[], columns: number): StudyPhoto[][] {
  const cols: StudyPhoto[][] = Array.from({ length: columns }, () => [])
  const heights = new Array(columns).fill(0)
  for (const p of photos) {
    // Smaller value = taller column (because aspect = w / h).
    const h = 1 / (p.aspectRatio && p.aspectRatio > 0 ? p.aspectRatio : 1)
    let target = 0
    for (let i = 1; i < columns; i++) {
      if (heights[i] < heights[target]) target = i
    }
    cols[target].push(p)
    heights[target] += h
  }
  return cols
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const emptyStyle: CSSProperties = {
  padding: 32,
  borderRadius: 18,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px dashed var(--sch-border, rgba(255,255,255,0.08))",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 4,
}

const tileButtonStyle: CSSProperties = {
  position: "relative",
  display: "block",
  width: "100%",
  padding: 0,
  border: "none",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 12,
  cursor: "pointer",
  overflow: "hidden",
}

const tileOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 12,
  gap: 8,
  borderRadius: 12,
  pointerEvents: "none",
}

const dayPillStyle: CSSProperties = {
  position: "absolute",
  top: 10,
  left: 10,
  padding: "3px 9px",
  borderRadius: 999,
  background: "rgba(10,10,20,0.65)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  color: "#fff",
  fontSize: 11,
  fontWeight: 600,
}

const overlayTitleStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#fff",
  textAlign: "center",
  lineHeight: 1.4,
  maxWidth: "90%",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
}

const lightboxBackdrop: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 140,
  background: "rgba(0,0,0,0.88)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  display: "grid",
  placeItems: "center",
  padding: 16,
}

const lightboxBoxStyle: CSSProperties = {
  width: "100%",
  maxWidth: 720,
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: 18,
  background: "rgba(10,10,20,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
}

const lightboxCloseStyle: CSSProperties = {
  position: "absolute",
  top: 12,
  right: 12,
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "rgba(10,10,20,0.6)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  color: "#fff",
  fontSize: 20,
  border: "1px solid rgba(255,255,255,0.12)",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  lineHeight: 1,
}

const navBtnStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "rgba(10,10,20,0.6)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  color: "#fff",
  fontSize: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  lineHeight: 1,
}

const laraBlockStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  padding: "11px 14px",
  borderRadius: 14,
  background: "rgba(139,92,246,0.06)",
  border: "1px solid rgba(139,92,246,0.18)",
  borderLeft: "3px solid #A78BFA",
}

