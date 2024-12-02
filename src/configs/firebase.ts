// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABpkQ1IHirVSUw9qwJuMBOUo8NShx3qrQ",
  authDomain: "hawkzz.firebaseapp.com",
  projectId: "hawkzz",
  storageBucket: "hawkzz.firebasestorage.app",
  messagingSenderId: "449432080246",
  appId: "1:449432080246:web:c458355a1bbeb3b758b457",
  measurementId: "G-RDMZHTV0XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup, signOut };
