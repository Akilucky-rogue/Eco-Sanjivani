"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Trash2 } from "lucide-react"

export function WastePredictionCard() {
  const prediction = {
    nextEvent: "Mumbai Beach Cleanup",
    predictedWaste: "245 kg",
    confidence: 87,
    factors: ["High tide at 6:30 AM", "Weekend tourist activity", "Recent storm debris"],
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Waste Collection Prediction</CardTitle>
        <Trash2 className="h-4 w-4 text-chart-1" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-chart-1">{prediction.predictedWaste}</div>
        <p className="text-xs text-muted-foreground mb-3">Expected for {prediction.nextEvent}</p>

        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium">Confidence: {prediction.confidence}%</span>
        </div>
        <Progress value={prediction.confidence} className="h-2 mb-3" />

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Key Factors:</p>
          {prediction.factors.map((factor, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              • {factor}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
