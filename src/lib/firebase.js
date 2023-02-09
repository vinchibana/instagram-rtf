import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { seedDatabase } from "../seed";

const firebaseConfig = {
  apiKey: "AIzaSyAHYk9Bwamdk1xFZEnEh4HAnCGkqHwxokg",
  authDomain: "instagram-rtf.firebaseapp.com",
  projectId: "instagram-rtf",
  storageBucket: "instagram-rtf.appspot.com",
  messagingSenderId: "429350512162",
  appId: "1:429350512162:web:8516f47c77d1c29aabcc7b",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
seedDatabase(app);

export { app, db };
