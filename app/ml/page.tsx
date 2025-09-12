import { Navigation } from "@/components/navigation"
import { SpeciesIdentifier } from "@/components/ml/species-identifier"
import { PollutionAnalyzer } from "@/components/ml/pollution-analyzer"
import { HabitatHealthAnalyzer } from "@/components/ml/habitat-health-analyzer"
import { BiodiversityThreatAssessment } from "@/components/ml/biodiversity-threat-assessment"
import { ClimateImpactPredictor } from "@/components/ml/climate-impact-predictor"
import { ConservationImpactCalculator } from "@/components/ml/conservation-impact-calculator"

export default function MLPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-balance">AI-Powered Ecosystem Conservation</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Leverage advanced machine learning to protect India's diverse ecosystems - from the Himalayas to coastal
              regions, forests to wetlands. Our AI tools help identify species, assess environmental health, and predict
              conservation impact.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
            <div className="flex justify-center">
              <SpeciesIdentifier />
            </div>
            <div className="flex justify-center">
              <PollutionAnalyzer />
            </div>
            <div className="flex justify-center">
              <HabitatHealthAnalyzer />
            </div>
            <div className="flex justify-center">
              <BiodiversityThreatAssessment />
            </div>
            <div className="flex justify-center">
              <ClimateImpactPredictor />
            </div>
            <div className="flex justify-center">
              <ConservationImpactCalculator />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
