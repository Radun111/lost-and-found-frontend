import { useState, createContext, useContext, ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Add this line

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem(process.env.REACT_APP_TOKEN_KEY!, response.data.token);
      setUser(response.data.user); // Now this will work
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY!);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};