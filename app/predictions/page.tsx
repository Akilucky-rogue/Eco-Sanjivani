import { Navigation } from "@/components/navigation"
import { PredictionsHeader } from "@/components/predictions/predictions-header"
import { WastePredictionCard } from "@/components/predictions/waste-prediction-card"
import { WeatherImpactCard } from "@/components/predictions/weather-impact-card"
import { OptimalTimingCard } from "@/components/predictions/optimal-timing-card"
import { LocationRecommendations } from "@/components/predictions/location-recommendations"
import { PredictionCharts } from "@/components/predictions/prediction-charts"
import { MLInsights } from "@/components/predictions/ml-insights"

export default function PredictionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PredictionsHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main predictions area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <WastePredictionCard />
              <WeatherImpactCard />
            </div>
            <PredictionCharts />
            <MLInsights />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <OptimalTimingCard />
            <LocationRecommendations />
          </div>
        </div>
      </main>
    </div>
  )
}
