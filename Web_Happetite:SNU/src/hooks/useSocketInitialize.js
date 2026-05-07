import { useEffect } from "react";

export const useSocketInitialize = ({ roomId, setWs, setMessages }) => {
  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket(
      `ws://localhost:5001/chat/${roomId}` //"ws://ec2-3-142-50-13.us-east-2.compute.amazonaws.com:5000" /// 여기 주소 바꾸기!
    );

    setWs(socket);
    socket.onopen = () => {
      console.log("socket opened");
    };

    // Handle incoming messages from the server
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...message, ...prevMessages]);
    };

    // Clean up WebSocket connection on unmount
    return () => {
      socket.close();
    };
  }, []);
};
