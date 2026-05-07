import "./App.css";
import React, { useEffect } from "react";
import { getToken } from "./firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ChattingScreen from "./screens/ChattingScreen";
import SettingScreen from "./screens/SettingScreen";
import InterestScreen from "./screens/InterestScreen";
import SuggestScreen from "./screens/SuggestScreen";
import LoginScreen from "./screens/LoginScreen";
import NotificationScreen from "./screens/NotificationScreen";
import SigninScreen from "./screens/SigninScreen";
import VerificationScreen from "./screens/VerificationScreen";
import ForgotPassword from "./screens/ForgotPassword";
import ChangePassword from "./screens/ChangePassword";
import InfoScreen from "./screens/InfoScreen";
import DisplayNameScreen from "./screens/DisplayNameScreen";
import DeleteScreen from "./screens/DeleteScreen";
import DeletePasswordconfirm from "./screens/DeletePasswordconfirm";
import TemporaryScreen from "./screens/Temporarysheet";
import ChangeId from "./screens/ChangeId";

import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  /* useEffect(() => {
    const handleGetToken = async () => {
      const token = await getToken();
    };
    handleGetToken();
  }, []);*/

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/interest" element={<InterestScreen />} />
        <Route path="/chatting/:id" element={<ChattingScreen />} />
        <Route path="/setting" element={<SettingScreen />} />
        <Route path="/suggest" element={<SuggestScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/notification" element={<NotificationScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/verification" element={<VerificationScreen />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/displayname" element={<DisplayNameScreen />} />
        <Route path="/userinfo" element={<InfoScreen />} />
        <Route path="/delete" element={<DeleteScreen />} />
        <Route path="/finishDelete" element={<DeletePasswordconfirm />} />
        <Route path="/tempscreen" element={<TemporaryScreen />} />
        <Route path="/changeid" element={<ChangeId />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
