import { useMemo } from "react"
import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import Stats from "@/components/stats-1"
import { GitHubCalendar } from "@/components/git-hub-calendar"
import { WeeklyKPIChart, type DayPoint } from "@/components/weekly-kpi-chart"
import AnimatedProgressBar from "@/components/animated-progress-bar"
import { GraduationCap, Home, MessageSquare, Settings, Target } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import { useT } from "@/i18n/LanguageProvider"

const sidebarItems = [
  { title: "Home", icon: Home, to: "/dashboard" },
  { title: "Goals", icon: Target, to: "/dashboard" },
  { title: "AI Tutor", icon: MessageSquare, to: "/chat" },
  { title: "Settings", icon: Settings, to: "/dashboard" },
]

const weekData: DayPoint[] = [
  { day: "S", value: 12 },
  { day: "M", value: 28 },
  { day: "T", value: 35 },
  { day: "W", value: 22 },
  { day: "T", value: 41 },
  { day: "F", value: 30 },
  { day: "S", value: 18 },
]

function generateContributions() {
  const out: { date: string; count: number }[] = []
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const seed = (d.getDate() * 37 + d.getMonth() * 13 + d.getFullYear()) % 7
    out.push({ date: d.toISOString().slice(0, 10), count: seed < 2 ? 0 : seed - 1 })
  }
  return out
}

export default function Dashboard() {
  const contributions = useMemo(generateContributions, [])
  const t = useT()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link to="/" className="flex items-center gap-2 px-2 py-3">
            <GraduationCap className="size-5" />
            <span className="font-semibold tracking-tight">Scholify</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{t("Workspace")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.to}>
                        <item.icon />
                        <span>{t(item.title)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-3 py-2 text-xs text-muted-foreground">
          {t("v0.1 · learning never stops")}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <h1 className="font-semibold tracking-tight">{t("Today")}</h1>
          <div className="ml-auto">
            <LanguageToggle />
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-8">
          <Stats />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-xl border bg-card p-6">
              <h2 className="font-semibold mb-1">{t("Weekly focus minutes")}</h2>
              <p className="text-sm text-muted-foreground mb-4">{t("Where your hours actually went.")}</p>
              <WeeklyKPIChart data={weekData} width={560} height={260} />
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <div>
                <h2 className="font-semibold mb-3">{t("Math · Algebra II")}</h2>
                <AnimatedProgressBar value={68} />
              </div>
              <div>
                <h2 className="font-semibold mb-3">{t("Spanish · A2 → B1")}</h2>
                <AnimatedProgressBar value={42} />
              </div>
              <div>
                <h2 className="font-semibold mb-3">{t("CS · Data structures")}</h2>
                <AnimatedProgressBar value={81} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-semibold mb-1">{t("Your streak")}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t("Every square is a day you studied.")}</p>
            <div className="overflow-x-auto">
              <GitHubCalendar data={contributions} />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
