import React, { useState } from "react";
import "../styles/Delete.css";
import { AiOutlineClose } from "react-icons/ai";
import Checkbox from "../Checkbox";
import { useNavigate, Link } from "react-router-dom";

const DeleteScreen = () => {
  const [reasons, setReasons] = useState({
    one: false,
    two: false,
    three: false,
    other: "",
  });

  const navigate = useNavigate();

  const handleCheckboxChange = (name) => {
    setReasons({
      ...reasons,
      [name]: !reasons[name],
    });
  };

  const handleOtherInputChange = (event) => {
    setReasons({
      ...reasons,
      other: event.target.value,
    });
  };

  const handleSubmit = () => {
    const selectedReasons = Object.keys(reasons).filter((key) => reasons[key]);

    const reasonsText = selectedReasons.join(", ");
    if (reasons.other) {
      reasonsText += `, Other: ${reasons.other}`;
    }

    console.log("Reasons:", reasonsText);

    navigate("/finishDelete");
  };

  return (
    <div className="yellowBody">
      <div onClick={() => navigate("/")}>
        <AiOutlineClose className="close-bottomsheet" />
      </div>
      <div className="deleteText">
        SPOTTED를 탈퇴하려는{"\n"} 이유를 알려주세요.
      </div>
      <div className="pstext">* 중복 선택 가능합니다.</div>
      <form className="deleteForm">
        <Checkbox
          checked={reasons.one}
          onChange={() => handleCheckboxChange("one")}
          text="원하는 장소가 목록에 없거나 활성화되지 않아서"
          design="delete"
        />
        <Checkbox
          checked={reasons.two}
          onChange={() => handleCheckboxChange("two")}
          text="서비스 기능이 유용하지 않아서"
          design="delete"
        />
        <Checkbox
          checked={reasons.three}
          onChange={() => handleCheckboxChange("three")}
          text="타 서비스를 이용해서"
          design="delete"
        />
        <div className="reasonBox">
          기타 사유{"\n"}
          <textarea
            className="extraBox"
            placeholder="적어주시면 서비스 개선에 큰 도움이 됩니다"
            value={reasons.other}
            onChange={handleOtherInputChange}
          />
        </div>
      </form>
      <div className="nextButton" onClick={handleSubmit}>
        다음
      </div>
    </div>
  );
};

export default DeleteScreen;
