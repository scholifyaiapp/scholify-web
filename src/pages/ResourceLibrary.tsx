import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { format } from "date-fns"
import { DashboardLayout } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import {
  RESOURCE,
  deleteResource,
  readResources,
  toggleResourceBookmark,
  type LibraryResource,
  type ResourceType,
} from "@/lib/scholify-data"

/* ──────────────────────────────────────────────────────────────
 *  Resource Library — every "Best Resource Today" link Lara has
 *  ever surfaced for the user, with filters + search + bookmark.
 * ────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const TEXT2 = "var(--sch-tx-2)"

type FilterKey = "all" | "videos" | "reading" | "practice" | "bookmarked"

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "videos", label: "Videos" },
  { key: "reading", label: "Reading" },
  { key: "practice", label: "Practice" },
  { key: "bookmarked", label: "★ Bookmarked" },
]

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

function badgeFor(type: ResourceType): { icon: string; label: string } {
  return RESOURCE[type] ?? RESOURCE.practice
}

function matchesFilter(r: LibraryResource, f: FilterKey): boolean {
  if (f === "all") return true
  if (f === "bookmarked") return r.bookmarked
  if (f === "videos") return r.resource_type === "video"
  if (f === "reading") return r.resource_type === "reading"
  if (f === "practice")
    return r.resource_type === "practice" || r.resource_type === "exercise"
  return true
}

/* ── Card ────────────────────────────────────────────────────── */

function ResourceCard({
  resource,
  onToggleBookmark,
  onDelete,
}: {
  resource: LibraryResource
  onToggleBookmark: () => void
  onDelete: () => void
}) {
  const meta = badgeFor(resource.resource_type)
  const domain = domainOf(resource.resource_url)
  const dateLabel = (() => {
    try {
      return format(new Date(resource.created_at), "MMM d")
    } catch {
      return ""
    }
  })()

  const open = () => {
    window.open(resource.resource_url, "_blank", "noopener,noreferrer")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: EASE }}
      whileHover={{
        y: -3,
        borderColor: "rgba(200,0,0,0.25)",
      }}
      onClick={open}
      style={{
        position: "relative",
        padding: 20,
        borderRadius: 16,
        background: "var(--sch-card)",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 10px",
            borderRadius: 999,
            fontSize: 11,
            color: "var(--sch-tx-1)",
            background: "var(--sch-card-2)",
            border: "1px solid var(--sch-border)",
          }}
        >
          {meta.icon} {meta.label}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: "var(--sch-tx-3)" }}>{dateLabel}</span>
          <motion.button
            type="button"
            aria-label={resource.bookmarked ? "Remove bookmark" : "Bookmark"}
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark()
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 16,
              color: resource.bookmarked ? "#FBBF24" : "var(--sch-tx-3)",
            }}
          >
            {resource.bookmarked ? "★" : "☆"}
          </motion.button>
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          marginTop: 8,
          fontSize: 14,
          fontWeight: 600,
          color: "var(--sch-text)",
          lineHeight: 1.4,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {resource.resource_title}
      </div>

      {/* For */}
      {resource.task_title && (
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "var(--sch-tx-3)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          For: {resource.task_title}
        </div>
      )}

      {/* Domain */}
      {domain && (
        <div style={{ marginTop: 4, fontSize: 11, color: "var(--sch-tx-3)" }}>
          {domain}
        </div>
      )}

      {/* Bottom row */}
      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "rgba(200,0,0,0.7)",
          }}
          className="sch-open-text"
        >
          Open resource →
        </span>
        <motion.button
          type="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          style={{
            fontSize: 11,
            padding: "4px 10px",
            borderRadius: 8,
            border: "1px solid rgba(255,69,58,0.18)",
            background: "transparent",
            color: "rgba(255,69,58,0.65)",
            cursor: "pointer",
          }}
        >
          Remove
        </motion.button>
      </div>
      <style>{`
        .sch-open-text { transition: color .2s ease; }
        .sch-open-text:hover { color: rgba(200,0,0,1); }
      `}</style>
    </motion.div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

export default function ResourceLibrary() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [resources, setResources] = useState<LibraryResource[]>([])
  const [filter, setFilter] = useState<FilterKey>("all")
  const [query, setQuery] = useState("")

  const refresh = useCallback(() => setResources(readResources()), [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter((r) => {
      if (!matchesFilter(r, filter)) return false
      if (!q) return true
      return (
        r.resource_title.toLowerCase().includes(q) ||
        r.task_title.toLowerCase().includes(q) ||
        r.resource_url.toLowerCase().includes(q)
      )
    })
  }, [resources, filter, query])

  const handleToggle = (id: string) => {
    toggleResourceBookmark(id)
    refresh()
  }

  const handleDelete = (id: string) => {
    deleteResource(id)
    refresh()
    toast.info("Resource removed")
  }

  const isEmpty = resources.length === 0

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        {/* Header */}
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "var(--sch-text)",
            letterSpacing: "-0.4px",
          }}
        >
          📚 Resource Library
        </h1>
        <p style={{ fontSize: 14, color: TEXT2, marginTop: 4 }}>
          Every link Lara recommended, saved forever.
        </p>

        {/* Filters + search */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginTop: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FILTERS.map((f) => {
              const active = filter === f.key
              return (
                <motion.button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  whileHover={
                    active
                      ? undefined
                      : {
                          scale: 1.04,
                          borderColor: "rgba(200,0,0,0.4)",
                        }
                  }
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${
                      active ? "rgba(200,0,0,0.4)" : "var(--sch-border)"
                    }`,
                    background: active
                      ? "rgba(200,0,0,0.07)"
                      : "var(--sch-card)",
                    color: active ? "var(--sch-text)" : "var(--sch-tx-2)",
                  }}
                >
                  {f.label}
                </motion.button>
              )
            })}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            style={searchStyle}
          />
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <EmptyState
              key="empty"
              onCreate={() => navigate("/dashboard")}
              kind="none"
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              key="filter-empty"
              onCreate={() => {
                setFilter("all")
                setQuery("")
              }}
              kind="filter"
            />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                marginTop: 22,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: 16,
              }}
            >
              {filtered.map((r) => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  onToggleBookmark={() => handleToggle(r.id)}
                  onDelete={() => handleDelete(r.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  )
}

/* ── Empty state ─────────────────────────────────────────────── */

function EmptyState({
  onCreate,
  kind,
}: {
  onCreate: () => void
  kind: "none" | "filter"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        marginTop: 36,
        padding: "44px 24px",
        borderRadius: 24,
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        textAlign: "center",
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: 60, opacity: 0.9 }}
      >
        📚
      </motion.div>
      <div
        style={{
          marginTop: 8,
          fontSize: 17,
          fontWeight: 700,
          color: "var(--sch-text)",
        }}
      >
        {kind === "filter" ? "No matches." : "No resources yet."}
      </div>
      <p
        style={{
          marginTop: 6,
          fontSize: 14,
          color: "var(--sch-tx-2)",
          maxWidth: 360,
          marginInline: "auto",
          lineHeight: 1.55,
        }}
      >
        {kind === "filter"
          ? "Try a different filter or search term."
          : "Complete your first task to see Lara's recommendations here."}
      </p>
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCreate}
        style={{
          marginTop: 22,
          padding: "10px 20px",
          borderRadius: 12,
          border: "none",
          background: IRIDESCENT,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(200,0,0,0.25)",
        }}
      >
        {kind === "filter" ? "Clear filters" : "Go to today's task →"}
      </motion.button>
    </motion.div>
  )
}

const searchStyle: CSSProperties = {
  flex: "0 1 260px",
  height: 38,
  padding: "0 16px",
  borderRadius: 20,
  fontSize: 13,
  color: "var(--sch-text)",
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  outline: "none",
}
