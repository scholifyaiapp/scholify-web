import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { formatDistanceToNowStrict } from "date-fns"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useAuth } from "@/lib/auth"
import {
  CATEGORY_ICON,
  CATEGORY_LABEL,
  cheerPost,
  hueFor,
  postsForCategory,
  subscribePosts,
  type CommunityPost,
  type GoalCategory,
} from "@/lib/community-storage"

/*
 * Live community feed.
 *
 * Filter (passed in) controls which posts show; infinite scroll loads
 * older posts 20 at a time; new posts arriving via realtime stack into a
 * "X new posts ↑" pill so the user isn't yanked away from what they're
 * reading.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

const cardBase: CSSProperties = {
  borderRadius: 16,
  padding: 16,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

const PAGE = 20

export type CommunityFilter = "all" | "following" | GoalCategory

interface Props {
  filter: CommunityFilter
  myCategory?: GoalCategory
}

export default function CommunityFeed({ filter, myCategory }: Props) {
  const { user } = useAuth()
  const me = user?.id || "demo-user"

  const [tick, setTick] = useState(0)
  const [count, setCount] = useState(PAGE)
  const [pending, setPending] = useState<CommunityPost[]>([])
  const scrollerRef = useRef<HTMLDivElement>(null)

  // All posts that match the filter, newest first.
  const visible = useMemo(() => {
    const cat: GoalCategory | "all" | "following" = filter
    return postsForCategory(cat, myCategory)
    // Re-evaluate on tick (cheer + realtime + filter changes).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, myCategory, tick])

  // Reset to first page when filter changes.
  useEffect(() => {
    setCount(PAGE)
    setPending([])
  }, [filter, myCategory])

  // Realtime: new posts buffered into `pending` until the user clicks
  // the "new posts" pill.
  useEffect(() => {
    const handle = subscribePosts((post) => {
      // Ignore posts that don't match the current filter so the pill
      // never lies.
      if (filter !== "all") {
        const cat = filter === "following" ? myCategory : filter
        if (cat && post.goalCategory !== cat) return
      }
      setPending((prev) => {
        if (prev.find((p) => p.id === post.id)) return prev
        return [post, ...prev]
      })
    })
    return () => handle.unsubscribe()
  }, [filter, myCategory])

  // Infinite scroll: bump count when the bottom sentinel scrolls into view.
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = bottomRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCount((c) => Math.min(c + PAGE, visible.length))
        }
      },
      { rootMargin: "200px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible.length])

  const showPending = useCallback(() => {
    setTick((t) => t + 1)
    setPending([])
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const onCheer = useCallback(
    (postId: string) => {
      const updated = cheerPost(postId, me)
      if (updated) setTick((t) => t + 1)
    },
    [me],
  )

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence>
        {pending.length > 0 && (
          <motion.button
            key="pending"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={showPending}
            style={{
              position: "sticky",
              top: 12,
              left: "50%",
              display: "block",
              margin: "0 auto 12px",
              padding: "8px 16px",
              borderRadius: 999,
              background: IRIDESCENT,
              color: "#fff",
              fontWeight: 600,
              fontSize: 12.5,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(167,139,250,0.4)",
              zIndex: 5,
            }}
          >
            {pending.length} new {pending.length === 1 ? "post" : "posts"} ↑
          </motion.button>
        )}
      </AnimatePresence>

      <div ref={scrollerRef} style={{ display: "grid", gap: 10 }}>
        {visible.length === 0 && (
          <div style={{ ...cardBase, padding: 28, textAlign: "center" }}>
            <p style={{ fontSize: 14, color: TEXT_MUTED }}>
              Nothing here yet — be the first to share progress in this category.
            </p>
          </div>
        )}
        {visible.slice(0, count).map((p) => (
          <PostCard key={p.id} post={p} onCheer={onCheer} />
        ))}
        {visible.length > count && (
          <div ref={bottomRef} style={{ height: 1 }} />
        )}
      </div>
    </div>
  )
}

/* ── Post card ───────────────────────────────────────────────────────── */

function PostCard({ post, onCheer }: { post: CommunityPost; onCheer: (id: string) => void }) {
  const cat = CATEGORY_LABEL[post.goalCategory]
  const icon = CATEGORY_ICON[post.goalCategory]
  const isMilestone = post.postType === "milestone" || (post.streakAtPost && post.streakAtPost >= 30)
  const isCertificate = post.postType === "certificate"

  // Cheer heart float.
  const [floats, setFloats] = useState<number[]>([])
  const onClickCheer = () => {
    if (post.cheeredByMe) return
    onCheer(post.id)
    const id = Date.now()
    setFloats((f) => [...f, id])
    window.setTimeout(() => setFloats((f) => f.filter((x) => x !== id)), 1100)
  }

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        ...cardBase,
        position: "relative",
        borderColor: isMilestone ? "transparent" : "var(--sch-border, rgba(255,255,255,0.06))",
        overflow: "hidden",
      }}
    >
      {isMilestone && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            padding: 1,
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={post.authorName} hue={post.authorAvatarHue || hueFor(post.userId)} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>{post.authorName}</p>
          <p style={{ fontSize: 11.5, color: TEXT_DIM, marginTop: 1 }}>
            {formatDistanceToNowStrict(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 9px",
            borderRadius: 999,
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.2)",
            color: "#C084FC",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          <span aria-hidden>{icon}</span>
          {cat}
        </span>
      </div>

      {/* Type-specific body */}
      <div style={{ marginTop: 12 }}>
        {isCertificate ? (
          <CertificateBody post={post} />
        ) : (
          <>
            <p style={{ fontSize: 14.5, color: TEXT_PRIMARY, fontWeight: isMilestone ? 700 : 500, lineHeight: 1.45 }}>
              {post.content}
            </p>
            <p style={{ marginTop: 4, fontSize: 12.5, color: TEXT_MUTED, lineHeight: 1.5 }}>
              {post.weekNumber ? `Day ${(post.weekNumber - 1) * 7 + 7} · ` : ""}
              {post.goalName}
              {isMilestone && post.streakAtPost ? ` · ${post.streakAtPost} days of consistency` : ""}
            </p>
            {isMilestone && post.streakAtPost && <StreakTree streak={post.streakAtPost} />}
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 12, color: TEXT_DIM }}>
          {post.streakAtPost ? `🔥 ${post.streakAtPost} streak at post` : ""}
        </span>
        <div style={{ position: "relative" }}>
          <motion.button
            onClick={onClickCheer}
            disabled={post.cheeredByMe}
            whileHover={{ scale: post.cheeredByMe ? 1 : 1.04 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 12px",
              borderRadius: 999,
              background: post.cheeredByMe ? "rgba(244,114,182,0.12)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${post.cheeredByMe ? "rgba(244,114,182,0.35)" : "rgba(255,255,255,0.07)"}`,
              color: post.cheeredByMe ? "#F472B6" : TEXT_PRIMARY,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: post.cheeredByMe ? "default" : "pointer",
            }}
          >
            💪 Cheer · {post.likes}
          </motion.button>
          <AnimatePresence>
            {floats.map((id) => (
              <motion.span
                key={id}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -32, scale: 1.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  right: 18,
                  top: -4,
                  pointerEvents: "none",
                  fontSize: 16,
                }}
              >
                💖
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Avatar ──────────────────────────────────────────────────────────── */

function Avatar({ name, hue }: { name: string; hue: number }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: `linear-gradient(135deg, hsl(${hue},80%,60%), hsl(${(hue + 60) % 360},75%,50%))`,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        flexShrink: 0,
      }}
    >
      {(name?.trim()?.[0] || "?").toUpperCase()}
    </div>
  )
}

/* ── Streak tree progression ─────────────────────────────────────────── */

function StreakTree({ streak }: { streak: number }) {
  const stages = [
    { at: 1, emoji: "🌱" },
    { at: 7, emoji: "🌿" },
    { at: 14, emoji: "🪴" },
    { at: 30, emoji: "🌳" },
    { at: 60, emoji: "🌲" },
    { at: 90, emoji: "🏔️" },
  ]
  return (
    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
      {stages.map((s, i) => {
        const reached = streak >= s.at
        return (
          <motion.span
            key={i}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: reached ? 1 : 0.7, opacity: reached ? 1 : 0.25 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
            style={{ fontSize: 18, filter: reached ? "none" : "grayscale(0.6)" }}
          >
            {s.emoji}
          </motion.span>
        )
      })}
      <span style={{ fontSize: 11, color: TEXT_DIM, marginLeft: 4 }}>day {streak}</span>
    </div>
  )
}

/* ── Certificate body ────────────────────────────────────────────────── */

function CertificateBody({ post }: { post: CommunityPost }) {
  return (
    <div>
      <div
        style={{
          position: "relative",
          height: 110,
          borderRadius: 12,
          background: `linear-gradient(135deg, hsl(${post.authorAvatarHue},60%,30%), #0A0A14)`,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: IRIDESCENT,
            opacity: 0.18,
            filter: "blur(20px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.16em" }}>
              Certificate of completion
            </div>
            <div style={{ marginTop: 4, fontSize: 14 }}>{post.goalName}</div>
          </div>
        </div>
      </div>
      <p style={{ marginTop: 10, fontSize: 14.5, color: TEXT_PRIMARY, fontWeight: 700 }}>🏆 Goal completed!</p>
      <p style={{ marginTop: 2, fontSize: 12.5, color: TEXT_MUTED }}>
        {post.goalName}
        {post.streakAtPost ? ` — ${post.streakAtPost} sessions` : ""}
      </p>
      <button
        style={{
          marginTop: 10,
          background: "transparent",
          border: "none",
          color: "#C084FC",
          fontSize: 12.5,
          padding: 0,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        View certificate →
      </button>
    </div>
  )
}
