
import { useState } from "react"
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  ClipboardList,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  BookOpen,
  Backpack,
  Key,
  Laptop,
  Headphones,
  Wallet,
  Glasses,
} from "lucide-react"

export default function AdminDashboard() {
  const [userRole, setUserRole] = useState<"admin" | "staff">("admin") // Default to admin for demo

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome to the Lost and Found Staff Portal.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Link to="/admin/requests">
                <Button variant="ghost" size="sm" className="gap-1 text-emerald-700">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Latest updates from the Lost and Found system</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0 divide-y">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{activity.item}</p>
                      <Badge
                        variant="outline"
                        className={`
                          ${activity.status === "pending" ? "border-yellow-200 bg-yellow-50 text-yellow-800" : ""}
                          ${activity.status === "matched" ? "border-blue-200 bg-blue-50 text-blue-800" : ""}
                          ${activity.status === "resolved" ? "border-green-200 bg-green-50 text-green-800" : ""}
                          ${activity.status === "cancelled" ? "border-gray-200 bg-gray-50 text-gray-800" : ""}
                        `}
                      >
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>
                        {activity.type === "new_report" && "Reported by"}
                        {activity.type === "matched" && "Matched for"}
                        {activity.type === "resolved" && "Resolved for"}
                        {activity.type === "cancelled" && "Cancelled by"}
                      </span>
                      <span className="font-medium">{activity.user}</span>
                      <span>• {activity.timestamp}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 p-3">
            <div className="flex w-full items-center justify-between text-sm text-gray-500">
              <span>Showing 5 of {stats.totalRequests} requests</span>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                Refresh
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Quick Actions and Categories */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-auto flex-col items-center justify-center gap-2 bg-emerald-700 py-4 hover:bg-emerald-800">
                <ClipboardList className="h-5 w-5" />
                <span>Review Requests</span>
              </Button>
              <Button
                className="h-auto flex-col items-center justify-center gap-2 bg-blue-600 py-4 hover:bg-blue-700"
                variant="secondary"
              >
                <FileText className="h-5 w-5" />
                <span>Generate Report</span>
              </Button>
              {userRole === "admin" && (
                <Button
                  className="h-auto flex-col items-center justify-center gap-2 bg-purple-600 py-4 hover:bg-purple-700"
                  variant="secondary"
                >
                  <Users className="h-5 w-5" />
                  <span>Manage Users</span>
                </Button>
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

          <CardHeader className="border-t pt-6">
            <CardTitle>Item Categories</CardTitle>
            <CardDescription>Distribution of lost items by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(0, 6).map((category) => (
                <div key={category.name} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                  <div className={`rounded-md p-2 ${category.color}`}>
                    <category.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.count} items</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Content */}
      <Tabs defaultValue="pending">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Request Overview</h2>
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="matched">Matched</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Requests awaiting review and processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-yellow-100 p-2">
                        <Clock className="h-5 w-5 text-yellow-700" />
                      </div>
                      <div>
                        <p className="font-medium">Lost {["iPhone 12", "Textbook", "Water Bottle"][i]}</p>
                        <p className="text-sm text-gray-500">Submitted {["2 hours", "5 hours", "1 day"][i]} ago</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 flex justify-between">
              <p className="text-sm text-gray-500">Showing 3 of {stats.pendingRequests} pending requests</p>
              <Button variant="link" className="text-emerald-700">
                View All Pending
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="matched" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Matched Requests</CardTitle>
              <CardDescription>Requests with potential matches found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2">
                        <AlertCircle className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium">Matched {["Laptop", "Student ID"][i]}</p>
                        <p className="text-sm text-gray-500">Matched {["1 day", "3 days"][i]} ago</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Verify
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 flex justify-between">
              <p className="text-sm text-gray-500">Showing 2 of {stats.matchedRequests} matched requests</p>
              <Button variant="link" className="text-blue-600">
                View All Matched
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Requests</CardTitle>
              <CardDescription>Successfully completed requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <CheckCircle className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium">Resolved {["Backpack", "Wallet", "Headphones"][i]}</p>
                        <p className="text-sm text-gray-500">Resolved {["2 days", "1 week", "2 weeks"][i]} ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 flex justify-between">
              <p className="text-sm text-gray-500">Showing 3 of {stats.resolvedRequests} resolved requests</p>
              <Button variant="link" className="text-green-600">
                View All Resolved
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
