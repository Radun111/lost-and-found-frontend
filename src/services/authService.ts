import api from './api';
import { LoginResponse } from '../types/auth';

export const login = (username: string, password: string) => {
  return api.post<LoginResponse>('/auth/login', { username, password });
};

export const register = (userData: {
  username: string;
  password: string;
  role: string;
}) => {
  return api.post('/auth/register', userData);
};