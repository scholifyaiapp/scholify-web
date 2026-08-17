import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area C — Strategy.
 *
 * The legacy shim relabelled ONE chapter (SBL_B) as Area C wholesale — six
 * sections for the whole of C1 to C5. Kaplan spends four chapters and 128 pages
 * on the same material, splitting strategic choice (40pp) from the methods of
 * development (26pp), which is the split adopted here.
 *
 *   SBL-12  Concepts of strategy and the JSW model            (C1)
 *   SBL-13  The macro-environment and strategic drift          (C2)
 *   SBL-14  Competitive forces, customers and the value chain  (C3)
 *   SBL-15  Resources, capabilities, competences and SWOT      (C4)
 *   SBL-16  Strategic choices: competitive strategy, portfolio (C5a, C5c, C5d)
 *   SBL-17  Directions and methods of development              (C5b, C5e, C5f)
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text.
 */

const SBL_TREE_12: StudyChapter = {
  paper: "SBL",
  id: "SBL-12",
  number: 12,
  area: "C",
  syllabusRefs: ["C1(a)", "C1(b)"],
  title: "Concepts of strategy and the JSW model",
  minutes: 16,
  intro:
    "A short chapter that pays for itself, because it gives you the structure the rest of Area C hangs on: position, choice, action. Most weak strategy answers are weak because they mix the three.",
  outcomes: [
    "Explain why strategy and strategic decisions matter, and how they differ across organisational contexts",
    "Apply the Johnson, Scholes and Whittington model — strategic position, strategic choices, strategy into action",
    "Distinguish strategic from operational decisions, and recognise when a task is asking about which",
    "Recognise emergent as well as deliberate strategy, and why plans and outcomes differ",
  ],
  sections: [
    {
      id: "what-strategy-is",
      heading: "What makes a decision strategic",
      blocks: [
        {
          kind: "text",
          md: "A strategic decision concerns the **direction and scope of an organisation over the longer term**, seeking advantage in a changing environment by matching resources and capabilities to what that environment demands, while meeting stakeholders' expectations. Unpacking that tells you how to recognise one.",
        },
        {
          kind: "table",
          caption: "Strategic against operational",
          head: ["Feature", "Strategic decision", "Operational decision"],
          rows: [
            ["Scope", "Whole organisation or a major part", "A function, process or period"],
            ["Horizon", "Years; hard to reverse", "Weeks or months; reversible"],
            ["Uncertainty", "High — depends on unknowable external change", "Lower — mostly internal variables"],
            ["Resource effect", "Commits or reallocates significant resource", "Uses resource already allocated"],
            ["Who decides", "Board", "Management within delegated authority"],
            ["Example", "Enter a new territory; change the business model", "Reschedule production; recruit to a vacancy"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Context changes what 'strategy' means",
          md: "In a listed company strategy is about competitive advantage and return on capital. In a public body it is about delivering mandated outcomes and public value within funding. In a charity it is about advancing a purpose with donated resources. In a family firm it may be about continuity and control across generations. Identify the context first — a competitive-advantage answer written for a public body misses the objective entirely.",
        },
        {
          kind: "text",
          md: "One further distinction is worth carrying: strategy is not always the result of a plan. **Deliberate** strategy is intended and formulated in advance; **emergent** strategy is the pattern that becomes visible in decisions actually taken. Real organisations produce both, and the gap between the two is often the most interesting thing in a case — a company whose stated strategy is premium service while every funded decision pursues volume has an emergent strategy that contradicts its plan.",
        },
      ],
      check: {
        q: "Which of these is a strategic rather than an operational decision?",
        options: [
          "Approving a replacement machine within the existing capital budget",
          "Moving from selling products outright to a subscription model",
          "Recruiting two additional staff into an existing team",
          "Rescheduling production to meet a customer's revised delivery date",
        ],
        correct: 1,
        explain:
          "A change of business model alters direction and scope, commits resources across years and is not readily reversible. The others operate within an existing allocation and horizon — which is exactly the distinction the definition captures.",
      },
    },
    {
      id: "jsw",
      heading: "The Johnson, Scholes and Whittington structure",
      blocks: [
        {
          kind: "text",
          md: "The JSW model divides strategic management into three interdependent elements. Its value in SBL is organisational: it tells you which question a task is asking, and therefore which tools belong in the answer.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Three elements, and the tools that belong to each",
            data: {
              steps: [
                { label: "Strategic position", sub: "Where are we? PESTEL, Five Forces, resources, stakeholders" },
                { label: "Strategic choices", sub: "Where could we go? Generic strategy, directions, methods" },
                { label: "Strategy into action", sub: "How do we get there? Structure, change, resources, projects" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Matching the requirement to the element",
          head: ["Requirement wording", "Element", "Tools that fit"],
          rows: [
            ["Assess the macro-environment / the industry", "Position", "PESTEL, drivers of change, Porter's Diamond, Five Forces"],
            ["Evaluate the organisation's capability", "Position", "Resources, competences, value chain, SWOT"],
            ["Advise which option to pursue", "Choices", "Suitability–acceptability–feasibility, BCG, Ansoff"],
            ["Advise how to grow", "Choices", "Organic development, acquisition, alliance, franchise"],
            ["Advise on implementation", "Action", "Structure, change management, projects, benefits"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The commonest structural error in Area C",
          md: "Answering a *position* question with *choices* content. A requirement to assess the external environment wants an evidenced picture of what is happening and what it means for this organisation — not a list of options it might pursue. Recommending strategies before the analysis has been asked for loses marks in both places: the analysis is missing, and the recommendation is unsupported.",
        },
        {
          kind: "text",
          md: "The three elements are interdependent rather than sequential. Analysis does not stop when choice begins; a chosen strategy changes the organisation's position, and difficulties in action often reveal that the analysis was wrong. In a case this matters practically: implementation problems are legitimate evidence that a strategy was poorly chosen, and saying so is a stronger answer than treating action purely as a delivery matter.",
        },
      ],
      check: {
        q: "A requirement reads: 'Assess the external factors affecting the organisation's future performance.' Which content belongs?",
        options: [
          "A recommendation of the growth strategy the company should adopt",
          "An evidenced analysis of macro-environmental and industry factors and what each means for this organisation",
          "A project plan for implementing the chosen strategy",
          "An evaluation of internal resources and competences",
        ],
        correct: 1,
        explain:
          "This is a strategic-position requirement, and specifically the external half of it. Option 3 is internal position — related but not asked; options 0 and 2 answer choices and action questions that were not set. Matching content to the element is most of the discipline in Area C.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing a competitive-advantage answer for a public body or charity.", fix: "Identify the context first — the objective may be mandated outcomes or a charitable purpose, not advantage." },
    { trap: "Recommending strategies in an analysis requirement.", fix: "Match content to the JSW element the requirement asks for; unsupported recommendations lose marks twice." },
    { trap: "Treating the stated strategy as the real one.", fix: "Compare it with the pattern of decisions actually funded — the emergent strategy is often the operative one." },
  ],
  keyTerms: [
    { term: "Strategy", def: "The direction and scope of an organisation over the longer term, matching resources to environment while meeting stakeholder expectations." },
    { term: "Deliberate strategy", def: "Strategy that is intended and formulated in advance of action." },
    { term: "Emergent strategy", def: "The pattern of strategy visible in decisions actually taken, whether or not it was planned." },
    { term: "Strategic position", def: "The organisation's environment, capability and stakeholder expectations — where it stands before choosing." },
    { term: "Strategy into action", def: "Turning a chosen strategy into structure, resources, change and projects that deliver it." },
  ],
  summary: [
    "Strategic decisions are long-horizon, organisation-wide, resource-committing and hard to reverse.",
    "What strategy means depends on context — commercial, public, charitable or family.",
    "JSW splits strategy into position, choices and action; each has its own tools.",
    "Answer the element the requirement asks for; do not recommend before analysing.",
    "Stated and emergent strategy often differ, and the gap is usually the finding.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three elements of the JSW model?", a: "Strategic position, strategic choices, and strategy into action." },
    { q: "Which tools belong to strategic position?", a: "PESTEL, drivers of change, Porter's Diamond, Five Forces, resources and competences, the value chain, SWOT and stakeholder analysis." },
    { q: "What distinguishes emergent from deliberate strategy?", a: "Deliberate strategy is intended in advance; emergent strategy is the pattern visible in decisions actually taken." },
    { q: "Why do implementation problems bear on strategic choice?", a: "Because difficulty in action is evidence the analysis or the choice was wrong, not merely a delivery failure." },
  ],
  furtherStudy: [
    "SBL-13 and SBL-14 cover external position",
    "SBL-15 covers internal position",
    "SBL-16 and SBL-17 cover strategic choices",
    "SBL-34 to SBL-39 cover strategy into action",
  ],
}

const SBL_TREE_13: StudyChapter = {
  paper: "SBL",
  id: "SBL-13",
  number: 13,
  area: "C",
  syllabusRefs: ["C2(a)", "C2(b)", "C2(c)", "C2(d)", "C2(e)"],
  title: "The macro-environment, drivers of change and strategic drift",
  minutes: 18,
  intro:
    "PESTEL is the most-written and least-rewarding model in SBL, because candidates list factors instead of drawing implications. This chapter is about the second half — turning an environmental factor into something a board can act on.",
  outcomes: [
    "Assess an organisation's macro-environment using PESTEL",
    "Evaluate the key external drivers of change likely to reshape a sector or market",
    "Apply Porter's Diamond to assess how national conditions affect competitive position",
    "Assess scenarios built on different assumptions about the future",
    "Assess the implications of strategic drift, and recognise its symptoms in a case",
  ],
  sections: [
    {
      id: "pestel",
      heading: "PESTEL, used properly",
      blocks: [
        {
          kind: "table",
          caption: "The six headings, with what to look for",
          head: ["Factor", "Typical content", "Strategic consequence"],
          rows: [
            ["Political", "Government policy, stability, trade relations, public spending", "Market access; subsidy or cost; planning horizon"],
            ["Economic", "Growth, interest and exchange rates, inflation, employment", "Demand, financing cost, input prices, margins"],
            ["Social", "Demographics, values, working patterns, expectations", "What customers want; who is available to employ"],
            ["Technological", "Automation, connectivity, data, platform models", "Cost base, product obsolescence, new entrants"],
            ["Environmental", "Climate, resource scarcity, waste, physical risk", "Input cost and availability; licence to operate"],
            ["Legal", "Regulation, employment, competition, data, product law", "Compliance cost; prohibitions; liability"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "One factor, three moves — anything less earns almost nothing",
          md: "**Name** the factor with the evidence from the exhibit; **quantify or direct** its effect (which cost, which revenue stream, how much, by when); **draw the implication** for the strategy under consideration. \"Interest rates are rising\" is worth nothing. \"Rates have risen 3 points; the £40m facility reprices in March, adding roughly £1.2m to annual interest against operating profit of £5m, so the acquisition's debt funding is no longer affordable on these terms\" is the answer.",
        },
        {
          kind: "text",
          md: "Two further disciplines separate strong PESTEL answers. First, **prioritise**: six headings with four factors each is twenty-four items, and a board cannot act on twenty-four things. Say which two or three matter most for this decision and why. Second, **be specific to the organisation** — a factor that affects everyone equally changes nobody's relative position, so the interesting factors are those that hit this organisation harder or help it more than its rivals.",
        },
      ],
      check: {
        q: "Which PESTEL point is written to earn marks?",
        options: [
          "Environmental regulation is becoming stricter across the industry",
          "New emissions limits apply from January to the two older plants, which produce 60% of output; retrofitting is estimated at $8m or those plants must close, so the expansion plan's capacity assumption fails",
          "Environmental factors are increasingly important for all organisations",
          "The company should improve its environmental performance",
        ],
        correct: 1,
        explain:
          "Only option 1 names the factor, quantifies its effect on this organisation's specific assets, and draws the consequence for the decision under discussion. Option 0 is generic, option 2 is a truism, and option 3 is a recommendation with no analysis behind it.",
      },
    },
    {
      id: "drivers-and-diamond",
      heading: "Drivers of change, and national competitiveness",
      blocks: [
        {
          kind: "text",
          md: "**Key drivers of change** are the small number of environmental forces that will reshape the structure of a sector — not every factor, but the ones capable of changing who competes, how, and on what basis. Identifying them is a more valuable exercise than PESTEL itself, because it forces prioritisation.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "How to identify a genuine driver",
          items: [
            "It affects **many participants**, not just this organisation",
            "It changes the **basis of competition** — cost structure, entry barriers, customer expectation",
            "Its direction is reasonably clear even if timing is not",
            "It is largely **outside any single participant's control**",
            "Responding to it demands strategic, not operational, change",
          ],
        },
        {
          kind: "text",
          md: "**Porter's Diamond** addresses a different question: why organisations based in some countries compete more successfully in a given industry than those based elsewhere. It matters in SBL when a case involves choosing a location, entering a market, or explaining why a home-market advantage may not travel.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "Porter's Diamond",
            data: {
              centre: "National competitive advantage",
              nodes: [
                { label: "Factor conditions", sub: "Skills, infrastructure, capital, natural resources" },
                { label: "Demand conditions", sub: "Sophisticated, demanding home customers raise standards" },
                { label: "Related and supporting industries", sub: "Capable local suppliers and clusters" },
                { label: "Firm strategy, structure and rivalry", sub: "Intense domestic rivalry drives improvement" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The counter-intuitive point examiners like",
          md: "Demanding home customers and fierce domestic rivalry are *advantages*, not burdens: they force continuous improvement that firms from comfortable markets never develop. So a company protected at home by weak competition and undemanding customers is often poorly equipped to compete abroad — which is the finding when a case shows a domestically dominant firm struggling on entry.",
        },
      ],
      check: {
        q: "A domestically dominant manufacturer with little home competition performs poorly after entering a competitive overseas market. Using Porter's Diamond, what is the most likely explanation?",
        options: [
          "Its factor conditions are inadequate for international operation",
          "Weak domestic rivalry and undemanding home customers never forced the improvement its new competitors have already made",
          "The overseas market has unfair regulatory barriers",
          "Related and supporting industries are irrelevant to international competitiveness",
        ],
        correct: 1,
        explain:
          "The Diamond's insight is that domestic pressure builds capability. Comfortable home conditions produce a firm that has never had to improve, and that gap appears the moment it meets rivals shaped by tougher conditions.",
      },
    },
    {
      id: "scenarios",
      heading: "Scenario analysis",
      blocks: [
        {
          kind: "text",
          md: "A **scenario** is an internally consistent description of a possible future environment, built to test whether a strategy would still work. Scenarios are not forecasts and carry no probabilities: their purpose is to expose the assumptions a strategy depends on, so a board can identify which ones would break it.",
        },
        {
          kind: "table",
          caption: "Building and using scenarios",
          head: ["Step", "What it involves", "Why it matters"],
          rows: [
            ["Identify the critical uncertainties", "The few variables with high impact and genuinely unknown direction", "Two well-chosen uncertainties beat twenty small ones"],
            ["Build consistent futures", "Combine them into three or four coherent worlds", "Inconsistent scenarios cannot be reasoned about"],
            ["Test the strategy in each", "Would it still deliver? What breaks?", "Reveals hidden dependencies"],
            ["Identify robust and contingent actions", "What is right in all worlds; what waits for a signal", "Converts analysis into a decision"],
            ["Define early-warning indicators", "Observable signs that one world is emerging", "Tells the board when to switch course"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Do not attach probabilities, and do not pick a 'most likely' scenario",
          md: "That converts scenario planning back into forecasting and defeats it — the organisation prepares for one future and is surprised by the others. The output is a strategy that survives several futures, plus triggers that say when to change.",
        },
        {
          kind: "text",
          md: "The distinction that earns marks is between **robust** and **contingent** decisions. A robust action is worth taking in every scenario — improving cost flexibility, shortening contract terms, building capability that has more than one use. A contingent action is right only in some, and should be prepared but held until an indicator fires. Advising which of a case's proposals is which is a much better answer than describing the scenarios.",
        },
      ],
      check: {
        q: "What is the primary purpose of scenario analysis?",
        options: [
          "To identify the most likely future and plan for it",
          "To assign probabilities to outcomes so expected values can be calculated",
          "To expose the assumptions a strategy depends on, and identify actions that hold across several futures",
          "To forecast revenue more accurately than a single-point estimate",
        ],
        correct: 2,
        explain:
          "Scenarios test a strategy's robustness rather than predict. Options 0, 1 and 3 all convert them back into forecasting, which reintroduces exactly the single-future assumption they exist to remove.",
      },
    },
    {
      id: "strategic-drift",
      heading: "Strategic drift",
      blocks: [
        {
          kind: "definition",
          term: "Strategic drift",
          md: "The gradual, often unnoticed divergence between an organisation's strategy and the changing conditions of its environment, as it continues to do what once worked.",
        },
        {
          kind: "text",
          md: "Drift is dangerous because it is comfortable. The organisation is not failing at anything it measures; it is succeeding at things that are ceasing to matter. Culture reproduces the old formula, incremental improvement makes performance look stable, and the mismatch is only visible from outside — until it becomes visible in results, by which point the response has to be dramatic.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "timeline",
            title: "How drift unfolds",
            data: {
              points: [
                { label: "Fit", sub: "Strategy suits the environment; performance is strong" },
                { label: "Incremental change", sub: "Small adjustments; environment moves faster" },
                { label: "Drift", sub: "Gap widens; results still acceptable; confidence high" },
                { label: "Flux", sub: "Performance falls; competing explanations; leadership churn" },
                { label: "Transformation or failure", sub: "Radical change, takeover, or decline" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Symptoms to name from an exhibit",
          head: ["Symptom", "Why it indicates drift"],
          rows: [
            ["Long-serving, homogeneous leadership", "The people who built the old formula are defending it"],
            ["Success attributed to internal virtue, decline to external factors", "The organisation has stopped learning from results"],
            ["Falling market share while absolute revenue holds", "The market grew and the organisation did not"],
            ["New entrants dismissed as niche or not real competitors", "The classic precursor to displacement"],
            ["Customer research confirms existing customers' preferences", "Asking only the people who have not left yet"],
            ["Improvement programmes all target efficiency", "Doing the same thing better, not differently"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The share-of-market test",
          md: "Rising revenue with falling market share is the single most reliable drift signal in an SBL exhibit, because the first number reassures the board and the second one tells the truth. If a case gives you both, use them together.",
        },
      ],
      check: {
        q: "A company's revenue has grown 3% a year for five years while its market share has fallen from 24% to 15%. Management cites consistent revenue growth as evidence of a sound strategy. What is the correct assessment?",
        options: [
          "The strategy is working, as revenue has grown throughout",
          "Strategic drift — the market has grown far faster than the company, so it is losing position while absolute figures reassure",
          "The market share data must be unreliable",
          "The company should reduce prices to regain share immediately",
        ],
        correct: 1,
        explain:
          "Share falling from 24% to 15% while revenue rises means the market grew roughly twice as fast as the company. Management is reading the reassuring number, which is precisely how drift persists — and option 3 jumps to a remedy before diagnosing why position was lost.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing PESTEL factors with no implication.", fix: "Name, quantify or direct, then draw the consequence for the decision — and prioritise two or three." },
    { trap: "Citing factors that affect the whole industry equally.", fix: "Relative position only changes where a factor hits this organisation differently from its rivals." },
    { trap: "Attaching probabilities to scenarios or choosing the most likely.", fix: "Scenarios test robustness. Separate robust actions from contingent ones and define early-warning indicators." },
    { trap: "Reading revenue growth as evidence of strategic health.", fix: "Check share. Rising revenue with falling share is the clearest drift signal available." },
  ],
  keyTerms: [
    { term: "PESTEL", def: "A framework for macro-environmental analysis: political, economic, social, technological, environmental and legal factors." },
    { term: "Key driver of change", def: "An environmental force capable of reshaping a sector's structure and basis of competition." },
    { term: "Porter's Diamond", def: "An explanation of national competitive advantage through factor conditions, demand conditions, related and supporting industries, and firm strategy, structure and rivalry." },
    { term: "Scenario", def: "An internally consistent description of a possible future environment, used to test a strategy rather than to forecast." },
    { term: "Robust action", def: "A decision worth taking across all scenarios considered." },
    { term: "Strategic drift", def: "Gradual loss of fit between strategy and environment as an organisation continues doing what previously worked." },
  ],
  summary: [
    "PESTEL earns marks only through implications: name, quantify, conclude — and prioritise.",
    "Drivers of change are the few forces that reshape a sector's basis of competition.",
    "Porter's Diamond explains why demanding home markets build exportable capability.",
    "Scenarios test robustness; separate robust from contingent actions and set trigger indicators.",
    "Drift is comfortable and quiet — rising revenue with falling share is the giveaway.",
  ],
  knowledgeDiagnostic: [
    { q: "What three moves turn a PESTEL factor into marks?", a: "Name it with exhibit evidence, quantify or direct its effect on this organisation, and draw the implication for the decision." },
    { q: "What makes an environmental force a key driver of change?", a: "It affects many participants, changes the basis of competition, has a fairly clear direction, is outside any one firm's control, and demands strategic change." },
    { q: "What are the four elements of Porter's Diamond?", a: "Factor conditions; demand conditions; related and supporting industries; and firm strategy, structure and rivalry." },
    { q: "Why should probabilities not be attached to scenarios?", a: "It converts scenario planning back into forecasting, so the organisation prepares for one future and is surprised by the rest." },
    { q: "What is the most reliable single symptom of strategic drift?", a: "Revenue rising while market share falls — the first number reassures management while the second shows position being lost." },
  ],
  furtherStudy: [
    "SBL-14 narrows from macro-environment to industry competition",
    "SBL-02 covers the culture that sustains drift",
    "SBL-17 covers responses once drift is identified",
    "SBL-38 covers the transformational change drift eventually forces",
  ],
}

const SBL_TREE_14: StudyChapter = {
  paper: "SBL",
  id: "SBL-14",
  number: 14,
  area: "C",
  syllabusRefs: ["C3(a)", "C3(b)", "C3(c)", "C3(d)", "C3(e)"],
  title: "Competitive forces, customers and the value chain",
  minutes: 19,
  intro:
    "Five Forces explains why an industry is profitable or not; the value chain explains where inside the organisation profit is actually created. Both are routinely reduced to diagrams with no conclusion attached.",
  outcomes: [
    "Work out where competitive pressure in an industry actually comes from, using Porter's Five Forces",
    "Analyse customers and markets, including segmentation",
    "Apply the value chain to identify where value is added and advantage sustained",
    "Advise on how partners beyond the organisation's own boundary shape the value a customer receives",
    "Evaluate the opportunities and threats the competitive environment presents",
  ],
  sections: [
    {
      id: "five-forces",
      heading: "Five Forces, and what the conclusion has to be",
      blocks: [
        {
          kind: "text",
          md: "Porter's framework explains **industry profitability**: the five forces between them determine how much of the value created in an industry can be retained by the firms in it, rather than captured by customers, suppliers, substitutes or new entrants. That is the conclusion a Five Forces answer must reach — not a description of each force, but a judgement on whether this industry can be profitable and where the pressure comes from.",
        },
        {
          kind: "table",
          caption: "The five forces, and what makes each strong",
          head: ["Force", "Strong when", "Effect on profit"],
          rows: [
            ["Competitive rivalry", "Many similar firms, slow growth, high fixed costs, little differentiation, high exit barriers", "Price competition erodes margin"],
            ["Threat of new entry", "Low capital need, no scale economies, easy access to channels, weak brands, no regulation", "Capacity and price pressure; caps returns"],
            ["Threat of substitutes", "Alternatives meet the same need at better value; low switching cost", "Ceiling on prices regardless of rivalry"],
            ["Bargaining power of buyers", "Few large buyers, undifferentiated product, low switching cost, credible backward integration", "Buyers extract price and service concessions"],
            ["Bargaining power of suppliers", "Few suppliers, unique input, high switching cost, credible forward integration", "Input costs rise; margin transfers upstream"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Use the exhibit's numbers, and name the dominant force",
          md: "If the case says the top three customers are 68% of revenue, that is buyer power quantified — say so. Then name which force dominates and what follows: an industry whose problem is buyer concentration needs a different strategy (differentiation, broadening the customer base) from one whose problem is easy entry (scale, brand, contractual lock-in).",
        },
        {
          kind: "text",
          md: "Two refinements are worth having. First, the analysis is of an **industry**, not a company, so the same analysis applies to competitors — the interesting question is whether this organisation is better or worse placed than its rivals against the dominant force. Second, forces can be *changed*, not only endured: a firm can raise entry barriers, reduce buyer power by broadening its base, or convert a substitute into a complement. Recommending how to change a force is a stronger answer than recommending how to live with it.",
        },
        {
          kind: "text",
          md: "In the public and not-for-profit sectors the framework needs translating rather than discarding: rivalry may be competition for funding or for beneficiaries, buyer power may sit with commissioners, and entry may be controlled by policy. Say what you are substituting and why.",
        },
      ],
      check: {
        q: "A components manufacturer sells 71% of output to three vehicle assemblers, who publish detailed technical specifications and re-tender annually. Which force dominates, and what follows?",
        options: [
          "Threat of new entry — the company should lobby for regulation",
          "Buyer power — the company should reduce dependence by broadening its customer base or developing differentiated products buyers cannot easily re-tender",
          "Rivalry — the company should cut prices to retain the three customers",
          "Supplier power — the company should integrate backwards",
        ],
        correct: 1,
        explain:
          "Concentration, a specified product and annual re-tendering are all buyer-power indicators, and 71% quantifies the exposure. Option 2 responds by conceding margin, which strengthens the very force causing the problem — the useful advice reduces the dependence or removes the ease of switching.",
      },
    },
    {
      id: "customers-and-segments",
      heading: "Customers, markets and segmentation",
      blocks: [
        {
          kind: "text",
          md: "A **market segment** is a group of customers whose needs and buying behaviour are similar enough to be served by the same offer, and different enough from others to justify a distinct one. Segmentation matters strategically because it determines where an organisation can be genuinely strong: few organisations can be best for everyone, and trying is how a firm ends up mediocre for all.",
        },
        {
          kind: "table",
          caption: "Bases for segmentation",
          head: ["Basis", "Examples"],
          rows: [
            ["Customer characteristics", "Age, income, location, household composition"],
            ["Organisational characteristics", "Industry, size, ownership, procurement approach"],
            ["Benefit sought", "Price, reliability, speed, status, sustainability"],
            ["Behaviour", "Purchase frequency, channel used, loyalty, price sensitivity"],
            ["Value to the organisation", "Lifetime value, cost to serve, margin"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Cost to serve is the segmentation SBL rewards",
          md: "Two segments of equal revenue can differ completely in profitability once returns, support calls, bespoke requirements, delivery and payment behaviour are counted. Where a case supplies cost-to-serve information, the strongest analysis identifies the segment that generates revenue and destroys value — and advises whether to reprice it, re-specify it, or exit it.",
        },
        {
          kind: "text",
          md: "The critical success factors a segment cares about are what connect segmentation to capability: for one segment price and availability decide the purchase, for another it is technical support and continuity. An organisation should compete where its own strengths match what the segment actually values — and a case often shows one that does the opposite, competing on price into a segment that would pay for reliability.",
        },
      ],
      check: {
        q: "Segment A generates $4m revenue at 30% gross margin but consumes most of the support function and has high returns; segment B generates $4m at 22% margin with minimal support. What does this suggest?",
        options: [
          "Segment A is more attractive because its gross margin is higher",
          "Gross margin alone is misleading — cost to serve may make B the more profitable segment, and A should be repriced, re-specified or exited",
          "Both segments are equally attractive as revenue is identical",
          "Support costs are period costs and irrelevant to segment analysis",
        ],
        correct: 1,
        explain:
          "Gross margin stops before the costs that differ most between these segments. The 8-point margin advantage can easily be consumed by support and returns, which is why cost to serve is the analysis that changes the decision.",
      },
    },
    {
      id: "value-chain",
      heading: "The value chain, and value networks",
      blocks: [
        {
          kind: "text",
          md: "The value chain disaggregates the organisation into the activities through which it creates value, so that cost and differentiation can be traced to where they actually arise. **Primary activities** move the product or service to the customer; **support activities** enable them.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "Primary and support activities",
            data: {
              items: [
                { title: "Inbound logistics", sub: "Primary — receiving, storing, distributing inputs" },
                { title: "Operations", sub: "Primary — transforming inputs into the offering" },
                { title: "Outbound logistics", sub: "Primary — getting the offering to the customer" },
                { title: "Marketing and sales", sub: "Primary — informing and persuading; pricing and channel" },
                { title: "Service", sub: "Primary — installation, support, maintenance, returns" },
                { title: "Procurement", sub: "Support — acquiring inputs across the chain" },
                { title: "Technology development", sub: "Support — product and process capability" },
                { title: "Human resource management", sub: "Support — recruiting, developing, rewarding" },
                { title: "Firm infrastructure", sub: "Support — planning, finance, legal, quality, governance" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The point is the LINKAGES, not the nine boxes",
          md: "Advantage usually comes from how activities connect, because linkages are what competitors cannot copy by imitating a single activity. Designing a product for easy servicing links technology development to service; sharing forecast data links procurement to operations. When a case describes a problem in one activity, look for the linkage that caused it — a service failure is very often an operations or design decision arriving late.",
        },
        {
          kind: "text",
          md: "A **value network** extends the same logic beyond the organisation's boundary, to the suppliers, distributors, partners and even customers who together deliver the value the customer experiences. It matters because much of what determines a customer's experience is now performed by someone else: an outsourced delivery partner, a platform, a franchisee, an implementation consultancy.",
        },
        {
          kind: "table",
          caption: "Governing a value network",
          head: ["Question", "Why it matters"],
          rows: [
            ["Which activities must we own?", "Those carrying the differentiation or the critical risk"],
            ["Where does the customer experience actually happen?", "Reputational exposure sits with whoever the customer meets"],
            ["Who holds the data?", "A partner holding customer data holds part of the relationship"],
            ["What performance is contracted, and how is it measured?", "Unmeasured obligations are not managed"],
            ["What is the exit route?", "A partner who cannot be replaced has become a supplier with power"],
            ["Are our standards applied to their conduct?", "Ethical and legal exposure travels along the network"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Outsourcing transfers activity, never accountability",
          md: "If a partner mistreats workers, loses customer data or delivers badly, the organisation's customers and regulators will hold the organisation responsible. So a recommendation to outsource must come with due diligence, contracted standards, monitoring and an exit route — otherwise the saving is bought with an unmanaged risk.",
        },
      ],
      check: {
        q: "A company outsources delivery to cut cost. Complaints rise sharply and its brand is criticised publicly, though the contract's delivery-time target is being met. What does value-network thinking suggest?",
        options: [
          "No action is needed, since the contractual target is being achieved",
          "The customer experiences the partner as the company; the contracted measure does not capture what customers value, so the specification and monitoring must change",
          "The company should immediately terminate the contract",
          "Complaints are the delivery partner's responsibility to resolve",
        ],
        correct: 1,
        explain:
          "Meeting the contracted metric while customers become dissatisfied means the wrong thing was contracted — a classic outcome when an activity is outsourced on cost and measured on the easiest variable. Accountability for the experience stayed with the company, which is why options 0 and 3 fail.",
      },
    },
    {
      id: "opportunities-threats",
      heading: "Turning the analysis into opportunities and threats",
      blocks: [
        {
          kind: "text",
          md: "C3(e) asks you to evaluate the opportunities and threats the competitive environment poses — which is where the external analysis becomes usable. The discipline is that an opportunity or threat must be **specific to this organisation and actionable**, otherwise it is just an observation.",
        },
        {
          kind: "table",
          caption: "From observation to opportunity or threat",
          head: ["Observation", "Weak version", "Usable version"],
          rows: [
            ["A competitor has withdrawn from a region", "Opportunity to grow", "Capacity exists to absorb their 12% share within 6 months using the current depot network, without capital spend"],
            ["Buyers are consolidating", "Threat of buyer power", "Two of our four largest buyers are merging, taking 44% of revenue under one negotiator at the next re-tender"],
            ["Technology is changing the industry", "Threat of disruption", "Our platform cannot support subscription billing, so the shift to recurring contracts requires a system replacement we have not budgeted"],
            ["Regulation is tightening", "Threat of compliance cost", "New standards apply to 60% of our range from next year; reformulation lead time is 9 months and we have 7"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Quantify the exposure and state the timing",
          md: "'How much' and 'by when' are what let a board prioritise, and they are usually available in the exhibits. A threat with no magnitude and no date cannot be ranked against anything else, so it cannot be acted on.",
        },
      ],
      check: {
        q: "Which is a properly framed threat?",
        options: [
          "Increasing competition in the sector",
          "Possible future changes in customer preferences",
          "Two of our four largest buyers are merging, bringing 44% of revenue under a single negotiator before the next re-tender in eight months",
          "The general risk of technological disruption",
        ],
        correct: 2,
        explain:
          "It is specific to this organisation, quantified, dated and therefore actionable — a board can decide what to do before the re-tender. The others could be written about any company in any industry.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing five forces without concluding on industry profitability.", fix: "Name the dominant force, use the exhibit's numbers, and say what strategy follows." },
    { trap: "Treating Five Forces as fixed constraints.", fix: "Recommend changing a force — raise entry barriers, broaden the buyer base, convert a substitute into a complement." },
    { trap: "Segmenting on revenue and ignoring cost to serve.", fix: "Support, returns, bespoke work and payment behaviour can reverse which segment is profitable." },
    { trap: "Listing the nine value-chain activities.", fix: "Advantage sits in the linkages; trace a described failure back to the activity that caused it." },
    { trap: "Writing opportunities and threats that could apply to any company.", fix: "Make each specific to this organisation, quantified and dated." },
  ],
  keyTerms: [
    { term: "Five Forces", def: "Rivalry, new entry, substitutes, buyer power and supplier power — together determining industry profitability." },
    { term: "Market segment", def: "A group of customers similar enough to serve with one offer and distinct enough to justify a separate one." },
    { term: "Cost to serve", def: "The full cost of supporting a customer or segment, including support, returns, bespoke work and payment behaviour." },
    { term: "Value chain", def: "The primary and support activities through which an organisation creates value, used to locate cost and differentiation." },
    { term: "Linkage", def: "A connection between activities that creates advantage competitors cannot copy by imitating one activity alone." },
    { term: "Value network", def: "The wider set of suppliers, partners, distributors and customers that together deliver the value a customer experiences." },
  ],
  summary: [
    "Five Forces explains industry profitability — conclude on it, and name the dominant force.",
    "Forces can be changed, not just endured; and the analysis applies to rivals too.",
    "Segment by benefit sought and by cost to serve, not revenue alone.",
    "The value chain's power is in linkages; trace failures back through them.",
    "Outsourcing moves activity, not accountability — contract, monitor and keep an exit route.",
  ],
  knowledgeDiagnostic: [
    { q: "What do the five forces collectively determine?", a: "How much of the value created in an industry the firms in it can retain — that is, industry profitability." },
    { q: "Give four indicators of strong buyer power.", a: "Few large buyers, an undifferentiated product, low switching costs, and a credible threat of backward integration." },
    { q: "Why can cost to serve reverse a segment decision?", a: "Support, returns, bespoke requirements and payment behaviour differ sharply between segments and fall below gross margin." },
    { q: "Where does value-chain advantage usually come from?", a: "The linkages between activities, because a competitor cannot replicate them by imitating a single activity." },
    { q: "What must accompany a recommendation to outsource?", a: "Due diligence, contracted standards covering what customers actually value, monitoring, and a workable exit route — accountability does not transfer." },
  ],
  furtherStudy: [
    "SBL-13 covers the macro-environment surrounding these industry forces",
    "SBL-15 covers the internal capability side of strategic position",
    "SBL-25 develops e-business and the value chain (E4)",
    "SBL-34 covers collaborative working and partnering arrangements",
  ],
}

const SBL_TREE_15: StudyChapter = {
  paper: "SBL",
  id: "SBL-15",
  number: 15,
  area: "C",
  syllabusRefs: ["C4(a)", "C4(b)", "C4(c)", "C4(d)"],
  title: "Resources, capabilities, competences and SWOT",
  minutes: 17,
  intro:
    "The distinction between a threshold resource and a core competence looks like terminology and is actually the whole point: only one of them can sustain an advantage, and candidates who blur them recommend investing in the wrong things.",
  outcomes: [
    "Identify and evaluate strategic capability — threshold resources and competences, unique resources and core competences",
    "Explain what makes a capability capable of sustaining competitive advantage",
    "Discuss how organisational knowledge contributes to strategic capability",
    "Identify strengths and weaknesses and construct a SWOT analysis that supports a decision",
  ],
  sections: [
    {
      id: "the-four-terms",
      heading: "Four terms, and why the difference matters",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Threshold and distinctive capability",
            data: {
              leftTitle: "Threshold — needed to compete at all",
              rightTitle: "Distinctive — the basis of advantage",
              rows: [
                { aspect: "Resources (what we have)", left: "Threshold resources: the minimum assets to operate", right: "Unique resources: assets others cannot readily obtain" },
                { aspect: "Competences (what we do well)", left: "Threshold competences: the standard of activity expected", right: "Core competences: activities performed in a way rivals cannot match" },
                { aspect: "Consequence of lacking it", left: "Cannot participate in the market", right: "Can participate, but cannot outperform" },
                { aspect: "Strategic action", left: "Achieve it efficiently; do not over-invest", right: "Protect, deepen and exploit it" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The practical consequence is a resource-allocation rule. Threshold capabilities should be met at the lowest sensible cost — being outstanding at something every competitor also has buys nothing. Distinctive capabilities are where investment earns a return, because they are the only things that can produce an advantage a competitor cannot immediately erase.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Competences beat resources for durability",
          md: "A unique resource can often be bought, copied or made obsolete — a location, a licence, a patent that expires. A core competence lives in how people, processes and knowledge combine, which is far harder to observe and therefore to imitate. When a case asks what advantage is sustainable, look at what the organisation *does* well, not only what it *owns*.",
        },
        {
          kind: "table",
          caption: "Testing whether a capability can sustain advantage",
          head: ["Test", "Question", "Failure means"],
          rows: [
            ["Value", "Does it let us do something customers will pay for?", "It is a strength nobody wants"],
            ["Rarity", "Do competitors lack it?", "It is threshold, not distinctive"],
            ["Difficulty of imitation", "Is it hard to copy, buy or substitute?", "Advantage will be temporary"],
            ["Non-substitutability", "Can the same benefit be reached another way?", "A different route will erode it"],
            ["Exploitability", "Are we organised to actually use it?", "A capability owned and unused earns nothing"],
          ],
        },
        {
          kind: "text",
          md: "The last test catches a common case situation: an organisation genuinely possesses a distinctive capability and cannot exploit it, because its structure, incentives or information prevent the capability reaching a decision. Recommending exploitation rather than acquisition is then the right advice, and it is cheaper.",
        },
      ],
      check: {
        q: "A haulier's fleet is modern and well maintained, as are all its competitors'. Its unusual ability to reschedule loads within hours after a disruption has retained several major contracts. Which is the core competence?",
        options: [
          "The fleet, because it is a substantial and well-maintained asset",
          "The rescheduling capability, because it is valuable, rare and hard to imitate",
          "Both equally, as each contributes to service",
          "Neither; only patents and licences can be core competences",
        ],
        correct: 1,
        explain:
          "The fleet is a threshold resource — necessary to compete and possessed by everyone, so it cannot differentiate. The rescheduling ability is valued by customers, rare, and rooted in people and process rather than assets, which is exactly what makes it hard to copy.",
      },
    },
    {
      id: "knowledge",
      heading: "Organisational knowledge",
      blocks: [
        {
          kind: "text",
          md: "C4(c) asks about knowledge as a source of strategic capability, and the reason it matters is precisely that much of it is difficult to transfer. **Explicit** knowledge can be written down — procedures, specifications, data, documented designs. **Tacit** knowledge sits in experience and judgement: knowing which customer will accept a substitute, recognising that a machine sounds wrong, knowing who to call.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Tacit knowledge is a strength and a single point of failure",
          md: "Because it is hard to copy, tacit knowledge protects an advantage. Because it is undocumented and personal, it walks out of the door with the person who holds it. When a case mentions a long-serving expert with no successor, both halves are findings: the capability is genuinely distinctive, *and* it is unprotected.",
        },
        {
          kind: "table",
          caption: "Managing knowledge as a capability",
          head: ["Action", "What it achieves", "Limit"],
          rows: [
            ["Documentation and standard procedures", "Converts tacit to explicit; enables scale", "Loses judgement and exceptions; can become box-ticking"],
            ["Communities of practice, mentoring, shadowing", "Transfers judgement person to person", "Slow; depends on willingness to share"],
            ["Systems and shared data", "Makes explicit knowledge findable and reusable", "Storage is not sharing; content decays"],
            ["Succession and cross-training", "Removes single points of failure", "Costs capacity in the short term"],
            ["Reward for sharing", "Counters knowledge hoarding", "Hoarding is rational where expertise means security"],
          ],
        },
        {
          kind: "text",
          md: "Note the incentive point in the last row, because it explains why knowledge-management initiatives fail. If an individual's standing rests on being the only person who understands a system, sharing that understanding reduces their value. A recommendation to 'document key knowledge' with nothing said about why anyone would comply is not a recommendation.",
        },
      ],
      check: {
        q: "A firm's competitive edge rests on one engineer's judgement about which repairs are economic. She is due to retire in a year and has no documented method. What are the two findings?",
        options: [
          "Only that documentation is needed before she leaves",
          "The capability is genuinely distinctive because it is tacit and hard to imitate, and it is a single point of failure requiring transfer through documentation, shadowing and succession",
          "Only that the firm should recruit a replacement engineer",
          "That the capability is worthless because it is undocumented",
        ],
        correct: 1,
        explain:
          "Both halves matter and they are two sides of the same property: tacitness is what makes the advantage durable against competitors and fragile against retirement. Recruiting alone does not transfer judgement, which is why option 2 is insufficient.",
      },
    },
    {
      id: "swot",
      heading: "SWOT that supports a decision",
      blocks: [
        {
          kind: "text",
          md: "SWOT summarises internal strengths and weaknesses alongside external opportunities and threats. It is the most frequently produced and least useful strategic output, because a four-box list of adjectives supports no decision. What makes it worth marks is doing something with the combinations.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Using SWOT: match and convert",
            data: {
              leftTitle: "Strength",
              rightTitle: "Weakness",
              rows: [
                { aspect: "Opportunity", left: "MATCH — exploit: which strength lets us take this opportunity?", right: "CONVERT — what capability must we build to take it?" },
                { aspect: "Threat", left: "DEFEND — which strength blunts this threat?", right: "CRITICAL — greatest exposure; mitigate or avoid" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "number",
          title: "Rules for a SWOT that earns marks",
          items: [
            "**Keep internal and external apart** — a strength is something the organisation has or does; an opportunity is in the environment. 'Growing market' is not a strength",
            "**Be specific and evidenced** — cite the exhibit, quantify where possible",
            "**Prioritise** — three or four items per box that matter, not twelve that do not",
            "**Pair them** — strength-with-opportunity, weakness-with-threat; the pairing is the analysis",
            "**Conclude** — say what the organisation should do, given the pattern",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The weakness-meets-threat box is where the marks are",
          md: "It identifies the organisation's greatest exposure: a threat it is least equipped to withstand. If a case gives you a weakness in systems and a threat requiring a systems response, that intersection is the most important thing in your answer — and it is the box candidates most often leave empty.",
        },
        {
          kind: "example",
          title: "Pairing, not listing",
          scenario:
            "Strengths: strong engineering reputation; long-standing relationships with three large customers. Weaknesses: legacy billing system; no digital sales channel. Opportunities: customers moving to service-contract purchasing. Threats: a new entrant selling online with subscription pricing.",
          steps: [
            { label: "Match", detail: "Engineering reputation plus the shift to service contracts — the reputation is precisely what makes a service contract credible, so this is the opportunity to pursue first." },
            { label: "Critical", detail: "Legacy billing and no digital channel against a subscription-based online entrant — the weakness sits exactly where the threat attacks." },
            { label: "Rank", detail: "The critical intersection is urgent because it blocks the matched opportunity too: service contracts need recurring billing." },
            { label: "Conclude", detail: "Fund the billing and channel capability as the enabler of the service-contract strategy, rather than as an IT project justified separately." },
          ],
          result:
            "The pairing turns four lists into one prioritised recommendation, and reveals that the weakness and the opportunity require the same investment.",
        },
      ],
      check: {
        q: "Which item is misplaced in a SWOT analysis?",
        options: [
          "Strength: an engineering reputation that wins tenders without price competition",
          "Strength: a rapidly growing market for the company's product category",
          "Weakness: a billing system that cannot support recurring charges",
          "Threat: a new entrant offering subscription pricing online",
        ],
        correct: 1,
        explain:
          "A growing market is external — an opportunity, not a strength, since every competitor has it too. This is the most common SWOT error, and it matters because misclassifying it turns a shared market condition into an imagined advantage.",
      },
    },
  ],
  examTraps: [
    { trap: "Calling every asset a core competence.", fix: "Threshold capabilities are needed to compete and cannot differentiate; test value, rarity, imitability, substitutability and exploitability." },
    { trap: "Over-investing in threshold capabilities.", fix: "Meet them efficiently; invest where the capability is distinctive." },
    { trap: "Recommending documentation of tacit knowledge with no incentive to share.", fix: "Address why an expert whose standing rests on exclusivity would comply." },
    { trap: "Listing SWOT items in four boxes and stopping.", fix: "Pair strengths with opportunities and weaknesses with threats, then conclude. The weakness-threat box is the priority." },
    { trap: "Placing external market conditions under strengths.", fix: "Strengths are internal; a growing market is an opportunity shared with every rival." },
  ],
  keyTerms: [
    { term: "Threshold resources", def: "The minimum assets required to operate in a market at all." },
    { term: "Threshold competences", def: "The standard of activity expected of any participant in the market." },
    { term: "Unique resources", def: "Assets competitors cannot readily obtain or replicate." },
    { term: "Core competences", def: "Activities performed in a way rivals cannot match, rooted in people, process and knowledge." },
    { term: "Tacit knowledge", def: "Judgement and experience that is hard to document, making it both hard to imitate and easy to lose." },
    { term: "SWOT", def: "A summary of internal strengths and weaknesses against external opportunities and threats, useful only when the items are paired and prioritised." },
  ],
  summary: [
    "Threshold capabilities let you compete; distinctive ones let you win. Fund accordingly.",
    "Competences outlast unique resources because they are harder to observe and copy.",
    "Test capability by value, rarity, imitability, substitutability and whether you can exploit it.",
    "Tacit knowledge protects advantage and creates single points of failure at the same time.",
    "SWOT works by pairing; weakness meeting threat is the critical intersection.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between a threshold and a core competence?", a: "A threshold competence is the standard expected of any market participant; a core competence is performed in a way rivals cannot match and can therefore sustain advantage." },
    { q: "Why are competences usually more durable than unique resources?", a: "Resources can often be bought, copied or made obsolete; competences live in combinations of people, process and knowledge that are hard to observe and imitate." },
    { q: "What does the exploitability test catch?", a: "An organisation that genuinely holds a distinctive capability but cannot use it because structure, incentives or information prevent it reaching decisions." },
    { q: "How is a SWOT made useful?", a: "By pairing — strength with opportunity to exploit, weakness with threat to identify the critical exposure — then prioritising and concluding." },
  ],
  furtherStudy: [
    "SBL-14 covers the value chain, which locates competences in activities",
    "SBL-16 uses capability to evaluate strategic options",
    "SBL-36 covers talent management and the POPIT view of capability",
    "SBL-37 covers performance excellence and critical success factors",
  ],
}

const SBL_TREE_16: StudyChapter = {
  paper: "SBL",
  id: "SBL-16",
  number: 16,
  area: "C",
  syllabusRefs: ["C5(a)", "C5(c)", "C5(d)"],
  title: "Strategic choices: competitive strategy and portfolio",
  minutes: 18,
  intro:
    "Where the analysis becomes a decision. This chapter covers how an organisation chooses to compete, and how it manages a collection of businesses or services — including the public sector version of the portfolio question.",
  outcomes: [
    "Assess and advise on the strategic options available to an organisation",
    "Advise how price-based strategies, differentiation, lock-in and the extended marketing mix sustain advantage",
    "Apply the BCG matrix and the public sector portfolio matrix to portfolio decisions",
    "Evaluate options systematically for suitability, acceptability and feasibility",
  ],
  sections: [
    {
      id: "competitive-strategy",
      heading: "How to compete: cost, differentiation and focus",
      blocks: [
        {
          kind: "text",
          md: "An organisation competes either by offering a comparable product at lower cost, or by offering something customers value enough to pay more for — and it does so either across a broad market or in a narrow segment. That produces the familiar set of positions, and the strategic risk is being clearly in none of them.",
        },
        {
          kind: "table",
          caption: "Positions, requirements and risks",
          head: ["Position", "What it requires", "Characteristic risk"],
          rows: [
            ["Cost leadership", "Scale, process discipline, low overhead, tight capital control", "A rival achieves lower cost; cost cutting damages the offer"],
            ["Differentiation", "Something customers value and rivals lack; ability to communicate it", "The feature is imitated, or ceases to justify the premium"],
            ["Cost focus", "Lowest cost within a defined narrow segment", "The segment is entered by a broad-scope low-cost rival"],
            ["Differentiation focus", "Deep fit with one segment's specific needs", "The segment is too small, or its needs converge with the mass market"],
            ["No clear position", "—", "Undercut by the low-cost rival and out-specified by the differentiator"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Price-based competition needs a cost advantage first",
          md: "Cutting price without a lower cost base simply transfers margin to customers and invites a price war the lowest-cost competitor will win. So when a case has management proposing a price reduction to regain share, the first question is whether they hold any cost advantage to sustain it — usually they do not, and saying so is the finding.",
        },
        {
          kind: "text",
          md: "**Lock-in** is the third route, and the one candidates under-use. An organisation achieves it when switching becomes costly or awkward for the customer: integrated systems, accumulated data and history, contract structure, training investment, ecosystems of compatible products, or simply being the standard others build around. Lock-in sustains advantage without requiring the lowest cost or a permanently superior product — which is why it is often the most realistic recommendation for a mid-sized organisation.",
        },
        {
          kind: "text",
          md: "The extended marketing mix — the **seven Ps** — is how a chosen position is delivered in practice: product, price, place and promotion, plus people, process and physical evidence. The last three matter most for services, because in a service the staff, the procedure and the tangible surroundings *are* the product from the customer's point of view. Where a case describes a service business with an inconsistent customer experience, those three are where the diagnosis lies.",
        },
      ],
      check: {
        q: "A mid-sized manufacturer with average unit costs proposes cutting prices 10% to win share from a larger, lower-cost rival. What is the primary objection?",
        options: [
          "Price reductions always damage brand perception",
          "Without a cost advantage the reduction gives away margin and invites a response the lower-cost rival can sustain for longer",
          "Market share is not a legitimate strategic objective",
          "The reduction is too small to affect customer behaviour",
        ],
        correct: 1,
        explain:
          "Price competition is only sustainable from a cost position. The larger rival can match the cut and endure it, so the likely outcome is the same relative position at lower industry margins — with this company weaker in absolute terms.",
      },
    },
    {
      id: "portfolio",
      heading: "Portfolio models, public and private",
      blocks: [
        {
          kind: "text",
          md: "Where an organisation runs several businesses, products or services, the strategic question is not only how each competes but what the collection should look like: which units to fund, which to hold, and which to exit. The **BCG matrix** frames this on two axes — relative market share and market growth.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The BCG matrix",
            data: {
              leftTitle: "Low relative share",
              rightTitle: "High relative share",
              rows: [
                { aspect: "High market growth", left: "QUESTION MARK — invest to build share, or exit; consumes cash", right: "STAR — invest to hold position; roughly cash neutral" },
                { aspect: "Low market growth", left: "DOG — usually exit or reposition in a niche", right: "CASH COW — harvest; funds the rest of the portfolio" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Used properly the matrix is about **cash flow between units**: cash cows generate the funds that stars need to hold position and that question marks need to build it. So a portfolio of question marks with no cash cow is not a growth strategy, it is a funding crisis; and a portfolio of nothing but cash cows is a business with no future.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Three limitations to state whenever you use it",
          md: "Share and growth alone ignore profitability, competitive position and how units depend on one another. A 'dog' may be strategically necessary — it may complete a product range customers buy as a set, absorb overhead, or hold a customer relationship. And the classifications depend entirely on how the market is defined, which is a choice the analyst makes. Recommending exit from a dog without checking these is the classic error.",
        },
        {
          kind: "text",
          md: "The **public sector portfolio matrix** adapts the question for organisations that have no market share and no growth in the commercial sense. Its axes are instead the organisation's *ability to deliver* the service effectively and the *public value* — the political and public importance of the service. That produces a different set of conclusions, and using the commercial matrix on a public body is a recognisable error.",
        },
        {
          kind: "table",
          caption: "The public sector portfolio question",
          head: ["Position", "Reading", "Typical conclusion"],
          rows: [
            ["High value, strong ability to deliver", "Core public service performing well", "Protect and fund; use as a model"],
            ["High value, weak ability to deliver", "Important service being delivered badly", "The priority: invest, restructure, or commission elsewhere"],
            ["Low value, strong ability to deliver", "Doing something well that matters little", "Consider releasing resource; may be legacy activity"],
            ["Low value, weak ability to deliver", "Neither important nor well done", "Exit, unless statutorily required"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The public sector cannot simply 'exit a dog'",
          md: "A statutory duty must be discharged whether or not it scores well on any matrix. So the public sector recommendation is usually about *how* to deliver — invest, restructure, share a service, commission externally — rather than whether to deliver at all. Saying this explicitly demonstrates you have understood the sector rather than transplanted a commercial model.",
        },
      ],
      check: {
        q: "A public body finds one service is politically important and highly valued, but is delivered poorly with weak capability. What follows?",
        options: [
          "Exit the service, as a weak position cannot be defended",
          "This is the priority for attention — invest, restructure or commission the service differently, because the duty and the value both remain",
          "Reduce its funding and redirect to services already performing well",
          "Reclassify it as low value to align with capability",
        ],
        correct: 1,
        explain:
          "High public value with weak delivery is the quadrant demanding action rather than withdrawal — the need does not go away and may be a statutory duty. Option 0 imports a commercial exit decision the sector often cannot make.",
      },
    },
    {
      id: "evaluating-options",
      heading: "Evaluating options: suitability, acceptability, feasibility",
      blocks: [
        {
          kind: "text",
          md: "SBL routinely asks you to evaluate two or three options and recommend one. Using a consistent framework prevents the common failure of arguing three unconnected points about each option and reaching no comparison.",
        },
        {
          kind: "table",
          caption: "The three tests",
          head: ["Test", "Question", "Evidence to use"],
          rows: [
            ["Suitability", "Does it address the strategic position we have diagnosed?", "The PESTEL factors, the dominant competitive force, the capability gap"],
            ["Acceptability", "Will the outcome satisfy the stakeholders who matter?", "Return and risk; funding effect; stakeholder power and reaction"],
            ["Feasibility", "Can we actually do it, with what we have or can get?", "Finance, capability, capacity, time, systems, people"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Feasibility is where SBL options usually fail",
          md: "Cases are built so that the strategically attractive option is the one the organisation cannot presently deliver — the capability, the system or the funding is missing. The strong answer does not therefore reject it; it recommends the option *with the enabling action attached*: acquire or build the capability, phase the roll-out, secure the funding first. That is advice; rejecting on feasibility alone is not.",
        },
        {
          kind: "text",
          md: "Under acceptability, remember that return and risk are only part of it. A strategy can be financially attractive and unacceptable — to a lender because it breaches a covenant, to employees because it removes their roles, to a regulator, or to a family shareholder unwilling to dilute control. Identify who could refuse, and what would be needed to bring them along.",
        },
        {
          kind: "example",
          title: "A three-option evaluation, compressed",
          scenario:
            "A regional retailer must respond to online competition. Option 1: build its own online platform. Option 2: sell through an established marketplace. Option 3: focus on in-store experience and exit low-margin lines.",
          steps: [
            { label: "Suitability", detail: "All three address the diagnosed threat; 1 and 2 meet customers' shift of channel, 3 concedes the channel and defends a differentiated position." },
            { label: "Acceptability", detail: "Option 1 needs the most capital and carries execution risk; option 2 surrenders customer data and margin to the platform, which is a long-term strategic cost; option 3 shrinks revenue before it stabilises." },
            { label: "Feasibility", detail: "Option 1 requires digital capability the retailer lacks; option 2 is quickest; option 3 needs the least new capability but the most cultural change in stores." },
            { label: "Recommend", detail: "Option 2 now to establish presence and learn, with a defined review point and a data-retention condition, while building selectively toward own-channel capability — and take option 3's range rationalisation regardless, since it is robust across all three." },
          ],
          result:
            "The recommendation sequences the options rather than picking one and discarding the rest, and separates the action that is right in every case from the one that depends on the choice.",
        },
      ],
      check: {
        q: "An option is strategically the best fit but the organisation currently lacks the capability to deliver it. What is the strongest advisory response?",
        options: [
          "Reject it as not feasible and recommend the next-best option",
          "Recommend it with the enabling action attached — build, buy or partner for the capability, and phase delivery accordingly",
          "Recommend it without qualification, since strategic fit is what matters",
          "Defer the decision until the capability exists",
        ],
        correct: 1,
        explain:
          "Cases are constructed so the best option is not immediately deliverable — that is the test. Rejecting on feasibility abandons the right strategy, and recommending it unqualified ignores a real obstacle; naming the enabler does both jobs.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending a price cut without a cost advantage.", fix: "Price competition is sustainable only from a cost position; otherwise it transfers margin and invites a war you lose." },
    { trap: "Recommending exit from every BCG dog.", fix: "Check range completeness, overhead absorption, customer relationships and how the market was defined." },
    { trap: "Applying the commercial BCG matrix to a public body.", fix: "Use ability to deliver against public value, and remember statutory duties cannot simply be exited." },
    { trap: "Rejecting the best option because it is not currently feasible.", fix: "Recommend it with the enabling action — build, buy, partner, phase." },
  ],
  keyTerms: [
    { term: "Cost leadership", def: "Competing by achieving a lower cost base than rivals for a comparable offering." },
    { term: "Differentiation", def: "Competing by offering something customers value sufficiently to pay a premium for." },
    { term: "Lock-in", def: "Making switching costly or awkward for customers, sustaining advantage without lowest cost or permanent product superiority." },
    { term: "Seven Ps", def: "Product, price, place, promotion, people, process and physical evidence — the extended mix, with the last three critical in services." },
    { term: "BCG matrix", def: "A portfolio model classifying units by relative market share and market growth to plan cash flows between them." },
    { term: "Suitability, acceptability, feasibility", def: "The three tests for evaluating a strategic option: fit with position, stakeholder acceptance, and deliverability." },
  ],
  summary: [
    "Compete on cost or differentiation, broad or focused — an unclear position is attacked from both sides.",
    "Price-based strategy requires a cost advantage; lock-in is often the realistic alternative.",
    "BCG is a cash-flow tool; state its limitations, especially before exiting a dog.",
    "Public sector portfolios use ability to deliver against public value, and duties cannot be exited.",
    "Evaluate by suitability, acceptability and feasibility — and attach enabling actions rather than rejecting.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is a price cut without a cost advantage dangerous?", a: "It transfers margin to customers and invites a price war the lowest-cost competitor can sustain longer." },
    { q: "What is lock-in, and why is it useful?", a: "Making switching costly or awkward — through systems, data, contracts, training or standards — which sustains advantage without needing lowest cost or permanent product superiority." },
    { q: "What does the BCG matrix actually manage?", a: "Cash flow between units: cash cows fund stars to hold position and question marks to build it." },
    { q: "What are the axes of the public sector portfolio matrix?", a: "The organisation's ability to deliver the service effectively, against the public and political value of that service." },
    { q: "What are the three option-evaluation tests?", a: "Suitability — does it fit the diagnosed position; acceptability — will key stakeholders accept the return, risk and consequences; feasibility — can it be delivered." },
  ],
  furtherStudy: [
    "SBL-17 covers the directions and methods of pursuing a chosen strategy",
    "SBL-15 supplies the capability evidence feasibility depends on",
    "SBL-32 covers investment appraisal supporting acceptability",
    "SBL-11 covers the public sector context for portfolio decisions",
  ],
}

const SBL_TREE_17: StudyChapter = {
  paper: "SBL",
  id: "SBL-17",
  number: 17,
  area: "C",
  syllabusRefs: ["C5(b)", "C5(e)", "C5(f)"],
  title: "Directions and methods of development",
  minutes: 17,
  intro:
    "Two separate questions candidates merge: *where* to grow — which products, which markets — and *how* to get there — build, buy, or partner. Answering only one of them leaves half the requirement unaddressed.",
  outcomes: [
    "Recommend development directions using the Ansoff matrix",
    "Assess the opportunities and problems of product and market diversification, nationally and internationally",
    "Assess internal development, business combinations, strategic alliances and partnering as growth methods",
    "Advise on the method that suits the organisation's capability, urgency and risk appetite",
  ],
  sections: [
    {
      id: "ansoff",
      heading: "Directions: the Ansoff matrix",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Ansoff: products against markets",
            data: {
              leftTitle: "Existing products",
              rightTitle: "New products",
              rows: [
                { aspect: "Existing markets", left: "MARKET PENETRATION — sell more of what we have to who we have", right: "PRODUCT DEVELOPMENT — new offerings to existing customers" },
                { aspect: "New markets", left: "MARKET DEVELOPMENT — existing offerings to new customers or territories", right: "DIVERSIFICATION — new products to new markets; highest risk" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Risk rises with distance from what the organisation already knows, and the reason is capability: penetration uses existing products, customers, channels and knowledge, whereas diversification requires new product capability *and* new market knowledge at the same time. That is why most diversification failures are not failures of the idea but of the two simultaneous learning curves.",
        },
        {
          kind: "table",
          caption: "Each direction, and what it demands",
          head: ["Direction", "Typical actions", "Main requirement", "Main risk"],
          rows: [
            ["Market penetration", "Increase usage, win share, improve retention", "Marketing and service capability", "Limited headroom in a mature market"],
            ["Market development", "New territory, new segment, new channel", "Market knowledge; possibly adaptation", "Assuming the home offer travels unchanged"],
            ["Product development", "Extend range, replace ageing products, add services", "R&D and innovation capability", "Cost and time overrun; cannibalising existing sales"],
            ["Diversification", "Enter a different business", "Both new product and new market capability", "Two learning curves at once; management attention diluted"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Related and unrelated diversification are different decisions",
          md: "**Related** diversification shares something real with the existing business — technology, customers, channels, brand — and can therefore be justified by the synergy. **Unrelated** diversification shares nothing, so the only remaining justification is risk spreading, and shareholders can diversify their own portfolios far more cheaply than a company can. Demanding that a case's unrelated acquisition explain what it shares is one of the sharpest challenges available.",
        },
        {
          kind: "text",
          md: "Internationally, market development raises specific questions the exam expects you to raise: whether the offer needs adapting to local requirement, expectation and regulation; how distribution and payment will work; exchange-rate and political exposure; and whether the home-market advantage transfers at all — which links directly back to Porter's Diamond in SBL-13.",
        },
      ],
      check: {
        q: "A regional bakery proposes acquiring a software company, arguing it will reduce dependence on a single sector. How should this be assessed?",
        options: [
          "Sound — risk reduction through diversification is a valid strategic objective",
          "Unrelated diversification sharing no capability, customers or channel; shareholders can spread risk more cheaply themselves, so the acquisition needs a synergy justification it does not have",
          "Sound provided the software company is profitable",
          "Unsound because bakeries should never acquire other businesses",
        ],
        correct: 1,
        explain:
          "Risk spreading is the weakest justification for corporate diversification precisely because shareholders can do it themselves at almost no cost. With no shared technology, customers, channel or brand, the acquisition has to show what management contributes — and profitability alone does not answer that, which is why option 2 fails.",
      },
    },
    {
      id: "methods",
      heading: "Methods: build, buy or partner",
      blocks: [
        {
          kind: "table",
          caption: "Three routes, compared on what matters in a case",
          head: ["Method", "Speed", "Cost and risk", "Best when"],
          rows: [
            ["Internal (organic) development", "Slow", "Spread over time; risk of never arriving", "Capability is close to existing; culture matters; time available"],
            ["Acquisition", "Fast", "High upfront; integration and overpayment risk", "Speed is essential; capability or market access cannot be built in time"],
            ["Strategic alliance or joint venture", "Moderate", "Shared cost and risk; shared control and reward", "Neither party has the whole capability; local knowledge needed"],
            ["Franchising or licensing", "Fast, low capital", "Weaker control of standards and brand", "Proven, replicable format; rapid geographic reach"],
          ],
        },
        {
          kind: "text",
          md: "**Acquisition** is chosen for speed and for access to something that cannot be built — a customer base, a licence, a technology, a brand. Its failure modes are consistent enough to name: paying more than the acquired value, discovering liabilities that diligence missed, losing the people who were the actual asset, and cultural incompatibility that prevents the synergies from ever being realised. Note the ordering that matters in SBL — synergy assumed at approval and never measured afterwards is a governance failure as much as a strategic one.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Alliances fail on governance, not on strategy",
          md: "A joint venture or alliance needs agreement, before it starts, on decision rights, contribution, how profits are shared, who owns jointly created intellectual property, how performance is measured, how disputes are resolved and how either side exits. Where a case describes a partnership going wrong, the cause is almost always one of these left undefined — not a change in the market.",
        },
        {
          kind: "list",
          style: "number",
          title: "Choosing a method in a task",
          items: [
            "**How urgent is it?** A closing window argues for acquisition or alliance over organic build",
            "**What capability is missing, and can it be built?** If it can, and there is time, organic development preserves control and culture",
            "**What can be afforded?** Acquisition needs funding and affects gearing and covenants",
            "**How much control is required?** Where standards or brand are the advantage, franchising is risky",
            "**What is the exit?** Every method except organic development needs one defined in advance",
          ],
        },
        {
          kind: "example",
          title: "Method follows the constraint",
          scenario:
            "A specialist engineering group wants to enter a South-East Asian market within two years. It has no local presence, regulatory approval takes about eighteen months for a new entrant, and local distribution is controlled by a few established firms.",
          steps: [
            { label: "Test organic", detail: "Eighteen months of approval plus building distribution from nothing does not fit a two-year window." },
            { label: "Test acquisition", detail: "Would deliver approval and distribution immediately, but the group has limited local knowledge to evaluate a target or manage it afterwards." },
            { label: "Test alliance", detail: "A joint venture with an established distributor supplies approval, distribution and local knowledge, while the group supplies the engineering capability — each contributes what the other lacks." },
            { label: "Govern it", detail: "Agree decision rights, IP ownership of any joint development, performance measures, profit split and exit terms before signing." },
          ],
          result:
            "The recommendation is driven by the binding constraints — time, approval and distribution — rather than by a general preference, and it attaches the governance the method requires.",
        },
      ],
      check: {
        q: "Two years into a joint venture, the partners disagree over who owns jointly developed technology and how profits should be split. What does this most likely indicate?",
        options: [
          "That joint ventures are inherently unsuitable for technology development",
          "That decision rights, IP ownership and profit sharing were not agreed at the outset — a governance failure rather than a strategic one",
          "That the market has changed since the venture began",
          "That one partner has acted in bad faith",
        ],
        correct: 1,
        explain:
          "These are precisely the terms an alliance must settle before starting, and disputes about them two years in point to their absence rather than to bad faith or a market shift. The lesson generalises: alliances fail on the arrangements, not the idea.",
      },
    },
  ],
  examTraps: [
    { trap: "Answering 'where to grow' and ignoring 'how', or the reverse.", fix: "Direction and method are separate requirements — Ansoff answers one, build/buy/partner the other." },
    { trap: "Accepting risk spreading as justification for unrelated diversification.", fix: "Shareholders diversify more cheaply themselves; demand a shared capability, customer, channel or brand." },
    { trap: "Assuming a home-market offer transfers internationally unchanged.", fix: "Raise adaptation, regulation, distribution, currency and political exposure, and whether the advantage travels." },
    { trap: "Recommending an alliance without its governance.", fix: "Specify decision rights, contributions, profit share, IP ownership, measures, dispute resolution and exit." },
  ],
  keyTerms: [
    { term: "Market penetration", def: "Selling more of existing products to existing markets — the lowest-risk direction." },
    { term: "Market development", def: "Taking existing products to new markets, segments, territories or channels." },
    { term: "Diversification", def: "New products in new markets; the highest-risk direction because two capabilities must be acquired at once." },
    { term: "Related diversification", def: "Diversification sharing technology, customers, channels or brand with the existing business, so synergy can justify it." },
    { term: "Strategic alliance", def: "A cooperative arrangement where each party contributes capability the other lacks, sharing cost, risk, control and reward." },
    { term: "Synergy", def: "Value created by combining businesses that neither would generate alone — which must be quantified before approval and measured after." },
  ],
  summary: [
    "Ansoff sets direction; risk rises with distance from existing products and markets.",
    "Related diversification can be justified by synergy; unrelated needs more than risk spreading.",
    "International development raises adaptation, regulation, distribution, currency and transferability.",
    "Choose method on urgency, missing capability, funding, control needed and exit route.",
    "Acquisitions fail on overpayment, diligence, people and culture; alliances fail on governance terms.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four Ansoff directions, in ascending risk?", a: "Market penetration, then market development and product development, then diversification." },
    { q: "Why is diversification the riskiest direction?", a: "It requires new product capability and new market knowledge simultaneously — two learning curves at once." },
    { q: "Why is risk spreading a weak justification for unrelated diversification?", a: "Shareholders can diversify their own portfolios far more cheaply than a company can diversify its operations." },
    { q: "When does acquisition beat organic development?", a: "When speed matters or when the capability, market access or licence genuinely cannot be built within the time available." },
    { q: "What must be agreed before an alliance begins?", a: "Decision rights, each party's contribution, profit sharing, ownership of jointly created IP, performance measures, dispute resolution and exit terms." },
  ],
  furtherStudy: [
    "SBL-16 covers how to compete once a direction is chosen",
    "SBL-13 covers Porter's Diamond and whether advantage travels internationally",
    "SBL-32 covers appraising an acquisition or investment",
    "SBL-34 covers collaborative working, partnering and outsourcing in delivery",
  ],
}

export const SBL_TREE_AREA_C: StudyChapter[] = [
  SBL_TREE_12, SBL_TREE_13, SBL_TREE_14, SBL_TREE_15, SBL_TREE_16, SBL_TREE_17,
]
