import React from "react";
import { database } from "../firebase";
import { ref, set, onValue } from "firebase/database";

const Receiver = () => {
  const handleSimulatedMessage = () => {
    // Simulate receiving a message from another user
    const randomMessage = `Hello from User ${Math.floor(Math.random() * 100)}`;
    database.ref("messages").push({
      text: randomMessage,
      timestamp: Date.now(),
      sender: "other", // Simulated message sender
    });
  };

  return (
    <div>
      <button onClick={handleSimulatedMessage}>
        Receive Simulated Message
      </button>
    </div>
  );
};

export default Receiver;
