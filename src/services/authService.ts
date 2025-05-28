import api from './api';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: 'student' | 'staff' | 'admin';
  };
}

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