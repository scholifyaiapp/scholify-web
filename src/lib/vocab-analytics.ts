import { format, subDays, differenceInCalendarDays } from "date-fns"
import { getHardWords, type VocabDeck, type VocabWord, type VocabProgress } from "@/lib/vocab"
import { fluencyPercent, FLUENCY_WORDS, wordsLearned } from "@/lib/fluency"

/*
 * Vocab analytics — pure read-only derivations over the deck + progress, for
 * the Progress page charts and Lara's data-driven recommendations. No
 * persistence, no side effects. (Distinct from analytics.ts, which is PostHog.)
 */

export interface DayCount {
  date: string // yyyy-MM-dd
  label: string // single-letter weekday
  count: number
}

/** New words introduced per day over the last `days` (introducedOn, fallback addedAt). */
export function wordsPerDay(deck: VocabDeck, days = 14): DayCount[] {
  const counts = new Map<string, number>()
  for (const w of deck.words) {
    const day = (w.introducedOn || (w.addedAt ? w.addedAt.slice(0, 10) : "")).slice(0, 10)
    if (!day) continue
    counts.set(day, (counts.get(day) ?? 0) + 1)
  }
  const out: DayCount[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = subDays(new Date(), i)
    const key = format(d, "yyyy-MM-dd")
    out.push({ date: key, label: format(d, "EEEEE"), count: counts.get(key) ?? 0 })
  }
  return out
}

export interface Accuracy {
  pct: number
  totalRecalls: number
  reps: number
  lapses: number
}

/** Recall accuracy ≈ successful reviews over all graded recalls. */
export function recallAccuracy(deck: VocabDeck): Accuracy {
  let reps = 0
  let lapses = 0
  for (const w of deck.words) {
    reps += w.reps
    lapses += w.lapses
  }
  const total = reps + lapses
  return { pct: total > 0 ? Math.round((reps / total) * 100) : 0, totalRecalls: total, reps, lapses }
}

export interface Bucket {
  label: string
  count: number
  color: string
}

/** Distribution of words by how far out they're scheduled — a retention snapshot. */
export function intervalBuckets(deck: VocabDeck): Bucket[] {
  const b = { unseen: 0, today: 0, week: 0, month: 0, mastered: 0 }
  for (const w of deck.words) {
    if (w.status === "new") b.unseen += 1
    else if (w.status === "mastered" || w.intervalDays >= 21) b.mastered += 1
    else if (w.intervalDays <= 1) b.today += 1
    else if (w.intervalDays <= 7) b.week += 1
    else b.month += 1
  }
  return [
    { label: "Not started", count: b.unseen, color: "#C4B5FD" },
    { label: "≤ 1 day", count: b.today, color: "#A78BFA" },
    { label: "2–7 days", count: b.week, color: "#818CF8" },
    { label: "1–3 weeks", count: b.month, color: "#38BDF8" },
    { label: "Mastered", count: b.mastered, color: "#34D399" },
  ]
}

/** The words giving the learner the most trouble. */
export function hardestWords(deck: VocabDeck, limit = 6): VocabWord[] {
  return getHardWords(deck, limit)
}

/** Days since the deck started. */
export function daysActive(deck: VocabDeck): number {
  try {
    return Math.max(1, differenceInCalendarDays(new Date(), new Date(deck.createdAt)) + 1)
  } catch {
    return 1
  }
}

/* ── Lara's data-driven recommendations ──────────────────────── */

export interface Recommendation {
  id: string
  icon: string
  title: string
  body: string
  /** Optional in-app action this recommendation maps to. */
  action?: "session" | "drill" | "add" | "raise-goal" | "reels"
}

/**
 * Up to `max` prioritized, specific recommendations from real data.
 * Ordered by urgency: due reviews → weak words → pace tuning → momentum.
 */
export function getRecommendations(
  deck: VocabDeck,
  progress: VocabProgress,
  dueToday: number,
  max = 3,
): Recommendation[] {
  const recs: Recommendation[] = []
  const acc = recallAccuracy(deck)
  const hard = hardestWords(deck, 3)
  const newLeft = deck.words.filter((w) => w.status === "new").length
  const pct = fluencyPercent(deck)
  const learned = wordsLearned(deck)

  if (dueToday > 0) {
    recs.push({
      id: "due",
      icon: "⏰",
      title: `${dueToday} word${dueToday === 1 ? "" : "s"} due for review`,
      body: "Clearing reviews the day they're due is when spaced repetition pays off most. About 5 minutes.",
      action: "session",
    })
  }

  if (hard.length >= 3) {
    recs.push({
      id: "drill",
      icon: "🎯",
      title: "A few words keep slipping",
      body: `${hard.map((w) => w.term).join(", ")} have tripped you up most — a focused drill locks them in.`,
      action: "drill",
    })
  }

  if (acc.totalRecalls >= 20 && acc.pct >= 90 && deck.dailyNewWords < 20) {
    recs.push({
      id: "raise",
      icon: "📈",
      title: `${acc.pct}% recall — you can push harder`,
      body: `You're remembering almost everything. Try ${deck.dailyNewWords + 5} new words a day to reach fluency sooner.`,
      action: "raise-goal",
    })
  } else if (acc.totalRecalls >= 20 && acc.pct < 70 && deck.dailyNewWords > 5) {
    recs.push({
      id: "ease",
      icon: "🌱",
      title: `Recall is at ${acc.pct}% — ease the pace`,
      body: `Dropping to ${Math.max(5, deck.dailyNewWords - 5)} new words a day means more reviews and stronger memory.`,
      action: "raise-goal",
    })
  }

  if (newLeft === 0 && dueToday === 0) {
    recs.push({
      id: "add",
      icon: "✨",
      title: "You're caught up — add fresh words",
      body: "No words waiting. Top up your deck (or paste your own text) to keep the streak compounding.",
      action: "add",
    })
  }

  if (progress.streak >= 3 && progress.streak < progress.longestStreak) {
    const gap = progress.longestStreak - progress.streak
    recs.push({
      id: "streak",
      icon: "🔥",
      title: `${progress.streak}-day streak going`,
      body: `Your record is ${progress.longestStreak}. ${gap} more day${gap === 1 ? "" : "s"} to beat it.`,
    })
  }

  if (recs.length < max && learned > 0) {
    recs.push({
      id: "fluency",
      icon: "🗣️",
      title: `${pct}% of the way to conversational fluency`,
      body: `${learned.toLocaleString()} of ${FLUENCY_WORDS.toLocaleString()} high-frequency words. Every session moves the curve.`,
      action: "reels",
    })
  }

  return recs.slice(0, max)
}
