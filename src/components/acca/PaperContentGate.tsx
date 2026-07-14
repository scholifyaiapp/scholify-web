import { motion } from "motion/react"
import { Button, C, R, SHADOW, SP, TYPE, GRAD } from "@/components/acca/ui"

/*
 * The loading + failure treatment for a paper's content chunk.
 *
 * The chunk is ~150–350 kB for the ACTIVE paper (it used to be 4.5 MB for all
 * fifteen), so on a good connection this flashes for a frame or two and on a
 * Tashkent 4G it is a second. Either way the student sees the SHAPE of the page
 * they asked for — a skeleton of the readiness card and the mode tiles — never a
 * blank screen, and never a crash.
 */

const shimmer = {
  animate: { opacity: [0.45, 0.85, 0.45] },
  transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const },
}

function Bar({ w, h = 12, delay = 0 }: { w: number | string; h?: number; delay?: number }) {
  return (
    <motion.div
      animate={shimmer.animate}
      transition={{ ...shimmer.transition, delay }}
      style={{ width: w, height: h, borderRadius: R.sm, background: C.card2 }}
    />
  )
}

function Tile({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: R.lg,
        boxShadow: SHADOW.sm,
        padding: SP.lg,
        display: "grid",
        gap: SP.sm,
      }}
    >
      <Bar w={34} h={34} delay={delay} />
      <Bar w="70%" delay={delay + 0.1} />
      <Bar w="45%" h={10} delay={delay + 0.15} />
    </motion.div>
  )
}

/** Skeleton shown while the active paper's content chunk downloads. */
export function PaperContentSkeleton({ paperId }: { paperId?: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      aria-busy="true"
      aria-live="polite"
      style={{ display: "grid", gap: SP.lg }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: SP.sm }}>
        <motion.span
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          style={{
            width: 15,
            height: 15,
            borderRadius: R.pill,
            border: `2px solid ${C.brandLine}`,
            borderTopColor: C.brand,
            display: "inline-block",
          }}
        />
        <span style={{ ...TYPE.small, color: C.soft }}>
          Loading {paperId ? `${paperId} ` : ""}study material…
        </span>
      </div>

      {/* readiness hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: R.xl,
          boxShadow: SHADOW.md,
          padding: SP["2xl"],
          display: "flex",
          alignItems: "center",
          gap: SP.xl,
        }}
      >
        <motion.div
          animate={shimmer.animate}
          transition={shimmer.transition}
          style={{ width: 88, height: 88, borderRadius: R.pill, background: C.card2, flexShrink: 0 }}
        />
        <div style={{ flex: 1, display: "grid", gap: SP.sm, minWidth: 0 }}>
          <Bar w="55%" h={16} />
          <Bar w="80%" delay={0.1} />
          <Bar w="35%" h={10} delay={0.2} />
        </div>
      </motion.div>

      {/* mode tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: SP.md }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Tile key={i} delay={0.05 * i} />
        ))}
      </div>
    </motion.div>
  )
}

/**
 * The content chunk failed to arrive (offline, or a stale index pointing at a
 * deleted chunk after a deploy). Nothing is lost — progress is local — so the
 * honest move is to say so and offer the one action that fixes it.
 */
export function PaperContentError({ paperId, onRetry }: { paperId?: string | null; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: R.xl,
        boxShadow: SHADOW.md,
        padding: SP["3xl"],
        textAlign: "center",
        display: "grid",
        justifyItems: "center",
        gap: SP.md,
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: R.pill, background: GRAD, opacity: 0.9 }} />
      <h2 style={{ ...TYPE.h2, color: C.text, margin: 0 }}>Couldn&apos;t load {paperId ?? "this paper"}</h2>
      <p style={{ ...TYPE.body, color: C.soft, margin: 0, maxWidth: 380 }}>
        The study material for this paper didn&apos;t download. Check your connection — your progress is safe.
      </p>
      <Button onClick={onRetry}>Try again</Button>
    </motion.div>
  )
}
