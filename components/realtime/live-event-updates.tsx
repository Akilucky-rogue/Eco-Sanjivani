"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { useRealtime, useNotifications } from "@/lib/hooks/use-realtime"
import { useEvents } from "@/lib/hooks/use-database"
import { formatDistanceToNow } from "date-fns"

export function LiveEventUpdates() {
  const { events } = useEvents()
  const { subscribe } = useRealtime()
  const { addNotification } = useNotifications()
  const [recentUpdates, setRecentUpdates] = useState<any[]>([])

  useEffect(() => {
    // Subscribe to event updates
    const unsubscribe = subscribe("event-update", (update: any) => {
      setRecentUpdates((prev) => [update, ...prev.slice(0, 4)])

      // Add notification for event updates
      addNotification({
        userId: "current-user", // In real app, get from auth
        type: "event_update",
        title: "Event Update",
        message: update.message,
        read: false,
      })
    })

    // Simulate some live updates
    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)]
      if (randomEvent) {
        const updates = [
          `${randomEvent.participants.length} volunteers joined ${randomEvent.title}`,
          `Weather conditions updated for ${randomEvent.title}`,
          `New equipment available for ${randomEvent.title}`,
          `Reminder: ${randomEvent.title} starts in 2 hours`,
        ]

        const update = {
          id: Date.now().toString(),
          eventId: randomEvent.id,
          eventTitle: randomEvent.title,
          message: updates[Math.floor(Math.random() * updates.length)],
          timestamp: new Date(),
          type: "info",
        }

        setRecentUpdates((prev) => [update, ...prev.slice(0, 4)])
      }
    }, 45000) // Update every 45 seconds

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [events, subscribe, addNotification])

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "join":
        return <Users className="h-4 w-4 text-green-500" />
      case "weather":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "reminder":
        return <Calendar className="h-4 w-4 text-orange-500" />
      default:
        return <MapPin className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Live Event Updates</CardTitle>
          <Badge variant="default" className="bg-green-100 text-green-700">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {recentUpdates.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Waiting for live updates...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentUpdates.map((update) => (
              <div key={update.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                {getUpdateIcon(update.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{update.eventTitle}</p>
                  <p className="text-sm text-muted-foreground mt-1">{update.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDistanceToNow(update.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
