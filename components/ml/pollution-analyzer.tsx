"use client"

import { useState } from "react"
import { AlertTriangle, TrendingUp, TrendingDown, Minus, MapPin, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PollutionPredictor, type PollutionData } from "@/lib/ml/pollution-predictor"
import { useGeolocation } from "@/lib/hooks/use-geolocation"

export function PollutionAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [pollutionData, setPollutionData] = useState<PollutionData | null>(null)
  const { location, getCurrentLocation } = useGeolocation()

  const predictor = new PollutionPredictor()

  const analyzePollution = async () => {
    setIsAnalyzing(true)
    try {
      await getCurrentLocation()
      if (location) {
        const data = await predictor.analyzePollutionLevel(location)
        setPollutionData(data)
      }
    } catch (error) {
      console.error("Pollution analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getPollutionColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-500"
      case "Moderate":
        return "bg-yellow-500"
      case "High":
        return "bg-orange-500"
      case "Severe":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "Worsening":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Pollution Level Analyzer
        </CardTitle>
        <CardDescription>Analyze current pollution levels and get AI-powered recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={analyzePollution} disabled={isAnalyzing || !location} className="flex-1">
            {isAnalyzing ? (
              "Analyzing..."
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Analyze Current Location
              </>
            )}
          </Button>
          {location ? (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Ready
            </Badge>
          ) : (
            <Button variant="outline" onClick={getCurrentLocation}>
              Get Location
            </Button>
          )}
        </div>

        {pollutionData && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Pollution Assessment</h3>
                <Badge className={getPollutionColor(pollutionData.pollutionLevel)}>
                  {pollutionData.pollutionLevel}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Pollution Score</span>
                  <span>{pollutionData.pollutionScore}/100</span>
                </div>
                <Progress value={pollutionData.pollutionScore} className="h-2" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Trend:</span>
                {getTrendIcon(pollutionData.predictedTrend)}
                <span className="text-sm">{pollutionData.predictedTrend}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Primary Pollutants</h4>
              <div className="flex flex-wrap gap-2">
                {pollutionData.primaryPollutants.map((pollutant, index) => (
                  <Badge key={index} variant="outline">
                    {pollutant}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">AI Recommendations</h4>
              <div className="space-y-2">
                {pollutionData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Data Source: {pollutionData.dataSource}</span>
              <span>Last Updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
