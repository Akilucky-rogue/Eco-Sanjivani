import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, MapPin, Calendar } from "lucide-react"

const stats = [
  {
    label: "Active This Week",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-green-500",
  },
  {
    label: "New Members",
    value: "156",
    change: "+8%",
    icon: TrendingUp,
    color: "text-blue-500",
  },
  {
    label: "Cities Covered",
    value: "47",
    change: "+3",
    icon: MapPin,
    color: "text-purple-500",
  },
  {
    label: "Events This Month",
    value: "89",
    change: "+15%",
    icon: Calendar,
    color: "text-orange-500",
  },
]

const topCities = [
  { name: "Mumbai", members: 8234, growth: 15 },
  { name: "Chennai", members: 5678, growth: 12 },
  { name: "Goa", members: 4321, growth: 18 },
  { name: "Kochi", members: 3456, growth: 8 },
  { name: "Visakhapatnam", members: 2890, growth: 22 },
]

export function CommunityStats() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Stats</CardTitle>
          <CardDescription>Real-time community metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${stat.color}`}>{stat.change}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Cities</CardTitle>
          <CardDescription>Most active conservation communities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCities.map((city, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-foreground">{city.name}</div>
                  <div className="text-sm text-muted-foreground">{city.members.toLocaleString()} members</div>
                </div>
                <Progress value={city.growth * 5} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">+{city.growth}% growth</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
