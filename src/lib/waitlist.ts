import { isSupabaseConfigured, supabase } from "@/lib/supabase"

export interface WaitlistContact {
  id: string
  email: string
  name: string
  source: string
  created_at: string
}

export async function listWaitlist(): Promise<{ contacts: WaitlistContact[]; total: number }> {
  if (!isSupabaseConfigured) return { contacts: [], total: 0 }
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new Error("not_authenticated")

  const response = await fetch("/api/waitlist?action=list", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(`waitlist_${response.status}`)
  const body = (await response.json()) as {
    contacts?: WaitlistContact[]
    total?: number
  }
  return {
    contacts: body.contacts || [],
    total: body.total || 0,
  }
}
