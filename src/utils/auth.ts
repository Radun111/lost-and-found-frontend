// Mock authentication functions

interface User {
  id: string
  name: string
  email: string
  role: "student" | "staff" | "admin"
}

// Mock user database
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@greenwood.edu",
    password: "password123",
    role: "admin",
  },
  {
    id: "2",
    name: "Staff User",
    email: "staff@greenwood.edu",
    password: "password123",
    role: "staff",
  },
  {
    id: "3",
    name: "Student User",
    email: "student@greenwood.edu",
    password: "password123",
    role: "student",
  },
]

export const login = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (!user) {
    throw new Error("Invalid email or password")
  }

  // Don't return the password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

export const logout = async (): Promise<void> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  // In a real app, this would clear the session/token
  return
}

export const register = async (name: string, email: string, password: string): Promise<User | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Check if user already exists
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("User with this email already exists")
  }

  // In a real app, this would create a new user in the database
  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password,
    role: "student" as const, // New users are students by default
  }

  // Don't return the password
  const { password: _, ...userWithoutPassword } = newUser
  return userWithoutPassword as User
}
