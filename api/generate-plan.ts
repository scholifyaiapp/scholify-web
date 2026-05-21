import Anthropic from "@anthropic-ai/sdk"

/*
 * Scholify — plan generation endpoint (Vercel serverless function).
 *
 * NOTE: this lives in `/api` at the project root, not `src/`. Vite has no
 * backend; Vercel deploys files under `/api` as serverless functions, so the
 * frontend reaches this at POST /api/generate-plan.
 *
 * It calls Claude (via the official Anthropic SDK) to turn a learning goal
 * into a progressive day-by-day task list. If ANTHROPIC_API_KEY is not set,
 * it returns a small mock plan so the whole flow still works.
 */

export const config = { runtime: "edge" }

const MODEL = "claude-sonnet-4-6"
// Cap how many tasks we generate in one call — keeps latency and tokens sane
// for long goals. The dashboard can extend the plan later.
const MAX_TASKS = 14

const SYSTEM_PROMPT = `You are Scholify's AI learning coach, Lara.
Return ONLY a valid JSON array. No explanation, no markdown, no code blocks.
Each array item must have exactly these fields:
- day_number (integer, starting at 1)
- week_number (integer, starting at 1)
- task_title (string, max 8 words, action-oriented)
- task_description (string, max 40 words, specific and concrete)
- estimated_minutes (integer, equal to the user's stated daily minutes)
- resource_type (one of: video, reading, practice, reflection, exercise)
Make the tasks progressive: start easy and steadily increase difficulty.
Be extremely specific to the user's exact goal — no generic filler.`

type ResourceType = "video" | "reading" | "practice" | "reflection" | "exercise"

interface PlanTask {
  day_number: number
  week_number: number
  task_title: string
  task_description: string
  estimated_minutes: number
  resource_type: ResourceType
}

interface PlanRequest {
  goal?: string
  deadline?: string | null
  dailyMinutes?: number
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

/** Seven-task fallback used when no API key is configured. */
function mockPlan(dailyMinutes: number): PlanTask[] {
  const seed: Array<[string, string, ResourceType]> = [
    ["Map where you're starting from", "Write down what you already know and the single outcome you want. Honest baseline beats a perfect plan.", "reflection"],
    ["Watch one foundational overview", "Find a highly-rated intro video on your topic and watch it actively, pausing to note three key ideas.", "video"],
    ["Read the core concepts", "Read a focused article or chapter on the fundamentals. Summarise it in five of your own bullet points.", "reading"],
    ["Do a small hands-on warm-up", "Apply one concept in a tiny, low-stakes exercise. The goal is momentum, not perfection.", "practice"],
    ["Practice the hardest basic skill", "Pick the fundamental that feels least comfortable and drill it deliberately for the full session.", "exercise"],
    ["Build a mini end-to-end attempt", "Combine what you've learned into one small complete attempt, however rough. Notice what's still unclear.", "practice"],
    ["Review and plan your next leap", "Look back at the week, list what stuck and what didn't, and set the focus for the days ahead.", "reflection"],
  ]
  return seed.map(([title, desc, type], i) => ({
    day_number: i + 1,
    week_number: 1,
    task_title: title,
    task_description: desc,
    estimated_minutes: dailyMinutes,
    resource_type: type,
  }))
}

/** Pull a JSON array out of the model's text, tolerating stray code fences. */
function parsePlan(text: string): PlanTask[] | null {
  let t = text.trim()
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) t = fence[1].trim()
  const start = t.indexOf("[")
  const end = t.lastIndexOf("]")
  if (start === -1 || end === -1 || end < start) return null
  try {
    const parsed: unknown = JSON.parse(t.slice(start, end + 1))
    return Array.isArray(parsed) ? (parsed as PlanTask[]) : null
  } catch {
    return null
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405)

  let body: PlanRequest
  try {
    body = (await req.json()) as PlanRequest
  } catch {
    return json({ error: "Invalid JSON body." }, 400)
  }

  const goal = (body.goal || "").trim()
  const dailyMinutes = Math.max(5, Math.round(Number(body.dailyMinutes) || 20))
  if (!goal) return json({ error: "A learning goal is required." }, 400)

  const today = new Date()
  const deadline = body.deadline ? new Date(body.deadline) : null
  const totalDays =
    deadline && !Number.isNaN(deadline.getTime())
      ? Math.max(1, Math.round((deadline.getTime() - today.getTime()) / 86_400_000))
      : 30
  const taskCount = Math.min(totalDays, MAX_TASKS)

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // No key yet — return a mock plan so the product still works end-to-end.
    return json({ plan: mockPlan(dailyMinutes), mock: true })
  }

  try {
    const client = new Anthropic({ apiKey })
    const userPrompt =
      `Goal: ${goal}. ` +
      `Deadline: ${deadline ? deadline.toDateString() : "open-ended"}. ` +
      `Daily commitment: ${dailyMinutes} minutes. ` +
      `Today: ${today.toDateString()}. Total days available: ${totalDays}. ` +
      `Generate exactly ${taskCount} progressive daily tasks as a JSON array.`

    // Stream + finalMessage avoids SDK HTTP timeouts on longer generations.
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 8000,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          // Shared across every user — cache the prefix.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userPrompt }],
    })
    const message = await stream.finalMessage()

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")

    const plan = parsePlan(text)
    if (!plan || plan.length === 0) {
      return json({ error: "Lara returned an unreadable plan. Please retry." }, 502)
    }
    return json({ plan })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Plan generation failed."
    return json({ error: msg }, 500)
  }
}
