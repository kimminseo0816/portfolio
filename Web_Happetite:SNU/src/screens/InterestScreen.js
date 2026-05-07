import "../App.css";
import "../styles/Interest.css";
import { ReactComponent as Logo } from "../images/logo.svg";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useNavigate,
} from "react-router-dom";

const InterestScreen = () => {
  const navigate = useNavigate();

  const [pressedButtons, setPressedButtons] = useState([]);
  const buttonNames = [
    "축구경기",
    "야구경기",
    "뮤직페스티벌",
    "인디공연",
    "내한공연",
    "아트페어",
    "영화",
    "전시",
    "대학교",
  ];

  const handleButtonPress = (index) => {
    if (!pressedButtons.includes(index)) {
      setPressedButtons([...pressedButtons, index]);
    } else {
      setPressedButtons(pressedButtons.filter((item) => item !== index));
    }
  };

  const handleInterest = () => {
    if (pressedButtons.length < 3) {
      window.alert("관심분야를 세개 이상 선택해주세요");
    } else {
      navigate("/tempscreen");
    }
  };

  return (
    <div className="body">
      <div className="plain-header">
        <Logo height={52} />
        <p className="bigText">당신의 관심분야를 선택해주세요</p>
        <p className="smallText">
          본 선호도는 관심분야에 맞는 채팅방 추천에 사용됩니다
        </p>
      </div>
      <div className="buttonHolder">
        {buttonNames.map((name, index) => (
          <button
            key={index}
            className={`${
              pressedButtons.includes(index)
                ? "orangebuttonActive"
                : "orangebutton"
            }`}
            onClick={() => handleButtonPress(index)}
          >
            {name}
          </button>
        ))}
      </div>

      <button onClick={handleInterest} className="doneChoosing">
        선택완료
      </button>
    </div>
  );
};

export default InterestScreen;
