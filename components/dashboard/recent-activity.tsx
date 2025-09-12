import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Award } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "event",
    title: "Beach Cleanup at Juhu Beach",
    description: "Collected 15kg of plastic waste",
    time: "2 hours ago",
    icon: MapPin,
    badge: "Completed",
    badgeVariant: "default" as const,
  },
  {
    id: 2,
    type: "achievement",
    title: "Earned 'Plastic Warrior' Badge",
    description: "Collected over 100kg of plastic waste",
    time: "1 day ago",
    icon: Award,
    badge: "Achievement",
    badgeVariant: "secondary" as const,
  },
  {
    id: 3,
    type: "team",
    title: "Joined Mumbai Coastal Guardians",
    description: "New team member welcomed",
    time: "3 days ago",
    icon: Users,
    badge: "Team",
    badgeVariant: "outline" as const,
  },
  {
    id: 4,
    type: "event",
    title: "Organized Mangrove Restoration",
    description: "Planted 50 mangrove saplings",
    time: "1 week ago",
    icon: Calendar,
    badge: "Organized",
    badgeVariant: "secondary" as const,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest contributions to marine conservation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 bg-primary/10 rounded-full">
                <activity.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                  <Badge variant={activity.badgeVariant} className="text-xs">
                    {activity.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
