import React from "react"
import { BarChart3, BookOpen, Check, ChevronRight, Clock3, Flame, Sparkles, Target, Trophy } from "lucide-react"
import {
  type ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel"

const Shell = ({ children, step }: { children: React.ReactNode; step: string }) => (
  <div className="h-full bg-[#f8f5f2] px-4 pb-6 pt-14 font-sans text-[#201b1a]">
    <div className="mb-5 flex items-center justify-between">
      <div className="text-[13px] font-black tracking-[-.04em]">SCHOLIFY<span className="text-[#c80000]">.</span></div>
      <div className="rounded-full bg-white px-2.5 py-1 text-[7px] font-extrabold tracking-[.12em] text-[#8e817b] shadow-sm">{step}</div>
    </div>
    {children}
  </div>
)

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[18px] border border-black/[.055] bg-white p-4 shadow-[0_12px_30px_-22px_rgba(40,20,20,.35)] ${className}`}>{children}</div>
)

const exampleImages: ImageItem[] = [
  {
    alt: "Scholify mobile onboarding paper selection",
    content: <Shell step="01 / 04">
      <div className="mb-1 text-[9px] font-extrabold uppercase tracking-[.14em] text-[#c80000]">Build your route</div>
      <h3 className="text-[25px] font-black leading-[1.02] tracking-[-.055em]">Which paper are you preparing for?</h3>
      <p className="mt-2 text-[10px] leading-4 text-[#8e817b]">Charles will shape your plan around the paper and exam date.</p>
      <div className="mt-5 space-y-2">
        {["Financial Reporting", "Audit & Assurance", "Performance Management"].map((paper, i) => <div key={paper} className={`flex items-center gap-3 rounded-2xl border p-3 ${i === 0 ? "border-[#c80000] bg-[#fff1ef]" : "border-black/[.06] bg-white"}`}><div className={`grid size-8 place-items-center rounded-xl ${i === 0 ? "bg-[#c80000] text-white" : "bg-[#f2eeeb] text-[#8e817b]"}`}><BookOpen size={14}/></div><div className="flex-1"><b className="block text-[10px]">{paper}</b><span className="text-[8px] text-[#8e817b]">ACCA · Applied Skills</span></div>{i === 0 && <Check size={14} className="text-[#c80000]"/>}</div>)}
      </div>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#171319] py-3 text-[10px] font-extrabold text-white">Continue <ChevronRight size={13}/></button>
    </Shell>,
  },
  {
    alt: "Scholify mobile daily study plan dashboard",
    content: <Shell step="TODAY">
      <div className="flex items-end justify-between"><div><div className="text-[9px] font-bold text-[#8e817b]">Good morning, Alex</div><h3 className="mt-1 text-[24px] font-black tracking-[-.055em]">Today’s mission</h3></div><div className="flex items-center gap-1 rounded-full bg-[#fff1df] px-2 py-1 text-[8px] font-black text-[#d27c00]"><Flame size={11}/> 12</div></div>
      <Card className="mt-4 bg-gradient-to-br from-[#21191c] to-[#4b090d] text-white">
        <div className="flex justify-between text-[8px] font-bold text-white/55"><span>FR · REVENUE</span><span>32 MIN</span></div>
        <div className="mt-3 text-[17px] font-black tracking-[-.04em]">Master IFRS 15</div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#ef2b20] to-[#f4a405]"/></div>
        <div className="mt-2 text-[8px] text-white/55">2 of 4 tasks complete</div>
      </Card>
      <div className="mt-4 space-y-2">
        {[{Icon:BookOpen,title:"Topic brief",sub:"8 min",done:true},{Icon:Target,title:"Guided practice",sub:"10 questions",done:false},{Icon:Sparkles,title:"Charles review",sub:"Weak areas",done:false}].map(({Icon,title,sub,done}) => <Card key={title} className="flex items-center gap-3 !p-3"><div className={`grid size-9 place-items-center rounded-xl ${done ? "bg-[#ddfaf4] text-[#168c7d]" : "bg-[#f2eeeb] text-[#5c4f4a]"}`}><Icon size={15}/></div><div className="flex-1"><b className="block text-[10px]">{title}</b><span className="text-[8px] text-[#8e817b]">{sub}</span></div>{done ? <Check size={14} className="text-[#168c7d]"/> : <ChevronRight size={14} className="text-[#b9aca5]"/>}</Card>)}
      </div>
    </Shell>,
  },
  {
    alt: "Scholify mobile ACCA question practice interface",
    content: <Shell step="04 / 10">
      <div className="flex items-center justify-between text-[8px] font-bold text-[#8e817b]"><span>FINANCIAL REPORTING</span><span className="flex items-center gap-1"><Clock3 size={10}/> 12:46</span></div>
      <div className="mt-3 h-1.5 rounded-full bg-black/[.06]"><div className="h-full w-[40%] rounded-full bg-[#c80000]"/></div>
      <h3 className="mt-5 text-[16px] font-extrabold leading-[1.3] tracking-[-.025em]">Which amount should be recognised as revenue at year end?</h3>
      <Card className="mt-3 !p-3"><p className="text-[9px] leading-[1.55] text-[#5c4f4a]">Arlo Co signed a £120,000 contract on 1 October. Performance is satisfied evenly over 12 months.</p></Card>
      <div className="mt-3 space-y-2">{["£30,000","£40,000","£90,000","£120,000"].map((answer, i) => <button key={answer} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left text-[10px] font-bold ${i === 0 ? "border-[#c80000] bg-[#fff1ef]" : "border-black/[.06] bg-white"}`}><span className={`grid size-6 place-items-center rounded-full text-[8px] ${i === 0 ? "bg-[#c80000] text-white" : "bg-[#f2eeeb] text-[#8e817b]"}`}>{String.fromCharCode(65+i)}</span>{answer}</button>)}</div>
      <button className="mt-4 w-full rounded-2xl bg-[#171319] py-3 text-[10px] font-extrabold text-white">Check answer</button>
    </Shell>,
  },
  {
    alt: "Scholify mobile exam readiness analytics",
    content: <Shell step="PROGRESS">
      <div className="text-[9px] font-extrabold uppercase tracking-[.14em] text-[#c80000]">Exam intelligence</div><h3 className="mt-1 text-[24px] font-black tracking-[-.055em]">Your readiness</h3>
      <Card className="mt-4 text-center">
        <div className="relative mx-auto grid size-32 place-items-center rounded-full bg-[conic-gradient(#c80000_0_72%,#efe9e6_72%)]"><div className="grid size-[106px] place-items-center rounded-full bg-white"><div><div className="text-[29px] font-black tracking-[-.06em]">72%</div><div className="text-[7px] font-extrabold tracking-[.1em] text-[#8e817b]">EXAM READY</div></div></div></div>
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#ddfaf4] px-2 py-1 text-[8px] font-black text-[#168c7d]"><Trophy size={10}/> +8% this week</div>
      </Card>
      <div className="mt-3 grid grid-cols-2 gap-2"><Card className="!p-3"><BarChart3 size={14} className="text-[#c80000]"/><b className="mt-2 block text-[16px]">186</b><span className="text-[7px] text-[#8e817b]">Questions answered</span></Card><Card className="!p-3"><Target size={14} className="text-[#e50068]"/><b className="mt-2 block text-[16px]">68%</b><span className="text-[7px] text-[#8e817b]">Average accuracy</span></Card></div>
      <Card className="mt-3"><div className="mb-3 text-[9px] font-extrabold">Topic mastery</div>{[["Revenue",84],["Leases",71],["Groups",52]].map(([topic,score]) => <div key={String(topic)} className="mb-2"><div className="mb-1 flex justify-between text-[8px]"><span>{topic}</span><b>{score}%</b></div><div className="h-1.5 rounded-full bg-black/[.06]"><div className="h-full rounded-full bg-gradient-to-r from-[#c80000] to-[#e50068]" style={{width:`${score}%`}}/></div></div>)}</Card>
    </Shell>,
  },
]

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />
}
