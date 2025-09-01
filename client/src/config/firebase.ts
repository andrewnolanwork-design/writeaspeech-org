import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8CsC6rHluhgmWczNqlNShwBkr5jICNOE",
  authDomain: "writeaspeech-org.firebaseapp.com",
  projectId: "writeaspeech-org",
  storageBucket: "writeaspeech-org.firebasestorage.app",
  messagingSenderId: "664929489018",
  appId: "1:664929489018:web:8b9a014d67bbe200e6ebc3",
  measurementId: "G-0W4VCD3NGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
