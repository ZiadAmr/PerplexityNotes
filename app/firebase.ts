// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "notes-4ed0d.firebaseapp.com",
  projectId: "notes-4ed0d",
  storageBucket: "notes-4ed0d.firebasestorage.app",
  messagingSenderId: "279061364331",
  appId: "1:279061364331:web:4170703035fe8fe71a7b2e",
  measurementId: "G-9K8WJG90GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
