import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Gift, Shirt, Coffee, Book, Smartphone, Leaf, Award } from "lucide-react"

const rewards = [
  {
    id: 1,
    name: "Eco-Sanjivani T-Shirt",
    description: "Premium organic cotton t-shirt with marine conservation design",
    points: 500,
    category: "Merchandise",
    icon: Shirt,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    stock: 25,
    popularity: "Popular",
  },
  {
    id: 2,
    name: "Reusable Water Bottle",
    description: "Stainless steel water bottle to reduce plastic waste",
    points: 300,
    category: "Eco-Friendly",
    icon: Coffee,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    stock: 50,
    popularity: "Trending",
  },
  {
    id: 3,
    name: "Marine Conservation Guide",
    description: "Comprehensive handbook on marine ecosystem protection",
    points: 200,
    category: "Educational",
    icon: Book,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    stock: 100,
    popularity: null,
  },
  {
    id: 4,
    name: "Bamboo Phone Case",
    description: "Sustainable bamboo phone case for eco-conscious users",
    points: 400,
    category: "Eco-Friendly",
    icon: Smartphone,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    stock: 15,
    popularity: "Limited",
  },
  {
    id: 5,
    name: "Tree Planting Certificate",
    description: "Plant a tree in your name at our conservation site",
    points: 250,
    category: "Impact",
    icon: Leaf,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    stock: 200,
    popularity: "Popular",
  },
  {
    id: 6,
    name: "VIP Event Access",
    description: "Exclusive access to premium conservation events",
    points: 800,
    category: "Experience",
    icon: Award,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    stock: 10,
    popularity: "Exclusive",
  },
]

const categories = ["All", "Merchandise", "Eco-Friendly", "Educational", "Impact", "Experience"]

const popularityColors = {
  Popular: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Trending: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Limited: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Exclusive: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export function RewardStore() {
  const availablePoints = 450 // User's available points

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Reward Store
        </CardTitle>
        <CardDescription>Redeem your points for eco-friendly rewards and experiences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm" className="text-xs bg-transparent">
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => {
            const canAfford = availablePoints >= reward.points
            return (
              <div
                key={reward.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  canAfford ? "bg-card border-border" : "bg-muted/30 border-muted-foreground/20"
                }`}
              >
                <div className="relative mb-3">
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                    <reward.icon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  {reward.popularity && (
                    <Badge
                      className={`absolute top-2 right-2 ${
                        popularityColors[reward.popularity as keyof typeof popularityColors]
                      }`}
                    >
                      {reward.popularity}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1">{reward.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{reward.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {reward.category}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{reward.stock} left</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Gift className="h-4 w-4 text-primary" />
                      <span className="font-bold text-primary">{reward.points} pts</span>
                    </div>
                    <Button
                      size="sm"
                      variant={canAfford ? "default" : "outline"}
                      disabled={!canAfford}
                      className="text-xs"
                    >
                      {canAfford ? "Redeem" : "Need More Points"}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Your Available Points</h3>
              <p className="text-sm text-muted-foreground">Earn more points by participating in events</p>
            </div>
            <div className="text-2xl font-bold text-primary">{availablePoints}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
