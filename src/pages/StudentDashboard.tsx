"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Search, FileText, TrendingUp, CheckCircle, Clock, MapPin, Bell, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useAuth } from "../contexts/AuthContext"

export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Use authenticated user data or fallback to mock data
  const userData = user || {
    name: "Alex Johnson",
    email: "alex.johnson@greenwood.edu",
    id: "GU123456",
    role: "Student",
  }

  // Mock stats data - in real app this would come from API
  const stats = {
    totalReturned: 1247,
    activeReports: 89,
    thisWeekReturned: 23,
    responseTime: "2.3 hours",
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
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

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-emerald-600">
                  2
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-emerald-700" />
                    </div>
                    <span className="hidden sm:block">{userData.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{userData.name}</p>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData.name.split(" ")[0]}! 👋</h2>
          <p className="text-lg text-gray-600">
            Ready to help reunite lost items with their owners? Here's what you can do today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Items Returned</p>
                  <p className="text-2xl font-bold text-emerald-700">{stats.totalReturned}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Reports</p>
                  <p className="text-2xl font-bold text-blue-700">{stats.activeReports}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-purple-700">{stats.thisWeekReturned}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-orange-700">{stats.responseTime}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Report Lost Item Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-emerald-700" />
                </div>
                <div>
                  <CardTitle className="text-xl">Report Lost Item</CardTitle>
                  <CardDescription>Lost something on campus? Let us help you find it.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Quickly report your lost item with details like location, time, and description. Our system will notify
                you when potential matches are found.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">📱 Electronics</Badge>
                <Badge variant="secondary">🎒 Bags</Badge>
                <Badge variant="secondary">📚 Books</Badge>
                <Badge variant="secondary">🔑 Keys</Badge>
              </div>
              <Link to="/items/new">
                <Button className="w-full bg-emerald-700 hover:bg-emerald-800">Report Lost Item</Button>
              </Link>
            </CardContent>
          </Card>

          {/* View My Reports Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <CardTitle className="text-xl">View My Reports</CardTitle>
                  <CardDescription>Track the status of your lost item reports.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Check the status of your reports, view potential matches, and manage your lost item submissions all in
                one place.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Active Reports:</span>
                <Badge className="bg-blue-100 text-blue-800">3 pending</Badge>
              </div>
              <Link to="/my-requests">
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                  View My Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
        </div>
      </main>
    </div>
  )
}
