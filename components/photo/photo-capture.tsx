"use client"

import { useState, useEffect } from "react"
import { Camera, X, RotateCcw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCamera } from "@/lib/hooks/use-camera"

interface PhotoCaptureProps {
  onPhotoCapture: (photoData: string) => void
  onClose: () => void
}

export function PhotoCapture({ onPhotoCapture, onClose }: PhotoCaptureProps) {
  const { isSupported, isStreaming, error, videoRef, startCamera, stopCamera, capturePhoto } = useCamera()
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)

  useEffect(() => {
    if (isSupported) {
      startCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isSupported])

  const handleCapture = () => {
    const photo = capturePhoto()
    if (photo) {
      setCapturedPhoto(photo)
      stopCamera()
    }
  }

  const handleRetake = () => {
    setCapturedPhoto(null)
    startCamera()
  }

  const handleSave = () => {
    if (capturedPhoto) {
      onPhotoCapture(capturedPhoto)
      onClose()
    }
  }

  if (!isSupported) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">Camera not supported on this device</p>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-0">
        <div className="relative">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-black/50">
            <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm font-medium">{capturedPhoto ? "Photo Preview" : "Take Photo"}</span>
            <div className="w-8" /> {/* Spacer */}
          </div>

          {/* Camera View or Captured Photo */}
          <div className="aspect-[4/3] bg-black relative overflow-hidden">
            {capturedPhoto ? (
              <img src={capturedPhoto || "/placeholder.svg"} alt="Captured" className="w-full h-full object-cover" />
            ) : (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <p className="text-white text-center px-4">{error}</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Controls */}
          <div className="p-4 bg-black">
            {capturedPhoto ? (
              <div className="flex gap-3">
                <Button onClick={handleRetake} variant="outline" className="flex-1 bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Save Photo
                </Button>
              </div>
            ) : (
              <Button onClick={handleCapture} disabled={!isStreaming} className="w-full" size="lg">
                <Camera className="h-5 w-5 mr-2" />
                Capture Photo
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
