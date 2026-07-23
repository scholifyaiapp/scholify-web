import { motion, useReducedMotion } from "motion/react"
import type { CSSProperties, ReactNode } from "react"

/*
 * Shared "Secure payments, powered by Stripe" trust strip.
 * Stripe · Visa · Mastercard · Link · PayPal — clean inline marks in uniform
 * white chips so they render crisply and consistently on any surface.
 * Used on /partners/apply and the landing page (after pricing).
 */

const MONO = "ui-monospace, 'JetBrains Mono', 'SFMono-Regular', monospace"

function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        padding: "0 20px",
        background: "#fff",
        border: "1px solid var(--sch-border)",
        borderRadius: 12,
        boxShadow: "0 1px 2px rgba(20,20,26,0.04)",
      }}
    >
      {children}
    </span>
  )
}

export default function PaymentMethods({
  heading = "Secure payments, powered by Stripe",
  style,
}: {
  heading?: string
  style?: CSSProperties
}) {
  const reduced = useReducedMotion()
  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      }

  return (
    <div style={style}>
      {heading && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--sch-tx-2, #8f8c85)",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {heading}
        </div>
      )}
      <motion.div {...rise} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <Chip>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#635BFF", letterSpacing: "-0.03em" }}>stripe</span>
        </Chip>
        <Chip>
          <span style={{ fontWeight: 800, fontStyle: "italic", fontSize: 20, color: "#1A1F71", letterSpacing: "0.02em" }}>
            VISA
          </span>
        </Chip>
        <Chip>
          <svg width="40" height="25" viewBox="0 0 48 30" aria-label="Mastercard">
            <defs>
              <clipPath id="pm-mc">
                <circle cx="19" cy="15" r="13" />
              </clipPath>
            </defs>
            <circle cx="19" cy="15" r="13" fill="#EB001B" />
            <circle cx="29" cy="15" r="13" fill="#F79E1B" />
            <circle cx="29" cy="15" r="13" fill="#FF5F00" clipPath="url(#pm-mc)" />
          </svg>
        </Chip>
        <Chip>
          <svg width="22" height="22" viewBox="0 0 40 40" aria-label="Link">
            <circle cx="20" cy="20" r="20" fill="#00D66F" />
            <path d="M15 11 L25 20 L15 29" fill="none" stroke="#011E0F" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 800, fontSize: 19, color: "#0A2540", letterSpacing: "-0.02em", marginLeft: 6 }}>link</span>
        </Chip>
        <Chip>
          <span style={{ fontWeight: 800, fontStyle: "italic", fontSize: 19, letterSpacing: "-0.01em" }}>
            <span style={{ color: "#003087" }}>Pay</span>
            <span style={{ color: "#009CDE" }}>Pal</span>
          </span>
        </Chip>
      </motion.div>
    </div>
  )
}
