import { API_URL } from '@/src/constants';
import { UserProfile } from '../../types';
import api from '../clientApi';

export const getProfile = async (id: string): Promise<UserProfile> => {
  try {
    const res = await api.get(`${API_URL}/profile/${id}`);

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
