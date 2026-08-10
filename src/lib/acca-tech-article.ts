/*
 * Scholify — the TOPIC technical article.
 *
 * ── Why this is not just a link ───────────────────────────────────
 * The Today plan's fifth block used to be `officialResources(paperId)`'s first
 * row: "BT technical articles" → accaglobal.com's index page for the whole
 * paper. That is a link to a LIST. A learner studying "Organisational culture"
 * lands on forty articles spanning every area of BT and has to guess which one
 * relates to what they just read — so in practice the block was skipped, and the
 * minutes budgeted for it were dead.
 *
 * A technical article should do what ACCA's do: take the topic just studied and
 * show it the way the examining team talks about it — what is actually examined,
 * where candidates lose the marks, and the wording that earns them. Every input
 * for that already exists in the chapter the learner just read (traps, key
 * terms, the knowledge diagnostic, further study) and in the area's brief. So
 * this composes a real, topic-specific reading from authored content, and keeps
 * the official ACCA link as a clearly-labelled DEEPER read rather than pretending
 * the index page is the article.
 *
 * Deterministic: same chapter in, same article out. No generation at read time.
 */

import { getPaper } from "@/lib/acca"
import { chapterKey, type StudyChapter } from "@/lib/acca-study-content"
import { getTopicBrief } from "@/lib/acca-briefs"
import { officialResources } from "@/lib/acca-resources"
import { chapterHardness } from "@/lib/acca-topic-plan"

export interface ArticleSection {
  heading: string
  /** Plain paragraphs — no markdown syntax. */
  paragraphs: string[]
  /** Optional bullet run under the paragraphs. */
  bullets?: string[]
  kind: "examined" | "marks" | "wording" | "traps" | "connect" | "recall"
}

export interface TechArticle {
  /** Stable id, so completion can be recorded per article. */
  id: string
  paper: string
  area: string
  chapterKey: string
  title: string
  /** The standfirst under the title. */
  standfirst: string
  /** Realistic read time. */
  minutes: number
  sections: ArticleSection[]
  /** ACCA's own index for this paper — the deeper read, honestly labelled. */
  officialUrl: string | null
}

/** Round a word count to a believable read time, 4–11 minutes. */
function readMinutes(sections: ArticleSection[]): number {
  const words = sections.reduce(
    (n, s) => n + s.paragraphs.join(" ").split(/\s+/).length + (s.bullets?.join(" ").split(/\s+/).length ?? 0),
    0,
  )
  return Math.max(4, Math.min(11, Math.round(words / 190)))
}

/**
 * The technical article for one chapter.
 *
 * Returns null when the chapter carries too little to build a real reading from —
 * better no block than a block with nothing in it, and the composer drops the
 * article from the day rather than showing an empty shell.
 */
export function articleForChapter(paperId: string, chapter: StudyChapter): TechArticle | null {
  const paper = getPaper(paperId)
  const areaLabel = paper?.areas.find((a) => a.code === chapter.area)?.label ?? chapter.area
  const brief = getTopicBrief(paperId, chapter.area)
  const hard = chapterHardness(chapter)
  const sections: ArticleSection[] = []

  // 1 · WHAT IS EXAMINED — the official study-guide references this chapter
  //     delivers, turned into a sentence about the exam rather than a code list.
  const refs = chapter.syllabusRefs ?? []
  sections.push({
    kind: "examined",
    heading: "What the examiner actually asks here",
    paragraphs: [
      `${chapter.title} is examined under ${paperId} area ${chapter.area} — ${areaLabel}${refs.length ? `, specifically study-guide outcomes ${refs.join(", ")}` : ""}. ${chapter.intro}`,
      hard.level === 3
        ? `This is one of the paper's demanding chapters: ${hard.why}. Expect it to appear as applied questions rather than recall — the examiner tests whether you can use it, not whether you can quote it.`
        : hard.level === 2
          ? `${hard.why}. Questions here usually give you a short scenario and ask for the judgement, so practise deciding rather than describing.`
          : `${hard.why}. The marks are straightforward if the definitions are precise, which is exactly why candidates who paraphrase lose them.`,
    ],
    bullets: chapter.outcomes.slice(0, 5),
  })

  // 2 · WHERE THE MARKS GO — the chapter's traps are the examiner's own known
  //     failure modes; the fix is what earns the mark.
  if (chapter.examTraps.length) {
    sections.push({
      kind: "traps",
      heading: "Where candidates lose the marks",
      paragraphs: [
        `Every distractor in a well-written objective test is a named error, not a random wrong number. These are the ones this topic is built on — read each trap, then read the fix, because the fix is the sentence that earns the mark.`,
      ],
      bullets: chapter.examTraps.slice(0, 6).map((t) => `${t.trap} → ${t.fix}`),
    })
  }

  // 3 · THE WORDING THAT EARNS MARKS — examinable definitions, verbatim.
  if (chapter.keyTerms.length) {
    sections.push({
      kind: "wording",
      heading: "The wording that earns the marks",
      paragraphs: [
        `Examiner reports say the same thing every sitting: candidates who know the idea still lose marks because they describe it in their own words and miss the examinable element. Learn these as written.`,
      ],
      bullets: chapter.keyTerms.slice(0, 6).map((t) => `${t.term} — ${t.def}`),
    })
  }

  // 4 · HOW IT IS TESTED IN CONTEXT — the area brief's traps/example sections
  //     give the wider exam framing this single chapter sits inside.
  const briefExample = brief?.sections.find((s) => s.kind === "example")
  const briefTraps = brief?.sections.find((s) => s.kind === "traps")
  if (briefExample || briefTraps) {
    sections.push({
      kind: "marks",
      heading: "How it turns up in a scenario",
      paragraphs: [briefExample?.body, briefTraps?.body].filter((b): b is string => Boolean(b)).slice(0, 2),
    })
  }

  // 5 · CONNECT IT FORWARD — where the topic reappears, which is what makes a
  //     technical article worth reading over a summary.
  if (chapter.furtherStudy?.length) {
    sections.push({
      kind: "connect",
      heading: "Where this comes back",
      paragraphs: [
        `Nothing in the ACCA syllabus is examined once. This topic reappears later, and recognising it there is worth more than re-learning it from scratch.`,
      ],
      bullets: chapter.furtherStudy.slice(0, 5),
    })
  }

  // 6 · CHECK YOURSELF — the chapter's knowledge diagnostic as prompts, so the
  //     article ends in retrieval rather than in reading.
  if (chapter.knowledgeDiagnostic?.length) {
    sections.push({
      kind: "recall",
      heading: "Close the article and answer these",
      paragraphs: [
        `Answer them out loud before you look. Retrieval is what moves a topic from recognised to known, and it takes ninety seconds.`,
      ],
      bullets: chapter.knowledgeDiagnostic.slice(0, 5).map((k) => k.q),
    })
  }

  // A chapter with only the first section is not an article.
  if (sections.length < 3) return null

  const official = officialResources(paperId).find((r) => /technical article/i.test(r.title))?.url ?? null

  return {
    id: `article-${chapterKey(chapter)}`,
    paper: paperId,
    area: chapter.area,
    chapterKey: chapterKey(chapter),
    title: `${chapter.title} — the examiner's view`,
    standfirst: `A technical read on the exact topic you studied today: what ${paperId} examines under ${chapter.area}, where the marks are lost, and the wording that wins them.`,
    minutes: readMinutes(sections),
    sections,
    officialUrl: official,
  }
}

/* ── Read tracking ────────────────────────────────────────────────*/

const KEY = "scholify-articles-read"

function read(): Record<string, string[]> {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as Record<string, string[]>
  } catch {
    /* ignore */
  }
  return {}
}

export function markArticleRead(paperId: string, articleId: string): void {
  try {
    const store = read()
    const list = new Set(store[paperId] ?? [])
    list.add(articleId)
    store[paperId] = [...list]
    window.localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    /* ignore */
  }
}

export function isArticleRead(paperId: string, articleId: string): boolean {
  return (read()[paperId] ?? []).includes(articleId)
}

export function articlesReadCount(paperId: string): number {
  return (read()[paperId] ?? []).length
}
