// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKVovNHEWj20ysdO_ofyjVJrRALG6OG1Y",
  authDomain: "serasera-8b307.firebaseapp.com",
  databaseURL: "https://serasera-8b307-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "serasera-8b307",
  storageBucket: "serasera-8b307.appspot.com",
  messagingSenderId: "44070450944",
  appId: "1:44070450944:web:900badd8352f09d536a5e5",
  measurementId: "G-B8RH77L3L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);