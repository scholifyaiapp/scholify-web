import { registerPaperContent, isPaperContentLoaded, type PaperContent } from "@/lib/acca-content-registry"
import type { AccaQuestion, OtCase } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"
import type { TopicBrief } from "@/lib/acca-briefs"
import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * Scholify — the per-paper CONTENT LOADER. Read acca-content-registry.ts first:
 * it explains why the content is dynamic and how the sync getters keep working.
 *
 * This is the ONLY module in the app allowed to import an ACCA content file, and
 * it does so exclusively through dynamic `import()`. Every static import of a
 * content wave, study chapter, flashcard set, written set or brief set was removed
 * from the barrels for exactly this reason: one static import anywhere pulls all
 * fifteen papers back into the shared chunk.
 *
 * Each entry below lists ONLY the modules that hold that paper's content (the
 * `*-core` modules are the pre-wave seed banks; a handful of wave files carry two
 * or three sibling papers, e.g. flashcards wave2 = FA/FR/PM/TX). Everything is
 * filtered by `paper` on the way in, so a paper can never see another's questions.
 *
 * The import specifiers must stay STATIC STRING LITERALS — that is what lets Vite
 * pre-compute one chunk per paper. Never build them from a template string.
 */

type ContentModule = Record<string, unknown>
type Loader = () => Promise<ContentModule>

/** Every item in every content module carries the paper it belongs to. */
interface Owned {
  paper: string
}

/**
 * Pull one paper's items out of a set of loaded modules, preserving module order
 * (and, within a module, declaration order) so a paper's bank reads exactly as it
 * did when it was one big filtered barrel. Modules export either an array of items
 * (questions, cards, briefs) or a single object (a study chapter) — both are handled.
 */
function collect<T extends Owned>(mods: ContentModule[], paperId: string): T[] {
  const out: T[] = []
  const take = (v: unknown) => {
    if (v && typeof v === "object" && !Array.isArray(v) && (v as Owned).paper === paperId) out.push(v as T)
  }
  for (const mod of mods) {
    for (const value of Object.values(mod)) {
      if (Array.isArray(value)) value.forEach(take)
      else take(value)
    }
  }
  return out
}

/* ── Per-paper module maps ────────────────────────────────────── */

const QUESTION_MODULES: Record<string, Loader[]> = {
  FA: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-fa2"), () => import("@/lib/acca-content-fa3")],
  FR: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-fr2"), () => import("@/lib/acca-content-fr3"), () => import("@/lib/acca-content-fr4"), () => import("@/lib/acca-content-fr5")],
  MA: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-ma2"), () => import("@/lib/acca-content-ma3")],
  BT: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-bt2"), () => import("@/lib/acca-content-bt3")],
  LW: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-lw2"), () => import("@/lib/acca-content-lw3")],
  PM: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-pm2"), () => import("@/lib/acca-content-pm3"), () => import("@/lib/acca-content-pm4")],
  TX: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-tx2"), () => import("@/lib/acca-content-tx3"), () => import("@/lib/acca-content-tx4")],
  AA: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-aa2"), () => import("@/lib/acca-content-aa3"), () => import("@/lib/acca-content-aa4")],
  FM: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-fm2"), () => import("@/lib/acca-content-fm3"), () => import("@/lib/acca-content-fm4")],
  SBL: [() => import("@/lib/acca-content-sbl2"), () => import("@/lib/acca-content-sbl3")],
  SBR: [() => import("@/lib/acca-content-sbr2"), () => import("@/lib/acca-content-sbr3")],
  AFM: [() => import("@/lib/acca-content-afm2"), () => import("@/lib/acca-content-afm3")],
  APM: [() => import("@/lib/acca-content-apm2"), () => import("@/lib/acca-content-apm3")],
  ATX: [() => import("@/lib/acca-content-atx2"), () => import("@/lib/acca-content-atx3")],
  AAA: [() => import("@/lib/acca-content-aaa2"), () => import("@/lib/acca-content-aaa3")],
}

const CHAPTER_MODULES: Record<string, Loader[]> = {
  FA: [
    () => import("@/lib/acca-study-fa-a"), () => import("@/lib/acca-study-fa-b"), () => import("@/lib/acca-study-fa-c"),
    () => import("@/lib/acca-study-fa-d"), () => import("@/lib/acca-study-fa-e"), () => import("@/lib/acca-study-fa-f"),
    () => import("@/lib/acca-study-fa-g"), () => import("@/lib/acca-study-fa-h"),
  ],
  FR: [
    () => import("@/lib/acca-study-fr-a"), () => import("@/lib/acca-study-fr-b"), () => import("@/lib/acca-study-fr-c"),
    () => import("@/lib/acca-study-fr-d"), () => import("@/lib/acca-study-fr-e"),
  ],
  MA: [
    () => import("@/lib/acca-study-ma-a"), () => import("@/lib/acca-study-ma-b"), () => import("@/lib/acca-study-ma-c"),
    () => import("@/lib/acca-study-ma-d"), () => import("@/lib/acca-study-ma-e"),
  ],
  BT: [
    () => import("@/lib/acca-study-bt-a"), () => import("@/lib/acca-study-bt-b"), () => import("@/lib/acca-study-bt-c"),
    () => import("@/lib/acca-study-bt-d"),
  ],
  TX: [
    () => import("@/lib/acca-study-tx-a"), () => import("@/lib/acca-study-tx-b"), () => import("@/lib/acca-study-tx-c"),
    () => import("@/lib/acca-study-tx-d"), () => import("@/lib/acca-study-tx-e"),
  ],
  LW: [
    () => import("@/lib/acca-study-lw-a"), () => import("@/lib/acca-study-lw-b"), () => import("@/lib/acca-study-lw-c"),
    () => import("@/lib/acca-study-lw-d"),
  ],
  PM: [
    () => import("@/lib/acca-study-pm-a"), () => import("@/lib/acca-study-pm-b"), () => import("@/lib/acca-study-pm-c"),
    () => import("@/lib/acca-study-pm-d"),
  ],
  FM: [
    () => import("@/lib/acca-study-fm-a"), () => import("@/lib/acca-study-fm-b"), () => import("@/lib/acca-study-fm-c"),
    () => import("@/lib/acca-study-fm-d"), () => import("@/lib/acca-study-fm-e"),
  ],
  AA: [
    () => import("@/lib/acca-study-aa-a"), () => import("@/lib/acca-study-aa-b"), () => import("@/lib/acca-study-aa-c"),
    () => import("@/lib/acca-study-aa-d"), () => import("@/lib/acca-study-aa-e"),
  ],
  SBR: [
    () => import("@/lib/acca-study-sbr-a"), () => import("@/lib/acca-study-sbr-b"), () => import("@/lib/acca-study-sbr-c"),
    () => import("@/lib/acca-study-sbr-d"), () => import("@/lib/acca-study-sbr-e"),
  ],
  SBL: [
    () => import("@/lib/acca-study-sbl-a"), () => import("@/lib/acca-study-sbl-b"), () => import("@/lib/acca-study-sbl-c"),
    () => import("@/lib/acca-study-sbl-d"), () => import("@/lib/acca-study-sbl-e"),
  ],
  AFM: [
    () => import("@/lib/acca-study-afm-a"), () => import("@/lib/acca-study-afm-b"), () => import("@/lib/acca-study-afm-c"),
    () => import("@/lib/acca-study-afm-d"), () => import("@/lib/acca-study-afm-e"),
  ],
  APM: [
    () => import("@/lib/acca-study-apm-a"), () => import("@/lib/acca-study-apm-b"), () => import("@/lib/acca-study-apm-c"),
    () => import("@/lib/acca-study-apm-d"),
  ],
  ATX: [
    () => import("@/lib/acca-study-atx-a"), () => import("@/lib/acca-study-atx-b"), () => import("@/lib/acca-study-atx-c"),
    () => import("@/lib/acca-study-atx-d"), () => import("@/lib/acca-study-atx-e"),
  ],
  AAA: [
    () => import("@/lib/acca-study-aaa-a"), () => import("@/lib/acca-study-aaa-b"), () => import("@/lib/acca-study-aaa-c"),
    () => import("@/lib/acca-study-aaa-d"), () => import("@/lib/acca-study-aaa-e"),
  ],
}

const FLASHCARD_MODULES: Record<string, Loader[]> = {
  FA: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave2"), () => import("@/lib/acca-flashcards-wave5")],
  FR: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave2"), () => import("@/lib/acca-flashcards-wave5")],
  PM: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave2"), () => import("@/lib/acca-flashcards-wave5")],
  TX: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave2"), () => import("@/lib/acca-flashcards-wave5")],
  AA: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave3"), () => import("@/lib/acca-flashcards-wave5")],
  FM: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave3"), () => import("@/lib/acca-flashcards-wave5")],
  MA: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave3"), () => import("@/lib/acca-flashcards-wave5")],
  BT: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave4"), () => import("@/lib/acca-flashcards-wave5")],
  LW: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave4"), () => import("@/lib/acca-flashcards-wave5")],
  SBL: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-s1")],
  SBR: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-s1")],
  AFM: [() => import("@/lib/acca-flashcards-s2")],
  APM: [() => import("@/lib/acca-flashcards-s2")],
  ATX: [() => import("@/lib/acca-flashcards-s3")],
  AAA: [() => import("@/lib/acca-flashcards-s3")],
}

/*
 * BT, MA, FA and LW have NO written questions by design — their real exams are
 * 100% objective-test. An empty list here is the correct answer, not a gap.
 */
const WRITTEN_MODULES: Record<string, Loader[]> = {
  FR: [() => import("@/lib/acca-written-core"), () => import("@/lib/acca-written-wave2"), () => import("@/lib/acca-written-w3-fr")],
  AA: [() => import("@/lib/acca-written-wave2"), () => import("@/lib/acca-written-w3-aa")],
  PM: [() => import("@/lib/acca-written-w3-pm")],
  TX: [() => import("@/lib/acca-written-w3-tx")],
  FM: [() => import("@/lib/acca-written-w3-fm")],
  SBL: [() => import("@/lib/acca-written-core"), () => import("@/lib/acca-written-wave2"), () => import("@/lib/acca-written-s1")],
  SBR: [() => import("@/lib/acca-written-core"), () => import("@/lib/acca-written-wave2"), () => import("@/lib/acca-written-s1")],
  AFM: [() => import("@/lib/acca-written-s2")],
  APM: [() => import("@/lib/acca-written-s2")],
  ATX: [() => import("@/lib/acca-written-s3")],
  AAA: [() => import("@/lib/acca-written-s3")],
}

/*
 * Section-B OT cases — authored scenario blocks for the sectioned CBE mock.
 * Only papers with an authored set appear here; a paper without one composes
 * its mock's Section B from standalone OTs, honestly labelled (a case is
 * never faked by grouping loose questions).
 */
const CASE_MODULES: Record<string, Loader[]> = {
  FA: [() => import("@/lib/acca-cases-fa")],
  FR: [() => import("@/lib/acca-cases-fr")],
}

const BRIEF_MODULES: Record<string, Loader[]> = {
  FA: [() => import("@/lib/acca-briefs-core")],
  FR: [() => import("@/lib/acca-briefs-core")],
  PM: [() => import("@/lib/acca-briefs-skills")],
  TX: [() => import("@/lib/acca-briefs-skills")],
  AA: [() => import("@/lib/acca-briefs-aafm")],
  FM: [() => import("@/lib/acca-briefs-aafm")],
  BT: [() => import("@/lib/acca-briefs-knowledge")],
  MA: [() => import("@/lib/acca-briefs-knowledge")],
  LW: [() => import("@/lib/acca-briefs-knowledge")],
  SBL: [() => import("@/lib/acca-briefs-sbl")],
  SBR: [() => import("@/lib/acca-briefs-sbr")],
  AFM: [() => import("@/lib/acca-briefs-afm")],
  APM: [() => import("@/lib/acca-briefs-apm")],
  ATX: [() => import("@/lib/acca-briefs-atx")],
  AAA: [() => import("@/lib/acca-briefs-aaa")],
}

/** Every paper that has downloadable content. */
export function contentPaperIds(): string[] {
  return Object.keys(QUESTION_MODULES)
}

async function loadAll(loaders: Loader[] | undefined): Promise<ContentModule[]> {
  if (!loaders || loaders.length === 0) return []
  return Promise.all(loaders.map((l) => l()))
}

/* ── The loader ───────────────────────────────────────────────── */

/** In-flight / settled loads, so a paper is never fetched twice. */
const pending = new Map<string, Promise<void>>()

/**
 * Fetch ONE paper's content and register it. Idempotent and safe to call from
 * every page: the second caller gets the first caller's promise. A failed load
 * is forgotten so a flaky network can be retried (the hook offers a retry).
 */
export function loadPaperContent(paperId: string): Promise<void> {
  if (isPaperContentLoaded(paperId)) return Promise.resolve()
  const existing = pending.get(paperId)
  if (existing) return existing

  const job = (async () => {
    const [questionMods, chapterMods, flashcardMods, writtenMods, briefMods, caseMods] = await Promise.all([
      loadAll(QUESTION_MODULES[paperId]),
      loadAll(CHAPTER_MODULES[paperId]),
      loadAll(FLASHCARD_MODULES[paperId]),
      loadAll(WRITTEN_MODULES[paperId]),
      loadAll(BRIEF_MODULES[paperId]),
      loadAll(CASE_MODULES[paperId]),
    ])
    const content: PaperContent = {
      questions: collect<AccaQuestion>(questionMods, paperId),
      chapters: collect<StudyChapter>(chapterMods, paperId),
      flashcards: collect<Flashcard>(flashcardMods, paperId),
      written: collect<WrittenQuestion>(writtenMods, paperId),
      briefs: collect<TopicBrief>(briefMods, paperId),
      cases: collect<OtCase>(caseMods, paperId),
    }
    registerPaperContent(paperId, content)
  })()

  const tracked = job.finally(() => {
    if (!isPaperContentLoaded(paperId)) pending.delete(paperId)
  })
  pending.set(paperId, tracked)
  return tracked
}

/**
 * Load EVERY paper. Only the Node bootstrap (tsx scripts + vitest) uses this —
 * the browser must never call it, or the student is back to downloading all
 * fifteen papers. It reuses the same per-paper loaders, so it adds no chunk.
 */
export function loadAllPaperContent(): Promise<void> {
  return Promise.all(contentPaperIds().map(loadPaperContent)).then(() => undefined)
}
