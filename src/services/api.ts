import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY!);
  if (token) {
    if (!config.headers) {
      config.headers = {} as InternalAxiosRequestConfig['headers'];
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;