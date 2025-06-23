'use client';

import { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useUserStore } from '@/stores/user-profile-store';

import Message from './ChatMessage/Message';
import style from './Chat.module.css';
import { TextField } from '../UI/UIComponents';
import { i18n } from '@/utils/customUtils';

function Chat() {
  const socket = useSocket();
  const containerRef = useRef<HTMLDivElement>(null);
  const userStoredData = useUserStore((state) => state.user);
  const [messages, setMessages] = useState<
    { username: string; avatar: string | null; message: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log('Chat component socket:', socket.id);

    socket.on(
      'chat_message',
      (data: { command: string; additional?: string; username: string; avatar: string }) => {
        if (data.command === 'chat_message') {
          setMessages((prev) => [
            ...prev,
            { username: data.username, avatar: data.avatar, message: data.additional || '' },
          ]);
        }
      },
    );

    return () => {
      socket.off('chat_message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.length < 1) return;

    const username = userStoredData.username || 'Unknown User';
    const avatar = userStoredData.avatar || null;

    socket.emit('chat_message', {
      command: 'chat_message',
      additional: newMessage,
      username: username,
      avatar: avatar,
    });

    setMessages((prev) => [...prev, { username, avatar, message: newMessage }]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const singleMessageHeight = children[0].getBoundingClientRect().height;

    const shouldOffset = messages.length <= 5;

    if (shouldOffset) {
      const totalMessagesHeight = singleMessageHeight * messages.length;
      const paddingTop = Math.max(0, 525 - totalMessagesHeight);
      container.style.paddingTop = `${paddingTop}px`;
    } else {
      container.style.paddingTop = '0px';
    }

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div className={style.chat + ` layer1`}>
      <div className={style.messagesContainer} ref={containerRef} style={{ paddingTop: '525px' }}>
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            username={msg.username}
            msgContent={msg.message}
            photo={msg.avatar}
            type="big"
          />
        ))}
      </div>
      <div className={style.messageInputContainer}>
        <TextField
          placeholder="Enter message"
          type="text"
          label={i18n.t(`chat.enterMessage`)}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>{i18n.t(`chat.send`)}</button>
      </div>
    </div>
  );
}

export default Chat;
