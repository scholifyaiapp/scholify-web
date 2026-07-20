import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"
const legacy=(area:string)=>({A:"A",B:"A",C:"A",D:"A",E:"D"} as Record<string,string>)[area]??area
const official=(id:string)=>/^ATX-[BCE]-(?:O|FC|W)/.test(id)
const obsolete=(x:unknown)=>{const text=JSON.stringify(x).toLowerCase();return text.includes("remittance basis")||text.includes("non-domicil")||text.includes("13.8%")||text.includes("furnished holiday let")||text.includes("investors' relief")||text.includes("business asset disposal relief")||text.includes("badr gives a 10%")||text.includes("other gains at 10%/20%")}
const refreshYear=<T>(x:T):T=>JSON.parse(JSON.stringify(x).replaceAll("FA2024/25","FA2025/26").replaceAll("2024/25","2025/26")) as T
export const mapAtxQuestionsToOfficialSyllabus=(xs:AccaQuestion[])=>xs.filter(x=>!obsolete(x)).map(refreshYear).map(x=>official(x.id)?x:{...x,area:legacy(x.area)})
export const mapAtxFlashcardsToOfficialSyllabus=(xs:Flashcard[])=>xs.filter(x=>!obsolete(x)).map(refreshYear).map(x=>official(x.id)?x:{...x,area:legacy(x.area)})
export const mapAtxWrittenToOfficialSyllabus=(xs:WrittenQuestion[])=>xs.filter(x=>!obsolete(x)).map(refreshYear).map(x=>official(x.id)?x:{...x,area:legacy(x.area)})
