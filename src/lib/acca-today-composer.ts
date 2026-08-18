/*
 * Scholify — TODAY, composed.
 *
 * ── What this replaces ────────────────────────────────────────────
 * The Today tab used to be a summary card: a greeting, a ring, and a button that
 * said "Start Locked In session" — the actual work was hidden behind the overlay,
 * and the plan it built named SYLLABUS AREAS ("Study A · Business organisation",
 * "Practise 30 questions"). Three things were wrong with that and all three are
 * the same thing: the day was not concrete.
 *
 *   · The study block named an area, so it could not be finished and repeated
 *     verbatim for a week (fixed by acca-topic-plan: today's block is a CHAPTER).
 *   · Practice was budget-derived and ran to 30 questions on a long day, which is
 *     not a study session, it is an endurance test. The founder's number is
 *     10–15 a day, tied to the topic.
 *   · Flashcards ran to 40 cards and were drawn from the whole deck, so they had
 *     nothing to do with what had just been read.
 *
 * ── The shape of a day ────────────────────────────────────────────
 * One topic, five ways. This is the ACCA Study Hub / Kaplan sequence, and it is
 * the sequence because each step feeds the next:
 *
 *   1 · STUDY      one exact chapter, timed from its own hardness (4–40 min)
 *   2 · QUIZ       exactly 5 questions on THAT chapter — did the reading land?
 *   3 · PRACTICE   10–15 questions on the same topic — can you apply it?
 *   4 · FLASHCARDS 5–10 cards from that topic's area, due cards first
 *   5 · ARTICLE    one technical read on that exact topic (acca-tech-article)
 *
 * Nothing in the day is drawn twice: every pick goes through the no-repeat
 * ledger, which also claims its ids for the calendar day, so the 5 quizzes and
 * the 12 practice questions cannot overlap even though they come from one bank.
 *
 * The composition is DETERMINISTIC for a given day: the learner can leave and
 * come back and the day is identical, which is what makes the sequential unlock
 * meaningful.
 */

import { getPaper, getPracticeInventory, getQuestions, type AccaQuestion } from "@/lib/acca"
import { getPlan } from "@/lib/acca-plan"
import { getFlashcards, getDueFlashcards, type Flashcard } from "@/lib/acca-flashcards"
import { chapterKey, chaptersForPaper, type StudyChapter } from "@/lib/acca-study-content"
import { getLearnerBaseline } from "@/lib/acca-learner-baseline"
import {
  chapterHardness,
  chapterMinutes,
  isChapterRead,
  nextChapter,
  reviseChapter,
  type ChapterHardness,
} from "@/lib/acca-topic-plan"
import { pickFresh, readTodayPlan, writeTodayPlan } from "@/lib/acca-no-repeat"
import { articleForChapter, isArticleRead, type TechArticle } from "@/lib/acca-tech-article"
import { diagnosticGate } from "@/lib/acca-schedule"
import { getStartMode } from "@/lib/acca-profile"
import { getLatestDiagnostic } from "@/lib/acca-diagnostic"

/* ── The founder's numbers, in one place ──────────────────────────
 * These are product decisions, not tuning knobs. They are exported so the plan
 * preview, the onboarding copy and the landing page quote the SAME numbers the
 * engine actually serves — the previous mismatch (onboarding promised one shape,
 * the app served another) is the thing this constant block exists to prevent.
 */
export const QUIZ_SIZE = 5
export const PRACTICE_MIN = 10
export const PRACTICE_MAX = 15
export const CARDS_MIN = 5
export const CARDS_MAX = 10

/** Minutes per question / per card — the same costs acca-schedule uses. */
const PER_Q = 1.1
const PER_CARD = 0.6

export type BlockKind = "study" | "quiz" | "practice" | "flashcards" | "article" | "diagnostic"

export interface TodayBlock {
  /** Stable per-day id — the sequential-unlock ledger keys off this. */
  id: string
  kind: BlockKind
  /** Step number shown to the learner, 1-based. */
  step: number
  title: string
  detail: string
  minutes: number
  /** Items in the block (questions / cards), where it has a count. */
  count?: number
  /** Syllabus area the block targets. */
  area?: string
  /** The exact chapter the block is tied to. */
  chapterKey?: string
}

export interface TodayComposition {
  paperId: string
  /** Today's exact chapter — null only when a paper has no chapters loaded yet. */
  chapter: StudyChapter | null
  hardness: ChapterHardness | null
  /** True when today's chapter is a second pass on something already read. */
  isRevision: boolean
  /**
   * True when today IS the diagnostic — the milestone day, not a normal one.
   * See `diagnosticDay` below for why it replaces the day rather than joining it.
   */
  isDiagnosticDay: boolean
  /**
   * How far a zero-start learner is from unlocking the diagnostic, while it is
   * still locked. Null for anyone it does not apply to (a returner measured on day
   * one, or anyone who already has a baseline).
   */
  diagnosticGate: { done: number; total: number; nextArea: string | null; nextLabel: string | null } | null
  blocks: TodayBlock[]
  quiz: AccaQuestion[]
  practice: AccaQuestion[]
  cards: Flashcard[]
  article: TechArticle | null
  /** Minutes the composed day actually adds up to. */
  totalMinutes: number
  /** The learner's committed minutes, for the "fits your promise" read. */
  budgetMinutes: number
  /** True when the bank had to reopen a cycle to fill the day. */
  recycled: boolean
}

/* ── Selection helpers ────────────────────────────────────────────*/

/**
 * How far the day's question pool has to widen:
 *   1. `chapter` — tagged with this chapter id, the exam-kit index, always preferred;
 *   2. `area`    — the chapter's syllabus area: correct, just less precise;
 *   3. `paper`   — only when an area has no usable bank at all.
 *
 * TWO invariants have to hold together, and they pull against each other.
 *
 * First, the quiz and the practice step must be at the SAME level. They are one
 * step widening, never a blend: a chapter-scoped quiz beside area-scoped practice
 * is how "practise today's topic" quietly becomes "practise anything".
 *
 * Second, the quiz must not be able to consume the ENTIRE pool. Practice draws
 * from the same scope and excludes whatever the quiz claimed, so a level holding
 * exactly QUIZ_SIZE items leaves practice with nothing — and an empty step cannot
 * be completed, so the learner is stuck behind it with nothing on screen. That is
 * not hypothetical: the old threshold of 3 let SBL compose a day on an area with
 * three questions, the quiz took all three, and practice came out empty.
 *
 * So the level is chosen ONCE, against both pools, and then applied to both. The
 * quiz is tested against the AUTHORED bank and practice against the full
 * inventory, because a level that can fill practice from derived drills but
 * cannot field five authored questions is no use either.
 *
 * The margin is deliberately ONE question rather than the full practice count.
 * Widening as soon as a chapter cannot supply quiz + practice outright would push
 * every paper to area scope — BT indexes 10 questions per chapter and FR 5 to 12,
 * against a practice step of 10 to 15 — discarding the exam-kit chapter index
 * that is the whole point of preferring it. Short pools are topped up by
 * pickFresh; empty ones are the bug.
 */
type PoolScope = "chapter" | "area" | "paper"

function chooseScope(chapter: StudyChapter | null, authored: AccaQuestion[], inventory: AccaQuestion[], quizNeed: number): PoolScope {
  if (!chapter) return "paper"
  const key = chapterKey(chapter)
  const fits = (match: (q: AccaQuestion) => boolean) =>
    authored.filter(match).length >= quizNeed && inventory.filter(match).length > quizNeed
  if (fits((q) => q.chapter === key)) return "chapter"
  if (fits((q) => q.area === chapter.area)) return "area"
  return "paper"
}

function scopedPool(scope: PoolScope, chapter: StudyChapter | null, pool: AccaQuestion[]): AccaQuestion[] {
  if (!chapter || scope === "paper") return pool
  if (scope === "chapter") return pool.filter((q) => q.chapter === chapterKey(chapter))
  return pool.filter((q) => q.area === chapter.area)
}

/** Authored before derived, easy→hard within that — the exam-kit ordering. */
const DIFFICULTY_RANK: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
function questionRank(q: AccaQuestion): number {
  return (q.recall ? 10 : 0) + (DIFFICULTY_RANK[q.difficulty] ?? 1)
}

/** Cards for a chapter's area, with due cards first. */
function cardPool(paperId: string, area: string | undefined): Flashcard[] {
  const all = getFlashcards(paperId)
  const due = new Set(getDueFlashcards(paperId).map((c) => c.id))
  const scoped = area ? all.filter((c) => c.area === area) : all
  const base = scoped.length >= CARDS_MIN ? scoped : all
  // Due first, then the rest — a due card is a card the schedule says is fading.
  return [...base].sort((a, b) => Number(due.has(b.id)) - Number(due.has(a.id)))
}

/* ── The diagnostic day ───────────────────────────────────────────
 *
 * The founder's rule, and the right one: a brand-new learner is NOT measured on
 * day one. A 25-question diagnostic handed to someone who has never opened the
 * syllabus returns noise, and the number it prints ("you're at 23%") is both
 * meaningless and demoralising. Their readiness accrues from daily work instead
 * (projectReadiness), and the diagnostic arrives once they have covered the
 * essential ground — at which point it measures something real and lands as a
 * reward rather than a verdict.
 *
 * WHY IT REPLACES THE DAY. When the gate opens, the diagnostic IS the day. It runs
 * ~15–25 minutes and every number downstream of it changes, so a chapter studied
 * beside it would be planned against a readiness the diagnostic is about to
 * rewrite. Bundling it into a normal day also buries the moment the learner has
 * been working three weeks for.
 */

function diagnosticGateState(paperId: string) {
  const gate = diagnosticGate(paperId)
  const next = gate.sections.find((s) => !s.done)
  return {
    done: gate.done,
    total: gate.total,
    nextArea: next?.area ?? null,
    nextLabel: next?.label ?? null,
    unlocked: gate.unlocked,
  }
}

/**
 * True when today should be the diagnostic.
 *
 * Only for a ZERO-start learner: a returner is measured on day one by the
 * onboarding flow itself (AccaStudy redirects them to /study/diagnostic before the
 * app opens), so they never reach this branch.
 */
export function diagnosticDue(paperId: string): boolean {
  if (getStartMode() !== "zero") return false
  if (getLatestDiagnostic(paperId)) return false
  return diagnosticGateState(paperId).unlocked
}

/* ── The composer ─────────────────────────────────────────────────*/

/**
 * Compose today's day for a paper.
 *
 * `dryRun` composes WITHOUT claiming ids for the day — used by previews (the plan
 * tab, tomorrow's card) which must not consume the day's questions just by being
 * rendered. The live Today tab calls it normally.
 */
export function composeToday(paperId: string, dryRun = false): TodayComposition {
  const paper = getPaper(paperId)
  const plan = getPlan(paperId)
  const budgetMinutes = Math.max(12, plan.dailyMinutes || 25)

  /*
   * THE MILESTONE DAY, checked first. A zero-start learner who has just covered the
   * essential areas gets the diagnostic and nothing else today.
   *
   * This branch was missing when the composer first replaced the action-based plan,
   * and its absence meant the diagnostic never reached a beginner at all: they read
   * chapters indefinitely and were never offered the measurement they had earned.
   */
  if (diagnosticDue(paperId)) {
    const gate = diagnosticGateState(paperId)
    return {
      paperId,
      chapter: null,
      hardness: null,
      isRevision: false,
      isDiagnosticDay: true,
      diagnosticGate: null,
      blocks: [
        {
          id: "diagnostic",
          kind: "diagnostic",
          step: 1,
          title: `You've covered the essentials — see where you stand`,
          detail: `${gate.total} areas studied, practised and revised. About 25 questions across every section of ${paperId}, and your first real Exam Readiness Score — then the whole plan re-tunes around it.`,
          minutes: 25,
        },
      ],
      quiz: [],
      practice: [],
      cards: [],
      article: null,
      totalMinutes: 25,
      budgetMinutes,
      recycled: false,
    }
  }

  // Still working toward it — the board shows the progress so the wait is explained.
  const gate = getStartMode() === "zero" && !getLatestDiagnostic(paperId) ? diagnosticGateState(paperId) : null

  // The PRACTICE route promised "quizzes, practice and flashcards only — no
  // chapters to read". So a practice-route learner does NOT read-and-advance:
  // the day's topic rotates through the syllabus by calendar day, and the study
  // block below is omitted, which makes the sequential board lead with the quiz
  // (the exact thing the route said they'd get). Everyone else keeps the
  // read-then-practise progression.
  const isPracticeRoute = getLearnerBaseline()?.route === "practice"
  const practiceChapters = isPracticeRoute ? chaptersForPaper(paperId) : []

  // Today's topic: the next unread chapter, or — when the paper is fully read —
  // the weakest already-read chapter, because "nothing left to learn" is not the
  // same as "ready", and a revision pass is the honest next thing.
  const fresh = isPracticeRoute ? null : nextChapter(paperId)
  const chapter = isPracticeRoute
    ? practiceChapters.length
      ? practiceChapters[Math.floor(Date.now() / 86_400_000) % practiceChapters.length]
      : null
    : fresh ?? reviseChapter(paperId)
  const isRevision = !isPracticeRoute && !fresh && Boolean(chapter)
  const hardness = chapter ? chapterHardness(chapter) : null

  // No study block for the practice route → no study minutes; the freed time
  // reallocates to more practice and cards below.
  const studyMinutes = isPracticeRoute ? 0 : chapter ? chapterMinutes(paperId, chapter) : Math.round(budgetMinutes * 0.25)
  const article = chapter ? articleForChapter(paperId, chapter) : null

  /*
   * PRACTICE VOLUME. Between 10 and 15, always — the floor holds even on a short
   * day (a 20-minute learner still owes ten questions; that is the promise) and
   * the ceiling holds on a long one (extra minutes buy a second topic later in
   * the plan, never a 40-question grind).
   */
  const quizMinutes = Math.round(QUIZ_SIZE * PER_Q)
  const articleMinutes = article ? article.minutes : 0
  const wantedCards = Math.max(
    CARDS_MIN,
    Math.min(CARDS_MAX, Math.round((budgetMinutes * 0.12) / PER_CARD)),
  )
  const spare = budgetMinutes - studyMinutes - quizMinutes - Math.round(wantedCards * PER_CARD) - articleMinutes
  const practiceCount = Math.max(PRACTICE_MIN, Math.min(PRACTICE_MAX, Math.round(spare / PER_Q)))
  const practiceMinutes = Math.round(practiceCount * PER_Q)

  /*
   * THE CARD DECK IS THE SECOND THING TO GIVE.
   *
   * Cards were sized purely as a share of the budget and then never revisited, so
   * a day that came out over budget kept a deck two or three cards larger than
   * its own floor. That surfaced when the exam-plan layer landed: chapters gained
   * a worked question per section and grew by about a minute, which turned a
   * 40-minute day — the SHORTEST budget onboarding offers — into a 41-minute one.
   *
   * CARDS_MIN is the promise; anything above it is the budget being generous, so
   * it is the right thing to hand back. Practice does not give (PRACTICE_MIN is
   * its own promise) and the chapter cannot be subdivided, so after the article
   * and the surplus cards there is genuinely nothing left — which is the honest
   * overshoot the test below records at budgets shorter than one chapter.
   */
  const overshoot = studyMinutes + quizMinutes + practiceMinutes + Math.round(wantedCards * PER_CARD) - budgetMinutes
  const cardTarget = overshoot > 0
    ? Math.max(CARDS_MIN, wantedCards - Math.ceil(overshoot / PER_CARD))
    : wantedCards
  const cardMinutes = Math.round(cardTarget * PER_CARD)

  /*
   * THE DAY MUST FIT THE TIME THEY PROMISED.
   *
   * PRACTICE_MIN is a floor on purpose — a short day still owes ten questions —
   * but nothing above enforced the ceiling, so on a tight budget the day simply
   * overshot. A learner who committed 40 minutes was handed 45: an 18-minute
   * chapter, 5 quizzes, 10 practice questions, 6 cards AND a 5-minute technical
   * article. Being over budget on day one is how a plan starts being ignored,
   * and it is the opposite of the promise the onboarding made.
   *
   * The article is what gives way. Everything else is the method — read it,
   * check it landed, apply it, fix it in memory — while the article is the
   * examiner's commentary on top. It is genuinely valuable and it is the only
   * block here that is supplementary, so on a day with no room it waits rather
   * than pushing the day past the minutes the learner actually has.
   */
  const coreMinutes = studyMinutes + quizMinutes + practiceMinutes + cardMinutes
  const articleFits = articleMinutes > 0 && coreMinutes + articleMinutes <= budgetMinutes

  /*
   * SELECTION. Quizzes are drawn first and claim their ids, so practice is
   * physically unable to re-serve them (see acca-no-repeat). Quizzes come from
   * the AUTHORED bank only — they are the "did the reading land" check and a
   * derived recall drill is not that. Practice may include derived items, ranked
   * after authored ones.
   */
  const authored = getQuestions(paperId)
  const inventory = getPracticeInventory(paperId)

  // One level for both steps — see chooseScope.
  const scope = chooseScope(chapter, authored, inventory, QUIZ_SIZE)

  /*
   * IDEMPOTENCE. Compose the day once and replay it. The first live compose
   * picks (and claims) its ids and records them; every later compose — the
   * "Locked In" second board, a reload, or a dry-run preview — rebuilds the
   * identical set from the stored ids rather than re-picking against an
   * already-claimed pool (which returned nothing and bricked the day). A dry
   * run with no stored plan yet computes a non-claiming preview and does not
   * persist, so it still matches the live compose that follows.
   */
  const chapterId = chapter?.id ?? "none"
  const storedPlan = readTodayPlan(paperId, chapterId)
  const replay = <T extends { id: string }>(kind: string, pool: T[]): { items: T[]; recycled: boolean; freshLeft: number } | null => {
    const ids = storedPlan?.[kind]
    if (!ids) return null
    const byId = new Map(pool.map((i) => [i.id, i]))
    const items = ids.map((id) => byId.get(id)).filter((x): x is T => Boolean(x))
    // If the bank changed and the stored ids no longer resolve, fall through to
    // a fresh pick rather than serving an empty step.
    return items.length ? { items, recycled: false, freshLeft: 0 } : null
  }

  const quizPool = scopedPool(scope, chapter, authored)
  const quizPick =
    replay("quiz", quizPool) ??
    pickFresh({ paperId, kind: "quiz", pool: quizPool, count: QUIZ_SIZE, rank: questionRank, claimForToday: !dryRun })

  const practicePool = scopedPool(scope, chapter, inventory)
  const practicePick =
    replay("practice", practicePool) ??
    pickFresh({
      paperId,
      kind: "practice",
      pool: practicePool,
      count: practiceCount,
      exclude: quizPick.items.map((q) => q.id),
      rank: questionRank,
      claimForToday: !dryRun,
    })

  const cardsPool = cardPool(paperId, chapter?.area)
  const cardPick =
    replay("card", cardsPool) ??
    pickFresh({ paperId, kind: "card", pool: cardsPool, count: cardTarget, claimForToday: !dryRun })

  // Persist the freshly composed day so the next composition replays it. Only on
  // a live compose (a dry run must neither claim nor persist), and only when we
  // actually picked fresh (no stored plan yet) — replaying must not overwrite.
  if (!dryRun && !storedPlan) {
    writeTodayPlan(paperId, chapterId, {
      quiz: quizPick.items.map((q) => q.id),
      practice: practicePick.items.map((q) => q.id),
      card: cardPick.items.map((c) => c.id),
    })
  }

  /* ── The five blocks ───────────────────────────────────────────*/

  const areaLabel = chapter ? paper?.areas.find((a) => a.code === chapter.area)?.label ?? chapter.area : undefined
  const chapterLabel = chapter
    ? `${chapter.number ? `Chapter ${chapter.number} · ` : ""}${chapter.title}`
    : "Today's topic"

  const blocks: TodayBlock[] = []
  let step = 1

  // The study (read-the-chapter) block is skipped for the practice route — its
  // whole promise is not having to read chapters. The board then leads with the
  // quiz, which unlocks immediately since it is first in the sequence.
  if (!isPracticeRoute) {
    blocks.push({
      id: chapter ? `study-${chapterKey(chapter)}` : "study",
      kind: "study",
      step: step++,
      title: chapterLabel,
      detail: chapter
        ? `${isRevision ? "Second pass" : "Study"} · ${chapter.sections.length} sections · ${hardness?.label} · ${hardness?.why}`
        : "Charles opens the next chapter from your live progress",
      minutes: studyMinutes,
      area: chapter?.area,
      chapterKey: chapter ? chapterKey(chapter) : undefined,
    })
  }

  blocks.push({
    id: "quiz",
    kind: "quiz",
    step: step++,
    title: `${QUIZ_SIZE} quizzes on ${chapter ? chapterLabel.replace(/^Chapter \d+ · /, "") : "today's topic"}`,
    detail: isPracticeRoute
      ? "Five exam-standard checks on today's topic — instant marking, and Charles explains every miss"
      : "Five checks on what you just read — instant marking, and Charles explains every miss",
    minutes: quizMinutes,
    count: QUIZ_SIZE,
    area: chapter?.area,
    chapterKey: chapter ? chapterKey(chapter) : undefined,
  })

  // Advertise what was actually picked, not the target. On a small area pool the
  // picker can return fewer than practiceCount (e.g. 9 served under a "15
  // practice" heading), and the flashcard block below already uses this pattern.
  const practiceServed = practicePick.items.length || practiceCount
  blocks.push({
    id: "practice",
    kind: "practice",
    step: step++,
    title: `${practiceServed} practice questions`,
    detail: areaLabel
      ? `Exam-standard questions on ${chapter?.area} · ${areaLabel} — applying the chapter, not recalling it`
      : "Exam-standard questions on today's topic",
    minutes: practiceMinutes,
    count: practiceServed,
    area: chapter?.area,
    chapterKey: chapter ? chapterKey(chapter) : undefined,
  })

  blocks.push({
    id: "flashcards",
    kind: "flashcards",
    step: step++,
    title: `${cardPick.items.length || cardTarget} flashcards`,
    detail: areaLabel
      ? `Spaced recall on ${areaLabel} — the facts, formulas and thresholds from today`
      : "Spaced recall on today's topic",
    minutes: cardMinutes,
    count: cardPick.items.length || cardTarget,
    area: chapter?.area,
  })

  if (article && articleFits) {
    blocks.push({
      id: article.id,
      kind: "article",
      step: step++,
      title: article.title,
      detail: `Technical article on this exact topic — what's examined, where marks are lost, the wording that wins them`,
      minutes: article.minutes,
      area: chapter?.area,
      chapterKey: article.chapterKey,
    })
  }

  return {
    paperId,
    chapter,
    hardness,
    isRevision,
    isDiagnosticDay: false,
    diagnosticGate: gate ? { done: gate.done, total: gate.total, nextArea: gate.nextArea, nextLabel: gate.nextLabel } : null,
    blocks,
    quiz: quizPick.items,
    practice: practicePick.items,
    cards: cardPick.items,
    // Null when it did not fit the budget, so `composition.article` and the
    // block list can never disagree about whether today has one.
    article: articleFits ? article : null,
    totalMinutes: blocks.reduce((n, b) => n + b.minutes, 0),
    budgetMinutes,
    recycled: quizPick.recycled || practicePick.recycled,
  }
}

/* ── Completion ───────────────────────────────────────────────────
 *
 * A day is complete when every block is done. Study completion is the chapter
 * read-mark (acca-topic-plan), article completion its own mark, and the question
 * blocks are stamped by the existing today-done ledger — so completion survives
 * a reload and cannot be faked by bouncing off a paywall.
 */

export function blockComplete(paperId: string, block: TodayBlock, done: string[]): boolean {
  if (block.kind === "study" && block.chapterKey) return isChapterRead(paperId, block.chapterKey) || done.includes(block.id)
  if (block.kind === "article") return isArticleRead(paperId, block.id) || done.includes(block.id)
  return done.includes(block.id)
}

export interface DayProgress {
  done: number
  total: number
  percent: number
  complete: boolean
  /** The block the learner should do now, or null when the day is finished. */
  activeIndex: number
}

export function dayProgress(paperId: string, composition: TodayComposition, done: string[]): DayProgress {
  const flags = composition.blocks.map((b) => blockComplete(paperId, b, done))
  const count = flags.filter(Boolean).length
  const total = composition.blocks.length
  return {
    done: count,
    total,
    percent: total ? Math.round((count / total) * 100) : 0,
    complete: total > 0 && count === total,
    activeIndex: flags.findIndex((f) => !f),
  }
}
