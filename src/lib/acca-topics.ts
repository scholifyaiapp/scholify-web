/*
 * Scholify — topic-by-topic study path (the Kaplan/BPP tuition model).
 *
 * Approved-learning-partner structure: a paper is studied CHAPTER BY CHAPTER
 * (here: syllabus area by area). Each topic is learned (practice with
 * explanations + flashcards), then gated by a KNOWLEDGE CHECK — a short,
 * timed, exam-format test on that topic alone. Pass it (>= 65%) and the topic
 * is mastered; the path moves on. When every topic is mastered, the full mock
 * (and the real exam) stops being a gamble.
 *
 * Mastery is stored per paper per area in localStorage, consistent with the
 * rest of the app.
 */

import { getPaper, getPaperStats } from "@/lib/acca"

const KEY = "scholify-acca-topics"

/** Pass line for a topic knowledge check (ACCA pass is 50%; we gate at 65%). */
export const TOPIC_PASS = 0.65
/** Questions in a knowledge check. */
export const TOPIC_TEST_SIZE = 6

export interface TopicResult {
  attempts: number
  /** Best knowledge-check score 0..1. */
  best: number
  mastered: boolean
  lastAt: string | null
  /** When mastery was first reached (ISO) — feeds learning velocity. */
  masteredAt?: string | null
}

type Store = Record<string, Record<string, TopicResult>>

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Store
  } catch {
    /* ignore */
  }
  return {}
}

function write(s: Store): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export function getTopicResult(paperId: string, area: string): TopicResult {
  return (
    read()[paperId]?.[area] ?? { attempts: 0, best: 0, mastered: false, lastAt: null }
  )
}

/** Record a finished knowledge check. Returns the updated result. */
export function recordTopicTest(paperId: string, area: string, score: number): TopicResult {
  const store = read()
  const prev = store[paperId]?.[area] ?? { attempts: 0, best: 0, mastered: false, lastAt: null }
  const nowMastered = prev.mastered || score >= TOPIC_PASS
  const next: TopicResult = {
    attempts: prev.attempts + 1,
    best: Math.max(prev.best, score),
    mastered: nowMastered,
    lastAt: new Date().toISOString(),
    masteredAt: prev.masteredAt ?? (nowMastered && !prev.mastered ? new Date().toISOString() : null),
  }
  store[paperId] = { ...(store[paperId] ?? {}), [area]: next }
  write(store)
  return next
}

/** All topic results for a paper (area code → result) — feeds analytics. */
export function getTopicResults(paperId: string): Record<string, TopicResult> {
  return read()[paperId] ?? {}
}

export type TopicState = "mastered" | "in-progress" | "available" | "upcoming"

export interface TopicNode {
  code: string
  label: string
  state: TopicState
  /** Practice accuracy in this area (0..1), from regular sessions. */
  accuracy: number
  /** Questions answered in this area. */
  seen: number
  /** Best knowledge-check score (0..1). */
  best: number
  mastered: boolean
}

/**
 * The study path for a paper: syllabus areas in order with a state each.
 * Sequencing rule (soft, like a tutor's): everything already touched or
 * mastered is open; the first untouched topic is "available"; later untouched
 * topics are "upcoming" (visible, tappable, but visually queued) — we guide,
 * we don't imprison.
 */
export function getStudyPath(paperId: string): TopicNode[] {
  const paper = getPaper(paperId)
  if (!paper) return []
  const stats = getPaperStats(paperId)
  const acc = new Map(stats.areas.map((a) => [a.code, a]))

  let firstUntouchedFound = false
  return paper.areas.map((area) => {
    const s = acc.get(area.code)
    const result = getTopicResult(paperId, area.code)
    const seen = s?.seen ?? 0

    let state: TopicState
    if (result.mastered) state = "mastered"
    else if (seen > 0 || result.attempts > 0) state = "in-progress"
    else if (!firstUntouchedFound) {
      state = "available"
      firstUntouchedFound = true
    } else state = "upcoming"

    return {
      code: area.code,
      label: area.label,
      state,
      accuracy: s?.accuracy ?? 0,
      seen,
      best: result.best,
      mastered: result.mastered,
    }
  })
}

/** Path progress: mastered topics / total. */
export function pathProgress(paperId: string): { mastered: number; total: number } {
  const path = getStudyPath(paperId)
  return { mastered: path.filter((t) => t.mastered).length, total: path.length }
}
