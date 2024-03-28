import React, { useState, useEffect, useRef } from 'react';
import './chat.scss';
import openSocket from 'socket.io-client';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatMessage from '../../components/chat/ChatMes';
import useFetch from '../../hooks/useFetch';
import { Suspense } from 'react';
const ChatRooms = React.lazy(() => import('../../components/chat/ChatRooms'));

const socket = openSocket(process.env.REACT_APP_API);
const ChatPage = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const { data, loading, reFetch } = useFetch('session/all-sessions');

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const scrollRef = useRef();

  socket.emit('addUser', { userId: user?._id, role: 'consultant' });

  // Listen socket getMessage
  useEffect(() => {
    socket.once('getMessage', (data) => {
      setArrivalMessage({
        isConsultant: data.isConsultant,
        sessionId: data.sessionId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    socket.once('getSession', () => {
      reFetch('session/all-sessions');
    });
  }, [reFetch]);

  // Sau khi co duoc tin nhan den thi dua vao array messages
  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.sessionId === currentSession?._id &&
      !arrivalMessage.isConsultant &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentSession]);

  // Fetch du lieu tat ca cac session hien co
  useEffect(() => {
    setSessions(data);
  }, [data]);

  // Lay tat ca message voi currentSession
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/message/` + currentSession._id
        );

        setMessages(data);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          return;
        }
      }
    };
    currentSession && getMessages();
    if (!sessions.find((s) => s._id === currentSession?._id)) {
      setCurrentSession(null);
    }
  }, [currentSession, sessions]);

  const onGetCurrentSession = (curSession) => {
    setCurrentSession(curSession);
  };

  // Function gui message
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Tao objec message
    const message = {
      isConsultant: true,
      text: newMessage,
      sessionId: currentSession._id,
    };

    // Emit lenh sendMessage len server
    socket.emit('sendMessage', {
      receiverId: currentSession.members.userId,
      text: newMessage,
      from: 'consultant',
    });

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/message/create`,
        message
      );

      setMessages((prevState) => {
        return [...prevState, data];
      });
      setNewMessage('');
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        return;
      }
    }
  };

  // Tu dong scroll den tin nhan moi nhat
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <h3 className="chatTitle">Chat</h3>
      <p className="breadcrumb">
        Apps <span>/</span> Chat
      </p>

      <div className="chatContent">
        <Suspense fallback={<div>Loading...</div>}>
          <ChatRooms
            onGetCurrentSession={onGetCurrentSession}
            sessions={sessions}
            loading={loading}
          />
        </Suspense>
        <div className="chatConversation">
          {currentSession ? (
            <>
              <div className="chatBox">
                {messages.map((m) => (
                  <div ref={scrollRef} key={m._id || m.createdAt}>
                    <ChatMessage message={m} owner={m?.isConsultant} />
                  </div>
                ))}
              </div>
              <div className="chatBottom">
                <input
                  type="text"
                  placeholder="Types and enter"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </>
          ) : (
            <p className="noRoomText">Choose room to start chat</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
