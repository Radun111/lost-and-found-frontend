"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate form
    if (!email || !password || !role) {
      setError("Please enter email, password, and select your role")
      setIsLoading(false)
      return
    }

    try {
      const success = await login(email, password, role)

      if (success) {
        // Navigate based on role
        if (role === "admin" || role === "staff") {
          navigate("/admin/dashboard")
        } else {
          navigate("/dashboard")
        }
      } else {
        setError("Invalid credentials. Please check your email, password, and role.")
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Image/Brand section */}
      <div className="relative hidden w-full bg-emerald-700 md:block md:w-1/2">
        <div className="flex h-full flex-col items-center justify-center p-8 text-white">
          <div className="mb-8 text-center">
            
            <h1 className="text-4xl font-bold">Greenwood University</h1>
            <p className="mt-2 text-xl">Lost and Found System</p>
          </div>
          <div className="max-w-md">
            <p className="mb-6 text-center text-lg">
              Helping students and staff reconnect with their lost belongings since 2023
            </p>
            <div className="rounded-lg bg-emerald-800 p-6">
              <h3 className="mb-3 font-semibold">Did you know?</h3>
              <p>
                Over 1,000 items are found and returned to their owners each semester through our Lost and Found system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full items-center justify-center bg-white p-6 md:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo - only visible on small screens */}
          <div className="mb-8 text-center md:hidden">
            
            <h1 className="text-3xl font-bold text-emerald-700">Greenwood University</h1>
            <p className="text-lg text-gray-600">Lost and Found System</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Welcome Back</h2>
              <p className="text-gray-500">Sign in to access the Lost and Found system</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@greenwood.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-emerald-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me for 30 days
                </Label>
              </div>

              <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-emerald-700 hover:underline">
                  Register with your university ID
                </Link>
              </p>
            </div>

            <div className="text-center text-xs text-gray-400">
              <p>© {new Date().getFullYear()} Greenwood University. All rights reserved.</p>
              <p>For technical support, contact helpdesk@greenwood.edu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
