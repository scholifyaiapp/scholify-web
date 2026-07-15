import type { CSSProperties } from "react"
import { motion } from "motion/react"
import { Icon, C, R } from "@/components/acca/ui"
import { taxBasisNote } from "@/lib/acca-tax-basis"

/*
 * A quiet, honest basis label for the taxation papers (TX / ATX). Renders
 * nothing for any other paper, so it's safe to drop into shared surfaces.
 * Light theme, ACCA palette; entrance via motion/react.
 */
export function TaxBasisNote({
  paperId,
  style,
}: {
  paperId: string | null | undefined
  style?: CSSProperties
}) {
  const note = taxBasisNote(paperId)
  if (!note) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      role="note"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 9,
        padding: "10px 13px",
        marginBottom: 14,
        borderRadius: R.md,
        background: C.brandSoft,
        border: `1px solid ${C.brandLine}`,
        ...style,
      }}
    >
      <Icon name="calendar" size={15} color={C.brand} strokeWidth={2.2} style={{ marginTop: 1 }} />
      <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{note}</span>
    </motion.div>
  )
}
