
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy-vphujCRk9SZbkwpX-jqkJ9P_RukBNM",
  authDomain: "chatta-70a5d.firebaseapp.com",
  databaseURL: "https://chatta-70a5d-default-rtdb.firebaseio.com",
  projectId: "chatta-70a5d",
  storageBucket: "chatta-70a5d.appspot.com",
  messagingSenderId: "962787815468",
  appId: "1:962787815468:web:5fa0f92b0ee180d1452189",
  measurementId: "G-DDGPRF203T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app)