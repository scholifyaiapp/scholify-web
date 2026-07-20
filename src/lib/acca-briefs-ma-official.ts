import type { TopicBrief } from "@/lib/acca-briefs"
import { KNOWLEDGE_BRIEFS } from "@/lib/acca-briefs-knowledge"

function old(area: string): TopicBrief {
  const brief = KNOWLEDGE_BRIEFS.find((item) => item.paper === "MA" && item.area === area)
  if (!brief) throw new Error(`MA brief migration: missing former Area ${area}`)
  return brief
}

export const MA_OFFICIAL_BRIEFS: TopicBrief[] = [
  { ...old("A"), area: "A", title: "Nature, source and purpose of management information" },
  {
    paper: "MA", area: "B", title: "Data analysis and statistical techniques", minutes: 7,
    sections: [
      { kind: "concept", heading: "From a population to a defensible forecast", body: `Sampling trades complete coverage for speed and cost. Random and systematic methods select across a population; stratified sampling represents important subgroups; cluster and multistage methods reduce fieldwork; quota sampling is non-random and therefore more exposed to selection bias.

Classify data before analysing it: nominal categories, ordered ordinal categories, discrete counts and continuous measurements. Mean, median and mode describe centre; variance, standard deviation and coefficient of variation describe spread. Expected value is a probability-weighted long-run average, not a guaranteed result.

Forecasting tools include high-low, scatter graphs, regression, time series and index numbers. Every model depends on stable relationships and suitable data; correlation never proves causation.` },
      { kind: "structure", heading: "Formula and model map", body: `High-low variable cost per unit = change in relevant cost / change in activity.
Linear model: y = a + bx.
Coefficient of determination = r squared.
Expected value = sum of probability times outcome.
Simple index = current value / base value × 100.
Coefficient of variation = standard deviation / mean × 100%.

Time series: trend + or × seasonality, with cyclical and random effects. Additive seasonality is an amount; multiplicative seasonality is a proportion or index.

Big data: volume, variety, velocity, veracity and value. Spreadsheet control: separate inputs, logic and outputs; validate, protect, test, reconcile, review and version.` },
      { kind: "example", heading: "Quick calculation", body: `At 2,000 units cost is $14,000; at 5,000 units cost is $23,000.

Variable cost = ($23,000 − $14,000) / (5,000 − 2,000) = $3 per unit.
Fixed cost = $23,000 − (5,000 × $3) = $8,000.
Estimated cost at 4,000 units = $8,000 + (4,000 × $3) = $20,000.

This is defensible only if both observations share the same relevant range and cost structure.` },
      { kind: "traps", heading: "Classic traps", body: `Using correlation as causation; treating expected value as a certain one-off result; mixing additive amounts with multiplicative indices; ignoring outliers and relevant ranges in high-low or regression; and trusting a spreadsheet because its totals look precise.` },
    ],
  },
  { ...old("B"), area: "C", title: "Cost accounting techniques" },
  { ...old("C"), area: "D", title: "Budgeting" },
  { ...old("D"), area: "E", title: "Standard costing" },
  { ...old("E"), area: "F", title: "Performance measurement" },
]

