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
    difficultyLevel?: "too_easy" | "realistic" | "ambitious" | "unrealistic" | null
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
  }) => post<{ message: string; isFallback?: boolean }>("/api/lara?action=message", params),

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
    post<{ message: string; isFallback?: boolean }>("/api/lara?action=chat", params),

  partnerInvite: (params: {
    email: string
    inviteUrl: string
    senderName: string
    senderGoal?: string
  }) =>
    post<{ sent: boolean; isFallback?: boolean; reason?: string }>(
      "/api/social?action=partner-invite",
      params,
    ),

  teamInvite: (params: {
    teamName: string
    primaryColor?: string
    logoUrl?: string
    senderName: string
    invites: { email: string; joinUrl: string }[]
  }) =>
    post<{
      sent: number
      total: number
      isFallback?: boolean
      reason?: string
      failures?: { email: string; reason: string }[]
    }>("/api/social?action=team-invite", params),

  analyzePatterns: (params: {
    goal: string
    dominantStyle: string
    breakdown: { type: string; rate: number; completed: number; total: number; avgMinutes: number }[]
    avgActualMinutes: number
    plannedDailyMinutes: number
    seedSuggestions: { id: string; type: string; text: string }[]
  }) =>
    post<{
      suggestions: { id: string; text: string }[]
      isFallback?: boolean
      reason?: string
    }>("/api/lara?action=analyze-patterns", params),

  refineChallenges: (params: {
    goal: string
    weekNumber: number
    year: number
    dailyMinutes: number
    streak?: number
    seeds: {
      id: string
      type: string
      title: string
      description: string
      targetValue: number
      unit: string
      xpReward: number
      difficulty: string
    }[]
  }) =>
    post<{
      challenges: { id: string; title: string; description: string }[]
      isFallback?: boolean
      reason?: string
    }>("/api/challenges?action=generate", params),

  generateTree: (params: {
    milestone: number
    stage:
      | "seedling"
      | "sapling"
      | "young_tree"
      | "growing"
      | "blooming"
      | "mature"
      | "ancient"
      | "legendary"
      | "mythic"
    userName: string
    goal: string
  }) =>
    post<{
      url: string | null
      milestone?: number
      stage?: string
      isFallback?: boolean
      reason?: string
      detail?: string
    }>("/api/lara?action=generate-tree", params),

  analyzePhoto: (params: {
    goal: string
    taskTitle: string
    caption: string
    imageBase64: string
    mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif"
  }) =>
    post<{ comment: string; isFallback?: boolean; reason?: string }>(
      "/api/lara?action=analyze-photo",
      params,
    ),

  analyzeDifficulty: (params: {
    goal: string
    deadline: string
    dailyMinutes: number
    daysAvailable: number
  }) =>
    post<{
      level: "too_easy" | "realistic" | "ambitious" | "unrealistic"
      score: number
      message: string
      suggestion: string
      suggestedDeadline?: string
      suggestedGoal?: string
      confidence: number
      isFallback?: boolean
      reason?: string
    }>("/api/lara?action=analyze-difficulty", params),

  getLeaderboard: async (params: { category: string; weekOffset?: number; userId?: string }) => {
    const qs = new URLSearchParams()
    qs.set("action", "leaderboard")
    qs.set("category", params.category)
    if (params.weekOffset != null) qs.set("weekOffset", String(params.weekOffset))
    if (params.userId) qs.set("userId", params.userId)
    const r = await fetch(`${API_BASE}/api/social?${qs.toString()}`)
    if (!r.ok) throw new Error(`Leaderboard request failed (${r.status})`)
    return r.json() as Promise<{
      top10: { user_id: string; display_name: string | null; sessions: number; streak: number }[]
      yourRank: { rank: number; sessions: number } | null
      category: string
      weekStart: string
      weekEnd: string
      isFallback?: boolean
      reason?: string
    }>
  },
}
