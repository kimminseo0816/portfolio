import React, { useState } from "react";
import { handleDisplayName, currentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

import "../App.css";
import "../styles/Login.css";
import mainlogo from "../images/mainlogo.png";

const ChangeId = () => {
  const navigate = useNavigate();

  const [displayname, setDisplayname] = useState("");

  const handleDisplaynameClick = () => {
    if (currentUser) {
      try {
        const userData = {
          displayName: displayname,
        };
        const userRef = `users/${user.uid}`;
        set(ref(database, userRef), userData);
      } catch (error) {
        console.error("Error during displayname :", error);
      }

      handleDisplayName(currentUser, displayname).then(() => {
        console.log("id set", displayname);
        navigate("/setting");
      });
    }
  };

  return (
    <div className="body">
      <text className="loginText">닉네임 변경창 (edit)</text>
      <input
        className="inputline"
        placeholder="닉네임"
        value={displayname}
        onChange={(e) => setDisplayname(e.target.value)}
      />
      <button className="signinButton" onClick={handleDisplaynameClick}>
        제출
      </button>
    </div>
  );
};

export default ChangeId;
