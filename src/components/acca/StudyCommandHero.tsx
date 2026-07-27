import { motion } from "motion/react"
import { ArrowRight, BookOpen, Layers3, Target, TimerReset } from "lucide-react"
import type { CSSProperties } from "react"

type Props = {
  paperId: string; paperName: string; paperCode: string; level: string
  readiness: number | null; missionPercent: number; answered: number
  daysToExam: number | null; dailyMinutes: number; onStart: () => void
}

export default function StudyCommandHero(p: Props) {
  const days = p.daysToExam == null ? "Date flexible" : p.daysToExam <= 0 ? "Exam day" : `${p.daysToExam} days`
  return (
    <section className="study-command-hero" aria-label={`${p.paperId} study command centre`}>
      <div className="study-command-glow study-command-glow-a" />
      <div className="study-command-glow study-command-glow-b" />
      <div className="study-command-copy">
        <div className="study-command-eyebrow">
          <span className="study-command-live"><span /> LIVE STUDY OS</span>
          <span>{p.paperCode} · {p.level}</span>
        </div>
        <h1>{p.paperName}</h1>
        <p>Charles has sequenced your next best actions from syllabus coverage, accuracy, recall and exam timing.</p>
        <div className="study-command-actions">
          <motion.button whileTap={{ scale: .98 }} onClick={p.onStart}>Continue today’s mission <ArrowRight size={16} /></motion.button>
          <span><TimerReset size={15} /> {p.dailyMinutes} min focus target</span>
        </div>
      </div>
      <div className="study-command-scene" aria-hidden="true">
        <motion.div className="study-orbit study-orbit-one" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
        <motion.div className="study-orbit study-orbit-two" animate={{ rotate: -360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} />
        <motion.div className="study-3d-card study-3d-card-back" animate={{ y: [0,-5,0], rotateZ: [-7,-5,-7] }} transition={{ duration: 5.5, repeat: Infinity }}>
          <Layers3 size={20} /><small>QUESTION BANK</small><strong>350</strong>
        </motion.div>
        <motion.div className="study-3d-card study-3d-card-front" animate={{ y: [0,6,0], rotateZ: [5,3,5] }} transition={{ duration: 4.8, repeat: Infinity }}>
          <Target size={22} /><small>READINESS</small><strong>{p.readiness == null ? "—" : `${p.readiness}%`}</strong>
          <i style={{ "--hero-progress": `${p.readiness ?? 0}%` } as CSSProperties} />
        </motion.div>
        <div className="study-command-core"><BookOpen size={27} /><b>{p.paperId}</b><span>ADVANCED LEARNING</span></div>
      </div>
      <div className="study-command-metrics">
        <div><span>Readiness</span><strong>{p.readiness == null ? "Baseline pending" : `${p.readiness}% ready`}</strong></div>
        <div><span>Today</span><strong>{p.missionPercent}% complete</strong></div>
        <div><span>Practice</span><strong>{p.answered} answered</strong></div>
        <div><span>Countdown</span><strong>{days}</strong></div>
      </div>
    </section>
  )
}
