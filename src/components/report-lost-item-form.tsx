import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { AlertCircle, CheckCircle2, ArrowLeft, Upload, X, Search, User, Bell, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface FormData {
  itemName: string
  category: string
  dateLost: string
  locationLastSeen: string
  description: string
  image: File | null
  confirmAccuracy: boolean
}

interface FormErrors {
  itemName?: string
  category?: string
  dateLost?: string
  locationLastSeen?: string
  description?: string
  confirmAccuracy?: string
}

const categories = [
  { value: "electronics", label: "Electronics", icon: "📱" },
  { value: "books", label: "Books & Stationery", icon: "📚" },
  { value: "clothing", label: "Clothing & Accessories", icon: "👕" },
  { value: "bags", label: "Bags & Backpacks", icon: "🎒" },
  { value: "keys", label: "Keys & ID Cards", icon: "🔑" },
  { value: "jewelry", label: "Jewelry & Watches", icon: "💍" },
  { value: "sports", label: "Sports Equipment", icon: "⚽" },
  { value: "other", label: "Other Items", icon: "📦" },
]

export default function ReportLostItemForm() {
  const [formData, setFormData] = useState<FormData>({
    itemName: "",
    category: "",
    dateLost: new Date().toISOString().split("T")[0], // Pre-fill with current date
    locationLastSeen: "",
    description: "",
    image: null,
    confirmAccuracy: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const navigate = useNavigate();


  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@greenwood.edu",
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required"
    } else if (formData.itemName.trim().length < 2) {
      newErrors.itemName = "Item name must be at least 2 characters"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.dateLost) {
      newErrors.dateLost = "Date lost is required"
    } else {
      const selectedDate = new Date(formData.dateLost)
      const today = new Date()
      if (selectedDate > today) {
        newErrors.dateLost = "Date cannot be in the future"
      }
    }

    if (!formData.locationLastSeen.trim()) {
      newErrors.locationLastSeen = "Location is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (!formData.confirmAccuracy) {
      newErrors.confirmAccuracy = "Please confirm the accuracy of the information"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field in errors) {
  setErrors((prev) => ({ ...prev, [field]: undefined }));
}
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        handleInputChange("image", file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/")) {
        handleInputChange("image", file)
      }
    }
  }

  const removeImage = () => {
    handleInputChange("image", null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)

      // Redirect to dashboard after showing success message
      setTimeout(() => {
        navigate("/dashboard")
      }, 3000)
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-emerald-700">Greenwood University</h1>
                    <p className="text-sm text-gray-600">Lost & Found System</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-700" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-emerald-700">Report Submitted Successfully!</h2>
              <p className="text-gray-600">
                Your lost item report has been submitted. We'll notify you if any matching items are found.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-emerald-800 font-medium">What happens next?</p>
              <ul className="text-sm text-emerald-700 mt-2 space-y-1">
                <li>• Your report will be reviewed within 24 hours</li>
                <li>• We'll search our database for matching items</li>
                <li>• You'll receive email notifications for any matches</li>
              </ul>
            </div>
            <div className="text-sm text-gray-500">
              <p>Redirecting to dashboard in a few seconds...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-emerald-700">Greenwood University</h1>
                  <p className="text-sm text-gray-600">Lost & Found System</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-emerald-700" />
                    </div>
                    <span className="hidden sm:block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to ="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Report Lost Item</h2>
          <p className="text-lg text-gray-600">
            Help us help you find your lost item by providing detailed information below.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lost Item Details</CardTitle>
            <CardDescription>
              Please fill out all required fields. The more details you provide, the better we can help you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  type="text"
                  placeholder="e.g., iPhone 13, Blue Backpack, Chemistry Textbook"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange("itemName", e.target.value)}
                  className={errors.itemName ? "border-red-500" : ""}
                />
                {errors.itemName && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.itemName}</span>
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select item category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center space-x-2">
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.category}</span>
                  </div>
                )}
              </div>

              {/* Date Lost */}
              <div className="space-y-2">
                <Label htmlFor="dateLost">Date Lost *</Label>
                <Input
                  id="dateLost"
                  type="date"
                  value={formData.dateLost}
                  onChange={(e) => handleInputChange("dateLost", e.target.value)}
                  className={errors.dateLost ? "border-red-500" : ""}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.dateLost && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.dateLost}</span>
                  </div>
                )}
              </div>

              {/* Location Last Seen */}
              <div className="space-y-2">
                <Label htmlFor="locationLastSeen">Location Last Seen *</Label>
                <Input
                  id="locationLastSeen"
                  type="text"
                  placeholder="e.g., Library 2nd Floor, Student Center Cafeteria, Engineering Building Room 205"
                  value={formData.locationLastSeen}
                  onChange={(e) => handleInputChange("locationLastSeen", e.target.value)}
                  className={errors.locationLastSeen ? "border-red-500" : ""}
                />
                {errors.locationLastSeen && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.locationLastSeen}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description including color, brand, size, distinctive features, or any other identifying characteristics..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formData.description.length} characters</span>
                  <span>Minimum 10 characters</span>
                </div>
                {errors.description && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.description}</span>
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Image Upload (Optional)</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300 hover:border-emerald-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {formData.image ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">{formData.image.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeImage}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">{(formData.image.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Drag and drop an image here, or{" "}
                          <label className="text-emerald-700 hover:text-emerald-800 cursor-pointer underline">
                            browse
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                          </label>
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="confirmAccuracy"
                    checked={formData.confirmAccuracy}
                    onCheckedChange={(checked: boolean) => handleInputChange("confirmAccuracy", checked)}
                  />
                  <Label htmlFor="confirmAccuracy" className="text-sm font-normal leading-5">
                    I confirm that the above information is accurate and complete to the best of my knowledge.
                  </Label>
                </div>
                {errors.confirmAccuracy && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.confirmAccuracy}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting Report..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tips for Better Results:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Be as specific as possible in your description</li>
                  <li>• Include brand names and model numbers</li>
                  <li>• Mention any unique identifying features</li>
                  <li>• Upload a clear photo if available</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact Information:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Email: lostandfound@greenwood.edu</li>
                  <li>• Phone: (555) 123-4567</li>
                  <li>• Office: Student Center, Room 150</li>
                  <li>• Hours: Mon-Fri, 8:00 AM - 5:00 PM</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
