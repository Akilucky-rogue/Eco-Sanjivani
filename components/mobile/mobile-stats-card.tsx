"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface MobileStatsCardProps {
  title: string
  value: string
  change?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
}

export function MobileStatsCard({ title, value, change, icon: Icon, trend = "neutral" }: MobileStatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="p-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change && <p className={cn("text-xs mt-1", getTrendColor())}>{change}</p>}
          </div>
          <div className="ml-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
