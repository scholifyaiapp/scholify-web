import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area D, part two — the data science process, analysis methods,
 * regression, and machine learning — plus Areas E and F.
 *
 *   APM-36  The data science process and types of analytics (D2b, c, d)
 *   APM-37  Regression and reading data honestly            (D2e)
 *   APM-38  Machine learning, AI and advising on model output (D2f, g, h, i)
 *   APM-39  Professional skills                             (E)
 *   APM-40  Employability and technology skills             (F)
 *
 * APM-40 is the chapter that closes the SECOND defect this rebuild found. The
 * official syllabus has six areas, A–F, and Area F — employability and
 * technology skills — did not exist in this paper at all. Every other Strategic
 * Professional paper carries its equivalent (AFM area G, SBR area G, SBL area
 * J). The verification test asserted "all five official areas" and so encoded
 * the omission as correct.
 *
 * Areas E and F live in this module rather than their own because each is a
 * single chapter; splitting them into two more files would add imports without
 * adding clarity.
 *
 * Written against the official ACCA APM syllabus and study guide for September
 * 2026 to June 2027. See acca-study-apm-tree-a.ts for the note on the shim and
 * on why the originality corpus is the syllabus text alone.
 */

const APM_TREE_36: StudyChapter = {
  paper: "APM",
  id: "APM-36",
  number: 36,
  area: "D",
  syllabusRefs: ["D2(b)", "D2(c)", "D2(d)"],
  title: "The data science process and types of analytics",
  minutes: 17,
  intro:
    "Four kinds of analytics answering four different management questions, and a process whose unglamorous middle step consumes most of the effort.",
  outcomes: [
    "Advise on the data science process from goal setting through to storage",
    "Explain why data preparation dominates the effort",
    "Apply and evaluate descriptive, diagnostic, predictive and prescriptive analytics",
    "Match the type of analysis to the management question being asked",
    "Assess the use of text, image, video and voice data",
  ],
  sections: [
    {
      id: "the-process",
      heading: "The process, and where the work actually is",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "From question to stored result",
            data: {
              steps: [
                { label: "Set the goal", sub: "Which decision is this for?" },
                { label: "Select data", sub: "Sources, coverage, permission" },
                { label: "Clean", sub: "Errors, duplicates, gaps, outliers" },
                { label: "Transform", sub: "Formats, units, derived variables" },
                { label: "Analyse and model", sub: "The visible part" },
                { label: "Communicate", sub: "Findings, limitations, action" },
                { label: "Store and govern", sub: "Retention, access, provenance" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The first and third steps decide whether any of it is useful",
          md: "**Setting the goal** first is what stops an analytics project becoming an exploration with no decision attached. And **cleaning and transformation** typically consume the large majority of the effort — it is unglamorous, invisible in the output, and the place where errors that invalidate everything downstream are introduced. A recommendation that budgets for modelling and not for data preparation has budgeted for the wrong thing.",
        },
        {
          kind: "table",
          caption: "What cleaning actually involves",
          head: ["Problem", "Example", "Decision required"],
          rows: [
            ["Missing values", "Customer records with no region", "Exclude, impute, or treat as a category — and each choice biases differently"],
            ["Duplicates", "The same customer under two identifiers", "Matching rules, which will produce both false merges and misses"],
            ["Outliers", "A transaction a thousand times the median", "Error or genuine? Removing real extremes distorts the analysis"],
            ["Inconsistent formats", "Dates, currencies, units of measure differing by source", "Standardise, and record what was assumed"],
            ["Stale records", "Addresses years out of date", "Retention and refresh policy"],
          ],
        },
        {
          kind: "text",
          md: "Each of those is a **judgement**, and each affects the result. That is why the syllabus asks for advice on the process rather than on the modelling: an analysis whose cleaning decisions were undocumented cannot be reviewed, replicated or defended when someone disputes its conclusion.",
        },
      ],
      check: {
        q: "An analytics project is presented with 80% of its budget allocated to modelling and 10% to data preparation. What should the adviser say?",
        options: [
          "The allocation is appropriate, since modelling produces the insight",
          "The allocation is inverted — cleaning and transformation typically consume most of the effort in practice, and errors introduced there invalidate everything downstream regardless of how good the model is",
          "Data preparation should be outsourced entirely",
          "The project should not proceed",
        ],
        correct: 1,
        explain:
          "Preparation is where the effort genuinely goes and where the analysis is most often compromised. Under-budgeting it produces either a delayed project or, worse, a model built on data nobody cleaned properly — which will produce confident output from unreliable input.",
      },
    },
    {
      id: "four-types",
      heading: "Four types of analytics",
      blocks: [
        {
          kind: "table",
          caption: "The ladder",
          head: ["Type", "Question", "Example", "What it needs"],
          rows: [
            ["Descriptive", "What happened?", "Sales by region last quarter", "Accurate historic data"],
            ["Diagnostic", "Why did it happen?", "Which factors explain the regional variation", "Data on possible causes, and analytical care"],
            ["Predictive", "What is likely to happen?", "Which customers are likely to leave next quarter", "A model, validated on data it has not seen"],
            ["Prescriptive", "What should we do?", "Which retention offer to make to which customer", "A model plus the economics of each action"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Value and difficulty both rise up the ladder",
          md: "Descriptive analytics is cheap and universal; prescriptive is expensive and rare. So the examinable judgement is whether an organisation is trying to run before it can walk — a company whose descriptive reporting is unreliable because of the silo problem cannot support predictive models, since those are built on the same data. Recommending that the foundations be fixed first is frequently the right advice.",
        },
        {
          kind: "text",
          md: "**Prescriptive** analytics deserves a specific caution. Recommending an action requires knowing the **cost and benefit** of each option, not just predicting an outcome. A model identifying customers likely to leave is predictive; deciding which of them are worth an offer, and how large, needs their profitability and the offer's cost — which is the activity-based costing of APM-21 arriving inside a data science project.",
        },
        {
          kind: "text",
          md: "On **data types**, the syllabus names text, image, video and voice. Their common feature is that each must be converted into structured form before analysis — sentiment or topic extraction from text, classification from images, transcription from voice — and each conversion introduces error and judgement. The practical management points are that these conversions are imperfect, that their accuracy varies systematically across groups (accents, image quality, languages), and that the error rate should be stated alongside any result derived from them.",
        },
      ],
      check: {
        q: "A model identifies which customers are most likely to cancel next quarter. What further information is needed before it can support prescriptive analytics?",
        options: [
          "A larger dataset",
          "The economics of the possible actions — what each customer is worth, what a retention offer would cost, and the likelihood it succeeds — since recommending an action requires cost and benefit, not just a prediction",
          "Confirmation that the predictions are certain",
          "Approval from the customers concerned",
        ],
        correct: 1,
        explain:
          "Prediction identifies who; prescription decides what to do about them, which is an economic question. Making a costly offer to a customer who is unprofitable, or who would have stayed anyway, destroys value even when the prediction is accurate.",
      },
    },
  ],
  examTraps: [
    { trap: "Budgeting for modelling and not for data preparation.", fix: "Cleaning and transformation consume most of the effort and are where errors enter." },
    { trap: "Treating cleaning as mechanical.", fix: "Missing values, duplicates and outliers each require a judgement that biases the result." },
    { trap: "Recommending predictive analytics on unreliable foundations.", fix: "Models are built on the same data as the reporting — fix that first." },
    { trap: "Confusing predictive with prescriptive.", fix: "Recommending an action needs the cost and benefit of each option." },
  ],
  keyTerms: [
    { term: "Diagnostic analytics", def: "Analysis establishing why something happened, requiring data on possible causes rather than only on outcomes." },
    { term: "Predictive analytics", def: "Modelling to estimate what is likely to happen, validated on data the model has not previously seen." },
    { term: "Prescriptive analytics", def: "Recommending an action, which requires the costs and benefits of the available options as well as a prediction." },
  ],
  summary: [
    "Set the goal first, or the project becomes exploration with no decision attached.",
    "Cleaning and transformation consume most of the effort and carry judgements that bias results.",
    "Four types: descriptive, diagnostic, predictive, prescriptive — rising in value and difficulty.",
    "Unstructured data must be converted, and the conversion's error rate belongs in the result.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is data cleaning a series of judgements rather than a mechanical step?", a: "Choices about missing values, duplicates and outliers each bias the result differently, and undocumented choices cannot be reviewed or defended." },
    { q: "What separates predictive from prescriptive analytics?", a: "Prediction estimates what will happen; prescription recommends an action, which additionally requires the cost and benefit of each option." },
    { q: "What should accompany any result derived from text, image or voice data?", a: "The error rate of the conversion step, and a note of whether its accuracy varies systematically across groups." },
  ],
  furtherStudy: [
    "APM-35 covers big data, the raw material this process works on.",
    "APM-37 covers regression, the main diagnostic and predictive technique named in the syllabus.",
    "APM-33 covers the silo problem that undermines the data these models depend on.",
  ],
}

const APM_TREE_37: StudyChapter = {
  paper: "APM",
  id: "APM-37",
  number: 37,
  area: "D",
  syllabusRefs: ["D2(e)"],
  title: "Regression and reading data honestly",
  minutes: 17,
  intro:
    "The one statistical technique the syllabus names directly — and the one that most reliably produces confident, precise, wrong conclusions.",
  outcomes: [
    "Analyse data using regression and interpret the output",
    "Interpret the coefficient of determination and what it does not tell you",
    "Identify biases, patterns, trends, ranges and distributions in data",
    "Explain why correlation does not establish causation",
    "State the limitations of a regression result when advising management",
  ],
  sections: [
    {
      id: "interpreting",
      heading: "Reading a regression",
      blocks: [
        {
          kind: "formula",
          name: "Simple linear regression",
          expr: "y = a + bx",
          note:
            "y is the dependent variable being explained, x the independent variable, a the intercept (the value of y when x is zero) and b the slope — the change in y for each unit change in x. In cost analysis a is fixed cost and b is the variable cost per unit, which is why the technique appears in this syllabus at all.",
        },
        {
          kind: "example",
          title: "Interpreting an output",
          scenario:
            "Regressing monthly overhead cost (y, $000) on machine hours (x, 000) gives y = 42 + 6.8x, with a coefficient of determination of 0.81, over a range of 3,000 to 9,000 machine hours.",
          steps: [
            { label: "Fixed element", detail: "$42,000 a month of overhead is incurred regardless of machine hours." },
            { label: "Variable element", detail: "$6,800 per thousand machine hours, so $6.80 per machine hour." },
            { label: "Explanatory power", detail: "r² of 0.81 means 81% of the variation in overhead is associated with variation in machine hours; 19% is not explained by this model." },
            { label: "Valid range", detail: "The relationship was estimated between 3,000 and 9,000 hours, so predicting at 15,000 is extrapolation beyond the evidence." },
          ],
          result:
            "A usable cost model with its limits stated. Quoting 'overhead = 42 + 6.8x' without the range and the r² would present an estimate as though it were a formula.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The three limitations to state every time",
          md: "**Extrapolation** — the relationship holds only over the range observed, and stepped fixed costs make it dangerous beyond. **Historic basis** — it describes the past, and prices, technology and methods change. **A high r² proves association, not cause** — the two variables may both be driven by something else entirely.",
        },
      ],
      check: {
        q: "A regression of overhead on machine hours gives an r² of 0.88. What does this establish?",
        options: [
          "That machine hours cause 88% of overhead cost",
          "That 88% of the variation in overhead is associated with variation in machine hours over the range observed — the relationship may still be driven by a third factor, and it says nothing about behaviour outside that range",
          "That the model will predict accurately at any activity level",
          "That the remaining 12% is measurement error",
        ],
        correct: 1,
        explain:
          "r² measures how much variation the model accounts for, not why. Both variables could be driven by production volume, and the relationship is evidenced only across the data actually observed — which is why the range and the causal caveat belong in any advice based on it.",
      },
    },
    {
      id: "bias-and-cause",
      heading: "Bias, distribution and the causation trap",
      blocks: [
        {
          kind: "text",
          md: "The outcome asks you to identify **biases, patterns, trends, ranges and distributions**, which is broader than regression alone. It is the discipline of looking at data properly before modelling it.",
        },
        {
          kind: "table",
          caption: "What to look for before trusting any analysis",
          head: ["Feature", "Why it matters"],
          rows: [
            ["Distribution", "A mean describes a symmetric distribution well and a skewed one badly; look at the shape, not just the average"],
            ["Range and outliers", "A few extreme values can drive an entire regression line"],
            ["Trend against cycle", "A rising series may be a trend, a seasonal peak, or a cycle — treating one as another produces bad forecasts"],
            ["Selection bias", "Who or what is missing from the data, and are they different from those included?"],
            ["Survivorship bias", "Analysing only customers who stayed, or products still sold, omits the failures the analysis is about"],
            ["Measurement bias", "The instrument itself skews — a survey reaching only online customers, a sensor failing in cold weather"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Survivorship bias is the one that hides best",
          md: "An analysis of what distinguishes successful products, run on the products still being sold, cannot see the failures that had the same characteristics. So it identifies features common to survivors and reports them as causes of success. Whenever a scenario analyses a population that was filtered by the very outcome being studied, that is the finding.",
        },
        {
          kind: "text",
          md: "On **causation**, the disciplined position is that a correlation has four possible explanations: x causes y; y causes x; a third factor causes both; or it is coincidence. Establishing the first requires more than data — a plausible mechanism, correct time ordering, and ideally a controlled comparison. Since APM's professional skills marks include scepticism explicitly, saying which of the four you have ruled out and how is directly rewarded.",
        },
        {
          kind: "activity",
          title: "Challenge a causal claim",
          prompt:
            "A company finds that branches with higher training spend have higher customer satisfaction, and proposes increasing training everywhere. How do you respond?",
          answer:
            "By supporting the direction while refusing the reasoning as it stands, because the correlation has at least four readings and the proposal assumes one of them. Training may improve satisfaction, which is the assumed mechanism and is plausible. But satisfaction may drive training - a well-performing branch with fewer problems has more time to release staff, so the causation could run backwards. Or a third factor could produce both: a strong branch manager invests in their people and also runs the branch well, in which case the training is a symptom of good management rather than its cause, and mandating training elsewhere buys the symptom without the cause. It could also be coincidence if the number of branches is small. What I would want before committing budget is a time-ordering check - did the training precede the satisfaction improvement, or follow it - and ideally a controlled trial: raise training in a randomly chosen group of branches, hold it in a comparable group, and compare the movement. That is inexpensive relative to a company-wide programme and it converts an association into evidence. My recommendation would therefore be to pilot rather than to roll out, and to say plainly that the current analysis supports a hypothesis rather than a decision.",
        },
      ],
      check: {
        q: "An analysis of the characteristics of a company's successful products, using only products currently on sale, concludes that a particular design feature drives success. What is the flaw?",
        options: [
          "The sample is too small",
          "Survivorship bias — failed products with the same feature were excluded by the very filter being studied, so the analysis cannot show whether the feature distinguishes success from failure",
          "Design features cannot be measured objectively",
          "The analysis should have used regression",
        ],
        correct: 1,
        explain:
          "The population was selected on the outcome, so it contains no counter-evidence. The feature may be equally common among the products that failed, in which case it distinguishes nothing — and only including the withdrawn products can establish that either way.",
      },
    },
  ],
  examTraps: [
    { trap: "Quoting a regression equation without its valid range.", fix: "Extrapolation beyond the observed data is not supported, particularly with stepped fixed costs." },
    { trap: "Reading r² as a measure of causation.", fix: "It measures explained variation; a third factor may drive both variables." },
    { trap: "Analysing a population filtered by the outcome being studied.", fix: "Survivorship bias — the counter-evidence has been excluded." },
    { trap: "Recommending a company-wide programme from a correlation.", fix: "Pilot it with a comparison group; that converts association into evidence." },
  ],
  keyTerms: [
    { term: "Coefficient of determination", def: "r², the proportion of variation in the dependent variable associated with variation in the independent variable — a measure of fit, not of cause." },
    { term: "Extrapolation", def: "Applying a relationship beyond the range of data from which it was estimated, where it may no longer hold." },
    { term: "Survivorship bias", def: "Distortion arising when a population has been filtered by the outcome under study, so failures are absent from the analysis." },
  ],
  summary: [
    "Regression gives a fixed and a variable element; state the r² and the valid range with them.",
    "Look at distribution, range, outliers and bias before trusting any model.",
    "A correlation has four possible explanations — say which you have ruled out.",
    "Where a causal claim drives spending, pilot with a comparison group rather than rolling out.",
  ],
  knowledgeDiagnostic: [
    { q: "What does the intercept represent in a cost regression?", a: "The fixed cost element — the cost incurred when the activity measure is zero, within the observed range." },
    { q: "What are the four possible explanations for a correlation?", a: "x causes y; y causes x; a third factor causes both; or coincidence." },
    { q: "How is survivorship bias detected?", a: "By asking whether the population analysed was selected on the outcome being studied, so that failures were excluded." },
  ],
  furtherStudy: [
    "APM-36 covers the wider analytics process this technique sits inside.",
    "APM-29 covers the scatterplot, regression's visual counterpart.",
    "APM-39 covers professional scepticism, which this chapter exercises throughout.",
  ],
}

const APM_TREE_38: StudyChapter = {
  paper: "APM",
  id: "APM-38",
  number: 38,
  area: "D",
  syllabusRefs: ["D2(f)", "D2(g)", "D2(h)", "D2(i)"],
  title: "Machine learning, AI and advising on model output",
  minutes: 18,
  intro:
    "Four outcomes that end with the one that matters most: advising management on what a model has produced. The accountant's role here is not to build models — it is to be the person who asks whether the output can be relied on.",
  outcomes: [
    "Assess the use of machine learning and AI in gaining performance insight",
    "Assess the output of models built to support organisational goals",
    "Advise on refinements a model requires",
    "Advise management on model output, including its limitations",
    "Identify overfitting, drift, bias and the accountability question",
  ],
  sections: [
    {
      id: "what-ml-does",
      heading: "What machine learning contributes, and what it costs",
      blocks: [
        {
          kind: "text",
          md: "Machine learning finds patterns in data and applies them to new cases without those patterns being specified in advance. That is genuinely useful for performance management — demand forecasting, churn prediction, maintenance scheduling, fraud detection, quality inspection — and it is useful precisely where the relationships are too complex or too numerous for a person to specify.",
        },
        {
          kind: "table",
          caption: "The trade-off nobody escapes",
          head: ["", "Simple model (e.g. regression)", "Complex model (e.g. neural network)"],
          rows: [
            ["Accuracy", "Lower on complex problems", "Often materially higher"],
            ["Explainability", "The coefficients can be read and challenged", "Frequently a black box"],
            ["Regulatory acceptability", "Straightforward", "May be unusable where decisions must be explained"],
            ["Failure mode", "Visible — the fit is poor", "Silent — confident output on inputs unlike anything it was trained on"],
            ["Maintenance", "Stable", "Needs monitoring for drift"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Explainability is a business requirement, not a technical preference",
          md: "Where a decision affects a person — credit, employment, pricing, service level — the organisation may have to **explain** it, both legally and commercially. A more accurate model that cannot be explained may therefore be unusable, and the correct recommendation is sometimes the less accurate one. Saying that, and saying why, is a stronger answer than reporting the accuracy figures.",
        },
      ],
      check: {
        q: "A bank's complex model predicts loan defaults 4% more accurately than its existing regression, but cannot explain individual decisions. What should be advised?",
        options: [
          "Adopt it, since higher accuracy is the objective",
          "The accuracy gain has to be weighed against a requirement to explain adverse decisions to applicants and regulators — where that requirement is binding, the less accurate but explainable model may be the correct choice",
          "Reject all machine learning in financial services",
          "Use the complex model and give applicants no reason for refusal",
        ],
        correct: 1,
        explain:
          "Accuracy is one criterion among several, and explainability can be a hard constraint rather than a preference. The commercially and legally sound position is to weigh them explicitly — which sometimes means accepting a measurably worse model because its decisions can be defended.",
      },
    },
    {
      id: "assessing-output",
      heading: "Assessing the output and advising on refinement",
      blocks: [
        {
          kind: "text",
          md: "This is the accountant's actual job in an analytics project: not building the model, but interrogating what it produced. The questions below are the ones the syllabus's assessment and advisory outcomes are asking for.",
        },
        {
          kind: "table",
          caption: "Interrogating a model",
          head: ["Question", "What a bad answer reveals"],
          rows: [
            ["Was it validated on data it had not seen?", "Testing on training data proves only that it memorised — the classic overfitting failure"],
            ["How does it perform on the cases that matter?", "High overall accuracy can conceal poor performance on the rare cases the model exists to catch"],
            ["What is the cost of each type of error?", "A false positive and a false negative rarely cost the same, and accuracy weights them equally"],
            ["Does performance differ across groups?", "Systematically worse accuracy for one group is a bias and a legal exposure"],
            ["What data was it trained on, and when?", "Historic data encodes historic practice, including past discrimination"],
            ["How will drift be detected?", "Without monitoring, silent decay continues until someone notices the consequences"],
            ["Who can override it, and on what basis?", "Without human oversight the model is deciding rather than informing, and nobody is accountable for the outcome"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The error-cost point is the strongest available",
          md: "A quality model that is 97% accurate sounds excellent until you ask what the 3% consists of. If missing a defect costs a recall and rejecting a good unit costs a few pounds, the two errors are not remotely equivalent, and the model should be tuned to be **wrong in the cheaper direction**. Accuracy alone cannot express that, which is why an accountant rather than a data scientist should be asking it.",
        },
        {
          kind: "text",
          md: "**Overfitting** is the technical failure to be able to name: a model that has learned the noise in its training data rather than the underlying pattern, so it performs beautifully on that data and poorly on anything new. **Drift** is its counterpart over time — the relationships change after deployment, so a model that was valid decays silently. Both are detected the same way: by continuing to measure real outcomes against predictions after the model is live.",
        },
        {
          kind: "activity",
          title: "Advise the board on a model",
          prompt:
            "A model predicting which customers will churn reports 94% accuracy. Only 6% of customers actually churn. What do you tell the board?",
          answer:
            "That the 94% figure is almost certainly meaningless, and I would show them why in one line: a model that simply predicted nobody would churn would also be about 94% accurate, because 94% of customers do not churn. So the headline number tells us nothing about whether the model can identify the customers it exists to find. What I would ask for instead is how it performs specifically on the churners - what proportion of actual churners it catches, and what proportion of the customers it flags actually leave. Those two figures are what determine whether the model is usable, and they can be poor while overall accuracy is excellent. Then the economics, which is the part the board is best placed to judge: what does it cost to make a retention offer to someone who was never going to leave, and what is the value lost when a genuine churner is missed? Those two costs are rarely equal, and once we know them the model should be tuned to be wrong in the cheaper direction rather than to maximise accuracy. Finally I would want to know how it was validated - on data it had not seen, or on its own training data - and how drift will be monitored once it is live, because churn behaviour changes with the market and a model that works today decays silently.",
        },
      ],
      check: {
        q: "A model predicting a rare event reports 96% accuracy. Why is this figure potentially misleading?",
        options: [
          "Accuracy above 95% is always suspicious",
          "If the event occurs in only 4% of cases, a model that always predicted 'no event' would also be 96% accurate — so the figure says nothing about whether the model identifies the rare cases it exists to detect",
          "Accuracy cannot be calculated for rare events",
          "The model must be overfitted",
        ],
        correct: 1,
        explain:
          "With imbalanced classes, overall accuracy is dominated by the majority case and can be achieved without any predictive ability at all. The informative measures are how many of the actual events the model catches and how many of its alerts are genuine — together with the cost of each kind of error.",
      },
    },
  ],
  examTraps: [
    { trap: "Reporting model accuracy as the assessment.", fix: "Ask about validation, performance on the cases that matter, and the cost of each error type." },
    { trap: "Preferring the more accurate model automatically.", fix: "Explainability can be a binding requirement where decisions affect people." },
    { trap: "Ignoring what the model was trained on.", fix: "Historic data encodes historic practice, including past discrimination." },
    { trap: "Deploying without drift monitoring.", fix: "Relationships change after deployment and the decay is silent." },
  ],
  keyTerms: [
    { term: "Overfitting", def: "A model that has learned the noise in its training data rather than the underlying pattern, performing well on that data and poorly on new cases." },
    { term: "Model drift", def: "Deterioration in a model's performance after deployment as the relationships or input data change." },
    { term: "Explainability", def: "The ability to state why a model produced a particular output, which may be a legal or commercial requirement rather than a preference." },
    { term: "Class imbalance", def: "A dataset in which the outcome of interest is rare, so overall accuracy can be high without any real predictive ability." },
  ],
  summary: [
    "Machine learning earns its place where relationships are too complex to specify — at a cost in explainability.",
    "The accountant's role is interrogating the output, not building the model.",
    "Ask about validation, performance on the cases that matter, and the cost of each error type.",
    "Overfitting and drift are both detected by measuring real outcomes against predictions after deployment.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can 96% accuracy be worthless?", a: "Where the event is rare, always predicting the majority case achieves similar accuracy without any predictive ability." },
    { q: "Why might a less accurate model be the right recommendation?", a: "Where decisions affecting people must be explained, an unexplainable model may be legally or commercially unusable however accurate." },
    { q: "How are overfitting and drift both detected?", a: "By continuing to compare real outcomes against the model's predictions on data it did not train on, before and after deployment." },
  ],
  furtherStudy: [
    "APM-37 covers regression, the explainable alternative these models are weighed against.",
    "APM-35 covers big data, and the spurious correlation problem complex models can amplify.",
    "APM-39 covers scepticism, which is the professional skill this chapter applies.",
  ],
}

const APM_TREE_39: StudyChapter = {
  paper: "APM",
  id: "APM-39",
  number: 39,
  area: "E",
  syllabusRefs: ["E1", "E2", "E3", "E4"],
  title: "Professional skills",
  minutes: 16,
  intro:
    "Twenty marks of every paper, examined in Section A in full and at least two skills in each Section B question. They are not presentation — they are assessed behaviours with specific evidence.",
  outcomes: [
    "Communicate in the format and register the requirement specifies",
    "Analyse and evaluate evidence rather than describing it",
    "Apply professional scepticism to claims, data and causal assertions",
    "Demonstrate commercial acumen in recommendations",
    "Recognise what each skill looks like in a marker's eyes",
  ],
  sections: [
    {
      id: "four-skills",
      heading: "The four skills, and the evidence of each",
      blocks: [
        {
          kind: "table",
          caption: "What a marker is looking for",
          head: ["Skill", "Demonstrated by", "Absent when"],
          rows: [
            ["Communication", "The requested format and recipient; clear structure; a stated conclusion; tone suited to the reader", "The answer is a list of points in no order, or in the wrong format"],
            ["Analysis and evaluation", "Relationships between facts; quantified significance; alternatives weighed; a judgement reached", "Data from the exhibits is restated without inference"],
            ["Scepticism", "Assumptions challenged; missing evidence identified; causal claims tested; bias in the source noted", "Management's figures and explanations are accepted as given"],
            ["Commercial acumen", "Practicality, cost, capacity, stakeholders, timing and risk considered in the recommendation", "The recommendation is technically correct and impossible to implement"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Section A examines all four; Section B at least two",
          md: "The syllabus states that all professional skills are examined in Section A, and that each Section B question tests **at least two from analysis and evaluation, scepticism and commercial acumen**. So in Section B, scepticism and commercial acumen are the ones most likely to be under-served — and they are the two most candidates neglect.",
        },
        {
          kind: "text",
          md: "The format instruction is not decoration. A requirement asking for a **report to the board** expects a report: a heading, a short introduction stating purpose, sections with headings, a conclusion and a recommendation. Answering in continuous prose forfeits communication marks that were available for free, and doing so is entirely within the candidate's control.",
        },
      ],
      check: {
        q: "A Section B requirement asks for an assessment of a proposed new measurement system. Which sentence demonstrates scepticism?",
        options: [
          "The proposed system would provide more timely information to managers.",
          "The claimed 15% improvement is drawn from the supplier's own case studies at unnamed companies; before relying on it I would want evidence from a comparable organisation and confirmation that the improvement was not caused by the process changes made at the same time.",
          "The system is expensive and will take time to implement.",
          "Managers would need training before the system could be used effectively.",
        ],
        correct: 1,
        explain:
          "Scepticism means interrogating the evidence: naming its source, noting the interest of that source, identifying a confounding explanation, and stating what would be needed to accept the claim. The other options are reasonable observations but they accept the claim and comment around it.",
      },
    },
    {
      id: "acumen",
      heading: "Commercial acumen, which is where marks are lost",
      blocks: [
        {
          kind: "text",
          md: "Commercial acumen is the least well understood of the four. It is not business vocabulary — it is evidence that the recommendation could actually be carried out by this organisation, in its circumstances, at a cost proportionate to the benefit.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What demonstrates it",
          items: [
            "**Cost proportionality** — an activity-based costing exercise for a company with $400,000 of overhead is not worth doing",
            "**Capacity** — a small finance team cannot implement four changes at once; sequence them and say why in that order",
            "**Timing** — recommending a system implementation during the peak trading season is a recommendation that will not be taken",
            "**Stakeholders** — who will resist, and what would reduce that resistance",
            "**Conditions** — what should be true before proceeding, and what would cause the decision to be revisited",
            "**The smaller option** — a pilot in one division rather than a group-wide programme, where the evidence is not yet strong enough",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The habit that earns these marks",
          md: "After writing a recommendation, add one sentence answering: **who does this, by when, at what cost, and what could stop it?** That single sentence converts a technically correct suggestion into advice, and it is the difference between the two halves of the professional-skills allocation on almost every requirement.",
        },
        {
          kind: "text",
          md: "The final point is about **balance**. Professional skills marks are earned across the answer rather than in a separate section, so there is nothing to be gained from a paragraph headed 'professional skills'. They are demonstrated by how the technical content is presented, challenged and applied — which is why an answer that is technically thin cannot earn them, and why they are best thought of as a way of writing rather than as additional material.",
        },
      ],
      check: {
        q: "Which recommendation best demonstrates commercial acumen?",
        options: [
          "The company should implement activity-based costing across all divisions to improve cost accuracy.",
          "Pilot activity-based costing in the manufacturing division, where overhead is largest and most complex, over the next two quarters; the finance team has capacity for one project of this size, and the results would establish whether the wider rollout is justified before committing to it.",
          "Activity-based costing is theoretically superior to absorption costing and should be adopted.",
          "The company should consider whether activity-based costing might be beneficial.",
        ],
        correct: 1,
        explain:
          "Option 1 names where, why there, over what period, against what constraint, and what the pilot would establish. The others are technically defensible but say nothing about whether this organisation could do it, in what order, or at what cost — which is precisely what commercial acumen assesses.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing a separate 'professional skills' section.", fix: "They are demonstrated through how the technical content is presented and applied." },
    { trap: "Ignoring the requested format.", fix: "A report requirement expects headings, purpose, structure and a conclusion — free communication marks." },
    { trap: "Accepting management's figures and explanations.", fix: "Name the source, its interest, and the alternative explanation." },
    { trap: "Recommending something the organisation cannot do.", fix: "Add who, by when, at what cost, and what could stop it." },
  ],
  keyTerms: [
    { term: "Professional scepticism", def: "An enquiring attitude that questions claims, tests causal assertions and identifies the evidence needed before accepting a conclusion." },
    { term: "Commercial acumen", def: "Judgement connecting a technically sound recommendation to what the organisation can actually implement, at a proportionate cost and in a workable sequence." },
    { term: "Confounding factor", def: "A variable associated with both a supposed cause and its outcome, which can create a misleading impression of causation." },
  ],
  summary: [
    "Four skills, twenty marks, examined throughout the answer rather than in a section.",
    "Section A tests all four; each Section B question tests at least two.",
    "Scepticism means naming the source, its interest, and the alternative explanation.",
    "Commercial acumen means who, by when, at what cost, and what could stop it.",
  ],
  knowledgeDiagnostic: [
    { q: "Where are professional skills marks earned?", a: "Throughout the answer, in how the technical content is structured, challenged and applied — never in a separate section." },
    { q: "What does scepticism look like in a sentence?", a: "Naming the source of a claim, the interest of that source, a possible alternative explanation, and what evidence would be needed to accept it." },
    { q: "What one sentence converts a suggestion into advice?", a: "Who does this, by when, at what cost, and what could stop it." },
  ],
  furtherStudy: [
    "APM-30 and APM-31 exercise scepticism directly, on numerical and narrative presentation.",
    "APM-38 applies the same interrogation to model output.",
    "APM-40 covers the employability and technology skills examined alongside these.",
  ],
}

const APM_TREE_40: StudyChapter = {
  paper: "APM",
  id: "APM-40",
  number: 40,
  area: "F",
  syllabusRefs: ["F1", "F2", "F3", "F4"],
  title: "Employability and technology skills",
  minutes: 14,
  intro:
    "The area this paper did not have. It is examined by being demonstrated: navigating the exhibits, using the response tools properly, and presenting analysis a marker can follow.",
  outcomes: [
    "Use computer technology to access and manipulate relevant information efficiently",
    "Work on response options using the functions and technology the workplace would use",
    "Navigate windows and screens to create and amend responses using the appropriate tools",
    "Present data and information effectively with the available tools",
    "Apply these skills under exam conditions without losing time to them",
  ],
  sections: [
    {
      id: "navigating",
      heading: "Working the computer-based exam efficiently",
      blocks: [
        {
          kind: "text",
          md: "APM is a three-hour-fifteen-minute computer-based exam with a 50-mark case study and two 25-mark questions. The case study carries several exhibits, and the requirement will draw on some and not others. Time lost to disorganised navigation is time not spent answering.",
        },
        {
          kind: "list",
          style: "number",
          title: "A working method",
          items: [
            "Read the **requirement first**, then the exhibits — knowing what you are looking for changes what you notice",
            "Note which exhibit carries what, so you can return to it without re-reading everything",
            "Build the answer's headings from the requirement before writing anything, so nothing is missed and the structure is visible",
            "Put calculations in the spreadsheet and commentary in the word processor, rather than typing numbers into prose",
            "Answer requirements in the order that suits you, but label each clearly so the marker can find them",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The requirement-first habit is worth several marks",
          md: "Reading a long case study before knowing what is being asked means reading it twice — once for orientation and once for evidence. Reading the requirement first turns the exhibits into a search rather than a study, which is faster and produces more relevant selection. It is the single most valuable technique in this area.",
        },
      ],
      check: {
        q: "What is the most efficient way to approach a 50-mark case study with several exhibits?",
        options: [
          "Read every exhibit thoroughly, then read the requirements",
          "Read the requirements first, then work through the exhibits knowing what evidence is being sought — which turns reading into a targeted search rather than a study followed by a second pass",
          "Answer from the exhibits without reading the requirements in detail",
          "Read the first exhibit and begin writing immediately",
        ],
        correct: 1,
        explain:
          "Knowing the question changes what you notice, and it avoids the second pass that reading the exhibits blind makes necessary. It also prevents the common failure of writing a great deal about material the requirement never asked about.",
      },
    },
    {
      id: "presenting",
      heading: "Using the tools to present analysis well",
      blocks: [
        {
          kind: "table",
          caption: "Which tool for which output",
          head: ["Output", "Tool", "Why"],
          rows: [
            ["Calculations and workings", "Spreadsheet", "Formulae are visible, changes flow through, and the marker can follow the working"],
            ["Discussion, evaluation, recommendation", "Word processor", "Structure through headings, and prose the marker can read at speed"],
            ["A comparison of options", "Spreadsheet or a table in the word processor", "Side-by-side is far clearer than sequential paragraphs"],
            ["A report or memorandum", "Word processor with headings", "The requested format carries communication marks"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Use formulae, not typed-in numbers",
          md: "A spreadsheet answer built with **live formulae** shows the marker your method, survives a change in an input, and lets you correct an error in one place. Typing the results of calculations done on paper loses all three benefits, and a single arithmetic slip then propagates through the whole answer with nothing to show what was intended.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Presentation habits that earn marks",
          items: [
            "**Label everything** — units, periods, currencies and what each row represents",
            "**Show workings** in the cell or a clearly identified working, not on paper the marker cannot see",
            "**Use headings** matching the requirement's wording, so the marker can locate each part",
            "**State assumptions** where the exhibit is ambiguous, rather than choosing silently",
            "**Round sensibly and consistently** — spurious precision suggests the figure was not understood",
            "**Leave the answer readable** — a wall of unformatted text loses communication marks that cost nothing to protect",
          ],
        },
        {
          kind: "text",
          md: "The general principle behind all of it: these skills are examined because they are what the workplace requires. An analysis nobody can follow, in a format nobody asked for, with numbers nobody can trace, is not useful in an office either — and the exam is assessing the same thing an employer would.",
        },
      ],
      check: {
        q: "Why does building a spreadsheet answer with live formulae earn more than typing in calculated results?",
        options: [
          "It is faster to type formulae than numbers",
          "The method is visible to the marker, an input change flows through automatically, and an error can be corrected in one place instead of propagating untraceably through the answer",
          "Formulae are required by the exam software",
          "It uses less of the available screen space",
        ],
        correct: 1,
        explain:
          "Visible method, resilience to change, and correctability are the three reasons — and the first matters most, since a marker who can see how a figure was derived can award method marks even where the arithmetic went wrong.",
      },
    },
  ],
  examTraps: [
    { trap: "Reading the exhibits before the requirement.", fix: "It forces a second pass and produces less relevant selection." },
    { trap: "Typing calculated results into a spreadsheet.", fix: "Live formulae show the method and survive a corrected input." },
    { trap: "Writing discussion in a spreadsheet or calculations in prose.", fix: "Use each tool for what it is good at." },
    { trap: "Leaving figures unlabelled.", fix: "Units, periods and currencies — a marker should not have to infer them." },
  ],
  keyTerms: [
    { term: "Requirement-first reading", def: "Reading the task before the exhibits, so that the case study is searched for relevant evidence rather than studied twice." },
    { term: "Live formulae", def: "Spreadsheet cells calculating from other cells, making the method visible and allowing corrections to flow through." },
  ],
  summary: [
    "Read the requirement first, then search the exhibits for what it needs.",
    "Build headings from the requirement before writing.",
    "Calculations in the spreadsheet with live formulae; discussion in the word processor.",
    "Label everything and state assumptions — the marker should never have to infer.",
  ],
  knowledgeDiagnostic: [
    { q: "Why read the requirement before the exhibits?", a: "It converts reading into a targeted search, avoids a second pass, and prevents writing at length about material the requirement never asked about." },
    { q: "What three advantages do live formulae give?", a: "The method is visible to the marker, a corrected input flows through automatically, and an error is fixed in one place rather than propagating." },
    { q: "Why are these skills examined at all?", a: "They are what the workplace requires — analysis nobody can follow, in an unrequested format, with untraceable numbers, is no more useful in an office than in an exam." },
  ],
  furtherStudy: [
    "APM-39 covers the professional skills examined alongside these.",
    "APM-28 covers report evaluation, whose presentation principles apply to your own answers.",
    "APM-29 covers visualisation, which the same presentation judgement underpins.",
  ],
}

export const APM_TREE_AREA_D_PART2: StudyChapter[] = [APM_TREE_36, APM_TREE_37, APM_TREE_38]
export const APM_TREE_AREA_E: StudyChapter[] = [APM_TREE_39]
export const APM_TREE_AREA_F: StudyChapter[] = [APM_TREE_40]
