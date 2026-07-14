import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA · Area C — Quality management.
 * Advanced-level: ISQM 1 (firm-level system of quality management, 8 components,
 * risk-based approach), ISQM 2 (engagement quality reviews, cooling-off),
 * ISA 220 (engagement-level quality), monitoring & remediation, root-cause
 * analysis and network firms. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const AAA_C: StudyChapter = {
  paper: "AAA",
  area: "C",
  title: "Quality management",
  minutes: 15,
  intro: "Quality is no longer a checklist you tick at the end of a file. Since ISQM 1, a firm must run a living, risk-based system — and be able to prove it works. This is where the modern AAA examiner lives.",
  outcomes: [
    "Explain the shift from quality control (ISQC 1) to a proactive system of quality management (ISQM 1)",
    "Describe the eight components of a firm's system of quality management and the risk-based approach that drives it",
    "Explain when an engagement quality review is required under ISQM 2, the reviewer's role, eligibility and cooling-off period",
    "Distinguish firm-level quality management (ISQM 1) from engagement-level quality management (ISA 220)",
    "Explain monitoring, remediation and the role of root-cause analysis, including issues raised by network firms",
  ],
  sections: [
    {
      id: "shift",
      heading: "From quality control to quality management",
      blocks: [
        { kind: "text", md: "For years, audit quality was governed by **ISQC 1** — a set of policies a firm put in place and hoped were enough. The trouble was that it treated every firm and every risk the same way: a small firm auditing owner-managed shops followed the same generic list as a network firm auditing global banks. When quality failed, it often failed silently, because nobody was required to ask **which risks specifically threaten quality here, and what would catch them?**" },
        { kind: "text", md: "**ISQM 1** replaced ISQC 1 from **15 December 2022** and changed the philosophy completely. A firm no longer maintains a static set of controls; it operates a **system of quality management (SOQM)** that is **proactive, risk-based and continuously monitored**. The firm must tailor the system to the nature and circumstances of its own practice — and, crucially, it must be able to **evaluate and conclude** on whether that system is actually working." },
        { kind: "callout", tone: "key", title: "The one idea", md: "ISQM 1 turns quality from a **checklist you comply with** into a **system you manage**: identify what could go wrong for **your** firm, design responses to those specific risks, and monitor whether the responses actually operate." },
        { kind: "text", md: "The examiner rewards candidates who can apply this to a scenario — spotting when a firm has a **generic** policy where a **risk-tailored** response was needed, or when it has designed a response but has no way of knowing whether it works. \"We have a policy\" is no longer an answer; \"we have a response that addresses an assessed quality risk, and we monitor it\" is." },
      ],
    },
    {
      id: "components",
      heading: "ISQM 1 — the eight components",
      blocks: [
        { kind: "text", md: "The SOQM is built from **eight interconnected components**. They are not a sequence to work through once; they operate together and continuously. Learn all eight — the examiner frequently asks you to place a scenario fact under the right component and explain the firm's obligation." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The eight components of a system of quality management",
          caption: "The first and last components — risk assessment and monitoring — wrap around the other six and keep the system honest.",
          data: {
            items: [
              { title: "1. Risk assessment process", sub: "Set quality objectives, identify & assess quality risks, design responses" },
              { title: "2. Governance & leadership", sub: "Tone at the top; assign ultimate & operational responsibility for the SOQM" },
              { title: "3. Relevant ethical requirements", sub: "Independence and the IESBA Code fulfilled and monitored" },
              { title: "4. Acceptance & continuance", sub: "Take on and keep only clients the firm can serve with integrity" },
              { title: "5. Engagement performance", sub: "Direction, supervision, review, consultation and quality reviews" },
              { title: "6. Resources", sub: "Human, technological, intellectual resources and service providers" },
              { title: "7. Information & communication", sub: "The right information flows within the firm and to/from outside" },
              { title: "8. Monitoring & remediation", sub: "Detect deficiencies, find root causes, fix them" },
            ],
          },
        } },
        { kind: "table", caption: "What each component is really asking of the firm", head: ["Component", "The question it answers", "Typical scenario trigger"], rows: [
          ["Governance & leadership", "Who owns quality, and is it resourced?", "Quality made subordinate to fee growth; no one accountable"],
          ["Ethical requirements", "Are we independent and behaving ethically?", "Long association; self-review from non-audit services"],
          ["Acceptance & continuance", "Should we act for this client at all?", "Aggressive client, integrity doubts, firm lacks competence"],
          ["Engagement performance", "Is the work being done properly?", "Weak review, no consultation on a complex judgement"],
          ["Resources", "Do we have the right people and tools?", "Understaffed peak season; outdated audit software"],
          ["Information & communication", "Does the right information reach the right people?", "Team not told of a client's litigation known to a partner"],
        ] },
        { kind: "callout", tone: "rule", title: "Ultimate responsibility must be assigned", md: "Under governance & leadership the firm must assign **ultimate responsibility and accountability** for the SOQM to the **CEO or managing partner** (or equivalent), and **operational responsibility** to named individuals. Quality cannot be everyone's job and therefore no one's." },
      ],
      check: {
        q: "During the audit of a complex financial instrument, the engagement team did not consult the firm's technical department because \"there was no time before the deadline\". Under ISQM 1, which component is MOST directly deficient?",
        options: [
          "Relevant ethical requirements",
          "Acceptance and continuance",
          "Engagement performance",
          "Information and communication",
        ],
        correct: 2,
        explain: "Consultation on difficult or contentious matters sits within engagement performance — the component covering how work is directed, supervised, reviewed and consulted on. A resources deficiency (too little time) may be a root cause, but the failure to consult is squarely an engagement performance deficiency.",
      },
    },
    {
      id: "risk-based",
      heading: "The risk-based approach that drives the system",
      blocks: [
        { kind: "text", md: "The first component — the **firm's risk assessment process** — is the engine. Rather than adopting a generic rulebook, the firm works through three iterative steps and repeats them as circumstances change. This is the single most examinable idea in the whole area, because it is what makes ISQM 1 different from ISQC 1." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The risk-based approach: objectives → risks → responses",
          caption: "Iterative, not once-and-done: new services, new clients or new technology feed back into the objectives.",
          data: {
            steps: [
              { label: "Quality objectives", sub: "Desired outcomes for each component (some are specified by ISQM 1)" },
              { label: "Quality risks", sub: "What could stop an objective being achieved, and how likely / severe?" },
              { label: "Responses", sub: "Policies & procedures designed to address the assessed risks" },
              { label: "Monitor & feed back", sub: "Findings and changes loop back into objectives and risks" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — turning a risk into a response", scenario: "A mid-tier firm has rapidly won several first-time listed-company audits. The quality objective is that engagements are performed by teams with appropriate competence. What is the quality risk, and what response might address it?", steps: [
          { label: "Objective", detail: "Engagements are performed by partners and staff with the competence and capabilities to do so — a specified engagement-performance/resources objective." },
          { label: "Identify the risk", detail: "Rapid growth in listed audits means teams may lack listed-entity experience — a real risk that work falls below standard." },
          { label: "Assess the risk", detail: "Likelihood is high (many new engagements at once) and severity is high (listed entities, public interest) — so this is a significant quality risk." },
          { label: "Design a response", detail: "Mandatory listed-entity training, assigning an experienced partner to each team, and requiring an engagement quality review on every listed audit." },
          { label: "Monitor", detail: "Inspect a sample of the new listed files; if deficiencies appear, perform root-cause analysis and strengthen the response." },
        ], result: "The firm has moved from a vague \"we train our staff\" to a specific response that targets an assessed risk — and has built in a way to know whether it works. That is ISQM 1 in miniature." },
        { kind: "callout", tone: "tip", md: "In the exam, structure your answer as **objective → risk → response**. Naming the response without first identifying the risk it addresses loses the marks the examiner is really testing." },
      ],
    },
    {
      id: "isqm2",
      heading: "ISQM 2 — engagement quality reviews",
      blocks: [
        { kind: "text", md: "One of the most powerful responses a firm can build into its system is an **engagement quality review (EQR)** — an objective evaluation, by someone **not on the engagement team**, of the significant judgements the team made and the conclusions they reached. **ISQM 2** governs when an EQR is required, who may perform it, and how it is carried out and documented." },
        { kind: "callout", tone: "rule", title: "When an EQR is required", md: "The firm's policies must require an engagement quality review for: (1) **audits of listed entities**; (2) any engagement where an EQR is **required by law or regulation**; and (3) any engagement for which the firm **decides** an EQR is an appropriate **response to a quality risk**." },
        { kind: "text", md: "The **engagement quality reviewer** must have the **competence, capabilities, time and authority** to perform the review, and must comply with the relevant **ethical requirements**, above all **objectivity**. The review is not a rubber stamp: the reviewer evaluates the team's independence assessment, the **significant judgements** and risks, and the appropriateness of the conclusions and the report." },
        { kind: "callout", tone: "warn", title: "The cooling-off period", md: "To protect objectivity, the individual who was the **engagement partner** cannot immediately become the EQ reviewer on the same audit of a **listed entity**. ISQM 2 requires a **cooling-off period of two years** (or longer where ethical requirements demand) before that switch is allowed. It stops a reviewer from, in effect, reviewing their own recent work." },
        { kind: "callout", tone: "key", title: "The report cannot be dated until the review is done", md: "The engagement partner **must not date the auditor's report** until the EQ reviewer has **notified** them that the review is complete. But note: the reviewer does **not** take over the engagement partner's responsibilities — the **engagement partner remains responsible** for the engagement throughout." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "ISQM 1 vs ISQM 2 — don't confuse them",
          data: {
            leftTitle: "ISQM 1",
            rightTitle: "ISQM 2",
            rows: [
              { aspect: "Level", left: "The whole firm's system", right: "A single engagement" },
              { aspect: "Scope", left: "All eight SOQM components", right: "Engagement quality reviews only" },
              { aspect: "Key question", left: "Is our system designed & operating?", right: "Should this engagement be independently reviewed, and by whom?" },
              { aspect: "Signature idea", left: "Risk-based approach; monitoring", right: "Eligibility, objectivity, cooling-off" },
              { aspect: "Owner", left: "Firm leadership", right: "The EQ reviewer, appointed by the firm" },
            ],
          },
        } },
      ],
      check: {
        q: "A partner who acted as engagement partner on the listed-company audit of Delta plc for the year ended 31 December 2024 is proposed as the engagement quality reviewer for Delta's 31 December 2025 audit. Under ISQM 2, is this acceptable?",
        options: [
          "Yes — being the previous engagement partner makes them the best-informed reviewer",
          "Yes, provided the partner confirms in writing that they remain objective",
          "No — a two-year cooling-off period must elapse before the former engagement partner can be the EQ reviewer",
          "No — a former engagement partner can never act as EQ reviewer for that client",
        ],
        correct: 2,
        explain: "For a listed entity, ISQM 2 requires a cooling-off period of at least two years before the individual who was the engagement partner may become the EQ reviewer. Only one year has passed, so it is not yet permitted. It is not a permanent ban (option 4 is too absolute) — the reviewer becomes eligible once the two-year period has elapsed.",
      },
    },
    {
      id: "isa220",
      heading: "ISA 220 — quality at the engagement level",
      blocks: [
        { kind: "text", md: "ISQM 1 sits at the **firm** level; **ISA 220 (Revised)** brings quality down to the **individual engagement**. The two are designed to interlock: the firm's system provides the environment, resources and policies, and the engagement team then **operates within it** and manages quality on their specific audit." },
        { kind: "text", md: "The pivotal idea in ISA 220 is that the **engagement partner** takes **overall responsibility for managing and achieving quality**, and must be **sufficiently and appropriately involved** throughout the engagement. They cannot delegate the audit and reappear only to sign — they must direct and supervise the team, review the work, resolve consultations, and stand back at the end to judge whether the significant judgements and conclusions are appropriate before dating the report." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Firm level vs engagement level",
          data: {
            leftTitle: "ISQM 1 — firm level",
            rightTitle: "ISA 220 — engagement level",
            rows: [
              { aspect: "Applies to", left: "The firm's whole practice", right: "One audit engagement" },
              { aspect: "Responsible", left: "Firm leadership (CEO / managing partner)", right: "The engagement partner" },
              { aspect: "Deliverable", left: "A functioning SOQM", right: "A quality audit, properly documented" },
              { aspect: "Resources", left: "Provides the firm's resources & policies", right: "Uses them; flags if they are insufficient" },
              { aspect: "Stand-back", left: "Annual evaluation of the SOQM", right: "Partner's judgement that quality was achieved before signing" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "A neat way to remember the link: **ISQM 1 builds the kitchen; ISA 220 cooks the meal.** If the kitchen (firm system) is well designed but the chef (engagement partner) isn't involved, the dish still fails — and vice versa." },
      ],
    },
    {
      id: "monitor-rca",
      heading: "Monitoring, remediation, root-cause analysis and networks",
      blocks: [
        { kind: "text", md: "A system is only credible if the firm can tell whether it works. The **monitoring and remediation** component requires the firm to design and perform monitoring activities — including **inspecting completed engagements** — that give relevant, reliable and timely information about the SOQM. Where monitoring finds a **deficiency**, the firm must **evaluate its severity and pervasiveness** and then **remediate** it." },
        { kind: "callout", tone: "rule", title: "What counts as a deficiency", md: "A deficiency exists when a needed **quality objective was not set**, a **quality risk was not identified**, or a **response is missing, badly designed, or not operating effectively**. Spotting deficiencies is not failure — **failing to find and fix them** is." },
        { kind: "text", md: "**Root-cause analysis (RCA)** is the discipline that makes remediation work. Instead of patching the symptom, the firm asks **why** the deficiency arose and keeps asking until it reaches the underlying cause. A missed disclosure might trace back not to one careless senior but to a resources shortage, a training gap, or a review process that was skipped under deadline pressure. The **depth** of RCA scales with the severity and pervasiveness of the finding — and firms are expected to investigate **positive** findings too, to learn what is working." },
        { kind: "diagram", diagram: {
          type: "cycle",
          title: "The monitoring and remediation loop",
          caption: "Continuous, not annual: findings feed straight back into the firm's risk assessment.",
          data: {
            steps: [
              { label: "Monitor (inspect engagements & the system)" },
              { label: "Identify deficiencies" },
              { label: "Evaluate severity & pervasiveness" },
              { label: "Root-cause analysis" },
              { label: "Design & implement remediation" },
              { label: "Re-assess quality risks" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The annual evaluation", md: "At least **annually**, the individual with ultimate responsibility for the SOQM must **evaluate the system** and conclude one of three things: it provides **reasonable assurance** objectives are met; it does so **except for** a deficiency with a **severe but not pervasive** effect; or it does **not** provide reasonable assurance (a **severe and pervasive** problem)." },
        { kind: "text", md: "Finally, many firms belong to a **network**. ISQM 1 makes clear that using **network requirements, network services or service providers** does **not** transfer responsibility: the firm **remains responsible for its own SOQM**. It must understand what the network provides, evaluate whether those requirements and services are appropriate for its circumstances, and adapt or supplement them where they are not. A firm cannot hide behind \"head office told us to do it this way.\"" },
      ],
      check: {
        q: "A firm's inspection finds that a required going-concern review step was skipped on three separate audits. Under ISQM 1, what should the firm do FIRST after identifying and evaluating this deficiency?",
        options: [
          "Immediately re-issue all three auditors' reports",
          "Perform root-cause analysis to understand why the step was skipped",
          "Report the firm to the audit regulator",
          "Remove the going-concern review step, as it is clearly unworkable",
        ],
        correct: 1,
        explain: "Once a deficiency is identified and its severity/pervasiveness evaluated, the firm performs root-cause analysis to understand WHY it happened, so that remediation targets the real cause (e.g. inadequate time or unclear responsibility) rather than the symptom. Re-issuing reports, reporting to a regulator or deleting the step are not the correct first response — remediation must be designed from the root cause.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing ISQM 1 as a fixed set of policies (the old ISQC 1 mindset).", fix: "ISQM 1 is a risk-based, continuously monitored SYSTEM. Always frame answers as objective → quality risk → response → monitor." },
    { trap: "Listing only some SOQM components or merging them.", fix: "There are exactly EIGHT: risk assessment, governance & leadership, ethics, acceptance & continuance, engagement performance, resources, information & communication, monitoring & remediation." },
    { trap: "Saying an EQR is required on every audit.", fix: "It is required only for listed entities, where law/regulation demands it, or where the firm decides it is an appropriate response to a quality risk." },
    { trap: "Forgetting the two-year cooling-off period, or treating it as a permanent ban.", fix: "A former engagement partner on a listed audit must wait two years (or longer if ethics require) before becoming its EQ reviewer — then they may act." },
    { trap: "Thinking the EQ reviewer or the firm's network takes over responsibility.", fix: "The engagement partner remains responsible for the engagement; the firm remains responsible for its own SOQM even when using network requirements or services." },
  ],
  keyTerms: [
    { term: "System of quality management (SOQM)", def: "The firm-wide, risk-based system required by ISQM 1, made up of eight interconnected components and continuously monitored." },
    { term: "Quality objective", def: "A desired outcome for a component of the SOQM; some objectives are specified by ISQM 1 and the firm may add more for its circumstances." },
    { term: "Quality risk", def: "A risk that has a reasonable possibility of occurring and, if it did, of adversely affecting the achievement of a quality objective." },
    { term: "Engagement quality review (EQR)", def: "An objective evaluation, by a reviewer not on the engagement team, of the significant judgements made and conclusions reached; governed by ISQM 2." },
    { term: "Cooling-off period", def: "The minimum two-year gap (for listed audits) before a former engagement partner may act as the engagement quality reviewer on the same engagement." },
    { term: "Root-cause analysis", def: "Investigating the underlying reasons a deficiency arose — not just its symptom — so that remediation addresses the true cause; its depth scales with severity and pervasiveness." },
  ],
  summary: [
    "ISQM 1 replaced ISQC 1 in December 2022, turning quality from a static checklist into a proactive, risk-based system of quality management the firm must monitor and evaluate.",
    "The SOQM has eight components; the risk assessment process drives it via objectives → quality risks → responses, and monitoring & remediation keep it honest.",
    "ISQM 2 requires engagement quality reviews for listed entities, where law/regulation demands, or as a response to a quality risk; the reviewer must be objective, and a two-year cooling-off applies to a former engagement partner.",
    "ISA 220 pushes quality to the engagement level: the engagement partner is responsible for, and must be sufficiently involved in, managing and achieving quality, and cannot date the report before any required EQR is complete.",
    "Deficiencies are found through monitoring, understood through root-cause analysis and fixed through remediation; using a network's requirements or services never transfers the firm's responsibility for its own SOQM.",
  ],
}
