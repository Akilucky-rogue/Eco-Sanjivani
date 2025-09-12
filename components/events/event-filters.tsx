"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Calendar, MapPin, Users, Filter } from "lucide-react"

const eventTypes = [
  { id: "beach-cleanup", label: "Beach Cleanup", count: 24 },
  { id: "mangrove-restoration", label: "Mangrove Restoration", count: 12 },
  { id: "awareness-workshop", label: "Awareness Workshop", count: 8 },
  { id: "plastic-collection", label: "Plastic Collection", count: 18 },
  { id: "coral-conservation", label: "Coral Conservation", count: 6 },
]

const locations = [
  { id: "mumbai", label: "Mumbai", count: 32 },
  { id: "goa", label: "Goa", count: 18 },
  { id: "chennai", label: "Chennai", count: 14 },
  { id: "kochi", label: "Kochi", count: 10 },
  { id: "visakhapatnam", label: "Visakhapatnam", count: 8 },
]

const difficulties = [
  { id: "easy", label: "Easy", color: "bg-green-100 text-green-800" },
  { id: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { id: "hard", label: "Hard", color: "bg-red-100 text-red-800" },
]

export function EventFilters() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [distanceRange, setDistanceRange] = useState([50])

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId])
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId))
    }
  }

  const handleLocationChange = (locationId: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, locationId])
    } else {
      setSelectedLocations(selectedLocations.filter((id) => id !== locationId))
    }
  }

  const handleDifficultyChange = (difficultyId: string, checked: boolean) => {
    if (checked) {
      setSelectedDifficulties([...selectedDifficulties, difficultyId])
    } else {
      setSelectedDifficulties(selectedDifficulties.filter((id) => id !== difficultyId))
    }
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedLocations([])
    setSelectedDifficulties([])
    setDistanceRange([50])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Event Types */}
          <div>
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Event Type
            </h3>
            <div className="space-y-2">
              {eventTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                    />
                    <label htmlFor={type.id} className="text-sm text-foreground cursor-pointer">
                      {type.label}
                    </label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {type.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h3>
            <div className="space-y-2">
              {locations.map((location) => (
                <div key={location.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={location.id}
                      checked={selectedLocations.includes(location.id)}
                      onCheckedChange={(checked) => handleLocationChange(location.id, checked as boolean)}
                    />
                    <label htmlFor={location.id} className="text-sm text-foreground cursor-pointer">
                      {location.label}
                    </label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {location.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Distance Range */}
          <div>
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Distance Range
            </h3>
            <div className="space-y-2">
              <Slider
                value={distanceRange}
                onValueChange={setDistanceRange}
                max={200}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 km</span>
                <span className="font-medium">{distanceRange[0]} km</span>
                <span>200 km</span>
              </div>
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Difficulty
            </h3>
            <div className="space-y-2">
              {difficulties.map((difficulty) => (
                <div key={difficulty.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={difficulty.id}
                    checked={selectedDifficulties.includes(difficulty.id)}
                    onCheckedChange={(checked) => handleDifficultyChange(difficulty.id, checked as boolean)}
                  />
                  <label htmlFor={difficulty.id} className="text-sm text-foreground cursor-pointer">
                    {difficulty.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
