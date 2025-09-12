"use client"

import { MapPin, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LocationDisplayProps {
  latitude: number
  longitude: number
  address?: string
  accuracy?: number
  showAccuracy?: boolean
  className?: string
}

export function LocationDisplay({
  latitude,
  longitude,
  address,
  accuracy,
  showAccuracy = false,
  className = "",
}: LocationDisplayProps) {
  const formatCoordinate = (coord: number) => coord.toFixed(6)

  const openInMaps = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`
    window.open(url, "_blank")
  }

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        {address && <p className="text-sm font-medium truncate">{address}</p>}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            {formatCoordinate(latitude)}, {formatCoordinate(longitude)}
          </span>
          {showAccuracy && accuracy && (
            <Badge variant="secondary" className="text-xs">
              ±{Math.round(accuracy)}m
            </Badge>
          )}
        </div>
        <button onClick={openInMaps} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1">
          <Navigation className="h-3 w-3" />
          Open in Maps
        </button>
      </div>
    </div>
  )
}
