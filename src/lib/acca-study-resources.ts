/*
 * Learner-owned study resources.
 *
 * Planning metadata only: no third-party text, chapter titles, questions,
 * page ranges or artwork are reproduced here.
 */
export type ResourceProvider = "kaplan" | "bpp" | "acca-study-hub" | "other" | "none"
export type ResourceMaterial = "study-text" | "practice-kit" | "pocket-notes" | "online-course"

export interface StudyResourceProfile {
  paperId: string
  providers: ResourceProvider[]
  primaryProvider: ResourceProvider
  materials: ResourceMaterial[]
  edition: string
  totalChapters: number | null
  completedChapters: number
  updatedAt: string
}

const KEY = "scholify-acca-study-resources"
type Store = Record<string, StudyResourceProfile>

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Store) : {}
  } catch {
    return {}
  }
}

function write(store: Store): void {
  try { window.localStorage.setItem(KEY, JSON.stringify(store)) } catch { /* best effort */ }
}

export function getStudyResource(paperId: string): StudyResourceProfile | null {
  return read()[paperId] ?? null
}

export function setStudyResource(
  paperId: string,
  profile: Omit<StudyResourceProfile, "paperId" | "updatedAt">,
): StudyResourceProfile {
  const providers: ResourceProvider[] = profile.providers.includes("none")
    ? ["none"]
    : profile.providers.filter((provider) => provider !== "none")
  const totalChapters = profile.totalChapters && profile.totalChapters > 0
    ? Math.round(profile.totalChapters)
    : null
  const next: StudyResourceProfile = {
    ...profile,
    paperId,
    providers,
    primaryProvider: providers.includes(profile.primaryProvider)
      ? profile.primaryProvider
      : providers[0] ?? "none",
    totalChapters,
    completedChapters: Math.min(totalChapters ?? Infinity, Math.max(0, Math.round(profile.completedChapters))),
    updatedAt: new Date().toISOString(),
  }
  const store = read()
  store[paperId] = next
  write(store)
  return next
}

export const PROVIDER_LABEL: Record<ResourceProvider, string> = {
  kaplan: "Kaplan",
  bpp: "BPP",
  "acca-study-hub": "ACCA Study Hub",
  other: "Other resource",
  none: "No resource yet",
}

export const MATERIAL_LABEL: Record<ResourceMaterial, string> = {
  "study-text": "Study Text",
  "practice-kit": "Practice Kit",
  "pocket-notes": "Pocket Notes",
  "online-course": "Online course",
}

export function resourceSummary(profile: StudyResourceProfile | null): string {
  if (!profile || profile.providers.includes("none")) return "Scholify study path"
  const providers = profile.providers.map((provider) => PROVIDER_LABEL[provider]).join(" + ")
  const progress = profile.totalChapters ? ` · ${profile.completedChapters}/${profile.totalChapters} chapters` : ""
  return `${providers}${progress}`
}

export function chapterForLearningDay(
  profile: StudyResourceProfile | null,
  learningDayIndex: number,
  totalLearningDays: number,
): number | null {
  if (!profile?.totalChapters || profile.providers.includes("none")) return null
  const first = Math.min(profile.totalChapters, profile.completedChapters + 1)
  const remaining = Math.max(1, profile.totalChapters - profile.completedChapters)
  const progress = totalLearningDays <= 1 ? 0 : learningDayIndex / Math.max(1, totalLearningDays - 1)
  return Math.min(profile.totalChapters, first + Math.floor(progress * (remaining - 1)))
}
