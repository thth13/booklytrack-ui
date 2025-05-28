'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { editProfile, getProfile } from '@/src/lib/api';
import { AVATAR_URL } from '@/src/constants';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

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
          name: profile.name || '',
          description: profile.description || '',
          avatar: profile.avatar || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-15 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8">
          <section id="edit-profile" className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} id="profile-edit-form" className="space-y-6">
                <div id="avatar-section" className="text-center mb-8">
                  <div className="relative inline-block">
                    <Image
                      width={100}
                      height={100}
                      src={formData.avatar.startsWith('data:') ? formData.avatar : `${AVATAR_URL}/${formData.avatar}`}
                      alt="Current Avatar"
                      className="w-32 h-32 rounded-full border-4 border-indigo-100 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
                      }}
                    />
                    <label
                      htmlFor="avatar"
                      className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faCamera} />
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div id="contact-info" className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* <div id="contact-info" className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value="alexander.mitchell@example.com"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div> */}

                <div id="bio-section" className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Book enthusiast | AI & Technology lover
                  </textarea>
                </div>

                <div id="action-buttons" className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <i className="fa-solid fa-save mr-2"></i>
                    Save Changes
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    type="button"
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;
