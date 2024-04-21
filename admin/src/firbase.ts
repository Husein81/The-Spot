// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_KEY ,
  authDomain: "the-spot-414409.firebaseapp.com",
  projectId: "the-spot-414409",
  storageBucket: "the-spot-414409.appspot.com",
  messagingSenderId: "433819271660",
  appId: "1:433819271660:web:7d1f32b90b223ca6d4c0c9",
  measurementId: "G-PS0QCFTZ7E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);