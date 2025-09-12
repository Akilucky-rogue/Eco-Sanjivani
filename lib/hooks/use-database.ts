"use client"

import { useEffect, useState } from "react"
import type { User, CleanupEvent, CommunityPost } from "../database/schema"
import { userStorage, eventStorage, postStorage, sessionStorage, initializeData } from "../database/storage"

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    initializeData()
    setIsInitialized(true)
  }, [])

  return {
    isInitialized,
    users: userStorage,
    events: eventStorage,
    posts: postStorage,
    session: sessionStorage,
  }
}

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const { session, users } = useDatabase()

  useEffect(() => {
    const user = session.getCurrentUser()
    setCurrentUser(user)
  }, [session])

  const login = (userId: string) => {
    session.setCurrentUser(userId)
    const user = users.getById(userId)
    setCurrentUser(user)
  }

  const logout = () => {
    session.clearCurrentUser()
    setCurrentUser(null)
  }

  return { currentUser, login, logout }
}

export function useEvents() {
  const [events, setEvents] = useState<CleanupEvent[]>([])
  const { events: eventStorage } = useDatabase()

  useEffect(() => {
    setEvents(eventStorage.getAll())
  }, [eventStorage])

  const joinEvent = (eventId: string, userId: string) => {
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
  const { posts: postStorage } = useDatabase()

  useEffect(() => {
    setPosts(postStorage.getAll())
  }, [postStorage])

  const likePost = (postId: string, userId: string) => {
    const success = postStorage.likePost(postId, userId)
    if (success) {
      setPosts(postStorage.getAll())
    }
    return success
  }

  const createPost = (post: Omit<CommunityPost, "id">) => {
    const newPost = postStorage.create(post)
    setPosts(postStorage.getAll())
    return newPost
  }

  return { posts, likePost, createPost }
}
