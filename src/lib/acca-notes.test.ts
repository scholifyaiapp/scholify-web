import { describe, it, expect, beforeEach } from "vitest"
import {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  snapshotNotesForSync,
  mergeNotesFromCloud,
  type StudyNote,
} from "@/lib/acca-notes"

/*
 * The notes sync merge — the invariants that make cross-device notes safe:
 * newest edit wins per note, a deletion never resurrects from a stale copy,
 * and the merge reports honestly whether local changed / the cloud is behind.
 */

function cloudNote(id: string, body: string, updatedAt: number): StudyNote {
  return { id, paper: "FA", area: "G", context: "study", body, createdAt: updatedAt, updatedAt, pinned: false }
}

beforeEach(() => {
  localStorage.clear()
})

describe("notes sync merge", () => {
  it("hydrates notes that only exist in the cloud", () => {
    const { hydrated } = mergeNotesFromCloud({ notes: [cloudNote("c1", "from another device", 1000)], deleted: {} })
    expect(hydrated).toBe(true)
    expect(getNotes().map((n) => n.id)).toEqual(["c1"])
  })

  it("keeps the newer copy per note, in either direction", () => {
    const local = addNote({ body: "local original" })
    // Cloud holds an OLDER copy of the same note — local wins, cloud is behind.
    const older = cloudNote(local.id, "stale cloud copy", local.updatedAt - 5000)
    const r1 = mergeNotesFromCloud({ notes: [older], deleted: {} })
    expect(r1.hydrated).toBe(false)
    expect(r1.needPush).toBe(true)
    expect(getNotes()[0].body).toBe("local original")

    // Cloud holds a NEWER copy — cloud wins.
    const newer = cloudNote(local.id, "edited elsewhere", local.updatedAt + 5000)
    const r2 = mergeNotesFromCloud({ notes: [newer], deleted: {} })
    expect(r2.hydrated).toBe(true)
    expect(getNotes()[0].body).toBe("edited elsewhere")
  })

  it("a local deletion produces a tombstone that beats the stale cloud copy", () => {
    const n = addNote({ body: "doomed" })
    deleteNote(n.id)
    expect(snapshotNotesForSync().deleted[n.id]).toBeTypeOf("number")

    // The cloud still has the old copy — it must NOT resurrect.
    const { hydrated, needPush } = mergeNotesFromCloud({ notes: [cloudNote(n.id, "doomed", n.updatedAt)], deleted: {} })
    expect(hydrated).toBe(false)
    expect(getNotes()).toHaveLength(0)
    // The cloud is behind (it lacks the tombstone) — a push is due.
    expect(needPush).toBe(true)
  })

  it("a cloud deletion removes the local copy", () => {
    const n = addNote({ body: "deleted on the other device" })
    const { hydrated } = mergeNotesFromCloud({ notes: [], deleted: { [n.id]: n.updatedAt + 1000 } })
    expect(hydrated).toBe(true)
    expect(getNotes()).toHaveLength(0)
  })

  it("a note EDITED after its tombstone survives (edit beats older deletion)", () => {
    const edited = cloudNote("n1", "revived by a newer edit", 10_000)
    const { hydrated } = mergeNotesFromCloud({ notes: [edited], deleted: { n1: 5_000 } })
    expect(hydrated).toBe(true)
    expect(getNotes().map((n) => n.id)).toEqual(["n1"])
  })

  it("identical states need neither hydration nor a push", () => {
    const n = addNote({ body: "steady state" })
    updateNote(n.id, { pinned: true })
    const snap = snapshotNotesForSync()
    const { hydrated, needPush } = mergeNotesFromCloud(snap)
    expect(hydrated).toBe(false)
    expect(needPush).toBe(false)
  })
})
