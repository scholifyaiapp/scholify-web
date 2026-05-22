import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/lara-message — Vercel serverless function (Node runtime).
 *
 * Generates the daily message from Lara, the AI coach, with Claude Haiku.
 * Falls back to a meaningful templated message if no key / on failure.
 */

export const config = { maxDuration: 30 }

const MODEL = "claude-haiku-4-5"

// Best-effort per-instance cache (same user + same day → same message).
const messageCache = new Map<string, string>()

const SYSTEM = `You are Lara, a learning accountability partner. Your communication style:

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
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 200,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
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

Write Lara's message for today. Be specific. Reference their real numbers. Sound human.`,
        },
      ],
    })

    const text =
      message.content[0]?.type === "text" ? message.content[0].text.trim() : fallback
    messageCache.set(cacheKey, text)
    res.status(200).json({ message: text })
  } catch (err) {
    console.error("Lara message error:", err)
    res.status(200).json({ message: fallback, isFallback: true })
  }
}
