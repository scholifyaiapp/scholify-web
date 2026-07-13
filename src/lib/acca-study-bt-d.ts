import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Area D — Accounting, internal control & technology.
 * Rich study chapter matching the FA_A exemplar for depth, tone and visuals.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const BT_D: StudyChapter = {
  paper: "BT",
  area: "D",
  title: "Accounting, internal control & technology",
  minutes: 15,
  intro: "A business runs on trust in its numbers. This chapter is about the machinery that produces those numbers reliably — the finance function, its systems, the controls that keep them honest, and the technology reshaping all three.",
  outcomes: [
    "Explain the role of the accounting and finance function and how it relates to the rest of the business",
    "Describe the main financial systems — purchases, sales, payroll and cash — and how each flows",
    "Distinguish the purpose and the three types of internal control, and give examples of control activities",
    "Contrast internal audit with external audit across purpose, appointment, scope and reporting",
    "Apply the fraud triangle and identify how fraud is prevented and detected",
    "Explain how automation, big data, cloud, AI, fintech and cyber security affect business and finance",
  ],
  sections: [
    {
      id: "finance-function",
      heading: "The accounting & finance function and its relationships",
      blocks: [
        { kind: "text", md: "Every organisation needs someone to answer three questions: **where is the money, where did it go, and where is it going?** The **accounting and finance function** exists to answer them. It records what has happened (financial accounting), helps managers decide what to do next (management accounting), guards the organisation's assets, and makes sure there is cash available to pay the bills when they fall due (**treasury**)." },
        { kind: "text", md: "The finance function is not an island. It is a **service function** — it produces information that the rest of the business consumes. Production tells finance what it made and what it cost; sales tells finance who owes money; HR tells finance who to pay. In return, finance hands each department the numbers it needs to run. Because it touches every part of the organisation, finance sits at a natural crossroads — which is exactly why it is also where controls matter most." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "Finance sits at the centre of the organisation's information flows",
          caption: "Every function both feeds data into finance and draws information back out.",
          data: {
            centre: "Finance function",
            nodes: [
              { label: "Sales & marketing", sub: "orders, receivables" },
              { label: "Purchasing", sub: "orders, payables" },
              { label: "Production / operations", sub: "costs, inventory" },
              { label: "Human resources", sub: "payroll data" },
              { label: "Management", sub: "budgets & reports" },
              { label: "External parties", sub: "tax, lenders, auditors" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "The finance function is a **service** to the whole business: it captures data from every department, turns it into information, and hands back the reports each part needs to run and to be held accountable." },
      ],
    },
    {
      id: "financial-systems",
      heading: "The main financial systems",
      blocks: [
        { kind: "text", md: "The finance function is really a set of **transaction systems**, each capturing one kind of routine event and turning it into a record. There are four you must know cold — and the trick is to see each as a **flow** with a clear start and end, because that flow is exactly where controls are inserted later." },
        { kind: "table", caption: "The four core financial systems", head: ["System", "Captures", "Key documents"], rows: [
          ["Sales (revenue) system", "Selling goods/services on credit and collecting cash", "Order, dispatch note, sales invoice, receipt"],
          ["Purchases (expenditure) system", "Buying goods/services on credit and paying for them", "Purchase order, goods received note, purchase invoice, payment"],
          ["Payroll system", "Calculating and paying wages, salaries and deductions", "Timesheet, payslip, payment to employees & tax authority"],
          ["Cash system", "Recording all receipts and payments through bank and petty cash", "Bank statement, remittance, petty cash voucher"],
        ] },
        { kind: "text", md: "Take the **sales cycle** as the model. A customer places an order; the business checks the customer's credit; goods are dispatched and a **dispatch note** raised; an **invoice** is sent; the sale is recorded and, later, the **cash** is collected and the receivable cleared. Each step generates a document that the next step checks against — that matching of documents is the backbone of control." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The sales (revenue) cycle",
          caption: "Order to cash — each step raises a document the next step reconciles against.",
          data: {
            steps: [
              { label: "Customer order", sub: "received & recorded" },
              { label: "Credit check", sub: "can they pay?" },
              { label: "Dispatch goods", sub: "dispatch note raised" },
              { label: "Raise invoice", sub: "record the sale" },
              { label: "Collect cash", sub: "clear the receivable" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "The **purchases cycle** is the mirror image — requisition, purchase order, **goods received note**, supplier invoice, payment — with the three-way match of order vs GRN vs invoice as its control heart." },
      ],
      check: {
        q: "In the purchases system, which document confirms that goods were actually received before a supplier's invoice is paid?",
        options: [
          "The purchase order",
          "The goods received note (GRN)",
          "The remittance advice",
          "The sales invoice",
        ],
        correct: 1,
        explain: "The goods received note records what was physically delivered. Matching it against the purchase order (what we ordered) and the supplier invoice (what we are being charged for) is the classic three-way match — it stops the business paying for goods it never received or was over-charged for. The purchase order is only the intention to buy; a remittance advice accompanies the eventual payment.",
      },
    },
    {
      id: "internal-control",
      heading: "Internal control — purpose and types",
      blocks: [
        { kind: "text", md: "An **internal control** is any measure the organisation puts in place to help it run in an orderly, efficient way, safeguard its assets, prevent and detect fraud and error, and produce reliable records. Controls are how management gets **reasonable assurance** — never absolute, because any control can be over-ridden or defeated by collusion — that objectives are being met." },
        { kind: "text", md: "The most useful way to classify controls is by **when** they act relative to the problem. A **preventive** control stops an error or fraud happening at all. A **detective** control finds one that has already slipped through. A **corrective** control puts things right and stops it recurring. A healthy system layers all three — prevention is cheapest, but you can never prevent everything, so you need detection and correction behind it." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three types of internal control",
          caption: "Classified by when they act — before, during discovery, or after.",
          data: {
            items: [
              { title: "Preventive", sub: "Stop it happening: passwords, authorisation limits, segregation of duties" },
              { title: "Detective", sub: "Find what slipped through: bank reconciliations, exception reports, physical counts" },
              { title: "Corrective", sub: "Put it right & stop recurrence: back-ups, follow-up procedures, error correction" },
            ],
          },
        } },
        { kind: "text", md: "Beneath the types sit the everyday **control activities**. A common memory aid is **SPAMSOAP**: **S**egregation of duties, **P**hysical controls, **A**uthorisation & approval, **M**anagement controls, **S**upervision, **O**rganisation, **A**rithmetical & accounting controls, **P**ersonnel controls. Of these, **segregation of duties** is the single most important idea — no one person should control a transaction from start to finish, because the same person who can create a payment and approve it and record it can steal without anyone noticing." },
        { kind: "callout", tone: "rule", title: "Segregation of duties", md: "Split the four responsibilities — **authorising** a transaction, **executing** it, **recording** it, and holding **custody** of the related asset — between different people. One person holding two or more of these is a fraud waiting to happen." },
      ],
      check: {
        q: "A monthly bank reconciliation that compares the cash book to the bank statement is an example of which type of control?",
        options: [
          "A preventive control, because it stops errors occurring",
          "A detective control, because it finds errors that have already occurred",
          "A corrective control, because it fixes the bank's mistakes",
          "Not a control at all — it is just bookkeeping",
        ],
        correct: 1,
        explain: "A reconciliation is the classic detective control: it does nothing to stop an error or fraud happening, but it reliably surfaces differences that have already arisen — unrecorded charges, errors, or missing lodgements — so they can be investigated. Preventive controls (like authorisation limits) act before the fact; correction is the follow-up step after the reconciliation flags something.",
      },
    },
    {
      id: "internal-vs-external-audit",
      heading: "Internal audit vs external audit",
      blocks: [
        { kind: "text", md: "Two functions both called \"audit\" do very different jobs, and the exam loves to blur them. **External audit** is a legal requirement for many companies: an independent firm gives shareholders an opinion on whether the financial statements show a **true and fair view**. **Internal audit** is a voluntary, in-house function that reports to management and the audit committee, checking that the organisation's own systems and controls are working." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two kinds of audit",
          data: {
            leftTitle: "Internal audit",
            rightTitle: "External audit",
            rows: [
              { aspect: "Purpose", left: "Improve controls & operations", right: "Opinion on the financial statements" },
              { aspect: "Reports to", left: "Management / audit committee", right: "Shareholders (members)" },
              { aspect: "Appointed by", left: "The company itself", right: "Shareholders, on directors' recommendation" },
              { aspect: "Requirement", left: "Voluntary (good practice)", right: "Statutory for many companies" },
              { aspect: "Scope", left: "Whatever management directs — wide", right: "Set by law & auditing standards" },
              { aspect: "Independence", left: "Employees, so less independent", right: "Must be independent of the company" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Watch the direction of reporting", md: "External auditors report **to the shareholders**, not to the directors — even though the directors run the company. Internal auditors report **to management and the audit committee**. Getting these the wrong way round is the classic distractor." },
        { kind: "text", md: "They are not rivals — good external auditors rely partly on the work of a strong internal audit function, and a business with effective internal audit and controls usually gets a smoother, cheaper external audit. But only external audit gives the outside world its independent opinion." },
      ],
    },
    {
      id: "fraud",
      heading: "Fraud — the triangle, prevention and detection",
      blocks: [
        { kind: "text", md: "**Fraud** is deception used to gain an unfair or unlawful advantage — deliberate, unlike an innocent **error**. It ranges from an employee inflating expenses to management manipulating the financial statements (**window dressing**) to hit a target. The reason fraud matters so much here is that internal controls exist largely to make it hard." },
        { kind: "text", md: "Why does fraud happen? Criminologist Donald Cressey's **fraud triangle** says three conditions must usually be present together. **Pressure** (or motivation) — a financial need or target the person feels they cannot meet honestly. **Opportunity** — a weakness in controls that lets them do it and not get caught. **Rationalisation** — the story they tell themselves to square it with their conscience (\"I'm only borrowing it\", \"the company owes me\"). Remove any one side and the fraud is far less likely." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The fraud triangle",
          caption: "All three conditions are usually present when fraud occurs — controls attack the one management can most influence: opportunity.",
          data: {
            levels: [
              { label: "Pressure", sub: "A financial need or target the person cannot meet honestly" },
              { label: "Opportunity", sub: "A control weakness that lets them do it undetected" },
              { label: "Rationalisation", sub: "The justification that makes it feel acceptable" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Where controls bite", md: "Management can rarely change an employee's personal **pressure** or their **rationalisation**, but it can directly shrink **opportunity** — through segregation of duties, authorisation, supervision and reconciliations. That is why strong internal control is the front line against fraud." },
        { kind: "text", md: "Prevention and detection work as a pair. **Prevention** reduces opportunity and pressure: sound controls, an anti-fraud culture set by the **tone at the top**, recruitment screening, a code of conduct and clear consequences. **Detection** catches what prevention misses: reconciliations, exception and analytical review, internal audit, mandatory holidays (so someone else runs the job), and confidential **whistleblowing** channels." },
      ],
      check: {
        q: "An employee with money worries is the only person who both records cash receipts and banks the cash, and tells themselves the company underpays them anyway. Which side of the fraud triangle does segregation of duties directly attack?",
        options: [
          "Pressure — it eases the employee's financial worries",
          "Rationalisation — it changes how the employee feels",
          "Opportunity — it removes the ability to steal undetected",
          "None — segregation of duties is unrelated to fraud",
        ],
        correct: 2,
        explain: "Segregation of duties attacks opportunity. By splitting the recording of receipts from the custody and banking of the cash, no single person can both take the money and hide it in the records. The employee's pressure (money worries) and rationalisation (feeling underpaid) are still there — but the opportunity is gone, and all three sides usually need to be present for the fraud to happen.",
      },
    },
    {
      id: "technology",
      heading: "The impact of technology & information systems",
      blocks: [
        { kind: "text", md: "Technology is rewriting what the finance function does. **Automation** and **robotic process automation (RPA)** take over high-volume, rule-based tasks — posting invoices, matching payments, running reconciliations — faster and with fewer errors than people, freeing accountants to analyse rather than process. The role shifts from **recording** the numbers to **interpreting** them." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Technologies reshaping business and finance",
          caption: "Each changes both what finance does and where new risks sit.",
          data: {
            items: [
              { title: "Automation / RPA", sub: "Software robots run routine, rule-based tasks" },
              { title: "Big data & analytics", sub: "Insight from huge, varied, fast-moving data sets" },
              { title: "Cloud computing", sub: "Software & storage on demand, paid as you use" },
              { title: "Artificial intelligence", sub: "Pattern-spotting, forecasting, anomaly detection" },
              { title: "Fintech", sub: "Digital payments, blockchain, mobile finance" },
              { title: "Cyber security", sub: "Protecting data & systems from attack" },
            ],
          },
        } },
        { kind: "text", md: "**Big data** means data sets too large and complex for traditional tools, usually described by the **four Vs**. **Volume** — the sheer amount. **Velocity** — the speed it arrives and must be processed. **Variety** — the mix of structured and unstructured forms (numbers, text, images, clicks). **Veracity** — how trustworthy and clean it is. **Data analytics** is the discipline of turning that raw data into decisions, and it is increasingly a core finance skill." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "The four Vs of big data",
          caption: "The characteristics that make big data both powerful and hard to handle.",
          data: {
            centre: "Big data",
            nodes: [
              { label: "Volume", sub: "the sheer amount of data" },
              { label: "Velocity", sub: "the speed it arrives" },
              { label: "Variety", sub: "structured & unstructured forms" },
              { label: "Veracity", sub: "how trustworthy it is" },
            ],
          },
        } },
        { kind: "text", md: "**Cloud computing** delivers software and storage over the internet on a pay-as-you-use basis — cutting up-front cost, scaling instantly, and letting teams work anywhere — but it hands custody of the organisation's data to a third party, which raises new control and confidentiality questions. **Fintech** (digital payments, blockchain, mobile banking) is reshaping how money moves. And every one of these gains widens the **cyber security** attack surface." },
        { kind: "callout", tone: "warn", title: "New tools, new controls", md: "Technology does not remove the need for control — it **relocates** it. As tasks move to software and the cloud, controls shift to **access rights, data integrity, back-ups, encryption and cyber security**. The three types (preventive, detective, corrective) still apply — a firewall is preventive, an intrusion-detection alert is detective, a restore-from-back-up is corrective." },
        { kind: "text", md: "The bottom line for a trainee accountant: automation removes the routine, analytics and AI raise the value of interpretation, and cyber and data controls become part of the job. The finance professional of the future spends less time producing numbers and more time asking whether they can be trusted and what they mean." },
      ],
    },
  ],
  examTraps: [
    { trap: "Saying external auditors report to the directors.", fix: "External auditors report to the SHAREHOLDERS (members). Internal auditors report to management and the audit committee." },
    { trap: "Mixing up detective and preventive controls.", fix: "Preventive stops it before it happens (authorisation, passwords); detective finds it after (reconciliations, exception reports); corrective puts it right (back-ups, follow-up)." },
    { trap: "Listing the fraud triangle as pressure, opportunity and 'greed' (or 'capability').", fix: "The three classic sides are pressure, opportunity and RATIONALISATION — the self-justification. Controls target opportunity above all." },
    { trap: "Treating internal audit as legally required and external audit as optional.", fix: "It's the reverse: external (statutory) audit is legally required for many companies; internal audit is voluntary good practice." },
    { trap: "Thinking the four Vs of big data are about size only.", fix: "Volume is only one V. Velocity (speed), Variety (structured/unstructured mix) and Veracity (trustworthiness) matter just as much." },
    { trap: "Assuming automation and cloud remove the need for internal control.", fix: "Controls don't disappear — they move to access rights, data integrity, encryption, back-ups and cyber security." },
  ],
  keyTerms: [
    { term: "Internal control", def: "Any measure that helps an organisation run efficiently, safeguard assets, prevent and detect fraud and error, and keep reliable records — giving reasonable, not absolute, assurance." },
    { term: "Segregation of duties", def: "Splitting authorisation, execution, recording and custody of an asset between different people so no one person controls a whole transaction." },
    { term: "External audit", def: "An independent examination giving shareholders an opinion on whether the financial statements show a true and fair view; statutory for many companies." },
    { term: "Fraud triangle", def: "The three conditions usually present when fraud occurs: pressure, opportunity and rationalisation." },
    { term: "Big data", def: "Data sets too large and complex for traditional tools, characterised by the four Vs — volume, velocity, variety and veracity." },
  ],
  summary: [
    "The finance function is a service to the whole business — it captures data from every department and hands back the information they need, which is why controls concentrate there.",
    "The four core systems are sales, purchases, payroll and cash; each is a flow of matched documents, and the matching is where control lives.",
    "Internal controls come in three types — preventive (stop it), detective (find it), corrective (fix it) — with segregation of duties the most important control activity.",
    "External audit gives shareholders an independent true-and-fair opinion and is statutory; internal audit is a voluntary in-house check on controls reporting to management.",
    "The fraud triangle is pressure + opportunity + rationalisation; controls mainly attack opportunity, backed by an anti-fraud culture and detection like whistleblowing.",
    "Automation, big data (the four Vs), cloud, AI and fintech move finance from recording to interpreting — and relocate controls to access, data integrity and cyber security.",
  ],
}
