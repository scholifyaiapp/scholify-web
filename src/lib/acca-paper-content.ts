import { registerPaperContent, isPaperContentLoaded, forgetPaperContent, type PaperContent } from "@/lib/acca-content-registry"
import { loadExamPlans, applyExamPlans } from "@/lib/acca-exam-plans"
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
import { completeStudyFlashcards } from "@/lib/acca-study-flashcards"
import { f1F4StudyDerived, studyDerivedQuestions } from "@/lib/acca-f1-f4-section-a"
import { PM_CONTENT_TARGET } from "@/lib/pm-content-contract"
import { TX_CONTENT_TARGET } from "@/lib/tx-content-contract"
import { FR_CONTENT_TARGET } from "@/lib/fr-content-contract"
import { completeAaSectionA, completeAaSectionB } from "@/lib/acca-aa-expansion"
import { AA_CONTENT_TARGET } from "@/lib/aa-content-contract"
import { completeFmSectionB, completeFmSectionC } from "@/lib/acca-fm-expansion"
import { FM_CONTENT_TARGET } from "@/lib/fm-content-contract"
import { getPaperVariant } from "@/lib/acca-profile"
import { completeTxGlobalSectionB, completeTxGlobalSectionC } from "@/lib/acca-tx-global-expansion"
import { tierCompletionQuestions } from "@/lib/acca-tier-completion"
import { completeSblWritten } from "@/lib/acca-sbl-expansion"
import { SBL_CONTENT_TARGET } from "@/lib/sbl-content-contract"
import { ADVANCED_CONTENT_TARGET, ADVANCED_PAPERS } from "@/lib/advanced-content-contract"
import { completeAdvancedWritten } from "@/lib/acca-advanced-expansion"

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
  // The `acca-questions-fa-kit-*` modules are FA's per-chapter question kit:
  // authored, applied questions indexed to a study chapter, every one at the real
  // Section A unit of 2 marks, with numeric entry used wherever the skill is a
  // computation. Like BT's and MA's kits they carry official syllabus areas and
  // bypass the legacy area migration (see acca-fa-syllabus-map.ts).
  FA: [
    () => import("@/lib/acca-content-core"),
    () => import("@/lib/acca-content-fa2"),
    () => import("@/lib/acca-content-fa3"),
    () => import("@/lib/acca-questions-fa-kit-abc"),
    () => import("@/lib/acca-questions-fa-kit-d"),
    () => import("@/lib/acca-questions-fa-kit-efg"),
    () => import("@/lib/acca-questions-fa-kit-hi"),
  ],
  // The `acca-questions-fr-kit-*` modules are FR's per-chapter question kit: authored,
  // applied questions indexed to a study chapter, every one at the real 2-mark unit, with
  // numeric entry wherever the skill is a calculation. `-depth` adds extra practice on the
  // chapters that carry the most marks. Like the other rebuilt papers' kits they carry
  // official syllabus areas and bypass the legacy area migration.
  //
  // FR's bank is the per-chapter authored kit and nothing else. The legacy lists —
  // acca-content-core, -fr2, -fr3, -fr4, -fr5 and -fr-official — held 223 questions carrying
  // no `chapter`, tagged against the area structure the tree replaced. Keeping them alongside
  // the kit gave a bank of 565 items of mixed provenance, a third of which the reading tree
  // could not route a learner back to, and several of which had no unit on a numeric answer.
  FR: [
    () => import("@/lib/acca-questions-fr-kit-a"),
    () => import("@/lib/acca-questions-fr-kit-b1"),
    () => import("@/lib/acca-questions-fr-kit-b2"),
    () => import("@/lib/acca-questions-fr-kit-b3"),
    () => import("@/lib/acca-questions-fr-kit-d"),
    () => import("@/lib/acca-questions-fr-kit-ce"),
    () => import("@/lib/acca-questions-fr-kit-depth"),
  ],
  // The `acca-questions-ma-kit-*` modules are MA's per-chapter question kit:
  // authored, applied questions indexed to a study chapter, with numeric entry
  // used wherever the skill is a calculation. Like BT's kit they carry official
  // syllabus areas and bypass the legacy area migration.
  MA: [
    () => import("@/lib/acca-content-core"),
    () => import("@/lib/acca-content-ma2"),
    () => import("@/lib/acca-content-ma3"),
    () => import("@/lib/acca-content-ma-official"),
    () => import("@/lib/acca-questions-ma-kit-ab"),
    () => import("@/lib/acca-questions-ma-kit-c"),
    () => import("@/lib/acca-questions-ma-kit-def"),
  ],
  // The `acca-questions-bt-kit-*` modules are the per-chapter question kit:
  // authored, applied questions indexed to a study chapter. They carry official
  // syllabus areas and are exempt from the legacy BT area migration (see
  // acca-bt-syllabus-map.ts).
  BT: [
    () => import("@/lib/acca-content-core"),
    () => import("@/lib/acca-content-bt2"),
    () => import("@/lib/acca-content-bt3"),
    () => import("@/lib/acca-questions-bt-kit-a"),
    () => import("@/lib/acca-questions-bt-kit-b"),
    () => import("@/lib/acca-questions-bt-kit-c"),
    () => import("@/lib/acca-questions-bt-kit-def"),
  ],
  LW: [() => import("@/lib/acca-content-core"), () => import("@/lib/acca-content-lw2"), () => import("@/lib/acca-content-lw3")],
  /*
   * PM's bank is the per-chapter authored kit and nothing else. The legacy lists
   * (acca-content-pm2/3/4 and -pm-official) held 244 questions carrying no `chapter`,
   * tagged against the FOUR-area structure the tree replaced, and were topped up with
   * 106 machine-derived recall drills to reach a 350 inventory target that was itself a
   * fiction — PM's real Section A is 15 questions. The kit is 396 authored questions,
   * one group per chapter, so every chapter in the tree is examined and no drill is
   * needed.
   */
  PM: [
    () => import("@/lib/acca-questions-pm-kit-a"),
    () => import("@/lib/acca-questions-pm-kit-b"),
    () => import("@/lib/acca-questions-pm-kit-c1"),
    () => import("@/lib/acca-questions-pm-kit-c2"),
    () => import("@/lib/acca-questions-pm-kit-d1"),
    () => import("@/lib/acca-questions-pm-kit-d2"),
    () => import("@/lib/acca-questions-pm-kit-e"),
    () => import("@/lib/acca-questions-pm-kit-f"),
  ],
  /*
   * TX-UK's bank is the per-chapter authored kit and nothing else. The legacy lists held
   * 277 questions carrying no `chapter`, tagged against the SEVEN-area structure the tree
   * replaced, topped up with 73 machine-derived recall drills. The kit is 316 authored
   * questions across all 29 chapters on the FA2025 basis, so no drill is needed.
   *
   * Note this map is only reached for TX-UK: TX-Global uses the foundation track above.
   */
  TX: [
    () => import("@/lib/acca-questions-tx-kit-a"),
    () => import("@/lib/acca-questions-tx-kit-b1"),
    () => import("@/lib/acca-questions-tx-kit-b2"),
    () => import("@/lib/acca-questions-tx-kit-b3"),
    () => import("@/lib/acca-questions-tx-kit-cd"),
    () => import("@/lib/acca-questions-tx-kit-efg"),
  ],
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
  // FR's reading tree: 34 chapters across Areas A to E, replacing the five
  // one-per-area chapters that acca-study-fr-official.ts assembled.
  FR: [() => import("@/lib/acca-study-fr-tree")],
  MA: [
    () => import("@/lib/acca-study-ma-official"),
  ],
  // BT is authored as a 26-chapter TREE across its six syllabus areas (see
  // acca-study-bt-official.ts). `collect` reads arrays as well as single objects,
  // so a paper with many chapters per area needs no special handling here.
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
  // FR's Section C: 15 authored constructed responses at the real 20-mark unit size,
  // replacing the 50 generated by completeFrSectionC.
  FR: [() => import("@/lib/acca-written-fr-kit"), () => import("@/lib/acca-written-fr-kit2")],
  AA: [() => import("@/lib/acca-written-wave2"), () => import("@/lib/acca-written-w3-aa")],
  // Six authored 20-mark constructed responses — three disjoint sittings of two, at the
  // real Section C unit size. Replaces acca-written-w3-pm, whose questions were 9 and 10
  // marks and padded to 50 by completePmSectionC.
  PM: [() => import("@/lib/acca-written-pm-kit"), () => import("@/lib/acca-written-pm-kit2")],
  // Nine authored constructed responses at TX's real unit sizes - three at 10 marks and
  // six at 15, completing three disjoint sittings. Replaces acca-written-w3-tx, whose 50
  // questions were all 20 marks, which is not a TX Section C unit size at all.
  TX: [() => import("@/lib/acca-written-tx-kit"), () => import("@/lib/acca-written-tx-kit2"), () => import("@/lib/acca-written-tx-kit3")],
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
  // BT's Section B is 18 authored multi-task questions at the real 4-mark unit
  // size — not the shared knowledge-paper cases, and not generated.
  BT: [() => import("@/lib/acca-cases-bt")],
  // MA's Section B is 9 authored MTQs at the real 10-mark unit size, three each
  // on budgeting, standard costing and performance measurement.
  MA: [() => import("@/lib/acca-cases-ma")],
  // FA's Section B is 6 authored MTQs at the real 15-mark unit size — three on
  // accounts preparation and three on consolidation, the two areas the published
  // blueprint names, ordered alternately so every mock form draws one of each.
  FA: [() => import("@/lib/acca-cases-fa")],
  LW: [() => import("@/lib/acca-cases-knowledge")],
  // FR's Section B is 9 authored OT cases of 5 linked 2-mark tasks - three disjoint
  // sittings of three, at the real 10-mark unit size, replacing 70 generated cases.
  FR: [() => import("@/lib/acca-cases-fr")],
  // TX-UK's Section B is 9 authored OT cases of 5 linked 2-mark tasks - three disjoint
  // sittings of three, at the real 10-mark unit size, replacing 70 generated cases.
  TX: [() => import("@/lib/acca-cases-tx")],
  // PM's Section B is 9 authored OT cases of 5 linked 2-mark tasks — three disjoint
  // sittings of three, at the real 10-mark unit size. It previously composed 70
  // generated cases via completePmSectionB.
  PM: [() => import("@/lib/acca-cases-pm")],
}

/*
 * LW-GLOBAL's own content, loaded only when that variant is active.
 *
 * These are DYNAMIC loaders for the same reason every other content module is: a
 * static import here would put LW-Global's bank into the shared chunk that every
 * paper downloads. The Global question bank used to be statically imported at the top
 * of this file, which did exactly that — a defect that mattered little at 48 questions
 * and would have mattered a great deal at 378.
 *
 * The Global variant needs its own lists because three of LW's eight syllabus areas
 * differ from the ENG variant (see acca-study-lw-global.ts): its Area B is the CISG,
 * its Area C is transport and payment, and its Area G is companies in difficulty.
 */
const LW_GLOBAL_QUESTION_MODULES: Loader[] = [
  () => import("@/lib/acca-lw-global-questions"),
  () => import("@/lib/acca-questions-lwg-kit-a"),
  () => import("@/lib/acca-questions-lwg-kit-b"),
  () => import("@/lib/acca-questions-lwg-kit-cd"),
  () => import("@/lib/acca-questions-lwg-kit-efgh"),
]

/*
 * LW-Global's Section B is 15 authored MTQs at the real 6-mark unit size — five per
 * sitting, three disjoint sittings — replacing 350 generated linked questions.
 */
const LW_GLOBAL_CASE_MODULES: Loader[] = [() => import("@/lib/acca-cases-lw-global")]

/*
 * LW-ENG's own content, loaded only when the UK variant is active.
 *
 * Symmetrical with the Global block above, and needed for the same reason: LW is one
 * paper id with two genuinely different syllabuses, so neither variant's bank can serve
 * the other. ENG's Area B is the English law of obligations, its Area C employment law
 * and its Area G insolvency law, where Global has the CISG, transport and payment, and
 * companies in difficulty.
 *
 * ── What this replaced ────────────────────────────────────────
 * Before this, selecting United Kingdom gave the learner the GLOBAL reading tree with a
 * single UK-flavoured overlay section prepended to chapter 1 by
 * applyVariantStudyContent, plus the legacy ENG bank of four area-chapters' worth of
 * questions. So the variant switch was very nearly cosmetic on the study side, and the
 * ENG learner read two areas that were not on their exam while missing two that were.
 */
const LW_ENG_QUESTION_MODULES: Loader[] = [
  () => import("@/lib/acca-questions-lwe-kit-a"),
  () => import("@/lib/acca-questions-lwe-kit-b1"),
  () => import("@/lib/acca-questions-lwe-kit-b2"),
  () => import("@/lib/acca-questions-lwe-kit-c"),
  () => import("@/lib/acca-questions-lwe-kit-d"),
  () => import("@/lib/acca-questions-lwe-kit-ef"),
  () => import("@/lib/acca-questions-lwe-kit-gh"),
  () => import("@/lib/acca-questions-lwe-kit-supp1"),
  () => import("@/lib/acca-questions-lwe-kit-supp2"),
]

/* LW-ENG's Section B: 15 authored MTQs at the real 6-mark unit size. */
const LW_ENG_CASE_MODULES: Loader[] = [() => import("@/lib/acca-cases-lw-eng")]

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
export function reloadPaperContent(paperId: string): Promise<void> {
  /*
   * Rebuild a paper's content from scratch, for when the inputs to the load have changed
   * rather than the paper.
   *
   * The registry is keyed by paper id, but LW and TX content also depends on the selected
   * VARIANT — different chapters, different bank, different cases — so switching variant
   * must discard the cached bundle or the learner keeps reading the tree they switched
   * away from. Settings achieves that today with a full page reload, so nothing in the UI
   * calls this yet; the contract tests need it because the Node bootstrap pre-fills every
   * paper at its DEFAULT variant.
   */
  forgetPaperContent(paperId)
  pending.delete(paperId)
  return loadPaperContent(paperId)
}

export function loadPaperContent(paperId: string): Promise<void> {
  if (isPaperContentLoaded(paperId)) return Promise.resolve()
  const existing = pending.get(paperId)
  if (existing) return existing

  const job = (async () => {
    const variant = getPaperVariant(paperId)
    const isLwGlobal = paperId === "LW" && variant === "GLOBAL"
    const isLwEng = paperId === "LW" && variant === "UK"
    const isTxGlobal = paperId === "TX" && variant === "GLOBAL"
    const usesGlobalBank = isLwGlobal || isTxGlobal
    /*
     * Variants with their own authored reading tree, which therefore must NOT have the
     * cosmetic `applyVariantStudyContent` overlay prepended to chapter 1: the overlay
     * exists only for a variant that is still reading the other one's chapters.
     */
    const usesOwnTree = usesGlobalBank || isLwEng
    const [questionMods, chapterMods, flashcardMods, writtenMods, briefMods, caseMods, lwGlobalMods, lwGlobalCaseMods, lwEngMods, lwEngCaseMods] = await Promise.all([
      loadAll(QUESTION_MODULES[paperId]),
      loadAll(CHAPTER_MODULES[paperId]),
      loadAll(FLASHCARD_MODULES[paperId]),
      loadAll(WRITTEN_MODULES[paperId]),
      loadAll(BRIEF_MODULES[paperId]),
      loadAll(CASE_MODULES[paperId]),
      loadAll(isLwGlobal ? LW_GLOBAL_QUESTION_MODULES : undefined),
      loadAll(isLwGlobal ? LW_GLOBAL_CASE_MODULES : undefined),
      loadAll(isLwEng ? LW_ENG_QUESTION_MODULES : undefined),
      loadAll(isLwEng ? LW_ENG_CASE_MODULES : undefined),
    ])
    /*
     * LW-Global cannot use the ENG bank: three of the eight syllabus areas differ, so
     * its Area B is the CISG and Incoterms, its Area C is transport documents and
     * payment, and its Area G is companies in difficulty. Before it had its own bank
     * the paper fell through to almost pure study-text recall — 342 of 350 derived —
     * and Global is the DEFAULT LW variant, so that was the default experience.
     */
    const collectedQuestions = isLwGlobal
      ? collect<AccaQuestion>(lwGlobalMods, paperId)
      : isLwEng
        ? collect<AccaQuestion>(lwEngMods, paperId)
        : usesGlobalBank
          ? []
          : collect<AccaQuestion>(questionMods, paperId)
    const questions = paperId === "BT"
      ? mapBtQuestionsToOfficialSyllabus(collectedQuestions)
      : paperId === "MA"
        ? mapMaQuestionsToOfficialSyllabus(collectedQuestions)
        : paperId === "FA"
          ? mapFaQuestionsToOfficialSyllabus(collectedQuestions)
          : paperId === "LW"
            // The LW mapper re-derives any area-"D" question from UK syllabus
            // keywords, which is what the LEGACY bank needs. Both authored kits are
            // already tagged against their own variant's syllabus and carry a
            // `chapter`, so running either through it would scatter them — the Global
            // questions because its Areas B and C are the CISG and international
            // transport, and the ENG questions because a keyword re-derivation would
            // move items off the very areas they were written for.
            ? isLwGlobal || isLwEng ? collectedQuestions : mapLwQuestionsToOfficialSyllabus(collectedQuestions)
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
    const baseChapters = usesGlobalBank
      ? paperId === "LW"
        ? (await import("@/lib/acca-study-lw-global")).LW_GLOBAL_CHAPTERS
        : (await import("@/lib/acca-study-tx-global")).TX_GLOBAL_CHAPTERS
      : isLwEng
        ? (await import("@/lib/acca-study-lw-eng")).LW_ENG_CHAPTERS
        : paperId === "PM"
          // PM's four area-chapters covered a FIVE-area syllabus, so Area E had none at
          // all. The tree is 33 chapters, one per sub-topic group, and replaces
          // acca-study-pm-official entirely rather than sitting alongside it.
          ? (await import("@/lib/acca-study-pm-tree")).PM_CHAPTERS
          : paperId === "TX"
            // TX-UK's SEVEN chapters for a SEVEN-area syllabus was the most extreme case
            // of the one-chapter-per-area defect: Area B alone is eleven chapters of any
            // approved-provider text and had one. The tree is 29 chapters on the FA2025
            // basis. Note this branch is reached only for TX-UK — isTxGlobal is handled
            // by usesGlobalBank above.
            ? (await import("@/lib/acca-study-tx-tree")).TX_CHAPTERS
            : collect<StudyChapter>(chapterMods, paperId)
    /*
     * No variant overlay is applied to anything any more, and acca-variant-content.ts has
     * been deleted with this change. TX-UK was its last caller: it read the shared TX
     * chapters, so the overlay prepended a "United Kingdom variant · FA2025" orientation
     * section to give it some idea of its own syllabus. Now that TX-UK has its own
     * 29-chapter FA2025 tree, that overlay would prepend a UK orientation to a tree that
     * is entirely UK — exactly the cosmetic-variant defect LW had before its rebuild.
     *
     * Every variant that ships now selects its own authored chapters above: LW-Global,
     * LW-ENG, TX-UK, and TX-Global's own foundation track.
     */
    /*
     * The exam-plan layer: every section gains the question it is examined by,
     * taught as a plan. Authored separately from the trees and merged here, so a
     * plan can never be lost inside a 160 KB chapter file — see acca-exam-plans.ts
     * for why that separation matters and how the keys are formed. A paper with no
     * plans yet merges an empty map and comes through untouched.
     */
    const examPlans = await loadExamPlans(paperId)
    const planned = applyExamPlans(baseChapters, examPlans)
    if (planned.unused.length && import.meta.env?.DEV) {
      // A key matching no section means a renamed section or a typo, and the plan
      // silently never renders. Loud in dev; the contract test fails on it in CI.
      console.warn(`[${paperId}] ${planned.unused.length} exam plan(s) matched no section:`, planned.unused)
    }
    const chapters = planned.chapters
    const mappedFlashcards = usesGlobalBank ? [] : paperId === "BT"
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
            : collect<Flashcard>(flashcardMods, paperId)
    // Authored questions that complete the easy/medium/hard ladder in areas whose
    // bank was missing a tier. Merged AFTER the per-paper syllabus mappers, which
    // re-derive some area codes from keywords and would otherwise move these off
    // the very areas they were written to fill. They join the AUTHORED set, so
    // completeSectionAFromStudy adds correspondingly fewer recall drills and the
    // bank total stays put — authored content displacing filler, not adding to it.
    const questionsWithTiers = [...questions, ...tierCompletionQuestions(paperId)]
    /*
     * The inventory a paper is sized to. Authored questions count toward it first;
     * derived recall drills make up whatever remains (see PaperContent.drills).
     * Once a paper's authored bank reaches its target the drill list is simply
     * empty — which is the direction every paper is being rebuilt in.
     */
    const inventoryTarget = paperId === "PM"
      // Set to PM's own authored total, so nothing is left for the drill filler to add.
      // It was PM_CONTENT_TARGET.sectionA, which meant 350 — a number describing neither
      // the exam (15 questions) nor the authored bank.
      ? PM_CONTENT_TARGET.bankInventoryTarget
      : paperId === "TX"
        // TX-UK's own authored total, so nothing is left for the drill filler to add. It
        // was TX_CONTENT_TARGET.sectionA at 350 — a figure describing neither the exam
        // (15 Section A questions) nor the authored bank.
        ? TX_CONTENT_TARGET.bankInventoryTarget
        : paperId === "FR"
          // FR's own authored total, so nothing is left for the drill filler to add. It was
          // FR_CONTENT_TARGET.sectionA at 350 - a figure describing neither the exam (15
          // Section A questions) nor the authored bank.
          ? FR_CONTENT_TARGET.bankInventoryTarget
          : paperId === "AA"
            ? AA_CONTENT_TARGET.objectiveBank
            : paperId === "FM"
              ? FM_CONTENT_TARGET.sectionA
              : paperId === "SBL"
                ? SBL_CONTENT_TARGET.learningDrills
                : ADVANCED_PAPERS.includes(paperId as typeof ADVANCED_PAPERS[number])
                  ? ADVANCED_CONTENT_TARGET.learningDrills
                  : null
    const studyDerived = inventoryTarget != null
      ? studyDerivedQuestions(paperId, questionsWithTiers, chapters, inventoryTarget)
      : f1F4StudyDerived(paperId, questionsWithTiers, chapters)
    const content: PaperContent = {
      questions: [...questionsWithTiers, ...studyDerived.authored],
      drills: studyDerived.drills,
      chapters,
      flashcards: completeStudyFlashcards(paperId, mappedFlashcards, chapters, paperId === "PM" ? PM_CONTENT_TARGET.flashcards : paperId === "TX" ? TX_CONTENT_TARGET.flashcards : paperId === "FR" ? FR_CONTENT_TARGET.flashcards : paperId === "AA" ? AA_CONTENT_TARGET.flashcards : paperId === "FM" ? FM_CONTENT_TARGET.flashcards : paperId === "SBL" ? SBL_CONTENT_TARGET.flashcards : ADVANCED_PAPERS.includes(paperId as typeof ADVANCED_PAPERS[number]) ? ADVANCED_CONTENT_TARGET.flashcards : undefined),
      /*
       * PM and TX-UK both serve their authored constructed responses directly. They carry a
       * `chapter`, so each paper's written mapper passes them through untouched, and there
       * is nothing left for completePmSectionC or completeTxSectionC to pad — both of those
       * helpers have been deleted. TX-Global keeps its generated set, having no real exam
       * behind it to model.
       */
      written: paperId === "PM" ? mapPmWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "TX" ? isTxGlobal ? completeTxGlobalSectionC() : mapTxWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "FR" ? mapFrWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "AA" ? completeAaSectionB(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "FM" ? completeFmSectionC(mapFmWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId))) : paperId === "SBL" ? completeSblWritten(mapSblWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)), chapters) : completeAdvancedWritten(paperId, paperId === "SBR" ? mapSbrWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "APM" ? mapApmWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : paperId === "ATX" ? mapAtxWrittenToOfficialSyllabus(collect<WrittenQuestion>(writtenMods, paperId)) : collect<WrittenQuestion>(writtenMods, paperId), chapters),
      briefs: isLwGlobal
        ? (await import("@/lib/acca-briefs-lw-global")).LW_GLOBAL_BRIEFS
        : isTxGlobal
          ? (await import("@/lib/acca-study-tx-global")).TX_GLOBAL_BRIEFS
          : collect<TopicBrief>(briefMods, paperId),
      cases: paperId === "PM"
        // Nine authored cases at the real 10-mark unit size, served directly. The
        // generated Section B that completePmSectionB produced was 70 cases, which is
        // 23 sittings' worth of a paper that examines three.
        ? collect<OtCase>(caseMods, paperId)
        : paperId === "TX"
          ? isTxGlobal ? completeTxGlobalSectionB() : collect<OtCase>(caseMods, paperId)
        : paperId === "FR"
          // Nine authored cases at the real 10-mark unit size, served directly. The
          // generated Section B that completeFrSectionB produced was 70 cases, which is
          // 23 sittings' worth of a paper that examines three.
          ? collect<OtCase>(caseMods, paperId)
        : paperId === "AA"
          ? completeAaSectionA(collect<OtCase>(caseMods, paperId))
        : paperId === "FM"
          ? completeFmSectionB(collect<OtCase>(caseMods, paperId))
        // Both LW variants have their own 15 authored MTQs at the real 6-mark unit
        // size, so each is served directly. LW was the last paper relying on the
        // generated-case fallback, so that fallback and acca-f1-f4-section-b.ts were
        // retired with this change — nothing now pads Section B with conceptual cases.
        : isLwGlobal
          ? collect<OtCase>(lwGlobalCaseMods, paperId)
        : isLwEng
          ? collect<OtCase>(lwEngCaseMods, paperId)
        : usesGlobalBank ? [] : collect<OtCase>(caseMods, paperId),
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
