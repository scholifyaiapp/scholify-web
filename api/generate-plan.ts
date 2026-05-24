import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/generate-plan — Vercel serverless function (Node runtime).
 *
 * Turns a learning goal into a progressive day-by-day task list with
 * Claude. API keys live in Vercel env vars and never reach the browser.
 * Supports week-by-week generation via `weekNumber`. Falls back to a
 * mock plan when ANTHROPIC_API_KEY is absent or the call fails.
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

type DifficultyLevel = "too_easy" | "realistic" | "ambitious" | "unrealistic"

function difficultyGuidance(level: DifficultyLevel | null): string {
  switch (level) {
    case "ambitious":
      return `Difficulty assessment: AMBITIOUS.
The user picked a tight timeline. Every task must be maximally focused with
zero filler. Cut anything that isn't strictly needed to hit the goal. Skip
"exploration" tasks. Default resource_type heavily toward "practice" and
"exercise" — they compound fastest.`
    case "unrealistic":
      return `Difficulty assessment: UNREALISTIC but the user chose this anyway.
Make the plan aggressive but still achievable. No fluff, no nice-to-haves.
Front-load the highest-leverage practice. Skip background reading unless
it directly unblocks the next exercise. Tone of task_description stays
honest and matter-of-fact, never alarming.`
    case "too_easy":
      return `Difficulty assessment: TOO EASY for the timeline.
The user has plenty of time. Add depth and a small "bonus challenge" to
each task_description ("Bonus: …"). Include some advanced tasks earlier
than usual. It's OK to mix in reflection + creative tasks since the
schedule has room.`
    case "realistic":
    default:
      return `Difficulty assessment: REALISTIC.
Pace the plan normally — week 1 foundation, weeks 2-3 build, later weeks
synthesize. Mix resource_types evenly.`
  }
}

function systemPrompt(dailyMinutes: number, difficulty: DifficultyLevel | null): string {
  return `You are Lara, Scholify's expert AI learning coach. Your specialty is
breaking any learning goal into the smallest possible daily actions that
compound into real skill.

CRITICAL RULES:
1. Return ONLY a valid JSON array. Zero other text.
2. No markdown. No code blocks. No explanation.
3. Every task must be completable in exactly ${dailyMinutes} minutes.
4. Tasks must be SPECIFIC to the exact goal stated.
5. Progressive difficulty: week 1 is foundation, later weeks build on it.
6. resource_type must be exactly one of: video, reading, practice, reflection, exercise
7. task_title maximum 8 words, action-oriented verb first.
8. task_description maximum 40 words, specific and practical.

${difficultyGuidance(difficulty)}

Each JSON object must have EXACTLY these keys:
{
  "day_number": integer,
  "week_number": integer,
  "task_title": "string max 8 words",
  "task_description": "string max 40 words",
  "estimated_minutes": ${dailyMinutes},
  "resource_type": "video|reading|practice|reflection|exercise",
  "difficulty": "beginner|intermediate|advanced"
}`
}

function normalizeDifficulty(v: unknown): DifficultyLevel | null {
  const s = String(v || "").toLowerCase()
  if (s === "too_easy" || s === "realistic" || s === "ambitious" || s === "unrealistic") return s
  return null
}

function mockTasks(start: number, count: number, minutes: number, goal: string): PlanTask[] {
  return Array.from({ length: count }, (_, i) => ({
    day_number: start + i,
    week_number: Math.ceil((start + i) / 7),
    task_title: `Study ${goal} — focused session`,
    task_description: `Spend ${minutes} focused minutes on the core concepts for "${goal}". Take notes and review what you learned.`,
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

  const goal = String(body.goal || "").trim()
  const deadline = body.deadline ? String(body.deadline) : null
  const dailyMinutes = Math.max(5, Math.round(Number(body.dailyMinutes) || 20))
  const difficultyLevel = normalizeDifficulty(body.difficultyLevel)
  if (!goal || !dailyMinutes) {
    res.status(400).json({ error: "Missing required fields." })
    return
  }

  const today = new Date()
  const deadlineDate = deadline ? new Date(deadline) : null
  const daysCount =
    deadlineDate && !Number.isNaN(deadlineDate.getTime())
      ? Math.max(Math.ceil((deadlineDate.getTime() - today.getTime()) / 86_400_000), 7)
      : 30
  const weeksCount = Math.ceil(daysCount / 7)

  // Week 1 (onboarding) seeds up to 14 days of runway; later weeks are 7.
  const weekNumber = Math.max(1, Math.round(Number(body.weekNumber) || 1))
  const weekStart = weekNumber <= 1 ? 1 : (weekNumber - 1) * 7 + 1
  const weekCap = weekNumber <= 1 ? 14 : 7
  const tasksToGenerate = Math.max(1, Math.min(weekCap, daysCount - weekStart + 1))
  const weekEnd = weekStart + tasksToGenerate - 1

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({
      tasks: mockTasks(weekStart, tasksToGenerate, dailyMinutes, goal),
      daysCount,
      weeksCount,
      isMock: true,
    })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const userPrompt = `Generate the learning plan tasks.

Goal: ${goal}
Deadline: ${deadline ?? "open-ended"}
Daily available time: ${dailyMinutes} minutes
Today's date: ${today.toISOString().split("T")[0]}
Total plan duration: ${daysCount} days (${weeksCount} weeks)
This batch covers: Day ${weekStart} to Day ${weekEnd}
Tasks needed: ${tasksToGenerate}

Context: ${
      weekNumber <= 1
        ? "This is the start. Begin with absolute foundations. Build confidence. Nothing overwhelming."
        : `This is Week ${weekNumber}. The learner has completed ${weekStart - 1} days. Build on those foundations.`
    }

Generate exactly ${tasksToGenerate} tasks for days ${weekStart} through ${weekEnd}.
Be extremely specific to "${goal}". Generic study advice is unacceptable.`

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 6000,
      system: [
        { type: "text", text: systemPrompt(dailyMinutes, difficultyLevel), cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: userPrompt }],
    })
    const message = await stream.finalMessage()
    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")

    const raw = parseTasks(text)
    if (!raw || raw.length === 0) {
      throw new Error("Invalid JSON response from Claude")
    }

    const tasks: PlanTask[] = raw.map((t, i) => {
      const task = t as Record<string, unknown>
      const rt = String(task.resource_type ?? "")
      return {
        day_number: Number(task.day_number) || weekStart + i,
        week_number: Number(task.week_number) || Math.ceil((weekStart + i) / 7),
        task_title: String(task.task_title || `Day ${weekStart + i} task`),
        task_description: String(task.task_description || ""),
        estimated_minutes: Number(task.estimated_minutes) || dailyMinutes,
        resource_type: RESOURCE_TYPES.includes(rt) ? rt : "practice",
        difficulty: String(task.difficulty || "intermediate"),
      }
    })

    res.status(200).json({ tasks, daysCount, weeksCount })
  } catch (err) {
    // Graceful fallback so onboarding never dead-ends.
    console.error("Plan generation error:", err)
    res.status(200).json({
      tasks: mockTasks(weekStart, tasksToGenerate, dailyMinutes, goal),
      daysCount,
      weeksCount,
      isMock: true,
    })
  }
}
