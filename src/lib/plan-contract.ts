/** The commercial contract shared by pricing copy, entitlement tests and gates. */
export type ProductTier = "trial" | "beginner" | "pro"

export type PlanFeatureKey =
  | "target_paper" | "all_papers" | "study_chapters" | "question_banks"
  | "instant_marking" | "flashcards" | "diagnostic" | "readiness_analytics"
  | "daily_plan" | "charles_tutor" | "timed_mocks" | "ai_examiner"
  | "custom_practice" | "mock_history"

export interface PlanFeatureContract {
  key: PlanFeatureKey
  label: string
  trial: boolean
  beginner: boolean
  pro: boolean
}

export const PLAN_FEATURES: readonly PlanFeatureContract[] = [
  { key: "target_paper", label: "Chosen ACCA paper", trial: true, beginner: true, pro: true },
  { key: "all_papers", label: "All 15 ACCA papers", trial: false, beginner: true, pro: true },
  { key: "study_chapters", label: "Study chapters", trial: true, beginner: true, pro: true },
  { key: "question_banks", label: "Expert-written question banks", trial: true, beginner: true, pro: true },
  { key: "instant_marking", label: "Instant marking and explanations", trial: true, beginner: true, pro: true },
  { key: "flashcards", label: "SRS flashcards", trial: true, beginner: true, pro: true },
  { key: "diagnostic", label: "Diagnostic assessment", trial: true, beginner: true, pro: true },
  { key: "readiness_analytics", label: "Readiness and weak-area analytics", trial: true, beginner: true, pro: true },
  { key: "daily_plan", label: "Personalised daily study plan", trial: true, beginner: true, pro: true },
  { key: "charles_tutor", label: "Charles AI tutor allowance", trial: true, beginner: true, pro: true },
  { key: "timed_mocks", label: "Timed mock exams", trial: true, beginner: false, pro: true },
  { key: "ai_examiner", label: "AI Examiner for written answers", trial: true, beginner: false, pro: true },
  { key: "custom_practice", label: "Custom AI practice from topics or notes", trial: true, beginner: false, pro: true },
  { key: "mock_history", label: "Mock history and readiness trend", trial: true, beginner: false, pro: true },
] as const

export function tierHasFeature(tier: ProductTier, key: PlanFeatureKey): boolean {
  const feature = PLAN_FEATURES.find((item) => item.key === key)
  return Boolean(feature?.[tier])
}
