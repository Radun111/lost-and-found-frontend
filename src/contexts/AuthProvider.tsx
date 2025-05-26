import { useState } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem(process.env.REACT_APP_TOKEN_KEY!, response.data.token);
    setUser(response.data.user);
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