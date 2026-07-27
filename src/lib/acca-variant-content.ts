import type { StudyChapter } from "@/lib/acca-study-content"
import { getPaperVariant, type PaperVariant } from "@/lib/acca-profile"

const VARIANT_SECTIONS: Record<"LW" | "TX", Record<PaperVariant, StudyChapter["sections"][number]>> = {
  LW: {
    UK: {
      id: "lw-uk-foundation",
      heading: "United Kingdom variant foundation",
      blocks: [
        { kind: "text", md: "The **LW-UK** route applies the English legal system. Build every answer from the hierarchy of legislation and precedent, then apply English contract, tort, employment, agency, partnership and company law to the facts." },
        { kind: "callout", tone: "rule", title: "UK answer method", md: "Identify the English-law rule, state its elements, apply each element to the scenario, distinguish civil and criminal consequences, and conclude with the most likely remedy or liability." },
        { kind: "text", md: "Core UK institutions include Parliament, the courts and tribunals. Binding precedent depends on court hierarchy and the ratio decidendi. Company-law answers distinguish the company from members and directors, then test authority, duty, procedure and remedy." },
      ],
    },
    GLOBAL: {
      id: "lw-global-foundation",
      heading: "Global variant foundation",
      blocks: [
        { kind: "text", md: "The **LW-Global** route focuses on internationally transferable business-law principles. It covers legal systems, international commercial transactions, obligations, employment, agency, organisations, governance, insolvency, fraud and professional conduct without assuming one domestic court system." },
        { kind: "callout", tone: "rule", title: "Global answer method", md: "Identify the governing principle and source, apply it to the commercial facts, recognise jurisdictional limits, and conclude without importing a domestic rule that the scenario has not supplied." },
        { kind: "text", md: "Global learners compare civil-law and common-law reasoning, distinguish public and private international law, and recognise how conventions, model laws, contracts and chosen-law clauses support cross-border certainty." },
      ],
    },
  },
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
  if ((paperId !== "LW" && paperId !== "TX") || chapters.length === 0) return chapters
  const variant = getPaperVariant(paperId) ?? (paperId === "LW" ? "GLOBAL" : "UK")
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
