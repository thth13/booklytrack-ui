import axios from 'axios';
import { api, GOOGLE_BOOKS_API } from './authAxios';
import { API_URL } from './authAxios';
import { ReadCategory, UserProfile } from '../types';

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

export const editProfile = async (id: string, profile: FormData): Promise<UserProfile> => {
  try {
    const res = await api.put(`${API_URL}/profile/${id}`, profile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export async function addBookToUserLibrary(
  book: any,
  userId: string,
  readCategory: ReadCategory,
  oldCategory?: ReadCategory,
) {
  try {
    const res = await api.post(`${API_URL}/profile/add-read-book`, {
      readCategory,
      userId,
      book,
      oldCategory,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getBookById(id: string) {
  try {
    const res = await axios.get(`${GOOGLE_BOOKS_API}/${id}/?key=AIzaSyC9nLTd3paExG1qsub80hlslKc3aydWJhw`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function searchBooks(query: string) {
  const res = await axios.get(
    `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&key=AIzaSyC9nLTd3paExG1qsub80hlslKc3aydWJhw`,
  );

  return res.data.items || [];
}

export async function getReadBooks(userId: string, readCategory: ReadCategory) {
  try {
    const res = await api.get(`${API_URL}/profile/get-read-books/${userId}/${readCategory}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
