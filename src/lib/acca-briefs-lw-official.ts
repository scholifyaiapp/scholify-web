import type { TopicBrief } from "@/lib/acca-briefs"
import { KNOWLEDGE_BRIEFS } from "@/lib/acca-briefs-knowledge"

function old(area: string): TopicBrief {
  const brief = KNOWLEDGE_BRIEFS.find((item) => item.paper === "LW" && item.area === area)
  if (!brief) throw new Error(`LW brief migration: missing former Area ${area}`)
  return brief
}

function brief(area: string, title: string, concept: string, structure: string, traps: string): TopicBrief {
  return { paper: "LW", area, title, minutes: 7, sections: [
    { kind: "concept", heading: "Core legal logic", body: concept },
    { kind: "structure", heading: "Exam application map", body: structure },
    { kind: "traps", heading: "Classic traps", body: traps },
  ] }
}

export const LW_OFFICIAL_BRIEFS: TopicBrief[] = [
  old("A"), old("B"), old("C"),
  brief("D", "Formation and constitution of business organisations",
    "Agency explains when one person binds another. Actual authority comes from agreement; apparent authority comes from the principal's representation. Partners are agents of their firm. Companies and LLPs have separate personality; ordinary partnerships do not.",
    "Work in sequence: identify the organisation; decide who owns property and owes debts; identify actual or apparent authority; then apply formation, promoter, pre-incorporation contract, registration, statutory-record, article and company-name rules. Salomon is the starting point for corporate personality; veil lifting is exceptional.",
    "Treating an agent's own claim as apparent authority; making incoming partners liable for earlier debts automatically; confusing an LLP with an ordinary partnership; or assuming control by one shareholder destroys separate personality."),
  brief("E", "Capital and the financing of companies",
    "Shares create membership and residual risk; loan capital creates creditor rights. Fixed and floating charges allocate security and priority. Capital-maintenance rules restrict discounts, reductions, own-share purchases and distributions to protect creditors.",
    "Classify the instrument and rights; determine whether an issue is rights, bonus, premium or prohibited discount; test charge registration and priority; then apply distributable-profit and capital-reduction safeguards.",
    "Calling debenture holders members; treating a bonus issue as new cash; forgetting that an unregistered charge loses security against a liquidator; or paying dividends from cash rather than distributable profits."),
  brief("F", "Management, administration and regulation of companies",
    "Members own; directors manage collectively within the constitution and seven statutory duties. Secretaries support compliance; auditors have independent statutory access and reporting rights. Members exercise reserved powers through meetings and resolutions.",
    "Identify the officer and source of authority; apply appointment, removal and disqualification; match conduct to the relevant director duty; then select ordinary, special or written resolution and the required notice, quorum and filing procedure.",
    "Confusing special notice with a special resolution; assuming an individual director automatically binds the company; using a written resolution to remove a director or auditor; or treating duties as owed directly to each shareholder."),
  brief("G", "Insolvency law",
    "Liquidation realises assets and ends the company; administration aims first to rescue the company or produce a better creditor result. Solvent members' voluntary liquidation differs from creditors' voluntary and compulsory liquidation.",
    "Identify solvency and procedure; determine who appoints the office-holder; apply the moratorium and administrator objectives; then distribute assets through fixed security, expenses, preferential claims, prescribed part, floating security, unsecured creditors and members.",
    "Putting floating charges ahead of preferential claims and the prescribed part; confusing administration with liquidation; or assuming members receive anything before creditors are paid in full."),
  brief("H", "Corporate fraudulent and criminal behaviour",
    "The syllabus joins market integrity, laundering, bribery, failure-to-prevent offences and misconduct near insolvency. Liability can attach to individuals and organisations, and prevention systems are part of the legal analysis.",
    "For each scenario identify the offence, actor, mental element, organisational attribution or failure-to-prevent route, reporting duties and statutory defence. Distinguish fraudulent trading's dishonesty from wrongful trading's knew-or-ought-to-have-known threshold.",
    "Treating all poor decisions as fraud; overlooking tipping-off and reporting offences; requiring board knowledge for every corporate failure-to-prevent offence; or applying legislation outside ACCA's examinable period."),
]
