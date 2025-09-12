"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useCurrentUser } from "@/lib/hooks/use-database"
import { AuthModal } from "./auth-modal"
import { User, Settings, Trophy, LogOut } from "lucide-react"

export function UserMenu() {
  const { currentUser, logout } = useCurrentUser()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  if (!currentUser) {
    return (
      <>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setAuthMode("login")
              setShowAuthModal(true)
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              setAuthMode("signup")
              setShowAuthModal(true)
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Join Now
          </Button>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultMode={authMode} />
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{currentUser.name}</p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                Level {currentUser.level}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{currentUser.points} points</span>
              <span>{currentUser.eventsAttended} events</span>
              <span>{currentUser.wasteCollected}kg collected</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trophy className="mr-2 h-4 w-4" />
          <span>Achievements</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
