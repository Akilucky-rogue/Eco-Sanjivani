import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Camera, MapPin } from "lucide-react"
import Image from "next/image"

const photos = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=300",
    title: "Versova Beach After Cleanup",
    user: {
      name: "Akshat Vora", // Updated name from Priya Sharma to Akshat Vora
      avatar: "/placeholder.svg?height=32&width=32",
    },
    location: "Versova Beach, Mumbai",
    likes: 45,
    comments: 12,
    timestamp: "2 hours ago",
    tags: ["BeforeAfter", "Success"],
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=300",
    title: "Sea Turtle Rescue",
    user: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    location: "Juhu Beach, Mumbai",
    likes: 89,
    comments: 23,
    timestamp: "5 hours ago",
    tags: ["Wildlife", "Rescue"],
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300",
    title: "Mangrove Plantation Drive",
    user: {
      name: "Anita Patel",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    location: "Mahim Creek, Mumbai",
    likes: 67,
    comments: 18,
    timestamp: "1 day ago",
    tags: ["Restoration", "Teamwork"],
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300",
    title: "Plastic Collection Results",
    user: {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    location: "Marina Beach, Chennai",
    likes: 34,
    comments: 8,
    timestamp: "2 days ago",
    tags: ["Impact", "Data"],
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300",
    title: "Coral Restoration Progress",
    user: {
      name: "Meera Joshi",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    location: "Malvan, Maharashtra",
    likes: 78,
    comments: 15,
    timestamp: "3 days ago",
    tags: ["Coral", "Progress"],
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300",
    title: "Youth Volunteers Training",
    user: {
      name: "Arjun Nair",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    location: "Kochi, Kerala",
    likes: 56,
    comments: 11,
    timestamp: "4 days ago",
    tags: ["Education", "Youth"],
  },
]

export function PhotoGallery() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Community Photos
            </CardTitle>
            <CardDescription>Latest conservation moments captured by our community</CardDescription>
          </div>
          <Button size="sm" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Upload Photo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={photo.image || "/placeholder.svg"}
                  alt={photo.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    {photo.location}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <h3 className="font-medium text-foreground text-sm line-clamp-1">{photo.title}</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={photo.user.avatar || "/placeholder.svg"} alt={photo.user.name} />
                      <AvatarFallback className="text-xs">
                        {photo.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{photo.user.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{photo.timestamp}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {photo.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {photo.comments}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="bg-transparent">
            View All Photos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
