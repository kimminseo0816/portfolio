import React, { useState } from "react";

import {
  handleLogIn,
  handleLogOut,
  handleSignUp,
  handleForgotPwd,
  handleEmailVerification,
  isLoggedin,
} from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../images/logo.svg";
import "../App.css";
import "../styles/Login.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogInClick = () => {
    handleLogIn(email, password).then(() => {
      console.log("Logged in", { isLoggedin });
      navigate("/setting");
      window.location.reload();
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
      console.log("Password reset email sent");
      window.alert(
        "비밀번호 재설정 이메일이 보내졌습니다. 이메일을 확인해주세요."
      );
    });
  };

  return (
    <div className="body">
      <div className="plain-header">
        <Logo height={50} />
      </div>
      <form className="loginWindow">
        <input
          className="inputline"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputline"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="signinButton"
          type="submit"
          onClick={handleLogInClick}
        >
          로그인
        </button>
        <Link className="forgotpassword" to="/forgotpassword">
          비밀번호를 잊어버렸어요
        </Link>
      </form>
    </div>
  );
};

export default LoginScreen;
