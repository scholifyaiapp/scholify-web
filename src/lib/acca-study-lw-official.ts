import type { StudyChapter, StudySection } from "@/lib/acca-study-content"
import { LW_A } from "@/lib/acca-study-lw-a"
import { LW_B } from "@/lib/acca-study-lw-b"
import { LW_C } from "@/lib/acca-study-lw-c"
import { LW_D } from "@/lib/acca-study-lw-d"

function old(id: string): StudySection {
  const section = LW_D.sections.find((item) => item.id === id)
  if (!section) throw new Error(`LW migration: missing section ${id}`)
  return section
}

export const LW_OFFICIAL_A = LW_A
export const LW_OFFICIAL_B: StudyChapter = {
  ...LW_B,
  sections: [...LW_B.sections, {
    id: "passing-off-professional-negligence",
    heading: "Passing off and professional negligence",
    blocks: [
      { kind: "text", md: "Passing off protects business goodwill against a misrepresentation that causes or is likely to cause damage. The claimant establishes goodwill, a misleading representation linking the defendant's goods or services to the claimant, and resulting damage; the remedy may include injunction, damages or an account of profits." },
      { kind: "text", md: "Accountants and auditors owe contractual duties to their clients and may owe a tortious duty to a third party where loss is reasonably foreseeable, the relationship has sufficient proximity—commonly through an assumption of responsibility and reasonable reliance—and it is fair, just and reasonable to impose the duty. Causation, remoteness and contributory negligence remain separate tests." },
    ],
  }],
}
export const LW_OFFICIAL_C = LW_C

const AGENCY_PARTNERSHIP: StudySection = {
  id: "agency-partnerships",
  heading: "Agency and partnerships",
  blocks: [
    { kind: "text", md: "Agency arises by express or implied agreement, ratification, necessity or estoppel. Actual authority comes from the principal; apparent authority arises where the principal represents that the agent has authority and a third party reasonably relies on it. An agent acting within authority binds the principal and normally drops out of the contract." },
    { kind: "text", md: "Every ordinary partner is an agent of the firm for business of the kind carried on. Partners generally have joint liability for contractual debts and joint and several liability for wrongful acts. Incoming partners are not automatically liable for earlier debts; retiring partners remain liable for existing debts and may remain apparently liable until effective notice." },
    { kind: "text", md: "A limited partnership has at least one general partner with unlimited liability and passive limited partners. An LLP is a separate body corporate whose members ordinarily enjoy limited liability, alongside registration, accounting and disclosure duties." },
  ],
}

const FORMATION_CONTROLS: StudySection = {
  id: "formation-controls",
  heading: "Promoters, pre-incorporation contracts and statutory records",
  blocks: [
    { kind: "text", md: "A promoter stands in a fiduciary relationship to the proposed company and must disclose interests and secret profits. A company cannot ratify a contract made before it existed; the person purporting to contract for it is normally personally liable unless the agreement provides otherwise, and the formed company must enter a new contract to become bound." },
    { kind: "text", md: "Registration and continuing compliance require prescribed records and returns, including constitutional documents, registers, accounting records, annual accounts, confirmation statements and the register of people with significant control. Company names are restricted where misleading, offensive, sensitive, too similar or otherwise prohibited, with remedies for opportunistic registration." },
  ],
}

export const LW_OFFICIAL_D: StudyChapter = {
  ...LW_D,
  area: "D",
  title: "The formation and constitution of business organisations",
  minutes: 34,
  outcomes: ["Apply agency law", "Compare partnerships, LLPs and companies", "Explain separate personality and limited liability", "Apply company formation and constitutional rules"],
  sections: [AGENCY_PARTNERSHIP, old("types"), old("salomon"), old("formation"), FORMATION_CONTROLS],
}

const COMPANY_FINANCE: StudySection = {
  id: "company-finance",
  heading: "Share capital, loan capital and distributions",
  blocks: [
    { kind: "text", md: "Equity capital includes issued and paid-up share capital. Ordinary and preference shares carry rights defined by the constitution and terms of issue; treasury shares are a company's own repurchased shares held subject to statutory restrictions. Class rights require the prescribed class consent to vary." },
    { kind: "text", md: "A rights issue offers new shares to existing members for cash; a bonus issue capitalises reserves without new cash. Shares may be issued at par or premium but not at a discount to nominal value. Borrowing creates creditor rights rather than membership rights and may be secured by registered fixed or floating charges." },
    { kind: "text", md: "Capital maintenance protects creditors. Dividends and other distributions may be paid only from distributable profits, supported by relevant accounts. A lawful capital reduction or purchase of own shares requires the applicable member, solvency, court and publicity safeguards." },
  ],
}

export const LW_OFFICIAL_E: StudyChapter = { ...LW_D, area: "E", title: "Capital and the financing of companies", minutes: 26, outcomes: ["Compare share classes and issues", "Compare loan and share capital", "Apply charge registration and priority", "Apply capital-maintenance and dividend rules"], sections: [COMPANY_FINANCE] }

const OFFICERS: StudySection = {
  id: "company-officers",
  heading: "Company secretaries and auditors",
  blocks: [
    { kind: "text", md: "A public company must have a suitably qualified company secretary; a private company need not appoint one. The secretary supports statutory compliance and may bind the company within actual or apparent authority associated with the office." },
    { kind: "text", md: "Auditors are appointed under statutory procedures and have rights of access to books, information and meetings. Removal before the end of office requires an ordinary resolution at a meeting with special notice and safeguards for representations; resignation and removal trigger statements and filings designed to protect auditor independence and transparency." },
  ],
}

export const LW_OFFICIAL_F: StudyChapter = { ...LW_D, area: "F", title: "Management, administration and regulation of companies", minutes: 34, outcomes: ["Apply directors' appointment, authority and duties", "Explain secretary and auditor rights and duties", "Apply meeting and resolution procedures"], sections: [old("directors"), OFFICERS, old("meetings")] }

const ADMINISTRATION: StudySection = {
  id: "administration",
  heading: "Administration as an alternative to liquidation",
  blocks: [
    { kind: "text", md: "Administration places the company under an administrator and a statutory moratorium. Its hierarchy of purposes is to rescue the company as a going concern; if that is not reasonably practicable, achieve a better result for creditors than immediate winding up; or, if neither is practicable, realise property for secured or preferential creditors without unnecessarily harming creditors as a whole." },
    { kind: "text", md: "An administrator may be appointed by court order or, subject to statutory conditions, out of court by the company, its directors or a qualifying floating-charge holder. The administrator takes control, may manage and dispose of business and property, investigates affairs, submits proposals and acts as an officer of the court for creditors collectively." },
  ],
}

export const LW_OFFICIAL_G: StudyChapter = { ...LW_D, area: "G", title: "Insolvency law", minutes: 24, outcomes: ["Distinguish liquidation routes", "Apply creditor priority", "Explain administration and administrator powers"], sections: [old("insolvency"), ADMINISTRATION] }

const CORPORATE_CRIME: StudySection = {
  id: "corporate-crime",
  heading: "Corporate fraudulent and criminal behaviour",
  blocks: [
    { kind: "text", md: "Insider dealing criminalises specified dealing, encouraging and disclosure involving inside information; market-abuse rules also protect fair and orderly markets. Money-laundering controls require risk assessment, customer due diligence, records, monitoring, internal reporting and staff communication; tipping off and failure to report can themselves be offences." },
    { kind: "text", md: "The Bribery Act covers giving and receiving bribes, bribing foreign public officials and a commercial organisation's failure to prevent bribery by associated persons, subject to the adequate-procedures defence. Corporate controls must be proportionate, risk-based, communicated, monitored and supported by leadership." },
    { kind: "text", md: "Relevant bodies can incur offences for failure to prevent facilitation of tax evasion and, in the examinable 2025–26 syllabus, failure to prevent fraud. The fraud offence focuses on specified fraud by an associated person intending to benefit the organisation or its clients, subject to the statutory reasonable-prevention-procedures framework and scope conditions." },
    { kind: "text", md: "Fraudulent trading requires dishonest intent to defraud; wrongful trading can impose civil contribution where directors knew or ought to have concluded insolvent liquidation was unavoidable and failed to take every step to minimise creditor loss." },
    { kind: "callout", tone: "warn", title: "Law changes—use the examinable period", md: "Apply the legislation and scope specified by ACCA for the exam year. Do not assume a later commencement date or threshold applies merely because it is current when you study." },
  ],
}

export const LW_OFFICIAL_H: StudyChapter = { ...LW_D, area: "H", title: "Corporate fraudulent and criminal behaviour", minutes: 26, outcomes: ["Apply insider-dealing and market-abuse controls", "Apply money-laundering and bribery rules", "Explain failure-to-prevent offences", "Distinguish fraudulent and wrongful trading"], sections: [CORPORATE_CRIME] }
