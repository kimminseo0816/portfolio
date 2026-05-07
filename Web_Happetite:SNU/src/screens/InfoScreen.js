import "../styles/Setting.css";
import React from "react";
import { ReactComponent as BackArrow } from "../icons/backarrow.svg";
import { useNavigate, Link } from "react-router-dom";

const InfoScreen = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("email") !== null;

  return (
    <div className="body">
      <div className="header">
        <div onClick={() => navigate(-1)} className="iconContainer">
          <BackArrow className="icon" />
        </div>
        <p className="title">계정정보</p>
      </div>
      <div className="settingtabContent">
        <Link to="/changeid" className="infoText">
          닉네임 변경
        </Link>
        <Link to="/changepassword" className="infoText">
          비밀번호 변경
        </Link>
        <Link to="/interest" className="infoText">
          관심분야 변경
        </Link>
        <div className="deleteacount" onClick={() => navigate("/delete")}>
          회원탈퇴
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;
