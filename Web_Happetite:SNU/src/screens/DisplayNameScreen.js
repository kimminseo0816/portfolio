import React, { useState, useEffect } from "react";
import { handleDisplayName } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { database } from "../firebase";

import "../App.css";
import "../styles/Login.css";
import "../styles/Setting.css";
import mainlogo from "../images/mainlogo.png";

const DisplayNameScreen = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleId = () => {
    if (user) {
      try {
        const userData = {
          displayName: displayName,
        };
        const userRef = `users/${user.uid}`;
        set(ref(database, userRef), userData);
      } catch (error) {
        console.error("Error during displayname :", error);
      }

      handleDisplayName(user, displayName).then(() => {
        console.log("id set", displayName);
        navigate("/");
      });
    }
  };

  const handleDisplayNameValid = () => {
    const isValid = displayName.length;

    if (isValid >= 2 && isValid <= 12) {
      return true;
    } else {
      return false;
    }
  };

  const handleDisplayNameChange = (e) => {
    const newValue = e.target.value;
    setDisplayName(newValue);
  };

  const handleStartClick = () => {
    if (!handleDisplayNameValid()) {
    } else {
      handleId();
    }
  };

  const handleNameGenerator = () => {
    const adjectives = ["웅장한", "화려한", "기똥찬"];
    const nouns = ["고라니", "두꺼비", "너구리", "방울뱀"];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const generatedName = `${randomAdjective}${randomNoun}${randomNumber}`;
    setDisplayName(generatedName);
  };

  return (
    <div className="no-scrollBody">
      <div className="plain-header">
        <img src={mainlogo} height={52} width={250} />
        <p className="idchangeText">닉네임을 설정해주세요</p>
      </div>
      <form className="loginWindow">
        <input
          className="inputline"
          placeholder="2-12자 사이로 입력해주세요."
          value={displayName}
          onChange={handleDisplayNameChange}
        />
      </form>

      <button className="otherbutton" onClick={handleNameGenerator}>
        닉네임 랜덤 생성
      </button>

      <button
        className="finalbutton"
        type="submit"
        onClick={handleStartClick}
        disabled={!handleDisplayNameValid()}
      >
        시작하기
      </button>
    </div>
  );
};

export default DisplayNameScreen;
