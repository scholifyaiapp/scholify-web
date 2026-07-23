import { useReducedMotion } from "motion/react"

/*
 * Continuously-scrolling logo wall of the ACCA ecosystem Scholify prepares
 * students for. Two copies of the set scroll seamlessly (-50%). Pauses on
 * hover and for prefers-reduced-motion.
 *
 * IMPORTANT (honesty): these are shown as the qualification/institutions
 * Scholify prepares students for — NOT as partners or endorsers. The caption
 * states Scholify is independent and unaffiliated. Do not relabel as
 * "partners"/"trusted by" without real agreements.
 */

interface Logo {
  src: string
  alt: string
}

const LOGOS: Logo[] = [
  { src: "/partners/university-of-london.jpg", alt: "University of London" },
  { src: "/partners/oxford-brookes.png", alt: "Oxford Brookes University" },
  { src: "/partners/bpp.jpg", alt: "BPP" },
  { src: "/partners/kaplan.png", alt: "Kaplan Financial Education" },
  { src: "/partners/global-mba.png", alt: "Oxford Brookes Global MBA" },
]

export default function PartnerLogos({
  heading,
  caption,
}: {
  heading?: string
  caption?: string
}) {
  const reduced = useReducedMotion()
  // Two copies → seamless -50% loop.
  const row = [...LOGOS, ...LOGOS]

  return (
    <section
      aria-label="Institutions and qualifications Scholify prepares you for"
      style={{ padding: "64px 0", overflow: "hidden" }}
    >
      <style>{`
        @keyframes sch-logo-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .sch-marquee-track { animation: sch-logo-marquee 34s linear infinite; }
        .sch-marquee-viewport:hover .sch-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .sch-marquee-track { animation: none; transform: none; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      {(heading || caption) && (
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 32px", padding: "0 24px" }}>
          {heading && (
            <div
              style={{
                fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--sch-tx-2, #8f8c85)",
                marginBottom: 10,
              }}
            >
              {heading}
            </div>
          )}
          {caption && (
            <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--sch-text, #14141A)", fontWeight: 600, margin: 0 }}>
              {caption}
            </p>
          )}
        </div>
      )}

      {/* edge-faded viewport */}
      <div
        className="sch-marquee-viewport"
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="sch-marquee-track" style={{ display: "flex", gap: 20, width: "max-content", padding: "0 10px" }}>
          {row.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              style={{
                flexShrink: 0,
                height: 84,
                width: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 24px",
                background: "#fff",
                border: "1px solid var(--sch-border, #e5dbc7)",
                borderRadius: 16,
                boxShadow: "0 1px 3px rgba(20,20,26,0.05)",
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                style={{ maxHeight: 52, maxWidth: "100%", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: 11.5,
          color: "var(--sch-tx-2, #8f8c85)",
          lineHeight: 1.5,
          maxWidth: 640,
          margin: "26px auto 0",
          padding: "0 24px",
        }}
      >
        Logos are shown for identification only. Scholify is an independent study tool and is not affiliated with,
        endorsed by, or a partner of these organisations.
      </p>
    </section>
  )
}
