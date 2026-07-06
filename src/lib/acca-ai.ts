import type { AccaQuestion, Difficulty } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { getPaper } from "@/lib/acca"

/*
 * ACCA AI features — the tutor and the examiner.
 *
 * Both hit /api/lara?action=… and degrade gracefully: if there's no API key
 * or the call fails, the server returns a useful fallback (the model
 * explanation for the tutor; a keyword-based mark for the examiner) so the
 * features never hard-crash in demo mode.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""

/**
 * Ask Lara to explain a question — optionally a specific follow-up.
 * `learnerContext` is a compact summary of the student's weak areas (see
 * learnerProfileSummary) so Lara can tie the explanation to their weaknesses.
 */
export async function askTutor(
  q: AccaQuestion,
  correctText: string,
  question?: string,
  learnerContext?: string,
): Promise<{ answer: string; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/lara?action=acca-tutor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paper: q.paper,
        area: q.area,
        stem: q.stem,
        options: q.options ?? [],
        correctText,
        explanation: q.explanation,
        question: question ?? "",
        learnerContext: learnerContext ?? "",
      }),
    })
    if (res.ok) {
      const data = (await res.json()) as { answer?: string; isFallback?: boolean }
      if (data.answer) return { answer: String(data.answer), isFallback: Boolean(data.isFallback) }
    }
  } catch {
    /* fall through */
  }
  return { answer: q.explanation, isFallback: true }
}

export interface ExaminerResult {
  marks: number
  maxMarks: number
  hit: string[]
  missed: string[]
  feedback: string
  isFallback: boolean
}

/** Submit a written answer to the AI Examiner for marking against the rubric. */
export async function markAnswer(
  wq: WrittenQuestion,
  answer: string,
): Promise<ExaminerResult> {
  try {
    const res = await fetch(`${API_BASE}/api/lara?action=acca-examiner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paper: wq.paper,
        stem: wq.stem,
        maxMarks: wq.maxMarks,
        rubric: wq.rubric,
        answer,
      }),
    })
    if (res.ok) {
      const data = (await res.json()) as Partial<ExaminerResult>
      return {
        marks: Math.max(0, Math.min(wq.maxMarks, Math.round(Number(data.marks) || 0))),
        maxMarks: wq.maxMarks,
        hit: Array.isArray(data.hit) ? data.hit.map(String) : [],
        missed: Array.isArray(data.missed) ? data.missed.map(String) : [],
        feedback: String(data.feedback || ""),
        isFallback: Boolean(data.isFallback),
      }
    }
  } catch {
    /* fall through */
  }
  return {
    marks: 0,
    maxMarks: wq.maxMarks,
    hit: [],
    missed: wq.rubric,
    feedback: "Couldn't reach the examiner. Please try again.",
    isFallback: true,
  }
}

export interface GenerateResult {
  questions: AccaQuestion[]
  reason?: "missing_anthropic_key" | "no_questions" | "error" | "network"
}

interface RawGenerated {
  stem?: unknown
  options?: unknown
  correctIndex?: unknown
  explanation?: unknown
  difficulty?: unknown
}

/** Generate original practice MCQs for a paper from a topic or pasted notes. */
export async function generateQuestions(
  paperId: string,
  opts: { topic?: string; notes?: string; count?: number },
): Promise<GenerateResult> {
  const paper = getPaper(paperId)
  const count = opts.count ?? 5
  try {
    const res = await fetch(`${API_BASE}/api/lara?action=acca-generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paper: paperId,
        paperName: paper?.name ?? paperId,
        topic: opts.topic ?? "",
        notes: opts.notes ?? "",
        count,
      }),
    })
    if (res.ok) {
      const data = (await res.json()) as { questions?: RawGenerated[]; reason?: GenerateResult["reason"] }
      const questions = (Array.isArray(data.questions) ? data.questions : [])
        .map((q, i): AccaQuestion | null => {
          const options = Array.isArray(q.options) ? q.options.map((o) => String(o)) : []
          const correct = Math.round(Number(q.correctIndex))
          if (typeof q.stem !== "string" || options.length !== 4 || correct < 0 || correct > 3) return null
          const diff = String(q.difficulty)
          return {
            id: `gen-${paperId}-${Date.now()}-${i}`,
            paper: paperId,
            area: "AI",
            type: "mcq",
            stem: String(q.stem),
            options,
            correct,
            explanation: String(q.explanation || ""),
            marks: 2,
            difficulty: (["easy", "medium", "hard"].includes(diff) ? diff : "medium") as Difficulty,
          }
        })
        .filter((q): q is AccaQuestion => q !== null)
      if (questions.length > 0) return { questions }
      return { questions: [], reason: data.reason ?? "no_questions" }
    }
  } catch {
    return { questions: [], reason: "network" }
  }
  return { questions: [], reason: "error" }
}
