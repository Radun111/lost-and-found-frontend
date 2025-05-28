import { createContext, useContext, ReactNode, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  username: string;
  role: 'student' | 'staff' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    username: string;
    password: string;
    role: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData: {
    username: string;
    password: string;
    role: string;
  }) => {
    await api.post('/auth/register', userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};