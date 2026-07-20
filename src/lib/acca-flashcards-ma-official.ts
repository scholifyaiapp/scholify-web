import type { Flashcard } from "@/lib/acca-flashcards"

export const MA_OFFICIAL_FLASHCARDS: Flashcard[] = [
  { id: "MA-B-FC-01", paper: "MA", area: "B", front: "Nominal, ordinal, discrete and continuous data", back: "Nominal: unordered category. Ordinal: ordered category. Discrete: countable numerical values. Continuous: measured values on a continuum." },
  { id: "MA-B-FC-02", paper: "MA", area: "B", front: "Mean vs median when data is skewed", back: "The mean uses every value and is pulled by extremes; the median is positional and usually represents strongly skewed data more robustly." },
  { id: "MA-B-FC-03", paper: "MA", area: "B", front: "Coefficient of variation", back: "Standard deviation ÷ mean × 100%. It compares RELATIVE dispersion across datasets with different means or units." },
  { id: "MA-B-FC-04", paper: "MA", area: "B", front: "Expected value — formula and warning", back: "Σ(probability × outcome). It is a long-run probability-weighted average, not the result guaranteed on one occasion." },
  { id: "MA-B-FC-05", paper: "MA", area: "B", front: "Laspeyres vs Paasche index weights", back: "Laspeyres uses BASE-period quantities; Paasche uses CURRENT-period quantities." },
  { id: "MA-B-FC-06", paper: "MA", area: "B", front: "The five Vs of big data", back: "Volume, variety, velocity, veracity and value." },
  { id: "MA-B-FC-07", paper: "MA", area: "B", front: "Spreadsheet model control — the minimum professional pattern", back: "Separate inputs, logic and outputs; label units and assumptions; validate and protect inputs; test boundaries; reconcile; independently review; control versions." },
  { id: "MA-B-FC-08", paper: "MA", area: "B", front: "Correlation coefficient vs coefficient of determination", back: "r shows direction and strength of linear association; r² shows the proportion of variation associated with the fitted linear relationship. Neither proves causation." },
]

