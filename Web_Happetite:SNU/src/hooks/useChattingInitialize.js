import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase";

export const useChattingInitialize = ({ roomId, setMessages }) => {
  console.log("useChattingInitialize");

  useEffect(() => {
    console.log("useChattingInitialize");
    // Get messages from Firebase
    const messagesRef = ref(database, `messages/${roomId}`);

    // Listen for incoming messages
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        setMessages(messages);
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => {};
  }, []);
};
