import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { API_URL } from '../constants';
import { refreshAccessToken } from './api';

// Функция, создающая новый axios instance для каждого запроса
export async function createServerApi(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  });

  // Можно добавить обработку ошибок тут, если хочешь
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { accessToken: newAccessToken } = await refreshAccessToken(refreshToken);

          await cookieStore.set('accessToken', newAccessToken, { httpOnly: true, path: '/' });

          if (originalRequest.headers) {
            if (typeof originalRequest.headers.set === 'function') {
              (originalRequest.headers as any).set('Authorization', `Bearer ${newAccessToken}`);
            } else {
              (originalRequest.headers as any)['Authorization'] = `Bearer ${newAccessToken}`;
            }
          }

          return instance.request(originalRequest);
        } catch (refreshError) {
          await cookieStore.delete('accessToken');
          await cookieStore.delete('refreshToken');

          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          } else {
            throw new Error('Unauthorized: Redirect to /login');
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
}
