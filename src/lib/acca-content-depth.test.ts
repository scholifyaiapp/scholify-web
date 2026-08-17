import { describe, expect, it } from "vitest"
import { DEVELOPING_PAPERS, FULL_DEPTH_CHAPTERS, isDeveloping } from "@/lib/acca-content-depth"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { paperLevels } from "@/lib/acca-qualification"

/*
 * THE LABEL MUST NOT OUTLIVE THE PROBLEM IT DESCRIBES.
 *
 * DEVELOPING_PAPERS is a static list because chapter content is lazy-loaded per
 * paper and the picker cannot count chapters at render time. A static list
 * rots — so this recomputes it from the real content and fails if the two ever
 * disagree, in either direction:
 *
 *   · a paper marked "developing" that has since been rebuilt is now warning
 *     learners away from a finished course;
 *   · a paper NOT marked that is short is being sold as a full course, which is
 *     the failure the flag exists to prevent.
 *
 * When FM's rebuild lands, this test goes red until FM is removed from the list.
 * That is the intended workflow, not a nuisance.
 */

const ALL_PAPERS = paperLevels().flatMap((level) => level.papers.map((p) => p.id))

/*
 * Papers PART-WAY through a rebuild, where the chapter count has already passed
 * FULL_DEPTH_CHAPTERS but the course is still knowingly incomplete.
 *
 * The count is a proxy for depth and it is a good one at the start and the end of
 * a rebuild. It is unreliable in the middle: SBL is authored area by area, and
 * once Areas A to C landed it held 24 chapters while seven of its ten syllabus
 * areas were still served by the relabelling shim in acca-study-sbl-official.ts.
 * The proxy therefore says "finished" some weeks before the paper is, and
 * removing the flag on its word would tell learners a part-shim course was
 * complete — the exact misrepresentation the flag exists to prevent, arrived at
 * from the other direction.
 *
 * So a paper listed here stays flagged as developing despite its chapter count,
 * and the equality check below excludes it. Empty this list as each rebuild
 * finishes and delete the constant when it is no longer needed — an entry that
 * outlives its rebuild is the same rot this file was written to stop.
 */
const MID_REBUILD: readonly string[] = ["SBL"]

describe("the developing-paper flag tracks reality", () => {
  it("covers every paper in the qualification, once", () => {
    expect(new Set(ALL_PAPERS).size).toBe(ALL_PAPERS.length)
    for (const id of DEVELOPING_PAPERS) {
      expect(ALL_PAPERS, `${id} is flagged but is not an ACCA paper`).toContain(id)
    }
  })

  it("flags exactly the papers whose chapter count is short", () => {
    const short: string[] = []
    const full: string[] = []
    for (const id of ALL_PAPERS) {
      ;(chaptersForPaper(id).length < FULL_DEPTH_CHAPTERS ? short : full).push(id)
    }

    // The message names the papers, so a failure tells you what to edit rather
    // than that two arrays differ.
    expect([...short, ...MID_REBUILD].sort(), `papers under ${FULL_DEPTH_CHAPTERS} chapters`).toEqual([...DEVELOPING_PAPERS].sort())
    for (const id of full) {
      if (MID_REBUILD.includes(id)) continue
      expect(isDeveloping(id), `${id} is finished but still flagged as developing`).toBe(false)
    }
  })

  it("keeps the mid-rebuild exception honest", () => {
    for (const id of MID_REBUILD) {
      // An entry only earns its place while the paper is BOTH long enough to
      // fool the proxy and still flagged. If either half stops being true the
      // exception is stale and must go.
      expect(chaptersForPaper(id).length, `${id} no longer needs a mid-rebuild exception — it is short again`).toBeGreaterThanOrEqual(FULL_DEPTH_CHAPTERS)
      expect(isDeveloping(id), `${id} is listed as mid-rebuild but is not flagged as developing`).toBe(true)
    }
  })

  it("keeps at least the seven finished papers sellable", () => {
    // A regression that flagged everything would be "safe" and would also mean
    // there is nothing to sell. Guard the floor as well as the ceiling.
    const finished = ALL_PAPERS.filter((id) => !isDeveloping(id))
    expect(finished.length).toBeGreaterThanOrEqual(7)
    for (const id of ["BT", "MA", "FA"]) {
      expect(finished, `${id} must be sellable`).toContain(id)
    }
  })

  it("treats an unknown or missing paper as not developing", () => {
    // The picker calls this with a possibly-null current paper; it must not
    // decorate an empty selection with a warning.
    expect(isDeveloping(null)).toBe(false)
    expect(isDeveloping(undefined)).toBe(false)
    expect(isDeveloping("NOT_A_PAPER")).toBe(false)
  })
})
