import { getProfile, UserProfile } from '@/src/lib/api';
import { AVATAR_URL } from '@/src/lib/authAxios';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import './style.css';

interface ProfilePageParams {
  params: {
    id: string;
  };
}

export default async function Profile({ params }: ProfilePageParams) {
  const { id } = params;

  const user = await fetchUserProfile(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar-container">
          <img src={`${AVATAR_URL}/${user.avatar}`} alt="User Avatar" className="avatar" />
        </div>
        <h2 className="username">{user.name}</h2>
      </div>

      <div className="profile-bio">
        <p className="bio-text">{user.description}</p>
        <Link href="/profile/edit" className="edit-bio-btn">
          Редактировать профиль
        </Link>
      </div>

      <div className="profile-actions">
        <button className="add-book-btn">
          <span className="add-icon">+</span> Добавить книгу
        </button>
      </div>

      <div className="user-books">
        <h3 className="section-title">Мои книги</h3>
        <div className="books-list">
          <p className="empty-message">У вас пока нет добавленных книг</p>
        </div>
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
