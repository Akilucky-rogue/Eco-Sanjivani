import { ImpactMetrics } from "@/components/analytics/impact-metrics"
import { ImpactCharts } from "@/components/analytics/impact-charts"

// Sample data - in real app this would come from database/API
const impactData = {
  totalWasteCollected: 8500,
  totalVolunteers: 342,
  eventsCompleted: 28,
  areasRestored: 45000,
  marineLifeProtected: 1250,
  carbonOffset: 17000,
  monthlyGrowth: {
    waste: 24,
    volunteers: 18,
    events: 15,
  },
}

export default function AnalyticsPage() {
  return (
    <div className="pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Impact Analytics</h1>
          <p className="text-muted-foreground">Track our collective environmental impact and conservation efforts</p>
        </div>

        <ImpactMetrics data={impactData} />
        <ImpactCharts />
      </div>
    </div>
  )
}
