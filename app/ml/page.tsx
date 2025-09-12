import { SpeciesIdentifier } from "@/components/ml/species-identifier"
import { PollutionAnalyzer } from "@/components/ml/pollution-analyzer"
import { Navigation } from "@/components/navigation"

export default function MLPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-balance">AI-Powered Marine Conservation</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Leverage machine learning to identify marine species, analyze pollution levels, and predict environmental
              impact for smarter conservation efforts.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
            <div className="flex justify-center">
              <SpeciesIdentifier />
            </div>
            <div className="flex justify-center">
              <PollutionAnalyzer />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
