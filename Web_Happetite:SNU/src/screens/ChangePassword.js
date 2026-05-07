import React, { useState } from "react";
import {
  handleLogIn,
  handleLogOut,
  handleSignUp,
  handleForgotPwd,
  handleEmailVerification,
} from "../utils/auth";
import { useNavigate } from "react-router-dom";

import "../App.css";
import "../styles/Login.css";
import mainlogo from "../images/mainlogo.png";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePwdChange = () => {
    handleLogIn(email, password).then(() => {
      console.log("Logged in");
      navigate("/setting");
    });
  };

  const handleForgotPwdClick = () => {
    handleForgotPwd(email).then(() => {
      console.log("Password reset email sen!");
      window.alert(
        "비밀번호 재설정 이메일이 보내졌습니다. 이메일을 확인해주세요."
      );
    });
  };

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handlePasswordConfirm = (e) => {
    const confirmPassword = e.target.value;
    setPasswordConfirm(confirmPassword);

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  return (
    <div className="body">
      <p className="whiteText">비밀번호를 변경해주세요 </p>
      <form className="loginWindow">
        <input
          className="pwdline"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="pwdline"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm} // Set value to passwordConfirm state
          onChange={handlePasswordConfirm}
        />
        {passwordMismatch && (
          <p className="warningText">비밀번호가 일치하지 않습니다.</p>
        )}

        <button
          disabled={passwordMismatch}
          className="whiteButton"
          onClick={handlePwdChange}
        >
          변경하기
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
