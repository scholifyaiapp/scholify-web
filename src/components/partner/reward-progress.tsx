import { type CSSProperties } from "react"
import { motion, useReducedMotion } from "motion/react"
import NumberFlow from "@number-flow/react"
import {
  COMMISSION_TIERS,
  commissionTierProgress,
  type EarningsBreakdown,
  type RewardProgress,
} from "@/lib/partner-rewards"

/* ──────────────────────────────────────────────────────────────
 *  Partner reward-progress visuals. Used twice, deliberately:
 *  the landing-page preview, the worked example on /partners/apply and a real
 *  partner's own numbers on /partners. Same components, same maths — a partner
 *  should recognise the dashboard from the offer page.
 * ────────────────────────────────────────────────────────────── */

/*
 * TWO SERIES, and only two: Beginner and Pro. The pair was validated rather
 * than eyeballed — #C80000 / #B87A05 clears the lightness band, the chroma
 * floor, adjacent-pair CVD separation (ΔE 9.8 deutan, 13.1 tritan), the
 * normal-vision floor (18.4) and 3:1 contrast against the card surface.
 * The page's display gold (#F4A405) does NOT: it sits at 2.01:1 on a light
 * surface, so it stays decoration on the dark reward card and never encodes
 * data here. Both series are direct-labelled as well, so identity never rests
 * on colour alone.
 */
export const SERIES = {
  beginner: "#C80000",
  pro: "#B87A05",
} as const

const MONO = "ui-monospace, 'JetBrains Mono', 'SFMono-Regular', monospace"
const TRACK = "color-mix(in srgb, var(--sch-text) 9%, transparent)"

const EASE = [0.16, 1, 0.3, 1] as const

const microLabel: CSSProperties = {
  fontFamily: MONO,
  fontSize: 10.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--sch-tx-2)",
}

function money(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 })
}

/** Every public promise and the private dashboard use the same animated ladder.
 * That makes the threshold, current status and next benefit visually identical
 * before and after a promoter applies. */
export function CommissionTierLadder({ paidCustomers }: { paidCustomers: number }) {
  const reduced = useReducedMotion()
  const progress = commissionTierProgress(paidCustomers)

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={microLabel}>Your earning window</div>
          <div style={{ fontSize: 25, fontWeight: 850, letterSpacing: "-.025em", color: "var(--sch-text)", marginTop: 5 }}>
            {progress.current.name} · 27% × {progress.current.monthlyPayments} paid {progress.current.monthlyPayments === 1 ? "month" : "months"}
          </div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 12, color: "var(--sch-tx-2)" }}>
          <NumberFlow value={progress.paidCustomers} /> unique paid learners
        </div>
      </div>

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 10 }}>
        <div aria-hidden style={{ position: "absolute", left: "8%", right: "8%", top: 20, height: 3, borderRadius: 999, background: TRACK }} />
        <motion.div
          aria-hidden
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: Math.min(1, progress.paidCustomers / 600) }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE }}
          style={{ position: "absolute", zIndex: 1, left: "8%", right: "8%", top: 20, height: 3, borderRadius: 999, background: "linear-gradient(90deg,#C80000,#F4A405)", transformOrigin: "left" }}
        />
        {COMMISSION_TIERS.map((tier, index) => {
          const reached = progress.paidCustomers >= tier.paidCustomers
          const active = progress.current.id === tier.id
          return (
            <motion.div
              key={tier.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: EASE }}
              animate={active && !reduced ? { y: [0, -3, 0] } : undefined}
              style={{ position: "relative", zIndex: 2, minWidth: 0, textAlign: "center" }}
            >
              <div
                style={{
                  width: 43,
                  height: 43,
                  margin: "0 auto",
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  background: reached ? "linear-gradient(135deg,#C80000,#F4A405)" : "var(--sch-card)",
                  border: active ? "3px solid color-mix(in srgb, #F4A405 70%, white)" : "2px solid var(--sch-border)",
                  boxShadow: active ? "0 0 0 5px rgba(244,164,5,.12)" : "none",
                  color: reached ? "#fff" : "var(--sch-tx-2)",
                  font: `800 13px ${MONO}`,
                }}
              >
                {tier.monthlyPayments}×
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: "var(--sch-text)", marginTop: 9 }}>{tier.name}</div>
              <div style={{ fontFamily: MONO, fontSize: 10.5, color: "var(--sch-tx-2)", marginTop: 3 }}>
                {tier.paidCustomers === 0 ? "Start" : `${tier.paidCustomers}+ paid`}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div style={{ height: 10, borderRadius: 999, overflow: "hidden", background: TRACK }}>
        <motion.div
          initial={reduced ? false : { width: 0 }}
          whileInView={{ width: `${progress.percent}%` }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#C80000,#F4A405)", width: reduced ? `${progress.percent}%` : undefined }}
        />
      </div>
      <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--sch-tx-2)" }}>
        {progress.next
          ? <><b style={{ color: "var(--sch-text)" }}>{progress.remaining.toLocaleString("en-US")} more paid learners</b> unlock {progress.next.monthlyPayments} monthly commissions for each new referral.</>
          : <><b style={{ color: "var(--sch-text)" }}>Premier unlocked.</b> New monthly referrals can earn commission across five successful payments.</>}
      </div>
    </div>
  )
}

/* ── The ring ──────────────────────────────────────────────────────
 *
 * One headline — "how far along am I" — so the NUMBER is the primary read and
 * the ring is its frame. The ring is stacked by the same two series as the bar
 * below it, because a solid ring in one series colour would say "all of this is
 * Beginner" to anyone reading colour as identity.
 */
export function RewardRing({
  beginner,
  pro,
  target,
  percent,
  size = 168,
}: {
  beginner: number
  pro: number
  target: number
  percent: number
  size?: number
}) {
  const reduced = useReducedMotion()
  const stroke = 12
  const r = (size - stroke) / 2
  const c = size / 2

  const beginnerFraction = target > 0 ? Math.min(1, beginner / target) : 0
  const proFraction = target > 0 ? Math.min(1 - beginnerFraction, pro / target) : 0

  const segments = [
    { key: "beginner", color: SERIES.beginner, length: beginnerFraction, offset: 0 },
    { key: "pro", color: SERIES.pro, length: proFraction, offset: beginnerFraction },
  ]

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ display: "block" }}>
        <circle cx={c} cy={c} r={r} fill="none" stroke={TRACK} strokeWidth={stroke} />
        <g transform={`rotate(-90 ${c} ${c})`}>
          {segments.map((segment) => (
            <motion.circle
              key={segment.key}
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={segment.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0, pathOffset: segment.offset }}
              whileInView={{ pathLength: segment.length, pathOffset: segment.offset }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.1, ease: EASE, delay: segment.key === "pro" ? 0.18 : 0 }}
              style={reduced ? { pathLength: segment.length, pathOffset: segment.offset } : undefined}
            />
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--sch-text)", lineHeight: 1 }}>
          <NumberFlow value={Math.round(percent)} suffix="%" />
        </div>
        <div style={{ ...microLabel, marginTop: 6, fontSize: 9.5 }}>of target</div>
      </div>
    </div>
  )
}

/* ── The stacked progress bar ──────────────────────────────────────
 *
 * Magnitude against a known target, so it is a single track with the target as
 * its full width — the empty remainder IS the message ("220 to go"), which a
 * bar scaled to the data would hide. A 2px surface gap separates the two
 * stacked segments so they never read as one blended block.
 */
export function StackedSalesBar({
  beginner,
  pro,
  target,
  label,
}: {
  beginner: number
  pro: number
  target: number
  label: string
}) {
  const reduced = useReducedMotion()
  const pct = (n: number) => (target > 0 ? Math.min(100, (n / target) * 100) : 0)
  const total = beginner + pro

  return (
    <figure style={{ margin: 0 }}>
      <figcaption
        style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 8 }}
      >
        <span style={microLabel}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: "var(--sch-tx-2)" }}>
          {total.toLocaleString("en-US")} / {target.toLocaleString("en-US")}
        </span>
      </figcaption>

      <div
        role="img"
        aria-label={`${total} of ${target} sales — ${beginner} Beginner and ${pro} Pro`}
        style={{
          position: "relative",
          height: 18,
          borderRadius: 999,
          background: TRACK,
          overflow: "hidden",
          display: "flex",
          gap: 2,
        }}
      >
        <motion.div
          title={`Beginner — ${beginner.toLocaleString("en-US")} sales`}
          initial={reduced ? false : { width: 0 }}
          whileInView={{ width: `${pct(beginner)}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ background: SERIES.beginner, borderRadius: 999, width: reduced ? `${pct(beginner)}%` : undefined }}
        />
        <motion.div
          title={`Pro — ${pro.toLocaleString("en-US")} sales`}
          initial={reduced ? false : { width: 0 }}
          whileInView={{ width: `${pct(pro)}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
          style={{ background: SERIES.pro, borderRadius: 999, width: reduced ? `${pct(pro)}%` : undefined }}
        />
      </div>

      {/* Legend. Present because there are two series; each entry carries its
          own value so the bar is readable without matching colours by eye. */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 10 }}>
        {[
          { name: "Beginner", value: beginner, color: SERIES.beginner },
          { name: "Pro", value: pro, color: SERIES.pro },
        ].map((entry) => (
          <span key={entry.name} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: entry.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: "var(--sch-tx-2)" }}>
              {entry.name} <b style={{ color: "var(--sch-text)", fontWeight: 700 }}>{entry.value.toLocaleString("en-US")}</b>
            </span>
          </span>
        ))}
      </div>
    </figure>
  )
}

/* ── Commission breakdown ──────────────────────────────────────────
 *
 * Two magnitudes to compare, direct-laballed with the figure that matters, so
 * no axis is needed — the numbers ARE the labels and the bars carry the ratio.
 */
export function EarningsRows({ earnings, unitNote = "each" }: { earnings: EarningsBreakdown; unitNote?: string }) {
  const reduced = useReducedMotion()
  const peak = Math.max(earnings.beginnerCommission, earnings.proCommission, 1)

  const rows = [
    {
      name: "Beginner",
      units: earnings.beginnerSales,
      unitPrice: earnings.perBeginnerSale,
      total: earnings.beginnerCommission,
      color: SERIES.beginner,
    },
    { name: "Pro", units: earnings.proSales, unitPrice: earnings.perProSale, total: earnings.proCommission, color: SERIES.pro },
  ]

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {rows.map((row, i) => (
        <div key={row.name}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "var(--sch-tx-1)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: row.color, flexShrink: 0 }} />
              <b style={{ color: "var(--sch-text)", fontWeight: 700 }}>{row.name}</b>
              <span style={{ color: "var(--sch-tx-2)", fontFamily: MONO, fontSize: 11.5 }}>
                {row.units.toLocaleString("en-US")} × {money(row.unitPrice)} {unitNote}
              </span>
            </span>
            <span style={{ fontSize: 15, fontWeight: 800, color: "var(--sch-text)", fontVariantNumeric: "tabular-nums" }}>
              {money(row.total)}
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: TRACK, marginTop: 7, overflow: "hidden" }}>
            <motion.div
              initial={reduced ? false : { width: 0 }}
              whileInView={{ width: `${(row.total / peak) * 100}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.1 }}
              style={{ height: "100%", borderRadius: 999, background: row.color, width: reduced ? `${(row.total / peak) * 100}%` : undefined }}
            />
          </div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          borderTop: "1px solid var(--sch-border)",
          paddingTop: 12,
        }}
      >
        <span style={microLabel}>Total commission</span>
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--sch-text)", fontVariantNumeric: "tabular-nums" }}>
          <NumberFlow value={earnings.totalCommission} format={{ style: "currency", currency: "USD" }} />
        </span>
      </div>
    </div>
  )
}

/* ── "How much is left" ────────────────────────────────────────────
 *
 * The sentence a partner actually wants, stated plainly rather than left to be
 * inferred from a bar: how many more sales, by when.
 */
export function RemainingToReward({ progress }: { progress: RewardProgress }) {
  const { tier, remaining, reached, daysLeft } = progress
  return (
    <div
      style={{
        borderRadius: 14,
        border: `1px solid ${reached ? "rgba(30,158,90,0.35)" : "var(--sch-border)"}`,
        background: reached ? "rgba(30,158,90,0.07)" : "var(--sch-bg)",
        padding: "14px 16px",
      }}
    >
      {reached ? (
        <div style={{ fontSize: 14.5, fontWeight: 700, color: "#1E9E5A" }}>
          Target reached — {tier.prize} unlocked. ✓
        </div>
      ) : (
        <>
          <div style={{ fontSize: 14.5, color: "var(--sch-tx-1)", lineHeight: 1.5 }}>
            <b style={{ color: "var(--sch-text)", fontWeight: 800, fontSize: 17 }}>
              <NumberFlow value={remaining} /> {tier.counts === "pro" ? "Pro sales" : "sales"}
            </b>{" "}
            left to reach the {tier.prize}.
          </div>
          <div style={{ ...microLabel, marginTop: 6 }}>
            {tier.event} · {tier.venue} · {tier.raceDates} · qualify by {tier.deadlineLabel}
            {daysLeft !== null && ` · ${daysLeft} days left`}
          </div>
        </>
      )}
    </div>
  )
}
