import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  buildTeamJoinURL,
  createInvites,
  createTeam,
  readMyTeamIds,
  readTeams,
  setActiveTeam,
  subscribeTeamsLocal,
  type CreateTeamInput,
  type Team,
  type TeamPlan,
} from "@/lib/teams-storage"
import { api } from "@/lib/api"

/* ──────────────────────────────────────────────────────────────────────
 *  /teams — B2B workspace home.
 *  • If the user has no workspaces yet → landing pitch + Create CTA.
 *  • Otherwise → list of their workspaces with "Open" + "Create another".
 *  Both states share the 4-step setup wizard (slide-over modal).
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

const cardBase: CSSProperties = {
  borderRadius: 22,
  padding: 28,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

const iridescentBtn: CSSProperties = {
  padding: "12px 22px",
  borderRadius: 14,
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 28px rgba(167,139,250,0.4)",
}

const glassBtn: CSSProperties = {
  padding: "10px 16px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: TEXT_PRIMARY,
  fontSize: 13.5,
  cursor: "pointer",
}

const PLANS: Array<{
  id: TeamPlan
  label: string
  price: string
  blurb: string
  maxMembers: number
  features: string[]
}> = [
  {
    id: "teams",
    label: "Teams",
    price: "$9 / member / mo",
    blurb: "For startups, small teams, and study cohorts.",
    maxMembers: 50,
    features: [
      "Up to 50 members",
      "Admin analytics + CSV export",
      "Email + push announcements",
      "Custom team branding",
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    price: "Talk to us",
    blurb: "For universities, language schools, and large orgs.",
    maxMembers: 500,
    features: [
      "Up to 500 members",
      "SSO + SCIM provisioning",
      "Multiple workspaces, multiple admins",
      "Dedicated success manager",
    ],
  },
]

export default function Teams() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [tick, setTick] = useState(0)
  useEffect(() => subscribeTeamsLocal(() => setTick((t) => t + 1)), [])

  const myIds = useMemo(() => new Set(readMyTeamIds()), [tick])
  const myTeams = useMemo(() => readTeams().filter((t) => myIds.has(t.id)), [tick, myIds])

  const [wizardOpen, setWizardOpen] = useState(false)

  const handleOpen = (t: Team) => {
    setActiveTeam(t.id)
    if (t.adminId === (user?.id || "")) navigate(`/teams/${t.id}/admin`)
    else navigate(`/teams/${t.id}`)
  }

  return (
    <DashboardLayout>
      <div style={{ padding: "32px clamp(16px, 4vw, 40px) 80px", maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p style={{ fontSize: 11.5, color: TEXT_DIM, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            For companies + institutions
          </p>
          <h1
            style={{
              marginTop: 8,
              fontSize: "clamp(32px, 5vw, 44px)",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            <span style={iriText}>Scholify Teams</span>
          </h1>
          <p style={{ marginTop: 12, fontSize: 16, color: TEXT_MUTED, maxWidth: 600, lineHeight: 1.55 }}>
            Bring learning habits to your whole team, university, or language school. Shared goals,
            real progress, no spreadsheets.
          </p>
        </motion.div>

        {/* If user already has teams, show them */}
        {myTeams.length > 0 && (
          <section style={{ marginTop: 32 }}>
            <p
              style={{
                fontSize: 11.5,
                color: TEXT_DIM,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Your workspaces
            </p>
            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {myTeams.map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleOpen(t)}
                  style={{
                    ...cardBase,
                    textAlign: "left",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {t.logoDataUrl ? (
                      <img
                        src={t.logoDataUrl}
                        alt={t.name}
                        style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: t.primaryColor,
                          display: "grid",
                          placeItems: "center",
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: 16,
                        }}
                      >
                        {(t.name?.trim()?.[0] || "?").toUpperCase()}
                      </div>
                    )}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: TEXT_PRIMARY,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.name}
                      </p>
                      <p style={{ fontSize: 12, color: TEXT_MUTED, marginTop: 2 }}>
                        {t.planType === "enterprise" ? "Enterprise" : "Teams"} ·{" "}
                        {t.adminId === (user?.id || "") ? "Admin" : "Member"}
                      </p>
                    </div>
                  </div>
                  {t.description && (
                    <p
                      style={{
                        marginTop: 12,
                        fontSize: 13,
                        color: TEXT_MUTED,
                        lineHeight: 1.5,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {t.description}
                    </p>
                  )}
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {/* Landing / value section */}
        <section style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          <FeatureCard
            icon="📊"
            title="Admin analytics"
            body="Completion rates, average streaks, and an exportable CSV of every member's progress."
          />
          <FeatureCard
            icon="🎨"
            title="Your brand, your room"
            body="Workspace logo, primary color, and team-branded invite emails. Members see your identity, not Scholify."
          />
          <FeatureCard
            icon="📣"
            title="Broadcast in seconds"
            body="One textarea to push an announcement to every member via email + in-app banner + push."
          />
        </section>

        {/* Pricing teaser */}
        <section style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {PLANS.map((p) => (
            <div key={p.id} style={cardBase}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>{p.label}</p>
                <p style={{ fontSize: 12, color: TEXT_MUTED }}>{p.price}</p>
              </div>
              <p style={{ marginTop: 6, fontSize: 13, color: TEXT_MUTED, lineHeight: 1.5 }}>{p.blurb}</p>
              <ul style={{ marginTop: 14, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
                {p.features.map((f) => (
                  <li key={f} style={{ fontSize: 12.5, color: TEXT_MUTED, display: "flex", gap: 8 }}>
                    <span style={{ color: "#34D399", flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <button onClick={() => setWizardOpen(true)} style={iridescentBtn}>
            Create your workspace →
          </button>
          <Link to="/pricing" style={{ ...glassBtn, textDecoration: "none", display: "inline-block" }}>
            See Teams pricing
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {wizardOpen && (
          <SetupWizard
            onClose={() => setWizardOpen(false)}
            onCreated={(team) => {
              setWizardOpen(false)
              setActiveTeam(team.id)
              navigate(`/teams/${team.id}/admin`)
            }}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}

/* ── Feature card ────────────────────────────────────────────────────── */

function FeatureCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div style={cardBase}>
      <span style={{ fontSize: 22 }} aria-hidden>
        {icon}
      </span>
      <p style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>{title}</p>
      <p style={{ marginTop: 4, fontSize: 13, color: TEXT_MUTED, lineHeight: 1.55 }}>{body}</p>
    </div>
  )
}

/* ── Setup wizard ────────────────────────────────────────────────────── */

const COLOR_SWATCHES = [
  "#5E5CE6",
  "#A78BFA",
  "#F472B6",
  "#22D3EE",
  "#34D399",
  "#FB923C",
  "#F43F5E",
  "#EAB308",
]

function SetupWizard({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (team: Team) => void
}) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [step, setStep] = useState(0)

  // Step 1
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [logoDataUrl, setLogoDataUrl] = useState<string | undefined>(undefined)
  const [primaryColor, setPrimaryColor] = useState("#5E5CE6")

  // Step 2
  const [planType, setPlanType] = useState<TeamPlan>("teams")

  // Step 3
  const [goalMode, setGoalMode] = useState<"team" | "free">("team")
  const [defaultGoal, setDefaultGoal] = useState("")

  // Step 4
  const [emailsRaw, setEmailsRaw] = useState("")
  const [expiresDays, setExpiresDays] = useState<7 | 30 | 90>(7)

  const fileRef = useRef<HTMLInputElement>(null)

  const onPickLogo = (file: File | null) => {
    if (!file) return
    if (file.size > 700_000) {
      toast.warning("Please pick a logo under 700KB.")
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => setLogoDataUrl(String(e.target?.result || ""))
    reader.readAsDataURL(file)
  }

  const adminName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
    const f = (meta.first_name || "").trim()
    const l = (meta.last_name || "").trim()
    return [f, l].filter(Boolean).join(" ") || user?.email?.split("@")[0] || "Admin"
  }, [user])

  const canNext = useCallback(() => {
    if (step === 0) return name.trim().length > 0
    if (step === 1) return Boolean(planType)
    if (step === 2) return goalMode === "free" || defaultGoal.trim().length > 0
    return true
  }, [step, name, planType, goalMode, defaultGoal])

  const finalize = useCallback(async () => {
    if (!user) {
      toast.error("Please sign in first.")
      return
    }
    const input: CreateTeamInput = {
      name,
      description: description || undefined,
      logoDataUrl,
      primaryColor,
      planType,
      maxMembers: PLANS.find((p) => p.id === planType)?.maxMembers || 50,
      defaultGoal: goalMode === "team" ? defaultGoal : undefined,
      allowFreeGoals: goalMode === "free",
    }
    const team = createTeam(input, {
      id: user.id,
      name: adminName,
      email: user.email || undefined,
    })

    // Bulk invites
    const emails = emailsRaw
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter(Boolean)
    if (emails.length > 0) {
      const invites = createInvites(team.id, emails, "member", expiresDays)
      const payload = invites.map((inv) => ({ email: inv.email, joinUrl: buildTeamJoinURL(inv.token) }))
      try {
        const result = await api.teamInvite({
          teamName: team.name,
          primaryColor: team.primaryColor,
          logoUrl: team.logoDataUrl,
          senderName: adminName,
          invites: payload,
        })
        if (result.sent > 0) {
          toast.success(`${result.sent} invite${result.sent === 1 ? "" : "s"} sent.`)
        } else {
          toast.info("Invites saved — share the team link until email is configured.")
        }
      } catch {
        toast.info("Invites saved locally — emails will send once Resend is configured.")
      }
    }

    onCreated(team)
  }, [
    user,
    toast,
    name,
    description,
    logoDataUrl,
    primaryColor,
    planType,
    goalMode,
    defaultGoal,
    emailsRaw,
    expiresDays,
    adminName,
    onCreated,
  ])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5,5,8,0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        style={{
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 28,
          borderRadius: 24,
          background: "var(--sch-card, rgba(10,10,20,0.92))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                style={{
                  width: i === step ? 22 : 10,
                  height: 5,
                  borderRadius: 3,
                  background: i <= step ? IRIDESCENT : "rgba(255,255,255,0.1)",
                  transition: "all 0.25s ease",
                }}
              />
            ))}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "transparent", border: "none", color: TEXT_MUTED, fontSize: 20, cursor: "pointer" }}
          >
            ×
          </button>
        </div>

        <p style={{ marginTop: 18, fontSize: 11.5, color: TEXT_DIM, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Step {step + 1} of 4
        </p>
        <h2 style={{ marginTop: 4, fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY }}>
          {step === 0 && "Name your workspace"}
          {step === 1 && "Choose your plan"}
          {step === 2 && "Set the learning goal"}
          {step === 3 && "Invite your team"}
        </h2>

        <div style={{ marginTop: 18 }}>
          {step === 0 && (
            <div style={{ display: "grid", gap: 14 }}>
              <Field label="Workspace name">
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 60))}
                  placeholder="Acme Learning, Cohort Q1, IELTS Squad…"
                  style={inputStyle}
                />
              </Field>
              <Field label="Description (optional)">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="What is your team studying?"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </Field>

              <Field label="Logo">
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: logoDataUrl ? "transparent" : primaryColor,
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 18,
                      overflow: "hidden",
                    }}
                  >
                    {logoDataUrl ? (
                      <img src={logoDataUrl} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      (name?.[0] || "T").toUpperCase()
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onPickLogo(e.target.files?.[0] || null)}
                    style={{ display: "none" }}
                  />
                  <button onClick={() => fileRef.current?.click()} style={glassBtn}>
                    Upload logo
                  </button>
                  {logoDataUrl && (
                    <button
                      onClick={() => setLogoDataUrl(undefined)}
                      style={{ ...glassBtn, color: "#FF6B6B" }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </Field>

              <Field label="Primary color">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {COLOR_SWATCHES.map((c) => {
                    const active = primaryColor === c
                    return (
                      <button
                        key={c}
                        onClick={() => setPrimaryColor(c)}
                        aria-label={c}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: c,
                          border: `2px solid ${active ? "#fff" : "rgba(255,255,255,0.15)"}`,
                          boxShadow: active ? `0 0 0 3px ${c}66` : "none",
                          cursor: "pointer",
                        }}
                      />
                    )
                  })}
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 10px",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: 12,
                      color: TEXT_MUTED,
                      cursor: "pointer",
                    }}
                  >
                    Custom
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      style={{ width: 24, height: 22, border: "none", background: "transparent", cursor: "pointer" }}
                    />
                  </label>
                </div>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: "grid", gap: 12 }}>
              {PLANS.map((p) => {
                const active = planType === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlanType(p.id)}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: active ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)"}`,
                      textAlign: "left",
                      cursor: "pointer",
                      color: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>{p.label}</span>
                      <span style={{ fontSize: 12, color: TEXT_MUTED }}>{p.price}</span>
                    </div>
                    <p style={{ marginTop: 4, fontSize: 13, color: TEXT_MUTED, lineHeight: 1.5 }}>{p.blurb}</p>
                  </button>
                )
              })}
              <p style={{ fontSize: 11.5, color: TEXT_DIM }}>
                You can switch plans later. Billing connects to your Paddle account on first paid invoice.
              </p>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <ToggleCard
                  active={goalMode === "team"}
                  onClick={() => setGoalMode("team")}
                  title="One shared goal"
                  body="Everyone follows the same plan."
                />
                <ToggleCard
                  active={goalMode === "free"}
                  onClick={() => setGoalMode("free")}
                  title="Members pick their own"
                  body="Each member sets their own goal in onboarding."
                />
              </div>
              {goalMode === "team" && (
                <Field label="Shared team goal">
                  <textarea
                    value={defaultGoal}
                    onChange={(e) => setDefaultGoal(e.target.value)}
                    rows={3}
                    placeholder="Pass IELTS Band 7 by April 30 / Ship the React onboarding course / …"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </Field>
              )}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: "grid", gap: 14 }}>
              <Field label="Paste team emails (one per line, or comma-separated)">
                <textarea
                  value={emailsRaw}
                  onChange={(e) => setEmailsRaw(e.target.value)}
                  rows={5}
                  placeholder="alice@acme.com&#10;bob@acme.com&#10;…"
                  style={{ ...inputStyle, fontFamily: "var(--font-mono)", resize: "vertical" }}
                />
              </Field>
              <Field label="Invite link expires in">
                <div style={{ display: "flex", gap: 8 }}>
                  {[7, 30, 90].map((d) => (
                    <button
                      key={d}
                      onClick={() => setExpiresDays(d as 7 | 30 | 90)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 999,
                        background: expiresDays === d ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${expiresDays === d ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)"}`,
                        color: expiresDays === d ? "#C084FC" : TEXT_MUTED,
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {d} days
                    </button>
                  ))}
                </div>
              </Field>
              <p style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.5 }}>
                You can also share a single team invite link from the admin dashboard once your workspace is created.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", gap: 10 }}>
          <button
            onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
            style={glassBtn}
          >
            {step === 0 ? "Cancel" : "← Back"}
          </button>
          {step < 3 ? (
            <button
              disabled={!canNext()}
              onClick={() => setStep((s) => s + 1)}
              style={{ ...iridescentBtn, opacity: canNext() ? 1 : 0.5, cursor: canNext() ? "pointer" : "default" }}
            >
              Next →
            </button>
          ) : (
            <button onClick={finalize} style={iridescentBtn}>
              Create workspace ⚡
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "11px 13px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: TEXT_PRIMARY,
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        style={{
          marginBottom: 6,
          fontSize: 11.5,
          color: TEXT_DIM,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

function ToggleCard({
  active,
  onClick,
  title,
  body,
}: {
  active: boolean
  onClick: () => void
  title: string
  body: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 14,
        borderRadius: 14,
        background: active ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${active ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)"}`,
        textAlign: "left",
        cursor: "pointer",
        color: "inherit",
      }}
    >
      <p style={{ fontSize: 13.5, fontWeight: 700, color: TEXT_PRIMARY }}>{title}</p>
      <p style={{ marginTop: 4, fontSize: 12, color: TEXT_MUTED }}>{body}</p>
    </button>
  )
}
