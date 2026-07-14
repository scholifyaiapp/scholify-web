import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * Scholify — ACCA written (constructed-response) questions, wave 3: AA.
 *
 * AA (Audit and Assurance) is a paper whose real Section B is entirely
 * constructed-response, yet it carried only four written questions
 * (AA-W2-01…04, covering audit risk and control deficiencies). These
 * ELEVEN complete AA to 15 and rebalance the coverage: the framework and
 * levels of assurance, ethics, acceptance and engagement letters,
 * materiality and analytical review, tests of control versus substantive
 * procedures, sampling, the substantive procedures for the big balances
 * (receivables, inventory, payables and provisions, non-current assets),
 * going concern, subsequent events, written representations and the
 * modified opinion decision.
 *
 * Every scenario, company, person and figure is INVENTED; all technical
 * content is drawn from the public syllabus only. No ACCA, Kaplan or BPP
 * material is reproduced. Each carries a rubric of marking points
 * (~1 mark each) for the AI Examiner to mark against.
 */

export const WRITTEN_W3_AA: WrittenQuestion[] = [
  /* ───────────── A — Audit framework and regulation ───────────── */
  {
    id: "AA-W3-01",
    paper: "AA",
    area: "A",
    topic: "Assurance engagements & levels of assurance",
    stem: "Marlow Robotics Co is audited by your firm. The directors have also asked the firm to perform a review of the company's half-year financial information for the benefit of the company's bank. Marlow's chief executive has read the draft review report and complains that it 'says far less' than the year-end audit report, and separately asks why the audit cannot simply guarantee that the financial statements contain no errors at all. Explain the five elements of an assurance engagement, distinguish between a reasonable assurance engagement and a limited assurance engagement, and explain why an external audit can never provide absolute assurance. (8 marks)",
    maxMarks: 8,
    rubric: [
      "A three-party relationship is required: the practitioner (your firm), the responsible party (Marlow's directors, who prepare the information) and the intended users of the report (here, the bank).",
      "A subject matter: the underlying data or information examined — Marlow's half-year financial information, or in the audit the annual financial statements.",
      "Suitable criteria: the benchmarks against which the subject matter is evaluated and reported on, such as the applicable financial reporting framework (IFRS Accounting Standards).",
      "Sufficient appropriate evidence: the practitioner must gather enough reliable, relevant evidence to support the conclusion expressed.",
      "A written report: the conclusion is communicated in writing to the intended users in the form appropriate to the level of assurance obtained.",
      "A reasonable assurance engagement (the external audit) gives a high, but not absolute, level of assurance; evidence gathering is extensive and the conclusion is expressed positively — the financial statements 'give a true and fair view'.",
      "A limited assurance engagement (the half-year review) gives a moderate level of assurance; procedures are largely enquiry and analytical procedures, so the conclusion is expressed negatively — 'nothing has come to our attention' that the information is materially misstated — which is why it appears to say less.",
      "Absolute assurance is unattainable because the auditor tests samples rather than 100% of transactions, many figures depend on judgemental estimates, internal controls have inherent limitations, and management override or collusive fraud may conceal misstatement from the auditor.",
    ],
  },
  {
    id: "AA-W3-02",
    paper: "AA",
    area: "A",
    topic: "Ethical threats & safeguards (ACCA Code)",
    stem: "Redgrave & Co is the auditor of Tallow Kitchens Co, an unlisted company, for the year ending 31 May 20X7. You are aware of the following matters. The audit senior assigned to the engagement is the brother of Tallow's financial controller. Tallow's board has offered the whole audit team a free week at the company's lakeside lodge once the audit is signed off. Tallow has proposed that this year's audit fee be contingent on the company successfully obtaining a new bank loan. The prior-year audit fee remains unpaid. Tallow has also asked Redgrave & Co to value its 'Tallow' brand name, which the directors intend to recognise in the financial statements at a material amount. The engagement partner has held that role for nine consecutive years. Identify and explain the ethical threats arising, and recommend an appropriate safeguard or action for each. (8 marks)",
    maxMarks: 8,
    rubric: [
      "The audit senior's brother is the financial controller — a close family relationship with a client employee in a position to influence the accounting records creates a familiarity (and self-interest) threat; the senior should be removed from the Tallow engagement team.",
      "The offer of a free week at the lakeside lodge is hospitality that creates a self-interest and familiarity threat; unless it is trivial and inconsequential — which a week's holiday plainly is not — it must be declined by the whole team.",
      "A fee contingent on Tallow obtaining the bank loan creates a significant self-interest threat, as the firm gains from a favourable audit outcome; contingent fees are prohibited for audit engagements and the fee must instead be based on the time and skill required.",
      "Unpaid prior-year fees are, in effect, a loan to the client and create a self-interest threat; the firm should discuss this with those charged with governance and seek payment of the overdue fees before the current year's audit report is signed.",
      "Valuing the brand which the firm will then audit creates a self-review threat, because the firm would be auditing its own work, and the amount is material to the financial statements.",
      "Because a valuation involving a material amount and a significant degree of subjectivity is involved, no safeguard would reduce the self-review threat to an acceptable level and the firm should decline the valuation work (or resign as auditor if the directors insist).",
      "The engagement partner's nine-year association creates a familiarity threat and a self-interest threat; the partner should be rotated off the engagement, or as a minimum an independent partner should perform an engagement quality review of the audit.",
      "Each threat must be evaluated under the ACCA Code's conceptual framework and eliminated or reduced to an acceptable level; the threats, the evaluation and the safeguards applied must be documented, and if the threats cannot be adequately addressed the firm should resign from the engagement.",
    ],
  },

  /* ───────────── B — Planning and risk assessment ───────────── */
  {
    id: "AA-W3-03",
    paper: "AA",
    area: "B",
    topic: "Engagement acceptance & the engagement letter",
    stem: "Halverton & Co has been invited to tender for the audit of Kite Lane Logistics Co, a haulage business with a 31 October year end. Kite Lane's previous auditors resigned six months into the year, citing 'irreconcilable differences with the board'. Kite Lane has a demanding reporting deadline of eight weeks after the year end and operates in a sector in which Halverton & Co has no existing clients. Explain the matters Halverton & Co should consider, and the procedures it should perform, before accepting appointment as auditor, and explain the purpose and principal contents of an audit engagement letter. (8 marks)",
    maxMarks: 8,
    rubric: [
      "With Kite Lane's written permission, write to the outgoing auditor asking whether there are any professional reasons why the appointment should not be accepted; if the client refuses permission, or the outgoing auditor's reply raises concerns, the firm should decline.",
      "Assess the integrity of management, given the reference to 'irreconcilable differences', by reviewing press coverage, board minutes and the outgoing auditor's response, and perform client due diligence on the directors and beneficial owners to comply with money-laundering regulations.",
      "Consider whether the firm has the competence, industry knowledge and staff resources to perform the audit, and whether it can complete a haulage-sector audit to the eight-week reporting deadline without compromising quality.",
      "Evaluate whether any ethical threats to independence exist (fees, relationships, non-audit services) and whether they could be reduced to an acceptable level, and consider the risk profile of the engagement and whether the fee is commercially adequate for the work required.",
      "Establish the preconditions for an audit under ISA 210: that the financial reporting framework to be used is acceptable, and that management acknowledges its responsibility for preparing the financial statements, for internal control, and for giving the auditor access to all information, records and staff.",
      "Purpose of the engagement letter: it is sent to the client before the audit begins, forms the contract between the firm and Kite Lane, and confirms the firm's acceptance and the agreed terms so that there is no misunderstanding about what the audit involves.",
      "Contents: the objective and scope of the audit; the auditor's responsibility to form an opinion giving reasonable assurance in accordance with ISAs; and management's responsibilities (the 'premise' set out above).",
      "Contents: identification of the applicable financial reporting framework, the expected form and content of the auditor's report (with the caveat that its wording may change), the basis of the fee and billing arrangements, timing and planning arrangements, any use of experts or reliance on internal audit, and confirmation that written representations will be requested from management.",
    ],
  },
  {
    id: "AA-W3-04",
    paper: "AA",
    area: "B",
    topic: "Materiality & analytical procedures at planning",
    stem: "You are planning the audit of Ambleside Interiors Co, a furniture retailer, for the year ended 31 January 20X7. The draft figures, with the prior year in brackets, are: revenue $24.6m ($21.0m); gross profit $4.9m ($5.7m); profit before tax $0.4m ($1.5m); trade receivables collection period 71 days (46 days); inventory holding period 98 days (60 days); and a bank overdraft of $2.3m (a cash balance of $0.9m). Explain what is meant by materiality and performance materiality and how the auditor sets them, and, using the information above, describe FOUR audit risks indicated by your analytical review together with the auditor's response to each. (10 marks)",
    maxMarks: 10,
    rubric: [
      "Information is material if omitting, misstating or obscuring it could reasonably be expected to influence the economic decisions users take on the basis of the financial statements; it depends on the size and nature of the item and is a matter of professional judgement.",
      "Overall materiality is set at planning, usually by applying a percentage to a benchmark such as profit before tax (around 5%), revenue (around 1%) or total assets, and it must be revised if information comes to light that would have caused a different figure to be set — here the collapse in profit before tax makes a profit-based benchmark volatile and unstable.",
      "Performance materiality is a lower amount set by the auditor to reduce to an appropriately low level the probability that uncorrected and undetected misstatements in aggregate exceed overall materiality; it drives sample sizes and the threshold for investigating differences.",
      "Risk: revenue has risen 17% while gross margin has fallen from 27.1% to 19.9%, which is inconsistent — revenue may be overstated (cut-off errors or fictitious sales) or cost of sales overstated/inventory understated.",
      "Response: disaggregate and compare the gross margin by month and by product line against the prior year, test revenue cut-off by agreeing sales either side of the year end to despatch notes, and trace a sample of recorded sales to despatch documentation and cash received.",
      "Risk: the receivables collection period has lengthened from 46 to 71 days, indicating that receivables may be irrecoverable and the loss allowance understated.",
      "Response: review the aged receivables listing for old balances, inspect the post-year-end cash book for receipts against year-end balances, and challenge the assumptions in management's loss allowance against actual bad-debt history.",
      "Risk: the inventory holding period has risen from 60 to 98 days, suggesting slow-moving or obsolete furniture that may be carried above net realisable value.",
      "Response: at the inventory count, identify damaged and slow-moving lines and, for a sample of them, compare cost with the prices achieved in post-year-end sales invoices and current price lists to confirm any write-down to NRV.",
      "Risk: profit before tax has fallen from $1.5m to $0.4m and a $0.9m cash balance has become a $2.3m overdraft, indicating a going concern risk; response: obtain and challenge management's cash flow forecast, perform sensitivity analysis, and confirm the overdraft facility's renewal and any covenant terms directly with the bank.",
    ],
  },

  /* ───────────── C — Internal control ───────────── */
  {
    id: "AA-W3-05",
    paper: "AA",
    area: "C",
    topic: "Tests of control vs substantive procedures — sales cycle",
    stem: "Kestrel Tools Co sells power tools to trade customers on credit and processes a high volume of routine sales orders. Its sales system includes the following controls: credit-controller approval of a customer's credit limit before any order is accepted; a sequential numbering of despatch notes with a weekly exception report of despatch notes not matched to an invoice; prices on sales invoices taken from an authorised price list held in the system; a goods-outwards check of goods to the despatch note and order before loading; and a monthly reconciliation of the receivables ledger to its control account, reviewed by the financial controller. Explain the difference between a test of control and a substantive procedure, and describe SIX tests of control you would perform over Kestrel's sales cycle, stating the control objective each test addresses. (10 marks)",
    maxMarks: 10,
    rubric: [
      "A test of control is designed to evaluate the operating effectiveness of a control in preventing, or detecting and correcting, material misstatement at the assertion level — it tests the system, not the figure.",
      "A substantive procedure is designed to detect material misstatement at the assertion level directly, and comprises tests of detail and substantive analytical procedures; tests of controls are performed only where the auditor intends to rely on the controls (or where substantive procedures alone cannot give sufficient evidence), whereas substantive procedures must always be performed for material balances and classes of transactions.",
      "Test of control: for a sample of customer orders accepted during the year, inspect the order for evidence of the credit controller's approval (a signature or the system's authorisation flag) before despatch — objective: orders are only accepted from creditworthy customers, reducing bad debts.",
      "Test of control: inspect the weekly exception report of unmatched despatch notes for evidence of review and of the follow-up of items on it — objective: all goods despatched are invoiced (completeness of revenue).",
      "Test of control: attempt to enter a sales order for a customer whose credit limit is already exceeded (using test data on a copy of the system) and confirm the system rejects it — objective: the programmed credit-limit control operates as designed.",
      "Test of control: for a sample of sales invoices, agree the unit prices charged to the authorised price list and reperform the invoice arithmetic — objective: sales are recorded at the correct, authorised amounts (accuracy).",
      "Test of control: observe the goods-outwards clerk checking goods to the despatch note and customer order before the vehicle is loaded — objective: only goods actually ordered are despatched, and the despatch note is accurate (occurrence and accuracy).",
      "Test of control: inspect a sample of monthly receivables ledger control-account reconciliations for evidence of preparation, of the financial controller's independent review (signature and date), and of the clearance of reconciling items — objective: the ledger is complete and accurate and errors are detected on a timely basis.",
      "Test of control: for a sample of despatch notes selected from the sequence, confirm the numbering is continuous and that each has a matching sales invoice recorded in the correct period — objective: completeness of revenue and of receivables.",
      "If the tests show the controls operated effectively throughout the period, the auditor may reduce the extent of substantive testing of revenue and receivables; if deviations are found, the control cannot be relied upon, the reason for the deviation must be investigated, and substantive procedures must be extended accordingly.",
    ],
  },

  /* ───────────── D — Audit evidence ───────────── */
  {
    id: "AA-W3-06",
    paper: "AA",
    area: "D",
    topic: "Substantive procedures — trade receivables",
    stem: "Redwing Textiles Co has trade receivables of $4.1m at its year end of 30 June 20X7, stated after a loss allowance of $95,000. Included in the gross balance is $520,000 owed by a single customer who is disputing the quality of a large consignment delivered in May 20X7. Describe the substantive procedures you would perform to obtain sufficient appropriate audit evidence over the EXISTENCE and VALUATION of Redwing's trade receivables, including how you would conduct a receivables circularisation and deal with non-responses. (10 marks)",
    maxMarks: 10,
    rubric: [
      "Obtain the year-end receivables ledger listing, cast it, and agree the total to the trial balance and to the trade receivables figure in the financial statements.",
      "Perform a positive circularisation: select a sample of balances from the year-end ledger and ask each customer to confirm directly to the auditor the amount owed at 30 June 20X7, with the auditor controlling the despatch of the requests and receiving the replies directly to preserve the independence of the evidence.",
      "For non-responses, send a follow-up request and, where a reply is still not received, perform alternative procedures: agree the balance to cash received from that customer after the year end and, for any amount still unpaid, to the supporting despatch notes and sales invoices proving the goods were delivered before the year end.",
      "Investigate every difference reported by a customer, distinguishing timing differences that are not misstatements (cash in transit, goods in transit) from genuine errors such as disputed or duplicated invoices, and quantify the effect of any misstatement found.",
      "A negative confirmation, which asks the customer to reply only if they disagree, provides much weaker evidence and is appropriate only where the risk of material misstatement is low, controls are effective, the balances are numerous and small, and a low exception rate is expected.",
      "Inspect the post-year-end cash book and bank statements for receipts from customers after 30 June 20X7 and agree them back to the specific invoices making up the year-end balances, as this confirms the recoverability of the receivable at the reporting date.",
      "Review the aged receivables analysis for balances that are old or beyond their credit terms, discuss each significant overdue item with the credit controller, and corroborate management's explanations against customer correspondence rather than accepting them at face value.",
      "For the $520,000 disputed balance, inspect the correspondence with the customer and any credit notes or returns processed after the year end, review the goods-returned records for the May consignment, and discuss with management whether a specific allowance or a credit note is required at the year end.",
      "Recalculate the $95,000 loss allowance, test the reasonableness of management's assumptions (the ageing bands and loss rates applied) against Redwing's historical bad-debt experience, and compare the prior-year allowance with the debts actually written off during the year to assess the accuracy of management's estimating and any evidence of bias.",
      "Test cut-off by agreeing sales recorded in the final days before, and the first days after, the year end to the despatch notes, confirming that receivables are recorded in the period in which control of the goods passed to the customer.",
    ],
  },
  {
    id: "AA-W3-07",
    paper: "AA",
    area: "D",
    topic: "Inventory count attendance & valuation",
    stem: "Beckhurst Ceramics Co manufactures tableware at a single site and holds raw materials, work in progress and finished goods in one warehouse. A full physical inventory count will be performed at the year end of 31 March 20X7, and you will attend. The warehouse also stores a quantity of clay held on consignment for a supplier, which Beckhurst does not own. Describe the procedures the auditor should perform BEFORE, DURING and AFTER attendance at the inventory count, and the substantive procedures needed to confirm the VALUATION of inventory at the year end. (10 marks)",
    maxMarks: 10,
    rubric: [
      "Before: obtain and review the client's written count instructions, assessing whether they are adequate (counters working in pairs, one counting and one recording, pre-numbered count sheets, no inventory movements during the count, damaged items identified), and discuss any weaknesses with management before the count date.",
      "Before: review the prior-year count file for problems encountered, book the audit team's attendance, agree the areas of the warehouse the team will cover, and select in advance the inventory lines to be test-counted.",
      "During: observe whether the client's staff are following the count instructions and whether the counters are independent of the storekeeper responsible for the inventory they are counting.",
      "During: perform two-way test counts — select items from the physical inventory in the warehouse and trace them to the count sheets (testing completeness), and select items recorded on the count sheets and trace them to the physical inventory in the warehouse (testing existence) — and record the details of every test count in the audit file.",
      "During: inspect the inventory for damaged, chipped, slow-moving or obsolete tableware, note the item codes and quantities affected, and discuss the need for a write-down with management as evidence for the valuation work.",
      "During: confirm that the clay held on consignment for the supplier is physically segregated and clearly labelled, and that it is excluded from the count sheets, since Beckhurst does not own it and must not include it in inventory.",
      "During: record the numbers of the last goods received note and the last despatch note used before the count so that cut-off can be tested, and note the sequence numbers of all count sheets issued and returned.",
      "After: agree the auditor's own test-count records and the noted count-sheet sequence to the final inventory listing, confirming the listing reflects the count and that no sheets were added, lost or altered afterwards, and follow up the damaged items to confirm they were written down.",
      "Valuation: for a sample of items, agree the cost used to a recent purchase invoice (raw materials) or to a supporting costing sheet for finished goods, confirming the cost comprises materials, labour and an appropriate absorption of production overheads at normal levels of activity, with no selling or general administrative costs included.",
      "Valuation: for a sample of items — including the damaged and slow-moving lines identified at the count — compare cost with net realisable value by reference to post-year-end sales invoices and current price lists, confirming that any item whose NRV is below cost has been written down to NRV in accordance with IAS 2.",
    ],
  },
  {
    id: "AA-W3-08",
    paper: "AA",
    area: "D",
    topic: "Substantive procedures — payables, accruals & provisions",
    stem: "Dunmore Plastics Co has a year end of 30 September 20X7. The draft financial statements show trade payables of $3.4m, accruals of $610,000, and a warranty provision of $180,000 in respect of the twelve-month warranty Dunmore gives on all products sold. During the year Dunmore also received a letter from a customer threatening legal action over an allegedly defective batch; no provision has been made. Describe the substantive procedures you would perform to confirm the COMPLETENESS of trade payables and accruals, and the procedures you would perform over the warranty provision and the threatened legal claim. (10 marks)",
    maxMarks: 10,
    rubric: [
      "Obtain the year-end payables listing, cast it, and agree the total to the trial balance and to the trade payables figure in the financial statements.",
      "For a sample of suppliers, reconcile the supplier's own statement at the year end to the balance on Dunmore's purchase ledger, and investigate every reconciling item (invoices in transit, goods received not invoiced, disputed items) — the supplier statement is third-party evidence and is the strongest test of the completeness of payables.",
      "Select a sample of Dunmore's major suppliers whose ledger balance at the year end is nil or unusually low and confirm the balance is genuinely nil, because understatement — not overstatement — is the direction of risk for liabilities.",
      "Review the cash book and the supplier invoices received in the weeks after the year end and confirm that every invoice relating to goods or services received before 30 September 20X7 has been recorded as a liability or accrual in the year, and not in the following period.",
      "Inspect the goods received notes raised in the days immediately before the year end, agree them to the purchase ledger or to the goods-received-not-invoiced accrual, and confirm the corresponding liability has been recorded in the correct period (cut-off).",
      "Recalculate a sample of accruals (for example utilities, loan interest and holiday pay), agreeing the underlying rates and periods to invoices, the loan agreement and payroll records, and compare the accruals balance and each significant component with the prior year and with expectations, investigating unexpected movements.",
      "Warranty provision: confirm the IAS 37 recognition criteria are met — a present obligation arising from a past event (the sale of goods under a twelve-month warranty), a probable outflow of economic benefits, and a reliable estimate of the amount.",
      "Warranty provision: obtain management's calculation, recalculate it, and test the key assumptions — the proportion of sales expected to give rise to a claim and the average cost of a repair — by agreeing them to Dunmore's historical claims records and to recent repair costs and parts invoices.",
      "Warranty provision: compare the prior-year provision with the warranty claims actually settled during the year to assess how accurately management estimates, and consider whether any pattern of under- or over-provision indicates management bias.",
      "Legal claim: inspect the customer's letter, the board minutes and any correspondence with Dunmore's lawyers and, with the client's permission, write to the lawyers for their assessment of the likely outcome and cost; then evaluate whether an outflow is probable (provide), possible (disclose as a contingent liability) or remote (no action), and obtain a written representation from the directors on the completeness of provisions and contingencies.",
    ],
  },
  {
    id: "AA-W3-09",
    paper: "AA",
    area: "D",
    topic: "Audit sampling & non-current assets",
    stem: "Corran Haulage Co operates a fleet of lorries. During the year ended 31 December 20X7 it purchased 14 new lorries at a total cost of $2.8m, capitalising the purchase price together with delivery, livery sign-writing, the first year's road tax and insurance, and driver familiarisation training. The directors have also increased the estimated useful life of the whole fleet from seven years to ten years. Explain what is meant by audit sampling and describe the methods of sample selection available to the auditor, and describe the substantive procedures you would perform over the additions to property, plant and equipment and the depreciation charge. (10 marks)",
    maxMarks: 10,
    rubric: [
      "Audit sampling is the application of audit procedures to less than 100% of the items in a population, in such a way that every sampling unit has a chance of selection, so that the auditor can form a conclusion about the whole population from the items tested.",
      "Statistical sampling involves random selection of the sample and the use of probability theory to evaluate the results and to quantify sampling risk; non-statistical sampling does not.",
      "Selection methods include random selection (using random-number generators), systematic selection (a constant sampling interval applied from a random starting point) and monetary unit sampling, which is value-weighted so that larger-value items — such as the most expensive lorries — have a proportionately greater chance of selection and which is well suited to testing overstatement of assets.",
      "Haphazard selection (chosen without a conscious bias but not truly random) and block selection (a contiguous block of items, e.g. all additions in December) are non-statistical; block selection is generally inappropriate because a single block is unlikely to be representative of the whole population.",
      "The auditor must project the misstatements found in the sample across the whole population and evaluate whether the sample provides a reasonable basis for the conclusion, accepting that sampling risk — the risk that the sample is not representative — always remains.",
      "Obtain the non-current asset register, cast it, agree the closing carrying amount to the general ledger and the financial statements, and agree the total additions of $2.8m for the year to the register.",
      "For a sample of the 14 lorries, agree the amount capitalised to the supplier's purchase invoice, and confirm that only directly attributable costs of bringing the asset to the location and condition necessary for its intended use (the purchase price, delivery and the sign-writing) have been capitalised.",
      "Confirm that the first year's road tax, the insurance and the driver familiarisation training have been expensed and not capitalised, as these are not directly attributable costs under IAS 16; quantify any amount wrongly capitalised as a misstatement overstating PPE and understating expenses.",
      "Physically inspect a sample of the new lorries, agreeing the registration and chassis numbers to the asset register to confirm existence and that they are in use in the business, and inspect the vehicle registration documents to confirm Corran's ownership (rights and obligations).",
      "Recalculate the depreciation charge for a sample of vehicles under the revised ten-year life, confirming the policy is applied consistently and pro-rated from the date each lorry was brought into use; discuss the extension of the useful life with management and corroborate it against the fleet's actual replacement and mileage history, confirming the change is treated prospectively as a change in accounting estimate and adequately disclosed.",
    ],
  },

  /* ───────────── E — Review and reporting ───────────── */
  {
    id: "AA-W3-10",
    paper: "AA",
    area: "E",
    topic: "Going concern — procedures & reporting",
    stem: "You are completing the audit of Ravenglass Print Co for the year ended 31 August 20X7. The company made a loss for the first time, has breached the profit covenant on its bank loan, and its $1.5m overdraft facility is due for renewal in January 20X8. The directors have prepared a cash flow forecast to 31 August 20X8 which assumes that a large contract lost to a competitor in July 20X7 will be replaced by new work. Explain the respective responsibilities of management and of the auditor in relation to going concern, describe the audit procedures you would perform, and explain the effect on the auditor's report of each of the possible conclusions you might reach. (10 marks)",
    maxMarks: 10,
    rubric: [
      "Management is responsible for assessing whether Ravenglass is able to continue as a going concern and for making any disclosures required; the auditor's responsibility is to obtain sufficient appropriate evidence about, and conclude on, the appropriateness of management's use of the going concern basis and whether a material uncertainty exists.",
      "Evaluate management's assessment, which must cover a period of at least twelve months from the date of the financial statements; if the assessment covers a shorter period, ask the directors to extend it.",
      "Obtain the cash flow forecast to 31 August 20X8, cast it, agree the opening cash position to the year-end bank reconciliation, and assess the reasonableness of the key assumptions — in particular the assumed replacement of the lost contract — by comparing them with the order book, post-year-end management accounts and historical win rates.",
      "Perform sensitivity analysis on the forecast to establish whether Ravenglass remains within its facilities under plausible downside scenarios, such as the lost contract not being replaced at all or being replaced at a lower margin.",
      "Inspect the loan agreement to confirm the covenant terms, recalculate the covenant at the year end to confirm the breach, and inspect correspondence with the bank about the breach, about whether the loan has become repayable on demand, and about the intended renewal of the $1.5m overdraft facility in January 20X8.",
      "Review board minutes and post-year-end management accounts for evidence of further deterioration or of mitigating actions, and obtain evidence that the directors' plans are feasible — for example, signed contracts for new work, or a facility letter or letter of support from the bank or shareholders.",
      "Obtain a written representation from the directors confirming their plans for the future and their belief that those plans are feasible.",
      "If the going concern basis is appropriate and no material uncertainty exists, the opinion is unmodified and no additional reporting is required.",
      "If the going concern basis is appropriate but a material uncertainty exists and is adequately disclosed in the notes, the opinion remains unmodified but the auditor's report must include a separate 'Material Uncertainty Related to Going Concern' section drawing attention to that disclosure; if the material uncertainty is NOT adequately disclosed, the financial statements are misstated and the opinion is modified — qualified, or adverse if the effect is pervasive.",
      "If the going concern basis is inappropriate because Ravenglass will cease to trade, yet the financial statements have been prepared on that basis, the misstatement is pervasive and an adverse opinion is required.",
    ],
  },
  {
    id: "AA-W3-11",
    paper: "AA",
    area: "E",
    topic: "Subsequent events, written representations & the opinion",
    stem: "The audit of Ellersby Scientific Co for the year ended 31 December 20X6 is at the completion stage, and the auditor's report is due to be signed on 20 March 20X7. Two matters have arisen. In February 20X7 a customer owing $240,000 at the year end went into insolvent liquidation, and the liquidator has indicated that no dividend will be paid to unsecured creditors; the directors refuse to write the balance down, saying the customer 'failed after our year end'. The amount is material but not pervasive to the financial statements. Separately, in January 20X7 the board publicly announced a plan to close its loss-making instruments division, and the directors have declined to sign the written representation confirming that they have disclosed all related-party transactions to you. Explain the auditor's responsibilities and procedures in respect of events after the reporting period, explain the purpose of written representations, and explain, with reasons, the effect of each matter on the auditor's report. (10 marks)",
    maxMarks: 10,
    rubric: [
      "Between the year end and the date of the auditor's report, the auditor must perform procedures designed to identify events requiring adjustment of, or disclosure in, the financial statements; after the report is signed the auditor has no obligation to perform further procedures, but must act if a material fact subsequently comes to their attention.",
      "Procedures: enquire of management about the status of items accounted for using preliminary data; read the minutes of board and shareholder meetings held after the year end; review the latest post-year-end management accounts, cash book and budgets; and enquire about new borrowings, commitments, litigation or asset sales since the year end.",
      "The customer's insolvency in February 20X7 is an ADJUSTING event: it provides evidence of a condition — the customer's inability to pay — that already existed at 31 December 20X6, so the $240,000 receivable must be written down in the 20X6 financial statements; the directors' argument that the failure occurred after the year end is not a valid basis for leaving the receivable unadjusted.",
      "The January 20X7 announcement of the closure of the instruments division is a NON-ADJUSTING event, because the condition arose after the reporting date; it is not adjusted for, but if material it must be disclosed in the notes, describing the nature of the event and an estimate of its financial effect.",
      "Written representations are audit evidence obtained in a letter signed by management, confirming that management has fulfilled its responsibilities for the financial statements and for providing the auditor with all relevant information and access, and supporting other evidence on judgemental matters where sufficient evidence is not otherwise available.",
      "Written representations are necessary audit evidence but are never sufficient on their own for any matter, because they come from a source that is not independent of the entity; they cannot substitute for other procedures the auditor is able to perform.",
      "The refusal to write down the $240,000 receivable is a material misstatement in the financial statements; the auditor has obtained sufficient appropriate evidence, so this is a disagreement with management rather than a limitation on the scope of the audit.",
      "Because the misstatement is material but NOT pervasive, the auditor issues a qualified ('except for') opinion, preceded by a 'Basis for Qualified Opinion' section explaining the matter and quantifying its effect on receivables and profit.",
      "Had the misstatement been both material AND pervasive — for example if it represented a substantial proportion of receivables and profit and rendered the financial statements as a whole misleading — an adverse opinion would be required, stating that the financial statements do NOT give a true and fair view.",
      "The directors' refusal to give the written representation on related-party transactions is a limitation on the scope of the audit and casts doubt on management's integrity and on the reliability of all their other representations; the auditor should discuss the matter with those charged with governance and, if the representation is still not provided, disclaim an opinion (or, where the possible effects are material but not pervasive, issue a qualified opinion), since the auditor cannot obtain sufficient appropriate evidence about the completeness of related-party disclosures.",
    ],
  },
]
