"use client"

interface SyncItem {
  id: string
  type: "event" | "photo" | "report" | "profile"
  action: "create" | "update" | "delete"
  data: any
  timestamp: number
  retryCount: number
}

class SyncManager {
  private syncQueue: SyncItem[] = []
  private isProcessing = false
  private maxRetries = 3

  constructor() {
    this.loadQueue()

    // Listen for online events to trigger sync
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => {
        this.processSyncQueue()
      })
    }
  }

  private loadQueue() {
    if (typeof window === "undefined") return

    try {
      const stored = localStorage.getItem("eco-sanjivani-sync-queue")
      if (stored) {
        this.syncQueue = JSON.parse(stored)
      }
    } catch (error) {
      console.error("Failed to load sync queue:", error)
      this.syncQueue = []
    }
  }

  private saveQueue() {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem("eco-sanjivani-sync-queue", JSON.stringify(this.syncQueue))
    } catch (error) {
      console.error("Failed to save sync queue:", error)
    }
  }

  addToQueue(item: Omit<SyncItem, "id" | "timestamp" | "retryCount">) {
    const syncItem: SyncItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      retryCount: 0,
    }

    this.syncQueue.push(syncItem)
    this.saveQueue()

    // Try to process immediately if online
    if (navigator.onLine) {
      this.processSyncQueue()
    }
  }

  async processSyncQueue() {
    if (this.isProcessing || !navigator.onLine || this.syncQueue.length === 0) {
      return
    }

    this.isProcessing = true

    const itemsToProcess = [...this.syncQueue]

    for (const item of itemsToProcess) {
      try {
        await this.syncItem(item)

        // Remove successful item from queue
        this.syncQueue = this.syncQueue.filter((queueItem) => queueItem.id !== item.id)
      } catch (error) {
        console.error("Sync failed for item:", item.id, error)

        // Increment retry count
        const queueItem = this.syncQueue.find((q) => q.id === item.id)
        if (queueItem) {
          queueItem.retryCount++

          // Remove item if max retries exceeded
          if (queueItem.retryCount >= this.maxRetries) {
            this.syncQueue = this.syncQueue.filter((q) => q.id !== item.id)
            console.error("Max retries exceeded for item:", item.id)
          }
        }
      }
    }

    this.saveQueue()
    this.isProcessing = false
  }

  private async syncItem(item: SyncItem): Promise<void> {
    // Simulate API calls - in real app, these would be actual API endpoints
    switch (item.type) {
      case "event":
        return this.syncEvent(item)
      case "photo":
        return this.syncPhoto(item)
      case "report":
        return this.syncReport(item)
      case "profile":
        return this.syncProfile(item)
      default:
        throw new Error(`Unknown sync type: ${item.type}`)
    }
  }

  private async syncEvent(item: SyncItem): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(`Syncing event ${item.action}:`, item.data)

    // In real app, this would make actual API calls
    // await fetch('/api/events', { method: 'POST', body: JSON.stringify(item.data) })
  }

  private async syncPhoto(item: SyncItem): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(`Syncing photo ${item.action}:`, item.data.id)
  }

  private async syncReport(item: SyncItem): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(`Syncing report ${item.action}:`, item.data.id)
  }

  private async syncProfile(item: SyncItem): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log(`Syncing profile ${item.action}:`, item.data.id)
  }

  getQueueStatus() {
    return {
      totalItems: this.syncQueue.length,
      isProcessing: this.isProcessing,
      items: this.syncQueue.map((item) => ({
        id: item.id,
        type: item.type,
        action: item.action,
        timestamp: item.timestamp,
        retryCount: item.retryCount,
      })),
    }
  }

  clearQueue() {
    this.syncQueue = []
    this.saveQueue()
  }
}

export const syncManager = new SyncManager()
