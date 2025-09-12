import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Crown, TrendingUp, Users } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Rajesh Kumar",
    points: 4250,
    level: 18,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Ocean Champion",
    change: "+2",
    icon: Crown,
    color: "text-yellow-500",
  },
  {
    rank: 2,
    name: "Anita Patel",
    points: 3890,
    level: 16,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Marine Expert",
    change: "0",
    icon: Trophy,
    color: "text-gray-400",
  },
  {
    rank: 3,
    name: "Akshat Vora", // Updated name from Priya Sharma to Akshat Vora
    points: 2847,
    level: 12,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Ocean Guardian",
    change: "+1",
    icon: Medal,
    color: "text-orange-500",
  },
  {
    rank: 4,
    name: "Vikram Singh",
    points: 2156,
    level: 10,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Plastic Warrior",
    change: "-1",
    icon: null,
    color: "",
  },
  {
    rank: 5,
    name: "Meera Joshi",
    points: 1923,
    level: 9,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Eco Defender",
    change: "+3",
    icon: null,
    color: "",
  },
]

const timeframes = ["This Week", "This Month", "All Time"]

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Leaderboard
        </CardTitle>
        <CardDescription>Top conservation contributors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timeframe Selector */}
        <div className="flex gap-1">
          {timeframes.map((timeframe, index) => (
            <Button key={timeframe} variant={index === 1 ? "default" : "outline"} size="sm" className="text-xs flex-1">
              {timeframe}
            </Button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                user.rank === 3 ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8">
                {user.icon ? (
                  <user.icon className={`h-5 w-5 ${user.color}`} />
                ) : (
                  <span className="text-sm font-bold text-muted-foreground">#{user.rank}</span>
                )}
              </div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  {user.change !== "0" && (
                    <div
                      className={`flex items-center text-xs ${
                        user.change.startsWith("+") ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {user.change}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Level {user.level} • {user.points.toLocaleString()} pts
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {user.badge}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Leaderboard */}
        <Button variant="outline" className="w-full bg-transparent">
          <Users className="h-4 w-4 mr-2" />
          View Full Leaderboard
        </Button>
      </CardContent>
    </Card>
  )
}
