import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area C — chapters 32 and 33, and Area E — chapter 34, completing the tree.
 *
 * Chapter 32 exists because interpreting CONSOLIDATED statements is a distinct skill the
 * syllabus names explicitly (C1 and C2 both refer to single entities AND groups), and
 * because a group's figures are non-comparable in ways a single entity's are not — a
 * mid-year acquisition, an associate whose revenue never appears, and subsidiary debt that
 * changes group gearing without the parent having borrowed anything.
 *
 * Chapter 33 collects the limitations and covers specialised, not-for-profit and public
 * sector entities (C3 and C4), which is a small but reliably examined corner of the
 * syllabus that a paper organised only round IFRS would miss entirely.
 *
 * Chapter 34 is Area E. It follows the treatment every other paper's employability area
 * gets, and it is sized to FR's own exam: two 20-mark constructed responses, one of which
 * is normally a preparation built in the spreadsheet and one an interpretation written in
 * the word processor.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_32: StudyChapter = {
  id: "FR-32",
  number: 32,
  paper: "FR",
  area: "C",
  title: "Interpreting consolidated financial statements",
  minutes: 17,
  syllabusRefs: ["C1(c)", "C2(e)", "C2(f)"],
  intro:
    "A group's figures are not comparable with last year's if it bought something during the year — and its margin is overstated whenever it holds an associate.",
  outcomes: [
    "Separate organic growth from growth acquired during the year",
    "Explain why a mid-year acquisition distorts asset turnover and every balance sheet ratio",
    "Explain how an associate distorts group margins",
    "Interpret group gearing, taking account of subsidiary borrowings and non-controlling interest",
    "Identify the group-specific limitations of a ratio comparison",
  ],
  sections: [
    {
      id: "mid-year-acquisition",
      heading: "The mid-year acquisition problem",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The mismatch that creates every group distortion",
          md: "When a subsidiary is acquired part way through the year:\n\n· The **statement of profit or loss** includes its results for the **POST-ACQUISITION period only** — nine months, or six, or three.\n· The **statement of financial position** includes **ALL of its assets and liabilities**, because it is owned in full at the reporting date.\n\nSo the group reports a **full balance sheet against a partial income statement**. Every ratio combining the two is understated: asset turnover, ROCE, return on assets. And every growth measure is overstated, because the prior year contains none of the subsidiary at all.\n\nThis is not an accounting error. It is the correct treatment, and it is exactly why an interpretation answer has to adjust before drawing conclusions.",
        },
        {
          kind: "example",
          title: "Separating organic from acquired growth",
          scenario:
            "A group reports revenue of $21,000,000 for 20X6 against $15,000,000 in 20X5 — growth of 40%. It acquired a subsidiary on 1 April 20X6, and that subsidiary contributed $4,800,000 of revenue in the nine months since acquisition.",
          steps: [
            { label: "Compute the reported growth", detail: "($21,000,000 − $15,000,000) / $15,000,000 = 40.0%. This is the figure a candidate who does not read the note will quote." },
            { label: "Strip out the acquisition", detail: "Organic revenue in 20X6 = $21,000,000 − $4,800,000 = $16,200,000." },
            { label: "Compute organic growth", detail: "($16,200,000 − $15,000,000) / $15,000,000 = 8.0%." },
            { label: "Attribute the rest to the acquisition", detail: "$4,800,000 / $15,000,000 = 32.0%. Check: 8.0% + 32.0% = 40.0%." },
            { label: "State what this changes", detail: "Four fifths of the reported growth was BOUGHT, not earned. A shareholder assessing management's operating performance cares about the 8%; one assessing capital allocation cares about whether the price paid for the 32% was justified. Reporting 40% without the split answers neither question." },
            { label: "Note the further distortion", detail: "The subsidiary's revenue will annualise to about $6,400,000 next year, so 20X7 will show further 'growth' of roughly $1,600,000 purely from the acquisition being owned for twelve months rather than nine. The comparison is distorted in the FOLLOWING year too, and saying so is worth a mark." },
          ],
          result:
            "**Reported growth 40%, of which 8% is organic and 32% acquired.** The habit to build: whenever a group's growth looks strong, check for an acquisition and split the figure before commenting.",
        },
        {
          kind: "list",
          title: "The other mid-year acquisition distortions",
          items: [
            "**Asset turnover falls** — twelve months of the subsidiary's assets against nine months of its revenue. It will appear to improve next year with no operational change.",
            "**ROCE falls**, for the same reason, and partly because goodwill has been added to capital employed while generating no separately identifiable return.",
            "**Margins shift towards the subsidiary's** — if the acquired business has a different cost structure, the group's blended margin changes without either business changing.",
            "**Gearing changes** if the subsidiary carries debt, or if the acquisition was debt-funded. The parent may not have borrowed at all and group gearing still rises.",
            "**Working capital ratios blend** two different businesses' collection and inventory patterns, so a movement may reflect the mix rather than either entity's management."
          ],
        },
      ],
      check: {
        q: "A group's revenue grew 25%. A subsidiary acquired eight months into the year contributed revenue equal to 18% of the prior year's group revenue. What was organic growth?",
        options: ["7%", "25%", "18%", "43%"],
        correct: 0,
        explain:
          "Total growth of 25% less the 18% contributed by the acquisition leaves 7% organic. Note that the acquisition will distort the following year too, as its revenue annualises from eight months to twelve.",
      },
    },
    {
      id: "associates-and-nci",
      heading: "Associates, non-controlling interest, and group gearing",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "An associate inflates every margin",
          md: "The equity method brings the group's **share of the associate's PROFIT** into the statement of profit or loss but **NONE of its REVENUE**.\n\nSo profit rises with no matching increase in the denominator, and any margin computed after the associate's line is **OVERSTATED**. The larger and more profitable the associate, the greater the distortion.\n\nThe fix in an interpretation answer: compute margins on **OPERATING PROFIT, before the share of associate profit** — and say that you have done so, and why. Comparing an entity with a large associate against one without, using post-associate margins, is meaningless.",
        },
        {
          kind: "example",
          title: "Quantifying the associate distortion",
          scenario:
            "A group reports revenue of $21,000,000, operating profit of $2,520,000 and a share of an associate's profit of $400,000.",
          steps: [
            { label: "Compute the margin correctly", detail: "Operating profit margin = $2,520,000 / $21,000,000 = 12.0%. This is the group's own trading margin." },
            { label: "Compute the figure a careless answer would give", detail: "Including the associate: ($2,520,000 + $400,000) / $21,000,000 = 13.9%." },
            { label: "Identify why the second figure is wrong", detail: "The 1.9 percentage point difference is entirely the associate. The associate's own revenue — which might be $8m or $80m — is nowhere in the denominator. So the 13.9% measures nothing: it divides a profit including the associate by a revenue excluding it." },
            { label: "State the presentational reason it happens", detail: "The share of associate profit is presented AFTER operating profit and before tax. A candidate who takes 'profit before tax' as the numerator picks it up automatically, which is why the error is so common." },
            { label: "Say what to do instead", detail: "Use operating profit for margin analysis, and comment separately on the associate: what return the investment is generating relative to its carrying amount, and whether the group receives cash from it by way of dividend or only a share of retained profit." },
          ],
          result:
            "**12.0% is the group's margin; 13.9% is an artefact.** State which basis you have used, because a marker cannot award the point unless you say so.",
        },
        {
          kind: "list",
          title: "Group gearing: what to be careful about",
          items: [
            "**Subsidiary borrowings are in group debt in full**, even where the subsidiary is only partly owned. So group gearing can be high when the parent has borrowed nothing.",
            "**Non-controlling interest is part of EQUITY.** Decide whether to include it in the gearing denominator and SAY WHICH — including it lowers gearing, and the two answers describe the same group.",
            "**Goodwill sits in capital employed** but is not a separately realisable asset. A lender assessing security should be told what proportion of capital employed is goodwill, since it supports no borrowing.",
            "**A revaluation in a subsidiary** flows into group equity and reduces group gearing, without any change in borrowing.",
            "**Debt in a subsidiary may not be available to the group.** Cash in an overseas subsidiary may be subject to exchange controls, and a subsidiary's lenders may have security over its assets alone. Group figures aggregate; they do not guarantee fungibility."
          ],
        },
        {
          kind: "activity",
          title: "What is wrong with this comparison?",
          prompt:
            "A candidate compares two groups:\n\n\"Group A has a net margin of 15% against Group B's 9%, so A is the more profitable. A's gearing of 30% is also lower than B's 55%, so A is the safer investment.\"\n\nGroup A holds a 40% associate contributing $2m of profit on group revenue of $30m, and revalued its properties in the year. Group B acquired a subsidiary four months before its year end and has no associates.\n\nIdentify the flaws.",
          answer:
            "FOUR flaws, and together they may reverse the conclusion.\n\n1. A's margin is INFLATED BY THE ASSOCIATE. Removing the $2m gives ($4.5m − $2m)/$30m = 8.3% — BELOW B's 9%. The comparison is the wrong way round.\n\n2. A's gearing is DEPRESSED BY THE REVALUATION. Equity has been increased with no change in borrowing, so 30% overstates A's safety. The figure before revaluation would be higher.\n\n3. B's margin is DEPRESSED BY THE MID-YEAR ACQUISITION, which brings four months of profit against a full balance sheet, and probably acquisition-related costs charged in full. B's underlying margin is likely above 9%.\n\n4. B's gearing may be inflated by the acquired subsidiary's own debt and by acquisition funding, which is a one-off structural change rather than a trend.\n\nAnd a fifth point: neither conclusion mentions CASH or interest cover, which is what actually determines whether gearing is dangerous. A group at 55% gearing with cover of 8 times is safer than one at 30% with cover of 2.\n\nWhat a good answer does: identify each distortion, quantify the one that can be quantified — the associate — and conclude that on a comparable basis the ranking is unclear and further information is needed.",
        },
      ],
      check: {
        q: "Why does an associate overstate a group's profit margin?",
        options: [
          "The group's share of the associate's profit is included but none of its revenue",
          "The associate's revenue is included but only part of its profit",
          "The associate's assets are consolidated but not its liabilities",
          "It does not — the equity method has no effect on margins",
        ],
        correct: 0,
        explain:
          "The equity method brings in the share of profit as a single line after operating profit, but none of the associate's revenue enters the denominator. Any margin computed on profit before tax is therefore overstated. Use operating profit instead, and say so.",
      },
    },
  ],
  examTraps: [
    { trap: "Quoting group revenue growth without splitting out an acquisition.", fix: "Strip the acquired revenue out to find organic growth, and note that the distortion continues into the following year as the acquisition annualises." },
    { trap: "Attributing a fall in group asset turnover to poor utilisation.", fix: "A mid-year acquisition puts twelve months of assets against part-year revenue. Say so." },
    { trap: "Computing a margin on profit before tax where there is an associate.", fix: "The associate's profit is in the numerator and its revenue is not in the denominator. Use operating profit." },
    { trap: "Comparing an entity with a large associate against one without on post-associate margins.", fix: "The comparison is meaningless. Adjust and state the basis." },
    { trap: "Treating high group gearing as evidence the parent has borrowed heavily.", fix: "Subsidiary borrowings are consolidated in full, whatever the ownership percentage." },
    { trap: "Quoting group gearing without saying whether NCI is included in equity.", fix: "It is equity, and including or excluding it gives materially different figures for the same group." },
    { trap: "Ignoring goodwill within capital employed when advising a lender.", fix: "Goodwill supports no borrowing. Say what proportion of capital employed it represents." },
  ],
  keyTerms: [
    { term: "Organic growth", def: "Growth excluding the contribution of businesses acquired or disposed of in the period." },
    { term: "Annualisation effect", def: "The apparent growth arising in the year after an acquisition, as the acquired business is consolidated for twelve months rather than for part of a year." },
    { term: "Associate distortion", def: "The overstatement of group margins caused by including the share of an associate's profit while excluding its revenue." },
  ],
  summary: [
    "A mid-year acquisition puts a FULL balance sheet against a PARTIAL income statement, so asset turnover and ROCE are understated and growth is overstated.",
    "Split reported growth into organic and acquired, and note the annualisation effect in the following year.",
    "An associate's profit is included and its revenue is not, so compute margins on OPERATING profit and say that you have.",
    "Subsidiary borrowings are consolidated in full regardless of ownership, so group gearing can be high without the parent having borrowed.",
    "Non-controlling interest is equity — state whether the gearing figure includes it.",
    "Goodwill in capital employed supports no borrowing, which matters to a lender.",
    "A subsidiary's cash and assets may not be freely available to the group; consolidation aggregates but does not make resources fungible.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a mid-year acquisition depress group asset turnover?", a: "Because the whole of the subsidiary's assets are in the closing statement of financial position while only its post-acquisition revenue is in the income statement." },
    { q: "How is organic growth computed?", a: "Total revenue less the revenue contributed by businesses acquired in the period, compared with the prior year." },
    { q: "Which profit figure should be used for margin analysis where there is an associate?", a: "Operating profit, before the share of the associate's profit — because the associate's revenue is not in the denominator." },
    { q: "Does high group gearing mean the parent has borrowed heavily?", a: "Not necessarily. A partly-owned subsidiary's borrowings are consolidated in full." },
    { q: "Why does goodwill in capital employed matter to a lender?", a: "It is not separately realisable, so it provides no security — the lender needs to know how much of capital employed it represents." },
  ],
  furtherStudy: [
    "Chapter 31 — the interpretation structure this chapter adds group complications to",
    "Chapter 28 — the mid-year consolidation mechanics that create the distortion",
    "Chapter 29 — the equity method that produces the associate distortion",
  ],
}

export const FR_TREE_33: StudyChapter = {
  id: "FR-33",
  number: 33,
  paper: "FR",
  area: "C",
  title: "Limitations of interpretation, and specialised entities",
  minutes: 16,
  syllabusRefs: ["C1(d)", "C3(a)", "C3(b)", "C4(a)", "C4(b)"],
  intro:
    "What ratios cannot tell you, and how to assess an entity whose objective is not profit at all.",
  outcomes: [
    "Explain the limitations of financial statements as a basis for decisions",
    "Explain the limitations of ratio analysis specifically",
    "Identify the additional problems in comparing entities",
    "Explain how the objectives of a not-for-profit or public sector entity differ",
    "Apply value for money analysis and appropriate performance measures to such entities",
  ],
  sections: [
    {
      id: "limitations",
      heading: "Limitations of the statements, and of the ratios",
      blocks: [
        {
          kind: "table",
          caption: "Limitations of FINANCIAL STATEMENTS themselves",
          head: ["Limitation", "Why it matters"],
          rows: [
            ["**Historical**", "They report the past. A user is deciding about the future, and past performance is only an input"],
            ["**Omit internally generated intangibles**", "Brands, customer relationships and know-how — often the most valuable resources — are excluded because they cannot be reliably measured. Two entities with identical economics report differently if one BOUGHT its brand"],
            ["**Depend on estimates and judgements**", "Useful lives, provisions, recoverable amounts, expected credit losses. All are judgements, and reasonable people would choose differently"],
            ["**A single point in time**", "The statement of financial position is one date. Nothing prevents it being unrepresentative, deliberately or not"],
            ["**Not adjusted for inflation**", "Comparing a cost from ten years ago with a current revenue is comparing different units of purchasing power"],
            ["**Aggregate**", "Group figures blend businesses with different risks and returns; segment information helps but is limited"],
            ["**Exclude non-financial information**", "Order book, customer concentration, staff turnover, regulatory risk, environmental exposure — none of it is in the numbers"],
          ],
        },
        {
          kind: "table",
          caption: "Limitations of RATIO ANALYSIS specifically",
          head: ["Limitation", "Example"],
          rows: [
            ["**No standard definitions**", "Gearing can be debt/equity or debt/(debt+equity); capital employed may or may not include NCI. Two analysts get different answers from the same accounts"],
            ["**Ratios are relative, not absolute**", "A current ratio of 1.5 is neither good nor bad without a comparator, a trend, and knowledge of the industry"],
            ["**Two years is not a trend**", "A movement may be a one-off. Five years shows a direction"],
            ["**Accounting policy differences**", "The distortions from chapter 30. Revaluation, grant presentation, principal against agent — all move ratios without moving performance"],
            ["**Different year ends**", "A seasonal business reporting in its quiet month shows very different working capital from the same business reporting at its peak"],
            ["**Susceptible to manipulation**", "Window dressing improves liquidity ratios at the one date users see"],
            ["**Cause and effect are not visible**", "A ratio tells you what happened, never why. The scenario has to supply that"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How this is examined",
          md: "Almost always as a **discrete requirement worth three to five marks**: \"explain the limitations of your analysis\", or \"discuss the problems in using ratio analysis to compare the two entities\".\n\nThose are among the easiest marks in the paper, because the content is generic — but the marks go to answers that **APPLY the limitation to the scenario**. \"Different accounting policies may reduce comparability\" earns little. \"Alpha carries its properties at valuation while Beta uses cost, which depresses Alpha's ROCE and gearing and makes the comparison of both unsafe\" earns the mark.\n\nSo learn the list, then attach each item to something in the question.",
        },
      ],
      check: {
        q: "Which is a limitation of RATIO ANALYSIS rather than of financial statements generally?",
        options: [
          "There are no universally agreed definitions, so the same accounts yield different ratios",
          "Internally generated brands are not recognised",
          "The statements report past transactions",
          "Estimates and judgements are involved in many figures",
        ],
        correct: 0,
        explain:
          "The absence of standard definitions is specific to ratio analysis. The other three are limitations of the financial statements themselves, which ratios inherit but do not create.",
      },
    },
    {
      id: "not-for-profit",
      heading: "Not-for-profit and public sector entities",
      blocks: [
        {
          kind: "text",
          md: "A charity, a hospital, a school and a local authority all prepare financial statements, and none of them exists to make a profit. So the whole apparatus of margin, ROCE and EPS is either unavailable or beside the point, and performance has to be assessed differently.",
        },
        {
          kind: "table",
          caption: "How the analysis differs",
          head: ["", "Commercial entity", "Not-for-profit / public sector"],
          rows: [
            ["**Objective**", "Maximise shareholder wealth", "Deliver a service, or achieve a mission, within available funds"],
            ["**Primary users**", "Investors, lenders, other creditors", "Funders, donors, taxpayers, service users, regulators, government"],
            ["**Key question**", "What return was earned on the capital?", "Was the money spent well, and did it achieve what it was given for?"],
            ["**A surplus means**", "Profit — the objective", "Funds not yet spent on the mission. A large surplus may be a CRITICISM, not an achievement"],
            ["**Revenue**", "Earned from customers who choose to buy", "Grants, donations, levies and taxation — often unrelated to the volume of service delivered"],
            ["**Capital**", "Providers expect a return", "Often no return expected; capital may be restricted to specific purposes"],
            ["**Measurement problem**", "Output is measured in money", "Output is measured in outcomes — patients treated, pupils educated, homes insulated — which resist monetary measurement"],
          ],
        },
        {
          kind: "formula",
          name: "Value for money: the three Es",
          expr: "ECONOMY      —  obtaining the resources at the lowest\n                appropriate cost\n                \"cost per unit of input\"\n                e.g. average cost per teacher employed\n\nEFFICIENCY   —  the relationship between INPUTS and OUTPUTS\n                \"outputs per unit of input\"\n                e.g. pupils taught per teacher\n\nEFFECTIVENESS — the extent to which OBJECTIVES are achieved\n                \"outcomes against targets\"\n                e.g. examination results, literacy rates\n\nA fourth E is sometimes added:\n\nEQUITY       —  whether the service reaches all groups fairly\n                e.g. outcomes by region or by income group\n\nThe three interact, and the interaction is the examinable point.\nCutting cost per teacher (ECONOMY) by recruiting less experienced\nstaff may raise class sizes (EFFICIENCY looks better) while results\nfall (EFFECTIVENESS worsens). Economy pursued alone destroys value.",
          note: "Effectiveness is the hardest to measure and the most important. An answer that discusses only cost has assessed economy and called it value for money.",
        },
        {
          kind: "example",
          title: "Assessing a not-for-profit",
          scenario:
            "A charity providing meals to housebound elderly people reports: income $4,200,000 (of which $3,600,000 is grants and $600,000 donations); expenditure on charitable activities $3,400,000; support and administration costs $520,000; fundraising costs $180,000; surplus $100,000. It delivered 340,000 meals, up from 300,000 the prior year on income of $3,900,000. Reserves are $1,900,000, equivalent to nine months' expenditure.",
          steps: [
            { label: "Do not compute a margin", detail: "A 2.4% 'surplus margin' would be meaningless. The charity is not trying to generate a surplus, and a larger one would raise the question of why the money was not spent on meals." },
            { label: "Assess ECONOMY and EFFICIENCY", detail: "Cost per meal = total expenditure $4,100,000 ÷ 340,000 = $12.06. Prior year, on income of $3,900,000 and 300,000 meals, cost per meal was around $12.67 if expenditure roughly matched income. So unit cost has FALLEN about 5% while volume rose 13% — evidence of improving efficiency, probably from spreading fixed support costs over more meals." },
            { label: "Assess the cost RATIOS funders look at", detail: "Charitable expenditure as a proportion of total: $3,400,000 ÷ $4,100,000 = 82.9%. Support and administration 12.7%; fundraising 4.4%. Funders and donors watch these closely, and a rising administration proportion is a common criticism — though an unrealistically low one may mean the charity is under-investing in its own governance." },
            { label: "Assess EFFECTIVENESS — and admit the gap", detail: "Meals delivered is an OUTPUT, not an OUTCOME. The charity's actual objective is presumably that housebound people are adequately nourished and less isolated. Nothing in the financial statements measures that. Ask for: nutritional assessments, client satisfaction data, waiting list length, and the proportion of eligible people reached." },
            { label: "Assess sustainability", detail: "86% of income is grant funded, which is a concentration risk: the loss of one grant could be existential. Reserves of nine months' expenditure are substantial and would normally be judged prudent, though a funder might ask whether they are excessive given unmet need." },
            { label: "Frame the conclusion", detail: "\"The charity is delivering more meals at a lower unit cost, and its cost structure compares well. Two things cannot be assessed from these statements: whether the meals are achieving the nutritional and social outcomes intended, and whether the grant concentration is being managed. I would want outcome data and a funding pipeline before concluding on value for money.\"" },
          ],
          result:
            "**Unit cost down 5%, volume up 13%, 82.9% of spend on charitable activities — with effectiveness unassessable from the financial statements.** The last point is the one that earns the marks, because it identifies the limit of the analysis rather than pretending the outputs are outcomes.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The output / outcome distinction",
          md: "An **OUTPUT** is what the entity produced: meals served, operations performed, pupils taught, miles of road resurfaced.\n\nAn **OUTCOME** is the change it achieved: nourishment, recovery, education, safer journeys.\n\nFinancial statements can support output measures. They cannot measure outcomes, and the substitution of one for the other is the central weakness of not-for-profit performance reporting. A hospital can raise operations performed while patient recovery rates fall.\n\nAn answer that says \"the entity is performing well because it delivered more units\" has confused the two. Naming the distinction is a reliable mark.",
        },
      ],
      check: {
        q: "A public sector body reduces its cost per unit of input while its service outcomes deteriorate. Which of the three Es has it improved, and which has it damaged?",
        options: [
          "Improved economy; damaged effectiveness",
          "Improved efficiency; damaged economy",
          "Improved effectiveness; damaged efficiency",
          "Improved all three, since cost has fallen",
        ],
        correct: 0,
        explain:
          "Economy is the cost of obtaining inputs, so a lower cost per input improves it. Effectiveness is the achievement of objectives, which has deteriorated. This is the standard illustration of why economy pursued in isolation destroys value for money.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing limitations generically without applying them to the scenario.", fix: "Attach each limitation to something the question told you — a revaluation, a different year end, a mid-year acquisition." },
    { trap: "Computing a surplus margin for a not-for-profit entity.", fix: "A surplus is not the objective. Assess unit costs, the proportion of spend on the mission, and outcomes." },
    { trap: "Treating a large surplus in a charity as good performance.", fix: "It may be a criticism — funds given for a purpose have not been applied to it." },
    { trap: "Assessing only cost and calling it value for money.", fix: "That is economy alone. Value for money needs efficiency and, above all, effectiveness." },
    { trap: "Presenting outputs as if they were outcomes.", fix: "Meals delivered is an output; nourishment achieved is the outcome. Say which you have and what is missing." },
    { trap: "Applying EPS, P/E or dividend cover to a public sector body.", fix: "There is no equity in that sense and no shareholders. Use service-based and cost-based measures." },
  ],
  keyTerms: [
    { term: "Value for money", def: "The assessment of an entity's performance against economy, efficiency and effectiveness — sometimes with equity as a fourth dimension." },
    { term: "Economy", def: "Obtaining the required resources at the lowest appropriate cost; measured as cost per unit of input." },
    { term: "Efficiency", def: "The relationship between inputs and outputs; measured as outputs per unit of input." },
    { term: "Effectiveness", def: "The extent to which the entity's objectives are achieved; measured by outcomes against targets." },
    { term: "Output", def: "What the entity produced — units of service delivered." },
    { term: "Outcome", def: "The change the entity achieved in the condition it exists to address; not measurable from financial statements." },
  ],
  summary: [
    "Financial statements are historical, omit internally generated intangibles, rest on estimates, capture one date, ignore inflation, aggregate, and exclude non-financial information.",
    "Ratio analysis adds its own limitations: no standard definitions, no absolute standard, two years is not a trend, policy and year-end differences, and susceptibility to window dressing.",
    "Marks come from APPLYING each limitation to the scenario, not from listing them.",
    "A not-for-profit or public sector entity exists to deliver a service, so a surplus is not the objective and a large one may be a criticism.",
    "Assess such entities on value for money: economy (cost per input), efficiency (outputs per input) and effectiveness (outcomes against objectives).",
    "Economy pursued alone destroys value — cheaper inputs can reduce effectiveness.",
    "Financial statements support output measures but cannot measure OUTCOMES, and saying so is the strongest point available.",
  ],
  knowledgeDiagnostic: [
    { q: "Give three limitations of ratio analysis distinct from the limitations of financial statements.", a: "There are no standard definitions; ratios are relative and need a comparator; and different year ends and accounting policies undermine comparability." },
    { q: "Why is a large surplus not necessarily good in a charity?", a: "Funds given for a charitable purpose have not been applied to it, so a large surplus may indicate unmet need rather than good performance." },
    { q: "Define the three Es.", a: "Economy — obtaining resources at the lowest appropriate cost; efficiency — outputs per unit of input; effectiveness — the extent to which objectives are achieved." },
    { q: "What is the difference between an output and an outcome?", a: "An output is what was produced — meals, operations, pupils taught. An outcome is the change achieved — nourishment, recovery, education. Financial statements measure outputs at best." },
    { q: "Can economy improve while value for money falls?", a: "Yes. Cheaper inputs can reduce effectiveness, which is why economy must never be assessed in isolation." },
  ],
  furtherStudy: [
    "Chapter 30 — the accounting distortions that are the concrete form of several limitations here",
    "Chapter 31 — where the limitations requirement usually sits in a Section C answer",
    "APM — value for money and non-financial performance measurement in far greater depth",
  ],
}

export const FR_TREE_34: StudyChapter = {
  id: "FR-34",
  number: 34,
  paper: "FR",
  area: "E",
  title: "Employability and technology skills: answering FR in the CBE",
  minutes: 15,
  syllabusRefs: ["E1(a)", "E1(b)", "E2(a)", "E2(b)", "E3(a)"],
  intro:
    "Forty of FR's hundred marks are typed into a spreadsheet and a word processor. This chapter is about not losing marks you have already earned.",
  outcomes: [
    "Lay out a preparation answer so that method marks survive an arithmetic error",
    "Choose the right CBE tool for each requirement",
    "Use the spreadsheet so that a revised figure recalculates rather than being retyped",
    "Structure an interpretation answer against the requirement's parts",
    "Manage time across a two-question Section C, including when a statement will not balance",
  ],
  sections: [
    {
      id: "layout",
      heading: "Laying out an answer the marker can mark",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The one thing to understand about Section C marking",
          md: "Most Section C marks are **METHOD** marks. A marker awarding four marks for a goodwill calculation is looking for the consideration, the share exchange valued correctly, the NCI at acquisition and the net assets at acquisition — and will award three of those four even when the addition at the end is wrong.\n\n**But only if they can see them.**\n\nA single figure of $1,120,000 in a cell earns everything or nothing, and usually nothing, because the marker cannot tell whether it was reasoned or guessed. A five-line working with each component labelled earns partial credit on every line that is right.\n\nSo layout is not presentation. It is the mechanism by which partial credit reaches you, and it is worth more in FR than in any other Applied Skills paper because the consolidation workings are long.",
        },
        {
          kind: "list",
          style: "number",
          title: "How to lay out a preparation answer",
          items: [
            "**Use the standard workings, numbered and headed.** W1 group structure, W2 net assets, W3 goodwill, W4 NCI, W5 group retained earnings. A marker who sees those headings knows immediately where to look, and so do you when part (c) asks you to revise an assumption.",
            "**One component per row, each labelled.** \"Cash consideration\", \"Shares issued 320,000 × $3.50\", \"NCI at acquisition 20% × $3,000,000\", \"Net assets at acquisition\". Four rows, four visible decisions.",
            "**Put the two-column net assets working in two actual columns**, headed \"At acquisition\" and \"At reporting date\". Trying to do it in one column is where fair value adjustments get netted wrongly.",
            "**Cross-reference every figure that comes from a working.** Writing \"(W3)\" next to goodwill in the statement tells the marker the figure was derived rather than assumed.",
            "**Show the balance check.** Total assets against total equity and liabilities, as a visible line. If it balances, say so — it demonstrates control of the whole question.",
            "**Head each requirement part with the question's own label** — (a), (b), (c). A marker marking part (b) should not have to search for it.",
          ],
        },
        {
          kind: "table",
          caption: "Which CBE tool for which requirement",
          head: ["The requirement asks you to…", "Use", "Because"],
          rows: [
            ["**Prepare** a statement of profit or loss, financial position or cash flows", "**Spreadsheet**", "The row-and-column structure IS the answer, and formulae recalculate if an input changes"],
            ["**Calculate** goodwill, NCI, a lease liability, deferred tax", "**Spreadsheet**", "Cell-by-cell layout makes the method visible and the arithmetic checkable"],
            ["**Explain**, **discuss**, **advise**, **comment on**, **report to**", "**Word processor**", "It is prose, and prose crammed into spreadsheet cells is hard to read and easy to truncate"],
            ["**Calculate AND comment** in one part", "**Both**, cross-referenced", "Figures in the spreadsheet, commentary in the word processor, each headed with the same part label"],
            ["Compute ratios and then interpret them", "**Both**", "A small ratio table in the spreadsheet, then the three-part points in the word processor. Never put the narrative in cells"],
          ],
        },
      ],
    },
    {
      id: "spreadsheet-discipline",
      heading: "Spreadsheet discipline that saves marks and minutes",
      blocks: [
        {
          kind: "list",
          title: "Five habits",
          items: [
            "**Enter inputs once, in their own cells, then reference them.** If the tax rate appears in four calculations, put it in one cell and point four formulae at it. When part (c) changes the rate, one edit updates everything.",
            "**Never hard-code a figure you have already computed.** Typing 1,120,000 into the statement rather than referencing the goodwill working means a revision to the working leaves the statement wrong — and the marker sees an inconsistency.",
            "**Build the liability tables as tables.** A lease liability or amortised cost schedule with columns for opening balance, interest, payment and closing balance, where each closing balance feeds the next opening balance, takes one minute to construct and is self-checking.",
            "**Keep a visible check row.** Assets less equity and liabilities should show zero. Attribution to the parent plus the NCI should equal consolidated profit. Put the check in a cell; do not do it in your head.",
            "**Do not spend time on formatting.** No colours, no borders, no currency symbols in every cell. Marks are for content. A clear label and a right number beat a beautifully formatted wrong one.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "When the statement will not balance",
          md: "It happens, and the response is a procedure rather than panic.\n\n**Halve the difference and look for that number.** A difference of $96,000 is very often a $48,000 figure posted on one side only — the unrealised profit taken off inventory but not off reserves, for instance.\n\n**Check the six usual suspects**, in this order: the NCI, the closing column of the net assets working, the current-year depreciation on a fair value uplift, the unrealised profit's second leg, the intra-group elimination, and whether the parent's share capital has been used rather than the combined figure.\n\n**Then stop.** Give the imbalance a line of its own — \"difference of $96,000 not located\" — and move to the next requirement. An examiner marks what is there, and a candidate who spends fifteen minutes on a two-mark difference and leaves part (c) blank has traded two marks for eight.",
        },
      ],
    },
    {
      id: "structure-and-time",
      heading: "Structuring the written answer, and managing the time",
      blocks: [
        {
          kind: "formula",
          name: "FR's time budget",
          expr: "180 minutes for 100 marks  =  1.8 minutes a mark\n\n   SECTION A   15 OTs × 2 marks = 30 marks  →  54 minutes\n                  about 3.5 minutes each\n\n   SECTION B    3 cases × 10 marks = 30 marks  →  54 minutes\n                  about 18 minutes a case\n\n   SECTION C    2 questions × 20 marks = 40 marks  →  72 minutes\n                  36 minutes each\n\nWITHIN a 36-minute Section C question, allow roughly:\n   ·   4 minutes reading the requirement and the scenario\n   ·  26 minutes producing the answer\n   ·   6 minutes on the check, the conclusion, and the parts you\n      left until last\n\nAND STOP AT 36 MINUTES. The second Section C question's first ten\nmarks are far easier to earn than the last five of the first.",
          note: "The single most expensive habit in FR is overrunning on a consolidation because it will not balance, and then writing three sentences of interpretation for the twenty marks that remain.",
        },
        {
          kind: "list",
          style: "number",
          title: "Structuring an interpretation answer",
          items: [
            "**Head the answer for the user named in the requirement** — \"Report to the board of Alpha Co on the acquisition of Beta Co\". It costs one line and frames everything after it.",
            "**Use a sub-heading per theme**: profitability, liquidity, working capital, gearing. Four sub-headings make the coverage visible and stop you writing four points about margin and none about gearing.",
            "**One paragraph per point**, in the three-part structure from chapter 31 — movement, cause from the scenario, consequence for the user. Three or four sentences, not a page.",
            "**A separate short section on limitations and further information.** Three items, chosen for the scenario. These marks are the easiest in the question and the most often unclaimed.",
            "**A conclusion that answers the question asked.** If the requirement says \"advise whether\", the last paragraph must say whether.",
            "**Put the ratio table in the spreadsheet and reference it**, rather than reproducing numbers inside the prose. The narrative reads better and the marker finds both halves.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Two habits worth more than any amount of extra knowledge",
          md: "**Attempt every requirement.** FR's mark distribution is front-loaded within each part: the first few marks of any requirement are the easiest in it. A candidate who answers all parts adequately beats one who answers two parts beautifully, every time.\n\n**Read the requirement twice, and note the verb.** \"Calculate\" wants numbers and no narrative. \"Explain\" wants narrative and no numbers. \"Discuss\" wants both sides. \"Advise\" wants a recommendation. Answering the wrong verb is the one error that no amount of technical knowledge can recover — a perfect calculation earns nothing when the requirement said \"explain\".",
        },
      ],
      check: {
        q: "With 15 minutes of a Section C question remaining, your consolidated statement of financial position is out by $84,000 and part (c), worth 8 marks, is unattempted. What should you do?",
        options: [
          "Note the unlocated difference on the face of the answer and start part (c)",
          "Keep working on the difference — an unbalanced statement loses all the presentation marks",
          "Delete the statement and rebuild it from the beginning",
          "Reduce equity by $84,000 so that the statement balances",
        ],
        correct: 0,
        explain:
          "Marks come from the adjustments, not from the balance, and there are no marks for balancing as such. Eight unattempted marks are worth far more than the one or two the difference might represent. Note it and move on — and never plug the difference into equity, which turns a visible imbalance into an invisible error.",
      },
    },
  ],
  examTraps: [
    { trap: "Putting a single unexplained figure in a cell.", fix: "Method marks require a visible method. One labelled component per row." },
    { trap: "Hard-coding a computed figure into the statement.", fix: "Reference the working, so a revision flows through and no inconsistency appears." },
    { trap: "Writing interpretation narrative inside spreadsheet cells.", fix: "Use the word processor for prose. Cell text truncates and is hard to mark." },
    { trap: "Formatting the answer instead of finishing it.", fix: "No marks for appearance. Labels and correct figures only." },
    { trap: "Spending the last fifteen minutes hunting a small imbalance.", fix: "Halve the difference, check the six usual suspects, then note it and move on." },
    { trap: "Answering the requirement parts out of order and unlabelled.", fix: "Head each part with the question's own label so the marker can find it." },
    { trap: "Attempting only one of the two Section C questions thoroughly.", fix: "Both carry 20 marks and the early marks in each are the easiest. Split the time." },
  ],
  keyTerms: [
    { term: "Method marks", def: "Marks awarded for the visible steps of a calculation, available even where the final figure is wrong — provided the steps can be seen." },
    { term: "Own figure rule", def: "The marking convention under which a figure carried forward correctly from an earlier wrong answer still earns the later marks." },
    { term: "Check row", def: "A cell in the spreadsheet that computes a difference expected to be zero, used to verify a statement or an attribution." },
  ],
  summary: [
    "Most Section C marks are METHOD marks, and they only reach you if the method is visible.",
    "Use the numbered standard workings, one labelled component per row, and a two-column net assets working.",
    "Cross-reference figures to their workings, and show the balance check as a visible line.",
    "Spreadsheet for calculations and statements; word processor for anything asking you to explain, discuss, advise or report.",
    "Enter each input once and reference it; never hard-code a computed figure.",
    "Build liability tables as tables, with each closing balance feeding the next opening balance.",
    "When a statement will not balance: halve the difference, check the six usual suspects, then note it and move on.",
    "Both Section C questions carry 20 marks, and the early marks in each are the easiest — never sacrifice one for the other.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does layout affect the mark rather than only the presentation?", a: "Because most Section C marks are method marks, and a marker can only award them for steps they can see." },
    { q: "Which tool should be used for a requirement to 'discuss the appropriate accounting treatment'?", a: "The word processor. It is prose, and prose in spreadsheet cells truncates and is hard to mark." },
    { q: "Why should an input be entered once and referenced?", a: "So that a later requirement revising the assumption recalculates everything, instead of requiring every dependent figure to be retyped." },
    { q: "What is the first step when a statement of financial position will not balance?", a: "Halve the difference and look for that figure — a one-sided entry is the commonest cause." },
    { q: "How should the time be split across FR's Section C?", a: "Roughly equally between the two 20-mark questions, because the early marks in each are the easiest to earn." },
  ],
  furtherStudy: [
    "Chapter 26 — the numbered workings this chapter tells you to use",
    "Chapter 31 — the three-part interpretation point, which is what the word processor is for",
    "Chapter 24 — the balance check that proves a preparation answer",
  ],
}
