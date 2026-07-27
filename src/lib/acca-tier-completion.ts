import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Authored questions that complete the EASY / MEDIUM / HARD ladder in every
 * syllabus area of every paper.
 *
 * The diagnostic samples one easy, one medium and one hard question from each
 * area (see PER_AREA in acca-diagnostic.ts). An audit of the banks found 25 area
 * tiers with nothing authored to draw on — almost all of them "hard", and
 * concentrated in the thin areas every paper carries: the employability and
 * technology-skills area, the professional-skills areas at Strategic
 * Professional, and a handful of technical areas with only 3–4 questions.
 *
 * pickLadder falls back a tier when a bucket is empty, so those areas were being
 * scored on an easy or medium question standing in for the hard slot. That
 * flatters the area score, and the plan targets weak areas off those scores — so
 * the gap propagated into what the learner was told to study.
 *
 * Authored to the same standard as the rest of the bank: applied wherever the
 * syllabus allows, distractors that are targeted misconceptions rather than
 * off-topic noise, and an explanation that names the rule and the classic error.
 * Original wording throughout — aligned to the published syllabus, never a
 * reproduction of ACCA exam material.
 */

const q = (
  id: string,
  paper: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion => ({
  id: `tier-${paper.toLowerCase()}-${id}`,
  paper,
  area,
  type: "mcq",
  stem,
  options,
  correct,
  explanation,
  marks: 2,
  difficulty,
})

const QUESTIONS: AccaQuestion[] = [
  /* ── FA · E — Reconciliations (easy + hard) ──────────────────── */
  q("fa-e-easy", "FA", "E", "easy",
    "In a bank reconciliation, which item is corrected in the CASH BOOK rather than reconciled against the bank statement balance?",
    [
      "Cheques written but not yet presented to the bank",
      "Bank charges the bank has taken but the business has not recorded",
      "Lodgements banked but not yet credited",
      "An error made by the bank",
    ], 1,
    "Bank charges are a genuine transaction the business has simply not entered, so the cash book is corrected. Unpresented cheques, uncredited lodgements and bank errors are timing differences or bank mistakes — they reconcile the bank statement figure, they are not cash book errors."),
  q("fa-e-hard", "FA", "E", "hard",
    "A receivables ledger control account shows $84,600. The total of the individual customer balances is $84,060. The only error found is a customer balance of $1,290 that was entered in the list as $750. What is the corrected total of the list of balances?",
    ["$84,060", "$84,600", "$85,890", "$83,520"], 1,
    "The transposition understated the list by $1,290 − $750 = $540, so the corrected total is $84,060 + $540 = $84,600 and the ledger now agrees. Adjusting by the full $1,290 (giving $85,350) or subtracting instead of adding are the classic errors — only the DIFFERENCE between the two figures was ever missing."),

  /* ── PM ──────────────────────────────────────────────────────── */
  q("pm-a-hard", "PM", "A", "hard",
    "A retailer steers weekly promotions from a live dashboard fed by clickstream, till and social-media data. Which characteristic of big data most directly threatens the RELIABILITY of decisions taken from it?",
    ["Volume", "Velocity", "Variety", "Veracity"], 3,
    "Veracity is the characteristic about trustworthiness — how complete, accurate and free from bias the data is. Volume, velocity and variety describe scale, speed and range: they make the data harder to process, but only veracity determines whether the resulting decision is sound."),
  q("pm-f-hard", "PM", "F", "hard",
    "A management accountant builds a flexed budget in a spreadsheet, typing the activity volume directly into each variance formula rather than referencing a single input cell. What is the most significant consequence?",
    [
      "The file becomes too large to share",
      "Re-flexing to a new volume requires editing every formula, so an undetected error is likely",
      "Variances can no longer be calculated at all",
      "The spreadsheet cannot be printed for the board pack",
    ], 1,
    "Hard-coding an assumption inside formulas destroys the audit trail and means every scenario change is a manual edit of many cells — the standard route to an error nobody spots. One labelled input cell referenced by all formulas is the control."),

  /* ── TX ──────────────────────────────────────────────────────── */
  q("tx-a-hard", "TX", "A", "hard",
    "An individual files their 2025/26 income tax return ONLINE. Assuming no special circumstances, what are the filing deadline and the due date for the balancing payment?",
    [
      "File by 31 October 2026; pay by 31 January 2027",
      "File by 31 January 2027; pay by 31 January 2027",
      "File by 31 January 2027; pay by 28 February 2027",
      "File by 31 October 2026; pay by 31 October 2026",
    ], 1,
    "An online return is due by 31 January following the end of the tax year, and the balancing payment falls due on the same date. 31 October is the deadline for a PAPER return — carrying it across to online filing is the classic error."),
  q("tx-g-hard", "TX", "G", "hard",
    "At a client's request, a tax assistant emails the client's completed tax computation to their personal address as an unencrypted attachment. Which professional concern is most directly engaged?",
    [
      "Confidentiality",
      "Technical competence",
      "None — the client asked for it, so the risk is theirs",
      "Independence",
    ], 0,
    "The duty to protect client information does not transfer to the client just because they chose the channel; sending tax data unprotected risks disclosure to third parties. Competence concerns the quality of the work, and independence is an assurance concept, not a data-handling one."),

  /* ── FR ──────────────────────────────────────────────────────── */
  q("fr-e-hard", "FR", "E", "hard",
    "A consolidation workbook links to a subsidiary's file, which a colleague later moves to a different folder. The consolidation still opens and shows figures without displaying an error. What is the principal reporting risk?",
    [
      "The workbook will become corrupted and unopenable",
      "The broken link retains its last cached values, so prior-period figures are reported as current",
      "The consolidation must be performed manually from then on",
      "Formatting is lost from the linked sheets",
    ], 1,
    "A broken external link keeps the values it last retrieved, so the model looks healthy while silently reporting stale data. Linked sources need a documented refresh-and-check step before the consolidation is relied on."),

  /* ── FM ──────────────────────────────────────────────────────── */
  q("fm-b-hard", "FM", "B", "hard",
    "A treasurer wants to limit the cost of a floating-rate loan if interest rates rise, while still benefiting if rates fall. Which instrument achieves BOTH?",
    [
      "An interest rate swap into a fixed rate",
      "An interest rate cap",
      "A forward rate agreement",
      "Refinancing at a fixed rate",
    ], 1,
    "A cap is an option: it sets a maximum rate while leaving the borrower free to pay less if rates fall — which is why it carries a premium. A swap, an FRA and fixed-rate refinancing all lock the rate in both directions, so the downside benefit is given up. Choosing a swap is the classic error."),
  q("fm-h-hard", "FM", "H", "hard",
    "An analyst applies a spreadsheet's IRR function to a project with an initial outflow, inflows in years 1–3, and a large decommissioning OUTFLOW in year 4. What is the principal limitation of the single figure returned?",
    [
      "IRR cannot be computed over four periods",
      "The cash flows change sign more than once, so multiple IRRs may exist and the one returned can mislead",
      "IRR requires the discount rate as an input, which has not been supplied",
      "IRR always understates return relative to NPV",
    ], 1,
    "Non-conventional cash flows — more than one sign change — can produce several mathematically valid IRRs, and the function returns whichever it converges on first. NPV is the reliable decision rule here."),

  /* ── SBL ─────────────────────────────────────────────────────── */
  q("sbl-a-hard", "SBL", "A", "hard",
    "A strategy demands rapid, coordinated change across divisions whose heads have long operated autonomously. Which leadership emphasis is most likely to deliver it?",
    [
      "Transformational leadership, articulating a shared vision and winning commitment to it",
      "Transactional leadership, tightening each division head's individual performance targets",
      "Laissez-faire leadership, leaving each division to adapt in its own way",
      "Bureaucratic leadership, enforcing the existing procedures more strictly",
    ], 0,
    "Coordinated change across entrenched silos needs commitment to a shared purpose, which is what transformational leadership builds. Sharpening individual targets rewards divisional performance and so reinforces the silos the strategy has to cross."),
  q("sbl-f-hard", "SBL", "F", "hard",
    "An internal audit function reports functionally to the finance director, who is also responsible for the controls it examines. What threat arises and what is the standard remedy?",
    [
      "A familiarity threat; rotate the internal audit staff periodically",
      "A threat to internal audit's independence and objectivity; it should report functionally to the audit committee",
      "An advocacy threat; the function should be outsourced immediately",
      "No threat — independence requirements apply only to external auditors",
    ], 1,
    "Reporting to the owner of the controls under review compromises objectivity, because unfavourable findings go first to the person they criticise. A functional reporting line to the audit committee is the recognised safeguard. Independence matters for internal audit too, even though it is not an external assurance provider."),
  q("sbl-h-hard", "SBL", "H", "hard",
    "A project is delivered on time and within budget, but the benefits set out in its business case never materialise. Which control was most likely missing?",
    [
      "A project initiation document",
      "A post-implementation benefits review against the business case",
      "A critical path analysis",
      "A risk register",
    ], 1,
    "On time and on budget measures DELIVERY. Whether the investment was worthwhile is a separate question, answered by reviewing realised benefits against the case after implementation — and by holding someone accountable for them. Initiation documents, CPA and risk registers all support delivery, not benefits realisation."),

  /* ── SBR ─────────────────────────────────────────────────────── */
  q("sbr-g-hard", "SBR", "G", "hard",
    "A group's consolidation spreadsheet applies a mid-year acquisition by taking the subsidiary's full-year results and deducting a pre-acquisition figure typed straight into a cell. What is the principal reporting risk?",
    [
      "The workbook may exceed its row limit",
      "The adjustment cannot be traced or re-performed, so a misstatement in consolidated profit may go undetected",
      "Consolidation must instead be performed manually",
      "IFRS does not permit consolidations prepared in a spreadsheet",
    ], 1,
    "Only post-acquisition results are consolidated, so the split matters — and a hard-coded figure with no visible derivation cannot be checked by a reviewer or re-performed next period. The apportionment should be built from disclosed inputs."),

  /* ── AFM ─────────────────────────────────────────────────────── */
  q("afm-f-hard", "AFM", "F", "hard",
    "A board paper recommends an acquisition on the strength of an NPV built from synergy figures supplied by the target's own management, with no sensitivity analysis. Which professional skill is most clearly lacking?",
    [
      "Communication",
      "Scepticism",
      "Commercial acumen",
      "Analysis",
    ], 1,
    "Scepticism is the challenge applied to the SOURCE and reliability of an assumption — and synergy estimates from the party being bought are inherently self-serving. Presenting them unchallenged and untested is the failure here; the arithmetic may be perfectly competent."),
  q("afm-g-hard", "AFM", "G", "hard",
    "A treasury model values a currency option with the volatility figure typed directly into the pricing formula. Why does this most matter to the advice given to the board?",
    [
      "The model recalculates too slowly for board use",
      "The valuation cannot be re-run across alternative volatilities, so the advice carries an unquantified sensitivity",
      "Option pricing models cannot be applied to currency options",
      "The figure must be updated every trading day by regulation",
    ], 1,
    "Option value is highly sensitive to volatility, which is the least observable input. Burying it in a formula prevents the sensitivity analysis the board needs in order to see how fragile the recommendation is."),

  /* ── APM ─────────────────────────────────────────────────────── */
  q("apm-c-hard", "APM", "C", "hard",
    "A division appraised on return on investment holds an old, heavily depreciated asset base. What distortion is most likely?",
    [
      "ROI understates performance, because a low asset base depresses the ratio",
      "ROI is inflated by the low net book value, and the manager may reject a positive-NPV replacement that would dilute it",
      "Residual income would report exactly the same outcome",
      "ROI is unaffected by the depreciation policy applied",
    ], 1,
    "A low net book value shrinks the denominator, so ROI looks strong on ageing assets — and replacing them raises the denominator and cuts reported ROI, giving the manager a reason to turn down an investment that adds value. This is the classic dysfunctional consequence of ROI, and the usual argument for residual income."),
  q("apm-e-hard", "APM", "E", "hard",
    "A performance report to the board lists thirty KPIs with no commentary and no link to the strategic objectives. Which professional skill is most clearly deficient?",
    [
      "Scepticism",
      "Communication",
      "Commercial acumen",
      "Evaluation",
    ], 1,
    "Communication is about presenting information so its audience can act on it: prioritised, interpreted and tied to the objectives it speaks to. An undifferentiated list of measures may be entirely accurate and still fail the board completely."),

  /* ── ATX ─────────────────────────────────────────────────────── */
  q("atx-b-hard", "ATX", "B", "hard",
    "An individual proposes to gift a UK rental property to their adult child, receiving nothing in return. Which taxes must be considered on the GIFT itself?",
    [
      "Income tax and VAT",
      "Capital gains tax and inheritance tax",
      "Stamp duty land tax and corporation tax",
      "Capital gains tax only",
    ], 1,
    "A gift is a disposal at market value for CGT and, at the same time, a transfer of value for IHT — normally a potentially exempt transfer. SDLT is charged on consideration, of which there is none here, and corporation tax cannot apply to an individual. Considering only CGT is the classic error: the interaction of the two taxes is the point."),
  q("atx-c-hard", "ATX", "C", "hard",
    "A taxpayer with adjusted net income above £100,000 for 2025/26 wants to reduce their income tax liability. Which action reduces ADJUSTED NET INCOME, and so can also restore part of the tapered personal allowance?",
    [
      "Making a gross personal pension contribution",
      "Claiming the marriage allowance",
      "Investing the same amount in an ISA",
      "Deferring a dividend into the next tax year",
    ], 0,
    "Gross personal pension contributions are deducted in computing adjusted net income, so they both extend the basic rate band and claw back personal allowance lost to the £100,000 taper — relief at an effective rate well above the headline one. ISA income is exempt but subscribing does not reduce ANI, and deferring a dividend moves the income rather than reducing this year's ANI computation basis."),
  q("atx-e-medium", "ATX", "E", "medium",
    "When setting out tax advice to a client in writing, which approach is most appropriate?",
    [
      "State the recommendation, the assumptions it depends on, and the tax consequences of following it",
      "Provide the full statutory references and leave the client to draw a conclusion",
      "Provide the computation alone, since the numbers speak for themselves",
      "State the conclusion only, so the client is not confused by caveats",
    ], 0,
    "Advice is only usable if the client can see what was recommended, what it rests on, and what follows from it — the assumptions matter because the advice fails if they are wrong. Statutory references without a conclusion, or a conclusion without its basis, both leave the client unable to act safely."),
  q("atx-e-hard", "ATX", "E", "hard",
    "An adviser reuses last year's spreadsheet for a client's computation, updating the income figures but not the rate cells. The output looks plausible and is issued. Which control would most reliably have prevented this?",
    [
      "Password-protecting the file before circulation",
      "Holding all rates in one labelled input section, referenced by every formula and reviewed each year",
      "Printing the computation for a second reader",
      "Storing the file in a shared folder for review",
    ], 1,
    "The failure is a stale assumption, not a stale file, and a plausible-looking answer is exactly what makes it dangerous. Centralising rates in a single reviewed input block makes the annual update one visible step instead of a hunt through formulas."),

  /* ── AAA ─────────────────────────────────────────────────────── */
  q("aaa-f-hard", "AAA", "F", "hard",
    "A firm is engaged to REVIEW a client's interim financial statements. What level of assurance is given, and in what form is the conclusion expressed?",
    [
      "Reasonable assurance, expressed as a positive opinion",
      "Limited assurance, expressed as a negatively worded conclusion",
      "Absolute assurance, expressed as a positive opinion",
      "No assurance — only the factual findings of the procedures performed",
    ], 1,
    "A review gathers less evidence than an audit, so it supports only limited assurance and is expressed negatively — nothing has come to our attention. Reasonable assurance with a positive opinion is an audit; factual findings without a conclusion describe an agreed-upon-procedures engagement. No engagement offers absolute assurance."),
  q("aaa-g-hard", "AAA", "G", "hard",
    "A listed client's annual report contains climate-related disclosures presented OUTSIDE the audited financial statements. What is the auditor's responsibility for that information?",
    [
      "To audit it and express an opinion on it",
      "To read it and consider whether it is materially inconsistent with the financial statements or with knowledge obtained in the audit",
      "To disregard it, as it falls outside the engagement",
      "To correct it before the annual report is issued",
    ], 1,
    "Such disclosures are other information: not audited, but the auditor must read them and respond to any material inconsistency — including reporting the fact where it is not corrected. Treating it as audited overstates the opinion; ignoring it misses a required procedure."),
  q("aaa-h-hard", "AAA", "H", "hard",
    "Testing a major provision, the team obtains a management explanation that conflicts with a contract already on file. The audit senior accepts the explanation because management has always been reliable. Which professional skill has failed?",
    [
      "Communication",
      "Scepticism",
      "Commercial acumen",
      "Time management",
    ], 1,
    "A track record of reliability is not audit evidence, and it cannot outweigh documentary evidence that contradicts what management says. Scepticism requires the inconsistency to be investigated and resolved with corroborating evidence."),
  q("aaa-i-hard", "AAA", "I", "hard",
    "An audit team uses data analytics to test the whole sales ledger rather than a sample, and the routine flags 4,000 exceptions. What is the most appropriate next step?",
    [
      "Report all 4,000 items as misstatements",
      "Stratify and investigate the exceptions to separate genuine misstatements from normal characteristics of the population",
      "Conclude that the population is materially misstated",
      "Fall back to testing a sample instead",
    ], 1,
    "Analytics identify items warranting attention; they do not reach conclusions. A large exception count usually reflects how the routine was defined or legitimate variety in the data, so the exceptions must be understood before any misstatement is inferred — the value of full-population testing lies in the follow-up."),
]

/** Authored tier-completion questions for a paper (empty for papers with none). */
export function tierCompletionQuestions(paperId: string): AccaQuestion[] {
  return QUESTIONS.filter((question) => question.paper === paperId)
}
