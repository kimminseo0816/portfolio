import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../App.css";
import "../styles/Login.css";
import { ReactComponent as Logo } from "../images/logo.svg";
import { handleEmailVerification } from "../utils/auth";
import { ReactComponent as BackArrow } from "../icons/backarrow.svg";

const VerificationScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSend = (user) => {
    handleEmailVerification(user).then(() => {
      window.alert("인증 이메일이 보내졌습니다. 이메일을 확인해주세요.");
    });
  };

  const handleVerification = async () => {
    if (user) {
      await user.reload();
      console.log("isEmailVerified:", user.emailVerified);

      if (user.emailVerified) {
        alert("이메일이 성공적으로 인증되었습니다");
        navigate("/displayname");
      } else {
        alert("이메일이 인증되지 않았습니다");
      }
    }
  };

  return (
    <div className="body">
      <div className="plain-header">
        <div onClick={() => navigate("/")} className="iconContainer">
          <BackArrow className="icon" />
        </div>
        <Logo height={52} style={{ marginTop: "30px" }} />
        <p className="certificateText">
          이메일로 전송된{"\n"}링크를 확인해주세요.
        </p>
      </div>
      <button className="otherbutton" onClick={handleSend}>
        다시 전송
      </button>
      <button className="finalbutton" onClick={handleVerification}>
        확인
      </button>
    </div>
  );
};

export default VerificationScreen;
