import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Icon, C, R } from "@/components/acca/ui"
import { FORMULA_PAPERS, formulasFor, searchFormulas, type KitFormula } from "@/lib/acca-kit"

/*
 * THE FORMULAE SHEET, annotated.
 *
 * ACCA hands out a formulae sheet in the exam, so reproducing one adds nothing.
 * What it does NOT hand out — and what loses marks — is what each symbol means
 * and when the formula applies. Every entry here carries both, and the "use"
 * note is the part worth reading twice.
 *
 * It opens on the learner's current paper because a candidate mid-FM has no use
 * for variance formulae, but every paper stays one tap away: cross-paper
 * recall is real (EOQ is examined in both MA and FM) and hiding it would make
 * the sheet feel thinner than it is.
 */

const SANS = "'Plus Jakarta Sans', sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

export default function KitFormulas({ paperId }: { paperId: string | null }) {
  const reduced = useReducedMotion()
  const initial = paperId && FORMULA_PAPERS.includes(paperId) ? paperId : null
  const [paper, setPaper] = useState<string | null>(initial)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState<string | null>(null)

  const results = useMemo(() => searchFormulas(formulasFor(paper), query), [paper, query])

  const grouped = useMemo(() => {
    const map = new Map<string, KitFormula[]>()
    for (const f of results) map.set(f.group, [...(map.get(f.group) ?? []), f])
    return [...map.entries()]
  }, [results])

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <FilterChip label="All papers" active={paper === null} onClick={() => setPaper(null)} />
        {FORMULA_PAPERS.map((p) => (
          <FilterChip key={p} label={p} active={paper === p} onClick={() => setPaper(p)} />
        ))}
      </div>

      <label style={{ display: "block", position: "relative", marginBottom: 16 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
          <Icon name="topics" size={15} color={C.faint} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          placeholder="Search — WACC, breakeven, variance, √…"
          aria-label="Search formulae"
          style={{
            width: "100%", minHeight: 46, padding: "0 14px 0 36px", borderRadius: R.lg,
            border: `1px solid ${C.border}`, background: C.card, color: C.text,
            font: `600 14px/1 ${SANS}`, outline: "none",
          }}
        />
      </label>

      {results.length === 0 ? (
        <div style={{ textAlign: "center", padding: "34px 16px", borderRadius: R.lg, border: `1px dashed ${C.border}` }}>
          <p style={{ font: `700 14px/1.5 ${SANS}`, color: C.text, margin: 0 }}>Nothing matches “{query}”.</p>
          <p style={{ font: `500 12.5px/1.6 ${SANS}`, color: C.faint, margin: "6px 0 0" }}>
            {paper ? `Try All papers — ${paper} may not be where this one is examined.` : "Try the name of the thing you are calculating rather than the formula."}
          </p>
        </div>
      ) : (
        grouped.map(([group, items], gi) => (
          <motion.section
            key={group}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(gi * 0.05, 0.3), duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 20 }}
          >
            <h3 style={{ font: `800 11px/1 ${SANS}`, letterSpacing: "0.12em", textTransform: "uppercase", color: C.faint, margin: "0 0 10px" }}>
              {group}
            </h3>
            <div style={{ display: "grid", gap: 8 }}>
              {items.map((f) => {
                const expanded = open === f.id
                return (
                  <div key={f.id} style={{ borderRadius: R.lg, border: `1px solid ${expanded ? C.brandLine : C.border}`, background: C.card, overflow: "hidden" }}>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : f.id)}
                      aria-expanded={expanded}
                      style={{
                        width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                        padding: "13px 14px", display: "flex", gap: 10, alignItems: "flex-start", minHeight: 48,
                      }}
                    >
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                          <span style={{ font: `750 14px/1.3 ${SANS}`, color: C.text }}>{f.name}</span>
                          {f.papers.map((p) => (
                            <span key={p} style={{ font: `800 9.5px/1 ${SANS}`, letterSpacing: "0.06em", padding: "3px 6px", borderRadius: 999, background: C.brandSoft, color: C.brand }}>
                              {p}
                            </span>
                          ))}
                        </span>
                        <span style={{ display: "block", font: `600 12.5px/1.7 ${MONO}`, color: C.brand, marginTop: 8, whiteSpace: "pre-wrap" }}>
                          {f.expression}
                        </span>
                      </span>
                      <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }} style={{ display: "inline-flex", marginTop: 2 }}>
                        <Icon name="chevron" size={14} color={C.faint} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${C.border}` }}>
                            {f.where && (
                              <p style={{ font: `500 12px/1.65 ${SANS}`, color: C.soft, margin: "12px 0 0" }}>
                                <b style={{ color: C.text }}>Where </b>{f.where}
                              </p>
                            )}
                            <p style={{ font: `500 12.5px/1.7 ${SANS}`, color: C.soft, margin: "10px 0 0" }}>
                              <b style={{ color: C.text }}>In the exam </b>{f.use}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.section>
        ))
      )}
    </div>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        minHeight: 38, padding: "0 14px", borderRadius: 999, cursor: "pointer",
        border: `1px solid ${active ? C.brand : C.border}`,
        background: active ? C.brandSoft : C.card,
        color: active ? C.brand : C.soft,
        font: `750 12.5px/1 ${SANS}`,
      }}
    >
      {label}
    </button>
  )
}
