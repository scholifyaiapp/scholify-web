import { motion, useReducedMotion } from "motion/react"
import type { DiagnosticAreaResult } from "@/lib/acca-diagnostic"

/* ──────────────────────────────────────────────────────────────
 *  The whole paper, as rings.
 *
 *  The results screen already names the three weakest areas and
 *  the three strongest — but on an eight-area paper that leaves
 *  two areas unmentioned, and says nothing about the ones the
 *  diagnostic never reached. A learner finishes it knowing their
 *  score and their pain points, without ever seeing the SHAPE of
 *  their paper.
 *
 *  One ring per syllabus area, filled by score, is that shape in
 *  a single glance — including the gaps, which are the most
 *  actionable thing on the screen and were previously invisible.
 * ────────────────────────────────────────────────────────────── */

/*
 * Band colours, and the reason there is a number in every ring.
 * These three are separable for the common colour-vision deficiencies, but the
 * rule is that colour never carries the meaning alone: each ring prints its own
 * percentage, and an unassessed area prints a dash rather than a 0 — "not
 * measured" and "measured at zero" are completely different facts and must
 * never look the same.
 */
const BAND_COLOR: Record<DiagnosticAreaResult["band"], string> = {
  weak: "#C80000",
  moderate: "#B87A05",
  strong: "#1E9E5A",
}

const EASE = [0.16, 1, 0.3, 1] as const
const SIZE = 66
const STROKE = 6
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R

export default function SyllabusRings({ areas }: { areas: DiagnosticAreaResult[] }) {
  const reduced = useReducedMotion()
  if (!areas.length) return null

  const assessed = areas.filter((a) => a.seen > 0).length

  return (
    <section
      style={{
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 800, letterSpacing: 0.4, color: "var(--sch-tx-1)" }}>
          YOUR WHOLE SYLLABUS
        </div>
        <div style={{ fontSize: 11.5, color: "var(--sch-tx-2)", fontVariantNumeric: "tabular-nums" }}>
          {assessed} of {areas.length} areas measured
        </div>
      </div>

      <div
        style={{
          display: "grid",
          // Fits four across on a phone and eight on a laptop without a
          // breakpoint — the grid does the responsive work.
          gridTemplateColumns: `repeat(auto-fit, minmax(${SIZE + 12}px, 1fr))`,
          gap: 12,
          justifyItems: "center",
        }}
      >
        {areas.map((area, i) => {
          const measured = area.seen > 0
          const pct = Math.round(area.score * 100)
          const color = measured ? BAND_COLOR[area.band] : "var(--sch-tx-2)"
          return (
            <motion.div
              key={area.code}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", width: SIZE }}
              title={`${area.code} · ${area.label}${measured ? ` — ${pct}%, ${area.correct}/${area.seen}` : " — not measured yet"}`}
            >
              <div style={{ position: "relative", width: SIZE, height: SIZE }}>
                <svg width={SIZE} height={SIZE} style={{ display: "block", transform: "rotate(-90deg)" }} aria-hidden>
                  <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={R}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.12}
                    strokeWidth={STROKE}
                    // A dashed track reads as "nothing here yet" without needing
                    // a colour or a label to say so.
                    strokeDasharray={measured ? undefined : "2 4"}
                  />
                  {measured && (
                    <motion.circle
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={R}
                      fill="none"
                      stroke={color}
                      strokeWidth={STROKE}
                      strokeLinecap="round"
                      strokeDasharray={C}
                      initial={reduced ? false : { strokeDashoffset: C }}
                      animate={{ strokeDashoffset: C * (1 - area.score) }}
                      transition={{ delay: 0.12 + 0.05 * i, duration: 0.85, ease: EASE }}
                      style={reduced ? { strokeDashoffset: C * (1 - area.score) } : undefined}
                    />
                  )}
                </svg>
                <div
                  style={{
                    position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", lineHeight: 1,
                  }}
                >
                  <span style={{ fontSize: 14.5, fontWeight: 850, color: measured ? "var(--sch-text)" : "var(--sch-tx-2)", fontVariantNumeric: "tabular-nums" }}>
                    {measured ? pct : "—"}
                  </span>
                  {measured && <span style={{ fontSize: 8.5, fontWeight: 800, color: "var(--sch-tx-2)", marginTop: 1 }}>%</span>}
                </div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--sch-text)", marginTop: 6 }}>{area.code}</div>
              <div
                style={{
                  fontSize: 9.5, lineHeight: 1.25, color: "var(--sch-tx-2)", textAlign: "center", marginTop: 1,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}
              >
                {area.label}
              </div>
            </motion.div>
          )
        })}
      </div>

      {assessed < areas.length && (
        <p style={{ fontSize: 11.5, lineHeight: 1.5, color: "var(--sch-tx-2)", margin: "14px 0 0" }}>
          A dashed ring means the diagnostic didn’t reach that area yet — not that you scored zero. Your plan covers
          them either way.
        </p>
      )}
    </section>
  )
}
