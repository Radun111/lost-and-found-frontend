"use client"

import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { Toaster } from "./components/ui/toaster"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/RegisterPage"
import StudentDashboard from "./pages/StudentDashboard"
import ReportLostItemForm from "./pages/ReportLostItemForm"
import MyReportsPage from "./pages/MyReportsPage"
import AdminDashboard from "./pages/AdminDashboard"
import AdminRequestsPage from "./pages/AdminRequestsPage"
import AdminUsersPage from "./pages/AdminUsersPage"
import NotFoundPage from "./pages/NotFoundPage"

// Protected Route Component (inline)
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect based on their role
    if (user?.role === "student") {
      return <Navigate to="/dashboard" replace />
    } else if (user?.role === "staff" || user?.role === "admin") {
      return <Navigate to="/dashboard" replace />
    } else {
      return <Navigate to="/login" replace />
    }
  }

  return <>{children}</>
}

// Public Route Component (redirects if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case "admin":
      case "staff":
        return <Navigate to="/dashboard" replace />
      case "student":
        return <Navigate to="/dashboard" replace />
      default:
        return <Navigate to="/login" replace />
    }
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student", "admin", "staff"]}>
            {/* Conditionally render based on role */}
            <RoleBasedDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/items/new"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <ReportLostItemForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-requests"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <MyReportsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin/Staff routes */}
      <Route
        path="/requests"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <AdminRequestsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

// Component to render the appropriate dashboard based on user role
function RoleBasedDashboard() {
  const { user } = useAuth()

  if (user?.role === "student") {
    return <StudentDashboard />
  } else if (user?.role === "admin" || user?.role === "staff") {
    return <AdminDashboard />
  }

  // Fallback (should never reach here due to ProtectedRoute)
  return <Navigate to="/login" replace />
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  )
}

export default App
