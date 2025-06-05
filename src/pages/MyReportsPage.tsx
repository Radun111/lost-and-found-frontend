"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Search, ArrowLeft, Filter, MoreHorizontal, User, Bell, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useAuth } from "../contexts/AuthContext"

// Mock data for reports
const mockReports = [
  {
    id: "REP-001",
    itemName: 'MacBook Pro 16"',
    location: "Main Library, 2nd Floor",
    date: "2023-05-15",
    status: "pending",
    description: "Space Gray MacBook Pro with stickers on the lid. Last seen in the study area.",
  },
  {
    id: "REP-002",
    itemName: "Blue Hydroflask",
    location: "Science Building, Room 302",
    date: "2023-05-10",
    status: "found",
    description: "Navy blue 32oz Hydroflask with university logo sticker.",
  },
  {
    id: "REP-003",
    itemName: "Student ID Card",
    location: "Student Center",
    date: "2023-05-08",
    status: "closed",
    description: "Student ID card for Alex Johnson.",
  },
]

export default function MyReportsPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [reports] = useState(mockReports)
  const [filter, setFilter] = useState("all")

  // Use authenticated user data or fallback to mock data
  const userData = user || {
    name: "Alex Johnson",
    email: "alex.johnson@greenwood.edu",
    id: "GU123456",
    role: "Student",
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const filteredReports = filter === "all" ? reports : reports.filter((report) => report.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "found":
        return <Badge className="bg-green-100 text-green-800">Found</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>
    }
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
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-1">
              <Link to="/dashboard" className="text-emerald-700 hover:text-emerald-800">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h2 className="text-2xl font-bold text-gray-900">My Reports</h2>
            </div>
            <p className="text-gray-600">View and manage your lost item reports</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-1">
                  <Filter className="h-4 w-4 mr-1" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>All Reports</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("found")}>Found</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("closed")}>Closed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/items/new">
              <Button className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800">Report New Item</Button>
            </Link>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No reports found matching your filter.</p>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{report.itemName}</CardTitle>
                      <div className="text-sm text-gray-500">Report ID: {report.id}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(report.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Report</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">{report.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">Location:</span> {report.location}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">Date:</span>{" "}
                        {new Date(report.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
