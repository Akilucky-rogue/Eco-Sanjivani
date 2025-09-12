"use client"

import { useState } from "react"
import { CloudRain, Thermometer, Loader2, MapPin, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/lib/hooks/use-geolocation"

interface ClimateImpact {
  location: { lat: number; lng: number }
  temperatureChange: number // degrees C over next 30 years
  precipitationChange: number // percentage change
  extremeWeatherRisk: number // 0-100
  seaLevelRise: number // cm over next 50 years
  ecosystemVulnerability: number // 0-100
  adaptationStrategies: string[]
  timeframe: string
}

export function ClimateImpactPredictor() {
  const [isPredicting, setIsPredicting] = useState(false)
  const [impact, setImpact] = useState<ClimateImpact | null>(null)
  const { location, getCurrentLocation } = useGeolocation()

  const predictImpact = async () => {
    setIsPredicting(true)
    try {
      await getCurrentLocation()
      if (location) {
        await new Promise((resolve) => setTimeout(resolve, 3500))

        const mockImpact: ClimateImpact = {
          location,
          temperatureChange: 2.3,
          precipitationChange: -15,
          extremeWeatherRisk: 75,
          seaLevelRise: 23,
          ecosystemVulnerability: 68,
          adaptationStrategies: [
            "Develop drought-resistant crop varieties",
            "Implement water conservation systems",
            "Create climate refugia for vulnerable species",
            "Build resilient infrastructure",
            "Establish early warning systems for extreme weather",
          ],
          timeframe: "2024-2054",
        }
        setImpact(mockImpact)
      }
    } catch (error) {
      console.error("Climate prediction failed:", error)
    } finally {
      setIsPredicting(false)
    }
  }

  const getVulnerabilityColor = (score: number) => {
    if (score >= 80) return "bg-red-500"
    if (score >= 60) return "bg-orange-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudRain className="h-5 w-5" />
          Climate Impact Predictor
        </CardTitle>
        <CardDescription>
          Predict climate change impacts on local ecosystems using advanced climate models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={predictImpact} disabled={isPredicting || !location} className="flex-1">
            {isPredicting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Predicting Impact...
              </>
            ) : (
              <>
                <Thermometer className="h-4 w-4 mr-2" />
                Predict Climate Impact
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

        {impact && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Climate Projections ({impact.timeframe})</h3>
                <Badge className={getVulnerabilityColor(impact.ecosystemVulnerability)}>
                  {impact.ecosystemVulnerability >= 80
                    ? "Very High"
                    : impact.ecosystemVulnerability >= 60
                      ? "High"
                      : impact.ecosystemVulnerability >= 40
                        ? "Moderate"
                        : "Low"}{" "}
                  Vulnerability
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Temperature Change</span>
                  </div>
                  <div className="text-2xl font-bold text-red-500">+{impact.temperatureChange}°C</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Precipitation Change</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-500">
                    {impact.precipitationChange > 0 ? "+" : ""}
                    {impact.precipitationChange}%
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Extreme Weather Risk</span>
                    <span>{impact.extremeWeatherRisk}%</span>
                  </div>
                  <Progress value={impact.extremeWeatherRisk} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ecosystem Vulnerability</span>
                    <span>{impact.ecosystemVulnerability}%</span>
                  </div>
                  <Progress value={impact.ecosystemVulnerability} className="h-2" />
                </div>

                {impact.seaLevelRise > 0 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Sea Level Rise Projection</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">Expected rise: {impact.seaLevelRise} cm by 2074</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Adaptation Strategies</h4>
              <div className="space-y-2">
                {impact.adaptationStrategies.map((strategy, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{strategy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
