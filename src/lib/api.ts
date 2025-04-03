import { api } from './authAxios';
import { API_URL } from './authAxios';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  description: string;
  views: number;
  following: number;
  followers: number;
  read: number;
  reads: number;
  wantsToRead: number;
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

export const getProfile = async (id: string): Promise<UserProfile> => {
  try {
    const res = await api.get(`${API_URL}/profile/${id}`);

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    const res = await api.post(`${API_URL}/user/refresh-access-token'`, {
      refreshToken,
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await api.post(`${API_URL}/user/register`, {
      name,
      email,
      password,
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};
