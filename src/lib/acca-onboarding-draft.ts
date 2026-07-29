import type { CefrLevel, EnglishEvidence, LearnerRoute, AssessmentPath } from "@/lib/acca-learner-baseline"
import type { Goal, PaperVariant } from "@/lib/acca-profile"

/*
 * In-progress onboarding answers, kept across a reload.
 *
 * THE GAP THIS CLOSES. Every answer in /welcome lived in component useState and
 * nowhere else. A reload, a closed tab, a phone that dropped the page out of
 * memory, or an accidental back-swipe threw away all of it and restarted the
 * learner at step 0 — after they had already chosen their papers passed, their
 * English level, their exam sitting and possibly uploaded a certificate. On a
 * nine-step flow that is not a minor annoyance; it is the most likely place to
 * lose someone, and it happened silently.
 *
 * WHAT IS NOT SAVED, deliberately:
 *   · File objects (certificate, result PDF) cannot be serialised, and silently
 *     restoring a filename with no file behind it would be worse than asking
 *     again — the upload steps re-ask, and the draft records nothing about them.
 *   · Nothing here is authoritative. This is a convenience cache for a form in
 *     progress; the real write is persist() → setPlan/saveLearnerBaseline/etc.
 *     on completion, and the draft is cleared the moment that succeeds.
 *
 * VERSIONED. A shape change must not resurrect a half-parsed draft into a form
 * that has since gained or lost fields, so a version mismatch is discarded
 * rather than migrated — the cost is one re-answered form, once.
 */

const KEY = "scholify-onboarding-draft"
const VERSION = 1

/** How long an abandoned draft stays offerable. */
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

export interface OnboardingDraft {
  step: number
  learnerRoute: LearnerRoute | null
  passed: string[]
  paper: string | null
  paperVariant: PaperVariant | null
  minutes: number
  daysPerWeek: number
  slot: string
  examDate: string
  pickedSitting: string | null
  goal: Goal | null
  target: number
  englishLevel: CefrLevel | null
  englishEvidence: EnglishEvidence | null
  resultChoice: AssessmentPath | null
}

interface StoredDraft extends OnboardingDraft {
  v: number
  savedAt: string
}

/** Persist the answers so far. Silent on failure — a draft is never critical. */
export function saveOnboardingDraft(draft: OnboardingDraft): void {
  try {
    const payload: StoredDraft = { ...draft, v: VERSION, savedAt: new Date().toISOString() }
    window.localStorage.setItem(KEY, JSON.stringify(payload))
  } catch {
    /* private mode, quota, or no storage — the form still works */
  }
}

/**
 * The saved answers, or null when there is nothing worth restoring.
 *
 * Returns null for a draft that never got past the welcome slide: restoring
 * "step 0, nothing answered" is indistinguishable from a fresh start and would
 * make the resume prompt appear for people who have answered nothing.
 */
export function readOnboardingDraft(): OnboardingDraft | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredDraft>
    if (parsed.v !== VERSION) return null
    if (typeof parsed.step !== "number" || parsed.step <= 0) return null
    const savedAt = parsed.savedAt ? Date.parse(parsed.savedAt) : NaN
    if (!Number.isFinite(savedAt) || Date.now() - savedAt > MAX_AGE_MS) return null
    // A draft with no route answered has nothing the learner would recognise as
    // progress, whatever step number it claims to be on.
    if (!parsed.learnerRoute) return null
    return {
      step: parsed.step,
      learnerRoute: parsed.learnerRoute,
      passed: Array.isArray(parsed.passed) ? parsed.passed.filter((p): p is string => typeof p === "string") : [],
      paper: typeof parsed.paper === "string" ? parsed.paper : null,
      paperVariant: parsed.paperVariant ?? null,
      minutes: typeof parsed.minutes === "number" ? parsed.minutes : 60,
      daysPerWeek: typeof parsed.daysPerWeek === "number" ? parsed.daysPerWeek : 6,
      slot: typeof parsed.slot === "string" ? parsed.slot : "19:00",
      examDate: typeof parsed.examDate === "string" ? parsed.examDate : "",
      pickedSitting: typeof parsed.pickedSitting === "string" ? parsed.pickedSitting : null,
      goal: parsed.goal ?? null,
      target: typeof parsed.target === "number" ? parsed.target : 75,
      englishLevel: parsed.englishLevel ?? null,
      englishEvidence: parsed.englishEvidence ?? null,
      resultChoice: parsed.resultChoice ?? null,
    }
  } catch {
    return null
  }
}

/** Drop the draft. Called the moment onboarding is committed for real. */
export function clearOnboardingDraft(): void {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
