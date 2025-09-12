"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Users } from "lucide-react"
import { useLiveChat } from "@/lib/hooks/use-realtime"
import { useCurrentUser } from "@/lib/hooks/use-database"
import { formatDistanceToNow } from "date-fns"

interface LiveChatProps {
  roomId: string
  title?: string
}

export function LiveChat({ roomId, title = "Community Chat" }: LiveChatProps) {
  const [message, setMessage] = useState("")
  const { messages, isConnected, sendMessage } = useLiveChat(roomId)
  const { currentUser } = useCurrentUser()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !currentUser) return

    sendMessage(message.trim(), currentUser.id, currentUser.name)
    setMessage("")
  }

  if (!currentUser) {
    return <div className="p-4 text-center text-muted-foreground">Please sign in to join the chat</div>
  }

  return (
    <div className="flex flex-col h-96 border rounded-lg bg-card">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
            {isConnected ? "Live" : "Offline"}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Online</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {msg.userName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{msg.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm mt-1 break-words">{msg.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-3 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            maxLength={500}
          />
          <Button type="submit" size="sm" disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
