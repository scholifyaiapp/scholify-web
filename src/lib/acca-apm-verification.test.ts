import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
describe("APM September 2026–June 2027 restructured syllabus",()=>{
 const areas=["A","B","C","D","E"]
 it("covers all five official areas",()=>{expect(new Set(getQuestions("APM").map(x=>x.area))).toEqual(new Set(areas));expect(chaptersForPaper("APM").map(x=>x.area).sort()).toEqual(areas)})
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
