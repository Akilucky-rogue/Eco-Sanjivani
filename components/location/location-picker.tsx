"use client"

import { useState } from "react"
import { MapPin, Navigation, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGeolocation } from "@/lib/hooks/use-geolocation"

interface LocationData {
  latitude: number
  longitude: number
  address?: string
  accuracy?: number
}

interface LocationPickerProps {
  onLocationSelect: (location: LocationData) => void
  initialLocation?: LocationData
  title?: string
}

export function LocationPicker({ onLocationSelect, initialLocation, title = "Select Location" }: LocationPickerProps) {
  const { latitude, longitude, accuracy, error, loading, getCurrentLocation } = useGeolocation()
  const [manualLocation, setManualLocation] = useState({
    latitude: initialLocation?.latitude?.toString() || "",
    longitude: initialLocation?.longitude?.toString() || "",
    address: initialLocation?.address || "",
  })

  const handleUseCurrentLocation = () => {
    if (latitude && longitude) {
      onLocationSelect({
        latitude,
        longitude,
        accuracy: accuracy || undefined,
      })
    } else {
      getCurrentLocation()
    }
  }

  const handleManualSubmit = () => {
    const lat = Number.parseFloat(manualLocation.latitude)
    const lng = Number.parseFloat(manualLocation.longitude)

    if (isNaN(lat) || isNaN(lng)) {
      return
    }

    onLocationSelect({
      latitude: lat,
      longitude: lng,
      address: manualLocation.address || undefined,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Location */}
        <div className="space-y-2">
          <Button
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="w-full bg-transparent"
            variant="outline"
          >
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Navigation className="h-4 w-4 mr-2" />}
            Use Current Location
          </Button>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {latitude && longitude && (
            <div className="text-sm text-muted-foreground">
              <p>
                Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}
              </p>
              {accuracy && <p>Accuracy: ±{Math.round(accuracy)}m</p>}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
          </div>
        </div>

        {/* Manual Location Entry */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="19.0760"
                value={manualLocation.latitude}
                onChange={(e) => setManualLocation((prev) => ({ ...prev, latitude: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="72.8777"
                value={manualLocation.longitude}
                onChange={(e) => setManualLocation((prev) => ({ ...prev, longitude: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address (Optional)</Label>
            <Input
              id="address"
              placeholder="Marine Drive, Mumbai"
              value={manualLocation.address}
              onChange={(e) => setManualLocation((prev) => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <Button
            onClick={handleManualSubmit}
            disabled={!manualLocation.latitude || !manualLocation.longitude}
            className="w-full"
          >
            Set Location
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
