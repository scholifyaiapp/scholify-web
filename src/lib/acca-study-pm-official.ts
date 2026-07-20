import type { StudyChapter } from "@/lib/acca-study-content"
import { PM_A } from "@/lib/acca-study-pm-a"
import { PM_B } from "@/lib/acca-study-pm-b"
import { PM_C } from "@/lib/acca-study-pm-c"
import { PM_D } from "@/lib/acca-study-pm-d"

export const PM_OFFICIAL_A: StudyChapter = {
  paper: "PM", area: "A", title: "Management information systems and data analytics", minutes: 34,
  intro: "Performance decisions depend on governed information systems that convert transactions and external observations into timely, secure and decision-useful insight.",
  outcomes: ["Compare management information systems", "Evaluate information controls and security", "Explain big data, data mining and analytics", "Select descriptive, diagnostic, predictive or prescriptive analysis"],
  sections: [
    { id: "information-systems", heading: "Information systems for performance management", blocks: [
      { kind: "text", md: "Transaction processing systems capture routine events; management information systems summarise them for recurring control; executive information systems provide high-level, exception-focused views; ERP integrates processes and data; CRM organises customer interactions. Internet, intranet, wireless and network technologies extend access while increasing dependency and security exposure." },
      { kind: "table", caption: "Information by decision level", head: ["Level", "Typical information"], rows: [["Strategic", "External, summarised, forward-looking, uncertain"], ["Tactical", "Periodic comparisons, resources, trends and exceptions"], ["Operational", "Detailed, frequent, transaction-level and immediate"]] },
      { kind: "text", md: "Assess a system through decision benefit, implementation and operating cost, integration, scalability, usability, resilience, data quality and control. Automation can accelerate a flawed process as easily as a sound one." },
    ] },
    { id: "information-control", heading: "Uses, controls and security of information", blocks: [
      { kind: "text", md: "Controls should cover authorised input, validation, complete processing, reconciled output, restricted distribution, retention and recovery. Confidential information needs least-privilege access, authentication, encryption, logging, secure transmission, backup, tested recovery and incident response." },
      { kind: "callout", tone: "rule", title: "Govern the full information lifecycle", md: "Define ownership and purpose; validate collection; protect storage and transfer; control transformation; reconcile outputs; retain evidence; and dispose securely. A polished dashboard is not evidence that its data are complete or unbiased." },
    ] },
    { id: "big-data-analytics", heading: "Big data, data mining and analytics", blocks: [
      { kind: "text", md: "Big data combines volume, variety and velocity, alongside veracity and value. Data mining detects patterns, clusters, associations, anomalies and sequences. Benefits include faster forecasting, segmentation, process insight and exception detection; limitations include bias, spurious patterns, privacy, security, skills and opaque models." },
      { kind: "table", caption: "Four analytical questions", head: ["Method", "Question"], rows: [["Descriptive", "What happened?"], ["Diagnostic", "Why did it happen?"], ["Predictive", "What is likely to happen?"], ["Prescriptive", "What action should be taken?"]] },
    ] },
  ], examTraps: [{ trap: "Treating more data as better information.", fix: "Test relevance, reliability, completeness, bias, timeliness and decision value." }], keyTerms: [{ term: "ERP", def: "An integrated system and shared data model spanning multiple organisational processes." }], summary: ["Match systems and information to decision level.", "Control data from capture through disposal.", "Distinguish descriptive, diagnostic, predictive and prescriptive analytics."]
}

export const PM_OFFICIAL_B: StudyChapter = { ...PM_A, area: "B" }
export const PM_OFFICIAL_C: StudyChapter = { ...PM_B, area: "C" }
export const PM_OFFICIAL_D: StudyChapter = { ...PM_C, area: "D" }
export const PM_OFFICIAL_E: StudyChapter = { ...PM_D, area: "E" }

export const PM_OFFICIAL_F: StudyChapter = {
  paper: "PM", area: "F", title: "Employability and technology skills", minutes: 18,
  intro: "PM rewards technically correct work only when the digital response is navigable, auditable and professionally communicated.",
  outcomes: ["Navigate and manipulate digital exam information", "Use spreadsheet and response tools efficiently", "Present calculations and discussion professionally", "Review outputs for logic, units and completeness"],
  sections: [{ id: "digital-response", heading: "Building a professional CBE response", blocks: [
    { kind: "text", md: "Read the requirement verb first, allocate time to marks and build a response structure before calculating. In the spreadsheet, separate assumptions, workings and outputs; label units; use formulas rather than hard-coded repeated values; and retain enough visible logic for another person to follow." },
    { kind: "text", md: "For narrative requirements, use short headings tied to the requirement, apply each point to scenario evidence and state its consequence. Copying generic theory or presenting an unexplained calculation does not demonstrate analysis." },
    { kind: "callout", tone: "key", title: "Final digital review", md: "Check every requirement, sign and unit; reconcile totals; inspect formulas and reasonableness; remove contradictory drafts; and ensure the marker can find each answer quickly." },
  ] }], examTraps: [{ trap: "Submitting a number without a traceable working or interpretation.", fix: "Show the method, label the result and explain the decision implication." }], keyTerms: [{ term: "Audit trail", def: "Visible inputs, formulas and reasoning that allow a reviewer to reproduce and challenge the output." }], summary: ["Structure work around requirements and marks.", "Make spreadsheet logic visible and controlled.", "Apply narrative points to scenario evidence."]
}
