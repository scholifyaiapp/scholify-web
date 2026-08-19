import React from "react"
import { BarChart3, BookOpen, Check, ChevronRight, Flame, GraduationCap, Lock, Pencil, Settings2, Timer, Zap } from "lucide-react"
import {
  type ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel"

/*
 * THE PHONE SHOWS THE REAL APP. These five screens are miniatures of the five
 * internal surfaces a signed-in student actually uses — Dashboard, Learn,
 * Practice, Progress, Settings — drawn with the app's own tokens (warm cream
 * #f7f3f1 page, white cards, #C80000 brand, the green/amber bands) and the
 * app's own data shapes (the composed mission, the mock gate at 60%, area
 * mastery meters, the study-day chips). The previous set showed onboarding
 * and a chat screen that don't exist in this form in the product; a visitor
 * comparing the teaser with the real app should recognise every pixel.
 *
 * Two rules hold this file together:
 *
 * 1. NOTHING IN HERE IS INTERACTIVE. It is a picture of an app, so every
 *    control is a <div>. Real <button>s would each take a tab stop and answer
 *    with nothing. The carousel labels the whole screen with role="img", so
 *    descendants are presentational to assistive tech anyway.
 * 2. TYPE IS SIZED FOR THE MOCKUP'S SCALE, not for the real device. The frame
 *    renders ~278px wide against a 393pt phone, so everything here is read at
 *    roughly 0.7×. 11px in this file is a 15-16px body line on a real handset.
 *
 * The status bar, notch and home indicator are NOT drawn here — the carousel
 * paints one set of device chrome over all five screens so they cannot drift.
 */

type TabKey = "today" | "learn" | "practice" | "progress" | "settings"

const TABS: { key: TabKey; label: string; Icon: typeof Zap }[] = [
  { key: "today", label: "Today", Icon: Zap },
  { key: "learn", label: "Study", Icon: BookOpen },
  { key: "practice", label: "Practice", Icon: Pencil },
  { key: "progress", label: "Progress", Icon: BarChart3 },
  { key: "settings", label: "Settings", Icon: Settings2 },
]

/** The app's own mobile chrome: wordmark header + the five-tab bar. */
const Shell = ({ children, tab }: { children: React.ReactNode; tab: TabKey }) => (
  <div className="relative h-full bg-[#f7f3f1] px-4 pb-[64px] pt-[52px] font-sans text-[#332b28]">
    <div className="mb-4 flex items-center justify-between">
      <div className="text-[14px] font-black tracking-[-.04em]">SCHOLIFY<span className="text-[#c80000]">.</span></div>
      <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[8.5px] font-extrabold tracking-[.1em] text-[#8e817b] shadow-sm"><span className="text-[#c80000]">MA</span> · 67D TO EXAM</div>
    </div>
    {children}
    <div className="absolute inset-x-0 bottom-0 flex h-[54px] items-stretch border-t border-black/[.06] bg-[#f7f3f1]/95">
      {TABS.map(({ key, label, Icon }) => (
        <div key={key} className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[7.5px] font-bold ${key === tab ? "text-[#c80000]" : "text-[#8e817b]"}`}>
          <Icon size={14} strokeWidth={key === tab ? 2.6 : 2} />
          {label}
        </div>
      ))}
    </div>
  </div>
)

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[18px] border border-black/[.055] bg-white p-3.5 shadow-[0_12px_30px_-22px_rgba(40,20,20,.35)] ${className}`}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[8px] font-extrabold uppercase tracking-[.12em] text-[#a1948d]">{children}</div>
)

const Meter = ({ pct, color, track }: { pct: number; color: string; track: string }) => (
  <div className="mt-1.5 h-[5px] overflow-hidden rounded-full" style={{ background: track }}>
    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
  </div>
)

/** The readiness ring exactly as the app draws it — band color, % centred. */
const Ring = ({ size, pct, band }: { size: number; pct: number; band: string }) => {
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0e9e5" strokeWidth={9} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={band} strokeWidth={9} strokeLinecap="round" strokeDasharray={`${(circ * pct) / 100} ${circ}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="54%" textAnchor="middle" fontSize={size / 4.4} fontWeight={800} fill="#332b28" style={{ fontVariantNumeric: "tabular-nums" }}>{pct}%</text>
    </svg>
  )
}

const exampleImages: ImageItem[] = [
  {
    title: "Today — the plan already chose",
    alt: "Scholify mobile dashboard with today's mission, streak and mock gate",
    content: <Shell tab="today">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] font-bold text-[#8e817b]">Morning, Amina — day 23 of 90</div>
          <h3 className="mt-0.5 text-[21px] font-black tracking-[-.05em]">Today’s mission</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[#fdf3e4] px-2.5 py-1.5 text-[9.5px] font-black tabular-nums text-[#c2740b]"><Flame size={12} /> 12</div>
      </div>
      {/*
       * The mission mirrors the REAL composed day — the five block kinds the
       * app itself serves and labels (BLOCK_LABEL in TodayBoard): Study (the
       * chapter/theme), Quiz, Practice, Flashcards, Technical article.
       */}
      <Card className="mt-3 border-[#c80000]/20 bg-gradient-to-b from-[#fdeeec] to-white !p-3">
        <Label>Your next action · the plan already chose</Label>
        <div className="mt-1.5 flex items-center gap-2 border-b border-black/[.05] pb-1.5 text-[10px] text-[#8e817b]">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-[#e3f5ee] text-[#0e9f6e]"><Check size={12} /></span>
          <span className="min-w-0 flex-1 truncate">Study — Chapter 18 · Flexing the budget</span><span className="tabular-nums text-[8.5px]">18m</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 border-b border-black/[.05] pb-1.5 text-[10.5px] font-bold">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#c80000] via-[#e50068] to-[#f4a405] text-white"><Zap size={12} /></span>
          <span className="min-w-0 flex-1 truncate">Quiz — 5 quizzes on the chapter</span><span className="rounded-full bg-[#c80000]/10 px-1.5 py-0.5 text-[8px] font-extrabold text-[#c80000]">NEXT</span>
        </div>
        {[
          { Icon: Pencil, label: "Practice — 12 practice questions", mins: "14m" },
          { Icon: GraduationCap, label: "Flashcards — 10 due", mins: "6m" },
          { Icon: BookOpen, label: "Technical article — Budgeting in volatile costs", mins: "4m" },
        ].map(({ Icon, label, mins }) => (
          <div key={label} className="mt-1.5 flex items-center gap-2 border-b border-black/[.05] pb-1.5 text-[10px] text-[#5c4f4a] last:border-b-0 last:pb-0">
            <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-[#f2eeeb] text-[#8e817b]"><Icon size={12} /></span>
            <span className="min-w-0 flex-1 truncate">{label}</span><span className="tabular-nums text-[8.5px] text-[#a1948d]">{mins}</span>
          </div>
        ))}
        <div className="mt-2.5 w-full rounded-xl bg-[#c80000] py-2.5 text-center text-[11px] font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(200,0,0,.5)]">Continue — Quiz · 1 of 5 done</div>
      </Card>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <Card className="!p-3"><Label>Streak</Label><div className="mt-1 text-[16px] font-black tabular-nums">12 <span className="text-[9px] font-bold text-[#8e817b]">days</span></div><div className="text-[8px] font-extrabold text-[#0e9f6e]">Secured for today ✓</div></Card>
        <Card className="!p-3"><Label>Mock gate</Label><div className="mt-1 text-[16px] font-black tabular-nums">54<span className="text-[9.5px] text-[#8e817b]">/60%</span></div><Meter pct={90} color="#c2740b" track="rgba(194,116,11,.1)" /></Card>
      </div>
    </Shell>,
  },
  {
    title: "Study — the authored chapters",
    alt: "Scholify mobile learning screen with continue card and chapter list",
    content: <Shell tab="learn">
      <h3 className="text-[21px] font-black tracking-[-.05em]">Study</h3>
      <Card className="mt-3 border-[#c80000]/20 bg-gradient-to-b from-[#fdeeec] to-white">
        <Label>Continue where you left off</Label>
        <div className="mt-1.5 text-[13px] font-black tracking-[-.02em]">MA-18 · Flexing the budget</div>
        <Meter pct={58} color="#c80000" track="rgba(200,0,0,.08)" />
        <div className="mt-1.5 text-[9px] tabular-nums text-[#8e817b]">12 min left · 16 of 27 chapters read</div>
        <div className="mt-2.5 w-full rounded-xl bg-[#c80000] py-2.5 text-center text-[11px] font-extrabold text-white">Continue reading</div>
      </Card>
      <div className="mt-4 flex items-baseline justify-between">
        <Label>Area D · Budgeting</Label>
        <span className="text-[9px] font-extrabold tabular-nums text-[#c2740b]">41% mastery</span>
      </div>
      <Card className="mt-1.5 !p-2">
        {[
          { id: "MA-16", title: "Budget preparation", state: "done" },
          { id: "MA-17", title: "The cash budget", state: "done" },
          { id: "MA-18", title: "Flexing the budget", state: "now" },
          { id: "MA-19", title: "Capital budgeting", state: "todo", mins: "17m" },
          { id: "MA-20", title: "Investment appraisal", state: "todo", mins: "15m" },
        ].map((ch) => (
          <div key={ch.id} className={`flex items-center gap-2.5 border-b border-black/[.045] px-1.5 py-2 text-[10.5px] last:border-b-0 ${ch.state === "now" ? "rounded-lg bg-[#c80000]/[.06] font-black" : ch.state === "done" ? "text-[#8e817b]" : "font-semibold"}`}>
            <span className={`w-0.5 self-stretch rounded-full ${ch.state === "done" ? "bg-[#0e9f6e]/50" : ch.state === "now" ? "bg-[#c80000]" : "bg-black/[.08]"}`} />
            <span className="tabular-nums text-[#c80000]">{ch.id}</span>
            <span className="min-w-0 flex-1 truncate">{ch.title}</span>
            {ch.state === "done" ? <Check size={12} className="shrink-0 text-[#0e9f6e]" /> : ch.state === "now" ? <span className="rounded-full bg-[#c80000]/10 px-1.5 py-0.5 text-[7.5px] font-extrabold text-[#c80000]">NOW</span> : <span className="text-[8.5px] tabular-nums text-[#a1948d]">{ch.mins}</span>}
          </div>
        ))}
      </Card>
    </Shell>,
  },
  {
    title: "Practice — drills, kits and the mock gate",
    alt: "Scholify mobile practice room with recommended drill and exam formats",
    content: <Shell tab="practice">
      <h3 className="text-[21px] font-black tracking-[-.05em]">Practice room</h3>
      <Card className="mt-3 border-[#c80000]/20 bg-gradient-to-b from-[#fdeeec] to-white">
        <Label>Recommended now</Label>
        <div className="mt-1.5 flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#fdf3e4] text-[#c2740b]"><Zap size={16} /></span>
          <div className="min-w-0">
            <div className="text-[12px] font-black tracking-[-.02em]">Weak-area drill — Area D</div>
            <div className="text-[9px] text-[#8e817b]">Your marks leak here (41%) · 10 questions · 12 min</div>
          </div>
        </div>
        <div className="mt-2.5 w-full rounded-xl bg-[#c80000] py-2.5 text-center text-[11px] font-extrabold text-white">Start drill</div>
      </Card>
      <div className="mt-4"><Label>Exam formats</Label></div>
      <div className="mt-1.5 grid grid-cols-2 gap-2.5">
        <Card className="!p-3"><div className="flex items-center gap-2"><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#c80000]/[.08] text-[10px] font-black text-[#c80000]">A</span><b className="text-[10.5px]">Section A</b></div><div className="mt-1.5 text-[8.5px] tabular-nums text-[#8e817b]">35 questions · 70 marks</div></Card>
        <Card className="!p-3"><div className="flex items-center gap-2"><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#c80000]/[.08] text-[10px] font-black text-[#c80000]">B</span><b className="text-[10.5px]">MTQ cases</b></div><div className="mt-1.5 text-[8.5px] tabular-nums text-[#8e817b]">3 cases · 30 marks</div></Card>
        <Card className="!p-3"><div className="flex items-center gap-2"><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#fdf3e4] text-[#c2740b]"><Lock size={12} /></span><b className="text-[10.5px]">CBE mock</b></div><Meter pct={90} color="#c2740b" track="rgba(194,116,11,.1)" /><div className="mt-1 text-[8.5px] tabular-nums text-[#c2740b]">54 of 60% to unlock</div></Card>
        <Card className="!p-3"><div className="flex items-center gap-2"><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#e3f5ee] text-[#0e9f6e]"><GraduationCap size={13} /></span><b className="text-[10.5px]">Flashcards</b></div><div className="mt-1.5 text-[8.5px] tabular-nums text-[#8e817b]">10 due today</div></Card>
      </div>
      <div className="mt-3.5"><Label>By chapter</Label></div>
      <Card className="mt-1.5 !p-2">
        {[
          { id: "MA-18", title: "Flexing the budget", pct: 52, color: "#c2740b" },
          { id: "MA-19", title: "Capital budgeting", pct: 34, color: "#dc2626" },
        ].map((row) => (
          <div key={row.id} className="flex items-center gap-2 border-b border-black/[.045] px-1.5 py-2 text-[10px] font-bold last:border-b-0">
            <span className="min-w-0 flex-1 truncate">{row.id} · {row.title}</span>
            <div className="h-[5px] w-[52px] overflow-hidden rounded-full" style={{ background: `${row.color}1a` }}><div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} /></div>
            <span className="tabular-nums" style={{ color: row.color }}>{row.pct}%</span>
          </div>
        ))}
      </Card>
    </Shell>,
  },
  {
    title: "Progress — the honest readiness number",
    alt: "Scholify mobile analytics with exam readiness ring and weak areas",
    content: <Shell tab="progress">
      <h3 className="text-[21px] font-black tracking-[-.05em]">Progress</h3>
      <Card className="mt-3 flex items-center gap-3.5">
        <Ring size={86} pct={67} band="#0e9f6e" />
        <div className="min-w-0">
          <div className="text-[12px] font-black text-[#0e9f6e]">Strong pass zone</div>
          <div className="text-[9px] text-[#8e817b]">Likely range 61–73% · ▲ 4 this week</div>
          <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#c80000]/[.08] px-2 py-1 text-[8.5px] font-extrabold text-[#c80000]">Fix Area D first <ChevronRight size={9} /></div>
        </div>
      </Card>
      <div className="mt-3.5"><Label>Where marks leak</Label></div>
      <Card className="mt-1.5 !p-2.5">
        {[
          { code: "D", label: "Budgeting", pct: 41, color: "#dc2626" },
          { code: "E", label: "Standard costing", pct: 58, color: "#c2740b" },
          { code: "F", label: "Performance measurement", pct: 74, color: "#0e9f6e" },
        ].map((a) => (
          <div key={a.code} className="border-b border-black/[.045] px-1 py-2 last:border-b-0">
            <div className="flex items-baseline justify-between text-[10px] font-bold">
              <span><b className="text-[#c80000]">{a.code}</b> · {a.label}</span>
              <span className="tabular-nums font-extrabold" style={{ color: a.color }}>{a.pct}%</span>
            </div>
            <Meter pct={a.pct} color={a.color} track={`${a.color}1a`} />
          </div>
        ))}
      </Card>
      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
        <Card className="!p-3"><Label>Last 35 days</Label><div className="mt-2 flex gap-[3px]">{[0, 1, 2, 3, 2, 0, 1, 2, 3, 3, 2, 1].map((level, i) => <span key={i} className="size-[9px] rounded-[3px]" style={{ background: level === 0 ? "#f0e9e5" : `rgba(200,0,0,${0.16 + level * 0.22})` }} />)}</div><div className="mt-1.5 text-[8.5px] tabular-nums text-[#8e817b]">84 this week · <b className="text-[#0e9f6e]">▲ 38%</b></div></Card>
        <Card className="!p-3"><Label>Mock trend</Label><div className="mt-1 flex items-end gap-1.5">{[58, 61, 59, 71].map((v, i) => <div key={i} className="w-4 rounded-t-md" style={{ height: v * 0.42, background: i === 3 ? "#0e9f6e" : "rgba(14,159,110,.25)" }} />)}</div><div className="mt-1 text-[8.5px] tabular-nums text-[#8e817b]">best <b className="text-[#0e9f6e]">71%</b> · pass 50%</div></Card>
      </div>
    </Shell>,
  },
  {
    title: "Settings — the plan you committed to",
    alt: "Scholify mobile settings with study days, exam date and reminders",
    content: <Shell tab="settings">
      <h3 className="text-[21px] font-black tracking-[-.05em]">Settings</h3>
      <div className="mt-3"><Label>Study plan</Label></div>
      <Card className="mt-1.5 !p-3">
        <div className="flex items-center justify-between text-[10.5px] font-bold"><span>Study days</span><span className="text-[8.5px] font-extrabold text-[#8e817b]">5 / week</span></div>
        <div className="mt-2 flex gap-1.5">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className={`grid size-6 place-items-center rounded-lg text-[8.5px] font-extrabold ${i < 5 ? "bg-[#c80000] text-white" : "border border-black/[.08] text-[#8e817b]"}`}>{d}</span>)}</div>
        <div className="mt-3 flex items-center justify-between border-t border-black/[.045] pt-2.5 text-[10.5px]"><div><b>Daily minutes</b><div className="text-[8.5px] text-[#8e817b]">goal recomputes from this</div></div><span className="rounded-lg border border-black/[.08] px-2 py-1 text-[9.5px] font-bold tabular-nums">45 min</span></div>
        <div className="mt-2.5 flex items-center justify-between border-t border-black/[.045] pt-2.5 text-[10.5px]"><div><b>Exam date</b><div className="text-[8.5px] text-[#8e817b]">the roadmap re-derives from it</div></div><span className="rounded-lg border border-black/[.08] px-2 py-1 text-[9.5px] font-bold tabular-nums">25 Oct · 67d</span></div>
      </Card>
      <Card className="mt-2.5 !p-3">
        <div className="flex items-center justify-between text-[10.5px]"><div><b>Study reminders</b><div className="text-[8.5px] text-[#8e817b]">19:00 on study days</div></div><span className="relative h-[18px] w-[32px] rounded-full bg-[#0e9f6e]"><span className="absolute right-[2px] top-[2px] size-[14px] rounded-full bg-white shadow" /></span></div>
        <div className="mt-2.5 flex items-center justify-between border-t border-black/[.045] pt-2.5 text-[10.5px]"><div><b>Timed sessions</b><div className="text-[8.5px] text-[#8e817b]">exam-clock pacing on drills</div></div><Timer size={13} className="text-[#8e817b]" /></div>
      </Card>
      <Card className="mt-2.5 border-[#dc2626]/15 bg-[#dc2626]/[.04] !p-3">
        <div className="text-[10.5px] font-black text-[#dc2626]">Danger zone</div>
        <div className="text-[8.5px] text-[#8e817b]">Reset progress on this paper · two-step confirm</div>
      </Card>
    </Shell>,
  },
]

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />
}
