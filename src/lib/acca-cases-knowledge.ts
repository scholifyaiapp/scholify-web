import type { OtCase } from "@/lib/acca-content"

/** Original, scenario-authored Section B units for the F1/F2/F4 objective exams. */
export const KNOWLEDGE_CASES: OtCase[] = [
  {
    id: "case-bt-meridian",
    paper: "BT",
    area: "B",
    title: "Meridian Co — organisational structure",
    scenario:
      "Meridian Co has separate marketing, operations, finance and human-resources departments. Department heads report to the chief executive. A new customer solution requires staff from all four departments, but decisions are delayed because every issue is passed upward. Management proposes a temporary cross-functional project team led by a project manager.",
    questions: [
      { id: "bt-case-meridian-1", paper: "BT", area: "B", type: "mcq", stem: "How is Meridian's existing structure primarily organised?", options: ["By function", "By geographic region", "As a boundaryless network", "By customer only"], correct: 0, explanation: "The departments group employees by specialist function: marketing, operations, finance and human resources.", marks: 1, difficulty: "easy" },
      { id: "bt-case-meridian-2", paper: "BT", area: "B", type: "mcq", stem: "Which weakness of the existing structure is most visible in the scenario?", options: ["Slow coordination across functional boundaries", "Complete absence of specialist expertise", "Excessive geographic duplication", "No reporting relationships"], correct: 0, explanation: "Functional specialisation can create departmental silos, making cross-functional decisions and coordination slower.", marks: 1, difficulty: "medium" },
      { id: "bt-case-meridian-3", paper: "BT", area: "B", type: "mcq", stem: "What is the strongest expected benefit of the proposed project team?", options: ["Direct integration of different specialist perspectives", "Permanent removal of every department", "Elimination of all conflict", "No need for project leadership"], correct: 0, explanation: "A cross-functional team brings the required specialists together around one deliverable and reduces reliance on vertical escalation.", marks: 1, difficulty: "medium" },
      { id: "bt-case-meridian-4", paper: "BT", area: "B", type: "mcq", stem: "If team members remain accountable to both department heads and the project manager, what structure has Meridian introduced?", options: ["A matrix structure", "A simple entrepreneurial structure", "A pure geographic division", "An informal organisation only"], correct: 0, explanation: "Dual responsibility to a functional manager and a project manager is the defining feature of a matrix structure.", marks: 1, difficulty: "hard" },
    ],
  },
  {
    id: "case-bt-vega",
    paper: "BT",
    area: "F",
    title: "Vega Co — stakeholders and ethical behaviour",
    scenario:
      "Vega Co plans to close a factory to reduce costs. The closure would improve next year's forecast profit but remove 180 local jobs. Management has not consulted employees or the local authority. An accountant is asked to omit a probable environmental clean-up cost from an internal proposal so that the project meets its target return.",
    questions: [
      { id: "bt-case-vega-1", paper: "BT", area: "F", type: "mcq", stem: "Which stakeholder group suffers the most direct financial effect from the proposed closure?", options: ["Employees who lose their jobs", "Competitors in another market", "The external auditor", "Future shareholders who do not yet exist"], correct: 0, explanation: "Employees face the direct loss of wages and employment. Other groups may be affected, but not as immediately or directly.", marks: 1, difficulty: "easy" },
      { id: "bt-case-vega-2", paper: "BT", area: "F", type: "mcq", stem: "Consulting employees and the local authority before deciding would primarily demonstrate which approach?", options: ["Stakeholder consideration", "Profit maximisation only", "Avoidance of accountability", "Removal of internal controls"], correct: 0, explanation: "Stakeholder consideration recognises that decisions affect groups beyond shareholders and invites relevant interests into the decision process.", marks: 1, difficulty: "medium" },
      { id: "bt-case-vega-3", paper: "BT", area: "F", type: "mcq", stem: "Which fundamental ethical principle is most directly threatened by omitting the probable clean-up cost?", options: ["Integrity", "Professional competence", "Confidentiality", "Professional behaviour only"], correct: 0, explanation: "Knowingly omitting a relevant probable cost makes the proposal misleading and conflicts directly with honesty and integrity.", marks: 1, difficulty: "medium" },
      { id: "bt-case-vega-4", paper: "BT", area: "F", type: "mcq", stem: "What should the accountant do first?", options: ["Refuse to prepare misleading information and explain why the cost must be included", "Delete all project records", "Include the omission without question", "Tell competitors about the proposal"], correct: 0, explanation: "The accountant should resist the unethical instruction, explain the required complete treatment, and then use escalation procedures if pressure continues.", marks: 1, difficulty: "hard" },
    ],
  },
  {
    id: "case-bt-northstar",
    paper: "BT",
    area: "C",
    title: "Northstar Co — governance and internal control",
    scenario:
      "Northstar Co is growing rapidly. Its chief executive is also board chair. The board has two executive directors and no independent non-executives. The finance director both approves new suppliers and authorises payments. A junior accountant raised concerns about a supplier owned by the finance director's sibling, but the company has no confidential reporting channel.",
    questions: [
      { id: "bt-case-northstar-1", paper: "BT", area: "C", type: "mcq", stem: "Which change would most directly improve independent challenge at board level?", options: ["Increase executive bonuses", "Appoint independent non-executive directors", "Let the chief executive approve all appointments", "Remove board minutes"], correct: 1, explanation: "Independent non-executive directors strengthen objective scrutiny of executive decisions. More executive power or weaker records reduces accountability.", marks: 1, difficulty: "easy" },
      { id: "bt-case-northstar-2", paper: "BT", area: "C", type: "mcq", stem: "Which control weakness exists in the supplier and payment process?", options: ["Too much segregation", "Lack of segregation of duties", "Excessive external audit", "Too many independent approvals"], correct: 1, explanation: "One person can approve suppliers and authorise payments, enabling an invalid supplier and payment to pass without independent prevention or review.", marks: 1, difficulty: "medium" },
      { id: "bt-case-northstar-3", paper: "BT", area: "C", type: "mcq", stem: "The supplier owned by the finance director's sibling creates primarily which issue?", options: ["A conflict of interest", "A favourable exchange variance", "A span-of-control benefit", "A market-segmentation decision"], correct: 0, explanation: "The family connection may compromise objective decision-making and must be declared and managed as a conflict of interest.", marks: 1, difficulty: "medium" },
      { id: "bt-case-northstar-4", paper: "BT", area: "C", type: "mcq", stem: "What should Northstar introduce to support the junior accountant?", options: ["A confidential whistleblowing process with protection from retaliation", "A ban on reporting concerns", "Supplier approval by the finance director alone", "Anonymous financial statements"], correct: 0, explanation: "A protected confidential reporting route lets employees raise suspected misconduct safely and supports an ethical control environment.", marks: 1, difficulty: "easy" },
    ],
  },
  {
    id: "case-ma-orbit",
    paper: "MA",
    area: "D",
    title: "Orbit Co — flexible budget performance",
    scenario:
      "Orbit Co budgeted production of 10,000 units. Variable production cost was budgeted at $6 per unit and fixed production cost at $30,000. Actual output was 12,000 units. Actual variable production cost was $75,600 and actual fixed production cost was $31,500.",
    questions: [
      { id: "ma-case-orbit-1", paper: "MA", area: "D", type: "number", stem: "What is the flexed-budget variable production cost for 12,000 units?", numericAnswer: 72000, unit: "$", tolerance: 0, explanation: "Flex the variable cost with activity: 12,000 units × $6 = $72,000.", marks: 2, difficulty: "easy" },
      { id: "ma-case-orbit-2", paper: "MA", area: "D", type: "number", stem: "What is the adverse variable production cost variance?", numericAnswer: 3600, unit: "$ adverse", tolerance: 0, explanation: "Actual variable cost $75,600 less flexed cost $72,000 gives a $3,600 adverse variance.", marks: 2, difficulty: "medium" },
      { id: "ma-case-orbit-3", paper: "MA", area: "D", type: "number", stem: "What is the adverse fixed production cost expenditure variance?", numericAnswer: 1500, unit: "$ adverse", tolerance: 0, explanation: "Fixed cost does not flex with output. Actual $31,500 less budget $30,000 is $1,500 adverse.", marks: 2, difficulty: "medium" },
      { id: "ma-case-orbit-4", paper: "MA", area: "D", type: "number", stem: "What total production cost should appear in the flexed budget?", numericAnswer: 102000, unit: "$", tolerance: 0, explanation: "Flexed variable cost $72,000 plus unchanged fixed cost $30,000 equals $102,000.", marks: 2, difficulty: "medium" },
      { id: "ma-case-orbit-5", paper: "MA", area: "D", type: "mcq", stem: "Why is the original static budget a weak benchmark for Orbit's actual costs?", options: ["It uses a different activity level", "Fixed costs must always be zero", "Actual output should be ignored", "Variable cost never changes with output"], correct: 0, explanation: "Comparing costs at 12,000 units with a budget for 10,000 confuses activity effects with performance. A flexed budget supplies a like-for-like benchmark.", marks: 2, difficulty: "hard" },
    ],
  },
  {
    id: "case-ma-cedar",
    paper: "MA",
    area: "C",
    title: "Cedar Co — cost-volume-profit decisions",
    scenario:
      "Cedar Co sells one product for $50 per unit. Variable cost is $30 per unit and annual fixed costs are $120,000. The company expects to sell 7,000 units. Management is reviewing the break-even position and the profit sensitivity of the plan.",
    questions: [
      { id: "ma-case-cedar-1", paper: "MA", area: "C", type: "number", stem: "What is contribution per unit?", numericAnswer: 20, unit: "$", tolerance: 0, explanation: "Contribution per unit is selling price $50 less variable cost $30 = $20.", marks: 2, difficulty: "easy" },
      { id: "ma-case-cedar-2", paper: "MA", area: "C", type: "number", stem: "How many units must Cedar sell to break even?", numericAnswer: 6000, unit: "units", tolerance: 0, explanation: "Break-even units = fixed costs $120,000 ÷ contribution per unit $20 = 6,000 units.", marks: 2, difficulty: "medium" },
      { id: "ma-case-cedar-3", paper: "MA", area: "C", type: "number", stem: "What is the expected margin of safety in units?", numericAnswer: 1000, unit: "units", tolerance: 0, explanation: "Margin of safety = expected sales 7,000 less break-even sales 6,000 = 1,000 units.", marks: 2, difficulty: "medium" },
      { id: "ma-case-cedar-4", paper: "MA", area: "C", type: "number", stem: "What is Cedar's contribution-to-sales ratio?", numericAnswer: 40, unit: "%", tolerance: 0, explanation: "Contribution-to-sales ratio = $20 contribution ÷ $50 selling price × 100 = 40%.", marks: 2, difficulty: "medium" },
      { id: "ma-case-cedar-5", paper: "MA", area: "C", type: "number", stem: "What profit is expected at sales of 7,000 units?", numericAnswer: 20000, unit: "$", tolerance: 0, explanation: "Total contribution is 7,000 × $20 = $140,000. Less fixed costs of $120,000 gives profit of $20,000.", marks: 2, difficulty: "hard" },
    ],
  },
  {
    id: "case-ma-forge",
    paper: "MA",
    area: "C",
    title: "Forge Co — relevant cost of a special order",
    scenario:
      "Forge Co has spare capacity and is considering a one-off order for 1,000 units. Each unit needs 3 kg of material. The material is regularly used and currently costs $6 per kg to replace. Labour requires 2 hours per unit at $12 per hour and employees are paid only for hours worked. Variable overhead is $4 per labour hour. The order would also require a special design costing $5,000. Existing fixed factory overhead would not change.",
    questions: [
      { id: "ma-case-forge-1", paper: "MA", area: "C", type: "number", stem: "What material cost is relevant to the order?", numericAnswer: 18000, unit: "$", tolerance: 0, explanation: "Regularly used material must be replaced: 1,000 × 3 kg × $6 = $18,000.", marks: 2, difficulty: "medium" },
      { id: "ma-case-forge-2", paper: "MA", area: "C", type: "number", stem: "What direct labour cost is relevant to the order?", numericAnswer: 24000, unit: "$", tolerance: 0, explanation: "Labour is paid for hours worked, so the incremental cost is 1,000 × 2 hours × $12 = $24,000.", marks: 2, difficulty: "easy" },
      { id: "ma-case-forge-3", paper: "MA", area: "C", type: "number", stem: "What variable overhead cost is relevant to the order?", numericAnswer: 8000, unit: "$", tolerance: 0, explanation: "The order uses 2,000 labour hours. At $4 per hour, incremental variable overhead is $8,000.", marks: 2, difficulty: "easy" },
      { id: "ma-case-forge-4", paper: "MA", area: "C", type: "number", stem: "What is the total relevant cost of accepting the order?", numericAnswer: 55000, unit: "$", tolerance: 0, explanation: "Relevant cost is material $18,000 + labour $24,000 + variable overhead $8,000 + special design $5,000 = $55,000.", marks: 2, difficulty: "hard" },
      { id: "ma-case-forge-5", paper: "MA", area: "C", type: "mcq", stem: "Why is existing fixed factory overhead excluded from the decision?", options: ["It will not change because of the order", "Fixed costs are never relevant", "It has no accounting entry", "The order uses spare capacity"], correct: 0, explanation: "A cost is relevant only when future cash flow changes between alternatives. The existing fixed overhead remains unchanged.", marks: 2, difficulty: "medium" },
    ],
  },
  {
    id: "case-lw-river",
    paper: "LW",
    area: "E",
    title: "River Ltd — directors and authority",
    scenario:
      "River Ltd's board limits purchasing director Dana to contracts below £40,000. Dana signs a £55,000 equipment contract with Tool Co. Tool Co has dealt with Dana before, knows she is purchasing director, and has no knowledge of the internal limit. Dana did not disclose that she also owns 20% of Tool Co.",
    questions: [
      { id: "lw-case-river-1", paper: "LW", area: "E", type: "mcq", stem: "What type of restriction is the £40,000 limit?", options: ["An internal restriction on Dana's authority", "A rule automatically binding every outsider", "A criminal sentence", "A restriction on River Ltd's legal capacity"], correct: 0, explanation: "The board limit regulates Dana internally. It does not by itself remove the company's capacity or automatically bind an outsider without notice.", marks: 1, difficulty: "easy" },
      { id: "lw-case-river-2", paper: "LW", area: "E", type: "mcq", stem: "Which fact most strongly supports Tool Co's argument that River Ltd is bound?", options: ["Dana holds a purchasing role and Tool Co had no notice of the limit", "Dana owns Tool Co shares", "The board disliked the price", "The contract exceeds £40,000"], correct: 0, explanation: "A purchasing director appears to have authority to enter equipment contracts of the ordinary kind, and Tool Co lacked notice of the internal restriction.", marks: 2, difficulty: "medium" },
      { id: "lw-case-river-3", paper: "LW", area: "E", type: "mcq", stem: "What governance duty is most clearly engaged by Dana's ownership of Tool Co?", options: ["Duty to declare an interest in a proposed transaction", "Duty to increase share capital", "Duty to appoint an auditor personally", "Duty to guarantee company debts"], correct: 0, explanation: "Dana has a direct personal interest in the counterparty and should disclose the nature and extent of that interest to the other directors.", marks: 2, difficulty: "hard" },
      { id: "lw-case-river-4", paper: "LW", area: "E", type: "mcq", stem: "Who should Dana disclose the Tool Co interest to?", options: ["The other directors", "Only Tool Co", "No one unless the contract fails", "Only the company's customers"], correct: 0, explanation: "A director must declare the nature and extent of an interest in a proposed transaction to the other directors before the company enters it.", marks: 1, difficulty: "easy" },
    ],
  },
  {
    id: "case-lw-harbour",
    paper: "LW",
    area: "B",
    title: "Harbour Ltd — formation of a contract",
    scenario:
      "Harbour Ltd emails Office Co offering to buy 20 desks for £8,000, stating that acceptance must arrive by noon on Friday. Office Co replies asking whether delivery can be made on Monday; Harbour confirms that it can. At 10:00 on Friday Office Co sends an unequivocal acceptance. At 11:00 Harbour attempts to withdraw the offer, but Office Co receives that message after its acceptance has arrived.",
    questions: [
      { id: "lw-case-harbour-1", paper: "LW", area: "B", type: "mcq", stem: "What is the legal character of Office Co's question about Monday delivery?", options: ["A request for information", "An acceptance", "A rejection that necessarily ends the offer", "Consideration"], correct: 0, explanation: "A genuine enquiry about an aspect of performance is a request for information and does not by itself reject the original offer.", marks: 1, difficulty: "easy" },
      { id: "lw-case-harbour-2", paper: "LW", area: "B", type: "mcq", stem: "Why is Office Co's 10:00 response capable of forming agreement?", options: ["It is an unqualified acceptance communicated before the deadline", "It introduces a new price", "It arrives after withdrawal", "Silence always amounts to acceptance"], correct: 0, explanation: "The response mirrors the offer without adding new terms and is communicated within the stated acceptance period.", marks: 2, difficulty: "medium" },
      { id: "lw-case-harbour-3", paper: "LW", area: "B", type: "mcq", stem: "What is the effect of Harbour's attempted withdrawal at 11:00?", options: ["It is too late because acceptance has already been communicated", "It automatically cancels every earlier message", "It converts the offer into an invitation to treat", "It removes Office Co's consideration"], correct: 0, explanation: "Revocation must be communicated before acceptance. Once effective acceptance has formed the contract, a later attempted withdrawal cannot revoke the offer.", marks: 2, difficulty: "hard" },
      { id: "lw-case-harbour-4", paper: "LW", area: "B", type: "mcq", stem: "What consideration moves from Office Co under the agreement?", options: ["The promise to pay £8,000", "Harbour's promise to supply desks", "The Friday deadline alone", "The request about delivery"], correct: 0, explanation: "Office Co supplies consideration through its promise to pay the agreed price; Harbour supplies the reciprocal promise to provide the desks.", marks: 1, difficulty: "easy" },
    ],
  },
  {
    id: "case-lw-elm",
    paper: "LW",
    area: "C",
    title: "Elm Café — duty and breach in negligence",
    scenario:
      "An Elm Café employee mops the entrance floor during a busy lunch period but places no warning sign. The floor is difficult to distinguish from a dry surface. Customer Priya walks normally, slips, breaks her wrist and loses two weeks of earnings. CCTV shows that Priya was looking ahead and was not using her phone.",
    questions: [
      { id: "lw-case-elm-1", paper: "LW", area: "C", type: "mcq", stem: "Why is a duty of care likely to be owed to Priya?", options: ["Harm to café visitors from an unsafe floor is reasonably foreseeable", "Every accident creates strict liability", "Priya has a contract with the employee", "Only financial loss occurred"], correct: 0, explanation: "A café should reasonably foresee physical injury to visitors if walking surfaces are left dangerously slippery.", marks: 1, difficulty: "easy" },
      { id: "lw-case-elm-2", paper: "LW", area: "C", type: "mcq", stem: "Which fact most strongly indicates breach of duty?", options: ["No warning sign was placed beside a hard-to-see wet floor", "The café was open at lunchtime", "Priya entered voluntarily", "The employee was working"], correct: 0, explanation: "A reasonable operator would take a simple precaution such as warning visitors or restricting access while the floor dries.", marks: 2, difficulty: "medium" },
      { id: "lw-case-elm-3", paper: "LW", area: "C", type: "mcq", stem: "Which loss is most clearly recoverable if causation is proved?", options: ["The wrist injury and resulting earnings loss", "A stranger's unrelated business loss", "A purely imagined future injury", "A penalty unrelated to compensation"], correct: 0, explanation: "The physical injury and consequential earnings loss flow directly from the foreseeable slipping accident.", marks: 2, difficulty: "medium" },
      { id: "lw-case-elm-4", paper: "LW", area: "C", type: "mcq", stem: "Does the CCTV strongly support a reduction for contributory negligence?", options: ["No, it shows no evident lack of reasonable care by Priya", "Yes, every claimant is automatically 50% responsible", "Yes, entering a café is negligent", "No, because contributory negligence never exists"], correct: 0, explanation: "Nothing stated suggests Priya failed to take reasonable care. Contributory negligence depends on the claimant's conduct, not merely being present.", marks: 1, difficulty: "hard" },
    ],
  },
]
