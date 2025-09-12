import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flame, Calendar, Target, TrendingUp } from "lucide-react"

const streakData = {
  current: 15,
  longest: 28,
  target: 30,
  weeklyGoal: 5,
  weeklyProgress: 3,
}

const recentActivity = [
  { day: "Mon", completed: true, points: 50 },
  { day: "Tue", completed: true, points: 75 },
  { day: "Wed", completed: true, points: 25 },
  { day: "Thu", completed: false, points: 0 },
  { day: "Fri", completed: false, points: 0 },
  { day: "Sat", completed: false, points: 0 },
  { day: "Sun", completed: false, points: 0 },
]

const streakMilestones = [
  { days: 7, reward: 50, achieved: true },
  { days: 14, reward: 100, achieved: true },
  { days: 21, reward: 150, achieved: false },
  { days: 30, reward: 300, achieved: false },
]

export function StreakTracker() {
  const weeklyProgressPercentage = (streakData.weeklyProgress / streakData.weeklyGoal) * 100
  const targetProgressPercentage = (streakData.current / streakData.target) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Activity Streak
        </CardTitle>
        <CardDescription>Maintain daily conservation activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak */}
        <div className="text-center p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg">
          <div className="text-3xl font-bold text-orange-500 mb-1">{streakData.current}</div>
          <div className="text-sm text-muted-foreground">Current Streak</div>
          <Badge variant="secondary" className="mt-2 bg-orange-100 text-orange-800">
            🔥 On Fire!
          </Badge>
        </div>

        {/* Weekly Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Weekly Goal</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {streakData.weeklyProgress}/{streakData.weeklyGoal} days
            </span>
          </div>
          <Progress value={weeklyProgressPercentage} className="h-2 mb-2" />
          <div className="text-xs text-muted-foreground">
            {streakData.weeklyGoal - streakData.weeklyProgress} more days to reach weekly goal
          </div>
        </div>

        {/* Daily Activity Grid */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            This Week
          </h4>
          <div className="grid grid-cols-7 gap-1">
            {recentActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    day.completed
                      ? "bg-green-500 text-white"
                      : index < 3
                        ? "bg-red-100 text-red-600"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {day.completed ? "✓" : index < 3 ? "✗" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Milestones */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Streak Rewards
          </h4>
          <div className="space-y-2">
            {streakMilestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded ${
                  milestone.achieved ? "bg-green-50 dark:bg-green-900/20" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      milestone.achieved ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.achieved ? "✓" : milestone.days}
                  </div>
                  <span className="text-sm">{milestone.days} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">+{milestone.reward}</span>
                  <Badge
                    variant={milestone.achieved ? "default" : "outline"}
                    className={milestone.achieved ? "bg-green-500" : ""}
                  >
                    {milestone.achieved ? "Earned" : "Locked"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{streakData.longest}</div>
            <div className="text-xs text-muted-foreground">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{streakData.target}</div>
            <div className="text-xs text-muted-foreground">Target Streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
