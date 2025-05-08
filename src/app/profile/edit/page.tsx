'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { editProfile, getProfile } from '@/src/lib/api';
import { AVATAR_URL } from '@/src/constants';
import Image from 'next/image';

export interface ProfileFormData {
  name: string;
  description: string;
  avatar: string;
}

interface ValidationErrors {
  name?: string;
  description?: string;
  avatar?: string;
  server?: string;
}

const EditProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    description: '',
    avatar: '',
  });
  const [avatarFile, setAvatarFile] = useState<File>();
  const [userId] = useState<string>(Cookies.get('userId') || '');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name as keyof ValidationErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    // setLoading(true);

    try {
      const serverFormData = new FormData();
      serverFormData.append('name', formData.name);
      serverFormData.append('description', formData.description);
      if (avatarFile) {
        serverFormData.append('avatar', avatarFile);
      }

      await editProfile(userId, serverFormData);
      router.push(`/profile/${userId}`);
    } catch (error: any) {
      const serverErrors = error.response.data;

      setErrors(serverErrors);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(userId);
        setFormData({
          name: profile.name,
          description: profile.description,
          avatar: profile.avatar,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <div className="profile-edit-container">
      <h1 className="profile-edit-title">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input form-textarea"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="avatar" className="form-label">
            Avatar Image
          </label>
          <label htmlFor="avatar" className="upload-avatar-btn">
            Upload Avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="form-input visually-hidden"
          />
          {formData.avatar && (
            <div className="avatar-preview">
              <Image
                width={100}
                height={100}
                src={formData.avatar.startsWith('data:') ? formData.avatar : `${AVATAR_URL}/${formData.avatar}`}
                alt="Avatar preview"
                className="avatar-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
                }}
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="back-button" onClick={() => router.push('/')}>
            Back to profile
          </button>
          <button type="submit" className="submit-button">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
