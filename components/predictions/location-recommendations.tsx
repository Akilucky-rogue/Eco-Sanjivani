"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp } from "lucide-react"

export function LocationRecommendations() {
  const locations = [
    {
      name: "Versova Beach",
      priority: "High",
      predictedWaste: "450 kg",
      factors: ["Tourist season", "Recent storms"],
      urgency: 95,
    },
    {
      name: "Juhu Beach",
      priority: "Medium",
      predictedWaste: "320 kg",
      factors: ["Weekend activity", "Food vendors"],
      urgency: 78,
    },
    {
      name: "Marine Drive",
      priority: "Low",
      predictedWaste: "180 kg",
      factors: ["Regular maintenance", "Low debris"],
      urgency: 45,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>Priority Locations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {locations.map((location, index) => (
            <div key={index} className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{location.name}</h4>
                <Badge className={getPriorityColor(location.priority)}>{location.priority}</Badge>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-3 w-3 text-chart-1" />
                <span className="text-xs font-medium">{location.predictedWaste}</span>
              </div>

              <div className="space-y-1">
                {location.factors.map((factor, idx) => (
                  <p key={idx} className="text-xs text-muted-foreground">
                    • {factor}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
