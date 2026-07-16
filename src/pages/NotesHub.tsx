import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Icon, Card, Button, C, R } from "@/components/acca/ui"
import { getNotes, updateNote, deleteNote, onNotesChange, CONTEXT_LABEL, type StudyNote } from "@/lib/acca-notes"
import { syncNotes } from "@/lib/acca-notes-cloud"
import { useAuth } from "@/lib/auth"

/*
 * The notebook — every note taken anywhere in Scholify (study chapters,
 * practice, mocks, constructed-response sessions, quick jots) in ONE place:
 * searchable, filterable by paper, pinned notes first.
 */

function timeAgo(ts: number): string {
  const s = Math.max(1, Math.round((Date.now() - ts) / 1000))
  if (s < 60) return "just now"
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  return d < 7 ? `${d}d ago` : new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

function NoteCard({ note, index }: { note: StudyNote; index: number }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(note.body)

  function saveEdit() {
    if (draft.trim() && draft !== note.body) updateNote(note.id, { body: draft.trim() })
    setEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      <Card style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          {note.paper && (
            <span style={{ fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999, background: C.brandSoft, color: C.brand }}>
              {note.paper}
            </span>
          )}
          {note.area && (
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "var(--sch-card2, #F4F1EC)", color: C.soft }}>
              Area {note.area}
            </span>
          )}
          <span style={{ fontSize: 11, color: C.faint }}>{CONTEXT_LABEL[note.context]}</span>
          <span style={{ fontSize: 11, color: C.faint, marginLeft: "auto" }}>{timeAgo(note.updatedAt)}</span>
        </div>

        {editing ? (
          <div>
            <textarea
              value={draft}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) saveEdit() }}
              rows={3}
              style={{
                width: "100%", boxSizing: "border-box", border: `1px solid ${C.border}`, borderRadius: R.md,
                padding: 10, fontSize: 14, lineHeight: 1.55, fontFamily: "inherit", resize: "vertical",
                background: "var(--sch-bg, #FAFAF7)", color: C.text, outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="ghost" onClick={() => { setDraft(note.body); setEditing(false) }}>Cancel</Button>
            </div>
          </div>
        ) : (
          <p
            onClick={() => setEditing(true)}
            style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: C.text, whiteSpace: "pre-wrap", cursor: "text" }}
          >
            {note.body}
          </p>
        )}

        <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
          <button
            onClick={() => updateNote(note.id, { pinned: !note.pinned })}
            title={note.pinned ? "Unpin" : "Pin to top"}
            style={{
              border: "none", cursor: "pointer", padding: "5px 8px", borderRadius: 8, display: "flex", alignItems: "center", gap: 5,
              background: note.pinned ? C.brandSoft : "transparent", color: note.pinned ? C.brand : C.faint, fontSize: 11.5, fontWeight: 700,
            }}
          >
            <Icon name="pin" size={13} /> {note.pinned ? "Pinned" : "Pin"}
          </button>
          <button
            onClick={() => setEditing(true)}
            style={{ border: "none", cursor: "pointer", padding: "5px 8px", borderRadius: 8, background: "transparent", color: C.faint, fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}
          >
            <Icon name="practice" size={13} /> Edit
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            style={{ border: "none", cursor: "pointer", padding: "5px 8px", borderRadius: 8, background: "transparent", color: C.faint, fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, marginLeft: "auto" }}
          >
            <Icon name="trash" size={13} /> Delete
          </button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function NotesHub() {
  const { user } = useAuth()
  const [tick, setTick] = useState(0)
  const [query, setQuery] = useState("")
  const [paperFilter, setPaperFilter] = useState<string | null>(null)
  useEffect(() => onNotesChange(() => setTick((t) => t + 1)), [])

  // Pull the account copy when the hub opens — a note taken on another
  // device appears here without a reload.
  useEffect(() => {
    let alive = true
    void syncNotes().then((hydrated) => {
      if (hydrated && alive) setTick((t) => t + 1)
    })
    return () => {
      alive = false
    }
  }, [])

  const all = useMemo(() => getNotes(), [tick])
  const papers = useMemo(() => Array.from(new Set(all.map((n) => n.paper).filter((p): p is string => !!p))), [all])
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter(
      (n) => (!paperFilter || n.paper === paperFilter) && (!q || n.body.toLowerCase().includes(q) || (n.area ?? "").toLowerCase().includes(q)),
    )
  }, [all, query, paperFilter])

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 760, margin: "0 auto" }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--sch-text)", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="notes" size={22} color={C.brand} /> My notes
        </h1>
        <p style={{ fontSize: 14, color: "var(--sch-tx-3)", marginTop: 4 }}>
          Everything you jotted down — while studying, practising, or mid-mock — in one place.
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap", alignItems: "center" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your notes…"
            style={{
              flex: 1, minWidth: 200, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px",
              fontSize: 14, background: "var(--sch-card, #fff)", color: C.text, outline: "none",
            }}
          />
          {papers.length > 1 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button
                onClick={() => setPaperFilter(null)}
                style={{
                  padding: "7px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: "pointer",
                  border: `1px solid ${paperFilter === null ? C.brand : C.border}`,
                  background: paperFilter === null ? C.brand : "var(--sch-card, #fff)",
                  color: paperFilter === null ? "#fff" : C.soft,
                }}
              >
                All
              </button>
              {papers.map((p) => (
                <button
                  key={p}
                  onClick={() => setPaperFilter((f) => (f === p ? null : p))}
                  style={{
                    padding: "7px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: "pointer",
                    border: `1px solid ${paperFilter === p ? C.brand : C.border}`,
                    background: paperFilter === p ? C.brand : "var(--sch-card, #fff)",
                    color: paperFilter === p ? "#fff" : C.soft,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
          <AnimatePresence mode="popLayout">
            {shown.map((n, i) => (
              <NoteCard key={n.id} note={n} index={i} />
            ))}
          </AnimatePresence>
          {shown.length === 0 && (
            <Card style={{ textAlign: "center", padding: 36 }}>
              <Icon name="notes" size={28} color={C.faint} />
              <div style={{ fontWeight: 800, fontSize: 16, color: C.text, marginTop: 10 }}>
                {all.length === 0 ? "No notes yet" : "Nothing matches"}
              </div>
              <p style={{ fontSize: 13.5, color: C.soft, margin: "6px auto 0", maxWidth: 380, lineHeight: 1.55 }}>
                {all.length === 0
                  ? "Open the notes tool (the pen icon) while studying, practising or sitting a mock — every note you take lands here, tagged with where you were."
                  : "Try a different search or clear the paper filter."}
              </p>
            </Card>
          )}
        </div>

        {all.length > 0 && (
          <p style={{ fontSize: 11.5, color: C.faint, marginTop: 18, textAlign: "center" }}>
            {user
              ? "Notes are saved on this device and synced to your account."
              : "Notes are stored on this device — sign in and they sync to your account."}
          </p>
        )}
      </motion.div>
    </DashboardLayout>
  )
}
