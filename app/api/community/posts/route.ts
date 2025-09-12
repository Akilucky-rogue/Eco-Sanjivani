import { NextResponse } from "next/server"

// Mock community posts data
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Akshat Vora", // Updated name from Priya Sharma to Akshat Vora
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Ocean Guardian",
    },
    content: {
      title: "Successful Beach Cleanup at Versova",
      description: "Amazing community effort today! We collected 127kg of plastic waste.",
      image: "/placeholder.svg?height=300&width=500",
      stats: { waste: "127kg", volunteers: 45, duration: "4 hours" },
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 8,
    shares: 3,
    type: "event_completion",
  },
  {
    id: 2,
    user: {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Marine Expert",
    },
    content: {
      title: "Marine Life Conservation Tips",
      description: "Here are 5 simple ways to protect marine ecosystems in your daily life.",
      tips: [
        "Reduce plastic usage",
        "Choose sustainable seafood",
        "Support marine protected areas",
        "Participate in beach cleanups",
        "Educate others about ocean conservation",
      ],
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 18,
    comments: 12,
    shares: 5,
    type: "educational",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockPosts,
      total: mockPosts.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newPost = {
      id: mockPosts.length + 1,
      user: body.user,
      content: body.content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      type: body.type || "general",
    }

    mockPosts.unshift(newPost)

    return NextResponse.json({
      success: true,
      data: newPost,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 })
  }
}
