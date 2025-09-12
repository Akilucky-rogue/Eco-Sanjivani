"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Wind } from "lucide-react"

export function WeatherImpactCard() {
  const weatherImpact = {
    condition: "Optimal",
    temperature: "26°C",
    windSpeed: "12 km/h",
    visibility: "Excellent",
    recommendation: "Perfect conditions for cleanup activities",
  }

  const getWeatherIcon = () => {
    return <Sun className="h-4 w-4 text-yellow-500" />
  }

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "optimal":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Weather Impact Analysis</CardTitle>
        {getWeatherIcon()}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-3">
          <Badge className={getConditionColor(weatherImpact.condition)}>{weatherImpact.condition}</Badge>
          <span className="text-lg font-semibold">{weatherImpact.temperature}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center space-x-1">
            <Wind className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">{weatherImpact.windSpeed}</span>
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground">Visibility: </span>
            {weatherImpact.visibility}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{weatherImpact.recommendation}</p>
      </CardContent>
    </Card>
  )
}
