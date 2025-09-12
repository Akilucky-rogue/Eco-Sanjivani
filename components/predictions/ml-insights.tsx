"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

const insights = [
  {
    type: "trend",
    title: "Increasing Plastic Debris",
    description: "ML models detect 23% increase in plastic waste at coastal areas",
    confidence: "High",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    type: "alert",
    title: "Storm Impact Prediction",
    description: "Upcoming weather patterns may increase debris by 40% next week",
    confidence: "Medium",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    type: "success",
    title: "Cleanup Efficiency Improved",
    description: "AI-optimized routes increased collection efficiency by 35%",
    confidence: "High",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

export function MLInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>AI-Generated Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
              <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence} Confidence
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
