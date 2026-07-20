import { registerPaperContent, isPaperContentLoaded, type PaperContent } from "@/lib/acca-content-registry"
import type { AccaQuestion, OtCase } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"
import type { TopicBrief } from "@/lib/acca-briefs"
import type { StudyChapter } from "@/lib/acca-study-content"
import { mapBtFlashcardsToOfficialSyllabus, mapBtQuestionsToOfficialSyllabus } from "@/lib/acca-bt-syllabus-map"
import { mapMaFlashcardsToOfficialSyllabus, mapMaQuestionsToOfficialSyllabus } from "@/lib/acca-ma-syllabus-map"
import { mapFaFlashcardsToOfficialSyllabus, mapFaQuestionsToOfficialSyllabus } from "@/lib/acca-fa-syllabus-map"
import { mapLwFlashcardsToOfficialSyllabus, mapLwQuestionsToOfficialSyllabus } from "@/lib/acca-lw-syllabus-map"
import { mapPmFlashcardsToOfficialSyllabus, mapPmQuestionsToOfficialSyllabus, mapPmWrittenToOfficialSyllabus } from "@/lib/acca-pm-syllabus-map"
import { mapTxFlashcardsToOfficialSyllabus, mapTxQuestionsToOfficialSyllabus, mapTxWrittenToOfficialSyllabus } from "@/lib/acca-tx-syllabus-map"
import { mapFrFlashcardsToOfficialSyllabus, mapFrQuestionsToOfficialSyllabus, mapFrWrittenToOfficialSyllabus } from "@/lib/acca-fr-syllabus-map"
import { mapFmFlashcardsToOfficialSyllabus, mapFmQuestionsToOfficialSyllabus, mapFmWrittenToOfficialSyllabus } from "@/lib/acca-fm-syllabus-map"
import { mapSblFlashcardsToOfficialSyllabus, mapSblQuestionsToOfficialSyllabus, mapSblWrittenToOfficialSyllabus } from "@/lib/acca-sbl-syllabus-map"
import { mapSbrFlashcardsToOfficialSyllabus, mapSbrQuestionsToOfficialSyllabus, mapSbrWrittenToOfficialSyllabus } from "@/lib/acca-sbr-syllabus-map"
import { mapApmFlashcardsToOfficialSyllabus, mapApmQuestionsToOfficialSyllabus, mapApmWrittenToOfficialSyllabus } from "@/lib/acca-apm-syllabus-map"
import { mapAtxFlashcardsToOfficialSyllabus, mapAtxQuestionsToOfficialSyllabus, mapAtxWrittenToOfficialSyllabus } from "@/lib/acca-atx-syllabus-map"

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
  FR: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-fr2"), () => import("@/lib/acca-content-fr3"), () => import("@/lib/acca-content-fr4"), () => import("@/lib/acca-content-fr5"), () => import("@/lib/acca-content-fr-official")],
  MA: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-ma2"), () => import("@/lib/acca-content-ma3"), () => import("@/lib/acca-content-ma-official")],
  BT: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-bt2"), () => import("@/lib/acca-content-bt3")],
  LW: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-lw2"), () => import("@/lib/acca-content-lw3")],
  PM: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-pm2"), () => import("@/lib/acca-content-pm3"), () => import("@/lib/acca-content-pm4"), () => import("@/lib/acca-content-pm-official")],
  TX: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-tx2"), () => import("@/lib/acca-content-tx3"), () => import("@/lib/acca-content-tx4"), () => import("@/lib/acca-content-tx-official")],
  AA: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-aa2"), () => import("@/lib/acca-content-aa3"), () => import("@/lib/acca-content-aa4"), () => import("@/lib/acca-content-aa-official")],
  FM: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-fm2"), () => import("@/lib/acca-content-fm3"), () => import("@/lib/acca-content-fm4"), () => import("@/lib/acca-content-fm-official")],
  SBL: [() => import("@/lib/acca-content-sbl2"), () => import("@/lib/acca-content-sbl3"), () => import("@/lib/acca-content-sbl-official")],
  SBR: [() => import("@/lib/acca-content-sbr2"), () => import("@/lib/acca-content-sbr3"), () => import("@/lib/acca-content-sbr-official")],
  AFM: [() => import("@/lib/acca-content-afm2"), () => import("@/lib/acca-content-afm3"), () => import("@/lib/acca-content-afm-official")],
  APM: [() => import("@/lib/acca-content-apm2"), () => import("@/lib/acca-content-apm3"), () => import("@/lib/acca-content-apm-official")],
  ATX: [() => import("@/lib/acca-content-atx2"), () => import("@/lib/acca-content-atx3"), () => import("@/lib/acca-content-atx-official")],
  AAA: [() => import("@/lib/acca-content-aaa2"), () => import("@/lib/acca-content-aaa3"), () => import("@/lib/acca-content-aaa-official")],
}

const CHAPTER_MODULES: Record<string, Loader[]> = {
  FA: [() => import("@/lib/acca-study-fa-official")],
  FR: [() => import("@/lib/acca-study-fr-official")],
  MA: [
    () => import("@/lib/acca-study-ma-official"),
  ],
  BT: [
    () => import("@/lib/acca-study-bt-official"),
  ],
  TX: [() => import("@/lib/acca-study-tx-official")],
  LW: [() => import("@/lib/acca-study-lw-official")],
  PM: [() => import("@/lib/acca-study-pm-official")],
  AA: [() => import("@/lib/acca-study-aa-official")],
  FM: [() => import("@/lib/acca-study-fm-official")],
  SBR: [() => import("@/lib/acca-study-sbr-official")],
  SBL: [() => import("@/lib/acca-study-sbl-official")],
  AFM: [() => import("@/lib/acca-study-afm-official")],
  APM: [() => import("@/lib/acca-study-apm-official")],
  ATX: [() => import("@/lib/acca-study-atx-official")],
  AAA: [() => import("@/lib/acca-study-aaa-official")],
}

const FLASHCARD_MODULES: Record<string, Loader[]> = {
  FA: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave2"), () => import("@/lib/acca-flashcards-wave5")],
  FR: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave2"), () => import("@/lib/acca-flashcards-wave5"), () => import("@/lib/acca-flashcards-fr-official")],
  PM: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave2"), () => import("@/lib/acca-flashcards-wave5"), () => import("@/lib/acca-flashcards-pm-official")],
  TX: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave2"), () => import("@/lib/acca-flashcards-wave5"), () => import("@/lib/acca-flashcards-tx-official")],
  AA: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave3"), () => import("@/lib/acca-flashcards-wave5"), () => import("@/lib/acca-flashcards-aa-official")],
  FM: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave3"), () => import("@/lib/acca-flashcards-wave5"), () => import("@/lib/acca-flashcards-fm-official")],
  MA: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave3"), () => import("@/lib/acca-flashcards-wave5"), () => import("@/lib/acca-flashcards-ma-official")],
  BT: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave4"), () => import("@/lib/acca-flashcards-wave5"), () => import("@/lib/acca-flashcards-bt-official")],
  LW: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-wave4"), () => import("@/lib/acca-flashcards-wave5")],
  SBL: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-s1"), () => import("@/lib/acca-flashcards-sbl-official")],
  SBR: [() => import("@/lib/acca-flashcards-core"), () => import("@/lib/acca-flashcards-s1"), () => import("@/lib/acca-flashcards-sbr-official")],
  AFM: [() => import("@/lib/acca-flashcards-s2"), () => import("@/lib/acca-flashcards-afm-official")],
  APM: [() => import("@/lib/acca-flashcards-s2"), () => import("@/lib/acca-flashcards-apm-official")],
  ATX: [() => import("@/lib/acca-flashcards-s3"), () => import("@/lib/acca-flashcards-atx-official")],
  AAA: [() => import("@/lib/acca-flashcards-s3"), () => import("@/lib/acca-flashcards-aaa-official")],
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
  SBL: [() => import("@/lib/acca-written-core"), () => import("@/lib/acca-written-wave2"), () => import("@/lib/acca-written-s1"), () => import("@/lib/acca-written-sbl-official")],
  SBR: [() => import("@/lib/acca-written-core"), () => import("@/lib/acca-written-wave2"), () => import("@/lib/acca-written-s1"), () => import("@/lib/acca-written-sbr-official")],
  AFM: [() => import("@/lib/acca-written-s2"), () => import("@/lib/acca-written-afm-official")],
  APM: [() => import("@/lib/acca-written-s2"), () => import("@/lib/acca-written-apm-official")],
  ATX: [() => import("@/lib/acca-written-s3"), () => import("@/lib/acca-written-atx-official")],
  AAA: [() => import("@/lib/acca-written-s3"), () => import("@/lib/acca-written-aaa-official")],
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
  FA: [() => import("@/lib/acca-briefs-fa-official")],
  FR: [() => import("@/lib/acca-briefs-fr-official")],
  PM: [() => import("@/lib/acca-briefs-pm-official")],
  TX: [() => import("@/lib/acca-briefs-tx-official")],
  AA: [() => import("@/lib/acca-briefs-aa-official")],
  FM: [() => import("@/lib/acca-briefs-fm-official")],
  BT: [() => import("@/lib/acca-briefs-bt-official")],
  MA: [() => import("@/lib/acca-briefs-ma-official")],
  LW: [() => import("@/lib/acca-briefs-lw-official")],
  SBL: [() => import("@/lib/acca-briefs-sbl-official")],
  SBR: [() => import("@/lib/acca-briefs-sbr-official")],
  AFM: [() => import("@/lib/acca-briefs-afm-official")],
  APM: [() => import("@/lib/acca-briefs-apm-official")],
  ATX: [() => import("@/lib/acca-briefs-atx-official")],
  AAA: [() => import("@/lib/acca-briefs-aaa-official")],
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
    const collectedQuestions = collect<AccaQuestion>(questionMods, paperId)
    const questions = paperId === "BT"
      ? mapBtQuestionsToOfficialSyllabus(collectedQuestions)
      : paperId === "MA"
        ? mapMaQuestionsToOfficialSyllabus(collectedQuestions)
        : paperId === "FA"
          ? mapFaQuestionsToOfficialSyllabus(collectedQuestions)
          : paperId === "LW"
            ? mapLwQuestionsToOfficialSyllabus(collectedQuestions)
            : paperId === "PM"
              ? mapPmQuestionsToOfficialSyllabus(collectedQuestions)
              : paperId === "TX"
                ? mapTxQuestionsToOfficialSyllabus(collectedQuestions)
              : paperId === "FR"
                ? mapFrQuestionsToOfficialSyllabus(collectedQuestions)
              : paperId === "FM"
                ? mapFmQuestionsToOfficialSyllabus(collectedQuestions)
              : paperId === "SBL"
                ? mapSblQuestionsToOfficialSyllabus(collectedQuestions)
              : paperId === "SBR"
                ? mapSbrQuestionsToOfficialSyllabus(collectedQuestions)
              : paperId === "APM"
                ? mapApmQuestionsToOfficialSyllabus(collectedQuestions)
              : paperId === "ATX"
                ? mapAtxQuestionsToOfficialSyllabus(collectedQuestions)
        : collectedQuestions
    const content: PaperContent = {
      questions,
      chapters: collect<StudyChapter>(chapterMods, paperId),
      flashcards: paperId === "BT"
        ? mapBtFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
        : paperId === "MA"
          ? mapMaFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
          : paperId === "FA"
            ? mapFaFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
            : paperId === "LW"
              ? mapLwFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
              : paperId === "PM"
                ? mapPmFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
                : paperId === "TX"
                  ? mapTxFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
                : paperId === "FR"
                  ? mapFrFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
                : paperId === "FM"
                  ? mapFmFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
                : paperId === "SBL"
                  ? mapSblFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
                : paperId === "SBR"
                  ? mapSbrFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
                : paperId === "APM"
                  ? mapApmFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
                : paperId === "ATX"
                  ? mapAtxFlashcardsToOfficialSyllabus(collect<Flashcard>(flashcardMods, paperId))
            : collect<Flashcard>(flashcardMods, paperId),
      written: paperId === "PM" ? mapPmWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "TX" ? mapTxWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "FR" ? mapFrWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "FM" ? mapFmWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "SBL" ? mapSblWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "SBR" ? mapSbrWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "APM" ? mapApmWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "ATX" ? mapAtxWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : collect<WrittenQuestion>(writtenMods, paperId),
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
