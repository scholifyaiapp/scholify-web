export type VerificationStage =
  | "draft"
  | "source_checked"
  | "calculation_checked"
  | "independently_reviewed"
  | "verified"

export interface VerificationSource {
  title: string
  url: string
  publisher: string
  accessedOn: string
  role: "syllabus" | "exam_guidance" | "technical" | "primary_standard" | "coverage_benchmark"
}

export interface AreaVerificationRecord {
  paper: string
  legacyCode: string
  syllabusPeriod: string
  area: string
  officialTitle: string
  /** Official study-guide topic groups covered by this record (for example A1-A9). */
  topicGroups: string[]
  existingContentAreas: string[]
  stage: VerificationStage
  calculationCheck: "pending" | "passed" | "not_applicable"
  independentReviewer?: string
  reviewedOn?: string
  sources: VerificationSource[]
  findings: string[]
}

const BT_SYLLABUS: VerificationSource = {
  title: "Business and Technology (BT/FBT) syllabus and study guide — September 2025 to August 2026",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/f1/studyguides/btfbt_s25_a26_syllabus_study_guide.pdf",
  publisher: "ACCA",
  accessedOn: "2026-07-20",
  role: "syllabus",
}

const BT_EXAM_GUIDANCE: VerificationSource = {
  title: "Business and Technology (BT/FBT) essentials on one page",
  url: "https://www.accaglobal.com/crsh/en/student/exam-support-resources/fundamentals-exams-study-resources/f1/session-cbe-introduction/bt-essentials.html",
  publisher: "ACCA",
  accessedOn: "2026-07-20",
  role: "exam_guidance",
}

const common = {
  paper: "BT",
  legacyCode: "F1",
  syllabusPeriod: "September 2025 to August 2026",
  stage: "draft" as const,
  calculationCheck: "pending" as const,
  sources: [BT_SYLLABUS, BT_EXAM_GUIDANCE],
}

/**
 * F1/BT starts at draft: the existing four-area product taxonomy compresses the
 * official six-area blueprint. These records make that gap explicit and prevent
 * structural completeness from being mistaken for academic verification.
 */
export const BT_VERIFICATION: AreaVerificationRecord[] = [
  {
    ...common,
    area: "A",
    officialTitle: "The business organisation and its external environment",
    topicGroups: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
    existingContentAreas: ["A"],
    stage: "source_checked",
    calculationCheck: "not_applicable",
    findings: ["Independent qualified review remains required before Area A can be labelled verified."],
  },
  {
    ...common,
    area: "B",
    officialTitle: "Organisational structure, culture, governance and sustainability",
    topicGroups: ["B1", "B2", "B3", "B4", "B5"],
    existingContentAreas: ["A", "C"],
    stage: "source_checked",
    calculationCheck: "not_applicable",
    findings: ["Independent qualified review remains required before Area B can be labelled verified."],
  },
  {
    ...common,
    area: "C",
    officialTitle: "Business functions, regulation and technology",
    topicGroups: ["C1", "C2", "C3", "C4", "C5", "C6", "C7"],
    existingContentAreas: ["D"],
    stage: "source_checked",
    calculationCheck: "not_applicable",
    findings: ["Independent qualified review remains required before Area C can be labelled verified."],
  },
  {
    ...common,
    area: "D",
    officialTitle: "Leadership and management",
    topicGroups: ["D1", "D2", "D3", "D4", "D5", "D6"],
    existingContentAreas: ["B"],
    stage: "source_checked",
    calculationCheck: "not_applicable",
    findings: ["Independent qualified review remains required before Area D can be labelled verified."],
  },
  {
    ...common,
    area: "E",
    officialTitle: "Personal effectiveness and communication in business",
    topicGroups: ["E1", "E2", "E3", "E4", "E5"],
    existingContentAreas: ["B"],
    stage: "source_checked",
    calculationCheck: "not_applicable",
    findings: ["Independent qualified review remains required before Area E can be labelled verified."],
  },
  {
    ...common,
    area: "F",
    officialTitle: "Professional ethics",
    topicGroups: ["F1", "F2", "F3", "F4"],
    existingContentAreas: ["C"],
    stage: "source_checked",
    calculationCheck: "not_applicable",
    findings: ["Independent qualified review remains required before Area F can be labelled verified."],
  },
]

const MA_SYLLABUS: VerificationSource = {
  title: "Management Accounting (MA/FMA) syllabus and study guide — September 2025 to August 2026",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/fia/studyguides/MA.FMA%20S25-A26%20syllabus%20and%20study%20guide%20-%20final.pdf",
  publisher: "ACCA",
  accessedOn: "2026-07-20",
  role: "syllabus",
}

const maCommon = {
  paper: "MA",
  legacyCode: "F2",
  syllabusPeriod: "September 2025 to August 2026",
  stage: "draft" as const,
  calculationCheck: "pending" as const,
  sources: [MA_SYLLABUS],
}

/** Baseline records: MA currently has five product buckets but six official areas. */
export const MA_VERIFICATION: AreaVerificationRecord[] = [
  { ...maCommon, area: "A", officialTitle: "The nature, source and purpose of management information", topicGroups: ["A1", "A2", "A3", "A4"], existingContentAreas: ["A"], stage: "source_checked", calculationCheck: "not_applicable", findings: ["Independent qualified review remains required before Area A can be labelled verified."] },
  { ...maCommon, area: "B", officialTitle: "Data analysis and statistical techniques", topicGroups: ["B1", "B2", "B3", "B4"], existingContentAreas: ["A", "C"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified review remains required before Area B can be labelled verified."] },
  { ...maCommon, area: "C", officialTitle: "Cost accounting techniques", topicGroups: ["C1", "C2", "C3", "C4"], existingContentAreas: ["A", "B"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified review remains required before Area C can be labelled verified."] },
  { ...maCommon, area: "D", officialTitle: "Budgeting", topicGroups: ["D1", "D2", "D3", "D4", "D5", "D6"], existingContentAreas: ["C"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified review remains required before Area D can be labelled verified."] },
  { ...maCommon, area: "E", officialTitle: "Standard costing", topicGroups: ["E1", "E2", "E3"], existingContentAreas: ["D"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified review remains required before Area E can be labelled verified."] },
  { ...maCommon, area: "F", officialTitle: "Performance measurement", topicGroups: ["F1", "F2", "F3", "F4"], existingContentAreas: ["E"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified review remains required before Area F can be labelled verified."] },
]

const FA_SYLLABUS: VerificationSource = {
  title: "Financial Accounting (FA/FFA) syllabus and study guide — September 2025 to August 2026",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/fia/studyguides/FA%20FFA%20S25-A26%20syllabus%20and%20study%20guide%20-%20final.pdf",
  publisher: "ACCA",
  accessedOn: "2026-07-20",
  role: "syllabus",
}

const faCommon = {
  paper: "FA",
  legacyCode: "F3",
  syllabusPeriod: "September 2025 to August 2026",
  sources: [FA_SYLLABUS],
}

const faFinding = ["Independent qualified review remains required before this area can be labelled verified."]

/** FA is source-aligned to ACCA's nine official areas; quantitative areas have executable recomputation evidence. */
export const FA_VERIFICATION: AreaVerificationRecord[] = [
  { ...faCommon, area: "A", officialTitle: "The context and purpose of financial reporting", topicGroups: ["A1", "A2", "A3", "A4", "A5"], existingContentAreas: ["A"], stage: "source_checked", calculationCheck: "not_applicable", findings: faFinding },
  { ...faCommon, area: "B", officialTitle: "Accounting principles, concepts and qualitative characteristics", topicGroups: ["B1", "B2"], existingContentAreas: ["B"], stage: "source_checked", calculationCheck: "not_applicable", findings: faFinding },
  { ...faCommon, area: "C", officialTitle: "The use of double-entry bookkeeping and accounting systems", topicGroups: ["C1", "C2"], existingContentAreas: ["C"], stage: "calculation_checked", calculationCheck: "passed", findings: faFinding },
  { ...faCommon, area: "D", officialTitle: "Recording transactions and events", topicGroups: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"], existingContentAreas: ["D"], stage: "calculation_checked", calculationCheck: "passed", findings: faFinding },
  { ...faCommon, area: "E", officialTitle: "Reconciliations", topicGroups: ["E1", "E2"], existingContentAreas: ["E"], stage: "calculation_checked", calculationCheck: "passed", findings: faFinding },
  { ...faCommon, area: "F", officialTitle: "Preparing a trial balance", topicGroups: ["F1", "F2", "F3"], existingContentAreas: ["E"], stage: "calculation_checked", calculationCheck: "passed", findings: faFinding },
  { ...faCommon, area: "G", officialTitle: "Preparing financial statements", topicGroups: ["G1", "G2", "G3", "G4", "G5", "G6"], existingContentAreas: ["F"], stage: "calculation_checked", calculationCheck: "passed", findings: faFinding },
  { ...faCommon, area: "H", officialTitle: "Preparing basic consolidated financial statements", topicGroups: ["H1", "H2"], existingContentAreas: ["G"], stage: "calculation_checked", calculationCheck: "passed", findings: faFinding },
  { ...faCommon, area: "I", officialTitle: "Interpretation of financial statements", topicGroups: ["I1", "I2", "I3"], existingContentAreas: ["H"], stage: "calculation_checked", calculationCheck: "passed", findings: faFinding },
]

const LW_ENG_SYLLABUS: VerificationSource = {
  title: "Corporate and Business Law — England (LW-ENG) syllabus and study guide — September 2025 to August 2026",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/f4/studyguides/LW%20ENG%20S25-A26%20syllabus%20and%20study%20guide%20-%20final.pdf",
  publisher: "ACCA",
  accessedOn: "2026-07-20",
  role: "syllabus",
}

const lwCommon = { paper: "LW", legacyCode: "F4", syllabusPeriod: "September 2025 to August 2026", stage: "source_checked" as const, calculationCheck: "not_applicable" as const, sources: [LW_ENG_SYLLABUS] }
const lwFinding = ["Independent review by a suitably qualified English-law reviewer remains required before this area can be labelled verified."]

export const LW_VERIFICATION: AreaVerificationRecord[] = [
  { ...lwCommon, area: "A", officialTitle: "Essential elements of the legal system", topicGroups: ["A1", "A2"], existingContentAreas: ["A"], findings: lwFinding },
  { ...lwCommon, area: "B", officialTitle: "The law of obligations", topicGroups: ["B1", "B2", "B3", "B4"], existingContentAreas: ["B"], findings: lwFinding },
  { ...lwCommon, area: "C", officialTitle: "Employment law", topicGroups: ["C1", "C2"], existingContentAreas: ["C"], findings: lwFinding },
  { ...lwCommon, area: "D", officialTitle: "The formation and constitution of business organisations", topicGroups: ["D1", "D2", "D3", "D4"], existingContentAreas: ["D"], findings: lwFinding },
  { ...lwCommon, area: "E", officialTitle: "Capital and the financing of companies", topicGroups: ["E1", "E2", "E3"], existingContentAreas: ["D"], findings: lwFinding },
  { ...lwCommon, area: "F", officialTitle: "Management, administration and the regulation of companies", topicGroups: ["F1", "F2", "F3"], existingContentAreas: ["D"], findings: lwFinding },
  { ...lwCommon, area: "G", officialTitle: "Insolvency law", topicGroups: ["G1"], existingContentAreas: ["D"], findings: lwFinding },
  { ...lwCommon, area: "H", officialTitle: "Corporate fraudulent and criminal behaviour", topicGroups: ["H1"], existingContentAreas: ["D"], findings: lwFinding },
]

const PM_SYLLABUS: VerificationSource = {
  title: "Performance Management (PM) syllabus and study guide — September 2026 to June 2027",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/f5/studyguides/pm_s26_j27_syllabus_and_study_guide.pdf",
  publisher: "ACCA",
  accessedOn: "2026-07-20",
  role: "syllabus",
}

const pmCommon = { paper: "PM", legacyCode: "F5", syllabusPeriod: "September 2026 to June 2027", sources: [PM_SYLLABUS] }
const pmFinding = ["Independent qualified review remains required before this area can be labelled verified."]

export const PM_VERIFICATION: AreaVerificationRecord[] = [
  { ...pmCommon, area: "A", officialTitle: "Management information systems and data analytics", topicGroups: ["A1", "A2", "A3"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: pmFinding },
  { ...pmCommon, area: "B", officialTitle: "Specialist cost and management accounting techniques", topicGroups: ["B1", "B2", "B3", "B4", "B5"], existingContentAreas: ["A"], stage: "calculation_checked", calculationCheck: "passed", findings: pmFinding },
  { ...pmCommon, area: "C", officialTitle: "Decision-making techniques", topicGroups: ["C1", "C2", "C3", "C4", "C5", "C6"], existingContentAreas: ["B"], stage: "calculation_checked", calculationCheck: "passed", findings: pmFinding },
  { ...pmCommon, area: "D", officialTitle: "Budgeting and control", topicGroups: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"], existingContentAreas: ["C"], stage: "calculation_checked", calculationCheck: "passed", findings: pmFinding },
  { ...pmCommon, area: "E", officialTitle: "Performance measurement and control", topicGroups: ["E1", "E2", "E3"], existingContentAreas: ["D"], stage: "calculation_checked", calculationCheck: "passed", findings: pmFinding },
  { ...pmCommon, area: "F", officialTitle: "Employability and technology skills", topicGroups: ["F1", "F2", "F3", "F4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: pmFinding },
]

const TX_UK_SYLLABUS: VerificationSource = {
  title: "Taxation — United Kingdom (TX-UK) syllabus and study guide — June 2026 to June 2027",
  url: "https://www.accaglobal.com/uk/en/student/exam-support-resources/fundamentals-exams-study-resources/f6/syllabus-study-guide/f6-syllabus-study-guide-united-kingdom-uk.html",
  publisher: "ACCA",
  accessedOn: "2026-07-20",
  role: "syllabus",
}
const TX_FA2025: VerificationSource = {
  title: "Finance Act 2025 — relevant to TX-UK exams June 2026 to June 2027",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/f6/examdocs/tx_uk_j26_j27_fa2025_article.pdf",
  publisher: "ACCA",
  accessedOn: "2026-07-20",
  role: "technical",
}
const txCommon = { paper: "TX", legacyCode: "F6", syllabusPeriod: "June 2026 to June 2027", sources: [TX_UK_SYLLABUS, TX_FA2025] }

export const TX_VERIFICATION: AreaVerificationRecord[] = [
  { ...txCommon, area: "A", officialTitle: "The UK tax system and its administration", topicGroups: ["A1", "A2", "A3", "A4", "A5"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: ["Independent qualified UK-tax review remains required before Area A can be labelled verified."] },
  { ...txCommon, area: "B", officialTitle: "Income tax liabilities and national insurance contributions", topicGroups: ["B1", "B2", "B3", "B4", "B5", "B6"], existingContentAreas: ["A"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified UK-tax review remains required before Area B can be labelled verified."] },
  { ...txCommon, area: "C", officialTitle: "Chargeable gains for individuals", topicGroups: ["C1", "C2", "C3", "C4"], existingContentAreas: ["B"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified UK-tax review remains required before Area C can be labelled verified."] },
  { ...txCommon, area: "D", officialTitle: "Inheritance tax liabilities", topicGroups: ["D1", "D2", "D3", "D4"], existingContentAreas: ["E"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified UK-tax review remains required before Area D can be labelled verified."] },
  { ...txCommon, area: "E", officialTitle: "Corporation tax liabilities", topicGroups: ["E1", "E2", "E3", "E4", "E5"], existingContentAreas: ["C"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified UK-tax review remains required before Area E can be labelled verified."] },
  { ...txCommon, area: "F", officialTitle: "Value added tax", topicGroups: ["F1", "F2", "F3", "F4"], existingContentAreas: ["D"], stage: "calculation_checked", calculationCheck: "passed", findings: ["Independent qualified UK-tax review remains required before Area F can be labelled verified."] },
  { ...txCommon, area: "G", officialTitle: "Employability and technology skills", topicGroups: ["G1", "G2", "G3", "G4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: ["Independent qualified review remains required before Area G can be labelled verified."] },
]

const FR_SYLLABUS: VerificationSource = {
  title: "Financial Reporting (FR) syllabus and study guide — September 2026 to June 2027",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/f7/studyguides/fr_s26_j27_syllabus_and_study_guide.pdf",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "syllabus",
}
const FR_EXAMINABLE: VerificationSource = {
  title: "FR and SBR examinable documents — September 2026 to June 2027",
  url: "https://www.accaglobal.com/hk/en/student/exam-support-resources/fundamentals-exams-study-resources/f7/examinable-documents.html",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "technical",
}
const frCommon = { paper: "FR", legacyCode: "F7", syllabusPeriod: "September 2026 to June 2027", sources: [FR_SYLLABUS, FR_EXAMINABLE] }
const frFinding = ["Independent qualified IFRS review remains required before this area can be labelled verified."]

export const FR_VERIFICATION: AreaVerificationRecord[] = [
  { ...frCommon, area: "A", officialTitle: "The conceptual and regulatory framework for financial reporting", topicGroups: ["A1", "A2", "A3", "A4"], existingContentAreas: ["A"], stage: "source_checked", calculationCheck: "not_applicable", findings: frFinding },
  { ...frCommon, area: "B", officialTitle: "Accounting for transactions in financial statements", topicGroups: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12"], existingContentAreas: ["B"], stage: "calculation_checked", calculationCheck: "passed", findings: frFinding },
  { ...frCommon, area: "C", officialTitle: "Analysing and interpreting financial statements of single entities and groups", topicGroups: ["C1", "C2", "C3", "C4"], existingContentAreas: ["C"], stage: "calculation_checked", calculationCheck: "passed", findings: frFinding },
  { ...frCommon, area: "D", officialTitle: "Preparation of financial statements", topicGroups: ["D1", "D2"], existingContentAreas: ["D", "E"], stage: "calculation_checked", calculationCheck: "passed", findings: frFinding },
  { ...frCommon, area: "E", officialTitle: "Employability and technology skills", topicGroups: ["E1", "E2", "E3", "E4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: frFinding },
]

const AA_SYLLABUS: VerificationSource = {
  title: "Audit and Assurance (AA) syllabus and study guide — September 2026 to June 2027",
  url: "https://www.accaglobal.com/my/en/student/exam-support-resources/fundamentals-exams-study-resources/f8/syllabus-study-guide.html",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "syllabus",
}
const AA_EXAMINABLE: VerificationSource = {
  title: "AA examinable documents — September 2026 to June 2027",
  url: "https://www.accaglobal.com/caribbean/en/student/exam-support-resources/fundamentals-exams-study-resources/f8/examinable-documents.html",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "technical",
}
const aaCommon = { paper: "AA", legacyCode: "F8", syllabusPeriod: "September 2026 to June 2027", sources: [AA_SYLLABUS, AA_EXAMINABLE] }
const aaFinding = ["Independent qualified audit review remains required before this area can be labelled verified."]

export const AA_VERIFICATION: AreaVerificationRecord[] = [
  { ...aaCommon, area: "A", officialTitle: "Audit framework and regulation", topicGroups: ["A1", "A2", "A3", "A4"], existingContentAreas: ["A"], stage: "source_checked", calculationCheck: "not_applicable", findings: aaFinding },
  { ...aaCommon, area: "B", officialTitle: "Planning and risk assessment", topicGroups: ["B1", "B2", "B3", "B4", "B5", "B6"], existingContentAreas: ["B"], stage: "calculation_checked", calculationCheck: "passed", findings: aaFinding },
  { ...aaCommon, area: "C", officialTitle: "Internal control", topicGroups: ["C1", "C2", "C3", "C4", "C5", "C6"], existingContentAreas: ["C"], stage: "source_checked", calculationCheck: "not_applicable", findings: aaFinding },
  { ...aaCommon, area: "D", officialTitle: "Audit evidence", topicGroups: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"], existingContentAreas: ["D"], stage: "calculation_checked", calculationCheck: "passed", findings: aaFinding },
  { ...aaCommon, area: "E", officialTitle: "Review and reporting", topicGroups: ["E1", "E2", "E3", "E4", "E5"], existingContentAreas: ["E"], stage: "source_checked", calculationCheck: "not_applicable", findings: aaFinding },
  { ...aaCommon, area: "F", officialTitle: "Employability and technology skills", topicGroups: ["F1", "F2", "F3", "F4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: aaFinding },
]

const FM_SYLLABUS: VerificationSource = {
  title: "Financial Management (FM) syllabus and study guide — September 2026 to June 2027",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/f9/studyguides/fm_s26_j27_syllabus_and_study_guide.pdf",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "syllabus",
}
const fmCommon = { paper: "FM", legacyCode: "F9", syllabusPeriod: "September 2026 to June 2027", sources: [FM_SYLLABUS] }
const fmFinding = ["Independent qualified financial-management review remains required before this area can be labelled verified."]

export const FM_VERIFICATION: AreaVerificationRecord[] = [
  { ...fmCommon, area: "A", officialTitle: "Financial management function", topicGroups: ["A1", "A2", "A3", "A4"], existingContentAreas: ["A"], stage: "source_checked", calculationCheck: "not_applicable", findings: fmFinding },
  { ...fmCommon, area: "B", officialTitle: "Financial management environment", topicGroups: ["B1", "B2", "B3"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: fmFinding },
  { ...fmCommon, area: "C", officialTitle: "Working capital management", topicGroups: ["C1", "C2", "C3"], existingContentAreas: ["C"], stage: "calculation_checked", calculationCheck: "passed", findings: fmFinding },
  { ...fmCommon, area: "D", officialTitle: "Investment appraisal", topicGroups: ["D1", "D2", "D3", "D4"], existingContentAreas: ["B"], stage: "calculation_checked", calculationCheck: "passed", findings: fmFinding },
  { ...fmCommon, area: "E", officialTitle: "Business finance", topicGroups: ["E1", "E2", "E3", "E4", "E5"], existingContentAreas: ["D"], stage: "calculation_checked", calculationCheck: "passed", findings: fmFinding },
  { ...fmCommon, area: "F", officialTitle: "Business valuations", topicGroups: ["F1", "F2", "F3", "F4"], existingContentAreas: ["E"], stage: "calculation_checked", calculationCheck: "passed", findings: fmFinding },
  { ...fmCommon, area: "G", officialTitle: "Risk management", topicGroups: ["G1", "G2", "G3", "G4"], existingContentAreas: ["E"], stage: "calculation_checked", calculationCheck: "passed", findings: fmFinding },
  { ...fmCommon, area: "H", officialTitle: "Employability and technology skills", topicGroups: ["H1", "H2", "H3", "H4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: fmFinding },
]

const SBL_SYLLABUS: VerificationSource = {
  title: "Strategic Business Leader (SBL) syllabus and study guide — September 2026 to June 2027",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/SBL/sbl_s26_j27_syllabus_and_study_guide.pdf",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "syllabus",
}
const sblCommon = { paper: "SBL", legacyCode: "SBL", syllabusPeriod: "September 2026 to June 2027", sources: [SBL_SYLLABUS] }
const sblFinding = ["Independent qualified strategic-leadership review remains required before this area can be labelled verified."]

export const SBL_VERIFICATION: AreaVerificationRecord[] = [
  { ...sblCommon, area: "A", officialTitle: "Leadership", topicGroups: ["A1", "A2", "A3"], existingContentAreas: ["A", "E"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
  { ...sblCommon, area: "B", officialTitle: "Governance and sustainability", topicGroups: ["B1", "B2", "B3", "B4", "B5", "B6"], existingContentAreas: ["A"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
  { ...sblCommon, area: "C", officialTitle: "Strategy", topicGroups: ["C1", "C2", "C3", "C4", "C5"], existingContentAreas: ["B"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
  { ...sblCommon, area: "D", officialTitle: "Risk", topicGroups: ["D1", "D2"], existingContentAreas: ["C"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
  { ...sblCommon, area: "E", officialTitle: "Technology and data analytics", topicGroups: ["E1", "E2", "E3", "E4", "E5"], existingContentAreas: ["D"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
  { ...sblCommon, area: "F", officialTitle: "Organisational control and audit", topicGroups: ["F1", "F2", "F3"], existingContentAreas: ["C", "new"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
  { ...sblCommon, area: "G", officialTitle: "Finance in planning and decision-making", topicGroups: ["G1", "G2", "G3"], existingContentAreas: ["new"], stage: "calculation_checked", calculationCheck: "passed", findings: sblFinding },
  { ...sblCommon, area: "H", officialTitle: "Enabling success, managing change and project management", topicGroups: ["H1", "H2", "H3", "H4", "H5", "H6"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
  { ...sblCommon, area: "I", officialTitle: "Professional skills", topicGroups: ["I1", "I2", "I3", "I4", "I5"], existingContentAreas: ["E"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
  { ...sblCommon, area: "J", officialTitle: "Other employability and digital skills", topicGroups: ["J1", "J2", "J3", "J4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: sblFinding },
]

const SBR_INT_SYLLABUS: VerificationSource = {
  title: "Strategic Business Reporting (SBR-INT) syllabus and study guide — September 2026 to June 2027",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/SBR/sbr_int_s26_j27_syllabus_and_study_guide.pdf",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "syllabus",
}
const SBR_EXAMINABLE: VerificationSource = {
  title: "FR and SBR examinable documents — September 2026 to June 2027",
  url: "https://www.accaglobal.com/middle-east/en/student/exam-support-resources/fundamentals-exams-study-resources/f7/examinable-documents.html",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "technical",
}
const sbrCommon = { paper: "SBR", legacyCode: "SBR-INT", syllabusPeriod: "September 2026 to June 2027", sources: [SBR_INT_SYLLABUS, SBR_EXAMINABLE] }
const sbrFinding = ["Independent qualified IFRS and sustainability-reporting review remains required before this area can be labelled verified."]
export const SBR_VERIFICATION: AreaVerificationRecord[] = [
  { ...sbrCommon, area: "A", officialTitle: "Fundamental ethical and professional principles", topicGroups: ["A1"], existingContentAreas: ["A", "new"], stage: "source_checked", calculationCheck: "not_applicable", findings: sbrFinding },
  { ...sbrCommon, area: "B", officialTitle: "The financial reporting framework", topicGroups: ["B1"], existingContentAreas: ["A"], stage: "source_checked", calculationCheck: "not_applicable", findings: sbrFinding },
  { ...sbrCommon, area: "C", officialTitle: "Reporting the financial performance of a range of entities", topicGroups: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11"], existingContentAreas: ["B", "D"], stage: "calculation_checked", calculationCheck: "passed", findings: sbrFinding },
  { ...sbrCommon, area: "D", officialTitle: "Financial statements of groups of entities", topicGroups: ["D1", "D2", "D3"], existingContentAreas: ["C"], stage: "calculation_checked", calculationCheck: "passed", findings: sbrFinding },
  { ...sbrCommon, area: "E", officialTitle: "Interpret financial and non-financial information for different stakeholders", topicGroups: ["E1"], existingContentAreas: ["E", "A"], stage: "calculation_checked", calculationCheck: "passed", findings: sbrFinding },
  { ...sbrCommon, area: "F", officialTitle: "The impact of changes and potential changes in accounting regulation", topicGroups: ["F1"], existingContentAreas: ["E", "new"], stage: "source_checked", calculationCheck: "not_applicable", findings: sbrFinding },
  { ...sbrCommon, area: "G", officialTitle: "Employability and technology skills", topicGroups: ["G1", "G2", "G3", "G4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: sbrFinding },
]

const AFM_SYLLABUS: VerificationSource = {
  title: "Advanced Financial Management (AFM) syllabus and study guide — September 2026 to June 2027",
  url: "https://www.accaglobal.com/uk/en/student/exam-support-resources/professional-exams-study-resources/p4/syllabus-study-guide.html",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "syllabus",
}
const afmCommon = { paper: "AFM", legacyCode: "P4", syllabusPeriod: "September 2026 to June 2027", sources: [AFM_SYLLABUS] }
const afmFinding = ["Independent qualified advanced-financial-management review remains required before this area can be labelled verified."]
export const AFM_VERIFICATION: AreaVerificationRecord[] = [
  { ...afmCommon, area: "A", officialTitle: "Role of the senior financial adviser in the multinational organisation", topicGroups: ["A1", "A2", "A3", "A4", "A5", "A6"], existingContentAreas: ["A"], stage: "calculation_checked", calculationCheck: "passed", findings: afmFinding },
  { ...afmCommon, area: "B", officialTitle: "Advanced investment appraisal", topicGroups: ["B1", "B2", "B3", "B4", "B5"], existingContentAreas: ["B"], stage: "calculation_checked", calculationCheck: "passed", findings: afmFinding },
  { ...afmCommon, area: "C", officialTitle: "Acquisitions and mergers", topicGroups: ["C1", "C2", "C3", "C4"], existingContentAreas: ["C"], stage: "calculation_checked", calculationCheck: "passed", findings: afmFinding },
  { ...afmCommon, area: "D", officialTitle: "Corporate reconstruction and re-organisation", topicGroups: ["D1", "D2"], existingContentAreas: ["D"], stage: "calculation_checked", calculationCheck: "passed", findings: afmFinding },
  { ...afmCommon, area: "E", officialTitle: "Treasury and advanced risk management techniques", topicGroups: ["E1", "E2", "E3"], existingContentAreas: ["E"], stage: "calculation_checked", calculationCheck: "passed", findings: afmFinding },
  { ...afmCommon, area: "F", officialTitle: "Professional skills", topicGroups: ["F1", "F2", "F3", "F4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: afmFinding },
  { ...afmCommon, area: "G", officialTitle: "Employability and technology skills", topicGroups: ["G1", "G2", "G3", "G4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: afmFinding },
]

const APM_SYLLABUS: VerificationSource = {
  title: "Advanced Performance Management (APM) syllabus and study guide — September 2026 to June 2027",
  url: "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/p5/studyguides/apm_s26_j27_syllabus_and_study_guide.pdf",
  publisher: "ACCA", accessedOn: "2026-07-20", role: "syllabus",
}
const apmCommon = { paper: "APM", legacyCode: "P5", syllabusPeriod: "September 2026 to June 2027", sources: [APM_SYLLABUS] }
const apmFinding = ["Independent qualified advanced-performance-management review remains required before this area can be labelled verified."]
export const APM_VERIFICATION: AreaVerificationRecord[] = [
  { ...apmCommon, area: "A", officialTitle: "Strategic management and value creation", topicGroups: ["A1", "A2", "A3", "A4", "A5"], existingContentAreas: ["A", "C"], stage: "calculation_checked", calculationCheck: "passed", findings: apmFinding },
  { ...apmCommon, area: "B", officialTitle: "Performance optimisation", topicGroups: ["B1", "B2", "B3", "B4", "B5"], existingContentAreas: ["A", "B", "C", "D"], stage: "calculation_checked", calculationCheck: "passed", findings: apmFinding },
  { ...apmCommon, area: "C", officialTitle: "Performance reporting", topicGroups: ["C1", "C2", "C3", "C4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: apmFinding },
  { ...apmCommon, area: "D", officialTitle: "Data science and technology for performance and insights", topicGroups: ["D1", "D2", "D3", "D4"], existingContentAreas: ["B", "new"], stage: "source_checked", calculationCheck: "not_applicable", findings: apmFinding },
  { ...apmCommon, area: "E", officialTitle: "Professional skills", topicGroups: ["E1", "E2", "E3", "E4"], existingContentAreas: ["new"], stage: "source_checked", calculationCheck: "not_applicable", findings: apmFinding },
]

const ATX_UK_SYLLABUS:VerificationSource={title:"Advanced Taxation — United Kingdom (ATX-UK) syllabus and study guide — June 2026 to June 2027",url:"https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/p6/studyguides/atx_uk_j26_j27_syllabus_and_study_guide.pdf",publisher:"ACCA",accessedOn:"2026-07-20",role:"syllabus"}
const ATX_FA2025:VerificationSource={title:"Finance Act 2025 — relevant to ATX-UK exams June 2026 to June 2027",url:"https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/p6/examdocs/atx_uk_j26_j27_fa2025_article.pdf",publisher:"ACCA",accessedOn:"2026-07-20",role:"technical"}
const ATX_EXAMINABLE:VerificationSource={title:"ATX-UK examinable documents and tax tables — June 2026 to June 2027",url:"https://www.accaglobal.com/caribbean/en/student/exam-support-resources/professional-exams-study-resources/p6/examinable-documents/atx-uk.html",publisher:"ACCA",accessedOn:"2026-07-20",role:"technical"}
const atxCommon={paper:"ATX",legacyCode:"P6-UK",syllabusPeriod:"June 2026 to June 2027",sources:[ATX_UK_SYLLABUS,ATX_FA2025,ATX_EXAMINABLE]}
const atxFinding=["Independent qualified UK-tax review remains required before this area can be labelled verified."]
export const ATX_VERIFICATION:AreaVerificationRecord[]=[
{...atxCommon,area:"A",officialTitle:"Knowledge and understanding of the UK tax system",topicGroups:["A1","A2","A3","A4","A5","A6"],existingContentAreas:["A","B","C","D"],stage:"calculation_checked",calculationCheck:"passed",findings:atxFinding},
{...atxCommon,area:"B",officialTitle:"The impact and interaction of taxes",topicGroups:["B1","B2","B3"],existingContentAreas:["new"],stage:"calculation_checked",calculationCheck:"passed",findings:atxFinding},
{...atxCommon,area:"C",officialTitle:"Tax planning",topicGroups:["C1","C2","C3"],existingContentAreas:["E","new"],stage:"calculation_checked",calculationCheck:"passed",findings:atxFinding},
{...atxCommon,area:"D",officialTitle:"Professional skills and communication",topicGroups:["D1","D2","D3","D4"],existingContentAreas:["E","new"],stage:"source_checked",calculationCheck:"not_applicable",findings:atxFinding},
{...atxCommon,area:"E",officialTitle:"Employability and technology skills",topicGroups:["E1","E2","E3","E4"],existingContentAreas:["new"],stage:"source_checked",calculationCheck:"not_applicable",findings:atxFinding},]

const AAA_INT_SYLLABUS:VerificationSource={title:"Advanced Audit and Assurance (AAA-INT) syllabus and study guide — September 2026 to June 2027",url:"https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/p7/studyguides/aaa_int_s26_j27_syllabus_and_study_guide.pdf",publisher:"ACCA",accessedOn:"2026-07-20",role:"syllabus"}
const aaaCommon={paper:"AAA",legacyCode:"P7-INT",syllabusPeriod:"September 2026 to June 2027",sources:[AAA_INT_SYLLABUS]};const aaaFinding=["Independent qualified international-audit review remains required before this area can be labelled verified."]
export const AAA_VERIFICATION:AreaVerificationRecord[]=[
{...aaaCommon,area:"A",officialTitle:"Regulatory environment",topicGroups:["A1","A2","A3"],existingContentAreas:["A"],stage:"source_checked",calculationCheck:"not_applicable",findings:aaaFinding},
{...aaaCommon,area:"B",officialTitle:"Professional and ethical considerations",topicGroups:["B1","B2","B3"],existingContentAreas:["B"],stage:"source_checked",calculationCheck:"not_applicable",findings:aaaFinding},
{...aaaCommon,area:"C",officialTitle:"Quality management",topicGroups:["C1","C2","C3"],existingContentAreas:["C"],stage:"source_checked",calculationCheck:"not_applicable",findings:aaaFinding},
{...aaaCommon,area:"D",officialTitle:"Planning and conducting an audit of historical financial information",topicGroups:["D1","D2","D3","D4","D5"],existingContentAreas:["D"],stage:"calculation_checked",calculationCheck:"passed",findings:aaaFinding},
{...aaaCommon,area:"E",officialTitle:"Completion, review and reporting",topicGroups:["E1","E2","E3","E4"],existingContentAreas:["E"],stage:"source_checked",calculationCheck:"not_applicable",findings:aaaFinding},
{...aaaCommon,area:"F",officialTitle:"Other assignments",topicGroups:["F1","F2","F3","F4","F5"],existingContentAreas:["new"],stage:"source_checked",calculationCheck:"not_applicable",findings:aaaFinding},
{...aaaCommon,area:"G",officialTitle:"Current issues and developments",topicGroups:["G1","G2","G3"],existingContentAreas:["new"],stage:"source_checked",calculationCheck:"not_applicable",findings:aaaFinding},
{...aaaCommon,area:"H",officialTitle:"Professional skills",topicGroups:["H1","H2","H3","H4"],existingContentAreas:["new"],stage:"source_checked",calculationCheck:"not_applicable",findings:aaaFinding},
{...aaaCommon,area:"I",officialTitle:"Employability and technology skills",topicGroups:["I1","I2","I3","I4"],existingContentAreas:["new"],stage:"source_checked",calculationCheck:"not_applicable",findings:aaaFinding},]

export function isVerified(record: AreaVerificationRecord): boolean {
  return (
    record.stage === "verified" &&
    record.sources.some((source) => source.role === "syllabus") &&
    record.calculationCheck !== "pending" &&
    Boolean(record.independentReviewer && record.reviewedOn) &&
    record.findings.length === 0
  )
}
