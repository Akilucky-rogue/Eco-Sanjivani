import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, Calendar, Target } from "lucide-react"

const pointCategories = [
  {
    category: "Event Participation",
    points: 1250,
    maxPoints: 2000,
    icon: Calendar,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    category: "Waste Collection",
    points: 890,
    maxPoints: 1500,
    icon: Target,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    category: "Community Building",
    points: 567,
    maxPoints: 1000,
    icon: TrendingUp,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    category: "Educational Activities",
    points: 140,
    maxPoints: 500,
    icon: Coins,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

const recentEarnings = [
  { activity: "Versova Beach Cleanup", points: 150, time: "2 hours ago", type: "event" },
  { activity: "Recruited 3 new volunteers", points: 75, time: "1 day ago", type: "community" },
  { activity: "Collected 15kg plastic waste", points: 45, time: "2 days ago", type: "collection" },
  { activity: "Completed Marine Life Quiz", points: 25, time: "3 days ago", type: "education" },
  { activity: "7-day activity streak", points: 100, time: "1 week ago", type: "streak" },
]

export function PointsOverview() {
  const totalPoints = pointCategories.reduce((sum, cat) => sum + cat.points, 0)
  const availablePoints = 450 // Points available for redemption

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Points Overview
          </CardTitle>
          <CardDescription>Track your conservation points across different activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{totalPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points Earned</div>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-1">{availablePoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Available for Rewards</div>
            </div>
          </div>

          <div className="space-y-4">
            {pointCategories.map((category, index) => {
              const percentage = (category.points / category.maxPoints) * 100
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${category.bgColor}`}>
                        <category.icon className={`h-4 w-4 ${category.color}`} />
                      </div>
                      <span className="font-medium text-sm">{category.category}</span>
                    </div>
                    <div className="text-sm font-medium">
                      {category.points} / {category.maxPoints}
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
          <CardDescription>Your latest point-earning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <div className="flex-1">
                  <div className="font-medium text-sm text-foreground">{earning.activity}</div>
                  <div className="text-xs text-muted-foreground">{earning.time}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      earning.type === "event"
                        ? "border-chart-1 text-chart-1"
                        : earning.type === "community"
                          ? "border-chart-2 text-chart-2"
                          : earning.type === "collection"
                            ? "border-chart-3 text-chart-3"
                            : earning.type === "education"
                              ? "border-chart-4 text-chart-4"
                              : "border-chart-5 text-chart-5"
                    }
                  >
                    {earning.type}
                  </Badge>
                  <div className="text-sm font-bold text-primary">+{earning.points}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
