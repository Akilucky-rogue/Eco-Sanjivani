import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Users, Award, Navigation } from "lucide-react"
import Image from "next/image"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  duration: string
  location: string
  organizer: string
  participants: number
  maxParticipants: number
  difficulty: string
  type: string
  image: string
  tags: string[]
  rewards: number
  distance: string
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const participationPercentage = (event.participants / event.maxParticipants) * 100
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={difficultyColor[event.difficulty as keyof typeof difficultyColor]}>
            {event.difficulty}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur">
            <Navigation className="h-3 w-3 mr-1" />
            {event.distance}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">{event.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{event.organizer}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{event.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(event.date).toLocaleDateString("en-IN", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
            <Clock className="h-4 w-4 ml-4 mr-2" />
            {event.time} ({event.duration})
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Participants */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              {event.participants}/{event.maxParticipants} participants
            </div>
            <div className="flex items-center text-muted-foreground">
              <Award className="h-4 w-4 mr-1" />
              {event.rewards} pts
            </div>
          </div>
          <Progress value={participationPercentage} className="h-2" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {event.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full" size="sm">
          Join Event
        </Button>
      </CardFooter>
    </Card>
  )
}
