import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/weekly-quiz — Vercel serverless function (Node runtime).
 *
 * Generates a 5-question multiple-choice quiz for a week of learning
 * with Claude. Falls back to a simple quiz when ANTHROPIC_API_KEY is
 * absent or the call fails.
 */

export const config = { maxDuration: 30 }

const MODEL = "claude-haiku-4-5"

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

const SYSTEM = `Generate a quiz ONLY about what the user specifically
studied this week. Questions must test recall of actual concepts from
their completed tasks — not general knowledge. Include exactly one
"application" question where the user must apply what they learned to
a new situation. Mix recall, understanding, and that one application
question. Difficulty should be moderate — not too easy (boring), not too
hard (discouraging). Return ONLY valid JSON, no markdown, no prose:
{
  "questions": [
    { "question": "text", "options": ["A) ...","B) ...","C) ...","D) ..."], "correct": 0, "explanation": "brief, max 20 words" }
  ]
}
Rules: exactly 5 questions, correct is the 0-3 index, no trick questions.`

function fallbackQuiz(goal: string, weekNumber: number) {
  return {
    questions: [
      {
        question: `What is the main focus of Week ${weekNumber} in your ${goal} plan?`,
        options: [
          "A) Fundamentals and foundations",
          "B) Advanced techniques only",
          "C) Test preparation only",
          "D) Skipping ahead",
        ],
        correct: 0,
        explanation: "Each week builds progressively from foundations upward.",
      },
    ],
    isFallback: true,
  }
}

function parseQuiz(text: string): { questions: QuizQuestion[] } | null {
  const tryParse = (s: string) => {
    try {
      const obj = JSON.parse(s)
      if (Array.isArray(obj?.questions) && obj.questions.length > 0) return obj
    } catch {
      /* ignore */
    }
    return null
  }
  const match = text.match(/\{[\s\S]*\}/)
  return tryParse(text.trim()) ?? (match ? tryParse(match[0]) : null)
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

  const goal = String(body.goal || "your goal")
  const weekNumber = Math.max(1, Math.round(Number(body.weekNumber) || 1))
  const completedTasks = Array.isArray(body.completedTasks)
    ? (body.completedTasks as string[])
    : []

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json(fallbackQuiz(goal, weekNumber))
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `Generate a 5-question quiz for Week ${weekNumber} of learning: "${goal}".

The learner completed these tasks this week:
${completedTasks.map((t) => `- ${t}`).join("\n") || "- (foundational work)"}

Test what they actually studied. Return only the JSON.`,
        },
      ],
    })

    const text =
      message.content[0]?.type === "text" ? message.content[0].text : ""
    const quiz = parseQuiz(text)
    if (!quiz) throw new Error("Invalid quiz response")

    res.status(200).json(quiz)
  } catch (err) {
    console.error("Quiz generation error:", err)
    res.status(200).json(fallbackQuiz(goal, weekNumber))
  }
}
