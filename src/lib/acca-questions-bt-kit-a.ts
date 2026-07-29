import type { AccaQuestion } from "@/lib/acca-content"

/*
 * BT · Area A question kit — exam-standard objective-test questions indexed BY
 * CHAPTER, the way the approved-provider exam kits are organised.
 *
 * Every question here is AUTHORED: an applied stem, four defensible options with
 * distractors that encode a specific misconception, and an explanation that
 * teaches why the wrong answers are wrong. None is a permuted glossary prompt —
 * those live in PaperContent.drills and are never graded (see acca-content.ts).
 *
 * Original Scholify content. No ACCA, Kaplan or BPP question is reproduced.
 */

import { q, multi } from "@/lib/acca-bt-kit-builders"

/* ── Chapter 1 · The business organisation ─────────────────────── */

const CH01: AccaQuestion[] = [
  q("BTK-01-01", "BT-01", "A", "easy", 2,
    "Kalpen works alone as a self-employed electrician. He has no employees and no partners. Applying the standard definition of an organisation, which element is missing?",
    ["Collective goals", "Social arrangement", "Controlled performance", "Nothing is missing — he is an organisation"],
    1,
    "The definition requires a SOCIAL ARRANGEMENT for the controlled performance of collective goals. Working entirely alone, Kalpen has no social arrangement — there are no defined relationships between people to coordinate. He may well have goals and may control his own performance, which is why those options are tempting, but one person cannot satisfy the social element however businesslike the activity looks."),

  q("BTK-01-02", "BT-01", "A", "medium", 2,
    "Havering Ltd's creditors are unpaid after the company ceases trading. The company has no remaining assets. Its two shareholders each paid in full for their shares. What is the creditors' position?",
    [
      "They may pursue the shareholders personally for the full amount outstanding",
      "They may pursue the shareholders up to the value of the shares they hold",
      "They have no claim against the shareholders personally",
      "They may pursue the directors personally, but not the shareholders",
    ],
    2,
    "The company has SEPARATE LEGAL PERSONALITY, so the debts are the company's own, and the shareholders' liability is LIMITED to the amount they agreed to invest. Because they have already paid for their shares in full, there is nothing further to call on and the creditors have no personal claim. Note the third distractor: directors can incur personal liability in specific circumstances such as wrongful trading, but the question gives no such facts, and 'directors are always personally liable' is simply wrong."),

  q("BTK-01-03", "BT-01", "A", "medium", 2,
    "A co-operative has 400 members. One member holds 30% of its capital; the rest is spread among the remaining 399. A resolution is put to a members' meeting. What voting power does the large member have?",
    ["30% of the votes, in proportion to capital", "One vote, the same as every other member", "A veto, because they hold more than 25%", "Two votes, as the capital is weighted in bands"],
    1,
    "A co-operative is democratically controlled on a ONE MEMBER, ONE VOTE basis, so the large member has a single vote like everyone else. That is precisely the feature preventing a wealthy member dominating, and it is the examinable contrast with a company's one-share-one-vote. Options 1 and 4 apply company or weighted-capital thinking to a form built to exclude it."),

  q("BTK-01-04", "BT-01", "A", "easy", 1,
    "Which of the following best describes a non-governmental organisation (NGO)?",
    [
      "A department of central or local government",
      "An organisation independent of government pursuing a social or political aim",
      "Any organisation that does not pay corporation tax",
      "A company limited by shares whose shareholders are charities",
    ],
    1,
    "An NGO is INDEPENDENT OF GOVERNMENT and pursues a social or political aim rather than owner profit. The first option describes the public sector, which is the opposite. Tax status does not define an organisational type, and the fourth option describes a particular ownership structure rather than an NGO."),

  q("BTK-01-05", "BT-01", "A", "hard", 2,
    "A charity's annual report shows income of $4.2m, expenditure of $3.9m and a surplus of $0.3m carried to reserves. A trustee argues this proves the charity is 'operating as a commercial business'. Is the trustee correct?",
    [
      "Yes — generating a surplus is inconsistent with not-for-profit status",
      "No — a not-for-profit organisation may generate a surplus; what it may not do is distribute it to owners",
      "Yes, unless the surplus is below 10% of income",
      "No — a charity's income and expenditure must be equal by law",
    ],
    1,
    "The distinguishing feature of a not-for-profit organisation is that any surplus is REINVESTED IN THE MISSION rather than DISTRIBUTED to owners — not that no surplus arises. A surplus is in fact prudent, providing reserves against future need. 'Not-for-profit organisations never make a profit' is a common misconception, and there is no percentage threshold or legal requirement to break even exactly."),

  q("BTK-01-06", "BT-01", "A", "medium", 2,
    "Three colleagues form a traditional partnership to run a consultancy. Which statement about their position is correct?",
    [
      "The partnership has separate legal personality, so the partners' liability is limited",
      "The partners usually have unlimited liability, and the firm has no separate legal identity from them",
      "Each partner's liability is limited to one third of the firm's debts",
      "The partnership must register with a companies registry before it can trade",
    ],
    1,
    "A TRADITIONAL partnership has no separate legal identity from its partners, who therefore usually carry UNLIMITED liability for the firm's debts. The first option describes a limited liability partnership (LLP), which is a different structure. Liability is not neatly divided by headcount — a creditor may pursue any partner — and a traditional partnership does not require registration in the way a company does."),

  q("BTK-01-07", "BT-01", "A", "easy", 1,
    "A company continues to exist and trade unaffected when one of its shareholders dies and their shares pass to a beneficiary. This feature of the company form is known as:",
    ["Limited liability", "Perpetual succession", "Separation of ownership and control", "Agency"],
    1,
    "PERPETUAL SUCCESSION is a company's ability to continue in existence irrespective of changes in its membership. Limited liability concerns the extent of owners' exposure to debts; separation of ownership and control concerns who runs the business versus who owns it; and agency describes the director-shareholder relationship. All four are features of the company form, which is why precision matters here."),

  multi("BTK-01-08", "BT-01", "A", "medium", 2,
    "Which TWO of the following are advantages that an organisation provides over individuals working separately?",
    [
      "It enables specialisation, so individuals build deeper skill in a narrower activity",
      "It guarantees that every member is equally skilled in every task",
      "It creates synergy, so combined output exceeds the sum of separate outputs",
      "It removes the need for any system of control over performance",
    ],
    [0, 2],
    "SPECIALISATION and SYNERGY are both genuine advantages: concentrating on a limited activity builds skill, and combining people produces more than they would separately. The second option is the opposite of specialisation and is a favourite distractor — the benefit is that members do NOT all need the same skills. The fourth contradicts the definition of an organisation, which requires controlled performance."),

  q("BTK-01-09", "BT-01", "A", "hard", 2,
    "A large listed company appoints professional managers to run the business while ownership is spread across thousands of shareholders. Which consequence does this most directly create?",
    [
      "Perpetual succession, because the company outlives its members",
      "The agency problem, because those taking decisions are not those whose money is at risk",
      "Unlimited liability, because the shareholders cannot supervise the managers",
      "Loss of separate legal personality, because control has passed to non-owners",
    ],
    1,
    "Separating ownership from control creates the AGENCY PROBLEM: directors act as agents for shareholder principals, with better information and different incentives. This is the single most consequential idea in BT because governance, internal control, audit and professional ethics all exist to manage it. Perpetual succession and separate legal personality follow from incorporation rather than from the separation, and limited liability is unaffected."),

  q("BTK-01-10", "BT-01", "A", "easy", 1,
    "A business extracts copper ore from a mine. In which sector does it operate?",
    ["Primary", "Secondary", "Tertiary", "Quaternary"],
    0,
    "Extracting raw materials — mining, agriculture, fishing, forestry — is the PRIMARY sector. Secondary converts raw materials into goods (a smelter refining the ore would be secondary), tertiary provides services, and quaternary covers knowledge and information activities such as research and consultancy."),
]

/* ── Chapter 2 · Stakeholders and agency ───────────────────────── */

const CH02: AccaQuestion[] = [
  q("BTK-02-01", "BT-02", "A", "easy", 2,
    "A local residents' association campaigns against a factory's night-time noise. It has no contract with the factory. How is it classified?",
    ["Internal stakeholder", "Connected stakeholder", "External stakeholder", "Not a stakeholder, as it has no contract"],
    2,
    "An EXTERNAL stakeholder has a genuine interest in the organisation but NO direct contractual link — government, the local community, pressure groups. Internal stakeholders are inside the organisation; connected stakeholders hold a contract or financial link. The last option restates the most common misconception: a stakeholder is anyone who affects or is affected by the organisation, contract or not."),

  q("BTK-02-02", "BT-02", "A", "medium", 2,
    "In Mendelow's matrix, a national newspaper is running a campaign about a company's supply chain. It has high interest in the issue and considerable ability to damage the company's reputation. How should it be managed?",
    ["Minimal effort — monitor only", "Keep informed", "Keep satisfied", "Key player — manage closely"],
    3,
    "High power (the ability to inflict serious reputational damage) combined with high interest (an active campaign) makes this a KEY PLAYER, to be managed closely. 'Keep informed' is for high interest with LOW power, and 'keep satisfied' is for high power with LOW interest — the newspaper has both, so neither applies. Note how the classification follows from the two axes rather than from what kind of organisation it is."),

  q("BTK-02-03", "BT-02", "A", "medium", 2,
    "Which statement correctly describes the agency relationship in a limited company?",
    [
      "Shareholders are the agents and directors are the principals",
      "Directors are the agents and shareholders are the principals",
      "Both directors and shareholders are agents of the company's creditors",
      "There is no agency relationship, because directors owe duties to the company",
    ],
    1,
    "Shareholders own the business and are the PRINCIPALS; directors run it on their behalf and are the AGENTS. Reversing them is a very common slip under time pressure — the principal is whoever the money or interest belongs to. The final option confuses two true statements: directors do owe their duties to the company, and they are nonetheless agents of the shareholders in the economic relationship the syllabus describes."),

  q("BTK-02-04", "BT-02", "A", "hard", 2,
    "A company is deciding whether to extend its supplier payment terms from 30 to 90 days to improve its own cash position. Which stakeholder is most directly disadvantaged, and how are they classified?",
    [
      "Customers, who are connected stakeholders",
      "Suppliers, who are connected stakeholders",
      "Suppliers, who are external stakeholders",
      "The local community, who are connected stakeholders",
    ],
    1,
    "SUPPLIERS bear the cost — their own liquidity worsens by 60 days — and they are CONNECTED stakeholders because they hold a contractual and financial link with the business. Option 3 gets the stakeholder right and the classification wrong, which is exactly the distinction the examiner is testing; option 4 gets the classification wrong in the other direction, since the community has no contract."),

  q("BTK-02-05", "BT-02", "A", "medium", 1,
    "Which pairing of stakeholder and primary objective is correct?",
    [
      "Lenders — growth in the market value of their shares",
      "Employees — maximisation of dividends",
      "Lenders — payment of interest and repayment of capital",
      "Government — the highest possible dividend yield",
    ],
    2,
    "A LENDER's return is CONTRACTUAL — interest as it falls due and capital at maturity — which is why lenders focus on liquidity, gearing and covenant compliance rather than on profit growth. Options 1 and 4 attach shareholder objectives to non-shareholders, and option 2 attaches a shareholder objective to employees, whose interests are pay, security, conditions and development."),

  q("BTK-02-06", "BT-02", "A", "hard", 2,
    "Employees of a factory facing closure have very high interest but little individual power. They then unionise and threaten coordinated industrial action. In Mendelow's terms, what has happened?",
    [
      "Nothing — a stakeholder's quadrant is a fixed attribute",
      "They have moved from 'keep informed' toward 'key players', as their power has risen",
      "They have moved from 'key players' to 'keep satisfied', as their interest has fallen",
      "They have become external stakeholders, as the union is a separate body",
    ],
    1,
    "Power is NOT a fixed attribute — it varies by decision and can change. Unionising raises the employees' power while their interest remains high, moving them from 'keep informed' toward 'key players'. This is the most examinable insight in the model, because it means a stakeholder map is a snapshot rather than a permanent classification. The employees remain internal stakeholders regardless of union involvement."),

  multi("BTK-02-07", "BT-02", "A", "medium", 2,
    "Which TWO of the following are CONNECTED stakeholders of a manufacturing company?",
    ["A trade union representing its employees", "A bank that has provided a term loan", "A key raw material supplier", "The environmental regulator"],
    [1, 2],
    "A LENDER and a SUPPLIER both hold a contractual or financial link, making them connected. A trade union represents INTERNAL stakeholders (the employees), and the environmental regulator is EXTERNAL — a real interest with no contract. Customers, suppliers, lenders and shareholders are the standard connected group, and misfiling suppliers or customers as external is the classic error."),

  q("BTK-02-08", "BT-02", "A", "easy", 2,
    "A company increases its dividend substantially. Which stakeholder conflict does this most directly illustrate?",
    [
      "Shareholders gain while lenders' cash cover and employees' pay prospects weaken",
      "Customers gain while suppliers lose",
      "Government gains while the community loses",
      "There is no conflict — a higher dividend benefits all stakeholders",
    ],
    0,
    "The same cash cannot be paid as a dividend AND retained to service debt or fund pay rises, so shareholders gaining means lenders' cover and employees' claims weaken. That is the essential nature of stakeholder conflict: competing claims on finite resources. The final option is the misconception being tested — stakeholder interests routinely conflict, which is why management is partly an exercise in balancing them."),

  q("BTK-02-09", "BT-02", "A", "medium", 2,
    "A pension fund holds 18% of a company's shares but has stated it takes no view on the company's choice of head-office location. How should the company manage it on that decision?",
    ["Key player — manage closely", "Keep satisfied", "Keep informed", "Minimal effort"],
    1,
    "High power (an 18% holding carries real influence) with low interest (it has expressly taken no view on this decision) means KEEP SATISFIED. 'Minimal effort' is the tempting wrong answer because interest is low, but it ignores the power axis: a shareholder of that size could become interested at any moment with all of its influence intact, so keeping it content is cheap insurance."),

  q("BTK-02-10", "BT-02", "A", "hard", 2,
    "In a not-for-profit organisation run by trustees, who occupies the principal position in the agency relationship?",
    [
      "The trustees, because they hold legal responsibility",
      "The donors and beneficiaries, on whose behalf the trustees act",
      "The organisation's employees, who deliver the mission",
      "There is no agency relationship, because there are no shareholders",
    ],
    1,
    "The PRINCIPAL is whoever the resources or the interest belongs to — here the donors who provided the funds and the beneficiaries the mission serves. Trustees are the AGENTS acting on their behalf. The absence of shareholders does not remove the agency relationship; it removes the share price that would otherwise measure the agents' performance, which makes performance reporting harder rather than unnecessary."),
]

/* ── Chapter 3 · Political and legal factors ───────────────────── */

const CH03: AccaQuestion[] = [
  q("BTK-03-01", "BT-03", "A", "medium", 2,
    "An employee with six years' service is dismissed for repeated poor performance. She was given no warnings and no opportunity to respond, but received the twelve weeks' notice her contract required, paid in full. What is her strongest claim?",
    ["Wrongful dismissal only", "Unfair dismissal only", "Both wrongful and unfair dismissal", "Neither, as poor performance is a fair reason"],
    1,
    "Poor performance CAN be a fair reason, so the reason is not the problem — the PROCEDURE is, with no warnings and no hearing, which makes the dismissal UNFAIR under statutory protection. There is no wrongful dismissal because the contract was honoured: full contractual notice was paid. The two tests are independent, and 'notice paid correctly → not wrongful; reason or procedure defective → unfair' is the pattern to carry into the exam."),

  q("BTK-03-02", "BT-03", "A", "medium", 2,
    "A company holds the CVs of every unsuccessful job applicant from the last eleven years, on the basis that a suitable role might arise. Which data protection principle is most directly breached?",
    ["Lawfulness, fairness and transparency", "Purpose limitation", "Storage limitation", "Accuracy"],
    2,
    "STORAGE LIMITATION requires personal data to be kept no longer than the purpose needs, and eleven years of unsuccessful applications is far beyond any defensible retention period. Holding it also worsens the consequences of a breach. Accuracy concerns whether data is correct rather than how long it is kept, and while purpose limitation is arguably engaged, the specific failure described is retention."),

  multi("BTK-03-03", "BT-03", "A", "medium", 2,
    "Which TWO of the following are statutory duties owed by an EMPLOYEE in relation to health and safety?",
    [
      "To carry out risk assessments for their department",
      "To take reasonable care for their own safety and that of others",
      "To provide personal protective equipment free of charge",
      "Not to interfere with or misuse anything provided for safety",
    ],
    [1, 3],
    "Employees must TAKE REASONABLE CARE for themselves and others, and must NOT INTERFERE WITH OR MISUSE safety provisions — removing a machine guard to work faster breaches a statutory duty personally, not merely a company rule. Carrying out risk assessments and providing protective equipment free of charge are EMPLOYER duties. Candidates reliably remember the employer's side and forget the employee's, and the examiner reliably tests the half that was forgotten."),

  q("BTK-03-04", "BT-03", "A", "easy", 2,
    "A retailer displays a laptop with a price label reading $499, which is a pricing error — it should be $1,499. A customer takes it to the till and insists on buying it at the labelled price. What is the legal position?",
    [
      "The retailer must sell at $499, as the label was a contractual offer",
      "The label is an invitation to treat; the customer's offer may be refused",
      "The retailer must sell at $499 only if the customer has already paid",
      "The label is a binding offer unless the retailer displayed a disclaimer",
    ],
    1,
    "Goods displayed with a price are an INVITATION TO TREAT, not an offer. The customer makes the offer at the till and the retailer is free to accept or decline it, which is exactly why a mispriced item need not be sold at that price. No disclaimer is required for this to be the position, and payment being tendered does not by itself create acceptance."),

  q("BTK-03-05", "BT-03", "A", "hard", 2,
    "A supplier offers to sell 200 units at $60 each for delivery in six weeks. The buyer replies 'Accepted, provided delivery is within three weeks.' The supplier does not respond and sells the stock elsewhere. What is the buyer's position?",
    [
      "There is a binding contract, as the buyer used the word 'accepted'",
      "There is no contract — the reply was a counter-offer, which destroyed the original offer",
      "There is a binding contract because the supplier's silence amounted to acceptance",
      "There is a contract for 200 units at $60 with delivery at a reasonable time",
    ],
    1,
    "Changing a material term makes the reply a COUNTER-OFFER, which DESTROYS the original offer rather than accepting it — the word 'accepted' does not change its substance. That left the supplier holding an offer it was free to ignore, and silence is not acceptance. The lesson is that 'accepted, provided…' and 'agreed, but…' are almost never acceptance."),

  q("BTK-03-06", "BT-03", "A", "medium", 1,
    "A government minister makes detailed rules on electrical appliance safety, using powers conferred by an Act of Parliament. These rules are:",
    ["Case law", "Delegated legislation", "A voluntary code of practice", "Supra-national law"],
    1,
    "Rules made by a minister or agency under a power granted by statute are DELEGATED (secondary) LEGISLATION, and they carry full legal force — that is the purpose of the delegation, since a legislature cannot draft every technical specification. Case law is made by courts, a code of practice is not itself law, and supra-national law derives from treaty bodies rather than a national minister."),

  q("BTK-03-07", "BT-03", "A", "easy", 2,
    "Which statement about a 'no refunds under any circumstances' notice in a consumer shop is correct?",
    [
      "It is effective, as the consumer accepts it by entering the shop",
      "It is ineffective against the terms implied into a consumer sale",
      "It is effective only for goods bought in a sale",
      "It is effective if the consumer signed an acknowledgement",
    ],
    1,
    "Terms implied into a consumer sale — satisfactory quality, fitness for purpose, matching description — CANNOT be excluded by a notice or a clause, and no signature or sale-price qualification changes that. This is the same protective logic as employment law: the law assumes the business and the individual consumer are not equal bargaining parties, so it sets a floor the contract cannot go below."),

  q("BTK-03-08", "BT-03", "A", "hard", 2,
    "An employee is dismissed with correct contractual notice, one week after reporting to the regulator that her employer was misreporting client money. Which claim is strongest?",
    ["Wrongful dismissal, because the reason was improper", "Automatically unfair dismissal", "No claim, because notice was properly given", "Breach of confidentiality by the employee"],
    1,
    "Dismissal for whistleblowing is AUTOMATICALLY UNFAIR — no fair reason or fair procedure can justify it. It is not wrongful, because the contract was honoured through correct notice; the two tests are independent. The fourth option inverts the position: a protected disclosure to a regulator is precisely the situation where the duty of confidentiality gives way, and the employee is protected from retaliation for making it."),

  q("BTK-03-09", "BT-03", "A", "medium", 2,
    "A finance team exports the entire payroll — names, salaries and bank details — to a spreadsheet in order to analyse departmental headcount, then leaves it on a drive readable by the whole department. Which data protection principle is breached MOST directly by exporting the bank details?",
    ["Data minimisation", "Accountability", "Lawfulness and transparency", "Storage limitation"],
    0,
    "DATA MINIMISATION requires personal data to be adequate and relevant but NO MORE than the purpose requires. A headcount analysis needs numbers and cost, not names and bank details, so exporting them exceeds what was necessary. The open drive additionally breaches the security principle and reusing payroll data for management analysis engages purpose limitation — but the specific failure in exporting bank details is minimisation."),

  q("BTK-03-10", "BT-03", "A", "easy", 1,
    "Which of the following is the correct set of elements required for a simple contract?",
    [
      "Offer, acceptance, consideration, intention to create legal relations, capacity",
      "Offer, acceptance, writing, witnesses, consideration",
      "Invitation to treat, offer, acceptance, payment",
      "Offer, acceptance, consideration, registration",
    ],
    0,
    "The elements are OFFER, ACCEPTANCE, CONSIDERATION, INTENTION to create legal relations and CAPACITY. Writing and witnesses are not generally required — most contracts are valid orally. An invitation to treat is not an element but a preliminary step that is expressly NOT an offer, and registration is not a contractual requirement."),
]

/* ── Chapter 4 · The macro-economic environment ─────────────────── */

const CH04: AccaQuestion[] = [
  q("BTK-04-01", "BT-04", "A", "medium", 2,
    "A central bank raises its base rate by 2 percentage points to reduce inflation. A housebuilder with substantial variable-rate borrowing and a large forward order book assesses the effect. Which combination is most likely?",
    [
      "Finance costs rise, demand for new homes weakens, and planned investment is deferred",
      "Finance costs fall, demand strengthens, and investment is brought forward",
      "Finance costs rise but demand is unaffected, as housing is a necessity",
      "Finance costs are unchanged, as base rate affects only new borrowing",
    ],
    0,
    "Higher rates raise the cost of the builder's variable-rate debt immediately, raise mortgage costs for its customers so demand weakens, and raise the hurdle rate so planned investment no longer clears it. Housing demand is highly sensitive to borrowing costs, so option 3 fails, and a variable-rate facility reprices on existing balances, so option 4 fails. Note the structure of the correct answer: it traces the measure through to specific consequences for THIS business, which is where application marks sit."),

  q("BTK-04-02", "BT-04", "A", "easy", 2,
    "Which of the following is an example of expansionary MONETARY policy?",
    [
      "The government increases spending on hospitals",
      "The central bank reduces interest rates and buys government bonds",
      "The government cuts income tax rates",
      "The government removes a professional licensing requirement",
    ],
    1,
    "Monetary policy is operated by the CENTRAL BANK through INTEREST RATES and the MONEY SUPPLY, so cutting rates and buying bonds is expansionary monetary policy. Options 1 and 3 are fiscal policy — government spending and taxation. Option 4 is supply-side policy: it raises the economy's productive capacity rather than the level of demand."),

  q("BTK-04-03", "BT-04", "A", "hard", 2,
    "Inflation rises from 2% to 9%, driven by a sharp increase in imported energy prices. A manufacturer selling only domestically has $6m of fixed-rate bank debt. Which statement is correct?",
    [
      "This is demand-pull inflation, and the real value of the debt rises",
      "This is cost-push inflation, and the real value of the debt falls",
      "This is demand-pull inflation, and the real value of the debt falls",
      "This is cost-push inflation, and the real value of the debt rises",
    ],
    1,
    "The driver is a rise in INPUT COSTS rather than excess demand, so it is COST-PUSH inflation. And because the debt is fixed in money terms, inflation erodes what the repayments are worth, so the REAL VALUE OF THE DEBT FALLS — the standard asymmetry that transfers value from lenders to borrowers. Both halves must be right, which is why all four combinations are offered."),

  multi("BTK-04-04", "BT-04", "A", "medium", 2,
    "Which TWO of the following are objectives of macro-economic policy?",
    ["Maximising the profit of domestic companies", "Price stability", "Balance of payments equilibrium", "Eliminating all forms of unemployment"],
    [1, 2],
    "The four standard objectives are economic growth, full employment, PRICE STABILITY and BALANCE OF PAYMENTS EQUILIBRIUM. Company profit is not a macro-economic objective — governments target the economy as a whole. And 'full employment' does not mean eliminating ALL unemployment: frictional unemployment as people move between jobs is normal and even healthy, so the fourth option overstates the objective."),

  q("BTK-04-05", "BT-04", "A", "medium", 2,
    "An economy has recovered strongly and is operating at close to full capacity. Skilled labour is scarce, and firms report input costs rising faster than they can pass them on. Which stage of the business cycle is this?",
    ["Recovery", "Boom", "Recession", "Depression"],
    1,
    "Full capacity use, scarce labour and building cost pressure are the classic signs of a BOOM. Recovery is the earlier stage when demand and confidence are picking up but spare capacity remains, while recession and depression involve contracting demand and growing spare capacity. Recognising the stage matters because a firm's exposure — and the policy response it should expect — differs at each one."),

  q("BTK-04-06", "BT-04", "A", "hard", 2,
    "A country's manufacturing regions have persistently high unemployment five years after a recession ended, while vacancies go unfilled in service sectors in other regions. What type of unemployment is this?",
    ["Cyclical", "Frictional", "Structural", "Seasonal"],
    2,
    "STRUCTURAL unemployment arises when workers' SKILLS OR LOCATION no longer match where the jobs are, and it persists through a recovery — which is exactly what 'five years after the recession ended' establishes. Cyclical unemployment clears as demand recovers, frictional is the short gap between jobs, and seasonal follows predictable annual patterns. The policy response is supply-side — retraining and mobility — rather than demand stimulus."),

  q("BTK-04-07", "BT-04", "A", "medium", 2,
    "A country's currency depreciates by 15%. An electronics assembler imports 70% of its components by value and exports 20% of its output. What is the most likely net effect?",
    [
      "Clearly beneficial, because exports become more competitive",
      "Clearly harmful, because imported component costs rise substantially and exports are a small share of output",
      "Neutral, because the effects offset exactly",
      "Beneficial, because a weaker currency always helps a manufacturer",
    ],
    1,
    "A depreciation helps exports and hurts imported inputs, so the NET effect depends on the mix. Here import content is 70% of value while exports are only 20% of output, so the cost increase dominates the competitiveness gain and the effect is harmful. Options 1 and 4 state the half-truth the examiner is testing: 'a weaker currency is good for business' is only true where import content is low relative to export share."),

  q("BTK-04-08", "BT-04", "A", "easy", 1,
    "Which of the following are the components of aggregate demand?",
    [
      "Consumption + investment + government spending + net exports",
      "Consumption + savings + taxation + imports",
      "Wages + profits + rent + interest",
      "Government spending + taxation + interest rates",
    ],
    0,
    "Aggregate demand is C + I + G + (X − M): CONSUMPTION, INVESTMENT, GOVERNMENT SPENDING and NET EXPORTS. Option 3 lists factor incomes rather than expenditure components, and options 2 and 4 mix leakages and policy instruments into a demand identity. Every policy lever works by acting on one of the four correct components, which is why the identity is worth knowing precisely."),

  q("BTK-04-09", "BT-04", "A", "hard", 2,
    "An economy experiences 8% inflation alongside zero growth and rising unemployment. Why is this combination particularly difficult for policymakers?",
    [
      "It is impossible, since inflation and unemployment cannot rise together",
      "It is stagflation: measures to reduce inflation worsen unemployment and growth, and measures to stimulate growth worsen inflation",
      "It requires only expansionary fiscal policy, which addresses all three simultaneously",
      "It resolves itself automatically as the business cycle turns",
    ],
    1,
    "This is STAGFLATION, and it is hard precisely because the standard remedies conflict: tightening policy to reduce inflation deepens the unemployment and stagnation, while loosening policy to restore growth accelerates inflation. Option 1 denies a well-documented phenomenon. There is no single measure that addresses all three, which is why supply-side reform — raising capacity rather than demand — is usually part of the answer."),

  q("BTK-04-10", "BT-04", "A", "medium", 1,
    "A government funds a large programme of training and apprenticeship subsidies to raise workforce skills. This is best described as:",
    ["Fiscal policy only", "Monetary policy", "Supply-side policy", "Exchange rate policy"],
    2,
    "Measures aimed at raising the economy's PRODUCTIVE CAPACITY — training, education, deregulation, competition policy, infrastructure — are SUPPLY-SIDE policy. It is funded through government spending, which is why 'fiscal policy' is tempting, but the classification turns on the policy's PURPOSE: fiscal policy acts on the level of demand, whereas this acts on the economy's ability to supply."),
]

/* ── Chapter 5 · Micro-economic factors ────────────────────────── */

const CH05: AccaQuestion[] = [
  q("BTK-05-01", "BT-05", "A", "hard", 2,
    "A bus operator sells 60,000 monthly passes at $50. It raises the price by 20% and volume falls to 54,000. What is the price elasticity of demand, and what happens to revenue?",
    [
      "PED 0.5 (inelastic); revenue rises",
      "PED 2.0 (elastic); revenue falls",
      "PED 0.5 (inelastic); revenue falls",
      "PED 2.0 (elastic); revenue rises",
    ],
    0,
    "Quantity falls from 60,000 to 54,000, a 10% fall, against a 20% price rise: PED = −10% ÷ +20% = −0.5, so 0.5 in absolute terms — INELASTIC. Revenue before was 60,000 × $50 = $3.0m; after it is 54,000 × $60 = $3.24m, so revenue RISES. The two halves must agree: with inelastic demand a price rise always raises revenue, which is the quickest way to check your own answer."),

  q("BTK-05-02", "BT-05", "A", "medium", 2,
    "The price of aluminium, a key input, falls sharply. What happens in the market for aluminium window frames?",
    [
      "A movement along the supply curve",
      "The supply curve shifts to the right",
      "The demand curve shifts to the right",
      "The demand curve shifts to the left",
    ],
    1,
    "Aluminium is an INPUT, not the product itself, so a fall in its price makes producers willing to supply more window frames at every price — the SUPPLY CURVE SHIFTS RIGHT. A movement along the curve would require the price of the frames themselves to change. Demand is untouched because buyers' willingness to pay has not altered, though the resulting lower equilibrium price will increase the quantity they buy."),

  q("BTK-05-03", "BT-05", "A", "medium", 2,
    "A firm reduces its price by 8% and total revenue increases by 5%. What does this indicate about demand?",
    [
      "Demand is inelastic, as revenue moved less than price",
      "Demand is elastic, as a price cut increased total revenue",
      "Demand is perfectly inelastic",
      "Nothing can be concluded without the volume figures",
    ],
    1,
    "The revenue test settles it: if a PRICE CUT raises total revenue, the extra volume must have more than offset the lower price, so demand is ELASTIC (|PED| > 1). With inelastic demand a price cut reduces revenue. You do not need absolute volumes — the direction of the revenue change alone answers the question, which is why examiners favour this format."),

  q("BTK-05-04", "BT-05", "A", "easy", 2,
    "The price of tea rises significantly. What is the likely effect on the demand for coffee, and why?",
    [
      "Demand for coffee falls, because they are complements",
      "Demand for coffee rises, because they are substitutes",
      "Demand for coffee falls, because they are substitutes",
      "Demand for coffee is unaffected, because they are separate markets",
    ],
    1,
    "Tea and coffee are SUBSTITUTES — different products meeting the same need — so a rise in one's price increases demand for the other. Complements, such as printers and cartridges, move the opposite way: a rise in one's price REDUCES demand for the other. Getting the direction right requires identifying the relationship first, which is the step candidates skip."),

  q("BTK-05-05", "BT-05", "A", "hard", 2,
    "A bakery has one oven. Output rises from 200 to 340 loaves per shift when a second baker is added, and to 400 when a third is added, but only to 410 with a fourth. What explains the pattern?",
    [
      "Diseconomies of scale, because the bakery has grown too large",
      "The law of diminishing returns, because labour is being added to a fixed factor",
      "Economies of scale, because average cost per loaf is falling",
      "Perfect competition, because output is being maximised",
    ],
    1,
    "Adding more of a VARIABLE factor (labour) to a FIXED factor (the single oven) produces smaller and smaller increases in output — the LAW OF DIMINISHING RETURNS, a short-run phenomenon. Diseconomies of scale are a LONG-RUN effect arising from coordination failure once scale itself changes, which is not what is happening while the oven is fixed. Buying a second oven would move the bakery into the long run."),

  q("BTK-05-06", "BT-05", "A", "medium", 2,
    "Four firms supply 90% of a national market, each closely watching the others' prices before changing its own. What market structure is this, and what is the defining feature?",
    [
      "Monopoly, defined by the absence of substitutes",
      "Oligopoly, defined by interdependence between the firms",
      "Monopolistic competition, defined by product differentiation",
      "Perfect competition, defined by a homogeneous product",
    ],
    1,
    "A few large firms each big enough that its actions provoke reactions from the others is an OLIGOPOLY, and INTERDEPENDENCE is its defining feature — which is why prices tend to be sticky and competition shifts toward branding and service. A monopoly has one supplier; monopolistic competition has MANY firms with differentiated products; and perfect competition has many small firms selling an identical product as price takers."),

  q("BTK-05-07", "BT-05", "A", "easy", 1,
    "In perfect competition, an individual firm is described as a 'price taker'. This means the firm:",
    [
      "Sets its price to maximise profit and customers accept it",
      "Must accept the prevailing market price, having no power to influence it",
      "Takes its price from a government-published tariff",
      "Charges different prices to different customers",
    ],
    1,
    "In perfect competition many small firms sell an IDENTICAL product with free entry and perfect information, so no individual firm can influence price — each must ACCEPT the market price. Option 1 describes a price maker, which is the monopolist's position. Government tariffs are regulation rather than market structure, and charging different customers different prices is price discrimination, which requires market power a price taker does not have."),

  multi("BTK-05-08", "BT-05", "A", "medium", 2,
    "Which TWO of the following would make demand for a product LESS elastic?",
    ["The product has many close substitutes", "The product is a habitual necessity", "The product accounts for a very small share of the buyer's income", "The buyer has a long period in which to find alternatives"],
    [1, 2],
    "Demand is less elastic — less responsive to price — when the product is a HABITUAL NECESSITY and when it takes only a SMALL SHARE OF INCOME, since neither leaves the buyer much reason or scope to change behaviour. Many close substitutes make demand MORE elastic, because customers can escape a price rise. A longer time horizon also raises elasticity, as it allows alternatives to be found."),

  q("BTK-05-09", "BT-05", "A", "hard", 2,
    "A games console manufacturer sells the console at a loss and makes its profit on the games, which work only on its own hardware. What is the economic logic?",
    [
      "The console and games are substitutes, so a low console price raises games demand",
      "The console and games are complements; a cheap console expands the installed base, and games then face relatively inelastic demand",
      "The console is a Giffen good, so demand rises as price falls",
      "Games are a primary sector product and consoles a tertiary one",
    ],
    1,
    "Consoles and games are COMPLEMENTS — consumed together — so pricing the console low expands the installed base, and the games, which the customer must keep buying and which fit only that hardware, then face relatively INELASTIC demand and carry the margin. The strategy depends on the complement not being easily substituted, which is why manufacturers resist third-party compatible titles so strongly. They are not substitutes: nobody buys a game instead of a console."),

  q("BTK-05-10", "BT-05", "A", "medium", 1,
    "In the LONG RUN, average cost per unit initially falls as output increases, reaches a minimum, and then rises. The rising portion is explained by:",
    ["Diminishing returns to a fixed factor", "Diseconomies of scale", "Increasing price elasticity", "Falling marginal revenue"],
    1,
    "In the LONG RUN all factors including scale can be varied, so a fixed factor cannot be the explanation — that rules out diminishing returns, which is the short-run effect. Average cost rises because of DISECONOMIES OF SCALE: coordination failure, slow communication, bureaucracy, duplicated effort and weakened motivation as the organisation becomes very large. Elasticity and marginal revenue concern demand, not the cost curve."),
]

/* ── Chapter 6 · Social, technological and environmental ───────── */

const CH06: AccaQuestion[] = [
  q("BTK-06-01", "BT-06", "A", "medium", 2,
    "A company's environmental scan lists: rising interest rates, an ageing population, a new data protection statute, and a competitor launching a rival product. Which item does NOT belong in a PESTEL analysis?",
    ["Rising interest rates", "An ageing population", "A new data protection statute", "A competitor launching a rival product"],
    3,
    "A COMPETITOR's action belongs to the COMPETITIVE (industry) environment and is analysed with Porter's five forces, not PESTEL. Interest rates are Economic, an ageing population is Social, and a data protection statute is Legal. Filing a named rival under PESTEL is the most common framework error in Area A, and it also causes candidates to miss the more dangerous threat, since substitutes usually arrive from outside the industry."),

  q("BTK-06-02", "BT-06", "A", "easy", 2,
    "Which statement best describes the 'triple bottom line'?",
    [
      "Reporting profit under three different accounting frameworks",
      "Measuring performance against economic, social and environmental outcomes",
      "Dividing profit between shareholders, employees and the community",
      "Disclosing a three-year trend of profits in the financial statements",
    ],
    1,
    "The TRIPLE BOTTOM LINE measures and reports against three dimensions — profit (economic), people (social) and planet (environmental) — on the argument that one financial figure understates both the value created and the costs imposed on others. It is a measurement and reporting concept, not a profit-distribution rule, an accounting-framework choice, or a trend disclosure."),

  q("BTK-06-03", "BT-06", "A", "hard", 2,
    "A manufacturer automates its purchase-invoice processing. Which statement about the effect on the remaining finance work is most accurate?",
    [
      "The work becomes less skilled, as the software performs the difficult tasks",
      "The work shifts to exception handling and system control, so the average task becomes more demanding",
      "The volume and nature of the work are unchanged; only headcount falls",
      "The work becomes purely supervisory, with no technical content",
    ],
    1,
    "Automation removes the ROUTINE cases and leaves the EXCEPTIONS — which are by definition the difficult ones — plus responsibility for the matching rules, the master data and monitoring that the automation is working. The skill profile of the remaining work therefore RISES. Option 1 states the intuitive but wrong conclusion, and options 3 and 4 both misdescribe the change: the nature of the work alters substantially, and it remains highly technical."),

  q("BTK-06-04", "BT-06", "A", "medium", 2,
    "An airline begins selling directly to customers through its own website, and high-street travel agents lose that business. This is an example of:",
    ["Diversification", "Disintermediation", "Vertical integration", "Product differentiation"],
    1,
    "DISINTERMEDIATION is the removal of INTERMEDIARIES from a value chain as technology allows a producer to deal directly with the end customer — the standard examples being travel agents, print classified advertising and high-street travel insurance. Vertical integration is the tempting distractor, but that means acquiring or building operations at another stage of the chain, whereas here the stage is simply bypassed."),

  multi("BTK-06-05", "BT-06", "A", "medium", 2,
    "Which TWO of the following are consequences of an ageing population for an organisation as an EMPLOYER (rather than as a seller)?",
    [
      "Growth in demand for healthcare and retirement products",
      "Rising pension costs and the loss of experience as staff retire together",
      "A need for phased retirement and structured knowledge transfer",
      "A shrinking market for products aimed at young people",
    ],
    [1, 2],
    "As an EMPLOYER, an ageing population brings RISING PENSION COSTS with a loss of experience at retirement, and a need for PHASED RETIREMENT and knowledge transfer. Options 1 and 4 are market consequences — effects on what the organisation can SELL, not on how it staffs itself. The distinction matters because the examiner frequently asks about one side specifically."),

  q("BTK-06-06", "BT-06", "A", "hard", 2,
    "A packaging company markets a product line as '100% recyclable'. This is technically accurate, but recycling facilities capable of processing it exist in only three cities, and 94% of sales are made in regions with no such facility. What is the most accurate assessment?",
    [
      "The claim is acceptable, because it is factually true",
      "The claim is greenwashing: technically defensible but creating a materially misleading impression",
      "The claim breaches consumer protection law and nothing more",
      "The claim is acceptable provided a disclaimer appears in the annual report",
    ],
    1,
    "GREENWASHING is exactly this: a statement that is technically defensible while creating a materially misleading impression. Factual accuracy is not a defence — the integrity principle covers information that misleads by omitting or obscuring context. This is also why an accountant asked to sign off the sustainability disclosure faces a genuine ethical question rather than merely a legal one, and a disclaimer buried elsewhere does not cure a misleading headline claim."),

  q("BTK-06-07", "BT-06", "A", "medium", 2,
    "Which of the following describes the effect of technology on organisational structure MOST accurately?",
    [
      "It requires taller structures, as more layers are needed to manage systems",
      "It tends to flatten structures and widen spans of control, as information and monitoring are automated",
      "It has no effect on structure, which is determined solely by size",
      "It always leads to full centralisation of decision-making",
    ],
    1,
    "Technology tends to FLATTEN structures and WIDEN spans of control: layers whose job was collecting, summarising and passing information upward become unnecessary when the information is directly available, and automated monitoring lets one manager oversee more people. It also enables virtual, hollow and modular forms. It does not dictate centralisation — better information can support either centralised or decentralised decisions, depending on where judgement is best exercised."),

  q("BTK-06-08", "BT-06", "A", "easy", 1,
    "In PESTEL, which factor covers climate change, resource scarcity and waste regulation?",
    ["Economic", "Environmental", "Social", "Political"],
    1,
    "ENVIRONMENTAL covers climate, resource limits, waste, pollution and sustainability expectations. The trap is the two Es: ECONOMIC covers growth, inflation, interest rates, exchange rates and employment. Waste REGULATION also engages Legal, and government climate policy engages Political — which is a useful reminder that PESTEL categories overlap and the framework's job is completeness of the scan, not perfect classification."),

  q("BTK-06-09", "BT-06", "A", "medium", 2,
    "An organisation argues that investing in emissions reduction is straightforwardly beneficial with no downside. Why would this answer score poorly in an exam?",
    [
      "Because environmental investment never produces financial benefits",
      "Because it omits the genuine costs — capital outlay, reporting burden, short-term profit dilution and competitive disadvantage against rivals not bearing them",
      "Because environmental factors are not part of the BT syllabus",
      "Because only listed companies are expected to consider emissions",
    ],
    1,
    "The marks are for a BALANCED case. Real benefits exist — cost savings, lower regulatory risk, access to customers and capital, recruitment advantage — and so do real costs: up-front capital with multi-year payback, measurement and assurance burdens, near-term profit dilution, and disadvantage against competitors in jurisdictions that do not require it. Presenting only one column signals advocacy rather than analysis."),

  q("BTK-06-10", "BT-06", "A", "hard", 2,
    "Which statement about demographic change is correct?",
    [
      "It is the least predictable external factor, so it cannot be planned for",
      "It is highly predictable, because the people in future age statistics are already alive",
      "It affects only consumer-facing organisations",
      "It changes rapidly and requires monthly monitoring",
    ],
    1,
    "Demographic change is the MOST forecastable external factor: the people who will be over 65 in twenty years are already alive and countable. Organisations are therefore rarely SURPRISED by it, only unprepared — which makes failure to plan a management failure rather than a forecasting one. It affects employers as much as sellers, through workforce ageing, recruitment pools and pension costs, and it moves over decades rather than months."),
]

/* ── Chapter 7 · Competitive factors ──────────────────────────── */

const CH07: AccaQuestion[] = [
  q("BTK-07-01", "BT-07", "A", "medium", 2,
    "For a company operating short-haul passenger flights, which of the following is a SUBSTITUTE in Porter's terms?",
    ["A rival airline on the same route", "High-speed rail between the same cities", "A new low-cost airline entering the route", "An airline with which it operates a codeshare"],
    1,
    "A SUBSTITUTE meets the same customer NEED — travelling between two cities — with a DIFFERENT product, which is what high-speed rail does. The other three are all airlines offering the same product, so they are competitors or partners. The distinction matters because substitutes CAP the price the whole industry can charge, and because they usually emerge from outside the industry where incumbents are not watching — a video-conferencing service that removes the trip entirely is also a substitute."),

  q("BTK-07-02", "BT-07", "A", "hard", 2,
    "A supermarket chain sells to millions of individual shoppers, none of whom accounts for a meaningful share of revenue. Switching to a rival store is effortless. How should buyer power be assessed?",
    [
      "Low, because no individual customer can negotiate",
      "High, because customers can switch at no cost",
      "Low individually but high collectively, because near-zero switching costs make customers highly price-sensitive in aggregate",
      "Irrelevant, because buyer power applies only to business customers",
    ],
    2,
    "Both halves are needed for full marks: NO INDIVIDUAL customer has bargaining power, yet with near-zero switching costs and a rival nearby, customers are collectively very price- and quality-sensitive, which constrains the chain tightly. Answering only 'low' or only 'high' captures half the analysis. Buyer power applies to consumers as much as to business buyers."),

  q("BTK-07-03", "BT-07", "A", "easy", 2,
    "In Porter's value chain, which of the following is a PRIMARY activity?",
    ["Human resource management", "Procurement", "Outbound logistics", "Technology development"],
    2,
    "The five PRIMARY activities are inbound logistics, operations, OUTBOUND LOGISTICS, marketing and sales, and service — those that directly create and deliver the product. Procurement, technology development, human resource management and firm infrastructure are the four SUPPORT activities, which enable the primary ones without touching the product themselves."),

  q("BTK-07-04", "BT-07", "A", "medium", 2,
    "A department store adds a discount own-label range to compete with value retailers, while cutting sales floor staff to protect margin. Which outcome does Porter's framework predict?",
    [
      "A successful hybrid strategy combining cost leadership and differentiation",
      "It becomes stuck in the middle — dearer than the discounters and less distinctive than premium stores",
      "It achieves a focus strategy, by serving two segments at once",
      "It becomes a cost leader, because average prices have fallen",
    ],
    1,
    "Pursuing no generic strategy consistently leaves a firm STUCK IN THE MIDDLE: it is still dearer than discounters whose scale it cannot match, and it has removed the service that justified its premium. Porter's point is that firms rarely CHOOSE this position — they arrive at it one reasonable-looking compromise at a time. A focus strategy means serving a NARROW segment on one basis of competition, not two segments at once."),

  q("BTK-07-05", "BT-07", "A", "hard", 2,
    "A company claims its efficient payroll processing is a source of sustainable competitive advantage. Why is this claim weak?",
    [
      "Because payroll is a primary rather than a support activity",
      "Because it is not valuable to customers, and any competitor can buy the same software",
      "Because efficiency is never a source of advantage",
      "Because payroll is always outsourced",
    ],
    1,
    "A strength becomes a sustainable ADVANTAGE only if it is VALUABLE TO THE CUSTOMER, RARE among rivals and HARD TO IMITATE. Efficient payroll fails all three: customers neither see nor pay for it, and every competitor can license the same software. It is a genuine strength and a real cost saving — just not an advantage. Payroll sits within human resource management and firm infrastructure, which are support activities."),

  multi("BTK-07-06", "BT-07", "A", "medium", 2,
    "Which TWO of the following raise BARRIERS TO ENTRY in an industry?",
    ["Substantial economies of scale enjoyed by incumbents", "A homogeneous, easily replicated product", "Patents protecting the core technology", "Low capital requirements to begin trading"],
    [0, 2],
    "ECONOMIES OF SCALE mean an entrant starting small faces a higher unit cost than incumbents, and PATENTS are a legal barrier preventing replication — both raise barriers. A homogeneous, easily replicated product and low capital requirements both LOWER barriers, making entry easier. Barriers determine the threat of new entrants, which is one of the five forces shaping industry profitability."),

  q("BTK-07-07", "BT-07", "A", "medium", 2,
    "Which tool should be used to analyse rivals, buyers, suppliers, new entrants and substitutes?",
    ["PESTEL", "Porter's five forces", "The value chain", "Mendelow's matrix"],
    1,
    "Those five are precisely PORTER'S FIVE FORCES, which analyses the COMPETITIVE (industry) environment and explains industry profitability. PESTEL scans the MACRO environment — political, economic, social, technological, environmental and legal. The value chain analyses activities INSIDE one organisation, and Mendelow's matrix maps stakeholders by power and interest."),

  q("BTK-07-08", "BT-07", "A", "hard", 2,
    "A manufacturer's real competitive edge lies in how tightly its ordering and forecasting systems integrate with those of its principal supplier, allowing both to hold far less inventory. Which concept best captures this?",
    ["The value chain, since inbound logistics is a primary activity", "The value network, since the advantage is created between organisations rather than inside one", "Cost leadership, since inventory cost is lower", "Backward vertical integration"],
    1,
    "The VALUE NETWORK extends the analysis across the linked value chains of suppliers, partners, distributors and customers — and this advantage exists in the LINKAGE between two organisations, not within either alone. The value chain would locate the activity but would miss that neither firm creates the advantage by itself. There is no integration here: the firms remain separate, which is exactly what makes it a network rather than an acquisition."),

  q("BTK-07-09", "BT-07", "A", "medium", 2,
    "A boutique software firm sells only to dental practices, offering clinical-billing features no general accounting package provides. Which generic strategy is this, and what is its principal risk?",
    [
      "Cost leadership; the risk is a rival achieving lower costs",
      "Differentiation across a broad market; the risk is losing exclusivity by growing",
      "Focus; the risk is a capped market and a large general provider adding the same features with far greater scale",
      "Stuck in the middle; the risk is losing both price and service customers",
    ],
    2,
    "Serving a NARROW segment better than broad-market players can is a FOCUS strategy — here differentiation focus. Its principal risks are that the niche caps growth and that a general provider could add dental features and attack it with much greater scale and marketing reach, plus concentration risk from depending on one segment's economics. It is not broad differentiation, because the firm deliberately serves one narrow market."),

  q("BTK-07-10", "BT-07", "A", "easy", 1,
    "Which factor would tend to INTENSIFY competitive rivalry in an industry?",
    ["High product differentiation", "Rapid market growth", "High fixed costs combined with slow market growth", "High barriers to entry"],
    2,
    "HIGH FIXED COSTS push every firm to fill capacity, and SLOW MARKET GROWTH means the only way to grow is to take share from a rival — together they produce intense price competition. High differentiation reduces rivalry by making products less directly comparable; rapid growth reduces it because firms can grow without attacking each other; and high barriers to entry affect the THREAT OF ENTRANTS rather than rivalry among existing firms."),
]

export const BT_KIT_AREA_A: AccaQuestion[] = [
  ...CH01, ...CH02, ...CH03, ...CH04, ...CH05, ...CH06, ...CH07,
]
