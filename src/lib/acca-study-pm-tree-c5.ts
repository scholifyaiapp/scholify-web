import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area C, final chapter — dealing with risk and uncertainty in decision making.
 * Chapter 19 of the PM reading tree, mapped to syllabus group C6.
 *
 * The chapter is organised by DECISION RULE rather than by technique, because the exam's
 * favourite question gives one payoff table and asks what each rule would choose — and the
 * whole point is that the rules disagree. A candidate who computes only the expected value
 * has answered a quarter of the question.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 19 · C6 ──────────────────────────────────────────── */

export const PM_TREE_19: StudyChapter = {
  id: "PM-19",
  number: 19,
  paper: "PM",
  area: "C",
  title: "Risk and uncertainty in decision making",
  minutes: 18,
  syllabusRefs: ["C6(a)", "C6(b)", "C6(c)", "C6(d)"],
  intro:
    "Four decision rules applied to one payoff table will often give four different answers, and none of them is wrong — they encode different attitudes to risk. The skill being tested is knowing which answer belongs to which attitude.",
  outcomes: [
    "Distinguish risk from uncertainty",
    "Construct a payoff table and apply expected values",
    "Apply the maximin, maximax and minimax regret rules",
    "Calculate and interpret the value of perfect information",
    "Use a decision tree, and explain sensitivity analysis and simulation",
  ],
  sections: [
    {
      id: "risk-uncertainty-ev",
      heading: "Risk, uncertainty and expected values",
      blocks: [
        {
          kind: "definition",
          term: "Risk and uncertainty",
          md: "**Risk** exists where the possible outcomes are known **and probabilities can be attached** to them — so it can be quantified, and expected values are available. **Uncertainty** exists where the outcomes may be known but the **probabilities are not** — so expected values cannot be computed at all, and the maximin, maximax and minimax regret rules are what remain. The distinction decides which techniques are even available, which is why examiners ask for it.",
        },
        {
          kind: "formula",
          name: "Expected value",
          expr: "EV  =  Σ (probability  ×  outcome)\n\nValue of perfect information  =  EV with perfect information  −  EV of the best action without it",
          note: "The EV is a weighted AVERAGE, so it is frequently a figure that cannot actually occur — an EV of £42,000 where the outcomes are £20,000 and £60,000 is a real answer, not an arithmetic error. Note also that perfect information is valued by comparing against the best action WITHOUT it, not against the worst outcome.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "What is wrong with an expected value, and when to say so",
          md: "Three limitations, and an answer quoting an EV should name at least one. It is an **average**, so it ignores the **spread** — two projects with the same EV can carry entirely different risk, and the EV cannot tell them apart. It is only valid for a **repeated** decision: for a **one-off** choice the business will experience an actual outcome, not the average, so the EV describes a long run that will never happen. And it depends entirely on **subjective probabilities**, which in a scenario are usually somebody's estimate. So an EV is a starting point, and the useful answer adds the spread and the worst case.",
        },
        {
          kind: "example",
          title: "One payoff table, four decision rules",
          scenario:
            "Bicknoller Ltd must choose one of three production levels for a seasonal product before knowing what demand will be. Profits (£000) are: at LOW output — 40 if demand is low, 40 if medium, 40 if high. At MEDIUM output — 15 if demand is low, 70 if medium, 70 if high. At HIGH output — (20) if demand is low, 45 if medium, 110 if high. Probabilities are estimated at 0.3 low, 0.4 medium and 0.3 high.",
          steps: [
            { label: "Expected value of each action", detail: "LOW: (0.3×40) + (0.4×40) + (0.3×40) = £40.0k. MEDIUM: (0.3×15) + (0.4×70) + (0.3×70) = 4.5 + 28 + 21 = £53.5k. HIGH: (0.3×−20) + (0.4×45) + (0.3×110) = −6 + 18 + 33 = £45.0k. On EV, choose MEDIUM output at £53.5k." },
            { label: "Maximin — the pessimist's rule", detail: "Find the WORST outcome of each action, then pick the best of those. Worst outcomes: LOW £40k, MEDIUM £15k, HIGH −£20k. The best worst case is LOW at £40k, so maximin chooses LOW OUTPUT — a different answer from EV." },
            { label: "Maximax — the optimist's rule", detail: "Find the BEST outcome of each action, then pick the best of those. Best outcomes: LOW £40k, MEDIUM £70k, HIGH £110k. Maximax chooses HIGH OUTPUT — a third different answer." },
            { label: "Minimax regret — build the regret table", detail: "For each demand column, regret = the best payoff in that column minus this action's payoff. LOW demand column (best 40): LOW 0, MEDIUM 25, HIGH 60. MEDIUM demand column (best 70): LOW 30, MEDIUM 0, HIGH 25. HIGH demand column (best 110): LOW 70, MEDIUM 40, HIGH 0." },
            { label: "Minimax regret — choose", detail: "Maximum regret per action: LOW 70, MEDIUM 40, HIGH 60. Minimise the maximum regret: choose MEDIUM at 40. So minimax regret agrees with EV here, though for a quite different reason." },
            { label: "Value of perfect information", detail: "With perfect information Bicknoller would pick the best action for each demand level: low demand → LOW output £40k; medium demand → MEDIUM £70k; high demand → HIGH £110k. EV with perfect information = (0.3×40) + (0.4×70) + (0.3×110) = 12 + 28 + 33 = £73.0k. Less the best EV without it (£53.5k) = value of perfect information £19.5k — the most worth paying for a perfect forecast." },
            { label: "State the answer properly", detail: "The four rules give LOW, HIGH, MEDIUM and MEDIUM. None is wrong: they encode risk aversion, risk seeking, and regret minimisation. MEDIUM is defensible on two of the four and is the EV choice, so it is the recommendation — but a risk-averse business facing a possible £20k loss might legitimately choose LOW, and saying so is part of the answer." },
          ],
          result:
            "**EV chooses MEDIUM (£53.5k), maximin LOW, maximax HIGH, minimax regret MEDIUM**, and perfect information is worth **£19.5k**. The four rules disagreeing is the point — computing only the EV answers a quarter of the question.",
        },
      ],
      check: {
        q: "Actions A, B and C have worst outcomes of £30k, £10k and −£5k. Which does maximin choose?",
        options: ["C, with the highest possible payoff", "A, the best of the worst outcomes", "B, the middle option", "Cannot be determined without probabilities"],
        correct: 1,
        explain:
          "A — maximin takes the WORST outcome of each action and picks the BEST of those, so £30k wins. It needs no probabilities, which is why it is available under UNCERTAINTY where expected values are not.",
      },
    },
    {
      id: "trees-and-sensitivity",
      heading: "Decision trees, sensitivity and simulation",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Working a decision tree",
          items: [
            "**Draw it left to right**, using a **square** for a decision node — a choice the business makes — and a **circle** for an outcome node, where chance decides.",
            "**Label every branch** with its probability (outcome nodes only — decision branches have no probability) and put the cash flow on the branch it relates to.",
            "**Evaluate right to left**, which is the step candidates get wrong by working forwards.",
            "At each **outcome node**, compute the **expected value** of the branches leaving it.",
            "At each **decision node**, choose the **best** of the branches leaving it, and carry that value back. Mark the rejected branches so the recommendation is visible.",
            "**State the decision at the first node**, and say what it is worth — the tree's purpose is a recommendation, not a diagram.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two things a decision tree does that a payoff table cannot",
          md: "First, it handles **sequential** decisions: where a choice now leads to information and then another choice, a table cannot represent it but a tree can. Second, because you **choose** at each decision node rather than averaging, the tree automatically captures the value of being able to **react** later — which is why a project with a decision point built into it is worth more than the same project without one. That is also the answer to \"why is the tree's value higher than my payoff table's EV?\": the tree is not assuming you must commit to everything now.",
        },
        {
          kind: "definition",
          term: "Sensitivity analysis",
          md: "Asking by **how much a single variable could change** before the decision changes. It is computed as the margin of safety on that variable: for a project with a positive expected benefit, the sensitivity of a variable is the benefit divided by the amount of that variable in the calculation, expressed as a percentage. Its strength is that it needs **no probabilities**; its weakness is that it changes **one variable at a time**, when in reality several move together.",
        },
        {
          kind: "formula",
          name: "Sensitivity of a decision to one variable",
          expr: "Sensitivity (%)  =  Expected benefit of the decision  ÷  Value of the variable under review  ×  100",
          note: "So if a project shows a £60,000 benefit and its sales revenue is £400,000, the decision is sensitive to a 15% fall in revenue. Always express the answer as \"the decision reverses if X changes by more than Y%\", because that is the sentence a manager can act on."
        },
        {
          kind: "table",
          caption: "The techniques compared, and what each needs",
          head: ["Technique", "Needs probabilities?", "What it gives", "Main weakness"],
          rows: [
            ["**Expected value**", "**Yes**", "A single weighted-average figure, easy to compare", "Ignores spread; invalid for a genuinely one-off decision"],
            ["**Maximin / maximax**", "**No**", "The choice implied by a pessimistic or optimistic stance", "Uses only ONE outcome per action and ignores everything else"],
            ["**Minimax regret**", "**No**", "The choice that limits how badly wrong you can be", "Also ignores probabilities, and regret depends on which actions happen to be listed"],
            ["**Decision tree**", "**Yes**", "Handles sequential decisions and values the ability to react", "Grows unwieldy quickly; still depends on estimated probabilities"],
            ["**Sensitivity analysis**", "**No**", "How much a variable can move before the decision changes", "One variable at a time, so it misses interactions"],
            ["**Simulation**", "**Yes** — as distributions", "A distribution of outcomes, so the spread and the chance of a loss are visible", "Costly, needs software and reliable input distributions; output is only as good as those"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why simulation answers the criticism of expected values",
          md: "The main charge against an EV is that it hides the **spread**. Simulation — running the model many times, drawing each uncertain input from a **distribution** rather than a single estimate — produces a **distribution of outcomes** instead of one number. That lets management see the range, the shape, and specifically the **probability of a loss**, which is usually the figure a board actually wants. It also handles **several variables moving together**, which is precisely what sensitivity analysis cannot do. Its cost is that it needs software, reliable input distributions, and a modeller — so it is proportionate for a large one-off investment and excessive for a routine choice.",
        },
      ],
      check: {
        q: "In which direction is a decision tree evaluated, and what happens at a decision node?",
        options: [
          "Left to right, taking the expected value at every node",
          "Right to left, taking the expected value at outcome nodes and CHOOSING the best branch at decision nodes",
          "Right to left, taking the expected value at every node",
          "Left to right, choosing the highest cash flow first",
        ],
        correct: 1,
        explain:
          "RIGHT TO LEFT — expected values at outcome nodes (circles), but at decision nodes (squares) you CHOOSE the best branch rather than averaging. Averaging at a decision node is the standard error, and it understates the project because it assumes management cannot pick.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Computing only the expected value when several rules are asked for.",
      fix: "The rules disagree, and that disagreement is the answer. Give each and say which risk attitude it reflects.",
    },
    {
      trap: "Applying expected values where probabilities are not given.",
      fix: "That is UNCERTAINTY, not risk. Use maximin, maximax or minimax regret.",
    },
    {
      trap: "Building the regret table from row maxima.",
      fix: "Regret is measured within each demand COLUMN — the best payoff for that state of the world, less this action's payoff.",
    },
    {
      trap: "Averaging at a decision node on a tree.",
      fix: "Choose the best branch. Averaging assumes management cannot decide, and understates the project.",
    },
    {
      trap: "Valuing perfect information against the worst outcome.",
      fix: "Compare EV WITH perfect information against the best EV WITHOUT it.",
    },
    {
      trap: "Treating an EV that cannot occur as an error.",
      fix: "It is a weighted average, so a figure between the possible outcomes is expected.",
    },
  ],
  keyTerms: [
    { term: "Risk", def: "Outcomes are known and probabilities can be attached, so expected values are available." },
    { term: "Uncertainty", def: "Probabilities cannot be attached, so only maximin, maximax and minimax regret remain." },
    { term: "Expected value", def: "The sum of probability times outcome — a weighted average that ignores spread." },
    { term: "Maximin", def: "Choose the action with the best worst outcome; the risk-averse rule." },
    { term: "Maximax", def: "Choose the action with the best best outcome; the risk-seeking rule." },
    { term: "Minimax regret", def: "Minimise the maximum regret, regret being measured within each column." },
    { term: "Value of perfect information", def: "EV with perfect information less the best EV without it." },
    { term: "Simulation", def: "Repeated modelling with inputs drawn from distributions, producing a distribution of outcomes." },
  ],
  summary: [
    "Risk has probabilities and uncertainty does not, which decides which techniques are available.",
    "Expected value is a weighted average that ignores spread and suits repeated rather than one-off decisions.",
    "Maximin is pessimistic, maximax optimistic, and minimax regret minimises the worst regret measured by column.",
    "Perfect information is worth the EV with it less the best EV without it.",
    "Decision trees are evaluated right to left, choosing at squares and averaging at circles; simulation shows the spread an EV hides.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish risk from uncertainty and say why it matters.", a: "Risk has attachable probabilities and uncertainty does not, so expected values and decision trees are available only under risk." },
    { q: "State the three limitations of an expected value.", a: "It ignores the spread, it is only valid for repeated decisions rather than one-offs, and it depends on subjective probabilities." },
    { q: "How is a regret table constructed?", a: "Within each demand column, subtract each action's payoff from the best payoff available in that column." },
    { q: "How is perfect information valued?", a: "The expected value achievable with perfect information, less the expected value of the best action without it." },
    { q: "Why does simulation answer the main criticism of expected values?", a: "It produces a distribution of outcomes rather than one average, so the spread and the probability of a loss become visible, and several variables can move together." },
  ],
}

export const PM_TREE_AREA_C_PART5: StudyChapter[] = [PM_TREE_19]
