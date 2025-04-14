import { Typography } from '../../UI/UIComponents';
import style from './Message.module.css';
import Image from 'next/image';

interface MessageProps {
  photo: string;
  username: string;
  msgContent: string;
}

function Message({ photo, username, msgContent }: MessageProps) {
  return (
    <div className={style.message}>
      <Image
        src={photo}
        className={style.photo}
        width={50}
        height={50}
        objectFit="cover"
        alt="profile picture"
      ></Image>
      <div className={style.messageContainer}>
        <Typography variant="h4">{username}</Typography>
        <Typography variant="h3" classname="tracking-tight text-white w-full">
          {msgContent}
        </Typography>
      </div>
    </div>
  );
}

export default Message;
