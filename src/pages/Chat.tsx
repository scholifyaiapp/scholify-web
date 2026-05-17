import { Link } from "react-router-dom"
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat"
import { ArrowLeft } from "lucide-react"

export default function Chat() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back
        </Link>
        <h1 className="font-semibold tracking-tight">AI Tutor</h1>
      </header>
      <div className="flex-1">
        <AnimatedAIChat />
      </div>
    </div>
  )
}
