"use client"

import { useState, useEffect } from "react"

interface OfflineState {
  isOnline: boolean
  wasOffline: boolean
}

export function useOffline() {
  const [state, setState] = useState<OfflineState>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    wasOffline: false,
  })

  useEffect(() => {
    const handleOnline = () => {
      setState((prev) => ({
        isOnline: true,
        wasOffline: prev.wasOffline || !prev.isOnline,
      }))
    }

    const handleOffline = () => {
      setState((prev) => ({
        isOnline: false,
        wasOffline: true,
      }))
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const clearOfflineFlag = () => {
    setState((prev) => ({ ...prev, wasOffline: false }))
  }

  return {
    ...state,
    clearOfflineFlag,
  }
}
