import { onValue, ref } from "@firebase/database";
import { database } from "../firebase";

const onValueAsync = (ref) => {
  return new Promise((resolve, reject) => {
    onValue(ref, (snapshot) => {
      resolve(snapshot.val());
    });
  });
};

const db = database;
export const fetchMessages = async (roomID) => {
  return await onValueAsync(ref(db, `messages/${roomID}`));
};
