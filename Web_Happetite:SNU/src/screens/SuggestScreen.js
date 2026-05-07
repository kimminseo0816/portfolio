import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "../styles/Suggest.css";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../icons/backarrow.svg";

const SuggestScreen = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_p2g91hi",
        "template_48xr95h",
        form.current,
        "fNQOBgCEhh9yRD4cl"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send email. Please try again later.");
        }
      );
  };
  const navigate = useNavigate();

  return (
    <div className="no-scrollBody">
      <div onClick={() => navigate("/setting")} className="iconContainer">
        <BackArrow className="iconofSuggest" />
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <label>의견을 적어주세요</label>
        <textarea
          name="message"
          placeholder="제안/버그/문의 등의 사항을 적어주세요"
          className="bigarea"
        />

        <label>답변을 받을 이메일 주소를{"\n"} 적어주세요</label>
        <textarea name="from_email" row={1} />
        <button
          type="submit"
          onClick={() => navigate("/setting")}
          className="sendButton"
        >
          보내기
        </button>
      </form>
    </div>
  );
};

export default SuggestScreen;
