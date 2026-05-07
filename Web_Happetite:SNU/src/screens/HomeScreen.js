import "../App.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import "../styles/Home.css";
import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as Setting } from "../icons/setting.svg";
import { ReactComponent as Bell } from "../icons/bell.svg";
import { ReactComponent as People } from "../icons/people.svg";
import { ReactComponent as Location } from "../icons/locationpin.svg";
import { AiOutlineClose } from "react-icons/ai";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref, set, push } from "firebase/database";

import useCurrentLocation from "../hooks/useCurrentLocation";
import { checkDistance } from "../utils/distance";

import { geolocationOptions } from "../constants/geolocationOptions";
import { Places } from "../constants/defaultLocation";
import { database } from "../firebase";
import Notification from "../notification";
import Sheet from "react-modal-sheet";
// import isLoggedin from "../History";

const HomeScreen = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("email") !== null;
  // localStorage.getItem("email") !== null;

  /* useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });*/

  const { location: currentLocation, error: currentError } =
    useCurrentLocation(geolocationOptions);
  console.log("Current Location: ", currentLocation);

  const handleButtonClick = (value, event) => {
    const distance =
      currentLocation == undefined
        ? 5001
        : checkDistance({
            lat1: currentLocation.latitude,
            lon1: currentLocation.longitude,
            lat2: value.latitude,
            lon2: value.longitude,
          });

    if (distance && distance >= 5000) {
      console.log("Distance: ", distance);
    } else {
      console.log("Distance: ", distance);
      window.alert("You are not within 5 kilometers. Cannot proceed!");
      event.preventDefault();
    }

    navigate(`/chatting/${value.id}`, { state: { value: value } });
  };
  const handleRefreshClick = () => {
    window.location.reload();
  };

  /*Bottomsheet*/

  const [isOpen, setOpen] = useState();
  const handleClosePress = () => setOpen(false);
  useEffect(() => {
    if (isLoggedin) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isLoggedin]);
  /*
  if (currentError) {
    console.log("Error: ", currentError);
    return (
      <div className="centerBody">
        <div className="centerheader">
          <img src={mainlogo} height={60} width={280} />
        </div>
      </div>
    );
  }*/

  return (
    <div className="body">
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container className="bottomsheet">
          <Sheet.Content>
            <AiOutlineClose
              className="close-bottomsheet"
              onClick={handleClosePress}
            />
            <div className="welcomeText">
              지금 로그인하면{"\n"}다른 관중들과 자유롭게 채팅하며{"\n"}토론을
              나눌 수 있어요.
            </div>
            <Link to="/signin" className="signupButton">
              회원으로 SPOTTED 즐기기
            </Link>
            <div className="guestButton" onClick={handleClosePress}>
              게스트로 둘러보기
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <div className="centerheader">
        <Logo height={30} />
        <Link to="/setting" className="settingicon">
          <Setting height={40} />
        </Link>
        <Link to="/notification" className="bellicon">
          <Bell height={40} />
        </Link>

        <Link to="/notification" className="noticeBoard">
          <p className="notificationText">[공지] 뭘 써야할깡</p>
        </Link>
        <p className="questionText">당신이 위치한 곳은 어디인가요?</p>
      </div>
      <div className="roomContainer">
        {Object.entries(Places).map(([key, value]) => {
          return (
            <div
              className="roomButton"
              onClick={(e) => handleButtonClick(value, e)}
              state={{ value: value }}
              key={key}
            >
              <p className="labelText">{value.label}</p>
              <p className="address">{value.address}</p>
              <p className="smallText">15,230m</p>
              <Location className="locationIcon" />
              <p className="smallText">200명</p>
              <People className="roomIcon" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeScreen;
