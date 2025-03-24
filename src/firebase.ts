// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-zBMXnAASOcwjGSDPAskR1sMkhNZeSSM",
  authDomain: "customgpt-ab977.firebaseapp.com",
  projectId: "customgpt-ab977",
  storageBucket: "customgpt-ab977.firebasestorage.app",
  messagingSenderId: "1047955741764",
  appId: "1:1047955741764:web:2efd1939d5a53c86d13011",
  measurementId: "G-C70RQG9QSV" // Optional — you can remove this if not using analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore DB
export const db = getFirestore(app);
