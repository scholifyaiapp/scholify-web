/*
 * Shared client-side data model for the Scholify app.
 *
 * The plan is produced by onboarding + the loading screen; daily progress
 * is tracked locally (with a best-effort Supabase sync elsewhere). The
 * dashboard and progress pages all read through these helpers so they
 * stay consistent.
 *
 * Multi-plan: the user can have many StoredPlans. The "active" one is
 * mirrored into `scholify-plan` / `scholify-progress` for backwards
 * compatibility with screens that read a single active plan.
 */

export type ResourceType = "video" | "reading" | "practice" | "reflection" | "exercise"

export type PlanStatus = "active" | "paused" | "completed"

export interface PlanTask {
  day_number: number
  week_number: number
  task_title: string
  task_description: string
  estimated_minutes: number
  resource_type: ResourceType
  difficulty?: string
}

export interface StoredPlan {
  id?: string
  goal?: string
  deadline?: string | null
  daily_minutes?: number
  tasks?: PlanTask[]
  status?: PlanStatus
  created_at?: string
  started_at?: string
  paused_at?: string | null
  completed_at?: string | null
  cover_color?: string
}

export interface Progress {
  /** Day numbers the user has marked complete. */
  completed: number[]
  streak: number
  shields: number
  /** ISO yyyy-MM-dd of the last completion, so a refresh keeps "done today". */
  lastDate: string | null
  /** Session reflection notes by day_number. */
  notes?: Record<number, SessionNote>
}

export type SessionMood = "struggling" | "okay" | "good" | "great" | "amazing"

export interface SessionNote {
  text: string
  mood?: SessionMood | null
  updatedAt: string
}

export const RESOURCE: Record<ResourceType, { icon: string; label: string }> = {
  video: { icon: "📹", label: "Video" },
  reading: { icon: "📖", label: "Reading" },
  practice: { icon: "✍️", label: "Practice" },
  reflection: { icon: "🧭", label: "Reflection" },
  exercise: { icon: "🏋️", label: "Exercise" },
}

/* ── Storage keys ────────────────────────────────────────────── */

const KEY_PLAN = "scholify-plan"
const KEY_PROGRESS = "scholify-progress"
const KEY_ONBOARDING = "scholify-onboarding"
const KEY_PLANS = "scholify-plans"
const KEY_ACTIVE = "scholify-active-plan-id"
const progressKeyFor = (id: string) => `scholify-progress-${id}`

/* ── Active-plan helpers (back-compat) ───────────────────────── */

export function readPlan(): StoredPlan {
  try {
    const raw = window.localStorage.getItem(KEY_PLAN)
    if (raw) return JSON.parse(raw) as StoredPlan
    const ob = window.localStorage.getItem(KEY_ONBOARDING)
    if (ob) return { ...(JSON.parse(ob) as StoredPlan), tasks: [] }
  } catch {
    /* ignore */
  }
  return {}
}

export function readProgress(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY_PROGRESS)
    if (raw) {
      const p = JSON.parse(raw) as Partial<Progress>
      return {
        completed: Array.isArray(p.completed) ? p.completed : [],
        streak: typeof p.streak === "number" ? p.streak : 0,
        shields: typeof p.shields === "number" ? p.shields : 2,
        lastDate: p.lastDate ?? null,
        notes: typeof p.notes === "object" && p.notes !== null ? p.notes : {},
      }
    }
  } catch {
    /* ignore */
  }
  // Fresh start — 2 welcome shields to protect the first streak.
  return { completed: [], streak: 0, shields: 2, lastDate: null, notes: {} }
}

export function writeProgress(p: Progress) {
  try {
    window.localStorage.setItem(KEY_PROGRESS, JSON.stringify(p))
    const activeId = readActivePlanId()
    if (activeId) {
      window.localStorage.setItem(progressKeyFor(activeId), JSON.stringify(p))
    }
  } catch {
    /* ignore */
  }
}

/* ── Multi-plan helpers ──────────────────────────────────────── */

function genId(): string {
  // crypto.randomUUID where available; fallback for older browsers/jsdom.
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID()
    }
  } catch {
    /* ignore */
  }
  return `plan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function readPlans(): StoredPlan[] {
  try {
    const raw = window.localStorage.getItem(KEY_PLANS)
    if (raw) {
      const parsed = JSON.parse(raw) as StoredPlan[]
      if (Array.isArray(parsed)) return parsed.map(normalizePlan)
    }
  } catch {
    /* ignore */
  }
  // Migrate the legacy single plan into a one-element list.
  const single = readPlan()
  if (single.goal) {
    const migrated = normalizePlan(single)
    try {
      window.localStorage.setItem(KEY_PLANS, JSON.stringify([migrated]))
      if (!readActivePlanId() && migrated.id) {
        window.localStorage.setItem(KEY_ACTIVE, migrated.id)
      }
    } catch {
      /* ignore */
    }
    return [migrated]
  }
  return []
}

export function readActivePlanId(): string | null {
  try {
    return window.localStorage.getItem(KEY_ACTIVE)
  } catch {
    return null
  }
}

export function readActivePlan(): StoredPlan | null {
  const plans = readPlans()
  if (plans.length === 0) return null
  const id = readActivePlanId()
  const found = id ? plans.find((p) => p.id === id) : undefined
  return found ?? plans.find((p) => p.status !== "completed") ?? plans[0]
}

export function writePlans(plans: StoredPlan[]): void {
  try {
    window.localStorage.setItem(KEY_PLANS, JSON.stringify(plans))
  } catch {
    /* ignore */
  }
}

/** Persist a brand-new plan and (optionally) make it active. */
export function addPlan(
  plan: StoredPlan,
  options: { setActive?: boolean } = { setActive: true },
): StoredPlan {
  const next = normalizePlan({
    ...plan,
    id: plan.id || genId(),
    status: plan.status ?? "active",
    created_at: plan.created_at ?? new Date().toISOString(),
    started_at: plan.started_at ?? new Date().toISOString(),
  })
  const plans = readPlans()
  const existing = plans.findIndex((p) => p.id === next.id)
  if (existing >= 0) plans[existing] = next
  else plans.push(next)
  writePlans(plans)
  if (options.setActive !== false && next.id) setActivePlan(next.id)
  return next
}

export function updatePlan(id: string, patch: Partial<StoredPlan>): StoredPlan | null {
  const plans = readPlans()
  const idx = plans.findIndex((p) => p.id === id)
  if (idx < 0) return null
  const merged = normalizePlan({ ...plans[idx], ...patch, id })
  plans[idx] = merged
  writePlans(plans)
  // If this was the active plan, keep the mirror in sync.
  if (readActivePlanId() === id) {
    try {
      window.localStorage.setItem(KEY_PLAN, JSON.stringify(merged))
    } catch {
      /* ignore */
    }
  }
  return merged
}

export function deletePlan(id: string): void {
  const plans = readPlans().filter((p) => p.id !== id)
  writePlans(plans)
  try {
    window.localStorage.removeItem(progressKeyFor(id))
  } catch {
    /* ignore */
  }
  if (readActivePlanId() === id) {
    // Pick the next active plan (active > paused > completed).
    const next =
      plans.find((p) => p.status === "active") ??
      plans.find((p) => p.status === "paused") ??
      plans[0] ??
      null
    if (next?.id) setActivePlan(next.id)
    else {
      try {
        window.localStorage.removeItem(KEY_ACTIVE)
        window.localStorage.removeItem(KEY_PLAN)
        window.localStorage.removeItem(KEY_PROGRESS)
      } catch {
        /* ignore */
      }
    }
  }
}

/** Mirror the chosen plan into the legacy single-plan keys. */
export function setActivePlan(id: string): StoredPlan | null {
  const plan = readPlans().find((p) => p.id === id)
  if (!plan) return null
  try {
    window.localStorage.setItem(KEY_ACTIVE, id)
    window.localStorage.setItem(KEY_PLAN, JSON.stringify(plan))

    // Mirror per-plan progress into the legacy key.
    const raw = window.localStorage.getItem(progressKeyFor(id))
    if (raw) {
      window.localStorage.setItem(KEY_PROGRESS, raw)
    } else {
      // First time switching to this plan — start its progress fresh.
      const fresh: Progress = { completed: [], streak: 0, shields: 2, lastDate: null }
      window.localStorage.setItem(KEY_PROGRESS, JSON.stringify(fresh))
      window.localStorage.setItem(progressKeyFor(id), JSON.stringify(fresh))
    }
  } catch {
    /* ignore */
  }
  return plan
}

export function readProgressForPlan(id: string): Progress {
  try {
    const raw = window.localStorage.getItem(progressKeyFor(id))
    if (raw) {
      const p = JSON.parse(raw) as Partial<Progress>
      return {
        completed: Array.isArray(p.completed) ? p.completed : [],
        streak: typeof p.streak === "number" ? p.streak : 0,
        shields: typeof p.shields === "number" ? p.shields : 2,
        lastDate: p.lastDate ?? null,
        notes: typeof p.notes === "object" && p.notes !== null ? p.notes : {},
      }
    }
  } catch {
    /* ignore */
  }
  return { completed: [], streak: 0, shields: 2, lastDate: null, notes: {} }
}

/* ── Session notes ───────────────────────────────────────────── */

export function readSessionNote(dayNumber: number): SessionNote | null {
  const p = readProgress()
  return p.notes?.[dayNumber] ?? null
}

export function writeSessionNote(
  dayNumber: number,
  text: string,
  mood?: SessionMood | null,
): void {
  const p = readProgress()
  const notes = { ...(p.notes ?? {}) }
  notes[dayNumber] = {
    text,
    mood: mood ?? null,
    updatedAt: new Date().toISOString(),
  }
  writeProgress({ ...p, notes })
}

/* ── Resource library ────────────────────────────────────────── */

export interface LibraryResource {
  id: string
  plan_id: string | null
  task_title: string
  resource_title: string
  resource_url: string
  resource_type: ResourceType
  bookmarked: boolean
  created_at: string
}

const KEY_RESOURCES = "scholify-resources"

export function readResources(): LibraryResource[] {
  try {
    const raw = window.localStorage.getItem(KEY_RESOURCES)
    if (!raw) return []
    const parsed = JSON.parse(raw) as LibraryResource[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeResources(list: LibraryResource[]): void {
  try {
    window.localStorage.setItem(KEY_RESOURCES, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

export function addResource(
  resource: Omit<LibraryResource, "id" | "created_at" | "bookmarked"> & {
    bookmarked?: boolean
  },
): LibraryResource {
  const list = readResources()
  // De-dupe by URL so the same recommendation isn't logged twice.
  const existing = list.find((r) => r.resource_url === resource.resource_url)
  if (existing) return existing
  const next: LibraryResource = {
    id: genId(),
    plan_id: resource.plan_id ?? null,
    task_title: resource.task_title,
    resource_title: resource.resource_title,
    resource_url: resource.resource_url,
    resource_type: resource.resource_type,
    bookmarked: resource.bookmarked ?? false,
    created_at: new Date().toISOString(),
  }
  writeResources([next, ...list])
  return next
}

export function toggleResourceBookmark(id: string): LibraryResource | null {
  const list = readResources()
  const idx = list.findIndex((r) => r.id === id)
  if (idx < 0) return null
  list[idx] = { ...list[idx], bookmarked: !list[idx].bookmarked }
  writeResources(list)
  return list[idx]
}

export function deleteResource(id: string): void {
  writeResources(readResources().filter((r) => r.id !== id))
}

function normalizePlan(p: StoredPlan): StoredPlan {
  return {
    ...p,
    id: p.id || genId(),
    status: p.status ?? "active",
    cover_color: p.cover_color ?? pickCoverColor(p.goal || ""),
    created_at: p.created_at ?? new Date().toISOString(),
    started_at: p.started_at ?? p.created_at ?? new Date().toISOString(),
  }
}

const COVER_COLORS = [
  "linear-gradient(135deg,#C80000,#F472B6)",
  "linear-gradient(135deg,#F4A405,#C80000)",
  "linear-gradient(135deg,#F59E0B,#F472B6)",
  "linear-gradient(135deg,#34D399,#F4A405)",
  "linear-gradient(135deg,#FB7185,#FBBF24)",
  "linear-gradient(135deg,#D92E10,#60A5FA)",
]

function pickCoverColor(goal: string): string {
  let hash = 0
  for (let i = 0; i < goal.length; i++) hash = (hash * 31 + goal.charCodeAt(i)) | 0
  return COVER_COLORS[Math.abs(hash) % COVER_COLORS.length]
}
