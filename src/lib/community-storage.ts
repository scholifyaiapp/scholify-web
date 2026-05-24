/*
 * Scholify Community — data layer.
 *
 * Local-first + Supabase mirror, same pattern as the other storage
 * modules. Realtime subscription helper for the live feed.
 *
 * NOTE on privacy: posts in this module only ever carry the user's
 * **display name** ("First L." by default), never email or full name.
 * The caller is responsible for passing the display name.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/* ── Types ───────────────────────────────────────────────────────────── */

export type GoalCategory =
  | "languages"
  | "programming"
  | "design"
  | "certifications"
  | "exams"
  | "fitness"
  | "business"
  | "creative"
  | "academic"
  | "other"

export const GOAL_CATEGORIES: GoalCategory[] = [
  "languages",
  "programming",
  "design",
  "certifications",
  "exams",
  "fitness",
  "business",
  "creative",
  "academic",
  "other",
]

export const CATEGORY_LABEL: Record<GoalCategory, string> = {
  languages: "Languages",
  programming: "Programming",
  design: "Design",
  certifications: "Certifications",
  exams: "Exams",
  fitness: "Fitness",
  business: "Business",
  creative: "Creative",
  academic: "Academic",
  other: "Other",
}

export const CATEGORY_ICON: Record<GoalCategory, string> = {
  languages: "🌍",
  programming: "💻",
  design: "🎨",
  certifications: "📜",
  exams: "🎓",
  fitness: "💪",
  business: "💼",
  creative: "🎭",
  academic: "📚",
  other: "✨",
}

export type PostType = "completion" | "milestone" | "streak" | "certificate"

export interface CommunityPost {
  id: string
  userId: string
  authorName: string
  authorAvatarHue: number
  postType: PostType
  goalCategory: GoalCategory
  goalName: string
  content: string
  streakAtPost?: number
  weekNumber?: number
  isPublic: boolean
  likes: number
  cheeredByMe: boolean
  createdAt: string
}

export interface OptInState {
  optedIn: boolean
  shareCompletions: boolean
  shareMilestones: boolean
  displayName?: string
  updatedAt: string
}

/* ── Storage keys ────────────────────────────────────────────────────── */

const KEY_OPT_IN = "scholify-community-opt-in"
const KEY_POSTS = "scholify-community-posts"
const KEY_PROMPT_SHOWN = "scholify-community-prompt-shown"
const KEY_AUTOPOST_LEDGER = "scholify-community-autopost-ledger"
const KEY_CHEERED = "scholify-community-cheered"

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent("scholify-community-change", { detail: key }))
  } catch {
    /* ignore */
  }
}

/* ── Opt-in ──────────────────────────────────────────────────────────── */

export function readOptIn(): OptInState {
  return readJSON<OptInState>(KEY_OPT_IN, {
    optedIn: false,
    shareCompletions: true,
    shareMilestones: true,
    updatedAt: new Date(0).toISOString(),
  })
}

export function writeOptIn(state: Partial<OptInState>, userId?: string): OptInState {
  const merged: OptInState = {
    ...readOptIn(),
    ...state,
    updatedAt: new Date().toISOString(),
  }
  writeJSON(KEY_OPT_IN, merged)
  if (isSupabaseConfigured && userId) {
    supabase
      .from("community_opt_in")
      .upsert(
        {
          user_id: userId,
          opted_in: merged.optedIn,
          share_completions: merged.shareCompletions,
          share_milestones: merged.shareMilestones,
          display_name: merged.displayName,
        },
        { onConflict: "user_id" },
      )
      .then(
        () => {},
        () => {},
      )
  }
  return merged
}

export function hasShownOptInPrompt(): boolean {
  return readJSON<boolean>(KEY_PROMPT_SHOWN, false)
}

export function markOptInPromptShown(): void {
  writeJSON(KEY_PROMPT_SHOWN, true)
}

/* ── Goal-category derivation ────────────────────────────────────────── */

const CATEGORY_KEYWORDS: Record<GoalCategory, RegExp[]> = {
  languages: [/spanish|french|german|chinese|japanese|korean|russian|arabic|portuguese|italian|language|ielts|toefl|hsk|jlpt|delf/i],
  programming: [/python|javascript|typescript|java|c\+\+|rust|go\b|swift|react|vue|angular|programming|coding|leetcode|algorithm|software|backend|frontend|devops/i],
  design: [/figma|ui|ux|design|illustrator|photoshop|sketch|prototyp|product design/i],
  certifications: [/aws|azure|gcp|certified|cert |certification|pmp|cpa|cfa|comptia/i],
  exams: [/sat\b|gre\b|gmat|lsat|mcat|exam|usmle|cmle/i],
  fitness: [/fitness|run|gym|workout|yoga|marathon|pull-?up|push-?up|weight/i],
  business: [/business|marketing|sales|negotiat|startup|finance|accounting|investing/i],
  creative: [/draw|paint|music|piano|guitar|sing|writ|novel|film|photo/i],
  academic: [/calculus|algebra|physics|chemistry|biology|history|economics|statistics|thesis|gpa|university/i],
  other: [],
}

export function detectGoalCategory(goal: string): GoalCategory {
  const g = (goal || "").toLowerCase()
  for (const cat of GOAL_CATEGORIES) {
    if (cat === "other") continue
    if (CATEGORY_KEYWORDS[cat].some((rx) => rx.test(g))) return cat
  }
  return "other"
}

/* ── Display name + avatar hue ───────────────────────────────────────── */

export function displayNameFromAuth(meta: { firstName?: string; lastName?: string; email?: string }): string {
  const first = (meta.firstName || "").trim()
  const last = (meta.lastName || "").trim()
  if (first) return last ? `${first} ${last[0]}.` : first
  if (meta.email) return meta.email.split("@")[0]
  return "Learner"
}

export function hueFor(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xff
  return h
}

/* ── Posts ───────────────────────────────────────────────────────────── */

export function readPosts(): CommunityPost[] {
  return readJSON<CommunityPost[]>(KEY_POSTS, [])
}

function writePosts(list: CommunityPost[]): void {
  // Keep the last 200 posts client-side.
  writeJSON(KEY_POSTS, list.slice(-200))
}

export function createPost(input: Omit<CommunityPost, "id" | "createdAt" | "likes" | "cheeredByMe" | "isPublic"> & {
  isPublic?: boolean
}): CommunityPost {
  const post: CommunityPost = {
    ...input,
    id: `cp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    likes: 0,
    cheeredByMe: false,
    isPublic: input.isPublic ?? true,
  }
  writePosts([...readPosts(), post])
  if (isSupabaseConfigured) {
    supabase
      .from("community_posts")
      .insert({
        id: post.id,
        user_id: post.userId,
        post_type: post.postType,
        goal_category: post.goalCategory,
        goal_name: post.goalName,
        content: post.content,
        streak_at_post: post.streakAtPost,
        week_number: post.weekNumber,
        is_public: post.isPublic,
      })
      .then(
        () => {},
        () => {},
      )
  }
  return post
}

export function cheerPost(postId: string, userId: string): CommunityPost | null {
  const cheered = readJSON<Record<string, boolean>>(KEY_CHEERED, {})
  if (cheered[postId]) return null
  cheered[postId] = true
  writeJSON(KEY_CHEERED, cheered)
  let out: CommunityPost | null = null
  const list = readPosts().map((p) => {
    if (p.id !== postId) return p
    out = { ...p, likes: p.likes + 1, cheeredByMe: true }
    return out
  })
  if (out) writePosts(list)
  if (isSupabaseConfigured && out) {
    supabase
      .from("community_likes")
      .insert({ post_id: postId, user_id: userId })
      .then(
        () => {},
        () => {},
      )
  }
  return out
}

export function postsForCategory(cat: GoalCategory | "all" | "following", myCategory?: GoalCategory): CommunityPost[] {
  const all = [...readPosts()].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  if (cat === "all") return all
  if (cat === "following") return myCategory ? all.filter((p) => p.goalCategory === myCategory) : all
  return all.filter((p) => p.goalCategory === cat)
}

/* ── Auto-post ledger (avoid double-posting the same milestone) ──────── */

function autopostLedger(): Record<string, boolean> {
  return readJSON<Record<string, boolean>>(KEY_AUTOPOST_LEDGER, {})
}

function ledgerHas(key: string): boolean {
  return !!autopostLedger()[key]
}

function ledgerMark(key: string): void {
  const map = autopostLedger()
  map[key] = true
  writeJSON(KEY_AUTOPOST_LEDGER, map)
}

const MILESTONE_STREAKS = [7, 14, 30, 60, 90, 180, 365]

export interface MaybeAutoPostInput {
  userId: string
  authorName: string
  goal: string
  newStreak: number
  completedDay: number
  totalDays: number
  weekJustCompleted?: number
}

/**
 * Called from Dashboard's handleComplete after a successful day mark.
 * Generates community posts for week completions and streak milestones,
 * gated on opt-in + per-event ledger so we never double-post.
 */
export function maybeAutoPost(input: MaybeAutoPostInput): CommunityPost[] {
  const opt = readOptIn()
  if (!opt.optedIn) return []
  const created: CommunityPost[] = []
  const category = detectGoalCategory(input.goal)
  const base = {
    userId: input.userId,
    authorName: opt.displayName || input.authorName,
    authorAvatarHue: hueFor(input.userId || input.authorName),
    goalCategory: category,
    goalName: input.goal,
    streakAtPost: input.newStreak,
  }

  // Week completion
  if (opt.shareCompletions && input.weekJustCompleted) {
    const key = `week:${input.userId}:${input.goal}:${input.weekJustCompleted}`
    if (!ledgerHas(key)) {
      ledgerMark(key)
      created.push(
        createPost({
          ...base,
          postType: "completion",
          content: `✓ Completed Week ${input.weekJustCompleted} tasks`,
          weekNumber: input.weekJustCompleted,
        }),
      )
    }
  }

  // Streak milestones
  if (opt.shareMilestones && MILESTONE_STREAKS.includes(input.newStreak)) {
    const key = `streak:${input.userId}:${input.goal}:${input.newStreak}`
    if (!ledgerHas(key)) {
      ledgerMark(key)
      created.push(
        createPost({
          ...base,
          postType: input.newStreak >= 30 ? "milestone" : "streak",
          content: `🔥 ${input.newStreak}-day streak reached!`,
        }),
      )
    }
  }

  // Goal completion (last day)
  if (opt.shareCompletions && input.completedDay >= input.totalDays && input.totalDays > 1) {
    const key = `goal:${input.userId}:${input.goal}`
    if (!ledgerHas(key)) {
      ledgerMark(key)
      created.push(
        createPost({
          ...base,
          postType: "certificate",
          content: `🏆 Goal completed!`,
        }),
      )
    }
  }

  return created
}

/* ── Leaderboard (local fallback) ────────────────────────────────────── */

export interface LeaderboardRow {
  userId: string
  name: string
  authorAvatarHue: number
  sessions: number
  streak: number
  isYou: boolean
}

export function computeLocalLeaderboard(category: GoalCategory, currentUserId: string): LeaderboardRow[] {
  // Use posts as a proxy in demo mode: count "completion" posts in the
  // last 7 days as sessions. Streak comes from the most recent post.
  const cutoff = Date.now() - 7 * 86400000
  const buckets = new Map<string, LeaderboardRow>()
  for (const p of readPosts()) {
    if (p.goalCategory !== category) continue
    if (+new Date(p.createdAt) < cutoff) continue
    const row = buckets.get(p.userId) || {
      userId: p.userId,
      name: p.authorName,
      authorAvatarHue: p.authorAvatarHue,
      sessions: 0,
      streak: 0,
      isYou: p.userId === currentUserId,
    }
    if (p.postType === "completion") row.sessions += 1
    if (p.streakAtPost && p.streakAtPost > row.streak) row.streak = p.streakAtPost
    buckets.set(p.userId, row)
  }
  return Array.from(buckets.values()).sort((a, b) => b.sessions - a.sessions || b.streak - a.streak)
}

/* ── Realtime subscription ───────────────────────────────────────────── */

export interface PostsHandle {
  unsubscribe: () => void
}

export function subscribePosts(handler: (post: CommunityPost) => void): PostsHandle {
  const subs: Array<() => void> = []

  if (isSupabaseConfigured) {
    const channel = supabase
      .channel("community-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "community_posts" },
        (payload) => {
          const raw = payload.new as Record<string, unknown>
          if (raw.is_public === false) return
          handler({
            id: String(raw.id),
            userId: String(raw.user_id),
            authorName: String(raw.author_name || raw.display_name || "Learner"),
            authorAvatarHue: hueFor(String(raw.user_id)),
            postType: (raw.post_type as PostType) || "completion",
            goalCategory: (raw.goal_category as GoalCategory) || "other",
            goalName: String(raw.goal_name || ""),
            content: String(raw.content || ""),
            streakAtPost: raw.streak_at_post as number | undefined,
            weekNumber: raw.week_number as number | undefined,
            isPublic: raw.is_public !== false,
            likes: (raw.likes as number) ?? 0,
            cheeredByMe: false,
            createdAt: String(raw.created_at),
          })
        },
      )
      .subscribe()
    subs.push(() => {
      supabase.removeChannel(channel)
    })
  }

  if (typeof window !== "undefined") {
    const onLocal = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (typeof detail === "string" && detail === KEY_POSTS) {
        const last = readPosts().slice(-1)[0]
        if (last) handler(last)
      }
    }
    window.addEventListener("scholify-community-change", onLocal)
    subs.push(() => window.removeEventListener("scholify-community-change", onLocal))
  }

  return { unsubscribe: () => subs.forEach((fn) => fn()) }
}

export function subscribeOptInLocal(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const fn = (e: Event) => {
    const detail = (e as CustomEvent).detail
    if (typeof detail === "string" && (detail === KEY_OPT_IN || detail === KEY_POSTS)) {
      handler()
    }
  }
  window.addEventListener("scholify-community-change", fn)
  window.addEventListener("storage", () => handler())
  return () => {
    window.removeEventListener("scholify-community-change", fn)
  }
}

/* ── Demo seeds ──────────────────────────────────────────────────────── */

const SEED_FLAG = "scholify-community-seeded-v1"

export function ensureSeeded(): void {
  if (typeof window === "undefined") return
  if (window.localStorage.getItem(SEED_FLAG) === "1") return
  if (readPosts().length > 0) {
    window.localStorage.setItem(SEED_FLAG, "1")
    return
  }
  const now = Date.now()
  const seeds: Array<Partial<CommunityPost> & {
    minutesAgo: number
    name: string
  }> = [
    {
      name: "Dilnoza M.",
      goalCategory: "exams",
      goalName: "IELTS Band 7+ prep",
      postType: "completion",
      content: "✓ Completed Week 4 tasks",
      streakAtPost: 28,
      weekNumber: 4,
      likes: 7,
      minutesAgo: 120,
    },
    {
      name: "Marco G.",
      goalCategory: "programming",
      goalName: "Daily LeetCode 30 min",
      postType: "milestone",
      content: "🔥 30-day streak reached!",
      streakAtPost: 30,
      likes: 22,
      minutesAgo: 240,
    },
    {
      name: "Cleo R.",
      goalCategory: "languages",
      goalName: "Spanish A2 → B1",
      postType: "streak",
      content: "🔥 14-day streak reached!",
      streakAtPost: 14,
      likes: 11,
      minutesAgo: 60,
    },
    {
      name: "Dan O.",
      goalCategory: "certifications",
      goalName: "AWS Solutions Architect",
      postType: "completion",
      content: "✓ Completed Week 6 tasks",
      streakAtPost: 18,
      weekNumber: 6,
      likes: 4,
      minutesAgo: 30,
    },
    {
      name: "Iva P.",
      goalCategory: "design",
      goalName: "Figma to Fluency",
      postType: "certificate",
      content: "🏆 Goal completed!",
      streakAtPost: 47,
      likes: 38,
      minutesAgo: 360,
    },
    {
      name: "Yui W.",
      goalCategory: "programming",
      goalName: "TypeScript deep dive",
      postType: "streak",
      content: "🔥 7-day streak reached!",
      streakAtPost: 7,
      likes: 3,
      minutesAgo: 15,
    },
    {
      name: "Hadi K.",
      goalCategory: "languages",
      goalName: "Spanish A2 → B1",
      postType: "completion",
      content: "✓ Completed Week 2 tasks",
      streakAtPost: 12,
      weekNumber: 2,
      likes: 1,
      minutesAgo: 90,
    },
    {
      name: "Sana H.",
      goalCategory: "exams",
      goalName: "IELTS Band 7+ prep",
      postType: "milestone",
      content: "🔥 60-day streak reached!",
      streakAtPost: 60,
      likes: 64,
      minutesAgo: 480,
    },
  ]
  const posts: CommunityPost[] = seeds.map((s, i) => ({
    id: `seed_${i}_${Math.random().toString(36).slice(2, 6)}`,
    userId: `peer_${i}`,
    authorName: s.name,
    authorAvatarHue: hueFor(s.name),
    postType: s.postType as PostType,
    goalCategory: s.goalCategory as GoalCategory,
    goalName: s.goalName as string,
    content: s.content as string,
    streakAtPost: s.streakAtPost,
    weekNumber: s.weekNumber,
    isPublic: true,
    likes: s.likes ?? 0,
    cheeredByMe: false,
    createdAt: new Date(now - s.minutesAgo * 60000).toISOString(),
  }))
  writePosts(posts)
  window.localStorage.setItem(SEED_FLAG, "1")
}
