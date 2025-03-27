import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface AuthResponse {
  token: string;
  id: string;
}

// interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
// }

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

// export const getProfile = async (id: string): Promise<AuthResponse> => {
//   try {
//     const res = await axios.get(`${API_URL}/profile/${id}`);

//     return res.data;
//   } catch (err: any) {
//     throw new Error('Auth error');
//   }
// };

export const registerUser = async (login: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await axios.post(`${API_URL}/user/register`, {
      login,
      email,
      password,
    });

    return res.data;
  } catch (err: any) {
    throw err;
  }
};
