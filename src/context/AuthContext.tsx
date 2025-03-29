'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '../lib/api';
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
      // fetchUser(storedToken);
    }
  }, []);

  // const fetchUser = async (jwt: string) => {
  //   try {
  //     const userData = getUserProfile(jwt);
  //     setUser(userData);
  //   } catch (err) {
  //     console.error('Error user loading', err);
  //     logout();
  //   }
  // };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);

      signIn(data.token, data.id);
    } catch (err) {
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await registerUser(name, email, password);

      signIn(data.token, data.id);
    } catch (err: any) {
      throw err;
    }
  };

  const signIn = (token: string, profileId: string) => {
    setToken(token);
    localStorage.setItem('token', token);

    router.push(`/profile/${profileId}`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return <AuthContext.Provider value={{ user, token, login, logout, register }}>{children}</AuthContext.Provider>;
};
