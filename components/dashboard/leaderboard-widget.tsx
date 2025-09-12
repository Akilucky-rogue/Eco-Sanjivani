import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

const leaderboard = [
  {
    rank: 1,
    name: "Rajesh Kumar",
    points: 4250,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Champion",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    rank: 2,
    name: "Anita Patel",
    points: 3890,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Expert",
    icon: Medal,
    color: "text-gray-400",
  },
  {
    rank: 3,
    name: "Akshat Vora", // Updated name from Priya Sharma to Akshat Vora
    points: 2847,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Guardian",
    icon: Award,
    color: "text-orange-500",
  },
  {
    rank: 4,
    name: "Vikram Singh",
    points: 2156,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Warrior",
    icon: null,
    color: "",
  },
  {
    rank: 5,
    name: "Meera Joshi",
    points: 1923,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Defender",
    icon: null,
    color: "",
  },
]

export function LeaderboardWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>Top contributors this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((user) => (
            <div key={user.rank} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6">
                {user.icon ? (
                  <user.icon className={`h-4 w-4 ${user.color}`} />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">#{user.rank}</span>
                )}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">{user.points.toLocaleString()} pts</p>
                  <Badge variant="outline" className="text-xs">
                    {user.badge}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
