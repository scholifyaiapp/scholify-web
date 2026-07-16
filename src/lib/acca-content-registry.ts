import type { AccaQuestion, OtCase } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"
import type { TopicBrief } from "@/lib/acca-briefs"
import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * Scholify — the per-paper CONTENT REGISTRY.
 *
 * ── Why this exists ────────────────────────────────────────────
 * A student studies ONE ACCA paper. Before this, they downloaded all fifteen:
 * every content barrel (questions, study chapters, flashcards, written, briefs)
 * statically imported all ~36 question waves + all 75 study chapters, and every
 * page imports acca.ts, which imported the questions barrel. Measured: a 2,584 kB
 * /study chunk on top of a 2,001 kB shared content chunk — ~93% of it content for
 * papers the student will never open. On a mid-range Android over 4G that is a
 * ~10-second wait to answer the first question.
 *
 * ── The design ─────────────────────────────────────────────────
 * The content getters are SYNCHRONOUS and called from React render paths all over
 * the app (getQuestions, getFlashcards, chaptersForPaper, buildSession, …). Making
 * them async would mean rewriting every call site. So instead:
 *
 *   1. This module holds a mutable registry: paperId → that paper's content.
 *      It has no content imports of its own — it is tiny and always eager.
 *   2. acca-paper-content.ts dynamically `import()`s ONE paper's content files and
 *      calls registerPaperContent() to fill a slot. Nothing else imports content.
 *   3. The existing sync getters read the registry and keep working UNCHANGED —
 *      they simply return that paper's slice instead of filtering a global barrel.
 *   4. Pages await the ACTIVE paper's content once (usePaperContent) before they
 *      render a study surface. An unloaded paper reads as EMPTY, never as a crash.
 *
 * Paper METADATA (PAPERS / ALL_PAPERS: names, levels, syllabus areas) stays eager
 * and synchronous — the picker, onboarding, pricing and routing all need it before
 * a paper is chosen. Only the heavy per-paper CONTENT is dynamic.
 *
 * Anything that must be correct for a paper whose content is NOT loaded (the paper
 * picker's readiness %, the "BANK" badge) reads paper metadata or the static counts
 * in acca-content-counts.ts, never the registry.
 */

export interface PaperContent {
  /** Objective-test questions, in original bank order. */
  questions: AccaQuestion[]
  /** Rich study chapters, in syllabus-area order. */
  chapters: StudyChapter[]
  flashcards: Flashcard[]
  written: WrittenQuestion[]
  briefs: TopicBrief[]
  /** Section-B OT cases: authored scenario blocks with linked questions. */
  cases: OtCase[]
}

const EMPTY: PaperContent = Object.freeze({
  questions: [],
  chapters: [],
  flashcards: [],
  written: [],
  briefs: [],
  cases: [],
}) as PaperContent

const REGISTRY: Record<string, PaperContent> = {}

/** Called by the loader once a paper's content modules have arrived. */
export function registerPaperContent(paperId: string, content: PaperContent): void {
  REGISTRY[paperId] = content
}

/**
 * One paper's content, synchronously. Returns the EMPTY bundle when the paper
 * has not been loaded yet — every getter above this degrades to "nothing yet"
 * rather than throwing, so a render that races the loader can never crash.
 */
export function paperContent(paperId: string): PaperContent {
  return REGISTRY[paperId] ?? EMPTY
}

/** True once loadPaperContent(paperId) has resolved. */
export function isPaperContentLoaded(paperId: string): boolean {
  return paperId in REGISTRY
}

/** Every paper whose content is currently in memory. */
export function loadedPaperIds(): string[] {
  return Object.keys(REGISTRY)
}

/*
 * This module must stay SYNCHRONOUS and dependency-free. The Node/test bootstrap
 * that pre-fills the registry lives in acca-content-boot.ts precisely because the
 * loader depends on this module: a top-level await here would make the registry an
 * async module that the loader waits on while the loader waits on it — an ESM
 * deadlock (which is exactly what the first cut of this did).
 */
