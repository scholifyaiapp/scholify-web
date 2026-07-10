import type { TopicBrief } from "@/lib/acca-briefs"

/* Topic Briefs — AA (A-E) + FM (A-E), wave 6 (2026-07-10). */
export const AAFM_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── AA — Audit & Assurance ───────────────────────── */
  {
    paper: "AA",
    area: "A",
    title: "Audit framework & regulation",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why anyone pays for an opinion",
        body: `You met the agency problem in BT: shareholders own the company, directors run it, and the directors mark their own homework by preparing the financial statements. An external audit exists to break that circle. An independent expert examines the statements and reports to the SHAREHOLDERS — not to the directors — on whether the statements give a true and fair view. The value of the whole exercise rests on two things: the auditor's competence and the auditor's independence. Lose either and the opinion is worthless, which is why so much of this area is about ethics.

An audit is one type of assurance engagement, and every assurance engagement has the same five elements: a three-party relationship (practitioner, responsible party, intended users), a subject matter, suitable criteria to judge it against, sufficient appropriate evidence, and a written report. An audit gives REASONABLE assurance — a high but not absolute level — expressed positively ("in our opinion the statements give a true and fair view"). A review engagement gives only LIMITED assurance, expressed negatively ("nothing has come to our attention..."), because far less work is done.

The rulebook has layers. International Standards on Auditing (ISAs), issued by the IAASB, govern how the audit is done. The IESBA Code of Ethics (and in the UK the FRC Ethical Standard) governs the auditor's behaviour, using a conceptual framework: identify threats to the fundamental principles, evaluate them, and apply safeguards — or refuse the work. Corporate governance codes add the audit committee: non-executive directors who appoint and oversee the external auditor precisely so that management cannot lean on it.`,
      },
      {
        kind: "structure",
        heading: "Principles, threats and safeguards",
        body: `Five fundamental ethical principles: integrity, objectivity, professional competence and due care, confidentiality, professional behaviour.

Five threats, with classic triggers and safeguards:
Self-interest — fee dependence, gifts and hospitality, contingent fees. Safeguards: monitor fee ratios (listed clients: over 15% of firm income for two years triggers disclosure and an independent review), decline gifts unless trivial, never accept contingent audit fees.
Self-review — auditing numbers the firm produced: bookkeeping, FS preparation, valuations, internal audit. Safeguards: separate teams; for listed clients most such services are prohibited.
Advocacy — promoting the client's position: selling its shares, representing it in a dispute. Safeguard: do not act.
Familiarity — long association (listed: engagement partner rotates after seven years), family ties, staff joining the client. Safeguards: rotation, remove the individual, independence review.
Intimidation — threats of removal, litigation, a dominant personality. Safeguards: escalate to those charged with governance; resign if unresolved.

Assurance levels: audit = reasonable assurance, positive opinion; review = limited assurance, negative conclusion. Absolute assurance is never given — sampling, judgement, estimates and the possibility of fraud make it impossible.

Governance anchor: the audit committee (independent NEDs, at least one with recent financial experience) recommends appointment, approves fees, reviews independence and non-audit services, and receives the auditor's reports.`,
      },
      {
        kind: "example",
        heading: "Mini-case — four threats at Hollis Co",
        body: `Fern & Co is the external auditor of Hollis Co, a listed retailer. During planning you learn four facts. For each: name the threat, then the response.

Fact 1: fees from Hollis (audit plus tax work) were 16% of Fern & Co's total fee income last year and are forecast at 18% this year. Threat: self-interest — the firm cannot afford to lose the client, so it may shrink from difficult judgements. Response: for a listed client the 15% threshold has now been breached in a second consecutive year, so this must be disclosed to those charged with governance and an independent pre-issuance or post-issuance review arranged; the firm should plan to reduce dependence or resign.

Fact 2: Hollis's new finance director was, until ten months ago, the audit engagement manager at Fern & Co. Threat: familiarity (and self-review, since she prepared prior-year working papers) — the team may trust her figures without challenge, and she knows the audit approach. Response: change the composition of the audit team, do not allow work she performed to be relied on without re-examination, and consider whether the firm's independence is compromised for a listed entity.

Fact 3: the FD has offered the audit team a hospitality weekend at the company's lakeside lodge after the audit. Threat: self-interest and familiarity through hospitality. Response: unless trivial and inconsequential — a weekend away is neither — decline politely and record the offer.

Fact 4: Hollis asks Fern & Co to also prepare the year-end financial statements. Threat: self-review — the firm would audit its own output. Response: for a listed client this is prohibited; decline the work.

The exam pattern never varies: name the threat precisely, explain WHY it arises from the scenario fact, then give a specific safeguard — not "be careful".`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Saying the auditor reports to management or the directors — the opinion is addressed to the shareholders; management merely receives by-product reports on control deficiencies.

Claiming an audit guarantees the financial statements are correct or that fraud is absent — assurance is reasonable, never absolute, because of sampling, estimates and concealment.

Confusing self-review with self-interest — self-review is auditing your own work; self-interest is having something to gain or lose. A former team member at the client is familiarity, not advocacy.

Offering "safeguards" that are really nothing — "the auditor should be objective" answers no marks. Safeguards must be actions: rotate the partner, separate teams, independent review, decline the work.

Mixing up assurance levels — an audit concludes positively on reasonable assurance; a review concludes negatively on limited assurance.`,
      },
    ],
  },
  {
    paper: "AA",
    area: "B",
    title: "Planning & risk assessment",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Risk decides where the work goes",
        body: `An audit is not an even sweep across every balance. Time is finite, so the auditor plans: understand the entity and its environment, work out where the financial statements are most likely to be materially wrong, and point the audit effort there. That is risk-based auditing, and it is the single most examined skill in AA — given a scenario, derive the audit risks and the auditor's responses.

The organising equation is the audit risk model. Audit risk is the risk that the auditor gives the WRONG OPINION — signs off statements that are materially misstated. It has three components. Inherent risk: the susceptibility of an assertion to misstatement before considering controls (complex estimates, new systems, pressure on management). Control risk: the risk the client's own controls fail to prevent or detect the misstatement. Detection risk: the risk the auditor's procedures fail to find it. The first two belong to the client and together form the risk of material misstatement; the auditor controls only detection risk. When inherent and control risk are high, the auditor must push detection risk down — more testing, better people, more scepticism.

Materiality is the yardstick for "matters". A misstatement is material if it could reasonably influence users' decisions, judged by size against benchmarks and by nature. Performance materiality is set lower than overall materiality to leave headroom for undetected errors. And running through all of planning is professional scepticism — a questioning mind — sharpened wherever fraud incentives appear: bonus targets, loan covenants, a planned sale of the business.`,
      },
      {
        kind: "structure",
        heading: "The risk model and the response vocabulary",
        body: `Audit risk model:
Audit risk = inherent risk × control risk × detection risk.
Risk of material misstatement (ROMM) = inherent risk × control risk — the client's side.
Detection risk = sampling risk + non-sampling risk — the auditor's side, and the only lever the auditor holds. Higher ROMM forces lower detection risk, which means MORE audit work.

Materiality benchmarks (guides, not rules):
5% of profit before tax; 1% of revenue; 1-2% of total assets. Choose the benchmark that matters to users; set performance materiality below overall materiality; revisit as the audit progresses.

Risk assessment procedures: enquiries of management, analytical procedures (compare ratios and trends to expectations), observation and inspection. Analytical procedures are MANDATORY at planning and at final review.

The response vocabulary — responses are things the AUDITOR does:
Extend substantive testing on the risky area; assign more experienced staff; increase supervision and review; build in unpredictability; involve experts (valuers, actuaries); test controls before relying on them; extend work on estimates and judgements; keep professional scepticism explicit.

Fraud triangle for spotting incentive: pressure (targets, covenants), opportunity (weak controls, dominance), rationalisation.`,
      },
      {
        kind: "example",
        heading: "Mini-case — three risks and responses at Peony Co",
        body: `Peony Co is a retailer with a 30 June year end. Planning reveals three facts. Derive the audit risk and the auditor's response for each.

Fact 1: a new inventory system went live in March and opening data was migrated from the old system. Risk: this is an inherent and control risk over inventory — migration errors or teething faults mean inventory quantities and cost records may be misstated, affecting existence, completeness and accuracy of inventory and cost of sales. Response: document and test the controls over the migration, reconcile closing balances on the old system to opening balances on the new one, and extend substantive testing of inventory quantities and valuation at the year end, including attendance at the count.

Fact 2: directors receive a bonus of 5% of profit before tax. Risk: management has an incentive to overstate profit — inflating revenue (cut-off, fictitious sales) or understating expenses and provisions. This raises inherent risk at the financial-statement level and demands heightened scepticism over judgemental areas. Response: extend cut-off testing around the year end, review estimates and provisions for management bias, test journal entries — especially those posted late or by senior staff — and keep the engagement team alert to override of controls.

Fact 3: a customer is suing Peony for $1m; lawyers say the outcome is possible but not probable. Risk: under IAS 37 a possible obligation is a contingent liability requiring disclosure, not a provision — the risk is that the disclosure is omitted, or conversely that a provision is wrongly recognised or measured. Response: obtain the lawyers' written confirmation of the claim's status and likely outcome, review correspondence and board minutes, and check the disclosure drafted in the financial statements against IAS 37.

Notice the discipline: every risk is expressed as an effect on the FINANCIAL STATEMENTS (which balance, which assertion, over- or under-stated), and every response is something the auditor does — never advice to the client.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Writing business risk instead of audit risk — "the company may lose customers" scores nothing until you say which balance could be misstated and how.

Giving responses that manage the client's problem — "recommend better controls" is consultancy. Audit responses are extend testing, experienced staff, scepticism, experts, unpredictability.

Raising materiality for a risky client — it is the reverse: higher risk drives materiality and performance materiality DOWN and audit work UP.

Saying the auditor can reduce inherent or control risk — those belong to the client. The auditor can only assess them and respond by lowering detection risk.

Vague responses — "do more work on inventory" earns little. Say WHAT work: attend the count, test cut-off with GDNs either side of the year end, reconcile the migrated balances.`,
      },
    ],
  },
  {
    paper: "AA",
    area: "C",
    title: "Internal control",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why the auditor studies the client's plumbing",
        body: `Millions of transactions flow through a client's systems every year; the auditor cannot re-perform them all. If the client's own internal controls are strong, the auditor can TEST THE CONTROLS and, if they work, rely on them — reducing the detailed substantive testing needed. If controls are weak, the auditor bypasses them and does everything substantively. Either way, understanding the system is compulsory: ISA 315 requires it as part of assessing risk.

Internal control has five components: the control environment (the tone at the top), the entity's risk assessment process, the information system, control activities (the specific checks), and monitoring. Control activities are where marks live, because they are what you can actually test.

The auditor's routine follows a fixed path: understand and DOCUMENT the system, confirm the documentation with a walkthrough of one transaction end to end, then — if planning to rely — test the controls over the period. This is where students blur a crucial line: a TEST OF CONTROLS checks whether a control operated (inspect the invoice for the authorisation signature); a SUBSTANTIVE PROCEDURE checks whether a number is right (recalculate the invoice). Same document, different question.

Significant deficiencies found along the way are reported to management and those charged with governance in a three-part format: deficiency, consequence, recommendation. And controls never make audit risk zero — collusion, management override, human error and cost are inherent limitations of any system.`,
      },
      {
        kind: "structure",
        heading: "Components, control types and the reliance cycle",
        body: `Five components of internal control (ISA 315):
1 Control environment — governance, integrity, competence, structure.
2 Risk assessment process — how the entity spots and handles its own risks.
3 Information system and communication — how transactions are captured and recorded.
4 Control activities — the specific policies and procedures.
5 Monitoring — internal audit, management review of whether controls still work.

Types of control activity: authorisation, performance reviews (budget vs actual), information-processing controls (edit checks, batch totals), physical controls (locks, counts, passwords), segregation of duties (separate authorisation, custody, recording).

Documentation tools: narrative notes (simple, flexible, unwieldy for complex systems); flowcharts (clear picture, slow to draw); ICQ — asks does a control exist? (client can overstate); ICEQ — asks how could errors occur? (targets what can go wrong).

The reliance cycle: understand → document → walkthrough (one item end to end) → assess design → tests of controls over the period → conclude: rely and reduce substantive work, or abandon reliance and go fully substantive.

Tests of controls vs substantive procedures: ToC asks did the control operate? (inspect for evidence of authorisation, reperform a reconciliation, observe the count procedures, use test data). Substantive asks is the figure right? (recalculate, trace to invoice, confirm with third party).

Deficiency reporting format: deficiency → implication (what could go wrong, quantified where possible) → recommendation (who does what, when).`,
      },
      {
        kind: "example",
        heading: "Mini-case — three deficiencies in Bramble Co's sales cycle",
        body: `Bramble Co sells building materials on credit. Your walkthrough of the sales system finds three facts. For each: deficiency, implication, recommendation, and a test of control on the fix.

Fact 1: warehouse staff despatch goods on any order received, without reference to the customer's credit limit. Deficiency: no credit check before despatch. Implication: goods go to customers who cannot pay, inflating receivables that end up irrecoverable — a valuation problem in the statements and a cash-flow problem for the business. Recommendation: the system should block despatch on orders breaching the credit limit, with override only by the credit controller, evidenced by signature or system log. Test of control: process a test order breaching the limit and confirm the system rejects it; inspect despatched orders for evidence of the check or authorised override.

Fact 2: the same accounts clerk raises sales invoices and posts cash receipts to the receivables ledger. Deficiency: no segregation of duties between recording sales and recording receipts. Implication: the clerk could misappropriate customer payments and hide the theft by adjusting the ledger (teeming and lading), and errors would go undetected. Recommendation: separate the roles; an independent person should reconcile the receivables control account monthly, reviewed by the financial controller. Test of control: inspect the monthly reconciliations for evidence of preparation and independent review, and reperform one.

Fact 3: goods despatched notes (GDNs) are not sequentially numbered. Deficiency: no sequence to check, so despatches can go uninvoiced unnoticed. Implication: revenue and receivables may be incomplete — goods leave, no invoice is raised, and the loss is invisible. Recommendation: use sequentially pre-numbered GDNs; a supervisor runs a regular sequence check matching every GDN to a sales invoice. Test of control: inspect the sequence-check records, then trace a sample of GDNs to matching invoices.

Pattern to copy: implication = what goes WRONG; recommendation = WHO does WHAT — never the deficiency reversed.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Writing a substantive procedure when a test of controls is asked — "recalculate the invoice" tests the number; the control test is "inspect the invoice for evidence of the authorisation".

Recommendations that just invert the deficiency — "credit limits should be checked" repeats the problem. Say who checks, how, and what evidence is left behind.

Confusing ICQs and ICEQs — an ICQ asks whether a control exists; an ICEQ asks how a fraud or error could occur. ICQs risk clients answering yes to everything.

Believing strong controls remove the need for substantive work — some substantive procedures are always required; controls have inherent limitations.

Reporting control deficiencies to shareholders in the auditor's report — they go to management and those charged with governance in a separate communication.`,
      },
    ],
  },
  {
    paper: "AA",
    area: "D",
    title: "Audit evidence",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Sufficient appropriate evidence, assertion by assertion",
        body: `Everything the auditor concludes must rest on evidence, and ISA 500 gives the standard two words: SUFFICIENT (enough of it — quantity) and APPROPRIATE (relevant and reliable — quality). The two trade off: better evidence means you need less of it, but a mountain of poor evidence never becomes good.

The unit of audit thinking is the ASSERTION. When management presents "Receivables $2.4m", it implicitly claims several things: the customers exist, the company owns the debts, the amount is right and collectable, nothing is missing. Each claim is an assertion, and each needs its own kind of evidence. This is why "check receivables" is meaningless in the exam — a receivables circularisation is superb evidence of existence but says almost nothing about valuation, because a customer will happily confirm a debt it never intends to pay.

The auditor's toolkit is a fixed set of procedure types: inspection of records or assets, observation of processes, external confirmation, recalculation, reperformance, analytical procedures, and enquiry. Enquiry alone is never enough; it must be corroborated. Reliability follows a hierarchy you should be able to recite: evidence the auditor generates directly beats evidence from independent third parties, which beats client-produced evidence — and client evidence is worth more when the related controls are strong. Written beats oral; originals beat copies.

Because testing everything is impossible, the auditor samples — sampling risk is part of detection risk. Experts and internal audit can help with specialist balances, but responsibility for the opinion is never shared or reduced.`,
      },
      {
        kind: "structure",
        heading: "Assertions, procedures and the reliability hierarchy",
        body: `Assertions about transactions (income statement): occurrence — it happened and pertains to the entity; completeness — nothing left out; accuracy — right amount; cut-off — right period; classification — right account; presentation — properly described.

Assertions about balances (statement of financial position): existence — the asset or liability is real; rights and obligations — the entity owns or owes it; completeness; accuracy, valuation and allocation — appropriate carrying amount; classification; presentation.

Direction of testing — the most examined mechanic:
For OCCURRENCE or EXISTENCE, start from the ledger and vouch BACK to source documents (does this recorded sale have a GDN and order behind it?).
For COMPLETENESS, start from source documents and trace FORWARD to the ledger (did every GDN become an invoice in the ledger?).

Procedure types: inspection, observation, external confirmation, recalculation, reperformance, analytical procedures, enquiry (always corroborate).

Reliability hierarchy, strongest first:
1 Auditor-generated evidence (recalculation, physical inspection, reperformance).
2 External evidence sent directly to the auditor (bank confirmation, receivables circularisation).
3 External evidence held by the client (supplier invoices, statements).
4 Client-generated evidence — stronger where controls are effective (aged listings, reconciliations).
5 Oral representations — weakest; obtain in writing where relied on.

Set-pieces: inventory — attend the count (existence), test NRV (valuation), GRN/GDN cut-off. Receivables — circularise (existence), after-date cash (valuation). Bank — confirmation direct from the bank.`,
      },
      {
        kind: "example",
        heading: "Mini-case — reading a receivables circularisation at Cedar Co",
        body: `Cedar Co has receivables of $1.8m at 31 December; materiality is $90,000. Three circularisation replies need interpretation: what does each show, and what next?

Reply 1: Alder Ltd, listed at $120,000, replies "we agree only $95,000 — the $25,000 invoice dated 30 December relates to goods we received on 4 January." What it tells you: this is a cut-off issue on the assertions occurrence and cut-off — Cedar may have invoiced before despatch to inflate the year's revenue. Next step: inspect the GDN for the disputed invoice; if the goods left after the year end, the sale belongs to January, so revenue and receivables are overstated by $25,000. Project the error across the population — if the practice is systematic, the total misstatement could exceed materiality.

Reply 2: Birch Ltd, listed at $60,000, does not reply at all. What it tells you: nothing yet — a non-reply is not evidence of anything, and it is never acceptable to assume the balance is fine. Next step: perform alternative procedures — trace after-date cash received from Birch in January (the strongest evidence: the debt existed and has been paid), and vouch unpaid items to invoices and signed GDNs.

Reply 3: Rowan Ltd agrees its balance of $75,000 in full, but the aged listing shows it is more than 120 days overdue and correspondence mentions Rowan's cash difficulties. What it tells you: the confirmation proves EXISTENCE, but existence was never the worry — the risk is VALUATION. A customer confirming a debt says nothing about ability to pay. Next step: review after-date cash (nothing received), inspect correspondence, discuss with the credit controller, and assess whether an allowance is needed for some or all of the $75,000.

The lesson underneath all three: match the evidence to the assertion at risk. A circularisation answers existence; cut-off needs GDNs; valuation needs cash.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Writing "check" as a procedure — every procedure needs a verb (inspect, recalculate, trace, confirm), a source, and a purpose tied to an assertion.

Testing in the wrong direction — tracing from the ledger to GDNs can never test completeness; you must start from the population that is complete (the GDNs) and trace into the records.

Treating a receivables confirmation as evidence of valuation — it proves existence and rights; collectability needs after-date cash and the aged analysis.

Confusing sufficiency with appropriateness — sufficiency is quantity, appropriateness is quality. More weak evidence does not become strong.

Relying on enquiry alone — management told us is the weakest evidence and must be corroborated, or obtained as written representations where nothing better exists.`,
      },
    ],
  },
  {
    paper: "AA",
    area: "E",
    title: "Review & reporting",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "The end game: from evidence to opinion",
        body: `The final phase of the audit turns a year's evidence into one paragraph: the opinion. Before signing, the auditor completes a set of closing routines. Subsequent events are reviewed: between the year end and the date of the auditor's report the auditor has an ACTIVE duty to look for events — adjusting ones (conditions that existed at the year end, like a customer going bust after date) change the numbers; non-adjusting ones (new conditions, like a post-year-end fire) need only disclosure if material. After the report is signed the duty becomes passive: react if something comes to light, but no obligation to go hunting.

Going concern gets its own review: management assesses at least twelve months from approval, and the auditor evaluates that assessment. The outcomes form a ladder: no significant doubt — unmodified; a material uncertainty ADEQUATELY DISCLOSED — unmodified opinion plus a Material Uncertainty Related to Going Concern section; disclosure inadequate — modified for misstatement; wrong basis of preparation altogether — adverse.

Then the auditor obtains written representations, weighs uncorrected misstatements against materiality, and chooses the opinion. The choice runs on two axes: WHAT is wrong (a misstatement, or an inability to obtain evidence) and HOW BAD it is (material but confined, or pervasive). That two-by-two grid is the opinion matrix, and it decides every reporting question in the exam. Around the opinion sit Key Audit Matters for listed entities (information, not modification) and Emphasis of Matter paragraphs pointing to disclosures already made.`,
      },
      {
        kind: "structure",
        heading: "The opinion matrix and the report's paragraphs",
        body: `The opinion matrix — learn it as a table:

Nature of issue | Material but NOT pervasive | Material AND pervasive
Financial statements are MISSTATED | Qualified opinion ("except for") | Adverse opinion
UNABLE to obtain sufficient appropriate evidence | Qualified opinion ("except for") | Disclaimer of opinion

Pervasive means: not confined to specific elements, or a substantial proportion of the statements, or fundamental to users' understanding.

Other report elements — none of these modify the opinion:
Key Audit Matters (KAM) — listed entities only; matters of most significance communicated to TCWG; describes the issue and how the audit addressed it.
Emphasis of Matter (EoM) — draws attention to a matter appropriately DISCLOSED in the statements that is fundamental to understanding (e.g. a major catastrophe disclosed after date). Never a substitute for modifying.
Other Matter — something not in the statements relevant to the audit or report.
Material Uncertainty Related to Going Concern (MURGC) — separate mandatory section where a material GC uncertainty is adequately disclosed; opinion remains unmodified.

Subsequent events (IAS 10 / ISA 560):
Adjusting — condition existed at the reporting date: adjust the numbers (post-date customer insolvency, court case settled, fraud discovered).
Non-adjusting — new condition after the date: disclose if material (fire, acquisition, share issue).
Auditor's duty: active procedures up to the report date; passive afterwards.

Going concern indicators: net liabilities, expiring facilities, loss of a key customer, suppliers demanding cash on delivery.`,
      },
      {
        kind: "example",
        heading: "Mini-case — applying the matrix three times",
        body: `You are finalising three audits; overall materiality in each is $500,000. Walk the matrix each time: misstatement or lack of evidence? Material? Pervasive? Then name the opinion.

Case 1: Maple Co holds inventory at $2.9m; NRV testing shows a line of obsolete stock should be written down by $800,000. The directors refuse to adjust. Step 1: the numbers are wrong — this is a MISSTATEMENT. Step 2: $800,000 exceeds materiality of $500,000 — material. Step 3: the problem is confined to inventory and cost of sales; the rest of the statements are fine — not pervasive. Conclusion: qualified opinion, "except for", with a Basis for Qualified Opinion paragraph quantifying the effect.

Case 2: a flood destroyed Sycamore Co's receivables records early in the year. Receivables of $12m make up 60% of total assets, and no alternative evidence (confirmations, after-date cash for the period) can reconstruct them. Step 1: nothing is proven wrong — the auditor is UNABLE TO OBTAIN EVIDENCE. Step 2: clearly material. Step 3: 60% of total assets means possible undetected misstatement is not confined — it is pervasive. Conclusion: disclaimer of opinion — the auditor does not express an opinion at all.

Case 3: Willow Co's bank facility expires three months after the year end and renewal is under negotiation — a material going concern uncertainty. The directors use the going concern basis and disclose the uncertainty fully. Step 1: is anything misstated? No — the basis is appropriate and the disclosure adequate. Conclusion: UNMODIFIED opinion, plus a Material Uncertainty Related to Going Concern section referring to the note. Had the disclosure been missing, the matrix reactivates: misstatement, material, likely pervasive — qualified or adverse.

Method to keep: two questions in order — misstatement or scope limitation? material or pervasive? The answer falls out of the grid.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Using an Emphasis of Matter to patch a misstatement — EoM only points to matters already properly disclosed; if the statements are wrong, the opinion must be modified.

Swapping adverse and disclaimer — adverse means you KNOW the statements are pervasively wrong; disclaimer means you CANNOT KNOW because evidence is unavailable.

Modifying the opinion for an adequately disclosed going concern uncertainty — the opinion stays unmodified; the report gains a MURGC section instead.

Treating KAM as a modified opinion — KAM is required for listed entities in every audit, clean or not; it informs, it does not qualify.

Adjusting for non-adjusting events — a fire in January does not change December's numbers; it is disclosed if material.`,
      },
    ],
  },

  /* ───────────────────────── FM — Financial Management ───────────────────────── */
  {
    paper: "FM",
    area: "A",
    title: "Financial management function",
    minutes: 5,
    sections: [
      {
        kind: "concept",
        heading: "Three decisions, one objective",
        body: `Financial management is the job of answering three linked questions. The investment decision: which projects and assets should the company put money into? The financing decision: where should that money come from — debt, equity, retained earnings — and in what mix? The dividend decision: of the profits earned, how much goes back to shareholders and how much is retained to fund growth? Every later area of FM is one of these three decisions in detail.

The objective that ties them together, for a listed company, is the maximisation of SHAREHOLDER WEALTH — usually operationalised as maximising the market value of the shares. Not profit: profit is a single-year accounting figure that ignores risk, ignores the timing of cash flows, and can be massaged by accounting choices. Wealth is measured by what shareholders actually receive — dividends plus capital growth.

The agency problem from your earlier studies reappears with money attached: managers may prefer size, perks and safety over shareholder value. FM's answer is goal congruence through incentives — remuneration tied to total shareholder return, EPS growth targets, and executive share options — plus the discipline of governance and the threat of takeover. Other stakeholders (employees, customers, government, lenders) impose real constraints, and not-for-profit organisations replace the wealth objective with VALUE FOR MONEY, assessed through the three Es: economy (buy inputs cheaply), efficiency (maximise output per input), effectiveness (achieve the objectives). Because a not-for-profit has no share price, performance must be judged on the three Es and output measures instead.`,
      },
      {
        kind: "structure",
        heading: "The measurement kit",
        body: `The three decisions: investment, financing, dividend — connected because financing cost sets the hurdle for investment, and dividends compete with retention for funds.

Objective: maximise shareholder wealth (market value of equity), NOT accounting profit.

Measures of achievement:
EPS = profit attributable to ordinary shareholders ÷ number of ordinary shares.
Total shareholder return (TSR) = (P1 − P0 + dividend per share) ÷ P0 — capital gain plus dividend, as a percentage of the opening price.
Dividend yield = dividend per share ÷ share price.
Dividend payout ratio = dividends ÷ earnings; retention ratio b = 1 − payout.
Gordon growth link (used later in the DVM): g = b × re, where re is the return on reinvested funds.
ROCE = operating profit ÷ capital employed — accounting-based, so use with care.

Why profit maximisation fails as an objective: ignores risk; ignores timing (a dollar next year is worth less); short-termist (cut R&D, profit rises today, value falls); manipulable by accounting policy.

Agency and goal congruence: align managers with shareholders via performance-related pay tied to TSR or EPS growth, share option schemes, and monitoring (governance, audit).

Not-for-profit: objective = value for money; the three Es — economy, efficiency, effectiveness. No share price, so performance is judged on cost per unit of output and achievement of stated objectives.`,
      },
      {
        kind: "example",
        heading: "Worked example — did management create wealth?",
        body: `Linden Co's shareholders require a return of 10% a year. At the start of the year the share price was $4.00; at the end it was $4.32. During the year Linden paid a dividend of 20 cents per share. Earnings for the year were $1.5m and there are 5m shares in issue.

Step 1 — total shareholder return:
Capital gain = 4.32 − 4.00 = $0.32 per share.
TSR = (0.32 + 0.20) ÷ 4.00 = 0.52 ÷ 4.00 = 13%.

Step 2 — judge against the required return:
Shareholders required 10% and received 13% — management delivered 3 percentage points above the cost of equity, so shareholder wealth was created this year. On a $4.00 share, the excess is 3% × 4.00 = 12 cents of value beyond expectations.

Step 3 — earnings-based view:
EPS = 1,500,000 ÷ 5,000,000 = 30 cents.
Dividend payout = 20 ÷ 30 = 66.7%, so the retention ratio b = 33.3%.

Step 4 — what retention implies for growth:
If Linden reinvests retained earnings at a return of 15%, the Gordon model estimates dividend growth of g = b × re = 0.333 × 15% = 5% a year. That 5% is exactly the growth figure you will feed into the dividend valuation model in later areas — area A's ratios are the raw material for area D's cost of equity.

Note the contrast built into the example: EPS of 30 cents tells you what the accounts say; TSR of 13% tells you what shareholders actually got. If next year EPS rises to 33 cents but the share price falls to $3.60, profit went up while wealth went down — and the objective of the company is wealth.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Stating the objective as profit maximisation — the FM objective is shareholder wealth; profit ignores risk, timing and is open to manipulation.

Computing TSR without the dividend — the return is capital gain PLUS dividend, all divided by the OPENING price, not the closing one.

Applying shareholder-wealth measures to a not-for-profit — with no share price the framework is value for money: economy, efficiency, effectiveness.

Muddling the three Es — economy is about the cost of inputs, efficiency is the input-to-output ratio, effectiveness is whether objectives were met. Cheap inputs used wastefully are economical but not efficient.

Assuming share option schemes perfectly align managers with shareholders — they can encourage short-term price manipulation and reward general market rises rather than management performance.`,
      },
    ],
  },
  {
    paper: "FM",
    area: "B",
    title: "Investment appraisal",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "NPV is the referee",
        body: `From MA you know the time value of money: a dollar today beats a dollar next year. Investment appraisal turns that into a decision rule. Discount each future cash flow at the company's cost of capital, add them up, subtract the outlay: the net present value. A positive NPV means the project earns more than the finance costs, so it ADDS that amount to shareholder wealth. NPV is the theoretically superior technique — it uses cash flows (not manipulable profits), all of them, and it prices time and risk through the discount rate. IRR — the rate at which NPV is zero — usually agrees, but can mislead with non-conventional cash flows or when ranking mutually exclusive projects. Payback and ARR survive as sanity checks, nothing more.

The craft is in building the cash flows. Only RELEVANT flows count: future, incremental cash flows caused by the decision. Sunk costs are out; committed costs are out; depreciation is out because no cash moves; interest is out because the discount rate already charges for finance. Opportunity costs are in.

Two real-world layers then get added. TAX: operating flows are taxed, but tax-allowable depreciation shelters some profit, producing a cash SAVING each year. INFLATION: the golden rule is consistency — discount nominal (money) cash flows at the nominal rate, or real flows at the real rate, with the Fisher equation linking the two. When different items inflate at different rates you have no choice: inflate each flow separately and use the nominal rate.`,
      },
      {
        kind: "structure",
        heading: "The formula kit",
        body: `NPV = sum of (cash flow in year t × discount factor at r) − outlay. Accept if positive.
Discount factor = 1 ÷ (1 + r) to the power t. Annuity factor, years 1 to n = (1 − (1 + r) to the power −n) ÷ r. Perpetuity = 1 ÷ r.

Fisher: (1 + m) = (1 + r) × (1 + h), where m = money rate, r = real rate, h = general inflation.
Consistency rule: nominal flows at the nominal rate OR real flows at the real rate — never mix. Different inflation rates per item force the nominal route.

Tax: operating flows × tax rate (check timing: same year or one year in arrears). Tax-allowable depreciation is NOT a cash flow, but TAD × tax rate is a cash SAVING; a balancing allowance or charge arises on disposal.

IRR by interpolation: IRR ≈ a + [NPVa ÷ (NPVa − NPVb)] × (b − a). Accept if IRR exceeds the cost of capital.

Equivalent annual cost (unequal replacement lives): EAC = PV of costs over one cycle ÷ annuity factor for the cycle. Choose the LOWEST EAC.

Payback = time to recover the outlay (discounted payback uses discounted flows).
ROCE / ARR = average annual accounting profit ÷ initial (or average) investment — the only technique using profit, not cash.`,
      },
      {
        kind: "example",
        heading: "Worked example — NPV with inflation and tax",
        body: `Aspen Co is appraising a machine costing $150,000 with a four-year life and no scrap value. It will earn contribution of $60,000 a year in CURRENT (time 0) prices, inflating at 5% a year. Tax is 30%, payable in the same year; tax-allowable depreciation is straight line at 25% of cost. The money cost of capital is 15.5%; general inflation is 5%.

Step 0 — Fisher check: real rate = 1.155 ÷ 1.05 − 1 = 10%. We work in nominal terms: 15.5% and inflated flows.

Step 1 — nominal contribution (first receipt is one year away, so inflate once for year 1):
Year 1: 60,000 × 1.05 = 63,000. Year 2: 60,000 × 1.05 squared = 66,150. Year 3: 69,458. Year 4: 72,930.

Step 2 — tax at 30% and TAD savings:
After-tax contribution = contribution × 0.70: year 1: 44,100; year 2: 46,305; year 3: 48,621; year 4: 51,051.
TAD = 25% × 150,000 = 37,500 a year; tax saved = 37,500 × 30% = 11,250 each year.

Step 3 — net nominal cash flows:
Year 1: 44,100 + 11,250 = 55,350. Year 2: 57,555. Year 3: 59,871. Year 4: 62,301.

Step 4 — discount at 15.5% (factors: 0.866, 0.750, 0.649, 0.562):
Year 1: 55,350 × 0.866 = 47,922. Year 2: 57,555 × 0.750 = 43,143. Year 3: 59,871 × 0.649 = 38,856. Year 4: 62,301 × 0.562 = 35,007.

Step 5 — NPV:
Total PV = 47,922 + 43,143 + 38,856 + 35,007 = 164,928.
NPV = 164,928 − 150,000 = +14,928, say +$14,900.

Positive NPV: accept — the project adds about $14,900 to wealth. Notice what never appeared: depreciation itself, and interest.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Mixing real and nominal — discounting inflated (nominal) flows at the real rate, or uninflated flows at the money rate. Fisher exists precisely so you stay consistent.

Deducting depreciation as a cash flow — TAD is not cash; only the tax saving (TAD × tax rate) enters the appraisal, plus any balancing allowance or charge on disposal.

Including interest payments in the cash flows — finance costs live in the discount rate; counting them again double-charges the project.

Treating sunk costs as relevant — money already spent is gone whichever way you decide; but do include opportunity costs.

Misreading tax timing — same year versus one year in arrears shifts every tax flow one column; check the wording before building the table.

Ranking mutually exclusive projects by IRR — it can prefer a small high-percentage project over a large wealth-creating one; NPV is the referee when they disagree.`,
      },
    ],
  },
  {
    paper: "FM",
    area: "C",
    title: "Working capital management",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "The cash tied up in just running the business",
        body: `Working capital is the money locked in inventory and receivables, less what suppliers lend you through payables. Managing it is a tug-of-war between liquidity and profitability: generous inventory and credit win sales but starve you of cash; running tight risks stockouts and lost customers. Policy has a vocabulary — an AGGRESSIVE policy runs low working capital financed short-term (cheap, risky); a CONSERVATIVE policy holds buffers financed long-term (safe, expensive).

The clock that measures it all is the cash operating cycle: how long a dollar is trapped between paying suppliers and collecting from customers — inventory days plus receivables days minus payables days. A lengthening cycle means growing sums tied up; the classic disease is OVERTRADING — a profitable, fast-growing business expanding sales faster than its capital base, funding growth on payables and overdraft until liquidity snaps. The mirror image, over-capitalisation, is too much working capital earning nothing.

Each component has its own model. Inventory: the EOQ balances ordering costs against holding costs. Cash: Baumol treats cash like inventory; Miller-Orr accepts that cash flows are random and sets control limits instead. Receivables: credit policy, early settlement discounts (evaluate the annualised cost against overdraft rates), factoring. Payables: free finance up to a point — stretch too far and you lose discounts and supplier goodwill.`,
      },
      {
        kind: "structure",
        heading: "The formula kit",
        body: `Cash operating cycle = inventory days + receivables days − payables days.
Inventory days = inventory ÷ cost of sales × 365; receivables days = receivables ÷ credit sales × 365; payables days = payables ÷ credit purchases × 365.

EOQ = square root of (2 × Co × D ÷ Ch), where Co = cost per order, D = annual demand, Ch = holding cost per unit per year.
Annual ordering cost = (D ÷ Q) × Co. Annual holding cost = (Q ÷ 2) × Ch. At the EOQ the two are equal. With bulk discounts: compare total cost (purchases + ordering + holding) at the EOQ against each discount-trigger quantity.

Baumol model (cash as inventory): optimal cash transfer = square root of (2 × annual cash need × cost per transfer ÷ interest rate differential).

Miller-Orr model (random cash flows):
Spread = 3 × [ (3/4 × transaction cost × variance of daily cash flows) ÷ daily interest rate ] to the power 1/3.
Upper limit = lower limit + spread. Return point = lower limit + spread ÷ 3. Hitting the upper limit: buy securities down to the return point; hitting the lower: sell up to it.

Early settlement discount, annualised cost of NOT taking it (compound form):
[1 ÷ (1 − d)] to the power (365 ÷ t) − 1, where d = discount rate and t = days of extra credit taken by declining. Compare with the overdraft rate.

Factoring evaluation: compare fee + interest on advance against savings (admin costs, bad debts, finance cost of lower receivables).`,
      },
      {
        kind: "example",
        heading: "Worked example — EOQ, then a bulk discount tries to tempt you",
        body: `Rowanberry Co uses 40,000 units of a component a year, bought at $8 per unit. Each order costs $25 to place and process; holding one unit for a year costs $2. The supplier offers a 1.5% price discount on orders of 5,000 units or more.

Step 1 — the EOQ:
EOQ = square root of (2 × 25 × 40,000 ÷ 2) = square root of 1,000,000 = 1,000 units.

Step 2 — annual costs at the EOQ:
Orders per year = 40,000 ÷ 1,000 = 40, so ordering cost = 40 × 25 = $1,000.
Average inventory = 1,000 ÷ 2 = 500 units, so holding cost = 500 × 2 = $1,000.
Total ordering + holding = $2,000. (Equal ordering and holding costs — the EOQ signature.)

Step 3 — costs at the discount quantity of 5,000:
Orders = 40,000 ÷ 5,000 = 8, so ordering cost = 8 × 25 = $200.
Average inventory = 2,500 units, so holding cost = 2,500 × 2 = $5,000.
Total ordering + holding = $5,200 — an increase of 5,200 − 2,000 = $3,200 versus the EOQ.

Step 4 — value of the discount:
Annual purchases = 40,000 × 8 = $320,000. Discount = 1.5% × 320,000 = $4,800 saved.

Step 5 — decision:
Net effect of 5,000-unit orders = 4,800 saved − 3,200 extra costs = $1,600 a year better off. Order 5,000 at a time.

The structure to remember: the EOQ minimises ordering + holding costs ONLY; a discount changes the purchase-cost line, so total all three lines at each candidate order size and pick the cheapest.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Forgetting that holding cost applies to AVERAGE inventory (Q ÷ 2), not the full order quantity — doubling this line wrecks the whole comparison.

Evaluating a bulk discount inside the EOQ formula — the EOQ ignores purchase price; discounts require a total-cost comparison at each order level.

Annualising a settlement discount with simple interest only — the compound form [1 ÷ (1 − d)] to the power (365 ÷ t) − 1 is the correct cost; quoting d × 365 ÷ t understates it.

Treating stretched payables as free finance — the lost settlement discount is often dearer than the overdraft.

Confusing overtrading with over-capitalisation — overtrading is too LITTLE long-term capital chasing rapid growth (rising sales, collapsing liquidity, ballooning payables); over-capitalisation is idle working capital dragging down returns.

Mixing up Baumol and Miller-Orr — Baumol assumes steady, predictable cash usage; Miller-Orr is built for random flows and answers with limits and a return point.`,
      },
    ],
  },
  {
    paper: "FM",
    area: "D",
    title: "Business finance & cost of capital",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "What the money costs",
        body: `Every source of finance has a price. Shareholders demand a return for bearing risk; lenders demand interest. The weighted average, in market-value proportions, is the WACC — the discount rate for area B's NPVs. A project must earn more than the money financing it costs, or wealth is destroyed.

The cost of equity has two estimation routes: the dividend valuation model reads it off the share price — if the market pays P0 for a growing dividend stream, the implied return can be reverse-engineered; the CAPM builds it from risk — the risk-free rate plus a premium scaled by beta, the share's exposure to market-wide (systematic) risk. CAPM's key insight: only systematic risk is rewarded, because unsystematic risk diversifies away for free.

The cost of debt is cheaper twice over: lenders bear less risk, and interest is tax-deductible, so the cost carries a (1 − T) factor. Irredeemable debt is a perpetuity calculation; redeemable debt is an IRR of the after-tax flows to redemption.

Capital structure asks whether the mix itself changes value. Traditional theory says there is an optimal gearing level; Modigliani and Miller say without tax it is irrelevant, and with tax the interest shield favours debt — until bankruptcy risk pushes back. Gearing up makes equity riskier, which is why degearing and regearing exist: strip a proxy company's beta to pure business risk (the asset beta), then regear to your own structure. Raising equity has mechanics too — a rights issue prices new shares at a discount, and the TERP tells you where the price lands afterwards.`,
      },
      {
        kind: "structure",
        heading: "The formula kit",
        body: `Cost of equity — dividend valuation model:
Ke = D0 × (1 + g) ÷ P0 + g, where D0 = dividend just paid, P0 = ex-div price. If the question gives D1 (about to be paid), do not grow it again.
Growth: historical g = (latest ÷ earliest dividend) to the power (1 ÷ n) − 1; Gordon g = b × re.

Cost of equity — CAPM: Ke = Rf + beta × (Rm − Rf). Only systematic risk is priced.

Cost of debt:
Irredeemable: Kd = I × (1 − T) ÷ P0, with I = annual coupon and P0 = market price (per $100 nominal).
Redeemable: Kd = IRR of (market price now; after-tax interest each year; redemption amount at maturity).
Bank loans: interest rate × (1 − T).

WACC = (Ve × Ke + Vd × Kd) ÷ (Ve + Vd), using MARKET values; Kd already after tax. Valid as a discount rate only for projects of the same business risk with the capital structure broadly unchanged.

Degearing and regearing (for a different business risk):
Asset beta = equity beta × Ve ÷ [Ve + Vd × (1 − T)] (debt beta assumed zero).
Regear with YOUR gearing: equity beta = asset beta × [Ve + Vd × (1 − T)] ÷ Ve; then CAPM gives the project-specific Ke.

Rights issues: TERP = (N × cum-rights price + issue price) ÷ (N + 1) for a 1-for-N issue; value of a right = TERP − issue price. E.g. 1-for-4 at $2.00, cum-rights price $3.00: TERP = (4 × 3.00 + 2.00) ÷ 5 = $2.80; a right is worth 80 cents.`,
      },
      {
        kind: "example",
        heading: "Worked example — a full WACC",
        body: `Osier Co has 10m shares trading at $2.50. A dividend of 20 cents per share has JUST been paid; dividends grow at 5% a year. Osier also has $8m nominal of 6% irredeemable bonds trading at $96 per $100 nominal. Tax is 30%.

Step 1 — cost of equity (DVM with growth; dividend just paid, so grow it once):
Ke = 0.20 × 1.05 ÷ 2.50 + 0.05 = 0.21 ÷ 2.50 + 0.05 = 0.084 + 0.05 = 13.4%.

Step 2 — cost of debt (irredeemable, after tax, at MARKET price):
Kd = 6 × (1 − 0.30) ÷ 96 = 4.2 ÷ 96 = 4.375%.

Step 3 — market values:
Equity Ve = 10m × 2.50 = $25.0m.
Debt Vd = 8m × 96 ÷ 100 = $7.68m.
Total = $32.68m.

Step 4 — weight and average:
WACC = (25.0 × 13.4% + 7.68 × 4.375%) ÷ 32.68
= (3.350 + 0.336) ÷ 32.68
= 3.686 ÷ 32.68 = 11.3%.

Osier discounts average-risk projects at 11.3%. Sense-check: equity dominates the weights (77%), so the WACC sits nearer 13.4% than 4.375% — an answer outside the Kd-to-Ke range means a weight or tax slip.

The exam's favourite extension: for a project in a DIFFERENT industry, 11.3% is invalid — degear a quoted proxy's beta to an asset beta, regear to Osier's structure, run CAPM, rebuild the WACC.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Using book values in the WACC weights — always market values: shares at market price, bonds at market price per $100 nominal.

Taking the coupon rate as the cost of debt — a 6% coupon on a $96 bond does not cost 6%; the market price sets the return, and tax relief cuts it further.

Applying (1 − T) to the cost of equity — dividends are not tax-deductible; the tax shield belongs to debt only.

Growing the dividend twice — D0 (just paid) needs multiplying by (1 + g); D1 (about to be paid) does not.

Discounting every project at the existing WACC — different business risk needs the degear/regear CAPM route.

Forgetting that only systematic risk is rewarded under CAPM — unsystematic risk diversifies away, so beta, not total volatility, drives the required return.`,
      },
    ],
  },
  {
    paper: "FM",
    area: "E",
    title: "Business valuations & risk",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Pricing a company, then protecting the cash",
        body: `Valuation questions ask what a business, or a block of its shares, is worth — for a takeover, a buyout, or an unquoted company with no market price. There is no single right number; there are METHODS, each with a use case. Asset-based valuation totals net assets — a floor, useful for asset-rich or failing businesses, blind to goodwill and earning power. The P/E method multiplies sustainable post-tax earnings by a ratio borrowed from a comparable quoted company (discounted for unquoted status). The dividend valuation model discounts the growing dividend stream — natural for a minority holder who receives dividends but controls nothing. Discounted cash flow — free cash flows at an appropriate WACC — is the theoretical champion for acquiring control. Behind it all sits market efficiency: in a semi-strong efficient market, prices already reflect all public information, so a quoted price is a fair starting point.

The risk half protects cash flows from prices that move: exchange rates and interest rates. Transaction risk — a known foreign-currency payment or receipt at a future date — is the exam's favourite, and the two workhorse hedges are the forward contract (lock today's forward rate; certain, simple, binding) and the money market hedge (manufacture your own forward using borrowing, spot conversion and depositing). For a future PAYMENT: deposit the present value of the foreign amount now, funded by borrowing at home, so the deposit matures into exactly what you owe. For a RECEIPT: borrow foreign currency now against it. Interest rate risk has parallel tools — FRAs, futures, options, swaps. Economic and translation risk complete the taxonomy, but transaction risk is where the numbers are.`,
      },
      {
        kind: "structure",
        heading: "The valuation and hedging kit",
        body: `Valuation methods:
Asset basis: net assets (book / replacement / net realisable value) — a floor value.
P/E method: value of equity = sustainable post-tax earnings × appropriate P/E ratio (discount a quoted proxy's P/E for an unquoted target).
Earnings yield: value = earnings ÷ earnings yield.
DVM: P0 = D0 × (1 + g) ÷ (Ke − g) — requires Ke greater than g; suits minority stakes.
DCF: value = PV of free cash flows at the WACC — best for control.

Market efficiency: weak form (prices reflect past prices — charting fails); semi-strong (plus all public information — fundamental analysis fails); strong (plus private information — nothing beats the market).

Currency risk taxonomy: transaction (cash flow on a dated deal), translation (consolidation), economic (long-term competitiveness).

Forward hedge: home cost of a payment = foreign amount ÷ forward rate (rates quoted foreign per home unit).

Money market hedge for a foreign PAYMENT, three steps:
1 Deposit now the present value: foreign amount ÷ (1 + foreign deposit rate for the period).
2 Buy that amount at SPOT: divide by the spot rate for the home cost today.
3 Fund it by borrowing at home; repay home cost × (1 + home borrowing rate for the period). Compare with the forward hedge.
For a RECEIPT, mirror it: borrow foreign now, convert at spot, deposit at home.

Interest rate tools: FRA (fixes a future borrowing rate), futures, options, swaps. Prorate annual rates: 8% a year is 2% for three months.`,
      },
      {
        kind: "example",
        heading: "Worked example — forward versus money market hedge",
        body: `Alderwood Inc, a US company, must pay a supplier 600,000 euros in three months. Spot rate 0.8000 euros per $1; three-month forward 0.7920. Annual rates: euro deposits 4%, dollar borrowing 8%. Which hedge is cheaper?

Step 1 — forward hedge:
Dollar cost in three months = 600,000 ÷ 0.7920 = $757,576.

Step 2 — money market hedge, prorate the rates first:
Three-month euro deposit rate = 1%; three-month dollar borrowing rate = 2%.

Step 3 — deposit the present value of the payment in euros NOW:
600,000 ÷ 1.01 = 594,059 euros. In three months the deposit matures to exactly 600,000 euros — the payment is covered whatever rates do.

Step 4 — buy those euros at SPOT, funded by a dollar loan:
Dollar cost today = 594,059 ÷ 0.8000 = $742,574.

Step 5 — repay the dollar loan in three months:
742,574 × 1.02 = $757,426.

Step 6 — compare terminal costs:
Forward: $757,576. Money market: $757,426 — cheaper by about $150, so choose it, though a margin this thin often loses to the forward's simplicity once transaction costs count. The near-equality is no accident: interest rate parity says the forward rate IS the money-market construction, so a large gap usually means an arithmetic slip.

Direction check: it is a PAYMENT, so DEPOSIT foreign currency now and BORROW at home. Reversed, the hedge becomes a speculation.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Reversing the money market hedge — for a payment you deposit the foreign currency now; for a receipt you borrow it. Backwards, it doubles the exposure.

Using annual interest rates unprorated — a three-month hedge uses one quarter of the annual rate.

Applying a P/E multiple to the wrong earnings — the method needs sustainable POST-TAX earnings, adjusted for one-offs, and an unquoted company takes a discounted multiple.

Running the DVM with growth at or above the cost of equity — the formula explodes when g meets Ke; a growth estimate that high is wrong or unsustainable.

Valuing a controlling stake on the dividend model — dividends are the minority's cash flow; a controller commands ALL free cash flows, so DCF or earnings is the right lens.

Claiming semi-strong efficiency means prices are always right — it means public information is already priced; prices can still be wrong on information nobody has.`,
      },
    ],
  },
]
