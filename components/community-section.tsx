import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Akshat Vora", // Updated name from Priya Sharma to Akshat Vora
    role: "BTech Student & Marine Conservation Enthusiast", // Updated role to reflect student status
    location: "Mumbai",
    avatar: "/placeholder.svg?height=40&width=40",
    quote:
      "Eco-Sanjivani has revolutionized how we organize beach cleanups. The gamification keeps volunteers engaged long-term.",
    rating: 5,
    badge: "Ocean Guardian",
  },
  {
    name: "Rajesh Kumar",
    role: "Environmental Activist",
    location: "Chennai",
    avatar: "/placeholder.svg?height=40&width=40",
    quote: "The ML predictions help us target the most polluted areas. We've increased our cleanup efficiency by 40%.",
    rating: 5,
    badge: "Cleanup Champion",
  },
  {
    name: "Anita Patel",
    role: "Student Volunteer",
    location: "Goa",
    avatar: "/placeholder.svg?height=40&width=40",
    quote: "I love earning points and badges while making a real difference. It's like a game that actually matters!",
    rating: 5,
    badge: "Rising Star",
  },
]

export function CommunitySection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Join Our Growing Community</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Hear from volunteers, scientists, and activists who are making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-5 w-5 text-primary mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role} • {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.badge}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8">
            Join the Movement
          </Button>
        </div>
      </div>
    </section>
  )
}
