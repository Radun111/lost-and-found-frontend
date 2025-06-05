import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"


interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  universityId: string
  agreeToTerms: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
  universityId?: string
  agreeToTerms?: string
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    universityId: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "University email is required"
    } else if (!formData.email.endsWith("@greenwood.edu")) {
      newErrors.email = "Please use your university email (@greenwood.edu)"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.universityId) {
      newErrors.universityId = "University ID is required"
    } else if (!/^GU\d{6}$/.test(formData.universityId)) {
      newErrors.universityId = "University ID must be in format GU123456"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)

      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    }, 1500)
  }

  if (showSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-700" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-emerald-700">Registration Successful!</h2>
          <p className="text-gray-600">
            Welcome to Greenwood University's Lost and Found system. You'll be redirected to your dashboard shortly.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          <p>Redirecting in a few seconds...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </a>
        <h2 className="text-3xl font-bold">Create Account</h2>
        <p className="text-gray-500">Join the Greenwood University Lost and Found community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.fullName}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">University Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@greenwood.edu"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="universityId">University ID</Label>
          <Input
            id="universityId"
            type="text"
            placeholder="GU123456"
            value={formData.universityId}
            onChange={(e) => handleInputChange("universityId", e.target.value.toUpperCase())}
            className={errors.universityId ? "border-red-500" : ""}
          />
          {errors.universityId && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.universityId}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.confirmPassword}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <input
              id="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
              className="h-4 w-4 mt-1 border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="agreeToTerms" className="text-sm font-normal leading-5">
              I agree to the{" "}
              <a href="/terms" className="text-emerald-700 hover:underline">Terms and Conditions</a> and{" "}
              <a href="/privacy" className="text-emerald-700 hover:underline">Privacy Policy</a>
            </label>
          </div>
          {errors.agreeToTerms && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.agreeToTerms}</span>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <p className="text-gray-500">
          Already have an account?{" "}
          <a href="/" className="text-emerald-700 hover:underline">Sign in here</a>
        </p>
      </div>

      <div className="text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Greenwood University. All rights reserved.</p>
        <p>For technical support, contact helpdesk@greenwood.edu</p>
      </div>
    </div>
  )
}
