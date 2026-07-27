import type { OtCase } from "@/lib/acca-content"

/*
 * FA — Section B multi-task cases (2 × 15 marks = 30 marks), mirroring the
 * real exam: Section B of FA is ALWAYS one consolidation MTQ and one
 * interpretation MTQ. Each case is one scenario with five linked 3-mark
 * tasks, authored as a unit.
 *
 * All ORIGINAL and syllabus-aligned — no ACCA IP reproduced. Every numeric
 * answer is worked in the explanation.
 */

export const CASES_FA: OtCase[] = [
  {
    id: "case-fa-interp-larch",
    paper: "FA",
    area: "H",
    title: "Larch Co — performance and working capital",
    scenario:
      "Larch Co reports revenue of $1,200,000, cost of sales of $780,000 and operating profit of $126,000. Closing inventory is $130,000, trade receivables are $150,000 and trade payables are $90,000. All sales and purchases are on credit. Purchases for the year were $720,000. Comparable prior-year figures were: gross margin 32%, operating margin 12%, inventory days 55 and receivables days 38.",
    questions: [
      { id: "fa-case-larch-1", paper: "FA", area: "H", type: "number", stem: "What is Larch Co's gross profit margin?", numericAnswer: 35, unit: "%", tolerance: 0.1, explanation: "Gross profit is $1,200,000 − $780,000 = $420,000. Gross margin is $420,000 ÷ $1,200,000 × 100 = 35%.", marks: 3, difficulty: "easy" },
      { id: "fa-case-larch-2", paper: "FA", area: "H", type: "number", stem: "What is Larch Co's operating profit margin?", numericAnswer: 10.5, unit: "%", tolerance: 0.1, explanation: "Operating margin is $126,000 ÷ $1,200,000 × 100 = 10.5%.", marks: 3, difficulty: "easy" },
      { id: "fa-case-larch-3", paper: "FA", area: "H", type: "number", stem: "What are closing inventory holding days, using cost of sales?", numericAnswer: 60.8, unit: "days", tolerance: 0.2, explanation: "Inventory days are $130,000 ÷ $780,000 × 365 = 60.8 days.", marks: 3, difficulty: "medium" },
      { id: "fa-case-larch-4", paper: "FA", area: "H", type: "number", stem: "What are trade receivables collection days?", numericAnswer: 45.6, unit: "days", tolerance: 0.2, explanation: "Receivables days are $150,000 ÷ $1,200,000 × 365 = 45.6 days.", marks: 3, difficulty: "medium" },
      { id: "fa-case-larch-5", paper: "FA", area: "H", type: "mcq", stem: "Which interpretation best reflects the comparison with the prior year?", options: ["Gross margin improved, but operating margin and working-capital efficiency deteriorated", "Every performance measure improved", "Gross margin fell and receivables collection improved", "Operating margin improved despite slower inventory"], correct: 0, explanation: "Gross margin rose from 32% to 35%, but operating margin fell from 12% to 10.5%; inventory and receivables days both increased, indicating slower working-capital cycles.", marks: 3, difficulty: "hard" },
    ],
  },
  {
    id: "case-fa-consol-oak",
    paper: "FA",
    area: "G",
    title: "Oak Co & Acorn Co — consolidation adjustments",
    scenario:
      "Oak Co acquired 80% of Acorn Co for $480,000. At acquisition, Acorn Co had share capital of $200,000 and retained earnings of $100,000. Non-controlling interest is measured at its proportionate share of net assets. At the reporting date Acorn Co's retained earnings were $160,000 and Oak Co's retained earnings were $700,000. Oak Co sold goods to Acorn Co for $50,000 at a profit of $10,000; 40% remained in inventory. Acorn Co also owed Oak Co $20,000.",
    questions: [
      { id: "fa-case-oak-1", paper: "FA", area: "G", type: "number", stem: "What goodwill arose on Oak Co's acquisition of Acorn Co?", numericAnswer: 240000, unit: "$", tolerance: 0, explanation: "Acquisition net assets are $200,000 + $100,000 = $300,000. Oak's 80% share is $240,000. Goodwill is $480,000 − $240,000 = $240,000.", marks: 3, difficulty: "medium" },
      { id: "fa-case-oak-2", paper: "FA", area: "G", type: "number", stem: "What unrealised profit must be removed from closing inventory?", numericAnswer: 4000, unit: "$", tolerance: 0, explanation: "Profit on the transfer was $10,000 and 40% remains inside the group, so unrealised profit is $10,000 × 40% = $4,000.", marks: 3, difficulty: "medium" },
      { id: "fa-case-oak-3", paper: "FA", area: "G", type: "number", stem: "What is non-controlling interest at the reporting date?", numericAnswer: 72000, unit: "$", tolerance: 0, explanation: "Acorn's closing net assets are $200,000 + $160,000 = $360,000. The 20% NCI is $72,000. Oak was the seller, so the unrealised profit does not reduce NCI.", marks: 3, difficulty: "hard" },
      { id: "fa-case-oak-4", paper: "FA", area: "G", type: "number", stem: "What are consolidated retained earnings?", numericAnswer: 744000, unit: "$", tolerance: 0, explanation: "Oak $700,000 + 80% of Acorn's post-acquisition increase ($160,000 − $100,000) of $48,000 − unrealised profit $4,000 = $744,000.", marks: 3, difficulty: "hard" },
      { id: "fa-case-oak-5", paper: "FA", area: "G", type: "mcq", stem: "How should Acorn Co's $20,000 balance payable to Oak Co be treated on consolidation?", options: ["Eliminate $20,000 from group receivables and payables", "Eliminate only 80%", "Keep both balances", "Remove it only from payables"], correct: 0, explanation: "The intra-group receivable and payable represent the same internal balance and are eliminated in full.", marks: 3, difficulty: "easy" },
    ],
  },
  {
    id: "case-fa-consol-pine",
    paper: "FA",
    area: "G",
    title: "Pine Co & Sapling Co — simple consolidation",
    scenario:
      "Pine Co acquired 75% of the equity shares of Sapling Co on 1 January 20X3 for $300,000. " +
      "At that date Sapling Co's equity comprised share capital of $80,000 and retained earnings of $160,000. " +
      "Non-controlling interest is measured at its proportionate share of net assets. " +
      "At 31 December 20X3, retained earnings were: Pine Co $500,000; Sapling Co $200,000. " +
      "During the year Pine Co sold goods to Sapling Co for $40,000, which had cost Pine Co $30,000; " +
      "one quarter of these goods remained in Sapling Co's inventory at the year end. " +
      "At 31 December 20X3 Sapling Co owed Pine Co $15,000 on their intra-group current account.",
    questions: [
      {
        id: "fa-case-pine-1",
        paper: "FA",
        area: "G",
        type: "number",
        stem: "What is the goodwill arising on the acquisition of Sapling Co (to the nearest $)?",
        numericAnswer: 120000,
        unit: "$",
        tolerance: 0,
        explanation:
          "Net assets at acquisition = $80,000 + $160,000 = $240,000. Pine's share = 75% × $240,000 = $180,000. Goodwill = consideration $300,000 − $180,000 = $120,000.",
        marks: 3,
        difficulty: "medium",
      },
      {
        id: "fa-case-pine-2",
        paper: "FA",
        area: "G",
        type: "number",
        stem: "What is the unrealised profit to be eliminated from group inventory at 31 December 20X3 (to the nearest $)?",
        numericAnswer: 2500,
        unit: "$",
        tolerance: 0,
        explanation:
          "Profit on the intra-group sale = $40,000 − $30,000 = $10,000. One quarter is still in group inventory, so the unrealised profit = $10,000 × ¼ = $2,500. Pine (the parent) was the seller, so it reduces GROUP retained earnings, not the NCI.",
        marks: 3,
        difficulty: "medium",
      },
      {
        id: "fa-case-pine-3",
        paper: "FA",
        area: "G",
        type: "number",
        stem: "What is the non-controlling interest in the consolidated statement of financial position at 31 December 20X3 (to the nearest $)?",
        numericAnswer: 70000,
        unit: "$",
        tolerance: 0,
        explanation:
          "Sapling's net assets at 31 December 20X3 = $80,000 + $200,000 = $280,000. NCI = 25% × $280,000 = $70,000. (The PURP does not adjust NCI here because the PARENT was the seller.)",
        marks: 3,
        difficulty: "medium",
      },
      {
        id: "fa-case-pine-4",
        paper: "FA",
        area: "G",
        type: "number",
        stem: "What are group retained earnings at 31 December 20X3 (to the nearest $)?",
        numericAnswer: 527500,
        unit: "$",
        tolerance: 0,
        explanation:
          "Pine $500,000 + Pine's share of Sapling's POST-acquisition profits (75% × ($200,000 − $160,000) = $30,000) − PURP $2,500 = $527,500.",
        marks: 3,
        difficulty: "hard",
      },
      {
        id: "fa-case-pine-5",
        paper: "FA",
        area: "G",
        type: "mcq",
        stem: "How is the $15,000 intra-group current account balance treated in the consolidated statement of financial position?",
        options: [
          "Show $15,000 in both receivables and payables",
          "Eliminate $15,000 from both receivables and payables",
          "Eliminate 75% ($11,250) from receivables and payables",
          "Eliminate it from receivables only",
        ],
        correct: 1,
        explanation:
          "Intra-group balances are eliminated IN FULL — the group cannot owe money to itself. Percentage ownership is irrelevant to the elimination; consolidation adds 100% of a subsidiary's assets and liabilities.",
        marks: 3,
        difficulty: "easy",
      },
    ],
  },
  {
    id: "case-fa-interp-brambleford",
    paper: "FA",
    area: "H",
    title: "Brambleford Co — interpretation & ratios",
    scenario:
      "Extracts from Brambleford Co's financial statements for the year ended 30 June 20X8: " +
      "revenue $800,000; cost of sales $560,000; profit for the year $40,000. " +
      "At 30 June 20X8: inventory $70,000; trade receivables $80,000; cash $10,000; " +
      "trade payables $60,000; long-term loan $150,000; total equity $350,000. " +
      "All sales are on credit.",
    questions: [
      {
        id: "fa-case-bramble-1",
        paper: "FA",
        area: "H",
        type: "number",
        stem: "What is Brambleford Co's gross profit margin (in %, to one decimal place)?",
        numericAnswer: 30,
        unit: "%",
        tolerance: 0.1,
        explanation:
          "Gross profit = $800,000 − $560,000 = $240,000. Margin = 240,000 ÷ 800,000 = 30.0%.",
        marks: 3,
        difficulty: "easy",
      },
      {
        id: "fa-case-bramble-2",
        paper: "FA",
        area: "H",
        type: "number",
        stem: "What is the current ratio at 30 June 20X8 (to two decimal places)?",
        numericAnswer: 2.67,
        tolerance: 0.05,
        explanation:
          "Current assets = $70,000 + $80,000 + $10,000 = $160,000. Current liabilities = $60,000. Current ratio = 160 ÷ 60 = 2.67:1.",
        marks: 3,
        difficulty: "easy",
      },
      {
        id: "fa-case-bramble-3",
        paper: "FA",
        area: "H",
        type: "number",
        stem: "What is the quick (acid-test) ratio at 30 June 20X8 (to one decimal place)?",
        numericAnswer: 1.5,
        tolerance: 0.05,
        explanation:
          "The quick ratio EXCLUDES inventory: ($80,000 + $10,000) ÷ $60,000 = 90 ÷ 60 = 1.5:1 — the sterner test of short-term liquidity.",
        marks: 3,
        difficulty: "medium",
      },
      {
        id: "fa-case-bramble-4",
        paper: "FA",
        area: "H",
        type: "number",
        stem: "What are the trade receivables collection days (to the nearest half day)?",
        numericAnswer: 36.5,
        unit: "days",
        tolerance: 0.5,
        explanation:
          "Receivables days = 80,000 ÷ 800,000 × 365 = 36.5 days — on 30-day terms this would suggest collections are only slightly slow.",
        marks: 3,
        difficulty: "medium",
      },
      {
        id: "fa-case-bramble-5",
        paper: "FA",
        area: "H",
        type: "mcq",
        stem: "What is Brambleford Co's gearing, measured as debt ÷ (debt + equity)?",
        options: ["30%", "43%", "70%", "233%"],
        correct: 0,
        explanation:
          "Gearing = 150,000 ÷ (150,000 + 350,000) = 30%. 43% is debt ÷ equity — a different (also valid) measure, which is why you always state the formula you are using.",
        marks: 3,
        difficulty: "medium",
      },
    ],
  },
]
