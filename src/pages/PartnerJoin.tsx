import { useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { setPendingInviteCode } from "@/lib/partner-storage"
import { useAcceptInviteByCode } from "@/components/PartnerInvite"

/*
 * /partner/join/:code — public entry point for an invite link.
 *
 * If the visitor is signed in, we register a synthetic incoming invite
 * tied to the code and forward them to /partner where they accept or
 * decline. Otherwise we stash the code and bounce to /sign-up so the
 * code survives the round-trip and is applied right after auth.
 */
export default function PartnerJoin() {
  const { code } = useParams<{ code: string }>()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user && code) setPendingInviteCode(code)
  }, [user, loading, code])

  useAcceptInviteByCode(user ? code : undefined)

  if (loading) return null
  if (!user) return <Navigate to={`/sign-up?invite=${code ?? ""}`} replace />
  return <Navigate to="/partner" replace />
}
