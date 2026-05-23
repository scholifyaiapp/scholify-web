import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/recalibrate-plan — Vercel serverless function (Node runtime).
 *
 * Asks Claude to regenerate the not-yet-completed tail of a learning plan
 * so the user can still finish by their deadline after missing days or
 * changing the deadline. Falls back to a mock continuation when no key
 * is configured.
 */

export const config = { maxDuration: 60 }

const MODEL = "claude-sonnet-4-6"
const RESOURCE_TYPES = ["video", "reading", "practice", "reflection", "exercise"]

interface PlanTask {
  day_number: number
  week_number: number
  task_title: string
  task_description: string
  estimated_minutes: number
  resource_type: string
  difficulty: string
}

const SYSTEM = `You are Lara recalibrating a learning plan.
The user has fallen behind or changed their deadline.

Generate a new set of tasks that:
1. Picks up where they left off (not from scratch).
2. Adjusts difficulty if they missed many days.
3. Still reaches the goal by the deadline.
4. Never mentions the missed days.

CRITICAL RULES:
- Return ONLY a valid JSON array. Zero other text.
- No markdown. No code blocks. No explanation.
- task_title maximum 8 words, action verb first.
- task_description maximum 40 words, specific.
- resource_type must be exactly one of: video, reading, practice, reflection, exercise
- difficulty must be one of: beginner, intermediate, advanced
- Each object must have: day_number, week_number, task_title, task_description, estimated_minutes, resource_type, difficulty`

function mockTasks(
  start: number,
  count: number,
  minutes: number,
  goal: string,
): PlanTask[] {
  return Array.from({ length: count }, (_, i) => ({
    day_number: start + i,
    week_number: Math.ceil((start + i) / 7),
    task_title: `Continue ${goal} — focused session`,
    task_description: `Spend ${minutes} focused minutes on the next concept for "${goal}". Adjust if needed and keep moving.`,
    estimated_minutes: minutes,
    resource_type: RESOURCE_TYPES[i % RESOURCE_TYPES.length],
    difficulty: "intermediate",
  }))
}

function parseTasks(text: string): unknown[] | null {
  try {
    const parsed = JSON.parse(text)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    const match = text.match(/\[[\s\S]*\]/)
    if (!match) return null
    try {
      const parsed = JSON.parse(match[0])
      return Array.isArray(parsed) ? parsed : null
    } catch {
      return null
    }
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
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

  const goal = String(body.goal || "").trim()
  const deadline = body.deadline ? String(body.deadline) : null
  const dailyMinutes = Math.max(5, Math.round(Number(body.dailyMinutes) || 20))
  const startDayNumber = Math.max(1, Math.round(Number(body.startDayNumber) || 1))
  const remainingDays = Math.max(1, Math.round(Number(body.remainingDays) || 7))
  const currentWeek = Math.max(1, Math.round(Number(body.currentWeek) || 1))
  const reason = String(body.reason || "manual")
  const missedDays = Math.max(0, Math.round(Number(body.missedDays) || 0))

  if (!goal) {
    res.status(400).json({ error: "Missing goal." })
    return
  }

  // Cap the number of tasks we ask for in one shot to stay within token limits.
  const tasksToGenerate = Math.min(remainingDays, 14)

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({
      tasks: mockTasks(startDayNumber, tasksToGenerate, dailyMinutes, goal),
      isMock: true,
    })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const userPrompt = `Goal: ${goal}.
Remaining days: ${remainingDays}.
Last completed: day ${startDayNumber - 1}. Starting from day ${startDayNumber}.
Deadline: ${deadline ?? "open-ended"}.
Daily minutes: ${dailyMinutes}.
Reason for recalibration: ${reason}${
      missedDays > 0 ? ` (gap of ~${missedDays} days)` : ""
    }.
Current week index: ${currentWeek}.

Generate ${tasksToGenerate} tasks starting at day ${startDayNumber}.
Each task must:
- Have estimated_minutes = ${dailyMinutes}
- Be specific to "${goal}", not generic
- Increment day_number by 1 each step

Return only the JSON array.`

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 6000,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: userPrompt }],
    })
    const message = await stream.finalMessage()
    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")

    const raw = parseTasks(text)
    if (!raw || raw.length === 0) throw new Error("Invalid JSON from Claude")

    const tasks: PlanTask[] = raw.map((t, i) => {
      const task = t as Record<string, unknown>
      const rt = String(task.resource_type ?? "")
      return {
        day_number: Number(task.day_number) || startDayNumber + i,
        week_number:
          Number(task.week_number) || Math.ceil((startDayNumber + i) / 7),
        task_title: String(task.task_title || `Day ${startDayNumber + i} task`),
        task_description: String(task.task_description || ""),
        estimated_minutes: Number(task.estimated_minutes) || dailyMinutes,
        resource_type: RESOURCE_TYPES.includes(rt) ? rt : "practice",
        difficulty: String(task.difficulty || "intermediate"),
      }
    })

    res.status(200).json({ tasks })
  } catch (err) {
    console.error("recalibrate-plan error:", err)
    res.status(200).json({
      tasks: mockTasks(startDayNumber, tasksToGenerate, dailyMinutes, goal),
      isMock: true,
    })
  }
}
