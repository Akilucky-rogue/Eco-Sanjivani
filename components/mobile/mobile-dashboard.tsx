"use client"

import { useCurrentUser, useEvents } from "@/lib/hooks/use-database"
import { MobileStatsCard } from "./mobile-stats-card"
import { MobileEventCard } from "./mobile-event-card"
import { LiveEventUpdates } from "@/components/realtime/live-event-updates"
import { LiveChat } from "@/components/realtime/live-chat"
import { Waves, Trophy, Calendar, TrendingUp, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function MobileDashboard() {
  const { currentUser } = useCurrentUser()
  const { events, joinEvent } = useEvents()

  const upcomingEvents = events.filter((event) => event.status === "upcoming").slice(0, 3)

  const handleJoinEvent = (eventId: string) => {
    if (currentUser) {
      joinEvent(eventId, currentUser.id)
    }
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="pb-20">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-b-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Waves className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Welcome back!</h1>
            <p className="text-blue-100 text-sm">{currentUser.name}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Level {currentUser.level}
          </Badge>
          <span className="text-sm">{currentUser.points} points</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 space-y-3">
        <h2 className="font-semibold text-lg">Your Impact</h2>
        <div className="grid grid-cols-2 gap-3">
          <MobileStatsCard
            title="Events Joined"
            value={currentUser.eventsAttended.toString()}
            icon={Calendar}
            trend="up"
          />
          <MobileStatsCard title="Waste Collected" value={`${currentUser.wasteCollected}kg`} icon={Waves} trend="up" />
          <MobileStatsCard title="Points Earned" value={currentUser.points.toString()} icon={Trophy} trend="up" />
          <MobileStatsCard
            title="Achievements"
            value={currentUser.achievements.length.toString()}
            icon={TrendingUp}
            trend="neutral"
          />
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Upcoming Events</h2>
          <Button variant="ghost" size="sm" className="text-xs">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <MobileEventCard key={event.id} event={event} onJoin={handleJoinEvent} />
          ))}
        </div>
      </div>

      {/* Live Updates */}
      <div className="p-4">
        <LiveEventUpdates />
      </div>

      {/* Community Chat */}
      <div className="p-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Community Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <LiveChat roomId="general" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
