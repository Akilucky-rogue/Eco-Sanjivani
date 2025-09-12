"use client"

import { useState, useRef } from "react"

interface CameraState {
  isSupported: boolean
  isStreaming: boolean
  error: string | null
}

export function useCamera() {
  const [state, setState] = useState<CameraState>({
    isSupported: typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia,
    isStreaming: false,
    error: null,
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    if (!state.isSupported) {
      setState((prev) => ({ ...prev, error: "Camera not supported" }))
      return
    }

    try {
      setState((prev) => ({ ...prev, error: null }))

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setState((prev) => ({ ...prev, isStreaming: true }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to access camera",
        isStreaming: false,
      }))
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setState((prev) => ({ ...prev, isStreaming: false }))
  }

  const capturePhoto = (): string | null => {
    if (!videoRef.current || !state.isStreaming) return null

    const canvas = document.createElement("canvas")
    const video = videoRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    ctx.drawImage(video, 0, 0)
    return canvas.toDataURL("image/jpeg", 0.8)
  }

  return {
    ...state,
    videoRef,
    startCamera,
    stopCamera,
    capturePhoto,
  }
}
