import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@supabase/supabase-js"

/*
 * Combined Lara endpoint — dispatches by ?action= to keep us under the
 * 12-Serverless-Function cap on the Hobby plan.
 *
 *   POST /api/lara?action=message
 *     Daily coach message (Haiku). Same body + response as the old
 *     /api/lara-message.
 *
 *   POST /api/lara?action=chat
 *     Conversational tutor (Sonnet). Same body + response as the old
 *     /api/lara-chat.
 *
 *   POST /api/lara?action=analyze-patterns
 *     Returns AI-rewritten plan suggestions using the client's
 *     pre-computed pattern stats. Falls back to the seed suggestions
 *     when no key / on failure.
 */

export const config = { maxDuration: 30 }

const HAIKU = "claude-haiku-4-5"
// Sonnet 5: better model, intro pricing ($2/$10 per MTok through 2026-08-31).
const SONNET = "claude-sonnet-5"

/* ── AI metering — auth + per-plan daily caps on the ACCA actions ──────────
 *
 * The CFO guardrail: once ANTHROPIC_API_KEY is live, no unauthenticated or
 * uncapped Claude calls. Caps per plan per day (0 = plan doesn't include it):
 *
 *              tutor  generate  examiner  postmortem
 *   free         5       0         0         10
 *   beginner    25       0         0         10
 *   pro        100      10        20         10
 *
 * Everything degrades to the deterministic fallback (HTTP 200 + isFallback +
 * reason) — never a hard error the app has to special-case. If metering
 * infrastructure is missing while the API key is set, we fail CLOSED
 * (fallbacks, not unmetered spend).
 */

type Tier = "free" | "beginner" | "pro"
type AccaAction = "acca-tutor" | "acca-generate" | "acca-examiner" | "acca-postmortem"

const DAILY_CAPS: Record<Tier, Record<AccaAction, number>> = {
  free: { "acca-tutor": 5, "acca-generate": 0, "acca-examiner": 0, "acca-postmortem": 10 },
  beginner: { "acca-tutor": 25, "acca-generate": 0, "acca-examiner": 0, "acca-postmortem": 10 },
  pro: { "acca-tutor": 100, "acca-generate": 10, "acca-examiner": 20, "acca-postmortem": 10 },
}

export type MeterReason = "auth_required" | "plan_required" | "limit_reached" | "metering_unavailable"

interface Meter {
  allowed: boolean
  reason?: MeterReason
  /** Fire-and-forget usage write after a successful model call. */
  record: (tokensIn: number, tokensOut: number) => void
}

const METER_PASS: Meter = { allowed: true, record: () => {} }

function meteringAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Global cost circuit-breaker: set AI_KILL_SWITCH=1 in the env to force every
 *  AI action to the deterministic fallback instantly, without a redeploy —
 *  the CFO's emergency brake if spend spikes. */
function aiKilled(): boolean {
  const v = String(process.env.AI_KILL_SWITCH || "").toLowerCase()
  return v === "1" || v === "true" || v === "on"
}

async function meterAcca(req: VercelRequest, action: AccaAction): Promise<Meter> {
  // No API key → handlers return free fallbacks anyway; nothing to meter.
  if (!process.env.ANTHROPIC_API_KEY) return METER_PASS
  // Emergency brake: treat as a metering outage so every action fails closed.
  if (aiKilled()) return { allowed: false, reason: "metering_unavailable", record: () => {} }

  const supa = meteringAdmin()
  if (!supa) return { allowed: false, reason: "metering_unavailable", record: () => {} }

  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) return { allowed: false, reason: "auth_required", record: () => {} }
  const { data, error } = await supa.auth.getUser(token)
  const user = data?.user
  if (error || !user) return { allowed: false, reason: "auth_required", record: () => {} }

  // Entitlement is read from app_metadata (service-role-only) — never
  // user_metadata, which the user can self-write to forge a higher plan.
  const rawPlan = String(user.app_metadata?.plan || "free")
  const tier: Tier = rawPlan === "beginner" ? "beginner" : rawPlan !== "free" ? "pro" : "free"
  const cap = DAILY_CAPS[tier][action]
  if (cap === 0) return { allowed: false, reason: "plan_required", record: () => {} }

  const day = todayUtc()
  try {
    const { data: row } = await supa
      .from("ai_usage")
      .select("count")
      .eq("user_id", user.id)
      .eq("day", day)
      .eq("action", action)
      .maybeSingle()
    if ((row?.count ?? 0) >= cap) return { allowed: false, reason: "limit_reached", record: () => {} }
  } catch {
    // Table missing (migration 0013 not run) → fail closed, never unmetered.
    return { allowed: false, reason: "metering_unavailable", record: () => {} }
  }

  return {
    allowed: true,
    record: (tokensIn, tokensOut) => {
      void supa
        .rpc("increment_ai_usage", {
          p_user: user.id,
          p_day: day,
          p_action: action,
          p_tokens_in: Math.max(0, Math.round(tokensIn)),
          p_tokens_out: Math.max(0, Math.round(tokensOut)),
        })
        .then(undefined, () => {})
    },
  }
}

/** The friendly line shown in place of a Lara answer when a cap is hit. */
function meterMessage(reason: MeterReason | undefined, feature: string): string {
  switch (reason) {
    case "limit_reached":
      return `You've used today's ${feature} allowance — it resets tomorrow. Pro includes a much higher daily limit.`
    case "plan_required":
      return `${feature[0].toUpperCase()}${feature.slice(1)} is a Pro feature — upgrade to unlock it.`
    case "auth_required":
      return "Please sign in to use Lara's AI features."
    default:
      return "Lara's AI is warming up — using the built-in explanation for now."
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: Record<string, unknown> = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const action = String((req.query.action || body.action) || "").trim().toLowerCase()

  // Retired vocab-pivot endpoints. These called Claude with NO auth and NO
  // metering — an open, uncapped spend vector the moment ANTHROPIC_API_KEY is
  // live. The current ACCA app never calls them (see src/lib/acca-ai.ts, which
  // only uses the four acca-* actions), so they are disabled outright. Their
  // handler functions remain below, dead but harmless, for reference.
  if (RETIRED_ACTIONS.has(action)) {
    res.status(410).json({ error: "This endpoint has been retired.", isFallback: true })
    return
  }

  if (action === "acca-tutor") return handleAccaTutor(req, body, res)
  if (action === "acca-examiner") return handleAccaExaminer(req, body, res)
  if (action === "acca-generate") return handleAccaGenerate(req, body, res)
  if (action === "acca-postmortem") return handleAccaPostmortem(req, body, res)
  res.status(400).json({
    error: "Unknown action. Use ?action=acca-tutor | acca-examiner | acca-generate | acca-postmortem.",
  })
}

/** Unauthenticated/unmetered legacy actions — hard-disabled (see dispatcher). */
const RETIRED_ACTIONS = new Set([
  "message", "chat", "analyze-patterns", "analyze-difficulty", "analyze-photo",
  "generate-tree", "vocab", "placement", "extract", "fetch-url",
])

/* ── ACCA question generator — MCQs from a topic / notes (Sonnet) ──────── */

async function handleAccaGenerate(req: VercelRequest, body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const paper = String(body.paper || "ACCA")
  const paperName = String(body.paperName || paper)
  const topic = String(body.topic || "").slice(0, 200)
  const notes = String(body.notes || "").slice(0, 3000)
  const count = Math.max(1, Math.min(10, Math.round(Number(body.count) || 5)))

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({ questions: [], reason: "missing_anthropic_key" })
    return
  }

  const m = await meterAcca(req, "acca-generate")
  if (!m.allowed) {
    res.status(200).json({ questions: [], reason: m.reason })
    return
  }

  const focus = notes
    ? `the following study notes:\n"""\n${notes}\n"""`
    : `the topic: "${topic || paperName}"`

  const system = `You are an expert ACCA question writer for paper ${paper} (${paperName}).
Write ORIGINAL multiple-choice questions aligned to the ACCA syllabus and IFRS
Accounting Standards. Do NOT copy real ACCA exam questions. Every question must
be technically correct and have exactly one unambiguous correct answer.

Return ONLY valid JSON, no prose, in exactly this shape:
{"questions":[{"stem":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"why the answer is correct","difficulty":"easy|medium|hard"}]}`

  const prompt = `Write ${count} exam-style multiple-choice questions for ACCA ${paper} based on ${focus}.
Each question: a clear stem, exactly 4 options, one correct answer (correctIndex 0-3), and a concise teaching explanation.`

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: SONNET,
      // 8-question batches fit comfortably in 1400 — caps the priciest call.
      max_tokens: 1400,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: prompt }],
    })
    m.record(completion.usage.input_tokens ?? 0, completion.usage.output_tokens ?? 0)
    const raw = completion.content[0]?.type === "text" ? completion.content[0].text.trim() : ""
    const questions = parseGeneratedQuestions(raw)
    if (questions.length > 0) {
      res.status(200).json({ questions: questions.slice(0, count) })
      return
    }
    res.status(200).json({ questions: [], reason: "no_questions" })
  } catch (err) {
    console.error("lara acca-generate:", err)
    res.status(200).json({ questions: [], reason: "error" })
  }
}

function parseGeneratedQuestions(
  s: string,
): Array<{ stem: string; options: string[]; correctIndex: number; explanation: string; difficulty: string }> {
  try {
    const start = s.indexOf("{")
    const end = s.lastIndexOf("}")
    if (start === -1 || end === -1) return []
    const o = JSON.parse(s.slice(start, end + 1)) as { questions?: unknown[] }
    const list = Array.isArray(o.questions) ? o.questions : []
    const out: Array<{ stem: string; options: string[]; correctIndex: number; explanation: string; difficulty: string }> = []
    for (const item of list) {
      const q = item as Record<string, unknown>
      const options = Array.isArray(q.options) ? q.options.map((x) => String(x)) : []
      const correctIndex = Math.round(Number(q.correctIndex))
      if (
        typeof q.stem === "string" &&
        options.length === 4 &&
        correctIndex >= 0 &&
        correctIndex <= 3
      ) {
        out.push({
          stem: String(q.stem),
          options,
          correctIndex,
          explanation: String(q.explanation || ""),
          difficulty: ["easy", "medium", "hard"].includes(String(q.difficulty)) ? String(q.difficulty) : "medium",
        })
      }
    }
    return out
  } catch {
    return []
  }
}

/* ── ACCA AI Tutor — explain a question / concept (Sonnet) ────────────── */

async function handleAccaTutor(req: VercelRequest, body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const paper = String(body.paper || "ACCA")
  const area = String(body.area || "")
  const stem = String(body.stem || "").slice(0, 1200)
  const options = Array.isArray(body.options) ? (body.options as unknown[]).map((o) => String(o)) : []
  const correctText = String(body.correctText || "")
  const baseExplanation = String(body.explanation || "").slice(0, 1200)
  const question = String(body.question || "").slice(0, 500) // the learner's follow-up ("why is B wrong?")
  const learnerContext = String(body.learnerContext || "").slice(0, 800) // the student's known weak areas

  const fallback =
    baseExplanation ||
    "Focus on the underlying rule being tested here, then re-read the question to see which figures it gives you."

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({ answer: fallback, isFallback: true })
    return
  }

  const m = await meterAcca(req, "acca-tutor")
  if (!m.allowed) {
    // The meter message leads, then the model explanation still teaches.
    res.status(200).json({
      answer: `${meterMessage(m.reason, "Lara questions")}\n\n${fallback}`,
      isFallback: true,
      reason: m.reason,
    })
    return
  }

  const system = `You are Lara, a warm, sharp ACCA tutor. You are helping a student
with paper ${paper}. Explain clearly and correctly using the ACCA syllabus and
IFRS Accounting Standards. Be concise (max ~150 words), use plain language, and
where useful show the calculation step by step. Never invent standards or figures.
You remember this student across sessions. When their learning profile is given and
this question touches one of their known weak areas, briefly acknowledge it and tie
the explanation to shoring up that weakness — encouraging, never repetitive. Do not
mention weak areas that aren't relevant to this question.`

  const optionsText = options.length
    ? `\nOptions:\n${options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join("\n")}`
    : ""
  const profileText = learnerContext
    ? `\n\nStudent's learning profile (their weak areas across sessions):\n${learnerContext}`
    : ""
  const prompt = `Syllabus area: ${area}
Question: ${stem}${optionsText}
Correct answer: ${correctText}
Model explanation: ${baseExplanation}${profileText}

Student asks: ${question || "Explain this in a simpler way."}`

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      // The highest-volume call in the product — Haiku keeps it fast and
      // ~3× cheaper; explanation quality holds at this scope (≤150 words).
      model: HAIKU,
      max_tokens: 400,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: prompt }],
    })
    m.record(completion.usage.input_tokens ?? 0, completion.usage.output_tokens ?? 0)
    const text =
      completion.content[0]?.type === "text" ? completion.content[0].text.trim() : fallback
    res.status(200).json({ answer: text })
  } catch (err) {
    console.error("lara acca-tutor:", err)
    res.status(200).json({ answer: fallback, isFallback: true })
  }
}

/* ── ACCA post-mortem — mock-fail analysis & real-exam reflection (Sonnet) ── */

interface PostmortemArea {
  code: string
  label: string
  correct: number
  seen: number
}

async function handleAccaPostmortem(req: VercelRequest, body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const kind = body.kind === "exam" ? "exam" : "mock"
  const paper = String(body.paper || "ACCA")
  const paperName = String(body.paperName || paper).slice(0, 120)
  const percent = Number.isFinite(Number(body.percent)) ? Math.round(Number(body.percent)) : null
  const learnerContext = String(body.learnerContext || "").slice(0, 800)
  const areas: PostmortemArea[] = (Array.isArray(body.areas) ? body.areas : [])
    .slice(0, 12)
    .map((a) => {
      const r = a as Record<string, unknown>
      return {
        code: String(r.code || "?").slice(0, 8),
        label: String(r.label || "").slice(0, 120),
        correct: Math.max(0, Math.round(Number(r.correct) || 0)),
        seen: Math.max(0, Math.round(Number(r.seen) || 0)),
      }
    })
    .filter((a) => a.seen > 0)
  const mockHistory = (Array.isArray(body.mockHistory) ? body.mockHistory : [])
    .slice(0, 10)
    .map((m) => {
      const r = m as Record<string, unknown>
      return { date: String(r.date || "").slice(0, 12), percent: Math.round(Number(r.percent) || 0) }
    })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({ ...localPostmortem(kind, percent, areas, mockHistory), isFallback: true })
    return
  }

  const mtr = await meterAcca(req, "acca-postmortem")
  if (!mtr.allowed) {
    // The deterministic post-mortem still runs the recovery loop.
    res.status(200).json({ ...localPostmortem(kind, percent, areas, mockHistory), isFallback: true, reason: mtr.reason })
    return
  }

  const system =
    kind === "mock"
      ? `You are Lara, an ACCA exam coach running a post-mortem on a student's FAILED timed mock for paper ${paper} (${paperName}). The ACCA pass line is 50%.
Analyse where the marks were lost using the per-area breakdown, detect the weak topics, and set a short recovery plan. Direct, warm, specific — a coach after a lost match, never disappointed in the student, always in the plan.
Return ONLY valid JSON, no prose, exactly this shape:
{"headline":"one punchy sentence","analysis":"3-4 sentences: where the marks were lost and why this is fixable","lostMarks":[{"area":"<area code>","detail":"what went wrong there and roughly how many marks it cost"}],"plan":[{"title":"short imperative step","detail":"one sentence on how","action":"weak|practice|flashcards|mock"}]}
Rules: lostMarks covers the 2-3 worst areas only. plan is exactly 3 steps, ending with action "mock" (the retry).`
      : `You are Lara, an ACCA coach holding a reflection session with a student who FAILED the real ${paper} (${paperName}) exam. This is an emotional moment: acknowledge it honestly first — many ACCA members failed papers on the way — then move to evidence.
Compare their real result with their mock history if given, analyse their weak areas like an examiner would, and set the comeback plan. Warm, steady, zero toxic positivity.
Return ONLY valid JSON, no prose, exactly this shape:
{"headline":"one supportive but honest sentence","analysis":"4-5 sentences: emotional acknowledgement, then what the evidence says went wrong (compare with mocks if available)","lostMarks":[{"area":"<area code>","detail":"the weakness and what it likely cost in the real exam"}],"plan":[{"title":"short imperative step","detail":"one sentence on how","action":"weak|practice|flashcards|mock"}]}
Rules: lostMarks covers the 2-3 worst areas only. plan is exactly 3 steps for the retake run.`

  const areaLines = areas.length
    ? areas
        .map((a) => `${a.code} ${a.label}: ${a.correct}/${a.seen} (${Math.round((a.correct / a.seen) * 100)}%)`)
        .join("\n")
    : "(no per-area breakdown available)"
  const historyLine = mockHistory.length
    ? `Mock history (most recent first): ${mockHistory.map((m) => `${m.percent}%`).join(", ")}`
    : "No mock history available."
  const prompt = `${kind === "mock" ? `Mock score: ${percent ?? "?"}% (pass line 50%).` : `Real exam result: FAIL${percent !== null ? ` at ${percent}% (pass mark 50)` : " (mark not shared)"}.`}
${historyLine}

Per-area performance:
${areaLines}
${learnerContext ? `\nStudent's learning profile:\n${learnerContext}` : ""}`

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: SONNET,
      max_tokens: 900,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: prompt }],
    })
    mtr.record(completion.usage.input_tokens ?? 0, completion.usage.output_tokens ?? 0)
    const raw = completion.content[0]?.type === "text" ? completion.content[0].text.trim() : ""
    const parsed = safePostmortemJson(raw)
    if (parsed) {
      res.status(200).json(parsed)
      return
    }
    res.status(200).json({ ...localPostmortem(kind, percent, areas, mockHistory), isFallback: true })
  } catch (err) {
    console.error("lara acca-postmortem:", err)
    res.status(200).json({ ...localPostmortem(kind, percent, areas, mockHistory), isFallback: true })
  }
}

interface PostmortemPayload {
  headline: string
  analysis: string
  lostMarks: { area: string; detail: string }[]
  plan: { title: string; detail: string; action: string }[]
}

function safePostmortemJson(s: string): PostmortemPayload | null {
  try {
    const start = s.indexOf("{")
    const end = s.lastIndexOf("}")
    if (start === -1 || end === -1) return null
    const o = JSON.parse(s.slice(start, end + 1)) as Record<string, unknown>
    const lostMarks = (Array.isArray(o.lostMarks) ? o.lostMarks : []).map((l) => {
      const r = l as Record<string, unknown>
      return { area: String(r.area || ""), detail: String(r.detail || "") }
    })
    const plan = (Array.isArray(o.plan) ? o.plan : []).map((p) => {
      const r = p as Record<string, unknown>
      const action = String(r.action || "practice")
      return {
        title: String(r.title || ""),
        detail: String(r.detail || ""),
        action: ["weak", "practice", "flashcards", "mock"].includes(action) ? action : "practice",
      }
    })
    if (!o.headline || !o.analysis || plan.length === 0) return null
    return { headline: String(o.headline), analysis: String(o.analysis), lostMarks, plan }
  } catch {
    return null
  }
}

/** No-key fallback: a deterministic post-mortem from the area breakdown. */
function localPostmortem(
  kind: "mock" | "exam",
  percent: number | null,
  areas: PostmortemArea[],
  mockHistory: { date: string; percent: number }[],
): PostmortemPayload {
  const ranked = [...areas]
    .map((a) => ({ ...a, pct: Math.round((a.correct / Math.max(1, a.seen)) * 100) }))
    .sort((a, b) => a.pct - b.pct)
  const worst = ranked.filter((a) => a.pct < 50).slice(0, 3)
  const gap = percent !== null ? Math.max(0, 50 - percent) : null
  const mockAvg = mockHistory.length
    ? Math.round(mockHistory.reduce((s, m) => s + m.percent, 0) / mockHistory.length)
    : null

  const headline =
    kind === "mock"
      ? gap !== null && gap <= 10
        ? `You were ${gap} marks off the pass line — this is one focused week away.`
        : "Not this time — but now we know exactly where the marks went."
      : "This result doesn't define you — plenty of ACCA members needed a second run at this paper."

  const analysisParts: string[] = []
  if (kind === "exam") {
    analysisParts.push("Take a breath first: a fail on the day is an event, not a verdict.")
    if (mockAvg !== null && percent !== null) {
      analysisParts.push(
        mockAvg >= 50 && percent < 50
          ? `Your mocks averaged ${mockAvg}%, so the knowledge is there — the gap looks like exam-day execution: time pressure, question selection, nerves.`
          : `Your mocks averaged ${mockAvg}%, which matches this result — the gap is knowledge in your weakest areas, and that's the most fixable kind.`,
      )
    }
  }
  if (worst.length) {
    analysisParts.push(
      `The evidence points at ${worst.map((a) => `${a.code} (${a.pct}%)`).join(", ")} — that's where the marks were lost.`,
    )
  } else {
    analysisParts.push("No single area collapsed — the marks leaked evenly, which points at exam technique and time management more than knowledge.")
  }
  analysisParts.push(kind === "mock" ? "Drill those areas, then come straight back for the retry." : "We rebuild the plan around those areas and book the retake with a clear runway.")

  const lostMarks = worst.map((a) => ({
    area: a.code,
    detail: `${a.label}: ${a.correct}/${a.seen} correct (${a.pct}%) — below the pass line, likely your biggest mark leak.`,
  }))

  const plan = [
    {
      title: worst.length ? `Drill ${worst[0].code} — ${worst[0].label}` : "Run targeted weak-area practice",
      detail: "Adaptive sets aimed at your lowest-scoring topics first.",
      action: "weak",
    },
    {
      title: "Clear your due flashcards daily",
      detail: "Spaced recall keeps the fixed areas fixed while you repair the weak ones.",
      action: "flashcards",
    },
    {
      title: kind === "mock" ? "Retry the mock in 2–3 days" : "Sit a fresh mock before the retake",
      detail: "Exam conditions again — pass it and you're back on track.",
      action: "mock",
    },
  ]

  return { headline, analysis: analysisParts.join(" "), lostMarks, plan }
}

/* ── ACCA AI Examiner — mark a written answer vs a rubric (Sonnet) ─────── */

async function handleAccaExaminer(req: VercelRequest, body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const paper = String(body.paper || "ACCA")
  const stem = String(body.stem || "").slice(0, 2000)
  const maxMarks = Math.max(1, Math.round(Number(body.maxMarks) || 10))
  const rubric = Array.isArray(body.rubric) ? (body.rubric as unknown[]).map((r) => String(r)) : []
  const answer = String(body.answer || "").slice(0, 4000)

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    const local = localExaminer(answer, rubric, maxMarks)
    res.status(200).json({ ...local, isFallback: true })
    return
  }

  const m = await meterAcca(req, "acca-examiner")
  if (!m.allowed) {
    const local = localExaminer(answer, rubric, maxMarks)
    res.status(200).json({
      ...local,
      feedback: `${meterMessage(m.reason, "AI Examiner marking")} ${local.feedback}`,
      isFallback: true,
      reason: m.reason,
    })
    return
  }

  const system = `You are an experienced ACCA examiner marking paper ${paper}.
Mark the student's answer against the provided marking points, awarding marks
generously where the student demonstrates the point in their own words (ACCA
awards marks per valid point, not per exact wording). Be fair but rigorous.

Return ONLY valid JSON, no prose, in exactly this shape:
{"marks": <integer 0..${maxMarks}>, "hit": ["point covered", ...], "missed": ["point not covered", ...], "feedback": "2-4 sentences of constructive, specific feedback"}`

  const prompt = `Question (max ${maxMarks} marks): ${stem}

Marking points (one mark each unless obvious):
${rubric.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Student's answer:
${answer || "(no answer given)"}`

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: SONNET,
      max_tokens: 700,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: prompt }],
    })
    const raw =
      completion.content[0]?.type === "text" ? completion.content[0].text.trim() : ""
    const parsed = safeExaminerJson(raw, maxMarks)
    m.record(completion.usage.input_tokens ?? 0, completion.usage.output_tokens ?? 0)
    if (parsed) {
      res.status(200).json(parsed)
      return
    }
    res.status(200).json({ ...localExaminer(answer, rubric, maxMarks), isFallback: true })
  } catch (err) {
    console.error("lara acca-examiner:", err)
    res.status(200).json({ ...localExaminer(answer, rubric, maxMarks), isFallback: true })
  }
}

function safeExaminerJson(
  s: string,
  maxMarks: number,
): { marks: number; hit: string[]; missed: string[]; feedback: string } | null {
  try {
    const start = s.indexOf("{")
    const end = s.lastIndexOf("}")
    if (start === -1 || end === -1) return null
    const o = JSON.parse(s.slice(start, end + 1)) as Record<string, unknown>
    const marks = Math.max(0, Math.min(maxMarks, Math.round(Number(o.marks) || 0)))
    return {
      marks,
      hit: Array.isArray(o.hit) ? o.hit.map((x) => String(x)) : [],
      missed: Array.isArray(o.missed) ? o.missed.map((x) => String(x)) : [],
      feedback: String(o.feedback || ""),
    }
  } catch {
    return null
  }
}

/**
 * No-key fallback marker: award a mark for each rubric point whose distinctive
 * keywords appear in the answer. Rough, but gives instant, useful signal in
 * demo mode without an API key.
 */
function localExaminer(
  answer: string,
  rubric: string[],
  maxMarks: number,
): { marks: number; hit: string[]; missed: string[]; feedback: string } {
  const text = answer.toLowerCase()
  const hit: string[] = []
  const missed: string[] = []
  for (const point of rubric) {
    const keywords = point
      .toLowerCase()
      .match(/[a-z][a-z0-9-]{3,}/g)
      ?.filter((w) => !["with","that","this","from","which","when","must","have","been","should","under","point","marks"].includes(w))
      ?.slice(0, 4) ?? []
    const covered = keywords.length > 0 && keywords.some((k) => text.includes(k))
    if (covered) hit.push(point)
    else missed.push(point)
  }
  const perPoint = rubric.length > 0 ? maxMarks / rubric.length : 0
  const marks = Math.round(hit.length * perPoint)
  const feedback = answer.trim()
    ? `Demo marking (no AI key): you appear to cover ${hit.length} of ${rubric.length} key points. Add the missing points to raise your mark. Connect a live key for full examiner feedback.`
    : "No answer was submitted. Write your response addressing each marking point."
  return { marks: Math.min(maxMarks, marks), hit, missed, feedback }
}

/* ── Fetch readable text from a URL (for Bring Your Own Content) ──────── */

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
}

async function handleFetchUrl(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const url = String(body.url || "").trim()
  if (!/^https?:\/\/.+/i.test(url)) {
    res.status(200).json({ text: "", error: "invalid_url" })
    return
  }
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; ScholifyBot)" } })
    if (!r.ok) {
      res.status(200).json({ text: "", error: `status_${r.status}` })
      return
    }
    const html = await r.text()
    res.status(200).json({ text: htmlToText(html).slice(0, 8000) })
  } catch {
    res.status(200).json({ text: "", error: "fetch_failed" })
  }
}

/* ── Bring-Your-Own-Content vocabulary extraction (Haiku) ─────────────── */

const EXTRACT_SYSTEM = `You extract the vocabulary a learner needs from text THEY provide. Output STRICTLY valid JSON only — a single array of word objects, no markdown, no commentary. Translations must be accurate; example sentences short and natural.`

/* Small per-language stoplists so mock mode can skip obvious common words. */
const STOPWORDS: Record<string, string[]> = {
  en: ["the","a","an","and","or","but","is","are","was","were","be","been","to","of","in","on","at","for","with","as","by","it","this","that","you","i","he","she","we","they","my","your","his","her","our","their","not","no","yes","do","does","did","have","has","had","will","would","can","could","what","when","where","who","how","there","here","from","about","into","than","then"],
  ru: ["и","в","во","не","на","что","он","с","со","как","а","то","все","она","так","его","но","да","ты","к","у","же","вы","за","бы","по","ее","мне","было","вот","от","меня","еще","нет","о","из","ему","когда","даже","ну","вдруг","ли","если","или","быть","был","него","до","вас"],
  es: ["el","la","los","las","un","una","y","o","de","que","en","a","por","con","para","es","son","no","sí","se","su","sus","lo","le","me","te","mi","tu","como","más","pero","muy","ya","esta","este"],
  it: ["il","lo","la","i","gli","le","un","una","e","o","di","che","in","a","da","per","con","è","sono","non","sì","si","su","mi","ti","ci","come","più","ma","molto","questo","questa"],
  fr: ["le","la","les","un","une","des","et","ou","de","que","en","à","pour","avec","est","sont","ne","pas","oui","se","sa","son","ses","me","te","mon","ton","comme","plus","mais","très","ce","cette"],
  de: ["der","die","das","ein","eine","und","oder","von","zu","in","im","an","auf","für","mit","ist","sind","nicht","ja","sich","sein","seine","mein","dein","wie","mehr","aber","sehr","dieser","diese"],
}

function mockExtract(text: string, lang: string): unknown[] {
  const stop = new Set(STOPWORDS[lang] || [])
  const minLen = STOPWORDS[lang] ? 4 : 6
  const sentences = text
    .split(/(?<=[.!?\n])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const seen = new Set<string>()
  const tokens: string[] = []
  const matches = text.toLowerCase().match(/[\p{L}'-]{2,}/gu) || []
  for (const tok of matches) {
    if (stop.has(tok) || tok.length < minLen || seen.has(tok)) continue
    seen.add(tok)
    tokens.push(tok)
  }
  const picked = tokens.sort((a, b) => b.length - a.length).slice(0, 10)
  return picked.map((tok) => ({
    term: tok,
    translation: "(translation)",
    example: sentences.find((s) => s.toLowerCase().includes(tok)) || "",
    exampleTranslation: "",
    theme: "Your text",
  }))
}

async function handleExtract(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const text = String(body.text || "").slice(0, 4000)
  const target = String(body.targetLanguage || body.target || "").trim()
  const targetLabel = String(body.targetLabel || target || "the target language").trim()
  const native = String(body.nativeLanguage || body.native || "en").trim()
  const nativeLabel = String(body.nativeLabel || native || "English").trim()
  const knownLevel = String(body.knownLevel || body.level || "A2").trim()

  if (!text.trim()) {
    res.status(200).json({ words: [], isMock: false })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({ words: mockExtract(text, target), isMock: true })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: HAIKU,
      max_tokens: 3000,
      system: [{ type: "text", text: EXTRACT_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `The learner studies ${targetLabel} (native ${nativeLabel}), level ${knownLevel}.
From the text below, extract 15-30 useful words/phrases AT OR ABOVE their level — skip very common words below their level that they already know. Prefer recurring, useful words and important multi-word phrases/collocations. If the text is in ${nativeLabel} (not ${targetLabel}), translate the KEY CONCEPTS into the ${targetLabel} words they would need.

Return ONLY a JSON array in exactly this shape:
[{"term":"<word/phrase in ${targetLabel}>","translation":"<meaning in ${nativeLabel}>","example":"<a natural sentence in ${targetLabel}, you may adapt the source>","exampleTranslation":"<that sentence in ${nativeLabel}>","theme":"<short source label>"}]

TEXT:
"""
${text}
"""`,
        },
      ],
    })
    const out = completion.content[0]?.type === "text" ? completion.content[0].text : "[]"
    const words = parseVocabJson(out)
    res.status(200).json({ words: words.length > 0 ? words : mockExtract(text, target), isMock: false })
  } catch (err) {
    console.error("lara extract:", err)
    res.status(200).json({ words: mockExtract(text, target), isMock: true })
  }
}

/* ── Vocabulary word generation (Haiku) ──────────────────────────────── */

const VOCAB_SYSTEM = `You are Lara, a language tutor who builds vocabulary lists. Output STRICTLY valid JSON only — a single array of word objects, no markdown, no commentary. Each word must be genuinely useful, correctly translated, and level-appropriate. Keep example sentences short and natural.`

function parseVocabJson(text: string): unknown[] {
  try {
    const start = text.indexOf("[")
    const end = text.lastIndexOf("]")
    if (start === -1 || end === -1) return []
    const arr = JSON.parse(text.slice(start, end + 1))
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

async function handleVocab(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const target = String(body.target || "").trim()
  const targetLabel = String(body.targetLabel || target || "the target language").trim()
  const native = String(body.native || "en").trim()
  const nativeLabel = String(body.nativeLabel || native || "English").trim()
  const goal = String(body.goal || "").trim()
  const theme = String(body.theme || "").trim()
  const level = String(body.level || "beginner").trim()
  const count = Math.max(1, Math.min(20, Number(body.count) || 12))
  const exclude = Array.isArray(body.exclude)
    ? (body.exclude as unknown[]).map(String).slice(0, 200)
    : []

  const apiKey = process.env.ANTHROPIC_API_KEY
  // No key (or missing target) → let the client fall back to its seed bank.
  if (!apiKey || !target) {
    res.status(200).json({ words: [], isFallback: true })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: HAIKU,
      max_tokens: 1400,
      system: [{ type: "text", text: VOCAB_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `Generate ${count} ${level} ${targetLabel} vocabulary words for a ${nativeLabel} speaker.
Goal: ${goal || "general everyday fluency"}.
Theme: ${theme || "mixed everyday topics"}.
Exclude these already-known words: ${exclude.join(", ") || "(none)"}.

Return ONLY a JSON array in exactly this shape:
[{"term":"<word in ${targetLabel}>","translation":"<meaning in ${nativeLabel}>","example":"<short sentence in ${targetLabel}>","exampleTranslation":"<that sentence in ${nativeLabel}>","theme":"<one or two word topic>"}]`,
        },
      ],
    })
    const text = completion.content[0]?.type === "text" ? completion.content[0].text : "[]"
    res.status(200).json({ words: parseVocabJson(text) })
  } catch (err) {
    console.error("lara vocab:", err)
    res.status(200).json({ words: [], isFallback: true })
  }
}

/* ── Placement test (Haiku) ──────────────────────────────────────────── */

const PLACEMENT_SYSTEM = `You are Lara, a language-placement examiner. Output STRICTLY valid JSON only — a single array, no markdown, no commentary. Produce a CEFR-graded recognition test: words a learner either knows or doesn't, spanning the full range. Translations and distractors must be accurate and plausible.`

async function handlePlacement(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const target = String(body.target || "").trim()
  const targetLabel = String(body.targetLabel || target || "the target language").trim()
  const nativeLabel = String(body.nativeLabel || "English").trim()

  const apiKey = process.env.ANTHROPIC_API_KEY
  // No key (or missing target) → client falls back to manual level selection.
  if (!apiKey || !target) {
    res.status(200).json({ items: [], isFallback: true })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: HAIKU,
      max_tokens: 1500,
      system: [{ type: "text", text: PLACEMENT_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `Build a 12-item ${targetLabel} placement test for a ${nativeLabel} speaker — exactly 2 words at each CEFR level (A1, A2, B1, B2, C1, C2), ordered easiest first. For each word give its ${nativeLabel} meaning plus 3 plausible but wrong ${nativeLabel} meanings (distractors).

Return ONLY a JSON array in exactly this shape:
[{"term":"<word in ${targetLabel}>","translation":"<correct meaning in ${nativeLabel}>","level":"<A1|A2|B1|B2|C1|C2>","distractors":["<wrong1>","<wrong2>","<wrong3>"]}]`,
        },
      ],
    })
    const text = completion.content[0]?.type === "text" ? completion.content[0].text : "[]"
    res.status(200).json({ items: parseVocabJson(text) })
  } catch (err) {
    console.error("lara placement:", err)
    res.status(200).json({ items: [], isFallback: true })
  }
}

/* ── Daily coach message (Haiku) ─────────────────────────────────────── */

const MESSAGE_SYSTEM = `You are Lara, a learning accountability partner. Your communication style:

RULES (never break these):
1. Maximum 2-3 sentences. Never more.
2. ALWAYS use the user's exact name.
3. ALWAYS reference their specific streak number.
4. ALWAYS mention today's specific task title.
5. Be direct and factual, not generic.
6. Never say "amazing", "fantastic", "incredible", "you got this" or
   "keep it up" without a specific reason.
7. Sound like a real person, not a motivational poster.
8. If streak > 10, acknowledge the rarity of that.
9. If they already completed today, congratulate specifically and
   preview tomorrow.
10. Use their actual data — sessions, minutes, goal.

Tone: warm but direct. Like a coach who respects your intelligence.
Not a cheerleader.`

const messageCache = new Map<string, string>()

async function handleMessage(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const userName = String(body.userName || "Friend")
  const streak = Number(body.streak) || 0
  const goal = String(body.goal || "your goal")
  const taskTitle = String(body.taskTitle || "today's task")
  const estimatedMinutes = Number(body.estimatedMinutes) || 20
  const completedToday = Boolean(body.completedToday)
  const totalSessions = Number(body.totalSessions) || 0
  const totalMinutes = Number(body.totalMinutes) || 0
  const longestStreak = Number(body.longestStreak) || streak
  const daysRemaining = Number(body.daysRemaining) || 0
  const yesterdayNote = String(body.yesterdayNote || "").trim()
  const yesterdayMood = String(body.yesterdayMood || "").trim()

  const fallback = completedToday
    ? `${userName}, day ${streak} complete — "${taskTitle}" is done. Rest well; tomorrow's task is already waiting.`
    : `${userName}, day ${streak}. Today it's "${taskTitle}" — ${estimatedMinutes} focused minutes and the chain stays alive.`

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({ message: fallback, isFallback: true })
    return
  }

  const today = new Date().toISOString().split("T")[0]
  const cacheKey = `lara_${body.userId || userName}_${today}_${completedToday ? 1 : 0}`
  const cached = messageCache.get(cacheKey)
  if (cached) {
    res.status(200).json({ message: cached, cached: true })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: HAIKU,
      max_tokens: 200,
      system: [{ type: "text", text: MESSAGE_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `Generate Lara's daily message.

User data:
- Name: ${userName}
- Current streak: ${streak} days
- Goal: ${goal}
- Today's task: "${taskTitle}"
- Task duration: ${estimatedMinutes} minutes
- Completed today: ${completedToday}
- Total sessions completed: ${totalSessions}
- Total minutes studied: ${totalMinutes}
- Longest streak ever: ${longestStreak} days
- Days remaining until deadline: ${daysRemaining}
- Yesterday's session note: "${yesterdayNote || "none"}"
- Yesterday's mood: "${yesterdayMood || "unknown"}"

If a yesterday session note exists, acknowledge it briefly and connect
it to today's task. If the mood was "struggling" or "okay", be a little
more encouraging without being saccharine. If no note exists, do not
mention it at all.

Write Lara's message for today. Be specific. Reference their real numbers. Sound human.`,
        },
      ],
    })
    const text =
      completion.content[0]?.type === "text" ? completion.content[0].text.trim() : fallback
    messageCache.set(cacheKey, text)
    res.status(200).json({ message: text })
  } catch (err) {
    console.error("lara message:", err)
    res.status(200).json({ message: fallback, isFallback: true })
  }
}

/* ── Conversational tutor (Sonnet) ───────────────────────────────────── */

interface ChatMessageIn {
  role: "user" | "lara"
  content: string
}

function buildChatSystem(args: {
  userName: string
  goal: string
  weekNumber: number
  totalWeeks: number
  taskTitle: string
  streak: number
  recentNotes: string[]
}): string {
  const notes = args.recentNotes.filter(Boolean).slice(0, 7)
  const notesBlock = notes.length
    ? notes.map((n, i) => `- Day ${i + 1}: ${n.slice(0, 200)}`).join("\n")
    : "- (no recent notes)"
  return `You are Lara, a focused AI learning coach. You ONLY discuss topics related to the user's learning goal and their current progress.

User context:
- Name: ${args.userName}
- Learning goal: ${args.goal}
- Current week: ${args.weekNumber} of ${args.totalWeeks}
- Today's task: ${args.taskTitle}
- Streak: ${args.streak} days
- Recent session notes:
${notesBlock}

Rules:
1. Stay focused on their learning goal — never coach unrelated topics.
2. Give specific, actionable advice the user can do today.
3. Reference their actual task, streak, or recent notes when relevant.
4. Be encouraging but honest. Never use empty phrases like "you got this".
5. If the message is off-topic, gently redirect to their goal in one sentence.
6. Keep responses under 150 words. Tighter is better.
7. Never sound like a generic AI assistant. Write like a real coach who knows them.
8. Use the user's name sparingly — once at most.`
}

function softFallback(userMessage: string, userName: string, goal: string): string {
  const m = userMessage.toLowerCase()
  if (/struggl|stuck|hard|difficult|frustrat/.test(m)) {
    return `Slowing down is fine, ${userName}. Pick the smallest unstuck question from your "${goal}" task and answer just that — momentum returns from one concrete move.`
  }
  if (/tip|advice|how/.test(m)) {
    return `For "${goal}": today, before doing anything else, write down the one thing you don't yet know. The answer to that is your real next step.`
  }
  if (/focus|today/.test(m)) {
    return `Focus on today's task only. Twenty minutes of full attention beats two hours of half-attention every time.`
  }
  return `Got it. Connect what you're asking back to "${goal}" — what's one tiny experiment you can run today?`
}

async function handleChat(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const userName = String(body.userName || "Friend")
  const goal = String(body.goal || "your goal")
  const weekNumber = Math.max(1, Math.round(Number(body.weekNumber) || 1))
  const totalWeeks = Math.max(1, Math.round(Number(body.totalWeeks) || 4))
  const taskTitle = String(body.taskTitle || "today's task")
  const streak = Math.max(0, Math.round(Number(body.streak) || 0))
  const recentNotes = Array.isArray(body.recentNotes)
    ? (body.recentNotes as unknown[]).map((n) => String(n))
    : []
  const message = String(body.message || "").trim()
  if (!message) {
    res.status(400).json({ error: "Missing message." })
    return
  }
  const history: ChatMessageIn[] = Array.isArray(body.history)
    ? (body.history as unknown[])
        .slice(-10)
        .filter((m): m is ChatMessageIn => typeof m === "object" && m !== null && typeof (m as ChatMessageIn).content === "string")
    : []

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({ message: softFallback(message, userName, goal), isFallback: true })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const conversation: Anthropic.MessageParam[] = [
      ...history.map<Anthropic.MessageParam>((m) => ({
        role: m.role === "lara" ? "assistant" : "user",
        content: m.content,
      })),
      { role: "user", content: message },
    ]
    const completion = await client.messages.create({
      model: SONNET,
      max_tokens: 400,
      system: [
        {
          type: "text",
          text: buildChatSystem({ userName, goal, weekNumber, totalWeeks, taskTitle, streak, recentNotes }),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: conversation,
    })
    const text =
      completion.content[0]?.type === "text"
        ? completion.content[0].text.trim()
        : softFallback(message, userName, goal)
    res.status(200).json({ message: text })
  } catch (err) {
    console.error("lara chat:", err)
    res.status(200).json({
      message: softFallback(message, userName, goal),
      isFallback: true,
    })
  }
}

/* ── Pattern analysis → AI-rewritten suggestions ─────────────────────── */

const ANALYZE_SYSTEM = `You are Lara, a learning coach who reviews a learner's
completion patterns and rewrites flat statistical suggestions into warm,
goal-aware ones. You NEVER invent new actions — you only rephrase the
suggestions you are given.

Rules:
1. Return ONLY valid JSON: { "suggestions": [{ "id": "...", "text": "..." }] }.
2. One suggestion per id from the input. Same number out as in.
3. Each text is one short sentence (max 32 words), kind and concrete.
4. Reference their specific goal and the relevant percentages when useful.
5. Never use "amazing", "incredible", "you got this", "keep it up".
6. End with a question OR a clear action — never both.`

async function handleAnalyze(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const goal = String(body.goal || "your goal")
  const dominantStyle = String(body.dominantStyle || "mixed")
  const breakdown = Array.isArray(body.breakdown) ? body.breakdown : []
  const avgActualMinutes = Number(body.avgActualMinutes) || 0
  const plannedDailyMinutes = Number(body.plannedDailyMinutes) || 0
  const seed = Array.isArray(body.seedSuggestions) ? body.seedSuggestions : []

  if (seed.length === 0) {
    res.status(200).json({ suggestions: [], isFallback: true, reason: "no_seed" })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({
      suggestions: seed.map((s) => ({ id: (s as { id?: string }).id, text: (s as { text?: string }).text || "" })),
      isFallback: true,
      reason: "missing_anthropic_key",
    })
    return
  }

  const breakdownLines = breakdown
    .map((b) => {
      const x = b as { type?: string; rate?: number; completed?: number; total?: number; avgMinutes?: number }
      return `- ${x.type}: ${Math.round((x.rate || 0) * 100)}% (${x.completed}/${x.total}), avg ${x.avgMinutes} min`
    })
    .join("\n")

  const seedLines = seed
    .map((s, i) => {
      const x = s as { id?: string; type?: string; text?: string }
      return `${i + 1}. id="${x.id}" type=${x.type}: ${x.text}`
    })
    .join("\n")

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: HAIKU,
      max_tokens: 600,
      system: [{ type: "text", text: ANALYZE_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `Goal: ${goal}
Dominant style detected: ${dominantStyle}
Average actual minutes per session: ${avgActualMinutes}
Planned daily minutes: ${plannedDailyMinutes}

Completion breakdown:
${breakdownLines || "(none)"}

Seed suggestions to rewrite (return EXACTLY one entry per id, same ids):
${seedLines}

Return ONLY the JSON object.`,
        },
      ],
    })

    const text =
      completion.content[0]?.type === "text" ? completion.content[0].text.trim() : ""
    const match = text.match(/\{[\s\S]*\}/)
    const parsed = match ? safeParse(match[0]) : safeParse(text)
    if (!parsed || !Array.isArray(parsed.suggestions)) {
      res.status(200).json({
        suggestions: seed.map((s) => ({ id: (s as { id?: string }).id, text: (s as { text?: string }).text || "" })),
        isFallback: true,
        reason: "parse_failed",
      })
      return
    }
    res.status(200).json({ suggestions: parsed.suggestions })
  } catch (err) {
    console.error("lara analyze:", err)
    res.status(200).json({
      suggestions: seed.map((s) => ({ id: (s as { id?: string }).id, text: (s as { text?: string }).text || "" })),
      isFallback: true,
      reason: "request_failed",
    })
  }
}

function safeParse(s: string): { suggestions?: Array<{ id?: string; text?: string }> } | null {
  try {
    return JSON.parse(s) as { suggestions?: Array<{ id?: string; text?: string }> }
  } catch {
    return null
  }
}

/* ── Goal difficulty advisor ─────────────────────────────────────────── */

const DIFFICULTY_SYSTEM = `You are Lara, a learning advisor. Decide whether a
learning goal is realistic given the deadline and daily-minutes budget.

Rules:
1. Return ONLY a single JSON object. No prose, no markdown.
2. Shape: { "level": "too_easy"|"realistic"|"ambitious"|"unrealistic",
            "score": 0-100,
            "message": "1-2 sentence honest assessment",
            "suggestion": "1-2 sentence next step",
            "suggestedDeadline": "YYYY-MM-DD or null",
            "suggestedGoal": "string or null",
            "confidence": 0-1 }
3. Be honest but kind. Never harsh. Never use "amazing", "you got this".
4. score: ~50 means "right on the edge"; <30 unrealistic; >80 too easy.
5. If unrealistic, suggestedDeadline MUST be a real ISO date in the
   future that gives the user enough time.
6. If too_easy, suggestedGoal MUST be a slightly more ambitious version
   of the original goal.
7. Otherwise leave suggestedDeadline and suggestedGoal null.`

interface DifficultyJSON {
  level?: string
  score?: number
  message?: string
  suggestion?: string
  suggestedDeadline?: string | null
  suggestedGoal?: string | null
  confidence?: number
}

function neutralDifficulty(daysAvailable: number, dailyMinutes: number): DifficultyJSON {
  if (daysAvailable < 7) {
    return {
      level: "unrealistic",
      score: 22,
      message: `${daysAvailable} day${daysAvailable === 1 ? "" : "s"} is very tight for a real learning goal.`,
      suggestion: "Consider at least 3–4 weeks so Lara can scaffold the plan properly.",
      suggestedDeadline: new Date(Date.now() + 28 * 86_400_000).toISOString().slice(0, 10),
      suggestedGoal: null,
      confidence: 0.6,
    }
  }
  if (daysAvailable >= 365) {
    return {
      level: "too_easy",
      score: 78,
      message: `A full year is plenty — you could compound this into a much bigger outcome.`,
      suggestion: "Stack a second related skill or aim for a higher-level outcome.",
      suggestedDeadline: null,
      suggestedGoal: null,
      confidence: 0.55,
    }
  }
  return {
    level: "realistic",
    score: 65,
    message: `${daysAvailable} days at ${dailyMinutes} min/day looks workable.`,
    suggestion: "Lara will scaffold each week so it builds on the last.",
    suggestedDeadline: null,
    suggestedGoal: null,
    confidence: 0.5,
  }
}

async function handleDifficulty(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const goal = String(body.goal || "").trim()
  const deadline = String(body.deadline || "").trim()
  const dailyMinutes = Math.max(5, Math.round(Number(body.dailyMinutes) || 20))
  const daysAvailable = Math.max(1, Math.round(Number(body.daysAvailable) || 0))

  if (!goal || !deadline) {
    res.status(400).json({ error: "Missing goal or deadline." })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({ ...neutralDifficulty(daysAvailable, dailyMinutes), isFallback: true, reason: "missing_anthropic_key" })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: HAIKU,
      max_tokens: 500,
      system: [{ type: "text", text: DIFFICULTY_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `Goal: ${goal}
Deadline: ${deadline}
Days available: ${daysAvailable}
Daily minutes: ${dailyMinutes}

Return ONLY the JSON object.`,
        },
      ],
    })

    const text =
      completion.content[0]?.type === "text" ? completion.content[0].text.trim() : ""
    const match = text.match(/\{[\s\S]*\}/)
    const parsed = (match ? safeJSON<DifficultyJSON>(match[0]) : safeJSON<DifficultyJSON>(text)) ?? null

    if (!parsed || !parsed.level) {
      res.status(200).json({ ...neutralDifficulty(daysAvailable, dailyMinutes), isFallback: true, reason: "parse_failed" })
      return
    }

    // Normalize: clamp score, coerce types, accept either ISO date or null.
    const clean = {
      level: normalizeLevel(parsed.level),
      score: clampNumber(parsed.score, 0, 100, 50),
      message: typeof parsed.message === "string" ? parsed.message.trim() : "",
      suggestion: typeof parsed.suggestion === "string" ? parsed.suggestion.trim() : "",
      suggestedDeadline:
        typeof parsed.suggestedDeadline === "string" && parsed.suggestedDeadline.length >= 10
          ? new Date(parsed.suggestedDeadline).toISOString()
          : undefined,
      suggestedGoal:
        typeof parsed.suggestedGoal === "string" && parsed.suggestedGoal.length > 0
          ? parsed.suggestedGoal.trim()
          : undefined,
      confidence: clampNumber(parsed.confidence, 0, 1, 0.6),
    }
    res.status(200).json(clean)
  } catch (err) {
    console.error("lara analyze-difficulty:", err)
    res.status(200).json({ ...neutralDifficulty(daysAvailable, dailyMinutes), isFallback: true, reason: "request_failed" })
  }
}

function safeJSON<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T
  } catch {
    return null
  }
}

function clampNumber(n: unknown, min: number, max: number, fallback: number): number {
  const v = typeof n === "number" ? n : Number(n)
  if (!Number.isFinite(v)) return fallback
  return Math.max(min, Math.min(max, v))
}

function normalizeLevel(v: unknown): "too_easy" | "realistic" | "ambitious" | "unrealistic" {
  const s = String(v || "").toLowerCase()
  if (s === "too_easy" || s === "realistic" || s === "ambitious" || s === "unrealistic") return s
  return "realistic"
}

/* ── Streak tree generation (Fal.ai FLUX schnell, optional) ──────────── */

type TreeStageKey =
  | "seedling"
  | "sapling"
  | "young_tree"
  | "growing"
  | "blooming"
  | "mature"
  | "ancient"
  | "legendary"
  | "mythic"

const TREE_PROMPTS: Record<TreeStageKey, string> = {
  seedling: `Minimalist illustration of a tiny green seedling sprouting from dark soil. Single stem, two small leaves. Clean dark navy background, soft glow. Flat design, gentle colors. Hopeful and small. App icon quality illustration.`,
  sapling: `Minimalist illustration of a young sapling tree. Small trunk, 6-8 bright green leaves. Visible small roots. Clean dark navy background. Flat design, vibrant greens and earth tones. Growing and promising.`,
  young_tree: `Minimalist illustration of a young tree, knee-height. Defined trunk with bark texture. Full leafy crown, 15-20 leaves. Deep roots visible. Clean dark navy background. Flat design style. Strong and growing.`,
  growing: `Minimalist illustration of a growing tree, waist-height. Round full canopy with dozens of leaves. Small flower buds beginning to appear. Clean dark navy background. Flat design, lush greens.`,
  blooming: `Beautiful minimalist illustration of a full tree in full bloom. Round lush canopy, pink and white flowers mixed with green leaves. Wide trunk, visible root system. Clean dark navy background. Flat design. Joyful and full.`,
  mature: `Minimalist illustration of a strong mature tree. Thick trunk, wide spread canopy. Deep green leaves, a few fruits beginning. Ancient look but vigorous. Clean dark navy background. Flat design, authoritative.`,
  ancient: `Minimalist illustration of an ancient oak tree. Massive trunk with character, enormous canopy. Multiple fruit clusters. Deep extensive root system. Clean dark navy background. Flat design. Majestic and wise.`,
  legendary: `Minimalist illustration of a legendary ancient tree. Enormous gnarled trunk, sky-wide canopy. Golden fruits hanging heavy. Roots spanning wide. Fireflies around the tree. Clean dark navy background. Magical flat design. Extraordinary and mythical.`,
  mythic: `Minimalist illustration of a mythic world tree. Trunk so wide it fills the frame. Canopy touching clouds. Stars visible through branches. Golden glowing fruits. Clean deep night-sky background. Epic flat design. Once-in-a-lifetime beauty.`,
}

function normalizeStage(v: unknown): TreeStageKey {
  const s = String(v || "").toLowerCase()
  if (
    s === "seedling" ||
    s === "sapling" ||
    s === "young_tree" ||
    s === "growing" ||
    s === "blooming" ||
    s === "mature" ||
    s === "ancient" ||
    s === "legendary" ||
    s === "mythic"
  )
    return s
  return "seedling"
}

function goalContext(goal: string): string {
  const g = goal.toLowerCase()
  if (/ielts|toefl|exam|cefr/.test(g)) return "Academic, studious atmosphere. A faint open book glowing nearby."
  if (/python|javascript|coding|programming|leetcode/.test(g))
    return "Subtle circuit patterns etched into the bark. Tech-inspired sparkle."
  if (/design|figma|ui|ux/.test(g)) return "Geometric perfect symmetry. Designer aesthetic, balanced composition."
  if (/spanish|french|german|japanese|korean|language/.test(g))
    return "A trail of small written letters drifting across the wind near the canopy."
  if (/music|piano|guitar/.test(g)) return "Faint musical notes drifting through the leaves."
  if (/fitness|run|workout|yoga/.test(g)) return "A path winding past the trunk into the distance."
  return ""
}

async function handleTree(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const milestone = Math.max(1, Math.round(Number(body.milestone) || 1))
  const stage = normalizeStage(body.stage)
  const userName = String(body.userName || "").trim().slice(0, 40)
  const goal = String(body.goal || "your goal").slice(0, 200)

  const falKey = process.env.FAL_KEY || process.env.FAL_API_KEY
  if (!falKey) {
    res.status(200).json({ url: null, isFallback: true, reason: "missing_fal_key" })
    return
  }

  const context = goalContext(goal)
  const namePlaque =
    stage === "mythic" && userName
      ? ` A small name plaque at the base of the trunk reads "${userName}".`
      : ""
  const prompt = `${TREE_PROMPTS[stage]}${namePlaque ? namePlaque : ""} ${context} Style: flat design illustration, clean edges, minimal, app icon quality, single subject centered, no text${stage === "mythic" && userName ? ` except the name plaque` : ""}.`

  try {
    // Direct Fal API call — avoids adding the SDK as a runtime dep.
    const r = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        Authorization: `Key ${falKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_size: "square_hd",
        num_inference_steps: 4,
        num_images: 1,
        enable_safety_checker: true,
      }),
    })
    if (!r.ok) {
      const detail = await r.text().catch(() => "")
      res.status(200).json({ url: null, isFallback: true, reason: `fal_${r.status}`, detail: detail.slice(0, 200) })
      return
    }
    const data = (await r.json().catch(() => null)) as { images?: Array<{ url?: string }> } | null
    const url = data?.images?.[0]?.url
    if (!url) {
      res.status(200).json({ url: null, isFallback: true, reason: "no_image_in_response" })
      return
    }
    res.status(200).json({ url, milestone, stage })
  } catch (err) {
    console.error("lara generate-tree:", err)
    res.status(200).json({ url: null, isFallback: true, reason: "request_failed" })
  }
}

/* ── Photo evidence analyzer ─────────────────────────────────────────── */

const PHOTO_SYSTEM = `You are Lara, an honest, warm learning coach reviewing
a photo a learner uploaded as proof of their daily practice.

Rules:
1. Reply with 1–2 sentences. Never longer.
2. Reference one *specific* thing you can see in the photo when possible
   (the page, the hands, the line of text, the dish, the posture). If
   the image is unclear, say what you can tell and what you would notice
   next time.
3. Connect what you see to the goal and today's task — but only if it
   honestly matches the photo.
4. Never use "amazing", "incredible", "you got this", "keep it up".
5. Sound like a coach who cares about results, not a cheerleader.`

type ImageMediaType = "image/jpeg" | "image/png" | "image/webp" | "image/gif"

function normalizeMedia(v: unknown): ImageMediaType {
  const s = String(v || "").toLowerCase().trim()
  if (s === "image/jpeg" || s === "image/jpg") return "image/jpeg"
  if (s === "image/png") return "image/png"
  if (s === "image/webp") return "image/webp"
  if (s === "image/gif") return "image/gif"
  return "image/jpeg"
}

function fallbackPhotoComment(goal: string, taskTitle: string, caption: string): string {
  const cap = caption.trim()
  if (cap) {
    return `Logged: "${cap}". The proof matters — showing up beats explaining. Tomorrow's task is already lined up.`
  }
  return `Evidence saved for "${taskTitle}". Concrete proof of "${goal}" is the only thing that compounds.`
}

async function handlePhoto(body: Record<string, unknown>, res: VercelResponse): Promise<void> {
  const goal = String(body.goal || "your goal")
  const taskTitle = String(body.taskTitle || "today's task")
  const caption = String(body.caption || "").slice(0, 400)
  const imageBase64Raw = String(body.imageBase64 || "")
  const mediaType = normalizeMedia(body.mediaType)

  // Strip a "data:image/...;base64," prefix if the client sent one.
  const imageBase64 = imageBase64Raw.includes(",")
    ? imageBase64Raw.split(",", 2)[1] || ""
    : imageBase64Raw

  if (!imageBase64) {
    res.status(400).json({ error: "Missing imageBase64." })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({
      comment: fallbackPhotoComment(goal, taskTitle, caption),
      isFallback: true,
      reason: "missing_anthropic_key",
    })
    return
  }

  // Cheap size guard — the SDK will reject huge payloads anyway.
  if (imageBase64.length > 6_500_000) {
    res.status(200).json({
      comment: fallbackPhotoComment(goal, taskTitle, caption),
      isFallback: true,
      reason: "image_too_large",
    })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: SONNET,
      max_tokens: 180,
      system: [{ type: "text", text: PHOTO_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: imageBase64 },
            },
            {
              type: "text",
              text: `Goal: ${goal}
Today's task: ${taskTitle}
Learner's caption: "${caption || "(none)"}"

Give your comment now. 1–2 sentences. Specific.`,
            },
          ],
        },
      ],
    })
    const text =
      completion.content[0]?.type === "text"
        ? completion.content[0].text.trim()
        : fallbackPhotoComment(goal, taskTitle, caption)
    res.status(200).json({ comment: text })
  } catch (err) {
    console.error("lara analyze-photo:", err)
    res.status(200).json({
      comment: fallbackPhotoComment(goal, taskTitle, caption),
      isFallback: true,
      reason: "request_failed",
    })
  }
}
