import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { entitlementOf, canAccessApp } from "@/lib/entitlement"
import BillingGraceBanner from "@/components/BillingGraceBanner"
import { loadCalendarAccount } from "@/lib/calendar"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { Icon, type IconName, C, SP, R, SHADOW, GRAD } from "@/components/acca/ui"
import { ScholifyLockup } from "@/components/brand"
import NotificationBell from "@/components/NotificationBell"
import { NOTIFICATION_SOURCES_ACTIVE } from "@/lib/notification-center"
import { deriveNotifications, subscribeNotifications, type NotificationKind } from "@/lib/notification-center"
import { getTodayStats } from "@/lib/acca"
import { qualificationProgress } from "@/lib/acca-qualification"
import { avatarUrlOf, onAvatarChange } from "@/lib/avatar"
import { isLaunchAdmin } from "@/lib/launch"
import { initNotesSync } from "@/lib/acca-notes-cloud"
import FeedbackLauncher from "@/components/FeedbackLauncher"
import AppTour, { hasSeenAppTour } from "@/components/AppTour"

/* ──────────────────────────────────────────────────────────────
 *  Shared app shell for the signed-in ACCA screens (Study, Progress,
 *  Settings). Renders the sidebar + mobile tab bar; pages supply content.
 *  Rebuilt on the shared design foundation (@/components/acca/ui).
 * ────────────────────────────────────────────────────────────── */

/** Iridescent gradient as text fill — the app-wide accent. */
export const iriText: CSSProperties = {
  background: IRIDESCENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
}

const LAYOUT_CSS = `
  .dash-scroll::-webkit-scrollbar { width: 7px; }
  .dash-scroll::-webkit-scrollbar-thumb { background: var(--sch-border); border-radius: 8px; }
  *:focus-visible { outline: 2px solid #C80000 !important; outline-offset: 2px; border-radius: 4px; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
  @media (max-width: 1023px) { .feedback-launcher { bottom: 78px !important; } }

  /* The content column starts where the sidebar ends. --app-sidebar narrows to
     216px on 1024–1279 laptops (see index.css), so this offset has to read the
     variable rather than hardcode 244px — otherwise mid-size laptops got a
     28px empty gutter down the left of every page. */
  @media (min-width: 1024px) { .dash-main { padding-left: var(--app-sidebar); } }

  /* Bottom padding existed to clear the mobile tab bar. On desktop there is no
     tab bar, so 110px was just dead space under the fold on every page. */
  .dash-content { padding-bottom: 110px; }
  @media (min-width: 1024px) { .dash-content { padding-bottom: 48px; } }
`

type NavItemDef = {
  icon: IconName
  label: string
  to: string
  /** Which notification source(s) light up the red dot on this item. */
  notifyKinds?: NotificationKind[]
}

export const NAV: NavItemDef[] = [
  { icon: "roadmap", label: "Dashboard", to: "/dashboard" },
  { icon: "study", label: "Learning", to: "/study" },
  { icon: "notes", label: "ACCA Kit", to: "/notes" },
  { icon: "stats", label: "Analytics", to: "/study/analytics" },
  { icon: "settings", label: "Settings", to: "/settings" },
]

/* ── Shared bits ─────────────────────────────────────────────── */

export function ProgressBar({ pct, height = 6 }: { pct: number; height?: number }) {
  return (
    <div style={{ width: "100%", height, borderRadius: height / 2, background: "var(--sch-hairline)", overflow: "hidden" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: "100%", background: IRIDESCENT }}
      />
    </div>
  )
}

export function Pill({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px",
        borderRadius: 999, fontSize: 12, border: "1px solid var(--sch-border)",
        background: "var(--sch-card)", color: "var(--sch-tx-1)", ...style,
      }}
    >
      {children}
    </span>
  )
}

function Avatar({ initial, src, size = 38 }: { initial: string; src?: string | null; size?: number }) {
  const [broken, setBroken] = useState(false)
  useEffect(() => setBroken(false), [src])
  if (src && !broken) {
    return (
      <img
        src={src}
        alt=""
        onError={() => setBroken(true)}
        style={{
          width: size, height: size, flexShrink: 0, borderRadius: R.md,
          objectFit: "cover", display: "block", boxShadow: SHADOW.sm,
          border: "1px solid var(--sch-hairline)",
        }}
      />
    )
  }
  return (
    <div
      style={{
        width: size, height: size, flexShrink: 0, borderRadius: R.md, background: GRAD,
        display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: size * 0.42,
        boxShadow: SHADOW.sm,
      }}
    >
      {initial}
    </div>
  )
}

/** The Scholify wordmark with its gradient monogram. */
function Brand({ compact }: { compact?: boolean }) {
  return <ScholifyLockup size={26} color={C.text} wordmark={!compact} />
}

function NavItem({ item, active, badge, unread }: { item: NavItemDef; active: boolean; badge?: boolean; unread?: number }) {
  return (
    <Link
      to={item.to}
      style={{
        position: "relative", display: "flex", alignItems: "center", gap: 11,
        padding: "10px 12px", minHeight: 44, borderRadius: R.md, fontSize: 14,
        textDecoration: "none", transition: "background .18s ease, color .18s ease",
        background: active ? C.brandSoft : "transparent",
        color: active ? C.brand : C.soft, fontWeight: active ? 700 : 500,
      }}
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = C.card2; e.currentTarget.style.color = C.text } }}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.soft } }}
    >
      {active && (
        <motion.span
          layoutId="nav-active"
          style={{ position: "absolute", left: 0, top: 9, bottom: 9, width: 3, borderRadius: 3, background: C.brand }}
        />
      )}
      <span style={{ position: "relative", display: "grid", placeItems: "center" }}>
        <Icon name={item.icon} size={19} color={active ? C.brand : "currentColor"} strokeWidth={active ? 2.4 : 2} />
        {badge && (
          <span style={{ position: "absolute", top: -3, right: -4, width: 8, height: 8, borderRadius: "50%", background: C.green, border: "1.5px solid var(--sch-card)" }} aria-label="calendar connected" />
        )}
        {unread != null && unread > 0 && (
          <span style={{ position: "absolute", top: -6, right: -8, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 8, background: GRAD, color: "#fff", fontSize: 9, fontWeight: 800, display: "grid", placeItems: "center", lineHeight: 1 }} aria-label={`${unread} unread`}>
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </span>
      {item.label}
    </Link>
  )
}

/* ── Layout ──────────────────────────────────────────────────── */

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  const [calendarConnected, setCalendarConnected] = useState(false)
  const [notifTick, setNotifTick] = useState(0)
  useEffect(() => subscribeNotifications(() => setNotifTick((t) => t + 1)), [])

  // Notes account sync: reconcile once per session, then push (debounced)
  // after every local change, wherever in the app the note was taken.
  useEffect(() => {
    initNotesSync()
  }, [])
  const notif = useMemo(() => deriveNotifications(user?.id || "demo-user"), [user?.id, notifTick])

  // Real ACCA signals (was previously fed by legacy vocab data — wrong numbers).
  const today = useMemo(() => getTodayStats(), [])
  const qual = useMemo(() => qualificationProgress(), [])

  const unreadFor = (kinds?: NotificationKind[]): number =>
    !kinds || kinds.length === 0 ? 0 : kinds.reduce((sum, k) => sum + (notif.counts[k] || 0), 0)

  useEffect(() => {
    let cancelled = false
    async function check() {
      if (!user?.id) return
      const acc = await loadCalendarAccount(user.id)
      if (cancelled) return
      setCalendarConnected(Boolean((acc?.google_access_token && acc.calendar_sync_enabled) || acc?.calcom_api_key))
    }
    check()
    return () => { cancelled = true }
  }, [user?.id])

  const firstName = (user?.user_metadata?.first_name as string) || "there"
  const ent = entitlementOf(user)

  /*
   * ── LOCKED SHELL ───────────────────────────────────────────────────
   *
   * /settings is deliberately ungated so someone who has not paid can still
   * reach billing, and Stripe requires that route to exist. But Settings
   * renders THIS layout — so an unentitled learner clicking "Account & billing"
   * from the paywall landed on the complete app interface: sidebar, Study,
   * Notes, Analytics, the mobile tab bar, a plan badge. Every one of those
   * links hits the wall when clicked, so nothing could actually be USED — but
   * the product looked wide open, and "I got in without paying" is a fair
   * description of what you are looking at.
   *
   * When there is no entitlement the shell collapses to what billing needs:
   * the brand, the account, and a way out. No navigation into the product at
   * all — nothing to click, nothing to imply access. The paywall is the whole
   * product until they pay.
   */
  const locked = Boolean(user) && !isLaunchAdmin(user) && !canAccessApp(user)
  const planPaidLook = ent.isPaid || ent.isTrial
  // Past due outranks the tier badge: a card that failed must not still read
  // "PRO" while the Pro modes are switched off — that looks like a bug.
  const planLabel = ent.isPastDue
    ? `PAYMENT DUE · ${ent.graceDaysLeft}d`
    : ent.isTrial
      ? `TRIAL · ${ent.trialDaysLeft}d`
      : ent.isPro
        ? "PRO"
        : ent.isBeginner
          ? "BEGINNER"
          : "PLAN LOCKED"

  // Re-read the avatar when Settings changes it (uploads fire this event;
  // cloud saves also refresh `user` via USER_UPDATED — either path lands here).
  /*
   * Offered once, and only after the shell has actually painted — opening a
   * modal on the same frame as a route transition reads as a glitch rather
   * than a greeting. `scholify:app-tour:replay` lets Settings (or any link)
   * ask for it again without duplicating the storage key here.
   */
  const [tourOpen, setTourOpen] = useState(false)
  useEffect(() => {
    if (hasSeenAppTour()) return
    const timer = window.setTimeout(() => setTourOpen(true), 900)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => {
    const replay = () => setTourOpen(true)
    window.addEventListener("scholify:app-tour:replay", replay)
    return () => window.removeEventListener("scholify:app-tour:replay", replay)
  }, [])

  const [avatarTick, setAvatarTick] = useState(0)
  useEffect(() => onAvatarChange(() => setAvatarTick((t) => t + 1)), [])
  const avatarSrc = useMemo(() => avatarUrlOf(user), [user, avatarTick])

  return (
    <div className="scholify-race-shell race-grid-surface" style={{ minHeight: "100dvh", backgroundColor: "var(--sch-bg)", fontFamily: "var(--sch-font)", color: "var(--sch-text)" }}>
      <style>{LAYOUT_CSS}</style>

      {/* ── Sidebar (desktop) ── */}
      <aside
        className="hidden lg:flex dash-scroll"
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, width: "var(--app-sidebar)", flexDirection: "column",
          padding: `${SP.xl}px ${SP.lg}px`, background: "var(--sch-card)",
          borderRight: "1px solid var(--sch-hairline)", overflowY: "auto", zIndex: 20,
        }}
      >
        {/* Brand */}
        <Link to="/study" style={{ textDecoration: "none", padding: "2px 4px", marginBottom: SP["2xl"] }}>
          <Brand />
        </Link>

        <div className="race-panel" style={{ padding: "10px 12px", borderRadius: R.md, marginBottom: SP.xl }}>
          <div className="race-kicker" style={{ color: C.brand, display: "flex", alignItems: "center", gap: 7 }}>
            <span className="race-live-dot" style={{ width: 7, height: 7, borderRadius: 99, background: C.brand }} />
            Race control · live
          </div>
          <div style={{ marginTop: 5, fontSize: 11.5, lineHeight: 1.45, color: C.soft }}>Charles is reading your learning telemetry.</div>
        </div>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 4px" }}>
          <Avatar initial={firstName.charAt(0).toUpperCase()} src={avatarSrc} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {firstName}
            </div>
            <span
              style={{
                display: "inline-block", fontSize: 9.5, fontWeight: 800, letterSpacing: "0.04em",
                padding: "1.5px 8px", borderRadius: 999, marginTop: 2,
                background: planPaidLook ? GRAD : C.card2, color: planPaidLook ? "#fff" : C.soft,
                border: planPaidLook ? "none" : `1px solid ${C.border}`,
              }}
            >
              {planLabel}
            </span>
          </div>
        </div>

        {/* Streak + qualification — real ACCA data, calm (no infinite pulse) */}
        <div style={{ marginTop: SP.xl, display: "grid", gridTemplateColumns: "1fr 1fr", gap: SP.sm }}>
          <div style={{ padding: `${SP.md}px ${SP.sm}px`, borderRadius: R.lg, textAlign: "center", background: C.card2, border: `1px solid ${C.border}` }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, color: C.brand }}>
              <Icon name="streak" size={15} color={C.brand} />
              <span style={{ fontSize: 20, fontWeight: 800, color: C.text }}>{today.streak}</span>
            </div>
            <div style={{ fontSize: 10.5, color: C.faint, marginTop: 1 }}>day streak</div>
          </div>
          <div style={{ padding: `${SP.md}px ${SP.sm}px`, borderRadius: R.lg, textAlign: "center", background: C.card2, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>{qual.passedCount}<span style={{ fontSize: 12, color: C.faint, fontWeight: 700 }}>/{qual.totalExams}</span></div>
            <div style={{ fontSize: 10.5, color: C.faint, marginTop: 1 }}>exams passed</div>
          </div>
        </div>

        {/* Nav — hidden entirely while unentitled; see the note on `locked`. */}
        {!locked && <nav style={{ marginTop: SP["2xl"], display: "flex", flexDirection: "column", gap: 3 }}>
          {NAV.map((item) => (
            <NavItem
              key={item.to}
              item={item}
              active={location.pathname === item.to}
              badge={item.to === "/settings" && calendarConnected}
              unread={unreadFor(item.notifyKinds)}
            />
          ))}
        </nav>}

        {/* Qualification progress — the one persistent goal. Also hidden while
            locked: it is product progress, and there is no product yet. */}
        {!locked && <div style={{ marginTop: "auto", paddingTop: SP.xl }}>
          <div style={{ padding: SP.md, borderRadius: R.lg, background: C.card2, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: C.muted }}>To membership</span>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: C.brand }}>{qual.percent}%</span>
            </div>
            <ProgressBar pct={qual.percent} />
          </div>
        </div>}
      </aside>

      {/* ── Main content ── */}
      <main className="dash-main">
        {/* Top bar */}
        <div
          style={{
            position: "sticky", top: 0, zIndex: 25, display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: "10px clamp(16px, 4vw, 40px)",
            background: "var(--sch-bg-blur)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid var(--sch-hairline)",
          }}
        >
          <Link to="/study" className="lg:invisible" style={{ textDecoration: "none" }}>
            <Brand compact />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/*
             * Admin entry point. Lives in the TOP BAR rather than either nav on
             * purpose: the mobile tab bar is already at the 5-item ceiling, and
             * /admin is not a learner destination — mixing it into the learner
             * nav would put two different hierarchies at the same level. Here it
             * is present on both breakpoints with one implementation.
             *
             * Renders only for the launch admin (isLaunchAdmin, hardcoded to the
             * ops account in lib/launch.ts). This is discoverability only, NOT a
             * gate: /admin re-checks on mount and api/admin-analytics re-checks
             * server-side with the service-role key, so hiding the link grants
             * nothing and showing it leaks nothing.
             */}
            {isLaunchAdmin(user) && (
              <Link
                to="/admin"
                aria-label="Admin dashboard"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, minHeight: 40,
                  padding: "8px 12px", borderRadius: R.pill, textDecoration: "none",
                  border: `1px solid ${C.brandLine}`, background: C.brandSoft, color: C.brand,
                  fontSize: 11.5, fontWeight: 800, letterSpacing: "0.06em",
                }}
              >
                <Icon name="shield" size={15} color={C.brand} strokeWidth={2.3} />
                <span className="hidden sm:inline">ADMIN</span>
              </Link>
            )}
            {/*
              * No notification source is wired up yet (see notification-center.ts), so the
              * bell would open an empty dropdown every time it is clicked. A dead
              * affordance teaches learners to ignore the control, so it is not rendered
              * at all until a real signal exists - flipping the flag brings it back.
              */}
            {NOTIFICATION_SOURCES_ACTIVE && <NotificationBell />}
          </div>
        </div>

        {/* sch-app-container caps the measure at --app-max (1360px). Without it
            every dashboard grid stretched to the full window on a 1440px+
            display, so stat cards grew to ~400px wide and the reading measure
            on Notes and Learning ran past 140 characters. */}
        <div className="dash-content sch-app-container px-4 py-5 lg:px-10 lg:py-8" style={{ position: "relative" }}>
          {/* Above the page content on EVERY app screen — a failed card is not
              a Settings-page detail, and it renders nothing unless it applies. */}
          <BillingGraceBanner />
          {children}
        </div>
      </main>

      {/* ── Mobile tab bar ── hidden while unentitled, same reasoning as the
          sidebar: on a phone this IS the navigation, so leaving it visible is
          the whole product presented to someone who has not paid for it. */}
      {!locked && <nav
        className="lg:hidden"
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "space-around",
          padding: "8px 4px", paddingBottom: "max(8px, env(safe-area-inset-bottom))",
          background: "var(--sch-bg-blur)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid var(--sch-hairline)", zIndex: 30,
        }}
      >
        {NAV.map((item) => {
          const active = location.pathname === item.to
          const unread = unreadFor(item.notifyKinds)
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "6px 8px", minHeight: 48, minWidth: 60, textDecoration: "none",
                fontSize: 11, fontWeight: active ? 700 : 500, color: active ? C.brand : C.soft,
              }}
            >
              <span style={{ position: "relative", display: "grid", placeItems: "center" }}>
                <Icon name={item.icon} size={22} color={active ? C.brand : "currentColor"} strokeWidth={active ? 2.4 : 2} />
                {unread > 0 && (
                  <span style={{ position: "absolute", top: -5, right: -7, minWidth: 14, height: 14, padding: "0 4px", borderRadius: 7, background: GRAD, color: "#fff", fontSize: 9, fontWeight: 800, display: "grid", placeItems: "center", lineHeight: 1 }} aria-label={`${unread} unread`}>
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>}
      <FeedbackLauncher
        name={[user?.user_metadata?.first_name, user?.user_metadata?.last_name].filter(Boolean).join(" ")}
        email={user?.email || ""}
      />
      {/* The seven-step introduction, once per browser on first entry to the
          workspace. It opens from the shell rather than from a page so it
          cannot be missed by landing on Notes or Analytics first. */}
      <AppTour open={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  )
}
