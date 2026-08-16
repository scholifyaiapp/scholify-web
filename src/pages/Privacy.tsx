import InfoPageLayout, { type InfoSection } from "@/components/info-page-layout"

interface PageContent {
  title: string
  intro: string
  updated: string
  sections: InfoSection[]
}

const en: PageContent = {
  title: "Privacy Policy",
  updated: "August 14, 2026",
  intro:
    "Scholify helps you prepare for the ACCA exams. To do that well, we collect a small amount of information about you and how you use the app. This page explains exactly what we collect, why, and the control you have over it.",
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Account details: your name and email address when you create an account. Authentication is handled by Supabase; Scholify does not receive or store your readable password.",
        "Learning data: the papers and exam dates you set, your study plans, answers, mock results, streaks and readiness scores — this is what powers your personalized experience.",
        "Conversations with Charles: messages you exchange with your AI race engineer, so he can give you relevant, continuous support.",
        "Usage and device data: product events, pages and features used, app version, and device or browser type. We use this to operate Scholify, understand conversion and improve the product.",
        "Billing data: Stripe processes your payment method and subscription. Scholify receives identifiers, plan and subscription status, but not your complete card number.",
        "Optional integrations: if you connect Google Calendar, we process the authorization tokens and calendar settings needed to provide synchronization until you disconnect it.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "To build your study plans, track progress, and personalize Charles's coaching.",
        "To keep your account secure and to provide customer support when you need it.",
        "To understand which features help people learn, so we can make Scholify better.",
        "To protect one learner's record from account sharing, a new sign-in can replace older login sessions. Anyone holding your credentials could otherwise see and change your answers, notes, mock results, AI conversations and account settings, so you should never share your password.",
        "We do not sell your personal data. Ever.",
      ],
    },
    {
      heading: "How we share information",
      body: [
        "We share data only with service providers needed to run Scholify, including Supabase for authentication and data, Vercel for hosting, Stripe for billing, PostHog for product analytics, Resend for email, Google when you enable Calendar, and the configured AI provider for Charles. Their handling is governed by their service terms and our configuration.",
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
        "You can export study data and delete your account from Settings. You may also request help, a copy, correction or deletion by emailing support@scholifyapp.com.",
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
  ],
}

export default function Privacy() {
  const c = en
  return (
    <InfoPageLayout title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />
  )
}
