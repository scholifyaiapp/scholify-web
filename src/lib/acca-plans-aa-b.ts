/*
 * AA Area B — accepting an engagement, audit risk and materiality,
 * understanding the entity, fraud and laws and regulations, and planning and
 * documentation.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * THIS AREA CONTAINS THE MOST VALUABLE QUESTION IN THE PAPER. Section B's
 * 30-mark question is built on a planning scenario in almost every diet, and
 * the largest single requirement within it asks for audit risks and the
 * auditor's response. Twenty of the paper's hundred marks routinely turn on the
 * one skill planned in AA-07::method.
 *
 * Three errors account for most of the marks lost on it, and none of them is a
 * knowledge failure:
 *
 *  1. BUSINESS RISK OFFERED INSTEAD OF AUDIT RISK. "The company may lose
 *     customers to a competitor" is a risk to the company, not a risk that the
 *     financial statements are misstated. It earns nothing. Every risk must
 *     end in a financial statement effect — which balance is at risk, and
 *     whether it is over- or understated.
 *
 *  2. THE RESPONSE IS SOMETHING MANAGEMENT SHOULD DO. "The company should
 *     count inventory more carefully" is a recommendation, not an audit
 *     response. The response must be what THE AUDITOR will do about the risk,
 *     and it must be capable of being performed.
 *
 *  3. THE RISK IS NOT TAKEN FROM THE SCENARIO. Generic risks that could be
 *     written before reading the question score nothing. Every risk must be
 *     traceable to a stated fact.
 *
 * So the plans in this file force the same three-part shape onto every risk:
 * the fact from the scenario, the financial statement effect, and the
 * auditor's own action. That shape is the marking guide.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const AA_PLANS_B: ExamPlanMap = {
  /* ── AA-06 · Accepting and continuing an engagement ─────────────── */

  "AA-06::preconditions": {
    title: "The preconditions for an audit, and what must be established first",
    format: "written",
    marks: 5,
    requirement:
      "Explain the preconditions for an audit that must be present before an auditor accepts an engagement, and describe the matters an audit firm should consider before accepting a new audit client. (5 marks)",
    plan: [
      {
        step: "Separate the two things the requirement asks for",
        detail:
          "PRECONDITIONS are the specific ISA 210 requirements without which an audit cannot properly be performed. ACCEPTANCE CONSIDERATIONS are the firm's own commercial and ethical screening. They are different lists and both are marked.",
      },
      {
        step: "Give the ISA 210 preconditions precisely",
        detail:
          "First, that an ACCEPTABLE FINANCIAL REPORTING FRAMEWORK will be used. Second, that management ACKNOWLEDGES its responsibilities — for preparing the financial statements, for internal control, and for providing the auditor with access to all information, records and people. This second element is 'the premise' on which every audit is conducted.",
      },
      {
        step: "Then give the firm's own screening as separate points",
        detail:
          "Integrity of the client's management and owners; whether the firm has the resources, competence and time; independence and ethical threats; the risk profile of the client; and commercial matters such as fees and whether the previous auditor's fees are unpaid.",
      },
      {
        step: "Note what must happen if a precondition is absent",
        detail:
          "If management will not acknowledge its responsibilities, or if the framework is unacceptable, the auditor SHALL NOT ACCEPT the engagement — unless law requires otherwise. It is not a matter for safeguards, and saying so is a mark.",
      },
    ],
    answer:
      "**The preconditions for an audit (ISA 210)**\n\n**1. An acceptable financial reporting framework.** The auditor must determine that the framework to be applied in preparing the financial statements — normally IFRS Accounting Standards or a national equivalent — is **acceptable**. Without agreed criteria there is nothing against which the statements can be evaluated, and no opinion is possible.\n\n**2. Management's acknowledgement of its responsibilities — 'the premise'.** Management must acknowledge and understand that it is responsible for:\n\n· the **preparation of the financial statements** in accordance with the applicable framework\n· the **internal control** necessary to enable the preparation of statements free from material misstatement, whether due to fraud or error\n· providing the auditor with **access to all relevant information**, any additional information requested, and **unrestricted access to persons** within the entity from whom evidence is needed\n\n**If these preconditions are not present, the auditor shall not accept the engagement** (unless required to by law or regulation). This is not a matter to be managed with safeguards — an audit without access, or without an agreed framework, cannot be performed.\n\n**Matters to consider before accepting a new client**\n\n· **Integrity of the client's management, directors and principal owners** — a client whose management lacks integrity presents an unacceptable risk however profitable the engagement.\n· **Competence and resources** — does the firm have the staff, the specialist expertise and the **time** to perform the audit properly before the deadline?\n· **Independence and ethical threats** — existing relationships, other services provided, fee dependence, and any conflict with an existing client.\n· **Risk** — the client's financial position, its industry, whether it is listed, and the reputational and litigation exposure the engagement would create.\n· **Commercial matters** — whether an adequate fee can be charged, and whether the **outgoing auditor's fees remain unpaid**, which is itself a warning sign.\n· **Professional clearance** — writing to the outgoing auditor, with the client's permission, to ask whether there is any reason not to accept.",
    earns: [
      "Separating the ISA 210 preconditions from the firm's own acceptance screening",
      "Giving all three limbs of management's acknowledgement, including access to information and people",
      "Knowing the engagement must be declined where a precondition is absent",
    ],
    loses: [
      "Giving only the commercial screening and omitting the ISA 210 preconditions",
      "Suggesting safeguards where management will not acknowledge its responsibilities",
    ],
  },

  "AA-06::clearance-letter": {
    title: "Professional clearance, and the contents of an engagement letter",
    format: "written",
    marks: 6,
    requirement:
      "Explain the procedures an audit firm should perform in relation to professional clearance before accepting appointment, and describe the principal contents of an engagement letter. (6 marks)",
    plan: [
      {
        step: "Split six marks between the two halves",
        detail:
          "Roughly three for clearance and three for the letter's contents. Both are list requirements and each valid point is a mark, so aim for three or four points on each side rather than a long essay on one.",
      },
      {
        step: "Get the order of the clearance procedure right, because the order is the point",
        detail:
          "Ask the CLIENT for permission to contact the outgoing auditor FIRST. Only then write to the outgoing auditor. The outgoing auditor must also obtain the client's permission before replying. Permission is the hinge of the whole procedure because of the duty of confidentiality.",
      },
      {
        step: "State what happens if permission is refused",
        detail:
          "If the client refuses permission, or the outgoing auditor's reply is not received or discloses concerns, the firm should DECLINE the appointment. A refusal to allow the previous auditor to speak is itself evidence about management's integrity.",
      },
      {
        step: "List the engagement letter contents as discrete points",
        detail:
          "Objective and scope of the audit; responsibilities of the auditor; responsibilities of management; identification of the reporting framework; the expected form and content of reports; the fee basis; and reference to the inherent limitations of an audit and the possibility that misstatement may remain undetected.",
      },
    ],
    answer:
      "**Professional clearance procedures**\n\n· **Obtain the prospective client's permission** to communicate with the outgoing auditor. Without it, the firm should **decline the appointment** — the refusal itself raises a question about management's integrity.\n· **Write to the outgoing auditor** asking whether there are any **professional or other reasons** why the appointment should not be accepted.\n· The **outgoing auditor must obtain the client's permission** before replying, because they remain bound by **confidentiality** even after ceasing to act. If that permission is refused, the outgoing auditor tells the incoming firm only that permission was refused — which is itself informative.\n· **Consider the reply.** If no reply is received, or the reply discloses matters of concern such as a disagreement over accounting treatment, unpaid fees or doubts about management's integrity, the firm should **investigate further and consider declining**.\n· Where accepted, ensure the outgoing auditor has been **properly removed or has resigned** and that the firm's own appointment is **valid** — the firm must also be **eligible** to act.\n\n**Principal contents of an engagement letter**\n\nThe letter is sent **before** the audit begins and forms the contract between firm and client, setting expectations and reducing the risk of misunderstanding or dispute:\n\n· the **objective and scope** of the audit of the financial statements\n· the **responsibilities of the auditor** — to form and express an opinion, and to conduct the audit in accordance with ISAs\n· the **responsibilities of management** — for preparing the financial statements, for internal control, and for providing access to information and personnel\n· identification of the **applicable financial reporting framework**\n· the **expected form and content of any reports** to be issued, and a statement that circumstances may mean a report differs from its expected form\n· the **basis on which fees are charged** and any billing arrangements\n· reference to the **inherent limitations** of an audit, and to the unavoidable risk that some material misstatement may not be detected\n· arrangements regarding the **planning and performance** of the audit, including the involvement of internal audit, component auditors or experts\n\nThe letter should be **reviewed each year** and reissued where circumstances change — a change in senior management, a change in the nature or scale of the business, or a change in reporting requirements.",
    earns: [
      "Putting client permission before contact with the outgoing auditor",
      "Knowing the outgoing auditor also needs permission before replying, because of confidentiality",
      "Saying what to do if permission is refused or no reply is received",
      "Listing engagement letter contents as separate, markable points",
    ],
    loses: [
      "Writing to the outgoing auditor without obtaining the client's permission first",
      "Describing the engagement letter's purpose at length instead of its contents",
    ],
  },

  "AA-06::acceptance-scenario": {
    title: "An acceptance decision, worked from a scenario",
    format: "written",
    marks: 8,
    requirement:
      "Your firm has been invited to tender for the audit of Pentland Co, a listed company. Your enquiries reveal the following.\n\n· The current auditor resigned two months ago, and their fees for the last audit remain unpaid.\n· Pentland Co's finance director is the sister of one of your firm's audit partners, who would not be involved in the engagement.\n· The audit must be completed within six weeks of the year end, which is three weeks earlier than your firm's other clients of similar size.\n· Pentland Co has asked whether your firm would also prepare its tax computations and provide advice on a planned acquisition.\n\nIdentify and explain the matters your firm should consider before accepting appointment as auditor of Pentland Co, and state the action the firm should take in respect of each. (8 marks)",
    plan: [
      {
        step: "Read the allocation as four pairs, and match them to the four bullets",
        detail:
          "Eight marks, four issues. One mark for identifying and explaining each matter, one for the action. The scenario has been written with exactly one issue per bullet, so the structure of the answer is given to you — use it.",
      },
      {
        step: "Read the resignation and unpaid fees as TWO separate concerns",
        detail:
          "Why did the previous auditor resign — was there a disagreement? And unpaid fees may create a self-interest threat for the outgoing firm and suggest the client does not pay. Both point to obtaining professional clearance before anything else.",
      },
      {
        step: "Apply the ethical rules to the family relationship, and note the client is LISTED",
        detail:
          "A close family relationship between an audit partner and the finance director is a familiarity and self-interest threat. That the partner would not be on the engagement helps but may not be sufficient at a firm where they could still influence it. Listed-client rules are stricter throughout this scenario.",
      },
      {
        step: "Treat the deadline as a competence and quality question, not a commercial one",
        detail:
          "A deadline three weeks tighter than comparable audits raises whether the firm can obtain SUFFICIENT APPROPRIATE EVIDENCE in the time. Accepting work that cannot be performed properly breaches professional competence and due care.",
      },
      {
        step: "Split the two additional services, because they are not the same answer",
        detail:
          "Tax computations for a listed client may be permissible with safeguards depending on materiality and whether they involve management judgement. Corporate finance advice on an acquisition creates ADVOCACY and SELF-REVIEW threats — the firm would later audit the accounting for a transaction it advised on.",
      },
    ],
    answer:
      "**1. The previous auditor's resignation, and their unpaid fees**\n\n*Matter:* An auditor resigning mid-term is unusual and may indicate a **disagreement with management**, concerns about integrity, or a scope limitation. Unpaid fees suggest the client may not pay, and mean the outgoing firm has a **self-interest** in the situation. The firm needs to know why the resignation occurred before committing.\n\n*Action:* Obtain the client's **permission to contact the outgoing auditor** and write requesting any professional reasons why the appointment should not be accepted. Obtain and read the outgoing auditor's **statement of circumstances** deposited on resignation. If permission is refused, or the reply discloses concerns, **decline the appointment**.\n\n**2. The family relationship between an audit partner and the finance director**\n\n*Matter:* The finance director is a **close family member** of an audit partner. This creates a **familiarity threat** — a reluctance to challenge a sibling's judgements — and a **self-interest threat**. Because the finance director is in a position to exert **significant influence over the financial statements**, the threat is serious, and Pentland Co is a **listed** company, where the rules are strictest.\n\n*Action:* Ensure the partner is **excluded from the engagement team** and from any role that could influence the audit — no consultation, no quality review, no involvement in fee negotiation, and ideally located in a **different office**. The firm should evaluate whether even these safeguards are sufficient; if the partner could still influence the outcome, the appointment should be **declined**.\n\n**3. The reporting deadline**\n\n*Matter:* Six weeks is **three weeks shorter** than the firm needs for comparable clients. This raises whether the firm can obtain **sufficient appropriate evidence** in the time available, and whether it has enough suitably experienced staff free at that point in the year. Accepting work the firm cannot perform properly breaches **professional competence and due care**, and risks an unsupported opinion.\n\n*Action:* Assess **staff availability** for the specific period and whether the firm has the resources to meet the deadline. **Discuss the timetable with management** and seek an extension, or agree an early start with substantial interim work. If a proper audit cannot be completed in the time, the firm should **decline**.\n\n**4. The request for tax computations and acquisition advice**\n\n*Matter:* Two different problems. **Preparing tax computations** creates a **self-review threat**, since the tax charge and any deferred tax would then be audited by the firm that calculated them; for a listed client this is only acceptable where the amounts are not material to the financial statements and the firm does not exercise management judgement. **Advising on an acquisition** creates an **advocacy threat** — the firm would be promoting the client's position — and a **self-review threat**, because it would later audit the accounting for the very transaction it advised on, including goodwill and fair values.\n\n*Action:* Consider each service **separately**. Tax computation services may be provided with safeguards — a **separate team** with no audit involvement and an **independent review** — provided the amounts are not material. The **corporate finance advice should be declined**, as the combined advocacy and self-review threats to a listed audit client cannot be reduced to an acceptable level.\n\n**Overall.** Several of these matters can be managed, but the **reason for the previous auditor's resignation** must be established before any of the others matter. If professional clearance cannot be obtained, the firm should not tender.",
    earns: [
      "Four matters, each with an explanation and a specific action",
      "Recognising that the client is listed and applying the stricter rules",
      "Splitting the two additional services, which have different answers",
      "Explaining the deadline as a competence and evidence issue rather than a commercial one",
    ],
    loses: [
      "Identifying matters without stating the action to take, which halves the marks",
      "Treating both requested services as a single self-review issue",
      "Recommending safeguards for the acquisition advice, where declining is the answer",
    ],
  },

  /* ── AA-07 · Audit risk and materiality ─────────────────────────── */

  "AA-07::the-model": {
    title: "The audit risk model and its components",
    format: "written",
    marks: 6,
    requirement:
      "Explain the components of audit risk, and describe how the auditor responds to an increase in the risk of material misstatement. (6 marks)",
    plan: [
      {
        step: "State the model as an equation and then define each term",
        detail:
          "AUDIT RISK = INHERENT RISK × CONTROL RISK × DETECTION RISK. Writing the relationship first makes the final part of the requirement — the response — follow logically rather than needing to be recalled separately.",
      },
      {
        step: "Define audit risk precisely, because the definition is a mark",
        detail:
          "The risk that the auditor expresses an INAPPROPRIATE OPINION when the financial statements are MATERIALLY MISSTATED. Not 'the risk of getting the audit wrong', and not the risk of misstatement itself.",
      },
      {
        step: "Separate the two the auditor cannot control from the one they can",
        detail:
          "INHERENT and CONTROL risk exist in the entity and together form the RISK OF MATERIAL MISSTATEMENT. The auditor ASSESSES them but cannot change them. DETECTION RISK is the risk the auditor's own procedures fail to detect a misstatement, and it is the only component the auditor controls.",
      },
      {
        step: "Derive the response from the equation",
        detail:
          "To hold audit risk at an acceptably low level while the risk of material misstatement rises, DETECTION RISK must be REDUCED. That means more work: more experienced staff, more procedures, larger samples, more testing at the year end rather than at an interim date, and increased professional scepticism.",
      },
    ],
    answer:
      "**Audit risk** is the risk that the auditor **expresses an inappropriate audit opinion** when the financial statements are **materially misstated**. It has two parts, which multiply together:\n\n**AUDIT RISK = RISK OF MATERIAL MISSTATEMENT × DETECTION RISK**\n\nwhere the risk of material misstatement is itself **inherent risk × control risk**.\n\n**Inherent risk.** The susceptibility of a balance or class of transactions to misstatement **before considering any related controls**. It is higher where a figure involves significant **judgement or estimation** (provisions, fair values, impairments), where transactions are **complex or unusual**, where assets are **easily stolen** such as cash and portable inventory, and where the industry is subject to rapid change.\n\n**Control risk.** The risk that a misstatement will **not be prevented, or detected and corrected, by the entity's internal control**. It is higher where the control environment is weak, where duties are not segregated, where management can override controls, and where the entity is small enough that segregation is impractical.\n\nInherent and control risk are **properties of the entity**. The auditor **assesses** them but cannot alter them.\n\n**Detection risk.** The risk that the **auditor's own procedures fail to detect** a misstatement that exists and is material. It has two elements — **sampling risk**, that the sample selected is not representative, and **non-sampling risk**, that the auditor uses an inappropriate procedure, misinterprets evidence or fails to recognise a misstatement. **This is the only component the auditor controls.**\n\n**The response to an increased risk of material misstatement**\n\nSince audit risk must be held at an **acceptably low level**, a higher risk of material misstatement requires **detection risk to be reduced**, which means performing **more and better work**:\n\n· assign **more experienced staff** to the engagement, and increase **supervision and review**\n· increase the **extent** of testing — larger sample sizes\n· change the **nature** of procedures towards more reliable evidence, such as **external confirmation** or physical inspection rather than enquiry\n· change the **timing** — perform more work at or after the **year end** rather than at an interim date\n· apply **greater professional scepticism**, and introduce an **element of unpredictability** into the procedures selected\n· where necessary, use an **auditor's expert**",
    earns: [
      "Defining audit risk as the risk of an inappropriate opinion, not the risk of misstatement",
      "Grouping inherent and control risk as the risk of material misstatement",
      "Identifying detection risk as the only component the auditor controls",
      "Deriving the response from the model rather than listing procedures at random",
    ],
    loses: [
      "Defining audit risk as the risk that the financial statements are misstated",
      "Suggesting the auditor can reduce inherent or control risk",
      "Giving the components without answering the second half on the response",
    ],
  },

  "AA-07::materiality": {
    title: "Setting materiality and performance materiality",
    format: "mtq",
    marks: 10,
    requirement:
      "You are planning the audit of Calderbank Co for the year ended 31 December 20X5. Its draft financial statements show revenue of $40 million, profit before tax of $2.4 million and total assets of $30 million.\n\n(1) Which of the following is within the range normally used as a benchmark for overall materiality based on profit before tax?\nA  0.5% – 1%  B  1% – 2%  C  5% – 10%  D  15% – 20%\n\n(2) Applying the usual benchmarks, which of the following would be a reasonable overall materiality figure for Calderbank Co?\nA  $24,000  B  $200,000  C  $1,200,000  D  $3,000,000\n\n(3) Performance materiality is:\nA  Set higher than overall materiality, to reduce the volume of testing\nB  Set lower than overall materiality, to reduce the risk that uncorrected misstatements aggregate above materiality\nC  The same as overall materiality, applied to individual balances\nD  Used only where the auditor expects to modify the opinion\n\n(4) An error of $3,000 has been found in the disclosure of directors' remuneration. In relation to overall materiality this amount is very small. The auditor should regard the error as:\nA  Immaterial, because it falls far below the calculated threshold\nB  Material by nature, because of the sensitivity of directors' remuneration disclosures\nC  Material only if the directors refuse to correct it\nD  A matter for management rather than the auditor\n\n(5) During the audit it becomes clear that profit before tax will be $1.6 million rather than $2.4 million. The auditor should:\nA  Retain the materiality set at planning, for consistency\nB  Revise materiality, and reconsider whether the procedures already performed remain sufficient\nC  Revise materiality only for the remaining procedures\nD  Report the change to those charged with governance and take no other action",
    plan: [
      {
        step: "Memorise the three benchmark ranges as a single block",
        detail:
          "0.5%–1% of REVENUE. 5%–10% of PROFIT BEFORE TAX. 1%–2% of TOTAL ASSETS. Profit has the widest range because it is the most volatile measure and the one users focus on most. These three lines answer a large proportion of AA materiality questions on their own.",
      },
      {
        step: "Apply all three benchmarks and look at the range they produce",
        detail:
          "Revenue $200,000–$400,000; profit $120,000–$240,000; assets $300,000–$600,000. The auditor selects a figure using judgement about which measure matters most to users — but any answer far outside the whole range, high or low, is wrong.",
      },
      {
        step: "Fix why performance materiality is LOWER",
        detail:
          "Individually immaterial misstatements can AGGREGATE to something material. Setting the working threshold below overall materiality gives a margin, so that the total of undetected and uncorrected misstatements is unlikely to exceed materiality. Anything describing it as higher inverts the whole purpose.",
      },
      {
        step: "Remember materiality has a QUALITATIVE dimension",
        detail:
          "Some items are material BY NATURE however small: directors' remuneration, related party transactions, and anything that turns a profit into a loss or breaches a covenant or a legal requirement. A purely arithmetic approach to materiality fails these.",
      },
      {
        step: "Treat materiality as provisional, not fixed at planning",
        detail:
          "It is set at planning on DRAFT figures and must be REVISED if the actual results differ significantly. Revising it also means revisiting whether work already performed was sufficient — a lower materiality may mean samples already tested are now too small.",
      },
    ],
    answer:
      "**(1) C — 5% to 10% of profit before tax.** The three benchmarks normally used:\n\n| Benchmark | Range |\n|---|---|\n| **Revenue** | 0.5% – 1% |\n| **Profit before tax** | 5% – 10% |\n| **Total assets** | 1% – 2% |\n\n**(2) B — $200,000.** Applying each benchmark to Calderbank Co:\n\n· Revenue: 0.5%–1% × $40m = **$200,000 – $400,000**\n· Profit before tax: 5%–10% × $2.4m = **$120,000 – $240,000**\n· Total assets: 1%–2% × $30m = **$300,000 – $600,000**\n\n$200,000 sits within the revenue range and at the upper end of the profit range, so it is a defensible figure. **A** ($24,000) is 1% of profit — far below any benchmark. **C** ($1.2m) is 50% of profit. **D** ($3m) exceeds profit entirely.\n\n**(3) B — set lower than overall materiality, to reduce the risk of aggregation.** Individually immaterial misstatements can **add up** to a material amount. Performance materiality is a **lower working threshold** applied when performing procedures, giving a margin so that the total of uncorrected and undetected misstatements is unlikely to exceed overall materiality. Setting it higher would defeat its purpose entirely.\n\n**(4) B — material by nature.** Materiality is **not purely arithmetic**. Some items are material because of what they are, regardless of size — **directors' remuneration**, **related party transactions**, and any misstatement that would **turn a profit into a loss**, **breach a loan covenant**, or cause a **legal or regulatory requirement** to be broken. Directors' remuneration is specifically sensitive because it is disclosed for the benefit of shareholders assessing stewardship.\n\n**(5) B — revise materiality and reconsider the sufficiency of work already performed.** Materiality is set at planning using **draft or estimated figures** and is **provisional**. Where actual results differ significantly it must be **revised** — here profit has fallen by a third, so a profit-based materiality would fall correspondingly. Critically, the auditor must then ask whether **procedures already performed remain sufficient**: a lower materiality means smaller misstatements now matter, so samples already tested may be too small and further work may be required.",
    earns: [
      "Knowing all three benchmark ranges rather than one",
      "Applying every benchmark and judging the answer against the combined range",
      "Explaining performance materiality by the aggregation risk it exists to manage",
      "Recognising materiality by nature, and that materiality is revised during the audit",
    ],
    loses: [
      "Applying the profit percentage to revenue, or the revenue percentage to profit",
      "Describing performance materiality as higher than overall materiality",
      "Treating materiality as purely a calculation, so a small but sensitive error is dismissed",
    ],
  },

  "AA-07::method": {
    title: "Answering the audit risk question: risk, effect, and the auditor's response",
    format: "written",
    marks: 20,
    requirement:
      "You are planning the audit of Hawksmoor Co, a manufacturer, for the year ended 30 June 20X6. Your discussions with management have identified the following.\n\n· A new inventory and accounting system was implemented in January 20X6, replacing the previous system. Balances were transferred from the old system by the finance team.\n· Approximately 30% of finished goods inventory is held at a third-party warehouse operated by an unrelated logistics company.\n· Inventory is held at six sites. The audit team has resources to attend the count at two of them.\n· Hawksmoor Co capitalised $1.8 million of development expenditure on a new product during the year. The product has not yet been brought to market.\n· During the year Hawksmoor Co began selling machines bundled with a three-year maintenance contract for a single price. The full amount has been recognised as revenue on delivery.\n· A customer owing $900,000 at the year end has entered administration since the year end. No allowance has been made.\n· The directors' bonus, payable for the first time this year, is based on reported profit before tax.\n· A bank loan taken out in March 20X6 contains a covenant requiring gearing to remain below 50%.\n· A customer has commenced legal action claiming $600,000 for a defective machine. The directors consider the claim will fail and have made no provision.\n· A significant volume of raw materials is purchased from overseas suppliers in foreign currency, with balances outstanding at the year end.\n\nDescribe TEN audit risks, and explain the auditor's response to each risk, in planning the audit of Hawksmoor Co. (20 marks)",
    plan: [
      {
        step: "Read the allocation and lay the page out before writing a word",
        detail:
          "Twenty marks, ten risks: ONE mark for the risk and ONE for the response. Build a two-column table — Audit risk | Auditor's response — with ten rows. The marking guide is in exactly these pairs, and the layout alone protects half the marks.",
      },
      {
        step: "Take one risk from each scenario bullet, and never invent any",
        detail:
          "The scenario has ten bullets and asks for ten risks. That is not a coincidence — AA scenarios are written with one risk per fact. A generic risk that could have been written before reading the question scores nothing, so every risk must be traceable to a stated fact.",
      },
      {
        step: "End every risk with a FINANCIAL STATEMENT effect, in the same shape each time",
        detail:
          "Fact from the scenario → what could go wrong → WHICH BALANCE is affected and whether it is OVER- or UNDERSTATED. 'The company may lose money on the legal claim' is business risk and earns nothing; 'provisions may be understated and profit overstated' is audit risk and earns the mark.",
      },
      {
        step: "Make every response an action THE AUDITOR performs",
        detail:
          "Not what management should do. 'The company should improve its inventory controls' is a recommendation and scores zero here. 'Attend the inventory count at the two largest sites and perform test counts in both directions' is an audit response. Start each response with a verb the auditor can perform: inspect, attend, confirm, recalculate, discuss, review.",
      },
      {
        step: "Watch for the two risks that colour the whole audit",
        detail:
          "The directors' bonus and the loan covenant are both MANAGEMENT BIAS risks — they give management a motive to overstate profit and misstate gearing, and they raise the assessed risk across every judgemental balance. Identify them as risks in their own right, and let them justify heightened scepticism elsewhere.",
      },
      {
        step: "Do not stop at nine",
        detail:
          "Each pair is worth two marks, so the tenth pair is worth as much as the first. If time is short, write shorter risks rather than fewer — an unwritten pair scores nothing, while a brief one usually scores one of its two marks.",
      },
    ],
    answer:
      "| **Audit risk** | **Auditor's response** |\n|---|---|\n| **1. New system implemented mid-year.** Balances were transferred by the finance team in January. Data may have been transferred incompletely or inaccurately, and opening balances or comparatives may be misstated. Controls over the new system may not have operated effectively from the outset. | **Discuss the migration process** with management and **document** the new system. **Test the transfer** by agreeing a sample of balances from the old system to the new. Perform **tests of control** over the new system for the post-implementation period, and consider whether a **substantive approach** is more appropriate for the period as a whole. |\n| **2. Inventory held at a third-party warehouse.** 30% of finished goods is not under the company's physical control, so **existence** of that inventory is at risk and it may be **overstated**. | **Request direct confirmation** from the third-party warehouse operator of the quantities held on Hawksmoor Co's behalf, and **attend the count at the warehouse** or inspect the inventory, since confirmation alone provides less reliable evidence of condition. |\n| **3. Inventory at six sites, with attendance at only two.** The auditor cannot attend every count, so misstatements at unvisited sites may go undetected — **detection risk** is increased and inventory could be **over- or understated**. | **Select the two sites with the highest value or greatest risk** for attendance. For the remaining sites, **review the company's count instructions**, obtain and inspect the **count sheets**, perform **analytical procedures** on site-level inventory, and consider **rotating** attendance across sites in future years. |\n| **4. Development expenditure of $1.8m capitalised.** Under IAS 38 development costs may only be capitalised where all six criteria are met. The product is **not yet on the market**, so technical feasibility and the probability of future economic benefits are questionable. **Intangible assets and profit may be overstated.** | **Obtain a breakdown** of the $1.8m and **inspect supporting documentation** — budgets, feasibility studies, board minutes and market research — to assess whether **each of the IAS 38 criteria** is satisfied, and confirm that no research expenditure has been capitalised. |\n| **5. Bundled sale of machines with three-year maintenance.** Under IFRS 15 the transaction price must be **allocated** between the two performance obligations, with the maintenance element recognised over three years. Recognising the whole amount on delivery means **revenue and profit are overstated** and **contract liabilities understated**. | **Review the contract terms** for a sample of these sales, **recalculate the allocation** of the transaction price between the machine and the maintenance obligation on a stand-alone selling price basis, and **discuss the accounting treatment with management**, quantifying the misstatement. |\n| **6. Customer owing $900,000 in administration.** This is an **adjusting event after the reporting period** under IAS 10 — it confirms the balance was irrecoverable at the year end. With no allowance made, **receivables and profit are overstated**. | **Discuss with management** their rationale for making no allowance. **Review post year-end correspondence** with the administrator and any cash received since the year end, and **request that the receivable be written down**, quantifying the effect on the financial statements. |\n| **7. Directors' bonus based on reported profit.** Management has a direct **incentive to overstate profit**, creating a risk of **management bias** in judgemental areas and of manipulation across the financial statements generally. | Maintain **heightened professional scepticism** throughout. **Review judgemental areas and estimates for evidence of bias**, including the provisions and the development costs above. **Test journal entries**, particularly unusual entries made close to the year end, and **recalculate the bonus** to confirm it is correctly accrued and disclosed. |\n| **8. Loan covenant requiring gearing below 50%.** Breach could make the loan **repayable on demand**. Management has an incentive to **understate liabilities or overstate equity**, and misclassification of the loan between current and non-current is a risk. | **Recalculate the gearing ratio** at the year end to determine whether the covenant has been met, and how narrowly. **Inspect the loan agreement** for its terms and repayment schedule, and **confirm the split between current and non-current** liabilities is correct. If the covenant is breached, consider the **going concern** implications and the adequacy of disclosure. |\n| **9. Legal claim of $600,000 with no provision.** Under IAS 37 a provision is required where an outflow is probable, and a **contingent liability must be disclosed** where it is possible. Relying on the directors' own view is not sufficient evidence. If a provision or disclosure is required, **liabilities are understated** or disclosure is **incomplete**. | **Obtain a written response from the company's legal advisers** on the likely outcome. **Inspect board minutes** and correspondence relating to the claim, **obtain a written representation** from management on their assessment, and **review the adequacy of the disclosure** made. |\n| **10. Foreign currency purchases and year-end balances.** Under IAS 21 transactions are recorded at the spot rate and **monetary balances retranslated at the closing rate**, with differences to profit or loss. Incorrect rates or a failure to retranslate would mean **payables and profit are misstated**. | **Recalculate the translation** of a sample of transactions and of the year-end payables balances using **rates obtained from an independent source**, and **agree the exchange differences** recognised in profit or loss. |\n\n**Two risks affect the audit as a whole.** The **directors' bonus** and the **loan covenant** both give management a motive to misstate the financial statements. Together they raise the assessed **risk of material misstatement** across every judgemental balance, and justify assigning more experienced staff, increasing sample sizes, and introducing an element of **unpredictability** into the procedures selected.",
    earns: [
      "Ten risks and ten responses, laid out as pairs the marker can follow",
      "Every risk traced to a fact in the scenario and ending in a financial statement effect",
      "Every response an action the auditor performs, starting with a doing verb",
      "Identifying the bonus and the covenant as management bias risks in their own right",
      "Naming the relevant standard where it decides the treatment — IAS 38, IFRS 15, IAS 10, IAS 37, IAS 21",
    ],
    loses: [
      "Offering business risks — losing customers, competition, rising costs — which earn nothing",
      "Responses that are recommendations to management rather than audit procedures",
      "Generic risks that could have been written without reading the scenario",
      "Describing the risk without saying which balance is misstated and in which direction",
      "Producing fewer than ten pairs when each is worth two marks",
    ],
  },

  /* ── AA-08 · Understanding the entity and analytical procedures ─── */

  "AA-08::understanding": {
    title: "What the auditor must understand about the entity, and why",
    format: "written",
    marks: 5,
    requirement:
      "Explain why the auditor obtains an understanding of the entity and its environment, and describe the matters about which that understanding must be obtained. (5 marks)",
    plan: [
      {
        step: "Answer the 'why' first, in one strong sentence",
        detail:
          "The understanding is obtained in order to IDENTIFY AND ASSESS THE RISKS OF MATERIAL MISSTATEMENT. It is not knowledge for its own sake — it is the input to the risk assessment that drives the whole audit plan.",
      },
      {
        step: "List the ISA 315 matters as separate points",
        detail:
          "Industry, regulatory and other external factors including the reporting framework; the nature of the entity — operations, ownership, structure, investments and financing; accounting policies and any changes; objectives, strategies and related business risks; measurement and review of financial performance; and the entity's system of internal control.",
      },
      {
        step: "Give the procedures used to obtain it, since they are separately marked",
        detail:
          "Enquiry of management and others within the entity, ANALYTICAL PROCEDURES, and OBSERVATION AND INSPECTION. These three are required risk assessment procedures under ISA 315. Add discussion among the engagement team, which is also required.",
      },
      {
        step: "Close the loop back to the audit plan",
        detail:
          "The understanding identifies where misstatement is most likely, so it determines which balances get the most work and what procedures are chosen. Without it, the audit would be a uniform test of everything, which is neither efficient nor effective.",
      },
    ],
    answer:
      "**Why the understanding is obtained.** ISA 315 requires the auditor to obtain an understanding of the entity and its environment in order to **identify and assess the risks of material misstatement**, whether due to fraud or error, at the financial statement and assertion levels. That assessment is the **basis for designing and performing further audit procedures** — it determines where the audit effort is directed. Without it, the auditor has no rational basis for deciding which balances are risky, and the audit becomes an undirected test of everything.\n\nIt also helps the auditor to **set materiality**, to **identify unusual transactions and related parties**, to **evaluate the reasonableness of estimates** and of management's judgements, and to assess whether the **going concern** basis is appropriate.\n\n**Matters about which understanding must be obtained**\n\n· **Industry, regulatory and other external factors** — the competitive environment, the regulatory framework the entity operates under, and the **applicable financial reporting framework**.\n· **The nature of the entity** — its operations, ownership and governance structure, the types of investment it makes, how it is structured, and how it is **financed**.\n· **The entity's selection and application of accounting policies**, including the reasons for any **changes**, and whether they are appropriate for its business and consistent with the framework.\n· **The entity's objectives and strategies, and the related business risks** that may result in a risk of material misstatement.\n· **The measurement and review of the entity's financial performance** — what management measures, and what performance measures might create **pressure to misstate**.\n· **The entity's system of internal control**, including the control environment, its risk assessment process, the information system, control activities and monitoring.\n\n**How it is obtained.** ISA 315 requires **risk assessment procedures**: **enquiries** of management and of others within the entity, including those outside the finance function; **analytical procedures**; and **observation and inspection** — touring premises, reading board minutes, inspecting manuals and prior year files. The engagement team is also required to **discuss** the susceptibility of the financial statements to material misstatement.",
    earns: [
      "Stating the purpose as identifying and assessing the risks of material misstatement",
      "Covering all six ISA 315 matters as separate points",
      "Naming the three risk assessment procedures and the team discussion",
    ],
    loses: [
      "Describing what the auditor learns without saying what the understanding is FOR",
      "Listing only the business and industry, omitting internal control and accounting policies",
    ],
  },

  "AA-08::analytical": {
    title: "Analytical procedures, and the three stages at which they are used",
    format: "written",
    marks: 6,
    requirement:
      "Explain what is meant by analytical procedures, describe the three stages of the audit at which they may be used, and state the factors that determine whether they can be relied upon as substantive procedures. (6 marks)",
    plan: [
      {
        step: "Define them by what they compare, not by naming ratios",
        detail:
          "Evaluations of financial information through analysis of PLAUSIBLE RELATIONSHIPS among both financial and non-financial data, including investigation of identified fluctuations and inconsistencies. The definition includes the investigation — a comparison with no follow-up is not an analytical procedure.",
      },
      {
        step: "Give the three stages, and say which two are MANDATORY",
        detail:
          "RISK ASSESSMENT at planning — required. SUBSTANTIVE PROCEDURES during the audit — optional, at the auditor's discretion. FINAL REVIEW near the end — required, to form an overall conclusion on whether the statements are consistent with the auditor's understanding. Knowing which two are required is a mark.",
      },
      {
        step: "Give examples of the comparisons available",
        detail:
          "Prior period figures, budgets and forecasts, industry averages, expectations the auditor develops independently, and relationships between financial and NON-FINANCIAL data such as payroll cost against employee numbers, or revenue against units despatched.",
      },
      {
        step: "State the reliance factors, which are the last part of the requirement",
        detail:
          "The RELIABILITY of the data used, including whether it is from an independent source and whether controls over it are effective; the PRECISION with which an expectation can be formed; the PLAUSIBILITY and predictability of the relationship; and the acceptable level of difference before investigation is required.",
      },
    ],
    answer:
      "**What analytical procedures are.** Evaluations of financial information through **analysis of plausible relationships** among both financial and **non-financial** data. They also encompass the **investigation** of identified fluctuations or relationships that are inconsistent with other information or that differ from expected values by a significant amount. The investigation is part of the definition — a comparison that is noted and not followed up is not an analytical procedure.\n\nComparisons available include:\n\n· **prior period** figures, and trends over several periods\n· **budgets, forecasts and management's own expectations**\n· **industry averages** and comparable entities\n· an **expectation developed independently by the auditor**\n· relationships between elements of financial information — for example gross margin, receivables days, or interest against average borrowings\n· relationships between financial and **non-financial** information — payroll cost against the number of employees, revenue against units despatched, occupancy against room revenue\n\n**The three stages**\n\n**1. Risk assessment, at the planning stage — REQUIRED.** ISA 315 requires analytical procedures as a risk assessment procedure. They help the auditor identify **unusual transactions, unexpected relationships and areas of higher risk** that need further attention.\n\n**2. As substantive procedures, during the audit — OPTIONAL.** Substantive analytical procedures may be used **instead of, or together with, tests of detail** to obtain evidence about a balance. They are most effective for large volumes of predictable transactions, such as payroll or interest.\n\n**3. At the final review stage — REQUIRED.** ISA 520 requires analytical procedures near the end of the audit, to assist in forming an **overall conclusion** on whether the financial statements are **consistent with the auditor's understanding** of the entity. This is the last opportunity to notice that something does not make sense.\n\n**Factors determining whether they can be relied on substantively**\n\n· the **reliability of the data** used — its source, whether it is independent of the entity, its comparability, and whether **controls over its preparation** are effective\n· the **precision** with which an expectation can be developed — a relationship the auditor can predict closely provides much stronger evidence\n· the **plausibility and predictability** of the relationship — payroll is highly predictable, while discretionary repairs expenditure is not\n· the **suitability** of the procedure for the assertion being tested — analytical procedures are generally weak evidence of the **existence** of an individual asset\n· the amount of **difference from the expectation that is acceptable** without investigation, which should be set by reference to performance materiality",
    earns: [
      "Including investigation of differences within the definition",
      "Identifying planning and final review as mandatory, and substantive use as optional",
      "Giving non-financial comparisons, not only ratio analysis",
      "Covering reliability, precision and predictability as the reliance factors",
    ],
    loses: [
      "Listing ratios instead of defining analytical procedures",
      "Stating that analytical procedures are optional at all three stages",
      "Omitting the reliance factors, which are a third of the requirement",
    ],
  },

  "AA-08::understanding-to-risk": {
    title: "Turning an understanding of the entity into named audit risks",
    format: "written",
    marks: 8,
    requirement:
      "Explain the difference between business risk and audit risk, and using the following information about Tarnbrook Co, describe FOUR audit risks arising and the auditor's response to each.\n\nTarnbrook Co is a food producer. During the year it opened a second factory, financed by a bank loan. It also began exporting to two new countries, with sales invoiced in foreign currency. A new regulation requires it to test and certify each production batch, and it has recognised a provision for the cost of doing so for batches already sold. Inventory includes perishable goods with short shelf lives. (8 marks)",
    plan: [
      {
        step: "Deal with the definitional half first, in two sentences",
        detail:
          "BUSINESS RISK is the risk that the entity fails to achieve its objectives — it threatens the COMPANY. AUDIT RISK is the risk the auditor gives an inappropriate opinion on materially misstated financial statements — it threatens the AUDITOR. The link is that many business risks eventually create audit risks, but only where they affect a figure in the financial statements.",
      },
      {
        step: "Test every risk you write against the business/audit boundary",
        detail:
          "'The new factory may not be profitable' is business risk. 'The factory must be correctly split between capital and revenue expenditure, and depreciated from when it was available for use, so non-current assets may be overstated' is audit risk. The second names a balance and a direction.",
      },
      {
        step: "Take one risk per scenario fact, as always",
        detail:
          "New factory and loan (capitalisation, borrowing costs, loan classification and disclosure); foreign currency sales (IAS 21 translation of revenue and receivables); the new regulation provision (IAS 37 — does an obligating event exist and is the estimate reliable); perishable inventory (IAS 2 net realisable value).",
      },
      {
        step: "Give responses that are procedures, and keep them specific",
        detail:
          "Inspect invoices and capitalisation schedules; recalculate translation using independently obtained rates; obtain the regulation and legal advice on whether an obligation exists; attend the count and inspect for damage, and compare cost to post year-end selling prices.",
      },
    ],
    answer:
      "**Business risk against audit risk**\n\n**Business risk** is the risk that an entity **fails to achieve its objectives** — arising from its industry, its strategy, its competitors, its regulatory environment or its financing. It is a risk to **the company**, and managing it is the responsibility of **management**.\n\n**Audit risk** is the risk that the auditor **expresses an inappropriate opinion** when the financial statements are materially misstated. It is a risk to **the auditor**.\n\nThe two are connected but not the same. A business risk becomes relevant to the audit **only where it could result in a misstatement** — the auditor considers business risks because many of them eventually affect a balance or a disclosure. This is why an answer that offers 'the company may lose market share' as an audit risk earns nothing: it never reaches a financial statement effect.\n\n**Four audit risks and responses**\n\n**1. The new factory and the loan financing it**\n\n*Risk:* Expenditure on the factory must be **correctly split between capital and revenue** under IAS 16, and depreciation charged from when the asset was **available for use**, not when construction began. Borrowing costs directly attributable to construction should be **capitalised** under IAS 23. Non-current assets and profit could be **over- or understated**. The loan must also be correctly **split between current and non-current** and its terms disclosed.\n\n*Response:* Obtain a **breakdown of the costs capitalised** and **inspect invoices** for a sample, confirming each is capital in nature. **Recalculate depreciation** and confirm the date the factory became available for use by inspecting commissioning documentation. **Inspect the loan agreement** for its terms, recalculate the split between current and non-current, and confirm the borrowing costs treatment.\n\n**2. Export sales invoiced in foreign currency**\n\n*Risk:* Under IAS 21 sales are recorded at the **spot rate on the transaction date** and year-end **receivables retranslated at the closing rate**, with exchange differences to profit or loss. Incorrect rates, or a failure to retranslate, would **misstate revenue, receivables and profit**. New export customers also carry a higher **recoverability** risk.\n\n*Response:* **Recalculate the translation** of a sample of export sales and year-end receivables using rates from an **independent source**, and agree the exchange differences recognised. **Review the aged receivables listing** and post year-end cash receipts for the new customers to assess recoverability.\n\n**3. The provision for batch testing and certification**\n\n*Risk:* Under IAS 37 a provision requires a **present obligation from a past event**, a probable outflow and a reliable estimate. Whether an **obligating event** exists for batches **already sold** is questionable — if the obligation arises only on future production, no provision should be recognised and **liabilities and expenses are overstated**. If it is a genuine obligation, the **estimate** may be unreliable.\n\n*Response:* **Obtain and read the new regulation** to establish when the obligation arises, and consider obtaining **legal advice**. **Discuss the basis of the provision with management** and **recalculate the estimate**, agreeing the cost per batch to supporting documentation such as quotations from testing laboratories.\n\n**4. Perishable inventory with short shelf lives**\n\n*Risk:* IAS 2 requires inventory at the **lower of cost and net realisable value**. Perishable goods may be **out of date, damaged or close to expiry** at the year end, so inventory could be **overstated**. Existence and cut-off around the count are also at risk given rapid turnover.\n\n*Response:* **Attend the inventory count**, inspecting for **damaged, expired or slow-moving items** and noting the condition of goods. **Review the ageing of inventory** and compare cost with **post year-end selling prices** to test net realisable value, and confirm the adequacy of any write-down.",
    earns: [
      "Distinguishing the two risks by whom each threatens, and linking them through the financial statement effect",
      "Four risks, each traced to a scenario fact and ending in a balance and a direction",
      "Naming the applicable standard where it decides the treatment",
      "Responses that are specific auditor procedures",
    ],
    loses: [
      "Offering business risks — new markets are risky, competition is strong — as audit risks",
      "Defining the two terms and then writing risks that ignore the distinction just made",
      "Responses phrased as advice to management",
    ],
  },

  /* ── AA-09 · Fraud, laws and regulations ────────────────────────── */

  "AA-09::responsibility": {
    title: "Responsibility for fraud: management, governance and the auditor",
    format: "mtq",
    marks: 10,
    requirement:
      "The following relate to fraud and to the auditor's responsibilities under ISA 240.\n\n(1) Primary responsibility for the prevention and detection of fraud rests with:\nA  The external auditor\nB  Management and those charged with governance\nC  The internal audit function\nD  The shareholders\n\n(2) The auditor's responsibility in relation to fraud is to:\nA  Detect all fraud affecting the entity\nB  Obtain reasonable assurance that the financial statements are free from material misstatement, whether caused by fraud or error\nC  Report all suspected fraud to the police\nD  Prevent fraud by designing the entity's internal controls\n\n(3) Under ISA 240, the auditor must presume that a risk of fraud exists in:\nA  Payroll  B  Revenue recognition  C  Depreciation  D  Directors' remuneration\n\n(4) Which of the following is NOT one of the three elements of the fraud triangle?\nA  Incentive or pressure  B  Opportunity  C  Rationalisation  D  Materiality\n\n(5) ISA 240 requires the auditor to treat which risk as significant on every audit?\nA  The risk of management override of controls\nB  The risk of employee theft of inventory\nC  The risk of error in the payroll calculation\nD  The risk of a supplier overcharging",
    plan: [
      {
        step: "Fix the division of responsibility, because three tasks turn on it",
        detail:
          "PREVENTION AND DETECTION belongs to MANAGEMENT and THOSE CHARGED WITH GOVERNANCE. The auditor's responsibility is limited to obtaining REASONABLE assurance about MATERIAL misstatement. Any option making the auditor responsible for detecting all fraud is wrong, and this is the heart of the expectation gap.",
      },
      {
        step: "Learn the two mandatory presumptions, which are examined constantly",
        detail:
          "First, there is a PRESUMED risk of fraud in REVENUE RECOGNITION, which the auditor must rebut in writing if they conclude it does not apply. Second, the risk of MANAGEMENT OVERRIDE OF CONTROLS is treated as a SIGNIFICANT RISK on EVERY audit, without exception.",
      },
      {
        step: "Recall the fraud triangle as three conditions, all normally present",
        detail:
          "INCENTIVE OR PRESSURE (a target, a bonus, personal debt), OPPORTUNITY (weak controls, the ability to override), and RATIONALISATION (an attitude that permits the person to justify it). Materiality is an audit concept and belongs to no part of it.",
      },
      {
        step: "Attach the required responses to management override, since the written version follows",
        detail:
          "TEST JOURNAL ENTRIES, especially unusual ones and those made at the period end; REVIEW ACCOUNTING ESTIMATES FOR BIAS and reconsider prior year estimates with hindsight; and EVALUATE THE BUSINESS RATIONALE of significant unusual transactions. These three are required by ISA 240 on every audit.",
      },
    ],
    answer:
      "**(1) B — management and those charged with governance.** Primary responsibility for **preventing and detecting fraud** rests with **management**, through a sound system of internal control and a culture of honesty, and with **those charged with governance**, through oversight of that system. It is **not** the auditor's responsibility, and the widespread belief that it is forms a central part of the **expectation gap**.\n\n**(2) B — obtain reasonable assurance that the financial statements are free from material misstatement, whether caused by fraud or error.** The responsibility is bounded twice over: **reasonable**, not absolute, assurance; and **material** misstatement, not all fraud. An immaterial fraud may exist and the audit opinion still be appropriate.\n\n**(3) B — revenue recognition.** ISA 240 requires the auditor to **presume** that there are risks of fraud in **revenue recognition**, because of the pressure to report growth and the range of ways revenue can be manipulated. The presumption may be rebutted, but the auditor must **document the reasons** for concluding it does not apply.\n\n**(4) D — materiality.** The **fraud triangle** comprises **incentive or pressure**, **opportunity**, and **rationalisation**. All three are normally present where fraud occurs, which is why removing any one of them — improving controls to remove opportunity, for instance — is an effective deterrent. Materiality is an auditing concept unconnected to it.\n\n**(5) A — the risk of management override of controls.** ISA 240 requires the auditor to treat this as a **significant risk on every audit**, because management is uniquely placed to manipulate records and override controls that otherwise operate effectively. The standard therefore requires specific procedures on every engagement:\n\n· **test journal entries** and other adjustments, focusing on unusual entries and those made at or near the **period end**\n· **review accounting estimates for bias**, including a retrospective review of prior year estimates with the benefit of hindsight\n· **evaluate the business rationale** for significant transactions outside the normal course of business\n\n**If fraud is suspected**, the auditor should discuss it with an **appropriate level of management above** the person suspected, consider the effect on the audit and on the reliability of management representations, communicate with **those charged with governance**, consider reporting to the relevant **authorities** where required by law (including money laundering reporting), and consider whether to **withdraw** from the engagement.",
    earns: [
      "Locating primary responsibility with management and those charged with governance",
      "Bounding the auditor's responsibility by both 'reasonable' and 'material'",
      "Knowing the revenue recognition presumption and the management override significant risk",
      "Recalling the three required responses to management override",
    ],
    loses: [
      "Making the auditor responsible for detecting all fraud",
      "Including materiality in the fraud triangle",
      "Confusing the presumed revenue risk with the mandatory override risk",
    ],
  },

  "AA-09::fraud-risk": {
    title: "Fraud risk factors and the auditor's response",
    format: "written",
    marks: 8,
    requirement:
      "Explain the fraud triangle, and describe the procedures the auditor should perform in response to the risk of management override of controls. Explain also the actions the auditor should take if a material fraud is suspected. (8 marks)",
    plan: [
      {
        step: "Divide eight marks across the three parts named",
        detail:
          "Roughly three marks for the triangle, three for the override procedures and two for the actions on suspicion. All three parts must appear — the requirement has three verbs and the marking guide will have three sections.",
      },
      {
        step: "Explain each element of the triangle with an example",
        detail:
          "INCENTIVE OR PRESSURE — a profit-related bonus, a loan covenant, personal financial difficulty. OPPORTUNITY — weak segregation of duties, a dominant chief executive, complex transactions. RATIONALISATION — an attitude that permits it, such as believing one is underpaid or intends to repay. The example is what turns a definition into a mark.",
      },
      {
        step: "Give the three ISA 240 override procedures exactly",
        detail:
          "Test journal entries and adjustments, especially unusual ones and those near the period end. Review estimates for bias, including a retrospective review of prior year estimates. Evaluate the business rationale for significant unusual transactions. These are required on EVERY audit, not only where suspicion exists.",
      },
      {
        step: "Sequence the actions on suspicion, escalating outward",
        detail:
          "Discuss with management ABOVE the level of the person suspected; reconsider the risk assessment and the reliability of representations; communicate with those charged with governance; consider legal reporting duties including money laundering; consider obtaining legal advice; and consider withdrawal. Never approach the suspected individual first.",
      },
    ],
    answer:
      "**The fraud triangle**\n\nThree conditions are generally present when fraud occurs, and identifying any of them is a **fraud risk factor** the auditor must consider:\n\n**Incentive or pressure.** A reason to commit the fraud — a **profit-related bonus**, a **loan covenant** that must be met, pressure to meet analysts' expectations, or personal financial difficulty such as debt or an expensive lifestyle.\n\n**Opportunity.** Circumstances allowing it to be committed and concealed — **weak segregation of duties**, a **dominant chief executive** with no effective challenge, poor controls over cash or inventory, complex or unusual transactions, and significant estimates that are hard to corroborate.\n\n**Rationalisation.** An **attitude or set of values** that allows the individual to justify the act to themselves — a belief that they are underpaid and are owed it, an intention to repay the money, or a view that 'everyone does it'.\n\nBecause all three are normally required, removing any one is an effective deterrent — which is why improving controls, and so removing **opportunity**, is the response most within the entity's power.\n\n**Procedures responding to the risk of management override**\n\nISA 240 requires the auditor to treat management override as a **significant risk on every audit**, because management can override controls that otherwise operate effectively. Whatever the assessed risk, the auditor must:\n\n· **Test journal entries and other adjustments** made in preparing the financial statements, selecting those that are **unusual** — round-sum amounts, entries to unrelated accounts, entries by people who do not normally post them — and particularly those made **at or near the period end**.\n· **Review accounting estimates for bias**, and perform a **retrospective review** of significant prior year estimates against actual outcomes, since a pattern of estimates that consistently favour reported profit is evidence of bias.\n· **Evaluate the business rationale** for significant transactions **outside the normal course of business**, to assess whether they may have been entered into to misstate the financial statements or conceal misappropriation.\n\n**Actions where a material fraud is suspected**\n\n· **Discuss the matter with an appropriate level of management, above the person suspected.** Approaching the suspected individual risks concealment or destruction of evidence.\n· **Reconsider the risk assessment** and the **reliability of evidence** already obtained, including written representations from management, since suspicion of fraud calls management's integrity into question.\n· **Perform additional procedures** to determine whether a material misstatement exists and to quantify it.\n· **Communicate with those charged with governance** on a timely basis, and where the suspicion involves management or governance itself, consider communicating with a higher authority such as the audit committee or a regulator.\n· **Consider legal and regulatory reporting duties** — in particular, a suspicion of **money laundering** must be reported to the appropriate authority, and **tipping off the client is an offence**.\n· **Obtain legal advice**, and **consider whether to withdraw** from the engagement where management's integrity can no longer be relied on.\n· Consider the effect on the **auditor's report** — a material misstatement that is not corrected leads to a **modified opinion**, and an inability to obtain evidence about a suspected fraud is a **scope limitation**.",
    earns: [
      "Explaining all three elements of the triangle with a concrete example each",
      "Giving the three required override procedures specifically, not general scepticism",
      "Escalating outward on suspicion, starting above the suspected individual",
      "Including the money laundering reporting duty and the tipping-off prohibition",
    ],
    loses: [
      "Naming the three elements without examples, which does not demonstrate understanding",
      "Answering only on the triangle and omitting the override procedures",
      "Suggesting the auditor confronts the suspected individual or reports to the police as a first step",
    ],
  },

  "AA-09::laws": {
    title: "Laws and regulations: ISA 250 and the two categories",
    format: "written",
    marks: 6,
    requirement:
      "Explain the auditor's responsibilities in relation to laws and regulations under ISA 250, distinguishing between the two categories of law and regulation the standard identifies. (6 marks)",
    plan: [
      {
        step: "State whose responsibility compliance is, before the auditor's",
        detail:
          "MANAGEMENT, with the oversight of those charged with governance, is responsible for ensuring the entity complies with laws and regulations. The auditor is not a compliance function, and the answer should say so first.",
      },
      {
        step: "Give the two categories precisely, because the whole answer depends on them",
        detail:
          "CATEGORY ONE: laws generally recognised to have a DIRECT EFFECT on the determination of material amounts and disclosures — tax law, pensions legislation, the companies act provisions on financial statements. CATEGORY TWO: other laws that do not directly affect the financial statements but where non-compliance may be FUNDAMENTAL TO THE OPERATING ASPECTS of the business — an operating licence, environmental or health and safety law.",
      },
      {
        step: "Attach the different level of work to each category",
        detail:
          "For category one the auditor must obtain SUFFICIENT APPROPRIATE EVIDENCE of compliance. For category two the auditor performs only SPECIFIED PROCEDURES — enquiry of management, and inspecting correspondence with licensing or regulatory authorities. The difference in effort is the point of the distinction.",
      },
      {
        step: "Give the response where non-compliance is identified or suspected",
        detail:
          "Understand the nature and circumstances, evaluate the effect on the financial statements, discuss with management and those charged with governance, consider legal advice, consider reporting to authorities where required, consider withdrawal, and consider the effect on the auditor's report.",
      },
    ],
    answer:
      "**Whose responsibility compliance is.** It is the responsibility of **management**, with the oversight of **those charged with governance**, to ensure the entity's operations comply with laws and regulations. The auditor is **not responsible for preventing non-compliance** and cannot be expected to detect it in every case.\n\n**The two categories, and the different level of work each attracts**\n\n**Category 1 — laws and regulations with a DIRECT effect on the determination of material amounts and disclosures in the financial statements.** Examples include **tax legislation**, **pension legislation**, and the provisions of company law governing the form and content of financial statements.\n\n*The auditor's responsibility:* to obtain **sufficient appropriate audit evidence** regarding compliance, because non-compliance would directly misstate the financial statements. This is full audit work.\n\n**Category 2 — other laws and regulations that do not have a direct effect on the financial statements, but where compliance may be FUNDAMENTAL TO THE OPERATING ASPECTS of the business**, to its ability to continue in business, or to avoid material penalties. Examples include the terms of an **operating licence**, **environmental regulations**, **health and safety** law, and **data protection** requirements.\n\n*The auditor's responsibility:* to perform **specified procedures** only, which may identify non-compliance:\n\n· **enquiring of management and those charged with governance** as to whether the entity is in compliance\n· **inspecting correspondence** with the relevant licensing or regulatory authorities\n\nThe auditor must also remain **alert** throughout the audit to the possibility that other procedures performed may bring instances of non-compliance to their attention.\n\nThe distinction matters because it determines **how much work is required**. Applying full evidence-gathering to every law the entity is subject to would be impossible; applying only enquiry to tax would leave a material balance untested.\n\n**Where non-compliance is identified or suspected**\n\n· **Obtain an understanding** of the nature of the act and the circumstances in which it occurred, and further information to evaluate the possible effect.\n· **Evaluate the effect on the financial statements**, including whether a **provision or disclosure** is required for fines, penalties or damages.\n· **Discuss with management and those charged with governance**; where they are suspected of involvement, communicate with a higher authority.\n· **Consider obtaining legal advice** about the consequences.\n· **Consider whether reporting to an appropriate authority** is required by law — including money laundering reporting, where **tipping off the client is an offence**.\n· **Consider the implications for the audit** — the reliability of management representations, and whether **withdrawal** from the engagement is necessary.\n· **Consider the effect on the auditor's report** — a **modified opinion** where the financial statements are materially misstated or the auditor is unable to obtain sufficient evidence about the non-compliance.",
    earns: [
      "Placing responsibility for compliance with management first",
      "Defining both categories with examples",
      "Attaching sufficient appropriate evidence to one and specified procedures to the other",
      "Giving the response to identified non-compliance as a sequence of escalating actions",
    ],
    loses: [
      "Treating all laws and regulations alike, which is the distinction the requirement is testing",
      "Naming the categories without giving examples of each",
      "Omitting the reporting and withdrawal considerations",
    ],
  },

  /* ── AA-10 · Strategy, planning and documentation ───────────────── */

  "AA-10::strategy-plan": {
    title: "The audit strategy and the audit plan, and why planning matters",
    format: "written",
    marks: 6,
    requirement:
      "Distinguish between the overall audit strategy and the audit plan, and explain the benefits of planning an audit. (6 marks)",
    plan: [
      {
        step: "Separate the two by SCOPE and by LEVEL OF DETAIL",
        detail:
          "The STRATEGY sets the overall scope, timing and direction of the audit and guides the development of the plan. The PLAN is more detailed: the nature, timing and extent of the specific procedures to be performed. Strategy first, plan second, and the plan follows from the strategy.",
      },
      {
        step: "Give the contents of the strategy as separate points",
        detail:
          "The characteristics of the engagement that define its scope, the reporting objectives and timetable, the significant factors directing the team's efforts including materiality and assessed risks, the results of preliminary activities, and the nature, timing and extent of RESOURCES — which staff, with what experience, and where.",
      },
      {
        step: "Give the contents of the plan as its three required elements",
        detail:
          "The nature, timing and extent of the RISK ASSESSMENT procedures; the FURTHER AUDIT PROCEDURES at the assertion level; and any OTHER PROCEDURES required for the engagement to comply with ISAs.",
      },
      {
        step: "List the benefits as discrete marks",
        detail:
          "Attention devoted to the important areas; potential problems identified and resolved on a timely basis; the engagement organised and managed effectively; the right team members selected and work properly assigned; direction, supervision and review facilitated; and assistance from component auditors and experts coordinated. Six benefits, and each is a mark.",
      },
    ],
    answer:
      "**The overall audit strategy**\n\nSets the **scope, timing and direction** of the audit and **guides the development of the audit plan**. It is prepared first and addresses:\n\n· the **characteristics of the engagement** that define its scope — the reporting framework, industry-specific requirements, the locations involved and the structure of the entity\n· the **reporting objectives and the timetable**, including deadlines and the nature of communications required with management and those charged with governance\n· the **significant factors** directing the team's efforts — **materiality**, the areas assessed as having a **higher risk of material misstatement**, and significant business developments\n· the results of **preliminary engagement activities** — client acceptance and continuance, ethical clearance and the engagement letter\n· the **nature, timing and extent of resources** — which staff, of what experience, assigned to which areas, including the use of experts\n\n**The audit plan**\n\nIs **more detailed** than the strategy and converts it into the specific work to be done. It sets out:\n\n· the nature, timing and extent of the **risk assessment procedures**\n· the nature, timing and extent of **further audit procedures at the assertion level** — tests of controls and substantive procedures for each material balance\n· any **other procedures** required for the engagement to comply with ISAs\n\nBoth are **updated and changed as necessary** during the audit. Planning is a **continual and iterative process**, not a stage that finishes before fieldwork starts — if the assessed risk changes as evidence is obtained, the plan changes with it.\n\n**The benefits of planning**\n\n· **Appropriate attention is devoted to the important areas**, so effort is concentrated where the risk of material misstatement is highest.\n· **Potential problems are identified and resolved on a timely basis**, rather than emerging close to the reporting deadline when there is no time to respond.\n· The engagement is **organised and managed effectively**, so it is performed in an efficient manner and within the fee.\n· **Team members of appropriate capability are selected** and work properly assigned, so complex or high-risk areas go to more experienced staff.\n· **Direction, supervision and review** of the team's work is facilitated.\n· The work of **component auditors and auditor's experts** is properly coordinated.\n· It helps ensure the audit is performed in **accordance with ISAs**, reducing the risk of an inappropriate opinion and the litigation exposure that follows.",
    earns: [
      "Distinguishing the two by level of detail and by the strategy guiding the plan",
      "Giving the contents of each as separate markable points",
      "Knowing planning is continual and iterative rather than a one-off stage",
      "Listing the benefits individually, since each is a mark",
    ],
    loses: [
      "Treating strategy and plan as interchangeable terms",
      "Answering only on the distinction and omitting the benefits, which are half the marks",
    ],
  },

  "AA-10::documentation": {
    title: "Audit documentation: purpose, contents and the experienced auditor test",
    format: "written",
    marks: 5,
    requirement:
      "Explain the purpose of audit documentation and describe the matters that should be recorded in the audit working papers. (5 marks)",
    plan: [
      {
        step: "Lead with the experienced auditor test, which is the standard's own benchmark",
        detail:
          "Documentation must be sufficient to enable an EXPERIENCED AUDITOR WITH NO PREVIOUS CONNECTION to the audit to understand the nature, timing and extent of the procedures performed, their results and the evidence obtained, and the significant matters and conclusions reached. Quoting this test is a reliable mark.",
      },
      {
        step: "Give the purposes as separate points",
        detail:
          "Evidence of the basis for the opinion; evidence the audit was planned and performed in accordance with ISAs; assisting the team to plan and perform the audit; enabling direction, supervision and review; retaining a record of matters of continuing significance; and enabling quality reviews and inspections, including defence against litigation.",
      },
      {
        step: "List what a working paper should record",
        detail:
          "The identifying characteristics of the items tested, who performed the work and when, who reviewed it and when, the procedures performed, the results and evidence obtained, significant matters and the conclusions reached, and how any inconsistencies were addressed.",
      },
      {
        step: "Add the retention and assembly rules if a mark remains",
        detail:
          "The final audit file should be assembled on a timely basis, ordinarily within 60 DAYS of the auditor's report, and retained for a minimum of FIVE YEARS from the date of the auditor's report. After assembly, documentation must not be deleted, and any addition must record who made it and when.",
      },
    ],
    answer:
      "**The benchmark ISA 230 sets.** Documentation must be sufficient to enable an **experienced auditor with no previous connection to the audit** to understand:\n\n· the **nature, timing and extent** of the procedures performed\n· the **results** of those procedures and the **audit evidence obtained**\n· the **significant matters** arising, the **conclusions** reached on them, and the significant **professional judgements** made in reaching those conclusions\n\n**Purposes of audit documentation**\n\n· It provides **evidence of the basis for the auditor's opinion** — the opinion must be supportable, and the file is what supports it.\n· It provides **evidence that the audit was planned and performed in accordance with ISAs** and applicable legal requirements.\n· It **assists the engagement team** in planning and performing the audit, and in the following year's audit.\n· It enables the team to be **directed, supervised and reviewed**, and the reviewer to discharge their responsibilities.\n· It retains a **record of matters of continuing significance** to future audits.\n· It enables **quality reviews and inspections** — internal, by the firm, and external, by the professional body or regulator.\n· It assists in **defending the firm** if the quality of its work is challenged in litigation or by a regulator.\n\n**Matters recorded in the working papers**\n\n· the **identifying characteristics** of the items tested — for example the invoice numbers or the range of a sample selected, so the test could be re-performed\n· **who performed the work and the date** it was completed\n· **who reviewed the work, and the date** and extent of the review\n· the **procedures performed** and the **results** obtained\n· **significant matters** arising and the **conclusions** reached\n· discussions of significant matters **with management and those charged with governance**, including when and with whom\n· how any **inconsistency** between information obtained and the auditor's final conclusion was addressed\n\n**Assembly and retention.** The final audit file is assembled on a **timely basis**, ordinarily within **60 days** of the date of the auditor's report, and retained for a minimum of **five years** from that date. After assembly the auditor must **not delete** documentation, and any addition must record **who made it, when, and why**.",
    earns: [
      "Quoting the experienced auditor with no previous connection test",
      "Giving purposes and contents as two separate lists",
      "Including who performed and who reviewed the work, with dates",
      "Knowing the 60-day assembly and five-year retention periods",
    ],
    loses: [
      "Describing what working papers look like rather than what they must record",
      "Omitting the purposes, which carry roughly half the marks",
    ],
  },

  "AA-10::direction-review": {
    title: "Direction, supervision and review of the engagement team",
    format: "written",
    marks: 5,
    requirement:
      "Explain the engagement partner's responsibilities for the direction, supervision and review of the audit, and describe what a reviewer should consider when reviewing the work of a member of the audit team. (5 marks)",
    plan: [
      {
        step: "Treat direction, supervision and review as three distinct activities",
        detail:
          "DIRECTION happens at the start — briefing the team on responsibilities, the nature of the business, risk areas and the approach. SUPERVISION happens during — tracking progress, addressing issues as they arise, considering the competence of staff. REVIEW happens after work is done. Answering them as one blurred concept loses marks that are available for three.",
      },
      {
        step: "Anchor the whole answer in the engagement partner's overall responsibility",
        detail:
          "The engagement partner takes RESPONSIBILITY FOR THE OVERALL QUALITY of the audit, and for the report being appropriate in the circumstances. Direction, supervision and review are how that responsibility is discharged over a team the partner cannot personally observe.",
      },
      {
        step: "Give the review criteria as a list",
        detail:
          "Whether the work was performed in accordance with professional standards and the audit plan; whether significant matters have been raised for further consideration; whether appropriate consultations took place and their conclusions were implemented; whether the evidence obtained is SUFFICIENT AND APPROPRIATE to support the conclusion; and whether the objectives of the procedures were achieved.",
      },
      {
        step: "Note who reviews what, since the risk-based principle is a mark",
        detail:
          "More experienced team members review the work of less experienced ones, and the ENGAGEMENT PARTNER reviews the areas of SIGNIFICANT JUDGEMENT and SIGNIFICANT RISK personally. For a listed entity an ENGAGEMENT QUALITY REVIEW by a person outside the team is also required before the report is issued.",
      },
    ],
    answer:
      "**The engagement partner's overall responsibility.** Under ISA 220 the engagement partner takes responsibility for the **overall quality of the audit engagement** and for the **auditor's report being appropriate** in the circumstances. Because the partner cannot personally perform or observe every procedure, that responsibility is discharged through **direction, supervision and review** — three distinct activities at three points in the engagement.\n\n**Direction — at the start.** The team is briefed on:\n\n· their **responsibilities**, including the need for professional scepticism and compliance with ethical requirements\n· the **nature of the entity's business** and the specific risks identified\n· the **objectives of the work** each member is assigned and the approach to be taken\n· any **problems that may arise** and how to raise them\n\nAn engagement team meeting is the usual vehicle, and ISA 240 separately requires a **discussion of the susceptibility of the financial statements to fraud**.\n\n**Supervision — during the audit.** The partner and senior staff:\n\n· **track the progress** of the engagement against the plan and the timetable\n· consider the **competence and capabilities** of individual members, whether they have sufficient time, and whether they understand their instructions\n· **address significant matters** as they arise, considering their significance and modifying the planned approach where required\n· identify matters for **consultation** with more experienced team members or specialists\n\n**Review — after work is performed.** Work is reviewed by **more experienced team members**, and the **engagement partner personally reviews** the areas of **significant judgement** and **significant risk**, and the financial statements and the proposed auditor's report. For a **listed entity**, an **engagement quality review** must additionally be performed by a suitably experienced person **outside the engagement team**, and the report cannot be issued until it is complete.\n\n**What the reviewer considers**\n\n· whether the work has been performed **in accordance with professional standards**, applicable legal requirements and the firm's methodology\n· whether the work was performed **in accordance with the audit plan**, and the objectives of the procedures were achieved\n· whether **significant matters have been raised** for further consideration\n· whether appropriate **consultations** have taken place, and whether the resulting conclusions have been **documented and implemented**\n· whether there is a need to **revise the nature, timing and extent** of the work performed\n· whether the **evidence obtained is sufficient and appropriate** to support the conclusions reached and the auditor's report\n· whether the work is properly **documented**, including who performed it and when",
    earns: [
      "Separating direction, supervision and review as three activities at three stages",
      "Anchoring them in the engagement partner's responsibility for overall quality",
      "Knowing the partner personally reviews significant judgements and significant risks",
      "Adding the engagement quality review requirement for listed entities",
    ],
    loses: [
      "Treating the three as a single undifferentiated concept",
      "Omitting the review criteria, which are the second half of the requirement",
    ],
  },
}
