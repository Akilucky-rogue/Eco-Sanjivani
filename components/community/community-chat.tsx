"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, MessageCircle } from "lucide-react"
import { useState } from "react"

const chatMessages = [
  {
    id: 1,
    user: "Akshat Vora", // Updated name from Priya Sharma to Akshat Vora
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Ocean Guardian",
    message: "Great job everyone on today's cleanup! We made a real difference.",
    timestamp: "2 min ago",
    isOnline: true,
  },
  {
    id: 2,
    user: "Rajesh Kumar",
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Marine Expert",
    message: "The turtle rescue was amazing! Thanks for organizing this event.",
    timestamp: "5 min ago",
    isOnline: true,
  },
  {
    id: 3,
    user: "Anita Patel",
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Team Leader",
    message: "Next week's mangrove planting is confirmed for Saturday 7 AM",
    timestamp: "12 min ago",
    isOnline: false,
  },
  {
    id: 4,
    user: "Vikram Singh",
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Photographer",
    message: "I'll share the photos from today's event soon!",
    timestamp: "18 min ago",
    isOnline: true,
  },
]

export function CommunityChat() {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Community Chat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.user} />
                  <AvatarFallback>
                    {msg.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {msg.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{msg.user}</span>
                  <Badge variant="outline" className="text-xs">
                    {msg.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
