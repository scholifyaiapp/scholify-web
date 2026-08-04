import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area H, first part — insider dealing, market abuse and money laundering.
 * Chapters 43–44 of the LW-ENG reading tree, mapped to syllabus group H1(a)–(c).
 *
 * Forked from the Global tree and specialised to the English statutes: the Criminal
 * Justice Act 1993 for insider dealing, the market abuse regime, and the Proceeds of
 * Crime Act 2002 with the Money Laundering Regulations. H1(c) explicitly lists FIVE
 * policies, procedures and controls — risk management, internal controls, customer due
 * diligence, reliance and record keeping, and monitoring and internal communication —
 * so chapter 44 is built around that list rather than around a general description.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 43 · H1(a), H1(b) ─────────────────────────────────── */

export const LWE_TREE_43: StudyChapter = {
  id: "LWE-43",
  number: 43,
  paper: "LW",
  area: "H",
  title: "Insider dealing and market abuse",
  minutes: 17,
  syllabusRefs: ["H1(a)", "H1(b)"],
  intro:
    "Insider dealing is a crime with tightly defined elements and three real defences; market abuse is a wider civil regime that catches conduct the criminal offence misses. Knowing which one a scenario is about is half the answer.",
  outcomes: [
    "Define inside information and identify the four elements it requires",
    "Distinguish the three insider dealing offences",
    "Identify who is an insider, primary and secondary",
    "State the defences to insider dealing",
    "Distinguish the market abuse regime from the criminal offence",
  ],
  sections: [
    {
      id: "insider-dealing",
      heading: "The criminal offence",
      blocks: [
        {
          kind: "definition",
          term: "Inside information",
          md: "On the **s.56** definition, information which is **specific or precise**, **has not been made public**, relates to **particular securities or a particular issuer** rather than to securities generally, and which, **\"if made public would be likely to have a significant effect on the price\"** of those securities. **All four** elements are needed, so failing any one of them defeats the charge.",
        },
        {
          kind: "table",
          caption: "The three offences",
          head: ["Offence", "What it involves"],
          rows: [
            ["**Dealing** — s.52", "Acquiring or disposing of **price-affected securities** while in possession of inside information **as an insider**"],
            ["**Encouraging**", "**Encouraging another** to deal in price-affected securities, knowing or having reasonable cause to believe the dealing would take place"],
            ["**Disclosing**", "**Disclosing** inside information to another otherwise than in the proper performance of one's employment, office or profession"],
          ],
        },
        {
          kind: "table",
          caption: "Who is an insider",
          head: ["Category", "How they got the information"],
          rows: [
            ["**Primary insider** — s.57", "Through being a **director, employee or shareholder** of an issuer of securities, or through their **employment, office or profession**"],
            ["**Secondary insider**", "**Directly or indirectly from** a primary insider, where they know it is inside information from an inside source"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "You have to know it is inside information",
          md: "The offence requires the person to **know** both that the information is inside information and that it came from an inside source. So someone who overhears a fragment in a lift and has no idea of its character is not caught — but a person who is told something in confidence by a director, and understands what it is, **is**, even though they have no connection with the company at all. That is the whole point of the **secondary** insider category, and scenarios use a friend, spouse or adviser to test it.",
        },
        {
          kind: "list",
          title: "The three defences",
          items: [
            "**No expectation of profit** (s.53). The person did not expect the dealing to result in a profit, or the avoidance of a loss, attributable to the price-sensitive nature of the information.",
            "**Belief in wide disclosure** (s.53). They believed on reasonable grounds that the information had been disclosed widely enough that no participant would be prejudiced by not having it.",
            "**Would have acted anyway.** They would have done what they did even if they had not had the information — which covers, for instance, a forced sale to meet an unrelated obligation.",
            "There are also **special defences** for **market makers** acting in good faith in the course of their business, and in relation to **market information** and **price stabilisation**.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Penalties, and what is NOT a defence",
          md: "The offence is triable either way, carrying a **fine and up to seven years' imprisonment** on conviction on indictment. What does **not** help: that the deal was **small**; that the information turned out to be **wrong**; that the person **made no profit** in the event, since the test is expectation not outcome; or that they **passed the information on** rather than dealing themselves, which is the **disclosing** offence. And note that a contract is **not void or unenforceable** merely because it was entered into on the strength of inside information — the sanction is criminal.",
        },
      ],
      check: {
        q: "A director tells a friend, in confidence, that a takeover bid is imminent. The friend, understanding what he has been told, buys shares. Who is liable?",
        options: [
          "Only the director, since the friend has no connection with the company",
          "Both — the director for disclosing, and the friend as a secondary insider for dealing",
          "Only the friend, having actually dealt",
          "Neither, since the information came from a private conversation",
        ],
        correct: 1,
        explain:
          "BOTH. The director commits the DISCLOSING offence by passing inside information otherwise than in the proper performance of his office. The friend is a SECONDARY INSIDER — he received it from an inside source and KNEW its character — so his purchase is the DEALING offence. Having no connection with the company is irrelevant.",
      },
    },
    {
      id: "market-abuse",
      heading: "The market abuse regime",
      blocks: [
        {
          kind: "definition",
          term: "Market abuse",
          md: "A **civil**, regulatory regime prohibiting behaviour that damages the integrity of the market. It is enforced by the regulator rather than prosecuted, and its **standard of proof is the civil one**, so it reaches conduct that could not be proved to the criminal standard.",
        },
        {
          kind: "table",
          caption: "The forms of market abuse",
          head: ["Form", "What it covers"],
          rows: [
            ["**Insider dealing**", "Dealing, or attempting to deal, on inside information — overlapping with the criminal offence"],
            ["**Unlawful disclosure**", "Disclosing inside information outside the normal exercise of employment, profession or duties"],
            ["**Market manipulation**", "Transactions or orders giving **false or misleading signals** as to supply, demand or price, or securing the price at an abnormal or artificial level"],
            ["**Dissemination of false information**", "Giving out information likely to give a **false or misleading impression** about an investment"],
            ["**Misleading behaviour and distortion** — s.118", "Behaviour **likely to give a regular user a false or misleading impression**, or to distort the market"],
          ],
        },
        {
          kind: "table",
          caption: "The criminal offence and the civil regime compared",
          head: ["", "Insider dealing (criminal)", "Market abuse (civil)"],
          rows: [
            ["**Nature**", "**Criminal offence**, prosecuted", "**Civil/regulatory**, enforced by the regulator"],
            ["**Standard of proof**", "**Beyond reasonable doubt**", "**Balance of probabilities**"],
            ["**Mental element**", "**Knowledge** required", "Conduct-based, so **intention need not be shown** for all forms"],
            ["**Sanctions**", "**Fine and up to 7 years' imprisonment**", "**Unlimited financial penalty**, public censure, restitution orders, injunctions, and withdrawal of approval"],
            ["**Scope**", "Narrower — defined offences and defences", "**Wider** — catches manipulation and misleading behaviour the criminal offence does not"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The regimes overlap, and one set of facts can trigger both",
          md: "They are not alternatives. The same dealing may be **prosecuted** as insider dealing **and** pursued as **market abuse** — and where the criminal case is not provable to the criminal standard, the civil regime may still bite on the **balance of probabilities**. Equally, **manipulation** and **misleading behaviour** are market abuse but are **not** the insider dealing offence at all. So the correct answer to a market-conduct scenario usually addresses **both** regimes and says which sanctions follow from each.",
        },
        {
          kind: "example",
          title: "Sorting the conduct",
          scenario:
            "Halvard plc is about to announce a large contract loss. Four things happen. (a) Merrick, its finance director, sells 20,000 of his shares two days before the announcement. (b) He tells his sister, explaining that the announcement will be bad; she sells her holding. (c) Nayland, a trader with no connection to Halvard, places a series of large buy orders he intends to cancel before execution, to create the appearance of demand and lift the price. (d) Ockley, a Halvard employee, sells shares in the same period, but only because he had exchanged contracts on a house and needed the money; he had not seen the contract-loss papers and knew nothing about them.",
          steps: [
            { label: "Merrick's sale", detail: "He is a PRIMARY INSIDER — a director — and the contract loss is specific, unpublished, issuer-related and price-significant, so it is INSIDE INFORMATION. Selling is the DEALING offence, and the sale is also MARKET ABUSE. He faces prosecution and regulatory penalties." },
            { label: "Telling his sister", detail: "Passing the information otherwise than in the proper performance of his office is the DISCLOSING offence, and UNLAWFUL DISCLOSURE as market abuse. His sister is a SECONDARY INSIDER who knew the character of what she was told, so her sale is the DEALING offence too." },
            { label: "Nayland's orders", detail: "He has no inside information, so NO insider dealing offence. But placing orders he intends to cancel in order to give FALSE OR MISLEADING SIGNALS as to demand and to move the price is MARKET MANIPULATION — squarely market abuse, and exposed to an unlimited financial penalty." },
            { label: "Ockley's sale", detail: "He was an employee but had NO inside information at all — he had not seen the papers and knew nothing. So no offence: possession of inside information is an element. Even had he known, the defence that he WOULD HAVE ACTED ANYWAY, needing the money for a house purchase, would be available." },
            { label: "Note the two regimes together", detail: "Merrick and his sister are exposed under BOTH regimes; Nayland only under the CIVIL one; Ockley under neither. And even if Merrick's prosecution failed on the criminal standard, market abuse could still be established on the BALANCE OF PROBABILITIES." },
          ],
          result:
            "Two criminal offenders, one market abuser who committed no offence, and one innocent seller. The organising insight is that **market abuse is wider but civil**, while **insider dealing is narrower but criminal** — and Ockley shows that an insider who simply **does not have** the information commits nothing.",
        },
      ],
      check: {
        q: "A trader with no inside information places large orders he intends to cancel, to create a false impression of demand. What has he done?",
        options: [
          "Committed the criminal offence of insider dealing",
          "Committed market abuse by manipulation — no inside information is needed for that form",
          "Nothing unlawful, since the orders were never executed",
          "Committed the disclosing offence",
        ],
        correct: 1,
        explain:
          "MARKET ABUSE by MANIPULATION. Giving false or misleading signals as to supply, demand or price is market abuse and needs NO inside information — which is exactly why the civil regime is wider than the criminal offence. Insider dealing requires possession of inside information, which he lacks.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a person with no company connection as incapable of insider dealing.",
      fix: "A SECONDARY insider who receives information from an inside source and knows its character is caught.",
    },
    {
      trap: "Requiring an actual profit.",
      fix: "The test is EXPECTATION of profit or avoidance of loss, not outcome.",
    },
    {
      trap: "Analysing only the criminal offence in a market-conduct scenario.",
      fix: "Address market abuse too — it is wider, civil, and provable on the balance of probabilities.",
    },
    {
      trap: "Saying a contract made on inside information is void.",
      fix: "It is not. The sanctions are criminal and regulatory.",
    },
    {
      trap: "Finding insider dealing where the person had no inside information.",
      fix: "Possession is an element. Without it there is no offence, whatever their position.",
    },
  ],
  keyTerms: [
    { term: "Inside information", def: "Information that is specific or precise, not made public, issuer or security specific, and likely to have a significant price effect if published." },
    { term: "Primary insider", def: "s.57 — a person with inside information through being a director, employee or shareholder of an issuer, or through their employment, office or profession." },
    { term: "Secondary insider", def: "A person who received inside information directly or indirectly from an inside source, knowing its character." },
    { term: "Dealing offence", def: "s.52 — acquiring or disposing of price-affected securities while in possession of inside information as an insider." },
    { term: "Market abuse", def: "A civil regime prohibiting insider dealing, unlawful disclosure, manipulation, false dissemination and misleading behaviour." },
    { term: "Market manipulation", def: "Transactions or orders giving false or misleading signals as to supply, demand or price, or securing an artificial price." },
  ],
  summary: [
    "Inside information must be specific, unpublished, issuer-specific and price-significant — all four.",
    "The three offences are dealing, encouraging and disclosing, and secondary insiders are caught if they know the source.",
    "The defences are no expectation of profit, reasonable belief in wide disclosure, and that the person would have acted anyway.",
    "Market abuse is civil, proved on the balance of probabilities, and wider — reaching manipulation and misleading behaviour.",
    "One set of facts can attract both regimes, and a failed prosecution does not prevent civil enforcement.",
  ],
  knowledgeDiagnostic: [
    { q: "State the four elements of inside information.", a: "Specific or precise, not made public, relating to particular securities or an issuer, and likely to have a significant effect on price if made public." },
    { q: "Name the three insider dealing offences.", a: "Dealing, encouraging another to deal, and disclosing inside information otherwise than in the proper performance of employment, office or profession." },
    { q: "State the three general defences.", a: "No expectation of profit or avoidance of loss from the price-sensitive nature of the information; reasonable belief that it had been widely enough disclosed; and that the person would have acted the same way anyway." },
    { q: "Give two ways market abuse is wider than the criminal offence.", a: "It is proved on the balance of probabilities rather than beyond reasonable doubt, and it catches manipulation and misleading behaviour that require no inside information." },
  ],
}

/* ── Chapter 44 · H1(c) ────────────────────────────────────────── */

export const LWE_TREE_44: StudyChapter = {
  id: "LWE-44",
  number: 44,
  paper: "LW",
  area: "H",
  title: "Money laundering",
  minutes: 17,
  syllabusRefs: ["H1(c)"],
  intro:
    "Money laundering law reaches accountants harder than almost any other rule in this paper, because it turns ordinary professional silence into a criminal offence — and the reporting duty overrides the duty of confidentiality.",
  outcomes: [
    "Explain the three stages of money laundering",
    "State the principal offences, including failure to disclose and tipping off",
    "Explain the five policies, procedures and controls the syllabus lists",
    "Explain customer due diligence and when enhanced diligence is required",
    "Advise a professional who suspects a client of money laundering",
  ],
  sections: [
    {
      id: "offences",
      heading: "The stages, and the offences",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The three stages",
            caption: "The aim throughout is to break the link between the money and the crime.",
            data: {
              steps: [
                { label: "Placement", sub: "Criminal cash enters the financial system" },
                { label: "Layering", sub: "Complex transfers obscure the audit trail" },
                { label: "Integration", sub: "The funds re-emerge as apparently legitimate wealth" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The principal offences",
          head: ["Offence", "What it covers"],
          rows: [
            ["**Concealing**", "Concealing, disguising, converting, transferring or removing **criminal property** from the jurisdiction"],
            ["**Arranging**", "Entering into or becoming concerned in an arrangement one knows or suspects **facilitates** the acquisition, retention, use or control of criminal property by or for another"],
            ["**Acquisition, use or possession**", "Acquiring, using or possessing criminal property"],
            ["**Failure to disclose**", "Failing to report where a person in the **regulated sector** knows or suspects, **or has reasonable grounds to know or suspect**, money laundering — an **objective** test"],
            ["**Tipping off**", "Disclosing that a report has been made, or that an investigation is contemplated or being carried out, where that is **likely to prejudice** it"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "\"Reasonable grounds to suspect\" is what catches professionals",
          md: "The failure-to-disclose offence in the **regulated sector** is not limited to actual suspicion: it is enough that there were **reasonable grounds** to know or suspect. That makes it an **objective** test, so an accountant who did not think about it, or who preferred not to ask, is **still liable**. This is why the sector's training and monitoring obligations exist, and why \"I never suspected anything\" is not an answer where the facts should have prompted suspicion.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Reporting overrides confidentiality — and there is no de minimis",
          md: "Two points that decide scenarios. A **required or protected disclosure** to the firm's nominated officer or to the authorities is **not** a breach of the duty of confidentiality, and legal professional privilege aside, the professional duty of confidence is **no defence** to failing to report. And there is **no minimum amount**: money laundering has **no de minimis threshold**, so a small sum of criminal property is as much criminal property as a large one. Telling the client you have reported them is **tipping off** — a separate offence.",
        },
      ],
      check: {
        q: "An accountant does not actually suspect a client, but the facts plainly should have prompted suspicion, and she reports nothing. Is she liable?",
        options: [
          "No, because she had no actual suspicion",
          "Yes — in the regulated sector it is enough that there were reasonable grounds to know or suspect, which is an objective test",
          "No, because her duty of confidentiality prevents disclosure",
          "Only if the sums involved were substantial",
        ],
        correct: 1,
        explain:
          "YES. In the REGULATED SECTOR the failure-to-disclose offence is satisfied by REASONABLE GROUNDS to know or suspect — an OBJECTIVE test — so not having thought about it is no defence. Confidentiality does not prevent a protected disclosure, and there is NO DE MINIMIS threshold.",
      },
    },
    {
      id: "controls",
      heading: "The policies, procedures and controls",
      blocks: [
        {
          kind: "table",
          caption: "The five the syllabus names",
          head: ["Control", "What it requires"],
          rows: [
            ["**Risk management practices**", "Assess the firm's exposure by **client, product, delivery channel and geography**, document the assessment, and apply resources according to risk"],
            ["**Internal controls**", "Appoint a **nominated officer (MLRO)** to receive internal reports, screen employees, and put reporting lines and escalation in place"],
            ["**Customer due diligence**", "**Identify and verify** the client, identify any **beneficial owner**, and understand the **purpose and intended nature** of the relationship — see below"],
            ["**Reliance and record keeping**", "Records of identification and of transactions must be kept for the prescribed period, normally **five years**. A firm may in limited circumstances **rely** on another regulated person's diligence, but it **remains responsible** for compliance"],
            ["**Monitoring, management of compliance and internal communication**", "**Ongoing monitoring** of the relationship and of transactions for consistency with what is known of the client, independent audit of the systems where the firm's size warrants it, and **training and communication** so staff know the policies and how to report"],
          ],
        },
        {
          kind: "table",
          caption: "Customer due diligence",
          head: ["Level", "When it applies, and what it means"],
          rows: [
            ["**Standard**", "The default: identify and verify the client and any beneficial owner, and understand the purpose of the relationship. Required on **establishing a relationship**, on an **occasional transaction** above the threshold, on **suspicion**, and where **doubts arise** about documents previously obtained"],
            ["**Simplified**", "Where the risk is demonstrably **low** — the identification obligation remains, but the extent of verification may be reduced"],
            ["**Enhanced**", "Required where the risk is **high**: a **politically exposed person** and their family or close associates, a **high-risk third country**, a **non-face-to-face** relationship, or any unusual or complex transaction with no apparent economic purpose. Involves additional information, additional verification, and **senior management approval**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "If due diligence cannot be completed, do not proceed",
          md: "The rule is blunt and examinable: where the required customer due diligence **cannot be completed**, the firm must **not** carry out the transaction or establish the relationship, must **terminate** any existing one, and must **consider whether to report**. So the answer to \"the client will not provide identification\" is never to proceed anyway on the strength of a long relationship — it is to stop, and to think about a disclosure.",
        },
        {
          kind: "example",
          title: "Advising a firm that suspects a client",
          scenario:
            "Trensham & Co acts for Wilbury Ltd. Its audit team notices that Wilbury has received eleven payments of £8,000 each from an offshore company in a high-risk jurisdiction, all within a month, described as \"consultancy\", with no supporting documents and no apparent commercial purpose. Wilbury's majority shareholder turns out to be a senior foreign government official. When asked, Wilbury's finance director says the paperwork is confidential and refuses to provide it, and warns that Trensham is bound by its duty of confidentiality. The engagement partner is minded to say nothing to avoid losing the client, and to mention the concern to the finance director.",
          steps: [
            { label: "Identify the risk indicators", detail: "STRUCTURED payments just under a round figure, a HIGH-RISK JURISDICTION, no supporting documentation, no apparent ECONOMIC PURPOSE, and a beneficial owner who is a POLITICALLY EXPOSED PERSON. Every one of these is a recognised indicator." },
            { label: "Fix the level of due diligence", detail: "ENHANCED due diligence is REQUIRED — both because of the PEP connection and because of the high-risk jurisdiction and the unusual, unexplained transactions. That means additional information, additional verification and SENIOR MANAGEMENT APPROVAL of the relationship." },
            { label: "Deal with the refusal to co-operate", detail: "Enhanced diligence CANNOT BE COMPLETED. So Trensham must NOT continue the transaction or the relationship, must consider TERMINATING the engagement, and must CONSIDER REPORTING. Proceeding on the strength of a long relationship is not an option." },
            { label: "Deal with the confidentiality argument", detail: "It fails. A PROTECTED DISCLOSURE is not a breach of confidentiality, and the professional duty of confidence is NO DEFENCE to the failure-to-disclose offence. The finance director's warning is simply wrong." },
            { label: "Advise on the partner's two proposals", detail: "Saying NOTHING is the FAILURE TO DISCLOSE offence — and note the OBJECTIVE test, so it is enough that there were reasonable grounds to suspect, which there plainly are. MENTIONING IT TO THE FINANCE DIRECTOR would be TIPPING OFF, a separate offence, if a report has been made or an investigation is contemplated." },
            { label: "State what must actually happen", detail: "Report internally to the firm's NOMINATED OFFICER (MLRO) promptly, who considers a disclosure to the authorities; complete no further work that would facilitate the arrangement; keep RECORDS for the prescribed period; and say nothing to the client about the report." },
          ],
          result:
            "Both of the partner's instincts are **criminal offences** — silence is **failure to disclose**, and a word to the finance director is **tipping off**. The correct course is an internal report to the **MLRO**, no further facilitation, and **no de minimis comfort** from the payments being only £8,000 each.",
        },
      ],
      check: {
        q: "A client refuses to provide the information needed to complete enhanced due diligence. What must the firm do?",
        options: [
          "Proceed, relying on the length of the existing relationship",
          "Not carry out the transaction or establish the relationship, consider terminating any existing one, and consider making a report",
          "Proceed but keep additional records",
          "Ask the client to confirm in writing that the funds are legitimate, then proceed",
        ],
        correct: 1,
        explain:
          "It must NOT proceed. Where required due diligence CANNOT BE COMPLETED the firm must not carry out the transaction or establish the relationship, must consider TERMINATING any existing relationship, and must CONSIDER REPORTING. A long relationship, extra records or a client's own assurance are no substitute.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Requiring actual suspicion for the failure-to-disclose offence.",
      fix: "In the regulated sector REASONABLE GROUNDS to suspect suffice — an objective test.",
    },
    {
      trap: "Relying on confidentiality as a reason not to report.",
      fix: "A protected disclosure is not a breach of confidence, and confidentiality is no defence.",
    },
    {
      trap: "Warning the client that a report has been made.",
      fix: "That is TIPPING OFF, a separate offence.",
    },
    {
      trap: "Treating small sums as below a threshold.",
      fix: "There is no de minimis in money laundering.",
    },
    {
      trap: "Proceeding where due diligence cannot be completed.",
      fix: "Do not transact, consider terminating, and consider reporting.",
    },
  ],
  keyTerms: [
    { term: "Placement, layering, integration", def: "The three stages by which criminal proceeds enter the system, are obscured, and re-emerge as apparently legitimate." },
    { term: "Criminal property", def: "Property constituting or representing a benefit from criminal conduct, which the person knows or suspects to be such." },
    { term: "Failure to disclose", def: "The regulated-sector offence of not reporting where there are reasonable grounds to know or suspect money laundering." },
    { term: "Tipping off", def: "Disclosing that a report has been made or an investigation is under way, where that is likely to prejudice it." },
    { term: "Nominated officer (MLRO)", def: "The person appointed to receive internal reports and consider disclosure to the authorities." },
    { term: "Customer due diligence", def: "Identifying and verifying the client and any beneficial owner, and understanding the purpose of the relationship." },
    { term: "Politically exposed person", def: "A person entrusted with prominent public functions, and their family and close associates, requiring enhanced due diligence." },
  ],
  summary: [
    "Money laundering proceeds by placement, layering and integration.",
    "The offences are concealing, arranging, acquisition or use, failure to disclose, and tipping off.",
    "The regulated-sector failure-to-disclose offence is objective — reasonable grounds to suspect are enough.",
    "The five controls are risk management, internal controls, customer due diligence, reliance and record keeping, and monitoring with internal communication.",
    "Enhanced due diligence is required for PEPs, high-risk countries and unusual transactions, and where diligence cannot be completed the firm must not proceed.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the five policies, procedures and controls.", a: "Risk management practices, internal controls, customer due diligence, reliance and record keeping, and the monitoring and management of compliance with internal communication of the policies." },
    { q: "Why is the failure-to-disclose offence so demanding for accountants?", a: "Because in the regulated sector it is enough that there were reasonable grounds to know or suspect, making it objective, so not having considered the question is no defence." },
    { q: "When is enhanced due diligence required?", a: "For politically exposed persons and their families and associates, high-risk third countries, non-face-to-face relationships, and unusual or complex transactions with no apparent economic purpose." },
    { q: "What must a firm do if due diligence cannot be completed?", a: "Not carry out the transaction or establish the relationship, consider terminating any existing relationship, and consider making a report." },
    { q: "Does confidentiality justify not reporting?", a: "No. A required or protected disclosure is not a breach of confidentiality, and the duty of confidence is no defence." },
  ],
}

export const LWE_TREE_AREA_H_PART1: StudyChapter[] = [LWE_TREE_43, LWE_TREE_44]
