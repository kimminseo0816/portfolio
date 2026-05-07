import "../App.css";
import React, { useEffect, useState } from "react";
import MessageModal from "./MessageModal"

import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import Receiver from "./Receiver";

const ChattingScreen = () => {
  const user_local = localStorage.getItem("user");
  const [user, setUser] = useState({
    displayName: null,
    uid: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleopenModal = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setShowModal(false);
  };


  useEffect(() => {
    if (user_local) {
      const user_obj = JSON.parse(user_local);
      console.log(user_obj);
      setUser({
        displayName: user_obj.email,
        uid: user_obj.email,
      });
    }
  }, [user_local]);

  const handleDisplayNameChange = (event) => {
    setUser({
      ...user,
      displayName: event.target.value,
    });
  };

  const location = useLocation();
  const roomId = location.pathname.split("/")[2];

  const info = location.state ? location.state.value : { label: "No data" };

  return (
    <div>
      <p className="testtext">{info.label}</p>
      <p className="testtext">{user.displayName}</p>
      <Chat user={user} roomId={roomId} handleopenModal={handleopenModal} />
      {showModal && (
        <MessageModal message={selectedMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default ChattingScreen;