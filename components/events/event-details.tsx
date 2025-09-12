import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Share2,
  Heart,
  MessageCircle,
  Navigation,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"

interface EventDetailsProps {
  eventId: string
}

// Mock event data - in real app, this would be fetched based on eventId
const eventData = {
  id: 1,
  title: "Versova Beach Cleanup Drive",
  description:
    "Join us for a massive beach cleanup at Versova Beach. We'll provide all equipment including gloves, bags, and tools. This is a great opportunity to make a direct impact on marine conservation while meeting like-minded individuals. We'll also have refreshments and a brief educational session about plastic pollution.",
  longDescription:
    "Versova Beach has been one of Mumbai's most polluted beaches, but through community efforts, we've seen remarkable improvements. This cleanup drive is part of our monthly initiative to maintain the progress and continue removing plastic waste that threatens marine life. We'll be working in teams to systematically clean different sections of the beach, documenting our findings for research purposes.",
  date: "2024-12-15",
  time: "06:00",
  duration: "4 hours",
  location: "Versova Beach, Mumbai",
  coordinates: "19.1351° N, 72.8223° E",
  organizer: {
    name: "Mumbai Coastal Guardians",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "contact@mumbaicoastal.org",
    phone: "+91 98765 43210",
    description:
      "A community organization dedicated to protecting Mumbai's coastline through regular cleanup drives and awareness programs.",
  },
  participants: 45,
  maxParticipants: 60,
  difficulty: "Easy",
  type: "Beach Cleanup",
  image: "/placeholder.svg?height=400&width=800",
  tags: ["Beach Cleanup", "Plastic Removal", "Community", "Education"],
  rewards: 150,
  distance: "2.3 km",
  requirements: [
    "Comfortable walking shoes",
    "Sun hat and sunscreen",
    "Water bottle",
    "Enthusiasm to make a difference!",
  ],
  provided: [
    "Gloves and cleanup tools",
    "Waste collection bags",
    "Refreshments and snacks",
    "Transportation from nearest station",
  ],
  schedule: [
    { time: "06:00", activity: "Registration and briefing" },
    { time: "06:30", activity: "Team formation and area assignment" },
    { time: "07:00", activity: "Cleanup activity begins" },
    { time: "09:30", activity: "Break and refreshments" },
    { time: "10:00", activity: "Continue cleanup and data collection" },
    { time: "10:30", activity: "Wrap-up and group photo" },
  ],
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const participationPercentage = (eventData.participants / eventData.maxParticipants) * 100
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative">
        <Image
          src={eventData.image || "/placeholder.svg"}
          alt={eventData.title}
          width={800}
          height={400}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4">
          <Badge className={difficultyColor[eventData.difficulty as keyof typeof difficultyColor]}>
            {eventData.difficulty}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Event Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{eventData.title}</h1>
            <p className="text-lg text-muted-foreground">{eventData.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {new Date(eventData.date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-muted-foreground">Date</div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-3 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {eventData.time} ({eventData.duration})
                    </div>
                    <div className="text-muted-foreground">Time & Duration</div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{eventData.location}</div>
                    <div className="text-muted-foreground">{eventData.coordinates}</div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <Navigation className="h-4 w-4 mr-3 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{eventData.distance} away</div>
                    <div className="text-muted-foreground">Distance</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{eventData.longDescription}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventData.schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-sm font-medium text-primary min-w-[60px]">{item.time}</div>
                    <div className="text-sm text-muted-foreground">{item.activity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What to Bring</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {eventData.requirements.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What We Provide</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {eventData.provided.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Join This Event</span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="h-4 w-4 mr-1" />
                  {eventData.rewards} pts
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-medium">
                    {eventData.participants}/{eventData.maxParticipants}
                  </span>
                </div>
                <Progress value={participationPercentage} className="h-2" />
              </div>

              <div className="flex flex-wrap gap-2">
                {eventData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button className="w-full" size="lg">
                <Users className="h-4 w-4 mr-2" />
                Join Event
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask Question
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Card */}
          <Card>
            <CardHeader>
              <CardTitle>Organizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={eventData.organizer.avatar || "/placeholder.svg"} alt={eventData.organizer.name} />
                  <AvatarFallback>
                    {eventData.organizer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{eventData.organizer.name}</div>
                  <div className="text-sm text-muted-foreground">Event Organizer</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{eventData.organizer.description}</p>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{eventData.organizer.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{eventData.organizer.phone}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Contact Organizer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
