// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-659cc.firebaseapp.com",
  projectId: "mern-blog-659cc",
  storageBucket: "mern-blog-659cc.appspot.com",
  messagingSenderId: "930604305605",
  appId: "1:930604305605:web:04076e97428d2d932b74ac",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
