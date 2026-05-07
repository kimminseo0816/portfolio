import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const isLoggedin = async () => {
  const auth = getAuth();
  const sessionStorageKey = "firebase:authUser:chatta-70a5d:[DEFAULT]";
  const sessionStorageData = sessionStorage.getItem(sessionStorageKey);
  const userData = JSON.parse(sessionStorageData);
  const userEmail = userData?.user?.email;

  try {
    await setPersistence(auth, browserSessionPersistence);

    const user = auth.currentUser;

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user login status:", error);
    return false;
  }
};

export default isLoggedin;
