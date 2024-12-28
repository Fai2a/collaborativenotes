// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjVKoHCWMRnbGPCh_HhTtCunI7tg8FX9o",
  authDomain: "notesapp-18f2d.firebaseapp.com",
  projectId: "notesapp-18f2d",
  storageBucket: "notesapp-18f2d.appspot.com",
  messagingSenderId: "744398723457",
  appId: "1:744398723457:web:14c7568931759e7bea3080",
  measurementId: "G-BNVQRWT0TX"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app;

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export auth and db
export { auth, db };
