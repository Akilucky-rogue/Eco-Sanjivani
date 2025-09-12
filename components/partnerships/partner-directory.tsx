"use client"

import { useState } from "react"
import { Building2, Mail, Phone, MapPin, Award, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Partner {
  id: string
  name: string
  type: "ngo" | "government" | "corporate" | "research"
  description: string
  logo?: string
  website?: string
  email?: string
  phone?: string
  location: string
  focusAreas: string[]
  activeProjects: number
  impactMetrics: {
    eventsSupported: number
    volunteersEngaged: number
    fundingProvided?: number
  }
  verified: boolean
  joinedDate: string
}

const samplePartners: Partner[] = [
  {
    id: "1",
    name: "Marine Conservation Society India",
    type: "ngo",
    description: "Leading NGO focused on marine ecosystem protection and coastal community development across India.",
    website: "https://marineconservation.in",
    email: "contact@marineconservation.in",
    phone: "+91-22-2345-6789",
    location: "Mumbai, Maharashtra",
    focusAreas: ["Marine Protection", "Coastal Restoration", "Community Education"],
    activeProjects: 12,
    impactMetrics: {
      eventsSupported: 45,
      volunteersEngaged: 1200,
      fundingProvided: 2500000,
    },
    verified: true,
    joinedDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Ministry of Environment & Climate Change",
    type: "government",
    description: "Government agency overseeing environmental policies and marine conservation initiatives.",
    website: "https://moef.gov.in",
    email: "marine@moef.gov.in",
    location: "New Delhi",
    focusAreas: ["Policy Development", "Regulatory Oversight", "Funding Programs"],
    activeProjects: 8,
    impactMetrics: {
      eventsSupported: 25,
      volunteersEngaged: 800,
      fundingProvided: 15000000,
    },
    verified: true,
    joinedDate: "2023-03-10",
  },
  {
    id: "3",
    name: "Tata Sustainability Initiative",
    type: "corporate",
    description: "Corporate sustainability program focused on environmental conservation and community development.",
    website: "https://tata.com/sustainability",
    email: "sustainability@tata.com",
    phone: "+91-22-6665-8282",
    location: "Mumbai, Maharashtra",
    focusAreas: ["Corporate CSR", "Technology Solutions", "Employee Volunteering"],
    activeProjects: 6,
    impactMetrics: {
      eventsSupported: 18,
      volunteersEngaged: 450,
      fundingProvided: 5000000,
    },
    verified: true,
    joinedDate: "2023-02-20",
  },
  {
    id: "4",
    name: "Indian Institute of Marine Sciences",
    type: "research",
    description: "Premier research institution conducting marine ecosystem studies and conservation research.",
    website: "https://iims.ac.in",
    email: "research@iims.ac.in",
    location: "Goa",
    focusAreas: ["Marine Research", "Data Analysis", "Scientific Studies"],
    activeProjects: 15,
    impactMetrics: {
      eventsSupported: 30,
      volunteersEngaged: 200,
    },
    verified: true,
    joinedDate: "2023-04-05",
  },
]

export function PartnerDirectory() {
  const [partners] = useState<Partner[]>(samplePartners)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.focusAreas.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = typeFilter === "all" || partner.type === typeFilter
    const matchesLocation = locationFilter === "all" || partner.location.includes(locationFilter)

    return matchesSearch && matchesType && matchesLocation
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ngo":
        return "bg-green-100 text-green-800"
      case "government":
        return "bg-blue-100 text-blue-800"
      case "corporate":
        return "bg-purple-100 text-purple-800"
      case "research":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ngo":
        return "NGO"
      case "government":
        return "Government"
      case "corporate":
        return "Corporate"
      case "research":
        return "Research"
      default:
        return type
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Partner Directory</h2>
        <p className="text-muted-foreground">Connect with organizations working towards marine conservation</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search partners, focus areas, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="ngo">NGOs</SelectItem>
            <SelectItem value="government">Government</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
            <SelectItem value="research">Research</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Delhi">Delhi</SelectItem>
            <SelectItem value="Goa">Goa</SelectItem>
            <SelectItem value="Chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredPartners.length} of {partners.length} partners
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getTypeColor(partner.type)}>{getTypeLabel(partner.type)}</Badge>
                      {partner.verified && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <Award className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{partner.description}</p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {partner.location}
                </div>
                {partner.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {partner.email}
                  </div>
                )}
                {partner.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {partner.phone}
                  </div>
                )}
              </div>

              {/* Focus Areas */}
              <div>
                <h4 className="text-sm font-medium mb-2">Focus Areas</h4>
                <div className="flex flex-wrap gap-1">
                  {partner.focusAreas.map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <h4 className="text-sm font-medium mb-2">Impact</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Events Supported</span>
                    <p className="font-medium">{partner.impactMetrics.eventsSupported}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Volunteers Engaged</span>
                    <p className="font-medium">{partner.impactMetrics.volunteersEngaged.toLocaleString()}</p>
                  </div>
                  {partner.impactMetrics.fundingProvided && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Funding Provided</span>
                      <p className="font-medium">{formatCurrency(partner.impactMetrics.fundingProvided)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                {partner.website && (
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No partners found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
