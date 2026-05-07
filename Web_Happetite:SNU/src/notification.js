import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import { getToken } from "./firebase";

const Notification = () => {
  /*useEffect(() => {
    const token = getToken();
    if (token) {
      navigator.serviceWorker.addEventListener("message", ({ data }) => {
        //handle message
        const message = data["firebase-messaging-msg-data"];
        console.log("message: ", message);
        toast(message.notification.body);
      });
    }
  }, []);
*/
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Notification;
