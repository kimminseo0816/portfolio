import "../styles/Setting.css";
import "../styles/Notification.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../icons/backarrow.svg";
//import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { ref, set, get, push, onValue } from "firebase/database";
import { database } from "../firebase";

const NotificationScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");

  const [notifications, setNotifications] = useState([
    {
      title: "개인정보 처리방침 개정 안내",
      text: "Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실 경우, 설정",
    },
    {
      title: "개인정보 처리방침 개정 안내111",
      text: "Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실 경우, 설정",
    },
    {
      title: "개인정보 처리방침 개정 안내222",
      text: "Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실 경우, 설정",
    },
    // Add more notifications as needed
  ]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tab2Content = (
    <div>
      <div className="alert">
        <p className="alertTitle">개인정보 처리방침 개정 안내</p>
        <p className="alertText">
          Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실
          경우, 설정
        </p>
      </div>
      <div className="alert">
        <p className="alertTitle">개인정보 처리방침 개정 안내2</p>
        <p className="alertText">
          Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실
          경우, 설정
        </p>
      </div>
      <div className="alert">
        <p className="alertTitle">개인정보 처리방침 개정 안내2</p>
        <p className="alertText">
          Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실
          경우, 설정
        </p>
      </div>
      <div className="alert">
        <p className="alertTitle">개인정보 처리방침 개정 안내2</p>
        <p className="alertText">
          Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실
          경우, 설정
        </p>
      </div>
      <div className="alert">
        <p className="alertTitle">개인정보 처리방침 개정 안내2</p>
        <p className="alertText">
          Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실
          경우, 설정
        </p>
      </div>
      <div className="alert">
        <p className="alertTitle">개인정보 처리방침 개정 안내2</p>
        <p className="alertText">
          Morano의 개인정보 처리방침이 개정되어 안내드립니다. 문의가 있으실
          경우, 설정
        </p>
      </div>
    </div>
  );

  const addNotification = async () => {
    const newNotification = {
      title: "새로운 공지",
      text: "새로운 공지",
    };

    try {
      const notificationsRef = ref(database, "notifications");
      const newNotificationRef = push(notificationsRef);
      await set(newNotificationRef, newNotification);

      // After adding a new notification, fetch the updated list
      fetchNotifications();
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  const fetchNotifications = () => {
    try {
      const notificationsRef = ref(database, "notifications");
      onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        const notificationsData = data ? Object.values(data) : [];
        console.log("Notifications from Firebase:", notificationsData);
        setNotifications(notificationsData);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications from Firebase and update the state
    fetchNotifications();
  }, []);

  const tab1Content = (
    <div>
      {notifications.map((notification, index) => (
        <div className="alert" key={index}>
          <p className="alertTitle">{notification.title}</p>
          <p className="alertText">{notification.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="body">
      <div className="header">
        <div onClick={() => navigate(-1)} className="iconContainer">
          <BackArrow className="icon" />
        </div>
        <p className="title">알림</p>
      </div>
      <div className="tabBar">
        <div
          className={`tab ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => handleTabClick("tab1")}
        >
          내 알림
        </div>
        <div
          className={`tab ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => handleTabClick("tab2")}
        >
          공지사항
        </div>
      </div>
      // 더보기란 만들어야됨 // db에서 공지 받아오기
      <button onClick={addNotification}>새로운 공지 추가</button>
      {activeTab === "tab1" ? tab1Content : tab2Content}
    </div>
  );
};

export default NotificationScreen;