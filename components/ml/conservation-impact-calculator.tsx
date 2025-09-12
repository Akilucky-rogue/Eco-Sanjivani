"use client"

import { useState } from "react"
import { Calculator, Target, Loader2, Users, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConservationImpact {
  carbonSequestration: number // tons CO2/year
  biodiversityImprovement: number // percentage
  habitatRestored: number // hectares
  speciesProtected: number
  communityBenefit: number // people impacted
  costEffectiveness: number // impact per rupee
  timeToImpact: number // months
}

export function ConservationImpactCalculator() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [impact, setImpact] = useState<ConservationImpact | null>(null)
  const [formData, setFormData] = useState({
    projectType: "",
    budget: "",
    duration: "",
    area: "",
    participants: "",
  })

  const calculateImpact = async () => {
    if (!formData.projectType || !formData.budget) return

    setIsCalculating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const budget = Number.parseFloat(formData.budget)
      const area = Number.parseFloat(formData.area) || 10
      const participants = Number.parseFloat(formData.participants) || 50

      const mockImpact: ConservationImpact = {
        carbonSequestration: Math.round(area * 2.5 + budget * 0.001),
        biodiversityImprovement: Math.min(85, Math.round(budget * 0.01 + area * 2)),
        habitatRestored: area,
        speciesProtected: Math.round(area * 0.8 + participants * 0.2),
        communityBenefit: Math.round(participants * 3.5),
        costEffectiveness: Math.round((area * 100) / budget),
        timeToImpact: formData.projectType === "reforestation" ? 24 : formData.projectType === "wetland" ? 18 : 12,
      }
      setImpact(mockImpact)
    } catch (error) {
      console.error("Impact calculation failed:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Conservation Impact Calculator
        </CardTitle>
        <CardDescription>Calculate the predicted impact of conservation projects using AI models</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="project-type">Project Type</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reforestation">Reforestation</SelectItem>
                <SelectItem value="wetland">Wetland Restoration</SelectItem>
                <SelectItem value="wildlife">Wildlife Protection</SelectItem>
                <SelectItem value="cleanup">Habitat Cleanup</SelectItem>
                <SelectItem value="corridor">Wildlife Corridor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (₹)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="100000"
              value={formData.budget}
              onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area (hectares)</Label>
            <Input
              id="area"
              type="number"
              placeholder="10"
              value={formData.area}
              onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Participants</Label>
            <Input
              id="participants"
              type="number"
              placeholder="50"
              value={formData.participants}
              onChange={(e) => setFormData((prev) => ({ ...prev, participants: e.target.value }))}
            />
          </div>
        </div>

        <Button
          onClick={calculateImpact}
          disabled={isCalculating || !formData.projectType || !formData.budget}
          className="w-full"
        >
          {isCalculating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Calculating Impact...
            </>
          ) : (
            <>
              <Target className="h-4 w-4 mr-2" />
              Calculate Conservation Impact
            </>
          )}
        </Button>

        {impact && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Predicted Impact</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <TreePine className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Carbon Sequestration</span>
                </div>
                <div className="text-2xl font-bold text-green-700">{impact.carbonSequestration} tons CO₂/year</div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Community Benefit</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">{impact.communityBenefit} people</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Biodiversity Improvement:</span>
                <Badge variant="secondary">{impact.biodiversityImprovement}%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Habitat Restored:</span>
                <Badge variant="secondary">{impact.habitatRestored} ha</Badge>
              </div>
              <div className="flex justify-between">
                <span>Species Protected:</span>
                <Badge variant="secondary">{impact.speciesProtected}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Time to Impact:</span>
                <Badge variant="secondary">{impact.timeToImpact} months</Badge>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Cost Effectiveness</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">{impact.costEffectiveness} impact units per ₹1000 invested</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
