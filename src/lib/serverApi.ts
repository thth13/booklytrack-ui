import axios, { AxiosInstance } from 'axios';
import { cookies } from 'next/headers';
import { API_URL } from '../constants';

// Функция, создающая новый axios instance для каждого запроса
export async function createServerApi(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  });

  // Можно добавить обработку ошибок тут, если хочешь
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Server API error:', error);
      return Promise.reject(error);
    },
  );

  return instance;
}
