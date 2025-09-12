"use client"

import { useState } from "react"
import { Satellite, MapPin, Loader2, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/lib/hooks/use-geolocation"

interface HabitatHealthData {
  location: { lat: number; lng: number }
  ecosystem: string
  healthScore: number // 0-100
  vegetationIndex: number
  waterQuality: number
  soilHealth: number
  biodiversityIndex: number
  threats: string[]
  recommendations: string[]
  trend: "Improving" | "Stable" | "Declining"
  dataSource: string
}

export function HabitatHealthAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [healthData, setHealthData] = useState<HabitatHealthData | null>(null)
  const { location, getCurrentLocation, locationName, isUsingMockData, setMockLocation } = useGeolocation()

  const analyzeHabitat = async () => {
    setIsAnalyzing(true)
    try {
      await getCurrentLocation()
      if (location) {
        await new Promise((resolve) => setTimeout(resolve, 3000))

        const mockData: HabitatHealthData = {
          location,
          ecosystem: "Mixed Forest",
          healthScore: 72,
          vegetationIndex: 0.68,
          waterQuality: 78,
          soilHealth: 85,
          biodiversityIndex: 0.74,
          threats: ["Deforestation", "Urban encroachment", "Invasive species"],
          recommendations: [
            "Establish buffer zones around core habitat",
            "Implement invasive species removal program",
            "Monitor water quality monthly",
            "Create wildlife corridors to connect fragmented areas",
          ],
          trend: "Stable",
          dataSource: "Satellite + Ground Sensors",
        }
        setHealthData(mockData)
      }
    } catch (error) {
      console.error("Habitat analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    if (score >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "Declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Satellite className="h-5 w-5" />
          Habitat Health Analyzer
        </CardTitle>
        <CardDescription>
          Assess ecosystem health using satellite imagery, vegetation indices, and environmental sensors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={analyzeHabitat} disabled={isAnalyzing || !location} className="flex-1">
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Habitat...
              </>
            ) : (
              <>
                <Satellite className="h-4 w-4 mr-2" />
                Analyze Current Location
              </>
            )}
          </Button>
          {location ? (
            <div className="flex flex-col items-end gap-1">
              <Badge variant={isUsingMockData ? "secondary" : "default"} className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {isUsingMockData ? "Mock" : "GPS"}
              </Badge>
              <div className="text-xs text-muted-foreground">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={getCurrentLocation}>
                Get GPS Location
              </Button>
              <Button variant="outline" onClick={() => setMockLocation()}>
                Use Mock Data
              </Button>
            </div>
          )}
        </div>

        {location && locationName && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Current Location</span>
              </div>
              <Badge variant={isUsingMockData ? "secondary" : "default"}>
                {isUsingMockData ? "Mock Data" : "Real-time GPS"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{locationName}</p>
            <p className="text-xs text-muted-foreground">
              Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          </div>
        )}

        {healthData && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Habitat Assessment</h3>
                <div className="flex items-center gap-2">
                  <Badge className={getHealthColor(healthData.healthScore)}>
                    {healthData.healthScore >= 80
                      ? "Excellent"
                      : healthData.healthScore >= 60
                        ? "Good"
                        : healthData.healthScore >= 40
                          ? "Fair"
                          : "Poor"}
                  </Badge>
                  {getTrendIcon(healthData.trend)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Health Score</span>
                  <span>{healthData.healthScore}/100</span>
                </div>
                <Progress value={healthData.healthScore} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Vegetation Index</span>
                    <span>{healthData.vegetationIndex.toFixed(2)}</span>
                  </div>
                  <Progress value={healthData.vegetationIndex * 100} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Water Quality</span>
                    <span>{healthData.waterQuality}%</span>
                  </div>
                  <Progress value={healthData.waterQuality} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Soil Health</span>
                    <span>{healthData.soilHealth}%</span>
                  </div>
                  <Progress value={healthData.soilHealth} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Biodiversity Index</span>
                    <span>{healthData.biodiversityIndex.toFixed(2)}</span>
                  </div>
                  <Progress value={healthData.biodiversityIndex * 100} className="h-1" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Identified Threats</h4>
              <div className="flex flex-wrap gap-2">
                {healthData.threats.map((threat, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {threat}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">AI Recommendations</h4>
              <div className="space-y-2">
                {healthData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Ecosystem: {healthData.ecosystem}</span>
              <span>Source: {healthData.dataSource}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
