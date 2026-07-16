/*
 * Scholify — the learner's notebook.
 *
 * One store for every note taken anywhere in the app — while reading a study
 * chapter, drilling questions, sitting a mock, or writing a constructed
 * answer. Each note remembers WHERE it was taken (paper, area, context), so
 * the Notes hub can group and link them back; the hub at /notes is the one
 * place they all live.
 *
 * Storage is device-local (localStorage), consistent with the app's
 * offline-first pattern. Account sync is a planned follow-up (needs its own
 * migration + RLS table) — the hub says so honestly.
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
const EVENT = "scholify:notes-changed"

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
  writeAll(readAll().filter((n) => n.id !== id))
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
