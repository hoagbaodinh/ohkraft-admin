import React from 'react';
import manIMG from '../../assets/man-ava.png';

const ChatMes = ({ message, owner }) => {
  return (
    <div className={`chatMessage ${owner ? 'owner' : ''}`}>
      {!owner ? (
        <div className="chatAva">
          <img className="w-100" src={manIMG} alt="ad ava" />
        </div>
      ) : (
        ''
      )}

      <span>{message.text}</span>
    </div>
  );
};

export default ChatMes;
