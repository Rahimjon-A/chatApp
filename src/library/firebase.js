import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-ff770.firebaseapp.com",
  projectId: "chat-app-ff770",
  storageBucket: "chat-app-ff770.appspot.com",
  messagingSenderId: "788156976628",
  appId: "1:788156976628:web:c481f26a81f01b43f9fda1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();