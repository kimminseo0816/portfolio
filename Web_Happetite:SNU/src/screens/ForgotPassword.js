import React, { useState } from "react";
import {
  handleLogIn,
  handleLogOut,
  handleSignUp,
  handleForgotPwd,
  handleEmailVerification,
} from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import "../styles/Login.css";
import mainlogo from "../images/mainlogo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogInClick = () => {
    handleLogIn(email, password).then(() => {
      console.log("Logged in");
      navigate("/home");
    });
  };

  const handleLogOutClick = () => {
    handleLogOut().then(() => {
      console.log("Logged out");
      navigate("/home");
    });
  };

  const handleForgotPwdClick = () => {
    handleForgotPwd(email).then(() => {
      console.log("Password reset email sen!");
      window.alert(
        "비밀번호 재설정 이메일이 보내졌습니다. 이메일을 확인해주세요."
      );
      navigate("/changepassword");
    });
  };

  return (
    <div className="body">
      <p className="whiteText">
        비밀번호 재설정 링크를 보낼 이메일을 입력하세요
      </p>
      <form className="loginWindow">
        <input
          className="inputline"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="whiteButton" onClick={handleForgotPwdClick}>
          다음
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
