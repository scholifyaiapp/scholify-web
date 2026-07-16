/*
 * Scholify — the sectioned CBE mock composer.
 *
 * Composes a full mock in the OFFICIAL shape of a paper's computer-based exam
 * (see acca-exam-structure.ts): Section A objective test, Section B OT cases,
 * Section C constructed response — one exam clock across the lot, priced at
 * the official minutes-per-mark.
 *
 * Composition is MARKS-DRIVEN off the blueprint, so it degrades honestly:
 *  · "ot" sections draw standalone OTs from the paper's mock FORM (the same
 *    three disjoint, area-balanced forms as before — Form N stays Form N).
 *  · "otcase" sections use the paper's AUTHORED cases (acca-cases-*.ts) when
 *    they exist. When they don't, the section falls back to standalone OTs
 *    and SAYS SO — a case is never faked by grouping loose questions.
 *  · "constructed" sections draw tasks from the written bank, filled greedily
 *    to the section's marks.
 * A section that composes to zero items is dropped; total marks and the clock
 * scale to what was actually composed, so a shallow bank never fakes a
 * 100-mark sitting.
 */

import type { AccaQuestion, OtCase } from "@/lib/acca-content"
import { otCaseMarks } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getOtCases } from "@/lib/acca-cases"
import { buildMockForm } from "@/lib/acca-mockforms"
import { examBlueprint, examSecondsFor, type SectionKind } from "@/lib/acca-exam-structure"

export type CbeItem =
  | { kind: "ot"; q: AccaQuestion }
  | {
      kind: "caseq"
      /** The shared scenario this question reads against. */
      caseRef: OtCase
      q: AccaQuestion
      /** Position within the case, e.g. question 2 of 5. */
      caseQIndex: number
      caseQTotal: number
    }
  | { kind: "task"; task: WrittenQuestion }

export interface CbeSection {
  id: "A" | "B" | "C"
  kind: SectionKind
  /** Honest makeup of the COMPOSED section (not the blueprint's prose). */
  label: string
  /** Marks actually composed into this section. */
  marks: number
  /** True when an otcase section had no authored cases and fell back to OTs. */
  otFallback?: boolean
  items: CbeItem[]
}

export interface CbeMock {
  paperId: string
  form: number
  sections: CbeSection[]
  totalMarks: number
  /** One exam clock for the whole sitting, at the official min/mark. */
  seconds: number
  itemCount: number
}

/** Same LCG shuffle as the rest of the engine — deterministic per seed. */
function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed || 1
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function paperSeed(paperId: string): number {
  let h = 7
  for (const ch of paperId) h = (h * 31 + ch.charCodeAt(0)) & 0x7fffffff
  return h
}

/** Draw standalone OTs from the pool until `marks` is filled (or pool dry). */
function drawOts(pool: AccaQuestion[], marks: number): AccaQuestion[] {
  const out: AccaQuestion[] = []
  let sum = 0
  while (pool.length && sum < marks) {
    const q = pool.shift()!
    // Never overshoot the section by more than a question's slack.
    if (sum + q.marks > marks && out.length > 0) break
    out.push(q)
    sum += q.marks
  }
  return out
}

/**
 * Compose the sectioned CBE mock for a paper and form (1–3). Section A keeps
 * the paper's disjoint mock-form identity; cases and written tasks rotate with
 * the form where the banks are deep enough to allow it.
 */
export function buildCbeMock(paperId: string, form: number): CbeMock {
  const bp = examBlueprint(paperId)
  const empty: CbeMock = { paperId, form, sections: [], totalMarks: 0, seconds: 0, itemCount: 0 }
  if (!bp) return empty

  // How many marks of standalone OTs the whole mock needs (ot sections plus
  // any otcase fallback), so ONE form supplies both without overlap.
  const cases = getOtCases(paperId)
  const otMarksNeeded = bp.sections.reduce((sum, s) => {
    if (s.kind === "ot") return sum + s.marks
    if (s.kind === "otcase" && cases.length === 0) return sum + s.marks
    return sum
  }, 0)
  // Bank OTs are 1–3 marks; assume 1-mark worst case won't happen at scale —
  // request generously, buildMockForm caps at what the form actually holds.
  const pool = otMarksNeeded > 0 ? [...buildMockForm(paperId, form, Math.ceil(otMarksNeeded / 2) + 6)] : []

  const written = shuffle(getWrittenQuestions(paperId), paperSeed(paperId) * 17 + form * 131)
  // Rotate authored cases with the form so repeat sitters see variety once
  // the case bank outgrows one sitting's worth.
  const rotatedCases = cases.length ? [...cases.slice((form - 1) % cases.length), ...cases.slice(0, (form - 1) % cases.length)] : []
  let caseCursor = 0

  const sections: CbeSection[] = []
  for (const s of bp.sections) {
    if (s.kind === "ot" || (s.kind === "otcase" && rotatedCases.length === 0)) {
      const qs = drawOts(pool, s.marks)
      if (!qs.length) continue
      const marks = qs.reduce((a, q) => a + q.marks, 0)
      const allTwo = qs.every((q) => q.marks === qs[0].marks)
      sections.push({
        id: s.id,
        kind: s.kind,
        otFallback: s.kind === "otcase" || undefined,
        label: allTwo ? `${qs.length} objective questions × ${qs[0].marks} marks` : `${qs.length} objective questions · ${marks} marks`,
        marks,
        items: qs.map((q) => ({ kind: "ot" as const, q })),
      })
    } else if (s.kind === "otcase") {
      const picked: OtCase[] = []
      let sum = 0
      while (caseCursor < rotatedCases.length && sum < s.marks) {
        const c = rotatedCases[caseCursor++]
        picked.push(c)
        sum += otCaseMarks(c)
      }
      // Top up with standalone OTs if the authored set can't fill the section.
      const topUp = sum < s.marks ? drawOts(pool, s.marks - sum) : []
      const items: CbeItem[] = picked.flatMap((c) =>
        c.questions.map((q, i) => ({ kind: "caseq" as const, caseRef: c, q, caseQIndex: i + 1, caseQTotal: c.questions.length })),
      )
      for (const q of topUp) items.push({ kind: "ot", q })
      if (!items.length) continue
      const marks = sum + topUp.reduce((a, q) => a + q.marks, 0)
      sections.push({
        id: s.id,
        kind: s.kind,
        label:
          `${picked.length} case${picked.length === 1 ? "" : "s"} · ${marks} marks` +
          (topUp.length ? ` (incl. ${topUp.length} standalone questions)` : ""),
        marks,
        items,
      })
    } else {
      // Constructed response: fill the section's marks greedily from the
      // written bank — a small overshoot beats a 20-mark hole.
      const tasks: WrittenQuestion[] = []
      let sum = 0
      for (const w of written) {
        if (tasks.length && sum >= s.marks - 4) break
        if (sum + w.maxMarks > s.marks + 5) continue
        if (tasks.some((t) => t.id === w.id)) continue
        tasks.push(w)
        sum += w.maxMarks
        if (sum >= s.marks) break
      }
      // Remove picked tasks from the shared list so a second constructed
      // section (SBR/AFM/… have two) never repeats a task.
      for (const t of tasks) written.splice(written.indexOf(t), 1)
      if (!tasks.length) continue
      sections.push({
        id: s.id,
        kind: s.kind,
        label: `${tasks.length} constructed task${tasks.length === 1 ? "" : "s"} · ${sum} marks`,
        marks: sum,
        items: tasks.map((task) => ({ kind: "task" as const, task })),
      })
    }
  }

  const totalMarks = sections.reduce((a, s) => a + s.marks, 0)
  return {
    paperId,
    form,
    sections,
    totalMarks,
    seconds: examSecondsFor(paperId, totalMarks),
    itemCount: sections.reduce((a, s) => a + s.items.length, 0),
  }
}

/** Marks earned/available on the objective items only (OTs + case questions). */
export function cbeObjectiveMarks(mock: CbeMock): number {
  return mock.sections.reduce(
    (a, s) => a + s.items.reduce((b, it) => b + (it.kind === "task" ? 0 : it.q.marks), 0),
    0,
  )
}
