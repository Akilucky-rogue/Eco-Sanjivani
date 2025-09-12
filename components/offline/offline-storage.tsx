"use client"

import { useState, useEffect } from "react"
import { HardDrive, Trash2, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { syncManager } from "@/lib/offline/sync-manager"

interface StorageInfo {
  used: number
  available: number
  total: number
  items: {
    events: number
    photos: number
    reports: number
    cache: number
  }
}

export function OfflineStorage() {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null)
  const [syncStatus, setSyncStatus] = useState(syncManager.getQueueStatus())

  useEffect(() => {
    calculateStorageInfo()

    const interval = setInterval(() => {
      setSyncStatus(syncManager.getQueueStatus())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const calculateStorageInfo = () => {
    if (typeof window === "undefined") return

    try {
      // Calculate approximate storage usage
      let totalSize = 0
      const items = { events: 0, photos: 0, reports: 0, cache: 0 }

      // Count items in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("eco-sanjivani-")) {
          const value = localStorage.getItem(key) || ""
          totalSize += new Blob([value]).size

          if (key.includes("events")) items.events++
          else if (key.includes("photos")) items.photos++
          else if (key.includes("reports")) items.reports++
          else items.cache++
        }
      }

      // Estimate available storage (5MB limit for localStorage)
      const maxStorage = 5 * 1024 * 1024 // 5MB
      const available = Math.max(0, maxStorage - totalSize)

      setStorageInfo({
        used: totalSize,
        available,
        total: maxStorage,
        items,
      })
    } catch (error) {
      console.error("Failed to calculate storage info:", error)
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  const clearOfflineData = () => {
    if (confirm("Are you sure you want to clear all offline data? This cannot be undone.")) {
      // Clear all eco-sanjivani data from localStorage
      const keysToRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("eco-sanjivani-")) {
          keysToRemove.push(key)
        }
      }

      keysToRemove.forEach((key) => localStorage.removeItem(key))
      syncManager.clearQueue()
      calculateStorageInfo()
    }
  }

  const exportOfflineData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      syncQueue: syncManager.getQueueStatus(),
      localStorage: {},
    }

    // Export all eco-sanjivani data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("eco-sanjivani-")) {
        data.localStorage[key] = localStorage.getItem(key)
      }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `eco-sanjivani-offline-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!storageInfo) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Loading storage information...</p>
        </CardContent>
      </Card>
    )
  }

  const usagePercentage = (storageInfo.used / storageInfo.total) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          Offline Storage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Storage Usage */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Storage Used</span>
            <span>
              {formatBytes(storageInfo.used)} / {formatBytes(storageInfo.total)}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">{formatBytes(storageInfo.available)} available</p>
        </div>

        {/* Stored Items */}
        <div className="space-y-3">
          <h4 className="font-medium">Stored Items</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between">
              <span className="text-sm">Events</span>
              <Badge variant="secondary">{storageInfo.items.events}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Photos</span>
              <Badge variant="secondary">{storageInfo.items.photos}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Reports</span>
              <Badge variant="secondary">{storageInfo.items.reports}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Cache</span>
              <Badge variant="secondary">{storageInfo.items.cache}</Badge>
            </div>
          </div>
        </div>

        {/* Sync Status */}
        {syncStatus.totalItems > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Sync Queue</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm">Items waiting to sync</span>
              <Badge variant={syncStatus.isProcessing ? "default" : "outline"}>{syncStatus.totalItems}</Badge>
            </div>
            {syncStatus.isProcessing && <p className="text-xs text-muted-foreground">Syncing in progress...</p>}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportOfflineData} className="flex-1 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" onClick={clearOfflineData} className="flex-1 bg-transparent">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
