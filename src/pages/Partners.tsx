import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion, type Variants } from "motion/react"
import NumberFlow from "@number-flow/react"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { dollarsFromCents, fetchAffiliateDashboard, formatMoney, type AffiliateDashboard } from "@/lib/affiliate"
import {
  classifySaleAmount,
  commissionTierForPaidCustomers,
  REWARD_TIERS,
  rewardProgress,
  round2,
  type EarningsBreakdown,
} from "@/lib/partner-rewards"
import {
  CommissionTierLadder,
  EarningsRows,
  RemainingToReward,
  RewardRing,
  StackedSalesBar,
} from "@/components/partner/reward-progress"

/* ──────────────────────────────────────────────────────────────
 *  /partners — the partner (affiliate) dashboard. Shows the
 *  partner's link, code, clicks, sales, commission balance and
 *  progress toward the F1 reward tiers. Reads the partner's own
 *  rows via Supabase RLS.
 *
 *  The reward panel deliberately uses the SAME components as the
 *  worked example on /partners/apply: a partner who was persuaded
 *  by that page should recognise this one on sight.
 * ────────────────────────────────────────────────────────────── */

const SITE = "https://scholifyapp.com"
const MONO = "ui-monospace, 'JetBrains Mono', 'SFMono-Regular', monospace"
const EASE = [0.16, 1, 0.3, 1] as const

/** The API returns at most this many commission rows (api/affiliate.ts:231). */
const COMMISSION_PAGE_LIMIT = 200

const card: CSSProperties = { background: "var(--sch-card)", border: "1px solid var(--sch-border)", borderRadius: 18, padding: 22 }
const microLabel: CSSProperties = {
  fontFamily: MONO,
  fontSize: 10.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--sch-tx-2)",
}

const gridStagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } }
const gridItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

/*
 * A stat tile. The value counts up rather than appearing, because a dashboard
 * whose numbers change while you watch reads as live — but only ever from 0 to
 * the real figure on first paint, never as a decorative loop.
 */
function Stat({
  label,
  value,
  format,
  suffix,
  hint,
  reduced,
}: {
  label: string
  value: number
  format?: Omit<Intl.NumberFormatOptions, "notation">
  suffix?: string
  hint?: string
  reduced: boolean | null
}) {
  return (
    <motion.div variants={reduced ? undefined : gridItem} style={{ ...card, padding: 18 }}>
      <div style={microLabel}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: "var(--sch-text)", marginTop: 8, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
        {reduced ? (
          <span>
            {format ? value.toLocaleString("en-US", format) : value.toLocaleString("en-US")}
            {suffix}
          </span>
        ) : (
          <NumberFlow value={value} format={format} suffix={suffix} />
        )}
      </div>
      {hint && <div style={{ fontSize: 11.5, color: "var(--sch-tx-2)", marginTop: 5, lineHeight: 1.4 }}>{hint}</div>}
    </motion.div>
  )
}

/** Shaped like the content it replaces, so nothing jumps when the data lands. */
function Skeleton({ height, radius = 18 }: { height: number; radius?: number }) {
  return (
    <div
      aria-hidden
      style={{
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, var(--sch-card) 0%, color-mix(in srgb, var(--sch-text) 6%, var(--sch-card)) 50%, var(--sch-card) 100%)",
        backgroundSize: "200% 100%",
        animation: "partner-skeleton 1.4s ease-in-out infinite",
        border: "1px solid var(--sch-border)",
      }}
    />
  )
}

function SectionTitle({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sch-text)" }}>{children}</div>
      {note && <div style={{ fontSize: 11.5, color: "var(--sch-tx-2)" }}>{note}</div>}
    </div>
  )
}

export default function Partners() {
  const reduced = useReducedMotion()
  const [data, setData] = useState<AffiliateDashboard | null>(null)
  const [copied, setCopied] = useState<"link" | "code" | "community" | "linkedin" | null>(null)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  useEffect(() => {
    let alive = true
    const load = () => void fetchAffiliateDashboard().then((d) => {
      if (!alive) return
      setData(d)
      setUpdatedAt(new Date())
    })
    load()
    const timer = window.setInterval(load, 30_000)
    const onVisible = () => document.visibilityState === "visible" && load()
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      alive = false
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [])

  const aff = data?.affiliate ?? null
  const link = aff ? `${SITE}/?aff=${aff.code}` : ""

  /*
   * Sales counts are recovered from the commission rows, because a commission
   * row IS a qualifying sale and the API returns no separate count. The rows
   * are capped at 200, so a partner past that cap sees a floor rather than a
   * total — said out loud below rather than quietly under-reporting progress
   * toward a reward.
   */
  const derived = useMemo(() => {
    const rows = data?.commissions ?? []
    const bucket = {
      beginner: { count: 0, revenue: 0, commission: 0 },
      pro: { count: 0, revenue: 0, commission: 0 },
      other: { count: 0, revenue: 0, commission: 0 },
    }
    let lifetime = 0
    const acquired = { beginner: 0, pro: 0, other: 0 }
    for (const row of rows) {
      // The API and database use integer cents; the shared earnings visuals use
      // dollar values. Convert exactly once at this boundary so $4.05 never
      // appears as $405 in summaries while history shows the correct amount.
      lifetime += dollarsFromCents(row.commission_amount)
      const classified = row.plan === "pro" || row.plan === "annual_pro"
        ? "pro"
        : row.plan === "beginner"
          ? "beginner"
          : classifySaleAmount(row.sale_amount)
      const slot = bucket[classified]
      slot.count += 1
      slot.revenue += dollarsFromCents(row.sale_amount)
      slot.commission += dollarsFromCents(row.commission_amount)
      // Legacy rows predate billing_cycle and were all first purchases. Renewal
      // payments earn money but must not inflate unique-customer race rewards.
      if (row.billing_cycle == null || row.billing_cycle === 1) acquired[classified] += 1
    }
    const counted = acquired.beginner + acquired.pro + acquired.other
    /*
     * Per-sale figures here are the partner's OWN average, not the published
     * $2.70/$4.05 — an annual plan pays a different amount on the same tier, so
     * quoting the monthly rate against their real totals would not reconcile.
     * The total is the sum of the two rows printed above it; anything on a
     * retired or non-standard price lands in "other" and is reported by the
     * lifetime-commission tile instead of being silently folded in.
     */
    const earnings: EarningsBreakdown = {
      beginnerSales: bucket.beginner.count,
      proSales: bucket.pro.count,
      totalSales: bucket.beginner.count + bucket.pro.count,
      beginnerRevenue: round2(bucket.beginner.revenue),
      proRevenue: round2(bucket.pro.revenue),
      totalRevenue: round2(bucket.beginner.revenue + bucket.pro.revenue),
      beginnerCommission: round2(bucket.beginner.commission),
      proCommission: round2(bucket.pro.commission),
      totalCommission: round2(bucket.beginner.commission + bucket.pro.commission),
      perBeginnerSale: bucket.beginner.count ? round2(bucket.beginner.commission / bucket.beginner.count) : 0,
      perProSale: bucket.pro.count ? round2(bucket.pro.commission / bucket.pro.count) : 0,
    }
    return {
      beginner: acquired.beginner,
      pro: acquired.pro,
      other: acquired.other,
      counted,
      payments: rows.length,
      lifetime: round2(lifetime),
      earnings,
      capped: counted >= COMMISSION_PAGE_LIMIT,
    }
  }, [data])

  const tierOne = rewardProgress(REWARD_TIERS[0], { all: derived.counted, pro: derived.pro }, Date.now())
  const tierTwo = rewardProgress(REWARD_TIERS[1], { all: derived.counted, pro: derived.pro }, Date.now())

  const clicks = aff?.clicks ?? 0
  const invited = data?.totals.invitedUsers ?? 0
  const paidInvited = data?.totals.paidInvitedUsers ?? 0
  const performanceTier = commissionTierForPaidCustomers(paidInvited)
  const promoPosts = useMemo(() => [
    {
      id: "community" as const,
      label: "Study group / community",
      text: `I use Scholify to diagnose ACCA gaps, build a daily plan and practise with exam-style questions. You can explore it here: ${link}\n\nPartner link — I may earn commission if you subscribe.`,
    },
    {
      id: "linkedin" as const,
      label: "LinkedIn",
      text: `ACCA preparation works better when the plan adapts to the learner, not the other way around. Scholify combines diagnostics, daily planning, timed mocks and AI marking across all 15 papers. Explore it here: ${link}\n\nDisclosure: this is my Scholify partner link and I may earn commission from qualifying subscriptions.`,
    },
  ], [link])

  const copy = (text: string, which: "link" | "code" | "community" | "linkedin") => {
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(which)
      setTimeout(() => setCopied(null), 1600)
    })
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--sch-bg)" }}>
      <style>{"@keyframes partner-skeleton { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }"}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", maxWidth: 960, margin: "0 auto" }}>
        <Link to="/" style={{ textDecoration: "none", display: "inline-flex" }} aria-label="Scholify">
          <ScholifyLockup size={24} color="var(--sch-text)" />
        </Link>
        <Link to="/study" style={{ fontSize: 14, color: "var(--sch-tx-1)", textDecoration: "none" }}>
          Go to app →
        </Link>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", margin: "24px 0 20px" }}>
          <h1 style={{ fontSize: "clamp(24px,5vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--sch-text)", margin: 0 }}>
            Partner dashboard
          </h1>
          {updatedAt && <span style={{ fontSize: 11.5, color: "var(--sch-tx-2)" }}>Live · refreshed {updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>}
        </div>

        {/* Loading — shaped like the real thing, so the page does not reflow. */}
        {!data && (
          <div style={{ display: "grid", gap: 16 }}>
            <Skeleton height={132} />
            <Skeleton height={240} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} height={92} />
              ))}
            </div>
          </div>
        )}

        {/* Not a partner yet / pending */}
        {data && !aff && (
          <div style={{ ...card, textAlign: "center", padding: "40px 24px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <CharlesMascot pose="idea" size={120} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--sch-text)", margin: "0 0 8px" }}>You're not a partner yet</h2>
            <p style={{ fontSize: 15, color: "var(--sch-tx-2)", lineHeight: 1.6, maxWidth: 420, margin: "0 auto 20px" }}>
              Apply to the Scholify partner program and earn 27% on qualifying plan sales you refer. If you've already applied, your account activates once we review it.
            </p>
            <Link
              to="/partners/apply"
              style={{ display: "inline-block", padding: "12px 24px", borderRadius: 12, background: IRIDESCENT, color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none" }}
            >
              Apply now
            </Link>
          </div>
        )}

        {/* Active / pending partner */}
        {aff && data && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ display: "grid", gap: 16 }}
          >
            {aff.status !== "active" && (
              <div style={{ fontSize: 14, color: "rgba(200,0,0,0.9)", background: "rgba(200,0,0,0.06)", border: "1px solid rgba(200,0,0,0.2)", borderRadius: 12, padding: "12px 16px" }}>
                Your partner account is <strong>{aff.status}</strong> — your link starts earning once we activate it.
              </div>
            )}

            {/* Link + code */}
            <div style={card}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sch-tx-1)", marginBottom: 10 }}>Your referral link</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <code style={{ flex: "1 1 260px", fontFamily: MONO, fontSize: 14, color: "var(--sch-text)", background: "var(--sch-bg)", border: "1px solid var(--sch-border)", borderRadius: 10, padding: "10px 12px", overflowX: "auto", whiteSpace: "nowrap" }}>
                  {link}
                </code>
                <button
                  type="button"
                  onClick={() => copy(link, "link")}
                  style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: IRIDESCENT, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {copied === "link" ? "Copied ✓" : "Copy link"}
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "var(--sch-tx-2)" }}>Code:</span>
                <button
                  type="button"
                  onClick={() => copy(aff.code, "code")}
                  style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, letterSpacing: "0.06em", ...iriText, background: "none", border: "1px dashed var(--sch-border)", borderRadius: 8, padding: "4px 10px", cursor: "pointer" }}
                >
                  {aff.code}
                </button>
                {copied === "code" && <span style={{ fontSize: 12, color: "var(--sch-tx-2)" }}>Copied ✓</span>}
                <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--sch-tx-2)" }}>
                  {(aff.commission_rate * 100).toFixed(0)}% · {performanceTier.monthlyPayments} paid {performanceTier.monthlyPayments === 1 ? "month" : "months"}
                </span>
              </div>
            </div>

            <div style={{ ...card, position: "relative", overflow: "hidden" }}>
              <motion.div
                aria-hidden
                animate={reduced ? undefined : { x: ["-140%", "220%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0, width: "35%", background: "linear-gradient(105deg,transparent,rgba(244,164,5,.12),transparent)", pointerEvents: "none" }}
              />
              <div style={{ position: "relative" }}>
                <SectionTitle note="Unique paid learners, not clicks">Performance commission</SectionTitle>
                <CommissionTierLadder paidCustomers={paidInvited} />
              </div>
            </div>

            <div style={card}>
              <SectionTitle note="Disclosure included">Promotion studio</SectionTitle>
              <p style={{ margin: "0 0 14px", color: "var(--sch-tx-2)", fontSize: 13, lineHeight: 1.55 }}>
                Start with accurate, ready-to-post copy. Personalise it with your real experience, keep the partner disclosure, and never promise an exam pass.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
                {promoPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease: EASE }}
                    style={{ padding: 15, borderRadius: 14, background: "var(--sch-bg)", border: "1px solid var(--sch-border)", display: "grid", gap: 11 }}
                  >
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: "var(--sch-text)" }}>{post.label}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.55, color: "var(--sch-tx-2)", whiteSpace: "pre-line" }}>{post.text}</div>
                    <motion.button
                      type="button"
                      whileHover={reduced ? undefined : { y: -2 }}
                      whileTap={reduced ? undefined : { scale: .98 }}
                      onClick={() => copy(post.text, post.id)}
                      style={{ justifySelf: "start", border: 0, borderRadius: 10, padding: "9px 13px", background: copied === post.id ? "rgba(30,125,80,.12)" : IRIDESCENT, color: copied === post.id ? "#1E7D50" : "#fff", fontSize: 12.5, fontWeight: 800, cursor: "pointer" }}
                    >
                      {copied === post.id ? "Copied ✓" : "Copy ready-to-post text"}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Reward progress ─────────────────────────────────────
                The thing a partner opens this page to check. Same ring,
                same bar, same wording as the offer page's example. */}
            <div style={card}>
              <SectionTitle note={derived.capped ? `Based on your most recent ${COMMISSION_PAGE_LIMIT} commissions` : undefined}>
                Road to the race
              </SectionTitle>
              <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <RewardRing beginner={derived.beginner} pro={derived.pro} target={tierOne.target} percent={tierOne.percent} />
                </div>
                <div style={{ display: "grid", gap: 18 }}>
                  <StackedSalesBar beginner={derived.beginner} pro={derived.pro} target={tierOne.target} label={`Progress to the ${tierOne.tier.prize}`} />
                  <RemainingToReward progress={tierOne} />
                </div>
              </div>

              <div style={{ height: 1, background: "var(--sch-border)", margin: "22px 0" }} />

              {/* Tier 2 — Pro-only, so it gets its own line rather than sharing
                  the bar above, which counts every plan. */}
              <StackedSalesBar beginner={0} pro={derived.pro} target={tierTwo.target} label={`Progress to the ${tierTwo.tier.event}`} />
              <div style={{ marginTop: 14 }}>
                <RemainingToReward progress={tierTwo} />
              </div>
            </div>

            {/* ── Metrics ─────────────────────────────────────────── */}
            <div>
              <SectionTitle>Your numbers</SectionTitle>
              <motion.div
                variants={reduced ? undefined : gridStagger}
                initial={reduced ? undefined : "hidden"}
                animate={reduced ? undefined : "show"}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}
              >
                <Stat reduced={reduced} label="Clicks" value={clicks} />
                <Stat reduced={reduced} label="Invited users" value={invited} hint="Signed up through your link" />
                <Stat reduced={reduced} label="Paid invited" value={paidInvited} hint="Invited users who bought a plan" />
                <Stat
                  reduced={reduced}
                  label="Invite conversion"
                  value={invited ? Math.round((paidInvited / invited) * 100) : 0}
                  suffix="%"
                  hint="Paid ÷ invited"
                />
                <Stat reduced={reduced} label="Unique paid learners" value={paidInvited} hint="The number that unlocks commission tiers" />
                <Stat
                  reduced={reduced}
                  label="Earnings per click"
                  value={clicks ? derived.lifetime / clicks : 0}
                  format={{ style: "currency", currency: "USD" }}
                  hint="Lifetime commission ÷ clicks"
                />
                <Stat
                  reduced={reduced}
                  label="Average per payment"
                  value={derived.payments ? derived.lifetime / derived.payments : 0}
                  format={{ style: "currency", currency: "USD" }}
                />
                <Stat reduced={reduced} label="Pending" value={dollarsFromCents(data.totals.pending)} format={{ style: "currency", currency: "USD" }} hint="Clears 30 days after purchase" />
                <Stat reduced={reduced} label="Approved" value={dollarsFromCents(data.totals.approved + data.totals.paid)} format={{ style: "currency", currency: "USD" }} hint="Cleared and payable" />
                <Stat reduced={reduced} label="Lifetime commission" value={derived.lifetime} format={{ style: "currency", currency: "USD" }} />
              </motion.div>
            </div>

            {/* ── Where the money came from ───────────────────────── */}
            {derived.counted > 0 && (
              <div style={card}>
                <SectionTitle>Commission by paid invoice</SectionTitle>
                <EarningsRows earnings={derived.earnings} unitNote="avg payment" />
              </div>
            )}

            {/* Commission history */}
            <div style={card}>
              <SectionTitle note={derived.capped ? `Most recent ${COMMISSION_PAGE_LIMIT}` : undefined}>Commissions</SectionTitle>
              {data.commissions.length === 0 ? (
                <p style={{ fontSize: 14, color: "var(--sch-tx-2)", margin: 0, lineHeight: 1.6 }}>
                  No commissions yet — share your link to get started. You earn {(aff.commission_rate * 100).toFixed(0)}%
                  on the first successful payment, then unlock three- and five-payment windows through performance.
                </p>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {data.commissions.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: Math.min(i, 12) * 0.03 }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 12px", borderRadius: 10, background: "var(--sch-bg)", border: "1px solid var(--sch-border)" }}
                    >
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sch-text)" }}>{formatMoney(c.commission_amount, c.currency)}</div>
                        <div style={{ fontSize: 12, color: "var(--sch-tx-2)" }}>
                          on {formatMoney(c.sale_amount, c.currency)} payment
                          {c.billing_cycle ? ` · cycle ${c.billing_cycle} of ${c.commission_cycles ?? 1}` : " · first payment"}
                        </div>
                      </div>
                      <StatusPill status={c.status} availableAfter={c.available_after} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <p style={{ fontSize: 12.5, color: "var(--sch-tx-2)", lineHeight: 1.6, textAlign: "center", margin: 0 }}>
              First-touch attribution lasts 90 days and becomes permanent when the learner registers. Tier windows apply prospectively, annual plans earn once on the full annual payment, and every commission clears after 30 days. Refunds and chargebacks void the related commission.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function StatusPill({ status, availableAfter }: { status: string; availableAfter: string }) {
  const clears = new Date(availableAfter)
  const pendingClearing = status === "pending" && clears.getTime() > Date.now()
  const map: Record<string, { bg: string; fg: string; label: string }> = {
    pending: { bg: "rgba(244,164,5,0.12)", fg: "#B7791F", label: pendingClearing ? `Clears ${clears.toLocaleDateString()}` : "Pending" },
    approved: { bg: "rgba(200,0,0,0.08)", fg: "#C80000", label: "Approved" },
    paid: { bg: "rgba(34,160,90,0.12)", fg: "#1E9E5A", label: "Paid" },
    canceled: { bg: "var(--sch-bg)", fg: "var(--sch-tx-2)", label: "Void" },
  }
  const s = map[status] ?? map.pending
  return (
    <span style={{ fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 999, background: s.bg, color: s.fg, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  )
}
