import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Area C — Governance, ethics & professional behaviour.
 * Rich study chapter: corporate governance and the agency problem, board
 * structure and committees, the accountancy profession, the five fundamental
 * ethical principles with threats and safeguards, ethical decision models
 * (Tucker, Kohlberg), CSR and sustainability, and fraud/bribery/money-laundering
 * awareness. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const BT_C: StudyChapter = {
  paper: "BT",
  area: "C",
  title: "Governance, ethics & professional behaviour",
  minutes: 15,
  intro: "A business runs on trust it cannot see. Governance is the machinery that keeps the people in charge honest — and ethics is the compass each accountant carries when the machinery goes quiet.",
  outcomes: [
    "Explain the agency problem and how corporate governance is designed to control it",
    "Describe board structure, the key committees and the role of non-executive directors",
    "Contrast unitary and two-tier boards and the comply-or-explain approach",
    "State the five fundamental ethical principles and the threats and safeguards that protect them",
    "Apply ethical decision models — Tucker's five questions and Kohlberg's stages of moral development",
    "Recognise CSR, sustainability, and the warning signs of fraud, bribery and money laundering",
  ],
  sections: [
    {
      id: "agency",
      heading: "The agency problem — why governance exists",
      blocks: [
        { kind: "text", md: "In any company bigger than a corner shop, the people who **own** the business are not the people who **run** it. Shareholders own it; directors run it on their behalf. That split is called the **separation of ownership and control**, and it creates a quiet but permanent tension." },
        { kind: "text", md: "The owners (the **principals**) hire the directors (their **agents**) to act in the owners' best interests. But agents are human: they may prefer a bigger salary, a grander office, a lower-risk quiet life, or an empire-building acquisition that flatters their ego more than it grows shareholder wealth. When the agent's interests pull away from the principal's, you have the **agency problem**." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The agency relationship",
          caption: "Owners delegate control to directors — and must then find ways to trust them.",
          data: {
            steps: [
              { label: "Shareholders", sub: "principals — own the company" },
              { label: "Delegate control", sub: "appoint directors to run it" },
              { label: "Directors", sub: "agents — make the decisions" },
              { label: "Agency gap", sub: "interests may diverge" },
              { label: "Governance", sub: "controls that close the gap" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Corporate governance defined", md: "**Corporate governance** is the system by which companies are **directed and controlled** — the structures, rules and processes that hold directors accountable to shareholders and other stakeholders. Its whole purpose is to keep the agent working for the principal." },
        { kind: "text", md: "Governance answers the owner's uneasy question — \"how do I know they are running my company well when I am not in the room?\" — with checks: an independent board, external audit, committees, disclosure, and pay tied to performance. Each is a device to shrink the agency gap." },
      ],
    },
    {
      id: "board",
      heading: "The board and its committees",
      blocks: [
        { kind: "text", md: "The **board of directors** sits at the top of the governance structure. Good practice splits its members into two types. **Executive directors** are full-time managers of the business (the CEO, finance director, and so on). **Non-executive directors (NEDs)** are part-time, sit outside day-to-day management, and bring independent judgement, outside experience and a challenging eye." },
        { kind: "callout", tone: "rule", title: "Split the top two roles", md: "The roles of **chair** (who runs the board) and **chief executive** (who runs the company) should be held by **different people**. Combining them concentrates too much power in one person and weakens the board's ability to hold management to account." },
        { kind: "text", md: "Because directors cannot mark their own homework, much of the sensitive work is pushed down to **board committees** made up mainly or wholly of independent NEDs. Three matter most for the exam." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three principal board committees",
          caption: "Each is staffed by non-executive directors to keep management honest.",
          data: {
            items: [
              { title: "Audit committee", sub: "Oversees financial reporting, internal controls and the external auditor's independence" },
              { title: "Remuneration committee", sub: "Sets directors' pay so no director sets their own — links reward to performance" },
              { title: "Nomination committee", sub: "Leads new board appointments objectively, on merit, and plans succession" },
            ],
          },
        } },
        { kind: "text", md: "The logic is consistent: take every decision where a director might be tempted to favour themselves — their own pay, their own successor, the audit of their own numbers — and hand it to people who have nothing personal to gain. That is why **NED independence** is the quiet hero of the whole system." },
        { kind: "table", caption: "What non-executive directors bring", head: ["Role", "What the NED does"], rows: [
          ["Strategy", "Contribute to and constructively challenge the direction management sets"],
          ["Scrutiny", "Monitor executive performance against agreed goals"],
          ["Risk", "Satisfy themselves that financial information and controls are robust"],
          ["People", "Set executive pay and lead appointments and succession"],
        ] },
      ],
      check: {
        q: "Which board committee is responsible for setting the pay of the executive directors?",
        options: [
          "The audit committee",
          "The nomination committee",
          "The remuneration committee",
          "The full board of executive directors",
        ],
        correct: 2,
        explain: "The remuneration committee — staffed by independent non-executive directors — sets executive pay so that no director is fixing their own salary. The audit committee oversees financial reporting and the external auditor; the nomination committee leads board appointments and succession.",
      },
    },
    {
      id: "structures",
      heading: "Board structures and comply-or-explain",
      blocks: [
        { kind: "text", md: "Countries organise the board in two broad ways. In the **unitary** model (used in the UK, US and much of the common-law world) executives and non-executives sit together on **one single board** that both runs the company and supervises itself. In the **two-tier** model (used in Germany and parts of Europe) the roles are physically separated: a **management board** runs the business, and a distinct **supervisory board** of outsiders and employee representatives oversees it from above." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Unitary vs two-tier boards",
          data: {
            leftTitle: "Unitary board",
            rightTitle: "Two-tier board",
            rows: [
              { aspect: "Structure", left: "One board of execs + NEDs", right: "Separate management and supervisory boards" },
              { aspect: "Oversight", left: "NEDs supervise from within", right: "Supervisory board oversees from above" },
              { aspect: "Information flow", left: "Fast — all directors share a table", right: "Slower — filtered between the two boards" },
              { aspect: "Independence", left: "Relies on NEDs staying independent", right: "Built-in structural separation" },
              { aspect: "Typical home", left: "UK, US", right: "Germany, much of Europe" },
            ],
          },
        } },
        { kind: "text", md: "Governance codes such as the UK's are usually **principles-based** rather than a rigid rulebook, and they operate on a **comply-or-explain** basis. A company either follows each provision, **or** it explains publicly why it has departed from it and what it does instead. This is flexible — a small firm need not carry the machinery of a giant — while still forcing transparency, because the market can judge the explanation." },
        { kind: "callout", tone: "warn", title: "Comply-or-explain is not comply-or-ignore", md: "\"Explain\" means a **genuine, reasoned** account that investors can weigh — not silence and not a boilerplate excuse. A weak or missing explanation is itself a governance red flag." },
      ],
      check: {
        q: "Under a 'comply-or-explain' governance code, a company that chooses not to follow a particular provision must:",
        options: [
          "Pay a fixed fine to the regulator",
          "Publicly explain why it has departed and what it does instead",
          "Delist from the stock exchange",
          "Do nothing — the code is entirely optional",
        ],
        correct: 1,
        explain: "Comply-or-explain lets a company depart from a provision, but only if it publicly and genuinely explains the reason and its alternative approach, so investors can judge for themselves. It is principles-based, not a fine-backed rulebook — but it is not a licence to ignore the code silently.",
      },
    },
    {
      id: "profession",
      heading: "The accountancy profession and why ethics binds it",
      blocks: [
        { kind: "text", md: "An accountant's product is **trust**. A set of accounts is only worth anything because users believe the person who prepared or audited them was competent and honest. That belief is what the **accountancy profession** exists to protect — and it protects it through education, examinations, continuing development, a code of ethics and, ultimately, discipline for those who breach it." },
        { kind: "text", md: "This is what makes accountancy a **profession** rather than merely a job: a recognised body of expert knowledge, entry controlled by qualification, a duty to serve the **public interest** above self-interest, and a binding code members must uphold. Because the work affects people who never see it — investors, lenders, employees, the public — the profession is held to standards far higher than \"whatever the client wants\"." },
        { kind: "callout", tone: "key", title: "The public interest", md: "A professional accountant's overriding duty is to act in the **public interest**, not merely in the interest of the client or employer who pays them. When those interests collide, the public interest — and the ethical code — must win." },
        { kind: "text", md: "ACCA's code is built on the international code issued by the **IESBA** (the International Ethics Standards Board for Accountants). Rather than listing thousands of \"do nots\", it takes a smarter **principles-based** approach: five fundamental principles, plus a framework for spotting and dealing with anything that threatens them. Learn the five principles cold — they are examined relentlessly." },
      ],
    },
    {
      id: "principles",
      heading: "The five fundamental principles",
      blocks: [
        { kind: "text", md: "Every ethical requirement flows from five fundamental principles. A memory hook that catches all five: **\"I Owe Colleagues Complete Professionalism\"** — **I**ntegrity, **O**bjectivity, professional **C**ompetence and due care, **C**onfidentiality, **P**rofessional behaviour." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five fundamental principles",
          caption: "Every ethical rule in the code traces back to one of these five.",
          data: {
            items: [
              { title: "Integrity", sub: "Be straightforward and honest in all professional and business relationships" },
              { title: "Objectivity", sub: "Do not let bias, conflicts of interest or undue influence override judgement" },
              { title: "Professional competence & due care", sub: "Keep skills current and act diligently to the required standard" },
              { title: "Confidentiality", sub: "Do not disclose or exploit client information without proper authority or a legal duty" },
              { title: "Professional behaviour", sub: "Comply with laws and regulations and avoid anything that discredits the profession" },
            ],
          },
        } },
        { kind: "table", caption: "The five principles in plain English", head: ["Principle", "In one line", "Breach example"], rows: [
          ["Integrity", "Be honest and straightforward", "Signing off figures you know are misleading"],
          ["Objectivity", "Stay unbiased and independent", "Auditing a company where you own shares"],
          ["Competence & due care", "Be skilled and careful", "Taking on tax work in a field you don't understand"],
          ["Confidentiality", "Keep client information private", "Tipping off a friend using inside client knowledge"],
          ["Professional behaviour", "Uphold the profession's good name", "Making false or exaggerated claims in advertising"],
        ] },
        { kind: "callout", tone: "tip", title: "Objectivity ≠ confidentiality", md: "Exam distractors love to swap these. **Objectivity** is about your **judgement** being free from bias. **Confidentiality** is about **information** being kept private. Different problems, different principle." },
      ],
      check: {
        q: "An accountant accepts a management accounting assignment in an industry she knows nothing about and has no time to research. Which fundamental principle is most directly threatened?",
        options: [
          "Confidentiality",
          "Professional competence and due care",
          "Objectivity",
          "Integrity",
        ],
        correct: 1,
        explain: "Professional competence and due care requires an accountant to have — and maintain — the knowledge and skill to perform the work to the required standard, and to act diligently. Taking on work she is not competent to do breaches this principle. She could refer the work, gain the expertise, or decline it.",
      },
    },
    {
      id: "threats",
      heading: "Threats, safeguards and resolving conflicts",
      blocks: [
        { kind: "text", md: "The code assumes that in real life something will always try to knock you off the five principles. It names **five categories of threat** — the same five appear again and again in questions." },
        { kind: "table", caption: "The five threats to independence and objectivity", head: ["Threat", "What it is", "Classic example"], rows: [
          ["Self-interest", "A financial or other interest sways you", "You own shares in the audit client"],
          ["Self-review", "You must judge your own earlier work", "Auditing a system you designed"],
          ["Advocacy", "You promote a client's position too far", "Acting as the client's advocate in a dispute"],
          ["Familiarity", "Too close or too trusting of the client", "A close relative is the client's finance director"],
          ["Intimidation", "You are pressured or threatened", "The client threatens to sack you unless you agree"],
        ] },
        { kind: "text", md: "Against each threat the accountant applies **safeguards** — actions that reduce the threat to an acceptable level. Some are created by the profession (education, standards, monitoring, discipline); others exist in the work environment (rotating audit partners, independent review, separating teams, consulting the ethics partner). The rule is proportionate: identify the threat, evaluate how serious it is, then safeguard it down — or, if it cannot be reduced enough, **step away** from the engagement." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Resolving an ethical conflict",
          caption: "A structured route from spotting a threat to a defensible decision.",
          data: {
            steps: [
              { label: "Identify", sub: "Name the threat and the principle at risk" },
              { label: "Evaluate", sub: "How serious is it? Gather the facts" },
              { label: "Consider", sub: "Internal review, ethics partner, professional body" },
              { label: "Safeguard", sub: "Apply measures to reduce the threat" },
              { label: "Document", sub: "Record the issue and reasoning" },
              { label: "Withdraw", sub: "If it cannot be resolved, decline or resign" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The last resort is real", md: "If no safeguard can reduce a threat to an acceptable level, the professional accountant must **decline or withdraw** from the engagement — and, where required, resign. \"Going along with it\" is never an ethical option." },
      ],
      check: {
        q: "An audit client's finance director hints that the audit fee — and the firm's other consulting work — will be withdrawn unless the auditor accepts an aggressive revenue figure. Which threat is this?",
        options: [
          "Self-review threat",
          "Advocacy threat",
          "Intimidation threat",
          "Familiarity threat",
        ],
        correct: 2,
        explain: "This is an intimidation threat: the auditor is being pressured by a threat to their fees to abandon objective judgement. Safeguards include escalating internally, consulting the ethics partner or professional body, and — if the pressure cannot be resisted — withdrawing from the engagement.",
      },
    },
    {
      id: "models",
      heading: "Ethical decision models — Tucker and Kohlberg",
      blocks: [
        { kind: "text", md: "When the code gives a principle but not a ready-made answer, structured models help an accountant reason to a defensible decision. Two are examinable." },
        { kind: "text", md: "**Tucker's five-question model** tests a proposed decision by asking whether it is: **profitable**, **legal**, **fair**, **right**, and **sustainable**. A sound decision should be able to answer **yes** to all five. It is a fast, practical checklist — if any answer is \"no\", think again." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Tucker's five questions",
          caption: "Run a decision through all five gates — a 'no' anywhere is a warning.",
          data: {
            steps: [
              { label: "Profitable?", sub: "Does it make commercial sense?" },
              { label: "Legal?", sub: "Does it comply with the law?" },
              { label: "Fair?", sub: "Is it fair to all parties?" },
              { label: "Right?", sub: "Is it morally right?" },
              { label: "Sustainable?", sub: "Is it environmentally sound?" },
            ],
          },
        } },
        { kind: "text", md: "**Kohlberg's stages of moral development** explains *why* people decide as they do. He grouped moral reasoning into three ascending **levels**, each with two stages. At the lowest level people obey only to avoid punishment or gain reward; at the highest they act on self-chosen universal principles even when law or peers disagree." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "Kohlberg's three levels of moral development",
          caption: "Reasoning matures from self-interest, to social rules, to universal principle.",
          data: {
            levels: [
              { label: "Post-conventional", sub: "Acts on self-chosen universal ethical principles — right even when the law or the group disagrees" },
              { label: "Conventional", sub: "Does what maintains relationships, social approval, law and order" },
              { label: "Pre-conventional", sub: "Driven by consequences to self — avoiding punishment, seeking reward" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Reading the pyramid", md: "The pyramid narrows upward: most everyday reasoning sits at the **conventional** middle level. The **post-conventional** apex — acting on principle regardless of reward or rule — is the rarest and the most mature, and it is exactly what the profession asks of an accountant under pressure." },
      ],
    },
    {
      id: "csr-fraud",
      heading: "CSR, sustainability and financial crime awareness",
      blocks: [
        { kind: "text", md: "Ethics does not stop at the audit file. **Corporate social responsibility (CSR)** is the idea that a company is accountable not only to shareholders but to a wider set of **stakeholders** — employees, customers, communities and the environment. Linked to it, **sustainability** asks whether the business meets today's needs without robbing future generations, often summarised as the **triple bottom line** of *people, planet, profit*." },
        { kind: "callout", tone: "key", title: "Stakeholders, not just shareholders", md: "A shareholder-only view maximises short-term profit. A **stakeholder** view accepts that lasting value depends on trust from everyone the business touches — which is why CSR and ethics are commercial, not just moral, concerns." },
        { kind: "text", md: "Finally, every accountant must recognise three forms of **financial crime** — the exam expects awareness of what each is and the duty it triggers." },
        { kind: "table", caption: "Three financial crimes an accountant must recognise", head: ["Crime", "What it is", "The accountant's duty"], rows: [
          ["Fraud", "Deception for unlawful gain — e.g. false invoices, fictitious sales", "Alertness to red flags; strong internal controls; report suspicions"],
          ["Bribery", "Offering, giving or receiving an inducement to act improperly", "Refuse; maintain anti-bribery policies; never offer or accept"],
          ["Money laundering", "Making the proceeds of crime look legitimate", "Know-your-client checks; report suspicions; do not 'tip off'"],
        ] },
        { kind: "callout", tone: "warn", title: "Two money-laundering traps", md: "You must **report** a suspicion of money laundering to the relevant authority — and you must **not tip off** the suspect that a report has been made. Doing nothing, or warning the client, are both offences in their own right." },
        { kind: "text", md: "Money laundering is usually described in three stages: **placement** (getting dirty cash into the system), **layering** (moving it through transactions to disguise its origin) and **integration** (bringing the now clean-looking money back as apparently legitimate wealth). Recognising the pattern is the first line of defence." },
      ],
      check: {
        q: "An accountant develops a genuine suspicion that a client is laundering the proceeds of crime. What must the accountant do?",
        options: [
          "Warn the client so they can explain themselves",
          "Report the suspicion to the appropriate authority and not tip off the client",
          "Ignore it unless the amounts are very large",
          "Resign quietly and say nothing to anyone",
        ],
        correct: 1,
        explain: "The accountant must report the suspicion to the appropriate authority (via the firm's reporting procedures) and must NOT tip off the client that a report has been made. Warning the client is the separate offence of tipping off; ignoring a suspicion or staying silent breaches the duty to report.",
      },
    },
  ],
  examTraps: [
    { trap: "Confusing objectivity with confidentiality.", fix: "Objectivity is about unbiased judgement; confidentiality is about keeping information private. Different principles for different problems." },
    { trap: "Listing only four fundamental principles or inventing a sixth like 'honesty'.", fix: "There are exactly five: integrity, objectivity, professional competence & due care, confidentiality, professional behaviour. Honesty sits inside integrity." },
    { trap: "Mixing up the board committees.", fix: "Audit = financial reporting and the auditor; remuneration = directors' pay; nomination = appointments and succession." },
    { trap: "Reading 'comply-or-explain' as optional.", fix: "A company must either comply or give a genuine public explanation. Silence or a boilerplate excuse is a governance failure, not compliance." },
    { trap: "Thinking you can warn a client you have reported them for money laundering.", fix: "That is 'tipping off' — a separate criminal offence. Report the suspicion; say nothing to the suspect." },
    { trap: "Naming the wrong ethical threat.", fix: "Pressure = intimidation; own interest = self-interest; judging own work = self-review; too close = familiarity; over-promoting the client = advocacy." },
  ],
  keyTerms: [
    { term: "Agency problem", def: "The conflict that arises when directors (agents) may act in their own interests rather than those of the shareholders (principals) who own the company." },
    { term: "Non-executive director (NED)", def: "A part-time board member outside day-to-day management who brings independent judgement, scrutiny and outside experience." },
    { term: "Comply-or-explain", def: "A governance approach where a company either follows each code provision or publicly explains why it has departed and what it does instead." },
    { term: "Fundamental principles", def: "The five pillars of the ethical code: integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour." },
    { term: "Safeguard", def: "An action, created by the profession or the work environment, that reduces a threat to a fundamental principle to an acceptable level." },
  ],
  summary: [
    "Governance exists to solve the agency problem — keeping directors (agents) working for shareholders (principals).",
    "A strong board splits chair and CEO and pushes sensitive decisions to NED-led audit, remuneration and nomination committees.",
    "Unitary boards supervise from within; two-tier boards separate management and supervisory boards; codes work by comply-or-explain.",
    "The five fundamental principles — integrity, objectivity, competence & due care, confidentiality, professional behaviour — are protected against five threats using safeguards, and withdrawal as the last resort.",
    "Tucker's five questions and Kohlberg's three levels guide ethical reasoning; CSR, sustainability and awareness of fraud, bribery and money laundering complete the professional accountant's duty.",
  ],
}
