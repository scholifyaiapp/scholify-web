/*
 * Scholify — learner profile basics captured at onboarding.
 *
 * Kept in its own tiny module (not acca-loop) so acca-diagnostic can feed the
 * experience level into Lara's learner context without an import cycle.
 */

export type Experience = "new" | "some" | "professional"

/** The learner's stated ambition, captured at onboarding. */
export type Goal = "first-pass" | "recovery" | "level" | "career"

export const GOAL_OPTIONS: { value: Goal; label: string; blurb: string }[] = [
  { value: "first-pass", label: "Pass first time", blurb: "One clean run at this paper — no retakes." },
  { value: "recovery", label: "Come back from a failed attempt", blurb: "You know the exam now. This time, recover the marks." },
  { value: "level", label: "Finish my level this year", blurb: "Clear the remaining papers of your level on schedule." },
  { value: "career", label: "Build my finance career", blurb: "ACCA membership is the plan — paper by paper." },
]

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
