import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Calendar, Plus } from "lucide-react"

const teams = [
  {
    id: 1,
    name: "Mumbai Coastal Guardians",
    description: "Protecting Mumbai's coastline through regular cleanup drives",
    members: 234,
    location: "Mumbai",
    founded: "2023",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Beach Cleanup",
    isJoined: true,
  },
  {
    id: 2,
    name: "Goa Ocean Warriors",
    description: "Preserving Goa's marine biodiversity and beaches",
    members: 156,
    location: "Goa",
    founded: "2024",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Conservation",
    isJoined: false,
  },
  {
    id: 3,
    name: "Chennai Marine Protectors",
    description: "Educational workshops and cleanup activities in Chennai",
    members: 189,
    location: "Chennai",
    founded: "2023",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Education",
    isJoined: false,
  },
  {
    id: 4,
    name: "Kochi Mangrove Restorers",
    description: "Specialized in mangrove restoration and protection",
    members: 98,
    location: "Kochi",
    founded: "2024",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Restoration",
    isJoined: false,
  },
]

const categoryColors = {
  "Beach Cleanup": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Conservation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Education: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Restoration: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
}

export function TeamDirectory() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Teams Near You</CardTitle>
            <CardDescription>Join local conservation teams</CardDescription>
          </div>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Team
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={team.avatar || "/placeholder.svg"} alt={team.name} />
                    <AvatarFallback>
                      {team.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{team.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{team.description}</p>
                  </div>
                </div>
                <Badge className={categoryColors[team.category as keyof typeof categoryColors]}>{team.category}</Badge>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {team.members} members
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {team.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Since {team.founded}
                </div>
              </div>

              <Button
                size="sm"
                variant={team.isJoined ? "outline" : "default"}
                className={`w-full ${team.isJoined ? "bg-transparent" : ""}`}
              >
                {team.isJoined ? "Joined" : "Join Team"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="outline" className="w-full bg-transparent">
            View All Teams
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
