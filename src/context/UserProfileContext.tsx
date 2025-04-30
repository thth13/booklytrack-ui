'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProfile } from '@/src/lib/api';
import Cookies from 'js-cookie';
import { UserProfile } from '../types';

interface UserProfileContextType {
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
}

export const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  refreshProfile: async () => {},
});

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async () => {
    const userId = Cookies.get('userId');

    if (userId) {
      const data = await getProfile(userId);
      setProfile(data);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, refreshProfile: fetchProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
