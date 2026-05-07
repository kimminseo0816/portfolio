import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { ref, set, onValue } from "firebase/database";
import {v4 as uuidv4} from 'uuid'
import MessageModal from "./MessageModal";

import { database } from "../firebase";
import { useSocketInitialize } from "../hooks/useSocketInitialize";
import { useChattingInitialize } from "../hooks/useChattingInitialize";
import { SingleChat } from "../components/SingleChat";
import { useMessageQuery } from "../queries";

import { useNavigate } from 'react-router-dom'

const Chat = ({ user, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState(null); // WebSocket connection state

  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const navigate = useNavigate();

  const openModal = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setShowModal(false);
  };
  
  const handleGoBack = () => {
    // Implement the logic to go back to the previous screen
    // For example, you can use react-router-dom or any navigation method you are using
    // navigate(-1);
  };

  const chatContainerRef = useRef(null);

  const { data, isLoading, isError } = useMessageQuery(roomId);
  useSocketInitialize({ roomId, setWs, setMessages });
  //useChattingInitialize({ roomId, setMessages });
  
  useEffect(() => {
    if (data) {
      console.log("Data from Firebase:", data);
      setMessages(Object.values(data).reverse());
    }
  }, [data]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendLike = (messageId) => {
    const likeData = {
      type: "like",
      messageId,
      userId: user.uid,
    };
    ws.send(JSON.stringify(likeData));
  };

  const handleLike = (messageId) => {
    if (user.uid) {
      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === messageId) {
            const likes = message.likes || [];
            const updatedLikes = likes.includes(user.uid)
              ? likes.filter((id) => id !== user.uid)
              : [...likes, user.uid];
  
            return { ...message, likes: updatedLikes };
          }
          return message;
        })
      );
    } else {
      window.alert("로그인 후 좋아요를 누를 수 있습니다.");
    }
  };  

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      // Assuming the user is already authenticated through some means (e.g., you pass the 'user' object from the parent component)
      if (user.uid !== null || user.uid == null) {
        // Send the new message to the WebSocket server
        const message = {
          id: uuidv4(),
          text: newMessage,
          timestamp: Date.now(),
          sender: user.displayName || "Anonymous",
          userId: user.uid,
        };

        const str = JSON.stringify(message);

        if (ws && ws.readyState === WebSocket.OPEN) {
          console.log("sending message");
          ws.send(str);
        } else {
          console.warn("websocket is not connected");
        }

        // Send to Firebase
        set(ref(database, `messages/${roomId}/${Date.now()}`), message);

        setNewMessage("");
      } else {
        window.alert("메세지를 작성하기 위해 로그인하세요.");
      }
    }
  };

  //<button className="go-back-button" onClick={handleGoBack}></button>

  return (
    <div className="chat-container" style={{ height: "600px", width:"400px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div className="chat-messages" style={{ flex: "1", overflowY: "scroll" }} ref={chatContainerRef}>
        {messages.map((message) => (
          <div key={message.id}>
            <SingleChat
              user={user}
              key={message.id}
              message={message}
              handleLike={() => handleLike(message.id)} // Pass the message.id to handleLike
            />
            <button onClick={() => openModal(message)}>신고</button>
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메세지를 입력하세요..."
            style={{height: "30px"}}
          />
          <button type="submit" style={{ height: "43px", width: "60px" }}>입력</button>
        </div>
      </form>
      {/* Render the message modal when showModal is true */}
      {showModal && (
        <MessageModal message={selectedMessage} onClose={closeModal} />
      )}
    </div>
  );  
};

export default Chat;
