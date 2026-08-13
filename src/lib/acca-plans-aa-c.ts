/*
 * AA Area C — internal control: its components and limitations, recording and
 * evaluating the system, tests of control over the major cycles, and reporting
 * deficiencies to management.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area C produces the paper's other reliably large requirement: a scenario
 * describing a cycle, and an instruction to identify deficiencies, explain
 * their implications and recommend controls — very often with tests of control
 * attached. It is worth up to twenty marks and it is the most mechanical
 * requirement in AA, in the sense that the marking guide is a table and the
 * answer should be the same table.
 *
 * TWO HABITS DECIDE THE MARK, and both are about form rather than knowledge.
 *
 * First, EVERY POINT HAS THREE PARTS AND ALL THREE ARE MARKED. The deficiency
 * (what is wrong), the implication (what could therefore happen to the
 * company), and the recommendation (the control that would fix it). Candidates
 * who write "there is no authorisation of orders" have written a third of a
 * point. The implication is the part most often missing and it is the part that
 * demonstrates understanding.
 *
 * Second, A TEST OF CONTROL IS NOT A SUBSTANTIVE PROCEDURE. A test of control
 * asks whether the control OPERATED; a substantive procedure asks whether the
 * BALANCE is right. "Inspect a sample of purchase orders for evidence of
 * authorisation" tests a control. "Trace a sample of orders to the payables
 * ledger" tests completeness of a balance. Requirements ask for one or the
 * other and answering with the wrong type scores nothing, however well written.
 *
 * Every plan in this file therefore fixes the structure before the content, and
 * the procedures are written with a verb the auditor can actually perform —
 * inspect, observe, reperform, enquire — never "check" or "ensure", which
 * describe an intention rather than an action.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const AA_PLANS_C: ExamPlanMap = {
  /* ── AA-11 · Internal control systems and their components ──────── */

  "AA-11::components": {
    title: "The five components of a system of internal control",
    format: "written",
    marks: 6,
    requirement:
      "Describe the five components of an entity's system of internal control, and explain why the auditor obtains an understanding of each. (6 marks)",
    plan: [
      {
        step: "Name all five before describing any",
        detail:
          "The control environment; the entity's risk assessment process; the entity's process to monitor the system of internal control; the information system and communication; and control activities. Five components, and each is separately marked — a long description of two will not reach six marks.",
      },
      {
        step: "Describe the control environment as attitudes rather than procedures",
        detail:
          "It is the governance and management functions, and the ATTITUDES, AWARENESS AND ACTIONS of those charged with governance and management concerning internal control. Commitment to integrity and ethical values, competence, and the assignment of authority and responsibility. It is the foundation the other four sit on — a weak environment undermines even well-designed control activities.",
      },
      {
        step: "Keep control activities concrete, since that is where examples belong",
        detail:
          "Authorisation, performance reviews, information processing, physical controls over assets and records, and SEGREGATION OF DUTIES. These are the policies and procedures that address specific risks, and they are what a scenario question is usually describing.",
      },
      {
        step: "Attach the audit purpose to each, because the requirement asks why",
        detail:
          "The understanding lets the auditor identify types of potential misstatement, consider factors affecting the risk of material misstatement, and DESIGN FURTHER AUDIT PROCEDURES. Where controls appear effective the auditor may test them and reduce substantive work; where they do not, a fully substantive approach is required.",
      },
    ],
    answer:
      "**1. The control environment.** The governance and management functions, and the **attitudes, awareness and actions** of those charged with governance and management concerning internal control. It includes the entity's commitment to **integrity and ethical values**, its commitment to **competence**, the participation of those charged with governance, management's philosophy and operating style, the organisational structure, and the **assignment of authority and responsibility**.\n\n*Why the auditor understands it:* it is the **foundation** for the other components. A weak control environment — a dominant chief executive, a culture that tolerates shortcuts — undermines even well-designed control activities, and increases the risk of **management override**.\n\n**2. The entity's risk assessment process.** How the entity **identifies business risks** relevant to financial reporting, estimates their significance, assesses their likelihood, and decides how to address them.\n\n*Why:* if the entity has identified a risk the auditor has not, that is important information. If the entity has **failed to identify** a risk the auditor considers significant, that is itself an indicator of a **deficiency** in the process.\n\n**3. The entity's process to monitor the system of internal control.** How the entity **assesses the effectiveness of controls over time** and takes remedial action — through ongoing monitoring built into operations, separate evaluations such as **internal audit**, or both.\n\n*Why:* controls that are never monitored **degrade**. A strong monitoring process, particularly an effective internal audit function, supports greater reliance on the system as a whole.\n\n**4. The information system and communication.** The procedures and records used to **initiate, record, process and report** transactions and to maintain accountability for assets and liabilities — including the accounting system, the classes of transactions significant to the financial statements, and how **roles and responsibilities are communicated**.\n\n*Why:* the auditor must understand **how a transaction flows** from initiation to the financial statements in order to know where a misstatement could enter, and to design procedures that would detect it.\n\n**5. Control activities.** The **policies and procedures** that help ensure management's directives are carried out — **authorisation**, **performance reviews and reconciliations**, **information processing controls** including application and general IT controls, **physical controls** over assets and records, and **segregation of duties**.\n\n*Why:* these are the controls the auditor may **test** if intending to rely on them. Where they are effective, tests of control allow substantive procedures to be reduced.\n\n**The overall purpose.** The understanding enables the auditor to **identify types of potential misstatement**, consider the factors affecting the risk of material misstatement, and **design the nature, timing and extent of further audit procedures**.",
    earns: [
      "Naming and describing all five components",
      "Describing the control environment as attitudes and awareness, not as procedures",
      "Attaching an audit purpose to each component, which the requirement asks for",
      "Identifying control activities as the ones the auditor may test and rely on",
    ],
    loses: [
      "Giving only control activities, which is one component of five",
      "Listing components with no explanation of why the auditor needs the understanding",
    ],
  },

  "AA-11::limitations": {
    title: "The inherent limitations of any internal control system",
    format: "written",
    marks: 5,
    requirement:
      "Explain the inherent limitations of an entity's system of internal control, and state what these limitations mean for the auditor. (5 marks)",
    plan: [
      {
        step: "Give the limitations as separate points, each with a consequence",
        detail:
          "Five marks means about five points. Human error, collusion, management override, cost against benefit, and controls designed for routine transactions failing on non-routine ones. Each is one mark, so brevity per point is correct here.",
      },
      {
        step: "Put management override at the centre",
        detail:
          "It is the limitation no control can overcome, because management designs and operates the system and can therefore circumvent it. This is precisely why ISA 240 requires the auditor to treat management override as a SIGNIFICANT RISK on every audit — linking this section to Area B is worth a mark.",
      },
      {
        step: "Include cost-benefit, which candidates often overlook",
        detail:
          "A control is only implemented where its benefit exceeds its cost. Management may knowingly accept a risk rather than pay to control it, which is a rational decision and not a failing — but it means the system will never be complete.",
      },
      {
        step: "Draw the audit consequence explicitly",
        detail:
          "Internal control can only provide REASONABLE, not absolute, assurance. So the auditor can never rely on controls alone — SOME SUBSTANTIVE PROCEDURES ARE ALWAYS REQUIRED for each material class of transactions, balance and disclosure, however strong the controls appear.",
      },
    ],
    answer:
      "**Human error.** Controls are operated by people, who make mistakes through carelessness, distraction, fatigue or simple misunderstanding of their instructions. A reconciliation performed carelessly provides no assurance while appearing to have been performed.\n\n**Collusion.** **Segregation of duties** — the strongest of all control activities — works only while the individuals concerned act independently. Two or more people acting together can **circumvent** it, and collusion is by design difficult to detect because the records will appear internally consistent.\n\n**Management override.** Management designs and operates the system, and is therefore uniquely able to **override** it — instructing staff to process an unauthorised transaction, or posting a journal that bypasses the normal controls entirely. **No control system can prevent this**, which is exactly why ISA 240 requires the auditor to treat the risk of management override as a **significant risk on every audit**.\n\n**Cost against benefit.** Management implements a control only where the **benefit exceeds the cost**. Some risks are knowingly accepted because controlling them would cost more than the exposure. That is a rational commercial judgement, but it means the system will never address every risk.\n\n**Non-routine transactions.** Controls are designed for **routine, anticipated** transactions. One-off, unusual or complex transactions may fall outside the system's design, and are also the transactions most likely to be materially misstated.\n\n**Controls becoming outdated.** A system may cease to be appropriate as the business changes — new products, new systems, growth — so a control that was effective becomes ineffective without anyone deciding to remove it.\n\n**What this means for the auditor**\n\n· Internal control can provide only **reasonable, not absolute, assurance** about the reliability of financial reporting. This is one reason an audit itself cannot give absolute assurance.\n· Therefore, however effective the controls appear, the auditor **can never rely on them alone**. ISA 330 requires **substantive procedures for each material class of transactions, account balance and disclosure**, irrespective of the assessed risk.\n· The auditor must **always** address the risk of **management override**, regardless of the assessment of the control environment.\n· Where controls are found not to be operating effectively, the auditor must **revert to a fully substantive approach** for the affected area.",
    earns: [
      "Five or more distinct limitations, each briefly explained",
      "Identifying management override as the limitation no control can overcome, and linking it to ISA 240",
      "Concluding that some substantive procedures are always required",
    ],
    loses: [
      "Developing two limitations at length and reaching only two marks",
      "Suggesting a strong control system removes the need for substantive testing",
    ],
  },

  "AA-11::components-in-a-scenario": {
    title: "Reading a scenario for the components of internal control",
    format: "written",
    marks: 8,
    requirement:
      "Brackenhurst Co is an owner-managed distributor. The managing director personally approves all purchases over $5,000 and reviews monthly management accounts against budget, investigating variances. There is no internal audit function and no formal process for identifying business risks; the managing director states that he 'knows the business well enough'. The accounting system is a standard package used by three staff, who share a single login. Bank reconciliations are prepared monthly by the bookkeeper and are not reviewed by anyone.\n\nUsing the components of internal control, evaluate the strengths and deficiencies in Brackenhurst Co's system, and explain the effect on your audit approach. (8 marks)",
    plan: [
      {
        step: "Use the five components as the answer's headings",
        detail:
          "The requirement says 'using the components', so the marker expects them. Heading the answer by component guarantees breadth and stops it becoming a flat list of deficiencies — and it makes each strength and deficiency easy to find.",
      },
      {
        step: "Give BOTH strengths and deficiencies, because the requirement names both",
        detail:
          "The scenario contains genuine strengths — the managing director's authorisation of large purchases and his review of management accounts against budget are real controls. An answer that treats everything as a deficiency has misread the requirement and loses the strength marks.",
      },
      {
        step: "Name the component each point belongs to, explicitly",
        detail:
          "The shared login is a CONTROL ACTIVITY deficiency (information processing and segregation). The absence of a risk identification process is a deficiency in the ENTITY'S RISK ASSESSMENT PROCESS. No review of reconciliations and no internal audit are MONITORING deficiencies. Attaching the component is what converts a general observation into an answer to this requirement.",
      },
      {
        step: "Answer the audit approach part, which is the final marks",
        detail:
          "Deficiencies in monitoring and control activities mean control risk is assessed as HIGH, so the auditor adopts a FULLY SUBSTANTIVE approach rather than testing controls, increases sample sizes, and performs more work at the year end. Owner-manager dominance also heightens the management override risk.",
      },
    ],
    answer:
      "**Control environment**\n\n*Strength:* The managing director is **closely involved** in the business and personally **authorises purchases over $5,000**. In a small, owner-managed entity this involvement is a genuine and often effective control, since the owner has a direct financial interest in preventing loss.\n\n*Deficiency:* That same involvement means the business is **dominated by one individual** with no effective challenge. This significantly increases the risk of **management override of controls**, and there is no evidence of those charged with governance providing oversight.\n\n**The entity's risk assessment process**\n\n*Deficiency:* There is **no formal process for identifying business risks**; the managing director relies on personal knowledge. Risks affecting financial reporting may therefore go **unidentified and uncontrolled**, and there is no documentation for the auditor to evaluate. Reliance on one person's judgement also means the process fails entirely if that judgement is wrong.\n\n**The information system and communication**\n\n*Strength:* A **standard accounting package** is used, which will normally have built-in application controls and is less likely to contain errors than a bespoke or spreadsheet-based system.\n\n*Deficiency:* Three staff **share a single login**. This destroys the audit trail — no transaction can be attributed to an individual — removes accountability, and makes **segregation of duties unenforceable** within the system, since all three have identical access rights.\n\n**Control activities**\n\n*Strength:* **Authorisation** of purchases above $5,000 by the managing director is an effective control over significant expenditure.\n\n*Deficiency:* Purchases **below $5,000** appear to require no authorisation at all, so a material amount of expenditure in aggregate is uncontrolled and could be split to fall below the threshold. **Segregation of duties** is limited by the size of the entity and eliminated by the shared login.\n\n**Monitoring of the system of internal control**\n\n*Strength:* The managing director **reviews monthly management accounts against budget and investigates variances**. This is a real monitoring control and would be likely to detect a material misstatement in reported results.\n\n*Deficiency:* **Bank reconciliations are not reviewed by anyone.** An error or deliberate manipulation by the bookkeeper — who prepares them — would not be detected, and the reconciliation provides assurance only if someone independent checks it. There is also **no internal audit function**, so no independent evaluation of controls takes place.\n\n**Effect on the audit approach**\n\n· **Control risk is assessed as high**, particularly over bank and cash, and over purchases below the authorisation threshold.\n· The auditor should adopt a **fully substantive approach** rather than plan to test and rely on controls, since the deficiencies mean the controls are unlikely to be effective and testing them would not be efficient.\n· **Sample sizes should be increased** and more work performed **at the year end** rather than at an interim date.\n· Because of the **owner-manager's dominance**, the auditor should apply heightened scepticism to the **management override** procedures — testing journal entries, reviewing estimates for bias and examining unusual transactions.\n· The auditor should **reperform the bank reconciliations** at the year end rather than rely on the entity's own, and should **report the significant deficiencies** to management in writing.",
    earns: [
      "Structuring the answer by the five components, as the requirement directs",
      "Identifying genuine strengths as well as deficiencies",
      "Explaining why each point matters rather than restating the scenario",
      "Drawing a specific audit approach conclusion, including the override risk",
    ],
    loses: [
      "Listing deficiencies with no reference to the components",
      "Treating every fact as a deficiency and losing the strength marks",
      "Omitting the effect on the audit approach, which is the final part of the requirement",
    ],
  },

  /* ── AA-12 · Recording and evaluating the system ────────────────── */

  "AA-12::recording": {
    title: "Methods of recording an accounting and control system",
    format: "written",
    marks: 6,
    requirement:
      "Describe the methods an auditor may use to record a client's accounting and internal control system, and explain the advantages and disadvantages of each. (6 marks)",
    plan: [
      {
        step: "Name the methods first, then take each in turn with both sides",
        detail:
          "Narrative notes, questionnaires (ICQs and ICEQs), flowcharts, and organisation charts. Roughly two marks per method with an advantage and a disadvantage each. A method described with no advantages or disadvantages will not score, because the requirement names both.",
      },
      {
        step: "Distinguish the two kinds of questionnaire, since that is a mark in itself",
        detail:
          "An INTERNAL CONTROL QUESTIONNAIRE asks whether a control EXISTS — 'are purchase orders authorised?' An INTERNAL CONTROL EVALUATION QUESTIONNAIRE asks whether an OBJECTIVE is achieved — 'can goods be despatched without being invoiced?' The ICEQ is designed to reveal the absence of a control rather than confirm its presence.",
      },
      {
        step: "Give advantages and disadvantages that are genuinely opposite",
        detail:
          "Narrative notes are simple and flexible but become unwieldy for complex systems and can be ambiguous. Questionnaires are quick and ensure all controls are considered but invite a box-ticking approach and may not fit an unusual system. Flowcharts show the whole system at a glance and expose gaps, but take time to prepare and need skill to read.",
      },
      {
        step: "Note the point that applies to every method",
        detail:
          "Whatever the method, the record must be CONFIRMED as accurate — normally by a WALK-THROUGH TEST — and must satisfy ISA 230, so an experienced auditor with no previous connection could understand the system from it.",
      },
    ],
    answer:
      "**Narrative notes**\n\nA **written description** of the system, setting out each stage of a cycle, who performs it and what controls operate.\n\n*Advantages:* simple to prepare, requiring no special skill; flexible enough to describe any system; and easily amended for changes in later years.\n\n*Disadvantages:* become **long and unwieldy** for a complex system; **ambiguity** is easy and gaps in the system are hard to spot in prose; and amending them for a substantially changed system can mean rewriting from scratch.\n\n**Questionnaires**\n\nTwo distinct types, and the difference is examinable:\n\n· an **internal control questionnaire (ICQ)** asks whether a **control exists** — *'Are all purchase orders authorised by a responsible official?'*\n· an **internal control evaluation questionnaire (ICEQ)** asks whether an **objective is achieved**, usually through key questions — *'Can goods be despatched without being invoiced?'* It is designed to reveal the **absence** of a control rather than to confirm its presence.\n\n*Advantages:* **quick to prepare and complete**; ensure **all controls are considered**, since the list is pre-prepared; and deficiencies are easy to identify, as a 'no' answer on an ICQ points directly to one.\n\n*Disadvantages:* invite a **box-ticking approach** where questions are answered without real enquiry; the client may **overstate** controls in responding; a standard questionnaire may **not fit an unusual system**; and a control may exist but operate ineffectively, which a questionnaire will not reveal.\n\n**Flowcharts**\n\nA **diagrammatic representation** of the flow of transactions and documents through the system, using standard symbols.\n\n*Advantages:* the **whole system is visible at a glance**; **gaps and missing controls stand out** because the flow is broken; and they are concise, with no scope for the ambiguity of prose.\n\n*Disadvantages:* **time-consuming to prepare**; require **skill** both to draw and to interpret; **amendment is difficult**, often requiring redrawing; and they suit standard transaction flows better than unusual ones.\n\n**Organisation charts**\n\nShow the **reporting structure** and lines of responsibility. Useful for assessing **segregation of duties** and identifying who authorises what, but they record structure rather than the flow of transactions, so they supplement the other methods rather than replace them.\n\n**Applies to every method.** The record must be **confirmed as accurate**, normally through a **walk-through test**, and must meet ISA 230 — sufficient for an **experienced auditor with no previous connection** to understand the system.",
    earns: [
      "Covering three or more methods with advantages and disadvantages for each",
      "Distinguishing ICQs from ICEQs by what each asks",
      "Noting that any record must be confirmed by a walk-through test",
    ],
    loses: [
      "Describing methods without giving both advantages and disadvantages",
      "Treating all questionnaires as one type",
    ],
  },

  "AA-12::walkthrough-approach": {
    title: "Walk-through tests, and what they are and are not",
    format: "written",
    marks: 5,
    requirement:
      "Explain what a walk-through test is and why the auditor performs one, and distinguish it from a test of control. (5 marks)",
    plan: [
      {
        step: "Define it by what is traced and how far",
        detail:
          "Tracing ONE OR A FEW transactions through the ENTIRE accounting system, from initiation to inclusion in the financial statements, observing the controls that operate at each stage.",
      },
      {
        step: "State the purpose precisely, because it is the whole distinction",
        detail:
          "To CONFIRM THAT THE AUDITOR'S RECORDED UNDERSTANDING OF THE SYSTEM IS ACCURATE — that the system operates as described in the narrative notes or flowchart. It is about the auditor's documentation being right, not about the controls being effective.",
      },
      {
        step: "Make the contrast on both purpose and sample size",
        detail:
          "A walk-through uses ONE OR A VERY FEW items and confirms UNDERSTANDING. A test of control uses a SAMPLE large enough to draw a conclusion and tests OPERATING EFFECTIVENESS THROUGHOUT THE PERIOD. One item can never support a conclusion about how a control operated all year.",
      },
      {
        step: "Note when it happens and what follows from it",
        detail:
          "It is performed at the PLANNING stage, as part of obtaining the understanding required by ISA 315. If the walk-through reveals the system does not operate as documented, the auditor must correct the documentation and reconsider the risk assessment and the planned approach.",
      },
    ],
    answer:
      "**What a walk-through test is.** Tracing **one transaction, or a very small number of transactions**, through the **entire accounting system** — from its initiation, through recording and processing, to its inclusion in the financial statements — observing the controls that operate at each stage. For a sales transaction, that means following one order through to despatch note, invoice, entry in the sales day book and sales ledger, and finally the receipt of cash.\n\n**Why the auditor performs one.** To **confirm that the auditor's understanding of the system is accurate** — that the system genuinely operates as recorded in the narrative notes, flowchart or questionnaire. Systems are documented from **enquiry**, and what staff describe is not always what happens: procedures change without documentation being updated, and staff describe the process as it is supposed to work rather than as it does.\n\nIt is performed at the **planning stage**, as part of obtaining the understanding of internal control that ISA 315 requires.\n\n**How it differs from a test of control**\n\n| | **Walk-through test** | **Test of control** |\n|---|---|---|\n| **Purpose** | Confirms the auditor's **understanding** of the system is accurate | Tests whether a control **operated effectively** throughout the period |\n| **Sample size** | **One or a few** transactions | A **sample sufficient** to draw a conclusion about the population |\n| **Period covered** | A point in time | The **whole period** relied upon |\n| **Conclusion drawn** | The system is as documented | The control can, or cannot, be relied on |\n| **Stage** | Planning, as part of risk assessment | After planning, where a controls-based approach is adopted |\n\nThe distinction matters because a walk-through **cannot substitute for a test of control**. Tracing one transaction successfully says nothing about whether the control operated on the other thousands, and no reliance can be placed on a control on that basis.\n\n**What follows from it.** If the walk-through shows the system does **not** operate as documented, the auditor must **correct the documentation**, reconsider the **assessment of control risk**, and revise the planned audit approach — which may mean abandoning a controls-based approach in favour of a fully substantive one.",
    earns: [
      "Defining the purpose as confirming the auditor's understanding, not testing effectiveness",
      "Contrasting on sample size and on the conclusion each supports",
      "Placing it at the planning stage within ISA 315 risk assessment",
      "Saying what the auditor does if the system is not as documented",
    ],
    loses: [
      "Describing a walk-through as a test of control performed on one item",
      "Suggesting a successful walk-through permits reliance on the control",
    ],
  },

  "AA-12::choosing-the-approach": {
    title: "Choosing between a controls-based and a substantive approach",
    format: "written",
    marks: 6,
    requirement:
      "Explain the factors an auditor considers in deciding whether to adopt a controls-based or a fully substantive audit approach, and describe what the auditor should do if tests of control reveal that a control is not operating effectively. (6 marks)",
    plan: [
      {
        step: "State the two approaches and what each involves",
        detail:
          "A CONTROLS-BASED approach tests controls, and where they prove effective, reduces substantive procedures. A FULLY SUBSTANTIVE approach places no reliance on controls and tests the balances directly. Neither removes substantive procedures entirely.",
      },
      {
        step: "Give the factors as a list, each a mark",
        detail:
          "Whether controls are expected to be EFFECTIVE, based on the understanding obtained and on prior year experience; whether reliance would be EFFICIENT — testing controls costs time and is only worthwhile if it saves more substantive work than it costs; the volume of transactions; whether an automated system produces consistent control operation; and whether sufficient substantive evidence could be obtained at all, as with a highly automated system leaving no paper trail.",
      },
      {
        step: "Note the one case where testing controls is not optional",
        detail:
          "Where substantive procedures alone CANNOT provide sufficient appropriate evidence — typically where transactions are processed automatically with no documentation — the auditor MUST test the relevant controls. It is the exception that shows the choice is not purely a matter of efficiency.",
      },
      {
        step: "Answer the second half: what happens when a control fails a test",
        detail:
          "Do not simply increase the sample. Consider whether an alternative or compensating control exists and test that; if not, REVISE THE RISK ASSESSMENT, place no reliance on the control, and perform EXTENDED SUBSTANTIVE PROCEDURES for the affected assertion. Report the deficiency to management, and consider whether it indicates a wider problem.",
      },
    ],
    answer:
      "**The two approaches**\n\nUnder a **controls-based approach** the auditor tests the operating effectiveness of controls and, where they prove effective, **reduces** the extent of substantive procedures. Under a **fully substantive approach** no reliance is placed on controls and evidence is obtained by testing the transactions and balances directly. Note that a controls-based approach **reduces but never eliminates** substantive procedures — ISA 330 requires some substantive work for every material class of transactions, balance and disclosure.\n\n**Factors in choosing**\n\n· **Whether controls are expected to be effective.** Based on the understanding of the system obtained at planning, and on **prior year experience** of testing the same controls. Where the preliminary assessment is that controls are weak, testing them would be wasted effort.\n· **Whether reliance would be efficient.** Testing controls takes time. It is worthwhile only where the **reduction in substantive work exceeds the cost** of the tests — which is normally the case where there is a **high volume of homogeneous transactions**, and rarely the case for a small number of large items, which can simply be tested directly.\n· **The nature of the transactions and balances.** Routine, high-volume cycles such as sales, purchases and payroll lend themselves to controls testing; one-off and judgemental items do not.\n· **The IT environment.** An **automated** control tends to operate consistently, so a smaller sample may support reliance — provided the **general IT controls** over program change and access are themselves effective.\n· **Whether substantive evidence alone would be sufficient.** Where transactions are **initiated, processed and recorded electronically** with no paper documentation, substantive procedures alone may not provide sufficient appropriate evidence. In that case ISA 330 **requires** the auditor to test the relevant controls — the choice is removed.\n· **The results of the entity's own monitoring**, including the work of internal audit.\n\n**If tests of control reveal a control is not operating effectively**\n\n· **Do not simply increase the sample size** in the hope of a better result — the test has already indicated the control cannot be relied upon.\n· **Investigate the deviations** found: establish their cause, whether they are isolated or systematic, and how many there are relative to the sample.\n· **Consider whether an alternative or compensating control exists** that addresses the same risk, and if so, test that control instead.\n· If no such control exists, **revise the assessment of control risk upwards**, place **no reliance** on the control, and perform **extended substantive procedures** on the affected assertion — larger samples, and testing at the year end rather than at an interim date.\n· **Report the deficiency** to management, and to those charged with governance if it is a **significant deficiency**.\n· **Consider the wider implications** — a failed control may indicate weaknesses in the control environment that affect the assessed risk in other areas, and may cast doubt on evidence already obtained.",
    earns: [
      "Explaining that a controls-based approach reduces but never removes substantive testing",
      "Giving effectiveness and efficiency as separate factors",
      "Knowing controls must be tested where substantive procedures alone would be insufficient",
      "Answering the second half with extended substantive work rather than a bigger control sample",
    ],
    loses: [
      "Suggesting the auditor increases the sample until the control passes",
      "Claiming a controls-based approach removes the need for substantive procedures",
      "Omitting the second half of the requirement entirely",
    ],
  },

  /* ── AA-13 · Tests of control over the major cycles ─────────────── */

  "AA-13::the-distinction": {
    title: "Control test or substantive procedure",
    format: "mtq",
    marks: 10,
    requirement:
      "For each of the following procedures performed during the audit of Colwyn Co, identify whether it is a test of control or a substantive procedure.\n\n(1) Inspect a sample of purchase orders for evidence of authorisation by the purchasing manager.\nA  Test of control  B  Substantive procedure\n\n(2) Select a sample of goods despatched notes and trace them to sales invoices and the sales ledger.\nA  Test of control  B  Substantive procedure\n\n(3) Observe the payroll department to confirm that the wages payout is supervised by two members of staff.\nA  Test of control  B  Substantive procedure\n\n(4) Recalculate the depreciation charge for a sample of non-current assets.\nA  Test of control  B  Substantive procedure\n\n(5) Reperform a bank reconciliation prepared by the client, and inspect it for evidence of review by the financial controller.\nA  Test of control only  B  Substantive procedure only  C  Both  D  Neither",
    plan: [
      {
        step: "Ask ONE question of every procedure: what is being concluded?",
        detail:
          "If the conclusion is 'the control operated', it is a TEST OF CONTROL. If the conclusion is 'the figure in the financial statements is right', it is a SUBSTANTIVE procedure. The physical action can be identical — inspecting the same document — so the action never decides it.",
      },
      {
        step: "Watch for the word that gives it away",
        detail:
          "'For evidence of authorisation', 'for evidence of review', 'for a signature', 'observe that segregation operates' — all point to a CONTROL, because the auditor is looking for a trace that someone performed a control activity. Recalculating, confirming, tracing to establish an amount all point to SUBSTANTIVE work.",
      },
      {
        step: "Note that direction of testing signals the assertion, not the type",
        detail:
          "Tracing from despatch notes FORWARD to invoices tests COMPLETENESS of revenue; selecting from the ledger BACK to despatch notes tests OCCURRENCE. Both are substantive. Direction tells you which assertion, not whether it is a control test.",
      },
      {
        step: "Accept that one procedure can be both",
        detail:
          "Reperforming a reconciliation gives substantive evidence about the bank balance, while inspecting it for a reviewer's signature tests the review control. The same working paper can serve both purposes — and a requirement asking for one will not accept the other.",
      },
    ],
    answer:
      "**(1) A — test of control.** The auditor is looking for **evidence that the authorisation control operated**, not establishing the amount of any purchase. The conclusion drawn is about the control, not the balance.\n\n**(2) B — substantive procedure.** Tracing **from despatch notes forward to invoices and the ledger** tests whether goods despatched were invoiced and recorded — the **completeness** of revenue. The conclusion is about the revenue figure in the financial statements.\n\n**(3) A — test of control.** **Observation** that the payout is supervised by two staff tests whether the **segregation control operates**. Note the limitation of observation as evidence: it confirms the control only **at the moment observed**, and staff may behave differently while being watched.\n\n**(4) B — substantive procedure.** **Recalculating depreciation** tests the **accuracy and valuation** of the charge and of the carrying amount. Nothing about a control is being concluded.\n\n**(5) C — both.** **Reperforming** the reconciliation provides **substantive** evidence about the existence and accuracy of the bank balance. **Inspecting it for evidence of review** by the financial controller is a **test of control** over the review procedure. The same document supports both conclusions.\n\n**The single question that decides every one of these:** *what conclusion is the auditor drawing?*\n\n| The conclusion is... | Type |\n|---|---|\n| 'The control operated as designed throughout the period' | **Test of control** |\n| 'The amount or disclosure in the financial statements is correct' | **Substantive procedure** |\n\nThe **physical action is not the discriminator** — the auditor may inspect exactly the same invoice for a test of control and for a substantive procedure. Wording such as *'for evidence of authorisation'*, *'for evidence of review'* or *'for a signature'* signals a control test; *recalculate*, *confirm*, *trace to establish the amount* signal substantive work.",
    earns: [
      "Deciding by the conclusion drawn rather than by the action performed",
      "Spotting 'for evidence of authorisation/review' as the signal of a control test",
      "Recognising that a single procedure can serve both purposes",
    ],
    loses: [
      "Classifying by the verb — assuming inspection is always a control test",
      "Confusing direction of testing (completeness against occurrence) with the type of procedure",
    ],
  },

  "AA-13::cycles": {
    title: "Tests of control over the major transaction cycles",
    format: "written",
    marks: 10,
    requirement:
      "Describe tests of control that the auditor could perform over the sales cycle and the payroll cycle of a company, explaining the control objective each test addresses. (10 marks)",
    plan: [
      {
        step: "Split ten marks across the two cycles and give roughly five tests each",
        detail:
          "One mark per valid test with its objective. Five well-described tests for each cycle reaches ten. A long essay on the sales system with three tests will not, however accurate.",
      },
      {
        step: "Work through each cycle in ORDER, so no stage is missed",
        detail:
          "SALES: order → credit check → despatch → invoice → recording → cash receipt. PAYROLL: starters and leavers → hours recorded → payroll processed → authorised → paid → deductions and tax. Following the flow generates tests systematically instead of relying on recall.",
      },
      {
        step: "Write every test with a performable verb and a specific document",
        detail:
          "INSPECT, OBSERVE, REPERFORM, ENQUIRE OF, INSPECT FOR EVIDENCE OF. Never 'check' or 'ensure', which describe an intention rather than an action and score nothing. Name the actual document — the despatch note, the timesheet, the payroll standing data amendment form.",
      },
      {
        step: "Attach the control objective to each test, since the requirement asks for it",
        detail:
          "'To ensure goods are only despatched to creditworthy customers.' 'To ensure only genuine employees are paid.' The objective is what makes the test a test of control rather than a procedure floating free of any purpose.",
      },
    ],
    answer:
      "**Tests of control — the sales cycle**\n\n· **Inspect a sample of sales orders for evidence of a credit check** having been performed and of the customer's credit limit being available before acceptance. *Objective:* to ensure goods are supplied only to **creditworthy customers**, reducing the risk of irrecoverable debts.\n· **Attempt to enter a sales order for a customer that would exceed the credit limit**, and observe that the system **rejects or flags** it. *Objective:* to confirm the automated credit limit control operates.\n· **Inspect a sample of goods despatched notes for a signature from the customer or carrier** acknowledging receipt. *Objective:* to ensure goods are only despatched to genuine customers and that despatch can be evidenced.\n· **Inspect the sequence of goods despatched notes for completeness**, and enquire into any gaps. *Objective:* to ensure **all despatches are invoiced**, so revenue is complete.\n· **Reperform the pricing of a sample of sales invoices** by agreeing prices and discounts to the **authorised price list**. *Objective:* to ensure invoices are raised at correct, authorised prices.\n· **Inspect a sample of credit notes for evidence of authorisation** by a responsible official. *Objective:* to ensure credit notes are not issued to conceal misappropriated cash or fictitious sales.\n· **Observe the opening of post and the recording of cash receipts**, confirming that two people are present. *Objective:* to ensure receipts are **completely recorded** and to reduce the risk of misappropriation.\n\n**Tests of control — the payroll cycle**\n\n· **Inspect a sample of new starter and leaver forms for authorisation** by an appropriate manager, and agree them to amendments to the payroll standing data. *Objective:* to ensure **only genuine employees are added** to the payroll and that leavers are promptly removed.\n· **Inspect the payroll standing data amendment report for evidence of review** by a responsible official independent of the person making the changes. *Objective:* to prevent unauthorised changes to pay rates or bank details.\n· **Inspect a sample of timesheets or clock cards for authorisation** by a supervisor. *Objective:* to ensure employees are paid only for **hours actually worked**.\n· **Observe the clocking-in process** to confirm that employees cannot clock in on behalf of colleagues. *Objective:* to prevent payment for hours not worked.\n· **Inspect the monthly payroll for evidence of review and approval** by the finance director before payment is made, including comparison with the previous month and investigation of variances. *Objective:* to ensure the payroll is **complete and accurate** before funds leave the company.\n· **Reperform the calculation of gross and net pay** for a sample of employees, and **inspect the payroll for evidence that the calculation was checked** by a second person. *Objective:* to ensure pay and deductions are calculated accurately.\n· **Inspect the payroll bank transfer listing for authorisation** by two signatories, and agree the total to the payroll. *Objective:* to ensure only the approved payroll amount is paid.\n\n**Two general points.** Every test above begins with a **verb the auditor can perform** — inspect, observe, reperform, attempt — and each is tied to a **specific document**. And each has a **stated objective**, which is what distinguishes a test of control from a procedure with no purpose attached.",
    earns: [
      "Around five tests for each cycle, each with a control objective",
      "Working through each cycle in order so no stage is missed",
      "Tests written with a performable verb and a named document",
      "Including a test of an automated control, such as attempting to breach a credit limit",
    ],
    loses: [
      "Writing 'check that orders are authorised', which is not a procedure",
      "Giving substantive procedures instead of tests of control",
      "Covering one cycle thoroughly and the other barely, when marks are split between them",
    ],
  },

  "AA-13::writing-the-tests": {
    title: "Writing a procedure that actually scores",
    format: "written",
    marks: 8,
    requirement:
      "The audit junior on the audit of Hartsmere Co has drafted the following procedures. For each, explain why it would not earn a mark as written, and rewrite it so that it would.\n\n(i)   'Check that all purchase invoices have been authorised.'\n(ii)  'Ensure inventory is valued correctly.'\n(iii) 'Discuss the allowance for receivables with management.'\n(iv)  'The company should introduce a control to prevent unauthorised access to the payroll system.' (8 marks)",
    plan: [
      {
        step: "Take four procedures at two marks each — one for the fault, one for the rewrite",
        detail:
          "Both halves are required. Explaining what is wrong without producing a workable procedure scores half, and a rewrite with no explanation of the fault scores half.",
      },
      {
        step: "Name the specific fault rather than saying it is vague",
        detail:
          "(i) 'Check' is not an audit action and there is no sample. (ii) 'Ensure' states an objective rather than a procedure, and gives no method. (iii) Enquiry alone is weak evidence and is not corroborated. (iv) It is a RECOMMENDATION TO MANAGEMENT, not an audit procedure at all — the most serious of the four faults.",
      },
      {
        step: "Build every rewrite from the same four ingredients",
        detail:
          "An ACTION VERB the auditor can perform, a SAMPLE or population, the SPECIFIC DOCUMENT or source, and the PURPOSE or what is being agreed to. A procedure containing all four is markable; one missing the source usually is not.",
      },
      {
        step: "Remember which verbs are banned and which are safe",
        detail:
          "Banned: check, ensure, verify, make sure — all describe an intention. Safe: inspect, observe, enquire of, confirm with, recalculate, reperform, trace, agree, compare, cast. Every procedure in the exam should start with one of the safe verbs.",
      },
    ],
    answer:
      "**(i) 'Check that all purchase invoices have been authorised.'**\n\n*Why it fails:* **'Check' is not an audit procedure** — it describes an intention, not an action, and gives no indication of what the auditor would physically do. It also implies testing **all** invoices, which is not how an audit is performed, and does not say what evidence of authorisation would look like.\n\n*Rewrite:* **'Inspect a sample of purchase invoices for evidence of authorisation, in the form of the signature of a responsible official, and agree the signature to the authorised signatory list.'**\n\n**(ii) 'Ensure inventory is valued correctly.'**\n\n*Why it fails:* **'Ensure' states the objective, not the procedure.** It is what the auditor wants to conclude, not how they would conclude it, and gives no method at all — a marker cannot award a mark for a restatement of the assertion being tested.\n\n*Rewrite:* **'For a sample of inventory items, agree the cost to a recent purchase invoice, and compare that cost to the selling price shown in the post year-end sales invoice or price list less any selling costs, to confirm inventory is held at the lower of cost and net realisable value.'**\n\n**(iii) 'Discuss the allowance for receivables with management.'**\n\n*Why it fails:* **enquiry alone is weak audit evidence**, because it comes from the client and is not independent. ISA 500 requires that enquiry be **corroborated** by other evidence. The procedure is also imprecise about what is being discussed and what would be done with the answer.\n\n*Rewrite:* **'Discuss with management the basis of the allowance for receivables, and corroborate their explanations by reviewing the aged receivables listing for old balances, inspecting post year-end cash receipts from those customers, and inspecting correspondence with customers in dispute or in administration.'**\n\n**(iv) 'The company should introduce a control to prevent unauthorised access to the payroll system.'**\n\n*Why it fails:* this is a **recommendation to management**, not an audit procedure. It is something the **client** would do, not something the **auditor** does, so it cannot be performed by the audit team and earns nothing in a requirement asking for procedures. This is the most common and most costly error of the four, because a whole answer can be written this way.\n\n*Rewrite:* **'Attempt to access the payroll system using the login of a member of staff outside the payroll department, and observe whether access is denied; and inspect the system's access rights listing to confirm that only payroll staff have write access.'**\n\n**The four ingredients of a markable procedure**\n\n| Ingredient | Example |\n|---|---|\n| An **action verb** the auditor performs | Inspect, observe, enquire of, confirm with, recalculate, reperform, trace, agree, compare, cast |\n| A **sample or population** | 'a sample of', 'all items above performance materiality' |\n| The **specific document or source** | 'the goods despatched note', 'the authorised price list', 'the supplier statement' |\n| The **purpose** — what is being agreed to or concluded | '...to confirm the goods were despatched before the year end' |\n\n**Verbs to avoid entirely:** *check, ensure, verify, make sure, confirm that the client has* — each describes a state of mind rather than an action.",
    earns: [
      "A fault and a rewrite for each of the four",
      "Naming the specific fault, not simply calling the procedure vague",
      "Rewrites containing an action verb, a sample, a source document and a purpose",
      "Identifying (iv) as a recommendation rather than a procedure at all",
    ],
    loses: [
      "Rewriting the procedures without explaining what was wrong with them",
      "Rewrites that still begin with 'check' or 'ensure'",
      "Rewrites that omit the source document, so the procedure cannot actually be performed",
    ],
  },

  /* ── AA-14 · Reporting deficiencies to management ───────────────── */

  "AA-14::definitions": {
    title: "Deficiency, significant deficiency, and the report to management",
    format: "written",
    marks: 5,
    requirement:
      "Define a deficiency in internal control and a significant deficiency, and explain the auditor's responsibility to report deficiencies, including to whom and by when. (5 marks)",
    plan: [
      {
        step: "Give the two-limb definition of a deficiency",
        detail:
          "A deficiency exists where a control is DESIGNED, IMPLEMENTED OR OPERATED in such a way that it cannot prevent or detect and correct misstatements on a timely basis; OR where a control NECESSARY to prevent or detect them IS MISSING. Both limbs — a bad control and an absent control — and candidates often give only the first.",
      },
      {
        step: "Define significance by the audience, not by size",
        detail:
          "A SIGNIFICANT deficiency is one that, in the auditor's PROFESSIONAL JUDGEMENT, is of sufficient importance to MERIT THE ATTENTION OF THOSE CHARGED WITH GOVERNANCE. It is defined by who needs to know, which is why judgement is central.",
      },
      {
        step: "Split the reporting duty by audience",
        detail:
          "SIGNIFICANT deficiencies must be communicated IN WRITING to THOSE CHARGED WITH GOVERNANCE, on a timely basis. Other deficiencies of sufficient importance to merit management's attention are communicated to MANAGEMENT, and may be oral. Two audiences, two thresholds.",
      },
      {
        step: "Note what the report is and is not",
        detail:
          "The report to management is a BY-PRODUCT of the audit, not its objective — the auditor's purpose was forming an opinion, not a review of controls. It should say so, and should state that it is for the company's use only and that the auditor accepts no responsibility to third parties.",
      },
    ],
    answer:
      "**A deficiency in internal control** exists where either:\n\n· a control is **designed, implemented or operated** in such a way that it is **unable to prevent, or detect and correct, misstatements** in the financial statements on a timely basis; **or**\n· a control **necessary** to prevent, or detect and correct, such misstatements **is missing**\n\nBoth limbs matter. A control that exists but does not work is a deficiency, and so is the **absence** of a control that ought to exist.\n\n**A significant deficiency** is a deficiency, or combination of deficiencies, that in the auditor's **professional judgement** is of **sufficient importance to merit the attention of those charged with governance**. Significance is judged by reference to the audience rather than by any numerical threshold. Factors the auditor considers include:\n\n· the **likelihood** of a misstatement arising and its potential **magnitude**\n· the **susceptibility** of the related asset to loss or fraud\n· the **subjectivity** of the amounts affected\n· the **volume of activity** passing through the deficient control\n· whether the deficiency has been **exploited**, and the **cause** of it\n· the **importance of the control** to the financial reporting process, and its interaction with other deficiencies\n\n**The auditor's reporting responsibility**\n\n· **Significant deficiencies** must be communicated **in writing** to **those charged with governance**, on a **timely basis** — the written form is mandatory because of their importance.\n· **Other deficiencies** identified during the audit which, in the auditor's judgement, are of sufficient importance to merit management's attention must be communicated to an **appropriate level of management**. This may be **oral**, though it is normally documented.\n· The communication should describe the **deficiency**, explain its **potential effects**, and — although not required by ISA 265 — practice is to include **recommendations**, which is what a client values.\n· It should also explain that the audit **considered internal control only so far as necessary to design audit procedures**, and **not for the purpose of expressing an opinion on internal control**, and state that it is provided **for the company's use only**.\n\n**Timing.** Communication should be timely enough for those charged with governance to take **remedial action**. Where a deficiency is serious, it should not be held back until the end of the audit.",
    earns: [
      "Giving both limbs of the deficiency definition, including the missing control",
      "Defining significance by whether it merits the attention of those charged with governance",
      "Separating the written duty to governance from the communication to management",
      "Noting the audit was not a review of internal control, and saying why the report says so",
    ],
    loses: [
      "Defining a deficiency only as a control that does not work",
      "Defining significance by a monetary threshold",
      "Omitting that significant deficiencies must be reported in writing",
    ],
  },

  "AA-14::writing": {
    title: "Deficiency, implication, recommendation — the report to management",
    format: "written",
    marks: 20,
    requirement:
      "You are the auditor of Ashcombe Co. Its purchases and payables system operates as follows.\n\n· Purchase orders may be raised by any member of the production department, and there are no authorisation limits.\n· Goods received notes are completed by the warehouse but are not sequentially numbered.\n· Purchase invoices are posted to the payables ledger by the same clerk who processes the payment run.\n· Supplier statement reconciliations are not performed.\n· New suppliers can be added to the payables ledger master file by any of the three purchase ledger clerks.\n· The weekly payment run is authorised by one director, who approves the total without reviewing the supporting documentation.\n\n(a) Identify and explain SIX deficiencies in Ashcombe Co's purchases and payables system, and recommend a control to address each deficiency. (12 marks)\n\n(b) Describe FOUR tests of control the auditor would perform to assess whether the recommended controls, once implemented, are operating effectively. (8 marks)",
    plan: [
      {
        step: "Lay the page out as a table before writing, and budget the two parts separately",
        detail:
          "Part (a): three columns — Deficiency | Implication | Recommendation — with six rows, at two marks a row. Part (b): four tests. Roughly 22 minutes on (a) and 14 on (b). The table IS the marking guide, and building it first protects the structure when time gets short.",
      },
      {
        step: "Take one deficiency per bullet — the scenario is built that way",
        detail:
          "Six bullets, six deficiencies required. Every AA control scenario is written with one deficiency per stated fact, so there is no need to search and no credit for inventing a seventh.",
      },
      {
        step: "Never omit the implication, which is the half candidates skip",
        detail:
          "'Orders are not authorised' is the deficiency. The implication is what could HAPPEN TO THE COMPANY: goods ordered that are not needed, at uncompetitive prices, or for personal use — leading to overspending, cash flow pressure and overstated expenses. Without it the point is worth half.",
      },
      {
        step: "Make each recommendation a control that could be implemented on Monday",
        detail:
          "Specific, and addressing the deficiency just named. 'Introduce authorisation limits, with orders up to $1,000 approved by the production supervisor and above that by the production director, evidenced by signature on the order' — not 'orders should be authorised'.",
      },
      {
        step: "In part (b), test the RECOMMENDED control, not the deficiency",
        detail:
          "The requirement is explicit: assess whether the recommended controls, once implemented, operate effectively. So each test inspects for evidence that the NEW control ran — a signature on the order, a review of the reconciliation, a sequence check on the goods received notes.",
      },
      {
        step: "Do not let part (a) eat part (b)",
        detail:
          "Eight marks sit in part (b) and four tests is not a long answer. A candidate who writes eight deficiencies in part (a) and no tests has traded 8 marks for 0 — the sixth deficiency is worth two marks, and each of the four tests is worth two.",
      },
    ],
    answer:
      "**(a) Deficiencies, implications and recommendations**\n\n| **Deficiency** | **Implication** | **Recommendation** |\n|---|---|---|\n| **1. Purchase orders may be raised by any member of the production department, with no authorisation limits.** | Goods may be ordered that are **not required**, in excessive quantities, at uncompetitive prices, or for **personal use**. Expenditure is uncontrolled, leading to overspending, unnecessary cash outflow and overstated expenses and inventory. | Introduce **authorisation limits**: orders up to $1,000 approved by the production supervisor, above that by the production director, and above $10,000 by the board. Authorisation should be **evidenced by signature** on the order, and the system should not permit an order to proceed unauthorised. |\n| **2. Goods received notes are not sequentially numbered.** | It is not possible to establish that **all goods received have been recorded** and matched to invoices. Goods may be received without a liability being recognised, so **payables and purchases are understated**, and missing notes cannot be detected. | **Pre-number all goods received notes sequentially**, and perform a regular **sequence check** on them, investigating any gaps. Match each note to a purchase order and to the supplier's invoice before posting. |\n| **3. The same clerk posts purchase invoices and processes the payment run.** | There is **no segregation of duties**. The clerk could post a **fictitious invoice** to a supplier they control and then pay it, and the fraud would not be detected by anyone else. Risk of misappropriation and of overstated purchases and payables. | **Segregate the two duties**: one clerk posts invoices to the ledger, a different clerk prepares the payment run, and neither should be able to amend supplier bank details. |\n| **4. Supplier statement reconciliations are not performed.** | **Errors and omissions in the payables ledger go undetected** — invoices not recorded, credit notes not received, amounts posted to the wrong supplier. Payables may be **understated** and disputes with suppliers may arise, risking withdrawal of credit. | Perform **monthly reconciliations of supplier statements to the payables ledger** for all major suppliers, investigate reconciling items promptly, and have the reconciliations **reviewed and signed by a responsible official** independent of the person preparing them. |\n| **5. Any of the three purchase ledger clerks can add a new supplier to the master file.** | A clerk could set up a **fictitious supplier** with their own bank details and process payments to it. Standing data is highly sensitive because it determines **where money is sent**, and unauthorised amendments would be difficult to detect. | Restrict the ability to amend the **payables master file** to a **single authorised individual** independent of invoice processing and payments. New suppliers should be approved by a responsible official, and a **master file amendment report** should be produced and **reviewed regularly** by someone independent. |\n| **6. The weekly payment run is authorised by one director who approves only the total.** | Payments may be made for goods **never received**, for invoices **already paid**, or to **fictitious suppliers**, and the approval provides no real check because the supporting documentation is not examined. Approval by a **single** signatory also removes any second check over cash leaving the company. | Require the director to review a **payment listing with supporting documentation** — the invoice, goods received note and purchase order for a sample of items — before approving, and require **two authorised signatories** for the payment run. Approval should be evidenced. |\n\n**(b) Tests of control over the recommended controls**\n\n**1. Authorisation of purchase orders.** **Inspect a sample of purchase orders** for evidence of **authorisation by an official at the appropriate level for the value of the order**, and agree the signature to the authorised signatory list. In addition, **attempt to process an order above the limit** of the user's authority in the system and **observe** that it is rejected. *Objective:* to confirm only genuine, needed purchases at authorised values are ordered.\n\n**2. Sequential numbering and matching of goods received notes.** **Inspect the sequence of goods received notes** for a selected period and enquire into any gaps identified; and **inspect a sample of purchase invoices for evidence that they have been matched** to a goods received note and a purchase order before posting. *Objective:* to confirm all goods received are recorded and that only goods actually received are paid for.\n\n**3. Supplier statement reconciliations.** **Inspect a sample of monthly supplier statement reconciliations for evidence of preparation and of review** by a responsible official, in the form of signature and date, and **inspect the treatment of reconciling items** to confirm they were investigated and cleared. *Objective:* to confirm the payables ledger is complete and accurate.\n\n**4. Master file amendments and payment authorisation.** **Inspect the master file amendment report** for a sample of periods for **evidence of review** by an independent official, and agree a sample of new suppliers to **approval documentation**. **Inspect a sample of payment runs for evidence of authorisation by two signatories**, and enquire of the director whether supporting documentation was reviewed. *Objective:* to confirm payments are made only to genuine, approved suppliers and are properly authorised.",
    earns: [
      "Six complete rows of deficiency, implication and recommendation",
      "Implications expressed as what could happen to the company, not restatements of the deficiency",
      "Recommendations specific enough to be implemented immediately",
      "Part (b) testing the recommended controls, with named documents and evidence sought",
      "Attempting both parts — the four tests are worth as much as two deficiencies",
    ],
    loses: [
      "Deficiency and recommendation with no implication, losing a third of part (a)",
      "Generic recommendations such as 'controls should be improved' or 'duties should be segregated' with no detail",
      "Substantive procedures offered in part (b) instead of tests of control",
      "Writing eight deficiencies and no tests of control, trading eight marks for none",
    ],
  },

  "AA-14::small-company": {
    title: "When the company is too small to segregate duties",
    format: "written",
    marks: 6,
    requirement:
      "Explain the difficulties of achieving effective internal control in a small owner-managed company, and describe the compensating controls that may be available and how they affect the audit approach. (6 marks)",
    plan: [
      {
        step: "Identify the root difficulty as a matter of arithmetic, not of will",
        detail:
          "Segregation of duties requires enough people to divide the four functions — authorisation, recording, custody of assets, and reconciliation. A company with two staff in accounts cannot do it, however well intentioned. That is a limitation of size, not a failing of management, and saying so sets up the rest of the answer.",
      },
      {
        step: "List the specific consequences",
        detail:
          "One person may control a transaction from start to finish; the owner-manager can override anything; there may be no internal audit; controls are often informal and undocumented, so the auditor cannot inspect evidence that they operated; and staff may lack accounting expertise.",
      },
      {
        step: "Give the compensating controls, which centre on the owner",
        detail:
          "Close involvement of the OWNER-MANAGER is the principal one: authorising significant transactions personally, opening the bank statements and reviewing them, signing all cheques and payments with supporting documentation, reviewing management accounts against expectation, and approving payroll and new suppliers.",
      },
      {
        step: "Be honest about the double edge, which is the sophisticated point",
        detail:
          "The owner-manager is both the STRONGEST control and the GREATEST risk, because the same person who checks everything can also override everything. So the auditor cannot rely on owner review as a control without considering the management override risk it creates.",
      },
      {
        step: "State the audit consequence",
        detail:
          "Control risk is usually assessed as HIGH; a FULLY SUBSTANTIVE approach is normally adopted; more work is performed at the year end; and completeness of income is the hardest assertion, since an unrecorded cash sale leaves no trace in the records.",
      },
    ],
    answer:
      "**Why effective internal control is difficult in a small entity**\n\n**Segregation of duties is arithmetically impossible.** Effective segregation requires enough people to separate **authorisation**, **recording**, **custody of assets** and **reconciliation**. Where the accounts function is one or two people, one individual will inevitably control a transaction from beginning to end — raising the invoice, recording it, banking the cash and reconciling the account. This is a consequence of **size**, not of poor management.\n\n**The owner-manager can override any control.** In an owner-managed company one person typically has complete authority, so any control can be circumvented at will, and there are usually no effective **those charged with governance** to provide oversight.\n\n**Controls are informal and undocumented.** The owner may review everything carefully but leave **no evidence** of having done so. The auditor cannot test a control that leaves no audit trail, even where it genuinely operates.\n\n**Limited resources and expertise.** There is rarely an **internal audit** function, accounting staff may lack qualifications, and the cost of additional controls may exceed the benefit for a small business.\n\n**Completeness of income is inherently at risk.** Where a business handles cash, an unrecorded sale leaves **no trace in the accounting records at all**, so no amount of testing the records will detect it.\n\n**Compensating controls that may be available**\n\nMost centre on the **close involvement of the owner-manager**, who has a direct financial interest in preventing loss:\n\n· **personally authorising** all significant transactions — purchases above a threshold, new suppliers, new employees and pay rates\n· **opening the bank statements** personally and reviewing them before passing them to the bookkeeper, which is a powerful control over misappropriation\n· **signing all cheques and authorising all payments**, with the supporting invoice and goods received note presented at the time\n· **reviewing management accounts** regularly and **investigating variances** against expectation and prior periods\n· **reviewing the payroll** before payment and approving all changes to standing data\n· performing or reviewing **bank reconciliations** personally\n\n**The double edge.** The owner-manager is simultaneously the **strongest control** in the entity and the **greatest single risk**, because the person who reviews everything can also override everything. The auditor cannot treat owner review as a reliable control without also addressing the **management override** risk it creates.\n\n**Effect on the audit approach**\n\n· **Control risk is normally assessed as high**, and a **fully substantive approach** is adopted rather than testing controls, since the controls are often undocumented and cannot be tested.\n· **Increased substantive procedures**, with larger samples and more work performed **at the year end**.\n· Particular attention to the **completeness of income** — analytical procedures on margins, comparison of recorded revenue with non-financial data, and testing from source documents into the records.\n· Heightened attention to **management override**, including testing journal entries and reviewing estimates for bias.\n· Greater reliance on **written representations**, while recognising that representations are weak evidence and cannot substitute for other evidence that should be available.\n· The auditor should still **report the deficiencies** to management, while acknowledging that some are inherent in the entity's size.",
    earns: [
      "Explaining segregation as a limitation of size rather than a failing of management",
      "Giving specific compensating controls centred on the owner-manager",
      "Making the point that the owner is both the strongest control and the greatest risk",
      "Drawing the audit approach consequence, including completeness of income",
    ],
    loses: [
      "Recommending full segregation of duties, which the entity cannot implement",
      "Listing difficulties without giving any compensating controls",
      "Omitting the effect on the audit approach, which is a third of the requirement",
    ],
  },
}
