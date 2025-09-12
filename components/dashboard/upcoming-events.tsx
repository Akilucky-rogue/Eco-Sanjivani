import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Versova Beach Cleanup",
    date: "Dec 15, 2024",
    time: "6:00 AM",
    location: "Versova Beach, Mumbai",
    participants: 45,
    maxParticipants: 60,
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Mangrove Restoration Drive",
    date: "Dec 18, 2024",
    time: "7:00 AM",
    location: "Mahim Creek, Mumbai",
    participants: 23,
    maxParticipants: 30,
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Plastic Awareness Workshop",
    date: "Dec 22, 2024",
    time: "10:00 AM",
    location: "Community Center, Bandra",
    participants: 12,
    maxParticipants: 25,
    difficulty: "Easy",
  },
]

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Join conservation activities near you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-3 border border-border rounded-lg space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                <Badge variant={event.difficulty === "Easy" ? "secondary" : "outline"} className="text-xs">
                  {event.difficulty}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {event.date}
                  <Clock className="h-3 w-3 ml-2 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {event.location}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  {event.participants}/{event.maxParticipants} participants
                </div>
              </div>

              <Button size="sm" className="w-full text-xs">
                Join Event
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
