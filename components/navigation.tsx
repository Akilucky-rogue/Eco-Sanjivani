"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Waves } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserMenu } from "@/components/auth/user-menu"
import { NotificationCenter } from "@/components/realtime/notification-center"
import { LanguageSelector } from "@/components/i18n/language-selector"
import { useI18n } from "@/lib/i18n/context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useI18n()

  const navItems = [
    { href: "/dashboard", label: t.nav.dashboard },
    { href: "/events", label: t.nav.events },
    { href: "/predictions", label: "Predictions" },
    { href: "/community", label: t.nav.community },
    { href: "/rewards", label: "Rewards" },
    { href: "/analytics", label: "Analytics" },
    { href: "/ml", label: "AI Tools" },
    { href: "/partnerships", label: "Partners" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">Eco-Sanjivani</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <LanguageSelector />
              <NotificationCenter />
              <UserMenu />
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground hover:text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2 flex items-center gap-2">
              <LanguageSelector />
              <NotificationCenter />
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
