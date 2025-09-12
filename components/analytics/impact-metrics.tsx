"use client"

import { TrendingUp, Users, MapPin, Calendar, Trash2, Fish, TreePine, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ImpactData {
  totalWasteCollected: number // in kg
  totalVolunteers: number
  eventsCompleted: number
  areasRestored: number // in sq meters
  marineLifeProtected: number
  carbonOffset: number // in kg CO2
  monthlyGrowth: {
    waste: number
    volunteers: number
    events: number
  }
}

interface ImpactMetricsProps {
  data: ImpactData
  period?: string
}

export function ImpactMetrics({ data, period = "This Month" }: ImpactMetricsProps) {
  const metrics = [
    {
      title: "Waste Collected",
      value: `${data.totalWasteCollected.toLocaleString()} kg`,
      icon: Trash2,
      color: "text-red-600",
      bgColor: "bg-red-50",
      growth: data.monthlyGrowth.waste,
      target: 10000,
      current: data.totalWasteCollected,
    },
    {
      title: "Active Volunteers",
      value: data.totalVolunteers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      growth: data.monthlyGrowth.volunteers,
      target: 1000,
      current: data.totalVolunteers,
    },
    {
      title: "Events Completed",
      value: data.eventsCompleted.toString(),
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      growth: data.monthlyGrowth.events,
      target: 50,
      current: data.eventsCompleted,
    },
    {
      title: "Areas Restored",
      value: `${(data.areasRestored / 1000).toFixed(1)}k m²`,
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      growth: 15,
      target: 100000,
      current: data.areasRestored,
    },
    {
      title: "Marine Life Protected",
      value: data.marineLifeProtected.toLocaleString(),
      icon: Fish,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      growth: 22,
      target: 5000,
      current: data.marineLifeProtected,
    },
    {
      title: "Carbon Offset",
      value: `${data.carbonOffset.toLocaleString()} kg CO₂`,
      icon: TreePine,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      growth: 18,
      target: 50000,
      current: data.carbonOffset,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Environmental Impact</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Award className="h-4 w-4" />
          {period}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const progressPercentage = Math.min((metric.current / metric.target) * 100, 100)

          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    {metric.growth > 0 && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingUp className="h-3 w-3" />+{metric.growth}%
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress to target</span>
                      <span>{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">Target: {metric.target.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
