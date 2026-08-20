/*
 * Marketing screenshot seeder.
 *
 * Builds the localStorage state of a realistic, five-weeks-in learner for ONE
 * paper — onboarded, entitled, with a diagnostic, a plan, per-area progress, a
 * streak and a mock history — and writes it to a JSON file that the capture
 * script injects into a dev-server page before the app boots.
 *
 * It goes through the app's OWN functions (markAccaOnboarded, setPlan,
 * restoreProgress, saveDiagnosticLocal, recordMock…) under the same
 * MemoryStorage shim the test suite uses, so every key and value is shaped
 * exactly as the app writes it — no hand-guessed formats to rot.
 *
 * The learner is a DEMO PERSONA. Screenshots made from this state show the
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

/* ── Deterministic pseudo-randomness: same seed → same screenshots ── */

let rngState = 20260821
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
      id: "demo-marketing-learner",
      aud: "authenticated",
      role: "authenticated",
      email: "aziz.karimov@scholifyapp.com",
      created_at: isoDaysAgo(34, 9),
      updated_at: now,
      app_metadata: { provider: "demo", plan: "pro", plan_status: "active" },
      user_metadata: { first_name: "Aziz", last_name: "Karimov" },
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
    updatedAt: isoDaysAgo(33, 9),
  })
  resources.setStudyResource(paperId, {
    providers: ["none"],
    primaryProvider: "none",
    materials: [],
    edition: "",
    totalChapters: null,
    completedChapters: 0,
  })

  /* ── The plan: evenings, six days a week, exam ~5 weeks out ── */
  const examDate = new Date()
  examDate.setDate(examDate.getDate() + 36)
  planLib.setPlan(paperId, {
    examDate: examDate.toISOString().slice(0, 10),
    studyTime: "19:00",
    dailyMinutes: 45,
    daysPerWeek: 6,
    studyDays: [1, 2, 3, 4, 5, 6],
    dailyGoal: 18,
    targetProb: 75,
  })
  acca.setDailyGoal(18)

  /* ── The opening diagnostic, five weeks ago: a 48% starting point ── */
  const areaCodes = paper.areas.map((a) => ({ code: a.code, label: a.label }))
  const diagAreas = areaCodes.map(({ code, label }, i) => {
    const score = [0.62, 0.38, 0.55, 0.34, 0.58, 0.66, 0.5][i % 7]
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
    answeredAt: isoDaysAgo(33, 10),
    questionsAnswered: diagAreas.reduce((s, a) => s + a.seen, 0),
    rawCorrect: diagAreas.reduce((s, a) => s + a.correct, 0),
    estimatedScore: 46,
    passProbability: 48,
    confidence: 0.85,
    provisional: false,
    source: "diagnostic",
    areas: diagAreas,
    weakest: sortedByScore.slice(0, 3),
    strongest: sortedByScore.slice(-3).reverse(),
    target: {
      focusAreas: sortedByScore.slice(0, 2).map((a) => a.label),
      targetScore: 0.7,
      projectedPassProbability: 68,
    },
  })

  /* ── Five weeks of practice built from the paper's REAL bank ──
   * ~76% accuracy overall, with the diagnostic's weak areas visibly weaker,
   * so analytics shows a story rather than a flat line. */
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
    const accuracy = Math.min(0.92, (diag?.score ?? 0.55) + 0.22) // improved since the diagnostic
    const share = Math.min(pool.length, Math.max(18, Math.round(pool.length * 0.55)))
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

  /* Daily history: 32 days, six study days a week, 12-day live streak. */
  const daily: Record<string, number> = {}
  const dailyCorrect: Record<string, number> = {}
  const history: string[] = []
  let remaining = totalAnswered
  for (let ago = 32; ago >= 0; ago--) {
    const weekday = new Date(Date.now() - ago * 86400000).getDay()
    const isRest = weekday === 0 && ago > 12 // rest Sundays until the streak run
    if (isRest) continue
    const count = ago === 0 ? 11 : Math.min(remaining, 8 + Math.floor(rand() * 14))
    if (count <= 0) continue
    const key = dayKey(ago)
    daily[key] = count
    dailyCorrect[key] = Math.round(count * (0.68 + rand() * 0.18))
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
    streak: 12,
    daily,
    dailyCorrect,
  })

  /* ── Mock history: three timed sittings, climbing through the pass line ── */
  acca.recordMock(paperId, 24, 46, 1)
  acca.recordMock(paperId, 28, 46, 2)
  acca.recordMock(paperId, 33, 46, 3)
  const mocksRaw = storage.getItem("scholify-acca-mocks")
  if (mocksRaw) {
    const byPaper = JSON.parse(mocksRaw)
    const list = Array.isArray(byPaper) ? byPaper : byPaper[paperId]
    if (Array.isArray(list)) {
      const dates = [dayKey(21), dayKey(11), dayKey(3)]
      list.slice(-3).forEach((mock: { date: string }, i: number) => {
        mock.date = dates[i]
      })
      storage.setItem("scholify-acca-mocks", JSON.stringify(byPaper))
    }
  }

  /* ── Coherence with the rest of the OS ──
   * The progress snapshot alone leaves three counters at zero next to "253
   * answered": the no-repeat ledger (Bank worked through), chapters read, and
   * the flashcard boxes. Seed all three so every surface tells the same story. */
  const noRepeat = await import("@/lib/acca-no-repeat")
  noRepeat.markServed(paperId, "practice", Object.keys(questions[paperId]))

  const { chaptersForPaper, chapterKey } = await import("@/lib/acca-study-content")
  const topicPlan = await import("@/lib/acca-topic-plan")
  const chapters = chaptersForPaper(paperId)
  const readCount = Math.min(chapters.length, Math.round(chapters.length * 0.45))
  for (let i = 0; i < readCount; i++) {
    topicPlan.markChapterRead(paperId, chapterKey(chapters[i]))
  }

  const flashcards = await import("@/lib/acca-flashcards")
  const cards = flashcards.getFlashcards(paperId)
  const reviewedCards = Math.min(cards.length, 56)
  for (let i = 0; i < reviewedCards; i++) {
    // The first ~30 cards get repeated known-reviews so they climb the Leitner
    // boxes into "mastered" — five weeks in, a zero mastered count reads wrong.
    const reps = i < 30 ? 4 : 1
    for (let r = 0; r < reps; r++) flashcards.reviewFlashcard(cards[i].id, rand() < (i < 30 ? 0.97 : 0.8))
  }

  /* The 30-day streak lap (shield record): 12 days in, last active yesterday,
   * so today's session is still ahead — matching the fresh Today board. */
  const monday = (() => {
    const x = new Date()
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7))
    return x.toISOString().slice(0, 10)
  })()
  storage.setItem(
    "scholify-acca-shield",
    JSON.stringify({
      [paperId]: { lastActive: dayKey(1), streak: 12, shieldsUsed: 0, weekAnchor: monday },
    }),
  )

  /* First-run overlays (product notice, workspace tour): already dismissed. */
  storage.setItem("scholify:new-platform-notice:v2", "1")
  storage.setItem("scholify:app-tour:v1", "1")

  const { writeFileSync } = await import("node:fs")
  writeFileSync(outPath, JSON.stringify(storage.entries(), null, 2))
  console.log(
    `seeded ${paperId}: ${totalAnswered} answered (${Math.round((totalCorrect / totalAnswered) * 100)}% correct), ` +
      `${history.length} study days, streak 12, 3 mocks · ${Object.keys(storage.entries()).length} keys → ${outPath}`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
