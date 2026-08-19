/*
 * Scholify — learner profile basics captured at onboarding.
 *
 * Kept in its own tiny module (not acca-loop) so acca-diagnostic can feed the
 * experience level into Charles's learner context without an import cycle.
 */
import { swapVariantScopedRecords } from "@/lib/acca-variant-progress"

export type Experience = "new" | "some" | "professional"

/** The learner's stated ambition, captured at onboarding. */
export type Goal = "first-pass" | "recovery" | "level" | "career"

export const GOAL_OPTIONS: { value: Goal; label: string; blurb: string }[] = [
  { value: "first-pass", label: "Pass first time", blurb: "One clean run at this paper — no retakes." },
  { value: "recovery", label: "Come back from a failed attempt", blurb: "You know the exam now. This time, recover the marks." },
  { value: "level", label: "Finish my level this year", blurb: "Clear the remaining papers of your level on schedule." },
  { value: "career", label: "Build my finance career", blurb: "ACCA membership is the plan — paper by paper." },
]

/**
 * How the learner enters the loop (set on the onboarding ready slide):
 *  - "zero"   — brand new to the paper: learn the basics FIRST; the
 *                diagnostic unlocks after initial study (Dashboard gates it).
 *  - "assess" — has prior knowledge (studied before / failed a sitting):
 *                the diagnostic is the honest starting point.
 */
export type StartMode = "zero" | "assess"
export type PaperVariant = "UK" | "GLOBAL"

const VARIANT_KEY = "scholify-acca-paper-variants"

function defaultVariant(paperId: string): PaperVariant | null {
  if (paperId === "LW") return "GLOBAL"
  if (paperId === "TX") return "UK"
  return null
}

export function getPaperVariant(paperId: string): PaperVariant | null {
  try {
    const saved = JSON.parse(window.localStorage.getItem(VARIANT_KEY) ?? "{}") as Record<string, PaperVariant>
    if (saved[paperId] === "UK" || saved[paperId] === "GLOBAL") return saved[paperId]
  } catch { /* ignore */ }
  return defaultVariant(paperId)
}

export function setPaperVariant(paperId: string, variant: PaperVariant): void {
  if (paperId !== "LW" && paperId !== "TX") return
  const previous = getPaperVariant(paperId)
  try {
    const saved = JSON.parse(window.localStorage.getItem(VARIANT_KEY) ?? "{}") as Record<string, PaperVariant>
    saved[paperId] = variant
    window.localStorage.setItem(VARIANT_KEY, JSON.stringify(saved))
  } catch { /* ignore */ }
  /*
   * The two variants are DIFFERENT SYLLABUSES sharing area letters, so the
   * knowledge model measured on one must never be read as evidence about the
   * other — LW-Global's Area B is the CISG, LW-English's is the law of
   * obligations, and blending them steered weak-area drilling at the wrong
   * law while a Global mock best-% counted toward the UK mock gate. The swap
   * archives the old variant's records and restores any the new variant had,
   * so switching back returns the learner exactly where they left off.
   * Streaks, daily activity and the plan stay put: effort is variant-free.
   */
  if (previous && previous !== variant) swapVariantScopedRecords(paperId, previous, variant)
}

/*
 * The label shown wherever the learner's chosen route is displayed.
 *
 * LW's GLOBAL option is an OFFICIAL ACCA exam variant, so it is labelled "Global". TX's is
 * not — it is a jurisdiction-neutral foundation track with no exam behind it — so it is
 * labelled "Foundation" instead. Calling both "Global" implied TX-Global was an exam route
 * a learner could sit, which it is not.
 */
export function paperVariantLabel(paperId: string): string {
  const variant = getPaperVariant(paperId)
  if (!variant) return paperId
  if (variant === "UK") return `${paperId} · United Kingdom`
  return `${paperId} · ${paperId === "TX" ? "Foundation" : "Global"}`
}

const START_KEY = "scholify-acca-startmode"

export function getStartMode(): StartMode {
  try {
    const v = window.localStorage.getItem(START_KEY)
    if (v === "zero" || v === "assess") return v
  } catch { /* ignore */ }
  return "assess"
}

export function setStartMode(m: StartMode): void {
  try { window.localStorage.setItem(START_KEY, m) } catch { /* ignore */ }
}

/**
 * The honest fork (Doc 12, Phase 1): the learner's stated experience decides
 * how they enter the loop.
 *  - "new"  → "zero": learn A·B·C first; the diagnostic is deferred until the
 *              basics are covered (a pass probability now would just be a guess).
 *  - "some" | "professional" → "assess": the diagnostic is the honest start —
 *              measure where they stand so the plan targets their weak spots.
 *  - unset  → "assess": the safe general default (diagnostic recommended).
 */
export function startModeForExperience(exp: Experience | null): StartMode {
  return exp === "new" ? "zero" : "assess"
}

const KEY = "scholify-acca-experience"
const ONBOARDED_KEY = "scholify-acca-onboarded"
const GOAL_KEY = "scholify-acca-goal"

export function getGoal(): Goal | null {
  try {
    const v = window.localStorage.getItem(GOAL_KEY)
    if (v === "first-pass" || v === "recovery" || v === "level" || v === "career") return v
  } catch {
    /* ignore */
  }
  return null
}

export function setGoal(g: Goal): void {
  try {
    window.localStorage.setItem(GOAL_KEY, g)
  } catch {
    /* ignore */
  }
}

/** Has the ACCA onboarding wizard been completed? (single source of truth) */
export function isAccaOnboarded(): boolean {
  try {
    return window.localStorage.getItem(ONBOARDED_KEY) === "1"
  } catch {
    return false
  }
}

export function markAccaOnboarded(): void {
  try {
    window.localStorage.setItem(ONBOARDED_KEY, "1")
  } catch {
    /* ignore */
  }
}

export const EXPERIENCE_OPTIONS: { value: Experience; emoji: string; label: string; blurb: string }[] = [
  { value: "new", emoji: "🌱", label: "New to accounting", blurb: "Starting fresh — everything from first principles." },
  { value: "some", emoji: "📗", label: "Some background", blurb: "Studied it before — faster on the basics." },
  { value: "professional", emoji: "💼", label: "Working in finance", blurb: "On the job already — focus on exam technique." },
]

export function getExperience(): Experience | null {
  try {
    const v = window.localStorage.getItem(KEY)
    if (v === "new" || v === "some" || v === "professional") return v
  } catch {
    /* ignore */
  }
  return null
}

export function setExperience(v: Experience): void {
  try {
    window.localStorage.setItem(KEY, v)
  } catch {
    /* ignore */
  }
}

/** Prompt-ready line about the student's background, or "" when unknown. */
export function experienceLine(): string {
  const v = getExperience()
  if (!v) return ""
  const map: Record<Experience, string> = {
    new: "The student is new to accounting — explain from first principles, avoid assumed jargon.",
    some: "The student has some accounting background — they can move faster on basics.",
    professional: "The student works in finance — focus on exam technique over basic concepts.",
  }
  return map[v]
}
