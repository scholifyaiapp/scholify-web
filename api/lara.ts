import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

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
const SONNET = "claude-sonnet-4-6"

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
  if (action === "message") return handleMessage(body, res)
  if (action === "chat") return handleChat(body, res)
  if (action === "analyze-patterns") return handleAnalyze(body, res)
  res.status(400).json({ error: "Unknown action. Use ?action=message | chat | analyze-patterns." })
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
