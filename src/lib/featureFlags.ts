/*
 * Feature flags — progressively reveal advanced surfaces as a user gets
 * invested, instead of overwhelming a brand-new learner with every tab.
 *
 * Early users (< 20 completed sessions) see a clean, focused app. As they
 * keep showing up, more of the product unlocks. Some features stay off
 * entirely until the user base reaches critical mass (community) or are a
 * separate product line (teams).
 */

export interface FeatureFlags {
  studyRooms: boolean
  community: boolean
  teams: boolean
  speakingPractice: boolean
  calendarSync: boolean
  accountabilityPartner: boolean
}

export function getFeatureFlags(
  userSessions: number,
  isPro: boolean,
): FeatureFlags {
  const isEarlyUser = userSessions < 20

  return {
    // Show rooms only after 20 sessions
    studyRooms: !isEarlyUser,
    // Community needs critical mass - hide for now
    community: false,
    // Teams is B2B - separate product
    teams: false,
    // Speaking needs OpenAI key
    speakingPractice: isPro && !!import.meta.env.VITE_HAS_OPENAI,
    // Calendar is nice to have
    calendarSync: !isEarlyUser && isPro,
    // Partner after user is engaged
    accountabilityPartner: !isEarlyUser && isPro,
  }
}
