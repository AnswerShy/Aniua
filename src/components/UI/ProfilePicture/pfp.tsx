import { UserIcon } from '@/utils/icons';
import Image from 'next/image';

const ProfilePicture = ({ avatar }: { avatar?: string }) => {
  return (
    <div className="size-10 relative flex rounded-xl">
      {avatar ? (
        <div className="size-full relative">
          <Image
            src={avatar}
            className="size-full rounded-xl"
            fill
            objectFit="cover"
            alt="profile picture"
          ></Image>
        </div>
      ) : (
        <div className="size-full flex items-center justify-center bg-transparent01dp rounded-xl">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
