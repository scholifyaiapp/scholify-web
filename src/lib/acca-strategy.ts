/*
 * Scholify — the STRATEGIC plan: which paper to sit next, and why.
 *
 * ── The three altitudes ───────────────────────────────────────────
 * A study plan that only answers "what do I do today" is a to-do list. Every
 * serious coaching structure runs three altitudes, and the Plan tab now shows all
 * three because a learner needs all three to feel in control:
 *
 *   STRATEGIC    (this module)          — the route through the qualification:
 *                                         which papers, in which order, and the
 *                                         knowledge reason for the order.
 *   TACTICAL     (acca-plan's phases)   — inside one paper: Learn → Strengthen →
 *                                         Revise → Rehearse, with real dates.
 *   OPERATIONAL  (acca-topic-plan)      — the next 7 days, exact tasks.
 *
 * ── Why the order is not just "the syllabus order" ────────────────
 * ACCA lets you sit Applied Skills papers in any order, which is exactly why
 * students choose badly: they pick by reputation ("FM is hard, leave it") rather
 * than by KNOWLEDGE FLOW, and then meet FR having forgotten FA, or APM having
 * never sat PM. Each paper below carries its real prerequisites, so a
 * recommendation can be justified in one sentence the learner can check.
 *
 * The canonical chains:
 *   FA → FR → SBR            financial reporting
 *   MA → PM → APM            management accounting / performance
 *   MA/FM → FM → AFM         financial management
 *   TX → ATX                 taxation
 *   FA/AA → AA → AAA         audit
 *   BT/LW → SBL              leadership, governance, law
 *
 * Deterministic and offline, like the rest of the plan engine.
 */

import { ALL_PAPERS, getPassedPapers, getPaperFromCatalog } from "@/lib/acca-qualification"
import type { AccaPaper } from "@/lib/acca-content"

/** Papers whose material a paper leans on directly. */
const PREREQ: Record<string, string[]> = {
  BT: [],
  MA: [],
  FA: [],
  LW: [],
  PM: ["MA"],
  TX: ["FA"],
  FR: ["FA"],
  AA: ["FA"],
  FM: ["MA", "FA"],
  SBL: ["BT", "LW"],
  SBR: ["FR"],
  AFM: ["FM"],
  APM: ["PM"],
  ATX: ["TX"],
  AAA: ["AA"],
}

/** The direct successors of a paper — the inverse of PREREQ, precomputed. */
const SUCCESSORS: Record<string, string[]> = (() => {
  const out: Record<string, string[]> = {}
  for (const [paper, prereqs] of Object.entries(PREREQ)) {
    for (const p of prereqs) (out[p] ??= []).push(paper)
  }
  return out
})()

/** One sentence per edge — why B follows A. Keyed `${from}->${to}`. */
const EDGE_REASON: Record<string, string> = {
  "MA->PM": "PM is MA at the next level: the same costing and variance machinery, now used for decisions and control. Sitting it while MA is warm is the single biggest time saving on the Skills level.",
  "MA->FM": "FM's investment appraisal and working-capital work builds straight on MA's costing and relevant-cost thinking. Fresh MA makes FM's discounting feel like arithmetic instead of a new subject.",
  "FA->FR": "FR is FA plus standards and groups. Every double entry, accrual and adjustment in FR assumes FA is automatic — the gap between a recent FA and a two-year-old FA is worth weeks.",
  "FA->TX": "TX needs confident accounts: adjusting a trading profit for tax purposes starts from a set of financial statements you can read without effort.",
  "FA->AA": "AA audits financial statements. You cannot test an assertion about a balance you are not fluent in, which is why AA sits best while FA is recent.",
  "FA->FM": "FM reads and reworks financial statements constantly — ratios, gearing, valuations. FA is the fluency it assumes.",
  "PM->APM": "APM is PM at strategic altitude: the same performance measurement, applied to whole organisations and their systems.",
  "FM->AFM": "AFM extends FM's appraisal, financing and risk work into mergers, reconstruction and treasury. The Options paper is a continuation, not a new subject.",
  "TX->ATX": "ATX is TX plus planning and interaction between taxes. Its whole difficulty is assumed TX fluency — sit it close behind.",
  "AA->AAA": "AAA is AA with judgement and reporting at partner level. Sitting it far from AA means relearning the standards first.",
  "FR->SBR": "SBR appraises what FR applies. It assumes group accounting is already comfortable — SBR is where a shaky FR gets expensive.",
  "BT->SBL": "SBL's governance, leadership and stakeholder material is BT's, deepened into an integrated case. BT is where the vocabulary comes from.",
  "LW->SBL": "SBL's governance and regulation questions lean on LW's company-law framework.",
}

/** Companion pairings that sit well in the SAME session (shared study habits). */
const COMPANION: Record<string, { id: string; why: string }[]> = {
  BT: [{ id: "MA", why: "BT and MA are both objective-test papers with no written section — pairing them in one sitting doubles the output of one exam technique." }],
  MA: [{ id: "FA", why: "MA and FA are the two numerical Knowledge papers and they overlap on cost and accounting basics. Sitting them together finishes Applied Knowledge in one go." }],
  FA: [{ id: "MA", why: "FA and MA share the arithmetic and both are objective-test only, so one exam technique covers both." }],
  LW: [{ id: "TX", why: "LW and TX are both rules-heavy memory papers — the same revision method (rules + application drills) works for both." }],
  PM: [{ id: "FM", why: "PM and FM share the quantitative core and both reward heavy question practice over reading." }],
  FR: [{ id: "AA", why: "FR and AA are the classic pairing: AA audits exactly what FR prepares, so the study reinforces itself." }],
  AA: [{ id: "FR", why: "AA and FR cover the same financial statements from two sides — preparation and assurance." }],
  FM: [{ id: "PM", why: "FM and PM share the decision-making toolkit; the overlap is real study time saved." }],
  SBL: [{ id: "SBR", why: "SBL and SBR are the two Essentials — sitting them together is the standard route and keeps the Options level as the final push." }],
  SBR: [{ id: "SBL", why: "The two Essentials are usually taken together; SBL's professional-skills marks transfer directly into SBR's technique." }],
}

export type StepKind = "successor" | "companion" | "level-up" | "essential" | "option"

export interface StrategicStep {
  paper: AccaPaper
  kind: StepKind
  /** 1-based position in the recommended route. */
  position: number
  /** Charles's reason, in one checkable sentence. */
  why: string
  /** Prerequisites the learner has NOT passed — the honest caveat. */
  missing: string[]
  /** Recommended sitting: "next session" | "the session after" | "later this year". */
  when: string
}

const LEVEL_RANK: Record<AccaPaper["level"], number> = {
  "Applied Knowledge": 0,
  "Applied Skills": 1,
  "Strategic Professional": 2,
}

/**
 * The strategic route from the paper the learner is on now: the next three papers
 * to sit, in order, each with the knowledge reason.
 *
 * Precedence:
 *   1. DIRECT SUCCESSORS of the current paper whose other prerequisites are met —
 *      the knowledge is warm right now and that is a perishable asset.
 *   2. COMPANIONS — a paper that shares technique or content and can be sat
 *      alongside, which is how students who finish fast actually do it.
 *   3. LEVEL PROGRESSION — whatever is left at the earliest incomplete level,
 *      preferring papers whose prerequisites are already passed.
 */
export function strategicRoute(currentPaperId: string, count = 3): StrategicStep[] {
  const passed = new Set(getPassedPapers())
  // The paper being studied counts as "about to be passed" for routing purposes:
  // the recommendation is about what comes AFTER it.
  passed.add(currentPaperId)

  const eligible = (id: string): boolean => !passed.has(id) && Boolean(getPaperFromCatalog(id))
  const missingFor = (id: string): string[] => (PREREQ[id] ?? []).filter((p) => !passed.has(p))

  const picked: StrategicStep[] = []
  const take = (id: string, kind: StepKind, why: string): void => {
    if (picked.length >= count) return
    if (!eligible(id) || picked.some((s) => s.paper.id === id)) return
    const paper = getPaperFromCatalog(id)
    if (!paper) return
    const position = picked.length + 1
    const missing = missingFor(id)
    /*
     * A reason has to be self-contained. BT → SBL is a real knowledge edge, but SBL
     * also assumes LW — and a learner reading only the edge sentence would take it
     * as an unqualified "sit this next". The caveat is appended here rather than
     * left to the UI because this string is also read outside the Plan tab (Charles's
     * copy, emails), where there is no separate "missing" field to render.
     */
    const caveat =
      missing.length > 0 && !/needs|first/i.test(why)
        ? ` It also assumes ${missing.join(" and ")}, so put ${missing.length > 1 ? "those" : "that"} in the plan first.`
        : ""
    picked.push({
      paper,
      kind,
      position,
      why: `${why}${caveat}`,
      missing,
      when: position === 1 ? "next session" : position === 2 ? "the session after" : "the sitting after that",
    })
  }

  // 1 · Direct successors — knowledge is warm.
  for (const id of SUCCESSORS[currentPaperId] ?? []) {
    take(id, "successor", EDGE_REASON[`${currentPaperId}->${id}`] ?? `${id} builds directly on ${currentPaperId} — sit it while the material is still warm.`)
  }

  // 2 · Companions — shared technique.
  for (const c of COMPANION[currentPaperId] ?? []) take(c.id, "companion", c.why)

  // 3 · Level progression — the earliest incomplete level, prerequisites-first.
  if (picked.length < count) {
    const remaining = ALL_PAPERS.filter((p) => eligible(p.id) && !picked.some((s) => s.paper.id === p.id))
      .sort((a, b) => {
        const lvl = LEVEL_RANK[a.level] - LEVEL_RANK[b.level]
        if (lvl !== 0) return lvl
        // Prerequisites met first, then fewer missing prerequisites.
        return missingFor(a.id).length - missingFor(b.id).length
      })
    for (const p of remaining) {
      const missing = missingFor(p.id)
      const kind: StepKind = p.isOption ? "option" : p.level === "Strategic Professional" ? "essential" : "level-up"
      const why = missing.length
        ? `${p.id} needs ${missing.join(" and ")} behind it first — put those in the plan before this one.`
        : p.isOption
          ? `${p.name} is one of the two Options you choose. Its prerequisites are done, so the material is warm.`
          : `${p.name} is the next paper at ${p.level} with every prerequisite already passed — nothing is blocking it.`
      take(p.id, kind, why)
    }
  }

  return picked
}

/* ── The whole route, for the Plan tab's strategic view ───────────*/

export interface RouteStage {
  key: string
  label: string
  note?: string
  papers: { paper: AccaPaper; state: "passed" | "current" | "next" | "later"; blockedBy: string[] }[]
}

/** Every paper, grouped by level, with its state relative to today. */
export function qualificationRoute(currentPaperId: string | null): RouteStage[] {
  const passed = new Set(getPassedPapers())
  const nextIds = new Set(currentPaperId ? strategicRoute(currentPaperId).map((s) => s.paper.id) : [])
  const groups: { key: string; label: string; note?: string; ids: string[] }[] = [
    { key: "AK", label: "Applied Knowledge", ids: ["BT", "MA", "FA"] },
    { key: "AS", label: "Applied Skills", ids: ["LW", "PM", "TX", "FR", "AA", "FM"] },
    { key: "SPE", label: "Strategic Professional · Essentials", note: "Both required", ids: ["SBL", "SBR"] },
    { key: "SPO", label: "Strategic Professional · Options", note: "Choose 2 of 4", ids: ["AFM", "APM", "ATX", "AAA"] },
  ]
  return groups.map((g) => ({
    key: g.key,
    label: g.label,
    note: g.note,
    papers: g.ids
      .map((id) => getPaperFromCatalog(id))
      .filter((p): p is AccaPaper => Boolean(p))
      .map((paper) => ({
        paper,
        state: passed.has(paper.id)
          ? ("passed" as const)
          : paper.id === currentPaperId
            ? ("current" as const)
            : nextIds.has(paper.id)
              ? ("next" as const)
              : ("later" as const),
        blockedBy: (PREREQ[paper.id] ?? []).filter((p) => !passed.has(p) && p !== currentPaperId),
      })),
  }))
}

/** Papers this one unlocks — used to explain why today's work matters later. */
export function unlockedBy(paperId: string): AccaPaper[] {
  return (SUCCESSORS[paperId] ?? [])
    .map((id) => getPaperFromCatalog(id))
    .filter((p): p is AccaPaper => Boolean(p))
}

/** What a paper leans on, for the "before you start" check. */
export function prerequisitesOf(paperId: string): AccaPaper[] {
  return (PREREQ[paperId] ?? [])
    .map((id) => getPaperFromCatalog(id))
    .filter((p): p is AccaPaper => Boolean(p))
}
