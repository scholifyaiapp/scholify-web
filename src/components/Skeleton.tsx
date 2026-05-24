import type { CSSProperties } from "react"

/*
 * Shared loading skeletons. One <Skeleton/> primitive with a shimmer
 * animation plus a few opinionated shapes that match the cards used
 * across the app, so every page can drop in a matching placeholder.
 */

const SHIMMER_CSS = `
  @keyframes scholify-skeleton-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`

const shimmer: CSSProperties = {
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 100%)",
  backgroundSize: "200% 100%",
  animation: "scholify-skeleton-shimmer 1.5s linear infinite",
  borderRadius: 8,
}

export function Skeleton({
  width = "100%",
  height = 14,
  radius = 8,
  style,
}: {
  width?: number | string
  height?: number | string
  radius?: number
  style?: CSSProperties
}) {
  return (
    <>
      <style>{SHIMMER_CSS}</style>
      <span style={{ ...shimmer, display: "block", width, height, borderRadius: radius, ...style }} />
    </>
  )
}

export function RoomCardSkeleton() {
  return (
    <>
      <style>{SHIMMER_CSS}</style>
      <div
        style={{
          padding: 20,
          borderRadius: 20,
          background: "var(--sch-card, rgba(255,255,255,0.03))",
          border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ ...shimmer, width: 24, height: 24, borderRadius: 6 }} />
          <span style={{ ...shimmer, height: 14, borderRadius: 6, flex: 1 }} />
        </div>
        <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
          <span style={{ ...shimmer, height: 11, borderRadius: 6, width: "82%" }} />
          <span style={{ ...shimmer, height: 11, borderRadius: 6, width: "62%" }} />
        </div>
        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <span style={{ ...shimmer, height: 22, borderRadius: 999, width: 80 }} />
          <span style={{ ...shimmer, height: 22, borderRadius: 999, width: 110 }} />
        </div>
      </div>
    </>
  )
}

export function CommunityPostSkeleton() {
  return (
    <>
      <style>{SHIMMER_CSS}</style>
      <div
        style={{
          padding: 16,
          borderRadius: 16,
          background: "var(--sch-card, rgba(255,255,255,0.03))",
          border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...shimmer, width: 32, height: 32, borderRadius: 999 }} />
          <div style={{ flex: 1, display: "grid", gap: 4 }}>
            <span style={{ ...shimmer, height: 12, borderRadius: 6, width: 120 }} />
            <span style={{ ...shimmer, height: 10, borderRadius: 6, width: 70 }} />
          </div>
          <span style={{ ...shimmer, height: 18, borderRadius: 999, width: 72 }} />
        </div>
        <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
          <span style={{ ...shimmer, height: 13, borderRadius: 6, width: "90%" }} />
          <span style={{ ...shimmer, height: 11, borderRadius: 6, width: "60%" }} />
        </div>
      </div>
    </>
  )
}

export function GoalCardSkeleton() {
  return (
    <>
      <style>{SHIMMER_CSS}</style>
      <div
        style={{
          padding: 22,
          borderRadius: 18,
          background: "var(--sch-card, rgba(255,255,255,0.03))",
          border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
        }}
      >
        <span style={{ ...shimmer, height: 16, borderRadius: 6, width: "70%", display: "block" }} />
        <span style={{ ...shimmer, height: 10, borderRadius: 6, width: "40%", display: "block", marginTop: 8 }} />
        <span style={{ ...shimmer, height: 6, borderRadius: 6, width: "100%", display: "block", marginTop: 16 }} />
      </div>
    </>
  )
}

export function ResourceCardSkeleton() {
  return (
    <>
      <style>{SHIMMER_CSS}</style>
      <div
        style={{
          padding: 14,
          borderRadius: 14,
          background: "var(--sch-card, rgba(255,255,255,0.03))",
          border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <span style={{ ...shimmer, width: 40, height: 40, borderRadius: 10 }} />
        <div style={{ flex: 1, display: "grid", gap: 6 }}>
          <span style={{ ...shimmer, height: 12, borderRadius: 6, width: "75%" }} />
          <span style={{ ...shimmer, height: 10, borderRadius: 6, width: "45%" }} />
        </div>
      </div>
    </>
  )
}
