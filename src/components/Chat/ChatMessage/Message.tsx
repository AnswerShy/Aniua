import { UserIcon } from '@/utils/icons';
import { Typography } from '../../UI/UIComponents';
import style from './Message.module.css';
import Image from 'next/image';
import React from 'react';

interface MessageProps {
  photo: string | null;
  username: string;
  msgContent: string;
  type?: 'small' | 'big';
}

const Message = React.memo(function Message({
  photo,
  username,
  msgContent,
  type = 'big',
}: MessageProps) {
  return type == 'big' ? (
    <div className={style.message}>
      {photo ? (
        <Image
          src={photo}
          className={style.photo}
          width={50}
          height={50}
          objectFit="cover"
          alt="profile picture"
        ></Image>
      ) : (
        <UserIcon />
      )}

      <div className={style.messageContainer}>
        <Typography variant="h4">{username}</Typography>
        <Typography variant="p" classname="tracking-tight text-white w-full">
          {msgContent}
        </Typography>
      </div>
    </div>
  ) : (
    <div className={style.message}>
      <div className={style.messageContainerSmall}>
        <Typography variant="h4">{username}</Typography>
        <Typography variant="p" classname="tracking-tight text-white w-full">
          {msgContent}
        </Typography>
      </div>
    </div>
  );
});

export default Message;
