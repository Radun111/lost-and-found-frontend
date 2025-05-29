import api from './api';
import { User } from '../types/auth';


interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number; // in seconds
}

export const login = async (
  username: string, 
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { 
      username, 
      password 
    });
    return {
      token: response.data.token,
      user: response.data.user,
      expiresIn: response.data.expiresIn || 3600 // default 1 hour
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const refreshToken = async (): Promise<{ token: string }> => {
  const response = await api.post('/auth/refresh');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const register = async (userData: {
  username: string;
  password: string;
  role: string;
}): Promise<void> => {
  await api.post('/auth/register', {
    ...userData,
    password: await hashPassword(userData.password) // Add hashing
  });
};

// Helper function (add to new utils/auth.ts)
const hashPassword = async (password: string): Promise<string> => {
  // Implement bcrypt or similar hashing
};

