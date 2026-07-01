import type { AccaQuestion } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * ACCA AI features — the tutor and the examiner.
 *
 * Both hit /api/lara?action=… and degrade gracefully: if there's no API key
 * or the call fails, the server returns a useful fallback (the model
 * explanation for the tutor; a keyword-based mark for the examiner) so the
 * features never hard-crash in demo mode.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""

/** Ask Lara to explain a question — optionally a specific follow-up. */
export async function askTutor(
  q: AccaQuestion,
  correctText: string,
  question?: string,
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
