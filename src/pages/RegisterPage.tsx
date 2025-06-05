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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    studentId: "",
    department: "",
  })
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    role?: string
    studentId?: string
    department?: string
    general?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      })
    }
  }

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    })
    if (errors.role) {
      setErrors({
        ...errors,
        role: undefined,
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors: typeof errors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
      isValid = false
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
      isValid = false
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "University email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    } else if (!formData.email.includes("greenwood.edu")) {
      newErrors.email = "Please use your university email (@greenwood.edu)"
      isValid = false
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select your role"
      isValid = false
    }

    // Student ID validation (for students only)
    if (formData.role === "student" && !formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required"
      isValid = false
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = "Department is required"
      isValid = false
    }

    // Terms acceptance
    if (!acceptTerms) {
      newErrors.general = "You must accept the terms and conditions"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        studentId: formData.studentId,
        department: formData.department,
      })

      if (success) {
        // Navigate based on role
        if (formData.role === "student") {
          navigate("/student/dashboard")
        } else {
          navigate("/dashboard")
        }
      } else {
        setErrors({ general: "Registration failed. Email may already be in use." })
      }
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." })
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
            <p className="mb-6 text-center text-lg">Join our community and help reunite lost items with their owners</p>
            <div className="rounded-lg bg-emerald-800 p-6">
              <h3 className="mb-3 font-semibold">Why Register?</h3>
              <ul className="space-y-2 text-sm">
                <li>• Report lost items quickly</li>
                <li>• Track your submissions</li>
                <li>• Get notified when items are found</li>
                <li>• Help build a caring community</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="flex w-full items-center justify-center bg-white p-6 md:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo - only visible on small screens */}
          <div className="mb-8 text-center md:hidden">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Greenwood University Logo"
              className="mx-auto mb-4"
              width={80}
              height={80}
            />
            <h1 className="text-3xl font-bold text-emerald-700">Greenwood University</h1>
            <p className="text-lg text-gray-600">Lost and Found System</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Create Account</h2>
              <p className="text-gray-500">Join the Lost and Found community</p>
            </div>

            {errors.general && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@greenwood.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={handleRoleChange} required>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
              </div>

              {formData.role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    name="studentId"
                    type="text"
                    placeholder="Enter your student ID"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                  {errors.studentId && <p className="text-sm text-red-600">{errors.studentId}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Enter your department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
                {errors.department && <p className="text-sm text-red-600">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link to="/terms" className="text-emerald-700 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-emerald-700 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <p className="text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-700 hover:underline">
                  Sign in here
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
