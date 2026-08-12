/*
 * BT Area A — The business organisation, its stakeholders and the external
 * environment. The exam-plan layer: what each section is examined by, and how.
 *
 * BT sets 46 objective tests (30 × 2 marks, 16 × 1 mark) and 6 multi-task
 * questions at 4 marks. Nothing here is written to an essay requirement, because
 * BT has never set one — see the `format` note in acca-study-content.ts. On an OT
 * the plan is not "structure an answer": it is read the stem exactly, convert the
 * theory into a checklist, and kill the three distractors on purpose rather than
 * by feel.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const BT_PLANS_A: ExamPlanMap = {
  /* ── BT-01 · The business organisation and why it exists ────── */

  "BT-01::what-is-an-organisation": {
    title: "Identifying what is, and is not, part of the definition",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **NOT** part of the standard definition of an organisation?\n\nA  A social arrangement\nB  The controlled performance of goals\nC  Collective goals\nD  The pursuit of profit",
    plan: [
      {
        step: "Read the polarity first",
        detail:
          "The stem says NOT. That inverts the whole task: three options will be correct and you are hunting the one that is false. Candidates who read past the NOT pick a true statement and lose both marks having known the topic perfectly.",
      },
      {
        step: "Write the definition out as a three-item checklist",
        detail:
          "Social arrangement · controlled performance · collective goals. Do this before looking at the options, so the options cannot lead you — the checklist is the thing you are testing against, not the other way round.",
      },
      {
        step: "Tick each option off the checklist",
        detail:
          "A, B and C map onto the three parts one for one. D matches nothing, because profit is a goal SOME organisations hold, not a feature every organisation has.",
      },
      {
        step: "Confirm the survivor fails for the right reason",
        detail:
          "Ask whether a counter-example exists. A hospital, a charity and a school are all organisations and none pursues profit — so D genuinely is not part of the definition, rather than merely feeling less central.",
      },
    ],
    answer:
      "**D — the pursuit of profit.**\n\nThe definition has exactly three parts: an organisation is a **social arrangement** for the **controlled performance** of **collective goals**. A, B and C are those three parts.\n\nProfit is one possible goal, held by commercial organisations. Hospitals, charities, schools and government departments are all organisations and none of them pursues profit, so profit cannot be a defining feature.",
    earns: [
      "Knowing the three-part definition well enough to use it as a test, not just recite it",
      "Spotting that the counter-example (a charity) settles the question immediately",
    ],
    loses: [
      "Missing the word NOT and choosing a true statement",
      "Assuming BT means \"company\" whenever it says \"organisation\" — the syllabus is deliberately wider",
    ],
  },

  "BT-01::why-organisations-form": {
    title: "Why the organisation beats the same people working alone",
    format: "ot",
    marks: 2,
    requirement:
      "An organisation can achieve more than the same individuals working separately. Which of the following **best** explains why?\n\nA  It has access to more capital\nB  It allows work to be specialised and combined\nC  It is subject to more regulation\nD  It has a legal identity of its own",
    plan: [
      {
        step: "Notice \"best\" — more than one option is true",
        detail:
          "A \"best explains\" stem is not testing true versus false. Several options will be true statements about organisations; only one is the actual mechanism the question asks about, and the others are consequences or irrelevancies.",
      },
      {
        step: "Name the mechanism before reading on",
        detail:
          "The reason is the division of labour: work is split, each person becomes expert in a part, and the combined output exceeds the sum of what each could do alone. Everything else organisations gain follows from that.",
      },
      {
        step: "Test each option against the mechanism",
        detail:
          "B states it directly. A is a benefit but does not explain the productivity gain — a rich individual has capital too. C is a cost, not a benefit. D is true only of incorporated bodies, and partnerships are still organisations.",
      },
      {
        step: "Check the option is not narrower than the claim",
        detail:
          "D would be wrong even if it explained something, because it applies to a subset of organisations. Any option that is true of only some organisations cannot explain a feature of all of them.",
      },
    ],
    answer:
      "**B — it allows work to be specialised and combined.**\n\nOrganisations exist because of the **division of labour**: splitting a task lets each person specialise, become faster and more skilled at their part, and the combined result exceeds what the same people could produce working separately. Scale, shared knowledge, pooled expertise and time saving are all downstream of that one idea.\n\nA is a benefit rather than the explanation. C is a burden. D is true of companies but not of partnerships or clubs, which are organisations too.",
    earns: [
      "Reading \"best explains\" as \"find the mechanism\", not \"find something true\"",
      "Rejecting an option because it is true of only some organisations",
    ],
    loses: [
      "Picking the first true statement and moving on",
      "Confusing a benefit of organising with the reason organising works",
    ],
  },

  "BT-01::common-features-and-differences": {
    title: "Separating what all organisations share from what varies",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a feature **common to all** organisations, rather than a way in which organisations differ?\n\nA  Ownership\nB  Legal status\nC  The need to obtain and use resources\nD  Profit orientation",
    plan: [
      {
        step: "Split the syllabus list in two before reading the options",
        detail:
          "COMMON: goals, resources, structure, and control over performance. DIFFERENT: ownership, control, activity, profit orientation, size, legal status, sources of finance. The question lives entirely inside that split.",
      },
      {
        step: "Read which half is being asked for",
        detail:
          "Here it is the common half. The three wrong options will be drawn from the other list, which is exactly why knowing both lists matters more than knowing either one well.",
      },
      {
        step: "Apply the universality test to each option",
        detail:
          "Ask: can I name an organisation without this? A charity has no owners in the commercial sense, so A varies. An unincorporated club has different legal status, so B varies. A charity has no profit motive, so D varies.",
      },
      {
        step: "Confirm the survivor with the same test",
        detail:
          "Every organisation — commercial, charitable, governmental — must obtain resources and put them to use to pursue its goal. No counter-example exists, so C is the common feature.",
      },
    ],
    answer:
      "**C — the need to obtain and use resources.**\n\nAll organisations share four things: they exist for **goals**, they must **obtain and use resources**, they have a **structure** of defined relationships, and their performance is **controlled** against the goal.\n\nOwnership, legal status and profit orientation are on the syllabus's other list — the ways organisations differ. A charity has no shareholders, a members' club has no separate legal personality, and neither seeks profit, yet all three are organisations.",
    earns: [
      "Holding both lists — common and different — rather than only the one that was revised last",
      "Using a counter-example to demote an option instead of judging it by how important it sounds",
    ],
    loses: [
      "Choosing ownership because it feels fundamental, when the question asked what is universal",
    ],
  },

  "BT-01::types-of-organisation": {
    title: "Matching organisation types to their defining characteristic",
    format: "mtq",
    marks: 4,
    requirement:
      "Match each description to the type of organisation it describes. Each type may be used once, more than once, or not at all.\n\n(i) Owned by its members, who are also its customers, with surpluses returned to them\n(ii) Funded by government and accountable to elected representatives\n(iii) Independent of government, pursuing a cause rather than a surplus\n(iv) Owned by shareholders, with the objective of increasing their wealth\n\nTypes: Commercial · Not-for-profit · Public sector · Non-governmental organisation · Co-operative",
    plan: [
      {
        step: "Attack the discriminator, not the description",
        detail:
          "The five types overlap heavily — an NGO is also not-for-profit, a public-sector body also has no profit motive. So for each type write down the ONE thing only it has, and match on that rather than on general fit.",
      },
      {
        step: "Fix the five discriminators in order",
        detail:
          "Commercial: owned by shareholders, profit motive. Co-operative: members are the owners AND the customers. Public sector: government funded and controlled. NGO: independent OF government, cause driven. Not-for-profit: the wide category any surplus-free body falls into.",
      },
      {
        step: "Do the unambiguous ones first, then resolve the overlap",
        detail:
          "(i) and (iv) name their owners outright, so place them immediately. That leaves (ii) and (iii), which are separated by one word — accountable to government versus independent of it.",
      },
      {
        step: "Check nothing was placed by elimination alone",
        detail:
          "Each task is marked independently, so a wrong answer on one costs only that mark. But go back and confirm each match names a discriminator, because a match made by \"nothing else was left\" is the one that turns out wrong.",
      },
    ],
    answer:
      "**(i) Co-operative.** Its defining feature is that members are both the owners and the users — surpluses go back to them rather than to outside investors.\n\n**(ii) Public sector.** Funded from public money and accountable through elected representatives. Its objectives are set politically, which is why value for money replaces profit as the performance measure.\n\n**(iii) Non-governmental organisation.** The word that decides it is **independent** — an NGO pursues a cause and is deliberately outside government control.\n\n**(iv) Commercial.** Shareholder ownership plus the objective of increasing owner wealth.",
    earns: [
      "Matching on the discriminator that belongs to one type only",
      "Treating each of the four tasks as separately marked, so an uncertain one is still attempted",
    ],
    loses: [
      "Putting (iii) as not-for-profit — true, but the description names independence from government, which is the NGO's own feature",
      "Leaving a task blank because two types both seemed to fit",
    ],
  },

  "BT-01::ownership-and-control": {
    title: "Separate legal personality and what follows from it",
    format: "ot",
    marks: 2,
    requirement:
      "A company incurs debts it cannot pay. Which of the following correctly describes the position of its shareholders?\n\nA  They are liable for the company's debts in full\nB  They are liable only up to any amount unpaid on their shares\nC  They are liable in proportion to their shareholding\nD  They have no liability of any kind",
    plan: [
      {
        step: "Identify which of the two ideas is being tested",
        detail:
          "Separate legal personality says the company is its own legal person and owns its own debts. Limited liability says how far the members' exposure runs. This stem is about the second, so answer with the limit, not the principle.",
      },
      {
        step: "State the limit precisely before reading the options",
        detail:
          "Liability is limited to the amount **unpaid on the shares**. That precision is the whole question: the options are built to reward it and to punish the loose version.",
      },
      {
        step: "Reject the two easy extremes",
        detail:
          "A describes a sole trader or a general partner, not a shareholder. D is the loose version — attractive because in practice fully paid shares mean nothing more is owed, but it is a statement about a common case, not the rule.",
      },
      {
        step: "Separate the two survivors on wording",
        detail:
          "C sounds plausible because shareholding is proportional, but the limit is not a share of the debt — it is the unpaid amount on the shares held, which is often nil and never a slice of the company's total debts.",
      },
    ],
    answer:
      "**B — liable only up to any amount unpaid on their shares.**\n\nA company has **separate legal personality**: it owns its assets, incurs its own debts and can sue and be sued in its own name. The debts are the company's, not the shareholders'.\n\n**Limited liability** then caps the members' exposure at the amount unpaid on their shares. Where shares are fully paid that amount is nil, which is why D feels right — but it is the outcome of the rule in the usual case, not the rule.",
    earns: [
      "Quoting the limit as \"the amount unpaid on shares\" rather than \"nothing\"",
      "Keeping separate legal personality and limited liability apart as two distinct consequences",
    ],
    loses: [
      "Answering D from the everyday experience that shareholders lose only their investment",
      "Applying the sole trader's unlimited liability to a company by reflex",
    ],
  },

  /* ── BT-02 · Stakeholders and the agency relationship ────────── */

  "BT-02::stakeholders-defined": {
    title: "Classifying a stakeholder as internal, connected or external",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would be classified as a **connected** stakeholder of a listed company?\n\nA  A production supervisor\nB  A bank that has lent the company money\nC  The local community\nD  A government tax authority",
    plan: [
      {
        step: "Recall the three-way split and its logic",
        detail:
          "Internal: inside the organisation — employees and managers. Connected: outside it but in a contractual or ownership relationship — shareholders, lenders, customers, suppliers. External: no such relationship, but affected — government, community, pressure groups.",
      },
      {
        step: "Apply the contract test to each option",
        detail:
          "Ask whether this party has a contract with, or an ownership stake in, the organisation. That single question separates connected from external cleanly, and it is what the examiner is testing.",
      },
      {
        step: "Place the two obvious ones and pause on the third",
        detail:
          "A is inside the organisation, so internal. C has no contract, so external. D is the one candidates misplace, because a tax authority feels powerful — but power is not the classifier here, relationship is.",
      },
      {
        step: "Confirm the survivor has a contract",
        detail:
          "A lending bank holds a loan agreement with the company. That is a contractual relationship from outside the organisation, which is exactly what connected means.",
      },
    ],
    answer:
      "**B — a bank that has lent the company money.**\n\nConnected stakeholders sit outside the organisation but hold a **contractual or ownership relationship** with it: shareholders, lenders, customers and suppliers.\n\nA production supervisor is inside the organisation, so internal. The local community and the tax authority are affected by the company but have no contract with it, so both are external — the tax authority's statutory power does not change its classification.",
    earns: [
      "Using \"is there a contract or an ownership stake?\" as the test",
      "Not letting a stakeholder's power move it between categories",
    ],
    loses: [
      "Classifying government as connected because it can compel the company",
      "Treating customers as external — they have a contract, so they are connected",
    ],
  },

  "BT-02::agency": {
    title: "Identifying the principal, the agent and the cost between them",
    format: "ot",
    marks: 2,
    requirement:
      "In the agency relationship between the shareholders and the directors of a company, which of the following is an **agency cost**?\n\nA  The directors' salaries\nB  The cost of the annual external audit\nC  The dividend paid to shareholders\nD  Corporation tax on the company's profits",
    plan: [
      {
        step: "Fix who is principal and who is agent",
        detail:
          "Shareholders are the principal — they own the company and delegate. Directors are the agent — they run it on the owners' behalf. Getting this backwards inverts every later judgement in the question.",
      },
      {
        step: "Define an agency cost narrowly",
        detail:
          "It is a cost incurred BECAUSE the two parties' interests may diverge and the principal cannot directly observe the agent: monitoring costs, bonding costs, and the residual loss. Not simply any cost the relationship generates.",
      },
      {
        step: "Ask of each option: would this exist if the owner ran the business personally?",
        detail:
          "Salaries would still be paid, dividends would still be drawn as profit, tax would still fall due. Only the audit exists because someone must independently verify what the agent reports to the principal.",
      },
      {
        step: "Name the type before committing",
        detail:
          "The audit is a monitoring cost. Being able to say which of the three types it is confirms the choice, and it is the reasoning the MTQ version of this topic asks for directly.",
      },
    ],
    answer:
      "**B — the cost of the annual external audit.**\n\nAn agency cost arises specifically from the separation of ownership and control: the principal cannot observe the agent, so resources are spent controlling that gap. The audit is a **monitoring cost** — it exists so the owners can rely on the stewardship report their agents produce.\n\nSalaries are the price of the work itself, dividends are a return on ownership, and tax is a statutory charge. All three would arise whether or not ownership and control were separated.",
    earns: [
      "Testing an option with \"would this cost exist without the separation?\"",
      "Naming the cost as monitoring, bonding or residual loss",
    ],
    loses: [
      "Choosing directors' salaries because directors are the agent — the cost of the agent is not an agency cost",
    ],
  },

  "BT-02::conflicting-objectives": {
    title: "Recognising which two stakeholders a decision sets against each other",
    format: "ot",
    marks: 2,
    requirement:
      "A company decides to close a profitable factory and move production overseas at lower cost. This decision most directly creates a conflict between:\n\nA  Shareholders and employees\nB  Shareholders and lenders\nC  Customers and suppliers\nD  Directors and lenders",
    plan: [
      {
        step: "Name what each party wants, in one word each",
        detail:
          "Shareholders: return. Employees: security. Lenders: repayment. Customers: value. Suppliers: continued orders. Government: tax and employment. The conflict is always between two of these wants, not between the parties in the abstract.",
      },
      {
        step: "Say who gains and who loses from this specific decision",
        detail:
          "Lower cost raises profit, so the shareholders gain. The factory closes, so those employees lose their jobs. Write the gain and the loss down before reading the options — the answer is then a matter of matching, not judgement.",
      },
      {
        step: "Check the untouched parties",
        detail:
          "Lenders are, if anything, better off because profitability improves and their interest cover rises. Customers and suppliers are unaffected by where production happens. So B, C and D have no loser in them.",
      },
      {
        step: "Confirm \"most directly\"",
        detail:
          "The stem asks for the direct conflict. The local community and the government also lose, but they are not offered — do not talk yourself out of a correct option because a better one exists that is not on the list.",
      },
    ],
    answer:
      "**A — shareholders and employees.**\n\nStakeholder objectives conflict because the same decision pays one group from another's loss. Here the cost saving raises profit and therefore shareholder return, while the employees at the closed site lose the job security they value.\n\nLenders are not in conflict with anyone: higher profits improve their security. Customers and suppliers are unaffected by the location of production.",
    earns: [
      "Identifying a specific gainer and a specific loser rather than describing the decision",
      "Ruling out pairs where both parties gain or neither is affected",
    ],
    loses: [
      "Choosing a pair that is affected but not opposed",
      "Rejecting the right option because a stakeholder who suffers more was not among the choices",
    ],
  },

  "BT-02::mendelow": {
    title: "Placing stakeholders on the power–interest matrix and acting on it",
    format: "mtq",
    marks: 4,
    requirement:
      "A listed company is planning a major restructuring. For each stakeholder, select the strategy Mendelow's matrix indicates.\n\n(i) A pension fund holding 22% of the shares, actively engaged with the plan\n(ii) A small private shareholder who has never voted\n(iii) A regulator with statutory powers, currently indifferent to the plan\n(iv) A local pressure group with no formal power but a strong interest\n\nStrategies: Minimal effort · Keep informed · Keep satisfied · Key player",
    plan: [
      {
        step: "Score power and interest separately, high or low, before choosing anything",
        detail:
          "Every error on this question comes from judging the stakeholder as a whole rather than on two independent axes. Write \"P: high/low, I: high/low\" for each one first, then read the strategy off the grid.",
      },
      {
        step: "Fix the grid so the labels cannot be swapped",
        detail:
          "Low power + low interest = minimal effort. Low power + high interest = keep informed. High power + low interest = keep satisfied. High power + high interest = key player. The two middle boxes are the ones candidates transpose.",
      },
      {
        step: "Read the clue words in each description",
        detail:
          "\"22% and actively engaged\" is high on both. \"Never voted\" is low interest, and one small holding is low power. \"Statutory powers but indifferent\" is the classic high power, low interest. \"No formal power, strong interest\" is stated outright.",
      },
      {
        step: "Sense-check the two that share a level",
        detail:
          "The regulator and the pressure group both matter, but for opposite reasons — one must be kept satisfied so it stays uninterested, the other kept informed so it does not acquire power by mobilising others.",
      },
    ],
    answer:
      "**(i) Key player** — high power (22% is a blocking-scale holding) and high interest (actively engaged). Strategy is to involve them in the decision itself.\n\n**(ii) Minimal effort** — low power (a small holding) and low interest (has never voted).\n\n**(iii) Keep satisfied** — high power (statutory) but low interest. The aim is to avoid doing anything that raises their interest, because their power is already there.\n\n**(iv) Keep informed** — low formal power but high interest. Informing them limits the risk that they gain power by recruiting stakeholders who have it.",
    earns: [
      "Scoring the two axes independently and reading the strategy off the grid",
      "Explaining keep satisfied as \"do not wake them\" rather than \"please them\"",
    ],
    loses: [
      "Transposing keep informed and keep satisfied — the single most common error on this matrix",
      "Rating the regulator high on interest because regulators sound important",
    ],
  },

  /* ── BT-03 · Political and legal factors ─────────────────────── */

  "BT-03::political-influence": {
    title: "The roles government plays in relation to a business",
    format: "ot",
    marks: 2,
    requirement:
      "A government announces a large increase in infrastructure spending, from which a construction company wins contracts. In this transaction the government is acting principally as:\n\nA  A regulator\nB  A customer\nC  A policymaker\nD  An employer",
    plan: [
      {
        step: "List the roles government can occupy",
        detail:
          "Policymaker setting the economic climate, regulator setting the rules, customer buying goods and services, employer of a large part of the workforce, and supplier of infrastructure and services.",
      },
      {
        step: "Read what the stem says the government DOES in the transaction",
        detail:
          "It awards contracts and pays for work. Strip away the announcement and the policy context and ask only what its role is in the exchange described — the stem's later clause is the one that decides it.",
      },
      {
        step: "Separate the cause from the role",
        detail:
          "The spending decision is policymaking, and that is the trap: C describes how the situation arose. The question asks about the government's role in the transaction, where it is buying.",
      },
      {
        step: "Confirm against the word \"principally\"",
        detail:
          "The government is genuinely acting as a policymaker somewhere in this story. \"Principally\" tells you to pick the dominant role in the relationship described, not to reject an option because another is partly present.",
      },
    ],
    answer:
      "**B — a customer.**\n\nGovernment affects business in several distinct roles, and the syllabus expects them to be told apart. Here it is buying construction services and paying for them, which is the **customer** role. Government is often the single largest customer in an economy, and that is why the role is listed separately.\n\nC is the distractor: the decision to spend was policymaking, but the question asks what role the government occupies in the transaction, not what caused it.",
    earns: [
      "Answering on the role in the described relationship, not on the surrounding narrative",
      "Knowing all five roles, so \"customer\" is available as an answer at all",
    ],
    loses: [
      "Choosing policymaker because a government announcement opened the stem",
    ],
  },

  "BT-03::sources-of-law": {
    title: "Where a legal rule comes from",
    format: "ot",
    marks: 1,
    requirement:
      "A rule of law created by judges deciding cases, and binding on lower courts in later similar cases, is known as:\n\nA  Legislation\nB  Case law\nC  A statutory instrument\nD  A code of practice",
    plan: [
      {
        step: "Treat a one-mark question as pure recall and move fast",
        detail:
          "Sixteen of BT's forty-six objective tests are worth one mark. They reward speed, not deliberation — banking the easy marks quickly is what buys thinking time for the two-mark questions later.",
      },
      {
        step: "Match on the mechanism named in the stem",
        detail:
          "\"Created by judges deciding cases\" and \"binding in later similar cases\" is the doctrine of precedent, and precedent is the mechanism of case law. The stem has effectively defined the answer.",
      },
      {
        step: "Check the near-miss options are a different source",
        detail:
          "Legislation is made by the legislature and a statutory instrument is delegated legislation made under it — both are parliamentary, not judicial. A code of practice is guidance and is not, by itself, law.",
      },
    ],
    answer:
      "**B — case law.**\n\nCase law is made by judges when they decide cases, and the doctrine of **precedent** makes those decisions binding on lower courts facing similar facts later.\n\nLegislation and statutory instruments both originate with the legislature, a statutory instrument being delegated legislation made under an enabling Act. A code of practice is guidance: breaching it may be evidence in proceedings, but it is not itself a source of law.",
    earns: ["Recognising the doctrine of precedent from its description rather than its name"],
    loses: ["Spending two-mark deliberation time on a one-mark recall question"],
  },

  "BT-03::employment-law": {
    title: "Distinguishing unfair dismissal from wrongful dismissal",
    format: "ot",
    marks: 2,
    requirement:
      "An employee is dismissed without the period of notice their contract requires. The employer's conduct amounts to:\n\nA  Unfair dismissal\nB  Wrongful dismissal\nC  Constructive dismissal\nD  Redundancy",
    plan: [
      {
        step: "Sort the four terms by what each one is a breach of",
        detail:
          "Wrongful: breach of the CONTRACT, typically notice. Unfair: breach of the STATUTORY rules on reason and procedure. Constructive: the employee resigns because the employer's conduct made staying impossible. Redundancy: the job itself ceases.",
      },
      {
        step: "Find the breach the stem actually describes",
        detail:
          "The only fact given is that contractual notice was not given. Nothing is said about the reason for dismissal or the procedure followed, which is what unfair dismissal would turn on.",
      },
      {
        step: "Resist filling in facts that are not there",
        detail:
          "A dismissal without notice may well also be unfair, and candidates choose A by importing that assumption. The stem gives no reason and no procedure, so there is nothing on which to judge fairness.",
      },
      {
        step: "Confirm the two remaining options are ruled out by their own definitions",
        detail:
          "The employee was dismissed rather than resigning, so it cannot be constructive. The stem says nothing about the role disappearing, so it is not redundancy.",
      },
    ],
    answer:
      "**B — wrongful dismissal.**\n\nWrongful dismissal is a **contractual** claim: the employer has broken a term of the contract of employment, most commonly by failing to give the required notice.\n\nUnfair dismissal is a **statutory** claim, turning on whether the reason for dismissal was one the law permits and whether a fair procedure was followed — neither of which the stem tells us. Constructive dismissal requires the employee to resign, and redundancy requires the job to cease.",
    earns: [
      "Separating the contractual claim from the statutory one",
      "Answering only on the facts stated rather than the facts implied",
    ],
    loses: [
      "Choosing unfair dismissal because the treatment sounds unfair in ordinary English",
    ],
  },

  "BT-03::data-protection": {
    title: "Applying the data protection principles to a business decision",
    format: "mtq",
    marks: 4,
    requirement:
      "For each action by a company's marketing department, select the data protection principle it breaches.\n\n(i) Keeping customer records indefinitely after the customer has closed their account\n(ii) Collecting date of birth on a form where it serves no purpose\n(iii) Using addresses given for delivery to send unrelated marketing\n(iv) Storing the customer database on an unencrypted shared drive\n\nPrinciples: Purpose limitation · Data minimisation · Storage limitation · Integrity and confidentiality · Accuracy",
    plan: [
      {
        step: "Reduce each principle to the single question it asks",
        detail:
          "Purpose limitation: used only for what it was collected for? Minimisation: no more than needed? Storage limitation: kept no longer than needed? Integrity and confidentiality: kept secure? Accuracy: correct and up to date?",
      },
      {
        step: "Read each scenario for its verb",
        detail:
          "Keeping is about time, collecting is about quantity, using is about purpose, storing insecurely is about security. The verb in each item points at exactly one principle, which is how these tasks are constructed.",
      },
      {
        step: "Do not let one scenario claim two principles",
        detail:
          "Indefinite retention feels like a security risk too, and over-collection feels like a purpose problem. Match on what the item's verb describes; the marks are allocated one principle per task.",
      },
      {
        step: "Check the unused principle is genuinely unused",
        detail:
          "Accuracy is offered and not needed here. An unused option is normal in a matching task — do not force it in and displace a correct answer to make the list come out even.",
      },
    ],
    answer:
      "**(i) Storage limitation** — personal data must be kept no longer than is necessary for the purpose. A closed account ends the necessity.\n\n**(ii) Data minimisation** — only data that is adequate, relevant and limited to what is necessary may be collected. Date of birth with no purpose fails that test at the point of collection.\n\n**(iii) Purpose limitation** — data collected for delivery may not be repurposed for unrelated marketing.\n\n**(iv) Integrity and confidentiality** — data must be processed securely, including protection against unauthorised access. An unencrypted shared drive fails it.\n\nAccuracy is not breached by any of the four.",
    earns: [
      "Turning each principle into a one-line test before reading the scenarios",
      "Accepting that one offered option goes unused",
    ],
    loses: [
      "Answering (i) as a security breach rather than a retention breach",
      "Forcing accuracy into an item so that every principle is used",
    ],
  },

  "BT-03::health-and-safety": {
    title: "Who owes which health and safety duty",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a duty owed by the **employee**, rather than the employer, under health and safety law?\n\nA  Carrying out risk assessments\nB  Providing a safe system of work\nC  Taking reasonable care for their own safety and that of others\nD  Providing health and safety training",
    plan: [
      {
        step: "Read whose duty is being asked for",
        detail:
          "The stem specifies the employee. Three options will be employer duties, and the discipline is to sort by duty-holder before judging whether each statement is true — all four are true duties of someone.",
      },
      {
        step: "Recall the employer's list as a block",
        detail:
          "Safe system of work, safe premises and equipment, risk assessment, training, information and supervision, and a written policy. Anything on that list is disqualified regardless of how reasonable it sounds.",
      },
      {
        step: "Recall the employee's much shorter list",
        detail:
          "Take reasonable care for their own safety and for others affected by their acts, co-operate with the employer on safety matters, and not interfere with or misuse anything provided for safety.",
      },
      {
        step: "Match and confirm the survivor appears on the employee list verbatim",
        detail:
          "C is the first item on the employee's list. A, B and D are all on the employer's, which is what makes them attractive — they are true statements answering a question that was not asked.",
      },
    ],
    answer:
      "**C — taking reasonable care for their own safety and that of others.**\n\nThe employee's duties are short: take reasonable care for their own safety and for others affected by what they do, co-operate with the employer on health and safety, and not misuse or interfere with anything provided for safety.\n\nRisk assessments, a safe system of work and training are all **employer** duties. Each is a true statement, which is precisely why they work as distractors on a question that asked whose duty it was.",
    earns: ["Sorting the options by duty-holder before judging their truth"],
    loses: ["Picking a true statement without checking it belongs to the party the stem named"],
  },

  "BT-03::consumer-protection": {
    title: "The elements a simple contract needs to exist",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **not** required for a simple contract to be formed?\n\nA  Offer and acceptance\nB  Consideration\nC  Intention to create legal relations\nD  Writing signed by both parties",
    plan: [
      {
        step: "Register the NOT and expect three true statements",
        detail:
          "As with every negative stem, the majority of options are correct. The task is to find the one requirement that is not a requirement, so recall the list rather than evaluating each option on plausibility.",
      },
      {
        step: "State the three elements before looking down",
        detail:
          "Agreement, reached through offer and acceptance; consideration, meaning each side gives something of value; and an intention to create legal relations. Three elements, and the option list contains all three.",
      },
      {
        step: "Test the survivor against a known counter-example",
        detail:
          "A shop purchase is a binding contract and nothing is signed. So writing cannot be a general requirement, even though certain contracts — land, for instance — do require it by statute.",
      },
      {
        step: "Check you have not confused validity with evidence",
        detail:
          "Writing matters for PROVING a contract, not for forming one. Candidates who answer from commercial experience, where everything is documented, reason from evidence rather than from formation.",
      },
    ],
    answer:
      "**D — writing signed by both parties.**\n\nA simple contract needs three things: **agreement** (offer and acceptance), **consideration** (each party gives something of value) and an **intention to create legal relations**.\n\nMost contracts need no particular form at all — buying a coffee is a binding contract with nothing in writing. Some specific contracts, such as those for the sale of land, must be in writing by statute, but that is an exception rather than a general element of formation.",
    earns: [
      "Holding the three elements as a closed list",
      "Using an everyday counter-example to settle the survivor",
    ],
    loses: ["Confusing what is needed to form a contract with what is needed to prove one"],
  },

  /* ── BT-04 · The macro-economic environment ──────────────────── */

  "BT-04::objectives": {
    title: "Recognising a macro-economic policy objective",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **not** an objective of government macro-economic policy?\n\nA  Economic growth\nB  Price stability\nC  Maximising the profits of domestic companies\nD  Full employment",
    plan: [
      {
        step: "Recall the four objectives as a fixed list",
        detail:
          "Economic growth, full employment, price stability (control of inflation), and equilibrium on the balance of payments. Some texts add an equitable distribution of income; the four are the core.",
      },
      {
        step: "Notice the NOT and look for the outsider",
        detail:
          "Three options are on the list. The remaining one will usually be something that sounds pro-business, because that is the most tempting wrong answer for a business-studies candidate.",
      },
      {
        step: "Test the outsider by asking who the objective serves",
        detail:
          "Macro-economic objectives are stated for the economy as a whole. Corporate profit is a private objective; government policy may support conditions for it, but the maximisation of company profits is not a policy target.",
      },
      {
        step: "Confirm none of the other three is a near-miss phrasing",
        detail:
          "Check the wording matches the objective and not a policy tool — \"price stability\" is an objective, whereas \"raising interest rates\" would be a tool, and a well-built question sometimes swaps one for the other.",
      },
    ],
    answer:
      "**C — maximising the profits of domestic companies.**\n\nThe objectives of macro-economic policy are **economic growth**, **full employment**, **price stability** and **balance of payments equilibrium**, sometimes with an equitable distribution of income added.\n\nCorporate profitability is a private objective. Government may pursue conditions in which businesses can prosper, but that is a means to growth and employment, not an objective in its own right.",
    earns: ["Holding the four objectives as a closed list rather than reasoning each option out"],
    loses: ["Confusing a policy objective with a policy instrument used to reach it"],
  },

  "BT-04::business-activity": {
    title: "Injections, withdrawals and the direction of the effect",
    format: "ot",
    marks: 2,
    requirement:
      "In the circular flow of income, which of the following is a **withdrawal**?\n\nA  Government spending\nB  Investment by firms\nC  Household saving\nD  Exports",
    plan: [
      {
        step: "Set the two lists side by side",
        detail:
          "Injections add spending to the domestic flow: investment, government spending, exports. Withdrawals take it out: saving, taxation, imports. Each injection has a matching withdrawal, which is what makes them confusable.",
      },
      {
        step: "Use the direction test on each option",
        detail:
          "Ask whether the money leaves the domestic circular flow or enters it. Saving leaves it — income received but not spent. Exports bring foreign money in, so they are an injection despite involving other countries.",
      },
      {
        step: "Watch the pairs that share a topic",
        detail:
          "Exports and imports both concern trade, and government spending and taxation both concern the state. The question is built so that a topic-level match gives the wrong answer; only the direction decides it.",
      },
      {
        step: "Confirm by naming the matching injection",
        detail:
          "Saving is the withdrawal that pairs with investment as the injection. Being able to name the pair confirms the classification rather than guessing at it.",
      },
    ],
    answer:
      "**C — household saving.**\n\nWithdrawals take income out of the circular flow: **saving**, **taxation** and **imports**. Injections put spending in: **investment**, **government spending** and **exports**.\n\nSaving is income that is received but not passed on as spending, so it leaves the flow. Exports are an injection because they bring foreign spending into the domestic economy — the direction of the money, not the involvement of other countries, is what classifies them.",
    earns: ["Classifying by the direction money moves rather than by the topic it concerns"],
    loses: ["Marking exports as a withdrawal because goods leave the country"],
  },

  "BT-04::four-problems": {
    title: "Naming the problem from its symptoms",
    format: "ot",
    marks: 2,
    requirement:
      "An economy is experiencing a persistent rise in the general price level, while output is stagnant and unemployment is rising. This combination is best described as:\n\nA  Demand-pull inflation\nB  Deflation\nC  Stagflation\nD  A balance of payments deficit",
    plan: [
      {
        step: "Split the stem into its separate symptoms",
        detail:
          "Rising prices, stagnant output, rising unemployment. Three facts, and the answer must account for all three — a term that explains only one of them is a distractor however accurate it is about that one.",
      },
      {
        step: "Test each option against every symptom",
        detail:
          "Demand-pull inflation explains rising prices but comes with rising output and falling unemployment, so it contradicts two facts. Deflation contradicts the first outright. A payments deficit is about trade, which the stem never mentions.",
      },
      {
        step: "Recognise the named combination",
        detail:
          "Stagnation plus inflation together is the specific condition the syllabus names, and it is examined precisely because the two normally move in opposite directions.",
      },
      {
        step: "Ask why the combination is examined at all",
        detail:
          "It matters because the usual policy responses conflict: fighting inflation deepens the stagnation, and stimulating output worsens the inflation. That tension is the point of the question.",
      },
    ],
    answer:
      "**C — stagflation.**\n\nStagflation is the simultaneous occurrence of **stagnant output with rising unemployment** and **rising prices**. It is examined because the two halves normally move in opposite directions, and because the standard policy responses pull against each other: tightening to control inflation deepens the stagnation, while stimulating demand worsens the inflation.\n\nDemand-pull inflation would come with rising output and falling unemployment. Deflation is a falling price level, contradicting the stem. A balance of payments deficit concerns trade, which is not mentioned.",
    earns: ["Requiring the answer to explain every symptom in the stem, not just the first"],
    loses: ["Selecting demand-pull inflation on the words \"rise in the general price level\" alone"],
  },

  "BT-04::policy-tools": {
    title: "Choosing between fiscal and monetary instruments",
    format: "mtq",
    marks: 4,
    requirement:
      "Classify each government action as fiscal policy or monetary policy, and state whether it is expansionary or contractionary.\n\n(i) The central bank raises the base rate of interest\n(ii) The government cuts the rate of income tax\n(iii) The central bank buys government bonds from the banking system\n(iv) The government reduces public sector capital spending",
    plan: [
      {
        step: "Split on the instrument, not on who announced it",
        detail:
          "Fiscal policy uses taxation and government spending. Monetary policy uses interest rates and the money supply. Ask which lever is being pulled; the identity of the body pulling it follows from that, not the other way round.",
      },
      {
        step: "Decide the direction from the effect on total demand",
        detail:
          "Expansionary raises aggregate demand, contractionary lowers it. Cutting tax leaves households more to spend; cutting spending removes demand directly; raising rates makes borrowing dearer and saving more attractive.",
      },
      {
        step: "Handle open market operations by following the money",
        detail:
          "The central bank buying bonds pays cash into the banking system, increasing the money supply and lowering rates. Buying is expansionary; selling drains cash and is contractionary. This is the item most often reversed.",
      },
      {
        step: "Answer both halves of every task",
        detail:
          "Each item asks for two things. A correct classification with the direction missing or wrong scores less than it could, and the two parts are quick once the lever is identified.",
      },
    ],
    answer:
      "**(i) Monetary, contractionary.** The interest rate is a monetary instrument; raising it makes borrowing more expensive and saving more attractive, reducing demand.\n\n**(ii) Fiscal, expansionary.** Taxation is a fiscal instrument; cutting income tax raises disposable income and consumption.\n\n**(iii) Monetary, expansionary.** Open market purchases pay cash into the banking system, expanding the money supply and putting downward pressure on rates.\n\n**(iv) Fiscal, contractionary.** Government spending is a fiscal instrument; cutting it removes demand from the economy directly.",
    earns: [
      "Classifying on the instrument used rather than on which institution acted",
      "Getting the direction of open market operations right by following where the cash goes",
    ],
    loses: [
      "Reversing (iii) — buying bonds is expansionary, and it is the classic slip",
      "Giving the policy type but omitting the direction the task also asked for",
    ],
  },

  /* ── BT-05 · Micro-economic factors ──────────────────────────── */

  "BT-05::demand-and-supply": {
    title: "Shift of the curve versus movement along it",
    format: "ot",
    marks: 2,
    requirement:
      "The price of a product falls and the quantity demanded rises. This is best described as:\n\nA  An increase in demand\nB  A movement along the demand curve\nC  A shift of the demand curve to the right\nD  An increase in supply",
    plan: [
      {
        step: "Ask what changed first",
        detail:
          "If the PRICE changed and quantity responded, that is a movement along the curve. If something other than price changed — income, tastes, the price of a substitute — the whole curve shifts.",
      },
      {
        step: "Read the stem for the trigger",
        detail:
          "The stem opens with the price falling. Price is on the axis, so the response to it must be movement along the existing curve, not a new curve.",
      },
      {
        step: "Reject the shift language",
        detail:
          "A and C both describe a shift — \"an increase in demand\" is the technical term for the curve moving right, which is why it reads as a plausible everyday description of what happened.",
      },
      {
        step: "Check the vocabulary trap deliberately",
        detail:
          "In ordinary English \"demand went up\" describes this correctly. In economics it means something else entirely. Answer in the technical register the paper is written in.",
      },
    ],
    answer:
      "**B — a movement along the demand curve.**\n\nWhen the **price** changes, quantity demanded responds and the movement happens **along** the existing curve. The curve itself only shifts when a determinant other than price changes: income, tastes, population, or the price of a substitute or complement.\n\nA and C are the same event as each other and both describe a shift — \"an increase in demand\" is the technical name for a rightward shift, which is what makes it the strongest distractor here.",
    earns: ["Asking whether price or a non-price factor triggered the change"],
    loses: ["Reading \"an increase in demand\" in its everyday sense rather than its technical one"],
  },

  "BT-05::elasticity": {
    title: "Calculating price elasticity and reading what it means for revenue",
    format: "mtq",
    marks: 4,
    requirement:
      "A company reduces its price from $20 to $18. Weekly sales rise from 1,000 units to 1,150 units.\n\n(i) Calculate the price elasticity of demand.\n(ii) State whether demand is elastic or inelastic.\n(iii) State the effect on total revenue, supporting your answer with figures.",
    plan: [
      {
        step: "Write the formula before touching the numbers",
        detail:
          "PED = percentage change in quantity demanded ÷ percentage change in price. Both changes are measured against the ORIGINAL figure, which is where most arithmetic errors enter.",
      },
      {
        step: "Compute the two percentages separately and label them",
        detail:
          "Quantity: 150/1,000 = +15%. Price: −2/20 = −10%. Keeping them on separate lines makes the division trivial and leaves an audit trail if one figure is wrong.",
      },
      {
        step: "Divide and interpret the size, not the sign",
        detail:
          "15 ÷ −10 = −1.5. PED is normally negative because price and quantity move opposite ways, so elasticity is judged on the absolute value: above 1 is elastic, below 1 is inelastic.",
      },
      {
        step: "Prove the revenue effect with figures rather than asserting it",
        detail:
          "Old revenue 1,000 × $20 = $20,000. New revenue 1,150 × $18 = $20,700. The task says to support the answer with figures, so the comparison is where that mark sits.",
      },
    ],
    answer:
      "**(i) PED = −1.5.** Quantity change = 150/1,000 = +15%. Price change = −2/20 = −10%. PED = 15% ÷ −10% = **−1.5**.\n\n**(ii) Elastic.** The absolute value exceeds 1, so quantity demanded responds proportionally more than price.\n\n**(iii) Revenue rises, from $20,000 to $20,700.** Old: 1,000 × $20 = $20,000. New: 1,150 × $18 = $20,700, an increase of $700. This is the general rule: where demand is elastic, a price cut raises total revenue because the volume gain outweighs the margin given up.",
    earns: [
      "Measuring both percentage changes against the original values",
      "Judging elasticity on the absolute value and explaining the negative sign rather than dropping it silently",
      "Showing the two revenue figures, since the task asked for support",
    ],
    loses: [
      "Inverting the formula and dividing the price change by the quantity change",
      "Calling demand inelastic because the answer came out negative",
      "Stating the revenue direction correctly with no figures, when figures were required",
    ],
  },

  "BT-05::cost-behaviour": {
    title: "Fixed and variable costs, and what changes in the long run",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following statements about cost behaviour is correct?\n\nA  Fixed cost per unit is constant as output rises\nB  Variable cost per unit is constant as output rises\nC  Total variable cost is constant as output rises\nD  Total fixed cost rises in proportion to output",
    plan: [
      {
        step: "Draw the two-by-two before reading the options",
        detail:
          "Total fixed: constant. Fixed per unit: falls as output rises. Total variable: rises with output. Variable per unit: constant. Four statements, and the options are built by swapping them around.",
      },
      {
        step: "Check each option against the grid on both dimensions",
        detail:
          "Every option names a cost type AND whether it is total or per unit. Read both halves — the error is almost always in the half that gets skimmed.",
      },
      {
        step: "Eliminate the three swaps",
        detail:
          "A swaps fixed per unit's behaviour for total fixed's. C swaps total variable for variable per unit. D describes total variable cost while labelling it fixed.",
      },
      {
        step: "Confirm the survivor against the definition",
        detail:
          "A variable cost varies in total with activity precisely because each unit costs the same to make — so constant per unit is the definition, not a consequence.",
      },
    ],
    answer:
      "**B — variable cost per unit is constant as output rises.**\n\nWithin the relevant range: **total fixed cost** stays constant while **fixed cost per unit falls** as it is spread over more units; **total variable cost rises** with output while **variable cost per unit stays constant**.\n\nA states the behaviour of total fixed cost but attaches it to the per-unit figure. C and D make the equivalent swap for variable costs. Reading both halves of each statement — which cost, and total or per unit — is the whole discipline of this question.",
    earns: ["Testing each option on both halves: which cost, and total or per unit"],
    loses: ["Matching on \"fixed\" and \"constant\" appearing in the same sentence"],
  },

  "BT-05::market-structures": {
    title: "Identifying a market structure from its characteristics",
    format: "ot",
    marks: 2,
    requirement:
      "A market has a small number of large firms, high barriers to entry, and prices that tend to remain stable because each firm anticipates its rivals' reactions. This market is:\n\nA  Perfectly competitive\nB  Monopolistically competitive\nC  An oligopoly\nD  A monopoly",
    plan: [
      {
        step: "Read the structures off two variables",
        detail:
          "Number of firms and barriers to entry. Perfect competition: many firms, no barriers. Monopolistic competition: many firms, low barriers, differentiated products. Oligopoly: few large firms, high barriers. Monopoly: one firm, barriers absolute.",
      },
      {
        step: "Take the count from the stem first",
        detail:
          "\"A small number of large firms\" eliminates both many-firm structures immediately, leaving only oligopoly and monopoly. Half the question is settled by one clause.",
      },
      {
        step: "Use the interdependence clue to split the survivors",
        detail:
          "Firms anticipating rivals' reactions is **interdependence**, which only exists where there are rivals to anticipate. A monopolist has none, so that clause decides it.",
      },
      {
        step: "Confirm the price behaviour follows",
        detail:
          "Sticky prices are the classic consequence of oligopoly: cutting price triggers matching cuts and no one gains share, raising it loses share to rivals who hold. The stem's third fact corroborates the answer rather than adding a new test.",
      },
    ],
    answer:
      "**C — an oligopoly.**\n\nFew large firms plus high barriers to entry is the definition of oligopoly, and the stem's third fact is its distinguishing behaviour: **interdependence**. Each firm's best move depends on how rivals will respond, which produces sticky prices and pushes competition towards branding, service and advertising rather than price.\n\nA monopolist has no rivals whose reactions could be anticipated. Perfect and monopolistic competition both require many firms, which the first clause rules out.",
    earns: ["Narrowing on firm count first, then splitting the survivors on one behavioural clue"],
    loses: ["Reading \"large firms\" as monopoly without noticing the stem says there are several"],
  },

  /* ── BT-06 · Social, technological and environmental factors ─── */

  "BT-06::pestel-frame": {
    title: "Recalling what the PESTEL headings cover",
    format: "ot",
    marks: 1,
    requirement:
      "In a PESTEL analysis, an ageing population would be classified under which heading?\n\nA  Political\nB  Economic\nC  Social\nD  Legal",
    plan: [
      {
        step: "Expand the acronym in full",
        detail:
          "Political, Economic, Social, Technological, Environmental, Legal. Writing all six out takes seconds and stops a heading being missed simply because it was not brought to mind.",
      },
      {
        step: "Classify the factor by what it describes",
        detail:
          "An ageing population is a demographic fact about people. Demographics sit under Social, which covers population structure, values, lifestyles and attitudes.",
      },
      {
        step: "Check the tempting neighbour",
        detail:
          "Ageing has large economic consequences — pensions, labour supply, healthcare spending. Classify the factor itself, not its effects, or almost every factor collapses into Economic.",
      },
    ],
    answer:
      "**C — social.**\n\nThe Social heading covers demographics, population structure, values, lifestyles and attitudes, and an ageing population is a demographic change.\n\nIts consequences are heavily economic — pension costs, a shrinking workforce, rising healthcare demand — and that is the trap. PESTEL classifies the factor by what it IS, not by what it leads to; classifying by consequence would put nearly everything under Economic.",
    earns: ["Classifying the factor itself rather than its knock-on effects"],
    loses: ["Choosing Economic because the consequences of ageing are financial"],
  },

  "BT-06::social-demographic": {
    title: "Turning a demographic change into a business consequence",
    format: "ot",
    marks: 2,
    requirement:
      "A country's birth rate has fallen steadily for twenty years and life expectancy has risen. For a domestic manufacturer, the most likely direct consequence is:\n\nA  A fall in demand for all its products\nB  A shrinking pool of working-age labour\nC  A reduction in corporation tax rates\nD  An increase in barriers to entry",
    plan: [
      {
        step: "Convert the demographics into a population shape",
        detail:
          "Fewer births plus longer lives means proportionally fewer young people and more old people — the working-age share of the population falls even if the total population does not.",
      },
      {
        step: "Ask what a manufacturer needs from a population",
        detail:
          "Two things: customers and workers. The question is which of the two this change hits directly, and the working-age share is what supplies labour.",
      },
      {
        step: "Reject the overreach",
        detail:
          "A says demand falls for ALL products. Demand shifts rather than disappearing — healthcare, leisure and retirement products grow. An option containing \"all\" or \"always\" usually fails on a counter-example.",
      },
      {
        step: "Reject the unrelated options",
        detail:
          "Tax rates are a political decision, not a demographic consequence. Barriers to entry are a feature of the industry's structure, and nothing about ageing changes them.",
      },
    ],
    answer:
      "**B — a shrinking pool of working-age labour.**\n\nA falling birth rate with rising life expectancy shifts the population's shape: the working-age share falls. For a manufacturer that means recruitment becomes harder and wage pressure rises, which is a direct operational consequence.\n\nA overreaches — demand shifts towards products for older consumers rather than falling across the board. Tax rates are a political choice, and barriers to entry are a property of the industry, neither of which follows from demographics.",
    earns: [
      "Reading demographic change as a change in population SHAPE, not just size",
      "Rejecting options containing an absolute like \"all\"",
    ],
    loses: ["Assuming an ageing population simply means less demand"],
  },

  "BT-06::technological": {
    title: "Distinguishing a technological factor from its business effect",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is best described as a **technological** factor in a retailer's external environment?\n\nA  A decision to close ten stores\nB  The growth of mobile payment platforms\nC  A rise in the national minimum wage\nD  New rules on packaging waste",
    plan: [
      {
        step: "Check each option is external before classifying it",
        detail:
          "PESTEL analyses the EXTERNAL environment. An option describing something the organisation itself decided is disqualified whatever heading it might otherwise fall under.",
      },
      {
        step: "Eliminate the internal option immediately",
        detail:
          "A is the retailer's own decision. It may well be a response to external factors, but it is not one — this is the most common error on PESTEL questions.",
      },
      {
        step: "Classify the three genuine external factors",
        detail:
          "Mobile payments are a development in technology. A minimum wage rise is Political or Legal in origin with Economic effect. Packaging waste rules are Legal, with an Environmental driver.",
      },
      {
        step: "Confirm the survivor is technology itself, not its use",
        detail:
          "The growth of payment platforms is a change in what technology exists and how widely it is adopted, which is exactly what the Technological heading covers.",
      },
    ],
    answer:
      "**B — the growth of mobile payment platforms.**\n\nThe Technological heading covers changes in available technology and its rate of adoption: automation, new channels, data capability, and payment infrastructure among them.\n\nA is internal — the retailer's own decision — and PESTEL examines the external environment only. A minimum wage rise is political or legal in origin, and packaging waste rules are legal, driven by environmental concern.",
    earns: ["Screening for external versus internal before choosing a heading"],
    loses: ["Classifying the organisation's own decisions as environmental factors"],
  },

  "BT-06::environmental": {
    title: "What sustainability asks of an organisation",
    format: "ot",
    marks: 2,
    requirement:
      "Under the concept of sustainable development, an organisation should:\n\nA  Maximise short-term profit for its shareholders\nB  Meet present needs without compromising the ability of future generations to meet theirs\nC  Comply with all applicable environmental legislation\nD  Report its carbon emissions annually",
    plan: [
      {
        step: "Notice the stem asks for the CONCEPT, not for practice",
        detail:
          "Options C and D describe things a sustainable organisation might do. The stem asks what sustainable development requires as a principle, so an activity is the wrong category of answer.",
      },
      {
        step: "Recall the standard formulation",
        detail:
          "Meeting the needs of the present without compromising the ability of future generations to meet their own needs. The inter-generational clause is the whole idea and is what the wrong options lack.",
      },
      {
        step: "Test each option for that clause",
        detail:
          "Only B mentions future generations. C is a legal minimum that says nothing about the future, and D is one disclosure practice among many.",
      },
      {
        step: "Reject the opposite",
        detail:
          "A is the position sustainability was formulated against — short-term profit maximisation is the behaviour the concept exists to qualify, so it cannot be the answer.",
      },
    ],
    answer:
      "**B — meet present needs without compromising the ability of future generations to meet theirs.**\n\nThat inter-generational clause is the definition of sustainable development, and it is what separates the concept from mere compliance. In practice it is expressed through the **triple bottom line** — economic, social and environmental performance, often summarised as people, planet and profit.\n\nC is a legal minimum with no forward-looking element. D is one reporting practice. A is the very behaviour the concept was framed to qualify.",
    earns: ["Reading whether the stem asks for the principle or for a practice"],
    loses: ["Answering with compliance, which is a floor rather than the concept"],
  },

  /* ── BT-07 · Competitive factors ─────────────────────────────── */

  "BT-07::why-competitive-environment": {
    title: "Separating the competitive environment from the general one",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would be analysed as part of an organisation's **competitive** environment rather than its general environment?\n\nA  The rate of inflation\nB  The bargaining power of its suppliers\nC  Data protection legislation\nD  The age profile of the population",
    plan: [
      {
        step: "Fix the distinction on who is affected",
        detail:
          "The general environment — PESTEL — affects every organisation in the economy. The competitive environment is specific to one industry and to one organisation's position within it.",
      },
      {
        step: "Apply the test as a question",
        detail:
          "Ask: does this factor affect my competitors in exactly the same way, or does it depend on who I am and who I deal with? The second is the competitive environment.",
      },
      {
        step: "Sort the options with that question",
        detail:
          "Inflation, data protection law and demographics apply across the economy. Supplier bargaining power depends on which suppliers this particular organisation uses and how concentrated they are.",
      },
      {
        step: "Name the framework each belongs to",
        detail:
          "A, C and D are PESTEL headings. B is one of Porter's five forces. Being able to say which tool analyses the factor confirms the classification.",
      },
    ],
    answer:
      "**B — the bargaining power of its suppliers.**\n\nThe general environment affects all organisations in an economy and is analysed with PESTEL. The **competitive environment** is industry-specific and position-specific, and is analysed with Porter's five forces — supplier power being one of them.\n\nInflation, data protection legislation and population age profile fall on every organisation in the economy. Supplier power depends on which suppliers this organisation actually depends on.",
    earns: ["Using \"does this depend on who I am?\" to separate the two environments"],
    loses: ["Treating anything commercial as competitive — inflation is economy-wide"],
  },

  "BT-07::five-forces": {
    title: "Placing a fact under the right one of the five forces",
    format: "mtq",
    marks: 4,
    requirement:
      "A supermarket chain is analysing its industry. Match each fact to the force of Porter's model it most directly affects.\n\n(i) Customers can compare every chain's prices instantly on an app\n(ii) Building a national distribution network requires very large investment\n(iii) One producer controls 70% of the supply of a staple product\n(iv) Meal-kit delivery services are growing quickly\n\nForces: Threat of new entrants · Bargaining power of buyers · Bargaining power of suppliers · Threat of substitutes · Competitive rivalry",
    plan: [
      {
        step: "Fix each force by the question it answers",
        detail:
          "New entrants: how easily can someone else start doing this? Buyer power: can customers force the price down? Supplier power: can suppliers force our costs up? Substitutes: can the need be met a different way? Rivalry: how hard do existing firms fight?",
      },
      {
        step: "Separate substitutes from rivalry deliberately",
        detail:
          "This is the pair candidates confuse. A rival is another firm doing the SAME thing; a substitute meets the same need a DIFFERENT way. Another supermarket is rivalry; meal kits are a substitute.",
      },
      {
        step: "Read barriers to entry as the entrant's problem, not ours",
        detail:
          "Large required investment is a barrier, and a high barrier means a LOW threat of new entrants. The fact is classified under that force regardless of which direction it pushes it.",
      },
      {
        step: "Match concentration to whichever side holds it",
        detail:
          "One producer with 70% of supply is concentration on the supply side, so supplier power. The same fact about customers would have been buyer power — the force follows the side of the transaction.",
      },
    ],
    answer:
      "**(i) Bargaining power of buyers.** Perfect price transparency and near-zero switching cost let customers force prices down.\n\n**(ii) Threat of new entrants.** The investment required is a barrier to entry, which makes this threat low — the fact still belongs to that force.\n\n**(iii) Bargaining power of suppliers.** A concentrated supplier with no ready alternative can dictate terms.\n\n**(iv) Threat of substitutes.** Meal kits meet the same underlying need — feeding a household — by a different route. Another supermarket would have been rivalry.",
    earns: [
      "Holding the substitute/rival distinction: same need met differently versus the same thing done by someone else",
      "Classifying a barrier under new entrants even though it lowers that threat",
    ],
    loses: [
      "Putting meal kits under competitive rivalry",
      "Assigning supplier concentration to rivalry because it concerns other companies",
    ],
  },

  "BT-07::generic-strategies": {
    title: "Identifying a generic strategy, and the one that is not viable",
    format: "ot",
    marks: 2,
    requirement:
      "A company sells a mid-priced product with no distinctive features to a broad market, and has neither the lowest costs in its industry nor a premium brand. Porter would describe it as:\n\nA  A cost leader\nB  A differentiator\nC  Pursuing a focus strategy\nD  Stuck in the middle",
    plan: [
      {
        step: "Set out the model on its two axes",
        detail:
          "Source of advantage — low cost or differentiation — against scope — broad market or narrow segment. That gives cost leadership, differentiation, and focus in its cost and differentiation forms.",
      },
      {
        step: "Test the company on each axis using the stem's own words",
        detail:
          "It does not have the lowest costs, so no cost advantage. It has no distinctive features, so no differentiation. It serves a broad market, so scope is not narrow.",
      },
      {
        step: "Notice the position that is left",
        detail:
          "Failing on both axes is not a fourth strategy — it is the absence of one, which Porter names \"stuck in the middle\". The stem is written to negate each option in turn.",
      },
      {
        step: "Be ready to say why it matters",
        detail:
          "Such a firm is undercut by the cost leader and out-specified by the differentiator, so it earns below-average returns. The MTQ version of this topic asks for that consequence, not just the label.",
      },
    ],
    answer:
      "**D — stuck in the middle.**\n\nPorter's generic strategies combine a source of advantage (low cost or differentiation) with a scope (broad or narrow): **cost leadership**, **differentiation**, and **focus** in its cost and differentiation variants.\n\nA firm with neither cost advantage nor differentiation, serving a broad market, has failed to make either choice. Porter's argument is that such a firm earns below-average returns because the cost leader undercuts it on price and the differentiator beats it on everything else.",
    earns: [
      "Testing the company against both axes rather than looking for the closest-sounding label",
      "Being able to state the consequence: undercut on one side, out-specified on the other",
    ],
    loses: ["Choosing focus because \"mid-priced\" sounds like a middle segment — focus is about a narrow market, not a middle price"],
  },

  "BT-07::value-chain": {
    title: "Sorting primary activities from support activities",
    format: "ot",
    marks: 2,
    requirement:
      "In Porter's value chain, which of the following is a **support** activity?\n\nA  Outbound logistics\nB  Operations\nC  Procurement\nD  Marketing and sales",
    plan: [
      {
        step: "Recall the five primary activities in sequence",
        detail:
          "Inbound logistics, operations, outbound logistics, marketing and sales, and service. They form the flow of the product from input to customer, which is why the order helps recall them.",
      },
      {
        step: "Recall the four support activities",
        detail:
          "Firm infrastructure, human resource management, technology development, and procurement. They serve the primary activities rather than touching the product's flow directly.",
      },
      {
        step: "Use the flow test on each option",
        detail:
          "Ask whether the activity is part of getting this product to this customer. Three options are steps in that flow; procurement acquires resources for the whole organisation, so it sits outside it.",
      },
      {
        step: "Guard against the everyday meaning of procurement",
        detail:
          "Buying raw materials feels like inbound logistics. Porter separates them: procurement is the function that acquires inputs of every kind, inbound logistics is the physical handling of materials once acquired.",
      },
    ],
    answer:
      "**C — procurement.**\n\nThe **primary** activities are inbound logistics, operations, outbound logistics, marketing and sales, and service — the sequence by which the product reaches the customer. The **support** activities are firm infrastructure, human resource management, technology development and procurement.\n\nProcurement is the function that acquires resources across the organisation, including things unconnected to any one product. Inbound logistics, by contrast, is the receipt, storage and handling of materials — which is where candidates place procurement by mistake.",
    earns: ["Distinguishing procurement (the acquiring function) from inbound logistics (physical handling)"],
    loses: ["Assuming anything involving buying materials must be a primary activity"],
  },
}
