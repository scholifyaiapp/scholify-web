import type { CefrLevel, LearnerRoute } from "@/lib/acca-learner-baseline"

const PAPER_LOAD: Record<string, number> = {
  BT: 75, MA: 110, FA: 105, LW: 95,
  PM: 145, TX: 155, FR: 150, AA: 140, FM: 145,
  SBL: 175, SBR: 190, AFM: 190, APM: 180, ATX: 205, AAA: 190,
}

export interface OnboardingGuideInput {
  paperId: string
  route: LearnerRoute | null
  englishLevel: CefrLevel | null
  minutesPerDay: number
  daysPerWeek: number
  examDate: string | null
}

export interface OnboardingGuide {
  recommendedHours: number
  weeklyHours: number
  recommendedWeeks: number
  availableWeeks: number | null
  status: "comfortable" | "focused" | "risky"
  headline: string
  advice: string[]
}

export function buildOnboardingGuide(input: OnboardingGuideInput, now = new Date()): OnboardingGuide {
  const base = PAPER_LOAD[input.paperId] ?? 150
  const routeFactor = input.route === "retaker" ? 0.72 : input.route === "course" ? 0.85 : 1.12
  const languageFactor = input.englishLevel === "A1" || input.englishLevel === "A2"
    ? 1.2
    : input.englishLevel === "B1" ? 1.1 : 1
  const recommendedHours = Math.round(base * routeFactor * languageFactor)
  const weeklyHours = Math.max(1, Math.round((input.minutesPerDay * input.daysPerWeek / 60) * 10) / 10)
  const recommendedWeeks = Math.max(4, Math.ceil(recommendedHours / weeklyHours))
  const exam = input.examDate ? new Date(`${input.examDate}T12:00:00`) : null
  const availableWeeks = exam && !Number.isNaN(exam.getTime())
    ? Math.max(0, Math.ceil((exam.getTime() - now.getTime()) / 604800000))
    : null
  const ratio = availableWeeks === null ? 1 : availableWeeks / recommendedWeeks
  const status = ratio >= 1.15 ? "comfortable" : ratio >= 0.85 ? "focused" : "risky"
  const headline = status === "comfortable"
    ? "Your timing has a healthy buffer."
    : status === "focused"
      ? "Your sitting is realistic with consistency."
      : "This sitting is aggressive for your current workload."
  const advice = [
    `${input.daysPerWeek} consistent days gives you about ${weeklyHours} protected hours each week.`,
    `${input.paperId} needs roughly ${recommendedHours} guided hours from your starting point—about ${recommendedWeeks} weeks at this pace.`,
    status === "risky"
      ? "Choose a later sitting or increase protected study time; Charles will never promise a pass from an impossible calendar."
      : "Charles will use short daily missions, weekly review and timed practice rather than one long catch-up day.",
  ]
  return { recommendedHours, weeklyHours, recommendedWeeks, availableWeeks, status, headline, advice }
}
