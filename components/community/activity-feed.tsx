import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MapPin, Award, Users, Trash2, Camera } from "lucide-react"
import Image from "next/image"

const activities = [
  {
    id: 1,
    type: "event_completion",
    user: {
      name: "Akshat Vora", // Updated name from Priya Sharma to Akshat Vora
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Ocean Guardian",
    },
    content: {
      title: "Completed Versova Beach Cleanup",
      description: "Amazing turnout today! We collected 127kg of plastic waste and had 45 volunteers join us.",
      image: "/placeholder.svg?height=300&width=500",
      stats: { waste: "127kg", volunteers: 45, duration: "4 hours" },
    },
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    type: "achievement",
    user: {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Marine Expert",
    },
    content: {
      title: "Earned 'Plastic Warrior' Achievement",
      description: "Just hit 200kg of plastic waste collected! Every piece matters in protecting our oceans.",
      achievement: {
        name: "Plastic Warrior",
        icon: "🏆",
        points: 500,
      },
    },
    timestamp: "5 hours ago",
    likes: 18,
    comments: 12,
    shares: 5,
  },
  {
    id: 3,
    type: "team_formation",
    user: {
      name: "Anita Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Team Leader",
    },
    content: {
      title: "Started 'Goa Coastal Guardians' Team",
      description:
        "Looking for passionate volunteers to join our weekly beach cleanups in Goa. Let's make a difference together!",
      team: {
        name: "Goa Coastal Guardians",
        members: 12,
        location: "Goa",
      },
    },
    timestamp: "1 day ago",
    likes: 31,
    comments: 15,
    shares: 8,
  },
  {
    id: 4,
    type: "photo_share",
    user: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Photographer",
    },
    content: {
      title: "Marine Life Spotted During Cleanup",
      description: "Found this beautiful sea turtle during our morning cleanup at Juhu Beach. Nature is healing! 🐢",
      image: "/placeholder.svg?height=300&width=500",
      location: "Juhu Beach, Mumbai",
    },
    timestamp: "2 days ago",
    likes: 67,
    comments: 23,
    shares: 12,
  },
]

const activityIcons = {
  event_completion: Trash2,
  achievement: Award,
  team_formation: Users,
  photo_share: Camera,
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Activity</CardTitle>
        <CardDescription>Latest updates from ocean guardians around India</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => {
            const ActivityIcon = activityIcons[activity.type as keyof typeof activityIcons]
            return (
              <div key={activity.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                {/* User Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback>
                      {activity.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{activity.user.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {activity.user.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ActivityIcon className="h-3 w-3" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{activity.content.title}</h3>
                    <p className="text-muted-foreground text-sm">{activity.content.description}</p>
                  </div>

                  {/* Event Stats */}
                  {activity.content.stats && (
                    <div className="flex gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <div className="font-bold text-foreground">{activity.content.stats.waste}</div>
                        <div className="text-xs text-muted-foreground">Waste Collected</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-foreground">{activity.content.stats.volunteers}</div>
                        <div className="text-xs text-muted-foreground">Volunteers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-foreground">{activity.content.stats.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                    </div>
                  )}

                  {/* Achievement */}
                  {activity.content.achievement && (
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                      <div className="text-2xl">{activity.content.achievement.icon}</div>
                      <div>
                        <div className="font-semibold text-foreground">{activity.content.achievement.name}</div>
                        <div className="text-sm text-muted-foreground">
                          +{activity.content.achievement.points} points earned
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Team Info */}
                  {activity.content.team && (
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Users className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="font-semibold text-foreground">{activity.content.team.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.content.team.members} members • {activity.content.team.location}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  {activity.content.image && (
                    <div className="relative">
                      <Image
                        src={activity.content.image || "/placeholder.svg"}
                        alt="Activity image"
                        width={500}
                        height={300}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      {activity.content.location && (
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                            <MapPin className="h-3 w-3 mr-1" />
                            {activity.content.location}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Engagement Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      {activity.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      {activity.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                      <Share2 className="h-4 w-4" />
                      {activity.shares}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="bg-transparent">
            Load More Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
