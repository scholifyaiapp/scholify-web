/*
 * Cal.com — alternative to Google Calendar for users who already
 * run their scheduling there. Authentication is a single personal
 * API key the user pastes into Settings. We never see a platform-wide
 * secret; the key is stored per-user in `calendar_accounts.calcom_api_key`.
 */

import type { PlanTask } from "@/lib/scholify-data"

const CALCOM_BOOKINGS_URL = "https://api.cal.com/v1/bookings"
const CALCOM_ME_URL = "https://api.cal.com/v1/me"

export interface CalcomBookingInput {
  apiKey: string
  taskTitle: string
  date: string // ISO
  durationMinutes: number
  eventTypeId?: number
}

export async function testCalcomKey(apiKey: string): Promise<boolean> {
  try {
    const res = await fetch(`${CALCOM_ME_URL}?apiKey=${encodeURIComponent(apiKey)}`)
    return res.ok
  } catch {
    return false
  }
}

export async function createCalcomBooking(
  params: CalcomBookingInput,
): Promise<{ id: number | string }> {
  const start = new Date(params.date)
  const end = new Date(start.getTime() + params.durationMinutes * 60_000)

  const response = await fetch(
    `${CALCOM_BOOKINGS_URL}?apiKey=${encodeURIComponent(params.apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventTypeId: params.eventTypeId ?? 1,
        title: `📚 ${params.taskTitle}`,
        start: start.toISOString(),
        end: end.toISOString(),
        metadata: { source: "scholify" },
      }),
    },
  )

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new Error(`Cal.com rejected booking: ${response.status} ${text}`)
  }
  return (await response.json()) as { id: number | string }
}

export async function syncWeekToCalcom(
  apiKey: string,
  tasks: PlanTask[],
  planStartDate: string,
  dailyMinutes: number,
  onProgress?: (done: number, total: number) => void,
): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0
  let failed = 0
  const errors: string[] = []
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]
    const date = new Date(planStartDate)
    date.setDate(date.getDate() + task.day_number - 1)
    date.setHours(8, 0, 0, 0)
    try {
      await createCalcomBooking({
        apiKey,
        taskTitle: task.task_title,
        date: date.toISOString(),
        durationMinutes: dailyMinutes,
      })
      success += 1
    } catch (err) {
      failed += 1
      errors.push(err instanceof Error ? err.message : String(err))
    }
    onProgress?.(i + 1, tasks.length)
    await new Promise((r) => setTimeout(r, 100))
  }
  return { success, failed, errors }
}
