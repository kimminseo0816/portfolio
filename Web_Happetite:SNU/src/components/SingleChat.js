import React from "react";

export const SingleChat = ({ message, user, handleLike }) => {
  // Ensure that message.likes is an array or use an empty array as default
  const likes = message.likes || [];

  const userLiked = likes.includes(user.uid);

  return (
    <div
      key={message.timestamp}
      className={`message ${
        message.sender === user.displayName
          ? "user-message"
          : "received-message"
      }`}
    >
      <p>{message.text}</p>
      <span className="message-sender">{message.sender}</span>
      <div className="message-like">
        <button
          className={userLiked ? "liked-button" : "like-button"}
          onClick={() => handleLike(message.id)}
        >
          {userLiked ? "Unlike" : "Like"}
        </button>
        <span className="like-count">{likes.length}</span>
      </div>
    </div>
  );
};





