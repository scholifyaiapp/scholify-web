/*
 * Marketing screenshot seeder.
 *
 * Builds the localStorage state of a realistic learner for ONE paper —
 * onboarded, entitled, with a diagnostic, a plan, per-area progress, a streak
 * and a mock history — and writes it to a JSON file that the capture script
 * injects into a dev-server page before the app boots.
 *
 * It goes through the app's OWN functions (markAccaOnboarded, setPlan,
 * restoreProgress, saveDiagnosticLocal, recordMock…) under the same
 * MemoryStorage shim the test suite uses, so every key and value is shaped
 * exactly as the app writes it — no hand-guessed formats to rot.
 *
 * EVERY PAPER GETS A DIFFERENT LEARNER: name, streak, days in, exam distance,
 * daily budget, accuracy story, weak areas, mock trajectory. The VARIANTS
 * table below is the single place that controls it, and the RNG is seeded per
 * paper, so each kit's screenshots are distinct AND reproducible.
 *
 * The learners are DEMO PERSONAS. Screenshots made from this state show the
 * real product with plausible progress; they must not be captioned as a
 * specific real student's results.
 *
 * Usage:  npx tsx --tsconfig tsconfig.app.json scripts/marketing-seed.ts BT out.json
 */

/* ── localStorage shim, before any lib import ─────────────────── */

class MemoryStorage implements Storage {
  private store = new Map<string, string>()
  get length(): number {
    return this.store.size
  }
  clear(): void {
    this.store.clear()
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null
  }
  key(index: number): string | null {
    return [...this.store.keys()][index] ?? null
  }
  removeItem(key: string): void {
    this.store.delete(key)
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value))
  }
  entries(): Record<string, string> {
    return Object.fromEntries(this.store)
  }
}

const storage = new MemoryStorage()
const globalAny = globalThis as unknown as Record<string, unknown>
globalAny.localStorage = storage
globalAny.window = globalAny.window ?? {}
;(globalAny.window as Record<string, unknown>).localStorage = storage

/* ── Per-paper learner variants ───────────────────────────────── */

interface Variant {
  first: string
  last: string
  /** Live streak in days; also the tail of unbroken history. */
  streak: number
  /** How long ago the diagnostic was sat / practice began. */
  daysIn: number
  /** Days until the exam date on the plan. */
  examDays: number
  dailyMinutes: number
  daysPerWeek: number
  dailyGoal: number
  /** Fraction of each area's pool answered so far. */
  answeredShare: number
  /** Added to each area's diagnostic score to give current accuracy. */
  accLift: number
  /** Rotates the diagnostic score pattern so weak areas differ per paper. */
  weakOffset: number
  diagPass: number
  diagScore: number
  /** Three mock sittings, [correct, total], oldest first. */
  mocks: [number, number][]
  /** Days ago for each of the three mocks. */
  mockDays: [number, number, number]
  cardsReviewed: number
  mastered: number
  /** Fraction of chapters marked read. */
  readShare: number
}

const VARIANTS: Record<string, Variant> = {
  BT: { first: "Aziz", last: "Karimov", streak: 12, daysIn: 32, examDays: 36, dailyMinutes: 45, daysPerWeek: 6, dailyGoal: 18, answeredShare: 0.55, accLift: 0.22, weakOffset: 0, diagPass: 48, diagScore: 46, mocks: [[24, 46], [28, 46], [33, 46]], mockDays: [21, 11, 3], cardsReviewed: 56, mastered: 30, readShare: 0.45 },
  MA: { first: "Malika", last: "Rustamova", streak: 8, daysIn: 27, examDays: 41, dailyMinutes: 60, daysPerWeek: 5, dailyGoal: 22, answeredShare: 0.48, accLift: 0.2, weakOffset: 2, diagPass: 44, diagScore: 43, mocks: [[21, 50], [29, 50], [34, 50]], mockDays: [17, 9, 2], cardsReviewed: 48, mastered: 22, readShare: 0.4 },
  FA: { first: "Diyor", last: "Saidov", streak: 16, daysIn: 38, examDays: 29, dailyMinutes: 50, daysPerWeek: 6, dailyGoal: 20, answeredShare: 0.58, accLift: 0.24, weakOffset: 4, diagPass: 51, diagScore: 49, mocks: [[26, 50], [32, 50], [38, 50]], mockDays: [24, 12, 4], cardsReviewed: 62, mastered: 34, readShare: 0.55 },
  LW: { first: "Jasmina", last: "Alimova", streak: 6, daysIn: 24, examDays: 47, dailyMinutes: 40, daysPerWeek: 5, dailyGoal: 16, answeredShare: 0.42, accLift: 0.26, weakOffset: 1, diagPass: 52, diagScore: 50, mocks: [[27, 45], [31, 45], [35, 45]], mockDays: [15, 8, 2], cardsReviewed: 44, mastered: 20, readShare: 0.36 },
  PM: { first: "Timur", last: "Nazarov", streak: 14, daysIn: 41, examDays: 33, dailyMinutes: 75, daysPerWeek: 6, dailyGoal: 24, answeredShare: 0.6, accLift: 0.19, weakOffset: 3, diagPass: 39, diagScore: 41, mocks: [[38, 100], [47, 100], [56, 100]], mockDays: [26, 13, 5], cardsReviewed: 66, mastered: 36, readShare: 0.5 },
  TX: { first: "Nilufar", last: "Yusupova", streak: 10, daysIn: 30, examDays: 44, dailyMinutes: 55, daysPerWeek: 5, dailyGoal: 19, answeredShare: 0.5, accLift: 0.23, weakOffset: 5, diagPass: 46, diagScore: 45, mocks: [[43, 100], [52, 100], [58, 100]], mockDays: [19, 10, 3], cardsReviewed: 52, mastered: 26, readShare: 0.44 },
  FR: { first: "Sardor", last: "Mirzaev", streak: 18, daysIn: 44, examDays: 26, dailyMinutes: 80, daysPerWeek: 6, dailyGoal: 25, answeredShare: 0.62, accLift: 0.21, weakOffset: 2, diagPass: 42, diagScore: 44, mocks: [[41, 100], [49, 100], [57, 100]], mockDays: [28, 14, 4], cardsReviewed: 70, mastered: 40, readShare: 0.58 },
  FM: { first: "Kamila", last: "Tosheva", streak: 7, daysIn: 26, examDays: 49, dailyMinutes: 65, daysPerWeek: 5, dailyGoal: 21, answeredShare: 0.46, accLift: 0.22, weakOffset: 4, diagPass: 45, diagScore: 44, mocks: [[40, 100], [48, 100], [54, 100]], mockDays: [16, 8, 2], cardsReviewed: 46, mastered: 21, readShare: 0.38 },
  AA: { first: "Bekzod", last: "Nurmatov", streak: 11, daysIn: 34, examDays: 38, dailyMinutes: 60, daysPerWeek: 6, dailyGoal: 20, answeredShare: 0.52, accLift: 0.2, weakOffset: 1, diagPass: 43, diagScore: 43, mocks: [[39, 100], [46, 100], [53, 100]], mockDays: [22, 11, 3], cardsReviewed: 54, mastered: 27, readShare: 0.46 },
  SBL: { first: "Madina", last: "Islomova", streak: 9, daysIn: 29, examDays: 52, dailyMinutes: 90, daysPerWeek: 5, dailyGoal: 15, answeredShare: 0.4, accLift: 0.23, weakOffset: 6, diagPass: 47, diagScore: 46, mocks: [[42, 100], [50, 100], [56, 100]], mockDays: [18, 9, 2], cardsReviewed: 50, mastered: 24, readShare: 0.34 },
  SBR: { first: "Aybek", last: "Qodirov", streak: 13, daysIn: 36, examDays: 31, dailyMinutes: 70, daysPerWeek: 6, dailyGoal: 18, answeredShare: 0.54, accLift: 0.21, weakOffset: 3, diagPass: 41, diagScore: 42, mocks: [[40, 100], [48, 100], [55, 100]], mockDays: [23, 12, 4], cardsReviewed: 58, mastered: 30, readShare: 0.48 },
  AFM: { first: "Zarina", last: "Bekova", streak: 15, daysIn: 39, examDays: 28, dailyMinutes: 85, daysPerWeek: 6, dailyGoal: 22, answeredShare: 0.56, accLift: 0.2, weakOffset: 2, diagPass: 44, diagScore: 45, mocks: [[41, 100], [50, 100], [58, 100]], mockDays: [25, 13, 4], cardsReviewed: 60, mastered: 32, readShare: 0.52 },
  APM: { first: "Rustam", last: "Ergashev", streak: 5, daysIn: 23, examDays: 55, dailyMinutes: 60, daysPerWeek: 5, dailyGoal: 17, answeredShare: 0.44, accLift: 0.22, weakOffset: 2, diagPass: 40, diagScore: 41, mocks: [[37, 100], [45, 100], [51, 100]], mockDays: [14, 7, 2], cardsReviewed: 42, mastered: 18, readShare: 0.32 },
  ATX: { first: "Sevara", last: "Hamidova", streak: 17, daysIn: 42, examDays: 27, dailyMinutes: 75, daysPerWeek: 6, dailyGoal: 21, answeredShare: 0.58, accLift: 0.21, weakOffset: 4, diagPass: 45, diagScore: 46, mocks: [[43, 100], [51, 100], [59, 100]], mockDays: [27, 14, 5], cardsReviewed: 64, mastered: 35, readShare: 0.54 },
  AAA: { first: "Farrukh", last: "Olimov", streak: 8, daysIn: 28, examDays: 46, dailyMinutes: 65, daysPerWeek: 5, dailyGoal: 16, answeredShare: 0.45, accLift: 0.24, weakOffset: 1, diagPass: 38, diagScore: 40, mocks: [[36, 100], [44, 100], [52, 100]], mockDays: [17, 9, 3], cardsReviewed: 45, mastered: 19, readShare: 0.36 },
}

/* ── Deterministic pseudo-randomness, seeded per paper ─────────── */

let rngState = 0
function rand(): number {
  rngState = (rngState * 1103515245 + 12345) % 2147483648
  return rngState / 2147483648
}

function isoDaysAgo(days: number, atHour = 20): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(atHour, 12, 0, 0)
  return d.toISOString()
}

function dayKey(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().slice(0, 10)
}

async function main() {
  const paperId = process.argv[2] || "BT"
  const outPath = process.argv[3] || `marketing-seed-${paperId}.json`
  const v = VARIANTS[paperId]
  if (!v) throw new Error(`no variant for paper ${paperId}`)
  rngState = 7 + [...paperId].reduce((s, c) => s * 31 + c.charCodeAt(0), 0)

  const { getPapers } = await import("@/lib/acca")
  const paper = getPapers().find((p) => p.id === paperId)
  if (!paper) throw new Error(`unknown paper ${paperId}`)

  const profile = await import("@/lib/acca-profile")
  const qualification = await import("@/lib/acca-qualification")
  const planLib = await import("@/lib/acca-plan")
  const acca = await import("@/lib/acca")
  const diagnostic = await import("@/lib/acca-diagnostic")
  const baseline = await import("@/lib/acca-learner-baseline")
  const resources = await import("@/lib/acca-study-resources")

  /* ── Identity: a Pro demo account (entitlement reads app_metadata) ── */
  const now = new Date().toISOString()
  storage.setItem(
    "scholify-demo-user",
    JSON.stringify({
      id: `demo-marketing-${paperId.toLowerCase()}`,
      aud: "authenticated",
      role: "authenticated",
      email: `${v.first.toLowerCase()}.${v.last.toLowerCase()}@scholifyapp.com`,
      created_at: isoDaysAgo(v.daysIn + 2, 9),
      updated_at: now,
      app_metadata: { provider: "demo", plan: "pro", plan_status: "active" },
      user_metadata: { first_name: v.first, last_name: v.last },
      identities: [],
    }),
  )

  /* ── Onboarding answers ── */
  profile.markAccaOnboarded()
  profile.setExperience("some")
  profile.setStartMode("assess")
  qualification.setCurrentPaper(paperId)
  qualification.setStudyingPapers([paperId])
  baseline.saveLearnerBaseline({
    route: "course",
    englishLevel: "B2",
    englishEvidence: "self",
    assessmentPath: "diagnostic",
    updatedAt: isoDaysAgo(v.daysIn + 1, 9),
  })
  resources.setStudyResource(paperId, {
    providers: ["none"],
    primaryProvider: "none",
    materials: [],
    edition: "",
    totalChapters: null,
    completedChapters: 0,
  })

  /* ── The plan ── */
  const examDate = new Date()
  examDate.setDate(examDate.getDate() + v.examDays)
  const studyDays = v.daysPerWeek === 6 ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]
  planLib.setPlan(paperId, {
    examDate: examDate.toISOString().slice(0, 10),
    studyTime: "19:00",
    dailyMinutes: v.dailyMinutes,
    daysPerWeek: v.daysPerWeek,
    studyDays,
    dailyGoal: v.dailyGoal,
    targetProb: 75,
  })
  acca.setDailyGoal(v.dailyGoal)

  /* ── The opening diagnostic ── */
  const SCORE_PATTERN = [0.62, 0.38, 0.55, 0.34, 0.58, 0.66, 0.5, 0.42, 0.6]
  const areaCodes = paper.areas.map((a) => ({ code: a.code, label: a.label }))
  const diagAreas = areaCodes.map(({ code, label }, i) => {
    const score = SCORE_PATTERN[(i + v.weakOffset) % SCORE_PATTERN.length]
    const seen = 4
    return {
      code,
      label,
      seen,
      correct: Math.round(seen * score),
      score,
      band: (score < 0.45 ? "weak" : score < 0.6 ? "moderate" : "strong") as "weak" | "moderate" | "strong",
    }
  })
  const sortedByScore = [...diagAreas].sort((a, b) => a.score - b.score)
  diagnostic.saveDiagnosticLocal({
    paperId,
    answeredAt: isoDaysAgo(v.daysIn + 1, 10),
    questionsAnswered: diagAreas.reduce((s, a) => s + a.seen, 0),
    rawCorrect: diagAreas.reduce((s, a) => s + a.correct, 0),
    estimatedScore: v.diagScore,
    passProbability: v.diagPass,
    confidence: 0.85,
    provisional: false,
    source: "diagnostic",
    areas: diagAreas,
    weakest: sortedByScore.slice(0, 3),
    strongest: sortedByScore.slice(-3).reverse(),
    target: {
      focusAreas: sortedByScore.slice(0, 2).map((a) => a.label),
      targetScore: 0.7,
      projectedPassProbability: Math.min(80, v.diagPass + 20),
    },
  })

  /* ── Weeks of practice built from the paper's REAL bank ── */
  const bank = acca.getQuestions(paperId)
  const byArea = new Map<string, string[]>()
  for (const q of bank) {
    if (!byArea.has(q.area)) byArea.set(q.area, [])
    byArea.get(q.area)!.push(q.id)
  }

  const questions: Record<string, Record<string, { attempts: number; correct: number }>> = { [paperId]: {} }
  const areas: Record<string, Record<string, { seen: number; correct: number; wSeen: number; wCorrect: number }>> = {
    [paperId]: {},
  }
  let totalAnswered = 0
  let totalCorrect = 0

  for (const { code } of areaCodes) {
    const pool = byArea.get(code) ?? []
    if (!pool.length) continue
    const diag = diagAreas.find((a) => a.code === code)
    const accuracy = Math.min(0.94, (diag?.score ?? 0.55) + v.accLift)
    const share = Math.min(pool.length, Math.max(14, Math.round(pool.length * v.answeredShare)))
    let seen = 0
    let correct = 0
    for (let i = 0; i < share; i++) {
      const hit = rand() < accuracy
      questions[paperId][pool[i]] = { attempts: 1, correct: hit ? 1 : 0 }
      seen += 1
      if (hit) correct += 1
    }
    areas[paperId][code] = { seen, correct, wSeen: seen, wCorrect: correct }
    totalAnswered += seen
    totalCorrect += correct
  }

  /* Daily history with the variant's live streak tail. */
  const daily: Record<string, number> = {}
  const dailyCorrect: Record<string, number> = {}
  const history: string[] = []
  let remaining = totalAnswered
  for (let ago = v.daysIn; ago >= 0; ago--) {
    const weekday = new Date(Date.now() - ago * 86400000).getDay()
    const isRest = weekday === 0 && ago > v.streak
    if (isRest) continue
    const count = ago === 0 ? Math.min(remaining, 11) : Math.min(remaining, 6 + Math.floor(rand() * 16))
    if (count <= 0) continue
    const key = dayKey(ago)
    daily[key] = count
    dailyCorrect[key] = Math.round(count * (0.66 + rand() * 0.2))
    history.push(key)
    remaining -= count
  }

  acca.restoreProgress({
    questions,
    areas,
    totalAnswered,
    totalCorrect,
    lastStudied: isoDaysAgo(0, 19),
    history,
    streak: v.streak,
    daily,
    dailyCorrect,
  })

  /* ── Mock history: three timed sittings, climbing ── */
  for (let i = 0; i < v.mocks.length; i++) acca.recordMock(paperId, v.mocks[i][0], v.mocks[i][1], i + 1)
  const mocksRaw = storage.getItem("scholify-acca-mocks")
  if (mocksRaw) {
    const byPaper = JSON.parse(mocksRaw)
    const list = Array.isArray(byPaper) ? byPaper : byPaper[paperId]
    if (Array.isArray(list)) {
      const dates = v.mockDays.map((d) => dayKey(d))
      list.slice(-3).forEach((mock: { date: string }, i: number) => {
        mock.date = dates[i]
      })
      storage.setItem("scholify-acca-mocks", JSON.stringify(byPaper))
    }
  }

  /* ── Coherence with the rest of the OS ── */
  const noRepeat = await import("@/lib/acca-no-repeat")
  noRepeat.markServed(paperId, "practice", Object.keys(questions[paperId]))

  const { chaptersForPaper, chapterKey } = await import("@/lib/acca-study-content")
  const topicPlan = await import("@/lib/acca-topic-plan")
  const chapters = chaptersForPaper(paperId)
  const readCount = Math.min(chapters.length, Math.round(chapters.length * v.readShare))
  for (let i = 0; i < readCount; i++) {
    topicPlan.markChapterRead(paperId, chapterKey(chapters[i]))
  }

  const flashcards = await import("@/lib/acca-flashcards")
  const cards = flashcards.getFlashcards(paperId)
  const reviewedCards = Math.min(cards.length, v.cardsReviewed)
  for (let i = 0; i < reviewedCards; i++) {
    const reps = i < v.mastered ? 4 : 1
    for (let r = 0; r < reps; r++) flashcards.reviewFlashcard(cards[i].id, rand() < (i < v.mastered ? 0.97 : 0.8))
  }

  /* The 30-day streak lap (shield record). */
  const monday = (() => {
    const x = new Date()
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7))
    return x.toISOString().slice(0, 10)
  })()
  storage.setItem(
    "scholify-acca-shield",
    JSON.stringify({
      [paperId]: { lastActive: dayKey(1), streak: v.streak, shieldsUsed: 0, weekAnchor: monday },
    }),
  )

  /* First-run overlays (product notice, workspace tour): already dismissed. */
  storage.setItem("scholify:new-platform-notice:v2", "1")
  storage.setItem("scholify:app-tour:v1", "1")

  const { writeFileSync } = await import("node:fs")
  writeFileSync(outPath, JSON.stringify(storage.entries(), null, 2))
  console.log(
    `seeded ${paperId} (${v.first} ${v.last}): ${totalAnswered} answered ` +
      `(${Math.round((totalCorrect / totalAnswered) * 100)}%), ${history.length} study days, streak ${v.streak}, ` +
      `exam in ${v.examDays}d → ${outPath}`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
