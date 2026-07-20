import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"
describe("APM September 2026–June 2027 restructured syllabus",()=>{
 const areas=["A","B","C","D","E"]
 it("covers all five official areas",()=>{expect(new Set(getQuestions("APM").map(x=>x.area))).toEqual(new Set(areas));expect(chaptersForPaper("APM").map(x=>x.area).sort()).toEqual(areas)})
 it("provides written practice for reporting, data science and professional skills",()=>{const represented=new Set(getWrittenQuestions("APM").map(x=>x.area));for(const area of ["C","D","E"])expect(represented.has(area)).toBe(true)})
 it("covers the analytics ladder and responsible AI",()=>{const text=JSON.stringify(chaptersForPaper("APM").find(x=>x.area==="D")).toLowerCase();for(const term of ["descriptive","diagnostic","predictive","prescriptive","overfitting","bias","human oversight"])expect(text).toContain(term)})
 it("tests performance reports as decision products",()=>{const text=JSON.stringify(chaptersForPaper("APM").find(x=>x.area==="C")).toLowerCase();for(const term of ["user","comparability","information overload","visual","narrative commentary"])expect(text).toContain(term)})
})
