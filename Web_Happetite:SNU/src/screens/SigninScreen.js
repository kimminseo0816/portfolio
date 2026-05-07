import React, { useState, useEffect } from "react";
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
import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as Warning } from "../images/warning.svg";
import Checkbox from "../Checkbox";
import { getDatabase, ref, set } from "firebase/database";
import { database } from "../firebase";

const SigninScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInClick = async () => {
    try {
      const user = handleSignUp(email, password);
      const userData = {
        email,
        password,
        displayName: "YourDisplayName", // Replace with the desired displayName
        interest: "YourInterest", // Replace with the user's interest
      };

      // Save user data to Realtime Database
      const userRef = `users/${user.uid}`;
      set(ref(database, userRef), userData);

      window.alert("인증 이메일이 보내졌습니다. 이메일을 확인해주세요.");
      navigate("/verification");
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  const handlePasswordConfirm = (e) => {
    const confirmPassword = e.target.value;
    setPasswordConfirm(confirmPassword);
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handlePasswordValid = (password) => {
    const hasMoreThanOneNumber = (password.match(/\d/g) || []).length > 1;
    const isLongerThanEight = password.length > 7;
    if (hasMoreThanOneNumber && isLongerThanEight) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const [age, setAge] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  return (
    <div className="no-scrollBody">
      <div className="plain-header">
        <Logo height={50} />
        <p className="loginText">가입정보를 입력해주세요.</p>
      </div>
      <form className="signinWindow">
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
          onChange={(e) => {
            setPassword(e.target.value);
            handlePasswordValid(e.target.value);
          }}
        />
        <input
          className="inputline"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={handlePasswordConfirm}
        />
        <div className="blankContainer">
          {!passwordValid && (
            <div className="warningContainer">
              <Warning />
              <p className="warningText">
                숫자 포함 8자리 이상의 비밀번호를 입력해주세요
              </p>
            </div>
          )}
          {passwordMismatch && (
            <div className="warningContainer">
              <Warning />
              <p className="warningText">비밀번호가 일치하지 않습니다.</p>
            </div>
          )}
          <Checkbox
            text="만 14세 이상입니다."
            checked={age}
            onChange={() => setAge(!age)}
          />
          <Checkbox checked={privacy} onChange={() => setPrivacy(!privacy)} />
          <span
            className="underlineLink"
            onClick={() =>
              (window.location.href =
                "https://tropical-rule-078.notion.site/133af2fd316e4993b77bd04725b62a0a?pvs=4")
            }
          >
            이용약관
          </span>
          <span className="justText">과 </span>
          <span
            className="underlineLink"
            onClick={() =>
              (window.location.href =
                "https://tropical-rule-078.notion.site/0224b91da091473b9ff17668cdce4db7")
            }
          >
            개인정보처리방침
          </span>
          <span className="justText">에 동의합니다.</span>
        </div>
        <footer>
          <button
            className={`signinButton ${
              (!age ||
                !privacy ||
                passwordMismatch ||
                !passwordValid ||
                passwordConfirm.length < 2) &&
              "disabled"
            }`}
            disabled={
              !age ||
              !privacy ||
              passwordMismatch ||
              !passwordValid ||
              passwordConfirm.length < 2
            }
            onClick={handleSignInClick}
          >
            가입하기
          </button>

          <p className="text">이미 회원이신가요?</p>
          <Link className="toLogin" to="/login">
            로그인
          </Link>
        </footer>
      </form>
    </div>
  );
};

export default SigninScreen;
