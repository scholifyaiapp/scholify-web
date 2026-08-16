import InfoPageLayout, { type InfoSection } from "@/components/info-page-layout"

interface PageContent {
  title: string
  intro: string
  updated: string
  sections: InfoSection[]
}

const en: PageContent = {
  title: "Terms of Service",
  updated: "August 14, 2026",
  intro:
    "These terms are the agreement between you and Scholify. By creating an account or using the app, you agree to them. We have kept them as plain and short as we can.",
  sections: [
    {
      heading: "Using Scholify",
      body: [
        "Scholify gives you tools to set learning goals, follow study plans, keep streaks, and get coaching from Charles, our AI race engineer.",
        "You must be at least 13 years old to use Scholify. If you use it on behalf of an organization, you confirm you are authorized to accept these terms for them.",
      ],
    },
    {
      heading: "Your account",
      body: [
        "You are responsible for keeping your login details secure and for activity that happens under your account.",
        "Please give us accurate information when you sign up, and let us know promptly if you suspect any unauthorized use.",
      ],
    },
    {
      heading: "Subscriptions and billing",
      body: [
        "Onboarding, diagnosis and your personalised plan are free. Pro may include a 3-day trial after you add a payment method at checkout. Unless you cancel before the trial deadline shown by Stripe, the selected subscription starts automatically when the trial ends.",
        "Beginner subscriptions start billing at checkout. Paid subscriptions renew automatically until cancelled. You can cancel from account settings; access continues until the end of the current paid or trial period.",
        "Every Scholify account and subscription is an individual learner licence. You may use your account on different devices, but you must not share credentials, sell access, or let another person study through your account. A new sign-in may end an older login to protect the privacy and integrity of the learner record.",
        "Fees already paid are non-refundable, including for part-used billing periods and for periods you do not use after cancelling. Cancelling stops future renewals; it does not refund the current period. Nothing here limits rights you have under mandatory consumer law in your country, which apply regardless of this clause.",
        "Prices may change, and we will give you notice before any change affects you.",
      ],
    },
    {
      heading: "Acceptable use",
      body: [
        "Please do not misuse Scholify: no attempting to break or overload the service, no reverse engineering, no using it for unlawful purposes, and no abusive behavior toward our team or other users.",
        "We may suspend or close accounts that break these rules.",
      ],
    },
    {
      heading: "AI guidance from Charles",
      body: [
        "Charles is a fictional Scholify AI race engineer. His suggestions, explanations, and study plans are meant to help you learn, but they can be incomplete or wrong.",
        "Charles does not provide professional, medical, legal, or financial advice. Always use your own judgment for important decisions.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "Scholify, including its design, content, and software, belongs to us and is protected by law.",
        "The learning content and notes you create remain yours. By using the app, you give us permission to store and process them so we can provide the service to you.",
      ],
    },
    {
      heading: "Disclaimers and liability",
      body: [
        "Scholify is provided \"as is.\" We work hard to keep it running well, but we cannot guarantee it will always be available or error-free.",
        "To the extent the law allows, Scholify is not liable for indirect or incidental damages arising from your use of the app.",
      ],
    },
    {
      heading: "Changes and contact",
      body: [
        "We may update these terms as Scholify grows. We will notify you of significant changes in the app or by email, and the date above shows the latest version.",
        "Questions about these terms? Email support@scholifyapp.com.",
      ],
    },
  ],
}

export default function Terms() {
  const c = en
  return (
    <InfoPageLayout title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />
  )
}
