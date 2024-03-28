import React from 'react';
import manIMG from '../../assets/man-ava.png';

const ChatRoom = ({ room, onGetCurrentSession }) => {
  const handleClick = () => {
    localStorage.setItem('room', JSON.stringify(room));
    onGetCurrentSession(room);
  };

  return (
    <div className="chatRoom" onClick={handleClick}>
      <img src={manIMG} alt="" />
      <span>{room.members.userId}</span>
    </div>
  );
};

export default ChatRoom;
