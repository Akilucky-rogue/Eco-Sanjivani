"use client"

import { useState } from "react"
import { Plus, Handshake, Target, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PartnerDirectory } from "@/components/partnerships/partner-directory"
import { PartnershipApplication } from "@/components/partnerships/partnership-application"

export default function PartnershipsPage() {
  const [showApplication, setShowApplication] = useState(false)

  const benefits = [
    {
      icon: Handshake,
      title: "Collaborative Impact",
      description: "Work together with like-minded organizations to amplify conservation efforts",
    },
    {
      icon: Target,
      title: "Shared Resources",
      description: "Access funding, expertise, and resources from our partner network",
    },
    {
      icon: Users,
      title: "Volunteer Network",
      description: "Connect with thousands of passionate volunteers across India",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Gain visibility and recognition for your conservation contributions",
    },
  ]

  if (showApplication) {
    return (
      <main className="container mx-auto px-4 py-8">
        <PartnershipApplication onClose={() => setShowApplication(false)} />
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Partnership Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join forces with NGOs, government agencies, and corporate partners to create lasting impact in marine
          conservation
        </p>
        <Button onClick={() => setShowApplication(true)} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Become a Partner
        </Button>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <Card key={index}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">{benefit.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Partner Directory */}
      <PartnerDirectory />
    </main>
  )
}
