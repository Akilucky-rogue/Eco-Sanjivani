import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Shield, Zap } from "lucide-react"

const achievements = [
  {
    id: 1,
    name: "Ocean Guardian",
    description: "Complete 10 beach cleanups",
    icon: Shield,
    earned: true,
    progress: 100,
    color: "text-yellow-500",
  },
  {
    id: 2,
    name: "Plastic Warrior",
    description: "Collect 100kg of plastic waste",
    icon: Trophy,
    earned: true,
    progress: 100,
    color: "text-blue-500",
  },
  {
    id: 3,
    name: "Team Builder",
    description: "Recruit 50 volunteers",
    icon: Star,
    earned: false,
    progress: 68,
    color: "text-green-500",
  },
  {
    id: 4,
    name: "Speed Cleaner",
    description: "Complete cleanup in under 2 hours",
    icon: Zap,
    earned: false,
    progress: 25,
    color: "text-purple-500",
  },
]

export function AchievementsBadges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Your conservation milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${achievement.earned ? "bg-primary/10" : "bg-muted"}`}>
                <achievement.icon
                  className={`h-4 w-4 ${achievement.earned ? achievement.color : "text-muted-foreground"}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p
                    className={`text-sm font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {achievement.name}
                  </p>
                  {achievement.earned && (
                    <Badge variant="secondary" className="text-xs">
                      Earned
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                <Progress value={achievement.progress} className="h-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
