/*
 * Scholify — Streak Tree storage + stage logic.
 *
 * Strategy:
 *  • Each milestone (1, 7, 14, 21, 30, 45, 60, 90, 180) has a "stage"
 *    with a name, poetic description, hue, and a beautiful inline SVG.
 *  • When the user hits a milestone we (optionally) call Fal.ai FLUX
 *    via /api/lara?action=generate-tree to produce a unique image and
 *    cache the resulting URL locally. Without a key we keep the SVG —
 *    the feature still feels alive.
 *  • Persistence: per-milestone URL map + the "currently-shown" stage
 *    in localStorage, with cross-tab change events.
 */

import { api } from "@/lib/api"
import { readPlan } from "@/lib/scholify-data"
import { useAuth } from "@/lib/auth"

/* ── Stages ──────────────────────────────────────────────────────────── */

export type StageKey =
  | "seedling"
  | "sapling"
  | "young_tree"
  | "growing"
  | "blooming"
  | "mature"
  | "ancient"
  | "legendary"
  | "mythic"

export interface TreeStage {
  milestone: number
  key: StageKey
  name: string
  description: string
  /** Primary hue for the iridescent ring + UI accents. */
  hue: { ring: string; glow: string }
}

export const MILESTONES: number[] = [1, 7, 14, 21, 30, 45, 60, 90, 180]

export const STAGES: TreeStage[] = [
  {
    milestone: 1,
    key: "seedling",
    name: "Seedling",
    description: "Every journey begins with a single decision to grow.",
    hue: { ring: "#34D399", glow: "rgba(52,211,153,0.35)" },
  },
  {
    milestone: 7,
    key: "sapling",
    name: "Sapling",
    description: "Your roots are taking hold. The habit is forming.",
    hue: { ring: "#34D399", glow: "rgba(52,211,153,0.4)" },
  },
  {
    milestone: 14,
    key: "young_tree",
    name: "Young Tree",
    description: "You're past the hardest part — most people give up before here.",
    hue: { ring: "#A78BFA", glow: "rgba(167,139,250,0.4)" },
  },
  {
    milestone: 21,
    key: "growing",
    name: "Growing Tree",
    description: "Buds are forming. The work is starting to pay back.",
    hue: { ring: "#F472B6", glow: "rgba(244,114,182,0.4)" },
  },
  {
    milestone: 30,
    key: "blooming",
    name: "Blooming Tree",
    description: "Look at what you've built. This is what consistency looks like.",
    hue: { ring: "#FCD34D", glow: "rgba(252,211,77,0.45)" },
  },
  {
    milestone: 45,
    key: "mature",
    name: "Mature Tree",
    description: "Strength, depth, and presence. You move differently now.",
    hue: { ring: "#FB923C", glow: "rgba(251,146,60,0.45)" },
  },
  {
    milestone: 60,
    key: "ancient",
    name: "Ancient Tree",
    description: "Roots that go deep. A canopy that protects.",
    hue: { ring: "#22D3EE", glow: "rgba(34,211,238,0.45)" },
  },
  {
    milestone: 90,
    key: "legendary",
    name: "Legendary Tree",
    description: "You have built something rare. Very few people ever reach this.",
    hue: { ring: "#A78BFA", glow: "rgba(167,139,250,0.5)" },
  },
  {
    milestone: 180,
    key: "mythic",
    name: "Mythic World Tree",
    description: "This tree represents months of showing up. That is extraordinary.",
    hue: { ring: "var(--sch-text)", glow: "var(--sch-tx-2)" },
  },
]

export function stageForStreak(streak: number): TreeStage {
  let chosen = STAGES[0]
  for (const s of STAGES) {
    if (streak >= s.milestone) chosen = s
    else break
  }
  return chosen
}

export function nextMilestoneFor(streak: number): TreeStage | null {
  const stage = stageForStreak(streak)
  const next = STAGES.find((s) => s.milestone > stage.milestone)
  return next ?? null
}

export function lastMilestoneFor(streak: number): number {
  const stage = stageForStreak(streak)
  return stage.milestone
}

export function progressToNext(streak: number): number {
  const last = lastMilestoneFor(streak)
  const next = nextMilestoneFor(streak)
  if (!next) return 100
  const span = next.milestone - last
  if (span <= 0) return 100
  return Math.min(100, Math.max(0, Math.round(((streak - last) / span) * 100)))
}

/* ── SVG trees per stage (always available, no network) ──────────────── */

/**
 * Inline SVG markup per stage. Used as the default tree art and as the
 * fallback whenever Fal-generated art isn't available. Each SVG is
 * self-contained and uses gentle gradients so the iridescent feel
 * carries through.
 */
export function svgForStage(stage: StageKey): string {
  switch (stage) {
    case "seedling":
      return wrap(`
        <defs>${defs("#0B1F1A", "#0A0F14")}</defs>
        ${earth()}
        <path d="M150 230 Q150 175 150 145" stroke="#34D399" stroke-width="4" stroke-linecap="round" fill="none"/>
        <ellipse cx="138" cy="148" rx="14" ry="9" fill="url(#leafGrad)" transform="rotate(-25 138 148)"/>
        <ellipse cx="162" cy="142" rx="14" ry="9" fill="url(#leafGrad)" transform="rotate(25 162 142)"/>
        <circle cx="150" cy="135" r="3" fill="#A7F3D0"/>
      `)
    case "sapling":
      return wrap(`
        <defs>${defs("#13261F", "#0A0F14")}</defs>
        ${earth()}
        <path d="M148 230 Q150 170 152 110" stroke="#3F8A6E" stroke-width="6" stroke-linecap="round" fill="none"/>
        ${leafCluster(150, 110, 36, 1)}
        ${rootCluster(148, 230, 0.8)}
      `)
    case "young_tree":
      return wrap(`
        <defs>${defs("#1A2C24", "#0A0F14")}</defs>
        ${earth()}
        <path d="M145 230 Q150 170 150 95" stroke="#5C3A22" stroke-width="9" stroke-linecap="round" fill="none"/>
        <path d="M150 130 Q120 110 110 90" stroke="#5C3A22" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M150 130 Q180 110 190 90" stroke="#5C3A22" stroke-width="5" fill="none" stroke-linecap="round"/>
        ${leafCluster(150, 90, 60, 1.2)}
        ${rootCluster(145, 232, 1.2)}
      `)
    case "growing":
      return wrap(`
        <defs>${defs("#1B2E26", "#0A0F14")}</defs>
        ${earth()}
        <path d="M145 232 Q150 165 150 90" stroke="#5C3A22" stroke-width="11" stroke-linecap="round" fill="none"/>
        ${branchSet(150, 130)}
        ${leafCluster(150, 80, 78, 1.4)}
        ${buds(150, 80, 78)}
        ${rootCluster(145, 232, 1.35)}
      `)
    case "blooming":
      return wrap(`
        <defs>${defs("#241927", "#0A0F14")}<radialGradient id="bloom" cx="50%" cy="50%" r="65%"><stop offset="0%" stop-color="#FBCFE8"/><stop offset="100%" stop-color="#22C55E"/></radialGradient></defs>
        ${earth()}
        <path d="M145 232 Q150 165 150 82" stroke="#5C3A22" stroke-width="13" stroke-linecap="round" fill="none"/>
        ${branchSet(150, 130, 1.1)}
        <circle cx="150" cy="80" r="78" fill="url(#bloom)" opacity="0.95"/>
        ${flowers(150, 80, 78)}
        ${rootCluster(145, 232, 1.4)}
      `)
    case "mature":
      return wrap(`
        <defs>${defs("#1F2A1F", "#0A0F14")}<radialGradient id="canopy" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#15803D"/></radialGradient></defs>
        ${earth()}
        <path d="M138 232 Q150 165 150 82" stroke="#3F2A18" stroke-width="16" stroke-linecap="round" fill="none"/>
        <path d="M150 130 Q105 105 90 80" stroke="#3F2A18" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M150 130 Q195 105 210 80" stroke="#3F2A18" stroke-width="7" fill="none" stroke-linecap="round"/>
        <ellipse cx="150" cy="78" rx="92" ry="58" fill="url(#canopy)"/>
        ${fruits(150, 78, 90, 4, "#F97316")}
        ${rootCluster(140, 232, 1.6)}
      `)
    case "ancient":
      return wrap(`
        <defs>${defs("#1A2B22", "#0A0F14")}<radialGradient id="oakCanopy" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#065F46"/></radialGradient></defs>
        ${earth()}
        <path d="M125 232 Q140 175 150 95" stroke="#3F2A18" stroke-width="22" stroke-linecap="round" fill="none"/>
        <path d="M150 150 Q90 115 70 90" stroke="#3F2A18" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M150 150 Q210 115 230 90" stroke="#3F2A18" stroke-width="10" fill="none" stroke-linecap="round"/>
        <ellipse cx="150" cy="80" rx="115" ry="68" fill="url(#oakCanopy)"/>
        ${fruits(150, 80, 110, 7, "#FCD34D")}
        ${rootCluster(125, 232, 2)}
      `)
    case "legendary":
      return wrap(`
        <defs>${defs("#15162B", "#06070D")}<radialGradient id="legCanopy" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="80%" stop-color="#22C55E"/><stop offset="100%" stop-color="#0F4C2D"/></radialGradient></defs>
        ${earth("#1F1733")}
        ${fireflies()}
        <path d="M115 232 Q140 175 150 90" stroke="#3F2A18" stroke-width="26" stroke-linecap="round" fill="none"/>
        <path d="M150 150 Q80 110 60 80" stroke="#3F2A18" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M150 150 Q220 110 240 80" stroke="#3F2A18" stroke-width="12" fill="none" stroke-linecap="round"/>
        <ellipse cx="150" cy="80" rx="130" ry="72" fill="url(#legCanopy)"/>
        ${fruits(150, 80, 120, 10, "#FACC15")}
        ${rootCluster(115, 232, 2.5)}
      `)
    case "mythic":
      return wrap(`
        <defs>${defs("#0F0A1F", "#040208")}<radialGradient id="mythCanopy" cx="50%" cy="50%" r="55%"><stop offset="0%" stop-color="var(--sch-text)"/><stop offset="40%" stop-color="#A78BFA"/><stop offset="100%" stop-color="#1E1B4B"/></radialGradient></defs>
        ${earth("#0E0A20")}
        ${stars()}
        ${fireflies()}
        <path d="M105 232 Q140 175 150 88" stroke="#1F1733" stroke-width="32" stroke-linecap="round" fill="none"/>
        <path d="M150 150 Q70 105 50 75" stroke="#1F1733" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M150 150 Q230 105 250 75" stroke="#1F1733" stroke-width="14" fill="none" stroke-linecap="round"/>
        <ellipse cx="150" cy="80" rx="140" ry="80" fill="url(#mythCanopy)"/>
        ${fruits(150, 80, 130, 14, "#FBBF24")}
        ${rootCluster(105, 232, 3)}
      `)
  }
}

function wrap(inner: string): string {
  return `<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${inner}</svg>`
}

function defs(skyTop: string, skyBottom: string): string {
  return `
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${skyTop}"/>
      <stop offset="100%" stop-color="${skyBottom}"/>
    </linearGradient>
    <linearGradient id="leafGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#A7F3D0"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
  `
}

function earth(soil = "#1B1410"): string {
  return `
    <rect x="0" y="0" width="300" height="250" fill="url(#sky)"/>
    <ellipse cx="150" cy="232" rx="100" ry="14" fill="${soil}" opacity="0.9"/>
  `
}

function leafCluster(cx: number, cy: number, size: number, scale = 1): string {
  const r = (size / 2) * scale
  const small = r * 0.55
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#leafGrad)" opacity="0.95"/>
    <circle cx="${cx - r * 0.55}" cy="${cy + r * 0.05}" r="${small}" fill="url(#leafGrad)" opacity="0.9"/>
    <circle cx="${cx + r * 0.55}" cy="${cy + r * 0.05}" r="${small}" fill="url(#leafGrad)" opacity="0.9"/>
    <circle cx="${cx}" cy="${cy - r * 0.55}" r="${small}" fill="url(#leafGrad)" opacity="0.9"/>
  `
}

function branchSet(cx: number, y: number, scale = 1): string {
  const s = scale
  return `
    <path d="M${cx} ${y} Q${cx - 35 * s} ${y - 10} ${cx - 55 * s} ${y - 30}" stroke="#5C3A22" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>
    <path d="M${cx} ${y} Q${cx + 35 * s} ${y - 10} ${cx + 55 * s} ${y - 30}" stroke="#5C3A22" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>
  `
}

function buds(cx: number, cy: number, r: number): string {
  const positions: Array<[number, number]> = [
    [cx - r * 0.45, cy - r * 0.1],
    [cx + r * 0.45, cy - r * 0.1],
    [cx, cy - r * 0.6],
    [cx + r * 0.2, cy + r * 0.4],
  ]
  return positions.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#FBCFE8"/>`).join("")
}

function flowers(cx: number, cy: number, r: number): string {
  const positions: Array<[number, number]> = [
    [cx - r * 0.5, cy - r * 0.15],
    [cx + r * 0.45, cy - r * 0.2],
    [cx + r * 0.05, cy - r * 0.55],
    [cx + r * 0.25, cy + r * 0.4],
    [cx - r * 0.3, cy + r * 0.35],
  ]
  return positions
    .map(([x, y]) => `
      <circle cx="${x}" cy="${y}" r="6" fill="#FCE7F3"/>
      <circle cx="${x}" cy="${y}" r="2.5" fill="#F472B6"/>
    `)
    .join("")
}

function fruits(cx: number, cy: number, r: number, count: number, color: string): string {
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    const ang = (i / count) * Math.PI * 2
    const rr = r * 0.65
    const x = cx + Math.cos(ang) * rr
    const y = cy + Math.sin(ang) * rr * 0.6
    out.push(`<circle cx="${x}" cy="${y}" r="5" fill="${color}" opacity="0.9"/>`)
  }
  return out.join("")
}

function rootCluster(cx: number, cy: number, scale = 1): string {
  const s = scale
  return `
    <path d="M${cx} ${cy} Q${cx - 28 * s} ${cy + 4} ${cx - 50 * s} ${cy + 14}" stroke="#3F2A18" stroke-width="${4 * s}" fill="none" stroke-linecap="round" opacity="0.85"/>
    <path d="M${cx} ${cy} Q${cx + 28 * s} ${cy + 4} ${cx + 50 * s} ${cy + 14}" stroke="#3F2A18" stroke-width="${4 * s}" fill="none" stroke-linecap="round" opacity="0.85"/>
    <path d="M${cx} ${cy} Q${cx} ${cy + 8} ${cx + 6 * s} ${cy + 18}" stroke="#3F2A18" stroke-width="${3 * s}" fill="none" stroke-linecap="round" opacity="0.7"/>
  `
}

function fireflies(): string {
  const out: string[] = []
  const positions: Array<[number, number]> = [
    [60, 60],
    [240, 50],
    [220, 130],
    [80, 140],
    [180, 30],
  ]
  for (const [x, y] of positions) {
    out.push(`<circle cx="${x}" cy="${y}" r="2.5" fill="#FDE68A"/><circle cx="${x}" cy="${y}" r="6" fill="#FDE68A" opacity="0.18"/>`)
  }
  return out.join("")
}

function stars(): string {
  const out: string[] = []
  const positions: Array<[number, number, number]> = [
    [40, 30, 0.7],
    [90, 18, 0.5],
    [200, 25, 0.8],
    [260, 40, 0.5],
    [275, 90, 0.6],
    [20, 120, 0.55],
    [285, 150, 0.5],
  ]
  for (const [x, y, op] of positions) {
    out.push(`<circle cx="${x}" cy="${y}" r="1.2" fill="var(--sch-text)" opacity="${op}"/>`)
  }
  return out.join("")
}

/** Helper for components that want a data URL they can plug into <img>. */
export function svgDataUrl(stage: StageKey): string {
  const svg = svgForStage(stage)
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

/* ── Local persistence ───────────────────────────────────────────────── */

const KEY_TREES = "scholify-trees"
const KEY_LAST_SEEN_MILESTONE = "scholify-trees-last-seen-milestone"

/** url=null means "we hit the milestone but we're showing the SVG fallback". */
export interface TreeEntry {
  milestone: number
  stage: StageKey
  url: string | null
  generatedAt: string
}

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
    window.dispatchEvent(new CustomEvent("scholify-tree-change", { detail: key }))
  } catch {
    /* ignore */
  }
}

export function readTrees(): TreeEntry[] {
  return readJSON<TreeEntry[]>(KEY_TREES, [])
}

function writeTrees(list: TreeEntry[]): void {
  writeJSON(KEY_TREES, list)
}

export function recordTree(entry: TreeEntry): void {
  const all = readTrees().filter((t) => t.milestone !== entry.milestone)
  all.push(entry)
  all.sort((a, b) => a.milestone - b.milestone)
  writeTrees(all)
}

export function treeForMilestone(milestone: number): TreeEntry | null {
  return readTrees().find((t) => t.milestone === milestone) ?? null
}

export function readLastSeenMilestone(): number {
  return Number(readJSON<number>(KEY_LAST_SEEN_MILESTONE, 0)) || 0
}

export function setLastSeenMilestone(m: number): void {
  writeJSON(KEY_LAST_SEEN_MILESTONE, m)
}

/* ── Trigger + generation ────────────────────────────────────────────── */

/** Returns the milestone that the current streak just reached, or null. */
export function milestoneHit(prevStreak: number, newStreak: number): number | null {
  for (const m of MILESTONES) {
    if (newStreak >= m && prevStreak < m) return m
  }
  return null
}

/**
 * Fire-and-forget tree generation. Resolves to the resulting TreeEntry
 * either way — the SVG fallback is always considered a success.
 */
export async function ensureTreeForMilestone(opts: {
  milestone: number
  userName: string
  goal: string
}): Promise<TreeEntry> {
  const existing = treeForMilestone(opts.milestone)
  if (existing && existing.url) return existing

  const stageDef = STAGES.find((s) => s.milestone === opts.milestone) ?? STAGES[0]
  const entry: TreeEntry = {
    milestone: opts.milestone,
    stage: stageDef.key,
    url: existing?.url ?? null,
    generatedAt: existing?.generatedAt ?? new Date().toISOString(),
  }

  // Try the AI endpoint; fall back to SVG silently.
  try {
    const result = await api.generateTree({
      milestone: opts.milestone,
      stage: stageDef.key,
      userName: opts.userName,
      goal: opts.goal,
    })
    if (result.url && typeof result.url === "string") entry.url = result.url
  } catch {
    /* network down — keep entry.url = null, components use SVG */
  }

  recordTree(entry)
  return entry
}

/* ── React subscribe helper ──────────────────────────────────────────── */

export function subscribeTrees(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const fn = () => handler()
  window.addEventListener("scholify-tree-change", fn)
  window.addEventListener("storage", fn)
  return () => {
    window.removeEventListener("scholify-tree-change", fn)
    window.removeEventListener("storage", fn)
  }
}

/* ── Convenience ─────────────────────────────────────────────────────── */

export function currentTreeImageUrl(streak: number): { url: string; remote: boolean; stage: TreeStage } {
  const stage = stageForStreak(streak)
  const entry = treeForMilestone(stage.milestone)
  if (entry?.url) return { url: entry.url, remote: true, stage }
  return { url: svgDataUrl(stage.key), remote: false, stage }
}

export function useDisplayName(): string {
  const { user } = useAuth()
  const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
  const first = (meta.first_name || "").trim()
  const last = (meta.last_name || "").trim()
  if (first) return last ? `${first} ${last[0]}.` : first
  return user?.email?.split("@")[0] || "Learner"
}

export function useGoalForTree(): string {
  const plan = readPlan()
  return (plan.goal || "your goal").trim()
}
