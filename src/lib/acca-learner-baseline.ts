export type LearnerRoute = "new" | "course" | "retaker"
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
export type EnglishEvidence = "self" | "vocabulary" | "certificate"

export interface LearnerBaseline {
  route: LearnerRoute
  englishLevel: CefrLevel
  englishEvidence: EnglishEvidence
  certificateName?: string
  certificateType?: "IELTS" | "TOEFL" | "Cambridge" | "Other"
  updatedAt: string
}

const KEY = "scholify-acca-learner-baseline"

export function saveLearnerBaseline(value: LearnerBaseline): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    /* local persistence is best-effort */
  }
}

export function getLearnerBaseline(): LearnerBaseline | null {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null") as Partial<LearnerBaseline> | null
    if (!raw || !["new", "course", "retaker"].includes(String(raw.route))) return null
    if (!["A1", "A2", "B1", "B2", "C1", "C2"].includes(String(raw.englishLevel))) return null
    return raw as LearnerBaseline
  } catch {
    return null
  }
}

export function learnerBaselineLine(): string {
  const baseline = getLearnerBaseline()
  if (!baseline) return ""
  const route = baseline.route === "new"
    ? "new to ACCA"
    : baseline.route === "course"
      ? "has already studied through a course or self-study"
      : "is retaking this paper"
  const support = baseline.englishLevel === "A1" || baseline.englishLevel === "A2"
    ? "Use short sentences, define every technical term, and avoid idioms."
    : baseline.englishLevel === "B1"
      ? "Use clear plain English and briefly define difficult exam vocabulary."
      : baseline.englishLevel === "B2"
        ? "Use standard ACCA English, explaining unusually technical wording."
        : "Normal advanced ACCA language is appropriate."
  return `Starting profile: learner ${route}; English ${baseline.englishLevel} (${baseline.englishEvidence}). ${support}`
}
