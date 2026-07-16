/*
 * Scholify — OFFICIAL ACCA study resources, per paper.
 *
 * The study hub's fifth category: links out to ACCA's own technical articles
 * (written by the examining teams — the closest thing to hearing the examiner
 * think) and examiner reports. These complement Scholify's chapters; they
 * never replace them.
 *
 * Every URL pattern below was verified live against accaglobal.com
 * (2026-07-16, all 200): Applied Knowledge & Skills papers live under the
 * legacy F-codes, SBL/SBR under named slugs, and the four Options papers
 * still under the legacy P-codes.
 */

export interface OfficialResource {
  title: string
  detail: string
  url: string
}

const BASE = "https://www.accaglobal.com/gb/en/student/exam-support-resources"

/** accaglobal.com study-resources path segment for each paper. */
const PAPER_PATH: Record<string, string> = {
  BT: "fundamentals-exams-study-resources/f1",
  MA: "fundamentals-exams-study-resources/f2",
  FA: "fundamentals-exams-study-resources/f3",
  LW: "fundamentals-exams-study-resources/f4",
  PM: "fundamentals-exams-study-resources/f5",
  TX: "fundamentals-exams-study-resources/f6",
  FR: "fundamentals-exams-study-resources/f7",
  AA: "fundamentals-exams-study-resources/f8",
  FM: "fundamentals-exams-study-resources/f9",
  SBL: "professional-exams-study-resources/strategic-business-leader",
  SBR: "professional-exams-study-resources/strategic-business-reporting",
  AFM: "professional-exams-study-resources/p4",
  APM: "professional-exams-study-resources/p5",
  ATX: "professional-exams-study-resources/p6",
  AAA: "professional-exams-study-resources/p7",
}

/** The official links for a paper — empty for an unknown id. */
export function officialResources(paperId: string): OfficialResource[] {
  const path = PAPER_PATH[paperId]
  if (!path) return []
  return [
    {
      title: `${paperId} technical articles`,
      detail: "Topic explainers written by ACCA's examining team — read the one for the area you're studying",
      url: `${BASE}/${path}/technical-articles.html`,
    },
    {
      title: `${paperId} examiner reports`,
      detail: "What the examiner said real candidates got wrong, sitting by sitting",
      url: `${BASE}/${path}/examiners-reports.html`,
    },
    {
      title: "ACCA study resources hub",
      detail: "Everything official in one place — syllabus, study guide, specimen exams",
      url: `${BASE}.html`,
    },
  ]
}
