import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface Card {
  id: number
  contentType: 1 | 2 | 3
}

export interface StackFact {
  title: string
  description: string
  /** Path to a brand image — swap in a generated one any time. */
  image: string
}

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]

const exitAnimation = { y: 340, scale: 1, zIndex: 10 }
const enterAnimation = { y: -16, scale: 0.9 }

function CardContent({
  fact,
  ctaLabel,
  onCta,
}: {
  fact: StackFact
  ctaLabel: string
  onCta: () => void
}) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="-outline-offset-1 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl outline outline-black/10">
        <img src={fact.image} alt={fact.title} className="h-full w-full select-none object-cover" />
      </div>
      <div className="flex w-full items-center justify-between gap-2 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-bold text-[#14141A]">{fact.title}</span>
          <span className="text-[#6B6B76]">{fact.description}</span>
        </div>
        <button
          onClick={onCta}
          className="flex h-10 shrink-0 cursor-pointer select-none items-center gap-0.5 rounded-full pl-4 pr-3 text-sm font-medium text-white"
          style={{ background: "linear-gradient(135deg,#C80000 0%,#E50068 48%,#F4A405 100%)" }}
        >
          {ctaLabel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
            <path d="M9.5 18L15.5 12L9.5 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isAnimating,
  fact,
  ctaLabel,
  onCta,
}: {
  card: Card
  index: number
  isAnimating: boolean
  fact: StackFact
  ctaLabel: string
  onCta: () => void
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined

  return (
    <motion.div
      key={card.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{ type: "spring", duration: 1, bounce: 0 }}
      style={{ zIndex, left: "50%", x: "-50%", bottom: 0 }}
      className="absolute flex h-[280px] w-[324px] items-center justify-center overflow-hidden rounded-t-xl border-x border-t border-[#EDE6DC] bg-white p-1 shadow-lg will-change-transform sm:w-[512px]"
    >
      <CardContent fact={fact} ctaLabel={ctaLabel} onCta={onCta} />
    </motion.div>
  )
}

export interface AnimatedCardStackProps {
  facts: [StackFact, StackFact, StackFact]
  ctaLabel: string
  onCta: () => void
  animateLabel: string
}

/**
 * A stack of three cards; "Animate" cycles the front card to the back. Each
 * card carries its own CTA so any card visible converts, not just whichever
 * one lands on top.
 */
export default function AnimatedCardStack({ facts, ctaLabel, onCta, animateLabel }: AnimatedCardStackProps) {
  const initialCards: Card[] = [
    { id: 1, contentType: 1 },
    { id: 2, contentType: 2 },
    { id: 3, contentType: 3 },
  ]
  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(4)

  function handleAnimate() {
    setIsAnimating(true)
    const nextContentType = ((cards[2].contentType % 3) + 1) as 1 | 2 | 3
    setCards([...cards.slice(1), { id: nextId, contentType: nextContentType }])
    setNextId((prev) => prev + 1)
    setIsAnimating(false)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center pt-2">
      <div className="relative h-[380px] w-full overflow-hidden sm:w-[644px]">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => (
            <AnimatedCard
              key={card.id}
              card={card}
              index={index}
              isAnimating={isAnimating}
              fact={facts[card.contentType - 1]}
              ctaLabel={ctaLabel}
              onCta={onCta}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 -mt-px flex w-full items-center justify-center border-t border-[#EDE6DC] py-4">
        <button
          onClick={handleAnimate}
          className="flex h-9 cursor-pointer select-none items-center justify-center gap-1 overflow-hidden rounded-lg border border-[#EDE6DC] bg-white px-3 font-medium text-[#14141A] transition-all hover:bg-[#FAF7F2] active:scale-[0.98]"
        >
          {animateLabel}
        </button>
      </div>
    </div>
  )
}
