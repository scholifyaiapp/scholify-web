import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/challenges?action=generate
 *
 * Optional AI rewrite of the week's 3 challenges. The client already
 * has a deterministic local generator — this endpoint is only used to
 * make the challenge titles + descriptions warmer and more goal-aware.
 *
 * Body: {
 *   goal: string,
 *   weekNumber: number,
 *   year: number,
 *   dailyMinutes: number,
 *   streak?: number,
 *   seeds: [{ id, type, title, description, targetValue, unit, xpReward, difficulty }]
 * }
 *
 * Always returns 200; when ANTHROPIC_API_KEY is missing or anything
 * fails we return the seeds unchanged with `isFallback:true` so the
 * client behavior stays identical.
 */

export const config = { maxDuration: 30 }

const MODEL = "claude-haiku-4-5"

const SYSTEM = `You are Lara, a learning coach who rewrites flat weekly
challenge prompts into warm, goal-aware ones. Hard rules:

1. Return ONLY a valid JSON array. No prose, no markdown.
2. One entry per seed id from the input — same ids, same order.
3. Each title is max 8 words, starts with a verb when possible.
4. Each description is one sentence, max 24 words, kind and concrete.
5. Reference the goal ONCE across the three challenges, not in every one.
6. Never use "amazing", "incredible", "you got this", "keep it up".
7. Do not change targetValue, unit, xpReward, type, difficulty.
8. Return shape: [{ "id": "...", "title": "...", "description": "..." }]`

interface Seed {
  id?: string
  type?: string
  title?: string
  description?: string
  targetValue?: number
  unit?: string
  xpReward?: number
  difficulty?: string
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

  const action = String((req.query.action || body.action) || "generate").trim().toLowerCase()
  if (action !== "generate") {
    res.status(400).json({ error: "Unknown action. Use ?action=generate." })
    return
  }

  const goal = String(body.goal || "your goal")
  const weekNumber = Math.max(1, Math.round(Number(body.weekNumber) || 1))
  const year = Math.round(Number(body.year) || new Date().getUTCFullYear())
  const dailyMinutes = Math.max(5, Math.round(Number(body.dailyMinutes) || 20))
  const streak = Math.max(0, Math.round(Number(body.streak) || 0))
  const seeds: Seed[] = Array.isArray(body.seeds) ? (body.seeds as Seed[]) : []

  if (seeds.length === 0) {
    res.status(400).json({ error: "Missing seeds[]." })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({
      challenges: seeds.map((s) => ({ id: s.id, title: s.title, description: s.description })),
      isFallback: true,
      reason: "missing_anthropic_key",
    })
    return
  }

  const seedBlock = seeds
    .map((s, i) => {
      return `${i + 1}. id="${s.id}" type=${s.type} difficulty=${s.difficulty} target=${s.targetValue} ${s.unit}
   title: ${s.title}
   description: ${s.description}`
    })
    .join("\n")

  try {
    const client = new Anthropic({ apiKey })
    const completion = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `Goal: ${goal}
Week: ${weekNumber} / ${year}
Daily minutes: ${dailyMinutes}
Current streak: ${streak}

Seeds to rewrite (return EXACTLY one entry per id, same ids and order):
${seedBlock}

Return ONLY the JSON array.`,
        },
      ],
    })

    const text =
      completion.content[0]?.type === "text" ? completion.content[0].text.trim() : ""
    const match = text.match(/\[[\s\S]*\]/)
    const parsed = (match ? safeParse(match[0]) : safeParse(text)) as
      | Array<{ id?: string; title?: string; description?: string }>
      | null

    if (!parsed || parsed.length !== seeds.length) {
      res.status(200).json({
        challenges: seeds.map((s) => ({ id: s.id, title: s.title, description: s.description })),
        isFallback: true,
        reason: "parse_failed",
      })
      return
    }

    res.status(200).json({
      challenges: parsed.map((p, i) => ({
        id: typeof p.id === "string" ? p.id : seeds[i].id,
        title: typeof p.title === "string" && p.title.trim().length > 0 ? p.title.trim() : seeds[i].title,
        description:
          typeof p.description === "string" && p.description.trim().length > 0
            ? p.description.trim()
            : seeds[i].description,
      })),
    })
  } catch (err) {
    console.error("challenges generate:", err)
    res.status(200).json({
      challenges: seeds.map((s) => ({ id: s.id, title: s.title, description: s.description })),
      isFallback: true,
      reason: "request_failed",
    })
  }
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}
