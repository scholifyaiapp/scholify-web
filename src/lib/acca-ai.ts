import type { AccaQuestion, Difficulty } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { getPaper } from "@/lib/acca"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/*
 * ACCA AI features — the tutor and the examiner.
 *
 * Both hit /api/lara?action=… and degrade gracefully: if there's no API key
 * or the call fails, the server returns a useful fallback (the model
 * explanation for the tutor; a keyword-based mark for the examiner) so the
 * features never hard-crash in demo mode.
 *
 * Every call carries the Supabase access token — the server meters usage per
 * user per day (see api/lara.ts DAILY_CAPS) once its API key is live.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""

/** Auth header for the metered AI endpoints — empty when signed out/demo. */
async function aiHeaders(): Promise<Record<string, string>> {
  const base: Record<string, string> = { "Content-Type": "application/json" }
  if (!isSupabaseConfigured) return base
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (token) base.Authorization = `Bearer ${token}`
  } catch {
    /* signed out — server will respond with its graceful fallback */
  }
  return base
}

/**
 * Ask Charles to explain a question — optionally a specific follow-up.
 * `learnerContext` is a compact summary of the student's weak areas (see
 * learnerProfileSummary) so Charles can tie the explanation to their weaknesses.
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
      headers: await aiHeaders(),
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
      headers: await aiHeaders(),
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

/* ── Post-mortem: mock-fail analysis & real-exam reflection ────── */

export type PostMortemAction = "weak" | "practice" | "flashcards" | "mock"

export interface PostMortem {
  headline: string
  analysis: string
  lostMarks: { area: string; detail: string }[]
  plan: { title: string; detail: string; action: PostMortemAction }[]
  isFallback: boolean
}

export interface PostMortemInput {
  kind: "mock" | "exam"
  paperId: string
  /** Score 0–100 (mock %, or the real mark when shared). Null when unknown. */
  percent: number | null
  areas: { code: string; label: string; correct: number; seen: number }[]
  mockHistory: { date: string; percent: number }[]
  learnerContext?: string
}

/**
 * Ask Charles for a post-mortem on a failed mock (lost marks, weak topics, a
 * recovery plan) or a reflection session after a failed real exam. Falls back
 * to a client-side deterministic analysis when offline.
 */
export async function getPostMortem(input: PostMortemInput): Promise<PostMortem> {
  const paper = getPaper(input.paperId)
  try {
    const res = await fetch(`${API_BASE}/api/lara?action=acca-postmortem`, {
      method: "POST",
      headers: await aiHeaders(),
      body: JSON.stringify({
        kind: input.kind,
        paper: input.paperId,
        paperName: paper?.name ?? input.paperId,
        percent: input.percent,
        areas: input.areas,
        mockHistory: input.mockHistory,
        learnerContext: input.learnerContext ?? "",
      }),
    })
    if (res.ok) {
      const data = (await res.json()) as Partial<PostMortem>
      if (data.headline && data.analysis && Array.isArray(data.plan) && data.plan.length > 0) {
        return {
          headline: String(data.headline),
          analysis: String(data.analysis),
          lostMarks: (data.lostMarks ?? []).map((l) => ({ area: String(l.area), detail: String(l.detail) })),
          plan: data.plan.map((p) => ({
            title: String(p.title),
            detail: String(p.detail),
            action: (["weak", "practice", "flashcards", "mock"].includes(String(p.action))
              ? p.action
              : "practice") as PostMortemAction,
          })),
          isFallback: Boolean(data.isFallback),
        }
      }
    }
  } catch {
    /* fall through to the offline analysis */
  }
  return offlinePostMortem(input)
}

/** Network-down fallback: the same deterministic analysis the server uses keyless. */
function offlinePostMortem(input: PostMortemInput): PostMortem {
  const ranked = input.areas
    .filter((a) => a.seen > 0)
    .map((a) => ({ ...a, pct: Math.round((a.correct / a.seen) * 100) }))
    .sort((a, b) => a.pct - b.pct)
  const worst = ranked.filter((a) => a.pct < 50).slice(0, 3)
  const headline =
    input.kind === "mock"
      ? "Not this time — but now we know exactly where the marks went."
      : "This result doesn't define you — plenty of ACCA members needed a second run at this paper."
  const analysis = worst.length
    ? `The evidence points at ${worst.map((a) => `${a.code} (${a.pct}%)`).join(", ")} — that's where the marks were lost. Drill those areas, then ${input.kind === "mock" ? "come straight back for the retry" : "rebuild toward the retake"}.`
    : "No single area collapsed — the marks leaked evenly, which points at exam technique and time management. Rehearse under timed conditions."
  return {
    headline,
    analysis,
    lostMarks: worst.map((a) => ({
      area: a.code,
      detail: `${a.label}: ${a.correct}/${a.seen} correct (${a.pct}%) — below the pass line.`,
    })),
    plan: [
      {
        title: worst.length ? `Drill ${worst[0].code} — ${worst[0].label}` : "Run targeted weak-area practice",
        detail: "Adaptive sets aimed at your lowest-scoring topics first.",
        action: "weak",
      },
      { title: "Clear your due flashcards daily", detail: "Spaced recall keeps the fixed areas fixed.", action: "flashcards" },
      {
        title: input.kind === "mock" ? "Retry the mock in 2–3 days" : "Sit a fresh mock before the retake",
        detail: "Exam conditions again — pass it and you're back on track.",
        action: "mock",
      },
    ],
    isFallback: true,
  }
}

export interface GenerateResult {
  questions: AccaQuestion[]
  reason?:
    | "missing_anthropic_key"
    | "no_questions"
    | "error"
    | "network"
    | "limit_reached"
    | "plan_required"
    | "auth_required"
    | "rate_limited"
    | "budget_exhausted"
    | "metering_unavailable"
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
      headers: await aiHeaders(),
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
