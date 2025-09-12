import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { ImpactChart } from "@/components/dashboard/impact-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AchievementsBadges } from "@/components/dashboard/achievements-badges"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { LeaderboardWidget } from "@/components/dashboard/leaderboard-widget"
import { MobileDashboard } from "@/components/mobile/mobile-dashboard"
import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden">
        <MobileDashboard />
        <MobileBottomNav />
      </div>

      <div className="hidden md:block">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-6">
              <StatsOverview />
              <ImpactChart />
              <RecentActivity />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AchievementsBadges />
              <UpcomingEvents />
              <LeaderboardWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
