"use client"

import type React from "react"
import { useState } from "react"
import { Camera, Upload, Loader2, MapPin, TreePine, Fish, Bird } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EcosystemSpeciesClassifier, type SpeciesIdentificationResult } from "@/lib/ml/ecosystem-species-classifier"
import { useGeolocation } from "@/lib/hooks/use-geolocation"

export function SpeciesIdentifier() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<SpeciesIdentificationResult | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [ecosystem, setEcosystem] = useState<string>("auto")
  const { location, getCurrentLocation, locationName, isUsingMockData, setMockLocation } = useGeolocation()

  const classifier = new EcosystemSpeciesClassifier()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setResult(null)
    }
  }

  const analyzeSpecies = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    try {
      await getCurrentLocation()
      const identificationResult = await classifier.identifySpecies(
        selectedFile,
        ecosystem === "auto" ? undefined : ecosystem,
        location || undefined,
      )
      setResult(identificationResult)
    } catch (error) {
      console.error("Species identification failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critically Endangered":
        return "bg-red-500"
      case "Endangered":
        return "bg-orange-500"
      case "Vulnerable":
        return "bg-yellow-500"
      case "Near Threatened":
        return "bg-blue-500"
      default:
        return "bg-green-500"
    }
  }

  const getEcosystemIcon = (ecosystem: string) => {
    switch (ecosystem) {
      case "forest":
        return <TreePine className="h-4 w-4" />
      case "marine":
      case "freshwater":
        return <Fish className="h-4 w-4" />
      case "grassland":
      case "mountain":
        return <Bird className="h-4 w-4" />
      default:
        return <Camera className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Ecosystem Species Identifier
        </CardTitle>
        <CardDescription>
          Identify species across India's diverse ecosystems - forests, wetlands, grasslands, mountains, and coastal
          regions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Ecosystem Type</label>
              <Select value={ecosystem} onValueChange={setEcosystem}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ecosystem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="forest">Forest</SelectItem>
                  <SelectItem value="wetland">Wetland</SelectItem>
                  <SelectItem value="grassland">Grassland</SelectItem>
                  <SelectItem value="mountain">Mountain</SelectItem>
                  <SelectItem value="marine">Marine/Coastal</SelectItem>
                  <SelectItem value="freshwater">Freshwater</SelectItem>
                  <SelectItem value="urban">Urban</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="species-upload" />
              <label htmlFor="species-upload" className="w-full">
                <Button variant="outline" className="cursor-pointer bg-transparent w-full" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Select Photo
                  </span>
                </Button>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {location && (
              <Badge variant={isUsingMockData ? "secondary" : "default"} className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {isUsingMockData ? "Mock" : "GPS"}
              </Badge>
            )}
            {ecosystem !== "auto" && (
              <Badge variant="outline" className="flex items-center gap-1">
                {getEcosystemIcon(ecosystem)}
                {ecosystem.charAt(0).toUpperCase() + ecosystem.slice(1)}
              </Badge>
            )}
            {!location && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={getCurrentLocation}>
                  <MapPin className="h-3 w-3 mr-1" />
                  Get GPS Location
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMockLocation()}>
                  Use Mock Data
                </Button>
              </div>
            )}
          </div>

          {location && locationName && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">Current Location</span>
                </div>
                <Badge variant={isUsingMockData ? "secondary" : "default"}>
                  {isUsingMockData ? "Mock Data" : "Real-time GPS"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{locationName}</p>
              <p className="text-xs text-muted-foreground">
                Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          )}

          {selectedFile && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
              <Button onClick={analyzeSpecies} disabled={isAnalyzing} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Species...
                  </>
                ) : (
                  "Identify Species"
                )}
              </Button>
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Primary Identification</h3>
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{result.primarySpecies.name}</h4>
                      <Badge className={getStatusColor(result.primarySpecies.conservationStatus)}>
                        {result.primarySpecies.conservationStatus}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic">{result.primarySpecies.scientificName}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getEcosystemIcon(result.primarySpecies.ecosystem)}
                        {result.primarySpecies.ecosystem}
                      </Badge>
                      <Badge variant="secondary">{result.primarySpecies.region}</Badge>
                    </div>
                    <p className="text-sm">
                      <strong>Habitat:</strong> {result.primarySpecies.habitat}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Main Threats:</p>
                      <div className="flex flex-wrap gap-1">
                        {result.primarySpecies.threats.map((threat, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {threat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      <strong>Confidence:</strong> {Math.round(result.primarySpecies.confidence * 100)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {result.species.length > 1 && (
              <div className="space-y-2">
                <h4 className="font-medium">Other Possible Species</h4>
                <div className="space-y-2">
                  {result.species.slice(1).map((species) => (
                    <div key={species.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex-1">
                        <span className="text-sm font-medium">{species.name}</span>
                        <p className="text-xs text-muted-foreground">{species.ecosystem}</p>
                      </div>
                      <Badge variant="secondary">{Math.round(species.confidence * 100)}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
