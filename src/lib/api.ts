import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface AuthResponse {
  token: string;
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
    const res = await axios.post(`${API_URL}/user/login`, {
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
    const res = await axios.get(`${API_URL}/profile/${id}`);

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await axios.post(`${API_URL}/user/register`, {
      name,
      email,
      password,
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};
