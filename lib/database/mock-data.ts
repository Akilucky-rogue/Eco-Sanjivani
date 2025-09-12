import type { User, CleanupEvent, CommunityPost, Achievement } from "./schema"

// Mock user data
export const mockUsers: User[] = [
  {
    id: "1",
    email: "akshat.vora@email.com", // Updated email from Priya to Akshat
    name: "Akshat Vora", // Ensuring consistent user name
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2450,
    level: 8,
    joinedAt: new Date("2024-01-15"),
    location: "Mumbai, Maharashtra",
    bio: "BTech student passionate about marine conservation and technology", // Updated bio to reflect student status
    achievements: ["first-cleanup", "waste-warrior", "community-leader"],
    eventsAttended: 12,
    wasteCollected: 45.5,
  },
  {
    id: "2",
    email: "arjun.patel@email.com",
    name: "Arjun Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1890,
    level: 6,
    joinedAt: new Date("2024-02-20"),
    location: "Goa",
    bio: "Environmental activist and beach cleanup organizer",
    achievements: ["first-cleanup", "organizer"],
    eventsAttended: 8,
    wasteCollected: 32.1,
  },
]

// Mock cleanup events
export const mockEvents: CleanupEvent[] = [
  {
    id: "1",
    title: "Juhu Beach Cleanup Drive",
    description: "Join us for a comprehensive cleanup of Juhu Beach, focusing on plastic waste and marine debris.",
    location: {
      name: "Juhu Beach, Mumbai",
      coordinates: { lat: 19.099, lng: 72.8258 },
    },
    date: new Date("2024-12-20T07:00:00"),
    duration: 4,
    maxParticipants: 50,
    currentParticipants: 23,
    organizer: "1",
    status: "upcoming",
    tags: ["beach", "plastic", "mumbai"],
    difficulty: "medium",
    estimatedWaste: 200,
    participants: ["1", "2"],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "2",
    title: "Mangrove Conservation - Mahim Creek",
    description: "Protect and restore the mangrove ecosystem while removing accumulated waste.",
    location: {
      name: "Mahim Creek, Mumbai",
      coordinates: { lat: 19.033, lng: 72.8397 },
    },
    date: new Date("2024-12-22T06:30:00"),
    duration: 5,
    maxParticipants: 30,
    currentParticipants: 15,
    organizer: "2",
    status: "upcoming",
    tags: ["mangrove", "ecosystem", "restoration"],
    difficulty: "hard",
    estimatedWaste: 150,
    participants: ["2"],
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-12"),
  },
]

// Mock community posts
export const mockPosts: CommunityPost[] = [
  {
    id: "1",
    authorId: "1",
    author: {
      name: "Akshat Vora", // Ensuring consistent user name in posts
      avatar: "/placeholder.svg?height=40&width=40",
      level: 8,
    },
    content:
      "Amazing cleanup at Versova Beach today! Collected over 50kg of plastic waste. The turtle nesting area is now much cleaner. 🐢",
    images: ["/placeholder.svg?height=300&width=400"],
    type: "achievement",
    likes: 24,
    likedBy: ["2"],
    comments: [
      {
        id: "1",
        authorId: "2",
        author: {
          name: "Arjun Patel",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Incredible work! The turtles will thank you for this.",
        likes: 5,
        likedBy: ["1"],
        createdAt: new Date("2024-12-10T15:30:00"),
      },
    ],
    tags: ["cleanup", "versova", "turtles"],
    location: "Versova Beach, Mumbai",
    createdAt: new Date("2024-12-10T14:20:00"),
    updatedAt: new Date("2024-12-10T14:20:00"),
  },
]

// Mock achievements
export const mockAchievements: Achievement[] = [
  {
    id: "first-cleanup",
    name: "First Steps",
    description: "Attended your first cleanup event",
    icon: "🌊",
    category: "cleanup",
    points: 100,
    requirement: { type: "events_attended", value: 1 },
    rarity: "common",
  },
  {
    id: "waste-warrior",
    name: "Waste Warrior",
    description: "Collected over 25kg of waste",
    icon: "♻️",
    category: "cleanup",
    points: 500,
    requirement: { type: "waste_collected", value: 25 },
    rarity: "rare",
  },
  {
    id: "community-leader",
    name: "Community Leader",
    description: "Organized 5 successful cleanup events",
    icon: "👑",
    category: "leadership",
    points: 1000,
    requirement: { type: "events_attended", value: 10 },
    rarity: "epic",
  },
]
