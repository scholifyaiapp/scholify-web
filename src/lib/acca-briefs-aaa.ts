/*
 * Topic Briefs — ACCA Advanced Audit & Assurance (AAA).
 * One brief per syllabus area (A–E). Same instruction-layer format as
 * TOPIC_BRIEFS: concept in plain language, the standards/structures,
 * a worked scenario, and the classic traps.
 */

import type { TopicBrief } from "@/lib/acca-briefs"

export const AAA_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── A — Regulatory environment ───────────────────────── */
  {
    paper: "AAA",
    area: "A",
    title: "Regulatory environment",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why audit is regulated at all",
        body: `An audit opinion is only worth something if a reader can trust the person giving it. A bank lending millions against a set of accounts is not in the room while the audit happens — it relies on a system that forces the auditor to be competent, independent and consistent. That system is the regulatory environment, and AAA expects you to see it as three overlapping layers rather than one rulebook.

The first layer is professional standards. International Standards on Auditing (ISAs) are written by the IAASB and tell you HOW to audit; the IESBA International Code of Ethics tells you how to behave; ISQM sets out how a firm must control quality. National bodies (in the UK, the FRC) can adopt these or add to them, which is why local law can be stricter than the global standard.

The second layer is company law and governance. Law decides who must be audited at all — many small companies are exempt on size grounds — and sets the rules for appointing, removing and resigning auditors, so that directors cannot quietly fire an auditor who asks awkward questions. Corporate governance codes (audit committees, board oversight) sit alongside this.

The third layer is anti-money-laundering (ML) and the law more broadly. Auditors are gatekeepers: they can be used, knowingly or not, to launder the proceeds of crime, so they are legally obliged to run customer due diligence, keep records, and report suspicions. ISA 250 also governs how the auditor considers the client's own compliance with laws and regulations. AAA marks reward candidates who can name which layer a rule comes from and why it exists — not just recite it.`,
      },
      {
        kind: "structure",
        heading: "The regulatory framework and ML rules",
        body: `The standard-setting architecture:
IFAC — global umbrella body for the profession.
IAASB — issues ISAs, ISAEs, ISREs, ISRSs and ISQMs (auditing and assurance).
IESBA — issues the International Code of Ethics for Professional Accountants.
IAASB/IESBA sit under IFAC; national regulators (e.g. FRC in the UK) adopt or strengthen these.

Company-law layer:
Who is audited — audit is compulsory unless the entity meets small-company exemption thresholds (size limits on turnover, assets, employees).
Appointment, removal and resignation of auditors are governed by law to protect auditor independence; a resigning or removed auditor has rights to make representations.
Governance codes require an audit committee of independent non-executive directors to oversee the external audit and safeguard independence.

Laws and regulations at the client — ISA 250:
Split the client's laws into (a) those with a direct effect on the financial statements (e.g. tax, pensions) and (b) those central to operating the business (e.g. a licence to trade). The auditor's responsibility is greater for (a).

Money laundering — the auditor's own obligations:
Customer due diligence (CDD) — verify the identity of the client and beneficial owners before and during the engagement.
Appoint a Money Laundering Reporting Officer (MLRO) and maintain internal reporting.
Report knowledge or suspicion of money laundering to the authorities (a suspicious activity report).
Do NOT tip off — warning the client that a report has been or will be made is itself a criminal offence.
Keep records and provide staff training.`,
      },
      {
        kind: "example",
        heading: "Worked example — spotting the layer",
        body: `You are the engagement partner on Verdant Ltd, a small owner-managed importer. Three issues land on your desk during acceptance:

Issue 1: The company's turnover and assets are below the statutory thresholds and the directors ask whether they even need an audit. This is a company-law question — Verdant may qualify for small-company audit exemption, so the first task is to confirm the thresholds rather than plan an audit.

Issue 2: A new customer paid a $40,000 invoice in cash across several deposits, and the finance director is vague about the customer's identity. This is a money-laundering red flag. You must complete customer due diligence, and if suspicion remains, the MLRO makes a report to the authorities. Crucially, you must NOT explain to the finance director why you are pressing on identity — doing so risks tipping off.

Issue 3: Verdant imports goods under a trading licence that has lapsed. This is a laws-and-regulations matter under ISA 250 — the lapsed licence is central to the business's ability to operate, so it may threaten going concern and require disclosure, even though it has no direct arithmetic effect on the numbers.

Same client, three different layers of the regulatory environment — company law, AML law, and audit-standard compliance — each with a different required response.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Saying the IAASB writes the ethics code — the IAASB writes ISAs; the IESBA writes the Code of Ethics. Both sit under IFAC.

Thinking every company must be audited — small companies meeting the statutory thresholds can be exempt; that is a legal, not a professional-standards, question.

Confusing tipping off with reporting — you MUST report suspicions of money laundering, but you must NOT tell the client you have done so; tipping off is a separate offence.

Treating all laws and regulations the same under ISA 250 — the auditor has a higher responsibility for laws with a direct effect on the figures than for general operating laws.

Assuming resigning simply ends the auditor's involvement — law gives departing auditors rights and duties (statements, representations) precisely so problems cannot be buried.`,
      },
    ],
  },

  /* ───────────── B — Professional & ethical considerations ───────────── */
  {
    paper: "AAA",
    area: "B",
    title: "Professional & ethical considerations",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Independence is the product",
        body: `In AAA, ethics is not a soft topic bolted on at the end — it is frequently the largest single source of marks, because independence is the thing the audit actually sells. The IESBA Code works on a threats-and-safeguards model rather than a list of banned acts: you identify what could pull the auditor away from objectivity, judge whether the threat is at an acceptable level, and if not, apply a safeguard or decline the work.

There are five named threats, and examiners reward candidates who name the RIGHT one for the situation. Self-interest is a financial or other interest that biases the auditor (a fee dependency, a shareholding, an unpaid fee). Self-review is auditing your own earlier work (having prepared the numbers you now audit). Advocacy is promoting the client's position so far that objectivity is lost (representing them in litigation). Familiarity is being too close or too trusting through a long or personal relationship. Intimidation is being pressured — a threat to remove you, or an aggressive dominant director.

The Code is stricter for public interest entities (PIEs — listed companies and others of public significance), because the number of people relying on the opinion is far larger. For PIEs you must layer on the hard rules: fee-dependency limits, partner rotation, and an outright ban on many non-audit services. AAA answers should always start by asking whether the client is a PIE, because that single fact changes which rules bite.`,
      },
      {
        kind: "structure",
        heading: "Threats, safeguards and the PIE hard rules",
        body: `The five threats (learn the trigger for each):
Self-interest — fee dependency, contingent fees, overdue fees, financial interest, a loan to/from the client.
Self-review — auditing work the firm itself produced (bookkeeping, valuations, systems the firm designed).
Advocacy — acting as the client's champion, e.g. in litigation or promoting its shares.
Familiarity — long association, close personal or family ties, a former partner now in a client's senior role.
Intimidation — threats of dismissal, litigation, or pressure over fees or scope.

Safeguards: rotate staff, use a separate team, obtain an independent review, remove the individual, decline or resign. If no safeguard reduces the threat to an acceptable level, do not act.

PIE hard rules (over and above threats/safeguards):
Fee dependence — if total fees from a PIE audit client (and related entities) exceed 15% of the firm's total fees for two consecutive years, disclose to those charged with governance and arrange a pre- or post-issuance independent review.
Rotation — a key audit partner on a PIE rotates off after a maximum of 7 years, then observes a cooling-off period (5 years for the engagement partner) before returning.
Prohibited non-audit services — for a PIE audit client the firm must not provide services that create a self-review or management threat, including: bookkeeping and preparing the financial statements, valuations material to the statements, internal audit over financial reporting, designing financial-reporting IT systems, and acting in a management role or making management decisions.
Contingent fees for audit work and gifts/hospitality beyond the trivial are prohibited for any audit client.`,
      },
      {
        kind: "example",
        heading: "Worked example — naming the threat",
        body: `Kestrel Audit LLP audits Halden plc, a listed company. During planning four facts emerge. Take each in turn.

Fact 1: Fees from Halden and its subsidiaries were 16% of the firm's total fees last year and are on track to be 17% this year. This is a self-interest threat and it breaches the PIE 15% rule for two consecutive years — Kestrel must inform those charged with governance and put an independent pre- or post-issuance review in place.

Fact 2: The engagement partner has led the Halden audit for eight years. This is a familiarity (and self-interest) threat that breaches the 7-year PIE rotation limit — the partner must rotate off and cool off.

Fact 3: The client asks Kestrel to prepare Halden's consolidated financial statements as well as audit them. For a PIE this is a prohibited non-audit service — it creates a self-review threat and must be declined; the firm cannot audit statements it wrote.

Fact 4: The finance director hints that the audit will be re-tendered "if the numbers cause trouble." That is an intimidation threat; the safeguard is to involve the audit committee and, if pressure persists, consider resignation.

One client, four separate ethical problems — the marks come from naming the correct threat and the correct PIE rule, not from a general worry about independence.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Calling everything a self-interest threat — read the trigger. Auditing your own work is self-review; a long relationship is familiarity; pressure is intimidation.

Applying the 15% fee cap on a single year — the rule bites when fees exceed 15% for two consecutive years, and the response is disclosure plus an independent review, not automatic resignation.

Forgetting to ask whether the client is a PIE — rotation, the 15% cap and the non-audit-services ban apply to PIEs; for a non-PIE you rely on threats and safeguards.

Suggesting a "safeguard" that does not fix the problem — you cannot audit financial statements you prepared for a PIE; no review safeguard cures a prohibited service, you must decline it.

Treating an overdue fee as merely an admin issue — a significant unpaid fee is effectively a loan and a self-interest threat to independence.`,
      },
    ],
  },

  /* ───────────────────────── C — Quality management ───────────────────────── */
  {
    paper: "AAA",
    area: "C",
    title: "Quality management",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "From checking to managing quality",
        body: `Quality used to be treated as something you inspected at the end — a reviewer signs off, done. The current standards changed the mindset: quality is now something a firm MANAGES continuously through a system built around the risks specific to that firm. This is why the old ISQC 1 was replaced by ISQM 1, and why the "M" (management) matters — the firm sets quality objectives, identifies what could stop it meeting them, and designs responses, then monitors whether they work.

There are three related standards and AAA expects you to keep them straight. ISQM 1 is the firm-level system of quality management — it applies to the whole firm and everything it does. ISQM 2 deals specifically with engagement quality reviews (EQRs) — who performs a second-partner review, when one is required, and how objective that reviewer must be. ISA 220 (Revised) brings all of this down to the individual engagement: it is the engagement partner's responsibility to manage quality on their audit, drawing on the firm's system.

The unifying idea is a risk-based, top-down system with feedback. The firm does not just have policies; it assesses quality risks, responds, monitors, and remediates deficiencies — a loop, not a checklist. In an exam scenario you are often asked to spot where the system has failed (a rushed review, an unqualified reviewer, no monitoring) and link the weakness back to the relevant component.`,
      },
      {
        kind: "structure",
        heading: "ISQM 1, ISQM 2 and ISA 220",
        body: `ISQM 1 — the firm's system of quality management, built on eight components:
1. Governance and leadership — tone at the top, accountability for quality.
2. The firm's risk assessment process — set quality objectives, identify and assess quality risks, design responses.
3. Relevant ethical requirements — independence and the Code across the firm.
4. Acceptance and continuance of client relationships and engagements — take on only work the firm can do properly and ethically.
5. Engagement performance — direction, supervision, review; consultation; differences of opinion.
6. Resources — human, technological and intellectual resources.
7. Information and communication — the right information flows within the firm and to/from clients.
8. Monitoring and remediation process — ongoing monitoring, evaluation of findings, remediation of deficiencies.

ISQM 2 — engagement quality reviews (EQR):
Requires an EQR for listed/PIE audits and other engagements the firm judges high-risk.
The engagement quality reviewer must be objective and competent, and is appointed by the firm, not the engagement team.
Eligibility/cooling-off — an individual who was the engagement partner cannot act as the engagement quality reviewer until a cooling-off period of 2 years has passed.
The reviewer evaluates the significant judgements and conclusions; the opinion cannot be issued until the EQR is complete.

ISA 220 (Revised) — quality management at the engagement level:
The engagement partner takes overall responsibility for managing and achieving quality on the engagement, including direction, supervision and review, and sufficient involvement throughout.`,
      },
      {
        kind: "example",
        heading: "Worked example — where the system broke",
        body: `You are reviewing how Marlow & Co handled the audit of Otterby plc, a listed client whose opinion was later challenged. Four facts:

Fact 1: The engagement quality review was performed by the previous engagement partner, who had rotated off only last year. This breaches ISQM 2's cooling-off requirement — a former engagement partner cannot act as EQR until 2 years have passed. The reviewer was not sufficiently objective.

Fact 2: The EQR was completed two days AFTER the audit report was signed. This breaches ISQM 2 and ISA 220 — the report must not be dated until the engagement quality review is complete.

Fact 3: Otterby was accepted as a client despite the firm lacking staff with the relevant industry expertise. That is an acceptance-and-continuance and resources failure (ISQM 1 components 4 and 6) — the firm took on work it could not properly resource.

Fact 4: A monitoring inspection had flagged the same weak review process a year earlier, but nothing was changed. That is a monitoring-and-remediation failure (component 8) — deficiencies were identified but never remediated.

The value in the answer is mapping each failure to its component or standard, showing the breakdown was systemic, not a single slip.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Still calling it ISQC 1 — the firm-level standard is now ISQM 1 (quality management), and the shift from control to management is the point.

Muddling the three levels — ISQM 1 is firm-wide, ISQM 2 is the engagement quality review, ISA 220 is the engagement partner's responsibility on the individual audit.

Signing the report before the EQR is finished — the opinion cannot be dated until the engagement quality review is complete.

Letting the recently rotated engagement partner be the reviewer — ISQM 2 requires a 2-year cooling-off before a former engagement partner can act as EQR.

Treating monitoring as the end of the loop — identifying a deficiency is not enough; ISQM 1 requires remediation, and repeated unfixed findings are themselves a failure.`,
      },
    ],
  },

  /* ─────────────── D — Planning & conducting an engagement ─────────────── */
  {
    paper: "AAA",
    area: "D",
    title: "Planning & conducting an engagement",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Risk drives everything you do",
        body: `AAA planning is not about listing procedures — it is about proving you can spot where the financial statements are most likely to be wrong and then design a response that actually addresses that risk. The examiner hands you a scenario full of clues (a new acquisition, a tricky estimate, a loss-making segment) and rewards candidates who identify the specific risk of material misstatement and say what evidence would resolve it.

Certain areas recur because they are inherently hard to audit, and each has its own ISA. Group audits are complex because much of the evidence is generated by other (component) auditors the group auditor must direct and rely on. Accounting estimates — provisions, fair values, impairments — are risky because they depend on management assumptions that can be biased. Going concern is risky because it looks forward and, if wrong, invalidates the whole basis of the accounts. AAA loves these three because they demand judgement, not ticking.

The mindset to carry into the exam is: what could go wrong here, how material could it be, and what specific evidence closes the gap? A generic "obtain confirmations" scores little; "confirm the discount rate used in the impairment model against market data and challenge the cash-flow assumptions" scores well. Planning at this level is applied scepticism, targeted at the few areas that carry the audit.`,
      },
      {
        kind: "structure",
        heading: "The standards for the hard areas",
        body: `ISA 600 — audits of group financial statements (component auditors):
The group engagement team determines the scope, directs and reviews component auditors, and remains responsible for the group opinion.
Identify significant components (individually financially significant, or carrying significant risks) and scope the work accordingly.
Consolidation adjustments, intra-group eliminations and goodwill are focus areas.

ISA 540 — auditing accounting estimates and related disclosures:
Estimates carry estimation uncertainty and risk of management bias.
Test by (a) reviewing subsequent events, (b) testing how management made the estimate and challenging assumptions, or (c) developing an independent estimate.
Assess whether disclosures about estimation uncertainty are adequate.

ISA 570 — going concern:
Management assesses the entity's ability to continue for at least twelve months from the reporting date; the auditor evaluates that assessment.
Look for indicators (net liabilities, lost finance, key customer loss) and mitigating factors.
Where a material uncertainty exists but disclosure is adequate, the opinion is unmodified with a "Material Uncertainty Related to Going Concern" section; inadequate disclosure leads to a modification.

Supporting standards: ISA 315 (identifying and assessing risk), ISA 320 (materiality), ISA 330 (responses to assessed risks), and ISA 701 (determining key audit matters — the areas of most significance, reported for listed entities).`,
      },
      {
        kind: "example",
        heading: "Worked example — targeting the response",
        body: `You are planning the audit of Cedar Group. Three matters stand out.

Matter 1: Cedar acquired an overseas subsidiary this year, audited by a local firm. Under ISA 600 this is likely a significant component. Your response is not to re-audit it blindly but to evaluate the component auditor's competence and independence, communicate the group's requirements and materiality, and review their work on the significant risks — while remaining responsible for the group opinion.

Matter 2: Cedar carries a $9m provision for a legal claim, entirely dependent on management's estimate of the outcome. Under ISA 540 the risk is estimation uncertainty and management bias. Your response: obtain the lawyers' correspondence, review any post-year-end settlement (subsequent events), challenge the assumptions behind the amount, and assess whether the disclosure conveys the uncertainty.

Matter 3: The group breached a loan covenant after the year end and financing is being renegotiated. This is a going-concern indicator under ISA 570. Your response: obtain management's cash-flow forecast, test its assumptions, review the bank's correspondence, and — if a material uncertainty remains but is properly disclosed — plan for a Material Uncertainty Related to Going Concern section in an otherwise unmodified report.

Each response is tailored to the specific risk and its ISA — that specificity is what earns the marks.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Listing generic procedures — "obtain confirmations" scores little; the marks are in evidence specific to the identified risk and the relevant ISA.

Thinking the group auditor can rely blindly on component auditors — under ISA 600 the group team scopes, directs, reviews and remains responsible for the group opinion.

Auditing an estimate as if it were a fact — ISA 540 is about challenging assumptions and estimation uncertainty, not agreeing a number to a schedule.

Confusing going-concern outcomes — a properly disclosed material uncertainty gives an unmodified opinion with a dedicated section; only inadequate disclosure (or an inappropriate basis) forces a modification.

Treating going concern as a twelve-months-from-today test — the assessment period is at least twelve months from the reporting date.`,
      },
    ],
  },

  /* ─────────────── E — Completion, review & reporting ─────────────── */
  {
    paper: "AAA",
    area: "E",
    title: "Completion, review & reporting",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "The opinion is a decision, not a paragraph",
        body: `Everything the audit does converges on one output: the report. AAA tests whether you can turn a completion issue — a misstatement management won't fix, evidence you couldn't get — into the CORRECT opinion, and then say exactly how the report is worded. The single most examined skill is the ISA 705 modification decision, and it turns on just two questions.

Question one: what is the problem? Either the financial statements are materially MISSTATED (you have the evidence and they are wrong), or you are UNABLE to obtain sufficient appropriate evidence (a limitation of scope). These two problems lead to different opinions, so naming which one you face comes first.

Question two: how bad is it? Is the matter merely MATERIAL, or is it also PERVASIVE — meaning it is not confined to specific items but is fundamental to the statements as a whole, so users could be misled about the overall picture. Material-but-not-pervasive keeps most of the accounts trustworthy; pervasive does not.

Crossing those two axes gives you the four outcomes. Around that sit the report's other tools: emphasis-of-matter and other-matter paragraphs (which do NOT change the opinion), key audit matters for listed entities, and — importantly — the fact that not every assurance engagement even gives an audit-level opinion. Getting reporting right means getting the DECISION right, then the label.`,
      },
      {
        kind: "structure",
        heading: "The ISA 705 matrix and the reporting toolkit",
        body: `ISA 705 — modification matrix (the two-by-two you must know):
Material but NOT pervasive misstatement → Qualified opinion ("except for").
Material AND pervasive misstatement → Adverse opinion (the statements do not give a true and fair view).
Material but NOT pervasive inability to obtain evidence → Qualified opinion ("except for").
Material AND pervasive inability to obtain evidence → Disclaimer of opinion (we do not express an opinion).
An immaterial matter → no modification; the opinion stays unmodified (ISA 700).

ISA 706 — paragraphs that do NOT change the opinion:
Emphasis of Matter — draws attention to something correctly presented/disclosed in the statements (e.g. a significant uncertainty).
Other Matter — draws attention to something not in the statements but relevant to users' understanding.

ISA 701 — Key Audit Matters — the matters of most significance in the audit, communicated for listed entities; KAMs describe, they do not modify the opinion.

Assurance levels — not every engagement is an audit:
ISA (audit of historical financial statements) — reasonable (high, not absolute) assurance; positive opinion.
ISRE (review engagements, e.g. 2400/2410) — limited assurance; a negative-form conclusion ("nothing has come to our attention").
ISAE (assurance engagements other than audits/reviews of historical financial info, e.g. 3000, 3400 prospective) — reasonable OR limited assurance.
ISRS (related services, e.g. 4400 agreed-upon procedures, 4410 compilation) — NO assurance; only findings or compilation, no conclusion.`,
      },
      {
        kind: "example",
        heading: "Worked example — reading the matrix",
        body: `You are finalising three unrelated audits. Use the two ISA 705 questions each time: what is the problem, and is it material or pervasive?

Case 1: Larch Ltd has understated a warranty provision by an amount that is material but affects only that one balance; the rest of the accounts are reliable. Problem = misstatement; extent = material but not pervasive. Opinion = qualified ("except for").

Case 2: Birch Ltd refuses to consolidate a major subsidiary, so the group accounts omit a whole entity and are misleading as a whole. Problem = misstatement; extent = pervasive (fundamental to the statements). Opinion = adverse.

Case 3: Rowan Ltd suffered a fire that destroyed the inventory records, and you cannot verify a closing inventory figure so large it drives the whole result. Problem = inability to obtain evidence; extent = pervasive. Opinion = disclaimer.

Now vary Case 3: if only a small, isolated inventory line were unverifiable, the same "inability to obtain evidence" would be material but not pervasive, giving a qualified ("except for") opinion instead. Same problem type, different pervasiveness, different opinion — which is exactly what the matrix is for.

Finally, note what is NOT a modification: if Larch had disclosed a genuine going-concern uncertainty correctly, you would add a Material Uncertainty / Emphasis-of-Matter section and leave the opinion unmodified.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Jumping to "qualified" for everything — first decide the problem (misstatement vs inability to obtain evidence) AND whether it is pervasive; only material-but-not-pervasive gives a straight qualified opinion.

Confusing adverse with disclaimer — adverse is for a pervasive MISSTATEMENT (you know they're wrong); disclaimer is for a pervasive INABILITY to obtain evidence (you don't know).

Thinking an emphasis-of-matter or KAM changes the opinion — ISA 706 paragraphs and ISA 701 key audit matters never modify the opinion; they only draw attention.

Modifying for a properly disclosed going-concern uncertainty — adequate disclosure gives an unmodified opinion with a Material Uncertainty section, not a qualification.

Assuming every engagement gives reasonable assurance — reviews (ISRE) give limited assurance with a negative-form conclusion, and agreed-upon procedures/compilations (ISRS) give no assurance at all.`,
      },
    ],
  },
]
