import React from 'react';
import ChatRoom from './ChatRoom';
import { useState, useEffect } from 'react';

const ChatRooms = ({ sessions, onGetCurrentSession, loading }) => {
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === '') {
      setFilteredSessions(sessions);
    } else {
      const filteredData = sessions.filter((item) => {
        return item.members.userId.trim().includes(search);
      });
      setFilteredSessions(filteredData);
    }
  }, [search, sessions]);

  return (
    <div className="chatRooms">
      <input
        type="text"
        className="chatSearch"
        placeholder="Search Contact"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="chatRoomsContainer">
        {loading ? (
          'Loading...'
        ) : (
          <>
            {filteredSessions.map((s) => (
              <ChatRoom
                room={s}
                key={s._id}
                onGetCurrentSession={onGetCurrentSession}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatRooms;
