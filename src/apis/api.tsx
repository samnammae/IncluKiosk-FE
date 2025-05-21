import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ADDRESS
    ? `${import.meta.env.VITE_SERVER_ADDRESS}/api`
    : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
