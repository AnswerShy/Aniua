import Message from '../Message/Message';
import style from './Chat.module.css';

function Chat() {
  return (
    <div className={style.chat + ` layer1`}>
      <div className={style.messagesContainer}>
        <Message
          photo="https://cdn.aniua.vip/images/monogatari-series-off--monster-season/characters/12_10RZHwXWMW3_110.webp"
          username="Kirill"
          msgContent="hi"
        />
        <Message
          photo="https://cdn.aniua.vip/images/monogatari-series-off--monster-season/characters/12_10RZHwXWMW3_110.webp"
          username="NotKirill"
          msgContent="he will die rn"
        />
        <Message
          photo="https://cdn.aniua.vip/images/monogatari-series-off--monster-season/characters/12_10RZHwXWMW3_110.webp"
          username="Eugenue"
          msgContent="cringe"
        />
        <Message
          photo="https://cdn.aniua.vip/images/monogatari-series-off--monster-season/characters/12_10RZHwXWMW3_110.webp"
          username="asdsad"
          msgContent="fuck you"
        />
      </div>
      <div className={style.messageInputContainer}>
        <input placeholder="Enter message" type="text" className={style.messageInput} />
      </div>
    </div>
  );
}

export default Chat;
