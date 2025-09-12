import type { User, CleanupEvent, CommunityPost } from "./schema"
import { mockUsers, mockEvents, mockPosts, mockAchievements } from "./mock-data"

// Local storage keys
const STORAGE_KEYS = {
  USERS: "eco-sanjivani-users",
  EVENTS: "eco-sanjivani-events",
  POSTS: "eco-sanjivani-posts",
  ACHIEVEMENTS: "eco-sanjivani-achievements",
  NOTIFICATIONS: "eco-sanjivani-notifications",
  CURRENT_USER: "eco-sanjivani-current-user",
}

// Initialize data if not exists
export function initializeData() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers))
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(mockEvents))
  }
  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(mockPosts))
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(mockAchievements))
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]))
  }
}

// User operations
export const userStorage = {
  getAll: (): User[] => {
    if (typeof window === "undefined") return mockUsers
    const data = localStorage.getItem(STORAGE_KEYS.USERS)
    return data ? JSON.parse(data) : mockUsers
  },

  getById: (id: string): User | null => {
    const users = userStorage.getAll()
    return users.find((user) => user.id === id) || null
  },

  create: (user: Omit<User, "id">): User => {
    const users = userStorage.getAll()
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
    }
    users.push(newUser)
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    return newUser
  },

  update: (id: string, updates: Partial<User>): User | null => {
    const users = userStorage.getAll()
    const index = users.findIndex((user) => user.id === id)
    if (index === -1) return null

    users[index] = { ...users[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    return users[index]
  },
}

// Event operations
export const eventStorage = {
  getAll: (): CleanupEvent[] => {
    if (typeof window === "undefined") return mockEvents
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS)
    return data
      ? JSON.parse(data).map((event: any) => ({
          ...event,
          date: new Date(event.date),
          createdAt: new Date(event.createdAt),
          updatedAt: new Date(event.updatedAt),
        }))
      : mockEvents
  },

  getById: (id: string): CleanupEvent | null => {
    const events = eventStorage.getAll()
    return events.find((event) => event.id === id) || null
  },

  create: (event: Omit<CleanupEvent, "id">): CleanupEvent => {
    const events = eventStorage.getAll()
    const newEvent: CleanupEvent = {
      ...event,
      id: Date.now().toString(),
    }
    events.push(newEvent)
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events))
    return newEvent
  },

  joinEvent: (eventId: string, userId: string): boolean => {
    const events = eventStorage.getAll()
    const event = events.find((e) => e.id === eventId)
    if (!event || event.participants.includes(userId)) return false

    event.participants.push(userId)
    event.currentParticipants = event.participants.length
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events))
    return true
  },
}

// Post operations
export const postStorage = {
  getAll: (): CommunityPost[] => {
    if (typeof window === "undefined") return mockPosts
    const data = localStorage.getItem(STORAGE_KEYS.POSTS)
    return data
      ? JSON.parse(data).map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
          comments: post.comments.map((comment: any) => ({
            ...comment,
            createdAt: new Date(comment.createdAt),
          })),
        }))
      : mockPosts
  },

  create: (post: Omit<CommunityPost, "id">): CommunityPost => {
    const posts = postStorage.getAll()
    const newPost: CommunityPost = {
      ...post,
      id: Date.now().toString(),
    }
    posts.unshift(newPost)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    return newPost
  },

  likePost: (postId: string, userId: string): boolean => {
    const posts = postStorage.getAll()
    const post = posts.find((p) => p.id === postId)
    if (!post) return false

    if (post.likedBy.includes(userId)) {
      post.likedBy = post.likedBy.filter((id) => id !== userId)
      post.likes--
    } else {
      post.likedBy.push(userId)
      post.likes++
    }

    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    return true
  },
}

// Current user session
export const sessionStorage = {
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null
    const userId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return userId ? userStorage.getById(userId) : null
  },

  setCurrentUser: (userId: string): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId)
  },

  clearCurrentUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  },
}
