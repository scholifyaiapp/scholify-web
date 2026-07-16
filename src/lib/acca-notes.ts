/*
 * Scholify — the learner's notebook.
 *
 * One store for every note taken anywhere in the app — while reading a study
 * chapter, drilling questions, sitting a mock, or writing a constructed
 * answer. Each note remembers WHERE it was taken (paper, area, context), so
 * the Notes hub can group and link them back; the hub at /notes is the one
 * place they all live.
 *
 * Storage is localStorage-FIRST (instant, offline), with account sync on top:
 * acca-notes-cloud.ts pushes the snapshot to Supabase (one RLS-guarded row per
 * user, migration 0020) and merges the cloud copy back per-note by updatedAt.
 * Deletions carry tombstones so a deleted note cannot resurrect from an old
 * copy on another device.
 */

export type NoteContext = "study" | "practice" | "mock" | "examiner" | "general"

export interface StudyNote {
  id: string
  paper: string | null
  area: string | null
  context: NoteContext
  body: string
  createdAt: number
  updatedAt: number
  pinned: boolean
}

const KEY = "scholify:acca:notes:v1"
const TOMB_KEY = "scholify:acca:notes:tombstones:v1"
const EVENT = "scholify:notes-changed"
/** Tombstones older than this are pruned — every device has synced by then. */
const TOMB_TTL_MS = 120 * 24 * 60 * 60 * 1000

function readAll(): StudyNote[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((n): n is StudyNote => typeof n === "object" && n !== null && typeof (n as StudyNote).id === "string")
  } catch {
    return []
  }
}

function writeAll(notes: StudyNote[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes))
  } catch {
    /* quota — the note stays in memory for this render only */
  }
  try {
    window.dispatchEvent(new Event(EVENT))
  } catch {
    /* non-DOM environment */
  }
}

export function onNotesChange(fn: () => void): () => void {
  window.addEventListener(EVENT, fn)
  return () => window.removeEventListener(EVENT, fn)
}

export function getNotes(): StudyNote[] {
  // Pinned first, then newest — the hub's canonical order.
  return readAll().sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt)
}

export function addNote(input: { paper?: string | null; area?: string | null; context?: NoteContext; body: string }): StudyNote {
  const now = Date.now()
  const note: StudyNote = {
    id: `n_${now.toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    paper: input.paper ?? null,
    area: input.area ?? null,
    context: input.context ?? "general",
    body: input.body.trim(),
    createdAt: now,
    updatedAt: now,
    pinned: false,
  }
  writeAll([note, ...readAll()])
  return note
}

export function updateNote(id: string, patch: Partial<Pick<StudyNote, "body" | "pinned" | "paper" | "area">>): void {
  writeAll(readAll().map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n)))
}

export function deleteNote(id: string): void {
  writeTombstones({ ...readTombstones(), [id]: Date.now() })
  writeAll(readAll().filter((n) => n.id !== id))
}

/* ── Account sync (see acca-notes-cloud.ts) ───────────────────── */

function readTombstones(): Record<string, number> {
  try {
    const raw = localStorage.getItem(TOMB_KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : {}
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {}
    const out: Record<string, number> = {}
    const now = Date.now()
    for (const [id, at] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof at === "number" && now - at < TOMB_TTL_MS) out[id] = at
    }
    return out
  } catch {
    return {}
  }
}

function writeTombstones(tombs: Record<string, number>): void {
  try {
    localStorage.setItem(TOMB_KEY, JSON.stringify(tombs))
  } catch {
    /* quota */
  }
}

export interface NotesSnapshot {
  notes: StudyNote[]
  /** noteId → deletedAt: proof a note was deleted, so it can't resurrect. */
  deleted: Record<string, number>
}

/** The full local state, for pushing to the account. */
export function snapshotNotesForSync(): NotesSnapshot {
  return { notes: readAll(), deleted: readTombstones() }
}

/**
 * Merge the cloud copy into local state: per-note newest-updatedAt wins, and
 * a tombstone beats any copy older than the deletion. Returns whether local
 * was changed (the caller refreshes UI) and whether local has anything the
 * cloud lacks (the caller pushes back).
 */
export function mergeNotesFromCloud(cloud: NotesSnapshot): { hydrated: boolean; needPush: boolean } {
  const localNotes = readAll()
  const cloudNotes = Array.isArray(cloud.notes)
    ? cloud.notes.filter((n): n is StudyNote => typeof n === "object" && n !== null && typeof (n as StudyNote).id === "string")
    : []
  const cloudTombs = cloud.deleted && typeof cloud.deleted === "object" ? cloud.deleted : {}
  const localTombs = readTombstones()

  // Union of tombstones, newest deletion per id.
  const tombs: Record<string, number> = { ...cloudTombs }
  for (const [id, at] of Object.entries(localTombs)) tombs[id] = Math.max(tombs[id] ?? 0, at)

  // Union of notes, newest updatedAt per id, minus anything tombstoned later.
  const byId = new Map<string, StudyNote>()
  for (const n of cloudNotes) byId.set(n.id, n)
  for (const n of localNotes) {
    const other = byId.get(n.id)
    if (!other || (n.updatedAt ?? 0) >= (other.updatedAt ?? 0)) byId.set(n.id, n)
  }
  const merged = [...byId.values()].filter((n) => !(tombs[n.id] && tombs[n.id] >= (n.updatedAt ?? 0)))

  const key = (list: StudyNote[]) =>
    list.map((n) => `${n.id}:${n.updatedAt}:${n.pinned ? 1 : 0}`).sort().join("|")
  const hydrated = key(merged) !== key(localNotes)
  const needPush =
    key(merged) !== key(cloudNotes) ||
    Object.entries(tombs).some(([id, at]) => (cloudTombs as Record<string, number>)[id] !== at)

  writeTombstones(tombs)
  if (hydrated) writeAll(merged)
  return { hydrated, needPush }
}

export function noteCount(): number {
  return readAll().length
}

/** Case-insensitive body search + optional paper filter. */
export function searchNotes(query: string, paper?: string | null): StudyNote[] {
  const q = query.trim().toLowerCase()
  return getNotes().filter(
    (n) => (!paper || n.paper === paper) && (!q || n.body.toLowerCase().includes(q) || (n.area ?? "").toLowerCase().includes(q)),
  )
}

export const CONTEXT_LABEL: Record<NoteContext, string> = {
  study: "While studying",
  practice: "While practising",
  mock: "During a mock",
  examiner: "Constructed response",
  general: "Note",
}
