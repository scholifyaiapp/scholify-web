import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

/*
 * POST /api/best-resource — Vercel serverless function (Node runtime).
 *
 * Finds the single best free resource for a task using Claude with its
 * built-in web search tool, so URLs are real and current. Falls back to
 * a YouTube search link when ANTHROPIC_API_KEY is absent or on failure.
 * Callers cache the result client-side per task.
 */

export const config = { maxDuration: 45 }

const MODEL = "claude-haiku-4-5"

interface Resource {
  title: string
  url: string
}

function searchFallback(taskTitle: string, goal: string): Resource {
  return {
    title: `Search: ${taskTitle}`,
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${taskTitle} ${goal}`,
    )}`,
  }
}

function parseResource(text: string): Resource | null {
  const tryParse = (s: string): Resource | null => {
    try {
      const obj = JSON.parse(s)
      if (obj?.title && obj?.url) return { title: String(obj.title), url: String(obj.url) }
    } catch {
      /* ignore */
    }
    return null
  }
  return tryParse(text.trim()) ?? (text.match(/\{[\s\S]*?\}/) ? tryParse(text.match(/\{[\s\S]*?\}/)![0]) : null)
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

  const taskTitle = String(body.taskTitle || "").trim()
  const goal = String(body.goal || "").trim()
  if (!taskTitle) {
    res.status(400).json({ error: "Missing taskTitle." })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({ ...searchFallback(taskTitle, goal), isFallback: true })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      tools: [{ type: "web_search_20260209", name: "web_search" }],
      system: [
        {
          type: "text",
          text:
            'You find the single best FREE online learning resource for a task. ' +
            'Search the web, pick ONE high-quality, currently-available free resource ' +
            "(YouTube video, free article, official docs, free course). " +
            'Reply with ONLY valid JSON, nothing else: {"title": "...", "url": "https://..."}',
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `Find the best free resource for this learning task.\nTask: "${taskTitle}"\nOverall goal: "${goal}"\nReturn only the JSON object.`,
        },
      ],
    })

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
    const resource = parseResource(text)
    if (!resource) throw new Error("Invalid resource response")

    res.status(200).json(resource)
  } catch (err) {
    console.error("Resource fetch error:", err)
    res.status(200).json({ ...searchFallback(taskTitle, goal), isFallback: true })
  }
}
