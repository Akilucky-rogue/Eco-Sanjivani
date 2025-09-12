import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Zap, Crown } from "lucide-react"

export function RewardsHeader() {
  const currentLevel = 12
  const currentXP = 2847
  const nextLevelXP = 3000
  const progressPercentage = (currentXP / nextLevelXP) * 100

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Rewards & Achievements</h1>
        <p className="text-lg text-muted-foreground">
          Track your conservation impact and earn rewards for protecting marine ecosystems
        </p>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-foreground">Level {currentLevel}</h2>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    Ocean Guardian
                  </Badge>
                </div>
                <p className="text-muted-foreground">Akshat Vora</p>
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
                <span className="font-medium">
                  {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {(nextLevelXP - currentXP).toLocaleString()} XP to next level
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-chart-1/20 rounded-full mb-2">
                  <Trophy className="h-6 w-6 text-chart-1" />
                </div>
                <div className="text-lg font-bold text-foreground">23</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-chart-2/20 rounded-full mb-2">
                  <Star className="h-6 w-6 text-chart-2" />
                </div>
                <div className="text-lg font-bold text-foreground">2,847</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-chart-3/20 rounded-full mb-2">
                  <Zap className="h-6 w-6 text-chart-3" />
                </div>
                <div className="text-lg font-bold text-foreground">15</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
