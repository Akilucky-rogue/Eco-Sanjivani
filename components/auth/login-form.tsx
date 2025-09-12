"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCurrentUser } from "@/lib/hooks/use-database"
import { userStorage } from "@/lib/database/storage"

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToSignup?: () => void
}

export function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useCurrentUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const users = userStorage.getAll()
      console.log(
        "[v0] Available users:",
        users.map((u) => u.email),
      )

      const user = users.find((u) => u.email === email)

      if (!user) {
        setError("User not found. Please check your email or sign up.")
        return
      }

      // For demo purposes, accept any password for existing users
      console.log("[v0] Login successful for user:", user.name)
      login(user.id)
      onSuccess?.()
    } catch (err) {
      console.log("[v0] Login error:", err)
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail("akshat.vora@email.com")
    setPassword("demo123")
    // Trigger login immediately
    setTimeout(() => {
      const users = userStorage.getAll()
      const demoUser = users.find((u) => u.email === "akshat.vora@email.com")
      if (demoUser) {
        login(demoUser.id)
        onSuccess?.()
      }
    }, 100)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-600">Welcome Back</CardTitle>
        <CardDescription>Sign in to continue your ecosystem conservation journey</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button type="button" onClick={onSwitchToSignup} className="text-blue-600 hover:underline font-medium">
              Sign up here
            </button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg space-y-2">
            <p className="text-sm text-blue-800 font-medium">Demo Account:</p>
            <p className="text-xs text-blue-600">Email: akshat.vora@email.com</p>
            <p className="text-xs text-blue-600">Use any password</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDemoLogin}
              className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
            >
              Quick Demo Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
