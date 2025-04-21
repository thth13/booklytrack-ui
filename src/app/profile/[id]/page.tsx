import { getProfile, UserProfile } from '@/src/lib/api';
import { AVATAR_URL } from '@/src/lib/authAxios';
import { notFound } from 'next/navigation';
import noAvatar from '@/public/noAvatar.png';
import Link from 'next/link';
import './style.css';
import UserBooks from '../../../components/UserBooks';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { cookies } from 'next/headers';

interface ProfilePageParams {
  params: {
    id: string;
  };
}

export default async function Profile({ params }: ProfilePageParams) {
  const { id } = params;

  // Получаем userId из cookies на сервере
  const cookieStore = await cookies();
  const myUserId = cookieStore.get('userId')?.value;

  const isMyProfile = myUserId === id;

  const user = await fetchUserProfile(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src={user.avatar ? `${AVATAR_URL}/${user.avatar}` : noAvatar.src}
            alt="User Avatar"
            className="avatar"
            width={150}
            height={150}
          />
        </div>
        <h2 className="username">{user.name}</h2>
      </div>

      {isMyProfile && (
        <div className="profile-bio">
          <p className="bio-text">{user.description}</p>
          <Link href="/profile/edit" className="edit-bio-btn">
            Edit profile
          </Link>
        </div>
      )}

      {isMyProfile && (
        <div className="profile-actions">
          <Link href="/books" className="add-book-btn">
            <span className="add-icon">+</span> Add book
          </Link>
        </div>
      )}

      <UserBooks books={user.read} />
    </div>
  );
}

async function fetchUserProfile(id: string): Promise<UserProfile | null> {
  try {
    const data = await getProfile(id);

    return data;
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
    return null;
  }
}
