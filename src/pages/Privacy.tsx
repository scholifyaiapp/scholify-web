import InfoPageLayout from "@/components/info-page-layout"

export default function Privacy() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
      updated="May 20, 2026"
      intro="Scholify helps you build a daily learning habit. To do that well, we collect a small amount of information about you and how you use the app. This page explains exactly what we collect, why, and the control you have over it."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "Account details: your name, email address, and password (stored encrypted) when you create an account.",
            "Learning data: the goals you set, your study plans, streaks, Life Shields, and progress — this is what powers your personalized experience.",
            "Conversations with Lara: messages you exchange with your AI learning partner, so she can give you relevant, continuous support.",
            "Usage and device data: basic analytics such as which features you use, app version, and device type, used only to improve Scholify.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "To build your study plans, track streaks, and personalize Lara's coaching.",
            "To keep your account secure and to provide customer support when you need it.",
            "To understand which features help people learn, so we can make Scholify better.",
            "We do not sell your personal data. Ever.",
          ],
        },
        {
          heading: "How we share information",
          body: [
            "We share data only with trusted service providers who help us run Scholify — for example, cloud hosting and the AI provider that powers Lara. They may only use it to deliver their service to us.",
            "We may disclose information if required by law, or to protect the safety and rights of our users.",
          ],
        },
        {
          heading: "Data security",
          body: [
            "We use industry-standard encryption in transit and at rest. No system is perfectly secure, but we work hard to protect your data and to limit who on our team can access it.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can view and edit your account information at any time inside the app.",
            "You can request a copy of your data, or ask us to delete your account and associated data, by emailing support@scholify.app.",
          ],
        },
        {
          heading: "Children's privacy",
          body: [
            "Scholify is not directed to children under 13. If you believe a child has provided us personal information, contact us and we will remove it.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "We may update this policy as Scholify evolves. When we make significant changes, we will notify you in the app or by email. The date above always reflects the latest version.",
          ],
        },
      ]}
    />
  )
}
