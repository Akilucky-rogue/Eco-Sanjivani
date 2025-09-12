import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageCircle, Camera, Plus } from "lucide-react"

export function CommunityHeader() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Community Hub</h1>
        <p className="text-lg text-muted-foreground">
          Connect with fellow ocean guardians and share your conservation journey
        </p>
      </div>

      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-2">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-foreground">25,847</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-2">
                  <MessageCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-foreground">1,234</div>
                <div className="text-sm text-muted-foreground">Discussions</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-2">
                  <Camera className="h-8 w-8 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-foreground">5,678</div>
                <div className="text-sm text-muted-foreground">Photos Shared</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Share Update
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Camera className="h-4 w-4" />
                Upload Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
