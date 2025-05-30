import Link from '@/src/components/Link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from '@/src/types';
import { AVATAR_URL } from '@/src/constants';
import noAvatar from '@/public/noAvatar.png';

interface ProfileCardProps {
  isMyProfile: boolean;
  user: UserProfile;
}

const ProfileCard = ({ isMyProfile, user }: ProfileCardProps) => (
  <section id="profile-card" className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
    <div className="text-center">
      <Image
        width={240}
        height={240}
        src={user.avatar ? `${AVATAR_URL}/${user.avatar}` : noAvatar.src}
        alt="Profile"
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-4 border-4 border-gray-100"
      />
      <div className="flex items-center justify-center gap-2 mb-1">
        <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-0">{user.name}</h2>
      </div>
      <p className="text-sm sm:text-base text-gray-500 mt-1">{user.description}</p>
      {isMyProfile && (
        <Link
          href="/profile/edit"
          className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-blue-700 mt-4 inline-flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
          Edit Profile
        </Link>
      )}
      <div className="mt-6 flex flex-row sm:grid sm:grid-cols-3 gap-4 text-center">
        <Link href={`/profile/${user.user}/reading`} className="flex-1 p-2 rounded-lg bg-blue-50">
          <div className="text-xl sm:text-2xl font-medium text-blue-600">{user.reading?.length ?? 0}</div>
          <div className="text-xs text-gray-600">Reading</div>
        </Link>
        <Link href={`/profile/${user.user}/finished`} className="flex-1 p-2 rounded-lg bg-green-50">
          <div className="text-xl sm:text-2xl font-medium text-green-600">{user.finished?.length ?? 0}</div>
          <div className="text-xs text-gray-600">Finished</div>
        </Link>
        <Link href={`/profile/${user.user}/wants-to-read`} className="flex-1 p-2 rounded-lg bg-purple-50">
          <div className="text-xl sm:text-2xl font-medium text-purple-600">{user.wantsToRead?.length ?? 0}</div>
          <div className="text-xs text-gray-600">Wishlist</div>
        </Link>
      </div>
    </div>
  </section>
);

export default ProfileCard;
