"use client"

import { useCurrentUser } from "@/lib/hooks/use-database"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { ImpactChart } from "@/components/dashboard/impact-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AchievementsBadges } from "@/components/dashboard/achievements-badges"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { LeaderboardWidget } from "@/components/dashboard/leaderboard-widget"
import { MobileDashboard } from "@/components/mobile/mobile-dashboard"
import { AuthModal } from "@/components/auth/auth-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, Users, Calendar, Trophy } from "lucide-react"
import { useState } from "react"

export default function DashboardPage() {
  const { currentUser } = useCurrentUser()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              <Waves className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-600">Welcome to Eco-Sanjivani</CardTitle>
            <CardDescription>
              Join our marine conservation community to track your impact and participate in cleanup events.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Users className="h-6 w-6 mx-auto text-blue-600" />
                <p className="text-sm font-medium">Community</p>
                <p className="text-xs text-muted-foreground">Join 1000+ members</p>
              </div>
              <div className="space-y-2">
                <Calendar className="h-6 w-6 mx-auto text-green-600" />
                <p className="text-sm font-medium">Events</p>
                <p className="text-xs text-muted-foreground">50+ cleanup events</p>
              </div>
              <div className="space-y-2">
                <Trophy className="h-6 w-6 mx-auto text-yellow-600" />
                <p className="text-sm font-medium">Rewards</p>
                <p className="text-xs text-muted-foreground">Earn achievements</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={() => {
                  setAuthMode("signup")
                  setShowAuthModal(true)
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Get Started - Join Now
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setAuthMode("login")
                  setShowAuthModal(true)
                }}
                className="w-full"
              >
                Already have an account? Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultMode={authMode} />
      </div>
    )
  }

  return (
    <div className="pb-20 md:pb-0">
      <div className="md:hidden">
        <MobileDashboard />
      </div>

      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {currentUser.name}!</h1>
                  <p className="text-blue-100 mt-1">Continue your marine conservation journey</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-100">Level {currentUser.level}</div>
                  <div className="text-xl font-bold">{currentUser.points} points</div>
                </div>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </div>
  )
}
