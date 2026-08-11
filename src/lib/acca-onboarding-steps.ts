import type { LearnerRoute } from "@/lib/acca-learner-baseline"
import type { CharlesPose } from "@/components/CharlesMascot"

/*
 * Which onboarding slides a learner actually sees.
 *
 * Lives here, out of the page, because it is a CONTRACT rather than presentation:
 * the study plan is built from answers this deck collects, so a step quietly
 * missing from the flow silently disables the engine downstream. That is not
 * hypothetical — a second, shorter flow behind a date gate skipped the route
 * question, so persist() never reached saveLearnerBaseline, getLearnerBaseline()
 * returned null for every learner in production, and the whole route-based plan
 * (Rehearse for someone who has finished the material, Strengthen for someone
 * part-way through) was dead code. Nothing could catch it while the list was a
 * ternary inside a component.
 */

/** Slides authored in the deck; steps are indices 0…TOTAL-1. */
export const ONBOARDING_TOTAL = 10

/**
 * "Where are you starting from?" — the journey question.
 *
 * Load-bearing: currentPhase() and the study-order logic both read the route it
 * produces. If this step is ever dropped from the flow, the plan silently
 * regresses to treating every learner as a beginner.
 */
export const ROUTE_STEP = 1

/**
 * "What are you studying with?" — the Kaplan / BPP / ACCA Study Hub picker.
 * Out of the flow until those partnerships exist; Scholify only sequences its own
 * content, so asking implied an integration that does not exist.
 */
export const RESOURCE_STEP = 4

/**
 * "How much time can you protect, daily?" — minutes/day, days/week and the exact
 * practice clock. Named because Charles's capacity fixes navigate here: when the
 * plan is short on time, the remedy is applied and the learner is returned to the
 * control that owns it.
 */
export const TIME_STEP = 5

/** "Which sitting / when is your exam?" — the other lever a capacity fix uses. */
export const EXAM_DATE_STEP = 6

/** How a returner wants to set their baseline. A beginner has no use for it. */
export const ASSESSMENT_STEP = 8

/**
 * Charles's pose on each slide, indexed by STEP number so he stays in step with
 * the question even when a route hides a slide.
 *
 * Lives beside the step list so the two cannot drift: the renderer falls back to
 * "wave" for a missing entry, which would silently give a new slide the wrong
 * expression rather than failing. `satisfies` validates every name against the
 * mascot's own pose union, and the accompanying test asserts one exists for every
 * step the flow can actually show. The CharlesPose import is type-only, so this
 * adds no runtime dependency on the component.
 */
export const SLIDE_POSES = [
  "wave",      // 0 · welcome
  "idea",      // 1 · where are you starting from
  "thinking",  // 2 · how should Charles explain things
  "present",   // 3 · which paper
  "plan",      // 4 · resource step (out of the flow)
  "calm",      // 5 · daily time
  "chart",     // 6 · sitting / exam date
  "run",       // 7 · target readiness score — aiming high, hence "run"
  "thinking",  // 8 · how to baseline
  "success",   // 9 · ready
] as const satisfies readonly CharlesPose[]

/**
 * Short label per STEP number, for the progress rail.
 *
 * Indexed by step number rather than by position, for the same reason SLIDE_POSES
 * is: a route that hides a slide must not shift every label after it onto the
 * wrong question.
 */
export const STEP_LABELS: readonly string[] = [
  "Welcome",
  "Starting point",
  "English",
  "Paper",
  "Materials", // out of the flow — see RESOURCE_STEP
  "Time",
  "Exam date",
  "Target",
  "Baseline",
  "Ready",
] as const

/** The steps shown, in order, for a learner on this route (null = not yet chosen). */
export function onboardingSteps(learnerRoute: LearnerRoute | null): number[] {
  return Array.from({ length: ONBOARDING_TOTAL }, (_, index) => index).filter(
    (step) => ![RESOURCE_STEP, EXAM_DATE_STEP].includes(step) && (learnerRoute !== "new" || step !== ASSESSMENT_STEP),
  )
}

/** "Which paper are we passing?" — referenced by the editable summary rows. */
export const PAPER_STEP = 3

/**
 * "How high are you aiming?" — the target readiness score.
 *
 * BACK IN THE FLOW. This slot held the goal question and was filtered out with
 * RESOURCE_STEP and EXAM_DATE_STEP, which had a consequence nobody had spotted:
 * the target control lived on that same hidden slide, so no learner was ever
 * asked for it and every plan in production silently used the `?? 75` fallback.
 * targetProb is not cosmetic — it scales daily practice volume through
 * ambitionFactor, moves the recommended exam date, and is the line every
 * readiness meter is measured against. The app displayed "THE ROAD TO 75%" as
 * though the learner had chosen it.
 *
 * The slot keeps its number so nothing after it shifts, and sits where it
 * belongs: after the time they can protect, before the plan is built.
 */
export const TARGET_STEP = 7
