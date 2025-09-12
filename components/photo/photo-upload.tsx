"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Camera, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PhotoCapture } from "./photo-capture"

interface PhotoUploadProps {
  onPhotoSelect: (photoData: string, type: "upload" | "camera") => void
  maxSizeMB?: number
  acceptedTypes?: string[]
}

export function PhotoUpload({
  onPhotoSelect,
  maxSizeMB = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
}: PhotoUploadProps) {
  const [showCamera, setShowCamera] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (!acceptedTypes.includes(file.type)) {
      alert(`Please select a valid image file (${acceptedTypes.join(", ")})`)
      return
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        onPhotoSelect(result, "upload")
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  if (showCamera) {
    return (
      <PhotoCapture
        onPhotoCapture={(photo) => {
          onPhotoSelect(photo, "camera")
          setShowCamera(false)
        }}
        onClose={() => setShowCamera(false)}
      />
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Add Photo</h3>
          <p className="text-muted-foreground mb-6">Drag and drop an image, or choose from the options below</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1 sm:flex-none">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>

            <Button onClick={() => setShowCamera(true)} variant="outline" className="flex-1 sm:flex-none">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">Max file size: {maxSizeMB}MB • Supported: JPG, PNG, WebP</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </CardContent>
    </Card>
  )
}
