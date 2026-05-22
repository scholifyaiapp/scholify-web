import type { VercelRequest, VercelResponse } from "@vercel/node"

/*
 * POST /api/weekly-quiz — Vercel serverless function (Node runtime).
 *
 * Generates a 5-question multiple-choice quiz for a week of learning
 * via Gemini Flash. Falls back to a simple quiz when GEMINI_API_KEY is
 * absent or the call fails.
 */

export const config = { maxDuration: 30 }

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

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
  try {
    const obj = JSON.parse(text)
    if (Array.isArray(obj?.questions)) return obj
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      try {
        const obj = JSON.parse(match[0])
        if (Array.isArray(obj?.questions)) return obj
      } catch {
        /* fall through */
      }
    }
  }
  return null
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

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    res.status(200).json(fallbackQuiz(goal, weekNumber))
    return
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a 5-question multiple choice quiz for Week ${weekNumber} of learning: "${goal}".

The user completed these tasks this week:
${completedTasks.map((t) => `- ${t}`).join("\n") || "- (foundational work)"}

Return ONLY valid JSON in this exact format:
{
  "questions": [
    { "question": "text", "options": ["A) ...","B) ...","C) ...","D) ..."], "correct": 0, "explanation": "brief explanation max 20 words" }
  ]
}

Rules: questions must test what they actually studied, not too easy, not impossible, correct index 0-3, no trick questions.`,
                },
              ],
            },
          ],
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        }),
      },
    )

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    }
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
    const quiz = parseQuiz(content)
    if (!quiz || quiz.questions.length === 0) throw new Error("Invalid quiz response")

    res.status(200).json(quiz)
  } catch (err) {
    console.error("Quiz generation error:", err)
    res.status(200).json(fallbackQuiz(goal, weekNumber))
  }
}
