import { Card, CardContent } from "@/components/ui/card"
import { Users, Trash2, MapPin, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "25,000+",
    label: "Active Volunteers",
    description: "Passionate individuals making a difference",
  },
  {
    icon: Trash2,
    value: "150 Tons",
    label: "Waste Collected",
    description: "Waste removed from all ecosystems across India",
  },
  {
    icon: MapPin,
    value: "500+",
    label: "Conservation Events",
    description: "Organized across forests, wetlands, and urban areas",
  },
  {
    icon: Award,
    value: "1M+",
    label: "Points Earned",
    description: "Through gamified conservation actions",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Our Collective Impact</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Together, we're creating measurable change for India's diverse ecosystems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
