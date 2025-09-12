"use client"

import type React from "react"

import { useState } from "react"
import { Building2, Upload, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ApplicationData {
  organizationName: string
  organizationType: string
  contactPerson: string
  email: string
  phone: string
  website: string
  location: string
  description: string
  focusAreas: string[]
  previousExperience: string
  proposedContribution: string
  expectedSupport: string
  documents: File[]
}

export function PartnershipApplication({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<ApplicationData>({
    organizationName: "",
    organizationType: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    description: "",
    focusAreas: [],
    previousExperience: "",
    proposedContribution: "",
    expectedSupport: "",
    documents: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const focusAreaOptions = [
    "Marine Protection",
    "Coastal Restoration",
    "Community Education",
    "Research & Development",
    "Policy Advocacy",
    "Funding & Grants",
    "Technology Solutions",
    "Volunteer Management",
    "Corporate CSR",
    "Government Relations",
  ]

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: checked ? [...prev.focusAreas, area] : prev.focusAreas.filter((a) => a !== area),
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }))
  }

  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(
      "Partnership application submitted successfully! We will review your application and get back to you within 5-7 business days.",
    )
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Partnership Application
        </CardTitle>
        <p className="text-muted-foreground">Join our network of partners working towards marine conservation</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Organization Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orgName">Organization Name *</Label>
                <Input
                  id="orgName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, organizationName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="orgType">Organization Type *</Label>
                <Select
                  value={formData.organizationType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, organizationType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                    <SelectItem value="corporate">Corporate/Business</SelectItem>
                    <SelectItem value="research">Research Institution</SelectItem>
                    <SelectItem value="educational">Educational Institution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Organization Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your organization's mission, activities, and goals..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourorganization.com"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactPerson: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Areas of Interest</h3>
            <p className="text-sm text-muted-foreground">
              Select the areas where your organization can contribute or collaborate
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {focusAreaOptions.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.focusAreas.includes(area)}
                    onCheckedChange={(checked) => handleFocusAreaChange(area, checked as boolean)}
                  />
                  <Label htmlFor={area} className="text-sm">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Partnership Details</h3>

            <div>
              <Label htmlFor="experience">Previous Experience in Marine Conservation</Label>
              <Textarea
                id="experience"
                placeholder="Describe any previous projects, initiatives, or experience in marine conservation..."
                value={formData.previousExperience}
                onChange={(e) => setFormData((prev) => ({ ...prev, previousExperience: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="contribution">Proposed Contribution *</Label>
              <Textarea
                id="contribution"
                placeholder="How can your organization contribute to marine conservation efforts? (funding, expertise, volunteers, resources, etc.)"
                value={formData.proposedContribution}
                onChange={(e) => setFormData((prev) => ({ ...prev, proposedContribution: e.target.value }))}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="support">Expected Support from Eco-Sanjivani</Label>
              <Textarea
                id="support"
                placeholder="What kind of support or collaboration are you looking for from our platform?"
                value={formData.expectedSupport}
                onChange={(e) => setFormData((prev) => ({ ...prev, expectedSupport: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Supporting Documents</h3>
            <p className="text-sm text-muted-foreground">
              Upload relevant documents (registration certificates, project reports, etc.)
            </p>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Choose Files
              </Button>
            </div>

            {formData.documents.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploaded Files:</p>
                {formData.documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
