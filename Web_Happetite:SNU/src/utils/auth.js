import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

export const currentUser = () => {
  return auth.currentUser || null;
};

export const isLoggedin = localStorage.getItem("email") !== null;

export const handleSignUp = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed up!!");
      localStorage.setItem("email", email);
      handleEmailVerification(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error("Sign Up Error", parseErrorMessage(errorCode));
    });
};

export const handleEmailVerification = async () => {
  await sendEmailVerification(auth.currentUser).then(() => {
    console.log("Email verification sent");
  });
};

/*const maxRetries = 3; // Maximum number of retry attempts
let retries = 0; // Counter for retry attempts

export const handleEmailVerification = async () => {
  const currentUser = auth.currentUser;

  const sendVerification = () => {
    return sendEmailVerification(currentUser)
      .then(() => {
        console.log("Email verification sent");
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests" && retries < maxRetries) {
          // Retry after a delay (e.g., 5 seconds)
          retries++;
          console.warn("Rate limited. Retrying in 5 seconds...");
          setTimeout(() => {
            sendVerification(); // Retry the email verification
          }, 5000); // Wait for 5 seconds before retrying
        } else {
          console.error("Email verification error:", error);
        }
      });
  };

  return sendVerification();
};
 */

export const handleLogIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code;
    console.error("Log In Error", parseErrorMessage(errorCode));
  });
  localStorage.setItem("email", email);
  console.log({ email });
};

export const handleLogOut = async () => {
  signOut(auth).catch((error) => {
    const errorCode = error.code;
    console.error("Log Out Error", parseErrorMessage(errorCode));
  });
  localStorage.removeItem("email");
};

export const handleForgotPwd = async (email) => {
  sendPasswordResetEmail(auth, email).catch((error) => {
    const errorCode = error.code;
    console.error("Password reset email error", parseErrorMessage(errorCode));
  });
};

export const handleDisplayName = async (currentUser, name) => {
  try {
    if (currentUser) {
      await updateProfile(currentUser, { displayName: name });
      console.log("Display name updated successfully:", name);
    } else {
      console.error("User not logged in.");
    }
  } catch (error) {
    console.error("Error updating display name:", error);
    throw error;
  }
};

export const deleteSignedUser = async (password) => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    try {
      await reauthenticateWithCredential(currentUser, credential);

      await deleteUser(currentUser);

      console.log("User account deleted successfully");
      localStorage.removeItem("email");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        alert("비밀번호가 틀렸습니다. 다시 시도해주세요");
      } else {
        console.error(
          "Error deleting user account:",
          parseErrorMessage(errorCode)
        );
      }
      throw error;
    }
  } else {
    console.error("User not logged in.");
  }

  alert("계정이 성공적으로 삭제되었습니다");
};

const parseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "존재하지 않는 사용자입니다.";
    case "auth/wrong-password":
      return "비밀번호가 올바르지 않습니다.";
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/weak-password":
      return "비밀번호는 6글자 이상이어야 합니다.";
    case "auth/network-request-failed":
      return "네트워크 연결에 실패 하였습니다.";
    case "auth/invalid-email":
      return "잘못된 이메일 형식입니다.";
    case "auth/internal-error":
      return "잘못된 요청입니다.";
    case "auth/too-many-requests":
      return "비밀번호를 너무 많이 틀렸습니다. 잠시 후 다시 시도해주세요.";

    default:
      return "로그인에 실패하였습니다.";
  }
};
