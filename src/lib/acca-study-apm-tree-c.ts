import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area C — performance reporting.
 *
 *   APM-28  Evaluating a management report        (C1a)
 *   APM-29  Data visualisation                    (C1b)
 *   APM-30  Misleading numbers                    (C1c)
 *   APM-31  Narrative commentary, honest and not  (C1d, C1e)
 *
 * Area C has ONE subsection and five learning outcomes, so it looks small. It
 * is not: the syllabus states that one of the two 25-mark Section B questions
 * comes from Area C in EVERY sitting. That is a guaranteed quarter of the paper
 * resting on five outcomes, which is the highest marks-per-outcome density in
 * APM and the reason this area gets four chapters rather than the one thin
 * chapter it previously had.
 *
 * Note what the outcomes actually ask. C1(c) and C1(d) are about how numbers
 * and narrative can be used to MISLEAD — the candidate is being trained to
 * detect manipulation, not merely to design a good report. C1(e) then asks for
 * a commentary to be PREPARED. So this area is examined as a practical skill
 * with an adversarial edge, and the chapters are written that way.
 *
 * Written against the official ACCA APM syllabus and study guide for September
 * 2026 to June 2027. See acca-study-apm-tree-a.ts for the note on the shim and
 * on why the originality corpus is the syllabus text alone.
 */

const APM_TREE_28: StudyChapter = {
  paper: "APM",
  id: "APM-28",
  number: 28,
  area: "C",
  syllabusRefs: ["C1(a)"],
  title: "Evaluating a management report",
  minutes: 18,
  intro:
    "The requirement is to evaluate the REPORT, not the performance it describes. Candidates who miss that distinction write a good answer to a question nobody asked.",
  outcomes: [
    "Evaluate a management report against the organisation's mission, goals and objectives",
    "Evaluate it against the needs of the users who receive it",
    "Identify and remedy information overload",
    "Assess presentation against best practice",
    "Distinguish evaluating a report from evaluating the results inside it",
  ],
  sections: [
    {
      id: "the-distinction",
      heading: "Evaluating the report, not the performance",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The single most costly error in this area",
          md: "Asked whether a board report is fit for purpose, most candidates analyse the numbers in it — revenue is up, margin is down, here is why. That is an answer to a different question. **A report can describe excellent performance and still be a bad report**, and a report showing poor results may be an excellent one. Read the verb: *evaluate the report* means assess the document as an instrument for making decisions.",
        },
        {
          kind: "text",
          md: "The syllabus gives you the four tests to apply, in the outcome itself: the report is evaluated **in the light of** the organisation's mission, goals and objectives; the needs of its users; the avoidance of information overload; and best practice in presentation. Structuring an answer around those four is the most reliable way to earn the technical marks.",
        },
        {
          kind: "table",
          caption: "The four tests, and what a failure looks like",
          head: ["Test", "The question", "Evidence of failure"],
          rows: [
            ["Mission, goals and objectives", "Does it report on what the organisation says it is trying to achieve?", "A mission emphasising service or sustainability with no measure of either"],
            ["User needs", "Does this recipient get what they need to decide?", "The same pack sent to the board and to depot managers"],
            ["Information overload", "Can the important thing be found?", "Forty pages, no summary, no exception highlighting, everything equally weighted"],
            ["Presentation", "Is it immediately intelligible?", "Unlabelled units, inconsistent periods, no comparatives, charts without context"],
          ],
        },
        {
          kind: "text",
          md: "The **user needs** test deserves emphasis because it is where the strongest observations come from. A board needs a small number of strategic measures with exceptions, trends and forward indicators; a depot manager needs detailed operational data for their own site this week. A single pack cannot serve both, so an organisation circulating one document to everybody has necessarily failed one of them — and usually both.",
        },
      ],
      check: {
        q: "A requirement asks you to evaluate whether a company's quarterly board report is fit for purpose. Which approach earns the marks?",
        options: [
          "Analyse the results in the report and comment on the company's performance",
          "Assess the report itself — whether it covers the objectives the organisation has set, gives the board what it needs to decide, controls overload, and presents information intelligibly",
          "Recalculate the ratios shown to check they are accurate",
          "Compare the results with those of competitors",
        ],
        correct: 1,
        explain:
          "The verb governs the answer. Analysing the results assesses the company; the requirement asks you to assess the document, which is a different skill and the one Area C examines. The other options are all analyses of performance rather than of the report.",
      },
    },
    {
      id: "overload",
      heading: "Information overload, and what to do about it",
      blocks: [
        {
          kind: "text",
          md: "Overload is not merely inconvenient. Beyond a certain volume, adding information **reduces** the quality of decisions: the recipient cannot identify what matters, spends attention on trivia, and eventually stops reading. Since nobody is ever criticised for including something, reports grow in one direction only unless someone actively removes material.",
        },
        {
          kind: "table",
          caption: "Remedies, in order of effectiveness",
          head: ["Remedy", "What it does"],
          rows: [
            ["Exception reporting", "Show only items outside tolerance, so attention goes where action is needed"],
            ["A one-page summary", "The three or four things the recipient must know, with the detail behind it"],
            ["Layering", "Headline, then supporting detail on request — the digital equivalent of an appendix"],
            ["Tailoring by recipient", "Different packs for board, division and site, from the same underlying data"],
            ["Removing measures", "Delete anything nobody has acted on in a year; a KPI nobody uses is noise"],
            ["Visual hierarchy", "Size, position and colour signalling what matters most"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The removal test",
          md: "For each measure in a report, ask: **when did anyone last take a decision because of this number?** If nobody can answer, it is not management information, and its presence is making the report harder to use. Recommending the removal of measures is unusual, concrete, and exactly what this outcome asks for — most candidates only ever recommend additions.",
        },
        {
          kind: "text",
          md: "**Comparability** is the other structural failure. A number without a comparator cannot be interpreted, so every measure needs a prior period, a target, or a benchmark beside it. And where a definition has changed mid-series — the classic trap — the trend is not a trend at all, and either the prior periods must be restated or the break must be shown visibly.",
        },
      ],
      check: {
        q: "A board pack contains 62 KPIs with no summary and no exception highlighting. What is the best recommendation?",
        options: [
          "Add an executive summary to the front of the existing pack",
          "Cut the measures to the few the board actually acts on, report the rest by exception, and add a one-page summary — since adding a summary while retaining 62 undifferentiated measures leaves the underlying overload in place",
          "Distribute the pack earlier so there is more time to read it",
          "Convert the KPIs into charts to make them easier to absorb",
        ],
        correct: 1,
        explain:
          "A summary bolted onto an unreduced pack treats the symptom. The underlying problem is that the report does not distinguish what matters, so the remedies must include removal and exception reporting. Charting sixty-two measures — option 3 — produces sixty-two charts and no more clarity.",
      },
    },
  ],
  examTraps: [
    { trap: "Analysing the performance when asked to evaluate the report.", fix: "Read the verb — the document is the subject." },
    { trap: "Recommending only additions.", fix: "Recommend removing measures nobody acts on; that is what the overload outcome asks for." },
    { trap: "Sending one pack to every level.", fix: "Board and site managers need different information, not different amounts of the same." },
    { trap: "Presenting a trend across a definition change.", fix: "Restate the prior periods or show the break visibly." },
  ],
  keyTerms: [
    { term: "Information overload", def: "Volume or detail beyond the point at which additional information improves decisions, after which it obscures what matters." },
    { term: "Exception reporting", def: "Reporting only items falling outside a defined tolerance, so attention is directed to what needs action." },
    { term: "Comparability", def: "The property that a measure can be read against a prior period, target or benchmark on a consistent basis." },
  ],
  summary: [
    "Evaluate the report as an instrument, not the performance it describes.",
    "Four tests: objectives, user needs, overload, presentation.",
    "Different users need different reports, not different lengths of the same one.",
    "Ask when anyone last acted on each measure — and remove the ones nobody uses.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between evaluating a report and evaluating performance?", a: "Evaluating the report assesses whether the document lets its recipients decide well; performance can be excellent while the report describing it is poor." },
    { q: "Why do reports grow indefinitely?", a: "Nobody is criticised for including something, so material is only ever added unless someone actively removes it." },
    { q: "What test identifies a measure that should be deleted?", a: "Whether anyone can say when a decision was last taken because of it." },
  ],
  furtherStudy: [
    "APM-29 covers the visualisation choices that determine whether a report is intelligible.",
    "APM-09 covers the critical success factors that decide which measures belong in a report at all.",
    "APM-04 covers the balanced scorecard, whose selectivity discipline this chapter applies.",
  ],
}

const APM_TREE_29: StudyChapter = {
  paper: "APM",
  id: "APM-29",
  number: 29,
  area: "C",
  syllabusRefs: ["C1(b)"],
  title: "Data visualisation",
  minutes: 16,
  intro:
    "A chart is an argument. Choosing the right one makes a relationship visible in a second; choosing the wrong one hides it, and choosing dishonestly makes the reader believe something untrue.",
  outcomes: [
    "Evaluate the use of charts, graphs, maps and animation to communicate performance",
    "Match the visual form to the relationship being shown",
    "Identify design choices that impede understanding",
    "Assess when a visualisation adds insight and when it merely decorates",
    "Recommend improvements to a specific visualisation",
  ],
  sections: [
    {
      id: "choosing",
      heading: "Matching the visual to the relationship",
      blocks: [
        {
          kind: "table",
          caption: "What each form is for",
          head: ["Form", "Shows", "Use when"],
          rows: [
            ["Line chart", "Change over time", "The variable is continuous and the trend is the message"],
            ["Bar or column chart", "Comparison between categories", "Comparing discrete items — divisions, products, regions"],
            ["Stacked bar", "Composition within a total", "Both the total and its make-up matter"],
            ["Scatterplot", "Association between two variables", "Testing whether two measures move together"],
            ["Map", "Geographic pattern", "Location is the variable that matters"],
            ["Heat map", "Density or intensity across two dimensions", "Spotting concentration in a large matrix"],
            ["Waterfall", "How a total was built up or bridged", "Explaining the movement between two figures"],
            ["Animation", "Change in a relationship over time", "The pattern only emerges when several periods are seen in sequence"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The pie chart problem",
          md: "People compare angles badly. A pie with more than four or five segments, or with segments of similar size, cannot be read accurately — and two pies side by side cannot be compared at all. A bar chart conveys the same information more precisely in the same space. Recommending the replacement of pies is a small, concrete, defensible improvement.",
        },
        {
          kind: "text",
          md: "**Animation** appears explicitly in the syllabus and is worth a considered comment. It is genuinely useful where the message is how a relationship *changed over time* — market positions shifting, a distribution spreading — because that pattern is hard to convey in a static image. Its risks are that the viewer cannot inspect intermediate states, that it cannot be printed or included in minutes, and that it is frequently used to impress rather than to inform.",
        },
      ],
      check: {
        q: "A report needs to show whether staff turnover and customer satisfaction are related across 40 branches. Which visualisation is appropriate?",
        options: [
          "A stacked bar chart of both measures by branch",
          "A scatterplot with one measure on each axis, so any association between the two becomes visible across all forty branches at once",
          "A pie chart of turnover by branch",
          "A line chart of both measures over time",
        ],
        correct: 1,
        explain:
          "The question is about association between two variables, which is exactly what a scatterplot shows. Bars compare categories, a pie shows composition, and a line chart shows change over time — none of them makes a relationship between two measures visible.",
      },
    },
    {
      id: "honest-design",
      heading: "Design choices that help and hinder",
      blocks: [
        {
          kind: "table",
          caption: "The recurring design failures",
          head: ["Failure", "Effect", "Fix"],
          rows: [
            ["Truncated vertical axis", "Exaggerates small differences dramatically", "Start at zero, or mark the break explicitly"],
            ["Inconsistent colour meaning", "Red means bad in one chart and a product line in the next", "One colour scheme across the whole report"],
            ["Too many series on one chart", "Nothing is readable", "Split into small multiples"],
            ["Three-dimensional effects", "Distorts apparent size and adds no information", "Use two dimensions"],
            ["Dual axes with different scales", "Implies a relationship the data may not support", "Two charts, or index both series to a common base"],
            ["Missing units or periods", "The reader cannot interpret the magnitude", "Label everything"],
            ["Chartjunk", "Decoration competing with the data", "Remove anything not carrying information"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Accessibility is a legitimate point",
          md: "Around one in twelve men has some form of colour vision deficiency, so a red/green status chart is unreadable for a meaningful share of any board. Using shape or position as well as colour, and choosing a colour-safe palette, is a concrete recommendation that most candidates never make.",
        },
        {
          kind: "text",
          md: "The test for whether a visualisation earns its place is simple: **what can the reader see in this chart that they could not see in the table?** If the answer is nothing, the chart is decoration and the table was better — it is more precise and takes less space. Charts justify themselves by making a pattern visible: a trend, an outlier, a relationship, a concentration.",
        },
      ],
      check: {
        q: "A chart shows revenue rising steeply, but its vertical axis runs from 980 to 1,020. What is the issue?",
        options: [
          "The axis range is fine, since it focuses on the relevant region",
          "The truncated axis exaggerates a movement of about 4% into what appears to be dramatic growth — it should start at zero, or the break should be marked explicitly so the reader can judge the real magnitude",
          "The chart should use a bar format instead",
          "Revenue should be shown after tax",
        ],
        correct: 1,
        explain:
          "Truncating the axis is the most common way of making a small change look large, and it is effective precisely because readers judge magnitude from the visual rather than the numbers. It may be defensible for detailed operational monitoring, but then the break must be marked so nobody is misled.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending charts generally.", fix: "Match the specific form to the relationship being shown." },
    { trap: "Ignoring axis manipulation.", fix: "A truncated axis is the commonest visual distortion — check it every time." },
    { trap: "Treating a chart as automatically clearer than a table.", fix: "Ask what the chart makes visible that the table did not." },
    { trap: "Overlooking accessibility.", fix: "Red/green status coding fails for a significant share of readers; add shape or position." },
  ],
  keyTerms: [
    { term: "Truncated axis", def: "A chart axis not starting at zero, which exaggerates the apparent size of differences." },
    { term: "Small multiples", def: "Several small charts using identical scales and layout, used instead of overloading one chart with many series." },
    { term: "Chartjunk", def: "Decorative elements in a chart that carry no information and compete with the data." },
  ],
  summary: [
    "Line for time, bar for category, scatter for association, map for place, waterfall for a bridge.",
    "The commonest distortion is a truncated vertical axis.",
    "A chart must show something the table could not, or the table was better.",
    "Colour alone fails a meaningful share of readers — use shape or position too.",
  ],
  knowledgeDiagnostic: [
    { q: "Which visual shows whether two measures are related?", a: "A scatterplot, with one measure on each axis." },
    { q: "Why are pie charts a poor choice for most comparisons?", a: "People judge angles inaccurately, so segments of similar size cannot be distinguished and two pies cannot be compared." },
    { q: "What is the test for whether a chart earns its place?", a: "Whether it makes visible a pattern — trend, outlier, relationship, concentration — that the underlying table did not." },
  ],
  furtherStudy: [
    "APM-30 covers the deliberate misuse of these techniques to mislead.",
    "APM-28 covers the overall report evaluation this visualisation sits within.",
    "APM-36 covers regression, the analytical counterpart to a scatterplot.",
  ],
}

const APM_TREE_30: StudyChapter = {
  paper: "APM",
  id: "APM-30",
  number: 30,
  area: "C",
  syllabusRefs: ["C1(c)"],
  title: "How numbers mislead",
  minutes: 17,
  intro:
    "The syllabus asks you to advise on how the presentation of numerical data could give a misleading impression. That is a request to think like someone trying to deceive you — and then to say how you would catch them.",
  outcomes: [
    "Identify presentational choices that create a misleading impression of performance",
    "Recognise selective use of periods, comparators and bases",
    "Detect definition changes and inconsistent scope",
    "Distinguish deliberate manipulation from careless presentation",
    "Advise on the controls that make numerical reporting trustworthy",
  ],
  sections: [
    {
      id: "the-techniques",
      heading: "The techniques, and how to catch each one",
      blocks: [
        {
          kind: "text",
          md: "None of these involves false numbers. Every figure can be individually correct and the impression still wrong, which is what makes them effective and hard to challenge — and it is why the detection method is always to ask what was **not** shown.",
        },
        {
          kind: "table",
          caption: "Twelve ways to mislead with true figures",
          head: ["Technique", "How it works", "How to catch it"],
          rows: [
            ["Selective period", "Choose a start date that flatters — the trough", "Ask for a longer series and one starting elsewhere"],
            ["Selective comparator", "Compare against a weak peer or a bad prior year", "Ask why that comparator, and request the obvious alternative"],
            ["Changed definition", "Redefine the measure mid-series", "Check whether the basis is the same throughout"],
            ["Changed scope", "Include or exclude an entity, segment or region", "Reconcile the population between periods"],
            ["Percentages without absolutes", "'Complaints down 50%' — from four to two", "Ask for the underlying numbers"],
            ["Absolutes without percentages", "'Revenue up $4m' on a base of $900m", "Ask for the proportion"],
            ["Averages hiding distribution", "A mean satisfaction score across polarised experience", "Ask for the spread and the segments"],
            ["Cherry-picked measures", "Report only the measures that improved", "Ask which measures were reported last time"],
            ["Rebasing an index", "Reset to 100 at a convenient point", "Ask for the underlying series"],
            ["Cumulative presentation", "Year-to-date figures conceal a deteriorating recent trend", "Ask for the periodic figures"],
            ["Ratio numerator/denominator games", "Improve a ratio by shrinking the base", "Look at both components separately"],
            ["Forecast presented as actual", "Blend actual and projected without distinction", "Check what is reported and what is expected"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The single question that catches most of it",
          md: "**What would this look like on a different basis?** A different start date, a different comparator, the absolute rather than the percentage, the periodic rather than cumulative figure. Anyone presenting honestly can answer immediately, because they have already looked. Anyone who has chosen the presentation to flatter cannot, and the hesitation is itself the finding.",
        },
        {
          kind: "example",
          title: "Three true statements, one false impression",
          scenario:
            "A divisional report states: 'Revenue has grown 34% since 2023. Customer complaints have halved. We outperformed our closest competitor.' Underlying: 2023 was the division's worst year in a decade after losing a major contract; complaints fell from six to three, in a division serving 40,000 customers; the closest competitor by revenue is a firm that entered administration during the year.",
          steps: [
            { label: "The period", detail: "Growth is measured from a trough, so it largely reflects recovery to a previous level rather than genuine expansion." },
            { label: "The percentage", detail: "A halving of six to three is not evidence of anything at 40,000 customers — it is within normal variation, and complaints are probably not the measure to use." },
            { label: "The comparator", detail: "Outperforming a firm that failed during the period says almost nothing about competitive position." },
            { label: "What to request", detail: "A five-year series, complaint rates per thousand customers alongside a retention measure, and comparison against the median of a defined peer group." },
          ],
          result:
            "Every sentence is true and the impression is unsupportable. That combination is the standard shape of this requirement, and identifying it sentence by sentence is how the marks are earned.",
        },
      ],
      check: {
        q: "A report states that operating margin improved from 4.1% to 4.9%. What should be checked before accepting this as improved performance?",
        options: [
          "Whether the percentages were calculated correctly",
          "Whether both components moved as expected — the margin rises if profit grows OR if revenue falls, so a shrinking business can show an improving margin while performing worse",
          "Whether margin is the correct measure for the industry",
          "Whether the figures have been audited",
        ],
        correct: 1,
        explain:
          "A ratio can be improved from either end, so a margin improvement accompanied by falling revenue is usually bad news presented as good. Looking at the numerator and denominator separately is the standard defence against every ratio-based claim, and it takes one line.",
      },
    },
    {
      id: "controls",
      heading: "Making numerical reporting trustworthy",
      blocks: [
        {
          kind: "text",
          md: "Detection is a skill; prevention is an advisory recommendation, and the requirement usually wants both. The controls are unglamorous and they work.",
        },
        {
          kind: "list",
          style: "number",
          title: "What to recommend",
          items: [
            "**A governed KPI dictionary** — one written definition per measure, with a named owner, so a definition cannot change silently",
            "**A fixed report template** — the same measures in the same order each period, so omitting one is visible",
            "**Standing comparators** — a defined peer group and a fixed prior-period basis agreed in advance, not chosen each time",
            "**Restatement discipline** — where a definition or scope changes, prior periods are restated or the break is marked on the face of the report",
            "**Longer series by default** — three to five periods, so a single flattering start point cannot be selected",
            "**Independent preparation** — the report is compiled by someone other than the manager whose performance it describes",
            "**Absolutes alongside percentages**, as a standing presentation rule",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The fixed template is the strongest single control",
          md: "Most numerical manipulation works by **choosing** — which period, which comparator, which measures to include this time. A template agreed in advance removes the choice, so the presenter can no longer select the flattering version. It is cheap, it needs no analysis, and it defeats the majority of the techniques in the table above.",
        },
        {
          kind: "text",
          md: "Finally, distinguish **manipulation** from **carelessness** when advising. Both produce a misleading report, but the remedies differ: carelessness needs templates, training and review, while deliberate manipulation needs independent preparation, a change in the incentives that reward it, and — where a bonus depends on the figures — escalation. An answer that assumes bad faith without evidence is as weak as one that assumes none.",
        },
      ],
      check: {
        q: "Which control most effectively prevents selective presentation of performance data?",
        options: [
          "Requiring all reports to be audited",
          "A fixed report template with standing comparators and a governed KPI dictionary — because most manipulation works by choosing the period, comparator or measures, and a template agreed in advance removes that choice",
          "Increasing the frequency of reporting",
          "Adding more measures to the report",
        ],
        correct: 1,
        explain:
          "The techniques in this area depend on selection rather than on false figures, so the control has to remove the selection. Auditing is disproportionate for internal management reporting and would not catch a favourable-but-permitted choice of comparator; adding measures worsens overload.",
      },
    },
  ],
  examTraps: [
    { trap: "Checking whether figures are accurate.", fix: "They usually are — the manipulation is in the selection and presentation." },
    { trap: "Accepting a percentage without the absolute.", fix: "A halving from six to three is not evidence of anything." },
    { trap: "Reading a ratio improvement as better performance.", fix: "Check both components; a shrinking denominator improves a ratio." },
    { trap: "Assuming deliberate deceit.", fix: "Distinguish manipulation from carelessness — the remedies differ." },
  ],
  keyTerms: [
    { term: "Selective comparator", def: "A comparison chosen because it flatters, such as a weak peer or an unusually poor prior period." },
    { term: "KPI dictionary", def: "A governed record of one written definition per measure, with a named owner, preventing silent definition changes." },
    { term: "Restatement", def: "Recalculating prior periods on a new basis so that a series remains comparable after a definition or scope change." },
  ],
  summary: [
    "Every figure can be true while the impression is false — the manipulation is in the selection.",
    "Ask what it would look like on a different basis; an honest presenter can answer at once.",
    "Check both components of every ratio, and demand absolutes alongside percentages.",
    "A fixed template with standing comparators defeats most of these techniques at low cost.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is it usually pointless to check whether the figures are accurate?", a: "The techniques in this area use true figures — the misleading impression comes from which period, comparator, measure or basis was chosen." },
    { q: "What single question catches most numerical manipulation?", a: "What would this look like on a different basis — different start date, comparator, or absolute rather than percentage?" },
    { q: "Why is a fixed reporting template such an effective control?", a: "Manipulation depends on choosing what to show; a template agreed in advance removes the choice." },
  ],
  furtherStudy: [
    "APM-31 covers the same problem in narrative rather than numerical form.",
    "APM-29 covers the visual equivalents, particularly axis manipulation.",
    "APM-19 covers why a manager whose bonus depends on the figures has a reason to present selectively.",
  ],
}

const APM_TREE_31: StudyChapter = {
  paper: "APM",
  id: "APM-31",
  number: 31,
  area: "C",
  syllabusRefs: ["C1(d)", "C1(e)"],
  title: "Narrative commentary, honest and otherwise",
  minutes: 17,
  intro:
    "Two outcomes in one chapter because they are the same skill from opposite ends: recognising a commentary written to mislead, and writing one that is genuinely useful.",
  outcomes: [
    "Advise on how narrative commentary can create a misleading impression",
    "Identify attribution bias, vague language and selective explanation",
    "Prepare a useful narrative commentary from data presented",
    "Structure a commentary so it explains rather than restates",
    "Recommend controls over narrative reporting",
  ],
  sections: [
    {
      id: "misleading-narrative",
      heading: "How a commentary misleads",
      blocks: [
        {
          kind: "text",
          md: "Narrative is harder to challenge than numbers because there is nothing to recompute. Its techniques are correspondingly subtle, and the most common one is not a false statement but a **pattern of explanation**.",
        },
        {
          kind: "table",
          caption: "The techniques",
          head: ["Technique", "What it looks like"],
          rows: [
            ["Attribution bias", "Good results are management's achievements; bad ones are the market, the weather, the regulator"],
            ["Selective explanation", "Improvements explained in detail; deteriorations noted in a subordinate clause, or not at all"],
            ["Vague quantification", "'Significantly improved', 'broadly in line', 'a challenging environment' — unfalsifiable"],
            ["Emphasis and ordering", "Good news first and at length; bad news late, brief, and in continuous prose"],
            ["Forward deflection", "Poor results reframed as investment in future performance, with no measure attached"],
            ["Adjusted measures", "Underlying, adjusted or normalised figures foregrounded, with the statutory result de-emphasised"],
            ["Technical language", "Complexity used to discourage questions rather than to inform"],
            ["Comparison switching", "Comparing against budget when that flatters, against last year when that does"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Attribution bias is the one to look for first",
          md: "Read the commentary and ask, for each explanation: **if the result had gone the other way, would the same cause have been cited?** A company crediting management action for a good quarter and external conditions for a bad one is not explaining performance — it is managing the reader's impression of management. This test is quick, applies to almost every commentary, and produces a specific, evidenced criticism.",
        },
        {
          kind: "text",
          md: "The **adjusted measures** point deserves particular care because it is not automatically illegitimate. Excluding a genuine one-off — a restructuring charge, a disposal — can give a clearer view of underlying performance. It becomes misleading when the same category of item is excluded every year, when exclusions are asymmetric (one-off costs removed, one-off gains retained), or when the adjusted figure is given prominence and the statutory one is relegated to a footnote.",
        },
      ],
      check: {
        q: "A commentary attributes a strong quarter to 'the successful execution of our commercial strategy' and a weak one to 'unprecedented market headwinds'. What is the criticism?",
        options: [
          "Both explanations may be entirely accurate",
          "Attribution bias — internal credit for success and external blame for failure. The test is whether the same cause would have been cited had the result gone the other way, and here it plainly would not",
          "The commentary is too short",
          "Market conditions should never be mentioned in a commentary",
        ],
        correct: 1,
        explain:
          "External conditions genuinely do affect results, so the objection is not that they are mentioned — it is the asymmetry. A commentary crediting management when results are good and the environment when they are poor is systematically shaping the reader's view of management rather than explaining what happened.",
      },
    },
    {
      id: "writing-one",
      heading: "Preparing a commentary that is actually useful",
      blocks: [
        {
          kind: "text",
          md: "C1(e) asks you to **prepare** a narrative commentary from data presented, so this is a practical skill that may be examined directly. The structure below works because it forces explanation rather than restatement.",
        },
        {
          kind: "list",
          style: "number",
          title: "The structure",
          items: [
            "**What happened** — the headline movement, quantified, in one sentence",
            "**Why** — the causes, distinguishing what the organisation controlled from what it did not, and quantifying each where possible",
            "**What it means** — the consequence for objectives, and whether the pattern is expected to continue",
            "**What is being done** — the action, with an owner and a timescale",
            "**What we do not know** — the uncertainties, the data limitations, and what would change the conclusion",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The commonest failure is restatement",
          md: "'Revenue fell 6% to $42.3m' adds nothing — the reader can see that in the table above. The commentary exists to supply what the numbers cannot: **why** it fell, whether it will continue, and what is being done. If a sentence could be deleted without losing information the table did not already carry, delete it.",
        },
        {
          kind: "example",
          title: "The same movement, twice",
          scenario: "Revenue fell 6% to $42.3m, against a target of $46.0m.",
          steps: [
            { label: "Restatement (worthless)", detail: "'Revenue of $42.3m was 6% below the prior year and $3.7m below target, a disappointing performance in a challenging market.'" },
            { label: "Explanation (useful)", detail: "'Revenue fell $2.7m. Around $2.1m of that is the loss of the Halden contract in March, which was known and reflected in the revised forecast; the remaining $0.6m is slower volume in the industrial segment, where two customers have deferred orders to the next quarter.'" },
            { label: "Meaning", detail: "'Excluding Halden, underlying revenue was broadly flat. The deferred orders are confirmed rather than lost, so the shortfall is expected to reverse in the following period.'" },
            { label: "Action and uncertainty", detail: "'Replacement of the Halden volume is targeted for the second half, owned by the Sales Director. The principal uncertainty is whether the two deferred customers proceed; if they do not, the shortfall becomes structural.'" },
          ],
          result:
            "The second version tells the reader something the table could not, separates the known from the unknown, and states what would change the conclusion — which is what makes it decision-useful rather than descriptive.",
        },
        {
          kind: "text",
          md: "**Controls** over narrative are worth recommending because they are rarely applied: preparation by someone other than the manager being described, a standing structure so that bad news cannot be omitted by rearrangement, a requirement that every significant movement be explained whichever direction it went, and quantification of causes wherever the data permits it.",
        },
      ],
      check: {
        q: "Which sentence belongs in a useful narrative commentary?",
        options: [
          "'Operating profit decreased by 12% compared with the prior year.'",
          "'Operating profit fell 12%, of which around nine points reflect the one-off legal settlement in June and three points a sustained increase in freight rates that is expected to persist into next year.'",
          "'Management remains focused on delivering improved returns for shareholders.'",
          "'Performance was impacted by a range of internal and external factors.'",
        ],
        correct: 1,
        explain:
          "Only option 1 adds what the table cannot show: the causes, quantified, and separated into the one-off and the continuing. Option 0 restates the number, and options 2 and 3 are unfalsifiable statements that convey no information at all.",
      },
    },
  ],
  examTraps: [
    { trap: "Criticising a commentary for mentioning external conditions.", fix: "The objection is asymmetry — test whether the same cause would be cited if the result had reversed." },
    { trap: "Treating all adjusted measures as manipulation.", fix: "Ask whether exclusions are recurring, asymmetric, or given undue prominence." },
    { trap: "Writing a commentary that restates the figures.", fix: "Explain why, what it means, what is being done, and what remains uncertain." },
    { trap: "Using unquantified language.", fix: "'Significantly' is unfalsifiable; attach a number to every cause the data supports." },
  ],
  keyTerms: [
    { term: "Attribution bias", def: "Systematically crediting internal management for favourable results while attributing unfavourable ones to external factors." },
    { term: "Narrative commentary", def: "The explanatory text accompanying performance data, whose purpose is to supply cause, meaning, action and uncertainty rather than to restate figures." },
    { term: "Adjusted measure", def: "A result presented after excluding specified items, legitimate for genuine one-offs but misleading where exclusions recur or are asymmetric." },
  ],
  summary: [
    "Narrative misleads through attribution, selection, vagueness and emphasis rather than false statement.",
    "Test each explanation by asking whether the same cause would be cited had the result reversed.",
    "A useful commentary gives cause, meaning, action and uncertainty — never restatement.",
    "Quantify every cause the data supports, and say what would change the conclusion.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the quickest test for attribution bias?", a: "Ask whether the same cause would have been cited if the result had gone the other way." },
    { q: "When does an adjusted measure become misleading?", a: "When the same category of item is excluded every year, when exclusions are asymmetric, or when the statutory figure is relegated." },
    { q: "What are the five elements of a useful commentary?", a: "What happened, why, what it means, what is being done, and what remains uncertain." },
  ],
  furtherStudy: [
    "APM-30 covers the numerical counterpart to these techniques.",
    "APM-28 covers the report structure a commentary sits within.",
    "APM-38 covers the professional skills — communication and scepticism — this chapter exercises directly.",
  ],
}

export const APM_TREE_AREA_C_PART1: StudyChapter[] = [APM_TREE_28, APM_TREE_29, APM_TREE_30, APM_TREE_31]
