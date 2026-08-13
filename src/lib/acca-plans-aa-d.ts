/*
 * AA Area D — assertions and audit evidence, procedures and sampling, the
 * substantive audit of the major balances, and using the work of others.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * This is the largest area in the paper and it produces the requirement AA
 * asks more often than any other: "describe substantive procedures the auditor
 * should perform to obtain sufficient appropriate evidence in respect of X".
 * It appears in nearly every diet, usually several times, for anything from
 * four to ten marks.
 *
 * ONE MARK PER PROCEDURE. That single fact should govern how the answer is
 * written, and it is why candidates who write well score badly here. A
 * beautifully constructed paragraph explaining the risk around receivables and
 * then giving three procedures scores three. A plain list of eight procedures
 * scores eight. There is no discussion mark in a "describe procedures"
 * requirement, and there is nothing to be gained by introducing the answer.
 *
 * A procedure earns its mark only if it could actually be performed, which in
 * practice means it contains four things: a VERB the auditor can do, a SAMPLE
 * or population, the SPECIFIC DOCUMENT or source, and the PURPOSE — what is
 * being agreed to and why. "Check inventory" has none of them. "Ensure
 * receivables are valued correctly" restates the assertion instead of testing
 * it. Both are worth nothing, and both are extremely common.
 *
 * The other discipline this area demands is DIRECTION OF TESTING, which is the
 * difference between an answer that finds an overstatement and one that finds
 * an understatement. Testing from the accounting records out to source
 * documents can only ever confirm what is already recorded; to test
 * completeness the auditor must start OUTSIDE the records and work in. That is
 * why payables and revenue are audited in the opposite direction from
 * receivables and assets, and AA-18::understatement-worked exists to make the
 * point concrete.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const AA_PLANS_D: ExamPlanMap = {
  /* ── AA-15 · Assertions and sufficient appropriate evidence ─────── */

  "AA-15::assertions": {
    title: "The financial statement assertions, and what each one claims",
    format: "written",
    marks: 6,
    requirement:
      "Explain what is meant by financial statement assertions, and describe the assertions relevant to account balances at the period end. (6 marks)",
    plan: [
      {
        step: "Define an assertion as a claim management is making",
        detail:
          "Assertions are the REPRESENTATIONS BY MANAGEMENT, explicit or otherwise, that are embodied in the financial statements. By publishing a receivables figure of $2m, management is asserting that those receivables exist, are owed to the entity, are complete, and are stated at a recoverable amount. The auditor's job is to test each claim.",
      },
      {
        step: "Give the balance assertions in full",
        detail:
          "EXISTENCE, RIGHTS AND OBLIGATIONS, COMPLETENESS, ACCURACY VALUATION AND ALLOCATION, CLASSIFICATION, and PRESENTATION. Six assertions, and the requirement asks specifically for balances rather than transactions — answering on the wrong set loses most of the marks.",
      },
      {
        step: "Illustrate each with a balance, because an abstract definition does not demonstrate understanding",
        detail:
          "Existence — the inventory on the sheet is physically there. Rights — the entity owns it and it is not held on consignment. Completeness — nothing has been left out. Valuation — it is at the lower of cost and net realisable value. One example per assertion.",
      },
      {
        step: "Explain why the auditor works this way",
        detail:
          "Every audit procedure is designed to test a SPECIFIC assertion, and the risk of material misstatement is assessed at the ASSERTION LEVEL. Without them the auditor would be testing a balance in general, which gives no way of knowing whether the evidence obtained covers the risk that actually exists.",
      },
    ],
    answer:
      "**What assertions are.** Assertions are the **representations by management, explicit or otherwise, that are embodied in the financial statements** and used by the auditor to consider the different types of potential misstatement that may occur. When management publishes a receivables balance of $2 million, it is asserting — without stating it — that those receivables **exist**, that the entity has the **right** to receive them, that **none have been omitted**, and that they are stated at an amount that will be **recovered**. Each of those is a separate claim, and each can be wrong independently of the others.\n\n**Assertions about account balances at the period end**\n\n· **Existence** — the assets, liabilities and equity interests recorded **actually exist**. *For inventory:* the goods listed on the count sheets are physically present.\n· **Rights and obligations** — the entity **holds or controls the rights** to the assets, and the liabilities are the **obligations of the entity**. *For inventory:* the goods are owned by the entity and are not held on consignment or on sale-or-return from a supplier.\n· **Completeness** — all assets, liabilities and equity interests that **should have been recorded have been recorded**, and all related disclosures included. *For payables:* no supplier invoices have been omitted from the ledger.\n· **Accuracy, valuation and allocation** — balances are included at **appropriate amounts**, and any resulting **valuation or allocation adjustments** are appropriately recorded. *For inventory:* it is held at the lower of cost and net realisable value; *for receivables:* an adequate allowance has been made.\n· **Classification** — assets, liabilities and equity interests are recorded in the **proper accounts**. *For a loan:* correctly split between current and non-current.\n· **Presentation** — balances are **appropriately aggregated or disaggregated** and clearly described, and related disclosures are **relevant and understandable**.\n\n*(For classes of transactions the assertions are **occurrence, completeness, accuracy, cut-off, classification and presentation** — cut-off replacing the balance-specific assertions.)*\n\n**Why the auditor works assertion by assertion.** ISA 315 requires the risk of material misstatement to be assessed **at the assertion level**, and every audit procedure is designed to obtain evidence about a **specific assertion**. A procedure that provides strong evidence about one assertion may provide none about another — inspecting an asset proves **existence** but says nothing about **rights**, since the entity may be holding it for someone else. Without assertions the auditor would be testing 'inventory' in general, with no way to know whether the evidence obtained addresses the risk that actually exists.",
    earns: [
      "Defining assertions as management's implicit claims, with a concrete illustration",
      "Giving all six balance assertions, which is what the requirement asks for",
      "Illustrating each with a specific balance",
      "Explaining that risk is assessed and procedures designed at the assertion level",
    ],
    loses: [
      "Giving the transaction assertions when balances were asked for, or mixing the two sets",
      "Listing assertion names with no explanation of what each claims",
      "Including cut-off as a balance assertion",
    ],
  },

  "AA-15::sufficient-appropriate": {
    title: "Sufficient and appropriate: quantity, relevance and reliability",
    format: "written",
    marks: 5,
    requirement:
      "Explain what is meant by 'sufficient appropriate audit evidence', and describe the factors that affect the reliability of audit evidence. (5 marks)",
    plan: [
      {
        step: "Split the phrase into its two words and define each separately",
        detail:
          "SUFFICIENT is the measure of QUANTITY. APPROPRIATE is the measure of QUALITY, and quality has two dimensions — RELEVANCE and RELIABILITY. Getting this structure right is most of the answer, and treating the phrase as one idea loses marks.",
      },
      {
        step: "State what drives sufficiency",
        detail:
          "The higher the assessed RISK of material misstatement, the more evidence is needed. The higher the QUALITY of the evidence, the less is needed. The two interact — better evidence means less of it — but quantity can never compensate for evidence of poor quality.",
      },
      {
        step: "Define relevance separately from reliability, since candidates merge them",
        detail:
          "RELEVANCE is whether the evidence bears on the ASSERTION being tested. Attending an inventory count is highly relevant to existence and irrelevant to valuation. Evidence can be entirely reliable and completely irrelevant.",
      },
      {
        step: "Give the reliability hierarchy as four contrasts",
        detail:
          "EXTERNAL is more reliable than internal. Evidence generated by the AUDITOR is more reliable than that provided by the entity. Evidence from an entity with EFFECTIVE CONTROLS is more reliable than from one without. WRITTEN is more reliable than oral, and ORIGINAL documents more reliable than copies.",
      },
    ],
    answer:
      "**Sufficiency — the measure of quantity.** How much evidence is needed depends on:\n\n· the **assessed risk of material misstatement** — the higher the risk, the more evidence is required\n· the **quality of the evidence obtained** — the higher its quality, the less of it is needed\n\nThe two interact, but **quantity cannot compensate for poor quality**. A large sample of unreliable evidence does not become reliable through volume.\n\n**Appropriateness — the measure of quality**, which has two distinct dimensions:\n\n**Relevance** — whether the evidence bears on the **assertion being tested**. Attending an inventory count provides strong evidence of **existence** and almost none about **valuation**. Evidence can be perfectly reliable and entirely irrelevant, which is why the assertion must be identified before the procedure is chosen.\n\n**Reliability** — how much the evidence can be trusted, which depends on its source and nature.\n\n**Factors affecting reliability**\n\n· **External is more reliable than internal.** Evidence obtained from an **independent source outside the entity** — a bank confirmation, a supplier statement, a solicitor's letter — is more reliable than evidence generated within it.\n· **Auditor-generated is more reliable than entity-provided.** Evidence the auditor obtains **directly** — observing a control operating, physically inspecting an asset, recalculating a figure — is more reliable than the same information supplied by the client.\n· **Evidence from an entity with effective controls is more reliable.** Internally generated evidence is more reliable where the related **controls over its preparation** operate effectively.\n· **Written is more reliable than oral.** A written representation is more reliable than a verbal statement, and **enquiry alone is never sufficient** — ISA 500 requires it to be corroborated.\n· **Original documents are more reliable than photocopies, facsimiles or scans**, which may have been altered.\n\n**One further point.** Evidence is **more persuasive when items from different sources, or of a different nature, are consistent**. Corroboration between independent sources gives greater assurance than either would alone — and an **inconsistency** between sources is itself important information the auditor must investigate.",
    earns: [
      "Separating sufficiency (quantity) from appropriateness (quality)",
      "Splitting appropriateness into relevance and reliability as two distinct dimensions",
      "Giving the reliability hierarchy as clear contrasts",
      "Knowing enquiry alone is not sufficient evidence",
    ],
    loses: [
      "Treating 'sufficient appropriate' as a single undivided concept",
      "Omitting relevance and writing only about reliability",
      "Suggesting a larger sample can compensate for unreliable evidence",
    ],
  },

  "AA-15::assertion-first": {
    title: "Working assertion-first when designing procedures",
    format: "written",
    marks: 8,
    requirement:
      "For each of the following assertions, describe TWO substantive procedures the auditor would perform in respect of the balance stated.\n\n(i)   Existence of trade receivables\n(ii)  Completeness of trade payables\n(iii) Valuation of inventory\n(iv)  Rights and obligations of property, plant and equipment (8 marks)",
    plan: [
      {
        step: "Read this as eight separate one-mark procedures",
        detail:
          "Four assertions, two procedures each. There are no introduction marks and no discussion marks. Write eight procedures and nothing else.",
      },
      {
        step: "Let the assertion dictate the DIRECTION of the test",
        detail:
          "EXISTENCE and RIGHTS are tested from the RECORDS OUTWARDS — start with the recorded balance and find evidence it is real. COMPLETENESS is tested from OUTSIDE THE RECORDS INWARDS — start with a source document or an external record and check it reached the ledger. Getting this backwards is the single largest error in the whole area.",
      },
      {
        step: "Choose the most reliable evidence available for each assertion",
        detail:
          "For existence of receivables, EXTERNAL CONFIRMATION is the strongest evidence there is. For completeness of payables, SUPPLIER STATEMENTS and post year-end payments are external and therefore stronger than anything in the client's own ledger.",
      },
      {
        step: "Write each with the four ingredients",
        detail:
          "Verb, sample, source document, purpose. 'Inspect the title deeds for a sample of properties and agree the registered owner to the client company, to confirm the entity holds the rights to the asset.'",
      },
    ],
    answer:
      "**(i) Existence of trade receivables**\n\n· **Perform a receivables circularisation**: with the client's permission, send **direct confirmation requests** to a sample of customers asking them to confirm the balance owed at the year end, and **investigate all differences and non-replies**. External confirmation is the strongest evidence of existence available.\n· **Inspect cash received after the year end** from a sample of receivables balances, agreeing the receipt to the remittance advice and bank statement, since **payment by the customer confirms the debt existed** at the year end.\n\n**(ii) Completeness of trade payables**\n\n· **Obtain supplier statements** for a sample of suppliers — including major suppliers with **nil or low balances**, which are the ones most likely to be understated — and **reconcile them to the payables ledger**, investigating all reconciling items.\n· **Review payments made after the year end** and inspect the supporting invoices and goods received notes to determine whether any relate to goods or services **received before the year end**; confirm that any such amounts are **included in year-end payables**. Also review unmatched goods received notes at the year end for unrecorded liabilities.\n\n**(iii) Valuation of inventory**\n\n· For a sample of inventory items, **agree the cost** used in the valuation to a **recent purchase invoice**, confirming it is the appropriate cost under IAS 2 and includes the costs of conversion for work in progress and finished goods.\n· For the same sample, **compare cost with net realisable value** by inspecting **post year-end sales invoices or the current price list**, less any costs to complete and sell, and confirm the item is stated at the **lower** of the two; review the inventory ageing for **slow-moving or damaged** items identified at the count and confirm they have been written down.\n\n**(iv) Rights and obligations of property, plant and equipment**\n\n· **Inspect the title deeds or land registry entries** for a sample of properties and **agree the registered owner** to the client company, confirming the entity holds the rights to the asset.\n· **Inspect purchase invoices and vehicle registration documents** for a sample of additions, agreeing them to the client's name, and **review lease agreements and loan documentation** to identify any assets held under lease or subject to a **charge**, and confirm these are appropriately accounted for and disclosed.\n\n**The principle running through all eight.** The assertion determines the **direction** of the test. Existence and rights are tested by starting with the **recorded balance** and seeking evidence it is genuine. Completeness is tested by starting **outside the accounting records** — a supplier statement, a post year-end payment, a goods received note — and confirming the item reached the ledger. Testing completeness from the ledger outwards is impossible in principle: an item that was never recorded cannot be selected from the records.",
    earns: [
      "Two performable procedures for each of the four assertions",
      "Testing completeness from outside the records inwards",
      "Selecting suppliers with nil or low balances for the payables test",
      "Choosing the most reliable evidence available, such as external confirmation for existence",
    ],
    loses: [
      "Testing completeness of payables by selecting from the payables ledger",
      "Procedures that do not name the source document, so they could not be performed",
      "Writing an explanation of each assertion instead of procedures",
    ],
  },

  /* ── AA-16 · Procedures, sampling and CAATs ─────────────────────── */

  "AA-16::procedures": {
    title: "The seven types of audit procedure",
    format: "mtq",
    marks: 10,
    requirement:
      "Identify the type of audit procedure described in each of the following.\n\n(1) The auditor watches the client's staff carrying out the inventory count.\nA  Inspection  B  Observation  C  Enquiry  D  Reperformance\n\n(2) The auditor writes to the client's bank asking it to confirm the balances held at the year end.\nA  Inspection  B  External confirmation  C  Enquiry  D  Recalculation\n\n(3) The auditor independently checks the arithmetical accuracy of the depreciation schedule.\nA  Recalculation  B  Reperformance  C  Analytical procedures  D  Inspection\n\n(4) The auditor prepares the bank reconciliation again from the underlying records, to establish whether the client's version is correct.\nA  Recalculation  B  Reperformance  C  Inspection  D  Observation\n\n(5) The auditor compares this year's gross margin with last year's and with the budget, and investigates the difference.\nA  Enquiry  B  Inspection  C  Analytical procedures  D  Recalculation",
    plan: [
      {
        step: "Learn the seven as a set, since a question can ask for any of them",
        detail:
          "INSPECTION (of records and documents, or of tangible assets), OBSERVATION, EXTERNAL CONFIRMATION, RECALCULATION, REPERFORMANCE, ANALYTICAL PROCEDURES and ENQUIRY. Seven, not six — and 'inspection' covers two quite different things.",
      },
      {
        step: "Separate recalculation from reperformance, which is the pair most often confused",
        detail:
          "RECALCULATION checks the ARITHMETICAL ACCURACY of something the client has produced. REPERFORMANCE means the auditor INDEPENDENTLY EXECUTES a procedure or control that the client performed — doing the whole thing again, not just checking the arithmetic.",
      },
      {
        step: "Note the limitation attached to each, since written questions ask for it",
        detail:
          "OBSERVATION is limited to the moment observed, and people behave differently when watched. ENQUIRY alone is never sufficient and must be corroborated. EXTERNAL CONFIRMATION is the most reliable but depends on a reply being received and on the auditor controlling the process.",
      },
      {
        step: "Remember that inspection covers both documents and assets",
        detail:
          "Inspecting a purchase invoice is inspection of a RECORD. Inspecting a machine on the factory floor is inspection of a TANGIBLE ASSET. The second gives strong evidence of EXISTENCE but none of RIGHTS or VALUATION — the entity may be leasing it or holding it for a third party.",
      },
    ],
    answer:
      "**(1) B — Observation.** Watching a process or procedure being performed by others. *Limitation:* it provides evidence only **at the moment it is observed**, and staff may perform the procedure more carefully because the auditor is present.\n\n**(2) B — External confirmation.** Audit evidence obtained as a **direct written response to the auditor from a third party**. The most reliable form of evidence available, provided the auditor **controls the process** — sending the requests and receiving replies directly, never through the client.\n\n**(3) A — Recalculation.** Checking the **arithmetical accuracy** of documents or records the client has prepared.\n\n**(4) B — Reperformance.** The auditor's **independent execution** of procedures or controls that were originally performed as part of the entity's internal control. The distinction from recalculation is the scope of what is redone: recalculation checks the arithmetic; **reperformance does the whole procedure again**.\n\n**(5) C — Analytical procedures.** Evaluations of financial information through **analysis of plausible relationships** among financial and non-financial data, **including the investigation** of identified fluctuations.\n\n**The seven procedures in full**\n\n| Procedure | What it is |\n|---|---|\n| **Inspection of records or documents** | Examining records, internal or external, in paper or electronic form |\n| **Inspection of tangible assets** | Physical examination of an asset — strong evidence of **existence**, but none of rights or valuation |\n| **Observation** | Watching a process being performed by others |\n| **External confirmation** | A direct written response to the auditor from a third party |\n| **Recalculation** | Checking the arithmetical accuracy of the client's figures |\n| **Reperformance** | Independently executing a procedure or control the client performed |\n| **Analytical procedures** | Evaluating plausible relationships, and investigating differences |\n| **Enquiry** | Seeking information from knowledgeable persons — **never sufficient on its own**, and must be corroborated |",
    earns: [
      "Distinguishing recalculation (arithmetic) from reperformance (the whole procedure again)",
      "Knowing external confirmation must be controlled by the auditor throughout",
      "Attaching the limitation to observation and to enquiry",
      "Recognising inspection of a tangible asset proves existence but not rights or valuation",
    ],
    loses: [
      "Treating recalculation and reperformance as the same procedure",
      "Classifying a comparison of margins as enquiry or inspection",
      "Forgetting that inspection covers both documents and physical assets",
    ],
  },

  "AA-16::sampling": {
    title: "Audit sampling: methods, risks and how sample size is set",
    format: "written",
    marks: 6,
    requirement:
      "Explain what is meant by audit sampling, describe the methods of selecting a sample, and explain the factors that affect sample size. (6 marks)",
    plan: [
      {
        step: "Define sampling by the conclusion it supports",
        detail:
          "Applying procedures to LESS THAN 100% of the items in a population, such that all sampling units have a chance of selection, in order to draw a conclusion ABOUT THE WHOLE POPULATION. The conclusion about the population is the point — otherwise it is just testing some items.",
      },
      {
        step: "Give the selection methods with a one-line description each",
        detail:
          "RANDOM (every item an equal chance, using random number generation), SYSTEMATIC (every nth item from a random start), MONETARY UNIT SAMPLING (value-weighted, so larger items are more likely to be selected), HAPHAZARD (no structured technique, but no conscious bias), and BLOCK (a contiguous run — generally inappropriate, since a block is unlikely to be representative).",
      },
      {
        step: "Separate the two risks, since they need different responses",
        detail:
          "SAMPLING RISK — the sample is not representative, so the conclusion differs from the one that testing the whole population would give. NON-SAMPLING RISK — the auditor reaches a wrong conclusion for any other reason: an inappropriate procedure, misinterpreting evidence, or failing to recognise a misstatement. A larger sample reduces the first and does nothing for the second.",
      },
      {
        step: "State the factors driving sample size as directional statements",
        detail:
          "Sample size INCREASES with: a higher assessed risk of material misstatement; a higher required level of assurance; a lower tolerable misstatement or tolerable rate of deviation; a higher expected misstatement; and a more heterogeneous population. It DECREASES where other substantive procedures cover the same assertion, and STRATIFICATION reduces the size needed for a given assurance.",
      },
    ],
    answer:
      "**What audit sampling is.** The application of audit procedures to **less than 100% of the items** within a population of audit relevance, such that all sampling units have a **chance of selection**, in order to provide the auditor with a reasonable basis on which to draw **conclusions about the entire population**. The conclusion about the population is what makes it sampling — testing a few items with no intention of extrapolating is not.\n\nNot everything is sampled. The auditor may test **100%** of a small population of high-value items, or **select specific items** — all items above performance materiality, or all unusual or high-risk items. Selecting specific items is **not sampling**, because no conclusion can be drawn about the remainder.\n\n**Methods of selecting a sample**\n\n· **Random selection** — every item has an **equal chance** of selection, using random number generators or tables.\n· **Systematic selection** — a **constant interval** is used, with a random starting point: every 25th item. The auditor must ensure the population is not structured in a way that coincides with the interval.\n· **Monetary unit sampling** — a **value-weighted** approach in which each monetary unit is a sampling unit, so **larger items are more likely to be selected**. Well suited to testing for **overstatement**.\n· **Haphazard selection** — the auditor selects without a structured technique, but must avoid **conscious bias or predictability**. Not appropriate where statistical sampling is being used.\n· **Block selection** — a **contiguous block** of items, such as all invoices in June. Generally **inappropriate**, because a block is unlikely to be representative of the whole period, though it may be used to corroborate other evidence.\n\n**The two risks**\n\n**Sampling risk** — the risk that the auditor's conclusion based on the sample **differs from the conclusion that testing the whole population would give**, because the sample was not representative. It is reduced by **increasing the sample size**.\n\n**Non-sampling risk** — the risk that the auditor reaches an erroneous conclusion for **any other reason**: using an inappropriate procedure, misinterpreting the evidence, or failing to recognise a misstatement that was in front of them. A larger sample does **nothing** for this; it is addressed by **planning, direction, supervision and review**.\n\n**Factors affecting sample size**\n\n| Sample size **increases** where | |\n|---|---|\n| The assessed **risk of material misstatement** is higher | More assurance is needed from this procedure |\n| **Tolerable misstatement** or tolerable rate of deviation is **lower** | Less room for error is being allowed |\n| **Expected misstatement** in the population is higher | More items are needed to reach a conclusion |\n| The population is **more heterogeneous** (variable) | |\n| The auditor requires a **higher level of confidence** | |\n\nSample size **decreases** where other substantive procedures address the **same assertion**, and **stratification** — dividing the population into sub-populations of similar value — reduces the sample needed for a given level of assurance.\n\n**After testing**, the auditor must **investigate the nature and cause** of any deviations or misstatements found, **project** the misstatement over the population, and consider whether the projected misstatement, together with other uncorrected misstatements, exceeds materiality.",
    earns: [
      "Defining sampling by the conclusion drawn about the whole population",
      "Distinguishing sampling from testing 100% and from selecting specific items",
      "Separating sampling risk from non-sampling risk and knowing only one responds to sample size",
      "Giving the sample size factors with the direction of effect",
    ],
    loses: [
      "Listing selection methods with no explanation of each",
      "Suggesting a larger sample reduces non-sampling risk",
      "Omitting the factors affecting sample size, which are a third of the requirement",
    ],
  },

  "AA-16::caats": {
    title: "Computer-assisted audit techniques: test data and audit software",
    format: "written",
    marks: 8,
    requirement:
      "Explain what is meant by computer-assisted audit techniques (CAATs), distinguishing between test data and audit software, and describe the advantages and disadvantages of using them. (8 marks)",
    plan: [
      {
        step: "Split the answer into the two techniques and then the two lists",
        detail:
          "Test data, audit software, advantages, disadvantages. Roughly two marks each. Both techniques and both lists are required, and an answer covering only audit software will lose about a quarter of the marks.",
      },
      {
        step: "Define test data by what it tests: CONTROLS",
        detail:
          "Data input by the auditor into the client's system to test whether its PROGRAMMED CONTROLS operate correctly. The auditor inputs both VALID and INVALID data — an invalid employee number, a negative quantity, an order exceeding a credit limit — and checks the system rejects what it should.",
      },
      {
        step: "Define audit software by what it does: INTERROGATES DATA",
        detail:
          "Programs used to examine the client's DATA files — casting the ledger, reperforming the ageing of receivables, selecting samples, identifying exceptions such as balances over the credit limit or negative inventory quantities, spotting duplicates and gaps in sequences, and recalculating depreciation on every asset.",
      },
      {
        step: "Give advantages that follow from the machine doing the work",
        detail:
          "100% of a population can be tested rather than a sample; results are accurate and consistent; large volumes are processed quickly; independent evidence is obtained about the system rather than about printouts the client produced; and once set up, the routines can be reused each year.",
      },
      {
        step: "Give disadvantages that are practical and honest",
        detail:
          "Set-up cost and time, and the need for specialist skills; a risk of CORRUPTING the client's live files with test data; the client's systems may be incompatible or change year to year; live systems can only be interrupted at inconvenient times; and audit software gives no assurance about the completeness of the data files it reads.",
      },
    ],
    answer:
      "**What CAATs are.** The use of **computers to perform audit procedures**, principally by testing the client's systems directly or by interrogating the data they hold. They fall into two categories with quite different purposes.\n\n**Test data — used to test CONTROLS**\n\nData is **input by the auditor into the client's system** to determine whether the system's **programmed controls** operate correctly. The auditor deliberately includes **invalid data** to check that it is rejected:\n\n· an **invalid employee number** on a payroll input, to confirm the system rejects it\n· an order for a customer that would **exceed the credit limit**, to confirm it is flagged or blocked\n· a **negative quantity** or an impossible date, to test range and validity checks\n· a purchase order **above the authorised limit** of the user entering it\n\nBoth valid and invalid items are used, and the results are compared with the **expected outcome**. Test data may be run on a **copy** of the system, or on the live system — in which case the auditor must ensure the test entries are **fully removed afterwards**, since leaving dummy transactions in live records would corrupt the client's data.\n\n**Audit software — used to perform SUBSTANTIVE procedures**\n\nComputer programs used by the auditor to **examine the client's data files**. Typical uses:\n\n· **casting** the receivables or payables ledger and agreeing it to the control account\n· **reperforming the ageing** of the receivables listing, which is the basis for the allowance\n· **selecting a sample** for testing, on a random or monetary-unit basis\n· producing **exception reports** — balances exceeding credit limits, negative inventory quantities, items with no movement for twelve months, unusually large or round-sum entries\n· identifying **gaps in sequences** of invoices or goods despatched notes, and **duplicate** payments or invoices\n· **recalculating** depreciation, discounts or interest on the whole population\n\n**Advantages**\n\n· **The whole population can be tested** rather than a sample, eliminating sampling risk for that procedure.\n· **Results are accurate and consistent** — the software does not tire, lose concentration or make arithmetical errors.\n· **Large volumes of data are processed very quickly**, which would be impossible manually.\n· It provides evidence about the **system and the underlying data** rather than about printouts the client has produced, which the client could have manipulated.\n· **Cost-effective over time**: once written and tested, routines can be **reused in subsequent years** with little additional effort.\n· It allows the audit team to concentrate its time on **judgemental areas** rather than on routine checking.\n\n**Disadvantages**\n\n· **Set-up cost and time** are significant, particularly in the first year, and may not be justified for a small client.\n· **Specialist skills are required** to design and run the techniques, and the firm may need IT audit specialists.\n· **Risk of corrupting the client's systems** — test data run on live files may leave dummy transactions in the records if not properly removed.\n· The client's system may be **incompatible** with the audit software, or may **change** between years, requiring the routines to be rewritten.\n· **Live systems can often only be interrupted** outside working hours, restricting when the work can be done.\n· Audit software tests the data files **as they are** — it gives no assurance that those files are **complete**, so evidence about completeness must come from elsewhere.\n· The client may be **reluctant** to allow access to live systems for security reasons.",
    earns: [
      "Distinguishing test data (tests controls) from audit software (substantive interrogation of data)",
      "Giving concrete examples of each, including invalid test data",
      "Advantages and disadvantages as separate lists of discrete points",
      "Noting the risk of corrupting live files and the need to remove test entries",
    ],
    loses: [
      "Describing audit software only, and omitting test data",
      "Giving examples that do not distinguish the two techniques",
      "Omitting the disadvantages, which carry about a quarter of the marks",
    ],
  },

  /* ── AA-17 · Auditing receivables and inventory ─────────────────── */

  "AA-17::receivables": {
    title: "Substantive procedures for trade receivables",
    format: "written",
    marks: 10,
    requirement:
      "Describe substantive procedures the auditor should perform to obtain sufficient appropriate audit evidence in respect of a company's trade receivables balance, including the allowance for irrecoverable debts. (10 marks)",
    plan: [
      {
        step: "Ten marks means ten procedures — write a list and nothing else",
        detail:
          "There are no marks for an introduction, for explaining the risks around receivables, or for a conclusion. Each valid procedure is one mark. A candidate who writes two paragraphs of context and six procedures has spent a quarter of their time earning nothing.",
      },
      {
        step: "Work through the assertions to generate procedures systematically",
        detail:
          "EXISTENCE (circularisation, after-date cash), COMPLETENESS (cast and agree to control account), VALUATION (allowance testing, ageing, credit notes), RIGHTS (factoring or assignment), CUT-OFF (despatches around the year end), PRESENTATION (current asset, related party balances disclosed). The assertions guarantee ten procedures without straining.",
      },
      {
        step: "Give the circularisation its full procedure, including what happens next",
        detail:
          "It is worth several marks if written properly: obtain client permission, select the sample, send requests CONTROLLED BY THE AUDITOR, follow up non-responses, investigate differences, and perform ALTERNATIVE PROCEDURES where no reply is received. Simply writing 'circularise receivables' is one mark.",
      },
      {
        step: "Treat the allowance as its own set of procedures",
        detail:
          "The requirement names it explicitly. Review the aged listing for old balances, inspect post year-end cash receipts, inspect correspondence with customers in dispute or administration, discuss specific balances with the credit controller, and compare the allowance as a percentage of receivables with the prior year.",
      },
      {
        step: "Write each procedure with a verb and a source",
        detail:
          "'Inspect', 'agree', 'cast', 'recalculate', 'confirm', 'review'. Never 'check' or 'ensure'. Name the document — the remittance advice, the goods despatched note, the aged receivables listing.",
      },
    ],
    answer:
      "**Existence and accuracy**\n\n· **Perform a receivables circularisation.** Obtain **management's permission**, select a sample of balances including large, old and nil balances, and send **confirmation requests** to customers. The auditor must **control the process throughout** — sending the requests and receiving replies directly, never via the client.\n· **Follow up non-responses** with a second request and, where still no reply is received, perform **alternative procedures**: inspect **cash received after the year end**, and inspect the **goods despatched notes and sales invoices** making up the balance.\n· **Investigate all differences** disclosed by the circularisation, distinguishing timing differences such as cash or goods in transit from genuine **misstatements or disputed amounts**.\n· **Inspect cash received after the year end** for a sample of balances and agree it to the remittance advice and the bank statement, since payment confirms the debt existed.\n\n**Completeness and accuracy of the ledger**\n\n· **Cast the aged receivables listing** and **agree the total to the sales ledger control account and to the trial balance and financial statements**.\n· **Agree a sample of individual balances** from the aged listing to the sales ledger, and vice versa.\n\n**Valuation — the allowance for irrecoverable debts**\n\n· **Review the aged receivables listing** for **old or overdue balances**, and discuss with the **credit controller** whether an allowance is required for each significant one.\n· **Inspect post year-end cash receipts** for old balances, since a balance settled after the year end does not require an allowance.\n· **Inspect correspondence** with customers, and any documentation relating to customers in **dispute, liquidation or administration**, to assess recoverability.\n· **Review credit notes issued after the year end** to identify amounts relating to pre year-end sales that may indicate the receivable is not recoverable.\n· **Recalculate the allowance** and compare it, as a **percentage of receivables**, with the prior year, investigating significant movements; and compare **receivables days** with the prior year for evidence of deteriorating collection.\n\n**Cut-off**\n\n· **Select a sample of goods despatched notes** raised **shortly before and shortly after the year end** and agree them to sales invoices and to the correct accounting period, confirming revenue and receivables are recorded in the right year.\n\n**Rights and obligations, and presentation**\n\n· **Review the terms of any factoring or invoice discounting arrangement**, and confirm whether the receivables have been **sold or assigned**, and whether the risks and rewards have transferred, so the accounting and disclosure are correct.\n· **Review the receivables listing for credit balances**, related party balances and amounts owed by directors or staff, and confirm they are **reclassified or disclosed** appropriately rather than being netted off.",
    earns: [
      "Ten or more discrete procedures, written as a list",
      "The circularisation set out fully, including alternative procedures for non-replies",
      "A distinct block of procedures addressing the allowance, which the requirement names",
      "Every procedure carrying a verb, a source document and a purpose",
    ],
    loses: [
      "Explaining the risks around receivables instead of describing procedures",
      "Writing 'circularise receivables' as one line, when the full procedure is worth several marks",
      "Ignoring the allowance, which is explicitly part of the requirement",
      "Procedures beginning with 'check' or 'ensure'",
    ],
  },

  "AA-17::inventory": {
    title: "The inventory count, and substantive procedures for inventory",
    format: "written",
    marks: 10,
    requirement:
      "Describe the procedures the auditor should perform during attendance at a client's year-end inventory count, and the substantive procedures to confirm the valuation of inventory. (10 marks)",
    plan: [
      {
        step: "Split ten marks across the two halves the requirement names",
        detail:
          "Roughly six marks on count attendance and four on valuation, or an even split. Both halves must appear — attendance procedures alone will cap the answer at about six.",
      },
      {
        step: "Structure attendance as before, during and after",
        detail:
          "BEFORE: obtain and review the count instructions, and observe whether they are being followed. DURING: observe, perform test counts, note damaged and slow-moving items, and record cut-off information. AFTER: follow up test counts to the final sheets. The structure generates the procedures.",
      },
      {
        step: "Get the direction of the test counts right — this is the classic mark",
        detail:
          "From the COUNT SHEETS TO THE FLOOR tests EXISTENCE (the recorded item is really there). From the FLOOR TO THE COUNT SHEETS tests COMPLETENESS (what is there has been recorded). Both directions must be performed, and saying which assertion each addresses is what earns the mark.",
      },
      {
        step: "Record the cut-off information at the count, because it cannot be obtained later",
        detail:
          "Note the numbers of the LAST goods received note and LAST goods despatched note before the count. These are used after the year end to test that purchases, sales, inventory and payables were recorded in the correct period. Failing to record them at the count means cut-off cannot properly be tested at all.",
      },
      {
        step: "Test valuation as the lower of cost and net realisable value, item by item",
        detail:
          "COST: agree to a recent purchase invoice; for work in progress and finished goods, confirm the costs of conversion and that no selling costs or abnormal waste are included. NRV: compare with post year-end selling prices less costs to complete and sell. Then follow up the damaged and slow-moving items identified at the count.",
      },
    ],
    answer:
      "**Procedures during attendance at the count**\n\n**Before and at the start**\n\n· **Obtain and review the client's inventory count instructions** in advance, and assess whether they are adequate — covering the organisation of the count, segregation of counted and uncounted goods, restriction of inventory movement during the count, and the use of pre-numbered count sheets.\n· **Observe whether the client's staff are following the instructions**, and report any departures to management **during** the count while they can still be corrected.\n· **Observe whether inventory movements have been suspended**, or, if goods must be moved, that movements are properly recorded.\n\n**During the count**\n\n· **Perform test counts in both directions**, and note which assertion each addresses:\n  — **from the count sheets to the physical inventory**, to confirm the recorded items **exist** and are stated at the correct quantity\n  — **from the physical inventory to the count sheets**, to confirm the items present have been **completely** recorded\n· **Inspect the inventory for damaged, obsolete or slow-moving items** — dusty, rusted or unlabelled goods, items in a quarantine area — and **record the details** for follow-up on valuation.\n· **Record the sequence of count sheets** and confirm all are accounted for, so that none can be added or removed afterwards.\n· **Identify inventory belonging to third parties**, or held on consignment or sale-or-return, and confirm it is **excluded** from the count; and identify the entity's own goods **held elsewhere**, which must be included.\n· **Record cut-off information**: the numbers of the **last goods received note** and **last goods despatched note** processed before the count. This cannot be obtained later and is essential for cut-off testing.\n· **Take copies of the completed count sheets**, so the final valuation can be compared with what was actually counted.\n\n**After the count**\n\n· **Follow up the auditor's own test counts to the final inventory listing**, confirming quantities were carried through correctly and investigating any adjustments made after the count.\n· **Agree the cut-off document numbers** to the purchases, sales and inventory records, confirming transactions were recorded in the correct period.\n\n**Substantive procedures on valuation**\n\nIAS 2 requires inventory at the **lower of cost and net realisable value**, tested **item by item** rather than in total.\n\n· **For a sample of items, agree the cost** used in the valuation to a **recent purchase invoice**, confirming the cost is complete and appropriate.\n· For **work in progress and finished goods**, obtain a **breakdown of the cost build-up** and confirm that the costs of conversion — direct labour and an appropriate share of production overheads based on **normal capacity** — are included, and that **selling costs, abnormal waste and general administrative overheads are excluded**.\n· **Compare cost with net realisable value** for a sample by inspecting **post year-end sales invoices or the current price list**, deducting any costs to complete and any selling costs, and confirming the lower figure has been used.\n· **Follow up the damaged, obsolete and slow-moving items** noted at the count, and confirm they have been **written down** to net realisable value.\n· **Review the inventory ageing report** for items with no movement in the period, and discuss the basis of any provision with management.\n· **Cast the inventory listing** and **agree the total to the financial statements**; and compare **inventory days and gross margin** with the prior year, investigating unexpected movements which may indicate misstatement.\n· For inventory held by **third parties**, obtain **direct confirmation** from the holder of the quantities held, and where material, arrange to **attend the count** at that location.",
    earns: [
      "Both halves of the requirement — count attendance and valuation",
      "Test counts in both directions, with the assertion each addresses",
      "Recording the last goods received and despatched note numbers for cut-off",
      "Valuation tested item by item as the lower of cost and net realisable value",
      "Following up the damaged items identified at the count into the valuation work",
    ],
    loses: [
      "Describing only the count and omitting valuation",
      "Test counts in one direction only, so either existence or completeness is untested",
      "Stating the auditor 'counts the inventory' — the client counts; the auditor observes and test counts",
      "Comparing total cost with total net realisable value rather than item by item",
    ],
  },

  "AA-17::count-problems": {
    title: "When the count does not go to plan",
    format: "written",
    marks: 8,
    requirement:
      "Explain the procedures the auditor should perform in each of the following situations.\n\n(i)   The client operates a perpetual inventory system and counts inventory continuously throughout the year rather than at the year end.\n(ii)  Inventory is held at eight locations and the auditor has resources to attend only two counts.\n(iii) During attendance the auditor identifies significant discrepancies between the count sheets and the physical quantities.\n(iv)  The client refuses to allow the auditor to attend the inventory count. (8 marks)",
    plan: [
      {
        step: "Two marks each, four situations, and each has a distinct answer",
        detail:
          "The four are deliberately escalating — a normal alternative, a resourcing constraint, a problem found, and a scope limitation. Treating them all the same way loses most of the marks.",
      },
      {
        step: "For perpetual counting, focus on the SYSTEM rather than a single count",
        detail:
          "The auditor must be satisfied that the perpetual system is RELIABLE: all items counted at least once a year, adequate count procedures, differences investigated and the records adjusted promptly, and good levels of control. The auditor attends one of the counts during the year and reconciles the year-end balance back through recorded movements.",
      },
      {
        step: "For multiple locations, make the selection risk-based and cover the rest another way",
        detail:
          "Attend the locations with the highest VALUE or the greatest RISK. For the remainder: review count instructions and completed sheets, perform analytical procedures on site-level balances, consider using another auditor, and rotate attendance in future years.",
      },
      {
        step: "For discrepancies, investigate rather than conclude",
        detail:
          "Establish the cause with management, increase the number of test counts, and consider whether the count is sufficiently reliable to continue at all — the auditor may ask the client to RECOUNT a section or the whole population. Then consider the implications for the assessed risk and for the reliability of the perpetual records.",
      },
      {
        step: "For refusal, follow it through to the opinion — that is where the marks are",
        detail:
          "Discuss with management and explain the auditor's rights; consider whether alternative procedures could give sufficient evidence. If inventory is material and no alternative exists, this is an IMPOSABLE LIMITATION ON SCOPE imposed by MANAGEMENT: report to those charged with governance, and if the effect is material AND PERVASIVE, DISCLAIM the opinion; if material but not pervasive, a QUALIFIED 'except for' opinion.",
      },
    ],
    answer:
      "**(i) A perpetual inventory system with continuous counting**\n\nContinuous counting is acceptable, but the auditor must be satisfied that the **system itself is reliable**:\n\n· **Review the client's counting programme** to confirm that **all inventory lines are counted at least once a year**, and that high-value or high-risk items are counted more frequently.\n· **Attend at least one of the counts** during the year, performing test counts in both directions as at a year-end count.\n· **Review the level of discrepancies** identified by the client's own counts, and confirm that differences are **investigated and the inventory records adjusted promptly**.\n· **Confirm that controls over the perpetual records are effective**, since the year-end figure comes from the records rather than from a count.\n· **Reconcile the year-end inventory balance** back to the most recent counts by testing the **recorded movements** in between, and perform **analytical procedures** on the year-end figure.\n\n**(ii) Inventory held at eight locations, with attendance possible at two**\n\n· **Select the locations on a risk basis** — the highest **value** sites, those with a **history of discrepancies**, and those where controls are weakest — rather than for convenience.\n· For the locations not visited: **review the count instructions** used, obtain and **inspect the completed count sheets**, and confirm the results were properly incorporated into the final listing.\n· **Perform analytical procedures** on inventory by location, comparing with prior periods and investigating unexpected variations.\n· Consider **requesting the client to arrange the counts on different dates** so more can be attended, or **engaging another auditor** to attend on the firm's behalf.\n· **Rotate the locations attended** in future years, so that all sites are visited over a period and the client cannot predict which will be visited.\n\n**(iii) Significant discrepancies identified during attendance**\n\n· **Discuss the discrepancies with management** immediately and establish the **cause** — a counting error, goods moved during the count, a cut-off problem, or a misstatement in the underlying records.\n· **Increase the number of test counts** performed, to assess whether the problem is isolated or systematic.\n· **Request that the client recounts** the affected section, or the whole population if the errors are widespread, and **attend the recount**.\n· **Reassess the reliability of the count as a whole** — if it cannot be relied upon, the auditor should consider whether the count should be **halted and rearranged**.\n· **Consider the wider implications**: the assessed risk of material misstatement for inventory should be **increased**, the reliability of the entity's inventory records is called into question, and the deficiency should be **reported to management** and those charged with governance.\n\n**(iv) The client refuses to allow attendance at the count**\n\n· **Discuss the refusal with management** to establish the reason, explain the auditor's **right of access** to records and information, and seek to resolve it. Consider whether the reason given is genuine or whether it indicates something is being concealed.\n· **Escalate to those charged with governance**, explaining that attendance at the count is required by ISA 501 where inventory is material and that refusal may affect the auditor's report.\n· **Consider whether alternative procedures** could provide sufficient appropriate evidence — for example inspecting documentation of subsequent sales of inventory held at the year end. In practice, alternatives rarely provide sufficient evidence of **existence** where inventory is material.\n· If sufficient appropriate evidence **cannot** be obtained, this is an **inability to obtain sufficient appropriate audit evidence** arising from a **limitation imposed by management**, and the auditor's report must be **modified**:\n  — **material but not pervasive** → a **qualified opinion** ('except for')\n  — **material and pervasive** → a **disclaimer of opinion**\n· Because the limitation was **imposed by management**, the auditor should also consider **communicating with those charged with governance** and whether it is appropriate to **withdraw** from the engagement where the law permits.",
    earns: [
      "A distinct and appropriate answer for each of the four situations",
      "Risk-based selection of locations, with specific procedures for those not visited",
      "Investigating discrepancies and considering a recount, rather than simply reporting them",
      "Following the refusal through to the specific report modification, with both outcomes",
    ],
    loses: [
      "Giving the same generic 'perform alternative procedures' answer to all four",
      "For the refusal, stopping at 'the opinion would be modified' without saying which modification and when",
      "Treating continuous counting as automatically unacceptable",
    ],
  },

  /* ── AA-18 · Payables, bank and non-current assets ──────────────── */

  "AA-18::payables": {
    title: "Substantive procedures for payables and accruals",
    format: "written",
    marks: 8,
    requirement:
      "Describe substantive procedures the auditor should perform to obtain sufficient appropriate audit evidence in respect of a company's trade payables and accruals. (8 marks)",
    plan: [
      {
        step: "Lead with the assertion that matters here: COMPLETENESS",
        detail:
          "Receivables and assets are audited principally for OVERSTATEMENT. Payables are audited principally for UNDERSTATEMENT, because an entity wishing to flatter its position omits liabilities rather than inventing them. Every procedure should be chosen with that in mind.",
      },
      {
        step: "Put supplier statement reconciliation at the centre",
        detail:
          "It is the strongest evidence available, because the statement is EXTERNAL. Reconcile a sample of statements to the ledger and investigate all reconciling items — and select suppliers with NIL OR LOW balances as well as large ones, since a supplier owed nothing according to the ledger is exactly where an omission hides.",
      },
      {
        step: "Give the unrecorded liabilities test in full",
        detail:
          "Review payments made AFTER the year end and inspect the supporting invoices and goods received notes to identify amounts relating to goods or services received BEFORE the year end. Also review unmatched goods received notes and the unprocessed invoice file at the year end. This is the classic completeness test.",
      },
      {
        step: "Cover accruals separately, since the requirement names them",
        detail:
          "Recalculate a sample of accruals and agree to supporting documentation; compare the list of accruals with the prior year to identify any that have been OMITTED this year; and review post year-end invoices for expenses relating to the period.",
      },
    ],
    answer:
      "**The governing risk.** Trade payables are audited primarily for **understatement**. An entity presenting its position favourably omits liabilities rather than inventing them, so the key assertion is **completeness**, and the procedures below are weighted accordingly.\n\n**Completeness**\n\n· **Obtain supplier statements** for a sample of suppliers and **reconcile them to the payables ledger balances**, investigating all reconciling items such as invoices in transit, goods in transit and disputed amounts. Supplier statements are **external evidence** and are the most reliable source available.\n· **Select suppliers with nil, low or negative balances** as well as large ones — particularly **major suppliers**, since a large supplier showing a small balance is precisely where an omitted liability appears. Selecting only the largest ledger balances would test for overstatement, which is the wrong direction.\n· **Perform an unrecorded liabilities test**: review **payments made after the year end**, inspect the supporting **invoices and goods received notes**, and determine whether the goods or services were **received before the year end**. If so, confirm the liability is included in year-end payables.\n· **Review the file of unmatched goods received notes** and unprocessed purchase invoices at the year end, and confirm that a liability or accrual has been recognised for each.\n· **Enquire of management** about any **contingent or unrecorded liabilities**, and corroborate the response with board minutes and correspondence.\n\n**Accuracy, valuation and allocation**\n\n· **Cast the payables listing** and **agree the total to the purchase ledger control account** and to the trial balance and financial statements.\n· **Agree a sample of individual balances** from the listing to supplier invoices and statements.\n· **Recalculate a sample of accruals** and agree the underlying amounts to supporting documentation — invoices, contracts, rate notices or payroll records.\n\n**Accruals specifically**\n\n· **Compare the list of accruals with the prior year**, investigating any accrual present last year and **absent this year**, which may indicate an omission.\n· **Review invoices received after the year end** and identify any relating to goods or services supplied **before** it, confirming an accrual has been made.\n· **Recalculate the accrual for expenses that accrue over time** — interest, rent, utilities, holiday pay — by reference to the underlying agreement, and agree to post year-end payments.\n\n**Cut-off**\n\n· **Select a sample of goods received notes** raised **shortly before and shortly after the year end** and agree them to purchase invoices and to the correct accounting period, confirming purchases, inventory and payables are recorded in the right year.\n\n**Classification and presentation**\n\n· **Review the payables listing for debit balances**, amounts owed to related parties, and any **long-term** amounts, and confirm they are reclassified or disclosed appropriately rather than being netted off.\n· **Compare payables days** with the prior year and investigate significant movements, which may indicate understatement or a change in payment practice.",
    earns: [
      "Identifying completeness and understatement as the governing risk",
      "Selecting suppliers with nil or low balances, and explaining why",
      "The unrecorded liabilities test set out fully, using post year-end payments",
      "Separate procedures for accruals, which the requirement names",
    ],
    loses: [
      "Auditing payables as if for overstatement, by selecting the largest ledger balances only",
      "Circularising payables as the main procedure, when supplier statements are already available and cheaper",
      "Omitting accruals entirely",
    ],
  },

  "AA-18::bank": {
    title: "Substantive procedures for bank and cash",
    format: "written",
    marks: 6,
    requirement:
      "Describe substantive procedures the auditor should perform in respect of a company's bank and cash balances. (6 marks)",
    plan: [
      {
        step: "Start with the bank confirmation letter, and describe the process",
        detail:
          "Obtain the client's AUTHORITY, send the request directly to the bank, and receive the reply DIRECTLY — never through the client. It is external evidence and the single most important procedure for this balance.",
      },
      {
        step: "Remember the confirmation covers more than the balance",
        detail:
          "It confirms ALL accounts held including those the client may not have disclosed, any SECURITY OR CHARGES over assets, guarantees given, and other facilities such as overdrafts and loans. Those are disclosure and completeness points, and they are separately marked.",
      },
      {
        step: "Reperform the bank reconciliation rather than inspecting it",
        detail:
          "Cast it, agree the balance per the bank statement to the confirmation, and agree the balance per the cash book to the general ledger and the financial statements. Then test the reconciling items individually.",
      },
      {
        step: "Test the reconciling items in the direction that catches manipulation",
        detail:
          "Trace OUTSTANDING LODGEMENTS to the post year-end bank statement, confirming they cleared promptly — a long delay suggests the receipt was recorded early. Trace UNPRESENTED CHEQUES to the post year-end statement; cheques still not presented weeks later may have been recorded to reduce payables artificially and never sent.",
      },
    ],
    answer:
      "· **Obtain a bank confirmation letter** for all banks with which the client holds accounts. Obtain the client's **written authority** to approach the bank, send the request **directly**, and receive the reply **directly from the bank** — never through the client, or the evidence loses its independence.\n· **Review the bank confirmation for information beyond the balances**: **all accounts held**, including any the client has not disclosed; any **security, charges or liens** over the entity's assets; **guarantees** given; and other **facilities** such as overdrafts, loans and unused borrowing limits. These support completeness and the adequacy of **disclosure**.\n· **Obtain the year-end bank reconciliation and cast it** to confirm its arithmetical accuracy.\n· **Agree the balance per the bank statement** on the reconciliation to the **bank confirmation letter**, and **agree the balance per the cash book** to the general ledger and to the figure in the financial statements.\n· **Trace outstanding lodgements to the post year-end bank statement**, confirming they cleared **promptly** after the year end. A receipt taking an unusually long time to clear may have been **recorded before it was actually received**.\n· **Trace unpresented cheques to the post year-end bank statement**, confirming they were presented shortly after the year end. Cheques written before the year end but **still not presented weeks later** may have been recorded to reduce payables and never sent — a classic window-dressing technique.\n· **Inspect the cash book and bank statements** for **unusual items** — large or round-sum transfers close to the year end, and transfers between accounts that may represent **teeming and lading** or window dressing.\n· **Count petty cash balances** at the year end, or reconcile the balance to a count performed at another date by testing the recorded movements, and **agree the balance to the financial statements**.\n· **Review the financial statements** to confirm bank and cash balances are **correctly classified and disclosed**, that overdrafts are shown as **current liabilities** rather than netted against positive balances unless the offsetting criteria are met, and that any **restrictions** on the use of cash are disclosed.",
    earns: [
      "Describing the confirmation process, including the client's authority and direct receipt of the reply",
      "Using the confirmation for accounts, security, guarantees and facilities, not just the balance",
      "Reperforming the reconciliation and testing the reconciling items into the post year-end statement",
      "Explaining what a long-outstanding lodgement or unpresented cheque may indicate",
    ],
    loses: [
      "Sending or receiving the bank confirmation through the client",
      "Inspecting the reconciliation without testing the reconciling items, which is where manipulation sits",
      "Netting the overdraft against positive balances without considering the offsetting criteria",
    ],
  },

  "AA-18::nca": {
    title: "Substantive procedures for tangible non-current assets",
    format: "written",
    marks: 8,
    requirement:
      "Describe substantive procedures the auditor should perform in respect of a company's tangible non-current assets, including additions, disposals and depreciation. (8 marks)",
    plan: [
      {
        step: "Use the asset register reconciliation as the spine of the answer",
        detail:
          "Obtain a schedule of opening cost and accumulated depreciation, additions, disposals, depreciation charged and closing balances; cast it, agree the opening balances to last year's file and the closing balances to the general ledger and financial statements. Everything else hangs off this.",
      },
      {
        step: "Take additions, disposals and depreciation as three separate blocks",
        detail:
          "The requirement names all three, so the marker's guide will have all three. A strong answer on additions with nothing on disposals loses about a third.",
      },
      {
        step: "Test both directions between the register and the physical assets",
        detail:
          "From the ASSET REGISTER TO THE PHYSICAL ASSET tests EXISTENCE. From the PHYSICAL ASSET TO THE REGISTER tests COMPLETENESS. The same discipline as the inventory count, and it is worth stating which assertion each addresses.",
      },
      {
        step: "Cover rights separately from existence",
        detail:
          "Inspecting a machine proves it is there; it does not prove the entity owns it. Inspect TITLE DEEDS for property, registration documents for vehicles, and purchase invoices in the company's name, and review lease agreements to identify assets held under lease.",
      },
      {
        step: "Test depreciation for reasonableness as well as arithmetic",
        detail:
          "Recalculate the charge for a sample, but also assess whether the RATES AND USEFUL LIVES remain appropriate — compare with the prior year, consider profits or losses on disposal (which indicate lives that were wrong), and confirm depreciation begins when the asset is available for use.",
      },
    ],
    answer:
      "**The schedule and its agreement**\n\n· **Obtain or prepare a schedule** of tangible non-current assets showing **opening cost and accumulated depreciation, additions, disposals, the depreciation charge and closing balances**. **Cast the schedule** and cross-cast it.\n· **Agree the opening balances** to the prior year audit file and financial statements, and the **closing balances** to the general ledger, the trial balance and the disclosure note.\n\n**Additions**\n\n· **Inspect purchase invoices** for a sample of additions, agreeing the **cost, the date** and that the invoice is in the **company's name**.\n· **Confirm the expenditure is capital in nature** and correctly capitalised under IAS 16 — including directly attributable costs such as delivery, installation and testing, and **excluding** repairs, maintenance, training and administration costs, which should be expensed.\n· **Inspect board minutes** for approval of significant capital expenditure, and agree additions to the **capital expenditure budget** and authorisation documentation.\n· **Physically inspect a sample of additions** to confirm they **exist** and are in use.\n\n**Existence, completeness and rights**\n\n· **Select a sample of assets from the asset register and physically inspect them** — testing **existence**, and confirming their condition.\n· **Select a sample of assets physically present at the premises and trace them to the asset register** — testing **completeness**.\n· **Inspect title deeds or land registry entries** for a sample of properties, and **registration documents** for vehicles, agreeing the owner to the company — testing **rights and obligations**.\n· **Review lease agreements** to identify assets held under lease, confirming the right-of-use asset and lease liability are correctly recognised, and **review the bank confirmation** for any **charges** over assets requiring disclosure.\n\n**Disposals**\n\n· **Obtain a schedule of disposals**, and for a sample **agree the proceeds** to sales documentation and to the **cash book and bank statement**.\n· **Recalculate the profit or loss on disposal** and agree it to the statement of profit or loss.\n· **Confirm the cost and accumulated depreciation** of disposed assets have been **removed from the register** and the schedule.\n· **Review the asset register for assets no longer held or in use**, and confirm they have been disposed of or written off; **review repairs and maintenance and sundry income accounts** for evidence of unrecorded disposals.\n\n**Depreciation**\n\n· **Recalculate the depreciation charge** for a sample of assets and agree it to the schedule and to the financial statements.\n· **Confirm the depreciation policy** is applied **consistently** with the prior year, and that rates and methods are **appropriate** for the assets concerned — comparing with the prior year and with industry norms.\n· **Confirm depreciation begins when the asset is available for use**, not when it is purchased or when it is brought into production, and that land is **not depreciated**.\n· **Review profits and losses on disposal**: consistent profits suggest useful lives are **too short** and consistent losses that they are **too long**, either of which indicates the estimate should be revised.\n· **Perform a proof in total** — applying the depreciation rate to the average asset base — and compare with the charge recorded, investigating significant differences.\n\n**Valuation, where a revaluation model is used**\n\n· **Inspect the valuer's report**, and consider the **competence, capability and objectivity** of the valuer and the **assumptions** used; confirm the **whole class** has been revalued, that the surplus is recorded in **other comprehensive income**, and that depreciation is charged on the **revalued amount**.",
    earns: [
      "Building the answer around the schedule and agreeing it in both directions",
      "Covering additions, disposals and depreciation as the requirement names",
      "Testing register-to-asset and asset-to-register, with the assertion each addresses",
      "Testing rights separately through title deeds and registration documents",
      "Assessing whether depreciation rates remain appropriate, not only recalculating them",
    ],
    loses: [
      "Testing existence only, so completeness and rights are never addressed",
      "Omitting disposals, which are explicitly part of the requirement",
      "Recalculating depreciation without considering whether the rates are still appropriate",
    ],
  },

  "AA-18::understatement-worked": {
    title: "Finding what is not there: direction of testing",
    format: "written",
    marks: 8,
    requirement:
      "Explain what is meant by the 'direction of testing', and explain why it matters. Describe FOUR procedures the auditor would perform to test the completeness of a company's revenue and liabilities, explaining the direction of each. (8 marks)",
    plan: [
      {
        step: "Define direction of testing by where the sample is SELECTED FROM",
        detail:
          "The population the auditor selects from determines what can be found. Selecting from the accounting records and tracing out to source documents can only ever confirm that what IS recorded is genuine — it tests OCCURRENCE and EXISTENCE. Selecting from source documents and tracing INTO the records tests COMPLETENESS.",
      },
      {
        step: "State the logical reason completeness cannot be tested the other way",
        detail:
          "An item that was never recorded CANNOT BE SELECTED FROM THE RECORDS. It is not a matter of effort or sample size — testing completeness from the ledger is impossible in principle, and saying this earns the explanation mark.",
      },
      {
        step: "Give two revenue procedures that start outside the sales ledger",
        detail:
          "Select from GOODS DESPATCHED NOTES and trace forward to invoices and the sales ledger. Select from the ORDER file or the production records and trace through to despatch and invoice. Both start with evidence that a sale occurred, then check it reached the accounts.",
      },
      {
        step: "Give two liability procedures that start outside the payables ledger",
        detail:
          "Select from SUPPLIER STATEMENTS (external) and reconcile to the ledger. Select from POST YEAR-END PAYMENTS and unmatched goods received notes and check whether the liability was recorded at the year end. Both start outside the client's payables records.",
      },
    ],
    answer:
      "**What direction of testing means.** It refers to the **population from which the auditor selects the sample**, and therefore to the direction in which the test runs — from the accounting records **outwards** to supporting documents, or from source documents **inwards** to the accounting records.\n\n| Direction | Tests | Detects |\n|---|---|---|\n| **Records → source documents** | Occurrence, existence | **Overstatement** — recorded items that are not genuine |\n| **Source documents → records** | **Completeness** | **Understatement** — genuine items that were never recorded |\n\n**Why it matters.** Because **an item that has never been recorded cannot be selected from the records**. If the auditor selects a sample of sales invoices from the sales day book and traces them to despatch notes, every item in the sample is by definition already recorded — no amount of testing in that direction can reveal a sale that was omitted. The same is true of liabilities: an omitted invoice is not in the payables ledger to be selected. Completeness can therefore only be tested by starting from a population that exists **independently of the accounting records**.\n\nThis is why **revenue and liabilities** — where the risk is **understatement** — are tested in the opposite direction from **receivables and assets**, where the risk is **overstatement**.\n\n**Four procedures testing completeness**\n\n**Revenue**\n\n**1. Select a sample of goods despatched notes** from the despatch department's file **and trace them forward** to sales invoices and to entries in the sales day book and sales ledger. *Direction:* source document **into** the records. This detects goods that left the premises without being invoiced, which no test starting from the sales ledger could find.\n\n**2. Inspect the sequence of pre-numbered goods despatched notes** and **investigate any gaps**, agreeing each to a sales invoice or to documentation explaining the cancellation. *Direction:* from an **independently numbered population** into the records. A missing number is evidence of an unrecorded despatch.\n\n**Liabilities**\n\n**3. Obtain supplier statements** for a sample of suppliers — including major suppliers showing **nil or low balances** in the ledger — **and reconcile them to the payables ledger**, investigating all reconciling items. *Direction:* an **external** record into the client's records. The supplier's own statement is prepared independently and will include invoices the client has not recorded.\n\n**4. Review payments made after the year end**, together with the file of **unmatched goods received notes** and unprocessed invoices at the year end, and **inspect the supporting invoices and goods received notes** to identify goods or services received **before** the year end; confirm each is included in year-end payables or accruals. *Direction:* post year-end evidence **back into** the year-end records. A liability omitted at the year end still has to be paid eventually, and this test catches it when it is.\n\n**The common feature.** Every one of the four **starts outside the balance being tested** — in the despatch department, in a numbering sequence, at the supplier, or after the year end. That is what makes them completeness tests, and it is why selecting the sample correctly matters more than the volume of work done.",
    earns: [
      "Defining direction by the population selected from, and tabulating what each direction detects",
      "Explaining that an unrecorded item cannot be selected from the records — the logical reason",
      "Four procedures that genuinely start outside the accounting records",
      "Stating the direction explicitly for each procedure, as the requirement asks",
    ],
    loses: [
      "Procedures that select from the sales ledger or payables ledger and call it a completeness test",
      "Explaining the concept but giving procedures that contradict it",
      "Omitting the direction on each procedure, which is half of the second requirement",
    ],
  },

  /* ── AA-19 · Using the work of others, and not-for-profit ───────── */

  "AA-19::internal-audit-expert": {
    title: "Using the work of internal audit, and of an auditor's expert",
    format: "written",
    marks: 8,
    requirement:
      "Explain the factors the external auditor must consider before using the work of the internal audit function, and before using the work of an auditor's expert. State the extent of the external auditor's responsibility in each case. (8 marks)",
    plan: [
      {
        step: "Answer the two in parallel and label them",
        detail:
          "Roughly four marks each. ISA 610 governs internal audit; ISA 620 governs the auditor's expert. Two separate sets of criteria, and both must be given.",
      },
      {
        step: "Give the three ISA 610 evaluation criteria precisely",
        detail:
          "OBJECTIVITY — the function's status and reporting lines, and any conflicting responsibilities. COMPETENCE — qualifications, training and experience of the staff. A SYSTEMATIC AND DISCIPLINED APPROACH — including quality control. All three must be satisfied; failing any one means the work cannot be used at all.",
      },
      {
        step: "State the limits on what internal audit's work may cover",
        detail:
          "The external auditor must use LESS of the work, and perform more directly, where the area involves MORE JUDGEMENT, a HIGHER assessed risk of material misstatement, or LESS objectivity in the function. Internal audit's work may not be used for matters involving SIGNIFICANT JUDGEMENT.",
      },
      {
        step: "Give the ISA 620 criteria and the crucial point about responsibility",
        detail:
          "Competence, capabilities and OBJECTIVITY of the expert; understanding their FIELD OF EXPERTISE sufficiently to evaluate the work; AGREEING THE SCOPE in writing; and EVALUATING THE ADEQUACY of the work — the relevance and reasonableness of findings, assumptions and source data. In BOTH cases the external auditor has SOLE RESPONSIBILITY for the opinion, and that responsibility is NOT REDUCED by using another's work.",
      },
    ],
    answer:
      "**Using the work of the internal audit function (ISA 610)**\n\nBefore using its work at all, the external auditor must **evaluate** the function against three criteria — and if **any one** is not met, the work **cannot be used**:\n\n· **Objectivity.** The function's **organisational status** and the reporting lines that support it. Does it report to **those charged with governance or the audit committee**, rather than to the finance director? Are there **conflicting responsibilities** — does it audit systems it helped design or operate? Are constraints placed on it by management?\n· **Competence.** The **qualifications, training and experience** of its staff, whether there are established policies for hiring and training, and whether the function has adequate **resources**.\n· **A systematic and disciplined approach**, including **quality control** — documented planning, supervision, review and documentation of its work.\n\n**How much of the work may be used.** The external auditor must use **less** of it, and perform **more procedures directly**, where:\n\n· the area involves **more judgement** in planning procedures, evaluating evidence or reaching conclusions\n· the assessed **risk of material misstatement** is higher, particularly for a **significant risk**\n· the function's **objectivity** is less strongly supported\n\nWork involving **significant judgements** must **not** be delegated to internal audit's work.\n\nWhere the work is used, the external auditor must **read the reports**, **evaluate whether the work was properly planned, performed, supervised, reviewed and documented**, whether sufficient appropriate evidence was obtained, and whether the conclusions reached are appropriate — and must **reperform some of the work** to confirm its adequacy.\n\n**Direct assistance** — internal auditors working under the external auditor's direction — is a separate matter, is **prohibited in some jurisdictions**, and may never be used for areas involving significant judgement or high assessed risk.\n\n**Using the work of an auditor's expert (ISA 620)**\n\nAn expert may be needed for a **valuation of property**, an **actuarial** calculation, a legal opinion, or a specialist estimate such as mineral reserves. Before using the work the auditor must consider:\n\n· the **competence, capabilities and objectivity** of the expert — professional qualifications, membership of a professional body, experience and reputation, and any **relationship with the client** that could threaten objectivity, such as a financial interest or employment\n· obtaining a **sufficient understanding of the expert's field** to be able to evaluate the work — not to perform it, but enough to assess whether it is adequate\n· **agreeing the scope in writing**, covering the nature and objectives of the work, the respective roles, the form of the report, and **confidentiality**\n\nHaving obtained the work, the auditor must **evaluate its adequacy**: the **relevance and reasonableness of the findings**, the **assumptions and methods** used and their consistency with the financial reporting framework, and the **relevance, completeness and accuracy of the source data** used.\n\n**Responsibility — the point common to both**\n\nIn **both** cases the external auditor has **sole responsibility for the audit opinion**, and that responsibility is **not reduced** by using the work of internal audit or of an expert. The auditor may **not** refer to the work of an expert in an unmodified auditor's report as a way of sharing or diluting responsibility.",
    earns: [
      "The three ISA 610 criteria, and knowing all three must be met",
      "The factors limiting how much of internal audit's work may be used",
      "The ISA 620 criteria including agreeing the scope and evaluating the source data",
      "Stating that sole responsibility for the opinion is unaffected in both cases",
    ],
    loses: [
      "Giving only competence and objectivity for internal audit and omitting the systematic approach",
      "Suggesting the auditor may rely on internal audit for areas of significant judgement",
      "Implying responsibility is shared with the expert",
    ],
  },

  "AA-19::service-orgs": {
    title: "Auditing an entity that uses a service organisation",
    format: "written",
    marks: 5,
    requirement:
      "Explain the matters the auditor should consider, and the procedures the auditor may perform, where a client uses a service organisation to process a significant part of its transactions. (5 marks)",
    plan: [
      {
        step: "State the problem the section exists to solve",
        detail:
          "Part of the client's information system and internal control is operated by ANOTHER ENTITY, which the auditor has no automatic right of access to. The transactions are still the client's and must still be audited.",
      },
      {
        step: "Give the understanding the auditor must obtain first",
        detail:
          "The NATURE AND SIGNIFICANCE of the services, their effect on the client's internal control, the materiality of the transactions processed, and the degree of interaction between the two systems. This determines how much work is needed.",
      },
      {
        step: "Distinguish the two types of assurance report, which is the technical mark",
        detail:
          "A TYPE 1 report describes the system and the SUITABILITY OF THE DESIGN of controls at a point in time. A TYPE 2 report also covers their OPERATING EFFECTIVENESS THROUGHOUT A PERIOD. Only a type 2 report provides evidence that controls actually operated, so only a type 2 supports reliance on those controls.",
      },
      {
        step: "Give the alternatives where no report is available",
        detail:
          "Visit the service organisation and perform procedures there; request the service auditor to perform procedures on the auditor's behalf; or obtain evidence entirely from the CLIENT'S OWN records — the client's reconciliation of its records to the service organisation's reports is often the strongest control available.",
      },
    ],
    answer:
      "**The problem.** Where a client outsources payroll, invoicing, or the maintenance of its accounting records, part of its **information system and internal control** is operated by **another entity**. The transactions remain the client's and must still be audited, but the auditor has **no automatic right of access** to the service organisation's systems or records.\n\n**Matters to consider**\n\n· The **nature and significance of the services** provided, and their effect on the client's internal control relevant to financial reporting.\n· The **materiality** of the transactions or balances processed by the service organisation.\n· The **degree of interaction** between the service organisation's activities and the client's own systems — the more the client processes and controls itself, the less the auditor needs from the service organisation.\n· The **nature of the relationship**, including the **contractual terms**, and what records the client retains itself.\n· The **controls operated by the client** over the service organisation's work — in particular whether the client **reconciles** its own records to the reports it receives, and reviews them for reasonableness.\n\n**Procedures the auditor may perform**\n\n· **Obtain and read the contract** and any service level agreement between the client and the service organisation.\n· **Obtain a type 1 or type 2 assurance report** from the service auditor, and evaluate the **competence and independence** of the firm that issued it:\n  — a **type 1 report** describes the system and the **suitability of the design** of controls **at a point in time**\n  — a **type 2 report** covers the design **and the operating effectiveness of controls throughout a period**\n  Only a **type 2** report provides evidence that the controls **actually operated**, so only a type 2 supports reliance on them.\n· **Visit the service organisation** and perform tests of control there, with the client's and the service organisation's agreement.\n· **Request that the service auditor performs procedures** on the auditor's behalf.\n· **Obtain evidence from the client's own records** wherever possible — testing the client's **reconciliations** of its records to the reports received from the service organisation, which is often the most effective and most accessible control.\n· Where **sufficient appropriate evidence cannot be obtained** about the transactions processed, and the amounts are material, the auditor faces an **inability to obtain sufficient appropriate audit evidence** and must consider **modifying the opinion**.",
    earns: [
      "Identifying that part of the client's internal control sits outside the entity",
      "Distinguishing type 1 from type 2 reports and knowing only type 2 supports reliance on operating effectiveness",
      "Giving alternatives where no assurance report exists",
      "Following through to a possible modification where evidence cannot be obtained",
    ],
    loses: [
      "Treating a type 1 report as evidence that controls operated effectively",
      "Assuming the auditor has an automatic right of access to the service organisation",
    ],
  },

  "AA-19::nfp": {
    title: "Auditing a not-for-profit organisation",
    format: "written",
    marks: 6,
    requirement:
      "Explain the particular difficulties the auditor faces when auditing a small not-for-profit organisation, and describe how the auditor addresses them. (6 marks)",
    plan: [
      {
        step: "Lead with the difficulty that dominates: COMPLETENESS OF INCOME",
        detail:
          "Cash donations, street collections and fundraising receipts enter the organisation with NO DOCUMENTATION AT ALL. An unrecorded donation leaves no trace anywhere in the records, so no amount of testing the records will find it. This is an INHERENT LIMITATION, not a control failure.",
      },
      {
        step: "Give the other difficulties as separate points",
        detail:
          "Reliance on VOLUNTEERS who may lack accounting training and change frequently; limited SEGREGATION OF DUTIES; trustees who are often part-time and unpaid; RESTRICTED FUNDS that must be tracked and spent for specified purposes; donated goods and services requiring valuation; and a legal and regulatory framework specific to charities.",
      },
      {
        step: "Match a response to each difficulty rather than listing responses generically",
        detail:
          "For completeness: assess the controls over cash collection, use analytical procedures against non-financial data, and consider whether a scope limitation arises. For restricted funds: inspect the terms of the donation and test expenditure against them. For volunteers: increase substantive testing.",
      },
      {
        step: "Be willing to reach the uncomfortable conclusion",
        detail:
          "Where controls over cash income are inadequate and the amounts are material, the auditor may be UNABLE TO OBTAIN SUFFICIENT APPROPRIATE EVIDENCE about completeness, and the opinion must be modified — normally a QUALIFIED opinion on that basis. This is a common and legitimate outcome for small charities, and saying so is worth a mark.",
      },
    ],
    answer:
      "**Completeness of income — the dominant difficulty**\n\nCash donations, street and house-to-house collections, and fundraising event receipts arrive with **no documentation whatsoever**. There is no order, no invoice and no despatch note, so an amount that is never recorded leaves **no trace anywhere in the accounting records**. Testing the records can never reveal what was never entered in them.\n\nThis is an **inherent limitation** of the activity rather than a failure by the organisation, which is why it is the central issue in every not-for-profit audit question.\n\n*How the auditor addresses it:*\n\n· **Evaluate and test the controls over cash collection** — the use of **sealed, pre-numbered collection tins**, **two people present** when tins are opened and counted, immediate recording of the amount counted and prompt banking, and reconciliation of amounts banked to the count records.\n· **Attend a collection count** and observe the procedures in operation.\n· **Perform analytical procedures** against **non-financial data** — comparing income per collection tin, per event or per collector with prior periods and with other similar events, and investigating unusual variations.\n· **Agree amounts banked** to the paying-in records and bank statements, and test the timing of banking.\n· Where controls are **inadequate** and the amounts material, conclude that sufficient appropriate evidence about completeness **cannot be obtained**.\n\n**Other difficulties, and the responses to them**\n\n· **Reliance on volunteers.** Staff may be untrained in accounting, work part-time and change frequently, so errors are more likely and controls operate inconsistently. *Response:* assess control risk as **high**, adopt a **substantive approach**, and increase sample sizes.\n· **Limited segregation of duties.** A small organisation may have one person handling receipts, recording and banking. *Response:* look for **compensating controls**, particularly **trustee involvement** and review, and increase substantive testing over cash.\n· **Trustees are often part-time, unpaid and non-financial.** Governance and oversight may be weak. *Response:* consider the effect on the **control environment**, and obtain evidence from **minutes of trustee meetings**.\n· **Restricted funds.** Donations given for a specified purpose must be **accounted for separately** and spent only on that purpose. *Response:* **inspect the terms of significant donations** or grant agreements, and **test expenditure charged to each fund** against those terms, confirming the fund accounting and disclosure are correct.\n· **Donated goods, services and legacies.** These require **valuation** judgements, and legacies raise difficult questions about when the entity becomes entitled to them. *Response:* review the basis of valuation and the recognition criteria applied, and inspect correspondence relating to legacies.\n· **A specific legal and regulatory framework.** Charities are subject to their own legislation and reporting requirements, and may need a **different form of report**. *Response:* obtain an understanding of the applicable framework, and confirm the financial statements comply with it.\n\n**The likely conclusion.** Where controls over cash income are weak and the income is material, the auditor may be **unable to obtain sufficient appropriate audit evidence** regarding the **completeness of income**. Where the possible effect is **material but not pervasive**, the opinion is **qualified** ('except for'); this is a common and entirely legitimate outcome for a small charity, and it is not a criticism of the trustees.",
    earns: [
      "Identifying completeness of income as the dominant difficulty and explaining why it is inherent",
      "Giving specific controls over cash collections rather than general recommendations",
      "Covering restricted funds, volunteers and the regulatory framework as separate difficulties",
      "Following through to a possible qualified opinion on completeness of income",
    ],
    loses: [
      "Writing about charities generally without addressing audit difficulties",
      "Listing difficulties with no responses attached",
      "Failing to reach the conclusion that the opinion may need to be modified",
    ],
  },

  "AA-19::charity-worked": {
    title: "A charity collection, audited",
    format: "written",
    marks: 10,
    requirement:
      "Fellgate Trust is a small charity funded principally by street collections and by donations from regular supporters. Volunteers collect cash in tins, which they return to the office when convenient. Tins are opened and counted by whichever member of staff is available, and the amount is written on a sheet and banked weekly. Regular supporters pay by standing order directly into the bank.\n\n(a) Identify and explain THREE deficiencies in the controls over Fellgate Trust's cash collections, and recommend an improvement for each. (6 marks)\n\n(b) Describe the audit procedures you would perform in respect of the completeness of Fellgate Trust's income, and explain the possible effect on your auditor's report. (4 marks)",
    plan: [
      {
        step: "Split the two parts and notice they need different answers",
        detail:
          "Part (a) is a deficiency-and-recommendation question — three pairs at two marks each. Part (b) is procedures plus a reporting conclusion. Do not merge them; the marker has two separate guides.",
      },
      {
        step: "In part (a), attack the three specific facts in the scenario",
        detail:
          "Tins returned 'when convenient' — no control over timing or over whether all tins are returned at all. Opened and counted by 'whichever member of staff is available' — one person alone, so no segregation. Banked weekly — cash held on the premises for up to a week. Each is a fact in the scenario and each is one deficiency.",
      },
      {
        step: "Recommend the standard charity controls, specifically",
        detail:
          "Pre-numbered, sealed tins issued on a register and reconciled on return. TWO people present at every count, both signing the count record. Daily banking, and reconciliation of amounts banked to the count records by someone independent.",
      },
      {
        step: "In part (b), separate the two income streams, because they are completely different",
        detail:
          "STANDING ORDERS are highly auditable — they arrive in the bank, so completeness can be tested from bank statements and from the standing order records. CASH COLLECTIONS are the problem. Saying that the two differ, and why, is what distinguishes a strong answer.",
      },
      {
        step: "Name the modification precisely, with the reason and the degree",
        detail:
          "Inability to obtain sufficient appropriate evidence over the completeness of cash income. If MATERIAL BUT NOT PERVASIVE, a QUALIFIED 'except for' opinion. Only if the effect were both material AND pervasive would a disclaimer follow — and for a charity funded principally by collections, that is a real possibility worth mentioning.",
      },
    ],
    answer:
      "**(a) Deficiencies and recommendations**\n\n**1. Collection tins are returned by volunteers 'when convenient'**\n\n*Deficiency:* There is **no control over when, or whether, tins are returned**. The Trust has no record of how many tins were issued, to whom, or which remain outstanding, so a tin could be retained or its contents removed and the loss would **never be identified**. Cash may also be held by volunteers for extended periods.\n\n*Recommendation:* Issue **pre-numbered, sealed collection tins** recorded in a **register** showing the tin number, the volunteer's name and the date issued. Require return **within a specified period** of the collection, and **reconcile the register** regularly, following up any tin not returned.\n\n**2. Tins are opened and counted by whichever member of staff is available, working alone**\n\n*Deficiency:* There is **no segregation of duties and no second person present**. A single individual has sole custody of the cash at the point at which it first enters the accounting records, so **cash could be removed before the amount is recorded** and there would be no evidence it ever existed. This is the point of greatest risk in the whole process.\n\n*Recommendation:* Require **two people to be present** whenever a tin is opened and counted, ideally one of them a **trustee or a member of staff independent of banking**. Both should **sign the count record**, and the sealed tin number should be **agreed to the register** before opening.\n\n**3. Amounts are written on a sheet and banked weekly**\n\n*Deficiency:* Cash is **held on the premises for up to a week**, creating a risk of **theft or loss**, and the record is an informal sheet rather than a controlled document. There is also no indication that the **amount banked is reconciled** to the amount counted, so a difference would go undetected.\n\n*Recommendation:* **Bank all cash intact and daily**, or as soon as practicable, and hold undeposited cash in a **safe**. Record counts on **pre-numbered count sheets**, and have someone **independent reconcile the amounts banked to the count records** and to the accounting records, evidencing the review by signature.\n\n**(b) Audit procedures on completeness of income, and the effect on the report**\n\n**Standing order income — readily auditable**\n\n· **Obtain a listing of regular supporters and their standing order amounts**, and **agree a sample to receipts on the bank statements**.\n· **Reperform a proof in total**: expected annual income from standing orders, calculated from the number of supporters and their amounts, compared with the income recorded.\n· **Review the bank statements for receipts not recorded** in the income records.\n\nBecause this income arrives **through the bank**, external evidence exists and completeness can be tested satisfactorily.\n\n**Cash collection income — the problem**\n\n· **Evaluate and test the controls** over collections, including the tin register, the counting arrangements and the banking, to determine whether any reliance is possible.\n· **Attend a count of collection tins** and observe the procedures.\n· **Agree a sample of count sheets to the paying-in book and the bank statements**, confirming amounts counted were banked intact.\n· **Perform analytical procedures**: compare income **per collection, per tin and per collector** with prior periods and with other collections, and compare total collection income with the number of collections held, investigating unusual variations.\n· **Obtain a written representation** from the trustees regarding the completeness of income — while recognising that a representation is **weak evidence** and cannot substitute for evidence that should be available.\n\n**Effect on the auditor's report**\n\nThe controls over cash collections are **inadequate**, and cash income leaves **no independent record** before it is counted. The auditor is therefore likely to be **unable to obtain sufficient appropriate audit evidence** regarding the **completeness of cash income**.\n\n· If the possible effect is **material but not pervasive**, the auditor issues a **qualified opinion** — *'except for the possible effects of the matter described...'* — with a **Basis for Qualified Opinion** paragraph explaining that evidence regarding the completeness of cash donations could not be obtained.\n· If cash collections are **so significant** to the Trust's income that the possible effect is both **material and pervasive**, a **disclaimer of opinion** would be required. Given that the Trust is funded **principally** by street collections, this is a genuine possibility and should be assessed on the figures.\n\nThe auditor should also **report the control deficiencies in writing** to the trustees, as those charged with governance.",
    earns: [
      "Three deficiency-and-recommendation pairs, each drawn from a stated fact",
      "Recommendations that are the specific charity controls — sealed numbered tins, two counters, daily banking",
      "Separating standing order income from cash collections and explaining why only one is auditable",
      "Naming the modification precisely, with both the qualified and disclaimer outcomes and when each applies",
    ],
    loses: [
      "Deficiencies with no recommendations, or generic recommendations such as 'improve controls over cash'",
      "Treating all income as equally problematic, when standing orders are readily auditable",
      "Saying the opinion 'would be modified' without naming which modification and why",
    ],
  },
}
