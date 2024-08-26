
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAU0uFF19WHQwlZheKqc1DSD6qphkYtMrg",
  authDomain: "financely-rec-56796.firebaseapp.com",
  projectId: "financely-rec-56796",
  storageBucket: "financely-rec-56796.appspot.com",
  messagingSenderId: "615690468039",
  appId: "1:615690468039:web:126e625fd57987de0f9ce2",
  measurementId: "G-21QRVRBR01"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, doc, setDoc, getDoc };
