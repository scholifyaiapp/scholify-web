import type { VercelRequest, VercelResponse } from "@vercel/node"

/*
 * POST /api/best-resource — Vercel serverless function (Node runtime).
 *
 * Finds the single best free resource for a task via Perplexity.
 * Falls back to a YouTube search link when PERPLEXITY_API_KEY is absent
 * or the call fails. Callers cache the result client-side per task.
 */

export const config = { maxDuration: 30 }

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
  try {
    const obj = JSON.parse(text)
    if (obj?.title && obj?.url) return { title: String(obj.title), url: String(obj.url) }
  } catch {
    const match = text.match(/\{[^}]+\}/)
    if (match) {
      try {
        const obj = JSON.parse(match[0])
        if (obj?.title && obj?.url) return { title: String(obj.title), url: String(obj.url) }
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

  const taskTitle = String(body.taskTitle || "").trim()
  const goal = String(body.goal || "").trim()
  if (!taskTitle) {
    res.status(400).json({ error: "Missing taskTitle." })
    return
  }

  const apiKey = process.env.PERPLEXITY_API_KEY
  if (!apiKey) {
    res.status(200).json({ ...searchFallback(taskTitle, goal), isFallback: true })
    return
  }

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content:
              'Return ONLY valid JSON in this exact format, nothing else:\n{"title": "resource title here", "url": "https://..."}',
          },
          {
            role: "user",
            content: `Find the single best FREE online resource for this learning task:
Task: "${taskTitle}"
Overall goal: "${goal}"
Requirements:
- Free to access (YouTube, free articles, free courses)
- Specific to the exact task, not just the general topic
- High quality (official docs, well-known creators, reputable sites)
Return only the JSON, no explanation.`,
          },
        ],
        web_search_options: { search_context_size: "low" },
      }),
    })

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const content = data.choices?.[0]?.message?.content ?? ""
    const resource = parseResource(content)
    if (!resource) throw new Error("Invalid resource response")

    res.status(200).json(resource)
  } catch (err) {
    console.error("Resource fetch error:", err)
    res.status(200).json({ ...searchFallback(taskTitle, goal), isFallback: true })
  }
}
