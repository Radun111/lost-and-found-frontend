import type React from "react"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom" 
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "../ui/sidebar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { LayoutDashboard, ClipboardList, Users, Bell, User, LogOut, Settings, HelpCircle, Search } from "lucide-react"
import { Badge } from "../ui/badge"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation() // Replaced usePathname
  const pathname = location.pathname
  const [userRole, setUserRole] = useState<"admin" | "staff">("admin")
  const [cookieState, setCookieState] = useState<boolean | undefined>(undefined)
  // Read sidebar state from cookie on mount
  useEffect(() => {
    const sidebarCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar:state="))
      ?.split("=")[1]

    setCookieState(sidebarCookie === "true")
  }, [])

  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@greenwood.edu",
    role: userRole,
    avatar: "/placeholder.svg?height=32&width=32",
  }

  // Only render once we've checked the cookie
  if (cookieState === undefined) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={cookieState}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar variant="inset" collapsible={true}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-emerald-700">Greenwood University</h1>
                <p className="text-xs text-gray-500">Lost and Found - Staff Portal</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"} tooltip="Dashboard">
                  <Link to="/admin/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/requests"} tooltip="Requests">
                  <Link to="/admin/requests">
                    <ClipboardList className="h-4 w-4" />
                    <span>Requests</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {userRole === "admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/users"} tooltip="Users">
                    <Link to="/admin/users">
                      <Users className="h-4 w-4" />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>

            <SidebarSeparator />

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link to ="#">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Help">
                  <Link to ="#">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold md:hidden">
                {pathname === "/admin/dashboard" && "Dashboard"}
                {pathname === "/admin/requests" && "Requests"}
                {pathname === "/admin/users" && "Users"}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-emerald-600 p-0">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="hidden md:inline-block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setUserRole(userRole === "admin" ? "staff" : "admin")}
                    className="text-blue-600"
                  >
                    Switch to {userRole === "admin" ? "Staff" : "Admin"} View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
