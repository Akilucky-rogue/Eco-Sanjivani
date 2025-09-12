import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, Users, BarChart3, Map, Zap } from "lucide-react"

const features = [
  {
    icon: Trophy,
    title: "Gamified Rewards",
    description: "Earn points, badges, and climb leaderboards as you contribute to marine conservation efforts.",
    badge: "Popular",
  },
  {
    icon: Calendar,
    title: "Event Management",
    description:
      "Discover, join, and organize cleanup events across India's coastlines with our smart scheduling system.",
    badge: "New",
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Connect with like-minded environmentalists, form teams, and share your conservation journey.",
    badge: null,
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description: "Track your environmental impact with detailed analytics and predictive insights powered by ML.",
    badge: "AI-Powered",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description: "Visualize cleanup locations, pollution hotspots, and real-time environmental data.",
    badge: null,
  },
  {
    icon: Zap,
    title: "Smart Predictions",
    description: "ML algorithms predict optimal cleanup times, waste volumes, and resource allocation.",
    badge: "Coming Soon",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Powerful Features for Marine Conservation</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Our platform combines gamification, community building, and AI to maximize environmental impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  {feature.badge && (
                    <Badge
                      variant={feature.badge === "Popular" ? "default" : "outline"}
                      className={
                        feature.badge === "New"
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                          : ""
                      }
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
