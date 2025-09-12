"use client"

import { useState } from "react"
import { X, Download, Calendar, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface PhotoData {
  id: string
  url: string
  caption?: string
  location?: {
    latitude: number
    longitude: number
    address?: string
  }
  timestamp: string
  type: "before" | "after" | "marine-life" | "cleanup-progress"
  uploadedBy: string
  eventId?: string
}

interface PhotoGalleryProps {
  photos: PhotoData[]
  title?: string
  showFilters?: boolean
}

export function PhotoGallery({ photos, title = "Photo Gallery", showFilters = true }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredPhotos = photos.filter((photo) => filter === "all" || photo.type === filter)

  const downloadPhoto = (photo: PhotoData) => {
    const link = document.createElement("a")
    link.href = photo.url
    link.download = `eco-sanjivani-${photo.type}-${photo.id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "before":
        return "bg-red-100 text-red-800"
      case "after":
        return "bg-green-100 text-green-800"
      case "marine-life":
        return "bg-blue-100 text-blue-800"
      case "cleanup-progress":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>

        {showFilters && (
          <div className="flex gap-2 flex-wrap">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All ({photos.length})
            </Button>
            <Button variant={filter === "before" ? "default" : "outline"} size="sm" onClick={() => setFilter("before")}>
              Before ({photos.filter((p) => p.type === "before").length})
            </Button>
            <Button variant={filter === "after" ? "default" : "outline"} size="sm" onClick={() => setFilter("after")}>
              After ({photos.filter((p) => p.type === "after").length})
            </Button>
            <Button
              variant={filter === "marine-life" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("marine-life")}
            >
              Marine Life ({photos.filter((p) => p.type === "marine-life").length})
            </Button>
          </div>
        )}
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No photos found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.caption || `${photo.type} photo`}
                  className="w-full h-full object-cover"
                  onClick={() => setSelectedPhoto(photo)}
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getTypeColor(photo.type)}>{photo.type.replace("-", " ")}</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadPhoto(photo)
                    }}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {photo.caption && (
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{photo.caption}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Photo Detail Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedPhoto && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <Badge className={getTypeColor(selectedPhoto.type)}>{selectedPhoto.type.replace("-", " ")}</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPhoto(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Photo */}
              <div className="relative">
                <img
                  src={selectedPhoto.url || "/placeholder.svg"}
                  alt={selectedPhoto.caption || `${selectedPhoto.type} photo`}
                  className="w-full max-h-[60vh] object-contain rounded-lg"
                />
              </div>

              {/* Details */}
              <div className="space-y-3">
                {selectedPhoto.caption && <p className="text-lg">{selectedPhoto.caption}</p>}

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedPhoto.timestamp)}
                  </div>

                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {selectedPhoto.uploadedBy}
                  </div>

                  {selectedPhoto.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {selectedPhoto.location.address ||
                        `${selectedPhoto.location.latitude.toFixed(4)}, ${selectedPhoto.location.longitude.toFixed(4)}`}
                    </div>
                  )}
                </div>

                <Button onClick={() => downloadPhoto(selectedPhoto)} className="w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download Photo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
