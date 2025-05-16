import { API_URL } from '@/src/constants';
import { api } from '../clientAxios';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await api.post(`${API_URL}/user/login`, {
      email,
      password,
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const googleLoginUser = async (token: string): Promise<AuthResponse> => {
  try {
    const res = await api.post(`${API_URL}/user/google`, {
      token,
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await api.post(`${API_URL}/user/register`, {
      email,
      password,
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    const res = await api.post(`${API_URL}/user/refresh-access-token`, {
      refreshToken,
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};
