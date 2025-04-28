import { notFound } from 'next/navigation';
import noAvatar from '@/public/noAvatar.png';
import Link from 'next/link';
import './style.css';
import { cookies } from 'next/headers';
import { UserProfile } from '@/src/types';
import { AVATAR_URL } from '@/src/constants';
import { getProfile } from '@/src/lib/api';

interface ProfilePageParams {
  params: {
    id: string;
  };
}

export default async function Profile(props: ProfilePageParams) {
  const { params } = props;
  const { id } = await params;

  // Get userId from cookies on the server
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

      <div className="profile-stats-wide">
        <Link href={`/profile/${id}/reading`} className="profile-stat-block-link">
          <span className="profile-stat-title">Reading</span>
          <span className="profile-stat-value">{user.reading?.length ?? 0}</span>
        </Link>
        <Link href={`/profile/${id}/finished`} className="profile-stat-block-link">
          <span className="profile-stat-title">Finished</span>
          <span className="profile-stat-value">{user.finished?.length ?? 0}</span>
        </Link>
        <Link href={`/profile/${id}/wants-to-read`} className="profile-stat-block-link">
          <span className="profile-stat-title">Wants to read</span>
          <span className="profile-stat-value">{user.wantsToRead?.length ?? 0}</span>
        </Link>
      </div>
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
