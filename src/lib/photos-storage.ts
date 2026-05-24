/*
 * Scholify — Photo Evidence storage.
 *
 * Local-first like every other store: photos live in localStorage as
 * data-URLs so the gallery and lightbox work end-to-end in demo mode.
 * When Supabase Storage is configured the same upload writes to the
 * `study-photos` bucket and persists a real public URL.
 *
 * Quota-safe: a max of ~24 photos kept locally (oldest pruned) — keeps
 * the demo experience working without hitting the ~5 MB localStorage
 * ceiling. Already-uploaded Supabase photos always survive pruning.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/* ── Types ───────────────────────────────────────────────────────────── */

export interface StudyPhoto {
  id: string
  /** Public URL when uploaded to Supabase; otherwise a `data:image/...;base64,` URL. */
  photoUrl: string
  /** True when `photoUrl` is a remote https URL. */
  remote: boolean
  caption: string
  laraComment?: string
  dayNumber?: number
  taskTitle?: string
  goal?: string
  /** Approximate aspect ratio (width / height). Helps the masonry grid. */
  aspectRatio?: number
  createdAt: string
}

/* ── Storage ─────────────────────────────────────────────────────────── */

const KEY_PHOTOS = "scholify-photos"
const MAX_LOCAL_PHOTOS = 24

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent("scholify-photos-change", { detail: key }))
  } catch {
    /* quota hit — caller already pruned, just ignore */
  }
}

export function readPhotos(): StudyPhoto[] {
  return readJSON<StudyPhoto[]>(KEY_PHOTOS, [])
}

function writePhotos(list: StudyPhoto[]): void {
  // Cheap pruning: drop the oldest LOCAL photos first if we're over the
  // cap; remote (already-uploaded) photos are tiny URL strings so they
  // never need to be pruned for space.
  const remote = list.filter((p) => p.remote)
  const local = list.filter((p) => !p.remote).sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
  while (local.length > MAX_LOCAL_PHOTOS) local.shift()
  const merged = [...remote, ...local].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  writeJSON(KEY_PHOTOS, merged)
}

/* ── Subscribe ───────────────────────────────────────────────────────── */

export function subscribePhotos(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const fn = () => handler()
  window.addEventListener("scholify-photos-change", fn)
  window.addEventListener("storage", fn)
  return () => {
    window.removeEventListener("scholify-photos-change", fn)
    window.removeEventListener("storage", fn)
  }
}

/* ── File → data-URL + base64 helpers ────────────────────────────────── */

export type SupportedMediaType = "image/jpeg" | "image/png" | "image/webp" | "image/gif"

function normalizeMediaType(t: string | null | undefined): SupportedMediaType {
  const s = String(t || "").toLowerCase()
  if (s === "image/jpeg" || s === "image/jpg") return "image/jpeg"
  if (s === "image/png") return "image/png"
  if (s === "image/webp") return "image/webp"
  if (s === "image/gif") return "image/gif"
  return "image/jpeg"
}

export async function fileToDataURL(file: File): Promise<{ dataUrl: string; aspectRatio: number; mediaType: SupportedMediaType }> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ""))
    reader.onerror = () => reject(reader.error || new Error("file_read_failed"))
    reader.readAsDataURL(file)
  })
  const aspectRatio = await new Promise<number>((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1)
    img.onerror = () => resolve(1)
    img.src = dataUrl
  })
  return { dataUrl, aspectRatio, mediaType: normalizeMediaType(file.type) }
}

export function dataUrlToBase64(dataUrl: string): string {
  const idx = dataUrl.indexOf(",")
  return idx >= 0 ? dataUrl.slice(idx + 1) : dataUrl
}

/* ── Downscale (best-effort, keeps payloads under the API limit) ─────── */

const TARGET_MAX_DIMENSION = 1280

export async function downscaleImage(
  dataUrl: string,
  mediaType: SupportedMediaType,
): Promise<{ dataUrl: string; aspectRatio: number; mediaType: SupportedMediaType }> {
  if (typeof window === "undefined") return { dataUrl, aspectRatio: 1, mediaType }
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img
      const max = Math.max(w, h)
      if (max <= TARGET_MAX_DIMENSION) {
        resolve({ dataUrl, aspectRatio: w / Math.max(1, h), mediaType })
        return
      }
      const scale = TARGET_MAX_DIMENSION / max
      const cw = Math.round(w * scale)
      const ch = Math.round(h * scale)
      const canvas = document.createElement("canvas")
      canvas.width = cw
      canvas.height = ch
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve({ dataUrl, aspectRatio: w / Math.max(1, h), mediaType })
        return
      }
      ctx.drawImage(img, 0, 0, cw, ch)
      // Prefer JPEG for size when downscaling — preserves PNG transparency
      // only if the source was already PNG and stays small enough.
      const outType: SupportedMediaType = mediaType === "image/png" && cw * ch < 800_000 ? "image/png" : "image/jpeg"
      const next = canvas.toDataURL(outType, 0.85)
      resolve({ dataUrl: next, aspectRatio: cw / ch, mediaType: outType })
    }
    img.onerror = () => resolve({ dataUrl, aspectRatio: 1, mediaType })
    img.src = dataUrl
  })
}

/* ── Upload + persist ────────────────────────────────────────────────── */

export interface SavePhotoInput {
  userId: string
  planId?: string | null
  dayNumber?: number
  taskTitle?: string
  goal?: string
  caption: string
  dataUrl: string
  mediaType: SupportedMediaType
  aspectRatio: number
  laraComment?: string
}

/**
 * Persist the photo locally (and to Supabase Storage if configured).
 * Returns the resulting StudyPhoto row. Never throws — the local-only
 * path is the fallback for both missing config and any upload error.
 */
export async function savePhoto(input: SavePhotoInput): Promise<StudyPhoto> {
  const baseRow: Omit<StudyPhoto, "photoUrl" | "remote"> = {
    id: `ph_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    caption: input.caption,
    laraComment: input.laraComment,
    dayNumber: input.dayNumber,
    taskTitle: input.taskTitle,
    goal: input.goal,
    aspectRatio: input.aspectRatio,
    createdAt: new Date().toISOString(),
  }

  let row: StudyPhoto = { ...baseRow, photoUrl: input.dataUrl, remote: false }

  if (isSupabaseConfigured && input.userId) {
    try {
      const ext =
        input.mediaType === "image/png"
          ? "png"
          : input.mediaType === "image/webp"
            ? "webp"
            : input.mediaType === "image/gif"
              ? "gif"
              : "jpg"
      const path = `${input.userId}/${input.planId || "default"}/${Date.now()}.${ext}`
      const fileBlob = await dataUrlToBlob(input.dataUrl, input.mediaType)
      const { error } = await supabase.storage
        .from("study-photos")
        .upload(path, fileBlob, { contentType: input.mediaType, upsert: false })
      if (!error) {
        const { data: pub } = supabase.storage.from("study-photos").getPublicUrl(path)
        if (pub?.publicUrl) {
          row = { ...baseRow, photoUrl: pub.publicUrl, remote: true }
          // Best-effort row insert; tables may not exist yet.
          supabase
            .from("study_photos")
            .insert({
              user_id: input.userId,
              plan_id: input.planId,
              photo_url: pub.publicUrl,
              caption: input.caption,
              lara_comment: input.laraComment,
              day_number: input.dayNumber,
              task_title: input.taskTitle,
              is_public: false,
            })
            .then(
              () => {},
              () => {},
            )
        }
      }
    } catch (err) {
      console.error("photos: storage upload failed, keeping local copy", err)
    }
  }

  writePhotos([row, ...readPhotos()])
  return row
}

export function deletePhoto(id: string): void {
  writePhotos(readPhotos().filter((p) => p.id !== id))
}

async function dataUrlToBlob(dataUrl: string, mediaType: string): Promise<Blob> {
  const res = await fetch(dataUrl)
  if (res.ok) return await res.blob()
  // Manual fallback when fetch refuses the data: URL.
  const b64 = dataUrlToBase64(dataUrl)
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: mediaType })
}

/* ── Goal-type relevance — used to decide whether to surface the pill ── */

const PHOTO_KEYWORDS = [
  /handwrit|calligraph|notes|journal/i,
  /workout|fitness|yoga|gym|run|exercise|stretch|pull-?up|push-?up|squat/i,
  /cook|bake|recipe|kitchen|baking|meal/i,
  /draw|paint|sketch|art|design|figma/i,
  /read book|finish book|read/i,
  /music|piano|guitar|violin|instrument/i,
  /craft|knit|sew|woodwork/i,
]

export function isPhotoRelevantGoal(goal: string | undefined | null): boolean {
  if (!goal) return false
  return PHOTO_KEYWORDS.some((rx) => rx.test(goal))
}
