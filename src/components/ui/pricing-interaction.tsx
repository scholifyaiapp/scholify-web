import NumberFlow from "@number-flow/react"
import { useState } from "react"

interface PricingInteractionProps {
  starterMonth: number
  starterAnnual: number
  proMonth: number
  proAnnual: number
  freeLabel?: string
  starterLabel?: string
  proLabel?: string
  ctaLabel?: string
  onCta?: (selectedTier: 0 | 1 | 2, period: 0 | 1) => void
}

export function PricingInteraction({
  starterMonth,
  starterAnnual,
  proMonth,
  proAnnual,
  freeLabel = "Free",
  starterLabel = "Beginner",
  proLabel = "Pro",
  ctaLabel = "Get Started",
  onCta,
}: PricingInteractionProps) {
  const [active, setActive] = useState<0 | 1 | 2>(0)
  const [period, setPeriod] = useState<0 | 1>(0)
  const [starter, setStarter] = useState(starterMonth)
  const [pro, setPro] = useState(proMonth)

  const handleChangePlan = (index: 0 | 1 | 2) => setActive(index)
  const handleChangePeriod = (index: 0 | 1) => {
    setPeriod(index)
    if (index === 0) {
      setStarter(starterMonth)
      setPro(proMonth)
    } else {
      setStarter(starterAnnual)
      setPro(proAnnual)
    }
  }

  return (
    <div
      style={{
        background: "var(--card)",
        color: "var(--card-foreground)",
        border: "2px solid var(--border)",
        borderRadius: 32,
        padding: 12,
        boxShadow: "0 1px 2px rgba(20,20,26,0.04), 0 16px 40px rgba(20,20,26,0.08)",
        maxWidth: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: 6,
          borderRadius: 999,
          background: "var(--muted)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => handleChangePeriod(0)}
          style={{
            position: "relative",
            zIndex: 20,
            flex: 1,
            padding: 6,
            borderRadius: 999,
            border: "none",
            background: "transparent",
            color: "var(--foreground)",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => handleChangePeriod(1)}
          style={{
            position: "relative",
            zIndex: 20,
            flex: 1,
            padding: 6,
            borderRadius: 999,
            border: "none",
            background: "transparent",
            color: "var(--foreground)",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Yearly
        </button>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "50%",
            padding: 6,
            zIndex: 10,
            transform: `translateX(${period * 100}%)`,
            transition: "transform 0.3s ease",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 999,
              background: "var(--background)",
              boxShadow: "0 1px 3px rgba(20,20,26,0.08)",
            }}
          />
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        <PlanRow
          active={active === 0}
          onClick={() => handleChangePlan(0)}
          title={freeLabel}
          rightLabel={<><span style={{ color: "var(--foreground)", fontWeight: 500 }}>$0.00</span>/month</>}
        />

        <PlanRow
          active={active === 1}
          onClick={() => handleChangePlan(1)}
          title={
            <>
              {starterLabel}{" "}
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 8,
                  background: "var(--secondary)",
                  color: "var(--secondary-foreground)",
                  fontSize: 12,
                  fontWeight: 700,
                  marginLeft: 6,
                }}
              >
                Popular
              </span>
            </>
          }
          rightLabel={
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{ color: "var(--foreground)", fontWeight: 500, display: "inline-flex", alignItems: "center" }}>
                $&nbsp;
                <NumberFlow value={starter} />
              </span>
              <span style={{ marginLeft: 4 }}>/month</span>
            </span>
          }
        />

        <PlanRow
          active={active === 2}
          onClick={() => handleChangePlan(2)}
          title={proLabel}
          rightLabel={
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{ color: "var(--foreground)", fontWeight: 500, display: "inline-flex", alignItems: "center" }}>
                $&nbsp;
                <NumberFlow value={pro} />
              </span>
              <span style={{ marginLeft: 4 }}>/month</span>
            </span>
          }
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 88,
            border: "3px solid var(--primary)",
            borderRadius: 16,
            pointerEvents: "none",
            transform: `translateY(${active * 88 + 12 * active}px)`,
            transition: "transform 0.3s ease",
            boxShadow: "0 8px 24px -8px color-mix(in oklab, var(--primary) 50%, transparent)",
          }}
        />
      </div>

      <button
        onClick={() => onCta?.(active, period)}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 999,
          border: "none",
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          fontSize: 17,
          fontWeight: 700,
          cursor: "pointer",
          transition: "transform 0.2s ease, filter 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {ctaLabel}
      </button>
    </div>
  )
}

function PlanRow({
  active,
  onClick,
  title,
  rightLabel,
}: {
  active: boolean
  onClick: () => void
  title: React.ReactNode
  rightLabel: React.ReactNode
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 88,
        padding: 16,
        borderRadius: 16,
        border: "2px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        background: "transparent",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 20, color: "var(--foreground)", display: "inline-flex", alignItems: "center" }}>
          {title}
        </p>
        <p style={{ margin: 0, color: "var(--muted-foreground)", fontSize: 15 }}>{rightLabel}</p>
      </div>
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: `2px solid ${active ? "var(--primary)" : "var(--muted-foreground)"}`,
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.3s ease",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "var(--primary)",
            opacity: active ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    </div>
  )
}
