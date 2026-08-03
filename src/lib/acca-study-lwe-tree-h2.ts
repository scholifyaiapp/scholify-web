import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area H, final part — bribery, criminal activity in the management of
 * companies, and fraudulent and wrongful trading.
 * Chapters 45–46 of the LW-ENG reading tree, completing syllabus group H1 and the tree.
 *
 * Global compresses bribery, fraudulent trading and wrongful trading into a single
 * chapter. ENG splits them, because H1(f) and H1(g) are about CORPORATE criminal
 * liability under the Bribery Act 2010 and the Criminal Finances Act 2017 — where the
 * defence is having had reasonable procedures — while H1(h) is about PERSONAL liability
 * of directors under the Insolvency Act 1986. They are different mechanisms with
 * different defences, and running them together is how candidates lose marks.
 *
 * Chapter 46 is the last chapter of the tree, so it closes by drawing the paper
 * together: one negligent audit reaching Areas E, F, G and H.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 45 · H1(f), H1(g) ─────────────────────────────────── */

export const LWE_TREE_45: StudyChapter = {
  id: "LWE-45",
  number: 45,
  paper: "LW",
  area: "H",
  title: "Bribery, and criminal activity in managing a company",
  minutes: 17,
  syllabusRefs: ["H1(f)", "H1(g)"],
  intro:
    "Two corporate offences built the same way: the company is liable for what somebody connected with it did, and its only real defence is having had proper procedures in place before it happened.",
  outcomes: [
    "State the four bribery offences and who can commit each",
    "Explain the corporate offence of failing to prevent bribery and its defence",
    "Explain the offence of failing to prevent the facilitation of tax evasion",
    "Explain the meaning of a relevant body",
    "Identify the other criminal activity arising in the operation and liquidation of companies",
  ],
  sections: [
    {
      id: "bribery",
      heading: "The Bribery Act 2010",
      blocks: [
        {
          kind: "table",
          caption: "The four offences",
          head: ["Offence", "Who commits it", "What it involves"],
          rows: [
            ["**Bribing another person** — active bribery", "Any person", "Offering, promising or giving a **financial or other advantage** to induce improper performance of a relevant function, or to reward it"],
            ["**Being bribed** — passive bribery", "Any person", "Requesting, agreeing to receive or accepting such an advantage"],
            ["**Bribing a foreign public official**", "Any person", "Offering an advantage to influence the official in their capacity, intending to obtain or retain business or an advantage in business"],
            ["**Failure of a commercial organisation to prevent bribery**", "A **relevant commercial organisation**", "A person **associated** with the organisation bribes another, intending to obtain or retain business or a business advantage **for the organisation**"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The corporate offence, and the only defence to it",
          md: "The fourth offence is the examinable one, because it makes the **organisation itself** liable for what an **associated person** — an employee, agent, subsidiary or anyone performing services for it — did, **without proof of any fault by the board**. The defence is that the organisation had in place **\"adequate procedures\"** designed to prevent bribery by associated persons. So the board's **ignorance is not an answer**; having had a real, risk-assessed and enforced anti-bribery programme is. That is why the answer to a bribery scenario always addresses **procedures**, not just the individual wrongdoer.",
        },
        {
          kind: "list",
          title: "What adequate procedures look like",
          items: [
            "**Proportionate procedures**, matched to the organisation's size and risk profile.",
            "**Top-level commitment**, so the board visibly owns the policy.",
            "**Risk assessment**, documented, covering country, sector, transaction, partnership and client risks.",
            "**Due diligence** on the people and entities who perform services for the organisation.",
            "**Communication and training**, so those bound by the policy know it.",
            "**Monitoring and review**, so the programme keeps working rather than sitting in a drawer.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Facilitation payments and hospitality",
          md: "Small **facilitation payments** to secure a routine service are **not** exempt — there is no de minimis, and paying a small sum to speed up a licence is capable of being bribery. **Hospitality** is not prohibited, but it becomes a bribe where it is **intended to induce improper performance**; the tests are proportionality, transparency and whether it was reasonable in the circumstances. Penalties are severe: **unlimited fines** for organisations, and up to **ten years' imprisonment** for individuals.",
        },
      ],
      check: {
        q: "An overseas agent bribes an official to win a contract for the company. The board knew nothing about it. Is the company liable?",
        options: [
          "No, because the board had no knowledge and did not authorise it",
          "Yes, under the corporate failure-to-prevent offence — unless it had adequate procedures in place",
          "No, because the agent is not an employee",
          "Only if the company benefited financially",
        ],
        correct: 1,
        explain:
          "YES, under the FAILURE TO PREVENT BRIBERY offence. An ASSOCIATED PERSON includes an agent, and the offence needs NO fault by the board — so ignorance is not a defence. The only defence is having had ADEQUATE PROCEDURES designed to prevent bribery by associated persons.",
      },
    },
    {
      id: "tax-evasion-other",
      heading: "Failing to prevent tax evasion, and the other offences",
      blocks: [
        {
          kind: "definition",
          term: "Failure to prevent the facilitation of tax evasion",
          md: "A **corporate** offence, committed where a person **associated** with a **relevant body** criminally facilitates another person's tax evasion while acting in that capacity. As with bribery the defence is having had **reasonable prevention procedures** in place, and the board's ignorance is not itself an answer.",
        },
        {
          kind: "definition",
          term: "Relevant body",
          md: "A **body corporate or a partnership** — **not** an individual. That is the whole point of the definition: this offence attaches to the **organisation**, so the individual facilitator is prosecuted under the ordinary law while the entity faces its own separate liability for having failed to prevent them.",
        },
        {
          kind: "table",
          caption: "The two failure-to-prevent offences compared",
          head: ["", "Failure to prevent bribery", "Failure to prevent facilitation of tax evasion"],
          rows: [
            ["**Who is liable**", "A relevant **commercial organisation**", "A **relevant body** — body corporate or partnership"],
            ["**Trigger**", "An **associated person** bribes, intending to benefit the organisation", "An **associated person** criminally facilitates another's tax evasion"],
            ["**Board fault needed?**", "**No**", "**No**"],
            ["**Defence**", "**Adequate procedures**", "**Reasonable prevention procedures**"],
            ["**Penalty**", "**Unlimited fine**", "**Unlimited fine**"],
          ],
        },
        {
          kind: "list",
          title: "Other crimes arising while a company is run, managed and wound up",
          items: [
            "**Fraudulent trading**, and **wrongful trading** — chapter 46.",
            "**Falsification, destruction or concealment of company records**, and making **false statements** to an auditor or a liquidator (chapter 39).",
            "**Failing to co-operate with a liquidator or administrator**, or failing to deliver up company property, books and records.",
            "**Fraud in anticipation of winding up** — concealing or removing property, or falsifying records, before the winding up.",
            "**Transactions defrauding creditors**, and **preferences** and **transactions at an undervalue**, which the court may set aside (chapter 41).",
            "**Trading while disqualified**, which is both an offence and personal liability for the debts incurred (chapter 37).",
            "**Persistent breach of filing obligations**, which grounds disqualification.",
            "**Insider dealing and market abuse** (chapter 43), and **money laundering** (chapter 44).",
          ],
        },
        {
          kind: "example",
          title: "Advising on corporate exposure",
          scenario:
            "Kelbrook Group plc operates through subsidiaries in several countries. Its sales agent in one country pays a £4,000 \"expediting fee\" to a customs official to release a shipment, winning Kelbrook a contract renewal. Separately, an employee of a Kelbrook subsidiary helps a customer route invoices through a shell company so the customer can understate its taxable profits. Kelbrook has an anti-bribery policy in its staff handbook, adopted six years ago, never communicated in training, never risk-assessed, and never monitored. Its board knew nothing of either matter.",
          steps: [
            { label: "Classify the expediting fee", detail: "Paying an official to secure the release of a shipment is BRIBERY — a FACILITATION PAYMENT is NOT exempt, and there is no de minimis, so £4,000 for a routine service is capable of being an offence. The agent commits active bribery and bribing a FOREIGN PUBLIC OFFICIAL." },
            { label: "Test Kelbrook's corporate liability for it", detail: "The agent is an ASSOCIATED PERSON and acted intending to obtain a business advantage FOR KELBROOK, so the FAILURE TO PREVENT BRIBERY offence is engaged. Board ignorance is NOT a defence." },
            { label: "Test the adequate procedures defence", detail: "It FAILS. A policy sitting in a handbook for six years with NO TRAINING, NO RISK ASSESSMENT and NO MONITORING is not adequate procedures — the guidance expects proportionate procedures, top-level commitment, risk assessment, due diligence, communication and monitoring. Kelbrook has one of six." },
            { label: "Classify the invoice routing", detail: "Helping a customer understate taxable profits is CRIMINAL FACILITATION OF TAX EVASION by an associated person of a RELEVANT BODY. Kelbrook faces the corporate failure-to-prevent offence, with the same structure and the same problem — its defence would be REASONABLE PREVENTION PROCEDURES, which it does not have." },
            { label: "Identify who else is exposed", detail: "The AGENT and the EMPLOYEE are personally liable for the underlying offences. The DIRECTORS may be exposed under s.174 for failing to maintain a control environment (chapter 38), and persistent failures could ground DISQUALIFICATION (chapter 37)." },
            { label: "Advise on remediation", detail: "Build real procedures: board-level commitment, a documented RISK ASSESSMENT by country and sector, DUE DILIGENCE on agents and intermediaries, TRAINING and communication, and MONITORING AND REVIEW — and self-reporting should be considered." },
          ],
          result:
            "Kelbrook faces **both** failure-to-prevent offences and **unlimited fines** on each, and its handbook policy is **not** a defence to either. The lesson the chapter is built around is that these offences are about the **organisation's systems**, not the board's knowledge.",
        },
      ],
      check: {
        q: "What is a \"relevant body\" for the offence of failing to prevent the facilitation of tax evasion?",
        options: [
          "Any person, including an individual",
          "A body corporate or a partnership — not an individual",
          "Only a company listed on a regulated market",
          "Only a company with a UK tax liability",
        ],
        correct: 1,
        explain:
          "A BODY CORPORATE OR A PARTNERSHIP, and NOT an individual. The offence attaches to the ORGANISATION for failing to prevent an associated person's criminal facilitation; the individual facilitator is prosecuted under the ordinary law instead.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating board ignorance as a defence to the corporate offences.",
      fix: "Neither offence needs fault by the board. The defence is adequate or reasonable PROCEDURES.",
    },
    {
      trap: "Assuming a small facilitation payment is exempt.",
      fix: "There is no de minimis. A payment to secure a routine service can be bribery.",
    },
    {
      trap: "Accepting a written policy as adequate procedures.",
      fix: "It must be proportionate, risk-assessed, communicated through training, and monitored.",
    },
    {
      trap: "Applying the tax evasion offence to an individual.",
      fix: "A relevant body is a body corporate or a partnership only.",
    },
    {
      trap: "Treating hospitality as automatically unlawful.",
      fix: "It is a bribe only where intended to induce improper performance; proportionality and transparency matter.",
    },
  ],
  keyTerms: [
    { term: "Active bribery", def: "Offering, promising or giving an advantage to induce or reward improper performance." },
    { term: "Passive bribery", def: "Requesting, agreeing to receive or accepting such an advantage." },
    { term: "Associated person", def: "A person who performs services for an organisation — employee, agent or subsidiary." },
    { term: "Adequate procedures", def: "The defence to failing to prevent bribery: proportionate, risk-assessed, communicated and monitored measures." },
    { term: "Relevant body", def: "A body corporate or partnership, the entity liable for failing to prevent the facilitation of tax evasion." },
    { term: "Facilitation payment", def: "A small payment to secure a routine service; not exempt and capable of being bribery." },
  ],
  summary: [
    "The Bribery Act creates active and passive bribery, bribing a foreign public official, and the corporate failure-to-prevent offence.",
    "The corporate offence needs no fault by the board; the defence is adequate procedures.",
    "Failing to prevent the facilitation of tax evasion works the same way, with reasonable prevention procedures as the defence.",
    "A relevant body is a body corporate or partnership, never an individual.",
    "Facilitation payments are not exempt, and hospitality becomes a bribe where it is intended to induce improper performance.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the four bribery offences.", a: "Bribing another person, being bribed, bribing a foreign public official, and a commercial organisation's failure to prevent bribery by an associated person." },
    { q: "What is the defence to the corporate bribery offence, and what does it require?", a: "Adequate procedures — proportionate measures, top-level commitment, risk assessment, due diligence, communication and training, and monitoring and review." },
    { q: "Who is liable for failing to prevent the facilitation of tax evasion?", a: "A relevant body, meaning a body corporate or a partnership, where an associated person criminally facilitates another's tax evasion." },
    { q: "Are small facilitation payments permitted?", a: "No. There is no de minimis, and paying to secure a routine service can amount to bribery." },
  ],
}

/* ── Chapter 46 · H1(h) ────────────────────────────────────────── */

export const LWE_TREE_46: StudyChapter = {
  id: "LWE-46",
  number: 46,
  paper: "LW",
  area: "H",
  title: "Fraudulent and wrongful trading",
  minutes: 17,
  syllabusRefs: ["H1(h)"],
  intro:
    "Two provisions that reach directors personally when a company fails. One needs dishonesty and is rarely proved; the other needs none at all, which is exactly why it is the claim that actually bites.",
  outcomes: [
    "Define fraudulent trading and state what must be proved",
    "Define wrongful trading and state its objective test",
    "Distinguish the two, and identify the defence to wrongful trading",
    "Explain who may bring each claim and what the court may order",
    "Advise directors of a company in financial difficulty",
  ],
  sections: [
    {
      id: "the-two",
      heading: "The two provisions, held apart",
      blocks: [
        {
          kind: "table",
          caption: "Fraudulent and wrongful trading compared",
          head: ["", "Fraudulent trading", "Wrongful trading"],
          rows: [
            ["**Provision**", "**s.213 IA 1986** (civil), with a parallel criminal offence under the Companies Act", "**s.214 IA 1986**"],
            ["**Test**", "Carrying on business with **intent to defraud** creditors, or for any fraudulent purpose — **dishonesty required**", "Continuing to trade when the director **knew or ought to have concluded** there was **no reasonable prospect** of avoiding insolvent liquidation — **no dishonesty required**"],
            ["**Nature of the test**", "**Subjective** — actual dishonest intent", "**Objective**, raised by the director's own knowledge and skill, exactly as under s.174 (chapter 38)"],
            ["**Who can be liable**", "**Any person** knowingly party to the carrying on of the business that way — including a bank or a creditor, not just directors", "**Directors only**, including **de facto and shadow** directors (chapter 37)"],
            ["**Requires insolvent liquidation?**", "**No** for the criminal offence; the civil claim arises in a winding up", "**Yes** — the company must have gone into **insolvent liquidation**"],
            ["**Defence**", "**Honesty** — absence of intent to defraud", "Taking **every step** to minimise the potential loss to creditors once the conclusion was or should have been reached"],
            ["**Consequence**", "**Contribution** to the assets as the court thinks proper, plus criminal penalties and disqualification", "**Contribution** to the assets, plus disqualification"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Wrongful trading is the claim that succeeds",
          md: "Fraudulent trading requires **dishonesty**, and dishonesty is hard to prove — a director who kept trading out of genuine, even foolish, optimism is **not** dishonest, so the claim fails. **Wrongful trading** was created precisely to close that gap: it asks **objectively** whether the director **ought to have concluded** there was no reasonable prospect, so honest optimism is **no answer**. That is why a scenario stressing the directors' sincerity is pointing at **s.214**, and why a claim under s.213 is usually the wrong one to plead.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The wrongful trading defence is demanding — and it is not \"we tried\"",
          md: "Once the point is reached at which a director knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation, the defence requires that they took **every step** with a view to **minimising the potential loss to creditors** — judged by the same objective standard. Continuing to trade in the hope of trading out is the **opposite** of that. What helps: taking **insolvency advice** promptly, **documenting** the board's reasoning, ceasing to **incur new credit**, and **acting on the advice** rather than filing it. A single conversation with an adviser followed by nine more months of trading will not do.",
        },
        {
          kind: "list",
          title: "Procedure and reach",
          items: [
            "The **liquidator** brings the wrongful trading claim; an **administrator** may also do so.",
            "The court orders a **contribution to the company's assets** as it thinks proper — which is **compensatory**, measured broadly by the increase in the deficiency caused by the continued trading, rather than punitive.",
            "The recovery goes into the **general estate** for the benefit of creditors as a whole, so it is distributed under the waterfall (chapter 41).",
            "**Disqualification** commonly follows, for up to fifteen years (chapter 37).",
            "**Fraudulent trading** is also a **criminal offence**, and does not require the company to be in liquidation for the criminal charge.",
            "Both are **statutory** routes through the veil of incorporation (chapter 31) — no piercing at common law is needed.",
          ],
        },
        {
          kind: "example",
          title: "Advising directors of a failing company",
          scenario:
            "Wrenshall Ltd's board sees management accounts in January showing net liabilities of £400,000 and no realistic prospect of new funding. The directors genuinely believe a large contract will rescue the company. They take no advice, continue trading for nine months, take a further £520,000 of credit from suppliers who are not told of the position, and pay off a £70,000 loan owed to one director's spouse. The contract never materialises and Wrenshall enters insolvent liquidation in October with a deficiency of £950,000. One director, Ashcroft, is a chartered accountant. Another, Bewley, urged the board in February to take insolvency advice, and resigned in March when it refused.",
          steps: [
            { label: "Test fraudulent trading", detail: "It needs DISHONESTY — an intent to defraud. The directors GENUINELY BELIEVED the contract would rescue the company, so however unrealistic that was, s.213 is very unlikely to be made out. Their honesty defeats this claim." },
            { label: "Test wrongful trading", detail: "The test is OBJECTIVE. In JANUARY they had accounts showing net liabilities of £400,000 and no prospect of funding, so they OUGHT TO HAVE CONCLUDED there was no reasonable prospect of avoiding insolvent liquidation. Trading on for nine months while taking £520,000 of new credit is the classic s.214 pattern. Honest optimism is no defence." },
            { label: "Test the defence", detail: "It FAILS. They took NO ADVICE, told suppliers NOTHING, and INCREASED the credit exposure — the opposite of taking EVERY STEP to minimise loss to creditors. The court would likely measure the contribution by reference to the increase in the deficiency from January onwards." },
            { label: "Assess Ashcroft specifically", detail: "As a CHARTERED ACCOUNTANT his own knowledge and skill RAISE the objective standard, exactly as under s.174. He should have read the January accounts and drawn the conclusion sooner and more clearly than a lay director, so his exposure is greater, not less." },
            { label: "Assess Bewley", detail: "He URGED advice in February and RESIGNED in March. He has a strong case that he took what steps were open to him, and his exposure is limited to the period while he was a director. His documented dissent is exactly the evidence the defence needs." },
            { label: "Deal with the £70,000 repayment", detail: "Paying off a loan owed to a director's SPOUSE while suppliers went unpaid is a PREFERENCE, which the liquidator may apply to have SET ASIDE, bringing the £70,000 back into the estate (chapter 41)." },
            { label: "State what the directors should have done", detail: "In JANUARY: take insolvency advice immediately, DOCUMENT the board's reasoning, stop incurring new credit, and if there was no reasonable prospect, place the company into ADMINISTRATION (chapter 42) or liquidation. Administration's moratorium was the route to preserving value if the contract was genuinely in prospect." },
          ],
          result:
            "**No fraudulent trading** — their honesty defeats it — but a strong **wrongful trading** claim, with **Ashcroft most exposed** because his qualification raises the standard and **Bewley least** because he dissented and left. The **£70,000 preference** comes back into the estate, and disqualification is likely for those who stayed.",
        },
      ],
      check: {
        q: "Directors honestly but unreasonably believe a failing company will recover, and keep trading. Which claim is likely to succeed?",
        options: [
          "Fraudulent trading, since the belief was unreasonable",
          "Wrongful trading — it applies an objective test and needs no dishonesty, so honest optimism is no defence",
          "Neither, because they acted in good faith",
          "Both equally",
        ],
        correct: 1,
        explain:
          "WRONGFUL TRADING. It asks OBJECTIVELY whether the directors knew or OUGHT TO HAVE CONCLUDED there was no reasonable prospect of avoiding insolvent liquidation, so honest optimism is no defence. FRAUDULENT trading needs DISHONESTY, which genuine belief negates — which is precisely why s.214 exists.",
      },
    },
    {
      id: "pulling-together",
      heading: "How the paper fits together",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "One set of facts, four areas — which is how Section B is built",
          md: "This is the last chapter of the tree, so it is worth seeing the connections the examiner exploits. Take a **negligent audit** that overstates profits (chapter 22, Area B). The company pays a dividend it could not lawfully pay, so there is an **unlawful distribution**: members who knew must repay under s.847 and the directors are liable (chapter 36, Area E). Those directors have breached their duty of **care, skill and diligence** under s.174 (chapter 38, Area F). The company drifts towards insolvency and they keep trading, so **wrongful trading** follows (this chapter, Area H), along with **disqualification** (chapter 37). If they repaid a connected loan on the way down, that is a **preference** the liquidator sets aside (chapter 41, Area G). **One negligent audit, five chapters, four syllabus areas** — so when a Section B scenario looks sprawling, look for the thread.",
        },
        {
          kind: "list",
          title: "The practical advice to a director in difficulty",
          items: [
            "**Get the numbers**, and look at them honestly — the objective test starts from what the accounts showed.",
            "**Take insolvency advice early**, and take it in writing.",
            "**Document the board's reasoning** at each meeting, since the defence depends on showing what steps were taken and why.",
            "**Stop incurring new credit** once the conclusion has been or should have been reached, and do not conceal the position from suppliers.",
            "**Do not prefer connected creditors** — repaying a director's or a spouse's loan is the transaction a liquidator looks for first.",
            "**Consider administration**, whose moratorium may preserve value where liquidation would destroy it (chapter 42).",
            "**Dissent and resign if the board will not act** — and record the dissent, which is what protected Bewley in the example above.",
          ],
        },
      ],
      check: {
        q: "Once directors ought to have concluded there is no reasonable prospect of avoiding insolvent liquidation, what does the wrongful trading defence require?",
        options: [
          "That they acted honestly and in good faith",
          "That they took every step with a view to minimising the potential loss to creditors",
          "That they obtained a single item of professional advice",
          "That the company later returned to profit",
        ],
        correct: 1,
        explain:
          "That they took EVERY STEP with a view to MINIMISING THE POTENTIAL LOSS TO CREDITORS, judged objectively. Honesty is the defence to FRAUDULENT trading, not to wrongful trading, and one conversation with an adviser followed by continued trading is not taking every step.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Pleading fraudulent trading where the directors were merely optimistic.",
      fix: "It needs DISHONESTY. Honest optimism defeats it — use wrongful trading, which is objective.",
    },
    {
      trap: "Using honesty as a defence to wrongful trading.",
      fix: "The defence is taking EVERY STEP to minimise loss to creditors, not good faith.",
    },
    {
      trap: "Limiting wrongful trading to properly appointed directors.",
      fix: "De facto and shadow directors are caught.",
    },
    {
      trap: "Restricting fraudulent trading to directors.",
      fix: "ANY person knowingly party to carrying on the business that way is liable, including a creditor or bank.",
    },
    {
      trap: "Treating the contribution as a penalty.",
      fix: "It is compensatory, measured broadly by the increase in the deficiency, and goes into the general estate.",
    },
  ],
  keyTerms: [
    { term: "Fraudulent trading", def: "Carrying on business with intent to defraud creditors or for a fraudulent purpose; requires dishonesty and is civil and criminal." },
    { term: "Wrongful trading", def: "Continuing to trade when a director knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation." },
    { term: "Every step defence", def: "The wrongful trading defence of having taken every step to minimise the potential loss to creditors." },
    { term: "Contribution", def: "The compensatory payment a director may be ordered to make to the company's assets." },
    { term: "Preference", def: "A transaction improving a creditor's position before insolvency, which the court may set aside." },
  ],
  summary: [
    "Fraudulent trading needs dishonesty and can be committed by any person knowingly party to it.",
    "Wrongful trading applies an objective test to directors, including de facto and shadow directors, and needs no dishonesty.",
    "Honest optimism defeats fraudulent trading but is no defence to wrongful trading.",
    "The wrongful trading defence is having taken every step to minimise the potential loss to creditors.",
    "Both are statutory routes past the veil, and the contribution is compensatory and goes into the general estate.",
  ],
  knowledgeDiagnostic: [
    { q: "State the wrongful trading test.", a: "Whether the director knew or ought to have concluded that there was no reasonable prospect of the company avoiding insolvent liquidation, judged objectively and raised by their own knowledge and skill." },
    { q: "Why is wrongful trading the claim that succeeds?", a: "Because it needs no dishonesty, so a director's honest but unreasonable optimism is no defence — whereas fraudulent trading requires dishonesty, which genuine belief negates." },
    { q: "Who can be liable for fraudulent trading?", a: "Any person knowingly party to carrying on the business with intent to defraud, including creditors and banks, not just directors." },
    { q: "What should a director in difficulty do?", a: "Get the numbers, take written insolvency advice early, document the board's reasoning, stop incurring new credit, avoid preferring connected creditors, consider administration, and record any dissent." },
  ],
}

export const LWE_TREE_AREA_H_PART2: StudyChapter[] = [LWE_TREE_45, LWE_TREE_46]
