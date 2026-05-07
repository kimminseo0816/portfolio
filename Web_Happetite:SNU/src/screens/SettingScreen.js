import "../styles/Setting.css";
import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as BackArrow } from "../icons/backarrow.svg";
import { ReactComponent as Setting } from "../icons/userinfoSetting.svg";
import { Link, useNavigate } from "react-router-dom";
import { handleLogOut, isLoggedin } from "../utils/auth";
import { ReactComponent as Guest } from "../images/Guest.svg";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SettingScreen = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  const [displayName, setDisplayName] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isLoggedin == true) {
        setDisplayName(user.displayName);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleLogOutClick = () => {
    handleLogOut().then(() => {
      window.alert("로그아웃 되었습니다.");
      console.log("Logged out");
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <div className="body">
      <div className="header">
        <div onClick={() => navigate("/")} className="iconContainer">
          <BackArrow className="icon" />
        </div>
        <p className="title">설정</p>
      </div>
      <div className="userinfo">
        {isLoggedin ? (
          <div>
            <Link to="/userinfo" className="idtext">
              {displayName}
            </Link>
            <Setting
              className="brownSetting"
              onClick={() => navigate("/userinfo")}
            />
            <p className="subtitle">관심 분야는 ~~</p>
            <p className="subtitle2">{userEmail}</p>
          </div>
        ) : (
          <div>
            <Guest height={20} />
            <button className="toSignin" onClick={() => navigate("/signin")}>
              회원으로 SPOTTED 즐기기
            </button>
          </div>
        )}
      </div>
      <div className="settingtabContent">
        {isLoggedin ? (
          <Link to="/suggest" className="contentText">
            제보하기
          </Link>
        ) : null}

        <div className="contentText">튜토리얼 보기</div>
        <Link
          to="https://www.instagram.com/mapsee_happetite/"
          className="contentText"
        >
          개발팀 정보
        </Link>
        <p className="welcomText">{"/n"}</p>
        <Link
          className="contentText"
          to="https://tropical-rule-078.notion.site/133af2fd316e4993b77bd04725b62a0a?pvs=4"
        >
          이용약관
        </Link>
        <Link
          className="contentText"
          to="https://tropical-rule-078.notion.site/0224b91da091473b9ff17668cdce4db7?pvs=4"
        >
          개인정보처리방침
        </Link>
        <Link
          className="contentText"
          to="https://tropical-rule-078.notion.site/42323cbe65e645d2894993cbd56588aa?pvs=4"
        >
          운영정책
        </Link>
        <Link className="contentText">청소년보호정책</Link>
        <Link className="contentText">오픈소스 라이선스</Link>
      </div>
      <p className="logoutText" onClick={handleLogOutClick}>
        로그아웃
      </p>
      <p className="versionText">v1.0.0</p>
    </div>
  );
};

export default SettingScreen;
