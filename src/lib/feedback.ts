import { isSupabaseConfigured, supabase } from "@/lib/supabase"

export type FeedbackCategory = "general" | "idea" | "bug" | "content" | "love"

export interface FeedbackInput {
  name?: string
  email: string
  category: FeedbackCategory
  rating?: number
  message: string
  source: "landing" | "app" | "support"
  pageUrl?: string
  website?: string
}

export interface FeedbackResult {
  ok: boolean
  reason?: string
  notifications?: { admin: boolean; submitter: boolean }
}

export async function submitFeedback(input: FeedbackInput): Promise<FeedbackResult> {
  try {
    let token: string | null = null
    if (isSupabaseConfigured) {
      const { data } = await supabase.auth.getSession()
      token = data.session?.access_token ?? null
    }
    const response = await fetch("/api/affiliate?action=feedback-submit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(input),
    })
    return (await response.json()) as FeedbackResult
  } catch {
    return { ok: false, reason: "network" }
  }
}
