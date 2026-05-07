import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Checked } from "./icons/delete_checked.svg";
import { ReactComponent as Unchecked } from "./icons/delete_unchecked.svg";

function Checkbox({ text, checked, onChange, design = "left" }) {
  const handleChange = (event) => {
    onChange(event);
    if (event.target.checked) {
      console.log("fine");
    }
  };

  return (
    <StyledLabel design={design}>
      <StyledInput
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        design={design}
      />
      <StyledP design={design}>{text}</StyledP>
    </StyledLabel>
  );
}

export default Checkbox;

const StyledInput = styled.input`
  appearance: none;
  width: 19px;
  height: 18px;
  border: 1px solid #d6d6d6;
  border-radius: 0rem;
  position: relative;

  &:checked {
    &::before {
      content: "Ｖ";
      position: absolute;
      left: 0.2px;
      color: white;
      font-size: 17px;
    }
  }

  ${(props) =>
    props.design === "delete" &&
    css`
      appearance: none;
      border: 1px solid black;
      padding: 10px;
      position: relative;
      left: 420px;

      &:checked {
        &::before {
          background-repeat: no-repeat;
          background-position: 50%;
          color: pink;
        }
      }
    `}
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  height: 20px;

  ${(props) =>
    props.design === "delete" &&
    css`
      background-color: white;
      padding: 10px;
      border-radius: 8px;
      background-image: linear-gradient(to right, #ffe2a9 12px, white 10px);
    `}
`;

const StyledP = styled.p`
  margin-left: 10px;
  color: #979797;
  font-size: 13px;
  font-weight: 400;

  ${(props) =>
    props.design === "delete" &&
    css`
      color: black;
      font-size: 22px;
      padding-left: 20px;
      position: relative;
      right: 30px;
    `}
`;
