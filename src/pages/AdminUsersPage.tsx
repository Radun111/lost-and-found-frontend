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
  User,
  UserCog,
  Shield,
  Mail,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
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

interface UserData {
  id: string
  name: string
  email: string
  role: "admin" | "staff" | "student"
  department: string
  status: "active" | "inactive"
  dateAdded: string
}

export default function AdminUsersPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Mock users data
  const users: UserData[] = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john.smith@greenwood.edu",
      role: "admin",
      department: "IT Services",
      status: "active",
      dateAdded: "2023-06-15",
    },
    {
      id: "USR-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@greenwood.edu",
      role: "staff",
      department: "Student Affairs",
      status: "active",
      dateAdded: "2023-07-22",
    },
    {
      id: "USR-003",
      name: "Michael Brown",
      email: "michael.brown@greenwood.edu",
      role: "staff",
      department: "Security",
      status: "active",
      dateAdded: "2023-08-10",
    },
    {
      id: "USR-004",
      name: "Emily Davis",
      email: "emily.davis@greenwood.edu",
      role: "admin",
      department: "Administration",
      status: "active",
      dateAdded: "2023-05-05",
    },
    {
      id: "USR-005",
      name: "Robert Wilson",
      email: "robert.wilson@greenwood.edu",
      role: "staff",
      department: "Library",
      status: "inactive",
      dateAdded: "2023-09-18",
    },
    {
      id: "USR-006",
      name: "Jennifer Martinez",
      email: "jennifer.martinez@greenwood.edu",
      role: "staff",
      department: "Student Center",
      status: "active",
      dateAdded: "2023-10-30",
    },
    {
      id: "USR-007",
      name: "David Thompson",
      email: "david.thompson@greenwood.edu",
      role: "student",
      department: "Computer Science",
      status: "active",
      dateAdded: "2023-11-15",
    },
  ]

  // Filter and sort users
  const filteredUsers = users.filter((userData) => {
    const matchesSearch =
      userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || userData.role === roleFilter
    const matchesStatus = statusFilter === "all" || userData.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "role":
        return a.role.localeCompare(b.role)
      case "department":
        return a.department.localeCompare(b.department)
      case "dateAdded":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
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

  const getRoleBadge = (role: UserData["role"]) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-800 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Admin
          </Badge>
        )
      case "staff":
        return (
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800 flex items-center gap-1">
            <UserCog className="h-3 w-3" />
            Staff
          </Badge>
        )
      case "student":
        return (
          <Badge
            variant="outline"
            className="border-emerald-200 bg-emerald-50 text-emerald-800 flex items-center gap-1"
          >
            <User className="h-3 w-3" />
            Student
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: UserData["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return (
          <Badge variant="outline" className="border-gray-200 bg-gray-50 text-gray-800">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
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
                  <p className="text-sm text-gray-600">Lost & Found System - Admin Portal</p>
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
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">User Management</h2>
              <p className="text-lg text-gray-600">Manage system users and their permissions.</p>
            </div>
            <Button className="bg-emerald-700 hover:bg-emerald-800">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Role</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <span>Sort By</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">By Name</SelectItem>
                    <SelectItem value="role">By Role</SelectItem>
                    <SelectItem value="department">By Department</SelectItem>
                    <SelectItem value="dateAdded">By Date Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedUsers.map((userData) => (
                    <TableRow key={userData.id}>
                      <TableCell className="font-medium">{userData.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {userData.email}
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(userData.role)}</TableCell>
                      <TableCell>{userData.department}</TableCell>
                      <TableCell>{getStatusBadge(userData.status)}</TableCell>
                      <TableCell>{formatDate(userData.dateAdded)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCog className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            {userData.status === "active" ? (
                              <DropdownMenuItem className="text-orange-600">
                                <User className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <User className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
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
