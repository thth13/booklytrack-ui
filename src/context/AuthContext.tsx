'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL, getUserProfile, loginUser } from '../lib/api';
import axios from 'axios';

interface AuthContextType {
  user: object | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (login: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  const fetchUser = async (jwt: string) => {
    try {
      const userData = getUserProfile(jwt);
      setUser(userData);
    } catch (err) {
      console.error('Error user loading', err);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      fetchUser(data.token);
      router.push('/');
    } catch (err) {
      console.error('Error login', err);
    }
  };

  const register = async (login: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/user/register`, {
        login,
        email,
        password,
      });

      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      fetchUser(res.data.token);
      router.push('/');
    } catch (err: any) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return <AuthContext.Provider value={{ user, token, login, logout, register }}>{children}</AuthContext.Provider>;
};
