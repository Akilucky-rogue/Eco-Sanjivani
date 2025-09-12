// Database schema definitions for Eco-Sanjivani platform
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  points: number
  level: number
  joinedAt: Date
  location?: string
  bio?: string
  achievements: string[]
  eventsAttended: number
  wasteCollected: number // in kg
}

export interface CleanupEvent {
  id: string
  title: string
  description: string
  location: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  date: Date
  duration: number // in hours
  maxParticipants: number
  currentParticipants: number
  organizer: string // user id
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  tags: string[]
  difficulty: "easy" | "medium" | "hard"
  estimatedWaste: number // in kg
  actualWaste?: number // in kg
  participants: string[] // user ids
  createdAt: Date
  updatedAt: Date
}

export interface CommunityPost {
  id: string
  authorId: string
  author: {
    name: string
    avatar?: string
    level: number
  }
  content: string
  images?: string[]
  type: "update" | "achievement" | "question" | "tip"
  likes: number
  likedBy: string[] // user ids
  comments: Comment[]
  tags: string[]
  location?: string
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  authorId: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  likes: number
  likedBy: string[] // user ids
  createdAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: "cleanup" | "community" | "learning" | "leadership"
  points: number
  requirement: {
    type: "events_attended" | "waste_collected" | "posts_created" | "days_active"
    value: number
  }
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface Notification {
  id: string
  userId: string
  type: "event_reminder" | "achievement_unlocked" | "new_comment" | "event_update"
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: Date
}
