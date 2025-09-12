import { RewardsHeader } from "@/components/rewards/rewards-header"
import { PointsOverview } from "@/components/rewards/points-overview"
import { AchievementGallery } from "@/components/rewards/achievement-gallery"
import { RewardStore } from "@/components/rewards/reward-store"
import { Leaderboard } from "@/components/rewards/leaderboard"
import { StreakTracker } from "@/components/rewards/streak-tracker"

export default function RewardsPage() {
  return (
    <div className="pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RewardsHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <PointsOverview />
            <AchievementGallery />
            <RewardStore />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StreakTracker />
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  )
}
