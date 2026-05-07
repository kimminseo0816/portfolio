import React, { useState } from "react";
import "../styles/Delete.css";
import "../styles/Home.css";
import { AiOutlineClose } from "react-icons/ai";
import Checkbox from "../Checkbox";
import { useNavigate, Link } from "react-router-dom";
import { deleteSignedUser } from "../utils/auth";

const DeletePasswordconfirm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleDeleteAccount = () => {
    deleteSignedUser(password)
      .then(() => {
        console.log("User account deleted");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting user account:", error);
      });
  };

  return (
    <div className="yellowBody">
      <div onClick={() => navigate("/")}>
        <AiOutlineClose className="close-bottomsheet" />
      </div>
      <div className="deleteText">
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}비밀번호를{"\n"} 입력해주세요.{" "}
      </div>
      <input
        className="passwordCheck"
        type="password"
        placeholder="****"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="nextButton" onClick={handleDeleteAccount}>
        회원탈퇴
      </div>
    </div>
  );
};

export default DeletePasswordconfirm;
