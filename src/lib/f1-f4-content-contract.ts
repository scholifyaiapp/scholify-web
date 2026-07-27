export const F1_F4_PAPERS = ["BT", "MA", "FA", "LW"] as const
export type F1F4Paper = (typeof F1_F4_PAPERS)[number]

/** Founder-approved minimum inventory. Items count only after content audit. */
export const F1_F4_CONTENT_TARGET = {
  sectionA: 350,
  sectionB: 350,
  flashcards: 120,
  mockForms: 3,
  mixedBankSizes: [10, 20, 30],
  sectionC: 0,
} as const
