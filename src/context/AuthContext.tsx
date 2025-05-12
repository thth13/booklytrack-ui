'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { loginUser, registerUser } from '../lib/api';
import { api } from '../lib/clientAxios';
import { useUserProfile } from './UserProfileContext';

interface AuthContextType {
  userId: string;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userId: '',
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();
  const { refreshProfile } = useUserProfile();

  useEffect(() => {
    const cookiesUserId = Cookies.get('userId');
    if (cookiesUserId && !userId) {
      setUserId(cookiesUserId);
    }
  }, [userId]);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);

      signIn(data);
    } catch (err) {
      throw err;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const data = await registerUser(email, password);

      signIn(data);
    } catch (err: any) {
      throw err;
    }
  };

  const signIn = (userData: any) => {
    const { id, accessToken, refreshToken } = userData;

    Cookies.set('accessToken', accessToken, { path: '/' });
    Cookies.set('refreshToken', refreshToken, { path: '/' });
    Cookies.set('userId', id, { path: '/' });

    refreshProfile();

    router.push(`/profile/${id}`);
  };

  const logout = () => {
    setUserId('');

    const cookiesToRemove = ['accessToken', 'refreshToken', 'userId'];
    cookiesToRemove.forEach((cookie) => Cookies.remove(cookie, { path: '/' }));

    api.defaults.headers.common['Authorization'] = '';

    router.push('/');
  };

  return <AuthContext.Provider value={{ userId, login, logout, register }}>{children}</AuthContext.Provider>;
};
