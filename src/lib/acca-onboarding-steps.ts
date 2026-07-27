import type { LearnerRoute } from "@/lib/acca-learner-baseline"

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

/** How a returner wants to set their baseline. A beginner has no use for it. */
export const ASSESSMENT_STEP = 8

/** The steps shown, in order, for a learner on this route (null = not yet chosen). */
export function onboardingSteps(learnerRoute: LearnerRoute | null): number[] {
  return Array.from({ length: ONBOARDING_TOTAL }, (_, index) => index).filter(
    (step) => step !== RESOURCE_STEP && (learnerRoute !== "new" || step !== ASSESSMENT_STEP),
  )
}
