import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@supabase/supabase-js"

/*
 * Combined Lara endpoint — dispatches by ?action= to keep us under the
 * 12-Serverless-Function cap on the Hobby plan. Every action below is
 * authenticated and metered (see meterAcca); there is no other way to Claude.
 *
 *   POST /api/lara?action=acca-tutor       Explain a question / concept (Sonnet)
 *   POST /api/lara?action=acca-generate    Original practice MCQs (Sonnet)
 *   POST /api/lara?action=acca-examiner    Mark a written answer vs a rubric (Sonnet)
 *   POST /api/lara?action=acca-postmortem  Mock-failure analysis (Sonnet)
 *
 * The ten vocab-pivot actions (message, chat, vocab, extract, …) called Claude
 * with no auth and no metering. They return 410 (see RETIRED_ACTIONS) and their
 * handlers have been deleted outright — a retired endpoint you can still call is
 * not retired.
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

export type MeterReason =
  | "auth_required"
  | "plan_required"
  | "limit_reached"
  | "rate_limited"
  | "budget_exhausted"
  | "metering_unavailable"

interface Meter {
  allowed: boolean
  reason?: MeterReason
  /**
   * Usage write after a successful model call. MUST be awaited before the
   * handler responds — see the note on the implementation in `meterAcca`.
   */
  record: (tokensIn: number, tokensOut: number) => Promise<void>
}

const METER_PASS: Meter = { allowed: true, record: async () => {} }

const DENY = (reason: MeterReason): Meter => ({ allowed: false, reason, record: async () => {} })

/* ── Org-wide guardrails (beyond the per-user daily caps) ─────────────────
 *
 * Per-user caps bound what ONE abuser can cost. They do not bound what a launch
 * spike, a bot signup wave, or a retry bug costs the COMPANY in a single day:
 * 10,000 free users × 5 tutor calls is still 50,000 model calls. These two
 * limits close that gap.
 *
 *   AI_DAILY_TOKEN_BUDGET — total tokens (in + out) the whole org may spend per
 *     UTC day. Once exhausted, every AI action falls back deterministically
 *     until midnight. Default 5,000,000 ≈ tens of dollars a day at the current
 *     Haiku/Sonnet mix — generous for the beachhead, survivable if it all burns.
 *
 *   AI_PER_MINUTE_LIMIT — AI calls one user may make per minute. Stops a script
 *     draining its daily allowance (and our budget) in seconds.
 *
 * Both are env-tunable without a redeploy, like AI_KILL_SWITCH.
 */
const DEFAULT_DAILY_TOKEN_BUDGET = 5_000_000
const DEFAULT_PER_MINUTE_LIMIT = 8

function envInt(name: string, fallback: number): number {
  const n = Number(process.env[name])
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback
}

/** Start of the current minute, as an ISO timestamp — the rate-limit bucket. */
function minuteBucket(): string {
  const d = new Date()
  d.setUTCSeconds(0, 0)
  return d.toISOString()
}

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

/**
 * Resolve the caller's tier. app_metadata is the hot path (it rides in the JWT,
 * and only the service role can write it). The `subscriptions` table is the
 * durable record the Paddle webhook also writes — when the two disagree we take
 * the LOWER of the two, so neither a stale JWT nor a half-applied webhook can
 * hand out a plan nobody paid for. A missing table (migration 0015 not run)
 * simply leaves app_metadata in charge — it is defence in depth, not a gate.
 */
async function resolveTier(
  supa: ReturnType<typeof meteringAdmin> & object,
  user: { id: string; app_metadata?: Record<string, unknown> },
): Promise<Tier> {
  const rank: Record<Tier, number> = { free: 0, beginner: 1, pro: 2 }
  const toTier = (raw: string): Tier =>
    raw === "beginner" ? "beginner" : raw !== "free" ? "pro" : "free"

  const claimed = toTier(String(user.app_metadata?.plan || "free"))
  if (claimed === "free") return "free"

  const { data: row, error } = await supa
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", user.id)
    .maybeSingle()
  // No row, or the table isn't there yet (0015 not applied): app_metadata stays
  // in charge. This check is defence in depth, not a gate — unlike the usage
  // reads below, a failure here must not lock a paying customer out.
  if (error || !row) return claimed

  // A canceled/expired subscription row overrides an optimistic JWT claim.
  const active = row.status === "active" || row.status === "past_due" || row.status === "canceling"
  const recorded: Tier = active ? toTier(String(row.plan || "free")) : "free"
  return rank[recorded] < rank[claimed] ? recorded : claimed
}

async function meterAcca(req: VercelRequest, action: AccaAction): Promise<Meter> {
  // No API key → handlers return free fallbacks anyway; nothing to meter.
  if (!process.env.ANTHROPIC_API_KEY) return METER_PASS
  // Emergency brake: treat as a metering outage so every action fails closed.
  if (aiKilled()) return DENY("metering_unavailable")

  const supa = meteringAdmin()
  if (!supa) return DENY("metering_unavailable")

  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) return DENY("auth_required")
  const { data, error } = await supa.auth.getUser(token)
  const user = data?.user
  if (error || !user) return DENY("auth_required")

  // Entitlement is read from app_metadata (service-role-only) — never
  // user_metadata, which the user can self-write to forge a higher plan —
  // and cross-checked against the subscriptions row.
  const tier = await resolveTier(supa, user)
  const cap = DAILY_CAPS[tier][action]
  if (cap === 0) return DENY("plan_required")

  const day = todayUtc()

  // ── Fail CLOSED, for real ────────────────────────────────────────────────
  // supabase-js NEVER throws on a query error: it resolves with { data, error }.
  // So a try/catch around these reads is dead code — a missing table or a
  // transient DB fault would yield `data: null`, read as "0 spent, 0 used", and
  // every cap would silently pass. Each read below must therefore inspect
  // `error` explicitly and deny on it. This is the difference between a cost
  // ceiling and the appearance of one.

  // Org-wide budget first: it protects the company, so it outranks any plan.
  const budget = envInt("AI_DAILY_TOKEN_BUDGET", DEFAULT_DAILY_TOKEN_BUDGET)
  const { data: global, error: globalErr } = await supa
    .from("ai_usage_global")
    .select("tokens_in, tokens_out")
    .eq("day", day)
    .maybeSingle()
  // Missing table (0015 not applied) or any read failure → no budget ceiling
  // can be enforced, so refuse rather than spend blind.
  if (globalErr) return DENY("metering_unavailable")
  const spent = (global?.tokens_in ?? 0) + (global?.tokens_out ?? 0)
  if (spent >= budget) return DENY("budget_exhausted")

  const { data: row, error: usageErr } = await supa
    .from("ai_usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("day", day)
    .eq("action", action)
    .maybeSingle()
  // Missing table (0013 not applied) → the per-user cap cannot be enforced.
  if (usageErr) return DENY("metering_unavailable")
  if ((row?.count ?? 0) >= cap) return DENY("limit_reached")

  // Burst throttle, checked last so it only counts calls that would otherwise
  // have been served. Atomic: the RPC increments and returns in one round trip,
  // so two concurrent requests cannot both read "under the limit".
  const perMinute = envInt("AI_PER_MINUTE_LIMIT", DEFAULT_PER_MINUTE_LIMIT)
  const { data: rateCount, error: rateErr } = await supa.rpc("bump_ai_rate", {
    p_user: user.id,
    p_minute: minuteBucket(),
  })
  if (rateErr) return DENY("metering_unavailable")
  if (Number(rateCount ?? 0) > perMinute) return DENY("rate_limited")

  return {
    allowed: true,
    // AWAITED, not fire-and-forget: Vercel freezes the instance the moment the
    // response is flushed, so a detached RPC can be dropped in flight. If the
    // increments never land, `count` and the org ledger stay at 0 forever and
    // the caps and budget above never trip — the ceiling would exist only on
    // paper. Callers must await this before responding.
    record: async (tokensIn, tokensOut) => {
      const p_tokens_in = Math.max(0, Math.round(tokensIn))
      const p_tokens_out = Math.max(0, Math.round(tokensOut))
      await Promise.allSettled([
        supa.rpc("increment_ai_usage", {
          p_user: user.id,
          p_day: day,
          p_action: action,
          p_tokens_in,
          p_tokens_out,
        }),
        // The org-wide ledger the budget check above reads.
        supa.rpc("increment_ai_global", { p_day: day, p_tokens_in, p_tokens_out }),
      ])
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
    case "rate_limited":
      return "That's a lot of questions at once — give Lara a few seconds to catch up, then try again."
    case "budget_exhausted":
      // Never blame the student for an org-wide ceiling they didn't cause.
      return "Lara's AI is unusually busy right now — here's the built-in explanation while she catches up."
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
  // live. The gate stays even though the handlers are gone, so an old client
  // still gets a clean 410 instead of a confusing "unknown action".
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
    await m.record(completion.usage.input_tokens ?? 0, completion.usage.output_tokens ?? 0)
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
    await m.record(completion.usage.input_tokens ?? 0, completion.usage.output_tokens ?? 0)
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
    await mtr.record(completion.usage.input_tokens ?? 0, completion.usage.output_tokens ?? 0)
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
    await m.record(completion.usage.input_tokens ?? 0, completion.usage.output_tokens ?? 0)
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

