"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types
interface User {
  id: string
  name: string
  email: string
  role: "student" | "staff" | "admin"
  universityId?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  loading: boolean
}

interface RegisterData {
  fullName: string
  email: string
  password: string
  universityId: string
  role: string
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem("greenwood_user")
        const savedToken = localStorage.getItem("greenwood_token")

        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        // Clear invalid data
        localStorage.removeItem("greenwood_user")
        localStorage.removeItem("greenwood_token")
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Mock users database
  const mockUsers = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "student@greenwood.edu",
      password: "password123",
      role: "student" as const,
      universityId: "GU123456",
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "staff@greenwood.edu",
      password: "password123",
      role: "staff" as const,
      universityId: "GU789012",
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@greenwood.edu",
      password: "password123",
      role: "admin" as const,
      universityId: "GU000001",
    },
  ]

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user in mock database
      const foundUser = mockUsers.find((u) => u.email === email && u.password === password && u.role === role)

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          universityId: foundUser.universityId,
        }

        // Save to localStorage
        localStorage.setItem("greenwood_user", JSON.stringify(userData))
        localStorage.setItem("greenwood_token", "mock_jwt_token_" + Date.now())

        setUser(userData)
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === userData.email)
      if (existingUser) {
        return false
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.fullName,
        email: userData.email,
        role: userData.role as "student" | "staff" | "admin",
        universityId: userData.universityId,
      }

      // Add to mock database (in real app, this would be an API call)
      mockUsers.push({
        ...newUser,
        password: userData.password, 
      })

      // Auto-login after registration
      localStorage.setItem("greenwood_user", JSON.stringify(newUser))
      localStorage.setItem("greenwood_token", "mock_jwt_token_" + Date.now())

      setUser(newUser)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("greenwood_user")
    localStorage.removeItem("greenwood_token")
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
