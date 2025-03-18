"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  points: number
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("claimly_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo login - in a real app, this would validate against a backend
    if (email && password) {
      const user = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        firstName: "Demo",
        lastName: "User",
        points: 5,
      }

      localStorage.setItem("claimly_user", JSON.stringify(user))
      setUser(user)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo signup - in a real app, this would create a user in the backend
    if (userData.email && userData.password) {
      const user = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        points: 15, // New users get more points
      }

      localStorage.setItem("claimly_user", JSON.stringify(user))
      setUser(user)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    localStorage.removeItem("claimly_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

