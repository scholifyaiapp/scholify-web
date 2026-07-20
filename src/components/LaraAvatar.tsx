import { IRIDESCENT } from "@/components/auth/auth-ui"

/*
 * Lara's avatar — the photo inside an iridescent gradient ring.
 * Use this anywhere Lara is represented instead of a plain "L" letter.
 */
export default function LaraAvatar({ size = 32 }: { size?: number }) {
  const ring = Math.max(2, Math.round(size * 0.06))
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        padding: ring,
        background: IRIDESCENT,
        boxShadow: "0 4px 16px rgba(200,0,0,0.4)",
      }}
    >
      <img
        src="/charles-helmet-avatar-512.png"
        alt="Charles, Scholify AI race engineer"
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          display: "block",
          objectFit: "cover",
          background: "#0b0b0f",
        }}
      />
    </div>
  )
}
