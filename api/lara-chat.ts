import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/lara-chat — Vercel serverless function (Node runtime).
 *
 * Conversational tutor mode. Claude Sonnet 4.6 because it's more capable
 * for back-and-forth tutoring than the daily-message Haiku endpoint.
 * Falls back to a soft templated reply when ANTHROPIC_API_KEY is absent.
 */

export const config = { maxDuration: 30 }

const MODEL = "claude-sonnet-4-6"

interface ChatMessageIn {
  role: "user" | "lara"
  content: string
}

interface ChatBody {
  userName?: string
  goal?: string
  weekNumber?: number
  totalWeeks?: number
  taskTitle?: string
  streak?: number
  recentNotes?: string[]
  history?: ChatMessageIn[]
  message: string
}

function buildSystem(args: {
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

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: ChatBody = { message: "" }
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const userName = String(body.userName || "Friend")
  const goal = String(body.goal || "your goal")
  const weekNumber = Math.max(1, Math.round(Number(body.weekNumber) || 1))
  const totalWeeks = Math.max(1, Math.round(Number(body.totalWeeks) || 4))
  const taskTitle = String(body.taskTitle || "today's task")
  const streak = Math.max(0, Math.round(Number(body.streak) || 0))
  const recentNotes = Array.isArray(body.recentNotes)
    ? body.recentNotes.map((n) => String(n))
    : []
  const message = String(body.message || "").trim()
  if (!message) {
    res.status(400).json({ error: "Missing message." })
    return
  }

  const history: ChatMessageIn[] = Array.isArray(body.history)
    ? body.history.slice(-10).filter((m) => m && typeof m.content === "string")
    : []

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({
      message: softFallback(message, userName, goal),
      isFallback: true,
    })
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
      model: MODEL,
      max_tokens: 400,
      system: [
        {
          type: "text",
          text: buildSystem({
            userName,
            goal,
            weekNumber,
            totalWeeks,
            taskTitle,
            streak,
            recentNotes,
          }),
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
    console.error("lara-chat error:", err)
    res.status(200).json({
      message: softFallback(message, userName, goal),
      isFallback: true,
    })
  }
}
