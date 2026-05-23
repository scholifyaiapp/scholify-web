import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/score-speech — Vercel serverless function (Node runtime).
 *
 * Two-step pipeline:
 *   1. Transcribe the recording via OpenAI Whisper (needs OPENAI_API_KEY).
 *      A pre-transcribed `transcript` field in the body is accepted as a
 *      fallback so the feature still works in browsers that ship the
 *      Web Speech API (or when only Anthropic is configured).
 *   2. Score the transcript with Claude Haiku — clarity / accuracy /
 *      fluency / overall + one piece of specific feedback.
 *
 * The endpoint always returns a JSON payload — never throws — so the
 * client can render *something* even when keys / network are absent.
 */

export const config = { maxDuration: 60 }

const SCORE_MODEL = "claude-haiku-4-5"
const WHISPER_URL = "https://api.openai.com/v1/audio/transcriptions"

interface ScoreBody {
  audioBase64?: string
  /** Pre-transcribed text — used when client did Web Speech recognition. */
  transcript?: string
  /** What the user is supposed to be explaining. */
  taskTitle?: string
  goal?: string
  userId?: string
  durationSec?: number
}

interface ScoreResult {
  clarity: number
  accuracy: number
  fluency: number
  overall: number
  feedback: string
  transcript: string
  isFallback?: boolean
}

const SCORE_SYSTEM = `You evaluate a learner's spoken explanation.
You will receive their transcript and the task they were asked to explain.

Return ONLY a JSON object — no prose, no fences:
{
  "clarity": number (0-10, one decimal),
  "accuracy": number (0-10, one decimal),
  "fluency": number (0-10, one decimal),
  "overall": number (0-10, one decimal),
  "feedback": "one short paragraph, max 35 words"
}

Scoring:
- clarity: how easy is it to follow the explanation?
- accuracy: how correct and on-topic is it for the task?
- fluency: rhythm, hesitations, filler-word density.
- overall: weighted blend, slightly biased toward accuracy.
- feedback: specific, actionable, never generic. Reference the
  user's actual phrasing if possible. Acknowledge what was strong
  before suggesting one concrete change.`

function safeNumber(value: unknown, fallback: number): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.max(0, Math.min(10, Math.round(n * 10) / 10))
}

function parseScore(text: string, transcript: string): ScoreResult | null {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "")
  try {
    const parsed = JSON.parse(trimmed) as Partial<ScoreResult>
    return {
      clarity: safeNumber(parsed.clarity, 7),
      accuracy: safeNumber(parsed.accuracy, 7),
      fluency: safeNumber(parsed.fluency, 7),
      overall: safeNumber(parsed.overall, 7),
      feedback: String(parsed.feedback || "").trim() || fallbackFeedback(transcript),
      transcript,
    }
  } catch {
    return null
  }
}

function fallbackFeedback(transcript: string): string {
  if (!transcript) {
    return "Couldn't catch much of that one — try again in a slightly quieter spot and aim for a full minute of explanation."
  }
  const word = transcript.split(/\s+/).length
  if (word < 30) {
    return "Try giving yourself a longer runway — aim for a full minute so you can develop the idea with an example."
  }
  return "Strong attempt. Next time, anchor the explanation with one concrete example near the start so the structure is clearer."
}

function fallbackScoresFor(transcript: string): ScoreResult {
  const words = transcript ? transcript.split(/\s+/).filter(Boolean).length : 0
  // Gentle heuristic so the modal never shows zero.
  const base = Math.min(8.5, 5 + words / 40)
  const clarity = Math.max(4, base - 0.4)
  const accuracy = Math.max(4, base - 0.2)
  const fluency = Math.max(4, base - 0.6)
  const overall = (clarity * 0.3 + accuracy * 0.45 + fluency * 0.25)
  return {
    clarity: Math.round(clarity * 10) / 10,
    accuracy: Math.round(accuracy * 10) / 10,
    fluency: Math.round(fluency * 10) / 10,
    overall: Math.round(overall * 10) / 10,
    feedback: fallbackFeedback(transcript),
    transcript,
    isFallback: true,
  }
}

async function whisperTranscribe(
  audioBase64: string,
  apiKey: string,
): Promise<string> {
  // Strip optional "data:audio/...;base64," prefix.
  const stripped = audioBase64.replace(/^data:[^;]+;base64,/, "")
  const buffer = Buffer.from(stripped, "base64")
  const blob = new Blob([buffer], { type: "audio/webm" })
  const form = new FormData()
  form.append("file", blob, "speech.webm")
  form.append("model", "whisper-1")
  form.append("response_format", "text")
  const res = await fetch(WHISPER_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(`Whisper rejected audio: ${res.status} ${detail.slice(0, 200)}`)
  }
  return (await res.text()).trim()
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: ScoreBody = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const taskTitle = String(body.taskTitle || "today's task").trim()
  const goal = String(body.goal || "").trim()
  let transcript = String(body.transcript || "").trim()

  // ── Step 1: transcribe (if no client-side transcript).
  if (!transcript) {
    const openaiKey = process.env.OPENAI_API_KEY
    if (openaiKey && body.audioBase64) {
      try {
        transcript = await whisperTranscribe(body.audioBase64, openaiKey)
      } catch (err) {
        console.error("Whisper error:", err)
      }
    }
  }

  // ── Step 2: score with Claude (or fall back).
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  if (!anthropicKey) {
    res.status(200).json(fallbackScoresFor(transcript))
    return
  }

  if (!transcript) {
    // Nothing to score — return a soft fallback so the UI doesn't break.
    res.status(200).json(fallbackScoresFor(""))
    return
  }

  try {
    const client = new Anthropic({ apiKey: anthropicKey })
    const message = await client.messages.create({
      model: SCORE_MODEL,
      max_tokens: 600,
      system: [
        { type: "text", text: SCORE_SYSTEM, cache_control: { type: "ephemeral" } },
      ],
      messages: [
        {
          role: "user",
          content: `Task they were asked to explain: "${taskTitle}"
Their broader learning goal: "${goal || "unspecified"}"

Their spoken transcript (verbatim):
"""
${transcript}
"""

Return only the JSON object.`,
        },
      ],
    })

    const text =
      message.content[0]?.type === "text" ? message.content[0].text : ""
    const parsed = parseScore(text, transcript)
    if (!parsed) {
      res.status(200).json(fallbackScoresFor(transcript))
      return
    }
    res.status(200).json(parsed)
  } catch (err) {
    console.error("score-speech error:", err)
    res.status(200).json(fallbackScoresFor(transcript))
  }
}
