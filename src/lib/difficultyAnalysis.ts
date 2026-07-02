/*
 * Scholify — Goal Difficulty Advisor.
 *
 * Runs during onboarding (and any new-goal flow) right after the user
 * picks a deadline + daily minutes. Local benchmark table catches the
 * common cases offline; everything else falls through to Claude Haiku
 * via /api/lara?action=analyze-difficulty.
 *
 * No I/O on construction — pure function for the local fast-path; only
 * the async unknown-goal branch hits the network.
 */

import { api } from "@/lib/api"

/* ── Types ───────────────────────────────────────────────────────────── */

export type DifficultyLevel = "too_easy" | "realistic" | "ambitious" | "unrealistic"

export interface DifficultyResult {
  level: DifficultyLevel
  score: number // 0–100, where ~50 means "right on the edge"
  message: string // Lara's honest assessment, 1–2 sentences
  suggestion: string // What to do about it
  suggestedDeadline?: string // ISO date (only when we want to recommend a new one)
  suggestedDeadlineLabel?: string // Human-readable copy of the same date
  suggestedGoal?: string // A stretchier version of the original goal
  confidence: number // 0–1 — how sure Lara is
  source: "local_benchmark" | "ai" | "ai_fallback"
}

interface Benchmark {
  /** Floor: anything tighter is "unrealistic" even at heavy daily time. */
  minDays: number
  /** Sweet spot — the analyzer aims here when recommending a new deadline. */
  idealDays: number
  /** A "fast but doable" timeline — between min and ideal. */
  maxFastDays: number
  keywords: string[]
}

const BENCHMARKS: Record<string, Benchmark> = {
  ielts: {
    minDays: 30,
    idealDays: 90,
    maxFastDays: 60,
    keywords: ["ielts", "toefl", "toeic", "english test", "cefr"],
  },
  python_basics: {
    minDays: 21,
    idealDays: 45,
    maxFastDays: 30,
    keywords: ["python basics", "learn python", "python beginner", "python syntax", "python from zero"],
  },
  python_advanced: {
    minDays: 60,
    idealDays: 120,
    maxFastDays: 90,
    keywords: ["python advanced", "python developer", "python data science", "machine learning", "deep learning"],
  },
  figma: {
    minDays: 14,
    idealDays: 30,
    maxFastDays: 21,
    keywords: ["figma", "ui design", "ux design", "product design"],
  },
  chinese: {
    minDays: 90,
    idealDays: 365,
    maxFastDays: 180,
    keywords: ["chinese", "mandarin", "hsk"],
  },
  language_a2_b1: {
    minDays: 60,
    idealDays: 120,
    maxFastDays: 90,
    keywords: ["spanish", "french", "german", "japanese", "korean", "italian", "russian", "portuguese", "a2", "b1"],
  },
  aws: {
    minDays: 45,
    idealDays: 90,
    maxFastDays: 60,
    keywords: ["aws", "cloud certification", "azure", "gcp", "solutions architect", "comptia"],
  },
  reading: {
    minDays: 7,
    idealDays: 14,
    maxFastDays: 7,
    keywords: ["read book", "reading", "finish book", "one book"],
  },
  leetcode_30d: {
    minDays: 14,
    idealDays: 30,
    maxFastDays: 21,
    keywords: ["leetcode", "algorithm", "data structures"],
  },
  fitness_5k: {
    minDays: 30,
    idealDays: 60,
    maxFastDays: 45,
    keywords: ["5k", "run", "marathon", "half marathon", "pull-up", "push-up"],
  },
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

const MS_PER_DAY = 86_400_000
const BASELINE_DAILY_MINUTES = 30

export function daysBetween(fromISO: string | Date | undefined | null, toISO: string | Date): number {
  const from = fromISO ? new Date(fromISO).getTime() : Date.now()
  const to = new Date(toISO).getTime()
  return Math.ceil((to - from) / MS_PER_DAY)
}

function findBenchmark(goal: string): { name: string; benchmark: Benchmark } | null {
  const g = goal.toLowerCase()
  for (const [name, benchmark] of Object.entries(BENCHMARKS)) {
    if (benchmark.keywords.some((kw) => g.includes(kw))) {
      return { name, benchmark }
    }
  }
  return null
}

function addDays(d: Date, days: number): Date {
  const n = new Date(d)
  n.setDate(n.getDate() + days)
  return n
}

function formatRelativeDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

/* ── Stretch-goal generator (local heuristic) ────────────────────────── */

const STRETCH_RULES: Array<{ test: RegExp; rewrite: (m: RegExpMatchArray) => string }> = [
  {
    test: /read (?:one|a) book/i,
    rewrite: () => "Read three books and write a one-page summary of each",
  },
  {
    test: /^(?:learn|study) (.+?) basics?/i,
    rewrite: (m) => `Build one small project using ${m[1].trim()} from scratch`,
  },
  {
    test: /^(?:get|stay) (?:in shape|fit)/i,
    rewrite: () => "Run a 5K under 30 minutes",
  },
  {
    test: /pass (.+?) (?:band )?(\d+)/i,
    rewrite: (m) => `Pass ${m[1].trim()} band ${Number(m[2]) + 1}`,
  },
  {
    test: /^(?:learn|study|practice) (.+)/i,
    rewrite: (m) => `Master ${m[1].trim()} well enough to teach a beginner`,
  },
]

function localStretchGoal(goal: string): string | undefined {
  for (const rule of STRETCH_RULES) {
    const m = goal.match(rule.test)
    if (m) return rule.rewrite(m)
  }
  return undefined
}

/* ── Local analyzer ──────────────────────────────────────────────────── */

function analyzeLocal(
  goal: string,
  deadline: string,
  dailyMinutes: number,
  benchmarkEntry: { name: string; benchmark: Benchmark },
): DifficultyResult {
  const daysAvailable = Math.max(1, daysBetween(undefined, deadline))
  const { benchmark } = benchmarkEntry

  // More minutes per day means the user can compress the timeline.
  const minuteFactor = Math.max(0.4, Math.min(3, dailyMinutes / BASELINE_DAILY_MINUTES))
  const adjustedMinDays = Math.ceil(benchmark.minDays / minuteFactor)
  const adjustedIdealDays = Math.ceil(benchmark.idealDays / minuteFactor)
  const ratio = daysAvailable / adjustedIdealDays

  if (daysAvailable < adjustedMinDays) {
    const recommended = addDays(new Date(), adjustedIdealDays)
    return {
      level: "unrealistic",
      score: Math.max(10, Math.round((daysAvailable / adjustedMinDays) * 30)),
      message: `${daysAvailable} day${
        daysAvailable === 1 ? "" : "s"
      } isn't enough for this goal — even at ${dailyMinutes} min/day, most people need at least ${adjustedMinDays}.`,
      suggestion: `I'd suggest moving your deadline to ${formatRelativeDate(
        recommended,
      )} so the plan stays honest. You can still push hard within that window.`,
      suggestedDeadline: recommended.toISOString(),
      suggestedDeadlineLabel: formatRelativeDate(recommended),
      confidence: 0.9,
      source: "local_benchmark",
    }
  }

  if (ratio < 0.5) {
    return {
      level: "ambitious",
      score: 38,
      message: `This is doable in ${daysAvailable} days, but you'll need to stay very consistent — no missed days.`,
      suggestion: `If your deadline is flexible, adding 2–3 weeks gives you breathing room without losing momentum.`,
      confidence: 0.7,
      source: "local_benchmark",
    }
  }

  if (ratio > 3) {
    const stretch = localStretchGoal(goal)
    return {
      level: "too_easy",
      score: 85,
      message: `You have plenty of time. With ${dailyMinutes} min/day over ${daysAvailable} days you could comfortably do more.`,
      suggestion: stretch
        ? `Want to level up? Consider a bigger goal — or stack a second skill alongside.`
        : `Want to make this more ambitious, or add a second skill alongside it?`,
      suggestedGoal: stretch,
      confidence: 0.8,
      source: "local_benchmark",
    }
  }

  return {
    level: "realistic",
    score: 70,
    message: `Great choice — ${daysAvailable} days gives you solid time to build this properly.`,
    suggestion: `Your plan will scaffold week by week so you're never doing too much at once.`,
    confidence: 0.85,
    source: "local_benchmark",
  }
}

/* ── Public analyzer ─────────────────────────────────────────────────── */

export async function analyzeDifficulty(
  goal: string,
  deadline: string | null,
  dailyMinutes: number,
): Promise<DifficultyResult> {
  // No deadline → treat as ongoing → realistic by default.
  if (!deadline) {
    return {
      level: "realistic",
      score: 65,
      message: "Open-ended timeline — that takes pressure off but it also takes the deadline lever away.",
      suggestion: "Pick a soft target date later if you want Lara to retune the pace.",
      confidence: 0.6,
      source: "local_benchmark",
    }
  }

  const cleaned = goal.trim()
  if (cleaned.length === 0) {
    return {
      level: "realistic",
      score: 50,
      message: "Add a goal first and Lara will check whether the timeline matches.",
      suggestion: "What do you want to be able to do at the end?",
      confidence: 0.3,
      source: "local_benchmark",
    }
  }

  const match = findBenchmark(cleaned)
  if (match) return analyzeLocal(cleaned, deadline, dailyMinutes, match)

  // Unknown goal — try AI, fall back to a neutral "looks doable" verdict
  // so onboarding never blocks.
  const daysAvailable = Math.max(1, daysBetween(undefined, deadline))
  try {
    const result = await api.analyzeDifficulty({ goal: cleaned, deadline, dailyMinutes, daysAvailable })
    if (result && result.level) {
      return {
        ...result,
        confidence: typeof result.confidence === "number" ? result.confidence : 0.5,
        source: result.isFallback ? "ai_fallback" : "ai",
      }
    }
  } catch {
    /* network down — fall through to neutral */
  }
  return neutralFallback(daysAvailable, dailyMinutes)
}

function neutralFallback(daysAvailable: number, dailyMinutes: number): DifficultyResult {
  if (daysAvailable < 7) {
    return {
      level: "unrealistic",
      score: 20,
      message: `${daysAvailable} day${daysAvailable === 1 ? "" : "s"} is very tight for any meaningful learning goal.`,
      suggestion: "Consider giving yourself at least 3–4 weeks so the plan can scaffold properly.",
      confidence: 0.6,
      source: "ai_fallback",
      suggestedDeadline: addDays(new Date(), 28).toISOString(),
      suggestedDeadlineLabel: formatRelativeDate(addDays(new Date(), 28)),
    }
  }
  if (daysAvailable >= 365) {
    return {
      level: "too_easy",
      score: 78,
      message: `A year is plenty — you could compound this skill into something much bigger.`,
      suggestion: "Want to add a second related skill, or aim for a higher-level outcome?",
      confidence: 0.55,
      source: "ai_fallback",
    }
  }
  return {
    level: "realistic",
    score: 65,
    message: `${daysAvailable} days at ${dailyMinutes} min/day looks workable.`,
    suggestion: "Lara will scaffold the plan so each week builds on the last.",
    confidence: 0.5,
    source: "ai_fallback",
  }
}

/* ── UI helpers (palette + glyph per level) ──────────────────────────── */

export const LEVEL_META: Record<
  DifficultyLevel,
  { glyph: string; accent: string; subtle: string; label: string; indicator: string }
> = {
  too_easy: {
    glyph: "💫",
    accent: "#34D399",
    subtle: "rgba(52,211,153,0.08)",
    label: "Plenty of time",
    indicator: "💫 Comfortable — room to stretch",
  },
  realistic: {
    glyph: "✓",
    accent: "#C80000",
    subtle: "rgba(200,0,0,0.08)",
    label: "Realistic",
    indicator: "✦ Realistic timeline",
  },
  ambitious: {
    glyph: "⚡",
    accent: "#FB923C",
    subtle: "rgba(251,146,60,0.08)",
    label: "Ambitious",
    indicator: "⚠️ Ambitious — stay consistent",
  },
  unrealistic: {
    glyph: "⚠️",
    accent: "#FF6B6B",
    subtle: "rgba(255,107,107,0.08)",
    label: "Very challenging",
    indicator: "⚠️ Very challenging",
  },
}
