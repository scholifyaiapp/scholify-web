/*
 * MA Area B — Data analysis and statistical techniques.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * This is the most computational area in MA and its distractors are almost all
 * ARITHMETIC: the figure you get from inverting a fraction, from using the wrong
 * denominator, from applying a seasonal adjustment the wrong way round, or from
 * stopping one step early. Where that is so the plan names which wrong answer
 * each option is — recognising your own slip in an option list is what stops it
 * recurring, and on a 2-mark OT with no method marks it is the only defence.
 *
 * The formulae sheet is provided in the real exam. The marks are for knowing
 * WHEN to use each formula, which is why these plans spend their first step on
 * identifying the technique rather than on recalling it.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const MA_PLANS_B: ExamPlanMap = {
  /* ── MA-05 · Sampling methods ────────────────────────────────── */

  "MA-05::why-sample": {
    title: "Why a sample is used, and what it costs you",
    format: "ot",
    marks: 2,
    requirement:
      "A company tests a sample of its output rather than every unit. The principal reason is that:\n\nA  A sample always gives a more accurate result than testing everything\nB  Testing every unit would be too costly and, where testing is destructive, impossible\nC  Sampling eliminates the risk of drawing a wrong conclusion\nD  Statistical techniques cannot be applied to a whole population",
    plan: [
      {
        step: "Name the two genuine reasons for sampling",
        detail:
          "Cost and time, and the fact that some testing destroys the item — you cannot test every fuse to destruction and still have fuses to sell.",
      },
      {
        step: "Reject the option claiming a sample is more accurate",
        detail:
          "A census is more accurate, not less. Sampling is a trade: precision given up in exchange for cost and feasibility, and any option denying that trade is wrong.",
      },
      {
        step: "Reject the option removing risk",
        detail:
          "Sampling INTRODUCES sampling risk — the chance that the sample is unrepresentative. Reducing it is what sample design is for; eliminating it is impossible short of testing everything.",
      },
      {
        step: "Reject the false technical claim",
        detail:
          "Statistical techniques apply perfectly well to a population. The point of the statistics is to say what a sample implies about the population it came from.",
      },
    ],
    answer:
      "**B — testing every unit would be too costly and, where testing is destructive, impossible.**\n\nSampling is a trade. It gives up some precision in exchange for cost, speed and — where testing destroys the item — feasibility at all.\n\nA inverts the trade: a census is more accurate. C inverts it too — sampling **introduces** sampling risk, the chance that the sample is not representative, and good design reduces that risk without removing it. D is simply false; statistical technique is what lets a sample say something about the population it came from.",
    earns: ["Framing sampling as a trade-off rather than as a free improvement"],
    loses: ["Choosing an option that claims sampling removes rather than introduces risk"],
  },

  "MA-05::methods": {
    title: "Identifying the sampling method from how items were chosen",
    format: "ot",
    marks: 2,
    requirement:
      "A quality inspector selects every 50th unit coming off a production line. This is:\n\nA  Random sampling\nB  Systematic sampling\nC  Stratified sampling\nD  Quota sampling",
    plan: [
      {
        step: "Define each method by the selection rule",
        detail:
          "Random: every item has an equal chance. Systematic: every nth item after a random start. Stratified: the population is split into groups and each group sampled in proportion. Quota: interviewers fill preset category counts, non-randomly.",
      },
      {
        step: "Read the stem for the rule used",
        detail:
          "\"Every 50th unit\" is a fixed interval, which is systematic sampling and nothing else. The rule is stated outright.",
      },
      {
        step: "Explain why it is not random",
        detail:
          "Once the start is chosen, every subsequent selection is determined. Items in the wrong position have no chance of selection at all, so the equal-chance condition fails.",
      },
      {
        step: "Know the specific danger, since it is the follow-on",
        detail:
          "Systematic sampling fails if the population has a cycle matching the interval — if every 50th unit comes off the same machine head, the sample measures one head rather than the process.",
      },
    ],
    answer:
      "**B — systematic sampling.**\n\nSelection at a fixed interval — every nth item after a random start — is systematic sampling. It is quick and easy to administer, which is why it is used on production lines.\n\nIt is **not** random: once the start is fixed, every later selection is determined, and items in the wrong position cannot be selected at all.\n\nIts characteristic danger is **periodicity**: if the population contains a cycle matching the interval, the sample measures the cycle rather than the process. Every 50th unit coming from the same machine head would tell you about that head and nothing about the others.",
    earns: ["Naming the periodicity risk, which is what makes the method examinable"],
    loses: ["Calling a fixed-interval selection random because the starting point was random"],
  },

  /* ── MA-06 · Summarising and analysing data ──────────────────── */

  "MA-06::big-data": {
    title: "What big data changes for the management accountant",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **not** one of the characteristics commonly used to define big data?\n\nA  Volume\nB  Velocity\nC  Variety\nD  Verification",
    plan: [
      {
        step: "List the Vs before reading the options",
        detail:
          "Volume, velocity and variety are the three. Veracity is the usual fourth and value the usual fifth. All begin with V, and that is exactly what the question exploits.",
      },
      {
        step: "Define each so a near-miss cannot slip through",
        detail:
          "Volume: the quantity. Velocity: the speed of arrival and required processing. Variety: the range of structured and unstructured forms. Veracity: whether it can be trusted.",
      },
      {
        step: "Test the fourth option against those definitions",
        detail:
          "Verification is an activity you perform on data. Veracity is a property the data has. The option substitutes an action for a characteristic, which is the trick.",
      },
      {
        step: "Be ready for the management accounting angle",
        detail:
          "The follow-on asks what big data enables — more granular cost drivers, faster forecasting, non-financial performance measures — and what it risks, which is overload and poor-quality input.",
      },
    ],
    answer:
      "**D — verification.**\n\nThe three Vs are **volume**, **velocity** and **variety**, with **veracity** the usual fourth and **value** the usual fifth.\n\nVerification is close enough to veracity to pass unexamined, and the difference is the whole question: veracity is a **property** the data has, verification is an **activity** performed on it.\n\nFor the management accountant the significance is that more granular data supports better cost drivers, faster forecasting and richer non-financial measures — at the cost of overload and of decisions built on poor-quality input.",
    earns: ["Separating a property of the data from an activity performed on it"],
    loses: ["Accepting any V-word as one of the characteristics"],
  },

  "MA-06::data-types": {
    title: "Classifying data as discrete or continuous",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is an example of **continuous** data?\n\nA  The number of units rejected by quality control\nB  The number of employees in a department\nC  The time taken to complete a machining operation\nD  The number of orders received in a day",
    plan: [
      {
        step: "State the test as a question about intermediate values",
        detail:
          "Continuous data can take any value in a range, including fractions, and is measured. Discrete data can only take separate values, usually whole numbers, and is counted.",
      },
      {
        step: "Apply the counted-or-measured test to each option",
        detail:
          "Rejected units, employees and orders are all counted, and none can sensibly be a fraction. Time is measured and can take any value — 4.37 minutes is meaningful.",
      },
      {
        step: "Check the awkward case deliberately",
        detail:
          "\"Half an employee\" is meaningless as a count even where part-time working exists, because the variable being counted is people. Ask whether the intermediate value has meaning, not whether it can be written down.",
      },
      {
        step: "Note where the distinction bites",
        detail:
          "It determines which chart and which statistical treatment apply — histograms and the normal distribution assume continuous data, which is why the classification appears before the distribution work.",
      },
    ],
    answer:
      "**C — the time taken to complete a machining operation.**\n\nContinuous data is **measured** and can take any value within a range, so 4.37 minutes is a meaningful reading. Discrete data is **counted** and takes separate values only.\n\nRejected units, employees and orders are all counts, and an intermediate value has no meaning for any of them — half a rejected unit is not a thing that occurs.\n\nThe distinction matters because it determines the treatment: histograms and the normal distribution assume continuous data, which is why this classification is taught immediately before them.",
    earns: ["Asking whether an intermediate value would be meaningful, not merely writable"],
    loses: ["Classifying by whether the figures happen to be whole numbers in the data given"],
  },

  "MA-06::averages": {
    title: "Choosing the average the distribution calls for",
    format: "ot",
    marks: 2,
    requirement:
      "Seven employees earn the following weekly wages: $400, $410, $420, $430, $440, $450 and $2,000. Which average best represents the typical wage?\n\nA  The mean, because it uses every value\nB  The median, because it is not distorted by the extreme value\nC  The mode, because it is the most common value\nD  The mean, because the data is numerical",
    plan: [
      {
        step: "Scan the data for an outlier before doing anything",
        detail:
          "Six values between $400 and $450, then one at $2,000. That gap is the whole question — the examiner has constructed the data so that one value dominates.",
      },
      {
        step: "Work out what the outlier does to the mean",
        detail:
          "Total is $4,550, so the mean is $650. No employee earns anywhere near $650: six earn far less and one far more. A statistic representing nobody is not a good representation.",
      },
      {
        step: "Find the median and compare",
        detail:
          "Seven values in order, so the median is the fourth: $430. That sits inside the cluster where six of the seven employees are, which is what \"typical\" means.",
      },
      {
        step: "Rule out the mode on the data given",
        detail:
          "Every value occurs once, so there is no mode at all. The mode is useful for categorical data, not for a set of distinct values.",
      },
    ],
    answer:
      "**B — the median, because it is not distorted by the extreme value.**\n\nThe mean is $4,550 ÷ 7 = **$650**, and no employee earns near it: six earn between $400 and $450, and one earns $2,000. An average that represents nobody in the data is not representing the data.\n\nThe median is the fourth of seven ordered values, **$430**, which sits inside the cluster where six of the seven employees actually are.\n\nThere is no mode here — every value occurs once. The general rule is that the mean uses all the data and is therefore vulnerable to outliers, while the median is resistant to them and ignores the size of the values at the extremes.",
    earns: [
      "Scanning for an outlier before choosing a measure",
      "Computing the mean to show it represents nobody, rather than asserting it is distorted",
    ],
    loses: ["Choosing the mean by default because it uses every value"],
  },

  "MA-06::dispersion": {
    title: "Comparing variability between two data sets",
    format: "ot",
    marks: 2,
    requirement:
      "Machine A produces output with a mean weight of 500g and a standard deviation of 20g. Machine B has a mean weight of 100g and a standard deviation of 8g. Which machine has the greater **relative** variability?\n\nA  Machine A, because its standard deviation is larger\nB  Machine B, because its coefficient of variation is higher\nC  They are identical\nD  It cannot be determined without the sample sizes",
    plan: [
      {
        step: "Notice the word \"relative\", which changes the measure",
        detail:
          "Absolute variability is the standard deviation. RELATIVE variability compares the spread to the size of what is being measured, and that is the coefficient of variation.",
      },
      {
        step: "Write the formula before computing",
        detail:
          "Coefficient of variation = standard deviation ÷ mean, usually expressed as a percentage. It exists precisely so that data sets on different scales can be compared.",
      },
      {
        step: "Compute both and compare",
        detail:
          "Machine A: 20 ÷ 500 = 4%. Machine B: 8 ÷ 100 = 8%. B has twice the relative variability despite having the smaller standard deviation in absolute terms.",
      },
      {
        step: "See why option A is the constructed trap",
        detail:
          "A is correct about absolute spread and answers the wrong question. The question was made to reward reading the word \"relative\", and A is the answer for anyone who skipped it.",
      },
    ],
    answer:
      "**B — Machine B, because its coefficient of variation is higher.**\n\nThe **coefficient of variation** is standard deviation ÷ mean, and it exists to compare variability across data sets of different scale.\n\nMachine A: 20 ÷ 500 = **4%**. Machine B: 8 ÷ 100 = **8%**. Machine B's output varies twice as much relative to its size, even though its standard deviation is smaller in absolute terms.\n\nOption A is true of absolute spread and answers a different question. The whole point of the question is the word **relative**, and A is the answer waiting for anyone who read past it.",
    earns: [
      "Reading \"relative\" as a signal to switch from standard deviation to coefficient of variation",
      "Computing both percentages rather than reasoning about which looks bigger",
    ],
    loses: ["Comparing standard deviations directly when the means are on different scales"],
  },

  "MA-06::expected-values": {
    title: "Computing an expected value and knowing what it means",
    format: "ot",
    marks: 2,
    requirement:
      "A project will produce a profit of $50,000 with probability 0.3, $30,000 with probability 0.5, and a loss of $10,000 with probability 0.2. The expected value of the profit is:\n\nA  $23,500\nB  $28,000\nC  $30,000\nD  $35,000",
    plan: [
      {
        step: "Check the probabilities sum to 1 before computing",
        detail:
          "0.3 + 0.5 + 0.2 = 1.0. If they did not sum to 1 a value would be missing, and this five-second check catches a misread stem before it costs the whole answer.",
      },
      {
        step: "Multiply each outcome by its probability, keeping the signs",
        detail:
          "50,000 × 0.3 = 15,000. 30,000 × 0.5 = 15,000. −10,000 × 0.2 = −2,000. The loss must enter as a negative, and dropping the sign is the single most common error here.",
      },
      {
        step: "Sum, and identify which option each slip produces",
        detail:
          "15,000 + 15,000 − 2,000 = $28,000. Treating the loss as positive gives $32,000; ignoring it entirely gives $30,000, which is option C.",
      },
      {
        step: "State what the figure is and is not",
        detail:
          "It is a long-run average over many repetitions. This project will return $50,000, $30,000 or −$10,000 — never $28,000 — so an expected value is a poor guide for a one-off decision.",
      },
    ],
    answer:
      "**B — $28,000.**\n\n(50,000 × 0.3) + (30,000 × 0.5) + (−10,000 × 0.2) = 15,000 + 15,000 − 2,000 = **$28,000**.\n\nThe probabilities sum to 1.0, so nothing is missing. The loss enters as a **negative** — treating it as positive gives $32,000, and ignoring it gives $30,000, which is why option C is offered.\n\nWhat the figure means matters as much as the arithmetic. An expected value is a long-run average across many repetitions. This project will return $50,000, $30,000 or a $10,000 loss and never $28,000, so for a one-off decision the expected value ignores both the range of outcomes and the decision-maker's attitude to risk.",
    earns: [
      "Checking the probabilities sum to 1 as a stem-misread check",
      "Carrying the loss through as a negative",
      "Knowing the expected value is never itself an outcome of a one-off project",
    ],
    loses: ["Adding the loss as a positive, or omitting it because it is not a profit"],
  },

  "MA-06::normal-distribution": {
    title: "Using the normal distribution and its standard proportions",
    format: "ot",
    marks: 2,
    requirement:
      "The weight of a component is normally distributed with a mean of 200g and a standard deviation of 5g. Approximately what proportion of components weigh between 195g and 205g?\n\nA  50%\nB  68%\nC  95%\nD  99.7%",
    plan: [
      {
        step: "Convert the limits into standard deviations from the mean",
        detail:
          "195g is 5g below 200g and 205g is 5g above. The standard deviation is 5g, so the range is exactly one standard deviation either side — mean ± 1σ.",
      },
      {
        step: "Recall the standard proportions",
        detail:
          "Approximately 68% lies within ±1 standard deviation, 95% within ±2, and 99.7% within ±3. Each option in the list corresponds to one of these, plus 50% for the half-distribution.",
      },
      {
        step: "Match the converted range to its proportion",
        detail:
          "±1σ gives approximately 68%, so option B. The conversion step is the entire question — done properly, the recall is immediate.",
      },
      {
        step: "See which slip each distractor represents",
        detail:
          "95% is the answer for anyone who read the range as ±2σ. 50% is the proportion above or below the mean alone. 99.7% is ±3σ. Every option is a specific, identifiable error.",
      },
    ],
    answer:
      "**B — approximately 68%.**\n\n195g and 205g are each 5g from the mean of 200g, and the standard deviation is 5g, so the range is **mean ± 1 standard deviation**.\n\nThe standard proportions are approximately **68%** within ±1σ, **95%** within ±2σ and **99.7%** within ±3σ.\n\nEvery distractor is a specific slip: 95% comes from reading the range as ±2σ, 99.7% from ±3σ, and 50% is the proportion lying on one side of the mean alone. Converting the limits into standard deviations before recalling anything is what makes the question a five-second one.",
    earns: ["Converting the stated limits into standard deviations before recalling proportions"],
    loses: ["Reaching for 95% because it is the most familiar figure in the set"],
  },

  /* ── MA-07 · Separating and forecasting costs ────────────────── */

  "MA-07::linear-function": {
    title: "Reading the two parts of a linear cost function",
    format: "ot",
    marks: 2,
    requirement:
      "A company's total cost is described by y = 12,000 + 4x, where x is units produced. Which of the following is correct?\n\nA  Fixed cost is $4 and variable cost is $12,000 per unit\nB  Fixed cost is $12,000 and variable cost is $4 per unit\nC  Total cost per unit is $12,004\nD  Fixed cost per unit is $12,000 at every level of output",
    plan: [
      {
        step: "Map the equation onto the cost structure",
        detail:
          "In y = a + bx, a is the constant — total fixed cost — and b is the slope, the variable cost per unit. y is total cost and x is activity.",
      },
      {
        step: "Read the two coefficients off directly",
        detail:
          "a = 12,000 so fixed cost is $12,000 in total. b = 4 so variable cost is $4 per unit. The equation states both, and the question is whether they are read the right way round.",
      },
      {
        step: "Reject the inversion",
        detail:
          "A swaps them, which is the answer of anyone who matched the larger number to the per-unit figure. Sanity-check it: $12,000 per unit against a $12,000 total fixed cost is implausible on its face.",
      },
      {
        step: "Reject the two per-unit confusions",
        detail:
          "C adds a total to a per-unit figure, which is not a meaningful quantity. D says fixed cost per unit is constant, but total fixed cost is constant — per unit it falls as output rises.",
      },
    ],
    answer:
      "**B — fixed cost is $12,000 and variable cost is $4 per unit.**\n\nIn y = a + bx, the constant **a** is total fixed cost and the coefficient **b** is variable cost per unit. So $12,000 is a total and $4 is per unit.\n\nOption A inverts them. Option C adds a total to a per-unit rate, which is not a meaningful figure. Option D confuses total with per unit: **total** fixed cost is constant, so fixed cost **per unit** falls as output rises — which is precisely why fixed cost per unit is never a safe figure to use in a decision.",
    earns: ["Reading a as a total and b as a rate, and sanity-checking the magnitudes"],
    loses: ["Matching the larger number to the per-unit figure"],
  },

  "MA-07::high-low": {
    title: "Separating fixed and variable cost with high/low",
    format: "ot",
    marks: 2,
    requirement:
      "At 4,000 units total cost is $34,000; at 9,000 units total cost is $54,000. Using high/low analysis, the total fixed cost is:\n\nA  $6,000\nB  $14,000\nC  $18,000\nD  $20,000",
    plan: [
      {
        step: "Take the difference in cost over the difference in activity",
        detail:
          "Costs differ by 54,000 − 34,000 = $20,000. Activity differs by 9,000 − 4,000 = 5,000 units. Only the variable element can have caused the change, because fixed cost is the same at both levels.",
      },
      {
        step: "Compute variable cost per unit",
        detail:
          "$20,000 ÷ 5,000 = $4 per unit. Inverting this division is the classic slip and gives 0.25, which then propagates through everything that follows.",
      },
      {
        step: "Substitute back at either level to find fixed cost",
        detail:
          "At 4,000 units: variable cost is 4,000 × $4 = $16,000. Fixed cost = $34,000 − $16,000 = **$18,000**.",
      },
      {
        step: "Verify at the other level — this is free and catches everything",
        detail:
          "At 9,000 units: 9,000 × $4 = $36,000 variable, plus $18,000 fixed = $54,000, which matches the stem. Any arithmetic error shows up immediately here.",
      },
    ],
    answer:
      "**C — $18,000.**\n\nCost difference $20,000 ÷ activity difference 5,000 units = **$4 variable cost per unit**.\n\nAt 4,000 units: variable cost 4,000 × $4 = $16,000, so fixed cost = $34,000 − $16,000 = **$18,000**.\n\nCheck at 9,000 units: (9,000 × $4) + $18,000 = $36,000 + $18,000 = $54,000 ✓.\n\nOption D is the total cost difference mistaken for fixed cost, and option A is 4,000 × $4 subtracted from the wrong figure. Always substitute back at the OTHER level — it costs seconds and catches every arithmetic slip.",
    earns: [
      "Dividing cost difference by activity difference in the right order",
      "Substituting back at the second level as a free check",
    ],
    loses: ["Inverting the division, which corrupts every figure that follows"],
  },

  "MA-07::scatter-correlation": {
    title: "Interpreting a correlation coefficient",
    format: "ot",
    marks: 2,
    requirement:
      "The correlation coefficient between machine hours and maintenance cost is −0.15. This indicates:\n\nA  A strong negative relationship\nB  A weak negative relationship\nC  A strong positive relationship\nD  No relationship whatever",
    plan: [
      {
        step: "Read the sign and the magnitude as two separate facts",
        detail:
          "The sign gives the DIRECTION — negative means the variables move opposite ways. The magnitude gives the STRENGTH, on a scale from 0 to 1 in absolute terms.",
      },
      {
        step: "Place the magnitude on the scale",
        detail:
          "r runs from −1 to +1. An absolute value of 0.15 is close to zero, so the relationship is weak. Values near ±1 are strong; near 0 are weak.",
      },
      {
        step: "Combine, and reject the absolute option",
        detail:
          "Weak and negative gives B. D is wrong because r is not zero — there is some relationship, merely a weak one, and \"no relationship whatever\" would require r = 0.",
      },
      {
        step: "Note the coefficient of determination, which is the follow-on",
        detail:
          "r² = 0.0225, so about 2% of the variation in maintenance cost is explained by machine hours. That is the figure that makes the weakness concrete.",
      },
    ],
    answer:
      "**B — a weak negative relationship.**\n\nRead the sign and the magnitude separately. The **sign** is negative, so the variables move in opposite directions. The **magnitude**, 0.15, sits close to zero on a scale running to 1, so the relationship is weak.\n\nD overreaches: r is not zero, so a relationship exists, however slight.\n\nThe figure that makes this concrete is the coefficient of determination, **r² = 0.0225** — about 2% of the variation in maintenance cost is explained by machine hours. A cost forecast built on this relationship would be worthless, which is the practical conclusion the examiner is after.",
    earns: [
      "Separating direction from strength",
      "Quoting r² to express how little is actually explained",
    ],
    loses: ["Reading a negative sign as a strong relationship in the opposite direction"],
  },

  "MA-07::regression": {
    title: "Using a regression equation to forecast, and knowing its limits",
    format: "ot",
    marks: 2,
    requirement:
      "The regression equation for total cost is y = 8,000 + 6x, derived from monthly data ranging from 1,000 to 5,000 units. Which forecast is **least** reliable?\n\nA  Total cost at 2,000 units\nB  Total cost at 4,500 units\nC  Total cost at 12,000 units\nD  Total cost at 3,000 units",
    plan: [
      {
        step: "Identify the range the equation was built from",
        detail:
          "1,000 to 5,000 units. The relationship is only evidenced within that range, because that is the only region where data was observed.",
      },
      {
        step: "Name the two kinds of forecast",
        detail:
          "Interpolation is forecasting inside the observed range and is reasonably reliable. Extrapolation is forecasting outside it and assumes the relationship continues where nothing was measured.",
      },
      {
        step: "Test each option against the range",
        detail:
          "2,000, 4,500 and 3,000 units are all inside 1,000–5,000. Only 12,000 units is outside, and it is more than double the highest observation.",
      },
      {
        step: "Say why the relationship would break",
        detail:
          "At 12,000 units the company would need extra machines, extra supervision and probably extra premises — so fixed costs step up and the linear equation no longer describes the cost structure.",
      },
    ],
    answer:
      "**C — total cost at 12,000 units.**\n\nThe equation was derived from data between 1,000 and 5,000 units, so the relationship is only evidenced there. Forecasting inside that range is **interpolation** and is reasonably reliable; forecasting outside it is **extrapolation** and assumes a relationship continues where nothing was ever measured.\n\n12,000 units is more than double the highest observation, and at that volume the company would need more machines, more supervision and probably more space. Fixed costs would step up and the linear equation would no longer describe the cost structure at all.\n\nThe other assumptions worth naming are that the relationship is genuinely linear and that conditions are unchanged since the data was collected.",
    earns: [
      "Naming extrapolation and saying what specifically would break",
      "Checking every option against the observed range rather than only the extreme one",
    ],
    loses: ["Choosing a value near the edge of the range, which is still interpolation"],
  },

  "MA-07::price-adjustment": {
    title: "Deflating a cost series so the comparison is real",
    format: "ot",
    marks: 2,
    requirement:
      "Material cost in 20X5 was $63,000 when the price index stood at 126. Restated at the 20X1 price level, when the index was 100, the cost is:\n\nA  $50,000\nB  $63,000\nC  $79,380\nD  $126,000",
    plan: [
      {
        step: "Decide the direction before touching the numbers",
        detail:
          "Restating a later, higher-price figure at an earlier, lower price level must make it SMALLER. Fixing the direction first means an answer above $63,000 can be rejected on sight.",
      },
      {
        step: "Write the adjustment as a fraction of indices",
        detail:
          "Multiply by the index of the year you are converting TO, over the index of the year you are converting FROM: 63,000 × (100 ÷ 126).",
      },
      {
        step: "Compute and check against the direction",
        detail:
          "63,000 × 100 ÷ 126 = **$50,000**, which is smaller than $63,000 as required. The direction check and the arithmetic agree.",
      },
      {
        step: "Identify the inverted answer in the option list",
        detail:
          "63,000 × 126 ÷ 100 = $79,380, which is option C. It is the answer of anyone who wrote the fraction upside down, and the direction check would have caught it.",
      },
    ],
    answer:
      "**A — $50,000.**\n\n$63,000 × (100 ÷ 126) = **$50,000**.\n\nMultiply by the index of the year you are converting **to**, over the index of the year you are converting **from**. Prices in 20X5 were 26% higher than in 20X1, so the same real cost expressed at 20X1 prices must be lower.\n\nOption C, $79,380, is the fraction inverted — and the one-second direction check kills it before any arithmetic is done. This adjustment is what makes a multi-year cost comparison meaningful: without it, a rising cost series may be showing inflation rather than any change in efficiency.",
    earns: [
      "Fixing the direction of the adjustment before computing",
      "Explaining why the deflated series is the one that supports a real comparison",
    ],
    loses: ["Inverting the index fraction, which the direction check exists to prevent"],
  },

  /* ── MA-08 · Time series, index numbers, product life cycle ──── */

  "MA-08::components": {
    title: "Naming the component of a time series",
    format: "ot",
    marks: 2,
    requirement:
      "Ice cream sales are consistently higher in each summer quarter and lower in each winter quarter. This pattern is an example of:\n\nA  The trend\nB  Seasonal variation\nC  Cyclical variation\nD  Random variation",
    plan: [
      {
        step: "Define the four components by their time scale",
        detail:
          "Trend: the long-term direction. Seasonal: a regular pattern completing within a year. Cyclical: a longer wave over several years, usually the business cycle. Random: irregular and unpredictable.",
      },
      {
        step: "Read the stem for regularity and for period",
        detail:
          "The pattern repeats every year and is described as consistent. Both facts point at seasonal, and the annual period is the distinguishing feature.",
      },
      {
        step: "Split seasonal from cyclical on length",
        detail:
          "This is where marks go. Seasonal completes within a year; cyclical runs over several years. A recession affecting sales for three years would be cyclical.",
      },
      {
        step: "Rule out trend and random",
        detail:
          "Trend is the underlying direction with the ups and downs removed. Random variation is by definition not consistent, and the stem says the pattern is.",
      },
    ],
    answer:
      "**B — seasonal variation.**\n\nA time series has four components: the **trend** (long-term direction), **seasonal** variation (a regular pattern completing within a year), **cyclical** variation (a longer wave over several years, usually the business cycle) and **random** variation (irregular and unpredictable).\n\nThe distinguishing feature here is the annual period. A pattern completing within a year is seasonal; one running over several years — a recession depressing sales for three years — is cyclical.\n\nThe trend is what remains once seasonal variation is removed, and random variation cannot by definition be consistent.",
    earns: ["Splitting seasonal from cyclical on the length of the period"],
    loses: ["Using \"cyclical\" for anything that repeats, which is what the word suggests in ordinary English"],
  },

  "MA-08::moving-averages": {
    title: "Computing a moving average to isolate the trend",
    format: "ot",
    marks: 2,
    requirement:
      "Quarterly sales are: Q1 120, Q2 180, Q3 240, Q4 160, Q1 140. The first four-quarter moving average is:\n\nA  160\nB  175\nC  180\nD  700",
    plan: [
      {
        step: "Understand what the moving average is doing",
        detail:
          "Averaging over exactly one full cycle — four quarters — cancels the seasonal variation, because every season appears once. What is left is the trend.",
      },
      {
        step: "Take the first four periods only",
        detail:
          "120 + 180 + 240 + 160 = 700. The fifth figure belongs to the SECOND moving average, and including it is the commonest error on this calculation.",
      },
      {
        step: "Divide by the number of periods",
        detail:
          "700 ÷ 4 = **175**. Option D is the total without the division, which is the other standard slip.",
      },
      {
        step: "Know what happens next, since the follow-on needs it",
        detail:
          "With an even number of periods the average falls between two quarters, so the moving averages must be **centred** — averaged in pairs — before they can be compared with actual figures to derive seasonal variations.",
      },
    ],
    answer:
      "**B — 175.**\n\n(120 + 180 + 240 + 160) ÷ 4 = 700 ÷ 4 = **175**.\n\nAveraging over one complete cycle of four quarters cancels the seasonal effect, because each season appears exactly once. What remains is the trend.\n\nOption D is the total with the division omitted. Including the fifth quarter is the other common error — that figure belongs to the second moving average.\n\nWith an **even** number of periods the average falls between two quarters, so moving averages must be **centred** in pairs before they can be compared with actual figures to extract the seasonal variations.",
    earns: [
      "Using exactly one full cycle and no more",
      "Knowing that an even-period average must be centred before use",
    ],
    loses: ["Reporting the total instead of the average, or sliding the window one period early"],
  },

  "MA-08::seasonal-variation": {
    title: "Applying a seasonal adjustment in the right direction",
    format: "ot",
    marks: 2,
    requirement:
      "Under the additive model, the trend for Q3 is forecast at 500 units and the Q3 seasonal variation is −40. The forecast for Q3 is:\n\nA  460 units\nB  500 units\nC  540 units\nD  12.5 units",
    plan: [
      {
        step: "State the model being used",
        detail:
          "Additive: actual = trend + seasonal variation, with the seasonal figure expressed in units. Multiplicative: actual = trend × seasonal index, with the index expressed as a proportion or percentage.",
      },
      {
        step: "Check which model the numbers are consistent with",
        detail:
          "A seasonal figure of −40 is in units and can be negative, so it is additive. A multiplicative index would be something like 0.92 or 92 and would never be negative.",
      },
      {
        step: "Apply the sign as given",
        detail:
          "500 + (−40) = **460**. The negative means Q3 typically runs below trend, so the forecast must be below the trend figure.",
      },
      {
        step: "Read the distractors as the specific errors they encode",
        detail:
          "540 comes from subtracting the negative — adding 40. 500 comes from ignoring the adjustment. 12.5 comes from dividing 500 by 40, which is a multiplicative treatment applied to an additive figure.",
      },
    ],
    answer:
      "**A — 460 units.**\n\nUnder the additive model, forecast = trend + seasonal variation = 500 + (−40) = **460 units**.\n\nThe sign carries the meaning: negative means this quarter typically runs below trend, so the forecast must sit below the trend figure. A quick direction check settles it before any arithmetic.\n\nEvery distractor is a specific error. 540 comes from subtracting the negative rather than adding it. 500 comes from ignoring the adjustment. 12.5 comes from dividing, which applies multiplicative treatment to an additive figure.\n\nThe model is identifiable from the number itself: a seasonal figure in units that can go negative is additive; an index around 0.92 or 92 is multiplicative.",
    earns: [
      "Identifying the model from the form of the seasonal figure",
      "Using the sign as a direction check before computing",
    ],
    loses: ["Subtracting a negative seasonal variation, which moves the forecast the wrong way"],
  },

  "MA-08::index-numbers": {
    title: "Constructing and reading an index number",
    format: "ot",
    marks: 2,
    requirement:
      "A material cost $25 per kg in the base year and $32 per kg now. Taking the base year as 100, the current index is:\n\nA  78\nB  128\nC  132\nD  228",
    plan: [
      {
        step: "Write the formula and identify the base",
        detail:
          "Index = (current value ÷ base value) × 100. The base year is the one set to 100, and here that is the $25 year.",
      },
      {
        step: "Compute",
        detail:
          "(32 ÷ 25) × 100 = 1.28 × 100 = **128**.",
      },
      {
        step: "Sanity-check against the direction",
        detail:
          "The price rose, so the index must exceed 100. Option A, 78, comes from inverting the fraction (25 ÷ 32) and is immediately rejected by that check.",
      },
      {
        step: "Read the index back into plain English",
        detail:
          "128 means prices are 128% of the base, so the increase is 28 percentage points — not 128%. Option C, 132, is what you get by adding the $7 rise to 125 or similar; option D adds 128 to 100.",
      },
    ],
    answer:
      "**B — 128.**\n\nIndex = (32 ÷ 25) × 100 = **128**.\n\nThe direction check settles most of the option list instantly: the price rose, so the index must exceed 100, which eliminates 78 — the inverted fraction.\n\nReading it back matters as much as computing it. An index of 128 means the current price is **128% of** the base price, so the increase is **28%**, not 128%. Option D, 228, is the answer of anyone who added the index to 100 as though it were the increase.",
    earns: [
      "Using the direction of the price change to eliminate the inverted answer",
      "Reading 128 as \"128% of base\", not \"a 128% increase\"",
    ],
    loses: ["Inverting the fraction, or adding the index to 100"],
  },

  "MA-08::product-life-cycle": {
    title: "Identifying the life cycle stage from cost and sales behaviour",
    format: "ot",
    marks: 2,
    requirement:
      "A product's sales volume is rising rapidly, unit costs are falling as volume builds, and competitors are entering the market. The product is in which stage of its life cycle?\n\nA  Introduction\nB  Growth\nC  Maturity\nD  Decline",
    plan: [
      {
        step: "Set out the stages with sales, cost and competition at each",
        detail:
          "Introduction: low sales, high unit cost, little competition. Growth: rapidly rising sales, falling unit cost, competitors entering. Maturity: sales plateau, cost lowest, competition intense. Decline: sales falling, cost rising as volume drops.",
      },
      {
        step: "Check the stem's three facts against each stage",
        detail:
          "Rapidly rising sales, falling unit costs, competitors entering. All three match growth exactly, and a correct answer must satisfy all three rather than one.",
      },
      {
        step: "Test the nearest alternative on one fact",
        detail:
          "At maturity sales have stopped rising and have plateaued. The stem says sales are rising rapidly, which excludes maturity on its own.",
      },
      {
        step: "Connect it to the costing consequence",
        detail:
          "Life cycle costing accumulates all costs across every stage, including the heavy development spend before any sale. Judging a product on one period's profit misjudges it, which is why this sits in MA rather than in marketing.",
      },
    ],
    answer:
      "**B — growth.**\n\nAll three facts converge. **Introduction** has low sales and high unit costs with little competition. **Growth** has rapidly rising sales, unit costs falling as volume builds economies of scale, and competitors arriving now that the market is proven. **Maturity** has sales plateaued, unit costs at their lowest and competition intense. **Decline** has falling sales and unit costs rising again as volume drops.\n\nRequiring an answer to satisfy every fact in the stem is what makes this reliable — maturity fails on the first fact alone.\n\nThe management accounting point is **life cycle costing**: total cost across every stage, including development spend incurred before a single sale, is what determines whether a product was worth making.",
    earns: [
      "Requiring all three facts to fit before committing",
      "Naming life cycle costing as why the stage matters to a management accountant",
    ],
    loses: ["Choosing maturity because competition is described as increasing"],
  },

  /* ── MA-09 · Spreadsheets ────────────────────────────────────── */

  "MA-09::features": {
    title: "What a spreadsheet formula does when the data changes",
    format: "ot",
    marks: 2,
    requirement:
      "A budget spreadsheet calculates total cost as =B4*C4, where B4 is units and C4 is cost per unit. The main advantage of building it this way rather than typing the answer is that:\n\nA  It uses less file space\nB  The total recalculates automatically when either input changes\nC  It cannot contain errors\nD  It does not need to be checked",
    plan: [
      {
        step: "Name what a formula gives you that a typed value does not",
        detail:
          "A live link between inputs and output. Change an input and the output follows, which is what makes sensitivity and \"what if\" analysis possible at all.",
      },
      {
        step: "Connect it to the use it enables",
        detail:
          "This is why spreadsheets are used for budgeting: a manager can ask what happens if volume falls 10%, change one cell, and read the answer immediately across the whole model.",
      },
      {
        step: "Reject the two options claiming reliability",
        detail:
          "Formulae do not prevent errors — they PROPAGATE them, which is worse. One wrong formula corrupts everything downstream and looks entirely plausible on screen.",
      },
      {
        step: "Reject the irrelevant option",
        detail:
          "File space is not a consideration and would not favour formulae anyway. It is offered as a technically-flavoured distractor with no accounting content.",
      },
    ],
    answer:
      "**B — the total recalculates automatically when either input changes.**\n\nA formula creates a live link between inputs and outputs, which is what makes **\"what if\" analysis** possible: change the volume assumption in one cell and the effect flows through the whole model instantly.\n\nC and D are dangerously wrong in the same direction. Formulae do not prevent errors, they **propagate** them: one incorrect formula corrupts every figure downstream and produces output that looks entirely plausible. That is exactly why spreadsheet models need checking, version control and protected input cells.",
    earns: ["Naming \"what if\" analysis as the capability the live link buys"],
    loses: ["Choosing an option that treats a spreadsheet as self-verifying"],
  },

  "MA-09::advantages-risks": {
    title: "Recognising the characteristic spreadsheet risk",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is the most significant risk associated with using spreadsheets for management reporting?\n\nA  They are slower than manual calculation\nB  Undetected formula errors can produce plausible but wrong figures\nC  They cannot handle large volumes of data\nD  They cannot be shared between users",
    plan: [
      {
        step: "Ask what makes a risk significant",
        detail:
          "Not how often it occurs but whether it would be caught. A risk that announces itself is manageable; one that produces confident wrong answers is not.",
      },
      {
        step: "Identify the characteristic failure",
        detail:
          "A spreadsheet with a wrong formula produces a number that looks exactly like a right one. There is no error message, no obvious symptom, and the output is used for decisions.",
      },
      {
        step: "Reject the three factually wrong options",
        detail:
          "Spreadsheets are far faster than manual calculation, handle very large data sets, and are shared constantly — sharing is itself a source of version-control risk rather than an impossibility.",
      },
      {
        step: "Name the controls, since the follow-on asks for them",
        detail:
          "Protect formula cells, separate inputs from calculations, use range names, build in cross-checks and totals that must agree, version control, and independent review of the model.",
      },
    ],
    answer:
      "**B — undetected formula errors can produce plausible but wrong figures.**\n\nWhat makes this the significant risk is not frequency but **invisibility**: a wrong formula produces a number indistinguishable from a right one, with no error message and no obvious symptom, and that number then supports a decision.\n\nThe other options are factually wrong. Spreadsheets are much faster than manual calculation, handle large data sets, and are shared constantly — sharing creates a **version control** risk rather than being impossible.\n\nThe controls follow directly: protect formula cells, separate inputs from calculations, use range names, build in cross-checks that must agree, keep version control, and have the model independently reviewed.",
    earns: [
      "Judging the risk by whether it would be detected, not by how often it occurs",
      "Being able to name specific controls rather than \"check it carefully\"",
    ],
    loses: ["Choosing a supposed limitation that spreadsheets plainly do not have"],
  },
}
