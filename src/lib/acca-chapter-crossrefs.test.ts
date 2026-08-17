import { describe, expect, it } from "vitest"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { paperLevels } from "@/lib/acca-qualification"

/*
 * A CHAPTER CROSS-REFERENCE MUST POINT AT A CHAPTER THAT EXISTS.
 *
 * `furtherStudy` is learner-facing navigation — "SBL-38 covers managing strategic
 * change" — so a stale id sends someone to the wrong chapter, or to nothing.
 * These strings rot easily and silently: they are written while an area is being
 * authored, and the numbering of LATER areas is not settled until those areas
 * land. SBL's rebuild is the case in point. Areas A to D were written against a
 * planned layout, Area G grew from three chapters to four once the source text
 * showed it was the biggest chapter in the paper, and every reference to Areas
 * E–J written before that shifted by one or more.
 *
 * Nothing else catches this. Typecheck cannot: they are strings. The reader
 * renders them as plain text, so a wrong number looks exactly like a right one.
 *
 * The check is deliberately restricted to references to the SAME paper, because
 * `furtherStudy` legitimately mentions other papers and modules by name ("SBR
 * develops the financial reporting side", "the Ethics and Professional Skills
 * module") and those are not chapter ids.
 */

const ALL_PAPERS = paperLevels().flatMap((level) => level.papers.map((p) => p.id))

describe("chapter cross-references resolve", () => {
  it("every furtherStudy reference to this paper's own chapters points at a real chapter", () => {
    const broken: string[] = []
    let checked = 0

    for (const paper of ALL_PAPERS) {
      const chapters = chaptersForPaper(paper)
      const ids = new Set(chapters.map((c) => c.id).filter((id): id is string => Boolean(id)))
      if (ids.size === 0) continue // paper still on one-chapter-per-area, nothing to check

      // e.g. /\bSBL-\d+\b/g — this paper's own chapter-id shape.
      const pattern = new RegExp(`\\b${paper}-\\d+\\b`, "g")

      for (const chapter of chapters) {
        for (const entry of chapter.furtherStudy ?? []) {
          for (const ref of entry.match(pattern) ?? []) {
            checked++
            if (!ids.has(ref)) broken.push(`${chapter.id ?? chapter.area}: "${entry}" → ${ref} does not exist`)
          }
        }
      }
    }

    /*
     * A cross-reference check that matches nothing passes silently and is worse
     * than no check at all — it reports the library as sound while looking at an
     * empty set. That is not hypothetical: the first draft of this test was
     * verified with a probe whose regex escaping had been mangled, so it reported
     * zero references across 184 SBL entries and looked like a clean pass.
     * SBL alone carries well over a hundred, so this floor fails loudly if the
     * pattern ever stops matching.
     */
    expect(checked, "references actually examined").toBeGreaterThan(100)

    if (broken.length) console.log(`BROKEN CROSS-REFERENCES (${broken.length}):\n` + broken.join("\n"))
    expect(broken).toEqual([])
  })

  it("no chapter points at itself as further study", () => {
    // Harmless but pointless, and usually a copy-paste artefact that means the
    // reference it replaced has been lost.
    const selfRefs: string[] = []
    for (const paper of ALL_PAPERS) {
      for (const chapter of chaptersForPaper(paper)) {
        if (!chapter.id) continue
        for (const entry of chapter.furtherStudy ?? []) {
          if (new RegExp(`\\b${chapter.id}\\b`).test(entry)) selfRefs.push(`${chapter.id}: "${entry}"`)
        }
      }
    }
    if (selfRefs.length) console.log("SELF-REFERENCES:\n" + selfRefs.join("\n"))
    expect(selfRefs).toEqual([])
  })
})
