"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Upload, Loader2, MapPin, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EcosystemSpeciesClassifier, type SpeciesIdentificationResult } from "@/lib/ml/ecosystem-species-classifier"
import { useGeolocation } from "@/lib/hooks/use-geolocation"

export function SpeciesIdentifier() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<SpeciesIdentificationResult | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { location, getCurrentLocation } = useGeolocation()

  const classifier = new EcosystemSpeciesClassifier()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError("File size must be less than 10MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      setSelectedFile(file)
      setResult(null)
      setError(null)
    }
  }

  const analyzeSpecies = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    setError(null)

    try {
      console.log("[v0] Starting species identification...")
      await getCurrentLocation()
      console.log("[v0] Location obtained, calling classifier...")

      const identificationResult = await classifier.identifySpecies(selectedFile, location || undefined)
      console.log("[v0] Species identification completed:", identificationResult)

      setResult(identificationResult)
    } catch (error) {
      console.error("[v0] Species identification failed:", error)
      setError("Unable to identify species. Please try again with a clearer image.")
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

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Ecosystem Species Identifier
        </CardTitle>
        <CardDescription>
          Upload a photo to identify species from any ecosystem and learn about their conservation status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="species-upload" />
            <label htmlFor="species-upload">
              <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Select Photo
                </span>
              </Button>
            </label>
            {location && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Location detected
              </Badge>
            )}
          </div>

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
                      <span className="text-sm">{species.name}</span>
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
