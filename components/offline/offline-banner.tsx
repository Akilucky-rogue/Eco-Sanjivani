"use client"

import { Wifi, WifiOff, CloudOff, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useOffline } from "@/lib/hooks/use-offline"
import { syncManager } from "@/lib/offline/sync-manager"
import { useState, useEffect } from "react"

export function OfflineBanner() {
  const { isOnline, wasOffline, clearOfflineFlag } = useOffline()
  const [syncStatus, setSyncStatus] = useState(syncManager.getQueueStatus())
  const [isManualSync, setIsManualSync] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStatus(syncManager.getQueueStatus())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleManualSync = async () => {
    setIsManualSync(true)
    await syncManager.processSyncQueue()
    setIsManualSync(false)
  }

  const handleDismissOfflineNotice = () => {
    clearOfflineFlag()
  }

  if (!isOnline) {
    return (
      <Alert className="border-orange-200 bg-orange-50">
        <WifiOff className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <strong>You're offline.</strong> Your data will be saved locally and synced when you reconnect.
              {syncStatus.totalItems > 0 && (
                <span className="ml-2">({syncStatus.totalItems} items waiting to sync)</span>
              )}
            </div>
            <CloudOff className="h-4 w-4 text-orange-600" />
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  if (wasOffline && syncStatus.totalItems > 0) {
    return (
      <Alert className="border-blue-200 bg-blue-50">
        <Wifi className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <strong>Back online!</strong>
              {syncStatus.isProcessing ? (
                <span className="ml-2">Syncing {syncStatus.totalItems} items...</span>
              ) : (
                <span className="ml-2">{syncStatus.totalItems} items ready to sync.</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!syncStatus.isProcessing && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleManualSync}
                  disabled={isManualSync}
                  className="text-blue-700 border-blue-300 hover:bg-blue-100 bg-transparent"
                >
                  {isManualSync ? (
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3 w-3 mr-1" />
                  )}
                  Sync Now
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismissOfflineNotice}
                className="text-blue-700 hover:bg-blue-100"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
