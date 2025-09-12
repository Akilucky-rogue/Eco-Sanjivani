import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ThumbsUp, Pin, Clock, Plus } from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "Best practices for organizing large beach cleanups?",
    author: {
      name: "Akshat Vora", // Updated name from Priya Sharma to Akshat Vora
      avatar: "/placeholder.svg?height=32&width=32",
      badge: "Ocean Guardian",
    },
    category: "Organization",
    replies: 23,
    likes: 45,
    lastActivity: "2 hours ago",
    isPinned: true,
    preview: "Looking for advice on managing 100+ volunteers for our upcoming Mumbai cleanup event...",
  },
  {
    id: 2,
    title: "Microplastic detection techniques for citizen scientists",
    author: {
      name: "Dr. Rajesh Kumar",
      avatar: "/placeholder.svg?height=32&width=32",
      badge: "Marine Expert",
    },
    category: "Research",
    replies: 18,
    likes: 67,
    lastActivity: "4 hours ago",
    isPinned: false,
    preview: "Sharing some simple methods to identify and document microplastics during cleanup activities...",
  },
  {
    id: 3,
    title: "Mangrove restoration success stories from Kerala",
    author: {
      name: "Anita Patel",
      avatar: "/placeholder.svg?height=32&width=32",
      badge: "Restoration Expert",
    },
    category: "Success Stories",
    replies: 31,
    likes: 89,
    lastActivity: "6 hours ago",
    isPinned: false,
    preview: "Our team has successfully restored 5 hectares of mangrove forest. Here's what we learned...",
  },
  {
    id: 4,
    title: "How to engage local schools in marine conservation?",
    author: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=32&width=32",
      badge: "Educator",
    },
    category: "Education",
    replies: 15,
    likes: 34,
    lastActivity: "1 day ago",
    isPinned: false,
    preview: "Looking for creative ways to get students excited about ocean protection and cleanup activities...",
  },
  {
    id: 5,
    title: "Plastic-free alternatives for event organization",
    author: {
      name: "Meera Joshi",
      avatar: "/placeholder.svg?height=32&width=32",
      badge: "Sustainability Advocate",
    },
    category: "Sustainability",
    replies: 12,
    likes: 28,
    lastActivity: "2 days ago",
    isPinned: false,
    preview: "Sharing eco-friendly alternatives for organizing zero-waste conservation events...",
  },
]

const categories = ["All", "Organization", "Research", "Education", "Success Stories", "Sustainability"]

const categoryColors = {
  Organization: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Research: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Education: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Success Stories": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Sustainability: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
}

export function DiscussionForum() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Discussion Forum
            </CardTitle>
            <CardDescription>Share knowledge and connect with fellow conservationists</CardDescription>
          </div>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Discussion
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm" className="text-xs bg-transparent">
              {category}
            </Button>
          ))}
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                  <AvatarFallback className="text-xs">
                    {discussion.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {discussion.isPinned && <Pin className="h-4 w-4 text-primary" />}
                      <h3 className="font-semibold text-foreground text-sm line-clamp-1">{discussion.title}</h3>
                    </div>
                    <Badge className={categoryColors[discussion.category as keyof typeof categoryColors]}>
                      {discussion.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{discussion.preview}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{discussion.author.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {discussion.author.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {discussion.lastActivity}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {discussion.replies}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {discussion.likes}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="bg-transparent">
            View All Discussions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
