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
import { authoredOutsideForm, buildMockForm, MOCK_FORMS } from "@/lib/acca-mockforms"
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

/** Find a deterministic subset whose marks equal the section exactly. */
function exactWrittenTasks(pool: WrittenQuestion[], target: number): WrittenQuestion[] | null {
  const sums = new Map<number, WrittenQuestion[]>([[0, []]])
  for (const task of pool) {
    const snapshot = [...sums.entries()].sort((a, b) => b[0] - a[0])
    for (const [sum, picked] of snapshot) {
      const next = sum + task.maxMarks
      if (next > target || sums.has(next)) continue
      const selection = [...picked, task]
      if (next === target) return selection
      sums.set(next, selection)
    }
  }
  return null
}

/** Draw standalone OTs from the pool until `marks` is filled (or pool dry). */
export function drawOts(pool: AccaQuestion[], marks: number): AccaQuestion[] {
  const out: AccaQuestion[] = []
  let sum = 0
  while (pool.length && sum < marks) {
    /*
     * Take the first question that still FITS, rather than stopping at the head of the
     * pool.
     *
     * On a paper whose Section A mixes mark values this matters: LW's is 25 two-mark
     * plus 20 one-mark questions, so the head of the pool is often a 2-mark question at
     * the point where only 1 mark of the section remains. Stopping there left the
     * section composing to 69 of 70 marks — a mock that could never total 100. Scanning
     * past the question that does not fit finds the 1-mark one that completes the
     * section exactly, and on a uniform bank the scan always matches at index 0, so
     * nothing changes for the papers that were already exact.
     */
    const index = pool.findIndex((q) => sum + q.marks <= marks)
    if (index === -1) {
      /*
       * Nothing left fits. A section must still get at least one item rather than
       * compose to nothing, so take the head in that case. Otherwise leave the
       * remainder alone: `pool` is shared across every section drawn from the same call
       * site, and a question that overshoots THIS section may be exactly what the next
       * one needs.
       */
      if (out.length === 0) {
        const q = pool.shift()!
        out.push(q)
        sum += q.marks
      }
      break
    }
    const [q] = pool.splice(index, 1)
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
  //
  // Authored questions are drawn before derived recall drills (see
  // AccaQuestion.recall): a mock is the learner's dress rehearsal and its score
  // gates the exam-readiness loop, so it must not be padded with glossary
  // prompts that are far easier than the real sitting. Recall items stay in the
  // pool as a last resort for thin banks rather than leaving a hole in a section.
  // Size the request for the WORST case — every OT worth 1 mark — not the average.
  // The old `otMarksNeeded / 2 + 6` assumed 2 marks apiece, so on papers with
  // 1-mark questions the pool arrived short of the section's marks even though the
  // form held plenty more. drawOts only consumes what each section needs and the
  // remainder stays in the pool for the next one, so asking for more costs nothing.
  const rawPool = otMarksNeeded > 0 ? buildMockForm(paperId, form, otMarksNeeded + 6) : []
  const authoredHere = rawPool.filter((q) => !q.recall)
  const recallHere = rawPool.filter((q) => q.recall)
  // Draw order: this form's authored questions, then authored questions borrowed
  // from the OTHER forms, and only then derived recall drills.
  //
  // The borrow step exists for papers whose authored bank cannot fill three
  // disjoint forms — see authoredOutsideForm. On every paper with a deep enough
  // bank the borrow list is never reached, so forms stay strictly disjoint there;
  // it only engages where the alternative was padding a graded mock with glossary
  // prompts.
  const authoredMarks = authoredHere.reduce((sum, q) => sum + q.marks, 0)
  const borrowed = authoredMarks >= otMarksNeeded
    ? []
    : authoredOutsideForm(paperId, form, new Set(rawPool.map((q) => q.id)))
  const pool = [...authoredHere, ...borrowed, ...recallHere]

  /*
   * Written tasks are BLOCK-ROTATED by form, for exactly the reason the cases are
   * (see the comment below) — and until 19 Aug 2026 they were not.
   *
   * This shuffled the whole bank with a seed that included the form. That gives three
   * INDEPENDENT draws, not three DISJOINT ones, so the same task could appear in more
   * than one form of the same paper. It did: 11 repeats across the library, all of them
   * written tasks — SBL-G-W01 and TXW-04 each appeared in ALL THREE forms of their
   * paper, so a candidate sitting the full set met them three times.
   *
   * It was a selection defect, not a bank-depth one. Every paper's written bank holds
   * enough for three disjoint sittings, the shallowest by a factor of two: PM, TX and FR
   * carry 200–300 task marks against the 120 three forms consume.
   *
   * The order is now fixed by a PAPER-ONLY seed so the blocks are stable across forms,
   * and form f starts at block f with the remaining blocks following as fallback. This
   * matters more than a plain shuffle would suggest, because exactWrittenTasks returns
   * the FIRST exact combination it finds walking the pool in order — so pool order alone
   * decides the answer, and a form-independent order was bound to return the same tasks.
   */
  const writtenAll = shuffle(getWrittenQuestions(paperId), paperSeed(paperId) * 17)
  const writtenBlock = Math.ceil(writtenAll.length / MOCK_FORMS)
  const writtenStart = (((Math.max(1, form) - 1) % MOCK_FORMS) * writtenBlock) % Math.max(1, writtenAll.length)
  const written = [...writtenAll.slice(writtenStart), ...writtenAll.slice(0, writtenStart)]
  /*
   * Rotate authored cases with the form so repeat sitters see variety once the case
   * bank outgrows one sitting's worth.
   *
   * The offset is a whole SITTING's worth of cases, not one case. Rotating by
   * (form − 1) advanced the list by a single case per form, so a paper whose Section B
   * takes five cases drew 0–4, then 1–5, then 2–6 — the three forms overlapped almost
   * completely and cases 7 onward were never reachable. Every paper with an authored
   * MTQ bank was affected, and each of their contract files claims three DISJOINT
   * sittings: BT 18 units of 4 marks, MA 9 of 10, FA 6 of 15, LW-Global 15 of 6. Only
   * now is that claim actually true.
   *
   * ceil(cases / MOCK_FORMS) is the block size, so form 1 takes the first block, form 2
   * the second and form 3 the third. Where the bank is not an exact multiple the last
   * block wraps, which is the honest degradation — a short bank cannot give three
   * disjoint sittings, and wrapping repeats a case rather than leaving a hole.
   */
  const blockSize = cases.length ? Math.ceil(cases.length / MOCK_FORMS) : 0
  const offset = cases.length ? ((form - 1) * blockSize) % cases.length : 0
  const rotatedCases = cases.length ? [...cases.slice(offset), ...cases.slice(0, offset)] : []
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
      if (paperId === "SBR" || paperId === "AFM" || paperId === "APM" || paperId === "ATX" || paperId === "AAA") {
        const requiredMarks =
          paperId === "SBR"
            ? s.id === "A" ? [30, 20] : [25, 25]
            : s.id === "A" ? [50] : [25, 25]
        const occurrence = new Map<number, number>()
        for (const marks of requiredMarks) {
          const ordinal = occurrence.get(marks) ?? 0
          occurrence.set(marks, ordinal + 1)
          const candidates = getWrittenQuestions(paperId)
            .filter((item) => item.maxMarks === marks)
            .sort((a, b) => a.id.localeCompare(b.id))
          const formIndex = Math.max(1, form) - 1
          const selectedIndex = marks === 25 ? formIndex * 2 + ordinal : formIndex
          const selected = candidates[selectedIndex % Math.max(1, candidates.length)]
          if (selected) {
            tasks.push(selected)
            sum += selected.maxMarks
          }
        }
      } else {
        const exact = exactWrittenTasks(written, s.marks)
        if (exact) {
          tasks.push(...exact)
          sum = s.marks
        } else {
          for (const w of written) {
            if (tasks.length && sum >= s.marks - 4) break
            if (sum + w.maxMarks > s.marks + 5) continue
            if (tasks.some((t) => t.id === w.id)) continue
            tasks.push(w)
            sum += w.maxMarks
            if (sum >= s.marks) break
          }
        }
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
