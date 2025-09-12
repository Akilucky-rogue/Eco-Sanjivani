"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationPicker } from "@/components/location/location-picker"
import { LocationDisplay } from "@/components/location/location-display"
import { useDatabase } from "@/lib/hooks/use-database"

interface LocationData {
  latitude: number
  longitude: number
  address?: string
  accuracy?: number
}

export function CreateEventForm({ onClose }: { onClose: () => void }) {
  const { addEvent } = useDatabase()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    maxParticipants: "",
    difficulty: "",
    category: "",
  })
  const [location, setLocation] = useState<LocationData | null>(null)
  const [showLocationPicker, setShowLocationPicker] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!location) {
      alert("Please select a location for the event")
      return
    }

    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      duration: Number.parseInt(formData.duration) || 2,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`,
      },
      maxParticipants: Number.parseInt(formData.maxParticipants) || 20,
      currentParticipants: 0,
      difficulty: formData.difficulty as "easy" | "medium" | "hard",
      category: formData.category,
      status: "upcoming" as const,
      createdBy: "current-user", // This would come from auth context
      createdAt: new Date().toISOString(),
    }

    addEvent(newEvent)
    onClose()
  }

  const handleLocationSelect = (locationData: LocationData) => {
    setLocation(locationData)
    setShowLocationPicker(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Cleanup Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="Beach Cleanup at Marine Drive"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Join us for a community beach cleanup to protect marine life..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="8"
                placeholder="2"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>

            {location ? (
              <div className="p-3 border rounded-lg bg-muted/50">
                <LocationDisplay
                  latitude={location.latitude}
                  longitude={location.longitude}
                  address={location.address}
                  accuracy={location.accuracy}
                  showAccuracy={true}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLocationPicker(true)}
                  className="mt-2"
                >
                  Change Location
                </Button>
              </div>
            ) : (
              <Button type="button" variant="outline" onClick={() => setShowLocationPicker(true)} className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Select Location
              </Button>
            )}

            {showLocationPicker && <LocationPicker onLocationSelect={handleLocationSelect} title="Event Location" />}
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="maxParticipants" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Max Participants
              </Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                placeholder="20"
                value={formData.maxParticipants}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxParticipants: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beach-cleanup">Beach Cleanup</SelectItem>
                  <SelectItem value="underwater-cleanup">Underwater Cleanup</SelectItem>
                  <SelectItem value="mangrove-restoration">Mangrove Restoration</SelectItem>
                  <SelectItem value="coral-restoration">Coral Restoration</SelectItem>
                  <SelectItem value="awareness-campaign">Awareness Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Event
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
