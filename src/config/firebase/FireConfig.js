// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwRRHRPSxH1C8_6mAk1hvSmiNISvtoPh8",
    authDomain: "sale-pisang-malang.firebaseapp.com",
    projectId: "sale-pisang-malang",
    storageBucket: "sale-pisang-malang.firebasestorage.app",
    messagingSenderId: "922758528966",
    appId: "1:922758528966:web:6d188e3ebbd1d2c424bcc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
