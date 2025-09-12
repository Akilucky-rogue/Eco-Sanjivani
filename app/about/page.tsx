import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Waves, Github, Linkedin, Mail, GraduationCap, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

const creators = [
  {
    name: "Akshat Vora",
    age: 21,
    role: "Co-Founder & Lead Developer",
    education: "BTech Student at NMIMS Mukesh Patel School of Technology Management & Engineering",
    location: "Mumbai, Maharashtra",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "Passionate about marine conservation and sustainable technology. Leading the development of AI-powered solutions for ocean cleanup and environmental monitoring.",
    skills: ["Full-Stack Development", "Machine Learning", "Environmental Science", "Project Management"],
    achievements: ["Ocean Guardian", "Tech Innovator", "Community Leader"],
    social: {
      github: "https://github.com/akshatvora",
      linkedin: "https://linkedin.com/in/akshatvora",
      email: "akshat.vora@nmims.edu",
    },
  },
  {
    name: "Jiya Shah",
    age: 21,
    role: "Co-Founder & Research Lead",
    education: "BTech Student at NMIMS Mukesh Patel School of Technology Management & Engineering",
    location: "Mumbai, Maharashtra",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "Marine biology enthusiast with expertise in data analysis and environmental research. Focuses on developing predictive models for marine ecosystem health.",
    skills: ["Data Science", "Marine Biology", "Research", "Environmental Analysis"],
    achievements: ["Marine Expert", "Research Pioneer", "Data Scientist"],
    social: {
      github: "https://github.com/jiyashah",
      linkedin: "https://linkedin.com/in/jiyashah",
      email: "jiya.shah@nmims.edu",
    },
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Waves className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-foreground">About Eco-Sanjivani</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Born from a passion for marine conservation and powered by cutting-edge technology, Eco-Sanjivani is
            revolutionizing how we protect India's coastal ecosystems.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              To create a sustainable future for India's marine ecosystems through technology-driven conservation
              efforts and community engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Ocean Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Safeguarding marine life and coastal ecosystems through organized cleanup drives and conservation
                  initiatives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Education & Awareness</h3>
                <p className="text-sm text-muted-foreground">
                  Educating communities about marine conservation and empowering them to take action.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Technology Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Leveraging AI and ML to predict pollution patterns and optimize conservation efforts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet the Creators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Two passionate BTech students from NMIMS who turned their concern for marine life into a technology-driven
              conservation platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {creators.map((creator, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                      <AvatarFallback className="text-lg">
                        {creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{creator.name}</h3>
                    <p className="text-primary font-medium mb-2">{creator.role}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      Age {creator.age}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {creator.location}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Education
                      </h4>
                      <p className="text-sm text-muted-foreground">{creator.education}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">About</h4>
                      <p className="text-sm text-muted-foreground text-balance">{creator.bio}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Achievements</h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.achievements.map((achievement, achIndex) => (
                          <Badge key={achIndex} variant="outline" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center gap-3 pt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={creator.social.github} target="_blank">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={creator.social.linkedin} target="_blank">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`mailto:${creator.social.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Since launching Eco-Sanjivani, we've made significant strides in marine conservation across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Cleanup Events Organized</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Volunteers Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25 Tons</div>
              <div className="text-sm text-muted-foreground">Waste Collected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Beaches Protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Have questions about our platform or want to collaborate on marine conservation initiatives? We'd love to
            hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="mailto:contact@ecosanjivani.org">
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/community">Join Our Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
