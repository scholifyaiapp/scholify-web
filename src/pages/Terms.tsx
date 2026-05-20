import InfoPageLayout from "@/components/info-page-layout"

export default function Terms() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      updated="May 20, 2026"
      intro="These terms are the agreement between you and Scholify. By creating an account or using the app, you agree to them. We have kept them as plain and short as we can."
      sections={[
        {
          heading: "Using Scholify",
          body: [
            "Scholify gives you tools to set learning goals, follow study plans, keep streaks, and get coaching from Lara, our AI learning partner.",
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
            "Scholify offers free and paid plans. Paid plans renew automatically until you cancel, and you can cancel at any time from your account settings.",
            "Unless required by law, fees already paid are non-refundable. Prices may change, and we will give you notice before any change affects you.",
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
          heading: "AI guidance from Lara",
          body: [
            "Lara is an AI learning partner. Her suggestions, explanations, and study plans are meant to help you learn, but they can be incomplete or wrong.",
            "Lara does not provide professional, medical, legal, or financial advice. Always use your own judgment for important decisions.",
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
            "Questions about these terms? Email support@scholify.app.",
          ],
        },
      ]}
    />
  )
}
