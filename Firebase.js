import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

  const firebaseConfig = {
  apiKey: "AIzaSyC5l8oQJM9N4MSSW3iNlwhkRiZbtOt6luw",
  authDomain: "a-new-ui.firebaseapp.com",
  projectId: "a-new-ui",
  storageBucket: "a-new-ui.appspot.com",
  messagingSenderId: "316943913089",
  appId: "1:316943913089:web:68ce81bd2aac9f9167fd80",
  measurementId: "G-B1R5P8PLPV"
};

 export {
  firebaseConfig,
  initializeApp,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp
};