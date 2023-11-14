// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAiN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "login-12094.appspot.com",
  messagingSenderId: "48086489817",
  appId: "1:48086489817:web:a2c47768b041cfa6723cc8",
  measurementId: "G-QXD3L39DHE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export default app;