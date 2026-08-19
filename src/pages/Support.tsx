import InfoPageLayout, { type InfoSection } from "@/components/info-page-layout"

interface PageContent {
  title: string
  intro: string
  updated: string
  sections: InfoSection[]
}

const en: PageContent = {
  title: "Support",
  updated: "August 7, 2026",
  intro:
    "Stuck on something, or just have a question? We are here to help you keep your learning streak alive. Here is how to get answers fast.",
  sections: [
    {
      heading: "Email us",
      body: [
        "The quickest way to reach a human is email: info@scholifyapp.com.",
        "We answer most messages within 24 hours on weekdays. Tell us your account email and what is happening, and we will jump in.",
      ],
    },
    {
      heading: "Ask Charles first",
      body: [
        "For questions about your race plan, progress, or how a feature works, Charles — your in-app AI race engineer — can often help immediately.",
      ],
    },
    {
      heading: "Common questions",
      body: [
        "Lost your streak? A streak counts the consecutive days you answer questions — miss a day and it restarts, but every answer, readiness score and mock result you have earned is kept.",
        "Need to change your plan? Open Settings to adjust your goal, daily minutes, or sitting, and Charles will recalculate your route.",
        "Billing or subscription help? Manage or cancel your plan in account settings. To avoid a Pro trial charge, cancel before the trial deadline shown at checkout. You can also email us for help.",
        "Forgot your password? Click \"Forgot password?\" on the sign-in page. Open the secure link in the email, choose a new password on the reset page, then continue to Scholify.",
      ],
    },
    {
      heading: "Report a bug or suggest a feature",
      body: [
        "Found something broken, or have an idea that would make Scholify better? Email info@scholifyapp.com with the details — screenshots help a lot. Your feedback genuinely shapes what we build next.",
      ],
    },
    {
      heading: "Account and data requests",
      body: [
        "To export your data or delete your account, email us from your registered address and we will take care of it. See our Privacy Policy for more on how your data is handled.",
      ],
    },
  ],
}

export default function Support() {
  const c = en
  return (
    <InfoPageLayout title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />
  )
}
