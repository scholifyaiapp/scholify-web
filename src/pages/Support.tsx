import InfoPageLayout from "@/components/info-page-layout"

export default function Support() {
  return (
    <InfoPageLayout
      title="Support"
      updated="May 20, 2026"
      intro="Stuck on something, or just have a question? We are here to help you keep your learning streak alive. Here is how to get answers fast."
      sections={[
        {
          heading: "Email us",
          body: [
            "The quickest way to reach a human is email: support@scholify.app.",
            "We answer most messages within 24 hours on weekdays. Tell us your account email and what is happening, and we will jump in.",
          ],
        },
        {
          heading: "Ask Lara first",
          body: [
            "For questions about your study plan, streaks, or how a feature works, Lara — your in-app AI partner — can often help you right away, any time of day.",
          ],
        },
        {
          heading: "Common questions",
          body: [
            "Lost your streak? Life Shields automatically protect your streak when you miss a day, so a single slip never sends you back to zero.",
            "Need to change your plan? Open Settings to adjust your goal, daily minutes, or deadline, and Lara will rebuild your plan around it.",
            "Billing or subscription help? Manage or cancel your plan in account settings, or email us and we will sort it out.",
            "Forgot your password? Use the \"Forgot password\" link on the sign-in page to reset it.",
          ],
        },
        {
          heading: "Report a bug or suggest a feature",
          body: [
            "Found something broken, or have an idea that would make Scholify better? Email support@scholify.app with the details — screenshots help a lot. Your feedback genuinely shapes what we build next.",
          ],
        },
        {
          heading: "Account and data requests",
          body: [
            "To export your data or delete your account, email us from your registered address and we will take care of it. See our Privacy Policy for more on how your data is handled.",
          ],
        },
      ]}
    />
  )
}
