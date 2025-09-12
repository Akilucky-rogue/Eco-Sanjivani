import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Shield, Star, Zap, Crown, Award, Users, Calendar, Leaf } from "lucide-react"

const achievements = [
  {
    id: 1,
    name: "Ocean Guardian",
    description: "Complete 10 beach cleanup events",
    icon: Shield,
    earned: true,
    progress: 100,
    maxProgress: 10,
    rarity: "Epic",
    points: 500,
    earnedDate: "2024-11-15",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    name: "Plastic Warrior",
    description: "Collect 100kg of plastic waste",
    icon: Trophy,
    earned: true,
    progress: 127,
    maxProgress: 100,
    rarity: "Legendary",
    points: 750,
    earnedDate: "2024-11-28",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: 3,
    name: "Community Builder",
    description: "Recruit 50 new volunteers",
    icon: Users,
    earned: false,
    progress: 34,
    maxProgress: 50,
    rarity: "Epic",
    points: 400,
    earnedDate: null,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: 4,
    name: "Speed Cleaner",
    description: "Complete cleanup in under 2 hours",
    icon: Zap,
    earned: false,
    progress: 1,
    maxProgress: 1,
    rarity: "Rare",
    points: 200,
    earnedDate: null,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: 5,
    name: "Streak Master",
    description: "Maintain 30-day activity streak",
    icon: Calendar,
    earned: false,
    progress: 15,
    maxProgress: 30,
    rarity: "Epic",
    points: 600,
    earnedDate: null,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    id: 6,
    name: "Marine Educator",
    description: "Complete 20 educational workshops",
    icon: Star,
    earned: false,
    progress: 7,
    maxProgress: 20,
    rarity: "Rare",
    points: 300,
    earnedDate: null,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    id: 7,
    name: "Conservation Champion",
    description: "Reach Level 25",
    icon: Crown,
    earned: false,
    progress: 12,
    maxProgress: 25,
    rarity: "Legendary",
    points: 1000,
    earnedDate: null,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: 8,
    name: "Mangrove Protector",
    description: "Plant 100 mangrove saplings",
    icon: Leaf,
    earned: false,
    progress: 23,
    maxProgress: 100,
    rarity: "Epic",
    points: 450,
    earnedDate: null,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
]

const rarityColors = {
  Common: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  Rare: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Epic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Legendary: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
}

export function AchievementGallery() {
  const earnedAchievements = achievements.filter((a) => a.earned)
  const totalAchievements = achievements.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievement Gallery
            </CardTitle>
            <CardDescription>
              {earnedAchievements.length} of {totalAchievements} achievements unlocked
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{earnedAchievements.length}</div>
            <div className="text-xs text-muted-foreground">Earned</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                achievement.earned ? "bg-card border-border" : "bg-muted/30 border-muted-foreground/20 opacity-75"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${achievement.earned ? achievement.bgColor : "bg-muted"}`}>
                  <achievement.icon
                    className={`h-6 w-6 ${achievement.earned ? achievement.color : "text-muted-foreground"}`}
                  />
                </div>
                <Badge className={rarityColors[achievement.rarity as keyof typeof rarityColors]}>
                  {achievement.rarity}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3
                  className={`font-semibold text-sm ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {achievement.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>

                {achievement.earned ? (
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Earned
                    </Badge>
                    <span className="font-medium text-primary">+{achievement.points} pts</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1.5" />
                    <div className="text-xs text-muted-foreground">+{achievement.points} pts when earned</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
