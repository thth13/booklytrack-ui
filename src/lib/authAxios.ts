import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { refreshAccessToken } from './api';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const refreshToken = Cookies.get('refreshToken');

    if (refreshToken && error.response?.status === 401) {
      try {
        const { accessToken } = await refreshAccessToken(refreshToken);
        Cookies.set('accessToken', accessToken);

        if (error.config) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return api.request(error.config);
        }
      } catch (refreshError) {
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });
        // Add redirect after removing tokens
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);
