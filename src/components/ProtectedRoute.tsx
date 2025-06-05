"use client"

import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles: string[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // User doesn't have the required role
    // Redirect based on their role
    if (user?.role === "student") {
      return <Navigate to="/student/dashboard" replace />
    } else if (user?.role === "staff" || user?.role === "admin") {
      return <Navigate to="/dashboard" replace />
    } else {
      // Fallback
      return <Navigate to="/login" replace />
    }
  }

  // User is authenticated and has the required role
  return <>{children}</>
}

export default ProtectedRoute
