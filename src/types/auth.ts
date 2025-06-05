// src/types/auth.ts
export interface User {
  id: string;
  username: string;
  role: 'student' | 'staff' | 'admin';
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  username: string;
  password: string;
  role: 'student' | 'staff' | 'admin';
}