import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/skill-suggestions — Vercel serverless function (Node runtime).
 *
 * Powers Stage 4 of the conversational onboarding. Takes the user's
 * "future vision" sentence and returns 4 concrete, learnable skills.
 *
 * Falls back to a sensible static list if ANTHROPIC_API_KEY is missing
 * or the model returns garbage — so the flow never blocks.
 */

export const config = { maxDuration: 20 }

const MODEL = "claude-haiku-4-5"

const SYSTEM = `You suggest learning skills. Given a person's future self vision,
return EXACTLY 4 concrete, learnable skills that would move them toward it.

Rules:
- Output ONLY a JSON array of 4 strings — no prose, no markdown fence.
- Each string is at most 4 words.
- Be specific. "Python data analysis" beats "Programming".
- Mix breadth: one fundamentals pick, one tool/library, one applied skill, one stretch.
- Never repeat the future vision verbatim.`

const FALLBACK_SUGGESTIONS = [
  "Python fundamentals",
  "Data structures",
  "SQL & databases",
  "Practical projects",
]

function classifyFallback(vision: string): string[] {
  const v = vision.toLowerCase()
  if (/exam|ielts|toefl|test|gmat|gre|mcat|bar/.test(v)) {
    return [
      "Reading comprehension",
      "Timed practice tests",
      "Vocabulary drills",
      "Weak-spot review",
    ]
  }
  if (/design|figma|ui|ux/.test(v)) {
    return [
      "Figma fundamentals",
      "Type & color theory",
      "Component systems",
      "Portfolio case studies",
    ]
  }
  if (/data|ml|ai|machine learning|analytics/.test(v)) {
    return [
      "Python data analysis",
      "SQL & databases",
      "Statistics fundamentals",
      "ML basics",
    ]
  }
  if (/code|develop|engineer|programming/.test(v)) {
    return [
      "JavaScript fundamentals",
      "React & UI",
      "Data structures",
      "System design basics",
    ]
  }
  if (/speak|public speaking|presentation|confidence/.test(v)) {
    return [
      "Voice & breath control",
      "Story structure",
      "Slide design",
      "Live practice reps",
    ]
  }
  if (/market|growth|business|product/.test(v)) {
    return [
      "Customer interviews",
      "Funnel analytics",
      "Copywriting basics",
      "Lifecycle marketing",
    ]
  }
  return FALLBACK_SUGGESTIONS
}

function parseSuggestions(text: string): string[] | null {
  const trimmed = text.trim()
  // Strip ```json fences if the model added them despite instructions.
  const stripped = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/, "")
    .trim()
  try {
    const parsed = JSON.parse(stripped)
    if (!Array.isArray(parsed)) return null
    const cleaned = parsed
      .filter((s): s is string => typeof s === "string")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4)
    return cleaned.length === 4 ? cleaned : null
  } catch {
    return null
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: { futureVision?: string } = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const futureVision = String(body.futureVision || "").trim()
  if (!futureVision) {
    res.status(200).json({ suggestions: FALLBACK_SUGGESTIONS, isFallback: true })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res
      .status(200)
      .json({ suggestions: classifyFallback(futureVision), isFallback: true })
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
          content: `Future vision: "${futureVision}"\n\nReturn the JSON array.`,
        },
      ],
    })

    const text =
      message.content[0]?.type === "text" ? message.content[0].text : ""
    const parsed = parseSuggestions(text)
    if (!parsed) {
      res
        .status(200)
        .json({ suggestions: classifyFallback(futureVision), isFallback: true })
      return
    }
    res.status(200).json({ suggestions: parsed })
  } catch (err) {
    console.error("skill-suggestions error:", err)
    res
      .status(200)
      .json({ suggestions: classifyFallback(futureVision), isFallback: true })
  }
}
