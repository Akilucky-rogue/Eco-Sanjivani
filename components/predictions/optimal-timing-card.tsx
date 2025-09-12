"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"

export function OptimalTimingCard() {
  const recommendations = [
    {
      day: "Saturday",
      time: "6:00 AM - 9:00 AM",
      reason: "Low tide + Cool temperature",
      score: 95,
    },
    {
      day: "Sunday",
      time: "7:00 AM - 10:00 AM",
      reason: "High volunteer availability",
      score: 88,
    },
    {
      day: "Friday",
      time: "5:30 AM - 8:30 AM",
      reason: "Minimal tourist activity",
      score: 82,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>Optimal Cleanup Times</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium text-sm">{rec.day}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {rec.score}% optimal
                </Badge>
              </div>
              <p className="text-xs font-medium text-primary">{rec.time}</p>
              <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
