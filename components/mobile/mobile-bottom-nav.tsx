"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Home, Calendar, Brain, Users, Trophy } from "lucide-react"
import { useCurrentUser } from "@/lib/hooks/use-database"

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/ml", label: "AI Tools", icon: Brain },
  { href: "/community", label: "Community", icon: Users },
  { href: "/rewards", label: "Rewards", icon: Trophy },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { currentUser } = useCurrentUser()

  if (!currentUser) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <nav className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
