'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProfile } from '@/src/lib/api';
import Cookies from 'js-cookie';
import { UserProfile } from '../types';

interface UserProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

export const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const userId = Cookies.get('userId');
      if (userId) {
        const data = await getProfile(userId);
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch {
      setProfile(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, loading, refreshProfile: fetchProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
