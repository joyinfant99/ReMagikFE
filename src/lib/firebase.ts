import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBBcyLHI1Urb42wAuqsPzuMIuLZej8N-WY",
  authDomain: "notemagik-25d10.firebaseapp.com",
  projectId: "notemagik-25d10",
  storageBucket: "notemagik-25d10.firebasestorage.app",
  messagingSenderId: "756975788563",
  appId: "1:756975788563:web:695d602c116885ed5095e6",
  measurementId: "G-CCTNQYQJ26"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();