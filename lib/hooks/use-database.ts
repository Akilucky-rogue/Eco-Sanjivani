"use client"

import { useEffect, useState } from "react"
import type { User, CleanupEvent, CommunityPost } from "../database/schema"
import { userStorage, eventStorage, postStorage, sessionStorage, initializeData } from "../database/storage"

let databaseInstance: any = null

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!databaseInstance) {
      initializeData()
      databaseInstance = {
        users: userStorage,
        events: eventStorage,
        posts: postStorage,
        session: sessionStorage,
      }
    }
    setIsInitialized(true)
  }, [])

  return {
    isInitialized,
    users: databaseInstance?.users || userStorage,
    events: databaseInstance?.events || eventStorage,
    posts: databaseInstance?.posts || postStorage,
    session: databaseInstance?.session || sessionStorage,
  }
}

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const { session, users, isInitialized } = useDatabase()

  useEffect(() => {
    if (isInitialized && session) {
      const user = session.getCurrentUser()
      setCurrentUser(user)
    }
  }, [session, isInitialized])

  const login = (userId: string) => {
    if (session && users) {
      session.setCurrentUser(userId)
      const user = users.getById(userId)
      setCurrentUser(user)
    }
  }

  const logout = () => {
    if (session) {
      session.clearCurrentUser()
      setCurrentUser(null)
    }
  }

  return { currentUser, login, logout }
}

export function useEvents() {
  const [events, setEvents] = useState<CleanupEvent[]>([])
  const { events: eventStorage, isInitialized } = useDatabase()

  useEffect(() => {
    if (isInitialized && eventStorage) {
      setEvents(eventStorage.getAll())
    }
  }, [eventStorage, isInitialized])

  const joinEvent = (eventId: string, userId: string) => {
    if (!eventStorage) return false
    const success = eventStorage.joinEvent(eventId, userId)
    if (success) {
      setEvents(eventStorage.getAll())
    }
    return success
  }

  return { events, joinEvent }
}

export function usePosts() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const { posts: postStorage, isInitialized } = useDatabase()

  useEffect(() => {
    if (isInitialized && postStorage) {
      setPosts(postStorage.getAll())
    }
  }, [postStorage, isInitialized])

  const likePost = (postId: string, userId: string) => {
    if (!postStorage) return false
    const success = postStorage.likePost(postId, userId)
    if (success) {
      setPosts(postStorage.getAll())
    }
    return success
  }

  const createPost = (post: Omit<CommunityPost, "id">) => {
    if (!postStorage) return null
    const newPost = postStorage.create(post)
    setPosts(postStorage.getAll())
    return newPost
  }

  return { posts, likePost, createPost }
}
