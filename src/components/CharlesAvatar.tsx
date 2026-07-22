import { IRIDESCENT } from "@/components/auth/auth-ui"
import { ScholifyMark } from "@/components/brand"

/*
 * Charles's avatar — the Scholify hex mark on the brand gradient. (Replaced the
 * photoreal F1-driver image; the persona is represented by our own logo.)
 */
export default function CharlesAvatar({ size = 32 }: { size?: number }) {
  return (
    <div
      role="img"
      aria-label="Charles, your Scholify AI race engineer"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        background: IRIDESCENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(200,0,0,0.4)",
      }}
    >
      <ScholifyMark size={Math.round(size * 0.6)} variant="white" />
    </div>
  )
}
