import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
describe("APM September 2026–June 2027 restructured syllabus",()=>{
 /*
  * The official restructured syllabus has SIX areas, A–F. Area F —
  * employability and technology skills — was missing from this paper entirely
  * and is being authored as part of the rebuild; every other Strategic
  * Professional paper carries its equivalent. `areas` covers what the question
  * bank is mapped to; `chapterAreas` covers what the reading tree must deliver,
  * and gains "F" in the commit that authors it.
  */
 const areas=["A","B","C","D","E"]
 const chapterAreas=["A","B","C","D","E"]

 /*
  * The authored-tree ratchet. APM's rebuild replaces one area at a time, so
  * this records what has landed and forbids regression — raise an area's floor
  * in the commit that authors it. Areas still on 1 are the legacy composites
  * that acca-study-apm-official.ts assembles with `take()`.
  */
 const CHAPTER_FLOOR: Record<string, number> = {
  A: 14, // trees a + a2 — APM-01..14, one chapter per syllabus subsection group (A1 ×7, A2 ×3, A3 ×2, A4, A5)
  B: 1,  // legacy composite — performance optimisation
  C: 1,  // authored — performance reporting
  D: 1,  // authored — data science and technology
  E: 1,  // authored — professional skills
 }

 it("covers every official area in questions and chapters",()=>{expect(new Set(getQuestions("APM").map(x=>x.area))).toEqual(new Set(areas));expect([...new Set(chaptersForPaper("APM").map(x=>x.area))].sort()).toEqual(chapterAreas)})

 it("keeps the authored chapter tree from regressing",()=>{
  for(const area of chapterAreas){
   const count=chaptersForPaper("APM").filter(x=>x.area===area).length
   expect(count,`APM area ${area} chapter count`).toBeGreaterThanOrEqual(CHAPTER_FLOOR[area])
  }
 })

 it("gives every authored tree chapter a stable id, number and syllabus references",()=>{
  // The legacy composites carry none of these, which is how you tell an
  // authored area from one still awaiting its rebuild.
  const authored=chaptersForPaper("APM").filter(x=>x.id?.startsWith("APM-"))
  expect(authored.length).toBeGreaterThanOrEqual(14)
  const numbers=new Set<number>()
  for(const chapter of authored){
   expect(typeof chapter.number,`${chapter.id} number`).toBe("number")
   expect(chapter.syllabusRefs?.length ?? 0,`${chapter.id} syllabusRefs`).toBeGreaterThan(0)
   expect(numbers.has(chapter.number as number),`${chapter.id} duplicate number`).toBe(false)
   numbers.add(chapter.number as number)
  }
 })

 it("teaches the Area A subsections the composite omitted",()=>{
  // A5 (sustainability) had no coverage at all, and A2/A4 were thin.
  const areaA=JSON.stringify(chaptersForPaper("APM").filter(x=>x.area==="A")).toLowerCase()
  for(const term of ["sustainability","integrated reporting","contingent","mendelow","performance pyramid","planning gap","brand loyalty"]){
   expect(areaA,`Area A should teach ${term}`).toContain(term)
  }
 })
 it("provides written practice for reporting, data science and professional skills",()=>{const represented=new Set(getWrittenQuestions("APM").map(x=>x.area));for(const area of ["C","D","E"])expect(represented.has(area)).toBe(true)})
 it("covers the analytics ladder and responsible AI",()=>{const text=JSON.stringify(chaptersForPaper("APM").find(x=>x.area==="D")).toLowerCase();for(const term of ["descriptive","diagnostic","predictive","prescriptive","overfitting","bias","human oversight"])expect(text).toContain(term)})
 it("tests performance reports as decision products",()=>{const text=JSON.stringify(chaptersForPaper("APM").find(x=>x.area==="C")).toLowerCase();for(const term of ["user","comparability","information overload","visual","narrative commentary"])expect(text).toContain(term)})
 it("builds three distinct exact 100-mark compulsory mocks",()=>{
  const seen=new Set<string>()
  for(const form of [1,2,3]){
   const mock=buildCbeMock("APM",form)
   expect(mock.totalMarks).toBe(100)
   expect(mock.sections.map(section=>section.marks)).toEqual([50,50])
   const tasks=mock.sections.flatMap(section=>section.items.flatMap(item=>item.kind==="task"?[item.task]:[]))
   expect(tasks.map(task=>task.maxMarks)).toEqual([50,25,25])
   for(const task of tasks){expect(seen.has(task.id)).toBe(false);seen.add(task.id)}
  }
 })
})
