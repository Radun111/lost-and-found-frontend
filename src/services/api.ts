import axios from 'axios';
import { refreshToken } from './authService';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000, // 15s timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Auto-refresh token on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { token } = await refreshToken();
        localStorage.setItem('token', token);
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login?session=expired';
        return Promise.reject(refreshError);
      }
    }
    
    // Standard error handling
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;