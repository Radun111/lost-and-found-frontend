"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import {
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  User,
  Bell,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu as UserDropdownMenu,
  DropdownMenuContent as UserDropdownMenuContent,
  DropdownMenuItem as UserDropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger as UserDropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useAuth } from "../contexts/AuthContext"

interface Request {
  id: string
  itemName: string
  category: string
  status: "pending" | "matched" | "resolved" | "cancelled"
  dateSubmitted: string
  dateLost: string
  locationLastSeen: string
  reportedBy: string
}

export default function AdminRequestsPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Mock requests data
  const requests: Request[] = [
    {
      id: "REQ-001",
      itemName: "MacBook Pro",
      category: "Electronics",
      status: "pending",
      dateSubmitted: "2024-01-15",
      dateLost: "2024-01-14",
      locationLastSeen: "Library 2nd Floor",
      reportedBy: "Alex Johnson",
    },
    {
      id: "REQ-002",
      itemName: "Blue Backpack",
      category: "Bags",
      status: "matched",
      dateSubmitted: "2024-01-10",
      dateLost: "2024-01-09",
      locationLastSeen: "Student Center Cafeteria",
      reportedBy: "Maria Garcia",
    },
    {
      id: "REQ-003",
      itemName: "Chemistry Textbook",
      category: "Books",
      status: "resolved",
      dateSubmitted: "2024-01-05",
      dateLost: "2024-01-04",
      locationLastSeen: "Science Building Room 301",
      reportedBy: "James Wilson",
    },
    {
      id: "REQ-004",
      itemName: "AirPods Pro",
      category: "Electronics",
      status: "pending",
      dateSubmitted: "2024-01-12",
      dateLost: "2024-01-11",
      locationLastSeen: "Gym",
      reportedBy: "Emma Thompson",
    },
    {
      id: "REQ-005",
      itemName: "Student ID Card",
      category: "IDs",
      status: "resolved",
      dateSubmitted: "2024-01-08",
      dateLost: "2024-01-07",
      locationLastSeen: "Cafeteria",
      reportedBy: "Michael Brown",
    },
    {
      id: "REQ-006",
      itemName: "Water Bottle",
      category: "Other",
      status: "cancelled",
      dateSubmitted: "2024-01-03",
      dateLost: "2024-01-02",
      locationLastSeen: "Basketball Court",
      reportedBy: "Sophia Martinez",
    },
    {
      id: "REQ-007",
      itemName: "Glasses",
      category: "Accessories",
      status: "matched",
      dateSubmitted: "2024-01-14",
      dateLost: "2024-01-13",
      locationLastSeen: "Computer Lab",
      reportedBy: "William Davis",
    },
  ]

  // Filter and sort requests
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesCategory = categoryFilter === "all" || request.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Sort requests
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime()
      case "oldest":
        return new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime()
      case "name":
        return a.itemName.localeCompare(b.itemName)
      case "status":
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "matched":
        return (
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Matched
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Resolved
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="border-gray-200 bg-gray-50 text-gray-800 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get unique categories for filter
  const categories = Array.from(new Set(requests.map((request) => request.category)))

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

              <UserDropdownMenu>
                <UserDropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-emerald-700" />
                    </div>
                    <span className="hidden sm:block">{user?.name}</span>
                  </Button>
                </UserDropdownMenuTrigger>
                <UserDropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <UserDropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </UserDropdownMenuItem>
                  <UserDropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </UserDropdownMenuItem>
                  <DropdownMenuSeparator />
                  <UserDropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </UserDropdownMenuItem>
                </UserDropdownMenuContent>
              </UserDropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Manage Requests</h2>
          <p className="text-lg text-gray-600">Review and process lost item requests from students and staff.</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by item name, ID, or reporter..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="matched">Matched</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Category</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <span>Sort By</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">By Name</SelectItem>
                    <SelectItem value="status">By Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.itemName}</TableCell>
                      <TableCell>{request.category}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{formatDate(request.dateSubmitted)}</TableCell>
                      <TableCell>{request.reportedBy}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {request.status === "pending" && (
                              <>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-blue-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Matched
                                </DropdownMenuItem>
                              </>
                            )}
                            {request.status === "matched" && (
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Resolved
                              </DropdownMenuItem>
                            )}
                            {(request.status === "pending" || request.status === "matched") && (
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Cancel Request
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  )
}
