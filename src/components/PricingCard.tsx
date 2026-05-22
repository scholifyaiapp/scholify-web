import type { CSSProperties } from "react"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"

/* ──────────────────────────────────────────────────────────────
 *  Reusable pricing card for the /pricing page.
 *  Three variants: free, beginner, pro (featured).
 * ────────────────────────────────────────────────────────────── */

export interface PlanFeature {
  text: string
  badge?: "PRO" | "NEW"
}

export interface PricingCardProps {
  name: string
  price: string
  priceUnit: string
  oldPrice?: string
  billedNote?: string
  description: string
  featuresHeader?: string
  features: PlanFeature[]
  cta: string
  variant: "free" | "beginner" | "pro"
  badge?: string
  index?: number
  onCta: () => void
}

const TEXT2 = "var(--sch-tx-2)"

export default function PricingCard({
  name,
  price,
  priceUnit,
  oldPrice,
  billedNote,
  description,
  featuresHeader,
  features,
  cta,
  variant,
  badge,
  index = 0,
  onCta,
}: PricingCardProps) {
  const isPro = variant === "pro"

  const cardStyle: CSSProperties = isPro
    ? {
        background: "rgba(139,92,246,0.07)",
        border: "1px solid rgba(139,92,246,0.35)",
        boxShadow: "0 0 80px rgba(139,92,246,0.15), 0 20px 60px rgba(0,0,0,0.4)",
      }
    : {
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
      }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={isPro ? "lg:scale-[1.04]" : ""}
      style={{
        position: "relative",
        borderRadius: 24,
        padding: 32,
        zIndex: isPro ? 1 : 0,
        ...cardStyle,
      }}
    >
      {badge && (
        <motion.div
          animate={{
            boxShadow: [
              "0 4px 20px rgba(139,92,246,0.4)",
              "0 4px 32px rgba(139,92,246,0.7)",
              "0 4px 20px rgba(139,92,246,0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            background: IRIDESCENT,
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            padding: "5px 20px",
            borderRadius: 20,
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </motion.div>
      )}

      {/* Plan name */}
      <div
        style={{
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: isPro ? "rgba(192,132,252,0.8)" : TEXT2,
          fontWeight: 600,
        }}
      >
        {name}
      </div>

      {/* Price */}
      <motion.div
        key={price + priceUnit}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 14 }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: "-1.5px",
            lineHeight: 1,
            ...(isPro ? iriText : { color: "var(--sch-text)" }),
          }}
        >
          {price}
        </span>
        <span style={{ display: "flex", flexDirection: "column", paddingBottom: 4, gap: 1 }}>
          {oldPrice && (
            <span
              style={{ fontSize: 13, color: "var(--sch-tx-3)", textDecoration: "line-through" }}
            >
              {oldPrice}
            </span>
          )}
          <span style={{ fontSize: 15, color: TEXT2 }}>{priceUnit}</span>
        </span>
      </motion.div>
      {billedNote && (
        <div style={{ fontSize: 12, color: TEXT2, marginTop: 4 }}>{billedNote}</div>
      )}

      {/* Description */}
      <div style={{ fontSize: 13, color: TEXT2, marginTop: 8 }}>{description}</div>

      <div style={{ height: 1, background: "var(--sch-border)", margin: "20px 0" }} />

      {/* Features */}
      {featuresHeader && (
        <div
          style={{
            fontSize: 12,
            color: TEXT2,
            letterSpacing: "0.06em",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {featuresHeader}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {features.map((f) => (
          <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 18,
                height: 18,
                flexShrink: 0,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                background: variant === "free" ? "var(--sch-border-2)" : IRIDESCENT,
                color: variant === "free" ? "var(--sch-tx-2)" : "#fff",
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontSize: 14,
                color: variant === "free" ? "var(--sch-tx-2)" : "var(--sch-tx-1)",
                flex: 1,
              }}
            >
              {f.text}
            </span>
            {f.badge && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 7px",
                  borderRadius: 8,
                  background:
                    f.badge === "NEW" ? "rgba(52,211,153,0.2)" : "rgba(139,92,246,0.2)",
                  color: f.badge === "NEW" ? "#34D399" : "#C084FC",
                }}
              >
                {f.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        type="button"
        onClick={onCta}
        whileHover={{ scale: isPro ? 1.03 : 1.01 }}
        whileTap={{ scale: 0.97 }}
        style={{
          width: "100%",
          height: 52,
          marginTop: 28,
          borderRadius: 14,
          fontSize: isPro ? 16 : 15,
          fontWeight: isPro ? 700 : 600,
          cursor: "pointer",
          color: isPro ? "#fff" : "var(--sch-text)",
          background: isPro ? IRIDESCENT : "var(--sch-card)",
          border: isPro
            ? "none"
            : `1px solid ${variant === "beginner" ? "rgba(139,92,246,0.2)" : "var(--sch-border-2)"}`,
          boxShadow: isPro ? "0 0 40px rgba(139,92,246,0.3)" : "none",
        }}
      >
        {cta}
      </motion.button>
    </motion.div>
  )
}
