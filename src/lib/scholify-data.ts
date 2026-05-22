/*
 * Shared client-side data model for the Scholify app.
 *
 * The plan is produced by onboarding + the loading screen; daily progress
 * is tracked locally (with a best-effort Supabase sync elsewhere). The
 * dashboard and progress pages all read through these helpers so they
 * stay consistent.
 */

export type ResourceType = "video" | "reading" | "practice" | "reflection" | "exercise"

export interface PlanTask {
  day_number: number
  week_number: number
  task_title: string
  task_description: string
  estimated_minutes: number
  resource_type: ResourceType
}

export interface StoredPlan {
  goal?: string
  deadline?: string | null
  daily_minutes?: number
  tasks?: PlanTask[]
}

export interface Progress {
  /** Day numbers the user has marked complete. */
  completed: number[]
  streak: number
  shields: number
  /** ISO yyyy-MM-dd of the last completion, so a refresh keeps "done today". */
  lastDate: string | null
}

export const RESOURCE: Record<ResourceType, { icon: string; label: string }> = {
  video: { icon: "📹", label: "Video" },
  reading: { icon: "📖", label: "Reading" },
  practice: { icon: "✍️", label: "Practice" },
  reflection: { icon: "🧭", label: "Reflection" },
  exercise: { icon: "🏋️", label: "Exercise" },
}

export function readPlan(): StoredPlan {
  try {
    const raw = window.localStorage.getItem("scholify-plan")
    if (raw) return JSON.parse(raw) as StoredPlan
    const ob = window.localStorage.getItem("scholify-onboarding")
    if (ob) return { ...(JSON.parse(ob) as StoredPlan), tasks: [] }
  } catch {
    /* ignore */
  }
  return {}
}

export function readProgress(): Progress {
  try {
    const raw = window.localStorage.getItem("scholify-progress")
    if (raw) {
      const p = JSON.parse(raw) as Partial<Progress>
      return {
        completed: Array.isArray(p.completed) ? p.completed : [],
        streak: typeof p.streak === "number" ? p.streak : 0,
        shields: typeof p.shields === "number" ? p.shields : 2,
        lastDate: p.lastDate ?? null,
      }
    }
  } catch {
    /* ignore */
  }
  // Fresh start — 2 welcome shields to protect the first streak.
  return { completed: [], streak: 0, shields: 2, lastDate: null }
}

export function writeProgress(p: Progress) {
  try {
    window.localStorage.setItem("scholify-progress", JSON.stringify(p))
  } catch {
    /* ignore */
  }
}
