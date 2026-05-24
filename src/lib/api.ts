/*
 * Frontend client for Scholify's AI endpoints.
 *
 * The endpoints are Vercel serverless functions under /api — same origin
 * as the app, so API_BASE is empty by default. (VITE_API_URL can point
 * elsewhere for local function testing, e.g. `vercel dev`.)
 *
 * All AI API keys live server-side in those functions — never in the
 * browser bundle.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""

export interface ApiPlanTask {
  day_number: number
  week_number: number
  task_title: string
  task_description: string
  estimated_minutes: number
  resource_type: string
  difficulty?: string
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}))
    throw new Error((detail as { error?: string })?.error || `Request failed (${res.status})`)
  }
  return res.json() as Promise<T>
}

export const api = {
  generatePlan: (params: {
    goal: string
    deadline: string | null
    dailyMinutes: number
    userId?: string
    weekNumber?: number
  }) =>
    post<{ tasks: ApiPlanTask[]; daysCount: number; weeksCount: number; isMock?: boolean }>(
      "/api/generate-plan",
      params,
    ),

  getLaraMessage: (params: {
    userName: string
    streak: number
    goal: string
    taskTitle: string
    estimatedMinutes: number
    completedToday: boolean
    totalSessions: number
    totalMinutes: number
    longestStreak: number
    daysRemaining: number
    userId?: string
    yesterdayNote?: string
    yesterdayMood?: string
  }) => post<{ message: string; isFallback?: boolean }>("/api/lara-message", params),

  getBestResource: (params: { taskTitle: string; goal: string; dayNumber: number }) =>
    post<{ title: string; url: string; isFallback?: boolean }>("/api/best-resource", params),

  getWeeklyQuiz: (params: { goal: string; weekNumber: number; completedTasks: string[] }) =>
    post<{
      questions: Array<{
        question: string
        options: string[]
        correct: number
        explanation: string
      }>
    }>("/api/weekly-quiz", params),

  getSkillSuggestions: (params: { futureVision: string }) =>
    post<{ suggestions: string[]; isFallback?: boolean }>(
      "/api/skill-suggestions",
      params,
    ),

  scoreSpeech: (params: {
    audioBase64?: string
    transcript?: string
    taskTitle: string
    goal?: string
    userId?: string
    durationSec?: number
  }) =>
    post<{
      clarity: number
      accuracy: number
      fluency: number
      overall: number
      feedback: string
      transcript: string
      isFallback?: boolean
    }>("/api/score-speech", params),

  laraChat: (params: {
    userName: string
    goal: string
    weekNumber: number
    totalWeeks: number
    taskTitle: string
    streak: number
    recentNotes: string[]
    history: { role: "user" | "lara"; content: string }[]
    message: string
  }) =>
    post<{ message: string; isFallback?: boolean }>("/api/lara-chat", params),

  partnerInvite: (params: {
    email: string
    inviteUrl: string
    senderName: string
    senderGoal?: string
  }) =>
    post<{ sent: boolean; isFallback?: boolean; reason?: string }>(
      "/api/partner-invite",
      params,
    ),
}
