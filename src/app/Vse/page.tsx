'use client';

import { Card, CustomButton, Dropdown } from '@/components/UI/UIComponents';
import { paths } from '@/constants/headersconst';
import { useState } from 'react';
// import FetchServiceInstance from '../api';
import style from '@/components/Chat/Chat.module.css';
import { Message } from '@/components/IndexComponent';
export default function Vse() {
  const [currentPath, setCurrentPath] = useState('nowhere');
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <CustomButton onClick={() => console.log('Hello World')}>Button</CustomButton>
        <Dropdown currentState={currentPath}>
          {Object.entries(paths).map((path, index) => {
            console.log(path);
            return (
              <Dropdown.optionAction
                key={index}
                handleOptionSelectAction={() => {
                  setCurrentPath(path[1]);
                  console.log(path[0]);
                }}
                state={path[0]}
              />
            );
          })}
        </Dropdown>
        {/* <ListPage /> */}
        <div className={style.chat + ` layer1`}>
          <div className={style.messagesContainer}>
            <Message photo={'ss'} username={'frnj'} msgContent="Hello" />
          </div>
          <div className={style.messageInputContainer}>
            <input placeholder="Enter message" type="text" value={'hello'} className={style.messageInput} onChange={(e) => console.log(e.target.value)} />
            <button>Send</button>
          </div>
        </div>
        <br />
        <Card variant="horizontal" image="https://cdn.aniua.vip/images/naruto/posters/naruto_fVfvpBoxbAWrSE_3347.webp" title="title" slug="naruto" additional={{ year: 1990, genres: [{ title: 'Івопа', slug: 'asdw' }] }} />
      </div>
    </>
  );
}

// const ListPage = async () => {
//   const anime = await FetchServiceInstance.fetchAnimeList();
//   return (
//     <>
//       {anime.map((el: AnimeDataInterface, index: number) => (
//         <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
//       ))}
//     </>
//   );
// };
