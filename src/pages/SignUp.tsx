import { AuthComponent } from "@/components/ui/sign-up"

function ScholifyLogo() {
  return (
    <img
      src="/logo.svg"
      alt="Scholify"
      width={28}
      height={28}
      decoding="async"
      style={{ borderRadius: 6, display: "block" }}
    />
  )
}

export default function SignUp() {
  return <AuthComponent logo={<ScholifyLogo />} brandName="Scholify" />
}
