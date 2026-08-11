import type { AreaStat } from "@/lib/acca"

/*
 * YOUR BEST SECTION AND YOUR WORST — from the sections actually attempted.
 *
 * ── WHY THERE IS A MINIMUM ──────────────────────────────────────
 * Accuracy over two questions is noise. Someone who answered one question
 * correctly in Section D reads as 100% and would be crowned their "strongest
 * area" over a section they have ground through ninety questions at 78%. The
 * effect is worst exactly when it matters most — in week one, when a learner is
 * deciding whether this thing knows anything about them.
 *
 * So a section has to have been genuinely attempted to be ranked at all, and
 * when nothing qualifies we say so rather than inventing a winner. "Not enough
 * yet" is a true statement; a confident wrong one costs trust that a blank
 * space does not.
 */

/** Answers before a section can be called strongest or weakest. */
export const RANKABLE_MIN_ANSWERS = 8

export interface RankedArea {
  code: string
  label: string
  /** 0…100, rounded. */
  accuracy: number
  answered: number
}

export interface StrengthSplit {
  best: RankedArea | null
  worst: RankedArea | null
  /** Sections with enough answers to rank. */
  ranked: number
  /** Sections touched but still below the threshold — what "not yet" is made of. */
  pending: number
}

const toRanked = (a: AreaStat): RankedArea => ({
  code: a.code,
  label: a.label,
  accuracy: Math.round(a.accuracy * 100),
  answered: a.seen,
})

/**
 * Split the attempted sections into a best and a worst.
 *
 * Ties break on volume — more answers is the more trustworthy reading of the
 * same percentage — and then on code, so the answer is stable between renders
 * rather than flickering between two equal sections.
 */
export function strengthSplit(areas: readonly AreaStat[]): StrengthSplit {
  const eligible = areas.filter((a) => a.seen >= RANKABLE_MIN_ANSWERS)
  const pending = areas.filter((a) => a.seen > 0 && a.seen < RANKABLE_MIN_ANSWERS).length

  if (eligible.length === 0) return { best: null, worst: null, ranked: 0, pending }

  const byStrength = [...eligible].sort((x, y) =>
    y.accuracy - x.accuracy || y.seen - x.seen || x.code.localeCompare(y.code),
  )

  const best = toRanked(byStrength[0])
  /*
   * With only one rankable section it is both the best and the worst, which is
   * a useless thing to tell someone — and faintly insulting when they have just
   * worked hard at it. One section reports a strength and nothing else.
   */
  const worst = eligible.length >= 2 ? toRanked(byStrength[byStrength.length - 1]) : null

  return { best, worst, ranked: eligible.length, pending }
}

/** One honest line for when nothing can be ranked yet. */
export function strengthEmptyLine(split: StrengthSplit): string {
  if (split.pending > 0) {
    return `Answer a few more in each section — ${RANKABLE_MIN_ANSWERS} per section is where the reading becomes trustworthy.`
  }
  return "Your strongest and weakest sections appear once you've answered enough to tell them apart."
}
