"use client"

import { useEffect, useState, useCallback } from "react"
import type { Notification } from "../database/schema"

// Simulated real-time events using polling and local storage
export function useRealtime() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate connection
    setIsConnected(true)

    // Simulate periodic updates
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000) // Update every 30 seconds

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [])

  const emit = useCallback((event: string, data: any) => {
    // Simulate real-time event emission
    console.log("[v0] Real-time event emitted:", event, data)

    // Trigger storage event for cross-tab communication
    window.dispatchEvent(new CustomEvent(`realtime-${event}`, { detail: data }))
  }, [])

  const subscribe = useCallback((event: string, callback: (data: any) => void) => {
    const handler = (e: CustomEvent) => callback(e.detail)
    window.addEventListener(`realtime-${event}`, handler as EventListener)

    return () => {
      window.removeEventListener(`realtime-${event}`, handler as EventListener)
    }
  }, [])

  return { isConnected, lastUpdate, emit, subscribe }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { subscribe, emit } = useRealtime()

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem("eco-sanjivani-notifications")
    if (stored) {
      const parsed = JSON.parse(stored).map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt),
      }))
      setNotifications(parsed)
      setUnreadCount(parsed.filter((n: Notification) => !n.read).length)
    }

    // Subscribe to new notifications
    const unsubscribe = subscribe("notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev])
      setUnreadCount((prev) => prev + 1)
    })

    return unsubscribe
  }, [subscribe])

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "createdAt">) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        createdAt: new Date(),
      }

      const updated = [newNotification, ...notifications]
      setNotifications(updated)
      localStorage.setItem("eco-sanjivani-notifications", JSON.stringify(updated))

      emit("notification", newNotification)
    },
    [notifications, emit],
  )

  const markAsRead = useCallback(
    (id: string) => {
      const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      setNotifications(updated)
      setUnreadCount((prev) => Math.max(0, prev - 1))
      localStorage.setItem("eco-sanjivani-notifications", JSON.stringify(updated))
    },
    [notifications],
  )

  const markAllAsRead = useCallback(() => {
    const updated = notifications.map((n) => ({ ...n, read: true }))
    setNotifications(updated)
    setUnreadCount(0)
    localStorage.setItem("eco-sanjivani-notifications", JSON.stringify(updated))
  }, [notifications])

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
  }
}

export function useLiveChat(roomId: string) {
  const [messages, setMessages] = useState<any[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const { subscribe, emit } = useRealtime()

  useEffect(() => {
    setIsConnected(true)

    // Load existing messages
    const stored = localStorage.getItem(`chat-${roomId}`)
    if (stored) {
      const parsed = JSON.parse(stored).map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      }))
      setMessages(parsed)
    }

    // Subscribe to new messages
    const unsubscribe = subscribe(`chat-${roomId}`, (message: any) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      unsubscribe()
      setIsConnected(false)
    }
  }, [roomId, subscribe])

  const sendMessage = useCallback(
    (content: string, userId: string, userName: string) => {
      const message = {
        id: Date.now().toString(),
        content,
        userId,
        userName,
        timestamp: new Date(),
      }

      const updated = [...messages, message]
      setMessages(updated)
      localStorage.setItem(`chat-${roomId}`, JSON.stringify(updated))

      emit(`chat-${roomId}`, message)
    },
    [messages, roomId, emit],
  )

  return {
    messages,
    isConnected,
    sendMessage,
  }
}
