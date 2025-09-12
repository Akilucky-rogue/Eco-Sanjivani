"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import type { CleanupEvent } from "@/lib/database/schema"
import { format } from "date-fns"

interface MobileEventCardProps {
  event: CleanupEvent
  onJoin?: (eventId: string) => void
}

export function MobileEventCard({ event, onJoin }: MobileEventCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "hard":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight flex-1">{event.title}</h3>
            <Badge variant="secondary" className={getDifficultyColor(event.difficulty)}>
              {event.difficulty}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span className="truncate">{format(event.date, "MMM dd, HH:mm")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{event.duration}h</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{event.location.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>
                {event.currentParticipants}/{event.maxParticipants}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button size="sm" className="flex-1 h-8 text-xs" onClick={() => onJoin?.(event.id)}>
              Join Event
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
