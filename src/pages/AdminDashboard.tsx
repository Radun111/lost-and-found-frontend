"use client"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  ClipboardList,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  BarChart3,
  ArrowUpRight,
  Smartphone,
  BookOpen,
  Backpack,
  Key,
  Laptop,
  Headphones,
  Wallet,
  Glasses,
  Search,
  User,
  Bell,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useAuth } from "../contexts/AuthContext"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Mock stats data
  const stats = {
    totalRequests: 156,
    pendingRequests: 42,
    matchedRequests: 28,
    resolvedRequests: 78,
    cancelledRequests: 8,
  }

  // Mock recent activity data
  const recentActivity = [
    {
      id: "act1",
      type: "new_report",
      item: "MacBook Pro",
      user: "Alex Johnson",
      timestamp: "10 minutes ago",
      status: "pending",
    },
    {
      id: "act2",
      type: "matched",
      item: "Blue Backpack",
      user: "Maria Garcia",
      timestamp: "1 hour ago",
      status: "matched",
    },
    {
      id: "act3",
      type: "resolved",
      item: "Student ID Card",
      user: "James Wilson",
      timestamp: "3 hours ago",
      status: "resolved",
    },
    {
      id: "act4",
      type: "new_report",
      item: "AirPods Pro",
      user: "Emma Thompson",
      timestamp: "5 hours ago",
      status: "pending",
    },
    {
      id: "act5",
      type: "cancelled",
      item: "Water Bottle",
      user: "Michael Brown",
      timestamp: "Yesterday",
      status: "cancelled",
    },
  ]

  // Mock category data
  const categories = [
    { name: "Electronics", icon: Laptop, count: 48, color: "bg-blue-100 text-blue-800" },
    { name: "Books", icon: BookOpen, count: 32, color: "bg-amber-100 text-amber-800" },
    { name: "Bags", icon: Backpack, count: 27, color: "bg-emerald-100 text-emerald-800" },
    { name: "Keys & IDs", icon: Key, count: 21, color: "bg-purple-100 text-purple-800" },
    { name: "Phones", icon: Smartphone, count: 18, color: "bg-red-100 text-red-800" },
    { name: "Headphones", icon: Headphones, count: 15, color: "bg-indigo-100 text-indigo-800" },
    { name: "Wallets", icon: Wallet, count: 12, color: "bg-orange-100 text-orange-800" },
    { name: "Glasses", icon: Glasses, count: 9, color: "bg-cyan-100 text-cyan-800" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "matched":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new_report":
        return <ClipboardList className="h-4 w-4 text-emerald-500" />
      case "matched":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
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
                  <p className="text-sm text-gray-600">Lost & Found System - Staff Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-emerald-600">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-emerald-700" />
                    </div>
                    <span className="hidden sm:block">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name.split(" ")[0]}! 👋</h2>
          <p className="text-lg text-gray-600">Here's an overview of the Lost and Found system activity.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Requests</p>
                  <p className="text-3xl font-bold">{stats.totalRequests}</p>
                </div>
                <div className="rounded-full bg-gray-100 p-3">
                  <ClipboardList className="h-6 w-6 text-gray-700" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>12% increase this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-3xl font-bold">{stats.pendingRequests}</p>
                </div>
                <div className="rounded-full bg-yellow-100 p-3">
                  <Clock className="h-6 w-6 text-yellow-700" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <span>Requires attention</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Matched</p>
                  <p className="text-3xl font-bold">{stats.matchedRequests}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <AlertCircle className="h-6 w-6 text-blue-700" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <span>Ready for verification</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Resolved</p>
                  <p className="text-3xl font-bold">{stats.resolvedRequests}</p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>8% increase this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Link to="/requests">
                  <Button className="h-auto flex-col items-center justify-center gap-2 bg-emerald-700 py-4 hover:bg-emerald-800 w-full">
                    <ClipboardList className="h-5 w-5" />
                    <span>Review Requests</span>
                  </Button>
                </Link>
                <Button
                  className="h-auto flex-col items-center justify-center gap-2 bg-blue-600 py-4 hover:bg-blue-700"
                  variant="secondary"
                >
                  <FileText className="h-5 w-5" />
                  <span>Generate Report</span>
                </Button>
                {user?.role === "admin" && (
                  <Link to="/users">
                    <Button
                      className="h-auto flex-col items-center justify-center gap-2 bg-purple-600 py-4 hover:bg-purple-700 w-full"
                      variant="secondary"
                    >
                      <Users className="h-5 w-5" />
                      <span>Manage Users</span>
                    </Button>
                  </Link>
                )}
                <Button
                  className="h-auto flex-col items-center justify-center gap-2 bg-amber-600 py-4 hover:bg-amber-700"
                  variant="secondary"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>View Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        
      </main>
    </div>
  )
}
