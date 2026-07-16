/*
 * User avatars — personalisation with a safety net.
 *
 * The image itself lives in Supabase Storage (bucket `avatars`, one folder
 * per user — migration 0019); the pointer lives in user_metadata.avatar_url,
 * a short string, so the JWT stays small. When the cloud path is unavailable
 * — demo mode, offline, or the bucket not yet provisioned — the processed
 * image falls back to a data-URL in localStorage, so personalisation still
 * works on this device and upgrades to the account the next time it can.
 *
 * Google OAuth users arrive with user_metadata.avatar_url already set (their
 * Google photo), so the same read path shows it with zero extra code.
 *
 * supabase-js never throws — every call returns { data, error } — so this
 * module checks `.error` explicitly on each step (the audit lesson).
 */
import type { User } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/** Output square, px. 256 keeps the processed file at ~15-40 KB. */
export const AVATAR_SIZE = 256
/** Source images above this are rejected before decode. */
export const AVATAR_MAX_SOURCE_MB = 8

export type AvatarUser = Pick<User, "id" | "user_metadata"> | null | undefined

const localKey = (uid: string) => `scholify:avatar:${uid}`
const CHANGE_EVENT = "scholify:avatar-changed"

function emitChange(): void {
  try {
    window.dispatchEvent(new Event(CHANGE_EVENT))
  } catch {
    /* SSR/jsdom edge — nothing to notify */
  }
}

/** Subscribe to avatar changes (uploads/removals on this device). */
export function onAvatarChange(fn: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, fn)
  return () => window.removeEventListener(CHANGE_EVENT, fn)
}

/* ── the device-local stopgap ─────────────────────────────────── */

export function getLocalAvatar(uid: string): string | null {
  try {
    return localStorage.getItem(localKey(uid))
  } catch {
    return null
  }
}

export function setLocalAvatar(uid: string, dataUrl: string | null): void {
  try {
    if (dataUrl) localStorage.setItem(localKey(uid), dataUrl)
    else localStorage.removeItem(localKey(uid))
  } catch {
    /* quota/private mode — the avatar just won't persist locally */
  }
  emitChange()
}

/* ── the single read path ─────────────────────────────────────── */

/** The URL to render for this user, or null → show initials. Cloud wins. */
export function avatarUrlOf(user: AvatarUser): string | null {
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>
  const cloud = typeof meta.avatar_url === "string" && meta.avatar_url ? meta.avatar_url : null
  if (cloud) return cloud
  return user?.id ? getLocalAvatar(user.id) : null
}

/* ── processing: centre-crop square → 256px → webp/jpeg ───────── */

/** The largest centred square inside a w×h image. Pure — unit-tested. */
export function coverCrop(w: number, h: number): { sx: number; sy: number; side: number } {
  const side = Math.min(w, h)
  return { sx: Math.round((w - side) / 2), sy: Math.round((h - side) / 2), side }
}

async function decodeImage(file: Blob): Promise<{ src: CanvasImageSource; width: number; height: number; close: () => void }> {
  if (typeof createImageBitmap === "function") {
    const bmp = await createImageBitmap(file)
    return { src: bmp, width: bmp.width, height: bmp.height, close: () => bmp.close() }
  }
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error("decode_failed"))
      el.src = url
    })
    return { src: img, width: img.naturalWidth, height: img.naturalHeight, close: () => URL.revokeObjectURL(url) }
  } catch (e) {
    URL.revokeObjectURL(url)
    throw e
  }
}

export type AvatarError = "too_large" | "not_image" | "decode_failed"

/**
 * Validate + centre-crop + downscale a picked file. Throws Error whose
 * message is an AvatarError code the UI maps to friendly copy.
 */
export async function processAvatarFile(file: File): Promise<{ blob: Blob; dataUrl: string; ext: "webp" | "jpg" }> {
  if (file.size > AVATAR_MAX_SOURCE_MB * 1024 * 1024) throw new Error("too_large")
  if (file.type && !file.type.startsWith("image/")) throw new Error("not_image")

  const img = await decodeImage(file).catch(() => {
    throw new Error("decode_failed")
  })
  try {
    const { sx, sy, side } = coverCrop(img.width, img.height)
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = AVATAR_SIZE
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("decode_failed")
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img.src, sx, sy, side, side, 0, 0, AVATAR_SIZE, AVATAR_SIZE)

    // WebP first; older Safari silently hands back PNG/null → fall to JPEG.
    let blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp", 0.85))
    let ext: "webp" | "jpg" = "webp"
    if (!blob || blob.type !== "image/webp") {
      blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85))
      ext = "jpg"
    }
    if (!blob) throw new Error("decode_failed")
    const dataUrl = canvas.toDataURL(ext === "webp" ? "image/webp" : "image/jpeg", 0.85)
    return { blob, dataUrl, ext }
  } finally {
    img.close()
  }
}

/* ── save / remove ────────────────────────────────────────────── */

export type SaveResult = { mode: "cloud" | "local" }

/**
 * Persist a new avatar. Cloud when possible (Storage + user_metadata),
 * device-local data-URL otherwise. Never leaves the UI empty-handed:
 * by the time this resolves, avatarUrlOf() returns the new picture.
 */
export async function saveAvatar(user: AvatarUser, file: File): Promise<SaveResult> {
  const { blob, dataUrl, ext } = await processAvatarFile(file)

  if (isSupabaseConfigured && user?.id) {
    try {
      const path = `${user.id}/avatar.${ext}`
      const up = await supabase.storage
        .from("avatars")
        .upload(path, blob, { upsert: true, contentType: blob.type, cacheControl: "3600" })
      if (up.error) throw up.error
      const { data } = supabase.storage.from("avatars").getPublicUrl(path)
      // Cache-bust: the path is stable, so stale CDN copies would otherwise
      // outlive an upsert.
      const url = `${data.publicUrl}?v=${Date.now()}`
      const upd = await supabase.auth.updateUser({ data: { avatar_url: url } })
      if (upd.error) throw upd.error
      setLocalAvatar(user.id, null) // cloud is authoritative now
      return { mode: "cloud" }
    } catch {
      /* storage not provisioned / offline → device-local below */
    }
  }

  if (user?.id) setLocalAvatar(user.id, dataUrl)
  return { mode: "local" }
}

/** Remove the avatar everywhere it might live. Best-effort on the cloud. */
export async function removeAvatar(user: AvatarUser): Promise<void> {
  if (user?.id) setLocalAvatar(user.id, null)
  if (isSupabaseConfigured && user?.id) {
    try {
      await supabase.storage.from("avatars").remove([`${user.id}/avatar.webp`, `${user.id}/avatar.jpg`])
      await supabase.auth.updateUser({ data: { avatar_url: null } })
    } catch {
      /* offline — metadata clears next time; local copy is already gone */
    }
  }
  emitChange()
}
