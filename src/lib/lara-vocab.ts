import { differenceInCalendarDays } from "date-fns"
import {
  getDeckStats,
  getHardWords,
  getTodaySession,
  daysUntilDeadline,
  type VocabDeck,
  type VocabProgress,
  type VocabWord,
} from "@/lib/vocab"

/*
 * Lara's vocabulary coaching — specific, result-aware, local-first.
 *
 * Never generic ("Great job!"). Every line references the learner's real data:
 * the words they struggled with, quiz score, streak, due count. Works with no
 * API key (the deck already holds everything we need).
 */

export interface SessionResult {
  reviewed: number
  /** Terms graded "again" or "hard" — the ones that need another pass. */
  weakWords: string[]
  quizCorrect: number
  quizTotal: number
  streak: number
}

/** Message shown on the session-complete screen. */
export function coachAfterSession(name: string, targetLabel: string, r: SessionResult): string {
  const who = (name || "").trim() || "Nice work"
  const weak = r.weakWords.slice(0, 2)
  const parts: string[] = []

  parts.push(
    r.reviewed > 0
      ? `${who}, ${r.reviewed} ${targetLabel} word${r.reviewed === 1 ? "" : "s"} reviewed today.`
      : `${who}, that's today's session done.`,
  )

  if (r.quizTotal > 0) {
    parts.push(
      r.quizCorrect === r.quizTotal
        ? `Perfect quiz — ${r.quizCorrect}/${r.quizTotal}.`
        : `Quiz: ${r.quizCorrect}/${r.quizTotal}.`,
    )
  }

  if (weak.length > 0) {
    parts.push(`I'll bring ${weak.join(" and ")} back soon — ${weak.length === 1 ? "it needs" : "they need"} one more pass.`)
  }

  if (r.streak >= 7) parts.push(`${r.streak}-day streak — that's the part most people never reach.`)
  else if (r.streak >= 2) parts.push(`Day ${r.streak} of your streak. Come back tomorrow to keep it alive.`)

  return parts.join(" ")
}

/** Message shown on the deck home, before the user starts. */
export function coachOnHome(name: string, deck: VocabDeck): string {
  const who = (name || "").trim() || "Hey"
  const stats = getDeckStats(deck)
  const session = getTodaySession(deck)
  const due = session.newWords.length + session.dueWords.length
  const sample = session.dueWords[0]?.term || session.newWords[0]?.term
  const daysLeft = daysUntilDeadline(deck)
  const deadlineBit = daysLeft != null ? ` ${daysLeft} day${daysLeft === 1 ? "" : "s"} to your goal.` : ""

  if (due === 0) {
    return `${who}, you're all caught up in ${deck.targetLanguageLabel}.${deadlineBit} Spacing is part of learning — add new words when you're ready.`
  }
  if (stats.mastered >= 10) {
    return `${who}, ${due} words for today${sample ? `, including ${sample}` : ""}. You've mastered ${stats.mastered} so far.${deadlineBit} Keep the chain going.`
  }
  return `${who}, ${due} word${due === 1 ? "" : "s"} ready today${sample ? ` — ${sample} is one of them` : ""}.${deadlineBit} Let's go.`
}

/* ── Weekly report ───────────────────────────────────────────── */

export interface WeeklyReport {
  sessionsThisWeek: number
  mastered: number
  learning: number
  hardWords: VocabWord[]
  message: string
}

/** Lara's once-a-week analysis: progress + the words still giving trouble. */
export function getWeeklyReport(name: string, deck: VocabDeck, progress: VocabProgress): WeeklyReport {
  const who = (name || "").trim() || "Here's your week"
  const stats = getDeckStats(deck)
  const hardWords = getHardWords(deck, 8)
  const today = new Date()
  const sessionsThisWeek = progress.history.filter((d) => {
    try {
      return differenceInCalendarDays(today, new Date(d)) < 7
    } catch {
      return false
    }
  }).length

  const parts: string[] = [
    `${who}: ${sessionsThisWeek} session${sessionsThisWeek === 1 ? "" : "s"} this week, ${stats.mastered} word${stats.mastered === 1 ? "" : "s"} mastered so far.`,
  ]
  if (hardWords.length > 0) {
    parts.push(
      `${hardWords.length} word${hardWords.length === 1 ? "" : "s"} are still tricky (${hardWords
        .slice(0, 3)
        .map((w) => w.term)
        .join(", ")}…) — let's drill them today.`,
    )
  } else {
    parts.push("No stubborn words right now — your recall is solid. Keep showing up.")
  }

  return {
    sessionsThisWeek,
    mastered: stats.mastered,
    learning: stats.learning + stats.newCount,
    hardWords,
    message: parts.join(" "),
  }
}
