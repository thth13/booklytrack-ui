'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { loginUser, registerUser } from '../lib/api';
import { api } from '../lib/clientAxios';
import { useUserProfile } from './UserProfileContext';

interface AuthContextType {
  userId: string;
  authUser: (email: string, password: string, isLogin: boolean) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userId: '',
  authUser: async () => {},
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

  const authUser = async (email: string, password: string, isLogin: boolean) => {
    try {
      let data;

      if (isLogin) {
        data = await loginUser(email, password);
      } else {
        data = await registerUser(email, password);
      }

      signIn(data);
    } catch (err) {
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

  return <AuthContext.Provider value={{ userId, authUser, logout }}>{children}</AuthContext.Provider>;
};
