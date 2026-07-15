/*
 * Honest tax-year labelling for the taxation papers.
 *
 * TX and ATX content is built on UK Finance Act 2024 (tax year 2024/25) — the
 * text states every rate and threshold. ACCA examines FA2024 through the
 * March 2026 sitting; a June 2026+ sitting is set on FA2025. We surface the
 * basis so a taxation student always knows which Finance Act their rates come
 * from and can check it against their own sitting, rather than assuming.
 */

const TAX_PAPERS = new Set(["TX", "ATX"])

/** The tax-basis note for a paper, or null when the paper isn't tax-based. */
export function taxBasisNote(paperId: string | null | undefined): string | null {
  if (!paperId || !TAX_PAPERS.has(paperId)) return null
  return "Tax basis: UK Finance Act 2024 (2024/25). ACCA examines FA2024 through the March 2026 sitting — check which Finance Act your sitting is set on."
}
