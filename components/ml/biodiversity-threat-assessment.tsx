"use client"

import { useState } from "react"
import { Shield, AlertTriangle, Loader2, MapPin, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/lib/hooks/use-geolocation"

interface ThreatAssessment {
  location: { lat: number; lng: number }
  riskLevel: "Low" | "Moderate" | "High" | "Critical"
  riskScore: number
  threats: {
    name: string
    severity: number
    probability: number
    timeframe: string
  }[]
  vulnerableSpecies: {
    name: string
    populationTrend: "Increasing" | "Stable" | "Declining"
    threatLevel: number
  }[]
  recommendations: string[]
}

export function BiodiversityThreatAssessment() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [assessment, setAssessment] = useState<ThreatAssessment | null>(null)
  const { location, getCurrentLocation } = useGeolocation()

  const analyzeThreat = async () => {
    setIsAnalyzing(true)
    try {
      await getCurrentLocation()
      if (location) {
        await new Promise((resolve) => setTimeout(resolve, 4000))

        const mockAssessment: ThreatAssessment = {
          location,
          riskLevel: "Moderate",
          riskScore: 65,
          threats: [
            { name: "Habitat Fragmentation", severity: 75, probability: 85, timeframe: "5-10 years" },
            { name: "Climate Change", severity: 80, probability: 90, timeframe: "10-20 years" },
            { name: "Invasive Species", severity: 60, probability: 70, timeframe: "2-5 years" },
            { name: "Pollution", severity: 55, probability: 65, timeframe: "Ongoing" },
          ],
          vulnerableSpecies: [
            { name: "Bengal Tiger", populationTrend: "Stable", threatLevel: 70 },
            { name: "Indian Elephant", populationTrend: "Declining", threatLevel: 85 },
            { name: "Great Indian Bustard", populationTrend: "Declining", threatLevel: 95 },
          ],
          recommendations: [
            "Establish wildlife corridors to reduce fragmentation",
            "Implement climate adaptation strategies",
            "Monitor and control invasive species populations",
            "Strengthen anti-poaching measures",
            "Engage local communities in conservation efforts",
          ],
        }
        setAssessment(mockAssessment)
      }
    } catch (error) {
      console.error("Threat assessment failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-500"
      case "Moderate":
        return "bg-yellow-500"
      case "High":
        return "bg-orange-500"
      case "Critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityColor = (severity: number) => {
    if (severity >= 80) return "bg-red-500"
    if (severity >= 60) return "bg-orange-500"
    if (severity >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Biodiversity Threat Assessment
        </CardTitle>
        <CardDescription>Analyze threats to local biodiversity using AI models and conservation data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={analyzeThreat} disabled={isAnalyzing || !location} className="flex-1">
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Assessing Threats...
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Assess Biodiversity Threats
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

        {assessment && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Threat Assessment</h3>
                <Badge className={getRiskColor(assessment.riskLevel)}>{assessment.riskLevel} Risk</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Risk Score</span>
                  <span>{assessment.riskScore}/100</span>
                </div>
                <Progress value={assessment.riskScore} className="h-2" />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Primary Threats</h4>
              <div className="space-y-2">
                {assessment.threats.map((threat, index) => (
                  <div key={index} className="p-3 border rounded space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{threat.name}</span>
                      <Badge className={getSeverityColor(threat.severity)} variant="secondary">
                        {threat.severity}% severity
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <span>Probability: {threat.probability}%</span>
                      <span>Timeframe: {threat.timeframe}</span>
                    </div>
                    <Progress value={threat.severity} className="h-1" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Vulnerable Species</h4>
              <div className="space-y-2">
                {assessment.vulnerableSpecies.map((species, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1">
                      <span className="text-sm font-medium">{species.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {species.populationTrend === "Declining" && <TrendingDown className="h-3 w-3 mr-1" />}
                          {species.populationTrend}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(species.threatLevel)} variant="secondary">
                      {species.threatLevel}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Conservation Recommendations</h4>
              <div className="space-y-2">
                {assessment.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
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
