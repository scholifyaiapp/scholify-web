import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area C, third part — linear programming.
 * Chapters 15–16 of the PM reading tree, mapped to syllabus group C3(c)–(e).
 *
 * Split deliberately into formulation-and-solution (15) and interpretation (16), because
 * they fail differently. Candidates lose marks in 15 by mis-stating a constraint — wrong
 * direction, or omitting non-negativity — and in 16 by computing a shadow price correctly
 * and then misusing it, typically by treating it as a price to pay rather than a PREMIUM
 * over the normal cost, or by applying it beyond the range over which it holds.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 15 · C3(c), C3(d) ────────────────────────────────── */

export const PM_TREE_15: StudyChapter = {
  id: "PM-15",
  number: 15,
  paper: "PM",
  area: "C",
  title: "Linear programming: formulation and graphical solution",
  minutes: 18,
  syllabusRefs: ["C3(c)", "C3(d)"],
  intro:
    "Once two resources are short at the same time, ranking cannot work — a plan that suits one constraint breaks the other. Linear programming finds the mix that respects both, and the graph makes the answer visible.",
  outcomes: [
    "Recognise when linear programming is needed rather than limiting factor analysis",
    "Formulate an objective function and constraints correctly",
    "Plot constraints and identify the feasible region",
    "Find the optimal solution using the iso-contribution line or by testing vertices",
    "Calculate the optimal contribution and identify which constraints bind",
  ],
  sections: [
    {
      id: "formulation",
      heading: "Formulating the problem",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "When linear programming is needed",
          md: "Limiting factor analysis (chapter 14) works when **exactly one** resource is short, because then a single ranking answers the question. With **two or more binding constraints**, ranking fails: the order that maximises contribution per labour hour is generally not the order that maximises it per machine hour, and satisfying one leaves the other breached. Linear programming handles them simultaneously. The graphical method works for **two products** — with three or more, the problem needs the simplex method or a solver, which is why exam questions are set with two.",
        },
        {
          kind: "list",
          style: "number",
          title: "The five steps of formulation",
          items: [
            "**Define the variables** precisely, with units. \"Let x = units of Alpha produced per week\" — not \"let x = Alpha\", which is what makes later constraints ambiguous.",
            "**State the objective function**: maximise contribution, written as C = (contribution per unit of x)x + (contribution per unit of y)y. Note it is **contribution**, never profit — fixed costs do not vary with the mix, so including them changes nothing except the arithmetic.",
            "**State each constraint** as an inequality in the same variables, with the resource used on the left and the amount available on the right.",
            "**Add the non-negativity constraints**: x ≥ 0, y ≥ 0. Easy marks, routinely dropped.",
            "**Add any other constraints** the scenario gives — maximum demand, a minimum contractual quantity, or a required ratio between products.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Getting the direction of the inequality right",
          md: "A **resource** constraint is **≤** — you cannot use more than you have. A **minimum requirement** is **≥** — a contract to supply at least 200 units is 200 ≤ x, written x ≥ 200. A **maximum demand** is **≤**. Reversing one of these does not merely lose that mark: it changes the feasible region, so every subsequent figure is wrong. Read each constraint asking \"is this a ceiling or a floor?\" before writing it down.",
        },
        {
          kind: "example",
          title: "Formulating and solving graphically",
          scenario:
            "Wexcombe Ltd makes two products, Standard and Deluxe. Standard earns £40 contribution a unit and needs 2 machine hours and 4 labour hours. Deluxe earns £60 and needs 5 machine hours and 3 labour hours. Next month 800 machine hours and 900 labour hours are available. A contract requires at least 50 Deluxe to be made. Maximum demand for Standard is 250 units.",
          steps: [
            { label: "Define the variables", detail: "Let S = units of Standard made next month, and D = units of Deluxe made next month." },
            { label: "State the objective function", detail: "Maximise contribution C = 40S + 60D. Contribution, not profit — fixed costs are unaffected by the mix." },
            { label: "State the constraints", detail: "Machine hours: 2S + 5D ≤ 800. Labour hours: 4S + 3D ≤ 900. Contract: D ≥ 50. Demand: S ≤ 250. Non-negativity: S ≥ 0, D ≥ 0." },
            { label: "Plot each constraint by finding its intercepts", detail: "Machine: if S=0, D=160; if D=0, S=400. Labour: if S=0, D=300; if D=0, S=225. The feasible region is bounded by the LOWER of the two resource lines at every point, cut off at S=250 (which never binds, since labour already limits S to 225) and floored at D=50." },
            { label: "Find the intersection of the two binding constraints", detail: "Solve 2S + 5D = 800 and 4S + 3D = 900 simultaneously. Multiply the first by 2: 4S + 10D = 1,600. Subtract the second: 7D = 700, so D = 100. Substitute: 2S + 500 = 800, so S = 150. The vertex is S=150, D=100." },
            { label: "Test the vertices of the feasible region", detail: "(S=0, D=50): C = £3,000. (S=0, D=160): C = £9,600. (S=150, D=100): C = (150×40) + (100×60) = £6,000 + £6,000 = £12,000. (S=225, D=0) is infeasible because D ≥ 50; the corner on the labour line with D=50 is 4S + 150 = 900, S = 187.5, giving C = (187.5×40) + (50×60) = £7,500 + £3,000 = £10,500." },
            { label: "State the optimum and which constraints bind", detail: "OPTIMUM: 150 Standard and 100 Deluxe, contribution £12,000. Both MACHINE and LABOUR hours are fully used and therefore BIND — check: machine 2(150)+5(100) = 800 ✓, labour 4(150)+3(100) = 900 ✓. The demand constraint (S ≤ 250) and the contract (D ≥ 50) both have SLACK, so neither binds." },
          ],
          result:
            "**150 Standard, 100 Deluxe, contribution £12,000**, with machine and labour hours both binding and demand and the contract both slack. Note that neither of the constraints the scenario mentioned most prominently turned out to matter — which is why the vertices must be tested rather than assumed.",
        },
      ],
      check: {
        q: "A contract requires at least 200 units of product X. How is that constraint written?",
        options: ["x ≤ 200", "x ≥ 200", "x = 200", "200x ≤ 1"],
        correct: 1,
        explain:
          "x ≥ 200 — a MINIMUM requirement is a floor. A resource limit or a maximum demand is ≤; a contractual minimum is ≥. Reversing the direction changes the feasible region, so every subsequent figure is wrong, not just that one mark.",
      },
    },
    {
      id: "solving",
      heading: "Finding the optimum on the graph",
      blocks: [
        {
          kind: "table",
          caption: "Two ways to find the optimal vertex",
          head: ["Method", "How it works", "When to use it"],
          rows: [
            ["**Iso-contribution line**", "Draw any line of constant contribution — pick a convenient total — then slide it **outwards, parallel**, until it just touches the feasible region. The last point it touches is the optimum", "The method the examiner usually wants, and the only one that shows WHY that vertex is optimal"],
            ["**Testing the vertices**", "Compute contribution at every corner of the feasible region and pick the highest", "Safe and quick with few vertices, and a useful CHECK on the graphical answer"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the optimum is always at a vertex",
          md: "The objective function is a straight line and the feasible region is a convex polygon, so as the iso-contribution line slides outwards the **last point of contact must be a corner** — unless the line happens to be exactly parallel to a constraint, in which case an entire **edge** is optimal and there are multiple optimal solutions with the same contribution. That is worth knowing because it is a legitimate answer: if a question's iso-contribution line is parallel to a binding constraint, saying \"any mix along this edge gives the same contribution\" is correct and complete.",
        },
        {
          kind: "list",
          title: "Practical points that earn or lose marks",
          items: [
            "**Label the axes and every constraint line.** An unlabelled graph cannot be marked.",
            "**Shade or clearly identify the feasible region**, and remember it is the area satisfying **all** constraints simultaneously.",
            "**Solve the binding pair simultaneously** rather than reading coordinates off the graph — a graph read by eye gives 148 rather than 150, and the subsequent contribution is then wrong.",
            "**Check the optimum against every constraint** before finalising, including the ones you expect to be slack.",
            "**State which constraints bind**, because that is what chapter 16's shadow prices attach to.",
            "**Answer in the scenario's terms** — units of each product and total contribution, not just coordinates.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The assumptions, and the one that most often fails",
          md: "Linear programming assumes **linearity** throughout: contribution per unit is constant at all volumes, and resource usage per unit is constant too. So it excludes bulk discounts, the learning effect (chapter 22), and any price reduction needed to sell more (chapter 17). It assumes **divisibility**, so a solution of 187.5 units is accepted where a real process may only make whole batches. It assumes the constraints and coefficients are **known with certainty**, which is rarely true. And it optimises **one period** — the mix that is optimal this month may leave the business badly placed next. Of these, **linearity of contribution** is the one that most often fails in practice, because selling substantially more usually requires a lower price.",
        },
      ],
      check: {
        q: "Why is the optimal solution to a two-product linear programme always at a corner of the feasible region?",
        options: [
          "Because corners use the least resource",
          "Because the objective function is a straight line and the region is convex, so the outermost point of contact is a vertex — unless the line is parallel to a constraint, when an edge is optimal",
          "Because non-negativity constraints force it",
          "Because contribution is highest at the extremes",
        ],
        correct: 1,
        explain:
          "Because the objective function is LINEAR and the feasible region CONVEX, so the last point an outward-sliding iso-contribution line touches must be a vertex. The exception is worth knowing: if the line is exactly PARALLEL to a binding constraint, every point along that edge is optimal and gives the same contribution.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Maximising profit rather than contribution.",
      fix: "Fixed costs do not vary with the mix, so the objective function is contribution.",
    },
    {
      trap: "Omitting the non-negativity constraints.",
      fix: "x ≥ 0, y ≥ 0. They are easy marks and routinely dropped.",
    },
    {
      trap: "Writing a contractual minimum as ≤.",
      fix: "A minimum is ≥; a resource limit or maximum demand is ≤. The wrong direction invalidates everything after it.",
    },
    {
      trap: "Reading the optimal coordinates off the graph.",
      fix: "Solve the two binding constraints simultaneously — an eyeballed value makes the contribution wrong.",
    },
    {
      trap: "Assuming the constraints the scenario stresses are the ones that bind.",
      fix: "Test the optimum against every constraint. Prominent constraints often turn out slack.",
    },
  ],
  keyTerms: [
    { term: "Objective function", def: "The expression to be maximised or minimised — contribution, not profit." },
    { term: "Constraint", def: "An inequality limiting the solution; ≤ for a resource or maximum, ≥ for a minimum requirement." },
    { term: "Feasible region", def: "The area satisfying every constraint simultaneously." },
    { term: "Iso-contribution line", def: "A line of constant contribution, slid outwards until it last touches the feasible region." },
    { term: "Binding constraint", def: "One fully used at the optimum, so it limits contribution; the others have slack." },
    { term: "Multiple optimal solutions", def: "Where the iso-contribution line is parallel to a binding constraint, every point on that edge is optimal." },
  ],
  summary: [
    "Linear programming is needed when two or more constraints bind, because ranking cannot satisfy both.",
    "Formulate by defining variables with units, stating a contribution objective, each constraint with the right inequality, and non-negativity.",
    "The feasible region satisfies all constraints, and the optimum lies at a vertex.",
    "Slide an iso-contribution line outwards, or test the vertices, then solve the binding pair simultaneously.",
    "It assumes linearity, divisibility, certainty and a single period — linearity of contribution being the assumption that most often fails.",
  ],
  knowledgeDiagnostic: [
    { q: "When is linear programming needed rather than limiting factor analysis?", a: "When two or more resources bind simultaneously, since a single ranking cannot satisfy both." },
    { q: "Why is the objective function contribution rather than profit?", a: "Because fixed costs do not vary with the production mix, so including them cannot change which mix is best." },
    { q: "How should the optimal coordinates be obtained?", a: "By solving the two binding constraints simultaneously, not by reading them off the graph." },
    { q: "What does it mean if the iso-contribution line is parallel to a binding constraint?", a: "There are multiple optimal solutions — every mix along that edge gives the same contribution." },
  ],
}

/* ── Chapter 16 · C3(e) ───────────────────────────────────────── */

export const PM_TREE_16: StudyChapter = {
  id: "PM-16",
  number: 16,
  paper: "PM",
  area: "C",
  title: "Shadow prices and slack",
  minutes: 17,
  syllabusRefs: ["C3(e)"],
  intro:
    "The optimal plan is only half the answer. The more useful half is what one more hour of the binding resource is worth — because that tells management what to pay for extra capacity, and where paying anything at all is wasted.",
  outcomes: [
    "Define a shadow price and explain what it measures",
    "Calculate the shadow price of a binding constraint",
    "Explain and calculate slack, and its implication",
    "Explain the range over which a shadow price holds",
    "Use shadow prices to advise on paying for extra resource",
  ],
  sections: [
    {
      id: "shadow-prices",
      heading: "What a shadow price is, and how to find it",
      blocks: [
        {
          kind: "definition",
          term: "Shadow price (dual price)",
          md: "The **increase in contribution** that results from having **one more unit** of a binding constraint. It is the maximum **premium over the normal purchase cost** that is worth paying for an extra unit of that resource — because the normal cost is already deducted in arriving at contribution.",
        },
        {
          kind: "formula",
          name: "Calculating a shadow price",
          expr: "1.  Increase the binding constraint's availability by ONE unit\n2.  Re-solve the binding constraints simultaneously for the new optimum\n3.  Recompute total contribution\n\nShadow price  =  New contribution  −  Original contribution",
          note: "Only BINDING constraints have a shadow price. A constraint with slack has a shadow price of NIL, because more of a resource already in surplus adds nothing. Note also that the answer is a PREMIUM: if the shadow price of a labour hour is £7 and labour normally costs £14 an hour, the business should pay up to £21 for an extra hour, not £7.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The premium point is where most marks are lost",
          md: "A shadow price is calculated from **contribution**, and contribution has already had the normal cost of the resource deducted. So a shadow price of £7 per labour hour means an extra hour generates £7 of contribution **after** paying the usual £14 wage — and the business is therefore no worse off paying up to **£21** for it. Answering \"we should pay up to £7 an hour\" understates the maximum by the whole normal rate, and it is the single most common error in the topic.",
        },
        {
          kind: "example",
          title: "Computing shadow prices and slack",
          scenario:
            "Continuing Wexcombe Ltd from chapter 15: the optimum was 150 Standard and 100 Deluxe with contribution £12,000, from constraints 2S + 5D ≤ 800 machine hours and 4S + 3D ≤ 900 labour hours, plus S ≤ 250 and D ≥ 50. Standard earns £40 and Deluxe £60. Machine time normally costs £11 an hour and labour £14 an hour. A supplier offers 40 extra machine hours at £19 an hour, and a temporary agency offers 60 labour hours at £24 an hour.",
          steps: [
            { label: "Shadow price of machine hours", detail: "Re-solve with 801 machine hours: 2S + 5D = 801 and 4S + 3D = 900. Multiply the first by 2: 4S + 10D = 1,602. Subtract: 7D = 702, so D = 100.2857. Then 2S = 801 − 5(100.2857) = 299.5714, S = 149.7857. New contribution = (149.7857 × £40) + (100.2857 × £60) = £5,991.43 + £6,017.14 = £12,008.57. Shadow price = £8.57 per machine hour." },
            { label: "Shadow price of labour hours", detail: "Re-solve with 901 labour hours: 2S + 5D = 800 and 4S + 3D = 901. Multiply the first by 2: 4S + 10D = 1,600. Subtract: 7D = 699, so D = 99.8571. Then 2S = 800 − 5(99.8571) = 300.7143, S = 150.3571. New contribution = (150.3571 × £40) + (99.8571 × £60) = £6,014.29 + £5,991.43 = £12,005.71. Shadow price = £5.71 per labour hour. Note the two are NOT equal — machine hours are the scarcer resource here, and each constraint has its own value." },
            { label: "Shadow price of the non-binding constraints", detail: "S ≤ 250 has SLACK of 250 − 150 = 100 units, and D ≥ 50 has slack of 100 − 50 = 50 units. Both shadow prices are NIL — relaxing a constraint that is not binding cannot improve contribution, so paying for more demand headroom would be money wasted." },
            { label: "Advise on the machine hours offer", detail: "The maximum worth paying is the shadow price PLUS the normal cost: £8.57 + £11 = £19.57 an hour. The offer is £19, which is BELOW that, so ACCEPT — each hour bought generates £0.57 more contribution than it costs." },
            { label: "Advise on the labour offer", detail: "Maximum = £5.71 + £14 = £19.71 an hour. The agency wants £24, so REJECT — £4.29 an hour more than the contribution it would generate. Had it asked £18, it would have been worth taking at £1.71 an hour." },
            { label: "Note the limit on how far these figures apply", detail: "Both shadow prices hold only while the SAME two constraints bind. Add enough machine hours and eventually the S ≤ 250 demand limit binds instead, at which point the machine-hour shadow price falls — so the 40-hour offer should strictly be checked against the range rather than appraised on the one-unit figure alone." },
          ],
          result:
            "Machine hours **£8.57**, labour hours **£5.71**, and **nil** for the two slack constraints — so the machine offer at £19 is **accepted** against a maximum of £19.57, and the labour offer at £24 is **rejected** against £19.71. Two points do the work: the shadow prices are **not equal**, and each maximum is the shadow price **plus the normal cost** — quoting £8.57 as the ceiling would have wrongly rejected a worthwhile offer.",
        },
      ],
      check: {
        q: "The shadow price of a labour hour is £8 and labour normally costs £15 an hour. What is the most worth paying for an extra hour?",
        options: ["£8", "£15", "£23", "£7"],
        correct: 2,
        explain:
          "£23. The shadow price is the extra CONTRIBUTION generated, and contribution is already net of the normal £15 wage — so the business is no worse off paying £15 + £8 = £23. Answering £8 understates the maximum by the whole normal rate, which is the topic's most common error.",
      },
    },
    {
      id: "slack-and-range",
      heading: "Slack, and the range over which the answer holds",
      blocks: [
        {
          kind: "definition",
          term: "Slack",
          md: "The amount of a resource **left unused** at the optimum. A constraint with slack is **not binding**, so it is not limiting contribution and its shadow price is **nil**. Slack on a **minimum** constraint is the amount by which the solution exceeds the required floor.",
        },
        {
          kind: "table",
          caption: "Binding and slack constraints compared",
          head: ["", "Binding", "Slack"],
          rows: [
            ["**Resource use at the optimum**", "Fully used", "Partly used"],
            ["**Shadow price**", "**Positive** — more of it increases contribution", "**Nil** — more of it changes nothing"],
            ["**Management implication**", "Worth paying a premium for extra; the place to invest capacity", "No value in buying more; spending here is wasted"],
            ["**Appears in the solution as**", "An equality at the optimum", "A quantity of unused resource"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A shadow price applies only over a range",
          md: "The calculation adds **one** unit, so the answer is strictly a **marginal** figure. As more of the resource is added the optimum moves along the constraint until a **different** constraint becomes binding — at which point the shadow price changes, usually falling. So a shadow price cannot simply be multiplied by a large quantity: appraising an offer of 500 extra hours at the one-unit shadow price will overstate the benefit. In an exam, computing the shadow price and then **noting that it holds only until another constraint binds** is what distinguishes a complete answer.",
        },
        {
          kind: "list",
          title: "How management should use these figures",
          items: [
            "**Direct capacity investment at the binding constraints**, because those are the only places extra capacity pays.",
            "**Set a maximum price for extra resource** — shadow price plus normal cost — and use it to appraise overtime, agency labour, subcontracting and supplier offers.",
            "**Stop spending on slack resources.** A common error is investing in a bottleneck that was never binding, which is also the theory of constraints point from chapter 8.",
            "**Recognise that relieving one constraint moves the problem**, so a plan to expand capacity needs to know which constraint becomes binding next.",
            "**Treat the shadow price as the internal value of the resource** — useful for transfer pricing (chapter 32) and for deciding which orders to accept.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "How this connects to chapter 14",
          md: "Chapter 14's rule — that extra capacity is worth the **marginal product's contribution per unit of the scarce resource** — is the single-constraint case of a shadow price, and gives the same answer. With one constraint the shadow price is simply the contribution per hour of whatever is being made last; with two, the resource's value is shared between them and must be found by re-solving. So the two chapters are one idea at two levels of difficulty, and the **premium over normal cost** point applies equally to both.",
        },
      ],
      check: {
        q: "A constraint has 120 units of slack at the optimum. What is its shadow price, and what follows?",
        options: [
          "Positive, so extra units are worth buying",
          "Nil — the resource is not limiting contribution, so buying more adds nothing",
          "Equal to the resource's normal cost",
          "Cannot be determined without re-solving",
        ],
        correct: 1,
        explain:
          "NIL. Slack means the resource is not fully used, so it is not limiting contribution and more of it changes nothing. Investing capacity in a resource that is not binding is the classic waste — the same point the theory of constraints makes about non-bottleneck processes.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Quoting the shadow price as the maximum payable.",
      fix: "It is a PREMIUM over the normal cost, because contribution is already net of that cost.",
    },
    {
      trap: "Giving a slack constraint a positive shadow price.",
      fix: "Only binding constraints have one. Slack means nil.",
    },
    {
      trap: "Multiplying a shadow price by a large quantity.",
      fix: "It is a marginal figure holding only until another constraint binds.",
    },
    {
      trap: "Investing capacity in a resource that was not binding.",
      fix: "Direct investment at the binding constraints, and check which becomes binding next.",
    },
  ],
  keyTerms: [
    { term: "Shadow price", def: "The extra contribution from one more unit of a binding constraint — a premium over its normal cost." },
    { term: "Slack", def: "Resource left unused at the optimum; a slack constraint has a nil shadow price." },
    { term: "Binding constraint", def: "One fully used at the optimum, and therefore the only kind worth relieving." },
    { term: "Marginal figure", def: "A value valid for one additional unit, holding only until a different constraint becomes binding." },
  ],
  summary: [
    "A shadow price is the extra contribution from one more unit of a binding constraint.",
    "It is a premium over normal cost, so the maximum payable is shadow price plus normal cost.",
    "Slack constraints have a nil shadow price, so buying more of a non-binding resource is wasted.",
    "Shadow prices are marginal and hold only until another constraint binds.",
    "Chapter 14's rule is the single-constraint case of the same idea.",
  ],
  knowledgeDiagnostic: [
    { q: "How is a shadow price calculated?", a: "Add one unit to the binding constraint, re-solve the binding constraints simultaneously, and take the increase in total contribution." },
    { q: "What is the maximum worth paying for an extra unit of a binding resource?", a: "The shadow price plus the resource's normal cost, because contribution is already net of that cost." },
    { q: "Why is a slack constraint's shadow price nil?", a: "Because the resource is not fully used, so it is not limiting contribution and more of it changes nothing." },
    { q: "Why can a shadow price not be applied to a large quantity?", a: "It is marginal: as the resource is added the optimum moves until another constraint binds, at which point the shadow price changes." },
  ],
}

export const PM_TREE_AREA_C_PART3: StudyChapter[] = [PM_TREE_15, PM_TREE_16]
