import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trash2, Users, MapPin, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Waste Collected",
    value: "127 kg",
    change: "+12 kg this week",
    progress: 68,
    icon: Trash2,
    color: "text-chart-1",
  },
  {
    title: "Events Joined",
    value: "23",
    change: "+3 this month",
    progress: 85,
    icon: MapPin,
    color: "text-chart-2",
  },
  {
    title: "Team Members",
    value: "156",
    change: "+8 new members",
    progress: 45,
    icon: Users,
    color: "text-chart-3",
  },
  {
    title: "Impact Score",
    value: "2,847",
    change: "+156 points",
    progress: 92,
    icon: TrendingUp,
    color: "text-chart-4",
  },
]

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mb-2">{stat.change}</p>
            <Progress value={stat.progress} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
