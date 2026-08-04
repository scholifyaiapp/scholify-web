import type { StudyChapter } from "@/lib/acca-study-content"
import { getPaperVariant, type PaperVariant } from "@/lib/acca-profile"

/*
 * ── Why LW is no longer here ───────────────────────────────────
 * This overlay exists for one purpose: to give a variant that is reading the OTHER
 * variant's chapters some orientation about its own syllabus. That was LW's position
 * until both variants got their own authored reading tree — LW-Global's 33 chapters and
 * LW-ENG's 46 — at which point the overlay became not merely unnecessary but
 * misleading, since it prepended a "United Kingdom variant foundation" section to a
 * tree that is already entirely English law.
 *
 * `acca-paper-content.ts` routes each LW variant to its own tree and skips this
 * function for both, so LW is deliberately absent from the record below. TX still needs
 * it: TX-UK reads the shared TX chapters, and only TX-Global has its own tree.
 */
const VARIANT_SECTIONS: Record<"TX", Record<PaperVariant, StudyChapter["sections"][number]>> = {
  TX: {
    UK: {
      id: "tx-uk-foundation",
      heading: "United Kingdom variant · FA2025",
      blocks: [
        { kind: "text", md: "The **TX-UK** route uses Finance Act 2025 and the 2025/26 basis. It covers UK administration, income tax and NIC, capital gains tax, inheritance tax, corporation tax and VAT." },
        { kind: "callout", tone: "rule", title: "Period control", md: "Label the taxpayer, tax, period and Finance Act before calculating. Use the supplied rate sheet and keep liability, filing date and payment date separate." },
      ],
    },
    GLOBAL: {
      id: "tx-global-foundation",
      heading: "Global taxation foundation",
      blocks: [
        { kind: "text", md: "The **TX-Global** route develops portable tax reasoning: residence and source, direct and indirect taxation, individuals and entities, taxable bases, reliefs, administration, ethics and cross-border double-tax risk." },
        { kind: "callout", tone: "rule", title: "Global computation method", md: "Identify the taxpayer, jurisdictional connection, taxable event, period, base, relief and rate. When a jurisdiction-specific rate is required, use the figure stated in the scenario rather than assuming a UK rate." },
        { kind: "text", md: "Cross-border work separates residence from source, identifies possible taxation in more than one jurisdiction, and then considers exemption, credit or treaty mechanisms without promising a result that depends on an unstated domestic rule." },
      ],
    },
  },
}

export function applyVariantStudyContent(paperId: string, chapters: StudyChapter[]): StudyChapter[] {
  if (paperId !== "TX" || chapters.length === 0) return chapters
  const variant = getPaperVariant(paperId) ?? "UK"
  const overlay = VARIANT_SECTIONS[paperId][variant]
  return chapters.map((chapter, index) => index === 0
    ? {
        ...chapter,
        title: `${chapter.title} · ${variant === "UK" ? "United Kingdom" : "Global"}`,
        intro: `${variant === "UK" ? "United Kingdom" : "Global"} variant. ${chapter.intro}`,
        sections: [overlay, ...chapter.sections.filter((section) => section.id !== overlay.id)],
      }
    : chapter)
}
