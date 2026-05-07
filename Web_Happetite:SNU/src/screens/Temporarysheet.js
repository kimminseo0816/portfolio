import "../App.css";
import "../styles/Home.css";
import "../styles/Interest.css";
import React, { useState, useEffect } from "react";
import Sheet from "react-modal-sheet";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const TemporaryScreen = () => {
  const [isOpen, setOpen] = useState(true);
  const handleClosePress = () => setOpen(false);
  const [displayName, setDisplayName] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
      }
    });
    return () => unsubscribe();
  }, [auth]);

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

  return (
    <div className="body">
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container className="bottomsheet">
          <Sheet.Content>
            <AiOutlineClose
              className="closeButton"
              onClick={handleClosePress}
            />
            <p className="bottomTitleText">관심사를 선택해주세요</p>
            <p className="bottomSubtitleText">
              {displayName}님의 관심사에 맞는 SPOT 개설과 추천에 활용됩니다.
            </p>
            <div className="bottomButtonHolder">
              {buttonNames.map((name, index) => (
                <button
                  key={index}
                  className={`${
                    pressedButtons.includes(index)
                      ? "bottomButtonActive"
                      : "bottomButton"
                  }`}
                  onClick={() => handleButtonPress(index)}
                >
                  {name}
                </button>
              ))}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

export default TemporaryScreen;
